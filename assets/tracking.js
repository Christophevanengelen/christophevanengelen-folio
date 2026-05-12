/* CVE 2026-05-04 S7.3 · tracking.js
 * Event tracking universel pour Plausible Analytics.
 * Lit data-event="name" sur n'importe quel élément cliquable
 * et envoie vers window.plausible() si dispo. Sinon noop silencieux
 * (pas d'erreur si Plausible pas encore activé).
 *
 * Usage HTML :
 *   <a href="mailto:hello@christophevanengelen.com" data-event="mailto-cve">hello@christophevanengelen.com</a>
 *   <a href="https://linkedin..." data-event="linkedin-out" data-event-source="footer">...</a>
 *
 * Goals à créer dans Plausible (Settings > Goals > Custom event) :
 *   - mailto-cve         · clic sur l'email
 *   - phone-cve          · clic sur le téléphone
 *   - linkedin-out       · clic sur LinkedIn (sortie)
 *   - lire-case          · clic sur "Lire le case" (BNP/SPEOS/HMS)
 *   - lang-switch        · changement de langue FR/NL/EN
 *   - theme-toggle       · clic sur le toggle thème dark/light
 *   - cal-book           · clic CTA Cal.com (contact-cta | floating-cta)
 *
 * Activation Plausible · une étape :
 *   1. Créer compte sur plausible.io, ajouter christophevanengelen.com
 *   2. Décommenter les 2 lignes <script> dans index.html
 *      (+ bnp.html, speos.html, hms.html si voulu)
 *   3. Créer les 7 goals ci-dessus dans Plausible Settings > Goals
 */
(function () {
  'use strict';

  function track(name, props) {
    /* Plausible API · noop si pas chargé */
    if (typeof window.plausible === 'function') {
      try { window.plausible(name, props ? { props } : undefined); } catch (_) {}
    }
    /* Optional dataLayer push pour GA4 si jamais ajouté */
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...(props || {}) });
    }
  }

  function bindClickEvents() {
    document.querySelectorAll('[data-event]').forEach(el => {
      el.addEventListener('click', () => {
        const name = el.getAttribute('data-event');
        const source = el.getAttribute('data-event-source');
        if (!name) return;
        track(name, source ? { source } : null);
      }, { passive: true });
    });
  }

  /* Track lang switch (intercept aux clic on data-lang-btn) */
  function bindLangSwitch() {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-lang-btn');
        track('lang-switch', { lang: target });
      }, { passive: true });
    });
  }

  /* Track theme toggle */
  function bindThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      const isLightAfter = !document.documentElement.classList.contains('theme-light');
      track('theme-toggle', { to: isLightAfter ? 'light' : 'dark' });
    }, { passive: true });
  }

  function init() {
    bindClickEvents();
    bindLangSwitch();
    bindThemeToggle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
