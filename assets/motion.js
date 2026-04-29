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

  /* ── Chapter dividers : ZOOM-PORTAL pattern (CVE 2026-04-30 spec).
        Pattern : user scrolls down → divider pins → numeral scales 1 → 4 (zoom-in
        effect, "entering the chapter") → meta reveals at peak → both fade out as
        pin releases → next section (often horizontal-pin content) takes over.
        Mobile / reduced-motion : skip pin, simple parallax. */
  const isMobileForChapter = window.matchMedia('(max-width: 900px)').matches;
  if (!isMobileForChapter) {
    document.querySelectorAll('.chapter-divider').forEach((chap) => {
      const roman = chap.querySelector('.chapter-roman');
      const meta = chap.querySelector('.chapter-meta');
      if (!roman || !meta) return;

      const metaChildren = meta.querySelectorAll('.chapter-label, .chapter-title, .chapter-lead');

      /* Pin the divider for ~1 viewport. Inside the pin, run a timeline that :
            0.0 → 0.55 : numeral scales 1 → 4, opacity 0.13 → 0.55 (zoom-in)
            0.10 → 0.55 : meta children fade in staggered
            0.55 → 1.0 : both fade out (handing off to next section) */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: chap,
          start: 'top top',
          end: '+=70%',           /* pin for ~0.7 viewport — tighter, less dead scroll */
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      /* Zoom velocity : smooth in-out so the numeral swells evenly, without
         the abrupt lurch of a pure power3.in. Meta reads comfortably before exit. */
      tl.fromTo(roman,
        { scale: 1.0, opacity: 0.10 },
        { scale: 3.6, opacity: 0.48, ease: 'power2.inOut' }, 0);
      tl.fromTo(metaChildren,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, stagger: 0.07, ease: 'power2.out' }, 0.10);
      /* Phase fade-through : gentle exit, gives meta a beat to be read */
      tl.to(roman, { opacity: 0, scale: 5.0, ease: 'power1.in' }, 0.62);
      tl.to(metaChildren, { opacity: 0, y: -16, stagger: 0.04, ease: 'power2.in' }, 0.62);

      /* In-view class for CSS-driven cuivre line + ambient hue */
      ScrollTrigger.create({
        trigger: chap,
        start: 'top 70%',
        end: 'bottom 30%',
        onEnter: () => chap.classList.add('is-in-view'),
        onEnterBack: () => chap.classList.add('is-in-view'),
        onLeave: () => chap.classList.remove('is-in-view'),
        onLeaveBack: () => chap.classList.remove('is-in-view'),
      });
    });
  } else {
    /* Touch fallback : simple scrub parallax, no pin */
    document.querySelectorAll('.chapter-divider').forEach((chap) => {
      const roman = chap.querySelector('.chapter-roman');
      const meta = chap.querySelector('.chapter-meta');
      if (!roman || !meta) return;
      gsap.fromTo(roman,
        { yPercent: -8, opacity: 0.10, scale: 1.0 },
        { yPercent: 8, opacity: 0.30, scale: 1.4,
          ease: 'none',
          scrollTrigger: { trigger: chap, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      const metaChildren = meta.querySelectorAll('.chapter-label, .chapter-title, .chapter-lead');
      gsap.from(metaChildren, {
        opacity: 0, y: 30, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: chap, start: 'top 75%', toggleActions: 'play none none reverse' },
      });
    });
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
