/* Scroll narrative — Apple-style vertical → pin → horizontal → release → vertical.
   Reusable engine: any <section data-h-pin> with .h-track > .h-panel children
   gets pinned vertically, scrolled horizontally, snapped per panel.
   Mobile + reduced-motion: vertical stack natural.
*/
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

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

    if (reduce) {
      /* Reduced motion : skip the horizontal pin entirely, stack vertically */
      document.querySelectorAll('[data-h-pin]').forEach((s) => s.classList.add('h-stack'));
      return;
    }

    if (isMobile()) {
      /* Mobile : stack vertically, no pin (swipe conflicts) */
      document.querySelectorAll('[data-h-pin]').forEach((s) => s.classList.add('h-stack'));
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll('[data-h-pin]').forEach(setupSection);
  }

  function setupSection(section) {
    const track = section.querySelector('.h-track');
    const panels = section.querySelectorAll('.h-panel');
    if (!track || panels.length < 2) return;

    section.classList.add('h-active');
    const tot = panels.length;

    const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.55,                 /* 0.7 → 0.55 : more responsive to thumb */
        invalidateOnRefresh: true,
        anticipatePin: 1,
        snap: tot > 1 ? {
          snapTo: 1 / (tot - 1),
          duration: { min: 0.16, max: 0.36 },
          delay: 0.08,               /* 0.12 → 0.08 : auto-guided feel */
          ease: 'power2.out',        /* magnetic landing */
          directional: true,
          inertia: false,
        } : undefined,
      },
    });

    /* Per-panel reveal: scrub-tied so elements breathe in sync with the scroll
       (as the panel slides into the viewport, contents reveal proportionally).
       Reverses gracefully if user scrolls back. */
    panels.forEach((panel) => {
      const reveals = panel.querySelectorAll('.h-reveal');
      if (!reveals.length) return;
      reveals.forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: () => `left+=${i * 28} right`,
              end: 'left+=80 center',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    });

    /* Depth-z entrance/exit — each panel emerges from the background as it
       approaches center, recedes as it leaves. Creates the "carousel from the
       back" effect (CVE 2026-04-30 spec). Scrub-tied so it feels enchaîné.
       FIX 2026-04-30 night : panel 1 starts at full state (already at center
       on section entry, no entrance needed); panel N exits to back. */
    const lastIdx = panels.length - 1;
    panels.forEach((panel, idx) => {
      const inner = panel.querySelector('.h-panel-inner');
      if (!inner) return;

      const isFirst = idx === 0;
      const isLast = idx === lastIdx;

      if (isFirst) {
        /* Panel 1 : initial full state, no entrance animation */
        gsap.set(inner, { scale: 1, opacity: 1, filter: 'blur(0px)', z: 0, rotationY: 0 });
      } else {
        /* Entering : depth-field 3D — panel comes from far back, rotates
           subtly into frontal alignment, focuses (blur clears).
           Inner uses translateZ + slight rotateY for the "field effect 3D" feel
           CVE 2026-04-30 night spec : "super classe". */
        gsap.fromTo(inner,
          { scale: 0.62, opacity: 0.18, filter: 'blur(3.5px)', z: -360, rotationY: -6 },
          {
            scale: 1, opacity: 1, filter: 'blur(0px)', z: 0, rotationY: 0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'left center',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
      }

      if (!isLast) {
        /* Leaving : recedes back into depth, mirrors the entrance for visual
           symmetry. Front → far back with rotateY in opposite direction. */
        gsap.fromTo(inner,
          { scale: 1, opacity: 1, filter: 'blur(0px)', z: 0, rotationY: 0 },
          {
            scale: 0.74, opacity: 0.30, filter: 'blur(2.5px)', z: -240, rotationY: 6,
            ease: 'power3.in',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'right center',
              end: 'right left',
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
      }
    });

    /* Section entry effect : slight zoom-out (1.06 → 1) when the pinned section
       enters viewport. Mimics "emerging from the chapter portal" — the section
       feels like it pulls forward from depth into clarity. (reuses `track` from
       line 43 above) */
    if (track) {
      gsap.fromTo(track,
        { scale: 1.06, opacity: 0.85 },
        {
          scale: 1, opacity: 1,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 0.6,
          },
        });
    }

    /* Per-panel parallax — title slow, visual fast (depth) */
    panels.forEach((panel) => {
      const slow = panel.querySelectorAll('.h-parallax-slow');
      const fast = panel.querySelectorAll('.h-parallax-fast');
      if (slow.length) {
        gsap.fromTo(slow, { x: 60 }, {
          x: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
      if (fast.length) {
        gsap.fromTo(fast, { x: 140 }, {
          x: -140,
          ease: 'none',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left right',
            end: 'right left',
            scrub: true,
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
