# Motion Grammar Template · CVE Service Design Case Studies

**Version** : 1.0 (2026-05-03)
**Status** : Production · validé pour BNP Paribas Fortis case · cloner pour case 2/3/N

---

## 1. Règle absolue (immuable)

> **Top-down UNIQUEMENT au passage d'une grande transition (chap-divider).**
> **Left-right partout dans une phase (h-pin scroll).**
> **Aucune exception, aucune section verticale au milieu d'une phase.**

C'est la grammaire qui sert le narratif :
- Top-down marque le **seuil narratif** (changement d'acte)
- Left-right marque la **lecture continue** dans un acte

---

## 2. Architecture des fichiers

```
/web/
├── MOTION-GRAMMAR-TEMPLATE.md     ← ce document
├── bnp.html                        ← case-spécifique
├── case2.html                      ← future case (clone)
└── assets/
    ├── motion-tokens.css           ← TOKENS · design system motion (réutilisable)
    ├── motion.js                   ← engine · wrapPhaseRails + handlers
    ├── scroll-narrative.js         ← engine · h-pin scroll (Apple-style)
    ├── style.css                   ← case-spécifique · charte graphique
    └── i18n.js                     ← case-spécifique · traductions FR/NL/EN
```

**Règle d'inclusion CSS** : `motion-tokens.css` AVANT `style.css` :

```html
<link rel="stylesheet" href="assets/motion-tokens.css?v=N">
<link rel="stylesheet" href="assets/style.css?v=N">
```

---

## 3. Tokens motion (custom properties)

Définis dans `motion-tokens.css:14-37`. Override dans le case si besoin :

| Token | Valeur défaut | Usage |
|---|---|---|
| `--m-dolly-duration` | `1.6s` | durée du letter dolly-in |
| `--m-meta-duration` | `0.8s` | durée fade-up de chaque meta child |
| `--m-meta-stagger` | `0.10s` | délai entre meta children |
| `--m-meta-delay-start` | `0.85s` | délai avant que les meta arrivent |
| `--m-stmt-duration` | `0.85s` | durée fade-up des statement parts |
| `--m-stmt-stagger` | `0.18s` | délai entre statement parts |
| `--m-strike-duration` | `0.9s` | durée du strike "Pas"/"Plus" |
| `--m-ease-cinematic` | `cubic-bezier(.22,.61,.36,1)` | dolly-in profondeur |
| `--m-ease-spring` | `cubic-bezier(.16,1,.3,1)` | spring meta cascade |
| `--m-letter-from-scale` | `0.30` | scale initiale lettre |
| `--m-letter-from-z` | `-400px` | translateZ initiale lettre |
| `--m-letter-from-blur` | `14px` | blur initial lettre |
| `--m-letter-peak-scale` | `1.10` | scale peak lettre |
| `--m-letter-peak-opacity` | `0.36` | opacity peak lettre |
| `--m-letter-rest-opacity` | `0.30` | opacity repos lettre |
| `--m-perspective` | `1200px` | perspective parent · profondeur |

---

## 4. Patterns canoniques

### 4.A · PAUSE phase divider (R, A, I, P)

Letter dolly-in cinématique depuis la profondeur + meta cascade.

```html
<section class="chapter-divider" id="chap-research" data-chapter="R">
  <div class="chapter-roman" aria-hidden="true">R</div>
  <div class="chapter-meta">
    <span class="chapter-overline">Discover · récolter la matière du terrain</span>
    <span class="chapter-label">Phase 01 · Research</span>
    <!-- Optional · dd-phase SVG indicator -->
  </div>
</section>
```

Animation auto-déclenchée par `is-in-view` class via `motion.js` scroll listener.

### 4.B · PAUSE outcome statement (VP, CR)

Statement typographique pleine page · stagger reveal.

```html
<section class="chap-vp-statement" id="chap-valueprop" data-chapter="V">
  <div class="chap-vp-statement__inner">
    <span class="chap-vp-statement__eyebrow">Diamant 1 · cristallisation</span>
    <p class="chap-vp-statement__phrase">
      <span class="chap-vp-statement__reject">
        <span class="chap-vp-statement__strike">Pas</span> un système exploratoire de métriques.
      </span>
      <span class="chap-vp-statement__affirm">
        Des <em>rapports orientés objectifs</em>, avec des <em>outcomes actionnables</em>.
      </span>
    </p>
    <p class="chap-vp-statement__footer">
      <span>Stakeholders → empathie</span>
      <span class="chap-vp-statement__bullet">·</span>
      <span>Produit → MVP</span>
      <span class="chap-vp-statement__bullet">·</span>
      <span>Build → idéation</span>
    </p>
  </div>
</section>
```

Animation auto-déclenchée par `is-revealing` class.

### 4.C · PASSAGE content (h-pin rail)

**Tu n'as RIEN à faire**. Le wrapper JS `wrapPhaseRails()` (dans `motion.js`) groupe automatiquement tous les `<section>` entre 2 chap-dividers en un rail h-pin :

```html
<!-- Tu écris simplement ces sections en HTML -->
<section id="research-interviews">...</section>
<section id="research-benchmark">...</section>
<section id="research-personas">...</section>
```

Au runtime, `wrapPhaseRails()` les transforme en :

```html
<section data-h-pin class="phase-rail" id="phase-rail-chap-research">
  <div class="h-track">
    <article class="h-panel" id="research-interviews">...</article>
    <article class="h-panel" id="research-benchmark">...</article>
    <article class="h-panel" id="research-personas">...</article>
  </div>
</section>
```

`scroll-narrative.js` applique le pin horizontal automatiquement.

---

## 5. Conventions HTML pour clonage (case 2/3/N)

### 5.A · Structure narrative obligatoire

```html
<!-- 1. Hero (vertical) -->
<section class="hcx">...</section>

<!-- 2. Brief intake (vertical) -->
<section id="brief">...</section>

<!-- 3. Roadmap méthodologique (vertical · explication DD) -->
<section id="proposed-roadmap">...</section>

<!-- 4. PHASE 1 -->
<section class="chapter-divider" id="chap-phase1" data-chapter="A">
  <div class="chapter-roman">A</div>
  <div class="chapter-meta">...</div>
</section>
<!-- Sections de phase 1 (auto-wrappées en h-pin) -->
<section id="p1-section1">...</section>
<section id="p1-section2">...</section>

<!-- 5. PHASE 2 (chap-divider + sections auto-h-pin) -->
<section class="chapter-divider" id="chap-phase2" data-chapter="B">...</section>
<section id="p2-section1">...</section>

<!-- ... etc ... -->

<!-- N. Close (vertical · skip h-pin) -->
<section class="fin-royale" id="fin-royale">...</section>
<footer class="footer-mini">...</footer>
```

### 5.B · IDs et data-attributes

- Chaque chap-divider DOIT avoir : `class="chapter-divider"` + `id="chap-X"` + `data-chapter="X"` (1 ou 2 caractères pour la lettre)
- Chaque outcome statement DOIT avoir : `class="chap-vp-statement"` + `id="chap-Y"` + `data-chapter="Y"`
- Chaque section de contenu = un `<section id="...">` simple. Le wrapper s'occupe du reste.
- La close doit avoir : `class="fin-royale"` (pour être skip du h-pin)

### 5.C · Sticky nav

Définie dans le HTML avec une structure de groupes :

```html
<nav class="storyline">
  <ol class="storyline__line">
    <li class="snm-group" data-phase="phaseId">
      <span class="snm-group__name">Phase Name</span>
      <ol class="snm-group__nodes">
        <li class="snm-node" data-anchor="#chap-phaseId">First node label</li>
        <li class="snm-node" data-anchor="#section-id">Other node</li>
      </ol>
    </li>
    <!-- ... -->
  </ol>
</nav>
```

Le phase tracking auto-détecte les groupes et anime via `motion.js`.

---

## 6. JS engine (motion.js)

### 6.A · wrapPhaseRails()

Détecte les boundaries (`.chapter-divider, .chap-vp-statement`) et wrappe les sections intermédiaires en h-pin rails. Skip `.fin-royale`.

### 6.B · Pause handler (scroll listener manuel)

Toggle `is-in-view` (chap-divider) ou `is-revealing` (chap-vp-statement) quand la section atteint 80% du viewport. CSS keyframes prennent le relais.

### 6.C · Sticky nav handler

Manual scroll listener · `is-stuck` activée après hero exit, désactivée après bas de fin-royale.

### 6.D · Phase tracking

Reading line à 25% du viewport · center fallback pour sections >100vh · ajoute `is-current` + `is-past` aux groupes sticky nav.

---

## 7. Quick start · cloner ce template

```bash
# 1. Copier le case existant
cp bnp.html case2.html

# 2. Vider les sections de contenu (garder la structure des chap-dividers)
# 3. Mettre à jour i18n.js avec les nouvelles clés trilingues
# 4. Mettre à jour le case-spécifique style.css (charte couleur, typo)
# 5. motion-tokens.css RESTE intact (pas de modif)
# 6. motion.js wrapPhaseRails s'applique automatiquement aux nouvelles sections

# 7. Tester
open case2.html
```

---

## 8. Ce qu'il NE FAUT JAMAIS faire

- ❌ Pas de `xPercent: 100→0` reveal sur sections inter-chapter (ça simule un L→R mais le scroll reste vertical · contradictoire avec la grammaire)
- ❌ Pas de `fade-up` ou `slide-from-bottom` sur sections inter-chapter
- ❌ Pas de h-pin imbriqué (un h-pin dans un h-pin · ScrollTrigger casse)
- ❌ Pas de scroll listener concurrent avec `motion.js` (5 listeners actuels = max)
- ❌ Pas de modification de `motion-tokens.css` par case · le case override via CSS custom properties dans son `style.css`

## 9. Versioning

- **v1.0 (2026-05-03)** : Création initiale · validation BNP case
- **v1.1 (à venir)** : Extract `motion-engine.js` séparé de motion.js (pour clonage propre)

---

**Auteur** : CVE (Christophe van Engelen) · Service Designer freelance
**Maintenance** : à la racine `/web/`. Lis ce fichier avant chaque clonage de case.
