/**
 * NDA password gate · CVE 2026-05-12
 *
 * Activé sur les pages case sous NDA (bnp, speos, hms).
 * Le password est partagé par email · le visiteur demande, CVE renvoie.
 *
 * Sécurité · client-side (le contenu HTML est dans le source) · "soft NDA".
 * La vraie protection vient du contrat social via l'échange email où le
 * visiteur s'identifie. Le password gate ajoute une friction qui filtre
 * les curieux non-engagés et trace l'intention.
 *
 * Stack ·
 * - Compare hash SHA-256 du password tapé avec hash hardcodé (pas le
 *   password en clair dans le source).
 * - Si correct · token mis en localStorage, contenu révélé.
 * - Si déjà unlocked (token présent) · contenu visible direct.
 * - Sinon · overlay full-screen avec input + "Email me for password" link.
 *
 * Usage · ajouter à <head> de la case page ·
 *   <script src="/assets/nda-gate.js" data-case="bnp" defer></script>
 * Le script gate la page <body> tant que pas unlocked.
 *
 * Password actuel · "folio-2026" (à changer si compromis).
 * Hash SHA-256 ci-dessous, calculé via crypto.subtle.
 */

(function () {
  'use strict';

  /* SHA-256 du password "folio-2026" (lowercase) en hex */
  const PASSWORD_HASH = '94fce34b413251483d9568bd5af84267f2b1c8ae718531034db67b5cb0198e3e';
  const TOKEN_KEY = 'cve-nda-access';
  const TOKEN_VALID_DAYS = 60; /* le token expire après 60 jours */

  /* Get current state · token valide si timestamp < 60 jours */
  function hasValidToken() {
    try {
      const raw = localStorage.getItem(TOKEN_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || data.hash !== PASSWORD_HASH) return false;
      const age = Date.now() - (data.ts || 0);
      if (age > TOKEN_VALID_DAYS * 86400 * 1000) return false;
      return true;
    } catch { return false; }
  }

  async function sha256(text) {
    const buf = new TextEncoder().encode(text);
    const hash = await crypto.subtle.digest('SHA-256', buf);
    return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  function detectLang() {
    const html = document.documentElement.lang || 'fr';
    return ['fr', 'nl', 'en'].includes(html) ? html : 'fr';
  }

  const I18N = {
    fr: {
      title: 'Case sous NDA',
      lead: 'Ce case study est protégé par accord de non-divulgation avec le client. Demande-moi le mot de passe par email · je réponds en quelques heures.',
      label: 'Mot de passe',
      submit: 'Accéder au case',
      error: 'Mot de passe incorrect.',
      request: 'Demander le mot de passe par email',
      mailSubject: 'Demande accès case NDA · {case}',
      mailBody: 'Bonjour Christophe,\n\nJe souhaiterais accéder au case "{case}" sur ton folio. Pourrais-tu me communiquer le mot de passe ?\n\nContexte (entreprise / projet / motivation) ·\n\nMerci,\n',
      back: '← Retour à la home',
    },
    nl: {
      title: 'Case onder NDA',
      lead: 'Deze case study is beschermd door een geheimhoudingsovereenkomst met de klant. Vraag mij het wachtwoord per e-mail · ik antwoord binnen enkele uren.',
      label: 'Wachtwoord',
      submit: 'Toegang tot case',
      error: 'Verkeerd wachtwoord.',
      request: 'Vraag wachtwoord per e-mail',
      mailSubject: 'Toegangsaanvraag NDA case · {case}',
      mailBody: 'Hallo Christophe,\n\nIk zou graag toegang krijgen tot de case "{case}" op je folio. Kun je me het wachtwoord doorgeven?\n\nContext (bedrijf / project / motivatie) ·\n\nDank,\n',
      back: '← Terug naar home',
    },
    en: {
      title: 'Case under NDA',
      lead: 'This case study is protected by a non-disclosure agreement with the client. Ask me for the password by email · I reply within a few hours.',
      label: 'Password',
      submit: 'Access case',
      error: 'Incorrect password.',
      request: 'Request password by email',
      mailSubject: 'NDA case access request · {case}',
      mailBody: 'Hi Christophe,\n\nI\'d like to access the "{case}" case study on your folio. Could you send me the password?\n\nContext (company / project / motivation) ·\n\nThanks,\n',
      back: '← Back to home',
    },
  };

  function injectStyles() {
    const css = `
.nda-gate {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: var(--bg, #0a1220);
  color: var(--fg, #f2ebdb);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  font-family: var(--display, ui-sans-serif, system-ui, sans-serif);
}
.nda-gate__panel {
  max-width: 540px;
  width: 100%;
  text-align: center;
}
.nda-gate__eyebrow {
  display: inline-block;
  font-family: var(--sans, system-ui);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--amber, #c76941);
  margin-bottom: 24px;
}
.nda-gate__title {
  font-family: var(--display, serif);
  font-weight: 300;
  font-size: clamp(32px, 5vw, 56px);
  letter-spacing: -0.015em;
  line-height: 1.05;
  margin: 0 0 20px;
}
.nda-gate__lead {
  font-family: var(--sans, system-ui);
  font-size: 16px;
  line-height: 1.55;
  color: var(--fg-muted, rgba(242, 235, 219, 0.7));
  margin: 0 auto 32px;
  max-width: 440px;
}
.nda-gate__form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: stretch;
  margin-bottom: 24px;
}
.nda-gate__row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}
.nda-gate__input {
  flex: 1 1 240px;
  min-width: 0;
  padding: 14px 18px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(242, 235, 219, 0.15);
  border-radius: 8px;
  color: var(--fg, #f2ebdb);
  font: inherit;
  font-size: 16px;
}
.nda-gate__input:focus {
  outline: none;
  border-color: var(--amber, #c76941);
}
.nda-gate__btn {
  padding: 14px 24px;
  background: var(--amber, #c76941);
  color: var(--bg, #0a1220);
  border: none;
  border-radius: 8px;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 200ms;
  white-space: nowrap;
}
.nda-gate__btn:hover { opacity: 0.85; }
.nda-gate__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.nda-gate__error {
  color: #E27D60;
  font-size: 14px;
  min-height: 1.4em;
  margin: 4px 0 0;
}
.nda-gate__request {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--sans, system-ui);
  font-size: 14px;
  color: var(--amber, #c76941);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  transition: opacity 200ms;
}
.nda-gate__request:hover { opacity: 0.7; }
.nda-gate__back {
  display: block;
  margin-top: 36px;
  font-family: var(--sans, system-ui);
  font-size: 13px;
  color: var(--fg-muted, rgba(242, 235, 219, 0.5));
  text-decoration: none;
  transition: color 200ms;
}
.nda-gate__back:hover { color: var(--fg, #f2ebdb); }
.nda-gate-hidden { display: none !important; }
body.nda-locked { overflow: hidden; }
@media (max-width: 600px) {
  .nda-gate__row { flex-direction: column; }
}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  function getCaseName() {
    const script = document.currentScript || document.querySelector('script[data-case]');
    return (script && script.dataset && script.dataset.case) || 'Case';
  }

  const CASE_LABELS = {
    bnp: 'BNP Paribas Fortis · Enterprise Intelligence',
    speos: 'SPEOS · bpost group · One-stop platform',
    hms: 'Ewon by HMS Networks · Cloud Revamp',
  };

  function buildMailto(caseSlug, lang) {
    const t = I18N[lang] || I18N.fr;
    const label = CASE_LABELS[caseSlug] || caseSlug;
    const subject = t.mailSubject.replace('{case}', label);
    const body = t.mailBody.replace('{case}', label);
    return 'mailto:hello@christophevanengelen.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  function renderGate(caseSlug) {
    const lang = detectLang();
    const t = I18N[lang] || I18N.fr;
    const overlay = document.createElement('div');
    overlay.className = 'nda-gate';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'nda-gate-title');
    overlay.innerHTML = `
      <div class="nda-gate__panel">
        <span class="nda-gate__eyebrow">${escapeHtml(t.title)}</span>
        <h1 id="nda-gate-title" class="nda-gate__title">${escapeHtml(t.title)}</h1>
        <p class="nda-gate__lead">${escapeHtml(t.lead)}</p>
        <form class="nda-gate__form" id="nda-gate-form">
          <label class="nda-gate__label" for="nda-gate-input" style="position: absolute; left: -9999px;">${escapeHtml(t.label)}</label>
          <div class="nda-gate__row">
            <input type="password"
                   id="nda-gate-input"
                   class="nda-gate__input"
                   placeholder="${escapeHtml(t.label)}"
                   autocomplete="off"
                   required />
            <button type="submit" class="nda-gate__btn">${escapeHtml(t.submit)}</button>
          </div>
          <p class="nda-gate__error" id="nda-gate-error"></p>
        </form>
        <a class="nda-gate__request" href="${buildMailto(caseSlug, lang)}">
          ✉ ${escapeHtml(t.request)}
        </a>
        <a href="/" class="nda-gate__back">${escapeHtml(t.back)}</a>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.classList.add('nda-locked');

    const form = overlay.querySelector('#nda-gate-form');
    const input = overlay.querySelector('#nda-gate-input');
    const errEl = overlay.querySelector('#nda-gate-error');
    input.focus();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errEl.textContent = '';
      const candidate = (input.value || '').trim().toLowerCase();
      const hash = await sha256(candidate);
      if (hash === PASSWORD_HASH) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify({ hash, ts: Date.now() }));
        unlock(overlay);
      } else {
        errEl.textContent = t.error;
        input.value = '';
        input.focus();
      }
    });
  }

  function unlock(overlay) {
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    document.body.classList.remove('nda-locked');
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  /* Boot · si pas de valid token, on injecte le gate */
  function boot() {
    const caseSlug = getCaseName();
    if (hasValidToken()) return; /* déjà unlocked */
    injectStyles();
    renderGate(caseSlug);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
