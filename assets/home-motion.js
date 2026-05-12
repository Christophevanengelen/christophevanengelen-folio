/* CVE 2026-05-11 · home-motion.js · Apple-tier motion pour index.html
 *
 * Stack · Lenis (smooth scroll) + GSAP + ScrollTrigger
 * Référence · Apple MacBook Pro page · easing expo.out, parallax depth,
 *           word-by-word reveal, cinematic intro.
 *
 * Pourquoi un fichier dédié · assets/motion.js fait 2200+ lignes pour les
 * cases (chap-dividers, h-pin, sticky-nav-map, cinematic intro long-form).
 * La home a besoin d'un sous-ensemble propre · Lenis + reveal hero + parallax
 * portrait + smooth-scroll anchors + reduce-motion guard.
 */
(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';
  const hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';

  if (hasGsap && hasST) {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ──────────────────────────────────────────────────────────
     Apple easing · cubic-bezier(0.16, 1, 0.3, 1) "ease-out-expo"
     Registration GSAP custom · utilisable via `ease: "apple"`
     ────────────────────────────────────────────────────────── */
  if (hasGsap) {
    /* CustomEase n'est pas dans gsap.min · on utilise expo.out qui est
       l'équivalent natif le plus proche (1.001 - pow(2, -10x)). */
  }
  const APPLE_EASE = 'expo.out';
  const APPLE_EASE_INOUT = 'expo.inOut';

  /* ──────────────────────────────────────────────────────────
     1. Lenis smooth scroll (Apple buttery feel)
     ────────────────────────────────────────────────────────── */
  let lenis = null;
  if (hasLenis && !reducedMotion) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple ease-out-expo
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    /* Smooth-scroll sur les anchors internes */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -40, duration: 1.2 });
        }
      });
    });
  }

  if (reducedMotion || !hasGsap) {
    /* Sans GSAP ou reduce-motion · on rend tout visible et on sort */
    document.querySelectorAll('.home-hero__eyebrow, .home-hero__h1, .home-hero__h1 .home-hero__alt, .home-hero__status, .home-hero__lead, .home-hero__avail, .home-hero__portrait').forEach((el) => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
    return;
  }

  /* ──────────────────────────────────────────────────────────
     2. Cinematic hero reveal · Apple-tier
     · portrait fade-in + parallax sur scroll
     · H1 word-by-word stagger avec mask reveal
     · eyebrow + status + lead + CTA cascade
     ────────────────────────────────────────────────────────── */

  /* Pre-set initial state · tout invisible avant intro */
  const heroEyebrow = document.querySelector('.home-hero__eyebrow');
  const heroH1 = document.querySelector('.home-hero__h1');
  const heroStatus = document.querySelector('.home-hero__status');
  const heroLead = document.querySelector('.home-hero__lead');
  const heroAvail = document.querySelector('.home-hero__avail');
  const heroPortraitFig = document.querySelector('.home-hero__portrait');
  const heroPortraitImg = heroPortraitFig ? heroPortraitFig.querySelector('img') : null;

  /* Word-split H1 · enveloppe chaque mot dans un span pour stagger reveal.
     Préserve les <br> et les <span class="home-hero__alt"> existants. */
  function wordSplitNode(node) {
    if (!node) return [];
    const allSpans = [];
    /* Parcours en profondeur · pour chaque text node on splitte par espaces
       et on enveloppe chaque mot dans un span.word. Les autres nodes (br, span.alt)
       sont préservés. */
    function walk(n) {
      const children = Array.from(n.childNodes);
      children.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent;
          if (!text.trim()) return;
          const frag = document.createDocumentFragment();
          const words = text.split(/(\s+)/);
          words.forEach((w) => {
            if (/^\s+$/.test(w)) {
              frag.appendChild(document.createTextNode(w));
            } else if (w.length) {
              const wrap = document.createElement('span');
              wrap.className = 'word';
              wrap.style.display = 'inline-block';
              wrap.style.overflow = 'hidden';
              const inner = document.createElement('span');
              inner.className = 'word-inner';
              inner.style.display = 'inline-block';
              inner.textContent = w;
              wrap.appendChild(inner);
              frag.appendChild(wrap);
              allSpans.push(inner);
            }
          });
          n.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          /* Recurse dans les <span> (notamment .home-hero__alt) */
          walk(child);
        }
      });
    }
    walk(node);
    return allSpans;
  }

  /* Hero reveal simple et robuste · pas de word-split (instable avec i18n swap).
     Cinematic cascade · portrait zoom-out + cascade fade-up sur les éléments texte.
     Apple-tier mais sans le mask reveal word-by-word qui foirait. */
  function setupHero() {
    if (!heroH1) return;

    /* Timeline · cinematic intro avec gsap.from (rend visible par défaut si crash) */
    const tl = gsap.timeline({ delay: 0.1, defaults: { ease: APPLE_EASE } });

    /* Portrait · fade-in pur, smooth & classique
       · pas de brightness, pas de scale qui clash
       · l'image apparaît, point. */
    if (heroPortraitImg) {
      tl.from(heroPortraitImg, {
        opacity: 0,
        duration: 1.8,
      }, 0);
    }

    /* Eyebrow · soft fade-up */
    if (heroEyebrow) {
      tl.from(heroEyebrow, { opacity: 0, y: 20, duration: 0.9 }, 0.2);
    }

    /* H1 · cinematic clip-path reveal (mask bottom-up) */
    tl.from(heroH1, {
      opacity: 0, yPercent: 8, clipPath: 'inset(0 0 100% 0)',
      duration: 1.4,
    }, 0.35);

    /* Status pill · fade-up + petit scale */
    if (heroStatus) {
      tl.from(heroStatus, { opacity: 0, y: 14, scale: 0.96, duration: 0.7 }, 0.95);
    }

    /* Lead · fade-up */
    if (heroLead) {
      tl.from(heroLead, { opacity: 0, y: 18, duration: 0.8 }, 1.1);
    }

    /* CTA · fade-up final */
    if (heroAvail) {
      tl.from(heroAvail, { opacity: 0, y: 14, duration: 0.7 }, 1.3);
    }

    /* Portrait parallax scroll · subtle Y offset sur scroll · Apple depth feel */
    if (hasST && heroPortraitImg) {
      gsap.to(heroPortraitImg, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.home-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.7,
        },
      });
    }
  }

  /* Lance le setup après i18n swap · DOMContentLoaded + 100ms safety */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(setupHero, 100));
  } else {
    setTimeout(setupHero, 100);
  }

  /* SAFETY · si une erreur empêche le reveal, on rend tout visible après 4s */
  setTimeout(() => {
    document.querySelectorAll('.home-hero__eyebrow, .home-hero__h1, .home-hero__status, .home-hero__lead, .home-hero__avail').forEach((el) => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
    const port = document.querySelector('.home-hero__portrait img');
    if (port && getComputedStyle(port).opacity === '0') {
      port.style.opacity = '1';
      port.style.transform = 'none';
      port.style.filter = 'none';
    }
  }, 4000);

  /* ──────────────────────────────────────────────────────────
     3. Fade-up des cards Trust / Cases / Testimonials / Formats / Fit
     ────────────────────────────────────────────────────────── */
  if (hasST) {
    const fadeUpTargets = [
      '.home-trust__list .home-trust__item',
      '.home-cases .home-case',
      '.home-testimonial__card',
      '.home-practice__line',
      '.home-formats__card',
      '.home-fit__col',
      '.home-track__item',
      '.home-about__bio p',
      '.home-faq__item',
      '.home-awards__item',
    ];

    fadeUpTargets.forEach((selector) => {
      const items = document.querySelectorAll(selector);
      if (!items.length) return;
      items.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 1.0,
            ease: APPLE_EASE,
            delay: Math.min(i, 6) * 0.06,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
      });
    });

    /* Big h2 · mask reveal cinematic */
    document.querySelectorAll('.home-cases__h2, .home-testimonial__h2, .home-practice__h2, .home-formats__h2, .home-fit__h2, .home-track__h2, .home-about__h2, .home-faq__h2, .home-contact__h2, .home-awards__h2').forEach((h) => {
      gsap.fromTo(h,
        { clipPath: 'inset(0 0 100% 0)', y: 16, opacity: 0 },
        {
          clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1,
          duration: 1.1,
          ease: APPLE_EASE,
          scrollTrigger: {
            trigger: h,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
    });
  }
})();
