/* Motion layer — α Cinematic.
   Lenis (smooth scroll) + GSAP + ScrollTrigger.
   Pattern: "homepage = one continuous timeline" (Working Stiff Films / Awwwards).
   Respects prefers-reduced-motion.
*/
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  /* ──────────────────────────────────────────────────────────
     1. Reading progress bar (always on, even with reduce-motion)
     ────────────────────────────────────────────────────────── */
  (function progress() {
    const bar = document.createElement('div');
    bar.className = 'read-progress';
    document.body.appendChild(bar);
    function update() {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }());

  if (reduce) {
    /* Reduced motion: show everything, no animation, no Lenis */
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
    document.querySelectorAll('.triwin, .diamond-wrap').forEach(el => el.classList.add('is-in'));
    return;
  }

  /* ──────────────────────────────────────────────────────────
     2. Lenis smooth scroll (industry standard 2026)
     ────────────────────────────────────────────────────────── */
  let lenis = null;
  if (hasLenis) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    /* sync ScrollTrigger with Lenis */
    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
    }
  }

  /* ──────────────────────────────────────────────────────────
     3. GSAP timeline orchestration
     ────────────────────────────────────────────────────────── */
  if (!hasGSAP || !hasST) {
    /* Fallback: just reveal everything via simple IO */
    fallbackIO();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ──────────────────────────────────────────────────────────
     2.5. Storytelling helpers (split text + act progress marker)
     ────────────────────────────────────────────────────────── */
  function splitWords(el) {
    if (!el || el.dataset.split === 'words') return Array.from(el.querySelectorAll('.sw-word'));
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let n; while ((n = walker.nextNode())) textNodes.push(n);
    const spans = [];
    textNodes.forEach((tn) => {
      const text = tn.nodeValue;
      if (!text || !text.trim()) return;
      const frag = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      parts.forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
        const s = document.createElement('span');
        s.className = 'sw-word';
        s.style.display = 'inline-block';
        s.style.willChange = 'transform, opacity';
        s.textContent = p;
        frag.appendChild(s);
        spans.push(s);
      });
      tn.parentNode.replaceChild(frag, tn);
    });
    el.dataset.split = 'words';
    return spans;
  }

  function splitLines(el) {
    if (!el || el.dataset.split === 'lines') return Array.from(el.querySelectorAll('.sl-line'));
    const html = el.innerHTML;
    const parts = html.split(/<br\s*\/?>/i);
    el.innerHTML = '';
    const spans = [];
    parts.forEach((p) => {
      const s = document.createElement('span');
      s.className = 'sl-line';
      s.style.display = 'block';
      s.style.willChange = 'transform, opacity';
      s.innerHTML = p;
      el.appendChild(s);
      spans.push(s);
    });
    el.dataset.split = 'lines';
    return spans;
  }

  /* Body data-act marker — drives act-level CSS hooks + star-menu active state */
  ['S', 'T', 'A', 'R'].forEach((actId) => {
    const chap = document.querySelector(`.chapter-divider[data-chapter="${actId}"]`);
    if (!chap) return;
    ScrollTrigger.create({
      trigger: chap,
      start: 'top 65%',
      onEnter:     () => { document.body.dataset.act = actId; },
      onEnterBack: () => { document.body.dataset.act = actId; },
    });
  });

  /* STAR menu sticky guide : show after Hero, hide on Fin Royale.
     Active state comes from body[data-act] CSS rules.
     Bonus : when the user scrolls past the inline Roadmap (#roadmap, Act T), the
     menu pulses once — visual handoff from "the proposition in 6 steps" (full
     roadmap) to "the guide in 4 acts" (sticky menu). */
  const starMenu = document.querySelector('.star-menu');
  const heroEl = document.querySelector('.hcx');
  if (starMenu && heroEl) {
    ScrollTrigger.create({
      trigger: heroEl, start: 'bottom 82%',
      onEnter:     () => starMenu.classList.add('is-visible'),
      onLeaveBack: () => starMenu.classList.remove('is-visible'),
    });
    /* Roadmap → menu handoff pulse (only first time, once: true) */
    const roadmapEl = document.querySelector('#roadmap');
    if (roadmapEl) {
      ScrollTrigger.create({
        trigger: roadmapEl, start: 'bottom 60%', once: true,
        onEnter: () => {
          starMenu.classList.add('is-handoff');
          setTimeout(() => starMenu.classList.remove('is-handoff'), 1100);
        },
      });
    }
    /* Hide on Fin Royale (closing) — la lecture est finie, plus de menu */
    const finEl = document.querySelector('.fin-royale');
    if (finEl) {
      ScrollTrigger.create({
        trigger: finEl, start: 'top 70%',
        onEnter:     () => starMenu.classList.remove('is-visible'),
        onLeaveBack: () => starMenu.classList.add('is-visible'),
      });
    }
  }

  /* ── Hero entrance: staggered headline reveal */
  const heroH1Lines = document.querySelectorAll('.hero-h1 .hl-line');
  if (heroH1Lines.length) {
    gsap.set(heroH1Lines, { yPercent: 110, opacity: 0 });
    gsap.set('.hero-eyebrow, .hero-lead, .hero-meta, .hero-masthead', { opacity: 0, y: 20 });
    gsap.set('.hero-cinema .hero-bg img', { scale: 1.18 });

    const heroTl = gsap.timeline({ delay: 0.15 });
    heroTl
      .to('.hero-cinema .hero-bg img', { scale: 1.04, duration: 1.6, ease: 'power3.out' }, 0)
      .to('.hero-masthead', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.2)
      .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
      .to(heroH1Lines, {
        yPercent: 0, opacity: 1,
        duration: 1.0, ease: 'power3.out',
        stagger: 0.12,
      }, 0.65)
      .to('.hero-lead', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.3)
      .to('.hero-meta', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.55);
  }

  /* ── Homepage portrait entrance — cinematic reveal, fires once on load */
  const portraitImg = document.querySelector('.cve-portrait-img');
  if (portraitImg) {
    const portraitMark = document.querySelector('.cve-portrait-mark');
    const portraitGlow = document.querySelector('.cve-portrait-glow');
    const heroEyebrow  = document.querySelector('.hero .eyebrow');
    const heroH1Home   = document.querySelector('.hero h1');
    const heroLead     = document.querySelector('.hero .lead');
    const heroCtas     = document.querySelector('.hero-ctas');
    const metaBlock    = document.querySelector('.meta-block');

    /* Initial: hidden states before the curtain rises */
    gsap.set(portraitImg, { y: 80, opacity: 0 });
    if (portraitGlow) gsap.set(portraitGlow, { scale: 0.50, opacity: 0 });
    if (portraitMark) gsap.set(portraitMark, { x: 100, opacity: 0 });
    [heroEyebrow, heroH1Home, heroLead, heroCtas, metaBlock].filter(Boolean).forEach(el => {
      gsap.set(el, { y: 32, opacity: 0 });
    });

    const pTl = gsap.timeline({ delay: 0.14 });

    /* 1 — Glow blooms up from the ground first — sets the mood */
    if (portraitGlow) pTl.to(portraitGlow, { scale: 1, opacity: 1, duration: 2.4, ease: 'power2.out' }, 0);

    /* 2 — Portrait rises: the main event */
    pTl.to(portraitImg, { y: 0, opacity: 1, duration: 1.6, ease: 'power3.out' }, 0.18);

    /* 3 — Text staircase left-to-right */
    const textEls = [heroEyebrow, heroH1Home, heroLead, heroCtas, metaBlock].filter(Boolean);
    textEls.forEach((el, i) => {
      pTl.to(el, { y: 0, opacity: 1, duration: 0.88, ease: 'power2.out' }, 0.28 + i * 0.13);
    });

    /* 4 — 2026 watermark drifts in last — phantom typographic depth */
    if (portraitMark) pTl.to(portraitMark, { x: 0, opacity: 0.13, duration: 2.2, ease: 'power2.out' }, 0.60);

    /* ── Multi-layer scroll parallax — Awwwards depth feel.
          Each layer moves at a different speed creating true z-axis depth.
          Portrait   : 18% of scroll speed  (deepest — barely moves)
          Mark       : 25% of scroll speed  (behind portrait)
          Glow       : 12% of scroll speed  (anchored to ground)
          Text col   : 8% of scroll speed   (closest — snappiest) */
    const heroEl = document.querySelector('.hero');
    if (heroEl) {
      /* Portrait — floats in the background */
      gsap.to(portraitImg, {
        y: '-18vh', ease: 'none', overwrite: 'auto',
        scrollTrigger: {
          trigger: heroEl, start: 'top top', end: 'bottom top',
          scrub: 1.0, invalidateOnRefresh: true,
        },
      });

      /* Glow — anchored to floor, barely moves */
      if (portraitGlow) {
        gsap.to(portraitGlow, {
          y: '-10vh', ease: 'none',
          scrollTrigger: {
            trigger: heroEl, start: 'top top', end: 'bottom top',
            scrub: 1.2, invalidateOnRefresh: true,
          },
        });
      }

      /* 2026 mark — intermediate depth */
      if (portraitMark) {
        gsap.to(portraitMark, {
          y: '-22vh', ease: 'none', overwrite: 'auto',
          scrollTrigger: {
            trigger: heroEl, start: 'top top', end: 'bottom top',
            scrub: 0.9, invalidateOnRefresh: true,
          },
        });
      }

      /* Text column — closest to viewer, moves the most */
      const heroTextCol = heroEl.querySelector('.grid > div:first-child');
      if (heroTextCol) {
        gsap.to(heroTextCol, {
          y: '-8vh', ease: 'none',
          scrollTrigger: {
            trigger: heroEl, start: 'top top', end: 'bottom top',
            scrub: 0.7, invalidateOnRefresh: true,
          },
        });
      }
    }
  }

  /* ── Hero parallax (bg image moves slower than content) */
  if (document.querySelector('.hero-cinema .hero-bg img')) {
    gsap.to('.hero-cinema .hero-bg img', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-cinema',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  /* ── BNP Jaquette entrance — cinématique (CVE 2026-04-30, confirmed).
     Reading rhythm : top→bottom, left→right, breathing pauses between headline
     weight changes. Ends on curiosity hook — Loewenstein information gap :
     names what happened without saying how. That gap IS the scroll desire.
     Tier 1 intensity — this is the film's opening frame, not a section reveal. */
  const hcxSection = document.querySelector('.hcx');
  if (hcxSection) {
    const hcxBg      = hcxSection.querySelector('.hcx__bg img');
    const hcxClient  = hcxSection.querySelector('.hcx__client');
    const hcxPeriod  = hcxSection.querySelector('.hcx__period');
    const hcxEyebrow = hcxSection.querySelector('.hcx__eyebrow');
    const hcxHl1     = hcxSection.querySelector('.hcx__hl1');
    const hcxHl2     = hcxSection.querySelector('.hcx__hl2');
    const hcxLead    = hcxSection.querySelector('.hcx__lead');
    const hcxRole    = hcxSection.querySelector('.hcx__role');
    const hcxKpis    = hcxSection.querySelector('.hcx__kpis');
    const hcxKpiCells = hcxSection.querySelectorAll('.hcx__kpi');
    const hcxScroll  = hcxSection.querySelector('.hcx__scroll');

    /* Set all elements invisible before curtain rises — synchronous, no flash */
    if (hcxBg)      gsap.set(hcxBg,      { scale: 1.18 });
    if (hcxClient)  gsap.set(hcxClient,  { opacity: 0, x: -20 });
    if (hcxPeriod)  gsap.set(hcxPeriod,  { opacity: 0, x: 20 });
    if (hcxEyebrow) gsap.set(hcxEyebrow, { opacity: 0, y: 16 });
    if (hcxHl1)     gsap.set(hcxHl1,     { opacity: 0, y: 36 });
    if (hcxHl2)     gsap.set(hcxHl2,     { opacity: 0, y: 48 });
    if (hcxLead)    gsap.set(hcxLead,    { opacity: 0, y: 20 });
    if (hcxRole)    gsap.set(hcxRole,    { opacity: 0, y: 18 });
    if (hcxKpis)    gsap.set(hcxKpis,    { opacity: 0, y: 26, filter: 'blur(8px)', visibility: 'hidden' });
    if (hcxKpiCells.length) gsap.set(hcxKpiCells, { opacity: 0, y: 14 });
    if (hcxScroll)  gsap.set(hcxScroll,  { opacity: 0, y: 10 });

    const hcxTl = gsap.timeline({ delay: 0.25 });

    /* t=0.0 — BG breathes in. Majestic, slow. The world establishes. */
    if (hcxBg)      hcxTl.to(hcxBg,      { scale: 1.04, duration: 1.60, ease: 'power3.out' }, 0);

    /* t=0.3 — Client name slides from left. Context anchors. */
    if (hcxClient)  hcxTl.to(hcxClient,  { opacity: 1, x: 0, duration: 0.70, ease: 'power2.out' }, 0.30);

    /* t=0.5 — Location slides from right. World named. */
    if (hcxPeriod)  hcxTl.to(hcxPeriod,  { opacity: 1, x: 0, duration: 0.60, ease: 'power2.out' }, 0.50);

    /* t=0.8 — Eyebrow. Sets the register : service design case study. */
    if (hcxEyebrow) hcxTl.to(hcxEyebrow, { opacity: 1, y: 0, duration: 0.60, ease: 'power2.out' }, 0.80);

    /* t=1.0 — "Enterprise" weight 200 floats up. Light. Hangs. */
    if (hcxHl1)     hcxTl.to(hcxHl1,     { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 1.00);

    /* t=1.2 — "Intelligence." weight 800, copper, lands heavy.
       200ms gap vs hl1 = the beat. Not mechanical, alive. */
    if (hcxHl2)     hcxTl.to(hcxHl2,     { opacity: 1, y: 0, duration: 1.00, ease: 'power3.out' }, 1.20);

    /* ── PAUSE 500ms : headline settles, brain decodes ── */

    /* t=1.7 — Lead : the promise. Why this matters. */
    if (hcxLead)    hcxTl.to(hcxLead,    { opacity: 1, y: 0, duration: 0.80, ease: 'power2.out' }, 1.70);

    /* ── PAUSE 500ms : stakes understood ── */

    /* t=2.2 — Role. Authority signal : freelance, upstream, 6 months. */
    if (hcxRole)    hcxTl.to(hcxRole,    { opacity: 1, y: 0, duration: 0.70, ease: 'power2.out' }, 2.20);

    /* t=2.65 — KPI bento : glass shell materialises from the bg first
       (blur clears, opacity rises), then the 4 cells cascade in narrative order
       S asymétrie · T VP · A research · R climax tease. */
    if (hcxKpis) {
      hcxTl.set(hcxKpis, { visibility: 'visible' }, 2.60);
      hcxTl.to(hcxKpis, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.05, ease: 'power3.out',
      }, 2.65);
    }
    if (hcxKpiCells.length) {
      hcxTl.to(hcxKpiCells, {
        opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.13,
      }, 3.05);
      /* Accent pulse on cell 2 (1/6 climax tease) — the last beat */
      const cellAccent = hcxKpiCells[1] && hcxKpiCells[1].querySelector('.hcx__kpi-num');
      if (cellAccent) {
        hcxTl.fromTo(cellAccent, { scale: 1 }, { scale: 1.10, duration: 0.24, ease: 'power3.out', yoyo: true, repeat: 1 }, 3.45);
      }
    }

    /* ── PAUSE 250ms : the bento lands ── */

    /* t=3.85 — Scroll cue last. The invitation. */
    if (hcxScroll)  hcxTl.to(hcxScroll,  { opacity: 1, y: 0, duration: 0.70, ease: 'power2.out' }, 3.85);

    /* ── Scroll parallax : BG image drifts slower than content */
    if (hcxBg) {
      gsap.to(hcxBg, {
        yPercent: 15, ease: 'none',
        scrollTrigger: {
          trigger: hcxSection, start: 'top top', end: 'bottom top',
          scrub: 1.2, invalidateOnRefresh: true,
        },
      });
    }
  }

  /* ── Chapter dividers : NATURAL FLOW pattern (CVE 2026-04-30 s2 — REBUILD).
        Previous version pinned scroll for 70% viewport. With 4 chapter dividers
        (S/T/A/R) + bridge to Luminus + horizontal pin sections, the page felt
        constantly stopped. CVE verbatim : "transitions importantes en plein
        milieu de storytelling — tout tuer et refaire."

        New approach : NO PIN. The divider is a tall section with a parallax
        roman letter (slow scale + opacity arc as user scrolls through) and
        meta content that reveals on scroll-in. Visitor scrolls continuously.
        The transition accompanies the narrative — it doesn't capture it. */
  document.querySelectorAll('.chapter-divider').forEach((chap) => {
    const roman = chap.querySelector('.chapter-roman');
    const meta = chap.querySelector('.chapter-meta');
    if (!roman || !meta) return;

    const metaChildren = meta.querySelectorAll('.chapter-label, .chapter-title, .chapter-lead');

    /* Roman letter : zoom-in dramatique sur les transitions STAR.
       La lettre vient de loin (scale 0.5), s'avance (scale 1.4 au pic),
       puis recule légèrement (1.1 quand on quitte). Climax R encore plus fort. */
    const isClimaxR = chap.dataset.chapter === 'R';
    const fromState = isClimaxR
      ? { scale: 0.45, opacity: 0.0, yPercent: 30 }
      : { scale: 0.55, opacity: 0.0, yPercent: 24 };
    const peakScale = isClimaxR ? 1.55 : 1.35;
    const peakOpacity = isClimaxR ? 0.46 : 0.32;
    /* Two-segment scrub : 0 → 50% : zoom-in (scale 0.55→peak, opacity 0→peak),
       50 → 100% : settle back (scale peak→1.0, opacity peak→0.10). */
    gsap.fromTo(roman, fromState, {
      keyframes: [
        { scale: peakScale, opacity: peakOpacity, yPercent: 0, duration: 0.5, ease: 'power2.out' },
        { scale: 1.0, opacity: 0.10, yPercent: -16, duration: 0.5, ease: 'power2.in' },
      ],
      ease: 'none',
      scrollTrigger: {
        trigger: chap,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.0,
        invalidateOnRefresh: true,
      },
    });

    /* Meta block : zoom-in subtle synchronised with roman peak — the title
       advances toward the viewer at the same moment the letter peaks. */
    gsap.fromTo(meta, { scale: 0.94 }, {
      scale: 1.0, ease: 'power2.out',
      scrollTrigger: {
        trigger: chap,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1.0,
        invalidateOnRefresh: true,
      },
    });

    /* Meta : single fade-up reveal when the meta block enters the comfortable
       reading zone. No scrub, no pin — just a clean entry. */
    gsap.fromTo(metaChildren,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.90, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: {
          trigger: meta,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      },
    );

    /* In-view class drives the CSS cuivre line draw across centerline */
    ScrollTrigger.create({
      trigger: chap,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter:     () => chap.classList.add('is-in-view'),
      onEnterBack: () => chap.classList.add('is-in-view'),
      onLeave:     () => chap.classList.remove('is-in-view'),
      onLeaveBack: () => chap.classList.remove('is-in-view'),
    });
  });

  /* ──────────────────────────────────────────────────────────
     STORYTELLING ORCHESTRATION — par acte STAR.
     Hiérarchie 3 tiers : Tier 1 hero (above) · Tier 2 act-level (here) · Tier 3 micro (count-up, hover).
     Chaque acte a son propre rythme. S = lent · T = build · A = rising · R = climax · Bridge = decrescendo.
     Splits sont différés dans onEnter pour cohabiter avec i18n async.
     ────────────────────────────────────────────────────────── */

  /* ── Act S — Observation : slow descent, suspense, qualitative reveals */
  function actS_brief() {
    const sec = document.querySelector('#brief');
    if (!sec) return;
    const title = sec.querySelector('h2');
    const leads = sec.querySelectorAll('.lead, .glance-sizing');
    if (title) {
      ScrollTrigger.create({
        trigger: title, start: 'top 82%', once: true,
        onEnter: () => {
          const lines = splitLines(title);
          if (!lines.length) return;
          gsap.fromTo(lines, { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.14 });
        },
      });
    }
    if (leads.length) {
      gsap.set(leads, { opacity: 0, y: 22 });
      gsap.to(leads, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.18,
        scrollTrigger: { trigger: leads[0], start: 'top 84%', toggleActions: 'play none none reverse' },
      });
    }
  }

  function actS_catalyst() {
    const sec = document.querySelector('#catalyst');
    if (!sec) return;
    const title = sec.querySelector('h2');
    const lead = sec.querySelector('.lead');
    if (title) {
      ScrollTrigger.create({
        trigger: title, start: 'top 82%', once: true,
        onEnter: () => {
          const lines = splitLines(title);
          if (!lines.length) return;
          gsap.fromTo(lines, { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.14 });
        },
      });
    }
    if (lead) {
      gsap.set(lead, { opacity: 0, y: 22 });
      gsap.to(lead, { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out',
        scrollTrigger: { trigger: lead, start: 'top 84%', toggleActions: 'play none none reverse' },
      });
    }
  }

  function actS_problem() {
    const sec = document.querySelector('#problem');
    if (!sec) return;
    const title = sec.querySelector('h2');
    const paras = sec.querySelectorAll('.lead, h3, h3 + p, .container > div > p');
    const figure = sec.querySelector('.figure');
    if (title) {
      ScrollTrigger.create({
        trigger: title, start: 'top 80%', once: true,
        onEnter: () => {
          const lines = splitLines(title);
          if (!lines.length) return;
          gsap.fromTo(lines, { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.16 });
        },
      });
    }
    if (paras.length) {
      gsap.set(paras, { opacity: 0, y: 20 });
      gsap.to(paras, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.10,
        scrollTrigger: { trigger: paras[0], start: 'top 84%', toggleActions: 'play none none reverse' },
      });
    }
    if (figure) {
      const img = figure.querySelector('img');
      if (img) {
        gsap.set(img, { scale: 1.06, opacity: 0 });
        gsap.to(img, { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out',
          scrollTrigger: { trigger: figure, start: 'top 82%', toggleActions: 'play none none reverse' },
        });
      }
    }
  }

  function actS_barriersIntro() {
    const sec = document.querySelector('.bi-slide');
    if (!sec) return;
    const els = [
      sec.querySelector('.bi-eyebrow'),
      sec.querySelector('.bi-title'),
      sec.querySelector('.bi-lead'),
      sec.querySelector('.bi-cue'),
    ].filter(Boolean);
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y: 24 });
    gsap.to(els, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.20,
      scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' },
    });
  }

  function actS_pq1() {
    const pq = document.querySelector('.pq-hero[data-act="S"]');
    if (!pq) return;
    const eyebrow = pq.querySelector('.pq-eyebrow');
    const quote = pq.querySelector('.pq-quote');
    if (eyebrow) {
      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: pq, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }
    if (quote) {
      ScrollTrigger.create({
        trigger: pq, start: 'top 75%', once: true,
        onEnter: () => {
          const words = splitWords(quote);
          if (!words.length) return;
          gsap.fromTo(words, { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.04, delay: 0.25 });
        },
      });
    }
  }

  actS_brief();
  actS_catalyst();
  actS_problem();
  actS_barriersIntro();
  actS_pq1();

  /* ── Act T — Proposition : energy build, roadmap cascade with bounce, accent reveal */
  function actT_roadmap() {
    const roadmap = document.querySelector('.roadmap-timeline');
    if (!roadmap) return;
    const title = roadmap.parentElement.querySelector('h3');
    const lead = roadmap.parentElement.querySelector('.lead');
    const eyebrow = roadmap.parentElement.querySelector('.eyebrow');
    const nodes = Array.from(roadmap.querySelectorAll('.rm:not(.rm-future)'));
    const futureNode = roadmap.querySelector('.rm-future');

    /* Eyebrow + h3 + lead first */
    [eyebrow, title, lead].filter(Boolean).forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 20 });
      gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.10,
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      });
    });

    /* Nodes 1-5 cascade with back ease */
    if (nodes.length) {
      gsap.set(nodes, { opacity: 0, y: 24, scale: 0.92 });
      gsap.to(nodes, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55, ease: 'back.out(1.4)', stagger: 0.16, delay: 0.2,
        scrollTrigger: { trigger: roadmap, start: 'top 78%', toggleActions: 'play none none reverse' },
      });

      const nums = nodes.map(n => n.querySelector('.rm-num')).filter(Boolean);
      if (nums.length) {
        gsap.set(nums, { scale: 0.55 });
        gsap.to(nums, {
          scale: 1, duration: 0.65, ease: 'back.out(2.2)', stagger: 0.16, delay: 0.32,
          scrollTrigger: { trigger: roadmap, start: 'top 78%', toggleActions: 'play none none reverse' },
        });
      }

      const phases = nodes.map(n => n.querySelector('.rm-phase')).filter(Boolean);
      if (phases.length) {
        gsap.set(phases, { opacity: 0 });
        gsap.to(phases, {
          opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.16, delay: 0.5,
          scrollTrigger: { trigger: roadmap, start: 'top 78%', toggleActions: 'play none none reverse' },
        });
      }
    }

    /* Future node (Scale 2020) — opacity-only fade, last, muted */
    if (futureNode) {
      gsap.set(futureNode, { opacity: 0 });
      gsap.to(futureNode, {
        opacity: 0.78, duration: 0.85, ease: 'power2.out', delay: 1.15,
        scrollTrigger: { trigger: roadmap, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    }
  }

  function actT_pq2() {
    const pq = document.querySelector('.pq-hero--accent');
    if (!pq) return;
    const eyebrow = pq.querySelector('.pq-eyebrow');
    const quote = pq.querySelector('.pq-quote');
    if (eyebrow) {
      gsap.set(eyebrow, { opacity: 0, y: 16 });
      gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: pq, start: 'top 78%', toggleActions: 'play none none reverse' },
      });
    }
    if (quote) {
      ScrollTrigger.create({
        trigger: pq, start: 'top 75%', once: true,
        onEnter: () => {
          const words = splitWords(quote);
          if (!words.length) return;
          gsap.fromTo(words, { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05, delay: 0.30 });
        },
      });
    }
  }

  actT_roadmap();
  actT_pq2();

  /* ── Act A — Démarche : steps counter overlay (01/06 → 06/06).
        The horizontal pin + per-panel 3D depth-field is already orchestrated
        by scroll-narrative.js. We add a numeric counter that breathes with
        the active panel. */
  function actA_stepsCounter() {
    const stepsSection = document.querySelector('#steps');
    if (!stepsSection) return;
    const panels = stepsSection.querySelectorAll('.h-panel-step');
    if (!panels.length) return;

    const counter = document.createElement('div');
    counter.className = 'steps-counter';
    counter.setAttribute('aria-hidden', 'true');
    counter.innerHTML =
      '<span class="steps-counter__current">01</span>' +
      '<span class="steps-counter__sep">/</span>' +
      '<span class="steps-counter__total">' + String(panels.length).padStart(2, '0') + '</span>';
    stepsSection.appendChild(counter);

    const currentEl = counter.querySelector('.steps-counter__current');
    let lastIdx = -1;

    const observer = new MutationObserver(() => {
      const active = stepsSection.querySelector('.h-panel-step.h-in-view');
      if (!active) return;
      const idx = Array.from(panels).indexOf(active);
      if (idx >= 0 && idx !== lastIdx) {
        lastIdx = idx;
        currentEl.textContent = String(idx + 1).padStart(2, '0');
        gsap.fromTo(currentEl, { y: 8, opacity: 0.4 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' });
      }
    });
    panels.forEach((p) => observer.observe(p, { attributes: true, attributeFilter: ['class'] }));
  }
  actA_stepsCounter();

  /* ── Act R — Climax : Léonidas quote split-text reveal + Triple-Win is already
        CSS-driven via .is-in class (handled by the existing block below).
        KPIs count-up is also already orchestrated below. */
  function actR_leoQuote() {
    const blockquote = document.querySelector('#result blockquote');
    if (!blockquote) return;
    const inner = blockquote.querySelector('[data-i18n-html="bnp.leo.quote"]');
    const target = inner || blockquote;
    ScrollTrigger.create({
      trigger: blockquote, start: 'top 78%', once: true,
      onEnter: () => {
        const words = splitWords(target);
        if (!words.length) return;
        gsap.fromTo(words, { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power4.out', stagger: 0.045 });
        /* Subtle flash : add and remove an accent class on the blockquote */
        blockquote.classList.add('is-punching');
        setTimeout(() => blockquote.classList.remove('is-punching'), 1200);
      },
    });
  }
  actR_leoQuote();

  /* ── Act R — CLIMAX stat block 6 / 1 / 0 (fin du double diamant).
        Reveal sequential : eyebrow → cell 6 → arrow → cell 1 (flash) → dot → cell 0 → caption.
        Count-up on each .climax-stat__num via data-count-to. The "1" gets the climax flash. */
  function actR_climaxStat() {
    const block = document.querySelector('.climax-stat');
    if (!block) return;
    const eyebrow = block.querySelector('.climax-stat__eyebrow');
    const cells = block.querySelectorAll('.climax-stat__cell');
    const seps = block.querySelectorAll('.climax-stat__sep');
    const caption = block.querySelector('.climax-stat__caption');

    /* Initial states */
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 16 });
    if (cells.length) gsap.set(cells, { opacity: 0, y: 28 });
    if (seps.length) gsap.set(seps, { opacity: 0, scale: 0.6 });
    if (caption) gsap.set(caption, { opacity: 0, y: 14 });

    ScrollTrigger.create({
      trigger: block, start: 'top 76%', once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
        /* Cells reveal in narrative order : 6 → 1 → 0, with arrows/dots between */
        const orderedReveals = [];
        if (cells[0]) orderedReveals.push({ el: cells[0], at: 0.30 });
        if (seps[0])  orderedReveals.push({ el: seps[0],  at: 0.55 });
        if (cells[1]) orderedReveals.push({ el: cells[1], at: 0.65 });
        if (seps[1])  orderedReveals.push({ el: seps[1],  at: 0.95 });
        if (cells[2]) orderedReveals.push({ el: cells[2], at: 1.05 });
        orderedReveals.forEach(({ el, at }) => {
          if (el.classList.contains('climax-stat__sep')) {
            tl.to(el, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2)' }, at);
          } else {
            tl.to(el, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, at);
          }
        });
        if (caption) tl.to(caption, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.45);

        /* Count-up on each numeric cell */
        block.querySelectorAll('.climax-stat__num').forEach((numEl, idx) => {
          const target = parseInt(numEl.dataset.countTo || numEl.textContent, 10);
          if (Number.isNaN(target)) return;
          const obj = { v: 0 };
          numEl.textContent = '0';
          /* Each count-up starts when its cell lands : 0.30 / 0.65 / 1.05 (idx 0,1,2) */
          const starts = [0.40, 0.78, 1.18];
          tl.to(obj, {
            v: target, duration: 0.85, ease: 'power3.out',
            onUpdate: () => { numEl.textContent = String(Math.round(obj.v)); },
            onComplete: () => { numEl.textContent = String(target); },
          }, starts[idx] || 0.4);
        });

        /* CLIMAX FLASH on the "1" cell — the promesse Léonidas */
        const accentCell = block.querySelector('.climax-stat__cell--accent');
        if (accentCell) {
          tl.fromTo(accentCell, { boxShadow: '0 0 0 0 rgba(199,105,65,0)' },
            { boxShadow: '0 0 0 8px rgba(199,105,65,0.18)', duration: 0.45, ease: 'power3.out',
              yoyo: true, repeat: 1 }, 1.05);
        }
      },
    });
  }
  actR_climaxStat();

  /* ── Act R — Frictions & Alignment section.
        4 cards stagger reveal, then pivot block (claim + outcome) lands as the resolution. */
  function actR_alignment() {
    const sec = document.querySelector('#alignment');
    if (!sec) return;
    const eyebrow = sec.querySelector('.eyebrow');
    const title = sec.querySelector('h2');
    const lead = sec.querySelector('.lead');
    const cards = sec.querySelectorAll('.align-card');
    const pivot = sec.querySelector('.alignment-pivot');
    const pivotClaim = pivot && pivot.querySelector('.alignment-pivot__claim');
    const pivotOutcome = pivot && pivot.querySelector('.alignment-pivot__outcome');

    [eyebrow, title, lead].filter(Boolean).forEach((el) => gsap.set(el, { opacity: 0, y: 22 }));
    if (cards.length) gsap.set(cards, { opacity: 0, y: 32 });
    if (pivot) gsap.set(pivot, { opacity: 0, y: 24 });
    if (pivotClaim) gsap.set(pivotClaim, { opacity: 0, y: 18 });
    if (pivotOutcome) gsap.set(pivotOutcome, { opacity: 0, y: 14 });

    /* Header reveals */
    [eyebrow, title, lead].filter(Boolean).forEach((el, i) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: i * 0.10,
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    });

    /* 4 cards stagger — narrative order Banking → IT → Legal → Marketing */
    if (cards.length) {
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.18,
        scrollTrigger: { trigger: cards[0], start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    }

    /* Pivot block — the resolution. Lands after cards, with claim then outcome. */
    if (pivot) {
      ScrollTrigger.create({
        trigger: pivot, start: 'top 80%', once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(pivot, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0);
          if (pivotClaim) tl.to(pivotClaim, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 0.25);
          if (pivotOutcome) tl.to(pivotOutcome, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.55);
        },
      });
    }
  }
  actR_alignment();

  /* ── Timeline intro (avant Act S) — line draws in + nodes pop sequential.
        Visual synthèse des 6 mois. The accent node (mars 2018 · 6/1/0) gets a beat. */
  function timelineIntro() {
    const tl = document.querySelector('.timeline-intro .ti-line');
    if (!tl) return;
    const eyebrow = document.querySelector('.timeline-intro .eyebrow');
    const nodes = tl.querySelectorAll('.ti-node');
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 14 });
    if (nodes.length) gsap.set(nodes, { opacity: 0, y: 18 });
    ScrollTrigger.create({
      trigger: tl, start: 'top 78%', once: true,
      onEnter: () => {
        const t = gsap.timeline();
        if (eyebrow) t.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0);
        /* Trigger the line draw-in via CSS var */
        t.call(() => tl.style.setProperty('--ti-fill', '1'), [], 0.20);
        /* Nodes pop sequentially as the line passes */
        if (nodes.length) {
          t.to(nodes, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.18 }, 0.30);
        }
        /* Beat on the accent node (mars 2018 · 6/1/0) */
        const accent = tl.querySelector('.ti-node--accent .ti-dot');
        if (accent) {
          t.fromTo(accent, { scale: 1 }, { scale: 1.5, duration: 0.25, ease: 'power3.out', yoyo: true, repeat: 1 }, 1.20);
        }
      },
    });
  }
  timelineIntro();

  /* ── Bridge section : phrase + sub fade in, watermark parallax */
  const bridgeEl = document.querySelector('.star-bridge');
  if (bridgeEl) {
    const phrase = bridgeEl.querySelector('.star-bridge__phrase');
    const sub = bridgeEl.querySelector('.star-bridge__sub');
    const watermark = bridgeEl.querySelector('.star-bridge__bg');

    if (watermark) {
      gsap.fromTo(watermark,
        { yPercent: 22, opacity: 0.05 },
        { yPercent: -22, opacity: 0.10, ease: 'none',
          scrollTrigger: { trigger: bridgeEl, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        },
      );
    }

    const bridgeReveals = [phrase, sub].filter(Boolean);
    if (bridgeReveals.length) {
      gsap.fromTo(bridgeReveals,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out', stagger: 0.18,
          scrollTrigger: { trigger: bridgeEl, start: 'top 72%', toggleActions: 'play none none reverse' },
        },
      );
    }
  }

  /* ── Fin Royale : close line, paths, signature — sequential entry */
  const finEl = document.querySelector('.fin-royale');
  if (finEl) {
    const finLine = finEl.querySelector('.fin-royale__line');
    const finPaths = finEl.querySelectorAll('.fin-royale__path');
    const finSig = finEl.querySelector('.fin-royale__signature');

    if (finLine) {
      gsap.fromTo(finLine,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.95, ease: 'power3.out',
          scrollTrigger: { trigger: finLine, start: 'top 78%', toggleActions: 'play none none reverse' },
        },
      );
    }

    if (finPaths.length) {
      gsap.fromTo(finPaths,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.14,
          scrollTrigger: { trigger: finPaths[0], start: 'top 82%', toggleActions: 'play none none reverse' },
        },
      );
    }

    if (finSig) {
      gsap.fromTo(finSig,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: finSig, start: 'top 90%', toggleActions: 'play none none reverse' },
        },
      );
    }
  }

  /* ── Roadmap timeline : draw-in the connecting amber line on scroll-in.
        The .rm nodes are already revealed by the generic scroll-reveal block below. */
  const roadmapEl = document.querySelector('.roadmap-timeline');
  if (roadmapEl) {
    ScrollTrigger.create({
      trigger: roadmapEl,
      start: 'top 78%',
      onEnter:     () => roadmapEl.style.setProperty('--rm-fill', '1'),
      onEnterBack: () => roadmapEl.style.setProperty('--rm-fill', '1'),
    });
  }

  /* ── Sprint 5 — Bridges + Fin Royale enrichments. */
  /* Lessons cards : staggered fade-up (Act R aftermath, between climax and bridge) */
  const lessonCards = document.querySelectorAll('.lesson-card');
  if (lessonCards.length) {
    gsap.set(lessonCards, { opacity: 0, y: 28 });
    gsap.to(lessonCards, {
      opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.18,
      scrollTrigger: { trigger: lessonCards[0], start: 'top 82%', toggleActions: 'play none none reverse' },
    });
  }

  /* Fin Royale : add .is-in class so the signature underline can draw via CSS */
  const finRoyaleEl = document.querySelector('.fin-royale');
  if (finRoyaleEl) {
    ScrollTrigger.create({
      trigger: finRoyaleEl, start: 'top 70%', once: true,
      onEnter: () => finRoyaleEl.classList.add('is-in'),
    });
  }

  /* ── Generic scroll reveals — fade + slight translate.
        EXCLUDED: .rm, .step (orchestrated by Act T / Act A), .figure (orchestrated by problem/result/etc). */
  const reveals = document.querySelectorAll('.pain, .stake, .stat, .dl, .case-card, blockquote:not(#result blockquote):not(.pq-quote), .qa .q, .luminus-needs li, .tldr-card');
  reveals.forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 24,
      duration: 0.75, ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

  /* ── Count-up on stats (timeline-orchestrated) */
  function parseNum(text) {
    const m = text.match(/([+\-]?)([\d,.]+)([^\d]*)/);
    if (!m) return null;
    const sign = m[1] === '-' ? -1 : 1;
    const raw = m[2].replace(/,/g, '');
    const value = parseFloat(raw);
    if (isNaN(value)) return null;
    const suffix = m[3] || '';
    const prefix = text.startsWith('+€') ? '+€' : (text.startsWith('€') ? '€' : (m[1] || ''));
    return { value: sign * value, prefix, suffix, hasComma: m[2].includes(','), original: text };
  }
  function formatNum(v, info) {
    let s;
    if (info.hasComma) s = Math.round(v).toLocaleString('en-US');
    else if (info.original.includes('k') || Number.isInteger(info.value)) s = Math.round(v) + '';
    else s = v.toFixed(1);
    return info.prefix + s + info.suffix;
  }

  document.querySelectorAll('.stat .num, .stat-leo .num').forEach((el) => {
    const info = parseNum(el.textContent.trim());
    if (!info) return;
    const obj = { v: 0 };
    el.textContent = formatNum(0, info);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: info.value,
          duration: 1.2,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = formatNum(obj.v, info); },
          onComplete: () => { el.textContent = info.original; },
        });
      },
    });
  });

  /* ── Triple-Win triangle assemble (already CSS-driven, just trigger class) */
  document.querySelectorAll('.triwin, .diamond-wrap').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 75%',
      once: true,
      onEnter: () => el.classList.add('is-in'),
    });
  });

  /* ── Smooth scroll on anchor links (Lenis takes over if available) */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  /* ── Refresh ScrollTrigger after fonts load (avoid layout-shift bugs) */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  /* ──────────────────────────────────────────────────────────
     Fallback: no GSAP → simple IO reveal
     ────────────────────────────────────────────────────────── */
  function fallbackIO() {
    const targets = document.querySelectorAll('.figure, .pain, .stake, .stat, .stat-leo, .step, .rm, .dl, .triwin, .case-card, blockquote, .qa .q, .luminus-needs li, .tldr-card, .diamond-wrap');
    targets.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
  }
})();
