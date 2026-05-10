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

  /* ════════════════════════════════════════════════════════════════════════
     wrapPhaseRails · CVE 2026-05-03 v10 · MOTION GRAMMAR CANONIQUE
     ════════════════════════════════════════════════════════════════════════
     Règle absolue (cf memory/feedback_motion_grammar_canonique.md) :
       - TOP-DOWN ONLY au passage d'un chap-divider
       - L→R partout dans une phase (h-pin scroll)

     Cette fonction groupe automatiquement les sections entre 2 chap-dividers
     en un seul rail <section data-h-pin> avec <div class="h-track">. Chaque
     section interne devient un .h-panel. Le moteur scroll-narrative.js prend
     le relais et anime le pin horizontal.

     Cas spécial #barriers (legacy h-pin imbriqué) : flatten · ses .h-panel
     enfants sont déplacés comme siblings dans le rail parent.

     Skipped (rest vertical) : .fin-royale (close · pas une phase).

     Mobile (<900px) + reduced-motion : pas de wrapping · sections empilées
     verticalement comme avant. Le moteur scroll-narrative.js applique déjà
     .h-stack dans ces cas, donc cohérent.
     ════════════════════════════════════════════════════════════════════════ */
  const isMobileForRail = window.matchMedia('(max-width: 1180px)').matches;
  if (!reduce && !isMobileForRail) {
    wrapPhaseRails();
  }

  function wrapPhaseRails() {
    /* Boundaries narratifs · 6 chap-dividers · entre chacun = une phase */
    const boundaries = Array.from(document.querySelectorAll('.chapter-divider, .chap-vp-statement'));
    if (boundaries.length === 0) return;

    boundaries.forEach((boundary, i) => {
      const next = boundaries[i + 1];
      const phaseSections = [];
      let cursor = boundary.nextElementSibling;
      while (cursor && cursor !== next) {
        if (cursor.tagName === 'SECTION') {
          /* Skip fin-royale (close vertical · pas une phase) */
          if (cursor.classList.contains('fin-royale')) break;
          /* CVE 2026-05-04 fix responsive : opt-out par section riche.
             data-rail="vertical" reste vertical et est exclue du wrap horizontal.
             Évite le crop des sections > 100vh dans le wrap forcé. */
          if (cursor.dataset.rail === 'vertical') {
            cursor = cursor.nextElementSibling;
            continue;
          }
          phaseSections.push(cursor);
        }
        cursor = cursor.nextElementSibling;
      }
      if (phaseSections.length === 0) return;

      /* Crée le rail wrapper */
      const rail = document.createElement('section');
      rail.dataset.hPin = '';
      rail.className = 'phase-rail';
      rail.id = 'phase-rail-' + (boundary.id || ('after-' + i));

      const track = document.createElement('div');
      track.className = 'h-track';
      rail.appendChild(track);

      /* Insère le rail juste avant la 1re section de phase */
      phaseSections[0].parentNode.insertBefore(rail, phaseSections[0]);

      /* Move chaque section dans le track comme .h-panel
         · Si la section est elle-même un h-pin existant (ex #barriers),
           on flatten ses .h-panel enfants au lieu de la nester. */
      phaseSections.forEach((sec) => {
        if (sec.hasAttribute('data-h-pin')) {
          const innerPanels = sec.querySelectorAll(':scope > .h-track > .h-panel');
          innerPanels.forEach((p) => track.appendChild(p));
          sec.remove();
        } else {
          sec.classList.add('h-panel');
          track.appendChild(sec);
        }
      });
    });
  }

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
    /* CVE 2026-05-03 v9 · Lenis pilote UNIQUE via gsap.ticker.
       Avant : double pilote (rAF perso + gsap.ticker) qui faisait Lenis tick
       deux fois par frame → drift, micro-jitter. Fix audit Senior Dev. */
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => { lenis.raf(time * 1000); });
      /* lagSmoothing retiré · protège tab refocus contre saut massif Lenis */
    } else {
      /* Fallback rAF si pas de GSAP */
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
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

  /* STAR menu progress (legacy) — neutralisé puisque le STAR menu est remplacé
     par .story-nav. Le data-act marker reste utile pour les CSS hooks act-level. */

  /* STORYLINE — UNE SEULE timeline qui vit dans #proposed-roadmap (rencontre)
     puis se transforme en sticky compact au passage. Pas de duplication. */
  const storyNav = document.querySelector('.storyline');
  const placeholder = document.querySelector('.storyline-placeholder');
  const proposedEl = document.querySelector('#proposed-roadmap');
  if (storyNav && proposedEl) {
    /* CVE 2026-04-30 : sticky doit se positionner JUSTE EN DESSOUS de la top-nav,
       pleine largeur, jamais overlap. On lit la hauteur de la top-nav existante
       et on l'expose comme variable CSS --top-nav-h. */
    const measureTopNav = () => {
      /* CVE 2026-05-04 v8 · selector élargi à nav.top (le sélecteur réel utilisé
         dans bnp.html / speos.html). Avant : on ne matchait rien et le fallback 64
         écrasait la top nav 77px réelle. */
      const topNav = document.querySelector('nav.top, .topnav, .top-nav, header.site-header, [data-topnav]');
      const h = topNav ? Math.ceil(topNav.getBoundingClientRect().height) : 64;
      document.documentElement.style.setProperty('--top-nav-h', h + 'px');
      return h;
    };
    let topNavH = measureTopNav();
    window.addEventListener('resize', () => { topNavH = measureTopNav(); }, { passive: true });

    /* CVE 2026-04-30 update : la storyline default in-flow est retirée (display: none).
       Le placeholder n'a plus de raison d'occuper de la hauteur — l'élément n'a jamais
       été dans le flow. On ne touche plus au placeholder. */
    const setStuck = (on) => {
      if (on) storyNav.classList.add('is-stuck');
      else storyNav.classList.remove('is-stuck');
      /* Recalcule l'underline magique APRÈS la fin de l'animation storyline-emerge.
         Pendant l'anim (scaleX 0.45→1, 650ms), getBoundingClientRect renvoie des
         largeurs déformées par le transform — on attend que le layout soit stable.
         Multi-pass : raf + 100ms + 700ms (post-anim) pour être sûr. */
      const passes = [0, 100, 700];
      passes.forEach((delay) => {
        setTimeout(() => {
          if (typeof updateUnderline === 'function') updateUnderline(currentPhaseIdx);
        }, delay);
      });
    };
    /* CVE 2026-05-03 v6 FINAL · sticky nav PAR LISTENER MANUEL (pas ScrollTrigger).
       Robuste contre Lenis / smooth scroll / refresh issues. Sticky ON dès que
       hero exits, OFF seulement quand l'user atteint le bas absolu de la page. */
    const finRoyaleEl = document.querySelector('.fin-royale');
    const heroEl = document.querySelector('.hcx');
    const updateStuck = () => {
      if (!heroEl) return;
      const heroBottom = heroEl.getBoundingClientRect().bottom;
      const shouldStick = heroBottom < (topNavH + 4);
      /* Désactive seulement si l'user a scrollé tout en bas de fin-royale ET
         que le bas de fin-royale est dans le viewport (= close lue). */
      let pastClose = false;
      if (finRoyaleEl) {
        const finBottom = finRoyaleEl.getBoundingClientRect().bottom;
        pastClose = finBottom < window.innerHeight * 0.5;  /* fin-royale.bottom au-dessus du milieu du viewport */
      }
      const target = shouldStick && !pastClose;
      if (target !== storyNav.classList.contains('is-stuck')) {
        setStuck(target);
      }
    };
    let stuckTicking = false;
    const onStuckScroll = () => {
      if (stuckTicking) return;
      stuckTicking = true;
      requestAnimationFrame(() => {
        stuckTicking = false;
        updateStuck();
      });
    };
    window.addEventListener('scroll', onStuckScroll, { passive: true });
    window.addEventListener('resize', onStuckScroll, { passive: true });
    updateStuck();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateStuck);
    window.addEventListener('load', updateStuck, { once: true });
    /* ──────────────────────────────────────────────────────────────────────
       STORYLINE PHASE TRACKING (CVE 2026-05-03 · refonte robuste v3)

       Stratégie : on abandonne ScrollTrigger pour le tracking de phase.
       Avec les pins horizontaux (#barriers, 5 viewports de pinSpacing) et
       les chap-dividers superposés, ScrollTrigger calcule mal les positions
       cachées des triggers de phase (résultat : la sticky nav saute à la
       phase suivante en plein milieu du contenu d'une phase).

       Nouveau modèle, déterministe et indépendant de tout pin/refresh :

         À chaque scroll, on regarde quelle section a son top au-dessus de
         la "ligne de lecture" (50% viewport). On itère les sections dans
         l'ordre du DOM ; la dernière qui satisfait la condition = celle
         que l'utilisateur est en train de lire. Sa phase + son jalon
         deviennent actifs.

       Les chap-X dividers sont eux aussi des "ancres de phase" : quand le
       chap-X est croisé en lecture, la phase X démarre (jalon 0). Idem si
       on remonte le scroll. Cohérent forward + backward.

       Aucune dépendance à ScrollTrigger pour la logique critique → robuste,
       pas de calculs cachés à invalider, pas de race condition à l'init.

       Réutilisable tel quel pour n'importe quel case respectant :
         - .snm-group[data-phase="<phaseId>"] dans la storyline
         - chaque group avec des .snm-node[data-anchor="#sectionId"]
         - chaque phaseId X correspondant à un <section id="chap-X">
       ────────────────────────────────────────────────────────────────────── */

    /** Build phase model from DOM. */
    const buildPhases = () => {
      const groups = Array.from(storyNav.querySelectorAll('.snm-group[data-phase]'));
      let nodeIdx = 0;
      return groups
        .map((group, phaseIdx) => {
          const phaseId = group.dataset.phase;
          const divider = document.querySelector(`#chap-${phaseId}`);
          const nodes = Array.from(group.querySelectorAll('.snm-node')).map((nodeEl) => ({
            el: nodeEl,
            anchor: nodeEl.getAttribute('data-anchor'),
            target: document.querySelector(nodeEl.getAttribute('data-anchor') || ''),
            globalIdx: nodeIdx++,
          }));
          return { id: phaseId, phaseIdx, group, divider, nodes };
        })
        .filter((phase) => phase.nodes.length > 0);
    };

    const phases = buildPhases();
    const allNodes = phases.flatMap((p) => p.nodes);
    const allGroups = phases.map((p) => p.group);

    /** Build the flat ordered list of "anchors" : each chap-divider is the
     *  phase entry (jalon 0), then each node's target section is a precise
     *  jalon. Sorted by position in document. */
    const anchors = [];
    phases.forEach((phase) => {
      if (phase.divider) {
        anchors.push({ el: phase.divider, phaseIdx: phase.phaseIdx, jalonIdx: 0 });
      }
      phase.nodes.forEach((node, jalonIdx) => {
        if (node.target) {
          anchors.push({ el: node.target, phaseIdx: phase.phaseIdx, jalonIdx });
        }
      });
    });

    /** Apply visual state for a given (phase, jalonIdx) tuple.
     *  Pass (-1, -1) to reset (no phase active). */
    let currentPhaseIdx = -1;
    let currentNodeIdx = -1;
    const apply = (phaseIdx, jalonIdx) => {
      if (phaseIdx === currentPhaseIdx && jalonIdx === currentNodeIdx) return;
      currentPhaseIdx = phaseIdx;
      currentNodeIdx = jalonIdx;

      const targetGlobalIdx = phaseIdx >= 0
        ? phases[phaseIdx].nodes[jalonIdx]?.globalIdx ?? -1
        : -1;

      allGroups.forEach((g, i) => {
        g.classList.toggle('is-current', i === phaseIdx);
        g.classList.toggle('is-past', i < phaseIdx && phaseIdx >= 0);
      });
      allNodes.forEach((n) => {
        n.el.classList.toggle('is-active', n.globalIdx === targetGlobalIdx);
        n.el.classList.toggle('is-past', n.globalIdx < targetGlobalIdx && targetGlobalIdx >= 0);
      });

      /* UNDERLINE MAGIQUE · CVE 2026-05-03 (10/10 polish)
         Une seule barre amber qui voyage de pill à pill, recalcule sa width
         et sa translateX selon la pill is-current. CSS gère la spring transition. */
      updateUnderline(phaseIdx);
    };

    /* Crée et positionne l'underline magique sous la pill active.
       L'underline est masqué pour les outcomes (VP, CR) car la gem porte
       son propre halo amber + ring pulse. CVE 2026-05-03. */
    const underline = storyNav.querySelector('.storyline__underline');
    const updateUnderline = (phaseIdx) => {
      if (!underline) return;
      if (phaseIdx < 0 || phaseIdx >= phases.length) {
        underline.classList.remove('is-ready');
        return;
      }
      const target = phases[phaseIdx].group;
      if (!target) return;
      /* Outcome (VP, CR) : pas d'underline · la gem a son propre éclat */
      if (target.classList.contains('snm-group--outcome')) {
        underline.classList.remove('is-ready');
        return;
      }
      const parent = underline.parentElement;
      if (!parent) return;
      const parentRect = parent.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offsetX = targetRect.left - parentRect.left;
      const width   = targetRect.width;
      underline.style.setProperty('--u-x', offsetX + 'px');
      underline.style.setProperty('--u-w', width + 'px');
      underline.classList.add('is-ready');
    };
    /* Recalcule l'underline en cas de resize (largeur des pills change). */
    window.addEventListener('resize', () => updateUnderline(currentPhaseIdx), { passive: true });

    /* CODA FINALE · CVE 2026-05-03 art polish 10/10
       À l'entrée de .fin-royale, les 7 markers de la sticky nav s'illuminent
       SIMULTANÉMENT pendant 1.2s puis fade-out. Le voyage est validé d'un coup. */
    const finRoyale = document.querySelector('.fin-royale');
    if (finRoyale) {
      ScrollTrigger.create({
        trigger: finRoyale,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          storyNav.classList.add('is-coda');
          setTimeout(() => storyNav.classList.remove('is-coda'), 1800);
        },
      });
    }

    apply(-1, -1);

    /** Determine which anchor the user is currently "reading".
     *  CVE 2026-05-03 fix v4 : reading line à 25vh + fallback center detection.
     *  Avec READING_LINE à 0.25, la phase switche dès que la section apparaît
     *  dans le tiers supérieur du viewport — perception "instantanée" pour les
     *  chap-dividers 100vh. Le center fallback capture les cas où la section
     *  est très tall et son top ne descend jamais sous la reading line. */
    const READING_LINE_RATIO = 0.25;
    const updatePhase = () => {
      const vh = window.innerHeight;
      const readingY = vh * READING_LINE_RATIO;
      const viewportMid = vh * 0.5;
      let best = null;
      for (let i = 0; i < anchors.length; i++) {
        const rect = anchors[i].el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        /* QUALIFY si section.top ≤ readingY OU section center ≤ viewport mid.
           Le 2e cas couvre les sections très grandes (100vh chap-dividers). */
        if (rect.top <= readingY || sectionCenter <= viewportMid) {
          best = anchors[i];
        } else {
          break;
        }
      }
      if (best) {
        apply(best.phaseIdx, best.jalonIdx);
      } else {
        apply(-1, -1);
      }
      updatePhaseProgress();
    };

    /* PROGRESS MICRO-BAR · CVE 2026-05-03 art polish 10/10
       Pour chaque phase, calcule la progression du user dans le contenu :
       - phase top en haut du viewport → 0%
       - phase bottom en haut du viewport → 100%
       Injecte la valeur dans --p sur le .snm-progress du group correspondant. */
    const updatePhaseProgress = () => {
      const readingY = window.innerHeight * READING_LINE_RATIO;
      phases.forEach((phase) => {
        const progressEl = phase.group.querySelector('.snm-progress');
        if (!progressEl) return;
        if (!phase.nodes.length) {
          progressEl.style.setProperty('--p', '0%');
          return;
        }
        const firstTop = phase.nodes[0].target ? phase.nodes[0].target.getBoundingClientRect().top : null;
        const last = phase.nodes[phase.nodes.length - 1].target;
        const lastBottom = last ? last.getBoundingClientRect().bottom : null;
        if (firstTop === null || lastBottom === null) {
          progressEl.style.setProperty('--p', '0%');
          return;
        }
        const totalSpan = lastBottom - firstTop;
        if (totalSpan <= 0) {
          progressEl.style.setProperty('--p', '0%');
          return;
        }
        const traveled = readingY - firstTop;
        const pct = Math.max(0, Math.min(100, (traveled / totalSpan) * 100));
        progressEl.style.setProperty('--p', pct.toFixed(1) + '%');
      });
    };

    /* rAF-throttled scroll listener — called at most once per frame. */
    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        scrollTicking = false;
        updatePhase();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    /* Initial pass + a delayed second pass after layout has fully settled
       (images loaded, fonts loaded, h-pin spacers applied). */
    updatePhase();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updatePhase);
    }
    window.addEventListener('load', updatePhase, { once: true });

    /* CVE 2026-05-01 : progress bar continu sur la sticky.
       Reste sur ScrollTrigger car c'est juste une CSS variable, pas du
       state critique de phase. */
    ScrollTrigger.create({
      trigger: proposedEl,
      start: 'bottom bottom',
      endTrigger: '.fin-royale',
      end: 'top top',
      onUpdate: (self) => {
        storyNav.style.setProperty('--story-progress', (self.progress * 100).toFixed(2) + '%');
      },
    });
  }

  /* Click handler global sur n'importe quel [data-anchor] (story nav + storyline).
     CVE 2026-05-04 · si le node est dans un .snm-group[data-phase] et que le
     chap-divider correspondant (#chap-${phase}) existe, on redirige vers le
     chap-divider pour que l'utilisateur voie l'animation de transition se
     construire avant d'entrer dans le contenu de la phase.
     CVE 2026-05-04 v2 · pour les chap-divider--v2 (sticky-pin scroll-driven),
     on scrolle jusqu'à la FIN du pin range au lieu du début → Lenis lerp 1.4s
     pendant lequel ScrollTrigger.scrub joue l'animation de build. L'utilisateur
     atterrit sur l'écran fully-built au lieu d'un écran vide en attente. */
  document.querySelectorAll('[data-anchor]').forEach((node) => {
    node.addEventListener('click', (e) => {
      let sel = node.getAttribute('data-anchor');
      const groupParent = node.closest('.snm-group[data-phase]');
      if (groupParent) {
        const phase = groupParent.getAttribute('data-phase');
        if (phase && document.querySelector(`#chap-${phase}`)) {
          sel = `#chap-${phase}`;
        }
      }
      const target = sel && document.querySelector(sel);
      if (!target) return;
      e.preventDefault();
      if (target.classList && target.classList.contains('chapter-divider--v2')) {
        /* On vise p≈0.80 (peak fully-built avant exit) plutôt que p=1.0 (où la
           lettre commence déjà à shrink). Le pin range = offsetHeight - vh.
           Position = offsetTop + 0.80 × pin range.
           CVE 2026-05-04 v3 · duration 2.6s + easing slow-out (expo decay)
           pour que la build respire et ne flicke pas à l'œil. */
        const pinRange = Math.max(0, target.offsetHeight - window.innerHeight);
        const builtPos = target.offsetTop + pinRange * 0.80;
        const slowOut = (t) => 1 - Math.pow(1 - t, 3.2); /* ease-out cubic+ , atterrit en douceur */
        if (lenis) lenis.scrollTo(builtPos, { duration: 2.6, easing: slowOut });
        else window.scrollTo({ top: builtPos, behavior: 'smooth' });
        return;
      }
      if (lenis) lenis.scrollTo(target, { offset: -100, duration: 1.2 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* CVE 2026-05-03 · sticky pills cliquables · scroll smooth vers la 1re section
     de la phase. En mode stuck les snm-nodes sont cachés, donc le pill entier
     devient clickable. Pour les outcome gems (intake, vp, cr) on cible aussi
     leur premier nœud. */
  document.querySelectorAll('.storyline .snm-group').forEach((group) => {
    /* CVE 2026-05-04 · group header click cible le chap-divider de la phase
       (l'écran de transition) au lieu du premier snm-node. L'utilisateur voit
       l'animation de bascule construire avant de continuer dans le contenu.
       Fallback sur firstNode si #chap-${phase} n'existe pas (cas intake). */
    const phase = group.getAttribute('data-phase');
    const chapTarget = phase ? document.querySelector(`#chap-${phase}`) : null;
    const firstNode = group.querySelector('.snm-node[data-anchor]');
    const sel = chapTarget ? `#chap-${phase}` : (firstNode ? firstNode.getAttribute('data-anchor') : null);
    if (!sel) return;
    group.style.cursor = 'pointer';
    group.setAttribute('role', 'button');
    group.setAttribute('tabindex', '0');
    const goTo = () => {
      const target = document.querySelector(sel);
      if (!target) return;
      /* CVE 2026-05-04 · scroll vers la FIN du pin range pour les chap-divider--v2 ·
         l'animation de build se joue pendant le smooth-scroll Lenis (1.4s) · l'user
         atterrit sur l'écran fully-built au lieu d'un écran vide. */
      if (target.classList && target.classList.contains('chapter-divider--v2')) {
        /* On vise p≈0.80 (peak fully-built avant exit) plutôt que p=1.0 (où la
           lettre commence déjà à shrink). Le pin range = offsetHeight - vh.
           Position = offsetTop + 0.80 × pin range.
           CVE 2026-05-04 v3 · duration 2.6s + easing slow-out (expo decay)
           pour que la build respire et ne flicke pas à l'œil. */
        const pinRange = Math.max(0, target.offsetHeight - window.innerHeight);
        const builtPos = target.offsetTop + pinRange * 0.80;
        const slowOut = (t) => 1 - Math.pow(1 - t, 3.2); /* ease-out cubic+ , atterrit en douceur */
        if (lenis) lenis.scrollTo(builtPos, { duration: 2.6, easing: slowOut });
        else window.scrollTo({ top: builtPos, behavior: 'smooth' });
        return;
      }
      const offset = -((document.querySelector('.topnav, .top-nav, header.site-header, [data-topnav]')?.getBoundingClientRect().height) || 64) - 8;
      if (lenis) lenis.scrollTo(target, { offset, duration: 1.2 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    group.addEventListener('click', (e) => {
      /* Si le user a cliqué directement sur un snm-node visible, laisse son handler agir */
      if (e.target.closest('.snm-node[data-anchor]')) return;
      e.preventDefault();
      goTo();
    });
    group.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(); }
    });
  });

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
    const hcxBg      = hcxSection.querySelector('.hcx__bg img, .hcx__bg video');
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
    const hcxHead    = hcxSection.querySelector('.hcx__head');

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

    /* t=2.7 — KPI bento : entrance smooth en bloc unique, no stagger fancy.
       Corporate posé : opacity + y + blur clear, c'est tout. Pas de pulse, pas
       de scale flashy. */
    if (hcxKpis) {
      hcxTl.set(hcxKpis, { visibility: 'visible' }, 2.65);
      hcxTl.to(hcxKpis, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.10, ease: 'power2.out',
      }, 2.70);
    }
    if (hcxKpiCells.length) {
      hcxTl.to(hcxKpiCells, {
        opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
      }, 2.85);
    }

    /* t=3.85 — Scroll cue last. The invitation. */
    if (hcxScroll)  hcxTl.to(hcxScroll,  { opacity: 1, y: 0, duration: 0.70, ease: 'power2.out' }, 3.85);

    /* CVE 2026-05-08 · safety timeout · si l'intro timeline n'a pas joué après 5s
       (cas observé sur hms.html avec <video> bg · cause non identifiée),
       force progress(1) pour ne JAMAIS laisser un hero invisible.
       Si l'intro a joué normalement (4.55s), le force est no-op. */
    setTimeout(() => {
      if (hcxTl && hcxTl.progress() < 1) {
        hcxTl.progress(1);
      }
    }, 5000);

    /* ── Scroll parallax : ZOOM INVERSE de l'entrance (zoom-out → zoom-in continu).
       Entrance fait : scale 1.18 → 1.04 (zoom-out posant le décor).
       CVE 2026-05-01 (calibré douceur) : amplitude visible, mais lissée par scrub
       long. Scale start = 1.06 = scale fin d'intro → zéro saut au passage. */
    if (hcxBg) {
      gsap.fromTo(hcxBg,
        { scale: 1.06, yPercent: 0 },
        {
          scale: 1.26, yPercent: 26, ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: hcxSection, start: 'top top', end: 'bottom top',
            scrub: 2.2, invalidateOnRefresh: true,
          },
        },
      );
    }
    if (hcxHead) {
      gsap.fromTo(hcxHead,
        { yPercent: 0 },
        {
          yPercent: -10, ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: hcxSection, start: 'top top', end: 'bottom top',
            scrub: 1.6, invalidateOnRefresh: true,
          },
        },
      );
    }
    if (hcxKpis) {
      gsap.fromTo(hcxKpis,
        { yPercent: 0, scale: 1 },
        {
          yPercent: -5, scale: 0.96, ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: hcxSection, start: 'top top', end: 'bottom top',
            scrub: 1.4, invalidateOnRefresh: true,
          },
        },
      );
    }
    if (hcxClient) {
      gsap.fromTo(hcxClient,
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -14, opacity: 0.45, ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: hcxSection, start: 'top top', end: 'bottom top',
            scrub: 1.8, invalidateOnRefresh: true,
          },
        },
      );
    }
  }

  /* ════════════════════════════════════════════════════════════════════════
     NARRATIVE MOTION TEMPLATE · CVE 2026-05-03 · case-agnostic engine.
     ════════════════════════════════════════════════════════════════════════

     GRAMMAIRE NARRATIVE EN 2 RYTHMES, SE SUCCÉDANT EN BOUCLE :

         [PAUSE]──────[PASSAGE]──────[PAUSE]──────[PASSAGE]──────[PAUSE]──────...

         PAUSE  · sticky-marker · transition narrative pinée 100vh.
                  Letter dolly-in OU statement révélation typographique.
                  CSS-driven via class .is-in-view (ou .is-revealing).
                  C'est le souffle, le seuil. L'œil se pose, la phase change.

         PASSAGE · contenu narratif consumable de gauche à droite.
                  xPercent 100 → 0, opacity 0 → 1, scrub-tied.
                  L'user scrolle, la section glisse depuis la droite.
                  Une section = une lecture L→R complète.

     CONVENTIONS HTML POUR CLONAGE CASE 2/3/N :

         PAUSE   = `<section class="chapter-divider" data-chapter="X">`
                   contenant `.chapter-roman` (la lettre) + `.chapter-meta`
                   OU `<section class="chap-vp-statement">` pour les outcomes
                   typographiques (statement géant pleine page).

         PASSAGE = `<section id="...">` (ou avec data-passage attribute).
                   Doit contenir un wrapper `.container` à l'intérieur,
                   sinon la section elle-même est animée.

     POURQUOI CSS-DRIVEN POUR LES PAUSES :
         GSAP timelines + scrub + Lenis = fragile, désynchronisations.
         CSS keyframes triggered by class = standard web, robuste, prévisible,
         clonable. ScrollTrigger toggle juste la class.

     POURQUOI SCRUB POUR LES PASSAGES :
         L→R consumption-style : l'user voit la section glisser AU RYTHME
         de son scroll. Tight 1:1, pas de lag. Mirror le feeling barriers.
     ════════════════════════════════════════════════════════════════════════ */

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ──────────────────────────────────────────────────────────────────────
     PAUSE handler · CVE 2026-05-03 v8 FINAL · scroll listener manuel rAF.

     Approche bulletproof : un scroll listener vérifie chaque frame si une
     pause section a son top dans le viewport. Si oui, ajoute la class. Une
     fois ajoutée, la class reste. Pas d'API magique qui peut rater une
     entry, pas de Lenis-conflict, pas de timing fragile.

     2 collections :
       - .chapter-divider · class .is-in-view
       - .chap-vp-statement · class .is-revealing

     Trigger : section.top < viewport_height * 0.80
     (= 20% de la section visible depuis le bas du viewport)
     ────────────────────────────────────────────────────────────────────── */
  const pauseTargets = [
    ...document.querySelectorAll('.chapter-divider'),
    ...document.querySelectorAll('.chap-vp-statement'),
  ].map((el) => ({
    el,
    className: el.classList.contains('chap-vp-statement') ? 'is-revealing' : 'is-in-view',
    armed: true,
  }));

  const checkPauses = () => {
    const triggerY = window.innerHeight * 0.80;
    pauseTargets.forEach((t) => {
      if (!t.armed) return;
      const rect = t.el.getBoundingClientRect();
      if (rect.top < triggerY && rect.bottom > 0) {
        t.el.classList.add(t.className);
        t.armed = false;
      }
    });
  };

  let pauseTicking = false;
  const onPauseScroll = () => {
    if (pauseTicking) return;
    pauseTicking = true;
    requestAnimationFrame(() => {
      pauseTicking = false;
      checkPauses();
    });
  };
  window.addEventListener('scroll', onPauseScroll, { passive: true });
  window.addEventListener('resize', onPauseScroll, { passive: true });
  checkPauses(); /* Initial pass · si une pause est déjà visible au load, anime */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(checkPauses);
  window.addEventListener('load', checkPauses, { once: true });

  /* CVE 2026-04-30 directive : transitions L→R entre jalons d'une phase.
     Chaque jalon (sauf horizontal-pin sections #barriers + #steps qui sont déjà
     animés horizontalement) fait une entrée légère depuis la droite quand il
     arrive dans le viewport — suggère la lecture gauche-droite, sans casser
     le scroll naturel ni le responsive. Pattern : xPercent +10 → 0, scrub. */
  const phaseJalonSelectors = [
    /* INTAKE (avant Research) */
    '#brief',
    /* RESEARCH */
    '#problem', '#research-interviews', '#research-benchmark', '#research-targeting', '#research-personas',
    /* ANALYSE — skip #barriers (h-pin existant) */
    '#analyse-asis', '#analyse-gap', '#analyse-data', '#analyse-vpc', '#analyse-vp',
    /* IDEATION (D2 H1 · Develop) */
    '#prototype-direction', '#prototype-overview',
    /* PROTOTYPE (D2 H2 · Deliver) */
    '#prototype-home',
    '#prototype-goal1', '#prototype-goal2', '#prototype-goal3', '#prototype-goal4',
    '#prototype-blueprint', '#prototype-sprintdesign', '#prototype-venn',
    '#prototype-relevant', '#prototype-usertest',
    /* CONCEPT REPORT — outcome final */
    '#concept-deliverable', '#alignment', '#concept-triplewin', '#outcome', '#lessons',
    /* Legacy ID-compat (silencieux si absents) */
    '#concept-vp-statement', '#concept-goals-overview',
    '#concept-goal1-performance', '#concept-goal2-expansion', '#concept-goal3-evaluating',
    '#concept-userstories', '#concept-flows', '#decision-pack',
  ];
  /* ──────────────────────────────────────────────────────────────────────
     PASSAGE handler · L→R consumption pattern.

     Chaque section listée dans phaseJalonSelectors glisse FULLEMENT depuis
     la droite — xPercent 100 → 0 — au rythme du scroll (scrub: true).
     L'user scrolle vers le bas, la section glisse de droite à gauche
     dans le viewport. Une fois la section centrée, elle est consumée.

     Sections marquées "subtle" reçoivent une amplitude réduite (sections
     post-rich qui suivent un h-pin, par exemple, pour ne pas surcharger).

     Le pattern fait écho à la lecture occidentale L→R. Combiné aux PAUSES,
     ça crée un rythme narratif : passage → pause → passage → pause...
     ────────────────────────────────────────────────────────────────────── */
  /* CVE 2026-05-04 v3 · L→R passage REMPLACÉ par fade-up top-down.
     L'utilisateur a constaté que le L→R causait des coupures + des
     comportements erratiques quand combiné aux pins horizontaux.
     Nouveau pattern : translateY 28 → 0, opacity 0 → 1, one-shot au
     scroll dans le viewport. Pas de scrub, pas de translation horizontale. */
  phaseJalonSelectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const inner = el.querySelector(':scope > .container') || el;
    gsap.fromTo(inner,
      { y: 28, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      },
    );
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

  /* ── Venn 3 cercles reveal — phase Prototype, agrégation données BNP.
        Cercles s'agrandissent depuis 0.78 → 1, tags fade-in en cascade. */
  function actA_vennReveal() {
    const stage = document.querySelector('#analyse-data .venn-stage');
    if (!stage) return;
    ScrollTrigger.create({
      trigger: stage, start: 'top 75%', once: true,
      onEnter: () => stage.classList.add('is-revealed'),
    });
  }
  actA_vennReveal();

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

        /* CLIMAX FLASH sur la "1" cell. CVE 2026-05-04 v3 · couleur scopée par case
           via lecture de --amber au runtime. Le case BNP le voit en vert,
           le case SPEOS le voit en jaune, le neutre CVE en coral. */
        const accentCell = block.querySelector('.climax-stat__cell--accent');
        if (accentCell) {
          const accentColor = getComputedStyle(accentCell).getPropertyValue('--amber').trim() || '#C76941';
          /* Convert hex to rgba avec 18% opacity pour le glow */
          const hexToRgba = (hex, alpha) => {
            const h = hex.replace('#','');
            const r = parseInt(h.substring(0,2), 16);
            const g = parseInt(h.substring(2,4), 16);
            const b = parseInt(h.substring(4,6), 16);
            return `rgba(${r},${g},${b},${alpha})`;
          };
          tl.fromTo(accentCell, { boxShadow: `0 0 0 0 ${hexToRgba(accentColor, 0)}` },
            { boxShadow: `0 0 0 8px ${hexToRgba(accentColor, 0.18)}`, duration: 0.45, ease: 'power3.out',
              yoyo: true, repeat: 1 }, 1.05);
        }
      },
    });
  }
  actR_climaxStat();

  /* CVE 2026-05-03 · Outcome 3 cards stagger + integrity note discrète.
     Le climax 6/1/0 animation est dans actR_climaxStat ci-dessus. */
  function actR_outcomeCards() {
    const sec = document.querySelector('#outcome');
    if (!sec) return;
    const cards = sec.querySelectorAll('.outcome-card');
    const integrity = sec.querySelector('.outcome-integrity');
    if (cards.length) gsap.set(cards, { opacity: 0, y: 28 });
    if (integrity) gsap.set(integrity, { opacity: 0, y: 14 });
    if (cards.length) {
      gsap.to(cards, {
        opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.18,
        scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true },
      });
    }
    if (integrity) {
      gsap.to(integrity, {
        opacity: 0.85, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: integrity, start: 'top 88%', once: true },
      });
    }
  }
  actR_outcomeCards();

  /* CVE 2026-05-03 · Lessons cards stagger + numéros count-glow */
  function actR_lessons() {
    const sec = document.querySelector('#lessons');
    if (!sec) return;
    const cards = sec.querySelectorAll('.lesson-card');
    if (!cards.length) return;
    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.to(cards, {
      opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.22,
      scrollTrigger: { trigger: cards[0], start: 'top 82%', once: true },
    });
  }
  actR_lessons();

  /* ========================================================================
     CVE 2026-05-03 · FIN ROYALE upgrade · WOW final + délice
     Postscript word-by-word reveal · Closing line typewriter effect ·
     Particules amber très subtiles · Email path underline draw on hover.
     ======================================================================== */
  function finRoyaleUpgrade() {
    const sec = document.querySelector('.fin-royale');
    if (!sec) return;
    const psText = sec.querySelector('.fin-royale__ps-text');
    const closeLine = sec.querySelector('.fin-royale__line');
    const path = sec.querySelector('.fin-royale__path');
    const sub = sec.querySelector('.fin-royale__path-sub');
    const sig = sec.querySelector('.fin-royale__signature');

    /* Postscript · word-by-word fade-in */
    if (psText && !isReduced) {
      const html = psText.innerHTML;
      /* Wrap each word in a span for stagger reveal · garde les inline tags (.accent) */
      const tmp = document.createElement('div');
      tmp.innerHTML = html;
      const wrap = (node) => {
        if (node.nodeType === 3) {
          /* Text node : split en mots, wrap each */
          const frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach((part) => {
            if (part.trim() === '') {
              frag.appendChild(document.createTextNode(part));
            } else {
              const s = document.createElement('span');
              s.className = 'fr-word';
              s.textContent = part;
              frag.appendChild(s);
            }
          });
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          Array.from(node.childNodes).forEach(wrap);
        }
      };
      Array.from(tmp.childNodes).forEach(wrap);
      psText.innerHTML = tmp.innerHTML;
      const words = psText.querySelectorAll('.fr-word');
      gsap.set(words, { opacity: 0, y: 12 });
      ScrollTrigger.create({
        trigger: sec, start: 'top 75%', once: true,
        onEnter: () => {
          gsap.to(words, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.06 });
        },
      });
    }

    /* Closing line · typewriter effect */
    if (closeLine && !isReduced) {
      const text = closeLine.textContent.trim();
      ScrollTrigger.create({
        trigger: closeLine, start: 'top 80%', once: true,
        onEnter: () => {
          closeLine.textContent = '';
          closeLine.classList.add('is-typing');
          let i = 0;
          const tick = () => {
            if (i <= text.length) {
              closeLine.textContent = text.slice(0, i);
              i++;
              setTimeout(tick, 38);
            } else {
              closeLine.classList.remove('is-typing');
              closeLine.classList.add('is-typed');
              /* Pulse subtle amber après fin du typing */
              setTimeout(() => closeLine.classList.add('is-glowing'), 400);
            }
          };
          /* Délai avant typing pour laisser le postscript respirer */
          setTimeout(tick, 600);
        },
      });
    }

    /* Path · email · subtle reveal */
    if (path) {
      gsap.set(path, { opacity: 0, y: 22 });
      ScrollTrigger.create({
        trigger: path, start: 'top 85%', once: true,
        onEnter: () => gsap.to(path, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }),
      });
    }
    if (sub) {
      gsap.set(sub, { opacity: 0 });
      ScrollTrigger.create({
        trigger: sub, start: 'top 90%', once: true,
        onEnter: () => gsap.to(sub, { opacity: 1, duration: 0.7, ease: 'power2.out', delay: 0.2 }),
      });
    }
    if (sig) {
      gsap.set(sig, { opacity: 0 });
      ScrollTrigger.create({
        trigger: sig, start: 'top 95%', once: true,
        onEnter: () => gsap.to(sig, { opacity: 1, duration: 0.9, ease: 'power2.out', delay: 0.3 }),
      });
    }

    /* Délice · particules amber qui montent · 5 dots, animation infinite douce */
    if (!isReduced && !sec.querySelector('.fin-royale__particles')) {
      const particles = document.createElement('div');
      particles.className = 'fin-royale__particles';
      particles.setAttribute('aria-hidden', 'true');
      for (let i = 0; i < 5; i++) {
        const dot = document.createElement('span');
        dot.className = 'fr-particle';
        dot.style.setProperty('--p-delay', (i * 1.6) + 's');
        dot.style.setProperty('--p-x', (15 + i * 17) + '%');
        particles.appendChild(dot);
      }
      sec.appendChild(particles);
    }
  }
  finRoyaleUpgrade();

  /* CVE 2026-05-03 · Concept Deliverable count-up 86 + reveal sequence */
  function actR_crDeliv() {
    const sec = document.querySelector('#concept-deliverable');
    if (!sec) return;
    const eyebrow = sec.querySelector('.cr-deliv__eyebrow');
    const weight = sec.querySelector('.cr-deliv__weight');
    const countEl = sec.querySelector('.cr-deliv__count');
    const phrase = sec.querySelector('.cr-deliv__phrase');
    const tocItems = sec.querySelectorAll('.cr-toc__item');
    const stack = sec.querySelector('.cr-deliv__stack');

    [eyebrow, weight, phrase].filter(Boolean).forEach((el) => gsap.set(el, { opacity: 0, y: 22 }));
    if (tocItems.length) gsap.set(tocItems, { opacity: 0, x: 28 });

    if (eyebrow) {
      gsap.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: eyebrow, start: 'top 85%', once: true } });
    }
    if (weight) {
      ScrollTrigger.create({
        trigger: weight, start: 'top 78%', once: true,
        onEnter: () => {
          gsap.to(weight, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' });
          if (phrase) gsap.to(phrase, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 });
          /* Count-up 0 → 86 */
          if (countEl) {
            const target = parseInt(countEl.dataset.countTo || '86', 10);
            const obj = { v: 0 };
            countEl.textContent = '0';
            gsap.to(obj, {
              v: target, duration: 1.4, ease: 'power3.out',
              onUpdate: () => { countEl.textContent = String(Math.round(obj.v)); },
              onComplete: () => { countEl.textContent = String(target); },
              delay: 0.3,
            });
          }
        },
      });
    }
    if (tocItems.length) {
      gsap.to(tocItems, {
        opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.10,
        scrollTrigger: { trigger: tocItems[0], start: 'top 82%', once: true },
      });
    }
  }
  actR_crDeliv();

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

    /* CVE 2026-05-03 · Triple-Win section · triangle draw + sync cards · sub-fonction
       intégrée à actR_alignment pour cohérence Act R. */
    actR_triplewin();

    /* Pivot block — the resolution. Lands after cards, with claim then outcome.
       CVE 2026-05-03 : pulse subtle sur "le bébé de tout le monde" en fin de timeline. */
    if (pivot) {
      ScrollTrigger.create({
        trigger: pivot, start: 'top 80%', once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(pivot, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0);
          if (pivotClaim) tl.to(pivotClaim, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, 0.25);
          if (pivotOutcome) tl.to(pivotOutcome, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.55);
          /* Délice : pulse "le bébé de tout le monde" 1.5s après le reveal */
          tl.add(() => {
            const accent = pivotOutcome && pivotOutcome.querySelector('strong.accent');
            if (accent) accent.classList.add('is-pulsing');
          }, 1.6);
        },
      });
    }
  }
  /* Concept Triple-Win · triangle SVG draw on scroll + 3 cards sync · CVE 2026-05-03 */
  function actR_triplewin() {
    const sec = document.querySelector('#concept-triplewin');
    if (!sec) return;
    const eyebrow = sec.querySelector('.eyebrow');
    const title = sec.querySelector('h2');
    const lead = sec.querySelector('.triplewin-lead');
    const claim = sec.querySelector('.triplewin-claim');
    const cards = sec.querySelectorAll('.triplewin-card');
    const edges = sec.querySelectorAll('.tw-edge');
    const nodes = sec.querySelectorAll('.tw-node');
    const labels = sec.querySelectorAll('.tw-label');

    [eyebrow, title, lead].filter(Boolean).forEach((el) => gsap.set(el, { opacity: 0, y: 22 }));
    if (cards.length) gsap.set(cards, { opacity: 0, y: 30 });
    if (edges.length) gsap.set(edges, { strokeDasharray: 600, strokeDashoffset: 600 });
    if (nodes.length) gsap.set(nodes, { scale: 0, transformOrigin: 'center', opacity: 0 });
    if (labels.length) gsap.set(labels, { opacity: 0 });
    if (claim) gsap.set(claim, { opacity: 0, y: 22 });

    [eyebrow, title, lead].filter(Boolean).forEach((el, i) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.10,
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    });

    /* Triangle draw + nodes pop + cards sync · ScrollTrigger once: true */
    const stage = sec.querySelector('.triplewin-grid');
    if (stage) {
      ScrollTrigger.create({
        trigger: stage, start: 'top 78%', once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (edges.length) tl.to(edges, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out', stagger: 0.18 }, 0);
          if (nodes.length) tl.to(nodes, { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)', stagger: 0.18 }, 0.6);
          if (labels.length) tl.to(labels, { opacity: 0.9, duration: 0.5, ease: 'power2.out', stagger: 0.15 }, 0.85);
          if (cards.length) tl.to(cards, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.18 }, 0.9);
        },
      });
    }

    if (claim) {
      ScrollTrigger.create({
        trigger: claim, start: 'top 80%', once: true,
        onEnter: () => gsap.to(claim, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
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

  /* ── Refresh ScrollTrigger after fonts load AND after window load (images,
        h-pin sections fully laid out). Évite les calculs de positions de pins
        basés sur un layout pas encore stable, qui faisaient désynchroniser
        les chap-dividers et les sections horizontales. */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  if (document.readyState === 'complete') {
    /* Already loaded — refresh next tick to let any pending init complete. */
    setTimeout(() => ScrollTrigger.refresh(), 100);
  } else {
    window.addEventListener('load', () => {
      /* All images + sub-resources loaded → recompute every ScrollTrigger position. */
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, { once: true });
  }

  /* ──────────────────────────────────────────────────────────
     CHAPTER-DIVIDER v2 · sticky-pin scroll-driven · CVE 2026-05-04
     Section 180vh, stage 100vh sticky. Au scroll, on calcule p ∈ [0,1]
     selon -rect.top / (offsetHeight - innerHeight) et on écrit 5 vars
     CSS sur la section. Le CSS interpole tout le reste.
     ────────────────────────────────────────────────────────── */
  (function initChapterDividerV2() {
    const sections = document.querySelectorAll('.chapter-divider--v2');
    if (!sections.length) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const sub = (p, lo, hi) => clamp((p - lo) / (hi - lo), 0, 1);
    sections.forEach(section => {
      const stage = section.querySelector('.chap-v2__stage');
      if (!stage) return;
      const apply = (p) => {
        const s = section.style;
        s.setProperty('--p', p.toFixed(4));
        s.setProperty('--p-enter', sub(p, 0.00, 0.32).toFixed(4));
        s.setProperty('--p-meta',  sub(p, 0.28, 0.65).toFixed(4));
        s.setProperty('--p-hold',  sub(p, 0.55, 0.85).toFixed(4));
        s.setProperty('--p-exit',  sub(p, 0.85, 1.00).toFixed(4));
      };
      apply(0);
      ScrollTrigger.create({
        trigger: section,
        pin: stage,
        pinSpacing: false,
        start: 'top top',
        end: () => '+=' + (section.offsetHeight - window.innerHeight),
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (st) => apply(st.progress),
      });
    });
  })();

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
