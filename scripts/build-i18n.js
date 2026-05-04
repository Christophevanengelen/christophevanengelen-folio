#!/usr/bin/env node
/**
 * CVE 2026-05-04 S2 · build-i18n.js
 * Génère les versions NL/EN pré-rendues de index.html, bnp.html, speos.html
 * à partir du dict i18n.js. Sortie : /nl/<page>.html et /en/<page>.html.
 *
 * Pourquoi : le i18n côté client (data-i18n swap au runtime) ne crée pas
 * d'URLs distinctes → Google n'indexe que le FR. Pré-rendu = SEO multilingue
 * réel + hreflang annotations.
 *
 * Usage : node scripts/build-i18n.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const I18N_PATH = path.join(ROOT, 'assets', 'i18n.js');
const PAGES = ['index.html', 'bnp.html', 'speos.html'];
const LANGS = ['nl', 'en'];
const HOST = 'https://christophevanengelen.be';

/** ========== 1. Charger le dictionnaire i18n ========== */
function loadDict() {
  let src = fs.readFileSync(I18N_PATH, 'utf8');
  /* On wrap l'IIFE pour exposer dict sur globalThis */
  src = src.replace(
    /const dict = \{/,
    'const dict = globalThis.__I18N_DICT__ = {'
  );
  const ctx = {
    globalThis: {},
    window: { matchMedia: () => ({ matches: false }) },
    document: {
      documentElement: { lang: 'fr', getAttribute: () => 'fr', setAttribute: () => {} },
      addEventListener: () => {},
      querySelectorAll: () => [],
      querySelector: () => null,
      title: '',
    },
    localStorage: { getItem: () => null, setItem: () => {} },
  };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  try {
    vm.runInContext(src, ctx, { timeout: 1000 });
  } catch (e) {
    /* certaines erreurs DOM sont attendues; dict est extrait avant */
  }
  if (!ctx.__I18N_DICT__) throw new Error('Dict not extracted');
  return ctx.__I18N_DICT__;
}

/** ========== 2. Outils de remplacement HTML ========== */
function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/* Remplace le contenu interne d'une balise unique identifiée par data-i18n="key" */
function replaceI18nNodes(html, dict, lang) {
  /* data-i18n-html : remplace innerHTML (autorise tags) */
  html = html.replace(
    /(<([a-z][a-z0-9]*)[^>]*\bdata-i18n-html="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi,
    (m, openTag, tag, key, _inner, closeTag) => {
      const entry = dict[key];
      if (!entry || !entry[lang]) return m;
      return openTag + entry[lang] + closeTag;
    }
  );
  /* data-i18n : remplace textContent (escape pas de tags) */
  html = html.replace(
    /(<([a-z][a-z0-9]*)[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/gi,
    (m, openTag, tag, key, _inner, closeTag) => {
      const entry = dict[key];
      if (!entry || !entry[lang]) return m;
      /* on autorise les entités HTML mais on n'injecte pas de tags */
      return openTag + entry[lang] + closeTag;
    }
  );
  return html;
}

/* Remplace les meta SEO pour la langue (title, og:title, og:locale, etc.) */
function applySeoForLang(html, dict, lang, page) {
  const titleKey = page === 'index.html' ? 'home.title' : (page === 'bnp.html' ? 'bnp.title' : 'speos.title');
  const descKey = page === 'index.html' ? 'home.metaDesc' : (page === 'bnp.html' ? 'bnp.metaDesc' : 'speos.metaDesc');
  const newTitle = dict[titleKey] && dict[titleKey][lang];
  const newDesc = dict[descKey] && dict[descKey][lang];
  if (newTitle) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${newTitle}</title>`);
    html = html.replace(/(<meta property="og:title" content=")[^"]*"/, `$1${escapeAttr(newTitle)}"`);
    html = html.replace(/(<meta name="twitter:title" content=")[^"]*"/, `$1${escapeAttr(newTitle)}"`);
  }
  if (newDesc) {
    html = html.replace(/(<meta name="description" content=")[^"]*"/, `$1${escapeAttr(newDesc)}"`);
    html = html.replace(/(<meta property="og:description" content=")[^"]*"/, `$1${escapeAttr(newDesc)}"`);
    html = html.replace(/(<meta name="twitter:description" content=")[^"]*"/, `$1${escapeAttr(newDesc)}"`);
  }
  /* og:locale primaire = la langue actuelle */
  const localeMap = { fr: 'fr_BE', nl: 'nl_BE', en: 'en_GB' };
  html = html.replace(
    /<meta property="og:locale" content="[^"]*"[^>]*>/,
    `<meta property="og:locale" content="${localeMap[lang]}" />`
  );
  /* alternates : les deux autres langues */
  const alternates = Object.keys(localeMap)
    .filter(l => l !== lang)
    .map(l => `<meta property="og:locale:alternate" content="${localeMap[l]}" />`)
    .join('\n');
  /* on remplace tous les og:locale:alternate existants par les nouveaux */
  html = html.replace(/(<meta property="og:locale:alternate"[^>]*>\s*)+/, alternates + '\n');
  return html;
}

/* Met à jour <html lang="..."> */
function updateHtmlLang(html, lang) {
  return html.replace(/<html\b[^>]*\blang="[^"]*"/, m => m.replace(/lang="[^"]*"/, `lang="${lang}"`));
}

/* Met à jour les URLs canonical + og:url + Schema @id pour la version traduite */
function updateUrls(html, lang, page) {
  const slug = page === 'index.html' ? '' : page;
  const baseUrl = lang === 'fr'
    ? `${HOST}/${slug}`
    : `${HOST}/${lang}/${slug}`;
  const cleanUrl = baseUrl.replace(/\/$/, '/').replace(/index\.html$/, '');
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${cleanUrl}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${cleanUrl}" />`
  );
  return html;
}

/* Génère le bloc hreflang pour les 3 langues (cross-references) */
function buildHreflangBlock(page) {
  const slug = page === 'index.html' ? '' : page;
  const urls = {
    fr: `${HOST}/${slug}`.replace(/index\.html$/, ''),
    nl: `${HOST}/nl/${slug}`.replace(/index\.html$/, ''),
    en: `${HOST}/en/${slug}`.replace(/index\.html$/, ''),
  };
  return [
    `<link rel="alternate" hreflang="fr-BE" href="${urls.fr}" />`,
    `<link rel="alternate" hreflang="nl-BE" href="${urls.nl}" />`,
    `<link rel="alternate" hreflang="en" href="${urls.en}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urls.fr}" />`,
  ].join('\n');
}

/* Insère le bloc hreflang juste après <link rel="canonical"> */
function injectHreflang(html, page) {
  const block = buildHreflangBlock(page);
  /* éviter doublons : on retire d'abord les hreflang existants */
  html = html.replace(/<link rel="alternate" hreflang="[^"]*"[^>]*>\s*/g, '');
  return html.replace(
    /(<link rel="canonical" href="[^"]*"\s*\/?>)/,
    `$1\n${block}`
  );
}

/* Pour les pages traduites : asset paths relatifs deviennent absolus
   (sinon /nl/index.html cherche /nl/assets/... qui n'existe pas). */
function rebaseAssets(html) {
  /* href/src qui commencent par 'assets/' ou 'public/' → '/assets/' '/public/' */
  html = html.replace(/(href|src)="(assets|public)\//g, '$1="/$2/');
  /* Les inter-pages doivent aussi rester sur la même langue (rester dans /nl/ ou /en/) */
  /* href="bnp.html" relatif fonctionne dans /nl/ qui contient bnp.html */
  return html;
}

/** ========== 3. Build par page × langue ========== */
function buildLangVersion(page, lang, dict) {
  const srcPath = path.join(ROOT, page);
  const outDir = path.join(ROOT, lang);
  const outPath = path.join(outDir, page);
  fs.mkdirSync(outDir, { recursive: true });
  let html = fs.readFileSync(srcPath, 'utf8');
  html = updateHtmlLang(html, lang);
  html = replaceI18nNodes(html, dict, lang);
  html = applySeoForLang(html, dict, lang, page);
  html = updateUrls(html, lang, page);
  html = injectHreflang(html, page);
  html = rebaseAssets(html);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`✓ ${lang}/${page} (${html.length} bytes)`);
}

/** ========== 4. Pour les pages FR (racine), juste injecter hreflang ========== */
function injectHreflangIntoRoot(page) {
  const srcPath = path.join(ROOT, page);
  let html = fs.readFileSync(srcPath, 'utf8');
  html = injectHreflang(html, page);
  fs.writeFileSync(srcPath, html, 'utf8');
  console.log(`✓ root/${page} (hreflang injected)`);
}

/** ========== Main ========== */
function main() {
  console.log('Loading i18n dictionary...');
  const dict = loadDict();
  console.log(`  → ${Object.keys(dict).length} keys loaded`);

  console.log('\nBuilding root pages (FR) with hreflang...');
  PAGES.forEach(injectHreflangIntoRoot);

  console.log('\nBuilding NL/EN pages...');
  for (const lang of LANGS) {
    for (const page of PAGES) {
      buildLangVersion(page, lang, dict);
    }
  }
  console.log('\n✓ Build complete.');
}

main();
