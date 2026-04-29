/* Deck flipper — click any [data-deck] figure to browse the source deck.
   Pattern: side-panel modal with prev/next chevrons, slide counter, deep-link.
   Respects prefers-reduced-motion + locks body scroll while open.
*/
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const decks = new Map(); // id → manifest
  const root = document.documentElement;
  const body = document.body;

  /* ── State */
  const state = { deckId: null, page: 1, manifest: null, scrollY: 0, lang: 'fr' };

  /* ── Helpers */
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function getLang() {
    return localStorage.getItem('cve-lang') || document.documentElement.getAttribute('lang') || 'fr';
  }
  function fmtSrc(template, n) {
    return template.replace(/\{N:02\}/, pad2(n));
  }
  async function loadManifest(deckId) {
    if (decks.has(deckId)) return decks.get(deckId);
    const r = await fetch(`public/decks/${deckId}/manifest.json`, { cache: 'force-cache' });
    if (!r.ok) throw new Error('manifest fetch failed');
    const m = await r.json();
    decks.set(deckId, m);
    return m;
  }

  /* ── DOM scaffold (inserted once on first open) */
  let scaffold = null;
  function buildScaffold() {
    if (scaffold) return scaffold;
    const el = document.createElement('div');
    el.className = 'deck-flipper';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `
      <div class="deck-backdrop" data-close></div>
      <div class="deck-shell" role="dialog" aria-modal="true" aria-label="Source deck">
        <header class="deck-head">
          <div class="deck-head-l">
            <span class="deck-name"></span>
            <span class="deck-credit"></span>
          </div>
          <div class="deck-head-r">
            <span class="deck-counter"></span>
            <button class="deck-close" data-close aria-label="Close (Esc)">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </header>
        <div class="deck-stage">
          <button class="deck-nav deck-prev" data-prev aria-label="Previous slide">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <div class="deck-stage-img-wrap">
            <img class="deck-stage-img" alt="" />
            <div class="deck-loading"><span></span></div>
          </div>
          <button class="deck-nav deck-next" data-next aria-label="Next slide">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
        <footer class="deck-foot">
          <div class="deck-track">
            <div class="deck-track-fill"></div>
          </div>
          <div class="deck-hint" data-hint></div>
        </footer>
      </div>
    `;
    body.appendChild(el);
    scaffold = el;

    /* Wire events on scaffold */
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) close();
      else if (e.target.closest('[data-prev]')) goto(state.page - 1);
      else if (e.target.closest('[data-next]')) goto(state.page + 1);
    });

    /* Touch swipe */
    let tx = 0, ty = 0;
    el.addEventListener('touchstart', (e) => {
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
    }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (!tx) return;
      const dx = (e.changedTouches[0].clientX - tx);
      const dy = (e.changedTouches[0].clientY - ty);
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        goto(state.page + (dx < 0 ? 1 : -1));
      }
      tx = 0; ty = 0;
    }, { passive: true });

    return el;
  }

  /* ── Open / close / navigate */
  async function open(deckId, page) {
    try {
      const manifest = await loadManifest(deckId);
      state.deckId = deckId;
      state.manifest = manifest;
      state.page = Math.max(1, Math.min(manifest.totalPages, page || 1));
      state.lang = getLang();
      state.scrollY = window.scrollY || window.pageYOffset || 0;

      buildScaffold();
      const lang = state.lang;
      scaffold.querySelector('.deck-name').textContent = (manifest.name && manifest.name[lang]) || manifest.name?.fr || manifest.id;
      scaffold.querySelector('.deck-credit').textContent = (manifest.credit && manifest.credit[lang]) || '';
      scaffold.classList.add('is-open');
      scaffold.setAttribute('aria-hidden', 'false');

      /* lock body scroll without losing position */
      body.style.position = 'fixed';
      body.style.top = `-${state.scrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';

      render();

      /* deep-link */
      const newHash = `#deck=${deckId}&p=${state.page}`;
      if (location.hash !== newHash) history.pushState({ deck: deckId, page: state.page }, '', newHash);
    } catch (err) {
      console.warn('deck open failed', err);
    }
  }

  function close() {
    if (!scaffold) return;
    scaffold.classList.remove('is-open');
    scaffold.setAttribute('aria-hidden', 'true');
    /* restore body scroll */
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    window.scrollTo(0, state.scrollY);
    /* clear hash */
    if (location.hash.startsWith('#deck=')) {
      history.pushState('', '', location.pathname + location.search);
    }
    state.deckId = null; state.page = 1; state.manifest = null;
  }

  function goto(page) {
    if (!state.manifest) return;
    const tot = state.manifest.totalPages;
    if (page < 1) page = 1;
    if (page > tot) page = tot;
    if (page === state.page) return;
    state.page = page;
    render();
    /* update deep-link without push */
    const newHash = `#deck=${state.deckId}&p=${state.page}`;
    history.replaceState({ deck: state.deckId, page: state.page }, '', newHash);
  }

  function render() {
    const m = state.manifest;
    if (!m) return;
    const stage = scaffold.querySelector('.deck-stage-img');
    const loading = scaffold.querySelector('.deck-loading');
    const counter = scaffold.querySelector('.deck-counter');
    const fill = scaffold.querySelector('.deck-track-fill');
    const prev = scaffold.querySelector('[data-prev]');
    const next = scaffold.querySelector('[data-next]');

    const src = `public/decks/${state.deckId}/${fmtSrc(m.format, state.page)}`;
    loading.classList.add('is-on');
    stage.classList.remove('is-loaded');
    stage.alt = `${m.name?.[state.lang] || m.id} — slide ${state.page} / ${m.totalPages}`;

    const img = new Image();
    img.onload = () => {
      stage.src = src;
      stage.classList.add('is-loaded');
      loading.classList.remove('is-on');
      preload(state.page + 1); preload(state.page - 1);
    };
    img.onerror = () => {
      loading.classList.remove('is-on');
      stage.alt = 'Slide unavailable';
    };
    img.src = src;

    counter.textContent = `${state.page} / ${m.totalPages}`;
    fill.style.width = ((state.page / m.totalPages) * 100) + '%';
    prev.disabled = state.page <= 1;
    next.disabled = state.page >= m.totalPages;
  }

  function preload(n) {
    const m = state.manifest; if (!m || !n || n < 1 || n > m.totalPages) return;
    const i = new Image();
    i.src = `public/decks/${state.deckId}/${fmtSrc(m.format, n)}`;
  }

  /* ── Keyboard */
  document.addEventListener('keydown', (e) => {
    if (!scaffold || !scaffold.classList.contains('is-open')) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goto(state.page + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goto(state.page - 1); }
    else if (e.key === 'Home') { e.preventDefault(); goto(1); }
    else if (e.key === 'End') { e.preventDefault(); goto(state.manifest?.totalPages || 1); }
  });

  /* ── Wire all .figure[data-deck] */
  document.addEventListener('click', (e) => {
    const fig = e.target.closest('[data-deck]');
    if (!fig) return;
    /* Don't hijack clicks on existing links inside */
    if (e.target.closest('a, button:not(.deck-cta)')) return;
    e.preventDefault();
    const deckId = fig.getAttribute('data-deck');
    const page = parseInt(fig.getAttribute('data-deck-page') || '1', 10);
    open(deckId, page);
  });

  /* ── Hash deep-link on load */
  function fromHash() {
    const m = location.hash.match(/^#deck=([^&]+)&p=(\d+)/);
    if (m) open(m[1], parseInt(m[2], 10));
  }
  window.addEventListener('popstate', () => {
    if (location.hash.startsWith('#deck=')) fromHash();
    else if (scaffold && scaffold.classList.contains('is-open')) close();
  });
  if (location.hash.startsWith('#deck=')) {
    /* defer to next tick so other scripts (theme, i18n) settle */
    setTimeout(fromHash, 60);
  }

  /* ── Add deep-link CTA badge to each [data-deck] figure */
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-deck]').forEach((fig) => {
      if (fig.querySelector('.deck-cta')) return;
      const cta = document.createElement('span');
      cta.className = 'deck-cta';
      cta.setAttribute('aria-hidden', 'true');
      cta.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg><span data-i18n="deck.cta">Browse the deck</span>`;
      fig.appendChild(cta);
      fig.classList.add('has-deck-cta');
      /* re-run i18n if it exposed an API */
      if (window.cveI18n && window.cveI18n.applyLang) try { window.cveI18n.applyLang(getLang()); } catch (e) {}
    });
  });
})();
