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
    const hcxBentoCells = hcxSection.querySelectorAll('.hcx__bento-cell');
    const hcxHook    = hcxSection.querySelector('.hcx__hook');
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
    if (hcxBentoCells.length) gsap.set(hcxBentoCells, { opacity: 0, y: 22, scale: 0.96 });
    if (hcxHook)    gsap.set(hcxHook,    { opacity: 0, y: 12 });
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

    /* t=2.6 — Bento cells stagger. 4 receipts landing, each one concrete. */
    if (hcxBentoCells.length) {
      hcxTl.to(hcxBentoCells, {
        opacity: 1, y: 0, scale: 1,
        duration: 0.60, ease: 'power2.out',
        stagger: 0.12,
      }, 2.60);
    }

    /* ── PAUSE 600ms : numbers land, eyebrows raise ── */

    /* t=3.2 — Curiosity hook. Italic, quiet, irresistible.
       Information gap : names the transformation without explaining it. */
    if (hcxHook)    hcxTl.to(hcxHook,    { opacity: 1, y: 0, duration: 0.90, ease: 'power2.out' }, 3.20);

    /* t=3.5 — Scroll cue last. The invitation. */
    if (hcxScroll)  hcxTl.to(hcxScroll,  { opacity: 1, y: 0, duration: 0.70, ease: 'power2.out' }, 3.50);

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

    /* Roman letter : slow parallax. Scale 0.92 → 1.18, opacity 0.08 → 0.28,
       y +18% → -18%. The letter breathes through the section. */
    gsap.fromTo(roman,
      { scale: 0.92, opacity: 0.08, yPercent: 18 },
      { scale: 1.18, opacity: 0.28, yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: chap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      },
    );

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

  /* ── Generic scroll reveals — fade + slight translate */
  const reveals = document.querySelectorAll('.figure, .pain, .stake, .stat, .stat-leo, .step, .rm, .dl, .case-card, blockquote, .qa .q, .luminus-needs li, .tldr-card');
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
