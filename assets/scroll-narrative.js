/* Scroll narrative — Apple-style vertical → pin → horizontal → release → vertical.
   Reusable engine: any <section data-h-pin> with .h-track > .h-panel children
   gets pinned vertically, scrolled horizontally, snapped per panel.
   Mobile + reduced-motion: vertical stack natural.
*/
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.matchMedia('(max-width: 1180px)').matches;

  function whenReady(fn) {
    if (window.gsap && window.ScrollTrigger) return fn();
    let tries = 0;
    const tick = () => {
      if (window.gsap && window.ScrollTrigger) return fn();
      if (++tries > 60) return; /* ~6s timeout, fallback to natural stack */
      setTimeout(tick, 100);
    };
    tick();
  }

  function init() {
    if (!document.querySelectorAll('[data-h-pin]').length) return;
    /* CVE 2026-05-04 v3 · scroll horizontal désactivé. L'utilisateur a demandé
       partout du top-down, plus de L→R. On force h-stack systématiquement,
       les phase-rails deviennent une simple pile verticale de panels. */
    document.querySelectorAll('[data-h-pin]').forEach((s) => s.classList.add('h-stack'));
  }

  function setupSection(section) {
    const track = section.querySelector('.h-track');
    const panels = section.querySelectorAll('.h-panel');
    if (!track || panels.length < 2) return;

    section.classList.add('h-active');
    const tot = panels.length;

    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    /* CVE 2026-05-03 : pipeline allégée pour fluidité.
       Avant : snap directionnel (force la position) + scrub 0.55 (saccadé)
       + parallax slow/fast par panel + depth-z 3D coûteux + zoom-out d'entrée.
       Le scroll se sentait "bloqué" et "lourd" au défilement.

       Après : pas de snap (l'utilisateur contrôle son rythme), scrub 1.0 pour
       suivre le doigt sans à-coups, depth-z plus subtil (pas de blur, pas de
       rotateY), pas de parallax interne, pas de zoom d'entrée. */

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 1.0,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    /* Per-panel reveal : fade-up simple, scrub doux. */
    panels.forEach((panel) => {
      const reveals = panel.querySelectorAll('.h-reveal');
      if (!reveals.length) return;
      reveals.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: () => `left+=${i * 20} right`,
              end: 'left+=60 center',
              scrub: 1.0,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    /* Depth-z subtil — scale + opacity uniquement. Pas de blur ni rotateY
       (trop coûteux + crée du "tremblement" visuel pendant le scroll). */
    const lastIdx = panels.length - 1;
    panels.forEach((panel, idx) => {
      const inner = panel.querySelector('.h-panel-inner');
      if (!inner) return;
      const isFirst = idx === 0;
      const isLast = idx === lastIdx;

      if (isFirst) {
        gsap.set(inner, { scale: 1, opacity: 1 });
      } else {
        gsap.fromTo(inner,
          { scale: 0.86, opacity: 0.4 },
          {
            scale: 1, opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'left center',
              scrub: 1.0,
              invalidateOnRefresh: true,
            },
          });
      }
      if (!isLast) {
        gsap.fromTo(inner,
          { scale: 1, opacity: 1 },
          {
            scale: 0.86, opacity: 0.4,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'right center',
              end: 'right left',
              scrub: 1.0,
              invalidateOnRefresh: true,
            },
          });
      }
    });

    /* Active-panel state class + progress dots */
    const dotsEl = section.querySelector('.h-progress');
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        containerAnimation: tween,
        start: 'left center',
        end: 'right center',
        onToggle: (self) => {
          if (!self.isActive) return;
          panels.forEach((p, j) => p.classList.toggle('h-in-view', j === i));
          if (dotsEl && dotsEl.children.length === tot) updateDots(dotsEl, i);
        },
      });
    });
    /* Initial state : first panel is in view */
    if (panels[0]) panels[0].classList.add('h-in-view');
    if (dotsEl && dotsEl.children.length === tot) updateDots(dotsEl, 0);
  }

  function updateDots(dotsEl, activeIdx) {
    [...dotsEl.children].forEach((dot, i) => {
      dot.classList.toggle('is-active', i === activeIdx);
      dot.classList.toggle('is-past', i < activeIdx);
    });
  }

  /* Refresh on resize (debounced) */
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, 220);
  });

  /* Boot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => whenReady(() => setTimeout(init, 80)));
  } else {
    whenReady(() => setTimeout(init, 80));
  }
})();
