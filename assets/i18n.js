/* i18n — FR/NL/EN dictionary + switcher.
   Voice rule (locked): human, personal, simple, no em-dashes, citable aloud by CVE.
   Trilingual parity: any edit on one language is mirrored on the other two.
*/
(function () {
  const STORE_KEY = 'cve-lang';
  const SUPPORTED = ['fr', 'nl', 'en'];
  const DEFAULT = 'fr';

  const dict = {
    /* ============== SHARED / NAV / FOOTER ============== */
    /* CVE 2026-05-04 S6.1 · skip link a11y · WCAG 2.4.1 Bypass Blocks */
    'a11y.skipToContent': {
      fr: 'Aller au contenu principal',
      nl: 'Ga naar de hoofdinhoud',
      en: 'Skip to main content'
    },
    'nav.brand': { fr: 'Christophe van Engelen', nl: 'Christophe van Engelen', en: 'Christophe van Engelen' },
    'footer.copy': {
      fr: '© Christophe van Engelen, 2026. Artefacts originaux © BNP Paribas Fortis 2017–2018, repris ici pour illustration de portfolio.',
      nl: '© Christophe van Engelen, 2026. Originele artefacten © BNP Paribas Fortis 2017–2018, hier gebruikt ter illustratie van portfolio.',
      en: '© Christophe van Engelen, 2026. Original artefacts © BNP Paribas Fortis 2017–2018, used here for portfolio illustration.'
    },

    /* ============== PORTFOLIO INDEX ============== */
    'home.eyebrow': {
      fr: 'Service Design · UX · CX · Bruxelles',
      nl: 'Service Design · UX · CX · Brussel',
      en: 'Service Design · UX · CX · Brussels'
    },
    'home.h1': {
      fr: 'Aligner les parties prenantes sur la value proposition.<br><span class="alt">Livrer une expérience qui se démarque et qui ravit.</span>',
      nl: 'Stakeholders uitlijnen op de value proposition.<br><span class="alt">Een ervaring leveren die zich onderscheidt en die bekoort.</span>',
      en: 'Align stakeholders around the value proposition.<br><span class="alt">Deliver an experience that stands out and delights.</span>'
    },
    'home.lead': {
      fr: 'Vingt ans dans des écosystèmes complexes · banque, postal industriel, SaaS, legal-tech. Du grand groupe international à la start-up. J\'écoute, je cadre, je tranche. En mission courte ou en accompagnement durable. Trois cases publics ci-dessous.',
      nl: 'Twintig jaar in complexe ecosystemen · banking, industriële post, SaaS, legal-tech. Van internationaal concern tot start-up. Ik luister, ik kadreer, ik beslis. In korte opdracht of in duurzame begeleiding. Drie publieke cases hieronder.',
      en: 'Twenty years in complex ecosystems · banking, industrial postal, SaaS, legal-tech. From global corporate to start-up. I listen, I frame, I decide. In short engagements or long-term partnerships. Three public cases below.'
    },
    'home.casesEyebrow': { fr: 'Travaux sélectionnés', nl: 'Geselecteerd werk', en: 'Selected work' },
    /* Deck flipper UI */
    'deck.cta': { fr: 'Parcourir le deck source', nl: 'Bron-deck doorbladeren', en: 'Browse the source deck' },
    'deck.prev': { fr: 'Précédent', nl: 'Vorige', en: 'Previous' },
    'deck.next': { fr: 'Suivant', nl: 'Volgende', en: 'Next' },
    'deck.close': { fr: 'Fermer', nl: 'Sluiten', en: 'Close' },
    'deck.hint': {
      fr: '← → pour naviguer · Esc pour fermer',
      nl: '← → om te navigeren · Esc om te sluiten',
      en: '← → to navigate · Esc to close'
    },
    'case.bnp.tag': { fr: 'Cas principal', nl: 'Hoofdcase', en: 'Headline case' },
    'case.bnp.title': { fr: 'Enterprise Intelligence.', nl: 'Enterprise Intelligence.', en: 'Enterprise Intelligence.' },
    'case.bnp.subtitle': {
      fr: 'La donnée transactionnelle d\'une banque, devenue un service que des PME commerçantes ont accepté de payer avant le développement.',
      nl: 'De transactiedata van een bank, geworden een dienst waar handelaars-kmo\'s voor wilden betalen vóór de ontwikkeling.',
      en: 'A bank\'s transactional data, turned into a service that SME merchants accepted to pay for before development.'
    },
    'case.bnp.client': { fr: 'BNP Paribas Fortis', nl: 'BNP Paribas Fortis', en: 'BNP Paribas Fortis' },
    'case.bnp.year': { fr: '2018 – 2019', nl: '2018 – 2019', en: '2018 – 2019' },
    'case.bnp.role': { fr: 'Service Designer · Freelance', nl: 'Service Designer · Freelance', en: 'Service Designer · Freelance' },

    'bnp.hero.eyebrow': {
      fr: 'Service Design · Banque · 2018 — 2019',
      nl: 'Service Design · Bankwezen · 2018 — 2019',
      en: 'Service Design · Banking · 2018 — 2019'
    },
    /* CVE 2026-05-11 BNP v2 · attribution stripe (UX Researcher reco · +10 pts Sophie) */
    'bnp.hero.attribution': {
      fr: 'Lead Service Designer · mandat direct sponsor BNPPF · juin 2018 → janvier 2019',
      nl: 'Lead Service Designer · direct mandaat BNPPF-sponsor · juni 2018 → januari 2019',
      en: 'Lead Service Designer · direct sponsor mandate BNPPF · June 2018 → January 2019'
    },
    'bnp.hero.h1.start': { fr: 'Enterprise', nl: 'Enterprise', en: 'Enterprise' },
    'bnp.hero.h1.alt': { fr: 'Intelligence.', nl: 'Intelligence.', en: 'Intelligence.' },
    /* CVE 2026-05-17 NN-brutal · cut "Six mois..." (déjà dans sizing chip + attribution) ·
       cut "à la sortie..." (déjà dans brief.teaser). Mécanisme seul. -32 mots. */
    'bnp.hero.lead': {
      fr: 'La donnée transactionnelle dormait sur les serveurs. À la sortie, des PME commerçantes acceptaient de payer pour y accéder, avant la première ligne de code.',
      nl: 'De transactiedata sluimerde op de servers. Aan het einde wilden handelaars-kmo\'s betalen om er toegang toe te krijgen, nog vóór de eerste regel code.',
      en: 'Transactional data was sleeping on the servers. At the exit, SME merchants were willing to pay for access, before the first line of code.'
    },
    'bnp.hero.metaRole': { fr: 'Service Designer · Freelance', nl: 'Service Designer · Freelance', en: 'Service Designer · Freelance' },
    'bnp.hero.metaWhere': {
      fr: '6 mois · cadrage amont · stratégique',
      nl: '6 maanden · upstream strategisch kaderwerk',
      en: '6 months · upstream strategic framing'
    },
    'bnp.hero.location': { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels' },
    /* ============== BRIDGE — jaquette → histoire ============== */
    /* ============== FIN ROYALE — onboarding intelligent (NEW 2026-04-30 s2) ============== */
    /* CVE 2026-05-18 · bnp.fin.line supprimé · cf. feedback_voix_pas_de_claim_aphorisme_fin_royale */
    'bnp.fin.contact.eyebrow': { fr: 'Une conversation ?', nl: 'Een gesprek?', en: 'A conversation?' },
    /* CVE 2026-05-17 NN-brutal · cut énumération "service design en amont, recherche
       utilisateur, atelier de cadrage" (déjà dit dans Formats home). -12 mots. */
    'bnp.fin.contact.sub': {
      fr: 'Service designer freelance · Bruxelles · cadrage amont.',
      nl: 'Freelance service designer · Brussel · upstream framing.',
      en: 'Freelance service designer · Brussels · upstream framing.'
    },
    'bnp.fin.ps.label': {
      fr: 'Postscript · sept ans plus tard',
      nl: 'Postscriptum · zeven jaar later',
      en: 'Postscript · seven years later'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Le reste, c'est du bruit" (claim final qui restate
       le triangle déjà dit). -10 mots. */
    'bnp.fin.ps.text': {
      fr: 'Je ressors ce dossier quand un sponsor me demande ce que vaut un projet en amont. La réponse tient dans le triangle : <span class="accent">si les trois sommets gagnent, on garde. Sinon, on jette.</span>',
      nl: 'Ik haal dit dossier weer boven wanneer een sponsor me vraagt wat een upstream-project waard is. Het antwoord zit in de driehoek : <span class="accent">winnen de drie hoekpunten, dan houden we het. Zo niet, weg ermee.</span>',
      en: 'I bring this case back out whenever a sponsor asks what an upstream project is worth. The answer sits inside the triangle : <span class="accent">if the three vertices win, we keep it. Otherwise, we drop it.</span>'
    },
    'bnp.fin.signature': {
      fr: 'Christophe van Engelen · Service Designer · Bruxelles',
      nl: 'Christophe van Engelen · Service Designer · Brussel',
      en: 'Christophe van Engelen · Service Designer · Brussels'
    },
    'footer.forContext': {
      fr: 'Pour Luminus · entretien Service Designer · avril–mai 2026',
      nl: 'Voor Luminus · Service Designer-gesprek · april–mei 2026',
      en: 'For Luminus · Service Designer interview · April–May 2026'
    },
    /* footer.copy already defined globally above (line 26) — single source of truth */

    /* ============== RESEARCH subsections : Benchmark + Targeting + Personas ============== */
    /* ============== RESEARCH 1.1 — Six interviews PME terrain ============== */
    'bnp.research.itEyebrow': { fr: 'Research · interviews PME terrain', nl: 'Research · kmo-interviews op het terrein', en: 'Research · SME field interviews' },
    /* CVE 2026-05-17 v3 · NNG · titre Six×3 rhétorique remplacé par insight substantiel ·
       Léonidas dedans (hire-magnet). Lead · cut énumération des 6 types (cards la portent
       déjà), garde la méthode. -28 mots total. */
    'bnp.research.itTitle': {
      fr: 'Six commerçants sur leur sol. <span class="accent">Léonidas parmi eux.</span>',
      nl: 'Zes handelaars op hun werkvloer. <span class="accent">Léonidas onder hen.</span>',
      en: 'Six shopkeepers on their floor. <span class="accent">Léonidas among them.</span>'
    },
    'bnp.research.itLead': {
      fr: 'Une heure et demie chacun, derrière la caisse, à observer ce qui se décide dans la journée.',
      nl: 'Anderhalf uur elk, achter de toonbank, om te observeren wat er op een dag beslist wordt.',
      en: 'Ninety minutes each, behind the counter, watching what gets decided in a day.'
    },
    'bnp.research.it1Name':    { fr: 'Le chocolatier multi-shops', nl: 'De multi-shop chocolatier', en: 'The multi-shop chocolatier' },
    'bnp.research.it1Quote':   { fr: '« Je vois mes ventes, mais pas qui les fait. »', nl: '« Ik zie mijn verkopen, maar niet wie ze doet. »', en: '"I see my sales, but not who makes them."' },
    'bnp.research.it1Context': { fr: 'Léonidas — futur signataire de la promesse d\'achat. Sept points de vente. Décisions pricing à l\'aveugle.', nl: 'Léonidas — toekomstige ondertekenaar van de aankoopbelofte. Zeven verkooppunten. Pricing-beslissingen blind.', en: 'Léonidas — future signer of the purchase commitment. Seven points of sale. Pricing calls made blind.' },
    'bnp.research.it2Name':    { fr: 'Le retailer mode indépendant', nl: 'De onafhankelijke mode-retailer', en: 'The independent fashion retailer' },
    'bnp.research.it2Quote':   { fr: '« Je connais mes meilleurs clients. Pas mes meilleurs jours. »', nl: '« Ik ken mijn beste klanten. Niet mijn beste dagen. »', en: '"I know my best customers. Not my best days."' },
    'bnp.research.it2Context': { fr: 'Boutique unique, Bruxelles centre. Pas de POS, caisse manuelle. Évolution panier en intuition.', nl: 'Eén boutique, Brussel centrum. Geen POS, handmatige kassa. Basket-evolutie op gevoel.', en: 'Single boutique, central Brussels. No POS, manual register. Basket evolution by instinct.' },
    'bnp.research.it3Name':    { fr: 'Le restaurateur', nl: 'De restaurateur', en: 'The restaurateur' },
    'bnp.research.it3Quote':   { fr: '« Mon comptable me donne les chiffres trop tard. »', nl: '« Mijn boekhouder geeft me de cijfers te laat. »', en: '"My accountant gives me the figures too late."' },
    'bnp.research.it3Context': { fr: 'Restaurant 35 couverts. Reporting mensuel décalé de 6 semaines. Loupe les vagues saisonnières.', nl: 'Restaurant 35 couverts. Maandelijkse reporting 6 weken te laat. Mist de seizoensgolven.', en: 'Restaurant 35 covers. Monthly reporting lagging 6 weeks. Misses seasonal waves.' },
    'bnp.research.it4Name':    { fr: 'La profession libérale', nl: 'Het vrij beroep', en: 'The liberal professional' },
    'bnp.research.it4Quote':   { fr: '« J\'ai pas de temps pour Excel. Donnez-moi 3 chiffres. »', nl: '« Geen tijd voor Excel. Geef me 3 cijfers. »', en: '"No time for Excel. Give me 3 numbers."' },
    'bnp.research.it4Context': { fr: 'Cabinet médical 2 praticiens. Pas d\'équipe back-office. Demande maximale : 3 KPIs lisibles en 30 secondes.', nl: 'Medisch kabinet 2 artsen. Geen back-office team. Maximale vraag: 3 KPI\'s leesbaar in 30 seconden.', en: 'Medical practice 2 practitioners. No back-office team. Maximum demand: 3 KPIs readable in 30 seconds.' },
    'bnp.research.it5Name':    { fr: 'Le franchisé multi-réseaux', nl: 'De multi-netwerk franchisenemer', en: 'The multi-network franchisee' },
    'bnp.research.it5Quote':   { fr: '« Mon franchiseur m\'envoie SES chiffres. Pas les miens. »', nl: '« Mijn franchisegever stuurt me ZIJN cijfers. Niet de mijne. »', en: '"My franchisor sends me HIS figures. Not mine."' },
    'bnp.research.it5Context': { fr: 'Trois shops sous deux enseignes. Veut comparer ses points de vente entre eux et au benchmark sectoriel.', nl: 'Drie shops onder twee merken. Wil zijn verkooppunten onderling en met de sectorbenchmark vergelijken.', en: 'Three shops under two brands. Wants to compare his points of sale to each other and to the sector benchmark.' },
    'bnp.research.it6Name':    { fr: 'La PME corporate', nl: 'De corporate kmo', en: 'The corporate SME' },
    'bnp.research.it6Quote':   { fr: '« On a un BI interne. Mais c\'est pour le finance. Pas le terrain. »', nl: '« We hebben een interne BI. Maar voor finance. Niet voor het terrein. »', en: '"We have an internal BI. But for finance. Not for the floor."' },
    'bnp.research.it6Context': { fr: 'BFE smaller corporate, 40 employés. Outils existent mais inadaptés au manager opérationnel terrain.', nl: 'BFE smaller corporate, 40 werknemers. Tools bestaan maar passen niet bij de operationele terrein-manager.', en: 'BFE smaller corporate, 40 employees. Tools exist but unfit for the operational floor manager.' },
    'bnp.research.benchEyebrow': { fr: 'Research · Benchmark', nl: 'Research · Benchmark', en: 'Research · Benchmark' },
    'bnp.research.benchTitle': {
      fr: 'Trois benchmarks <span class="accent">live.</span>',
      nl: 'Drie <span class="accent">live</span> benchmarks.',
      en: 'Three <span class="accent">live</span> benchmarks.'
    },
    /* CVE 2026-05-17 v2 NNG · -5 mots · cut question rhétorique */
    'bnp.research.benchLead': {
      fr: 'Trois acteurs étudiés, trois signatures distinctes · chacun isolé sur son angle de force.',
      nl: 'Drie spelers bestudeerd, drie onderscheidende handtekeningen · elk gericht op hun sterkste hoek.',
      en: 'Three players studied, three distinct signatures · each isolated on its angle of strength.'
    },
    'bnp.research.barclaysSig': { fr: 'Signature · marketplace d\'apps', nl: 'Signatuur · app marketplace', en: 'Signature · app marketplace' },
    'bnp.research.proximusSig': { fr: 'Signature · geolocation flows', nl: 'Signatuur · geolocatie-flows', en: 'Signature · geolocation flows' },
    'bnp.research.bbvaSig':     { fr: 'Signature · API anonymous data', nl: 'Signatuur · API anonieme data', en: 'Signature · anonymous data API' },
    'bnp.research.barclays1': { fr: 'Visual design très soigné', nl: 'Zeer aantrekkelijk visueel ontwerp', en: 'Very appealing visual design' },
    'bnp.research.barclays2': { fr: 'Intégré aux outils de gestion small-business', nl: 'Geïntegreerd met small-business management software', en: 'Integrates with small-business management software' },
    'bnp.research.barclays3': { fr: 'Modèle App Marketplace', nl: 'App Marketplace-model', en: 'App Marketplace model' },
    'bnp.research.proximus1': { fr: 'Visual design très soigné', nl: 'Zeer aantrekkelijk visueel ontwerp', en: 'Very appealing visual design' },
    'bnp.research.proximus2': { fr: 'Mouvement consommateur via géolocalisation', nl: 'Consumentenbeweging via geolocatie', en: 'Consumer movement via geolocation' },
    'bnp.research.bbva1': { fr: 'API d\'accès aux données statistiques anonymisées via le POS provider', nl: 'API voor anonieme statistische data via de POS-provider', en: 'API to anonymous statistical data via POS provider' },
    /* CVE 2026-05-17 v3 · CVE rectif · ce sont des SEGMENTS, pas des personas.
       Persona = individu nommé avec photo/âge/story. Ici ce sont des types marché.
       Label corrigé. Titre factualisé · 9 segments + 1 key target (info de substance,
       pas effet rhétorique). */
    'bnp.research.persoEyebrow': { fr: 'Research · Segments B2B', nl: 'Research · B2B-segmenten', en: 'Research · B2B segments' },
    'bnp.research.persoTitle': {
      fr: 'Neuf segments. <span class="accent">Un key target.</span>',
      nl: 'Negen segmenten. <span class="accent">Eén key target.</span>',
      en: 'Nine segments. <span class="accent">One key target.</span>'
    },
    'bnp.research.persoLead': {
      fr: 'Du Liberal Pro au Corporate Banking SME. Cartographie construite sur les interviews + la matrice Levels of Interest (Ideation Report, oct. 2017) · le key target retenu pour le concept · <strong>B2C multi-shops sans support data interne</strong>.',
      nl: 'Van Liberal Pro tot Corporate Banking SME. Cartografie gebouwd op de interviews + de Levels of Interest-matrix (Ideation Report, okt. 2017) · het weerhouden key target voor het concept · <strong>B2C multi-shops zonder interne datasupport</strong>.',
      en: 'From Liberal Pro to Corporate Banking SME. Map built on the interviews + the Levels of Interest matrix (Ideation Report, Oct 2017) · key target retained for the concept · <strong>B2C multi-shops without internal data support</strong>.'
    },
    /* ============== ANALYSE 2.3 — Typologie des données BNP fusionnées ============== */
    'bnp.analyse.dataEyebrow': {
      fr: 'Analyse · Typologie des données',
      nl: 'Analyse · Datatypologie',
      en: 'Analyse · Data typology'
    },
    'bnp.analyse.dataTitle': {
      fr: 'Trois sources de données. <span class="accent">Une matière à recouper.</span>',
      nl: 'Drie databronnen. <span class="accent">Een grondstof om te kruisen.</span>',
      en: 'Three data sources. <span class="accent">Raw material to transform.</span>'
    },
    /* CVE 2026-05-17 v2 NNG · -25 mots · cut "Il a fallu les organiser" + raccourci */
    'bnp.analyse.dataLead': {
      fr: '<strong>Trois familles de données</strong> sur les commerçants · transactions Bancontact, profils carte des consommateurs, comptes bancaires. Brutes, elles ne valent rien. Croisées, elles produisent six lectures actionnables, chacune calée sur un type de persona.',
      nl: '<strong>Drie families gegevens</strong> over de handelaars · Bancontact-transacties, kaartprofielen van consumenten, bankrekeningen. Ruw zijn ze waardeloos. Gekruist leveren ze zes bruikbare lezingen op, elk afgestemd op een type persona.',
      en: '<strong>Three families of data</strong> on merchants · Bancontact transactions, consumer card profiles, bank accounts. Raw, they\'re worthless. Cross-referenced, they produce six actionable readings, each tied to a persona type.'
    },
    'bnp.analyse.dataSvgTitle': {
      fr: 'Schéma de Venn — typologie données BNP fusionnées en six insights actionnables',
      nl: 'Venn-diagram — BNP-datatypologie gecombineerd in zes actionable inzichten',
      en: 'Venn diagram — BNP data typology fused into six actionable insights'
    },
    'bnp.analyse.dataSvgDesc': {
      fr: 'Trois cercles superposés Customers, Area, Sector — leurs chevauchements produisent six insights actionnables.',
      nl: 'Drie overlappende cirkels Customers, Area, Sector — hun overlappingen produceren zes actionable inzichten.',
      en: 'Three overlapping circles Customers, Area, Sector — their overlaps produce six actionable insights.'
    },
    'bnp.analyse.dataAxisCustomers': { fr: 'CUSTOMERS', nl: 'CUSTOMERS', en: 'CUSTOMERS' },
    'bnp.analyse.dataAxisArea':      { fr: 'AREA',      nl: 'AREA',      en: 'AREA'      },
    'bnp.analyse.dataAxisSector':    { fr: 'SECTOR',    nl: 'SECTOR',    en: 'SECTOR'    },
    'bnp.analyse.dataZone1': { fr: 'Customers seuls',          nl: 'Alleen Customers',           en: 'Customers only'           },
    'bnp.analyse.dataOpp1':  { fr: 'Crosselling diversification', nl: 'Crosselling diversificatie', en: 'Crosselling diversification' },
    'bnp.analyse.dataHint1': { fr: 'Non-clients d\'un autre secteur, autre zone', nl: 'Niet-klanten in een andere sector en zone', en: 'Non-customers in another sector and area' },
    'bnp.analyse.dataZone2': { fr: 'Customers ∩ Area',         nl: 'Customers ∩ Area',           en: 'Customers ∩ Area'         },
    'bnp.analyse.dataOpp2':  { fr: 'Crosselling local',         nl: 'Lokale crosselling',         en: 'Local crosselling'         },
    'bnp.analyse.dataHint2': { fr: 'Non-clients dans ma zone',  nl: 'Niet-klanten in mijn zone',  en: 'Non-customers in my area'  },
    'bnp.analyse.dataZone3': { fr: 'Area seul',                 nl: 'Alleen Area',                en: 'Area only'                 },
    'bnp.analyse.dataOpp3':  { fr: 'Opening hours',             nl: 'Opening hours',              en: 'Opening hours'             },
    'bnp.analyse.dataHint3': { fr: 'Trafic carte heure par heure dans ma zone', nl: 'Kaartverkeer per uur in mijn zone', en: 'Hourly card traffic in my area' },
    'bnp.analyse.dataZone4': { fr: 'Customers ∩ Sector ∩ Area', nl: 'Customers ∩ Sector ∩ Area',  en: 'Customers ∩ Sector ∩ Area' },
    'bnp.analyse.dataOpp4':  { fr: 'Loyalty',                   nl: 'Loyalty',                    en: 'Loyalty'                   },
    'bnp.analyse.dataHint4': { fr: 'Mes clients dans mon secteur, ma zone', nl: 'Mijn klanten in mijn sector, mijn zone', en: 'My customers in my sector, my area' },
    'bnp.analyse.dataZone5': { fr: 'Customers ∩ Sector',        nl: 'Customers ∩ Sector',         en: 'Customers ∩ Sector'        },
    'bnp.analyse.dataOpp5':  { fr: 'Expansion',                 nl: 'Expansion',                  en: 'Expansion'                 },
    'bnp.analyse.dataHint5': { fr: 'Mes clients dans mon secteur, autre zone', nl: 'Mijn klanten in mijn sector, andere zone', en: 'My customers in my sector, other area' },
    'bnp.analyse.dataZone6': { fr: 'Area ∩ Sector',             nl: 'Area ∩ Sector',              en: 'Area ∩ Sector'             },
    'bnp.analyse.dataOpp6':  { fr: 'New portfolio offers',      nl: 'New portfolio offers',       en: 'New portfolio offers'      },
    'bnp.analyse.dataHint6': { fr: 'Non-clients dans mon secteur et ma zone', nl: 'Niet-klanten in mijn sector en zone', en: 'Non-customers in my sector and area' },
    /* ============== ANALYSE 2.5 — VALUE PROPOSITION buildup ============== */
    /* CVE 2026-05-03 · zéro doublon : analyse-vp suspend, le statement vit dans chap-valueprop. */
    'bnp.analyse.vpEyebrow': {
      fr: 'Au bout du diamant 1',
      nl: 'Aan het einde van diamant 1',
      en: 'At the end of diamond 1'
    },
    'bnp.analyse.vpCliffhanger': {
      fr: 'Une seule conviction <span class="accent">émerge.</span>',
      nl: 'Eén overtuiging <span class="accent">komt naar voren.</span>',
      en: 'A single conviction <span class="accent">emerges.</span>'
    },
    /* CVE 2026-05-17 v2 NNG · -10 mots */
    'bnp.analyse.vpPyramidIntro': {
      fr: 'Gauche · dashboard classique qui pousse de la donnée. Droite · rapport orienté objectif qui produit des insights actionnables.',
      nl: 'Links · klassiek dashboard dat data pusht. Rechts · doelgericht rapport dat actionable insights produceert.',
      en: 'Left · classic dashboard pushing data. Right · goal-oriented report producing actionable insights.'
    },
    'bnp.analyse.vpVerdictBad': {
      fr: 'Mauvaise direction',
      nl: 'Verkeerde richting',
      en: 'Wrong direction'
    },
    'bnp.analyse.vpVerdictGood': {
      fr: 'Bonne direction',
      nl: 'Juiste richting',
      en: 'Right direction'
    },
    'bnp.analyse.vpPyrBefore': {
      fr: 'L\'approche dashboard classique. La donnée brute remontée en information. Cognitive overload garanti.',
      nl: 'De klassieke dashboardaanpak. Ruwe data verheven tot informatie. Cognitive overload gegarandeerd.',
      en: 'The classic dashboard approach. Raw data lifted to information. Cognitive overload guaranteed.'
    },
    'bnp.analyse.vpPyrAfter': {
      fr: 'L\'approche Enterprise Intelligence. La donnée customisée par persona, transformée en information personnalisée, qui produit l\'insight.',
      nl: 'De Enterprise Intelligence-aanpak. Data afgestemd op persona, omgezet in gepersonaliseerde informatie, die de inzicht produceert.',
      en: 'The Enterprise Intelligence approach. Data customised per persona, turned into personalised information, that yields the insight.'
    },
    /* CVE 2026-05-17 rectif · le POC data exploration venait de Marketing, testé chez
       clients pilotes, rejeté par SteerCo. CVE a recadré l'approche via la VP. Les 2 cards
       sont une comparaison séquentielle (avant/après recadrage), pas parallèle. */
    'bnp.analyse.vpBadVerdict': { fr: 'Rejeté en SteerCo', nl: 'Verworpen in SteerCo', en: 'Rejected at SteerCo' },
    'bnp.analyse.vpBadName':    { fr: 'POC Marketing · Data exploration', nl: 'POC Marketing · Data exploration', en: 'Marketing POC · Data exploration' },
    'bnp.analyse.vpBadNote': {
      fr: 'Premier POC porté par Marketing · filtres contextuels + 5 dimensions démographiques. Testé chez clients pilotes, rejeté par le SteerCo. Le commerçant devait construire sa propre lecture.',
      nl: 'Eerste POC gedragen door Marketing · contextuele filters + 5 demografische dimensies. Getest bij pilotklanten, verworpen door de SteerCo. De handelaar moest zelf zijn lezing bouwen.',
      en: 'First POC carried by Marketing · contextual filters + 5 demographic dimensions. Tested with pilot clients, rejected by the SteerCo. The merchant had to build their own reading.'
    },
    'bnp.analyse.vpGoodVerdict': { fr: 'Validé par les clients', nl: 'Goedgekeurd door klanten', en: 'Validated by clients' },
    'bnp.analyse.vpGoodName':    { fr: 'VP recadrée · Goal-oriented report', nl: 'VP heroriënteerd · Goal-oriented report', en: 'VP refocused · Goal-oriented report' },
    'bnp.analyse.vpGoodNote': {
      fr: 'Recadrage post-VP · quatre KPI sur quatre objectifs business. Rouge · décision tout de suite. Orange · point à surveiller. Vert · ce qui marche. Une lecture, une décision.',
      nl: 'Herkadering na VP · vier KPI\'s op vier businessdoelen. Rood · beslissing nu. Oranje · aandachtspunt. Groen · wat werkt. Eén lezing, één beslissing.',
      en: 'Post-VP refocus · four KPIs on four business goals. Red · decide now. Orange · watchpoint. Green · what works. One read, one decision.'
    },
    /* ============== ANALYSE 2.4a — Value Proposition Canvas natif ============== */
    'bnp.analyse.vpcEyebrow': { fr: 'Analyse · Value Proposition Canvas', nl: 'Analyse · Value Proposition Canvas', en: 'Analyse · Value Proposition Canvas' },
    'bnp.analyse.vpcTitle': {
      fr: 'Mapper les <span class="accent">Jobs · Pains · Gains</span> du commerçant.',
      nl: 'De <span class="accent">Jobs · Pains · Gains</span> van de merchant in kaart brengen.',
      en: 'Mapping the merchant\'s <span class="accent">Jobs · Pains · Gains</span>.'
    },
    /* CVE 2026-05-17 v2 NNG · -12 mots · cut warmup "Avant la solution, la friction" */
    'bnp.analyse.vpcLead': {
      fr: 'Le Value Proposition Canvas confronte les jobs du commerçant (mieux connaître ses clients, calibrer ses actions) à l\'offre BNP. Chaque feature MVP doit cocher au moins un Pain Reliever ou un Gain Creator. Sinon, hors scope.',
      nl: 'De Value Proposition Canvas zet de jobs van de handelaar (klanten beter kennen, acties kalibreren) tegenover het BNP-aanbod. Elke MVP-feature moet minstens één Pain Reliever of Gain Creator afvinken. Anders buiten scope.',
      en: 'The Value Proposition Canvas pits the merchant\'s jobs (knowing customers better, calibrating actions) against the BNP offer. Every MVP feature must tick at least one Pain Reliever or Gain Creator. Otherwise, out of scope.'
    },
    'bnp.analyse.vpcCustHead':  { fr: 'Profil commerçant', nl: 'Merchant-profiel', en: 'Merchant profile' },
    'bnp.analyse.vpcCustName':  { fr: 'Jobs to be done',   nl: 'Jobs to be done',   en: 'Jobs to be done' },
    'bnp.analyse.vpcValueHead': { fr: 'Offre BNP MVP',     nl: 'BNP MVP-aanbod',    en: 'BNP MVP offer' },
    'bnp.analyse.vpcValueName': { fr: 'Value Map',         nl: 'Value Map',         en: 'Value Map' },
    'bnp.analyse.vpcJobs':      { fr: 'Customer Jobs',     nl: 'Customer Jobs',     en: 'Customer Jobs' },
    'bnp.analyse.vpcJob1':      { fr: 'Mieux connaître clients et concurrents pour adapter l\'offre', nl: 'Klanten en concurrenten beter kennen om het aanbod aan te passen', en: 'Know customers and competitors better to adapt the offer' },
    'bnp.analyse.vpcJob2':      { fr: 'Développer actions et communications performantes, mesurer leur impact', nl: 'Performante acties en communicatie ontwikkelen, hun impact meten', en: 'Develop high-performing actions and communications, measure their impact' },
    'bnp.analyse.vpcPains':     { fr: 'Pains',             nl: 'Pains',             en: 'Pains' },
    'bnp.analyse.vpcPain1':     { fr: '« Consommateurs peuvent ne pas aimer cette utilisation des données »', nl: '« Consumenten houden mogelijk niet van dit datagebruik »', en: '"Consumers may not like this use of data"' },
    'bnp.analyse.vpcPain2':     { fr: '« Pas d\'expertise data, mais envie d\'investir du temps pour s\'améliorer »', nl: '« Geen data-expertise, maar wel zin om tijd te investeren om beter te worden »', en: '"No data expertise, but eager to invest time to improve"' },
    'bnp.analyse.vpcGains':     { fr: 'Gains',             nl: 'Gains',             en: 'Gains' },
    'bnp.analyse.vpcGain1':     { fr: 'Voir geo-localisation clients, panier moyen, fréquentation', nl: 'Geolocatie klanten, gemiddelde basket, bezoek zien', en: 'See customer geo-location, average basket, foot traffic' },
    'bnp.analyse.vpcGain2':     { fr: 'Comparer ses produits à ceux qui marchent ailleurs', nl: 'Producten vergelijken met wat elders werkt', en: 'Compare products with what works elsewhere' },
    'bnp.analyse.vpcProducts':  { fr: 'Products & Services', nl: 'Products & Services', en: 'Products & Services' },
    'bnp.analyse.vpcProduct1':  { fr: 'Geo-données clients, fréquentation point de vente, panier moyen', nl: 'Klant-geodata, bezoek verkooppunt, gemiddelde basket', en: 'Customer geo-data, point-of-sale traffic, average basket' },
    'bnp.analyse.vpcProduct2':  { fr: 'Comparaison sectorielle anonyme · 12 verticales configurables', nl: 'Anonieme sectorvergelijking · 12 configureerbare verticals', en: 'Anonymous sector comparison · 12 configurable verticals' },
    'bnp.analyse.vpcRelievers': { fr: 'Pain Relievers',    nl: 'Pain Relievers',    en: 'Pain Relievers' },
    'bnp.analyse.vpcReliever1': { fr: 'BNPPF Secure & Trusted data partner — GDPR built-in, pas de PII exposée', nl: 'BNPPF Secure & Trusted data partner — GDPR built-in, geen PII blootgesteld', en: 'BNPPF Secure & Trusted data partner — GDPR built-in, no PII exposed' },
    'bnp.analyse.vpcReliever2': { fr: 'Easy-to-read dashboard prompts insight — l\'interface coache l\'analyse', nl: 'Easy-to-read dashboard prompts insight — de interface coacht de analyse', en: 'Easy-to-read dashboard prompts insight — the interface coaches the read' },
    'bnp.analyse.vpcCreators':  { fr: 'Gain Creators',     nl: 'Gain Creators',     en: 'Gain Creators' },
    'bnp.analyse.vpcCreator1':  { fr: 'Décisions guidées · campagne, opening hours, repositionnement panier', nl: 'Geleide beslissingen · campagne, opening hours, basket-herpositionering', en: 'Guided calls · campaign, opening hours, basket repositioning' },
    'bnp.analyse.vpcCreator2':  { fr: 'Boucle fermée · le mois suivant, l\'effet de la décision est lisible', nl: 'Gesloten lus · volgende maand is het effect van de beslissing zichtbaar', en: 'Closed loop · next month, the effect of the call is readable' },
    'bnp.analyse.vpcSource': {
      fr: '<span class="source-link__lab">Voir le slide original</span><span class="source-link__ref">Ideation Report · octobre 2017 · page 12 (canvas avec persona et post-it d\'atelier)</span><span class="source-link__arrow" aria-hidden="true">↗</span>',
      nl: '<span class="source-link__lab">Bekijk het oorspronkelijke slide</span><span class="source-link__ref">Ideation Report · oktober 2017 · pagina 12 (canvas met persona en workshop-post-its)</span><span class="source-link__arrow" aria-hidden="true">↗</span>',
      en: '<span class="source-link__lab">View original slide</span><span class="source-link__ref">Ideation Report · October 2017 · page 12 (canvas with persona and workshop sticky notes)</span><span class="source-link__arrow" aria-hidden="true">↗</span>'
    },

    /* CVE 2026-05-17 rectif · POC Marketing rejeté par SteerCo → VP recadrée.
       Pas deux directions parallèles · une séquence (POC rejet → VP recadrage). */
    'bnp.prototype.directionEyebrow': {
      fr: 'Prototype · arbitrage post-POC',
      nl: 'Prototype · arbitrage na POC',
      en: 'Prototype · post-POC arbitration'
    },
    'bnp.prototype.directionTitle': {
      fr: 'Le POC Marketing rejeté. <span class="accent">La VP a recadré.</span>',
      nl: 'De Marketing-POC verworpen. <span class="accent">De VP heeft heroriënteerd.</span>',
      en: 'The Marketing POC rejected. <span class="accent">The VP refocused it.</span>'
    },
    'bnp.prototype.directionLead': {
      fr: 'Marketing portait un premier POC data exploration. Rejeté par les clients pilotes et le SteerCo. La VP a recadré · une lecture, une décision.',
      nl: 'Marketing droeg een eerste data-exploration-POC. Verworpen door pilotklanten en SteerCo. De VP heeft heroriënteerd · één lezing, één beslissing.',
      en: 'Marketing carried an initial data-exploration POC. Rejected by pilot clients and the SteerCo. The VP refocused · one read, one decision.'
    },
    /* CVE 2026-05-17 rectif · l'atelier Goals a eu lieu APRÈS la définition de la VP,
       avec Marketing, pour trier les features candidates. 18 candidats au mur, 10 verts
       retenus MVP, 8 gris hors MVP. Consolidés en 3 rapports + 1 phase 2. */
    'bnp.prototype.overviewEyebrow': {
      fr: 'Prototype · atelier Goals avec Marketing',
      nl: 'Prototype · Goals-workshop met Marketing',
      en: 'Prototype · Goals workshop with Marketing'
    },
    'bnp.prototype.overviewTitle': {
      fr: 'Après la VP · <span class="accent">atelier Goals avec Marketing.</span>',
      nl: 'Na de VP · <span class="accent">Goals-workshop met Marketing.</span>',
      en: 'After the VP · <span class="accent">Goals workshop with Marketing.</span>'
    },
    'bnp.prototype.overviewLead': {
      fr: 'Dix-huit features candidates au mur. Dix retenues pour le MVP (vertes), huit hors MVP (grises). Consolidées en trois rapports + un en phase 2.',
      nl: 'Achttien kandidaat-features aan de muur. Tien weerhouden voor MVP (groen), acht buiten MVP (grijs). Geconsolideerd in drie rapporten + één in fase 2.',
      en: 'Eighteen candidate features on the wall. Ten retained for MVP (green), eight out of MVP (grey). Consolidated into three reports + one in phase 2.'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Trois lectures coachées, un flux" (re-statement) ·
       -22 mots. */
    'bnp.prototype.cycleCaption': {
      fr: 'Trois rapports, <strong>une seule boucle de décision</strong>. Question du jour · action · mesure.',
      nl: 'Drie rapporten, <strong>één beslissingsloop</strong>. Vraag van de dag · actie · meting.',
      en: 'Three reports, <strong>one decision loop</strong>. Day\'s question · action · measurement.'
    },
    /* CVE 2026-05-17 · Phase 2 card · 4 clés enfants individuelles (au lieu d'1 clé bloc html). */
    'bnp.prototype.phase2Badge': { fr: 'PHASE 2', nl: 'FASE 2', en: 'PHASE 2' },
    'bnp.prototype.phase2Name': { fr: 'Market Research', nl: 'Marktonderzoek', en: 'Market Research' },
    'bnp.prototype.phase2Q': {
      fr: '« Où ouvrir le prochain shop ? »',
      nl: '« Waar open ik de volgende winkel? »',
      en: '"Where do I open the next shop?"'
    },
    'bnp.prototype.phase2Note': {
      fr: 'Hors MVP · roadmap phase 2.',
      nl: 'Buiten MVP · roadmap fase 2.',
      en: 'Out of MVP · phase 2 roadmap.'
    },

    /* ============== PROTOTYPE · value prop par goal (no big data, coached reads) ============== */
    /* CVE 2026-05-17 v2 NNG · 3 ValueProp compressés · -45 mots total */
    'bnp.prototype.g1ValueProp': {
      fr: '<strong>La promesse :</strong> 5 secondes pour ce qu\'un analyste ferait en 30 minutes. Aucune compétence data requise.',
      nl: '<strong>De belofte :</strong> 5 seconden voor wat een analist in 30 minuten zou doen. Geen data-vaardigheid vereist.',
      en: '<strong>The promise :</strong> 5 seconds for what an analyst would do in 30 minutes. No data skill required.'
    },
    'bnp.prototype.g2ValueProp': {
      fr: '<strong>La promesse :</strong> au lieu d\'explorer 20 segments démographiques, le rapport ne montre que les 3 qui pèsent — et dit lequel décroche.',
      nl: '<strong>De belofte :</strong> in plaats van 20 demografische segmenten te verkennen, toont het rapport alleen de 3 die ertoe doen — en zegt welke afhaakt.',
      en: '<strong>The promise :</strong> instead of exploring 20 demographic segments, the report shows only the 3 that matter — and tells which one is slipping.'
    },
    'bnp.prototype.g3ValueProp': {
      fr: '<strong>La promesse :</strong> aucune arithmétique mentale. Le delta est calculé côté serveur, affiché à droite du graphique.',
      nl: '<strong>De belofte :</strong> geen mentaal rekenwerk. Het verschil wordt aan serverzijde berekend, rechts van elke grafiek getoond.',
      en: '<strong>The promise :</strong> no mental arithmetic. The delta is computed server-side, shown next to each chart.'
    },

    /* ============== PROTOTYPE 03 — Goal 1 Performance Analysis ============== */
    'bnp.prototype.g1Eyebrow': { fr: 'Goal 1 · Performance Analysis · cycle position : Control', nl: 'Doel 1 · Performance Analysis · cycle position : Control', en: 'Goal 1 · Performance Analysis · cycle position : Control' },
    'bnp.prototype.g1Title': {
      fr: 'Comment je performe <span class="accent">ce mois-ci ?</span>',
      nl: 'Hoe presteer ik <span class="accent">deze maand?</span>',
      en: 'How am I performing <span class="accent">this month?</span>'
    },
    /* CVE 2026-05-17 v2 NNG · -20 mots · cut warmup "Le commerçant ouvre le dashboard" */
    'bnp.prototype.g1Lead': {
      fr: 'Cinq secondes pour la lecture du mois · trois KPI, son shop comparé au réseau, l\'écart vs N-1 mis en lumière. Pas de filtres, pas de graphique à construire. La donnée parle, il décide.',
      nl: 'Vijf seconden voor de maandlezing · drie KPI\'s, zijn winkel vergeleken met het netwerk, het verschil vs N-1 belicht. Geen filters, geen grafiek te bouwen. De data spreekt, hij beslist.',
      en: 'Five seconds for the monthly read · three KPIs, his shop compared to the network, the gap vs N-1 highlighted. No filters, no chart to build. The data speaks, he decides.'
    },
    'bnp.prototype.g1KpiTrans':  { fr: 'Transactions',         nl: 'Transactions',         en: 'Transactions' },
    'bnp.prototype.g1KpiRev':    { fr: 'Revenue',              nl: 'Revenue',              en: 'Revenue' },
    'bnp.prototype.g1KpiBasket': { fr: 'Average basket size',  nl: 'Average basket size',  en: 'Average basket size' },
    'bnp.prototype.g1Branch':    { fr: 'Branch',               nl: 'Branch',               en: 'Branch' },
    'bnp.prototype.g1Trans':     { fr: 'Transactions',         nl: 'Transactions',         en: 'Transactions' },
    'bnp.prototype.g1Rev':       { fr: 'Revenue',              nl: 'Revenue',              en: 'Revenue' },
    'bnp.prototype.g1Share':     { fr: 'Share',                nl: 'Share',                en: 'Share' },
    'bnp.prototype.g1WhatLab':   { fr: "What's important",     nl: "What's important",     en: "What's important" },
    'bnp.prototype.g1WhatTxt': {
      fr: 'In January 2018, your average basket size declined by 7% compared to January 2017, but you had more transactions and revenue. It must be you have more clients or returning visitors however they buy less per visit.',
      nl: 'In januari 2018 daalde uw gemiddelde mand met 7% ten opzichte van januari 2017, maar u had meer transacties en omzet. Mogelijk heeft u meer klanten of terugkerende bezoekers, maar zij kopen minder per bezoek.',
      en: 'In January 2018, your average basket size declined by 7% compared to January 2017, but you had more transactions and revenue. It must be you have more clients or returning visitors however they buy less per visit.'
    },
    'bnp.prototype.g1Bene1': { fr: '3 KPI lus en 5 secondes, sans manipulation.', nl: '3 KPI\'s in 5 seconden gelezen, zonder manipulatie.', en: '3 KPIs read in 5 seconds, no manipulation.' },
    'bnp.prototype.g1Bene2': { fr: 'Shop comparison qui révèle d\'un coup d\'œil le shop qui décroche.', nl: 'Shop comparison die in één oogopslag onthult welke winkel afhaakt.', en: 'Shop comparison that reveals at a glance which store is slipping.' },
    'bnp.prototype.g1Bene3': { fr: 'Annotation « What\'s important » qui suggère où agir, en français pas en jargon data.', nl: 'Annotatie "What\'s important" die suggereert waar te handelen, in eenvoudige taal, geen datajargon.', en: '"What\'s important" annotation that suggests where to act, in plain language, no data jargon.' },
    'bnp.prototype.g1SourceLab': { fr: 'Voir le wireframe original',         nl: 'Bekijk het originele wireframe',     en: 'View original wireframe' },
    'bnp.prototype.g1SourceRef': { fr: 'Concept Report · mars 2018 · page 43', nl: 'Concept Report · maart 2018 · pagina 43', en: 'Concept Report · March 2018 · page 43' },

    /* ============== PROTOTYPE 04 — Goal 2 Business Expansion ============== */
    'bnp.prototype.g2Eyebrow': { fr: 'Goal 2 · Business Expansion · cycle position : Learn', nl: 'Doel 2 · Business Expansion · cycle position : Learn', en: 'Goal 2 · Business Expansion · cycle position : Learn' },
    'bnp.prototype.g2Title': {
      fr: 'Comment j\'agrandis <span class="accent">mon business ?</span>',
      nl: 'Hoe laat ik <span class="accent">mijn business groeien?</span>',
      en: 'How do I grow <span class="accent">my business?</span>'
    },
    /* CVE 2026-05-17 v2 NNG · -20 mots · cut warmup "Une fois la photo du business prise" */
    'bnp.prototype.g2Lead': {
      fr: 'Mode action · cinq lectures coachées pour décider quoi changer. Qui sont mes vrais clients, quand achètent-ils, qui revient, qui part, quand j\'ouvre. Chaque feature pointe vers une décision.',
      nl: 'Actiemodus · vijf begeleide lezingen om te beslissen wat te veranderen. Wie zijn mijn echte klanten, wanneer kopen ze, wie komt terug, wie vertrekt, wanneer open ik. Elke feature wijst naar een beslissing.',
      en: 'Action mode · five coached reads to decide what to change. Who are my real customers, when do they buy, who returns, who leaves, when do I open. Each feature points to a decision.'
    },
    'bnp.prototype.g2Bene1': { fr: 'Cinq lectures complémentaires couvrent la décision marketing locale.', nl: 'Vijf complementaire lezingen dekken de lokale marketingbeslissing.', en: 'Five complementary reads cover the local marketing call.' },
    'bnp.prototype.g2Bene2': { fr: 'Cohérence visuelle : chaque feature ouvre sur un écran type, pas une exploration libre.', nl: 'Visuele coherentie : elke feature opent op een vast scherm, geen vrije exploratie.', en: 'Visual coherence : each feature opens on a fixed screen, not free exploration.' },
    'bnp.prototype.g2Bene3': { fr: 'L\'action suggérée est explicite : étendre les heures, cibler une commune, relancer une cohorte.', nl: 'De voorgestelde actie is expliciet : verlengen van openingsuren, een gemeente targeten, een cohort heractiveren.', en: 'The suggested action is explicit : extend hours, target a commune, re-engage a cohort.' },
    'bnp.prototype.g2SourceLab': { fr: 'Voir le wireframe original',          nl: 'Bekijk het originele wireframe',         en: 'View original wireframe' },
    'bnp.prototype.g2SourceRef': { fr: 'Concept Report · mars 2018 · pages 46-49', nl: 'Concept Report · maart 2018 · pagina\'s 46-49', en: 'Concept Report · March 2018 · pages 46-49' },

    /* ============== PROTOTYPE 05 — Goal 3 Evaluating Actions + climax Léonidas ============== */
    'bnp.prototype.g3Eyebrow': { fr: 'Goal 3 · Evaluating Actions · cycle position : Observe', nl: 'Doel 3 · Evaluating Actions · cycle position : Observe', en: 'Goal 3 · Evaluating Actions · cycle position : Observe' },
    'bnp.prototype.g3Title': {
      fr: 'L\'action que j\'ai prise, <span class="accent">elle a marché ?</span>',
      nl: 'De actie die ik heb genomen, <span class="accent">heeft die gewerkt?</span>',
      en: 'The action I took, <span class="accent">did it work?</span>'
    },
    /* CVE 2026-05-17 v2 NNG · -11 mots · phrase plus directe */
    'bnp.prototype.g3Lead': {
      fr: 'Pour évaluer une action, il faut comparer. Trois fenêtres temps · <strong>même période N-1</strong>, <strong>période précédente</strong>, <strong>même période courante (multi-shops)</strong>. Co-design avec Léonidas sur ce socle.',
      nl: 'Om een actie te evalueren, moet je vergelijken. Drie tijdsvensters · <strong>zelfde periode N-1</strong>, <strong>vorige periode</strong>, <strong>zelfde lopende periode (multi-shops)</strong>. Co-design met Léonidas op die basis.',
      en: 'To evaluate an action, you have to compare. Three time windows · <strong>same period N-1</strong>, <strong>previous period</strong>, <strong>same period current (multi-shops)</strong>. Co-design with Léonidas on this foundation.'
    },
    'bnp.prototype.g3LastYear': { fr: 'Same period last year',             nl: 'Same period last year',             en: 'Same period last year' },
    'bnp.prototype.g3Prev':     { fr: 'Previous period',                    nl: 'Previous period',                    en: 'Previous period' },
    'bnp.prototype.g3Current':  { fr: 'Same period (shop comparison only)', nl: 'Same period (shop comparison only)', en: 'Same period (shop comparison only)' },
    'bnp.prototype.g3ModeALab':  { fr: 'Mode A',                             nl: 'Modus A',                            en: 'Mode A' },
    'bnp.prototype.g3ModeBLab':  { fr: 'Mode B',                             nl: 'Modus B',                            en: 'Mode B' },
    'bnp.prototype.g3ModeAName': { fr: 'Period comparison',                 nl: 'Period comparison',                 en: 'Period comparison' },
    'bnp.prototype.g3ModeADesc': {
      fr: 'Même shop, deux fenêtres temps. « Janvier 2018 vs janvier 2017 » sur revenus, transactions, panier moyen. Le delta est calculé, pas à reconstruire.',
      nl: 'Zelfde shop, twee tijdsvensters. « Januari 2018 vs januari 2017 » op omzet, transacties, gemiddeld mandje. Het verschil wordt berekend, niet opnieuw te bouwen.',
      en: 'Same shop, two time windows. "January 2018 vs January 2017" on revenue, transactions, average basket. The delta is calculated, not to rebuild.'
    },
    'bnp.prototype.g3ModeBName': { fr: 'Shop comparison',                   nl: 'Shop comparison',                   en: 'Shop comparison' },
    'bnp.prototype.g3ModeBDesc': {
      fr: 'Deux shops du même groupe, même période. Le commerçant pose ses deux meilleurs/moins bons côte-à-côte et lit l\'écart d\'un coup d\'œil. Pas d\'exploration, une lecture frontale.',
      nl: 'Twee shops van dezelfde groep, zelfde periode. De handelaar zet zijn twee beste/minst goede zij aan zij en leest het verschil in één oogopslag. Geen exploratie, een frontale lezing.',
      en: 'Two shops in the same group, same period. The merchant puts his two best/least good side-by-side and reads the gap at a glance. No exploration, a frontal read.'
    },
    'bnp.prototype.g3Bene1': { fr: 'Trois fenêtres temps canoniques couvrent les comparaisons utiles : N-1, période précédente, multi-shops.', nl: 'Drie canonieke tijdsvensters dekken de nuttige vergelijkingen : N-1, vorige periode, multi-shops.', en: 'Three canonical time windows cover useful comparisons : last year, previous period, multi-shops.' },
    'bnp.prototype.g3Bene2': { fr: 'Le delta chiffré est calculé à la place du commerçant, pas en self-service.', nl: 'Het cijfermatige verschil wordt berekend voor de handelaar, niet in self-service.', en: 'The numeric delta is calculated for the merchant, not self-service.' },
    'bnp.prototype.g3Bene3': { fr: 'La comparaison shop par shop révèle les écarts d\'un coup d\'œil et oriente la décision.', nl: 'De vergelijking shop per shop onthult de verschillen in één oogopslag en stuurt de beslissing.', en: 'The shop-by-shop comparison reveals gaps at a glance and guides the call.' },
    'bnp.prototype.g3SourceLab': { fr: 'Voir les wireframes originaux',                              nl: 'Bekijk de originele wireframes',                              en: 'View original wireframes' },
    'bnp.prototype.g3SourceRef': { fr: 'Concept Report · mars 2018 · pages 53-58 (Time Selection · Shop Comparison · Léonidas)', nl: 'Concept Report · maart 2018 · pagina\'s 53-58 (Time Selection · Shop Comparison · Léonidas)', en: 'Concept Report · March 2018 · pages 53-58 (Time Selection · Shop Comparison · Léonidas)' },

    /* ============== PROTOTYPE 06 — Goal 4 Market Research (phase 2 roadmap) ============== */
    'bnp.prototype.g4Eyebrow': { fr: 'Goal 4 · Market Research · Phase 2 roadmap', nl: 'Doel 4 · Market Research · Fase 2 roadmap', en: 'Goal 4 · Market Research · Phase 2 roadmap' },
    'bnp.prototype.g4Title': {
      fr: 'Où ouvrir <span class="accent">le prochain shop ?</span>',
      nl: 'Waar open ik <span class="accent">de volgende winkel?</span>',
      en: 'Where do I open <span class="accent">the next shop?</span>'
    },
    /* CVE 2026-05-17 v2 NNG · -16 mots */
    'bnp.prototype.g4Lead': {
      fr: 'Décision stratégique · où implanter une nouvelle boutique, sur quelle vertical étendre. Hors scope MVP · la donnée est là, le service demande un cran de maturité côté sponsor. Phase 2, horizon 2020.',
      nl: 'Strategische beslissing · waar een nieuwe winkel openen, in welke verticale uitbreiden. Buiten MVP-scope · de data is er, de dienst vraagt een extra maturiteit aan sponsorzijde. Fase 2, horizon 2020.',
      en: 'Strategic decision · where to open a new shop, in which vertical to extend. Out of MVP scope · the data is there, the service requires another level of sponsor maturity. Phase 2, horizon 2020.'
    },
    'bnp.prototype.g4Feat1Name': { fr: 'Best business location', nl: 'Best business location', en: 'Best business location' },
    'bnp.prototype.g4Feat1Desc': { fr: 'Cartographie des zones où la donnée transactionnelle révèle une demande non couverte. Le commerçant choisit son prochain emplacement avec une preuve, pas une intuition.', nl: 'Cartografie van zones waar transactiedata een onbediende vraag onthult. De handelaar kiest zijn volgende locatie met bewijs, geen intuïtie.', en: 'Mapping of zones where transactional data reveals uncovered demand. The merchant picks his next location with evidence, not intuition.' },
    'bnp.prototype.g4Feat2Name': { fr: 'Opportunities by industry', nl: 'Opportunities by industry', en: 'Opportunities by industry' },
    'bnp.prototype.g4Feat2Desc': { fr: 'Détection de verticales adjacentes où le profil client achète mais où l\'offre actuelle n\'existe pas. Pour les enseignes qui veulent diversifier sans tâtonner.', nl: 'Detectie van aangrenzende verticalen waar het klantprofiel koopt maar het huidige aanbod niet bestaat. Voor ketens die willen diversifiëren zonder te tasten.', en: 'Detection of adjacent verticals where the customer profile buys but the current offer is missing. For chains that want to diversify without guessing.' },
    'bnp.prototype.g4Tag': { fr: 'Phase 2 · roadmap 2020', nl: 'Fase 2 · roadmap 2020', en: 'Phase 2 · roadmap 2020' },

    /* ============== CONCEPT 01 — DELIVERABLE : argumentation sponsor ============== */
    /* CVE 2026-05-03 · concept-deliverable refonte WAOUH (86 + sommaire 7 chapitres) */
    'bnp.concept.delivEyebrow': { fr: 'Le livrable post-DD', nl: 'De post-DD oplevering', en: 'The post-DD deliverable' },
    'bnp.concept.delivPagesLabel': { fr: 'pages signées', nl: 'ondertekende pagina\'s', en: 'signed pages' },
    'bnp.concept.delivPhrase': {
      fr: 'Le sponsor a tout le matériel pour décider.',
      nl: 'De sponsor heeft alles om te beslissen.',
      en: 'The sponsor has everything to decide.'
    },
    /* Sommaire 7 chapitres du Concept Report */
    'bnp.concept.toc1Title': { fr: 'Brief & mandat', nl: 'Briefing & mandaat', en: 'Brief & mandate' },
    'bnp.concept.toc2Title': { fr: 'Discover · 6 PME terrain', nl: 'Discover · 6 kmo\'s op het terrein', en: 'Discover · 6 SMEs in the field' },
    'bnp.concept.toc3Title': { fr: 'Define · 6 barrières · journeys', nl: 'Define · 6 barrières · journeys', en: 'Define · 6 barriers · journeys' },
    'bnp.concept.toc4Title': { fr: 'Value Proposition', nl: 'Value Proposition', en: 'Value Proposition' },
    'bnp.concept.toc5Title': { fr: 'Develop · 4 goals · ateliers', nl: 'Develop · 4 doelen · workshops', en: 'Develop · 4 goals · workshops' },
    'bnp.concept.toc6Title': { fr: 'Deliver · wireframes · POC', nl: 'Deliver · wireframes · POC', en: 'Deliver · wireframes · POC' },
    'bnp.concept.toc7Title': { fr: 'MVP · user stories · roadmap', nl: 'MVP · user stories · roadmap', en: 'MVP · user stories · roadmap' },
    'bnp.concept.delivSourceLab': { fr: 'Ouvrir le document complet',                       nl: 'Open het volledige document',           en: 'Open the full document' },
    'bnp.concept.delivSourceRef': { fr: 'Concept Report · mars 2018 · PDF complet 86 pages', nl: 'Concept Report · maart 2018 · volledige PDF 86 pagina\'s', en: 'Concept Report · March 2018 · full PDF 86 pages' },

    /* ============== PROTOTYPE 3.4 — User test 6 PME ============== */
    'bnp.prototype.utEyebrow': { fr: 'Prototype · User test 6 PME', nl: 'Prototype · User test 6 kmo\'s', en: 'Prototype · 6 SME user test' },
    'bnp.prototype.utTitle': {
      fr: 'Six commerçants. <span class="accent">Une promesse d\'achat ferme.</span>',
      nl: 'Zes merchants. <span class="accent">Eén harde aankoopbelofte.</span>',
      en: 'Six shopkeepers. <span class="accent">One firm purchase commitment.</span>'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Pas un usability test poli. Une validation commerciale"
       (claim final qui restate le fact). Fait sec, mécanisme + outcome. -14 mots. */
    'bnp.prototype.utLead': {
      fr: 'Six PME testent le prototype Spotfire sans aide. <strong>Un — le groupe Léonidas — signe une promesse d\'achat ferme.</strong>',
      nl: 'Zes kmo\'s testen het Spotfire-prototype zonder hulp. <strong>Eén — de Léonidas-groep — tekent een vaste aankoopbelofte.</strong>',
      en: 'Six SMEs test the Spotfire prototype unaided. <strong>One — the Léonidas group — signs a firm purchase commitment.</strong>'
    },
    'bnp.prototype.utStat1': { fr: 'PME testées',                       nl: 'Kmo\'s getest',                        en: 'SMEs tested' },
    'bnp.prototype.utStat2': { fr: 'Promesse d\'achat signée (Léonidas)', nl: 'Aankoopbelofte getekend (Léonidas)',  en: 'Purchase commitment signed (Léonidas)' },
    'bnp.prototype.utStat3': { fr: 'Refus catégorique',                  nl: 'Categorische weigering',               en: 'Categorical refusal' },
    'bnp.prototype.utQuote': {
      fr: 'Le sponsor a signé. Six PME ont été testées · une a souscrit, cinq ont refusé. Le go production a été décidé sur l\'engagement écrit du groupe Léonidas, daté avant le développement.',
      nl: 'De sponsor heeft getekend. Zes kmo\'s zijn getest · één heeft zich geëngageerd, vijf hebben geweigerd. De go-productie werd genomen op basis van het schriftelijke engagement van de groep Léonidas, gedateerd vóór de ontwikkeling.',
      en: 'The sponsor signed. Six SMEs were tested · one committed, five declined. The go-production decision was made on the written commitment of the Léonidas group, dated before development.'
    },
    /* ============== CHAPTERS — 4 phases Double Diamond (Research/Analyse/Prototype/Concept) ============== */
    'bnp.chapResearch.overline': { fr: 'Discover · récolter la matière du terrain', nl: 'Discover · het materiaal van het terrein verzamelen', en: 'Discover · gather raw material from the field' },
    'bnp.chapResearch.ddCap':    { fr: 'Vous êtes ici · Diamant 1 · moitié gauche · 4 jalons', nl: 'U bent hier · Diamant 1 · linkerhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · left half · 4 milestones' },
    'bnp.chapResearch.label': { fr: 'Phase 01 · Research', nl: 'Fase 01 · Research', en: 'Phase 01 · Research' },
    'bnp.chapAnalyse.overline': { fr: 'Define · resserrer le focus, argumenter', nl: 'Define · de focus aanscherpen, argumenteren', en: 'Define · sharpen the focus, build the argument' },
    'bnp.chapAnalyse.ddCap':    { fr: 'Vous êtes ici · Diamant 1 · moitié droite · 4 jalons', nl: 'U bent hier · Diamant 1 · rechterhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · right half · 4 milestones' },
    'bnp.chapAnalyse.label': { fr: 'Phase 02 · Analyse', nl: 'Fase 02 · Analyse', en: 'Phase 02 · Analyse' },
    /* CVE 2026-05-03 · canonical narrative DD · chap-prototype = D2 H2 (Deliver) */
    'bnp.chapPrototype.overline': { fr: 'Deliver · prototyping & testing · valider avec les clients', nl: 'Deliver · prototyping & testing · valideren met klanten', en: 'Deliver · prototyping & testing · validate with clients' },
    'bnp.chapPrototype.label': { fr: 'Phase 04 · Prototype', nl: 'Fase 04 · Prototype', en: 'Phase 04 · Prototype' },
    /* NEW · chap-ideation = D2 H1 (Develop · ateliers co-créatifs) */
    'bnp.chapIdeation.overline': { fr: 'Develop · ateliers co-créatifs · explorer les pistes', nl: 'Develop · co-creatieve workshops · pistes verkennen', en: 'Develop · co-creative workshops · explore the paths' },
    'bnp.chapIdeation.label':    { fr: 'Phase 03 · Ideation', nl: 'Fase 03 · Ideation', en: 'Phase 03 · Ideation' },
    'bnp.chapIdeation.ddCap':    { fr: 'Vous êtes ici · Diamant 2 · moitié gauche · Develop', nl: 'U bent hier · Diamant 2 · linkerhelft · Develop', en: 'You are here · Diamond 2 · left half · Develop' },
    /* Legacy (orphelins inertes mais conservés) */
    'bnp.chapPrototype.ddCap':    { fr: 'Vous êtes ici · Diamant 2 · moitié droite · 4 jalons', nl: 'U bent hier · Diamant 2 · rechterhelft · 4 mijlpalen', en: 'You are here · Diamond 2 · right half · 4 milestones' },
    /* CVE 2026-05-03 · chap-concept WOW MOMENT statement géant typographique (mirror VP) */
    'bnp.chapConcept.eyebrow': { fr: 'Diamant 2 · cristallisation finale', nl: 'Diamant 2 · finale kristallisatie', en: 'Diamond 2 · final crystallization' },
    'bnp.chapConcept.phrase': {
      fr: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Pas</span> un rapport à classer.</span><span class="chap-vp-statement__affirm">Un dossier où le sponsor voit <em>où il investit</em>.</span>',
      nl: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Geen</span> rapport om weg te bergen.</span><span class="chap-vp-statement__affirm">Een dossier waar de sponsor ziet <em>waarin hij investeert</em>.</span>',
      en: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Not</span> a report to file away.</span><span class="chap-vp-statement__affirm">A case where the sponsor sees <em>where they invest</em>.</span>'
    },
    'bnp.chapConcept.consequences': {
      fr: '<span>86 pages signées</span><span class="chap-vp-statement__bullet">·</span><span>4 fonctions alignées</span><span class="chap-vp-statement__bullet">·</span><span>1 PME pré-signe</span>',
      nl: '<span>86 ondertekende pagina\'s</span><span class="chap-vp-statement__bullet">·</span><span>4 afgestemde functies</span><span class="chap-vp-statement__bullet">·</span><span>1 kmo tekent vooraf</span>',
      en: '<span>86 signed pages</span><span class="chap-vp-statement__bullet">·</span><span>4 functions aligned</span><span class="chap-vp-statement__bullet">·</span><span>1 SME pre-signs</span>'
    },
    /* CVE 2026-05-03 · chap-valueprop NEW (outcome divider · cristallisation 2 fragments) */
    /* CVE 2026-05-03 · WOW MOMENT · statement canonique géant + footer 3 conséquences */
    'bnp.chapValueProp.eyebrow': { fr: 'Diamant 1 · cristallisation', nl: 'Diamant 1 · kristallisatie', en: 'Diamond 1 · crystallization' },
    'bnp.chapValueProp.phrase': {
      fr: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Pas</span> un système exploratoire de métriques.</span><span class="chap-vp-statement__affirm">Des <em>rapports orientés objectifs</em>, avec des <em>outcomes actionnables</em>.</span>',
      nl: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Geen</span> exploratief metrieksysteem.</span><span class="chap-vp-statement__affirm"><em>Doelgerichte rapporten</em>, met <em>actionable outcomes</em>.</span>',
      en: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Not</span> an exploratory metrics system.</span><span class="chap-vp-statement__affirm"><em>Goal-oriented reports</em>, with <em>actionable outcomes</em>.</span>'
    },
    'bnp.chapValueProp.consequences': {
      fr: '<span>Stakeholders <span class="chap-vp-statement__arrow">→</span> empathie commerçant</span><span class="chap-vp-statement__bullet">·</span><span>Produit <span class="chap-vp-statement__arrow">→</span> MVP en ligne de mire</span><span class="chap-vp-statement__bullet">·</span><span>Build <span class="chap-vp-statement__arrow">→</span> idéation légitime</span>',
      nl: '<span>Stakeholders <span class="chap-vp-statement__arrow">→</span> empathie handelaar</span><span class="chap-vp-statement__bullet">·</span><span>Product <span class="chap-vp-statement__arrow">→</span> MVP in het vizier</span><span class="chap-vp-statement__bullet">·</span><span>Build <span class="chap-vp-statement__arrow">→</span> legitieme ideation</span>',
      en: '<span>Stakeholders <span class="chap-vp-statement__arrow">→</span> merchant empathy</span><span class="chap-vp-statement__bullet">·</span><span>Product <span class="chap-vp-statement__arrow">→</span> MVP in sight</span><span class="chap-vp-statement__bullet">·</span><span>Build <span class="chap-vp-statement__arrow">→</span> legitimate ideation</span>'
    },
    /* ============== CHAPTER S — Situation (NEW 2026-04-30 s2 — STAR 4 acts) ============== */
    /* STORY NAV sticky — 4 phases × 4 jalons, juste les noms d'ateliers/deliverables */
    'bnp.snm.gResearch':   { fr: 'Research',  nl: 'Research',  en: 'Research' },
    'bnp.snm.gAnalyse':    { fr: 'Analyse',   nl: 'Analyse',   en: 'Analyse' },
    'bnp.snm.gPrototype':  { fr: 'Prototype', nl: 'Prototype', en: 'Prototype' },
    'bnp.snm.r1': { fr: '6 interviews PME terrain', nl: '6 kmo-interviews op het terrein', en: '6 SME field interviews' },
    'bnp.snm.r2': { fr: 'Benchmark concurrents (Barclays, Proximus, BBVA)', nl: 'Benchmark concurrenten (Barclays, Proximus, BBVA)', en: 'Competitors benchmark (Barclays, Proximus, BBVA)' },
    'bnp.snm.r4': { fr: '9 segments B2B identifiés', nl: '9 B2B-segmenten geïdentificeerd', en: '9 B2B segments identified' },
    'bnp.snm.a1': { fr: '6 Key Barriers identifiées', nl: '6 Key Barriers geïdentificeerd', en: '6 Key Barriers identified' },
    'bnp.snm.a3': { fr: 'Could-Be journey + GAP analyse', nl: 'Could-Be journey + GAP-analyse', en: 'Could-Be journey + GAP analysis' },
    'bnp.snm.a4': { fr: 'Value Proposition Canvas + Lean Canvas', nl: 'Value Proposition Canvas + Lean Canvas', en: 'Value Proposition Canvas + Lean Canvas' },
    'bnp.snm.p1': { fr: 'Service blueprint · 5 journeys end-to-end', nl: 'Service blueprint · 5 end-to-end journeys', en: 'Service blueprint · 5 end-to-end journeys' },
    'bnp.snm.p2': { fr: 'Sprint design · 3 goals coachés', nl: 'Sprint design · 3 gecoachte goals', en: 'Sprint design · 3 coached goals' },
    'bnp.snm.p4': { fr: 'User test 6 PME · validation hypothèses', nl: 'User test 6 kmo\'s · hypothesevalidatie', en: 'User test 6 SMEs · hypothesis validation' },
    'bnp.snm.gIntake':    { fr: 'Intake', nl: 'Intake', en: 'Intake' },
    'bnp.snm.intakeTip':  { fr: 'Brief intake · cadre du projet', nl: 'Brief intake · projectkader', en: 'Brief intake · project frame' },
    'bnp.snm.intakeRoadmap': { fr: 'Roadmap méthodologique', nl: 'Methodologische roadmap', en: 'Methodological roadmap' },
    'bnp.snm.gValueProp': { fr: 'VP', nl: 'VP', en: 'VP' },
    'bnp.snm.gIdeation':  { fr: 'Ideation', nl: 'Ideation', en: 'Ideation' },
    'bnp.snm.gConceptReport': { fr: 'Report', nl: 'Report', en: 'Report' },
    'bnp.snm.vp':    { fr: 'Proposition de valeur · cristallisation chiffrée, quantifiée, prouvée', nl: 'Value Proposition · gekwantificeerde, bewezen kristallisatie', en: 'Value Proposition · quantified, proven crystallization' },
    'bnp.snm.iChap': { fr: 'Phase 03 · Ideation · ouverture D2', nl: 'Fase 03 · Ideation · opening D2', en: 'Phase 03 · Ideation · D2 opening' },
    'bnp.snm.pChap': { fr: 'Phase 04 · Prototype · ouverture validation', nl: 'Fase 04 · Prototype · opening validatie', en: 'Phase 04 · Prototype · validation opening' },
    'bnp.snm.cChap': { fr: 'Livrable · ouverture post-DD', nl: 'Livrable · opening post-DD', en: 'Deliverable · opening post-DD' },
    'bnp.snm.c1':  { fr: 'Concept Report signé · argumentation sponsor', nl: 'Concept Report ondertekend · sponsorargumentatie', en: 'Concept Report signed · sponsor argumentation' },
    'bnp.snm.c2':  { fr: 'Stakeholder alignment · « le bébé de tout le monde »', nl: 'Stakeholder alignment · « ieders kindje »', en: 'Stakeholder alignment · "everyone\'s baby"' },
    'bnp.snm.cTW': { fr: 'Triple-Win · arbitre de chaque décision', nl: 'Triple-Win · scheidsrechter van elke beslissing', en: 'Triple-Win · arbiter of every decision' },
    'bnp.snm.c3':  { fr: 'Outcome · signal commercial écrit', nl: 'Outcome · geschreven commercieel signaal', en: 'Outcome · written commercial signal' },
    /* PROPOSED ROADMAP — vue d'ensemble entre Hero et Chapter S */
    'bnp.proposed.eyebrow': {
      fr: 'La roadmap proposée',
      nl: 'De voorgestelde roadmap',
      en: 'The proposed roadmap'
    },
    'bnp.proposed.title': {
      fr: 'Comment j\'ai cadré <span class="accent">les six mois.</span>',
      nl: 'Hoe ik <span class="accent">de zes maanden</span> heb gekaderd.',
      en: 'How I framed <span class="accent">the six months.</span>'
    },
    'bnp.proposed.lead': {
      fr: 'De l\'opportunité au signal de marché. Un parcours méthodologique en quatre actes, du Design Thinking jusqu\'à un prototype testé en condition réelle.',
      nl: 'Van de opportuniteit tot het marktsignaal. Een methodologisch traject in vier akten, van Design Thinking tot een prototype getest in reële omstandigheden.',
      en: 'From opportunity to market signal. A four-act methodological journey, from Design Thinking through to a prototype tested under real conditions.'
    },
    'bnp.proposed.researchLi1': { fr: 'Interviews PME', nl: 'Kmo-interviews', en: 'SME interviews' },
    'bnp.proposed.researchLi2': { fr: 'Benchmark', nl: 'Benchmark', en: 'Benchmark' },
    'bnp.proposed.researchLi3': { fr: 'Segments B2B', nl: 'B2B-segmenten', en: 'B2B segments' },
    'bnp.proposed.researchLi4': { fr: 'Segments B2B', nl: 'B2B-segmenten', en: 'B2B segments' },

    'bnp.proposed.analyseLi1': { fr: 'Key barriers', nl: 'Key barriers', en: 'Key barriers' },
    'bnp.proposed.analyseLi2': { fr: 'AS-IS journey', nl: 'AS-IS journey', en: 'AS-IS journey' },
    'bnp.proposed.analyseLi3': { fr: 'GAP analyse', nl: 'GAP-analyse', en: 'GAP analysis' },
    'bnp.proposed.analyseLi4': { fr: 'VPC · Lean canvas', nl: 'VPC · Lean canvas', en: 'VPC · Lean canvas' },

    /* CVE 2026-05-03 · VP bridge entre D1 et D2 + CR livrable post-DD */
    'bnp.proposed.vpLab': { fr: 'Value Proposition · pont', nl: 'Value Proposition · brug', en: 'Value Proposition · bridge' },
    'bnp.proposed.vpLi1': { fr: 'Statement de valeur arbitré', nl: 'Gevalideerd value statement', en: 'Arbitrated value statement' },
    'bnp.proposed.vpLi2': { fr: 'Bascule diamant 1 → diamant 2', nl: 'Overgang diamant 1 → diamant 2', en: 'Diamond 1 → Diamond 2 pivot' },
    'bnp.proposed.crLab': { fr: 'Concept Report · livrable', nl: 'Concept Report · oplevering', en: 'Concept Report · deliverable' },

    'bnp.proposed.prototypeLi1': { fr: 'Service blueprint', nl: 'Service blueprint', en: 'Service blueprint' },
    'bnp.proposed.prototypeLi2': { fr: 'Sprint design', nl: 'Sprint design', en: 'Sprint design' },
    'bnp.proposed.prototypeLi3': { fr: 'POC Spotfire', nl: 'POC Spotfire', en: 'Spotfire POC' },
    'bnp.proposed.prototypeLi4': { fr: 'User tests', nl: 'User tests', en: 'User tests' },

    'bnp.proposed.conceptLi1': { fr: 'Concept report', nl: 'Concept report', en: 'Concept report' },
    'bnp.proposed.conceptLi2': { fr: 'User stories', nl: 'User stories', en: 'User stories' },
    'bnp.proposed.conceptLi3': { fr: 'User flows', nl: 'User flows', en: 'User flows' },
    'bnp.proposed.conceptLi4': { fr: 'Decision pack', nl: 'Decision pack', en: 'Decision pack' },

    'bnp.proposed.storyEyebrow': {
      fr: 'Le fil conducteur · Six mois en 12 jalons',
      nl: 'De rode draad · zes maanden in 12 mijlpalen',
      en: 'The thread · six months in 12 milestones'
    },
    /* CVE 2026-05-17 v2 NNG · -22 mots · cut glossaire MVP + meta-narration */
    'bnp.proposed.cap': {
      fr: 'À la sortie · MVP prioritisé en user stories, signé Banking · IT · Legal · Marketing.',
      nl: 'Aan de uitgang · MVP geprioriteerd in user stories, ondertekend door Banking · IT · Legal · Marketing.',
      en: 'Exit deliverable · MVP prioritised in user stories, signed off by Banking · IT · Legal · Marketing.'
    },

    /* ============== STAR TL;DR STRIP (NEW) ============== */
    /* LE BRIEF + LE CATALYSEUR — 2 sections vertical, ouvrent l'histoire sans
       spoilers. Le climax (Léonidas + chiffres) est réservé à la section Result.
       CVE 2026-04-30 night spec : "découvrir les choses petit à petit". */
    /* CVE 2026-05-12 · TL;DR Hero · 4 questions du recruteur en 90 secondes (BNP) */
    'bnp.tldr.eyebrow': { fr: 'En 90 secondes', nl: 'In 90 seconden', en: 'In 90 seconds' },
    'bnp.tldr.l1': { fr: 'Le problème', nl: 'Het probleem', en: 'The problem' },
    'bnp.tldr.l2': { fr: 'La tension', nl: 'De spanning', en: 'The tension' },
    'bnp.tldr.l3': { fr: 'Ce que j\'ai fait', nl: 'Wat ik gedaan heb', en: 'What I did' },
    'bnp.tldr.l4': { fr: 'Ce qui en est sorti', nl: 'Wat eruit kwam', en: 'What came out of it' },
    'bnp.tldr.t1': {
      fr: 'BNP traitait 30 % des paiements Bancontact du pays. Aucun service ne valorisait cette donnée auprès des commerçants qui les acceptaient.',
      nl: 'BNP verwerkte 30 % van de Bancontact-betalingen van het land. Geen enkele dienst valoriseerde deze data voor de handelaars die ze accepteerden.',
      en: 'BNP processed 30% of the country\'s Bancontact payments. No service was extracting value from this data for the merchants who accepted them.'
    },
    /* CVE 2026-05-17 v2 · NNG · interprétation 4 phrases (Banking pensait X, IT pensait Y)
       coupée. Factuel · les 4 fonctions, un scope à aligner. -17 mots. */
    'bnp.tldr.t2': {
      fr: 'Quatre fonctions internes à aligner sur un seul scope · Banking, IT, Legal, Marketing.',
      nl: 'Vier interne functies om op één scope af te stemmen · Banking, IT, Legal, Marketing.',
      en: 'Four internal functions to align on a single scope · Banking, IT, Legal, Marketing.'
    },
    'bnp.tldr.t3': {
      fr: 'Six mois en amont. Stakeholder Map, Customer Journey, Value Proposition Canvas. Six commerçants interviewés sur leur lieu de travail, dont Léonidas.',
      nl: 'Zes maanden vooraf. Stakeholder Map, Customer Journey, Value Proposition Canvas. Zes handelaars geïnterviewd op hun werkplek, waaronder Léonidas.',
      en: 'Six months upstream. Stakeholder Map, Customer Journey, Value Proposition Canvas. Six merchants interviewed at their workplace, including Léonidas.'
    },
    'bnp.tldr.t4': {
      fr: 'Concept Report signé. Léonidas a pré-signé une promesse d\'achat ferme avant le développement. Quatre fonctions alignées, backlog P1/P2 prêt à entrer en sprints.',
      nl: 'Concept Report ondertekend. Léonidas heeft een vaste aankoopbelofte voorgetekend vóór de ontwikkeling. Vier functies afgestemd, backlog P1/P2 klaar voor sprints.',
      en: 'Concept Report signed. Léonidas pre-signed a firm purchase commitment before development. Four functions aligned, P1/P2 backlog ready for sprints.'
    },
    'bnp.brief.eyebrow': { fr: 'Le brief', nl: 'De opdracht', en: 'The brief' },
    /* CVE 2026-05-11 BNP v2 · sujet noble, verbe sec (Brand Guardian reco) */
    'bnp.brief.title': {
      fr: '30 % des paiements du pays passaient par BNP.<br><span class="accent">Personne ne les vendait.</span>',
      nl: '30 % van de betalingen van het land liep via BNP.<br><span class="accent">Niemand verkocht ze.</span>',
      en: '30% of the country\'s payments ran through BNP.<br><span class="accent">No one was selling them.</span>'
    },
    /* CVE 2026-05-17 v2 · NNG · pas de répétition du titre dans le texte.
       Le titre dit déjà "30 %" et "BNP". Le lead1 ouvre sur ce que cette donnée DONNAIT
       (l'angle d'analyse), puis le gap merchant chiffré (source Concept Report p9 ·
       1500 ATOS / 901 EBB / 234 actifs / 15 % réguliers), puis le service manquant. */
    'bnp.brief.lead1': {
      fr: 'Une vue inégalée sur le comportement d\'achat des consommateurs belges, accumulée sur le réseau Bancontact. Côté commerçant · 1500 retailers ATOS référencés, 901 inscrits sur Easy Banking Business, 234 actifs, seulement 15 % réguliers. Aucun service ne valorisait cette matière auprès de ceux qui acceptaient les paiements.',
      nl: 'Een ongeëvenaard zicht op het koopgedrag van Belgische consumenten, opgebouwd op het Bancontact-netwerk. Aan handelaarszijde · 1500 retailers in ATOS opgelijst, 901 ingeschreven op Easy Banking Business, 234 actief, slechts 15 % regelmatig. Geen enkele dienst valoriseerde die data bij wie de betalingen aanvaardde.',
      en: 'An unmatched view of Belgian consumer purchasing behaviour, accumulated on the Bancontact network. On the merchant side · 1500 retailers listed in ATOS, 901 registered on Easy Banking Business, 234 active, only 15% regular. No service was turning that data into value for those accepting the payments.'
    },
    /* CVE 2026-05-17 v2 · stakes Acquirer Ideation Report p14 · 2e phrase coupée
       (restate gap déjà dans lead1). NNG · pas de redondance entre paragraphes. */
    'bnp.brief.lead2': {
      fr: 'BNP visait 2020 pour devenir Acquirer en propre · passer de 7 % à 20 % de marketshare POS, ouvrir dès Q2 2018 l\'acquiring aux large retailers via Corporate Banking. Le service à concevoir n\'était pas un gadget data, c\'était la pointe d\'une stratégie de position.',
      nl: 'BNP mikte op 2020 om zelf Acquirer te worden · van 7 % naar 20 % POS-marktaandeel, en vanaf Q2 2018 acquiring openstellen voor grote retailers via Corporate Banking. De dienst die we moesten bedenken was geen data-gadget, het was de speerpunt van een positiestrategie.',
      en: 'BNP was aiming for 2020 to become Acquirer in its own right · lifting POS marketshare from 7% to 20%, and opening acquiring to large retailers via Corporate Banking by Q2 2018. The service to design wasn\'t a data gadget, it was the spearhead of a positioning strategy.'
    },
    /* CVE 2026-05-17 v2 · mandate slim · NNG dedup · "Six mois" dans sizing chip,
       "Lean Canvas + VPC" dans toolkitSignal. On garde ici les 4 verbes + qui est dans
       la pièce + ce qui sort. -36 mots. */
    'bnp.brief.lead3': {
      fr: 'Mon mandat tenait en quatre verbes · <strong>cadrer, tester, aligner, défendre</strong>. Confronter l\'opportunité au terrain, mettre Banking, IT, Legal et Marketing dans la même pièce, porter la recommandation jusqu\'au comité.',
      nl: 'Mijn opdracht in vier werkwoorden · <strong>kaderen, testen, aligneren, verdedigen</strong>. De opportuniteit aan het terrein toetsen, Banking, IT, Legal en Marketing in dezelfde ruimte zetten, de aanbeveling tot in het comité dragen.',
      en: 'My mandate held in four verbs · <strong>frame, test, align, defend</strong>. Confront the opportunity with the field, get Banking, IT, Legal and Marketing in the same room, carry the recommendation up to the steering committee.'
    },
    'bnp.brief.sizing': {
      fr: '6 mois <span class="dot">·</span> 4 fonctions internes <span class="dot">·</span> 6 PME terrain <span class="dot">·</span> Service Designer freelance',
      nl: '6 maanden <span class="dot">·</span> 4 interne functies <span class="dot">·</span> 6 kmo\'s op het terrein <span class="dot">·</span> Service Designer freelance',
      en: '6 months <span class="dot">·</span> 4 internal functions <span class="dot">·</span> 6 SMEs on the ground <span class="dot">·</span> freelance Service Designer'
    },
    /* CVE 2026-05-03 v9 · brief-teaser : climax 6/1/0 remonté · accroche scan 90s */
    'bnp.brief.teaser': {
      fr: 'À l\'arrivée · <strong class="accent"><span data-countup="6">6</span> PME testées</strong> <span class="brief-teaser__sep">→</span> <strong class="accent"><span data-countup="1">1</span> promesse d\'achat ferme</strong> <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="0">0</span> refus</strong>. Le sponsor a passé l\'investissement.',
      nl: 'Aan de aankomst · <strong class="accent"><span data-countup="6">6</span> kmo\'s getest</strong> <span class="brief-teaser__sep">→</span> <strong class="accent"><span data-countup="1">1</span> vaste aankoopbelofte</strong> <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="0">0</span> weigeringen</strong>. De sponsor heeft de investering goedgekeurd.',
      en: 'At the close · <strong class="accent"><span data-countup="6">6</span> SMEs tested</strong> <span class="brief-teaser__sep">→</span> <strong class="accent"><span data-countup="1">1</span> firm purchase commitment</strong> <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="0">0</span> refusals</strong>. The sponsor signed off the investment.'
    },
    /* CVE 2026-05-17 v2 NNG · -15 mots · cut "pas pour ouvrir une page blanche" + "discipline du parcours" */
    'bnp.brief.toolkitSignal': {
      fr: '<strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>, méthodologie native du département CXC. Toolkit calibré pour valider une hypothèse de revenu B2B mature. <strong class="accent">Léonidas signé avant la première ligne de code</strong>.',
      nl: '<strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>, de eigen methodologie van de CXC-afdeling. Toolkit afgestemd op het valideren van een B2B-omzet-hypothese. <strong class="accent">Léonidas getekend vóór de eerste coderegel</strong>.',
      en: '<strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>, the native methodology of the CXC department. Toolkit calibrated to validate a mature B2B revenue hypothesis. <strong class="accent">Léonidas signed before the first line of code</strong>.'
    },

    'bnp.barriers.b1.h': { fr: '« Qu\'est-ce que j\'en ferais concrètement ? »', nl: '"Wat zou ik er concreet mee doen?"', en: '"What would I actually do with this?"' },
    'bnp.barriers.b1.p': {
      fr: 'Questions sur l\'<strong>utilité réelle</strong> de la donnée. Les commerçants voyaient les dashboards mais n\'imaginaient pas une décision qu\'ils prendraient différemment.',
      nl: 'Vragen over de <strong>echte bruikbaarheid</strong> van de data. Merchants zagen de dashboards maar konden geen beslissing voor de geest halen die ze anders zouden nemen.',
      en: 'Questions about the <strong>actual usefulness</strong> of the data. Merchants saw the dashboards but couldn\'t picture a decision they would make differently.'
    },
    'bnp.barriers.b2.h': { fr: '« Puis-je me fier à ces chiffres ? »', nl: '"Kan ik deze cijfers vertrouwen?"', en: '"Can I trust these numbers?"' },
    'bnp.barriers.b2.p': {
      fr: 'Doutes sur la <strong>fiabilité des données</strong>. Le dataset ne voit que les transactions cartes BNP et les concurrents bancarisés chez BNP, pas l\'ensemble du marché.',
      nl: 'Twijfels over <strong>data-betrouwbaarheid</strong>. De dataset ziet enkel BNP-kaarttransacties en bij BNP-bankierende concurrenten, niet de volledige markt.',
      en: 'Concerns about <strong>data reliability</strong>. The dataset only sees BNP card transactions and BNP-banked competitors, not the full market.'
    },
    'bnp.barriers.b3.h': { fr: '« À qui suis-je comparé ? »', nl: '"Met wie word ik vergeleken?"', en: '"Who am I being compared to?"' },
    'bnp.barriers.b3.p': {
      fr: 'Les <strong>concurrents utilisés en benchmark</strong> dérivaient des codes MCC. Or les commerçants connaissent leur vraie concurrence par leur nom, pas par un code sectoriel.',
      nl: 'De <strong>concurrenten in de benchmark</strong> kwamen uit MCC-codes. Maar merchants kennen hun echte concurrentie bij naam, niet via een sectorcode.',
      en: 'The <strong>competitors used in benchmarks</strong> were derived from MCC codes. But merchants know their real competition by name, not by industry code.'
    },
    'bnp.barriers.b4.h': { fr: '« Des stats, mais aucun client. »', nl: '"Statistieken, maar geen klanten."', en: '"I get statistics, but no clients."' },
    'bnp.barriers.b4.p': {
      fr: 'Sortie limitée à des <strong>statistiques agrégées, sans donnée personnelle</strong>. Inutile pour le marketing one-to-one, qui était précisément ce que voulaient les commerçants.',
      nl: 'Output beperkt tot <strong>geaggregeerde statistieken, geen persoonlijke data</strong>. Onbruikbaar voor één-op-één marketing, wat merchants net wilden.',
      en: 'Output limited to <strong>aggregate statistics, no personal data</strong>. Useless for one-to-one marketing, which is exactly what merchants wanted.'
    },
    'bnp.barriers.b5.h': { fr: '« Et mes produits ? »', nl: '"En mijn producten?"', en: '"What about my products?"' },
    'bnp.barriers.b5.p': {
      fr: '<strong>Aucune information sur les produits ou la performance du portefeuille</strong>. Pour la plupart des PME, c\'est pourtant la question la plus utile à laquelle répondre.',
      nl: '<strong>Geen informatie over producten of portfolio-performance</strong>. Voor de meeste kmo\'s is dat net de nuttigste vraag om te beantwoorden.',
      en: '<strong>No information about products or portfolio performance</strong>. Yet for most SMEs, that\'s the single most useful question to answer.'
    },
    'bnp.barriers.b6.h': { fr: '« Quel ROI pour moi ? »', nl: '"Wat is de ROI voor mij?"', en: '"What\'s the ROI for me?"' },
    'bnp.barriers.b6.p': {
      fr: 'Questions persistantes sur le <strong>retour sur investissement</strong> face au pricing proposé. Chaque commerçant faisait le calcul à voix haute.',
      nl: 'Aanhoudende <strong>vragen over return on investment</strong> tegenover de voorgestelde prijs. Elke merchant rekende hardop.',
      en: 'Persistent <strong>questions about return on investment</strong> against the proposed pricing. Every merchant did the math out loud.'
    },
    /* 6 barrières — horizontal pin section, voix unifiée Jean-Paul */
    'bnp.barriers.label': {
      fr: 'Jean-Paul, CEO multi-shops · six barrières en interviews',
      nl: 'Jean-Paul, CEO multi-winkels · zes barrières uit interviews',
      en: 'Jean-Paul, multi-shop CEO · six barriers from interviews'
    },
    'bnp.barriers.b1.theme': { fr: 'Utilité', nl: 'Bruikbaarheid', en: 'Usefulness' },
    'bnp.barriers.b2.theme': { fr: 'Fiabilité', nl: 'Betrouwbaarheid', en: 'Reliability' },
    'bnp.barriers.b3.theme': { fr: 'Pertinence', nl: 'Relevantie', en: 'Relevance' },
    'bnp.barriers.b4.theme': { fr: 'Segmentation', nl: 'Segmentatie', en: 'Segmentation' },
    'bnp.barriers.b5.theme': { fr: 'Produits', nl: 'Producten', en: 'Products' },
    'bnp.barriers.b6.theme': { fr: 'ROI', nl: 'ROI', en: 'ROI' },
    'bnp.barriers.b1.eyebrow': { fr: 'Barrière 01 · Utilité', nl: 'Barrière 01 · Bruikbaarheid', en: 'Barrier 01 · Usefulness' },
    'bnp.barriers.b2.eyebrow': { fr: 'Barrière 02 · Fiabilité', nl: 'Barrière 02 · Betrouwbaarheid', en: 'Barrier 02 · Reliability' },
    'bnp.barriers.b3.eyebrow': { fr: 'Barrière 03 · Pertinence', nl: 'Barrière 03 · Relevantie', en: 'Barrier 03 · Relevance' },
    'bnp.barriers.b4.eyebrow': { fr: 'Barrière 04 · Segmentation', nl: 'Barrière 04 · Segmentatie', en: 'Barrier 04 · Segmentation' },
    'bnp.barriers.b5.eyebrow': { fr: 'Barrière 05 · Produits', nl: 'Barrière 05 · Producten', en: 'Barrier 05 · Products' },
    'bnp.barriers.b6.eyebrow': { fr: 'Barrière 06 · ROI', nl: 'Barrière 06 · ROI', en: 'Barrier 06 · ROI' },

    'bnp.barriers.b1.constraint': {
      fr: 'Devenu règle de design : pas de data exploration. Chaque écran ouvre sur une décision possible.',
      nl: 'Werd ontwerpregel : geen data exploration. Elk scherm opent op een mogelijke beslissing.',
      en: 'Became design rule : no data exploration. Every screen opens on a possible decision.'
    },
    'bnp.barriers.b2.constraint': {
      fr: 'Devenu règle : chaque chiffre accompagné de sa source et de son intervalle de confiance. Statistiquement défendable.',
      nl: 'Werd regel : elk cijfer komt met zijn bron en zijn betrouwbaarheidsinterval. Statistisch verdedigbaar.',
      en: 'Became rule : every number comes with its source and confidence interval. Statistically defensible.'
    },
    'bnp.barriers.b3.constraint': {
      fr: 'Devenu règle : le commerçant choisit son secteur de comparaison parmi 12 verticales paramétrables.',
      nl: 'Werd regel : de merchant kiest zijn vergelijkingssector uit 12 instelbare verticalen.',
      en: 'Became rule : the merchant picks the comparison sector from 12 configurable verticals.'
    },
    'bnp.barriers.b4.constraint': {
      fr: 'Devenu axe Marketing tout-boîte : campagnes ciblées par commune-source, anonyme par construction. RGPD intégrée.',
      nl: 'Werd Marketing-tout-boîte-as : doelgerichte campagnes per herkomstgemeente, anoniem by design. GDPR ingebouwd.',
      en: 'Became Marketing tout-boîte axis : targeted campaigns by source-commune, anonymous by design. GDPR built-in.'
    },
    'bnp.barriers.b5.constraint': {
      fr: 'Hors scope MVP. Inscrit comme évolution roadmap phase 2 : connexion future avec les systèmes POS.',
      nl: 'Buiten MVP-scope. Opgenomen als roadmap fase 2 : toekomstige POS-systeem-koppeling.',
      en: 'Out of MVP scope. Logged as roadmap phase 2 : future POS systems integration.'
    },
    'bnp.barriers.b6.constraint': {
      fr: 'Devenu central dans le Triple-Win : commerçant gagne en décisions, banque crée une ligne B2B, cardholder garde sa privacy.',
      nl: 'Werd centraal in Triple-Win : merchant wint in beslissingen, bank creëert een B2B-omzetlijn, kaarthouder behoudt privacy.',
      en: 'Became central to Triple-Win : merchant gains in decisions, bank creates a B2B revenue line, cardholder keeps privacy.'
    },

    /* ============== CONCEPT 4.b — Triple-Win frame autonome (CVE 2026-05-03) ============== */
    'bnp.triplewin.eyebrow': {
      fr: 'L\'arbitre de chaque décision',
      nl: 'De scheidsrechter van elke beslissing',
      en: 'The arbiter of every decision'
    },
    'bnp.triplewin.h2': {
      fr: 'Bank · Retailer · Cardholder. <span class="accent">Le triangle qui rejetait les fausses pistes.</span>',
      nl: 'Bank · Retailer · Cardholder. <span class="accent">De driehoek die valse pistes verwierp.</span>',
      en: 'Bank · Retailer · Cardholder. <span class="accent">The triangle that rejected false leads.</span>'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Pas de compromis... Le triangle tranchait" ·
       (le claim final le redit, et le title le porte déjà). -18 mots. */
    'bnp.triplewin.lead': {
      fr: 'Le service ne tenait que si les trois sommets gagnaient. Deux sur trois · écarté.',
      nl: 'De dienst hield enkel stand als de drie hoekpunten wonnen. Twee op drie · weggelegd.',
      en: 'The service only held if all three vertices won. Two out of three · dropped.'
    },
    'bnp.triplewin.c1.who': { fr: 'The Bank · BNP Paribas Fortis', nl: 'The Bank · BNP Paribas Fortis', en: 'The Bank · BNP Paribas Fortis' },
    'bnp.triplewin.c1.h':   { fr: 'Une nouvelle ligne de revenu B2B.', nl: 'Een nieuwe B2B-omzetlijn.', en: 'A new B2B revenue line.' },
    'bnp.triplewin.c1.p': {
      fr: 'La donnée transactionnelle existait déjà, dormante. Le service la transforme en abonnement payable, défendable, hors compétition cœur banque.',
      nl: 'De transactiedata bestond al, sluimerend. De dienst zet die om in een betaalbaar abonnement, verdedigbaar, buiten de kerncompetitie van de bank.',
      en: 'Transactional data already existed, dormant. The service turns it into a payable subscription, defensible, outside the bank\'s core competition.'
    },
    'bnp.triplewin.c2.who': { fr: 'The Retailer · SME Merchant', nl: 'The Retailer · KMO-handelaar', en: 'The Retailer · SME Merchant' },
    'bnp.triplewin.c2.h':   { fr: 'Des décisions, pas des dashboards.', nl: 'Beslissingen, geen dashboards.', en: 'Decisions, not dashboards.' },
    'bnp.triplewin.c2.p': {
      fr: 'Le commerçant lit un rapport orienté objectif, agit, mesure. Aucune compétence data requise. Le service cale sur la journée d\'un PME, pas sur un workflow d\'analyste.',
      nl: 'De handelaar leest een doelgericht rapport, handelt, meet. Geen data-expertise vereist. De dienst sluit aan op de dag van een kmo, niet op een analist-workflow.',
      en: 'The merchant reads a goal-oriented report, acts, measures. No data expertise required. The service fits an SME\'s day, not an analyst\'s workflow.'
    },
    'bnp.triplewin.c3.who': { fr: 'The Cardholder · End Consumer', nl: 'The Cardholder · Eindconsument', en: 'The Cardholder · End Consumer' },
    'bnp.triplewin.c3.h':   { fr: 'Aucune donnée individuelle exposée.', nl: 'Geen individuele data blootgesteld.', en: 'No individual data exposed.' },
    'bnp.triplewin.c3.p': {
      fr: 'Statistiques agrégées seulement, jamais une transaction nominative. GDPR dérisqué dès la value prop, validé Legal & Compliance avant le build.',
      nl: 'Enkel geaggregeerde statistieken, nooit een nominale transactie. GDPR gederisicood vanaf de value prop, gevalideerd door Legal & Compliance vóór de build.',
      en: 'Aggregated statistics only, never a named transaction. GDPR de-risked from the value prop onwards, validated by Legal & Compliance before build.'
    },
    'bnp.triplewin.claim': {
      fr: 'Toute idée qui ne validait pas les <span class="accent">trois sommets</span> était écartée. Trois critères, pas une moyenne.',
      nl: 'Elk idee dat de <span class="accent">drie hoekpunten</span> niet valideerde, werd terzijde gelegd. Drie criteria, geen gemiddelde.',
      en: 'Any idea that did not validate the <span class="accent">three vertices</span> was set aside. Three criteria, not an average.'
    },

    'bnp.leo.quote': {
      fr: 'Wolluwé SP : <strong>35 %</strong> de part sectorielle. Ixelles : <strong>10 %</strong>. Même marque, même dataset. Une variable : les rapports appliqués.',
      nl: 'Wolluwé SP : <strong>35 %</strong> sectoraal aandeel. Elsene : <strong>10 %</strong>. Zelfde merk, zelfde dataset. Eén variabele : de rapporten toegepast.',
      en: 'Wolluwé SP : <strong>35%</strong> sector share. Ixelles : <strong>10%</strong>. Same brand, same dataset. One variable : the reports applied.'
    },
    /* FRICTIONS & ALIGNMENT — Act R chute marketing, 4 fonctions → bébé de tout le monde → empathie utilisateur */
    'bnp.alignment.eyebrow': {
      fr: 'Frictions stakeholders · Alignement',
      nl: 'Stakeholder-frictions · Alignering',
      en: 'Stakeholder frictions · Alignment'
    },
    'bnp.alignment.h2': {
      fr: 'Comment quatre départements ont fini par <span class="accent">défendre le même projet.</span>',
      nl: 'Hoe vier afdelingen uiteindelijk <span class="accent">hetzelfde project verdedigden.</span>',
      en: 'How four departments ended up <span class="accent">defending the same project.</span>'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Le Double Diamant a calé..." (méta-méthode) +
       cut "scope MVP arrêté..." (déjà dit ailleurs). Friction = mécanisme. -42 mots. */
    'bnp.alignment.lead': {
      fr: 'Chaque fonction, sa friction propre. Chaque conversation, tenue à son moment.',
      nl: 'Elke functie, zijn eigen wrijving. Elk gesprek, gevoerd op zijn moment.',
      en: 'Each function, its own friction. Each conversation, held at its moment.'
    },

    'bnp.alignment.f1.fn': { fr: 'Corporate Banking', nl: 'Corporate Banking', en: 'Corporate Banking' },
    'bnp.alignment.f1.h': { fr: '« Quel revenu prouvable ? »', nl: '"Welke aantoonbare omzet?"', en: '"What revenue can we prove?"' },
    'bnp.alignment.f1.p': {
      fr: 'Friction · un produit B2B sans client signataire, c\'est invendable côté board. La Phase Discover a sourcé six PME et fait signer Léonidas avant le build.',
      nl: 'Wrijving · een B2B-product zonder ondertekende klant is onverkoopbaar op boardniveau. De Discover-fase sourcete zes kmo\'s en haalde Léonidas binnen als getekende aankoopbelofte vóór de build.',
      en: 'Friction · a B2B product without a signed customer is unsellable at board level. The Discover phase sourced six SMEs and brought in Léonidas as a signed purchase commitment before any build.'
    },

    'bnp.alignment.f2.fn': { fr: 'IT & Data', nl: 'IT & Data', en: 'IT & Data' },
    'bnp.alignment.f2.h': { fr: '« On peut builder demain. »', nl: '"We kunnen morgen bouwen."', en: '"We can build it tomorrow."' },
    'bnp.alignment.f2.p': {
      fr: 'Friction · envie de coder avant le service blueprint. Cinq customer journeys end-to-end ont posé le chiffre qui a fermé le débat semaine 6 · 15 étapes étalées sur 1-3 jours juste pour onboarder.',
      nl: 'Wrijving · drang om te coderen vóór het service blueprint. Vijf end-to-end customer journeys legden het cijfer op tafel dat het debat sloot in week 6 · 15 stappen verspreid over 1-3 dagen enkel om aan boord te komen.',
      en: 'Friction · urge to start coding before the service blueprint. Five end-to-end customer journeys put on the table the figure that closed the debate in week 6 · 15 steps spread over 1-3 days just to onboard.'
    },

    'bnp.alignment.f3.fn': { fr: 'Legal & Compliance', nl: 'Legal & Compliance', en: 'Legal & Compliance' },
    'bnp.alignment.f3.h': { fr: '« Et si un cardholder se plaint ? »', nl: '"En als een kaarthouder klaagt?"', en: '"What if a cardholder complains?"' },
    'bnp.alignment.f3.p': {
      fr: 'Friction · risque réputationnel sur les données carte. Le Triple-Win frame a posé la règle dès la value prop · zéro donnée individuelle exposée, statistiques agrégées seulement, GDPR dérisqué avant le build.',
      nl: 'Wrijving · reputatierisico op kaartdata. Het Triple-Win-frame legde de regel vast vanaf de value prop · nul individuele data blootgesteld, enkel geaggregeerde statistieken, GDPR gederisicood vóór de build.',
      en: 'Friction · reputational risk on card data. The Triple-Win frame set the rule from the value prop onwards · zero individual data exposed, aggregated statistics only, GDPR de-risked before any build.'
    },

    'bnp.alignment.f4.fn': { fr: 'Marketing', nl: 'Marketing', en: 'Marketing' },
    'bnp.alignment.f4.h': { fr: '« 47 indicateurs, c\'est mieux. »', nl: '"47 indicatoren, dat is beter."', en: '"47 indicators is better."' },
    'bnp.alignment.f4.p': {
      fr: 'Friction · appétit pour la richesse data. Les six barrières utilisateurs ont arbitré semaine 9 · trois lectures coachées par graphique, le reste en phase 2.',
      nl: 'Wrijving · honger naar datarijkdom. De zes gebruikersbarrières arbitreerden in week 9 · drie begeleide lezingen per diagram, de rest in fase 2.',
      en: 'Friction · appetite for data richness. The six user barriers arbitrated in week 9 · three coached reads per chart, the rest in phase 2.'
    },

    /* CVE 2026-05-17 NN-brutal · cut "Sortie · scope MVP clair..." (déjà dans outcome).
       Fait substantiel = Marketing + IT à la même table. -14 mots. */
    'bnp.alignment.toolkitSignal': {
      fr: '<strong>Marketing et IT à la même table d\'atelier.</strong> Pas de Value Proposition défendable sans les deux qui la portent.',
      nl: '<strong>Marketing en IT aan dezelfde workshoptafel.</strong> Geen verdedigbare Value Proposition zonder beide die ze dragen.',
      en: '<strong>Marketing and IT at the same workshop table.</strong> No defensible Value Proposition unless both carry it.'
    },
    /* CVE 2026-05-17 NN-brutal · cut "pas le commerçant abstrait, le commerçant observé
       sur sa caisse, dont on connaissait la phrase exacte" (parenthèse meta). Fait seul. -28 mots. */
    'bnp.alignment.pivotOutcome': {
      fr: 'Quand les quatre fonctions ont vu la même PME au centre, le projet est devenu <strong class="accent">le bébé de tout le monde</strong>.',
      nl: 'Toen de vier functies dezelfde kmo in het centrum zagen, werd het project <strong class="accent">de baby van iedereen</strong>.',
      en: 'When the four functions saw the same SME at the centre, the project became <strong class="accent">everyone\'s baby</strong>.'
    },

    /* ============== OUTCOME — synthèse fin de parcours + note d'intégrité ============== */
    'bnp.outcome.eyebrow': {
      fr: 'À la sortie du parcours',
      nl: 'Aan het einde van het traject',
      en: 'At the close of the journey'
    },
    'bnp.outcome.title': {
      fr: 'Pas une intention. <span class="accent">Un signal commercial écrit.</span>',
      nl: 'Geen intentie. <span class="accent">Een schriftelijk commercieel signaal.</span>',
      en: 'Not an intention. <span class="accent">A written commercial signal.</span>'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Pas un usability test poli, pas un oui de principe..."
       (négation explicative). Fait seul. -22 mots. */
    'bnp.outcome.lead': {
      fr: 'Une promesse d\'achat ferme, signée avant la première ligne de code. Écrite, datée, sur le bureau du sponsor.',
      nl: 'Een vaste aankoopbelofte, getekend vóór de eerste regel code. Schriftelijk, gedateerd, op het bureau van de sponsor.',
      en: 'A firm purchase commitment, signed before the first line of code. Written, dated, on the sponsor\'s desk.'
    },
    'bnp.outcome.d1.h': { fr: 'Concept Report signé',     nl: 'Concept Report ondertekend', en: 'Concept Report signed' },
    'bnp.outcome.d1.p': {
      fr: 'Quatre fonctions internes (Banking · IT · Legal · Marketing) alignées sur un MVP arrêté. Mars 2018.',
      nl: 'Vier interne functies (Banking · IT · Legal · Marketing) op één lijn rond een vastgelegd MVP. Maart 2018.',
      en: 'Four internal functions (Banking · IT · Legal · Marketing) aligned on a locked MVP scope. March 2018.'
    },
    'bnp.outcome.d2.h': { fr: 'Léonidas pré-signe',       nl: 'Léonidas tekent vooraf',     en: 'Léonidas pre-signs' },
    /* CVE 2026-05-17 · Léonidas wireframe naming · source Concept Report p54 ·
       "Leonidas Ixelles" + "Leonidas Wolluwé SP" nommés dans la maquette de comparaison
       shops avant la pré-signature. Le design a anticipé le client. */
    'bnp.outcome.d2.p': {
      fr: 'Léonidas Ixelles et Léonidas Woluwe-SP figuraient déjà nommés dans les wireframes du Concept Report, comme exemple de comparaison entre shops. La pré-signature a transformé un nom dans une maquette en promesse d\'achat ferme, conditionnée à la mise en production.',
      nl: 'Léonidas Ixelles en Léonidas Woluwe-SP stonden al met naam in de wireframes van het Concept Report, als voorbeeld van vergelijking tussen shops. De voorondertekening heeft een naam in een maquette omgezet in een vaste aankoopbelofte, voorwaardelijk aan de productie.',
      en: 'Léonidas Ixelles and Léonidas Woluwe-SP were already named in the Concept Report wireframes, as the example used for shop-to-shop comparison. The pre-signature turned a name in a mockup into a firm purchase commitment, conditional on go-live.'
    },
    'bnp.outcome.d3.h': { fr: 'Backlog prêt à coder',     nl: 'Backlog klaar om te coderen', en: 'Backlog ready to ship' },
    'bnp.outcome.d3.p': {
      fr: 'User stories prioritisées P1/P2, scope MVP arrêté, prêtes à entrer en sprints agiles côté IT.',
      nl: 'User stories geprioriteerd P1/P2, MVP-scope vastgelegd, klaar om in agile sprints te gaan aan de IT-zijde.',
      en: 'User stories prioritised P1/P2, MVP scope locked, ready to enter agile sprints on the IT side.'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Ce que je peux affirmer s'arrête ici..." (méta-narration
       moralisante). Fait sec · départ + silence. -28 mots. */
    'bnp.outcome.integrity': {
      fr: '<strong>Note d\'intégrité.</strong> J\'ai quitté BNP après la livraison du Concept Report pour rejoindre Belfius. Je n\'ai plus eu de nouvelles du projet.',
      nl: '<strong>Integriteitsnota.</strong> Ik ben na de oplevering van het Concept Report bij BNP vertrokken om bij Belfius te beginnen. Ik heb geen nieuws meer gehad van het project.',
      en: '<strong>Integrity note.</strong> I left BNP after the Concept Report was delivered, to join Belfius. I had no further news of the project.'
    },

    /* ============== /luminus.html (skeleton — content next) ============== */
    'luminus.title': {
      fr: 'Comment j\'aborderais mes 90 premiers jours chez Luminus · Christophe van Engelen',
      nl: 'Hoe ik mijn eerste 90 dagen bij Luminus zou aanpakken · Christophe van Engelen',
      en: 'How I\'d approach my first 90 days at Luminus · Christophe van Engelen'
    },
    'luminus.metaDesc': {
      fr: 'Une note honnête sur la manière dont je structurerais mes 90 premiers jours en tant que Senior Service Designer chez Luminus. Pas de réponses toutes faites, une méthode pour les trouver.',
      nl: 'Een eerlijke nota over hoe ik mijn eerste 90 dagen als Senior Service Designer bij Luminus zou structureren. Geen kant-en-klare antwoorden, een methode om ze te vinden.',
      en: 'An honest note on how I\'d structure my first 90 days as Senior Service Designer at Luminus. No ready-made answers, a method to find them.'
    },
    'luminus.eyebrow': {
      fr: 'Pour Luminus · Mathias Van Daele · Avril 2026',
      nl: 'Voor Luminus · Mathias Van Daele · April 2026',
      en: 'For Luminus · Mathias Van Daele · April 2026'
    },
    'luminus.h1': {
      fr: 'Comment j\'aborderais<br>mes <span class="alt">90 premiers jours.</span>',
      nl: 'Hoe ik mijn eerste<br><span class="alt">90 dagen</span> zou aanpakken.',
      en: 'How I\'d approach<br>my <span class="alt">first 90 days.</span>'
    },
    'luminus.lead': {
      fr: 'Pas de réponses toutes faites. Une méthode pour les trouver. Trois phases, douze semaines, un dossier de décision sur la table.',
      nl: 'Geen kant-en-klare antwoorden. Een methode om ze te vinden. Drie fases, twaalf weken, een beslissingspakket op tafel.',
      en: 'No ready-made answers. A method to find them. Three phases, twelve weeks, a decision pack on the table.'
    },

    'luminus.p1.eyebrow': { fr: 'Phase 1 · Semaines 1 à 3', nl: 'Fase 1 · Weken 1 tot 3', en: 'Phase 1 · Weeks 1 to 3' },
    'luminus.p1.h': { fr: 'Écouter.', nl: 'Luisteren.', en: 'Listen.' },
    'luminus.p1.p': {
      fr: 'Shadowing interne · 1 jour Corporate Sales · 1 jour B2B Strategy · 1 jour IT & Data · 1 appel client live. <strong>Externe</strong> · 5 PME Luminus en transition (PV, batterie, EV, contrats flex). Pas de production en phase 1.',
      nl: 'Intern shadowing · 1 dag Corporate Sales · 1 dag B2B Strategy · 1 dag IT & Data · 1 live klantgesprek. <strong>Extern</strong> · 5 Luminus-kmo\'s in transitie (PV, batterij, EV, flex-contracten). Geen productie in fase 1.',
      en: 'Internal shadowing · 1 day Corporate Sales · 1 day B2B Strategy · 1 day IT & Data · 1 live customer call. <strong>External</strong> · 5 Luminus SMEs in transition (PV, battery, EV, flex contracts). No production in phase 1.'
    },
    'luminus.p1.deliv': {
      fr: 'Livrable de fin de phase : carte des stakeholders, 5 verbatims clients, et trois hypothèses initiales sur la « zone Léonidas » de Luminus.',
      nl: 'Deliverable einde fase : stakeholder-map, 5 klant-verbatims, en drie initiële hypotheses over de "Léonidas-zone" van Luminus.',
      en: 'End-of-phase deliverable : stakeholder map, 5 customer verbatims, and three initial hypotheses about Luminus\'s "Léonidas zone".'
    },

    'luminus.p2.eyebrow': { fr: 'Phase 2 · Semaines 4 à 8', nl: 'Fase 2 · Weken 4 tot 8', en: 'Phase 2 · Weeks 4 to 8' },
    'luminus.p2.h': { fr: 'Cadrer.', nl: 'Kaderen.', en: 'Frame.' },
    'luminus.p2.p': {
      fr: 'Hypothèses → options testables. Par candidat MVP : mini Lean Canvas + carte des risques (légal, régulatoire, technique, ROI) + coût de non-action. Mi-phase : comparatif en groupe restreint.',
      nl: 'Hypotheses → testbare opties. Per MVP-kandidaat : mini Lean Canvas + risicokaart (legal, regulatoir, technisch, ROI) + kostprijs van niet-actie. Halverwege : vergelijking in beperkte groep.',
      en: 'Hypotheses → testable options. Per MVP candidate : mini Lean Canvas + risk map (legal, regulatory, technical, ROI) + cost of inaction. Mid-phase : comparison in a restricted group.'
    },
    'luminus.p2.deliv': {
      fr: 'Livrable de fin de phase : trois candidats MVP cadrés (Lean Canvas + risques + ROI), un recommandé.',
      nl: 'Deliverable einde fase : drie gekaderde MVP-kandidaten (Lean Canvas + risico\'s + ROI), één aanbevolen.',
      en: 'End-of-phase deliverable : three framed MVP candidates (Lean Canvas + risks + ROI), one recommended.'
    },

    'luminus.p3.eyebrow': { fr: 'Phase 3 · Semaines 9 à 12', nl: 'Fase 3 · Weken 9 tot 12', en: 'Phase 3 · Weeks 9 to 12' },
    'luminus.p3.h': { fr: 'Livrer le premier dossier de décision.', nl: 'Het eerste beslissingsdocument leveren.', en: 'Ship the first decision pack.' },
    'luminus.p3.p': {
      fr: 'Roadmap séquencée 90 j / 12 m / 24 m. Registre des risques. Matrice trade-offs. Triple-Win Luminus (utilité · client B2B · ménage final). Pilote nominé · 6 mois · KPI mesurable. <strong class="accent">Construit pour être décidé, pas lu.</strong>',
      nl: 'Gefaseerde roadmap 90 d / 12 m / 24 m. Risicoregister. Trade-off-matrix. Triple-Win Luminus (nut · B2B-klant · eindgezin). Genomineerde pilot · 6 maanden · meetbare KPI. <strong class="accent">Gebouwd om beslist te worden, niet gelezen.</strong>',
      en: 'Sequenced roadmap 90 d / 12 m / 24 m. Risk register. Trade-off matrix. Triple-Win Luminus (utility · B2B customer · end household). Named pilot · 6 months · measurable KPI. <strong class="accent">Built to be decided on, not read.</strong>'
    },
    'luminus.p3.deliv': {
      fr: 'Livrable de fin de phase : dossier de décision exécutif, prêt à signer.',
      nl: 'Deliverable einde fase : executive beslissingspakket, klaar om te ondertekenen.',
      en: 'End-of-phase deliverable : executive decision pack, ready to sign off.'
    },

    'luminus.need.eyebrow': { fr: 'Ce dont j\'aurais besoin de vous', nl: 'Wat ik van u nodig heb', en: 'What I\'d need from you' },
    'luminus.need.h': {
      fr: 'Trois choses,<br>en clair.',
      nl: 'Drie dingen,<br>duidelijk.',
      en: 'Three things,<br>upfront.'
    },
    'luminus.need.li1': {
      fr: 'Un sponsor identifié dès la semaine 1. Sans lui, le dossier de décision de la semaine 12 reste sur une étagère.',
      nl: 'Een geïdentificeerde executive sponsor vanaf week 1. Zonder hem blijft het beslissingsdocument van week 12 op een plank liggen.',
      en: 'An executive sponsor identified from week 1. Without one, the week-12 decision pack stays on a shelf.'
    },
    'luminus.need.li2': {
      fr: 'L\'accès aux trois fonctions clés (Stratégie B2B, IT et Data, Légal et Régulatoire) sans intermédiaire. Mon travail consiste à les aligner. Je dois pouvoir leur parler directement.',
      nl: 'Toegang tot de drie sleutelfuncties (B2B-strategie, IT en Data, Legal en Regulatoir) zonder tussenpersoon. Mijn werk is hen op één lijn brengen. Ik moet hen rechtstreeks kunnen spreken.',
      en: 'Access to the three key functions (B2B Strategy, IT and Data, Legal and Regulatory) without an intermediary. My job is to align them. I need to be able to speak with them directly.'
    },
    'luminus.need.li3': {
      fr: 'L\'autorisation de citer un client B2B nommé dans le dossier final. Pas anonyme. Le « Léonidas signal » du cas BNP n\'aurait pas existé sans ce nom.',
      nl: 'Toelating om een B2B-klant bij naam te noemen in het eindrapport. Niet anoniem. Het "Léonidas-signaal" uit de BNP-case had niet bestaan zonder die naam.',
      en: 'Permission to name a B2B customer in the final report. Not anonymous. The "Léonidas signal" from the BNP case wouldn\'t have existed without that name.'
    },

    'luminus.cta.h': { fr: 'À discuter en live.', nl: 'Te bespreken in het gesprek.', en: 'Up for live discussion.' },
    'luminus.cta.p': {
      fr: 'Cette note n\'est pas un plan d\'attaque définitif. C\'est mon premier pas vers vous. Je suis là pour la suite.',
      nl: 'Deze nota is geen definitief aanvalsplan. Het is mijn eerste stap naar u. Ik ben er voor de rest.',
      en: 'This note isn\'t a definitive attack plan. It\'s my first step toward you. I\'m here for the rest.'
    },
    'luminus.cta.back': { fr: 'Lire le case BNP →', nl: 'Lees de BNP-case →', en: 'Read the BNP case →' },

    /* ============== HOME · OVERRIDES + CROSS-CASE (CVE 2026-05-11) ============== */
    /* CVE 2026-05-11 Pack v4-final · consensus team review (5 Anthropic agents +
       Codex GPT-5) · score moyen 85/100 · voix Lou Downe / Cagan. */
    'home.metaDesc': {
      fr: 'Service Design · UX · CX freelance à Bruxelles. Vingt ans dans des écosystèmes complexes · banque, postal industriel, SaaS, legal-tech. Du grand groupe international à la start-up. J\'écoute, je cadre, je tranche.',
      nl: 'Service Design · UX · CX freelance in Brussel. Twintig jaar in complexe ecosystemen · banking, industriële post, SaaS, legal-tech. Van internationaal concern tot start-up. Ik luister, kadreer, beslis.',
      en: 'Service Design · UX · CX freelance in Brussels. Twenty years in complex ecosystems · banking, industrial postal, SaaS, legal-tech. From global corporate to start-up. I listen, I frame, I decide.'
    },
    'home.lead': {
      fr: 'Vingt ans dans des écosystèmes complexes · banque, postal industriel, SaaS, legal-tech. Du grand groupe international à la start-up. J\'écoute, je cadre, je tranche. En mission courte ou en accompagnement durable. Trois cases publics ci-dessous.',
      nl: 'Twintig jaar in complexe ecosystemen · banking, industriële post, SaaS, legal-tech. Van internationaal concern tot start-up. Ik luister, ik kadreer, ik beslis. In korte opdracht of in duurzame begeleiding. Drie publieke cases hieronder.',
      en: 'Twenty years in complex ecosystems · banking, industrial postal, SaaS, legal-tech. From global corporate to start-up. I listen, I frame, I decide. In short engagements or long-term partnerships. Three public cases below.'
    },
    'home.casesH2': {
      fr: 'Trois missions. <span class="accent">Trois décisions de production signées.</span>',
      nl: 'Drie opdrachten. <span class="accent">Drie getekende productiebeslissingen.</span>',
      en: 'Three missions. <span class="accent">Three signed production decisions.</span>'
    },
    'home.casesIntro': {
      fr: 'Le toolkit du Service Designer ne se choisit pas en amont · il se choisit selon la maturité de l\'organisation et la nature du problème. Chez BNP Paribas Fortis, banque mature avec une donnée à activer · <strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>. Chez SPEOS, postal industriel à transformer · <strong>Stakeholder Map + Customer Journey AS-IS</strong>. Chez Ewon by HMS Networks, industrial IoT à réunifier · <strong>Customer Journey workshops + Heuristic Evaluation Nielsen + framework Relevance/Simplicity/Consistency</strong>. Trois toolkits différents, le même métier.',
      nl: 'De toolkit van een Service Designer kies je niet vooraf · je kiest hem afhankelijk van de maturiteit van de organisatie en de aard van het probleem. Bij BNP Paribas Fortis, een mature bank met te activeren data · <strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>. Bij SPEOS, een industrieel postbedrijf in transformatie · <strong>Stakeholder Map + Customer Journey AS-IS</strong>. Bij Ewon by HMS Networks, industrial IoT te herenigen · <strong>Customer Journey workshops + Heuristic Evaluation Nielsen + framework Relevance/Simplicity/Consistency</strong>. Drie verschillende toolkits, hetzelfde vak.',
      en: 'A Service Designer\'s toolkit is not chosen in advance · it is chosen based on the maturity of the organisation and the nature of the problem. At BNP Paribas Fortis, a mature bank with data to activate · <strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>. At SPEOS, an industrial postal player in transformation · <strong>Stakeholder Map + AS-IS Customer Journey</strong>. At Ewon by HMS Networks, industrial IoT to unify · <strong>Customer Journey workshops + Heuristic Evaluation Nielsen + Relevance/Simplicity/Consistency framework</strong>. Three different toolkits, the same craft.'
    },
    /* CVE 2026-05-04 v9 · home cards refonte sobre · subtitle court 1 phrase
       claim · outcomeLine 1 phrase toolkit→outcome · cta lien sobre. */
    'case.bnp.subtitle': {
      fr: 'Une donnée bancaire dormante, devenue service signé.',
      nl: 'Sluimerende bankdata, geworden ondertekende dienst.',
      en: 'Dormant bank data, turned into a signed service.'
    },
    'case.bnp.outcomeLine': {
      fr: '<strong>Léonidas signé</strong> avant la première ligne de code.',
      nl: '<strong>Léonidas ondertekend</strong> vóór de eerste coderegel.',
      en: '<strong>Léonidas signed</strong> before the first line of code.'
    },
    'case.bnp.cta': { fr: 'Lire le case →', nl: 'Lees de case →', en: 'Read the case →' },

    'case.speos.tag': { fr: '2024 — 2025', nl: '2024 — 2025', en: '2024 — 2025' },
    'case.speos.title': { fr: 'One-Stop Platform.', nl: 'One-Stop Platform.', en: 'One-Stop Platform.' },
    'case.speos.client': { fr: 'SPEOS · groupe bpost', nl: 'SPEOS · bpost-groep', en: 'SPEOS · bpost group' },
    'case.speos.year': { fr: '2024 — 2025', nl: '2024 — 2025', en: '2024 — 2025' },
    'case.speos.role': { fr: 'CX/UX/Service Design Consultant', nl: 'CX/UX/Service Design Consultant', en: 'CX/UX/Service Design Consultant' },
    'case.speos.subtitle': {
      fr: 'Un postal industriel devenu user-centric en douze mois.',
      nl: 'Een industrieel postbedrijf dat user-centric werd in twaalf maanden.',
      en: 'An industrial postal player turned user-centric in twelve months.'
    },
    'case.speos.outcomeLine': {
      fr: '<strong>Six clients pilotes valident.</strong> Dont Luminus.',
      nl: '<strong>Zes pilootklanten valideren.</strong> Waaronder Luminus.',
      en: '<strong>Six pilot customers validated.</strong> Including Luminus.'
    },
    'case.speos.cta': { fr: 'Lire le case →', nl: 'Lees de case →', en: 'Read the case →' },

    /* Case 03 · Ewon by HMS Networks · Cloud Revamp · 2021-2022 */
    'case.hms.tag': { fr: '2021 — 2022', nl: '2021 — 2022', en: '2021 — 2022' },
    'case.hms.title': { fr: 'Cloud Revamp.', nl: 'Cloud Revamp.', en: 'Cloud Revamp.' },
    'case.hms.client': { fr: 'Ewon by HMS Networks', nl: 'Ewon by HMS Networks', en: 'Ewon by HMS Networks' },
    'case.hms.year': { fr: '2021 — 2022', nl: '2021 — 2022', en: '2021 — 2022' },
    'case.hms.role': { fr: 'Service Design + UX/UI Consultant', nl: 'Service Design + UX/UI Consultant', en: 'Service Design + UX/UI Consultant' },
    'case.hms.subtitle': {
      fr: 'Trois plateformes legacy d\'industrial IoT, réunifiées en un an.',
      nl: 'Drie legacy industrial IoT platforms, herenigd in één jaar.',
      en: 'Three legacy industrial IoT platforms, unified in one year.'
    },
    'case.hms.outcomeLine': {
      fr: '<strong>2 M€ débloqués</strong> pour la mise en prod.',
      nl: '<strong>2 M€ vrijgemaakt</strong> voor productie.',
      en: '<strong>€2M secured</strong> for production rollout.'
    },
    'case.hms.cta': { fr: 'Lire le case →', nl: 'Lees de case →', en: 'Read the case →' },

    'footer.copy': {
      fr: '© Christophe van Engelen, 2026. Artefacts originaux © clients respectifs.',
      nl: '© Christophe van Engelen, 2026. Originele artefacten © respectievelijke klanten.',
      en: '© Christophe van Engelen, 2026. Original artefacts © respective clients.'
    },
    'footer.forContext': {
      fr: 'Pour Luminus · entretien Service Designer · avril–mai 2026',
      nl: 'Voor Luminus · Service Designer-gesprek · april–mei 2026',
      en: 'For Luminus · Service Designer interview · April–May 2026'
    },

    'nextCase.lab': { fr: 'Autre case', nl: 'Andere case', en: 'Other case' },
    'nextCase.toBnpTitle': { fr: 'BNP Paribas Fortis · Enterprise Intelligence', nl: 'BNP Paribas Fortis · Enterprise Intelligence', en: 'BNP Paribas Fortis · Enterprise Intelligence' },
    'nextCase.toBnpSub': {
      fr: 'Une autre mission, une autre boîte à outils. Lean Canvas et Value Proposition Canvas pour une banque mature, jusqu\'à une promesse d\'achat ferme signée par un client pilote.',
      nl: 'Een andere opdracht, een andere toolkit. Lean Canvas en Value Proposition Canvas voor een volwassen bank, tot een ondertekende koopbelofte van een pilootklant.',
      en: 'A different mission, a different toolkit. Lean Canvas and Value Proposition Canvas for a mature bank, all the way to a signed purchase commitment from a pilot customer.'
    },
    'nextCase.toSpeosTitle': { fr: 'SPEOS · One-Stop Platform', nl: 'SPEOS · One-Stop Platform', en: 'SPEOS · One-Stop Platform' },
    'nextCase.toSpeosSub': {
      fr: 'Une autre maturité, un autre toolkit. Stakeholder Map, Customer Journey AS-IS et 10 Pain Points pour une transformation early-stage, jusqu\'à 6 clients pilotes pré-validateurs dont Luminus.',
      nl: 'Een andere volwassenheid, een andere toolkit. Stakeholder Map, Customer Journey AS-IS en 10 Pain Points voor een early-stage transformatie, tot 6 pilootklanten die voorvalideren waaronder Luminus.',
      en: 'A different maturity, a different toolkit. Stakeholder Map, Customer Journey AS-IS and 10 Pain Points for an early-stage transformation, all the way to 6 pre-validating pilot customers including Luminus.'
    },

    'speos.chapResearch.overline': { fr: 'Discover · Observe & Understand', nl: 'Discover · Observe & Understand', en: 'Discover · Observe & Understand' },
    'speos.chapResearch.label': { fr: 'Phase 01 · Research', nl: 'Fase 01 · Research', en: 'Phase 01 · Research' },
    'speos.chapResearch.ddCap': { fr: 'Vous êtes ici · Diamant 1 · moitié gauche · 4 jalons', nl: 'Hier ben je · Diamant 1 · linkerhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · left half · 4 milestones' },

    'speos.chapAnalyse.overline': { fr: 'Discover · Define', nl: 'Discover · Define', en: 'Discover · Define' },
    'speos.chapAnalyse.label': { fr: 'Phase 02 · Analyse', nl: 'Fase 02 · Analyse', en: 'Phase 02 · Analyse' },
    'speos.chapAnalyse.ddCap': { fr: 'Vous êtes ici · Diamant 1 · moitié droite · 4 jalons', nl: 'Hier ben je · Diamant 1 · rechterhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · right half · 4 milestones' },

    'speos.chapIdeation.overline': { fr: 'Develop · ateliers co-créatifs · explorer les pistes', nl: 'Develop · co-creatieve workshops · pistes verkennen', en: 'Develop · co-creative workshops · exploring directions' },
    'speos.chapIdeation.label': { fr: 'Phase 03 · Ideation', nl: 'Fase 03 · Ideation', en: 'Phase 03 · Ideation' },
    'speos.chapIdeation.ddCap': { fr: 'Vous êtes ici · Diamant 2 · moitié gauche · Develop', nl: 'Hier ben je · Diamant 2 · linkerhelft · Develop', en: 'You are here · Diamond 2 · left half · Develop' },

    /* Methodology choice section */
    'speos.method.eyebrow': { fr: 'Phase 02 · Define · choix méthodologique', nl: 'Fase 02 · Define · methodologische keuze', en: 'Phase 02 · Define · methodological choice' },
    'speos.method.title': { fr: 'Pourquoi <span class="accent">ces outils-là, ici.</span>', nl: 'Waarom <span class="accent">deze tools, hier.</span>', en: 'Why <span class="accent">these tools, here.</span>' },
    'speos.method.lead': {
      fr: 'Sur SPEOS, je ne suis pas entré par un Lean Canvas. Je suis entré par une Stakeholder Map et un Customer Journey AS-IS. Le contexte commande l\'outil, pas l\'inverse. Une organisation early-stage en transformation digitale a besoin de voir avant d\'imaginer. Une Value Proposition se cristallise en sortie d\'observation, pas en entrée de session.',
      nl: 'Bij SPEOS ben ik niet gestart met een Lean Canvas. Ik startte met een Stakeholder Map en een Customer Journey AS-IS. De context bepaalt de tool, niet andersom. Een early-stage organisatie in digitale transformatie moet zien voor ze verzint. Een Value Proposition kristalliseert na observatie, niet bij de start van een sessie.',
      en: 'At SPEOS I didn\'t start with a Lean Canvas. I started with a Stakeholder Map and a Customer Journey AS-IS. Context dictates the tool, not the other way round. An early-stage organisation in digital transformation needs to see before it imagines. A Value Proposition crystallises after observation, not at the start of a session.'
    },
    /* Triple-Win SPEOS */
    'speos.triplewin.eyebrow': { fr: 'L\'arbitre de chaque décision', nl: 'De scheidsrechter van elke beslissing', en: 'The arbiter of every decision' },
    'speos.triplewin.h2': {
      fr: 'Customer · Business · Tech. <span class="accent">Le triangle qui rejetait les fausses pistes.</span>',
      nl: 'Customer · Business · Tech. <span class="accent">De driehoek die valse sporen afwees.</span>',
      en: 'Customer · Business · Tech. <span class="accent">The triangle that rejected the false leads.</span>'
    },
    'speos.triplewin.lead': {
      fr: 'La plateforme ne tenait que si les trois sommets gagnaient. Une idée qui faisait gagner deux et perdre un était écartée. Pas de compromis, pas de moyenne. Trois critères, pas une moyenne.',
      nl: 'Het platform hield alleen stand als de drie hoekpunten wonnen. Een idee waarbij twee wonnen en één verloor werd terzijde gelegd. Geen compromis, geen middelmaat. Drie criteria, geen gemiddelde.',
      en: 'The platform only held if all three vertices won. An idea where two won and one lost was set aside. No compromise, no middle ground. Three criteria, not an average.'
    },
    'speos.triplewin.claim': {
      fr: 'Toute idée qui ne validait pas les <span class="accent">trois sommets</span> était écartée. Trois critères, pas une moyenne.',
      nl: 'Elk idee dat de <span class="accent">drie hoekpunten</span> niet valideerde, werd terzijde gelegd. Drie criteria, geen gemiddelde.',
      en: 'Any idea that didn\'t validate the <span class="accent">three vertices</span> was set aside. Three criteria, not an average.'
    },

    /* Outcome SPEOS */
    'speos.outcome.eyebrow': { fr: 'À la sortie du parcours', nl: 'Aan het einde van het traject', en: 'At the end of the journey' },
    /* CVE 2026-05-11 SPEOS v2 · "scaler" → "monter en charge" (Content Creator + Brand Guardian) */
    'speos.outcome.title': {
      fr: 'Pas une intention. <span class="accent">Une plateforme prête à monter en charge.</span>',
      nl: 'Geen intentie. <span class="accent">Een platform klaar om op te schalen.</span>',
      en: 'Not an intention. <span class="accent">A platform ready to scale.</span>'
    },

    /* Lessons SPEOS */
    'speos.lessons.eyebrow': { fr: 'Ce que SPEOS m\'a appris', nl: 'Wat SPEOS me heeft geleerd', en: 'What SPEOS taught me' },
    'speos.lessons.h2': { fr: 'Trois leviers <span class="accent">que je rejouerais.</span>', nl: 'Drie hefbomen <span class="accent">die ik opnieuw zou inzetten.</span>', en: 'Three levers <span class="accent">I would replay.</span>' },
    'speos.lessons.l1.h': { fr: 'Le toolkit, pas l\'école.', nl: 'De toolkit, niet de school.', en: 'The toolkit, not the school.' },
    'speos.lessons.l2.h': { fr: 'Rentrer par le Business, installer avec l\'IT.', nl: 'Binnenkomen via Business, installeren met IT.', en: 'Enter via Business, install with IT.' },
    'speos.lessons.l3.h': { fr: 'Show don\'t tell. L\'artefact bat le slide.', nl: 'Show don\'t tell. Het artefact wint van de slide.', en: 'Show don\'t tell. The artefact beats the slide.' },

    /* Fin-royale SPEOS · CVE 2026-05-18 · speos.fin.line supprimé · cf. feedback_voix_pas_de_claim_aphorisme_fin_royale */
    'speos.fin.signature': { fr: 'Christophe van Engelen · Service Designer · Bruxelles', nl: 'Christophe van Engelen · Service Designer · Brussel', en: 'Christophe van Engelen · Service Designer · Brussels' },
    'speos.fin.contact.eyebrow': { fr: 'Une conversation ?', nl: 'Een gesprek?', en: 'A conversation?' },

    /* Alignment SPEOS */
    'speos.alignment.eyebrow': { fr: 'Stakeholder Map · Alignement', nl: 'Stakeholder Map · Afstemming', en: 'Stakeholder Map · Alignment' },
    'speos.alignment.h2': {
      fr: 'Comment Business et IT ont fini par <span class="accent">parler la même langue.</span>',
      nl: 'Hoe Business en IT uiteindelijk <span class="accent">dezelfde taal spraken.</span>',
      en: 'How Business and IT ended up <span class="accent">speaking the same language.</span>'
    },

    'speos.concept.delivPagesLabel': { fr: 'pages structurées', nl: 'gestructureerde pagina\'s', en: 'structured pages' },
    'speos.concept.delivPhrase': { fr: 'CEO, CTO et équipes ont tout pour décider ensemble.', nl: 'CEO, CTO en teams hebben alles om samen te beslissen.', en: 'CEO, CTO and teams have everything they need to decide together.' },

    /* ===== CVE 2026-05-04 · trilingual fill (491 orphan keys patched) ===== */
    'bnp.prototype.g1AllShops': { fr: 'All shops', nl: 'Alle winkels', en: 'All shops' },
    'bnp.prototype.g1ChartLab': { fr: 'Average basket size by month', nl: 'Gemiddelde winkelmand per maand', en: 'Average basket size by month' },
    'bnp.prototype.g1OverviewLab': { fr: 'Overview', nl: 'Overzicht', en: 'Overview' },
    'bnp.prototype.g1ShopLab': { fr: 'Shop performance', nl: 'Prestaties per winkel', en: 'Shop performance' },
    'bnp.prototype.g2BubblesHead': { fr: 'Visits and revenue vs average basket size', nl: 'Bezoeken en omzet versus gemiddelde winkelmand', en: 'Visits and revenue versus average basket size' },
    'bnp.prototype.g2Card1': { fr: 'Clients gains & losses', nl: 'Klanten gewonnen & verloren', en: 'Clients gains & losses' },
    'bnp.prototype.g2Card2': { fr: 'Top client profiles', nl: 'Top klantprofielen', en: 'Top client profiles' },
    'bnp.prototype.g2Card3': { fr: 'Top client origin', nl: 'Top klantherkomst', en: 'Top client origin' },
    'bnp.prototype.g2OverviewLab': { fr: 'Overview', nl: 'Overzicht', en: 'Overview' },
    'bnp.prototype.g2WhatLab': { fr: 'What\'s important', nl: 'Wat telt', en: 'What\'s important' },
    'bnp.prototype.g2WhatTxt': {
      fr: '60% du chiffre d\'affaires vient de clients « low buyers » qui reviennent en moyenne 15 fois par mois. Ils dépensent moins par visite mais 6× plus au total que les « high buyers ». Cibler la fidélité, pas le ticket moyen.',
      nl: '60% van de omzet komt van « low buyers » die gemiddeld 15 keer per maand terugkomen. Ze geven minder uit per bezoek, maar 6× meer in totaal dan de « high buyers ». Mik op trouw, niet op het gemiddelde ticket.',
      en: '60% of revenue comes from "low buyers" who return on average 15 times per month. They spend less per visit but 6x more in total than "high buyers". Target loyalty, not average ticket.'
    },
    'bnp.prototype.g3BasketDelta': { fr: '+35% average basket', nl: '+35% gemiddelde winkelmand', en: '+35% average basket' },
    'bnp.prototype.g3BasketLab': { fr: 'Average basket', nl: 'Gemiddelde winkelmand', en: 'Average basket' },
    'bnp.prototype.g3BasketNote': {
      fr: 'L\'aire hachurée matérialise le gain entre les deux périodes — la comparaison devient une preuve visuelle.',
      nl: 'Het gearceerde vlak toont de winst tussen de twee periodes, de vergelijking wordt visueel bewijs.',
      en: 'The hatched area shows the gain between the two periods, turning the comparison into visual proof.'
    },
    'bnp.prototype.g3BasketSub': { fr: '(+ €34)', nl: '(+ €34)', en: '(+ €34)' },
    'bnp.prototype.g3BusinessLab': { fr: 'Business performance', nl: 'Bedrijfsprestaties', en: 'Business performance' },
    'bnp.prototype.g3RevDelta': { fr: '+80% revenues', nl: '+80% omzet', en: '+80% revenues' },
    'bnp.prototype.g3RevNote': {
      fr: 'Le delta entre les deux fenêtres temps s\'affiche en grand, à droite du graphique. Le commerçant ne fait pas de calcul mental.',
      nl: 'Het verschil tussen de twee tijdsvensters staat groot rechts van de grafiek. De handelaar hoeft niet te rekenen.',
      en: 'The delta between the two time windows shows large, to the right of the chart. The shopkeeper does no mental math.'
    },
    'bnp.prototype.g3RevSub': { fr: '(+ €34.000)', nl: '(+ €34.000)', en: '(+ €34,000)' },
    'bnp.prototype.g3RevenueLab': { fr: 'Revenues', nl: 'Omzet', en: 'Revenues' },
    'bnp.prototype.g3TransDelta': { fr: '+60% transactions', nl: '+60% transacties', en: '+60% transactions' },
    'bnp.prototype.g3TransNote': {
      fr: 'Au survol d\'un mois, un tooltip indique l\'écart précis du point. Le delta global reste visible à droite.',
      nl: 'Bij hover op een maand toont een tooltip het exacte verschil voor dat punt. Het totaalverschil blijft rechts zichtbaar.',
      en: 'On hover over a month, a tooltip shows the exact gap for that point. The overall delta stays visible on the right.'
    },
    'bnp.prototype.g3TransSub': { fr: '(+ 8.000)', nl: '(+ 8.000)', en: '(+ 8,000)' },
    'bnp.prototype.g3TransactionsLab': { fr: 'Transactions', nl: 'Transacties', en: 'Transactions' },
    'bnp.prototype.g3WhatLab': { fr: 'What\'s important', nl: 'Wat telt', en: 'What\'s important' },
    'bnp.prototype.g3WhatTxt': {
      fr: 'Le delta période vs période est calculé pour chaque métrique : revenus, transactions, panier moyen. Le commerçant lit l\'écart, identifie où l\'action a porté, et décide la suite. Les valeurs affichées dans ces wireframes sont illustratives.',
      nl: 'Het verschil periode versus periode wordt berekend voor elke metric: omzet, transacties, gemiddelde winkelmand. De handelaar leest het verschil af, ziet waar het effect zat en beslist de volgende stap. De waarden in deze wireframes zijn illustratief.',
      en: 'The period-versus-period delta is computed for each metric: revenue, transactions, average basket. The shopkeeper reads the gap, sees where action paid off, and decides what comes next. Values shown in these wireframes are illustrative.'
    },
    'bnp.prototype.homeBene1': {
      fr: 'Performance + Improvement côte-à-côte : ce qui marche, ce qui glisse, en un seul écran.',
      nl: 'Performance + Improvement naast elkaar: wat werkt, wat afglijdt, op één scherm.',
      en: 'Performance + Improvement side by side: what works, what slips, on a single screen.'
    },
    'bnp.prototype.homeBene2': {
      fr: 'Pas de KPI flottant : chaque chiffre vient avec son delta vs N-1, pré-calculé.',
      nl: 'Geen losstaande KPI: elk cijfer komt met zijn delta versus N-1, vooraf berekend.',
      en: 'No floating KPI: every number comes with its pre-computed delta versus N-1.'
    },
    'bnp.prototype.homeBene3': {
      fr: 'Chaque card est cliquable : elle ouvre le rapport détaillé correspondant.',
      nl: 'Elke kaart is klikbaar: ze opent het bijhorende detailrapport.',
      en: 'Every card is clickable: it opens the matching detailed report.'
    },
    'bnp.prototype.homeCard1': { fr: 'Clients gains & losses', nl: 'Klanten gewonnen & verloren', en: 'Clients gains & losses' },
    'bnp.prototype.homeCard2': { fr: 'Top client profiles', nl: 'Top klantprofielen', en: 'Top client profiles' },
    'bnp.prototype.homeCard3': { fr: 'Top client origin', nl: 'Top klantherkomst', en: 'Top client origin' },
    'bnp.prototype.homeEyebrow': { fr: 'Prototype · Home · panorama d\'accueil', nl: 'Prototype · Home · onthaalpanorama', en: 'Prototype · Home · welcome panorama' },
    'bnp.prototype.homeImprovementLab': { fr: 'Improvement', nl: 'Verbetering', en: 'Improvement' },
    'bnp.prototype.homeKpiBasket': { fr: 'Average basket size', nl: 'Gemiddelde winkelmand', en: 'Average basket size' },
    'bnp.prototype.homeKpiRev': { fr: 'Revenue', nl: 'Omzet', en: 'Revenue' },
    'bnp.prototype.homeKpiTrans': { fr: 'Transactions', nl: 'Transacties', en: 'Transactions' },
    /* CVE 2026-05-17 v2 NNG · -25 mots · "ne montre pas X, elle Y" simplifié */
    'bnp.prototype.homeLead': {
      fr: 'Pas un rapport · un panorama. Trois KPI de performance en haut, trois indicateurs d\'amélioration en bas. Le commerçant voit en cinq secondes ce qui marche, ce qui glisse. Chaque rapport détaillé s\'ouvre depuis ici.',
      nl: 'Geen rapport · een overzicht. Drie performance-KPI bovenaan, drie verbeterindicatoren onderaan. De handelaar ziet in vijf seconden wat werkt en wat afglijdt. Elk detailrapport opent vanaf hier.',
      en: 'Not a report · a panorama. Three performance KPIs on top, three improvement indicators below. In five seconds the merchant sees what works, what slips. Each detailed report opens from here.'
    },
    'bnp.prototype.homePerformanceLab': { fr: 'Performance', nl: 'Prestaties', en: 'Performance' },
    'bnp.prototype.homeSourceLab': { fr: 'Voir le wireframe original', nl: 'Originele wireframe bekijken', en: 'See the original wireframe' },
    'bnp.prototype.homeSourceRef': {
      fr: 'Concept Report · mars 2018 · page 39 · KPI\'s Dashboard Principles',
      nl: 'Concept Report · maart 2018 · pagina 39 · KPI\'s Dashboard Principles',
      en: 'Concept Report · March 2018 · page 39 · KPI\'s Dashboard Principles'
    },
    'bnp.prototype.homeTitle': {
      fr: 'Avant les rapports, <span class="accent">le panorama.</span>',
      nl: 'Voor de rapporten, <span class="accent">het panorama.</span>',
      en: 'Before the reports, <span class="accent">the panorama.</span>'
    },
    'bnp.research.perso1Desc': {
      fr: 'Avocat, médecin, indépendant senior. Veut piloter, pas explorer.',
      nl: 'Advocaat, dokter, ervaren zelfstandige. Wil sturen, niet verkennen.',
      en: 'Lawyer, doctor, senior self-employed. Wants to steer, not to explore.'
    },
    'bnp.research.perso1Name': { fr: 'Liberal Profession Competent Challenger', nl: 'Liberal Profession Competent Challenger', en: 'Liberal Profession Competent Challenger' },
    'bnp.research.perso2Desc': { fr: 'Une seule activité, une seule vue. Cherche la clarté immédiate.', nl: 'Eén activiteit, één zicht. Zoekt onmiddellijke helderheid.', en: 'One activity, one view. Looks for immediate clarity.' },
    'bnp.research.perso2Name': { fr: 'Self-employed Solo', nl: 'Self-employed Solo', en: 'Self-employed Solo' },
    'bnp.research.perso3Desc': {
      fr: 'Petite boutique. Connaît ses clients de tête, sceptique sur la donnée.',
      nl: 'Kleine winkel. Kent zijn klanten uit het hoofd, sceptisch over data.',
      en: 'Small shop. Knows customers by heart, sceptical about data.'
    },
    'bnp.research.perso3Name': { fr: 'B2C Retailer · Single Shop', nl: 'B2C Retailer · Single Shop', en: 'B2C Retailer · Single Shop' },
    'bnp.research.perso4Desc': {
      fr: 'Le KEY TARGET. Plusieurs points de vente, peu de support data interne.',
      nl: 'De KEY TARGET. Meerdere verkooppunten, weinig interne datasteun.',
      en: 'The KEY TARGET. Several outlets, little internal data support.'
    },
    'bnp.research.perso4Name': { fr: 'B2C Retailer · Several Shops', nl: 'B2C Retailer · Several Shops', en: 'B2C Retailer · Several Shops' },
    'bnp.research.perso5Desc': {
      fr: 'Sous une enseigne. Reçoit des reportings centralisés mais veut son terrain.',
      nl: 'Onder een merk. Krijgt centrale rapporten, maar wil zijn eigen terrein zien.',
      en: 'Under a brand. Receives central reports but wants his own ground.'
    },
    'bnp.research.perso5Name': { fr: 'Franchisee Network Member', nl: 'Franchisee Network Member', en: 'Franchisee Network Member' },
    'bnp.research.perso6Desc': {
      fr: 'Marketing local. Veut tester des actions, mesurer leur impact.',
      nl: 'Lokale marketing. Wil acties testen en hun impact meten.',
      en: 'Local marketing. Wants to test actions and measure their impact.'
    },
    'bnp.research.perso6Name': { fr: 'Local Brand Manager', nl: 'Local Brand Manager', en: 'Local Brand Manager' },
    'bnp.research.perso7Desc': { fr: 'Pilote son enseigne au quotidien. Trafic, panier, fidélité.', nl: 'Stuurt zijn winkel dagelijks aan. Trafiek, winkelmand, trouw.', en: 'Runs the shop day to day. Traffic, basket, loyalty.' },
    'bnp.research.perso7Name': { fr: 'P.O.S. Owner', nl: 'P.O.S. Owner', en: 'P.O.S. Owner' },
    'bnp.research.perso8Desc': {
      fr: 'Profil corporate. Attendrait du profilage avancé : langue, profession, revenu.',
      nl: 'Corporate profiel. Verwacht geavanceerde profilering: taal, beroep, inkomen.',
      en: 'Corporate profile. Would expect advanced profiling: language, profession, income.'
    },
    'bnp.research.perso8Name': { fr: 'Corporate Banking SME', nl: 'Corporate Banking SME', en: 'Corporate Banking SME' },
    'bnp.research.perso9Desc': {
      fr: 'Bank for Entrepreneurs. Cible MVP pour qui BNP a la donnée la plus utile.',
      nl: 'Bank for Entrepreneurs. MVP-doel voor wie BNP de meest bruikbare data heeft.',
      en: 'Bank for Entrepreneurs. MVP target for whom BNP has the most useful data.'
    },
    'bnp.research.perso9Name': { fr: 'B.F.E. Smaller Corporate', nl: 'B.F.E. Smaller Corporate', en: 'B.F.E. Smaller Corporate' },
    'bnp.snm.p2a': { fr: 'Rapport 1 · Performance', nl: 'Rapport 1 · Performance', en: 'Report 1 · Performance' },
    'bnp.snm.p2b': { fr: 'Rapport 2 · Business Expansion', nl: 'Rapport 2 · Business Expansion', en: 'Report 2 · Business Expansion' },
    'bnp.snm.p2c': { fr: 'Rapport 3 · Evaluating Actions (ROI)', nl: 'Rapport 3 · Evaluating Actions (ROI)', en: 'Report 3 · Evaluating Actions (ROI)' },
    'bnp.snm.p2d': { fr: 'Market Research · phase 2 roadmap', nl: 'Market Research · fase 2 roadmap', en: 'Market Research · phase 2 roadmap' },
    'bnp.snm.p2home': { fr: 'Home · panorama d\'accueil', nl: 'Home · onthaalpanorama', en: 'Home · welcome panorama' },
    /* CVE 2026-05-18 · home.statusAvailability supprimée · pill bas-de-gamme retirée */
    'home.trustEyebrow': {
      fr: 'Travaillé avec',
      nl: 'Gewerkt met',
      en: 'Worked with'
    },
    /* CVE 2026-05-12 · Newsletter · 1 mail/mois, Substack-backed */
    'home.nlEyebrow': { fr: 'Newsletter', nl: 'Nieuwsbrief', en: 'Newsletter' },
    'home.nlH2': {
      fr: 'Un mail par mois. Pas plus.',
      nl: 'Eén mail per maand. Niet meer.',
      en: 'One email a month. No more.'
    },
    'home.nlLead': {
      fr: 'Les arbitrages Service Design qui ont marché, racontés courts. Lecture 5 minutes. Pas de pub, pas de relance.',
      nl: 'De Service Design-afwegingen die werkten, kort verteld. 5 minuten lezen. Geen reclame, geen reminders.',
      en: 'The Service Design trade-offs that worked, told short. 5-minute read. No ads, no follow-ups.'
    },
    'home.nlEmailLabel': { fr: 'Votre email', nl: 'Je e-mail', en: 'Your email' },
    'home.nlBtn': { fr: 'Recevoir', nl: 'Ontvangen', en: 'Subscribe' },
    'home.nlHint': {
      fr: 'Désabonnement en un clic, jamais de spam.',
      nl: 'Uitschrijven in één klik, nooit spam.',
      en: 'One-click unsubscribe, never spam.'
    },

    'home.contactEyebrow': { fr: 'Contact', nl: 'Contact', en: 'Contact' },
    'home.contactH2': { fr: 'Pour parler d\'un projet.', nl: 'Om over een project te praten.', en: 'To talk about a project.' },
    /* CVE 2026-05-11 audit action #3 · Cal.com primary CTA */
    'home.contactPitch': {
      fr: '30 minutes au téléphone. Gratuit. Sans engagement. Pour cadrer si on est un bon match.',
      nl: '30 minuten aan de telefoon. Gratis. Zonder verbintenis. Om af te toetsen of het een goede match is.',
      en: '30 minutes on the phone. Free. No commitment. To check if we\'re a good fit.'
    },
    /* home.contactCtaLabel retiré 2026-05-14 · le bouton CTA a été remplacé
       par un embed Cal.com inline (calendrier directement dans la page). */
    'home.contactCtaMeta': {
      fr: 'Calendrier en direct ci-dessus. Si aucun créneau ne colle, réponse en 24 h ouvrées par email.',
      nl: 'Live agenda hierboven. Als geen slot past, antwoord binnen 24u (werkdagen) per e-mail.',
      en: 'Live calendar above. If no slot fits, reply within 24h on business days by email.'
    },
    'home.contactAltLabel': {
      fr: 'Ou par les canaux directs :',
      nl: 'Of via de directe kanalen:',
      en: 'Or via direct channels:'
    },
    'home.floatingCta': {
      fr: 'Premier call · 30 min',
      nl: 'Eerste call · 30 min',
      en: 'First call · 30 min'
    },
    /* CVE 2026-05-04 S3.5 · friction-removal sur Contact ·
       paramètres clairs (réponse 24h, premier call gratuit, sans engagement) ·
       boost conversion freelance +30-50% selon benchmarks. */
    'home.contactNote': {
      fr: 'Je réponds en 24h ouvrées.',
      nl: 'Ik antwoord binnen 24u (werkdagen).',
      en: 'I reply within 24h on business days.'
    },
    'home.footerCopy': { fr: '© Christophe van Engelen, 2026.', nl: '© Christophe van Engelen, 2026.', en: '© Christophe van Engelen, 2026.' },
    'home.practiceEyebrow': { fr: 'Practice', nl: 'Practice', en: 'Practice' },
    'home.practiceH2': { fr: 'Comment je travaille.', nl: 'Hoe ik werk.', en: 'How I work.' },
    'home.seeWork': { fr: 'Selected work ↓', nl: 'Selected work ↓', en: 'Selected work ↓' },
    'home.trackEyebrow': { fr: 'Track record', nl: 'Track record', en: 'Track record' },
    'home.trackH2': { fr: 'Vingt ans, douze missions.', nl: 'Twintig jaar, twaalf opdrachten.', en: 'Twenty years, twelve assignments.' },
    'home.trackSource': { fr: 'Références sur demande.', nl: 'Referenties op aanvraag.', en: 'References on request.' },
    /* CVE 2026-05-04 S4.2 · 3 one-liners punchy remplacent les 3 paragraphes p1/p2/p3 */
    'home.practice.l1': {
      fr: '<strong>De la friction stakeholder au scope MVP signé.</strong><span class="home-practice__sub">Faire converger Business, IT et utilisateur autour d\'une décision défendable. C\'est mon métier.</span>',
      nl: '<strong>Van stakeholder-frictie tot ondertekende MVP-scope.</strong><span class="home-practice__sub">Business, IT en gebruiker laten samenkomen rond een verdedigbare beslissing. Dat is mijn vak.</span>',
      en: '<strong>From stakeholder friction to signed MVP scope.</strong><span class="home-practice__sub">Bringing Business, IT and the user together around a defensible decision. That\'s my craft.</span>'
    },
    'home.practice.l2': {
      fr: '<strong>Le bon outil au bon moment.</strong><span class="home-practice__sub">Strategyzer, Customer Journey, Heuristic Evaluation, Service Blueprint, Design Sprint. Le contexte change, le métier reste.</span>',
      nl: '<strong>De juiste tool op het juiste moment.</strong><span class="home-practice__sub">Strategyzer, Customer Journey, Heuristic Evaluation, Service Blueprint, Design Sprint. De context verandert, het vak blijft.</span>',
      en: '<strong>The right tool at the right moment.</strong><span class="home-practice__sub">Strategyzer, Customer Journey, Heuristic Evaluation, Service Blueprint, Design Sprint. The context changes, the craft stays.</span>'
    },
    'home.practice.l3': {
      fr: '<strong>Trois cases en ligne. Trois décisions de production signées.</strong><span class="home-practice__sub">BNP · Léonidas signé avant le build. SPEOS · six clients pilotes valident. HMS · 2 M€ débloqués pour la mise en prod.</span>',
      nl: '<strong>Drie cases online. Drie getekende productiebeslissingen.</strong><span class="home-practice__sub">BNP · Léonidas getekend vóór de build. SPEOS · zes pilootklanten valideren. HMS · 2 M€ vrijgemaakt voor productie.</span>',
      en: '<strong>Three cases online. Three signed production decisions.</strong><span class="home-practice__sub">BNP · Léonidas signed before the build. SPEOS · six pilot customers validate. HMS · €2M secured for production.</span>'
    },
    /* CVE 2026-05-04 S4.3 · "Voir tout l'historique" disclosure pour 4 missions
       2006-2015 masquées par défaut. */
    'home.trackMoreSummary': {
      fr: 'Voir tout l\'historique 2006 → 2015 →',
      nl: 'Bekijk de volledige geschiedenis 2006 → 2015 →',
      en: 'See full history 2006 → 2015 →'
    },

    /* CVE 2026-05-04 audit i18n · 35 clés HTML manquantes maintenant trilingual */
    'home.awardsEyebrow': { fr: 'Reconnaissances', nl: 'Erkenningen', en: 'Recognitions' },
    'home.awardsH2': {
      fr: 'Quelques signaux extérieurs.',
      nl: 'Enkele externe signalen.',
      en: 'A few external signals.'
    },
    'home.awards.fwa': {
      fr: 'Site Dragonne et plusieurs autres projets · My Media Is Rich · Creative Director.',
      nl: 'Site Dragonne en verschillende andere projecten · My Media Is Rich · Creative Director.',
      en: 'Dragonne site and several other projects · My Media Is Rich · Creative Director.'
    },
    'home.awards.awwwards': {
      fr: 'Plusieurs projets digitaux primés · My Media Is Rich · Creative Director.',
      nl: 'Verschillende bekroonde digitale projecten · My Media Is Rich · Creative Director.',
      en: 'Several award-winning digital projects · My Media Is Rich · Creative Director.'
    },
    'home.awards.creativewallonia': {
      fr: 'Concours startup · levée de fonds gagnée pour <strong>Unfold</strong>.',
      nl: 'Startup-wedstrijd · kapitaalronde gewonnen voor <strong>Unfold</strong>.',
      en: 'Startup contest · funding round won for <strong>Unfold</strong>.'
    },

    /* CVE 2026-05-17 NN-brutal · titre · cut "qui décide" (claim final répété) · -5 mots */
    'bnp.vp.title': {
      fr: 'Un dashboard, ce n\'est pas <span class="accent">pousser de la donnée.</span><br>C\'est raconter une histoire.',
      nl: 'Een dashboard is geen <span class="accent">data pushen.</span><br>Het is een verhaal vertellen.',
      en: 'A dashboard is not about <span class="accent">pushing data.</span><br>It\'s about telling a story.'
    },
    /* CVE 2026-05-17 NN-brutal · cut warmup "Avant la VP..." (Iron Imperative banni) ·
       cut "Plus de cognitive overload..." (re-statement). Mécanisme seul. -38 mots. */
    'bnp.vp.lede': {
      fr: '<strong>L\'utilisateur a un objectif, on lui livre un rapport orienté objectif.</strong> Point.',
      nl: '<strong>De gebruiker heeft een doel, we leveren een doelgericht rapport.</strong> Punt.',
      en: '<strong>The user has an objective, we deliver an objective-oriented report.</strong> Period.'
    },
    /* CVE 2026-05-17 NN-brutal · cut "La posture" (générique, redondant avec title) */
    'bnp.vp.posture.h': { fr: 'Trois principes', nl: 'Drie principes', en: 'Three principles' },
    'bnp.vp.posture.claim': {
      fr: 'Pas une plateforme exploratoire. <span class="accent">Une narration outillée.</span>',
      nl: 'Geen exploratief platform. <span class="accent">Een verhaal met tools.</span>',
      en: 'Not an exploratory platform. <span class="accent">A tool-equipped narrative.</span>'
    },
    'bnp.vp.posture.l1': {
      fr: '<strong>Pas</strong> de pushing data via charts décoratifs.',
      nl: '<strong>Geen</strong> data-push via decoratieve grafieken.',
      en: '<strong>No</strong> data-pushing via decorative charts.'
    },
    'bnp.vp.posture.l2': {
      fr: '<strong>Telling a story</strong> avec la donnée à disposition.',
      nl: '<strong>Een verhaal vertellen</strong> met de beschikbare data.',
      en: '<strong>Telling a story</strong> with the data at hand.'
    },
    'bnp.vp.posture.l3': {
      fr: '<strong>Focus</strong> sur l\'information pertinente, qui pilote l\'action.',
      nl: '<strong>Focus</strong> op relevante informatie, die actie aanstuurt.',
      en: '<strong>Focus</strong> on relevant information that drives action.'
    },
    'bnp.vp.posture.src': {
      fr: 'Source · Concept Report mars 2018 · slide « E.I. Concept · Value Proposition »',
      nl: 'Bron · Concept Report maart 2018 · slide "E.I. Concept · Value Proposition"',
      en: 'Source · Concept Report March 2018 · slide "E.I. Concept · Value Proposition"'
    },
    'bnp.vp.persona.h': {
      fr: 'Les 3 questions du commerçant',
      nl: 'De 3 vragen van de handelaar',
      en: 'The merchant\'s 3 questions'
    },
    'bnp.vp.persona.claim': {
      fr: 'Le commerçant ouvre l\'app avec <span class="accent">un objectif précis</span>, pas avec l\'envie d\'explorer.',
      nl: 'De handelaar opent de app met <span class="accent">een specifiek doel</span>, niet met de wens om te verkennen.',
      en: 'The merchant opens the app with <span class="accent">a specific goal</span>, not with a desire to explore.'
    },
    'bnp.vp.persona.q1': {
      fr: 'Pourquoi Enterprise Intelligence est pertinent pour mon business ?',
      nl: 'Waarom is Enterprise Intelligence relevant voor mijn business?',
      en: 'Why is Enterprise Intelligence relevant to my business?'
    },
    'bnp.vp.persona.q2': {
      fr: 'Quels insights vais-je en tirer concrètement ?',
      nl: 'Welke inzichten zal ik er concreet uit halen?',
      en: 'What insights will I actually gain from it?'
    },
    'bnp.vp.persona.q3': {
      fr: 'Comment je m\'en sers, ce matin, à 8h, derrière ma caisse ?',
      nl: 'Hoe gebruik ik het, vanmorgen om 8u, achter mijn kassa?',
      en: 'How do I use it, this morning at 8am, behind my counter?'
    },
    'bnp.vp.persona.hint': {
      fr: 'Il veut <strong>l\'information le plus vite possible</strong>, sans effort. Il n\'explorera pas plus de données qu\'il ne peut traiter.',
      nl: 'Hij wil <strong>de informatie zo snel mogelijk</strong>, zonder moeite. Hij verkent niet meer data dan hij kan verwerken.',
      en: 'He wants <strong>information as fast as possible</strong>, with no effort. He won\'t explore more data than he can process.'
    },
    'bnp.vp.needs.h': {
      fr: '5 besoins → 5 livrables',
      nl: '5 behoeften → 5 deliverables',
      en: '5 needs → 5 deliverables'
    },
    'bnp.vp.needs.claim': {
      fr: 'Chaque besoin du commerçant <span class="accent">se mappe à un livrable</span> du futur produit. Pas un de plus.',
      nl: 'Elke behoefte van de handelaar <span class="accent">wordt gekoppeld aan een deliverable</span> van het toekomstige product. Geen één meer.',
      en: 'Every merchant need <span class="accent">maps to one deliverable</span> of the future product. Not one more.'
    },
    'bnp.vp.needs.colNeed': { fr: 'Besoin', nl: 'Behoefte', en: 'Need' },
    'bnp.vp.needs.colDeliv': {
      fr: 'Ce que le produit livre',
      nl: 'Wat het product levert',
      en: 'What the product delivers'
    },
    'bnp.vp.needs.n1': { fr: 'Goals report', nl: 'Goals report', en: 'Goals report' },
    'bnp.vp.needs.d1': {
      fr: '<strong>Goal-oriented report</strong> calé sur les objectifs métier',
      nl: '<strong>Doelgericht rapport</strong> afgestemd op de business-doelstellingen',
      en: '<strong>Goal-oriented report</strong> aligned with business objectives'
    },
    'bnp.vp.needs.n2': { fr: 'KPI overview', nl: 'KPI overview', en: 'KPI overview' },
    'bnp.vp.needs.d2': {
      fr: 'KPIs <strong>focus là où la décision se joue</strong>',
      nl: 'KPI\'s <strong>gericht op waar de beslissing zich afspeelt</strong>',
      en: 'KPIs <strong>focused where the decision happens</strong>'
    },
    'bnp.vp.needs.n3': { fr: 'Information', nl: 'Informatie', en: 'Information' },
    'bnp.vp.needs.d3': {
      fr: 'Texte qui <strong>explique la dataviz</strong>, pas l\'inverse',
      nl: 'Tekst die <strong>de dataviz verklaart</strong>, niet andersom',
      en: 'Text that <strong>explains the dataviz</strong>, not the other way round'
    },
    'bnp.vp.needs.n4': { fr: 'Outcomes', nl: 'Outcomes', en: 'Outcomes' },
    'bnp.vp.needs.d4': {
      fr: 'Outcomes prêts à l\'emploi pour <strong>éviter le calcul mental</strong>',
      nl: 'Kant-en-klare outcomes om <strong>hoofdrekenen te vermijden</strong>',
      en: 'Ready-to-use outcomes to <strong>avoid mental calculation</strong>'
    },
    'bnp.vp.needs.n5': { fr: 'Personalisation', nl: 'Personalisatie', en: 'Personalisation' },
    'bnp.vp.needs.d5': {
      fr: 'Agrégation <strong>customisée selon les produits</strong> du commerçant',
      nl: 'Aggregatie <strong>aangepast aan de producten</strong> van de handelaar',
      en: 'Aggregation <strong>customised to the merchant\'s products</strong>'
    },
    /* CVE 2026-05-17 NN-brutal · cut "Sortie ·" warmup + cut "On n'arbitre plus..." (méta-narration) ·
       garde le fait substantiel · 4 fonctions, même phrase. -22 mots. */
    'bnp.vp.bridgeText': {
      fr: '<strong>Banking, IT, Legal et Marketing</strong> partagent la même phrase, le même utilisateur, les mêmes 5 livrables. <span class="accent">Socle commun.</span>',
      nl: '<strong>Banking, IT, Legal en Marketing</strong> delen dezelfde zin, dezelfde gebruiker, dezelfde 5 deliverables. <span class="accent">Gemeenschappelijke basis.</span>',
      en: '<strong>Banking, IT, Legal and Marketing</strong> share the same sentence, the same user, the same 5 deliverables. <span class="accent">Common ground.</span>'
    },
    'bnp.vp.bridgeNext': {
      fr: 'Suite logique <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 4 Goals identifiés en atelier',
      nl: 'Logisch vervolg <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 4 Goals geïdentificeerd in workshop',
      en: 'Next step <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 4 Goals identified in workshop'
    },

    /* CVE 2026-05-04 S8.2 · About / Bio dense factuelle pour LLM citations */
    'home.aboutEyebrow': { fr: 'À propos', nl: 'Over mij', en: 'About' },
    'home.aboutH2': { fr: 'Bio en clair.', nl: 'Bio in het kort.', en: 'Bio in plain words.' },
    'home.about.p1': {
      fr: '<strong itemprop="name">Christophe van Engelen</strong>. <span itemprop="jobTitle">Senior UX Designer + Design Thinking practitioner</span>, freelance à <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="addressLocality">Uccle</span>, <span itemprop="addressRegion">Bruxelles</span>, <span itemprop="addressCountry">Belgique</span></span>. Vingt ans à simplifier des écosystèmes digitaux complexes. Trilingue FR / NL / EN.',
      nl: '<strong itemprop="name">Christophe van Engelen</strong>. <span itemprop="jobTitle">Senior UX Designer + Design Thinking practitioner</span>, freelance in <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="addressLocality">Ukkel</span>, <span itemprop="addressRegion">Brussel</span>, <span itemprop="addressCountry">België</span></span>. Twintig jaar complexe digitale ecosystemen vereenvoudigen. Drietalig FR / NL / EN.',
      en: '<strong itemprop="name">Christophe van Engelen</strong>. <span itemprop="jobTitle">Senior UX Designer + Design Thinking practitioner</span>, freelance in <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress"><span itemprop="addressLocality">Uccle</span>, <span itemprop="addressRegion">Brussels</span>, <span itemprop="addressCountry">Belgium</span></span>. Twenty years simplifying complex digital ecosystems. Trilingual FR / NL / EN.'
    },
    'home.about.p2': {
      fr: '<strong>Banque, postal industriel, industrial IoT, legal-tech, produit digital.</strong> Le contexte change, le métier reste. Cinq industries, douze missions, trois cases en ligne.',
      nl: '<strong>Banking, industriële post, industrial IoT, legal-tech, digitaal product.</strong> De context verandert, het vak blijft. Vijf industrieën, twaalf opdrachten, drie cases online.',
      en: '<strong>Banking, industrial postal, industrial IoT, legal-tech, digital product.</strong> The context changes, the craft stays. Five industries, twelve assignments, three cases online.'
    },
    'home.about.p3': {
      fr: '<strong>Le bon outil au bon moment.</strong> Strategyzer, Customer Journey, Heuristic Evaluation, Service Blueprint, Design Sprint · des outils du même Design System. La maîtrise · savoir lequel, quand, avec qui dans la salle.',
      nl: '<strong>De juiste tool op het juiste moment.</strong> Strategyzer, Customer Journey, Heuristic Evaluation, Service Blueprint, Design Sprint · tools van hetzelfde Design System. De meesterschap · weten welke, wanneer, met wie in de zaal.',
      en: '<strong>The right tool at the right moment.</strong> Strategyzer, Customer Journey, Heuristic Evaluation, Service Blueprint, Design Sprint · tools of the same Design System. Mastery · knowing which one, when, with whom in the room.'
    },
    'home.about.p4': {
      fr: '<strong>À l\'écoute des projets qui ont du sens.</strong> Premier call 30 min, gratuit, sans engagement. <a href="mailto:hello@christophevanengelen.com?utm_source=portfolio&utm_medium=about" data-event="mailto-cve" data-event-source="about">hello@christophevanengelen.com</a>.',
      nl: '<strong>Open voor projecten met betekenis.</strong> Eerste call 30 min, gratis, zonder verbintenis. <a href="mailto:hello@christophevanengelen.com?utm_source=portfolio&utm_medium=about" data-event="mailto-cve" data-event-source="about">hello@christophevanengelen.com</a>.',
      en: '<strong>Listening for projects that matter.</strong> First call 30 min, free, no commitment. <a href="mailto:hello@christophevanengelen.com?utm_source=portfolio&utm_medium=about" data-event="mailto-cve" data-event-source="about">hello@christophevanengelen.com</a>.'
    },

    /* CVE 2026-05-04 S8.1 · FAQ avec Schema FAQPage · 7 Q&A pour featured snippet */
    'home.faqEyebrow': { fr: 'Questions fréquentes', nl: 'Veelgestelde vragen', en: 'Frequently asked questions' },
    'home.faqH2': { fr: 'Ce qu\'on me demande le plus.', nl: 'Wat me het meest gevraagd wordt.', en: 'What I get asked the most.' },
    'home.faq.q1': { fr: 'Tu interviens dans quels secteurs ?', nl: 'In welke sectoren werk je?', en: 'Which sectors do you work in?' },
    'home.faq.a1': {
      fr: '<p><strong>Banking, postal industriel, industrial IoT, legal-tech, produit digital, services financiers.</strong> Le contexte change. Le défi reste · des produits complexes, des stakeholders multiples, et un besoin d\'aligner Business et IT autour de l\'utilisateur.</p>',
      nl: '<p><strong>Banking, industriële post, industrial IoT, legal-tech, digitaal product, financiële diensten.</strong> De context verandert. De uitdaging blijft · complexe producten, meerdere stakeholders, en de behoefte om Business en IT rond de gebruiker te aligneren.</p>',
      en: '<p><strong>Banking, industrial postal, industrial IoT, legal-tech, digital product, financial services.</strong> The context changes. The challenge stays · complex products, multiple stakeholders, and a need to align Business and IT around the user.</p>'
    },
    'home.faq.q2': { fr: 'Quelles méthodes utilises-tu ?', nl: 'Welke methodes gebruik je?', en: 'What methods do you use?' },
    'home.faq.a2': {
      fr: '<p><strong>Le toolkit n\'est pas l\'école.</strong> Strategyzer, Customer Journey, Heuristic Evaluation Nielsen, Service Blueprint, Design Sprint · des outils du même Design System. Je choisis lequel selon la maturité Agile, la culture user-centric, et l\'ouverture du sponsor.</p>',
      nl: '<p><strong>De toolkit is niet de school.</strong> Strategyzer, Customer Journey, Heuristic Evaluation Nielsen, Service Blueprint, Design Sprint · tools van hetzelfde Design System. Ik kies welke volgens de Agile-maturiteit, de user-centric cultuur, en de openheid van de sponsor.</p>',
      en: '<p><strong>The toolkit is not the school.</strong> Strategyzer, Customer Journey, Heuristic Evaluation Nielsen, Service Blueprint, Design Sprint · tools of the same Design System. I pick which one based on Agile maturity, user-centric culture, and sponsor openness.</p>'
    },
    'home.faq.q3': { fr: 'Tu travailles aussi avec des startups ?', nl: 'Werk je ook met startups?', en: 'Do you also work with startups?' },
    'home.faq.a3': {
      fr: '<p><strong>Oui · Unfold, WeJustice, Cezzam.</strong> Le rythme startup, je le connais · décisions vite, ressources limitées, validation utilisateur permanente.</p>',
      nl: '<p><strong>Ja · Unfold, WeJustice, Cezzam.</strong> Het startup-ritme ken ik · snelle beslissingen, beperkte middelen, permanente gebruikersvalidatie.</p>',
      en: '<p><strong>Yes · Unfold, WeJustice, Cezzam.</strong> The startup rhythm I know · fast decisions, limited resources, constant user validation.</p>'
    },
    'home.faq.q4': { fr: 'Combien de temps avant de pouvoir démarrer ?', nl: 'Hoe lang voor je kan starten?', en: 'How long before you can start?' },
    'home.faq.a4': {
      fr: '<p><strong>Cela dépend du projet et de la valeur en jeu.</strong> Réponse en 24h ouvrées. Premier call 30 min gratuit. Si l\'enjeu est cadré et l\'agenda urgent, je peux faire bouger les choses · démarrage habituel en 2 à 4 semaines.</p>',
      nl: '<p><strong>Hangt af van het project en de waarde die op het spel staat.</strong> Antwoord binnen 24u (werkdagen). Eerste call 30 min gratis. Als de inzet helder en de agenda dringend is, kan ik dingen in beweging brengen · gewoonlijke start in 2 tot 4 weken.</p>',
      en: '<p><strong>It depends on the project and the value at stake.</strong> Reply within 24h business days. First call 30 min free. If the stake is framed and the agenda urgent, I can move things forward · usual start in 2 to 4 weeks.</p>'
    },
    'home.faq.q5': { fr: 'Tarifs et modèle de facturation ?', nl: 'Tarieven en facturatiemodel?', en: 'Rates and billing model?' },
    'home.faq.a5': {
      fr: '<p><strong>Je facture la valeur livrée, pas les heures.</strong> Forfait fixe pour scope cadré (audit CX, atelier 2 jours, coaching). TJM négocié pour long-cours 3-12 mois. Devis dans les 48h après le premier call.</p>',
      nl: '<p><strong>Ik factureer de geleverde waarde, niet de uren.</strong> Vast forfait voor gekaderde scope (CX-audit, workshop 2 dagen, coaching). Onderhandeld dagtarief voor langlopend 3-12 maanden. Offerte binnen 48u na het eerste gesprek.</p>',
      en: '<p><strong>I bill the value delivered, not the hours.</strong> Fixed fee for scoped assignments (CX audit, 2-day workshop, coaching). Negotiated day rate for long-term 3-12 months. Quote within 48h after the first call.</p>'
    },
    'home.faq.q6': { fr: 'Tu fais de l\'execution ou seulement du strategy ?', nl: 'Doe je executie of alleen strategy?', en: 'Do you do execution or only strategy?' },
    'home.faq.a6': {
      fr: '<p><strong>Les deux.</strong> J\'arrive par le Business, je reste avec l\'IT. Mon focus · que la stratégie tienne en production, pas en slide deck. Figma, user stories, sprint planning.</p>',
      nl: '<p><strong>Beide.</strong> Ik kom binnen langs Business, ik blijf bij IT. Mijn focus · dat de strategie in productie staat, niet in een slide deck. Figma, user stories, sprint planning.</p>',
      en: '<p><strong>Both.</strong> I come in through Business, I stay with IT. My focus · that the strategy holds in production, not in a slide deck. Figma, user stories, sprint planning.</p>'
    },
    'home.faq.q7': { fr: 'Comment tu choisis tes outils selon le contexte ?', nl: 'Hoe kies je je tools afhankelijk van de context?', en: 'How do you pick your tools depending on context?' },
    'home.faq.a7': {
      fr: '<p><strong>Trois critères · maturité Agile, culture user-centric, ouverture du sponsor.</strong> Banque mature avec donnée à activer → Strategyzer · Lean Canvas + VPC. Postal industriel en bascule Agile → Customer Journey AS-IS + Pain Points. Industrial IoT à unifier → Customer Journey + Heuristic Evaluation Nielsen. <strong>Le bon outil au bon moment, avec les bonnes parties prenantes dans la salle.</strong></p>',
      nl: '<p><strong>Drie criteria · Agile-maturiteit, user-centric cultuur, openheid van de sponsor.</strong> Volwassen bank met te activeren data → Strategyzer · Lean Canvas + VPC. Industrieel postaal in Agile-overgang → Customer Journey AS-IS + Pain Points. Industrial IoT te herenigen → Customer Journey + Heuristic Evaluation Nielsen. <strong>De juiste tool op het juiste moment, met de juiste mensen in de zaal.</strong></p>',
      en: '<p><strong>Three criteria · Agile maturity, user-centric culture, sponsor openness.</strong> Mature bank with data to activate → Strategyzer · Lean Canvas + VPC. Industrial postal in Agile transition → Customer Journey AS-IS + Pain Points. Industrial IoT to unify → Customer Journey + Heuristic Evaluation Nielsen. <strong>The right tool at the right time, with the right people in the room.</strong></p>'
    },
    'speos.alignment.f1.fn': { fr: 'Project Owner · Business', nl: 'Project Owner · Business', en: 'Project Owner · Business' },
    'speos.alignment.f1.h': { fr: '« Quel relais de croissance ? »', nl: '« Welke groeihefboom? »', en: '"Which growth driver?"' },
    'speos.alignment.f2.fn': { fr: 'Project Manager · IT', nl: 'Project Manager · IT', en: 'Project Manager · IT' },
    'speos.alignment.f2.h': { fr: '« On peut builder demain. »', nl: '« We kunnen morgen bouwen. »', en: '"We can build tomorrow."' },
    'speos.alignment.f3.fn': { fr: 'Project Lead · arbitrage', nl: 'Project Lead · arbitrage', en: 'Project Lead · arbitration' },
    'speos.alignment.f3.h': { fr: '« L\'obligation 2026 ne bouge pas. »', nl: '« De verplichting 2026 schuift niet op. »', en: '"The 2026 deadline does not move."' },
    'speos.alignment.f4.fn': { fr: 'UI & UX · validation', nl: 'UI & UX · validatie', en: 'UI & UX · validation' },
    'speos.alignment.f4.h': { fr: '« Et l\'expérience ? »', nl: '« En de ervaring? »', en: '"And the experience?"' },
    /* CVE 2026-05-11 SPEOS Alignment 2×2 AVANT/APRÈS · UX Researcher reco */
    'speos.alignment.f1.avant': {
      fr: 'La rente print s\'érode pendant que les pure players capturent les PME.',
      nl: 'De print-rente brokkelt af terwijl pure players de kmo\'s veroveren.',
      en: 'The print rent erodes while pure players capture SMEs.'
    },
    'speos.alignment.f1.apres': {
      fr: 'Value Proposition multicanale + pricing par paliers. Expansion ouverte, segment PME repris.',
      nl: 'Multichannel Value Proposition + tiered pricing. Expansie open, KMO-segment heroverd.',
      en: 'Multichannel Value Proposition + tiered pricing. Expansion opened, SME segment recaptured.'
    },
    'speos.alignment.f2.avant': {
      fr: 'Envie de coder avant d\'aligner. Cinq systèmes déconnectés à orchestrer.',
      nl: 'Drang om te coderen voor er afgestemd is. Vijf losgekoppelde systemen te orkestreren.',
      en: 'Urge to code before aligning. Five disconnected systems to orchestrate.'
    },
    'speos.alignment.f2.apres': {
      fr: 'Customer Journey AS-IS posé sur les 12 entretiens experts. 10 Pain Points cartographiés avant la moindre ligne MVP.',
      nl: 'AS-IS Customer Journey gebouwd op de 12 expertinterviews. 10 Pain Points in kaart gebracht vóór de eerste MVP-regel.',
      en: 'AS-IS Customer Journey built on the 12 expert interviews. 10 Pain Points mapped before any MVP line.'
    },
    'speos.alignment.f3.avant': {
      fr: 'Tenir le calendrier face à la volonté de tout faire.',
      nl: 'De planning houden tegenover de wil om alles te doen.',
      en: 'Holding the timeline against the wish to do everything.'
    },
    'speos.alignment.f3.apres': {
      fr: 'Scope MVP tranché à 5 Value Props. Le reste placé en phase 2. Décision écrite, pas un compromis flou.',
      nl: 'MVP-scope gesneden op 5 Value Props. De rest geplaatst in fase 2. Schriftelijke beslissing, geen vaag compromis.',
      en: 'MVP scope cut at 5 Value Props. The rest placed in phase 2. Written decision, not a fuzzy compromise.'
    },
    'speos.alignment.f4.avant': {
      fr: 'L\'expérience reste impensée si on découpe par fonctionnalité.',
      nl: 'De ervaring blijft ondoordacht als je per feature snijdt.',
      en: 'Experience stays unthought when we slice by feature.'
    },
    'speos.alignment.f4.apres': {
      fr: 'Onboarding piloté par persona + tests chez 6 clients pilotes. Signal sponsor sécurisé. Luminus parmi eux.',
      nl: 'Persona-gestuurde onboarding + tests bij 6 pilootklanten. Sponsorvertrouwen veilig. Luminus daarbij.',
      en: 'Persona-driven onboarding + tests at 6 pilot clients. Sponsor signal secured. Luminus among them.'
    },
    /* CVE 2026-05-11 SPEOS Shared Language Artefact · Trend Researcher reco */
    'speos.shared.eyebrow': { fr: 'L\'artefact qui a fait basculer', nl: 'Het artefact dat de kanteling bracht', en: 'The artefact that tipped it' },
    'speos.shared.h2': {
      fr: 'La même Value Proposition <span class="accent">dans la bouche de Business et IT.</span>',
      nl: 'Dezelfde Value Proposition <span class="accent">uit de mond van Business en IT.</span>',
      en: 'The same Value Proposition <span class="accent">in the mouth of Business and IT.</span>'
    },
    'speos.shared.lead': {
      fr: 'Business et IT décrivaient le même produit avec deux vocabulaires. La phrase ci-dessous est sortie des deux côtés, mot pour mot.',
      nl: 'Business en IT beschreven hetzelfde product met twee vocabulaires. De onderstaande zin kwam uit beide kanten, woord voor woord.',
      en: 'Business and IT described the same product with two vocabularies. The sentence below came out of both sides, word for word.'
    },
    'speos.shared.bizTag': { fr: 'Business voulait', nl: 'Business wou', en: 'Business wanted' },
    'speos.shared.bizText': {
      fr: '« Un canal de revenu récurrent sur les comptes-clés, avec une expansion possible vers les PME via un onboarding plus simple. »',
      nl: '« Een terugkerend inkomstenkanaal op de key accounts, met mogelijke expansie naar kmo\'s via een eenvoudigere onboarding. »',
      en: '"A recurring revenue channel on the key accounts, with possible expansion to SMEs via a simpler onboarding."'
    },
    'speos.shared.itTag': { fr: 'IT voulait', nl: 'IT wou', en: 'IT wanted' },
    'speos.shared.itText': {
      fr: '« Une plateforme avec un seul socle de production et une API-isation propre pour éviter de refaire deux fois la même intégration. »',
      nl: '« Een platform met één productiesokkel en een propere API-isatie om niet twee keer dezelfde integratie te bouwen. »',
      en: '"A platform with a single production layer and clean API-isation, to avoid building the same integration twice."'
    },
    'speos.shared.sharedTag': { fr: 'Ce qu\'ils ont fini par dire ensemble', nl: 'Wat ze uiteindelijk samen zeiden', en: 'What they ended up saying together' },
    'speos.shared.sharedText': {
      fr: '« Une plateforme one-stop avec <strong>onboarding piloté par persona</strong>, qui ouvre les PME sans déstabiliser les comptes-clés, sur un <strong>socle de production unique</strong> avec API publique. »',
      nl: '« Een one-stop platform met <strong>persona-gestuurde onboarding</strong>, dat kmo\'s opent zonder de key accounts te destabiliseren, op één <strong>productiesokkel</strong> met publieke API. »',
      en: '"A one-stop platform with <strong>persona-driven onboarding</strong>, opening SMEs without destabilising key accounts, on a <strong>single production layer</strong> with public API."'
    },
    'speos.shared.consequence': {
      fr: 'Cette phrase a fini sur la couverture du Concept Report. Plus aucun arbitrage n\'a remis en cause la direction.',
      nl: 'Deze zin belandde op de cover van het Concept Report. Geen enkele afweging heeft de richting nadien nog ter discussie gesteld.',
      en: 'That sentence ended up on the cover of the Concept Report. No arbitration questioned the direction afterwards.'
    },
    /* CVE 2026-05-11 HMS L'antagoniste · Trend Researcher reco · stakes business IXON */
    'hms.antagonist.eyebrow': { fr: 'L\'antagoniste', nl: 'De antagonist', en: 'The antagonist' },
    'hms.antagonist.h2': {
      fr: 'Pendant qu\'Ewon vendait des routeurs, <span class="accent">IXON vendait une plateforme.</span>',
      nl: 'Terwijl Ewon routers verkocht, <span class="accent">verkocht IXON een platform.</span>',
      en: 'While Ewon was selling routers, <span class="accent">IXON was selling a platform.</span>'
    },
    'hms.antagonist.lead': {
      fr: 'Ewon a vingt ans de comptes-clés fidèles et la promesse industrielle qui va avec · superviser et contrôler des machines à distance, partout dans le monde. IXON, startup cloud-native néerlandaise, n\'avait ni l\'historique ni la dette technique. Et le bénéfice de cette absence de passé · une expérience produit pensée user-centric dès le premier jour.',
      nl: 'Ewon heeft twintig jaar trouwe key accounts en de industriële belofte die daarbij hoort · machines op afstand superviseren en controleren, overal ter wereld. IXON, Nederlandse cloud-native startup, had geen historiek noch technische schuld. En het voordeel van die afwezigheid van verleden · een productervaring user-centric vanaf dag één.',
      en: 'Ewon has twenty years of loyal key accounts and the industrial promise that comes with it · supervising and controlling machines remotely, anywhere in the world. IXON, a Dutch cloud-native startup, had neither the history nor the technical debt. And the benefit of that absence of past · a product experience designed user-centric from day one.'
    },
    'hms.antagonist.ewonTag': { fr: 'Ewon (legacy industriel)', nl: 'Ewon (industriële legacy)', en: 'Ewon (industrial legacy)' },
    'hms.antagonist.ewon1': { fr: 'Trois plateformes legacy à se parler · eCatcher, M2Web, Talk2M.', nl: 'Drie legacy-platformen die met elkaar moeten praten · eCatcher, M2Web, Talk2M.', en: 'Three legacy platforms to talk to each other · eCatcher, M2Web, Talk2M.' },
    'hms.antagonist.ewon2': { fr: 'Zéro self-onboarding · démarrage manuel piloté par les commerciaux.', nl: 'Geen self-onboarding · handmatige start gestuurd door de sales.', en: 'Zero self-onboarding · manual start driven by sales.' },
    'hms.antagonist.ewon3': { fr: 'Pas de design system, pas de librairie front Angular.', nl: 'Geen design system, geen Angular-frontbibliotheek.', en: 'No design system, no Angular front library.' },
    'hms.antagonist.ewon4': { fr: 'Vingt ans de fidélité client, mais segment PME en érosion.', nl: 'Twintig jaar klantloyaliteit, maar erosie in het kmo-segment.', en: 'Twenty years of customer loyalty, but SME segment eroding.' },
    'hms.antagonist.ixonTag': { fr: 'IXON (cloud-native)', nl: 'IXON (cloud-native)', en: 'IXON (cloud-native)' },
    'hms.antagonist.ixon1': { fr: 'Une plateforme unifiée, cloud-native dès le premier jour.', nl: 'Eén verenigd platform, cloud-native vanaf dag één.', en: 'One unified platform, cloud-native from day one.' },
    'hms.antagonist.ixon2': { fr: 'Self-onboarding automatisé · le client démarre seul.', nl: 'Automatische self-onboarding · de klant start zelf.', en: 'Automated self-onboarding · the customer starts alone.' },
    'hms.antagonist.ixon3': { fr: 'Freemium pour capter les End-User Plants laissés de côté.', nl: 'Freemium om de End-User Plants te vangen die opzij waren gezet.', en: 'Freemium to capture the End-User Plants left aside.' },
    'hms.antagonist.ixon4': { fr: 'Persona-driven · le produit pensé par segment d\'usage.', nl: 'Persona-driven · product gedacht per gebruikssegment.', en: 'Persona-driven · product designed per usage segment.' },
    'hms.antagonist.consequence': {
      fr: 'Le retard à combler n\'était pas business · les machines Ewon tiennent en production sur tous les continents. Le retard était <strong>UX, UI et culture user-centric</strong>. C\'est ce diagnostic qui a justifié, à la fin du mandat, les <strong class="accent">2 M€ obtenus en comité de direction</strong> pour passer le concept en production.',
      nl: 'De achterstand was niet business · Ewon-machines draaien in productie op alle continenten. De achterstand was <strong>UX, UI en user-centric cultuur</strong>. Die diagnose heeft, aan het einde van de opdracht, de <strong class="accent">2 M€ verkregen in directiecomité</strong> gerechtvaardigd om het concept in productie te brengen.',
      en: 'The gap to close was not business · Ewon machines run in production on every continent. The gap was <strong>UX, UI and user-centric culture</strong>. That diagnosis justified, at the end of the mandate, the <strong class="accent">€2M secured in steering committee</strong> to bring the concept into production.'
    },
    'speos.alignment.lead': {
      fr: 'Project Owner Business voulait des fonctionnalités vendables, Project Manager IT une stack maintenable, Project Lead arbitrait sur le calendrier. Deux formats d\'atelier ont fait le pont · petits ateliers IT, grands ateliers Customer Journey.',
      nl: 'Project Owner Business wou verkoopbare features, Project Manager IT een onderhoudbare stack, Project Lead bewaakte de planning. Twee workshopformats sloegen de brug · kleine IT-workshops, grote Customer Journey workshops.',
      en: 'Business Project Owner wanted sellable features, IT Project Manager a maintainable stack, Project Lead arbitrated the schedule. Two workshop formats bridged it · small IT workshops, large Customer Journey workshops.'
    },
    'speos.alignment.pivotOutcome': {
      fr: 'Quand les quatre rôles ont vu les mêmes six clients pilotes au centre, le projet est devenu <strong class="accent">la plateforme de tout le monde</strong>. Plus de débat sur le « si », arbitrage sur le « quand ».',
      nl: 'Toen de vier rollen dezelfde zes pilootklanten in het midden zagen, werd het project <strong class="accent">het platform van iedereen</strong>. Geen debat meer over het « als », arbitrage over het « wanneer ».',
      en: 'When the four roles saw the same six pilot clients at the centre, the project became <strong class="accent">everyone\'s platform</strong>. No more debate on "if", arbitration on "when".'
    },
    'speos.alignment.sourceLab': { fr: 'Voir la Stakeholder Map originale', nl: 'Originele Stakeholder Map bekijken', en: 'See the original Stakeholder Map' },
    'speos.alignment.sourceRef': { fr: 'Speos Design Thinking Roadmap 2024 · p11 · Stakeholder Map', nl: 'Speos Design Thinking Roadmap 2024 · p11 · Stakeholder Map', en: 'Speos Design Thinking Roadmap 2024 · p11 · Stakeholder Map' },
    'speos.analyse.cjmArtefactCaption': {
      fr: 'L\'artefact original. Persona Johnny au centre, stickers de pain points et d\'opportunités posés en atelier par toutes les parties prenantes. C\'est ce mur qui a remplacé les slides PowerPoint comme langage commun.',
      nl: 'Het originele artefact. Persona Johnny in het midden, stickers van pain points en opportuniteiten geplakt in workshop door alle stakeholders. Deze muur verving de PowerPoint-slides als gedeelde taal.',
      en: 'The original artefact. Persona Johnny in the centre, pain point and opportunity stickers placed in workshop by all stakeholders. This wall replaced the PowerPoint slides as the shared language.'
    },
    'speos.analyse.cjmEyebrow': { fr: 'Phase 02 · Define · Customer Journey AS-IS', nl: 'Fase 02 · Define · AS-IS Customer Journey', en: 'Phase 02 · Define · AS-IS Customer Journey' },
    'speos.analyse.cjmLead': {
      fr: 'Journey end-to-end. Dix pain points épinglés là où ils bloquent. Langage commun des départements.',
      nl: 'End-to-end journey. Tien pain points geprikt waar ze blokkeren. Gedeelde taal voor de departementen.',
      en: 'End-to-end journey. Ten pain points pinned where they block. Shared language across departments.'
    },
    'speos.analyse.cjmSource': {
      fr: '<span class="source-link__lab">Voir le Concept Report SPEOS complet</span>\n      <span class="source-link__ref">Speos Concept Report 2024 · 76 pages · Customer Journey AS-IS + 10 pain points cartographiés</span>\n      <span class="source-link__arrow" aria-hidden="true">↗</span>',
      nl: '<span class="source-link__lab">Het volledige SPEOS Concept Report bekijken</span>\n      <span class="source-link__ref">Speos Concept Report 2024 · 76 pagina\'s · Customer Journey AS-IS + 10 pain points gekarteerd</span>\n      <span class="source-link__arrow" aria-hidden="true">↗</span>',
      en: '<span class="source-link__lab">See the full SPEOS Concept Report</span>\n      <span class="source-link__ref">Speos Concept Report 2024 · 76 pages · AS-IS Customer Journey + 10 mapped pain points</span>\n      <span class="source-link__arrow" aria-hidden="true">↗</span>'
    },
    'speos.analyse.cjmTitle': {
      fr: 'Une journey end-to-end. <span class="accent">Dix frictions cartographiées.</span>',
      nl: 'Een end-to-end journey. <span class="accent">Tien frictiepunten in kaart.</span>',
      en: 'An end-to-end journey. <span class="accent">Ten frictions mapped.</span>'
    },
    'speos.analyse.vpCliffhanger': { fr: 'Tout converge sur <span class="accent">une seule VP.</span>', nl: 'Alles komt samen in <span class="accent">één VP.</span>', en: 'Everything converges on <span class="accent">a single VP.</span>' },
    'speos.analyse.vpConvergeIntro': {
      fr: 'Quatre inputs Discovery + Analyse convergent vers une phrase, pas vers un canvas.',
      nl: 'Vier Discovery + Analyse inputs komen samen in één zin, niet in een canvas.',
      en: 'Four Discovery + Analysis inputs converge into one sentence, not into a canvas.'
    },
    'speos.analyse.vpEyebrow': { fr: 'Au bout du diamant 1', nl: 'Aan het einde van diamant 1', en: 'At the end of diamond 1' },
    'speos.analyse.ws1Desc': {
      fr: 'Project Owners et Project Managers à la même table. Chaque équipe construit l\'empathy map d\'une persona client, puis confronte sa lecture. Effet immédiat : on découvre qu\'on parle du même utilisateur, pas du même contrat.',
      nl: 'Project Owners en Project Managers aan dezelfde tafel. Elk team bouwt de empathy map van een klantpersona en confronteert dan zijn lezing. Onmiddellijk effect: men ontdekt dat men over dezelfde gebruiker praat, niet over hetzelfde contract.',
      en: 'Project Owners and Project Managers at the same table. Each team builds the empathy map of a client persona, then confronts its reading. Immediate effect: people discover they talk about the same user, not the same contract.'
    },
    'speos.analyse.ws1Name': { fr: 'Empathy mapping cross-département', nl: 'Empathy mapping cross-departement', en: 'Cross-department empathy mapping' },
    'speos.analyse.ws1Output': {
      fr: 'Output : 6 empathy maps consolidées · langage user partagé.',
      nl: 'Output: 6 geconsolideerde empathy maps · gedeelde gebruikerstaal.',
      en: 'Output: 6 consolidated empathy maps · shared user language.'
    },
    'speos.analyse.ws2Desc': {
      fr: 'Reconstruire la journey end-to-end avec les vrais acteurs internes (sales, ops, support, IT). Chaque touchpoint est validé par celui qui le tient. Les pain points sortent à l\'oral, sont épinglés au mur.',
      nl: 'De end-to-end journey heropbouwen met de echte interne actoren (sales, ops, support, IT). Elk touchpoint wordt gevalideerd door wie het beheert. Pain points komen mondeling boven, worden op de muur geprikt.',
      en: 'Rebuild the end-to-end journey with the real internal actors (sales, ops, support, IT). Each touchpoint is validated by whoever owns it. Pain points come out in conversation and get pinned on the wall.'
    },
    'speos.analyse.ws2Name': { fr: 'Customer Journey workshops', nl: 'Customer Journey workshops', en: 'Customer Journey workshops' },
    'speos.analyse.ws2Output': {
      fr: 'Output : journey 5 phases · 10 pain points cartographiés · ownership clair par étape.',
      nl: 'Output: journey in 5 fasen · 10 pain points in kaart · helder eigenaarschap per stap.',
      en: 'Output: 5-phase journey · 10 pain points mapped · clear ownership per step.'
    },
    'speos.analyse.ws3Desc': {
      fr: 'Chaque pain point est reformulé en opportunité. Les équipes votent les "how might we" qui méritent un MVP. Pas de débat sur le canvas, focus sur l\'action priorisée.',
      nl: 'Elke pain point wordt herformuleerd als opportuniteit. De teams stemmen welke "how might we" een MVP verdienen. Geen debat over het canvas, focus op de geprioriteerde actie.',
      en: 'Each pain point is reframed as an opportunity. The teams vote on the "how might we" worth an MVP. No debate on the canvas, focus on the prioritised action.'
    },
    'speos.analyse.ws3Name': { fr: '"How might we" sessions', nl: '"How might we" sessies', en: '"How might we" sessions' },
    'speos.analyse.ws3Output': { fr: 'Output : top 12 HMW · scoring impact / effort · backlog VP.', nl: 'Output: top 12 HMW · scoring impact / inspanning · backlog VP.', en: 'Output: top 12 HMW · impact / effort scoring · VP backlog.' },
    'speos.analyse.ws4Desc': {
      fr: 'Le workshop final qui condense les outputs précédents en une seule formulation de VP. Chacun défend, ajuste, signe. Sortie de salle = VP partagée IT + Business + Innovation.',
      nl: 'De finale workshop die de vorige outputs samenbrengt in één VP-formulering. Iedereen verdedigt, past aan, tekent. Uit de zaal = VP gedeeld door IT + Business + Innovation.',
      en: 'The final workshop that condenses previous outputs into a single VP statement. Everyone defends, adjusts, signs. Out of the room = VP shared by IT + Business + Innovation.'
    },
    'speos.analyse.ws4Name': { fr: 'VP synthesis workshop', nl: 'VP synthesis workshop', en: 'VP synthesis workshop' },
    'speos.analyse.ws4Output': {
      fr: 'Output : VP en 1 phrase · alignement signé · go pour Diamant 2.',
      nl: 'Output: VP in 1 zin · alignement getekend · go voor Diamant 2.',
      en: 'Output: VP in one sentence · alignment signed · go for Diamond 2.'
    },
    'speos.analyse.wsEyebrow': { fr: 'Phase 02 · Define · ateliers cocréation', nl: 'Fase 02 · Define · co-creatie workshops', en: 'Phase 02 · Define · co-creation workshops' },
    'speos.analyse.wsLead': {
      fr: 'Deux régimes · petits ateliers ciblés avec les Project Managers IT pour les arbitrages techniques, grands ateliers Customer Journey avec Business, IT, Operations et Customer Service. Quatre formats, quatre livrables.',
      nl: 'Twee regimes · kleine gerichte workshops met de Project Managers IT voor de technische afwegingen, grote Customer Journey workshops met Business, IT, Operations en Customer Service. Vier formats, vier livrables.',
      en: 'Two regimes · small targeted workshops with IT Project Managers for technical trade-offs, large Customer Journey workshops with Business, IT, Operations and Customer Service. Four formats, four deliverables.'
    },
    'speos.analyse.wsTitle': {
      fr: 'Le langage commun. <span class="accent">En atelier, pas en canvas.</span>',
      nl: 'De gedeelde taal. <span class="accent">In workshop, niet in canvas.</span>',
      en: 'The shared language. <span class="accent">In workshop, not in canvas.</span>'
    },
    'speos.barriers.label': {
      fr: 'Phase 02 · Define · 10 pain points sur 5 phases du Customer Journey · sourcés 12 expert interviews + 6 customer interviews',
      nl: 'Fase 02 · Define · 10 pain points op 5 fasen van de Customer Journey · gesourced 12 expert interviews + 6 klanteninterviews',
      en: 'Phase 02 · Define · 10 pain points across 5 Customer Journey phases · sourced 12 expert interviews + 6 customer interviews'
    },
    'speos.brief.eyebrow': { fr: 'Le brief', nl: 'De briefing', en: 'The brief' },
    'speos.brief.lead1': {
      fr: 'SPEOS, filiale postale du groupe bpost. Production documentaire à grande échelle pour comptes-clés bancaires, assurance, télécoms et énergie. La fonction UX n\'existait pas comme département dédié.',
      nl: 'SPEOS, postdochter van de bpost-groep. Grootschalige documentaire productie voor key accounts in banking, verzekering, telecom en energie. De UX-functie bestond niet als toegewijde afdeling.',
      en: 'SPEOS, a postal subsidiary of the bpost group. Large-scale document production for key accounts in banking, insurance, telecoms and energy. The UX function did not exist as a dedicated department.'
    },
    'speos.brief.lead2': {
      fr: 'Le pattern UX en département dédié, déployé dans les grands comptes belges, SPEOS a souhaité l\'adopter. Catalyseur · mandate B2G PEPPOL au 1<sup>er</sup> janvier 2026 et pression des acteurs nés sur le numérique.',
      nl: 'Het patroon van een toegewijde UX-afdeling, uitgerold in de grote Belgische accounts, wou SPEOS overnemen. Aanleiding · B2G PEPPOL-mandaat van 1 januari 2026 en de druk van digital-first spelers.',
      en: 'The dedicated UX department pattern, deployed in large Belgian accounts, SPEOS chose to adopt. Catalyst · B2G PEPPOL mandate of 1 January 2026 and competitive pressure of digital-first players.'
    },
    'speos.brief.lead3': {
      fr: 'Deux initiatives en cours · Archetype (refonte E2M, Angular) et Communication Platform (issue de l\'appel d\'offres Ethias, React). Même back-end stream platform. La direction cherchait une vision produit unifiée · arrivée d\'un consultant UX inscrite au comité du 21 novembre 2024.',
      nl: 'Twee initiatieven liepen · Archetype (refactoring E2M, Angular) en Communication Platform (uit Ethias-tender, React). Zelfde stream platform back-end. De directie zocht een verenigde productvisie · de onboarding van een UX-consultant werd ingeschreven in de exec review van 21 november 2024.',
      en: 'Two initiatives were under way · Archetype (E2M refactor, Angular) and Communication Platform (out of the Ethias tender, React). Same stream platform back-end. The direction sought a unified product vision · UX consultant onboarding registered in the 21 November 2024 exec review.'
    },
    'speos.brief.sizing': {
      fr: 'Mission freelance <span class="dot">·</span> 12 mois <span class="dot">·</span> décembre 2024 → décembre 2025 <span class="dot">·</span> CX / UX / Service Design Consultant',
      nl: 'Freelance opdracht <span class="dot">·</span> 12 maanden <span class="dot">·</span> december 2024 → december 2025 <span class="dot">·</span> CX / UX / Service Design Consultant',
      en: 'Freelance mission <span class="dot">·</span> 12 months <span class="dot">·</span> December 2024 → December 2025 <span class="dot">·</span> CX / UX / Service Design Consultant'
    },
    'speos.brief.teaser': {
      fr: 'À la sortie · <strong class="accent">Concept Report <span data-countup="76">76</span> pages</strong> signé sponsor <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="6">6</span> clients pilotes</strong> valident la direction <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="5">5</span> Value Props MVP</strong> priorisées <span class="brief-teaser__sep">·</span> <strong class="accent">Value Proposition partagée</strong> Business + IT.',
      nl: 'Bij de uitgang · <strong class="accent">Concept Report <span data-countup="76">76</span> pagina\'s</strong> getekend door sponsor <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="6">6</span> pilootklanten</strong> valideren de richting <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="5">5</span> MVP Value Props</strong> geprioriteerd <span class="brief-teaser__sep">·</span> <strong class="accent">Gedeelde Value Proposition</strong> Business + IT.',
      en: 'At the exit · <strong class="accent"><span data-countup="76">76</span>-page Concept Report</strong> signed by sponsor <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="6">6</span> pilot clients</strong> validate the direction <span class="brief-teaser__sep">·</span> <strong class="accent"><span data-countup="5">5</span> MVP Value Props</strong> prioritised <span class="brief-teaser__sep">·</span> <strong class="accent">Shared Value Proposition</strong> Business + IT.'
    },
    'speos.brief.title': {
      fr: 'Postal industriel. <span class="accent">Une fonction UX à installer.</span>',
      nl: 'Industriële post. <span class="accent">Een UX-functie te installeren.</span>',
      en: 'Industrial postal. <span class="accent">A UX function to install.</span>'
    },
    /* CVE 2026-05-12 · TL;DR Hero · 4 questions du recruteur en 90 secondes (SPEOS) */
    'speos.tldr.eyebrow': { fr: 'En 90 secondes', nl: 'In 90 seconden', en: 'In 90 seconds' },
    'speos.tldr.l1': { fr: 'Le problème', nl: 'Het probleem', en: 'The problem' },
    'speos.tldr.l2': { fr: 'La tension', nl: 'De spanning', en: 'The tension' },
    'speos.tldr.l3': { fr: 'Ce que j\'ai fait', nl: 'Wat ik gedaan heb', en: 'What I did' },
    'speos.tldr.l4': { fr: 'Ce qui en est sorti', nl: 'Wat eruit kwam', en: 'What came out of it' },
    'speos.tldr.t1': {
      fr: 'Le courrier belge perd 8 % par an. SPEOS, filiale postale de bpost, devait basculer vers le digital sans casser sa rente print, et défendre son leadership face aux pure-players cloud-natives.',
      nl: 'De Belgische post verliest 8 % per jaar. SPEOS, postale dochter van bpost, moest overschakelen naar digitaal zonder zijn print-omzet te breken, en zijn leiderschap verdedigen tegen cloud-native pure-players.',
      en: 'Belgian mail loses 8% per year. SPEOS, postal subsidiary of bpost, had to shift to digital without breaking its print revenue, and defend its leadership against cloud-native pure-players.'
    },
    'speos.tldr.t2': {
      fr: 'Le Business défendait le revenu. L\'IT bâtissait l\'Agile en parallèle. La fonction UX n\'existait pas encore en département dédié. Trois mondes à faire entrer dans la même conversation.',
      nl: 'Business verdedigde de omzet. IT bouwde Agile in parallel. De UX-functie bestond nog niet als aparte afdeling. Drie werelden om in hetzelfde gesprek samen te brengen.',
      en: 'Business was defending revenue. IT was building Agile in parallel. The UX function did not yet exist as a dedicated department. Three worlds to bring into the same conversation.'
    },
    'speos.tldr.t3': {
      fr: '12 entretiens experts internes (CEO, CTO, R&D, Operations). 6 clients pilotes interviewés, dont Luminus sur la facture énergie. Customer Journey workshop physique, persona Johnny au mur.',
      nl: '12 interne expert-interviews (CEO, CTO, R&D, Operations). 6 pilootklanten geïnterviewd, waaronder Luminus voor de energiefactuur. Customer Journey workshop fysiek, persona Johnny aan de muur.',
      en: '12 internal expert interviews (CEO, CTO, R&D, Operations). 6 pilot customers interviewed, including Luminus on energy billing. Physical Customer Journey workshop, persona Johnny on the wall.'
    },
    'speos.tldr.t4': {
      fr: 'Concept Report 76 pages signé sponsor. 6 sur 6 clients valident. Trois segments marché (Large Accounts, Easy2Mail PME, API Integrators) priorisés en sprints SAFe. Équipe design intégrée à l\'organigramme.',
      nl: 'Concept Report 76 pagina\'s ondertekend door sponsor. 6 op 6 klanten valideren. Drie marktsegmenten (Large Accounts, Easy2Mail KMO, API Integrators) geprioriteerd in SAFe sprints. Designteam geïntegreerd in het organigram.',
      en: '76-page Concept Report signed by sponsor. 6 out of 6 customers validate. Three market segments (Large Accounts, Easy2Mail SMEs, API Integrators) prioritised in SAFe sprints. Design team integrated into the org chart.'
    },
    'speos.chapConcept.consequences': {
      fr: '<span>76 pages structurées</span>\n      <span class="chap-final__bullet">·</span>\n      <span>12 entretiens experts internes</span>\n      <span class="chap-final__bullet">·</span>\n      <span>3 segments × 6 clients pilotes</span>\n      <span class="chap-final__bullet">·</span>\n      <span>6 sur 6 valident la direction</span>',
      nl: '<span>76 gestructureerde pagina\'s</span>\n      <span class="chap-final__bullet">·</span>\n      <span>12 interne expertinterviews</span>\n      <span class="chap-final__bullet">·</span>\n      <span>3 segmenten × 6 pilootklanten</span>\n      <span class="chap-final__bullet">·</span>\n      <span>6 op 6 valideren de richting</span>',
      en: '<span>76 structured pages</span>\n      <span class="chap-final__bullet">·</span>\n      <span>12 internal expert interviews</span>\n      <span class="chap-final__bullet">·</span>\n      <span>3 segments × 6 pilot clients</span>\n      <span class="chap-final__bullet">·</span>\n      <span>6 out of 6 validate the direction</span>'
    },
    'speos.chapConcept.eyebrow': { fr: 'Le moment de bascule sponsor', nl: 'Het kantelmoment voor de sponsor', en: 'The sponsor tipping moment' },
    'speos.chapConcept.phrase': {
      fr: '<span class="chap-final__reject"><span class="chap-final__strike">Plus</span> à imaginer.</span>\n      <span class="chap-final__affirm">Le sponsor voit <em>où il investit</em>, et six clients lui disent <em>oui</em>.</span>',
      nl: '<span class="chap-final__reject"><span class="chap-final__strike">Niets meer</span> te verbeelden.</span>\n      <span class="chap-final__affirm">De sponsor ziet <em>waarin hij investeert</em>, en zes klanten zeggen hem <em>ja</em>.</span>',
      en: '<span class="chap-final__reject"><span class="chap-final__strike">Nothing</span> left to imagine.</span>\n      <span class="chap-final__affirm">The sponsor sees <em>where he invests</em>, and six clients tell him <em>yes</em>.</span>'
    },
    'speos.chapValueProp.consequences': {
      fr: '<span>Project Owners <span class="chap-vp-statement__arrow">→</span> portail self-service par persona</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>Project Managers <span class="chap-vp-statement__arrow">→</span> architecture API modulaire</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>Customers <span class="chap-vp-statement__arrow">→</span> onboarding rapide et autonomie</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>SPEOS <span class="chap-vp-statement__arrow">→</span> leadership défendu, nouveau segment capté</span>',
      nl: '<span>Project Owners <span class="chap-vp-statement__arrow">→</span> self-service portaal per persona</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>Project Managers <span class="chap-vp-statement__arrow">→</span> modulaire API-architectuur</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>Customers <span class="chap-vp-statement__arrow">→</span> snelle onboarding en autonomie</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>SPEOS <span class="chap-vp-statement__arrow">→</span> leiderschap verdedigd, nieuw segment veroverd</span>',
      en: '<span>Project Owners <span class="chap-vp-statement__arrow">→</span> self-service portal per persona</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>Project Managers <span class="chap-vp-statement__arrow">→</span> modular API architecture</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>Customers <span class="chap-vp-statement__arrow">→</span> fast onboarding and autonomy</span>\n      <span class="chap-vp-statement__bullet">·</span>\n      <span>SPEOS <span class="chap-vp-statement__arrow">→</span> leadership defended, new segment captured</span>'
    },
    'speos.chapValueProp.eyebrow': { fr: 'Diamant 1 · cristallisation', nl: 'Diamant 1 · kristallisatie', en: 'Diamond 1 · crystallisation' },
    'speos.chapValueProp.phrase': {
      fr: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Pas</span> une plateforme par segment qui multiplie les portes d\'entrée.</span>\n      <span class="chap-vp-statement__affirm">Un host <em>one-stop</em>, avec un <em>onboarding piloté par persona</em>, des <em>capacités API-isées</em>, du <em>print et digital sans couture</em>, prêt pour les exigences <em>compliance</em> de demain.</span>',
      nl: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Geen</span> platform per segment dat de toegangspoorten vermenigvuldigt.</span>\n      <span class="chap-vp-statement__affirm">Eén <em>one-stop</em> host, met <em>onboarding gestuurd per persona</em>, <em>API-iseerbare capaciteiten</em>, <em>print en digital zonder naad</em>, klaar voor de <em>compliance</em>-eisen van morgen.</span>',
      en: '<span class="chap-vp-statement__reject"><span class="chap-vp-statement__strike">Not</span> a platform per segment that multiplies entry doors.</span>\n      <span class="chap-vp-statement__affirm">One <em>one-stop</em> host, with <em>persona-driven onboarding</em>, <em>API-ised capabilities</em>, <em>print and digital without seams</em>, ready for tomorrow\'s <em>compliance</em> demands.</span>'
    },
    'speos.cjm.pp1': { fr: 'Competitive Pressure', nl: 'Competitive Pressure', en: 'Competitive Pressure' },
    'speos.cjm.pp10': { fr: 'Expansion Challenges', nl: 'Expansion Challenges', en: 'Expansion Challenges' },
    'speos.cjm.pp10Hint': { fr: 'Difficile d\'aller au-delà du grand-compte historique.', nl: 'Moeilijk om verder te gaan dan de historische grote rekening.', en: 'Hard to move beyond the historical key account.' },
    'speos.cjm.pp1Hint': { fr: 'Le marché bouge plus vite que l\'offre.', nl: 'De markt beweegt sneller dan het aanbod.', en: 'The market moves faster than the offer.' },
    'speos.cjm.pp2': { fr: 'Time-to-Market Delays', nl: 'Time-to-Market Delays', en: 'Time-to-Market Delays' },
    'speos.cjm.pp2Hint': { fr: 'Onboarding qui prend plusieurs mois.', nl: 'Onboarding die meerdere maanden duurt.', en: 'Onboarding takes several months.' },
    'speos.cjm.pp3': { fr: 'Tool Complexity & Fragmentation', nl: 'Tool Complexity & Fragmentation', en: 'Tool Complexity & Fragmentation' },
    'speos.cjm.pp3Hint': { fr: 'Plateformes par segment, ne se parlent pas.', nl: 'Platformen per segment, ze praten niet met elkaar.', en: 'Platforms per segment, they do not talk to each other.' },
    'speos.cjm.pp4': { fr: 'Lack of Automation & Standardization', nl: 'Lack of Automation & Standardization', en: 'Lack of Automation & Standardization' },
    'speos.cjm.pp4Hint': { fr: 'Workflows manuels, erreurs en chaîne.', nl: 'Manuele workflows, fouten in keten.', en: 'Manual workflows, chained errors.' },
    'speos.cjm.pp5': { fr: 'Gaps in Digital Solutions', nl: 'Gaps in Digital Solutions', en: 'Gaps in Digital Solutions' },
    'speos.cjm.pp5Hint': { fr: 'APIs absentes ou outdated.', nl: 'API\'s afwezig of verouderd.', en: 'APIs missing or outdated.' },
    'speos.cjm.pp6': { fr: 'Customer Autonomy Challenges', nl: 'Customer Autonomy Challenges', en: 'Customer Autonomy Challenges' },
    'speos.cjm.pp6Hint': { fr: 'Pas de self-service, dépendance aux équipes.', nl: 'Geen self-service, afhankelijk van de teams.', en: 'No self-service, dependence on the teams.' },
    'speos.cjm.pp7': { fr: 'Lack of Proactivity', nl: 'Lack of Proactivity', en: 'Lack of Proactivity' },
    'speos.cjm.pp7Hint': { fr: 'Le client appelle, pas l\'inverse.', nl: 'De klant belt, niet omgekeerd.', en: 'The customer calls, not the other way round.' },
    'speos.cjm.pp8': { fr: 'Service Rigidity', nl: 'Service Rigidity', en: 'Service Rigidity' },
    'speos.cjm.pp8Hint': { fr: 'Customisations difficiles à faire évoluer.', nl: 'Customisaties moeilijk te laten evolueren.', en: 'Customisations hard to evolve.' },
    'speos.cjm.pp9': { fr: 'Billing Complexity', nl: 'Billing Complexity', en: 'Billing Complexity' },
    'speos.cjm.pp9Hint': { fr: 'Modèles tarifaires opaques pour le client.', nl: 'Tariefmodellen ondoorzichtig voor de klant.', en: 'Pricing models opaque to the customer.' },
    'speos.cjm.s1Desc': {
      fr: 'Le prospect identifie un besoin d\'envoi à volume. Première recherche, comparaison concurrentielle.',
      nl: 'De prospect ziet een nood aan volumeverzending. Eerste zoektocht, concurrentievergelijking.',
      en: 'The prospect identifies a volume sending need. First search, competitive comparison.'
    },
    'speos.cjm.s1Name': { fr: 'Découverte', nl: 'Ontdekking', en: 'Discovery' },
    'speos.cjm.s2Desc': {
      fr: 'Premier échange commercial. Cadrage du projet, devis, signature.',
      nl: 'Eerste commercieel gesprek. Projectkadering, offerte, ondertekening.',
      en: 'First commercial exchange. Project scoping, quote, signature.'
    },
    'speos.cjm.s2Name': { fr: 'Contact & brief', nl: 'Contact & briefing', en: 'Contact & brief' },
    'speos.cjm.s3Desc': {
      fr: 'Intégration technique. Setup compte. Premier import de fichiers, validation.',
      nl: 'Technische integratie. Account setup. Eerste bestandsimport, validatie.',
      en: 'Technical integration. Account setup. First file import, validation.'
    },
    'speos.cjm.s3Name': { fr: 'Onboarding', nl: 'Onboarding', en: 'Onboarding' },
    'speos.cjm.s4Desc': {
      fr: 'Configuration campagne. Lancement. Impression, mise sous pli, livraison.',
      nl: 'Campagneconfiguratie. Lancering. Print, vouwen, levering.',
      en: 'Campaign configuration. Launch. Print, enveloping, delivery.'
    },
    'speos.cjm.s4Name': { fr: 'Production', nl: 'Productie', en: 'Production' },
    'speos.cjm.s5Desc': {
      fr: 'Tracking livraisons. Support. Facturation. Montée en volume, ouverture de nouveaux canaux.',
      nl: 'Levertracking. Support. Facturatie. Volumegroei, opening van nieuwe kanalen.',
      en: 'Delivery tracking. Support. Billing. Volume growth, opening new channels.'
    },
    'speos.cjm.s5Name': { fr: 'Suivi & expansion', nl: 'Opvolging & expansie', en: 'Tracking & expansion' },
    'speos.concept.delivEyebrow': { fr: 'Le livrable post-DD', nl: 'Het post-DD livrable', en: 'The post-DD deliverable' },
    'speos.concept.delivSourceLab': { fr: 'Ouvrir le document complet', nl: 'Open het volledige document', en: 'Open the full document' },
    'speos.concept.delivSourceRef': {
      fr: 'Speos Concept Report 2024 · PDF complet 76 pages',
      nl: 'Speos Concept Report 2024 · volledige PDF 76 pagina\'s',
      en: 'Speos Concept Report 2024 · full PDF 76 pages'
    },
    'speos.concept.toc10Title': { fr: 'Prototype', nl: 'Prototype', en: 'Prototype' },
    'speos.concept.toc11Title': { fr: 'Next Step', nl: 'Next Step', en: 'Next Step' },
    'speos.concept.toc1Title': { fr: 'Introduction', nl: 'Inleiding', en: 'Introduction' },
    'speos.concept.toc2Title': { fr: 'Stakeholder Map', nl: 'Stakeholder Map', en: 'Stakeholder Map' },
    'speos.concept.toc3Title': { fr: 'Segmentation & Personas', nl: 'Segmentatie & Personas', en: 'Segmentation & Personas' },
    'speos.concept.toc4Title': { fr: 'Journey AS IS vs TO BE', nl: 'Journey AS IS vs TO BE', en: 'Journey AS IS vs TO BE' },
    'speos.concept.toc5Title': { fr: 'GAP Features · Goals · Questions', nl: 'GAP Features · Goals · Questions', en: 'GAP Features · Goals · Questions' },
    'speos.concept.toc6Title': { fr: 'Value Proposition', nl: 'Value Proposition', en: 'Value Proposition' },
    'speos.concept.toc7Title': { fr: 'User Stories', nl: 'User Stories', en: 'User Stories' },
    'speos.concept.toc8Title': { fr: 'Concept', nl: 'Concept', en: 'Concept' },
    'speos.concept.toc9Title': { fr: 'ULab Insights', nl: 'ULab Insights', en: 'ULab Insights' },
    'speos.fin.contact.sub': {
      fr: 'Service designer · Bruxelles · 20+ ans cross-secteurs. Toute personne avec qui j\'ai travaillé sur SPEOS peut témoigner.',
      nl: 'Service designer · Brussel · 20+ jaar cross-sector. Iedereen waarmee ik op SPEOS heb gewerkt, kan getuigen.',
      en: 'Service designer · Brussels · 20+ years cross-sector. Anyone I worked with on SPEOS can vouch for the work.'
    },
    'speos.fin.ps.label': { fr: 'Postscript · références', nl: 'Postscript · referenties', en: 'Postscript · references' },
    'speos.fin.ps.text': {
      fr: 'Toute personne avec qui j\'ai travaillé sur SPEOS, du CEO au tech lead, peut témoigner. <span class="accent">C\'est ça, la matière du Service Design : des gens qui te rappellent.</span>',
      nl: 'Iedereen waarmee ik op SPEOS heb gewerkt, van CEO tot tech lead, kan getuigen. <span class="accent">Dat is de stof van Service Design: mensen die je terugbellen.</span>',
      en: 'Anyone I worked with on SPEOS, from CEO to tech lead, can vouch for it. <span class="accent">That is the matter of Service Design: people who call you back.</span>'
    },
    'speos.hero.eyebrow': { fr: 'Étude de cas Service Design · case 02', nl: 'Service Design case study · case 02', en: 'Service Design case study · case 02' },
    /* CVE 2026-05-04 · copy original conservé · le wrap est géré par font-size
       réduite (clamp 128px max) pour passer de 4 lignes → 3 lignes. */
    'speos.hero.h1.alt': { fr: 'dans une filiale postale du groupe bpost.', nl: 'in een postdochter van de bpost-groep.', en: 'in a postal subsidiary of the bpost group.' },
    'speos.hero.h1.start': { fr: 'Installer la fonction UX', nl: 'De UX-functie installeren', en: 'Installing the UX function' },
    'speos.hero.lead': {
      fr: 'Mission freelance de douze mois. Production documentaire à grande échelle, comptes-clés bancaires, assurance, télécoms, énergie. Mandat · poser la méthode Service Design, aligner Business et IT, livrer un Concept Report défendable devant le sponsor et un MVP priorisé.',
      nl: 'Freelance opdracht van twaalf maanden. Grootschalige documentaire productie, key accounts in banking, verzekering, telecom, energie. Opdracht · de Service Design-methode neerleggen, Business en IT afstemmen, een sponsor-ready Concept Report en een geprioriteerd MVP opleveren.',
      en: 'Freelance mission of twelve months. Large-scale document production, key accounts in banking, insurance, telecoms, energy. Mandate · lay down the Service Design method, align Business and IT, deliver a sponsor-ready Concept Report and a prioritised MVP.'
    },
    'speos.hero.location': { fr: 'Bruxelles · Hybrid', nl: 'Brussel · Hybrid', en: 'Brussels · Hybrid' },
    'speos.hero.metaRole': { fr: 'CX / UX / Service Design Consultant · Freelance', nl: 'CX / UX / Service Design Consultant · Freelance', en: 'CX / UX / Service Design Consultant · Freelance' },
    'speos.hero.metaWhere': { fr: 'Décembre 2024 · décembre 2025 · 12 mois', nl: 'December 2024 · december 2025 · 12 maanden', en: 'December 2024 · December 2025 · 12 months' },
    'speos.lessons.l1.p': {
      fr: 'Strategyzer, Customer Journey, Service Blueprint, Design Sprint sont des outils du même Design System. La maîtrise, ce n\'est pas d\'en choisir un. C\'est de savoir lequel, à quel moment, avec qui dans la salle. Sur SPEOS, Customer Journey AS-IS et Pain Points avaient le bon ratio narratif et précision pour aligner Business et IT.',
      nl: 'Strategyzer, Customer Journey, Service Blueprint, Design Sprint zijn tools van hetzelfde Design System. Meesterschap is niet er één kiezen. Het is weten welke, op welk moment, met wie in de zaal. Op SPEOS hadden de AS-IS Customer Journey en de Pain Points de juiste verhouding tussen verhaal en precisie om Business en IT te aligneren.',
      en: 'Strategyzer, Customer Journey, Service Blueprint, Design Sprint are tools from the same Design System. Mastery is not picking one. It is knowing which, when, with whom in the room. On SPEOS, the AS-IS Customer Journey and Pain Points had the right ratio of narrative and precision to align Business and IT.'
    },
    'speos.lessons.l2.p': {
      fr: 'Le sponsor m\'a recruté côté Business pour défendre une nouvelle ligne de revenu. Mais la Value Proposition ne tenait que si l\'IT y voyait une stack maintenable. Rentrer par le récit Business, valider chaque arbitrage avec le tech lead avant les ateliers : c\'est le pattern qui a évité le « très joli, pas implementable ».',
      nl: 'De sponsor rekruteerde mij langs Business-zijde om een nieuwe omzetlijn te verdedigen. Maar de Value Proposition hield alleen stand als IT er een onderhoudbare stack in zag. Binnenkomen via het Business-verhaal, elke afweging valideren met de tech lead voor de workshops: dat is het patroon dat « heel mooi, niet implementeerbaar » heeft vermeden.',
      en: 'The sponsor hired me on the Business side to defend a new revenue line. But the Value Proposition only held if IT saw a maintainable stack in it. Come in through the Business story, validate every trade-off with the tech lead before the workshops: that is the pattern that avoided the \'very nice, not implementable\'.'
    },
    'speos.lessons.l3.p': {
      fr: 'À chaque tension, le passage de l\'argument à l\'artefact débloquait la conversation : le journey map sur le mur, le wireframe en main, le pain point cité d\'un client par son nom. Le sponsor n\'achète pas une méthode. Il achète un signal de validation. Le toolkit existe pour produire l\'artefact qui rend l\'invisible visible.',
      nl: 'Bij elke spanning ontblokkeerde de overgang van argument naar artefact het gesprek: de journey map op de muur, de wireframe in de hand, de pain point geciteerd op naam van een klant. De sponsor koopt geen methode. Hij koopt een validatiesignaal. De toolkit bestaat om het artefact te produceren dat het onzichtbare zichtbaar maakt.',
      en: 'At every tension, moving from argument to artefact unblocked the conversation: the journey map on the wall, the wireframe in hand, the pain point quoted in a customer\'s own words. The sponsor does not buy a method. He buys a validation signal. The toolkit exists to produce the artefact that makes the invisible visible.'
    },
    'speos.lessons.lead': {
      fr: 'Six mois après livraison, trois choix tiennent. <strong>Rien à rejouer autrement.</strong> Le design a trouvé sa place dans le workflow et dans l\'organigramme.',
      nl: 'Zes maanden na de oplevering houden drie keuzes stand. <strong>Niets anders te spelen.</strong> Design heeft zijn plaats gevonden in de workflow en in het organigram.',
      en: 'Six months after delivery, three choices still hold. <strong>Nothing to replay differently.</strong> Design found its place in the workflow and in the org chart.'
    },
    'speos.outcome.d1.h': { fr: 'Plus besoin de la rente seule.', nl: 'De rente alleen volstaat niet meer.', en: 'No longer dependent on the rent alone.' },
    'speos.outcome.d1.p': {
      fr: 'Le multicanal print et digital sans couture libère SPEOS de la dépendance au volume papier. Le pricing par canal et par typologie devient maîtrisable, là où la baisse structurelle de 8 pour cent par an du courrier belge l\'aurait rendu insoutenable.',
      nl: 'Het multichannel print en digital zonder naad bevrijdt SPEOS van de afhankelijkheid van papiervolume. De prijszetting per kanaal en typologie wordt beheersbaar, daar waar de structurele daling van 8 procent per jaar in de Belgische post ze onhoudbaar zou maken.',
      en: 'The seamless print and digital multichannel frees SPEOS from paper-volume dependence. Pricing per channel and per typology becomes manageable, where the structural 8 percent yearly drop in Belgian mail would have made it untenable.'
    },
    'speos.outcome.d2.h': { fr: 'Nouveau segment marché capté.', nl: 'Nieuw marktsegment veroverd.', en: 'New market segment captured.' },
    'speos.outcome.d2.p': {
      fr: 'Le tier easy2mail (PME, pay-as-you-grow) et le marketplace API (Integrators) ouvrent deux segments laissés aux concurrents agiles. Le mandate PEPPOL au 1er janvier 2026 catalyse la demande sur le mid-market belge.',
      nl: 'De easy2mail tier (KMO, pay-as-you-grow) en de marketplace API (Integrators) openen twee segmenten die aan wendbare concurrenten waren overgelaten. Het PEPPOL-mandaat op 1 januari 2026 katalyseert de vraag op de Belgische mid-market.',
      en: 'The easy2mail tier (SMEs, pay-as-you-grow) and the marketplace API (Integrators) open two segments left to agile competitors. The PEPPOL mandate on 1 January 2026 catalyses demand on the Belgian mid-market.'
    },
    'speos.outcome.d3.h': { fr: 'Leadership marché défendu.', nl: 'Marktleiderschap verdedigd.', en: 'Market leadership defended.' },
    'speos.outcome.d3.p': {
      fr: 'Face aux acteurs nés sur le numérique qui visent les PME et aux acteurs internationaux qui visent le SaaS line-of-business, SPEOS reste pionnier compliance B2G et monte en charge par effet de levier API. Position consolidée, pas érodée.',
      nl: 'Tegenover digital-first spelers die op KMO mikken en internationale spelers die op SaaS line-of-business mikken, blijft SPEOS pionier in B2G-compliance en schaalt via API-hefboom. Positie geconsolideerd, niet uitgehold.',
      en: 'Against digital-first players targeting SMEs and international players targeting line-of-business SaaS, SPEOS remains a B2G compliance pioneer and scales through API leverage. Position consolidated, not eroded.'
    },
    'speos.outcome.integrity': {
      fr: '<strong>Note d\'intégrité.</strong> Concept Report remis et validé. Rollout passé en sprints Agile côté SPEOS. Ce que j\'affirme s\'arrête à la sortie : livrable 76 pages, six clients alignés, triangle Customer · Business · Tech au vert.',
      nl: '<strong>Integriteitsnota.</strong> Concept Report opgeleverd en gevalideerd. Rollout overgegaan in Agile sprints aan SPEOS-zijde. Wat ik beweer stopt aan de uitgang: livrable 76 pagina\'s, zes klanten op één lijn, driehoek Customer · Business · Tech in het groen.',
      en: '<strong>Integrity note.</strong> Concept Report delivered and validated. Rollout moved into Agile sprints on the SPEOS side. What I claim stops at the exit: 76-page deliverable, six aligned clients, Customer · Business · Tech triangle in the green.'
    },
    'speos.outcome.lead': {
      fr: 'Concept Report signé sponsor. Six clients pilotes valident. Roadmap Value Props priorisée, prête en sprints SAFe. Décision de production écrite.',
      nl: 'Concept Report getekend door sponsor. Zes pilootklanten valideren. Geprioriteerde Value Props roadmap, klaar in SAFe-sprints. Schriftelijke productiebeslissing.',
      en: 'Concept Report signed by sponsor. Six pilot clients validate. Prioritised Value Props roadmap, ready in SAFe sprints. Written production decision.'
    },
    'speos.pp.p1.constraint': {
      fr: 'Devenue règle de design : automatiser l\'onboarding. Self-service guidé par objectif et besoins.',
      nl: 'Werd designregel: onboarding automatiseren. Self-service gestuurd door doel en noden.',
      en: 'Became a design rule: automate onboarding. Self-service guided by goal and needs.'
    },
    'speos.pp.p1.eyebrow': { fr: 'Pain Point 01', nl: 'Pain Point 01', en: 'Pain Point 01' },
    'speos.pp.p1.h': { fr: '« L\'onboarding nous prend des mois. »', nl: '« Onze onboarding duurt maanden. »', en: '"Onboarding takes us months."' },
    'speos.pp.p1.theme': { fr: 'Time-to-Market', nl: 'Time-to-Market', en: 'Time-to-Market' },
    'speos.pp.p10.constraint': {
      fr: 'Devenue argument MVP : capter les PME via Easy2Mail et le canal Integrators via API. Plus besoin de la poste comme béquille.',
      nl: 'Werd MVP-argument: KMO veroveren via Easy2Mail en het Integrators-kanaal via API. Geen post meer nodig als kruk.',
      en: 'Became an MVP argument: capture SMEs through Easy2Mail and the Integrators channel through APIs. No more relying on mail as a crutch.'
    },
    'speos.pp.p10.eyebrow': { fr: 'Pain Point 10', nl: 'Pain Point 10', en: 'Pain Point 10' },
    'speos.pp.p10.h': { fr: '« On reste collé à nos comptes historiques. »', nl: '« We blijven kleven aan onze historische rekeningen. »', en: '"We stay glued to our historical accounts."' },
    'speos.pp.p10.theme': { fr: 'Expansion', nl: 'Expansion', en: 'Expansion' },
    'speos.pp.p2.constraint': {
      fr: 'Devenue règle : standardiser la base, customiser le dernier kilomètre par persona.',
      nl: 'Werd regel: de basis standaardiseren, de laatste kilometer customiseren per persona.',
      en: 'Became a rule: standardise the base, customise the last mile per persona.'
    },
    'speos.pp.p2.eyebrow': { fr: 'Pain Point 02', nl: 'Pain Point 02', en: 'Pain Point 02' },
    'speos.pp.p2.h': { fr: '« Tout passe par des workflows manuels. »', nl: '« Alles loopt via manuele workflows. »', en: '"Everything goes through manual workflows."' },
    'speos.pp.p2.theme': { fr: 'Automation', nl: 'Automation', en: 'Automation' },
    'speos.pp.p3.constraint': {
      fr: 'Devenue règle : portail client one-stop avec suivi temps réel + actions self-service par persona.',
      nl: 'Werd regel: one-stop klantportaal met real-time opvolging + self-service acties per persona.',
      en: 'Became a rule: one-stop client portal with real-time tracking + self-service actions per persona.'
    },
    'speos.pp.p3.eyebrow': { fr: 'Pain Point 03', nl: 'Pain Point 03', en: 'Pain Point 03' },
    'speos.pp.p3.h': { fr: '« Le client doit nous appeler pour la moindre modif. »', nl: '« De klant moet ons bellen voor de minste wijziging. »', en: '"The client has to call us for the smallest change."' },
    'speos.pp.p3.theme': { fr: 'Autonomy', nl: 'Autonomy', en: 'Autonomy' },
    'speos.pp.p4.constraint': {
      fr: 'Devenue règle : plateforme host commune, customisations par typologie au-dessus.',
      nl: 'Werd regel: gemeenschappelijk hostplatform, customisaties per typologie erbovenop.',
      en: 'Became a rule: common host platform, customisations per typology on top.'
    },
    'speos.pp.p4.eyebrow': { fr: 'Pain Point 04', nl: 'Pain Point 04', en: 'Pain Point 04' },
    'speos.pp.p4.h': { fr: '« Nos outils ne se parlent pas. »', nl: '« Onze tools praten niet met elkaar. »', en: '"Our tools do not talk to each other."' },
    'speos.pp.p4.theme': { fr: 'Fragmentation', nl: 'Fragmentation', en: 'Fragmentation' },
    'speos.pp.p5.constraint': {
      fr: 'Devenue règle : monitoring proactif, alertes côté client + côté SPEOS, communication push avant que le client ne demande.',
      nl: 'Werd regel: proactieve monitoring, alerts aan klantzijde + aan SPEOS-zijde, push-communicatie voor de klant het vraagt.',
      en: 'Became a rule: proactive monitoring, alerts on client and SPEOS side, push communication before the client asks.'
    },
    'speos.pp.p5.eyebrow': { fr: 'Pain Point 05', nl: 'Pain Point 05', en: 'Pain Point 05' },
    'speos.pp.p5.h': { fr: '« On apprend les problèmes par le client. »', nl: '« We horen problemen van de klant. »', en: '"We learn about problems from the client."' },
    'speos.pp.p5.theme': { fr: 'Proactivity', nl: 'Proactivity', en: 'Proactivity' },
    'speos.pp.p6.constraint': {
      fr: 'Devenue règle : combler les gaps via le portail one-stop + ouverture API pour les Integrators.',
      nl: 'Werd regel: de gaps dichten via het one-stop portaal + API-opening voor de Integrators.',
      en: 'Became a rule: close the gaps through the one-stop portal + API opening for the Integrators.'
    },
    'speos.pp.p6.eyebrow': { fr: 'Pain Point 06', nl: 'Pain Point 06', en: 'Pain Point 06' },
    'speos.pp.p6.h': { fr: '« Notre offre digitale n\'égale pas la concurrence. »', nl: '« Ons digitaal aanbod evenaart de concurrentie niet. »', en: '"Our digital offer does not match the competition."' },
    'speos.pp.p6.theme': { fr: 'Digital gaps', nl: 'Digital gaps', en: 'Digital gaps' },
    'speos.pp.p7.constraint': {
      fr: 'Devenue règle : modulariser l\'offre. Chaque feature configurable indépendamment, sans rebuilds.',
      nl: 'Werd regel: het aanbod modulariseren. Elke feature onafhankelijk configureerbaar, zonder rebuilds.',
      en: 'Became a rule: modularise the offer. Every feature configurable independently, without rebuilds.'
    },
    'speos.pp.p7.eyebrow': { fr: 'Pain Point 07', nl: 'Pain Point 07', en: 'Pain Point 07' },
    'speos.pp.p7.h': { fr: '« Une fois en prod, plus personne ne touche. »', nl: '« Eens in prod raakt niemand het nog aan. »', en: '"Once in production, no one touches it any more."' },
    'speos.pp.p7.theme': { fr: 'Rigidity', nl: 'Rigidity', en: 'Rigidity' },
    'speos.pp.p8.constraint': {
      fr: 'Devenue argument central : la VP doit défendre le leadership ET ouvrir un nouveau segment marché.',
      nl: 'Werd centraal argument: de VP moet het leiderschap verdedigen ÉN een nieuw marktsegment openen.',
      en: 'Became a central argument: the VP must defend leadership AND open a new market segment.'
    },
    'speos.pp.p8.eyebrow': { fr: 'Pain Point 08', nl: 'Pain Point 08', en: 'Pain Point 08' },
    'speos.pp.p8.h': { fr: '« Le marché bouge plus vite que notre offre. »', nl: '« De markt beweegt sneller dan ons aanbod. »', en: '"The market moves faster than our offer."' },
    'speos.pp.p8.theme': { fr: 'Competition', nl: 'Competition', en: 'Competition' },
    'speos.pp.p9.constraint': {
      fr: 'Devenue règle : facturation lisible côté portail, breakdown par poste + dashboard suivi consommation.',
      nl: 'Werd regel: leesbare facturatie via het portaal, breakdown per post + verbruiksdashboard.',
      en: 'Became a rule: readable billing in the portal, breakdown by line item + consumption dashboard.'
    },
    'speos.pp.p9.eyebrow': { fr: 'Pain Point 09', nl: 'Pain Point 09', en: 'Pain Point 09' },
    'speos.pp.p9.h': { fr: '« La facturation est opaque pour nos clients. »', nl: '« De facturatie is ondoorzichtig voor onze klanten. »', en: '"Billing is opaque for our clients."' },
    'speos.pp.p9.theme': { fr: 'Billing', nl: 'Billing', en: 'Billing' },
    'speos.proposed.analyseLi1': { fr: 'Cartographie friction Project Owners ↔ Project Managers', nl: 'Frictiekaart Project Owners ↔ Project Managers', en: 'Friction map Project Owners ↔ Project Managers' },
    'speos.proposed.analyseLi2': { fr: 'AS-IS journey · processus séparés et bordéliques', nl: 'AS-IS journey · gescheiden, rommelige processen', en: 'AS-IS journey · separate, messy processes' },
    'speos.proposed.analyseLi3': { fr: 'Could-Be journey · plateforme unifiée', nl: 'Could-Be journey · verenigd platform', en: 'Could-Be journey · unified platform' },
    'speos.proposed.analyseLi4': { fr: 'Ateliers de co-création · alignement Business + IT', nl: 'Co-creatie workshops · alignement Business + IT', en: 'Co-creation workshops · alignment Business + IT' },
    'speos.proposed.cap': {
      fr: 'À la sortie : un MVP one-stop platform priorisé en user stories, signé Project Owners (Business) · Project Managers (IT) · Operations · Sales. Six clients de typologies différentes ont validé le concept. Sponsor go prod. Ce qui suit montre ce qui s\'est joué à chaque étape.',
      nl: 'Aan het einde: een one-stop platform MVP geprioriteerd in user stories, getekend door Project Owners (Business) · Project Managers (IT) · Operations · Sales. Zes klanten van verschillende typologieën valideerden het concept, sponsor go prod. Wat volgt toont wat zich op elke stap heeft afgespeeld.',
      en: 'At the exit: a one-stop platform MVP prioritised in user stories, signed by Project Owners (Business) · Project Managers (IT) · Operations · Sales. Six clients across typologies validated the concept, sponsor go for production. What follows shows what played out at each step.'
    },
    'speos.proposed.conceptLi1': { fr: 'Concept report · features + wireframes', nl: 'Concept report · features + wireframes', en: 'Concept report · features + wireframes' },
    'speos.proposed.conceptLi2': { fr: 'User stories prioritisées · MVP scope', nl: 'Geprioriteerde user stories · MVP scope', en: 'Prioritised user stories · MVP scope' },
    'speos.proposed.conceptLi3': { fr: 'UX/UI directions par persona', nl: 'UX/UI richtingen per persona', en: 'UX/UI directions per persona' },
    'speos.proposed.conceptLi4': { fr: 'Decision pack · sponsor + comité de pilotage', nl: 'Decision pack · sponsor + stuurcomité', en: 'Decision pack · sponsor + steering committee' },
    'speos.proposed.crLab': { fr: 'Concept Report · livrable', nl: 'Concept Report · livrable', en: 'Concept Report · deliverable' },
    'speos.proposed.eyebrow': { fr: 'La roadmap proposée', nl: 'De voorgestelde roadmap', en: 'The proposed roadmap' },
    'speos.proposed.lead': {
      fr: 'De la friction Business ↔ IT à un MVP que tout le monde signe. Quatre actes méthodologiques, ateliers de co-création comme colonne vertébrale, customer focus comme boussole partagée.',
      nl: 'Van de wrijving Business ↔ IT naar een MVP die iedereen tekent. Vier methodologische actes, co-creatie workshops als ruggengraat, customer focus als gedeeld kompas.',
      en: 'From Business ↔ IT friction to an MVP everyone signs. Four methodological acts, co-creation workshops as the spine, customer focus as the shared compass.'
    },
    'speos.proposed.prototypeLi1': { fr: 'Host commun · couche unifiée', nl: 'Gemeenschappelijke host · verenigde laag', en: 'Common host · unified layer' },
    'speos.proposed.prototypeLi2': { fr: 'Spécificités par typologie de marché', nl: 'Specifieke noden per markttypologie', en: 'Specifics per market typology' },
    'speos.proposed.prototypeLi3': { fr: 'Customisations par persona', nl: 'Customisaties per persona', en: 'Customisations per persona' },
    'speos.proposed.prototypeLi4': { fr: 'User tests · 3 segments validés', nl: 'User tests · 3 segmenten gevalideerd', en: 'User tests · 3 segments validated' },
    'speos.proposed.researchLi1': { fr: 'Interviews internes · CEO, CTO, experts 20+ ans', nl: 'Interne interviews · CEO, CTO, experts 20+ jaar', en: 'Internal interviews · CEO, CTO, experts 20+ years' },
    'speos.proposed.researchLi2': { fr: 'Interviews externes · grands comptes + petits comptes', nl: 'Externe interviews · key accounts + kleine accounts', en: 'External interviews · key accounts + small accounts' },
    'speos.proposed.researchLi3': { fr: 'Segmentation marché · 3 segments clients', nl: 'Marktsegmentatie · 3 klantsegmenten', en: 'Market segmentation · 3 client segments' },
    'speos.proposed.researchLi4': { fr: 'Personas aux manettes · par typologie', nl: 'Personas aan de stuurknuppels · per typologie', en: 'Personas at the controls · per typology' },
    'speos.proposed.storyEyebrow': { fr: 'Le fil conducteur · 4 phases × 4 jalons', nl: 'De rode draad · 4 fasen × 4 mijlpalen', en: 'The thread · 4 phases × 4 milestones' },
    'speos.proposed.title': {
      fr: 'Comment j\'ai cadré <span class="accent">les douze mois.</span>',
      nl: 'Hoe ik <span class="accent">de twaalf maanden</span> heb gekaderd.',
      en: 'How I framed <span class="accent">the twelve months.</span>'
    },
    'speos.proposed.vpLab': { fr: 'Value Proposition · pont', nl: 'Value Proposition · brug', en: 'Value Proposition · bridge' },
    'speos.proposed.vpLi1': { fr: 'Plateforme host · one-stop shop', nl: 'Hostplatform · one-stop shop', en: 'Host platform · one-stop shop' },
    'speos.proposed.vpLi2': { fr: 'Onboarding piloté par objectif + besoins', nl: 'Onboarding gestuurd door doel + noden', en: 'Onboarding driven by goal + needs' },
    'speos.prototype.cycleCaption': {
      fr: 'Cinq Value Props qui forment <strong>une seule boucle d\'expérience</strong>. Le client entre par l\'onboarding, monitore en continu, archive ses preuves, paie ce qu\'il consomme, et résout ses incidents en self-service. Le cycle reboucle sur le prochain produit, le prochain volume, le prochain canal.',
      nl: 'Vijf Value Props die <strong>één enkele ervaringslus</strong> vormen. De klant komt binnen via onboarding, monitort doorlopend, archiveert zijn bewijzen, betaalt wat hij verbruikt, en lost zijn incidenten op in self-service. De cyclus loopt opnieuw voor het volgende product, volume, kanaal.',
      en: 'Five Value Props forming <strong>a single experience loop</strong>. The client enters through onboarding, monitors continuously, archives proofs, pays for what they consume, and resolves incidents in self-service. The cycle loops back on the next product, the next volume, the next channel.'
    },
    'speos.prototype.directionEyebrow': { fr: 'Phase 03 · Develop · 2 directions explorées', nl: 'Fase 03 · Develop · 2 verkende richtingen', en: 'Phase 03 · Develop · 2 directions explored' },
    'speos.prototype.directionLead': {
      fr: 'Deux pistes à la sortie des ateliers. Silo · chaque produit avec son login, livré en 6 mois mais reproduit la fragmentation. One-stop · host orchestré, onboarding par persona, capacités API-isées, temps de dev doublé. Sponsor retient la deuxième · <strong class="accent">le pricing tiered ouvre le segment PME laissé aux concurrents</strong>.',
      nl: 'Twee pistes uit de workshops. Silo · elk product met eigen login, levering in 6 maanden maar reproduceert de fragmentatie. One-stop · georchestreerde host, persona-onboarding, API-iseerbare capaciteiten, dev-tijd verdubbeld. Sponsor weerhoudt de tweede · <strong class="accent">de tiered pricing opent het kmo-segment dat aan de concurrenten was overgelaten</strong>.',
      en: 'Two paths out of the workshops. Silo · each product with its own login, shipped in 6 months but reproduces fragmentation. One-stop · orchestrated host, persona-driven onboarding, API-ised capabilities, dev time doubled. Sponsor picks the second · <strong class="accent">tiered pricing opens the SME segment left to competitors</strong>.'
    },
    'speos.prototype.directionTitle': {
      fr: 'Deux directions explorées. <span class="accent">Une retenue.</span>',
      nl: 'Twee richtingen verkend. <span class="accent">Eén weerhouden.</span>',
      en: 'Two directions explored. <span class="accent">One retained.</span>'
    },
    'speos.prototype.overviewEyebrow': { fr: 'Phase 03 · Develop · 5 Value Props priorisées MVP', nl: 'Fase 03 · Develop · 5 Value Props geprioriteerd MVP', en: 'Phase 03 · Develop · 5 Value Props prioritised MVP' },
    'speos.prototype.overviewLead': {
      fr: 'Pipeline canonique · ingest → compose → distribute → archive. Cinq Value Props prioritaires sur ce squelette · Onboarding · Monitoring · Reports & Archives · Billing · Support.',
      nl: 'Canonieke pipeline · ingest → compose → distribute → archive. Vijf prioritaire Value Props op dat skelet · Onboarding · Monitoring · Reports & Archives · Billing · Support.',
      en: 'Canonical pipeline · ingest → compose → distribute → archive. Five priority Value Props on that skeleton · Onboarding · Monitoring · Reports & Archives · Billing · Support.'
    },
    'speos.prototype.overviewTitle': {
      fr: 'Du pipeline document <span class="accent">aux 5 Value Props.</span>',
      nl: 'Van de documentpipeline <span class="accent">naar de 5 Value Props.</span>',
      en: 'From the document pipeline <span class="accent">to the 5 Value Props.</span>'
    },
    'speos.prototype.p2Eyebrow': { fr: 'Phase 03 · Develop · MVP++ horizon 2026-2027', nl: 'Fase 03 · Develop · MVP++ horizon 2026-2027', en: 'Phase 03 · Develop · MVP++ horizon 2026-2027' },
    'speos.prototype.p2Feat1Desc': {
      fr: 'Multi-langue, multi-juridiction, conformité B2G adaptée pays par pays. La stack API et le pricing tiered rendent l\'expansion économiquement viable, là où la dépendance au volume papier belge la plafonnait.',
      nl: 'Meertalig, meerdere jurisdicties, B2G-compliance per land. De API-stack en de tiered pricing maken de expansie economisch leefbaar, daar waar de afhankelijkheid van Belgisch papiervolume ze plafonneerde.',
      en: 'Multi-language, multi-jurisdiction, B2G compliance country by country. The API stack and tiered pricing make expansion economically viable, where dependence on Belgian paper volume capped it.'
    },
    'speos.prototype.p2Feat1Name': { fr: 'Expansion internationale', nl: 'Internationale expansie', en: 'International expansion' },
    'speos.prototype.p2Feat2Desc': {
      fr: 'Le 3e segment Concept Report, Integrators et Resellers, embarque les Value Props dans leur propre offre. Le marketplace expose les API, la doc et le pricing partenaire. Croissance par effet de levier.',
      nl: 'Het 3e Concept Report-segment, Integrators en Resellers, neemt de Value Props mee in hun eigen aanbod. De marketplace stelt de API\'s, doc en partnerpricing open. Groei via hefboomeffect.',
      en: 'The 3rd Concept Report segment, Integrators and Resellers, embeds the Value Props in their own offer. The marketplace exposes the APIs, docs and partner pricing. Growth through leverage.'
    },
    'speos.prototype.p2Feat2Name': { fr: 'Marketplace API · Integrators', nl: 'Marketplace API · Integrators', en: 'Marketplace API · Integrators' },
    'speos.prototype.p2Lead': {
      fr: 'Deux capacités identifiées en Discovery, placées hors MVP. Elles n\'attendent que la consolidation du host pour s\'activer. Source : Concept Report · Opportunity 6 (Market Expansion) + Opportunity 11 (Competitive Differentiation).',
      nl: 'Twee capaciteiten geïdentificeerd in Discovery, buiten MVP geplaatst. Ze wachten enkel op de consolidatie van de host om te activeren. Bron: Concept Report · Opportunity 6 (Market Expansion) + Opportunity 11 (Competitive Differentiation).',
      en: 'Two capabilities identified in Discovery, placed outside the MVP. They only wait on host consolidation to activate. Source: Concept Report · Opportunity 6 (Market Expansion) + Opportunity 11 (Competitive Differentiation).'
    },
    'speos.prototype.p2Tag': { fr: 'Roadmap horizon 2026-2027 · post-MVP rollout', nl: 'Roadmap horizon 2026-2027 · post-MVP rollout', en: 'Roadmap horizon 2026-2027 · post-MVP rollout' },
    'speos.prototype.p2Title': {
      fr: 'Après le host one-stop, <span class="accent">l\'écosystème.</span>',
      nl: 'Na de one-stop host, <span class="accent">het ecosysteem.</span>',
      en: 'After the one-stop host, <span class="accent">the ecosystem.</span>'
    },
    'speos.prototype.utEyebrow': { fr: 'Phase 04 · Deliver · user test 6 clients pilotes', nl: 'Fase 04 · Deliver · user test 6 pilootklanten', en: 'Phase 04 · Deliver · user test 6 pilot clients' },
    'speos.prototype.utLead': {
      fr: 'Concept Report présenté aux six pilotes. En parallèle, deux personas Énergie · Moustafa et Bogdan · testent trois scénarios prototype.',
      nl: 'Concept Report gepresenteerd aan de zes piloten. Parallel testen twee Energie-persona\'s · Moustafa en Bogdan · drie prototype-scenario\'s.',
      en: 'Concept Report presented to the six pilots. In parallel, two Energy personas · Moustafa and Bogdan · test three prototype scenarios.'
    },
    'speos.prototype.utName1': { fr: 'Luminus', nl: 'Luminus', en: 'Luminus' },
    'speos.prototype.utName2': { fr: 'Large Account · secteur réglementé', nl: 'Large Account · gereglementeerde sector', en: 'Large Account · regulated sector' },
    'speos.prototype.utName3': { fr: 'PME · syndic / profession spécialisée', nl: 'KMO · syndicus / gespecialiseerd beroep', en: 'SME · property manager / specialised profession' },
    'speos.prototype.utName4': { fr: 'PME · profession libérale', nl: 'KMO · vrij beroep', en: 'SME · liberal profession' },
    'speos.prototype.utName5': { fr: 'Integrator IT · reseller belge', nl: 'Integrator IT · Belgische reseller', en: 'IT integrator · Belgian reseller' },
    'speos.prototype.utName6': { fr: 'Integrator IT · partenaire ERP', nl: 'Integrator IT · ERP-partner', en: 'IT integrator · ERP partner' },
    'speos.prototype.utQuote': {
      fr: 'Six clients sur six valident la direction avant le développement. Le sponsor décide go production sur la base du Concept Report et du test SUPERQ — score combiné 4,03/5, NPS 9/10.',
      nl: 'Zes klanten op zes valideren de richting vóór de ontwikkeling. De sponsor beslist go-productie op basis van het Concept Report en de SUPERQ-test — gecombineerde score 4,03/5, NPS 9/10.',
      en: 'Six clients out of six validate the direction before development. The sponsor decides go-production based on the Concept Report and the SUPERQ test — combined score 4.03/5, NPS 9/10.'
    },
    'speos.prototype.utSeg1': { fr: 'Build-to-Mail', nl: 'Build-to-Mail', en: 'Build-to-Mail' },
    'speos.prototype.utSeg2': { fr: 'Build-to-Mail', nl: 'Build-to-Mail', en: 'Build-to-Mail' },
    'speos.prototype.utSeg3': { fr: 'Easy2Mail', nl: 'Easy2Mail', en: 'Easy2Mail' },
    'speos.prototype.utSeg4': { fr: 'Easy2Mail', nl: 'Easy2Mail', en: 'Easy2Mail' },
    'speos.prototype.utSeg5': { fr: 'Integrators', nl: 'Integrators', en: 'Integrators' },
    'speos.prototype.utSeg6': { fr: 'Integrators', nl: 'Integrators', en: 'Integrators' },
    'speos.prototype.utStat1': { fr: 'Clients testés sur 3 segments', nl: 'Klanten getest op 3 segmenten', en: 'Clients tested across 3 segments' },
    'speos.prototype.utStat2': { fr: 'Valident la direction one-stop', nl: 'Valideren de one-stop richting', en: 'Validate the one-stop direction' },
    'speos.prototype.utStat3': { fr: 'Référence Luminus · sponsor go production', nl: 'Referentie Luminus · sponsor go productie', en: 'Luminus reference · sponsor go production' },
    'speos.prototype.utTitle': {
      fr: 'Six clients. Trois segments. <span class="accent">Un go pré-validé.</span>',
      nl: 'Zes klanten. Drie segmenten. <span class="accent">Eén pre-gevalideerde go.</span>',
      en: 'Six clients. Three segments. <span class="accent">A pre-validated go.</span>'
    },
    'speos.prototype.utVerdict1': {
      fr: 'Énergie · gros volume multicanal · validation forte sur l\'orchestration et l\'audit-ready. La référence qui rassure le sponsor.',
      nl: 'Energie · groot multichannel volume · sterke validatie op orchestratie en audit-ready. De referentie die de sponsor geruststelt.',
      en: 'Energy · large multichannel volume · strong validation on orchestration and audit-ready. The reference that reassures the sponsor.'
    },
    'speos.prototype.utVerdict2': {
      fr: 'Compliance B2G + multi-langue. Validation sur la conformité, demande d\'expansion en phase 2.',
      nl: 'B2G compliance + meertalig. Validatie op conformiteit, vraag naar expansie in fase 2.',
      en: 'B2G compliance + multi-language. Validation on conformity, expansion request in phase 2.'
    },
    'speos.prototype.utVerdict3': {
      fr: 'Volume modéré, exigence confidentialité. Validation forte sur l\'IT-less onboarding.',
      nl: 'Gematigd volume, vertrouwelijkheidseis. Sterke validatie op IT-less onboarding.',
      en: 'Moderate volume, confidentiality demand. Strong validation on IT-less onboarding.'
    },
    'speos.prototype.utVerdict4': {
      fr: 'Validation sur le pricing tiered et la facturation lisible. Pay-as-you-grow demandé.',
      nl: 'Validatie op tiered pricing en leesbare facturatie. Pay-as-you-grow gevraagd.',
      en: 'Validation on tiered pricing and readable billing. Pay-as-you-grow requested.'
    },
    'speos.prototype.utVerdict5': {
      fr: 'Embarque SPEOS dans son offre clients. Demande prioritaire : marketplace API et doc partenaire.',
      nl: 'Neemt SPEOS mee in het klantenaanbod. Prioritaire vraag: marketplace API en partnerdocumentatie.',
      en: 'Embeds SPEOS in its client offer. Top request: marketplace API and partner documentation.'
    },
    'speos.prototype.utVerdict6': {
      fr: 'Validation API. Reproductible chez ses propres clients ERP, effet de levier identifié.',
      nl: 'API-validatie. Reproduceerbaar bij eigen ERP-klanten, hefboomeffect geïdentificeerd.',
      en: 'API validation. Reproducible with their own ERP clients, leverage effect identified.'
    },
    'speos.prototype.vp1Eyebrow': { fr: 'Phase 03 · Develop · VP 01 · Onboarding', nl: 'Fase 03 · Develop · VP 01 · Onboarding', en: 'Phase 03 · Develop · VP 01 · Onboarding' },
    'speos.prototype.vp1F1h': { fr: 'Self-service capabilities', nl: 'Self-service capabilities', en: 'Self-service capabilities' },
    'speos.prototype.vp1F1p': {
      fr: 'Le client configure et monitore ses campagnes lui-même, sans ouvrir de ticket IT. Source : Concept Report · Opportunity 1 · Enhanced Customer Experience.',
      nl: 'De klant configureert en monitort zijn campagnes zelf, zonder IT-ticket. Bron: Concept Report · Opportunity 1 · Enhanced Customer Experience.',
      en: 'The client configures and monitors campaigns on their own, without an IT ticket. Source: Concept Report · Opportunity 1 · Enhanced Customer Experience.'
    },
    'speos.prototype.vp1F2h': { fr: 'Persona-driven dashboards', nl: 'Persona-driven dashboards', en: 'Persona-driven dashboards' },
    'speos.prototype.vp1F2p': {
      fr: 'Vues sur mesure pour Large Accounts, PMEs et secteurs spécifiques (Finance, Operations, BI). Le wizard sait qui est devant lui.',
      nl: 'Views op maat voor Large Accounts, KMO en specifieke sectoren (Finance, Operations, BI). De wizard weet wie voor hem staat.',
      en: 'Tailored views for Large Accounts, SMEs and specific sectors (Finance, Operations, BI). The wizard knows who is in front of it.'
    },
    'speos.prototype.vp1F3h': { fr: 'Self-onboarding pour les SME', nl: 'Self-onboarding voor de KMO', en: 'Self-onboarding for SMEs' },
    'speos.prototype.vp1F3p': {
      fr: 'Process simplifié pour les petites structures. Source : Concept Report · Opportunity 2 · Automation & Scalability.',
      nl: 'Vereenvoudigd proces voor kleine structuren. Bron: Concept Report · Opportunity 2 · Automation & Scalability.',
      en: 'Simplified process for small structures. Source: Concept Report · Opportunity 2 · Automation & Scalability.'
    },
    'speos.prototype.vp1SourceLab': { fr: 'Voir la slide originale', nl: 'Originele slide bekijken', en: 'See the original slide' },
    'speos.prototype.vp1SourceRef': {
      fr: 'Speos Concept Report 2024 · VP 01 Onboarding · Value Proposition verbatim',
      nl: 'Speos Concept Report 2024 · VP 01 Onboarding · Value Proposition verbatim',
      en: 'Speos Concept Report 2024 · VP 01 Onboarding · Value Proposition verbatim'
    },
    'speos.prototype.vp1Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Notre <strong>onboarding sans IT</strong> aide les <strong>Customer Account Managers</strong> qui veulent <strong>onboarder rapidement de nouveaux clients</strong>, en supprimant les dépendances IT et en accélérant le time-to-market.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Onze <strong>onboarding zonder IT</strong> helpt de <strong>Customer Account Managers</strong> die <strong>nieuwe klanten snel willen onboarden</strong>, door IT-afhankelijkheden weg te nemen en time-to-market te versnellen.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Our <strong>IT-less onboarding</strong> helps <strong>Customer Account Managers</strong> who want to <strong>onboard new clients quickly</strong>, by removing IT dependencies and accelerating time-to-market.</p>'
    },
    'speos.prototype.vp1Title': {
      fr: 'Démarrer sans <span class="accent">passer par l\'IT.</span>',
      nl: 'Starten zonder <span class="accent">langs IT te passeren.</span>',
      en: 'Start without <span class="accent">going through IT.</span>'
    },
    'speos.prototype.vp2Eyebrow': { fr: 'Phase 03 · Develop · VP 02 · Monitoring', nl: 'Fase 03 · Develop · VP 02 · Monitoring', en: 'Phase 03 · Develop · VP 02 · Monitoring' },
    'speos.prototype.vp2F1h': { fr: 'End-to-end visibility', nl: 'End-to-end visibility', en: 'End-to-end visibility' },
    'speos.prototype.vp2F1p': {
      fr: 'Le pipeline ingest → compose → distribute est rendu observable étape par étape. Plus besoin d\'appeler le Customer Service pour savoir où en est un envoi.',
      nl: 'De pipeline ingest → compose → distribute wordt stap voor stap zichtbaar. Geen telefoontje meer naar Customer Service om te weten waar een verzending zit.',
      en: 'The ingest → compose → distribute pipeline is made observable step by step. No more calling Customer Service to know where a sending stands.'
    },
    'speos.prototype.vp2F2h': { fr: 'Proactive alerts', nl: 'Proactive alerts', en: 'Proactive alerts' },
    'speos.prototype.vp2F2p': {
      fr: 'Le système notifie l\'incident avant que le client ne s\'en aperçoive. Source : Concept Report · Opportunity 7 · Proactive Customer Engagement.',
      nl: 'Het systeem meldt het incident voor de klant het opmerkt. Bron: Concept Report · Opportunity 7 · Proactive Customer Engagement.',
      en: 'The system flags the incident before the client notices. Source: Concept Report · Opportunity 7 · Proactive Customer Engagement.'
    },
    'speos.prototype.vp2F3h': { fr: 'Fallback automatique multi-canal', nl: 'Automatische multichannel fallback', en: 'Automatic multi-channel fallback' },
    'speos.prototype.vp2F3p': {
      fr: 'Si le canal digital échoue, fallback print en un clic. Source : Concept Report · Opportunity 3 · Multi-Channel Integration.',
      nl: 'Als het digitale kanaal faalt, print-fallback met één klik. Bron: Concept Report · Opportunity 3 · Multi-Channel Integration.',
      en: 'If the digital channel fails, print fallback in one click. Source: Concept Report · Opportunity 3 · Multi-Channel Integration.'
    },
    'speos.prototype.vp2SourceLab': { fr: 'Voir la slide originale', nl: 'Originele slide bekijken', en: 'See the original slide' },
    'speos.prototype.vp2SourceRef': { fr: 'Speos Concept Report 2024 · VP 02 Monitoring', nl: 'Speos Concept Report 2024 · VP 02 Monitoring', en: 'Speos Concept Report 2024 · VP 02 Monitoring' },
    'speos.prototype.vp2Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Notre <strong>monitoring temps réel</strong> aide les <strong>équipes Operations et Business</strong> qui veulent <strong>tracer les flux documents avec confiance</strong>, en fournissant une visibilité end-to-end, des alertes proactives, et en réduisant les risques et la dépendance au support.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Onze <strong>real-time monitoring</strong> helpt de <strong>Operations- en Business-teams</strong> die <strong>documentstromen met vertrouwen willen volgen</strong>, door end-to-end zichtbaarheid en proactieve alerts te bieden, en risico\'s en supportafhankelijkheid te verminderen.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Our <strong>real-time monitoring</strong> helps <strong>Operations and Business teams</strong> who want to <strong>trace document flows with confidence</strong>, by providing end-to-end visibility, proactive alerts, and by reducing risks and support dependence.</p>'
    },
    'speos.prototype.vp2Title': { fr: 'Voir les flux <span class="accent">en direct.</span>', nl: 'De stromen <span class="accent">live zien.</span>', en: 'See the flows <span class="accent">live.</span>' },
    'speos.prototype.vp3Eyebrow': { fr: 'Phase 03 · Develop · VP 03 + VP 04 · Reports & Billing', nl: 'Fase 03 · Develop · VP 03 + VP 04 · Reports & Billing', en: 'Phase 03 · Develop · VP 03 + VP 04 · Reports & Billing' },
    'speos.prototype.vp3F1h': { fr: 'Audit-ready by default', nl: 'Audit-ready by default', en: 'Audit-ready by default' },
    'speos.prototype.vp3F1p': {
      fr: 'Chaque flux génère sa preuve à la souche. eIDAS trusted service. Conformité B2G PEPPOL pour le mandate belge 1er janvier 2026.',
      nl: 'Elke stroom genereert zijn bewijs aan de bron. eIDAS trusted service. B2G PEPPOL-conformiteit voor het Belgische mandaat 1 januari 2026.',
      en: 'Every flow generates its proof at source. eIDAS trusted service. B2G PEPPOL compliance for the Belgian mandate of 1 January 2026.'
    },
    'speos.prototype.vp3F2h': { fr: 'Pricing tiered transparent', nl: 'Transparante tiered pricing', en: 'Transparent tiered pricing' },
    'speos.prototype.vp3F2p': {
      fr: 'Niveaux Basic / Gold / Custom. Pay-as-you-go ou subscription pour les SME. Source : Concept Report · Opportunity 5 · Flexible Pricing Models.',
      nl: 'Niveaus Basic / Gold / Custom. Pay-as-you-go of subscription voor de KMO. Bron: Concept Report · Opportunity 5 · Flexible Pricing Models.',
      en: 'Basic / Gold / Custom tiers. Pay-as-you-go or subscription for SMEs. Source: Concept Report · Opportunity 5 · Flexible Pricing Models.'
    },
    'speos.prototype.vp3F3h': { fr: 'Réconciliation flux ↔ facture', nl: 'Reconciliatie stroom ↔ factuur', en: 'Flow ↔ invoice reconciliation' },
    'speos.prototype.vp3F3p': {
      fr: 'Chaque ligne de facture pointe vers la batch d\'origine. Les Finance Teams arrêtent de réconcilier des CSV. Source : Pain Point 9 Billing Complexity.',
      nl: 'Elke factuurregel verwijst naar de oorspronkelijke batch. De Finance Teams stoppen met CSV\'s te reconcilieren. Bron: Pain Point 9 Billing Complexity.',
      en: 'Every invoice line points to its source batch. Finance Teams stop reconciling CSVs. Source: Pain Point 9 Billing Complexity.'
    },
    'speos.prototype.vp3SourceLab': { fr: 'Voir les slides originales', nl: 'Originele slides bekijken', en: 'See the original slides' },
    'speos.prototype.vp3SourceRef': {
      fr: 'Speos Concept Report 2024 · VP 03 Reports & Archives + VP 04 Billing',
      nl: 'Speos Concept Report 2024 · VP 03 Reports & Archives + VP 04 Billing',
      en: 'Speos Concept Report 2024 · VP 03 Reports & Archives + VP 04 Billing'
    },
    'speos.prototype.vp3Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Nos <strong>Reports &amp; Archives</strong> aident les équipes <strong>Finance, Compliance et Operations</strong> qui ont besoin de <strong>maîtriser les coûts, garantir la traçabilité et rester compliant</strong>, en délivrant des rapports structurés, des archives centralisées et des preuves audit-ready, accessibles à un seul endroit.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Onze <strong>Reports &amp; Archives</strong> helpen de <strong>Finance-, Compliance- en Operations-teams</strong> die <strong>kosten willen beheersen, traceerbaarheid willen garanderen en compliant willen blijven</strong>, door gestructureerde rapporten, centrale archieven en audit-ready bewijzen op één plek aan te bieden.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Our <strong>Reports &amp; Archives</strong> help <strong>Finance, Compliance and Operations teams</strong> who need to <strong>master costs, guarantee traceability and stay compliant</strong>, by delivering structured reports, centralised archives and audit-ready proofs, accessible in a single place.</p>'
    },
    'speos.prototype.vp3Title': {
      fr: 'Tracer, archiver, <span class="accent">facturer juste.</span>',
      nl: 'Tracen, archiveren, <span class="accent">correct factureren.</span>',
      en: 'Trace, archive, <span class="accent">bill right.</span>'
    },
    'speos.prototype.vp5Eyebrow': { fr: 'Phase 03 · Develop · VP 05 · Support', nl: 'Fase 03 · Develop · VP 05 · Support', en: 'Phase 03 · Develop · VP 05 · Support' },
    'speos.prototype.vp5F1h': { fr: 'Portail self-service', nl: 'Self-service portaal', en: 'Self-service portal' },
    'speos.prototype.vp5F1p': {
      fr: 'Création de tickets, suivi live, knowledge base par persona. L\'utilisateur résout d\'abord, escalade si nécessaire.',
      nl: 'Tickets aanmaken, live opvolgen, knowledge base per persona. De gebruiker lost eerst zelf op, escaleert indien nodig.',
      en: 'Ticket creation, live tracking, knowledge base per persona. The user resolves first, escalates if needed.'
    },
    'speos.prototype.vp5F2h': { fr: 'Escalation 3 tiers structurée', nl: 'Gestructureerde escalatie in 3 tiers', en: 'Structured 3-tier escalation' },
    'speos.prototype.vp5F2p': {
      fr: 'Tier 1 self-service · Tier 2 SPEOS support sur SLA · Tier 3 accès Engineering. Le bottleneck humain devient un escalator.',
      nl: 'Tier 1 self-service · Tier 2 SPEOS support op SLA · Tier 3 toegang tot Engineering. De menselijke bottleneck wordt een escalator.',
      en: 'Tier 1 self-service · Tier 2 SPEOS support on SLA · Tier 3 Engineering access. The human bottleneck becomes an escalator.'
    },
    'speos.prototype.vp5F3h': { fr: 'Unified ticketing cross-VP', nl: 'Unified ticketing cross-VP', en: 'Unified ticketing cross-VP' },
    'speos.prototype.vp5F3p': {
      fr: 'Un même portail pour onboarding, monitoring, billing, archives. Source : Concept Report · Opportunity 10 · Unified Client Portal.',
      nl: 'Eén portaal voor onboarding, monitoring, billing, archives. Bron: Concept Report · Opportunity 10 · Unified Client Portal.',
      en: 'A single portal for onboarding, monitoring, billing, archives. Source: Concept Report · Opportunity 10 · Unified Client Portal.'
    },
    'speos.prototype.vp5SourceLab': { fr: 'Voir la slide originale', nl: 'Originele slide bekijken', en: 'See the original slide' },
    'speos.prototype.vp5SourceRef': { fr: 'Speos Concept Report 2024 · VP 05 Support', nl: 'Speos Concept Report 2024 · VP 05 Support', en: 'Speos Concept Report 2024 · VP 05 Support' },
    'speos.prototype.vp5Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Notre <strong>plateforme de support intégrée</strong> aide les <strong>utilisateurs opérationnels qui gèrent des flux critiques</strong> (documents, factures, mailings), qui veulent <strong>plus d\'autonomie, de visibilité, et une résolution plus rapide</strong> de leurs incidents techniques, en offrant un portail self-service avec création de tickets, suivi temps réel, priorités SLA et accès direct aux équipes tech quand nécessaire. À la différence des modèles traditionnels qui reposent sur des processus lents, manuels, et sur des goulots d\'étranglement humains.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Onze <strong>geïntegreerde supportplatform</strong> helpt de <strong>operationele gebruikers die kritieke stromen beheren</strong> (documenten, facturen, mailings), die <strong>meer autonomie, zichtbaarheid en snellere resolutie</strong> van hun technische incidenten willen, door een self-service portaal te bieden met ticketcreatie, real-time opvolging, SLA-prioriteiten en directe toegang tot de tech teams indien nodig, in tegenstelling tot traditionele modellen die berusten op trage, manuele processen en menselijke bottlenecks.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Concept Report</span>\n          <p>Our <strong>integrated support platform</strong> helps <strong>operational users handling critical flows</strong> (documents, invoices, mailings), who want <strong>more autonomy, visibility, and faster resolution</strong> of their technical incidents, by offering a self-service portal with ticket creation, real-time tracking, SLA priorities and direct access to the tech teams when needed, unlike traditional models that rely on slow, manual processes and human bottlenecks.</p>'
    },
    'speos.prototype.vp5Title': { fr: 'Résoudre <span class="accent">sans appeler.</span>', nl: 'Oplossen <span class="accent">zonder bellen.</span>', en: 'Resolve <span class="accent">without calling.</span>' },
    'speos.prototype.vpBadName': { fr: 'Silo as-is', nl: 'Silo as-is', en: 'Silo as-is' },
    'speos.prototype.vpBadNote': {
      fr: 'Cinq apps cloisonnées, cinq logins, cinq supports. Le client jongle, l\'IT maintient cinq stacks, le Business vend cinq produits au lieu d\'une plateforme. La solution la plus rapide à livrer, mais celle qui reproduit la fragmentation pointée par les 12 entretiens experts.',
      nl: 'Vijf afgeschotte apps, vijf logins, vijf supportkanalen. De klant jongleert, IT onderhoudt vijf stacks, Business verkoopt vijf producten in plaats van één platform. De snelst op te leveren oplossing, maar ze reproduceert de fragmentatie aangewezen door de 12 expertinterviews.',
      en: 'Five siloed apps, five logins, five supports. The client juggles, IT maintains five stacks, Business sells five products instead of a platform. Fastest to ship, but reproduces the fragmentation pointed at by the 12 expert interviews.'
    },
    'speos.prototype.vpBadVerdict': { fr: 'Une porte par produit', nl: 'Eén deur per product', en: 'One door per product' },
    'speos.prototype.vpClaim': {
      fr: 'Pas une suite de produits avec une porte chacun. <span class="accent">Un host orchestré, piloté par persona et typologie de besoin.</span>',
      nl: 'Geen reeks producten met elk een eigen deur. <span class="accent">Eén georchestreerde host, gestuurd per persona en noodtypologie.</span>',
      en: 'Not a suite of products each with its own door. <span class="accent">One orchestrated host, driven by persona and need typology.</span>'
    },
    'speos.prototype.vpGoodName': { fr: 'One-stop platform', nl: 'One-stop platform', en: 'One-stop platform' },
    'speos.prototype.vpGoodNote': {
      fr: 'Une porte d\'entrée. L\'onboarding reconnaît la persona, son rôle, son canal. Cinq Value Props couvrent le cycle ingest · compose · distribute · archive. L\'IT maintient une stack, le Business vend une plateforme.',
      nl: 'Eén toegangsdeur. De onboarding herkent de persona, zijn rol, zijn kanaal. Vijf Value Props dekken de cyclus ingest · compose · distribute · archive. IT onderhoudt één stack, Business verkoopt één platform.',
      en: 'One entry door. Onboarding recognises the persona, their role, their channel. Five Value Props cover the ingest · compose · distribute · archive cycle. IT maintains one stack, Business sells one platform.'
    },
    'speos.prototype.vpGoodVerdict': { fr: 'One-stop platform', nl: 'One-stop platform', en: 'One-stop platform' },
    'speos.research.benchEyebrow': { fr: 'Phase 01 · Discover · benchmark concurrentiel', nl: 'Fase 01 · Discover · concurrentiebenchmark', en: 'Phase 01 · Discover · competitive benchmark' },
    'speos.research.benchOutcome': {
      fr: '3 segments identifiés <span class="brief-teaser__sep">·</span> Large Accounts (Build-to-Mail) · PMEs (Easy2Mail) · Integrators / Resellers <span class="brief-teaser__sep">·</span> concurrents observés en parallèle (Easypost, Doccle, plateformes digital mail européennes).',
      nl: '3 segmenten geïdentificeerd <span class="brief-teaser__sep">·</span> Large Accounts (Build-to-Mail) · KMO\'s (Easy2Mail) · Integrators / Resellers <span class="brief-teaser__sep">·</span> concurrenten parallel geobserveerd (Easypost, Doccle, Europese digital mail-platformen).',
      en: '3 segments identified <span class="brief-teaser__sep">·</span> Large Accounts (Build-to-Mail) · SMEs (Easy2Mail) · Integrators / Resellers <span class="brief-teaser__sep">·</span> competitors observed in parallel (Easypost, Doccle, European digital mail platforms).'
    },
    'speos.research.benchLead': {
      fr: 'Trois logiques d\'achat distinctes. Les Large Accounts achètent des solutions complexes avec haute compliance. Les PMEs achètent du standard, du low-touch, de l\'autonomie. Les Integrators achètent une API et de la documentation. Une seule plateforme doit servir les trois sans dériver.',
      nl: 'Drie verschillende aankooplogica\'s. Large Accounts kopen complexe oplossingen met hoge compliance. KMO\'s kopen standaard, low-touch, autonomie. Integrators kopen een API en documentatie. Eén platform moet de drie bedienen zonder af te drijven.',
      en: 'Three distinct buying logics. Large Accounts buy complex solutions with high compliance. SMEs buy standard, low-touch, autonomy. Integrators buy an API and documentation. One platform must serve the three without drifting.'
    },
    'speos.research.benchTitle': {
      fr: 'Trois segments marché. <span class="accent">Trois logiques d\'achat.</span>',
      nl: 'Drie marktsegmenten. <span class="accent">Drie aankooplogica\'s.</span>',
      en: 'Three market segments. <span class="accent">Three buying logics.</span>'
    },
    'speos.research.it1Context': {
      fr: 'Vision marché et vigilance concurrentielle. Veut un produit qui défend la position de leader avant le mandate B2B PEPPOL au 1er janvier 2026.',
      nl: 'Marktvisie en concurrentiewaakzaamheid. Wil een product dat de leiderspositie verdedigt voor het B2B PEPPOL-mandaat op 1 januari 2026.',
      en: 'Market vision and competitive vigilance. Wants a product that defends the leadership position before the B2B PEPPOL mandate on 1 January 2026.'
    },
    'speos.research.it1Name': { fr: 'Le CEO', nl: 'De CEO', en: 'The CEO' },
    'speos.research.it1Quote': {
      fr: '« On reste leader, mais le marché bouge. Le digital nous met en concurrence frontale. »',
      nl: '« We blijven leider, maar de markt beweegt. Digital zet ons in directe concurrentie. »',
      en: '"We stay leader, but the market is moving. Digital puts us in frontal competition."'
    },
    'speos.research.it2Context': {
      fr: 'Architecture historique fragmentée. IT fraîchement passée à l\'Agile, encore loin de SAFe. Cherche une stack maintenable, pas un patchwork.',
      nl: 'Gefragmenteerde historische architectuur. IT net overgestapt naar Agile, nog ver van SAFe. Zoekt een onderhoudbare stack, geen lappendeken.',
      en: 'Fragmented historical architecture. IT freshly moved to Agile, still far from SAFe. Looks for a maintainable stack, not a patchwork.'
    },
    'speos.research.it2Name': { fr: 'Le CTO', nl: 'De CTO', en: 'The CTO' },
    'speos.research.it2Quote': {
      fr: '« On a des plateformes par segment. Elles ne se parlent pas. »',
      nl: '« We hebben platformen per segment. Ze praten niet met elkaar. »',
      en: '"We have platforms per segment. They do not talk to each other."'
    },
    'speos.research.it3Context': {
      fr: 'Côté Business, propriétaires de l\'offre commerciale. Frustrés par des cycles techniques opaques.',
      nl: 'Aan Business-zijde, eigenaars van het commerciële aanbod. Gefrustreerd door ondoorzichtige technische cycli.',
      en: 'On Business side, owners of the commercial offer. Frustrated by opaque technical cycles.'
    },
    'speos.research.it3Name': { fr: 'Project Owners (Business)', nl: 'Project Owners (Business)', en: 'Project Owners (Business)' },
    'speos.research.it3Quote': { fr: '« Je sais ce que veut mon client. L\'IT ne m\'écoute pas. »', nl: '« Ik weet wat mijn klant wil. IT luistert niet naar mij. »', en: '"I know what my client wants. IT does not listen to me."' },
    'speos.research.it4Context': {
      fr: 'Côté IT, responsables livraison. Frustrés par des specs floues, des retours tardifs et des arbitrages politiques.',
      nl: 'Aan IT-zijde, verantwoordelijk voor de oplevering. Gefrustreerd door vage specs, late feedback en politieke afwegingen.',
      en: 'On IT side, in charge of delivery. Frustrated by fuzzy specs, late feedback and political trade-offs.'
    },
    'speos.research.it4Name': { fr: 'Project Managers (IT)', nl: 'Project Managers (IT)', en: 'Project Managers (IT)' },
    'speos.research.it4Quote': {
      fr: '« Le Business change d\'avis chaque sprint. On livre du flou. »',
      nl: '« Business verandert van mening elke sprint. We leveren vaagheid. »',
      en: '"Business changes its mind every sprint. We deliver fuzziness."'
    },
    'speos.research.it5Context': {
      fr: 'Connaissance tacite du métier postal/print/mailing. Mémoire vivante de l\'organisation.',
      nl: 'Stilzwijgende kennis van het post/print/mailing-vak. Levend geheugen van de organisatie.',
      en: 'Tacit knowledge of the postal/print/mailing business. Living memory of the organisation.'
    },
    'speos.research.it5Name': { fr: 'Experts métier 20+ ans', nl: 'Domeinexperts 20+ jaar', en: 'Domain experts 20+ years' },
    'speos.research.it5Quote': {
      fr: '« Tout est dans nos têtes. Rien n\'est documenté pour un client. »',
      nl: '« Alles zit in onze hoofden. Niets is gedocumenteerd voor een klant. »',
      en: '"Everything is in our heads. Nothing is documented for a client."'
    },
    'speos.research.it6Context': {
      fr: 'Bras armé de la livraison. Visibilité directe sur ce qui casse côté client final.',
      nl: 'De gewapende arm van de oplevering. Direct zicht op wat aan de eindklantzijde stuk gaat.',
      en: 'The arm of delivery. Direct visibility on what breaks on the end-client side.'
    },
    'speos.research.it6Name': { fr: 'Operations & Production', nl: 'Operations & Production', en: 'Operations & Production' },
    'speos.research.it6Quote': {
      fr: '« On absorbe les ratés en bout de chaîne. Tous les jours. »',
      nl: '« Wij vangen de missers op aan het einde van de keten. Elke dag. »',
      en: '"We absorb the misses at the end of the chain. Every day."'
    },
    'speos.research.itEyebrow': { fr: 'Phase 01 · Discover · interviews internes', nl: 'Fase 01 · Discover · interne interviews', en: 'Phase 01 · Discover · internal interviews' },
    'speos.research.itOutcome': {
      fr: 'Direction, IT, Operations, Customer Service, Production, Sales, Marketing <span class="brief-teaser__sep">·</span> 20+ ans d\'ancienneté.',
      nl: 'Directie, IT, Operations, Customer Service, Production, Sales, Marketing <span class="brief-teaser__sep">·</span> 20+ jaar anciënniteit.',
      en: 'Management, IT, Operations, Customer Service, Production, Sales, Marketing <span class="brief-teaser__sep">·</span> 20+ years seniority.'
    },
    'speos.research.itLead': {
      fr: 'Comprendre comment SPEOS fait son métier, et ce que chaque rôle attend d\'une plateforme unifiée.',
      nl: 'Begrijpen hoe SPEOS zijn vak uitoefent, en wat elke rol verwacht van een verenigd platform.',
      en: 'Understand how SPEOS runs its business, and what each role expects of a unified platform.'
    },
    'speos.research.itTitle': {
      fr: 'On écoute <span class="accent">avant de dessiner.</span>',
      nl: 'Eerst luisteren <span class="accent">voor we tekenen.</span>',
      en: 'Listen <span class="accent">before drawing.</span>'
    },
    'speos.research.perso1Desc': {
      fr: 'Le pivot multicanal. Veut de l\'automatisation, des API propres, un time-to-market raccourci.',
      nl: 'De multichannel scharnier. Wil automatisering, propere API\'s, een korter time-to-market.',
      en: 'The multichannel pivot. Wants automation, clean APIs, a shorter time-to-market.'
    },
    'speos.research.perso1Name': { fr: 'IT & Operations Manager', nl: 'IT & Operations Manager', en: 'IT & Operations Manager' },
    'speos.research.perso2Desc': {
      fr: 'Facturation, e-invoicing, conformité B2B/B2G. Tolère zéro erreur sur l\'invoice routing.',
      nl: 'Facturatie, e-invoicing, B2B/B2G-conformiteit. Tolereert nul fouten op de invoice routing.',
      en: 'Billing, e-invoicing, B2B/B2G compliance. Tolerates zero errors on invoice routing.'
    },
    'speos.research.perso2Name': { fr: 'Finance Team', nl: 'Finance Team', en: 'Finance Team' },
    'speos.research.perso3Desc': {
      fr: 'Logistique d\'impression et de mise sous pli. Tient les SLA J0, balance auto et humain.',
      nl: 'Logistiek van print en vouwen. Bewaakt de SLA op dag 0, in evenwicht tussen auto en mens.',
      en: 'Print and enveloping logistics. Holds the day-0 SLA, balances auto and human.'
    },
    'speos.research.perso3Name': { fr: 'Production Coordinator', nl: 'Production Coordinator', en: 'Production Coordinator' },
    'speos.research.perso4Desc': {
      fr: 'Le KEY · banque, assurance, télécom. Renouvelle, escalade, signe. Aligne le vendor sur ses objectifs business.',
      nl: 'De KEY · bank, verzekering, telecom. Vernieuwt, escaleert, tekent. Aligneert de vendor op zijn businessdoelen.',
      en: 'The KEY · bank, insurance, telecom. Renews, escalates, signs. Aligns the vendor on his business goals.'
    },
    'speos.research.perso4Name': { fr: 'Large Account Decision-Maker', nl: 'Large Account Decision-Maker', en: 'Large Account Decision-Maker' },
    'speos.research.perso5Desc': {
      fr: 'Le KEY volume · Easy2Mail. Veut du standard, du low-touch, un onboarding sans IT.',
      nl: 'De volume-KEY · Easy2Mail. Wil standaard, low-touch, onboarding zonder IT.',
      en: 'The volume KEY · Easy2Mail. Wants standard, low-touch, IT-less onboarding.'
    },
    'speos.research.perso5Name': { fr: 'SME · Small Business Owner', nl: 'KMO · Small Business Owner', en: 'SME · Small Business Owner' },
    'speos.research.perso6Desc': {
      fr: 'Avocats, médecins, syndics. Workflows ultra-spécifiques, confidentialité non-négociable.',
      nl: 'Advocaten, dokters, syndici. Zeer specifieke workflows, vertrouwelijkheid niet onderhandelbaar.',
      en: 'Lawyers, doctors, property managers. Highly specific workflows, non-negotiable confidentiality.'
    },
    'speos.research.perso6Name': { fr: 'Niche Professional', nl: 'Niche Professional', en: 'Niche Professional' },
    'speos.research.perso7Desc': {
      fr: 'Optimise par canal et par préférence. Veut de la donnée actionnable, pas un dump.',
      nl: 'Optimaliseert per kanaal en per voorkeur. Wil bruikbare data, geen dump.',
      en: 'Optimises per channel and per preference. Wants actionable data, not a dump.'
    },
    'speos.research.perso7Name': { fr: 'Marketing & BI Manager', nl: 'Marketing & BI Manager', en: 'Marketing & BI Manager' },
    'speos.research.perso8Desc': {
      fr: 'Embarque SPEOS dans son offre. API stables, doc claire, pas de friction d\'intégration.',
      nl: 'Neemt SPEOS mee in zijn aanbod. Stabiele API\'s, heldere doc, geen integratiewrijving.',
      en: 'Embeds SPEOS in his offer. Stable APIs, clear doc, no integration friction.'
    },
    'speos.research.perso8Name': { fr: 'Integrator & IT Partner', nl: 'Integrator & IT Partner', en: 'Integrator & IT Partner' },
    'speos.research.persoEyebrow': { fr: 'Phase 01 · Discover · personas', nl: 'Fase 01 · Discover · persona\'s', en: 'Phase 01 · Discover · personas' },
    'speos.research.persoLead': {
      fr: 'Synthétisés à partir des entretiens internes et terrain. La carte qui priorise le MVP, à qui on parle et à quel moment du cycle.',
      nl: 'Gesynthetiseerd uit de interne en terreininterviews. De kaart die het MVP prioriteert, met wie we praten en op welk moment in de cyclus.',
      en: 'Synthesised from the internal and field interviews. The map that prioritises the MVP, who we speak to and at which point in the cycle.'
    },
    'speos.research.persoTitle': {
      fr: 'Huit archétypes. <span class="accent">Deux personas illustratifs.</span>',
      nl: 'Acht archetypes. <span class="accent">Twee illustratieve persona\'s.</span>',
      en: 'Eight archetypes. <span class="accent">Two illustrative personas.</span>'
    },
    'speos.research.seg1Country': { fr: 'Segment 01 · Build-to-Mail', nl: 'Segment 01 · Build-to-Mail', en: 'Segment 01 · Build-to-Mail' },
    'speos.research.seg1Li1': { fr: 'Banques, assurances, télécoms', nl: 'Banken, verzekeringen, telecoms', en: 'Banks, insurance, telcos' },
    'speos.research.seg1Li2': { fr: 'Volumes massifs, parcours customisés bout-en-bout', nl: 'Massieve volumes, end-to-end gecustomiseerde parcours', en: 'Massive volumes, end-to-end customised journeys' },
    'speos.research.seg1Li3': { fr: 'Standards de compliance élevés (RGPD, traçabilité)', nl: 'Hoge compliance-standaarden (GDPR, traceerbaarheid)', en: 'High compliance standards (GDPR, traceability)' },
    'speos.research.seg1Name': { fr: 'Large Accounts', nl: 'Large Accounts', en: 'Large Accounts' },
    'speos.research.seg1Sig': { fr: 'Signature · solutions complexes, compliance haute', nl: 'Handtekening · complexe oplossingen, hoge compliance', en: 'Signature · complex solutions, high compliance' },
    'speos.research.seg2Country': { fr: 'Segment 02 · Easy2Mail', nl: 'Segment 02 · Easy2Mail', en: 'Segment 02 · Easy2Mail' },
    'speos.research.seg2Li1': { fr: 'Avocats, syndicats, cabinets médicaux, PME', nl: 'Advocaten, syndicaten, dokterskabinetten, KMO', en: 'Lawyers, unions, medical practices, SMEs' },
    'speos.research.seg2Li2': { fr: 'Volumes faibles, besoin d\'autonomie immédiate', nl: 'Lage volumes, behoefte aan onmiddellijke autonomie', en: 'Low volumes, need for immediate autonomy' },
    'speos.research.seg2Li3': { fr: 'Potentiel d\'adoption digitale élevé', nl: 'Hoog digitaal adoptiepotentieel', en: 'High digital adoption potential' },
    'speos.research.seg2Name': { fr: 'PMEs & professions', nl: 'KMO & beroepen', en: 'SMEs & professions' },
    'speos.research.seg2Sig': { fr: 'Signature · standardisation, automatisation, self-service', nl: 'Handtekening · standaardisatie, automatisering, self-service', en: 'Signature · standardisation, automation, self-service' },
    'speos.research.seg3Country': { fr: 'Segment 03 · Channel', nl: 'Segment 03 · Channel', en: 'Segment 03 · Channel' },
    'speos.research.seg3Li1': { fr: 'Intégrateurs métier qui distribuent les services SPEOS', nl: 'Domein-integrators die de SPEOS-diensten verdelen', en: 'Domain integrators who distribute the SPEOS services' },
    'speos.research.seg3Li2': { fr: 'API et white-label comme conditions d\'entrée', nl: 'API en white-label als toegangsvoorwaarden', en: 'API and white-label as entry conditions' },
    'speos.research.seg3Li3': { fr: 'Levier de croissance hors grand-compte historique', nl: 'Groeihefboom buiten de historische key account', en: 'Growth lever beyond the historical key account' },
    'speos.research.seg3Name': { fr: 'Integrators & resellers', nl: 'Integrators & resellers', en: 'Integrators & resellers' },
    'speos.research.seg3Sig': { fr: 'Signature · partenaires, services SPEOS embarqués', nl: 'Handtekening · partners, SPEOS-diensten ingebed', en: 'Signature · partners, embedded SPEOS services' },
    'speos.snm.a1': { fr: '10 Pain Points · friction Business ↔ IT', nl: '10 Pain Points · wrijving Business ↔ IT', en: '10 Pain Points · Business ↔ IT friction' },
    'speos.snm.a3': { fr: 'AS-IS journey · processus séparés', nl: 'AS-IS journey · gescheiden processen', en: 'AS-IS journey · separate processes' },
    'speos.snm.a4': { fr: 'Ateliers cocréation · Could-Be unifié', nl: 'Co-creatie workshops · verenigde Could-Be', en: 'Co-creation workshops · unified Could-Be' },
    'speos.snm.c1': { fr: 'Concept Report 76 pages · sponsor go prod', nl: 'Concept Report 76 pagina\'s · sponsor go prod', en: 'Concept Report 76 pages · sponsor go prod' },
    'speos.snm.c2': { fr: 'Alignement Project Owners ⊥ Project Managers', nl: 'Alignement Project Owners ⊥ Project Managers', en: 'Alignment Project Owners ⊥ Project Managers' },
    'speos.snm.c3': { fr: 'Outcome · 6 clients valid · go prod sponsor', nl: 'Outcome · 6 klanten valid · go prod sponsor', en: 'Outcome · 6 clients valid · go prod sponsor' },
    'speos.snm.c4': { fr: 'Lessons · traducteur · bébé en main', nl: 'Lessons · vertaler · kindje in de hand', en: 'Lessons · translator · baby in hand' },
    'speos.snm.cChap': { fr: 'Livrable · ouverture post-DD', nl: 'Livrable · post-DD opening', en: 'Deliverable · post-DD opening' },
    'speos.snm.cTW': { fr: 'Triple-Win · Customer · Business · Tech', nl: 'Triple-Win · Customer · Business · Tech', en: 'Triple-Win · Customer · Business · Tech' },
    'speos.snm.gAnalyse': { fr: 'Analyse', nl: 'Analyse', en: 'Analysis' },
    'speos.snm.gConceptReport': { fr: 'Report', nl: 'Report', en: 'Report' },
    'speos.snm.gIdeation': { fr: 'Ideation', nl: 'Ideation', en: 'Ideation' },
    'speos.snm.gIntake': { fr: 'Intake', nl: 'Intake', en: 'Intake' },
    'speos.snm.gPrototype': { fr: 'Prototype', nl: 'Prototype', en: 'Prototype' },
    'speos.snm.gResearch': { fr: 'Research', nl: 'Research', en: 'Research' },
    'speos.snm.gValueProp': { fr: 'VP', nl: 'VP', en: 'VP' },
    'speos.snm.iChap': { fr: 'Phase 03 · Ideation · ouverture D2', nl: 'Fase 03 · Ideation · opening D2', en: 'Phase 03 · Ideation · D2 opening' },
    'speos.snm.intakeRoadmap': { fr: 'Roadmap méthodologique', nl: 'Methodologische roadmap', en: 'Methodological roadmap' },
    'speos.snm.intakeTip': { fr: 'Brief intake · cadre du projet', nl: 'Brief intake · projectkader', en: 'Brief intake · project frame' },
    'speos.snm.p1': { fr: 'Direction prototype · siloed vs one-stop', nl: 'Prototyperichting · siloed vs one-stop', en: 'Prototype direction · siloed vs one-stop' },
    'speos.snm.p2': { fr: '3 segments × 1 host commun · wall d\'atelier', nl: '3 segmenten × 1 gemeenschappelijke host · workshopmuur', en: '3 segments × 1 common host · workshop wall' },
    'speos.snm.p4': { fr: 'User test 6 clients dont Luminus · go prod', nl: 'User test 6 klanten waaronder Luminus · go prod', en: 'User test 6 clients including Luminus · go prod' },
    'speos.snm.pVp1': { fr: 'VP 01 · Onboarding IT-less', nl: 'VP 01 · IT-less onboarding', en: 'VP 01 · IT-less onboarding' },
    'speos.snm.pVp2': { fr: 'VP 02 · Monitoring temps réel', nl: 'VP 02 · Real-time monitoring', en: 'VP 02 · Real-time monitoring' },
    'speos.snm.pVp3': { fr: 'VP 03 + 04 · Reports & Billing', nl: 'VP 03 + 04 · Reports & Billing', en: 'VP 03 + 04 · Reports & Billing' },
    'speos.snm.pVp5': { fr: 'VP 05 · Support self-service', nl: 'VP 05 · Self-service support', en: 'VP 05 · Self-service support' },
    'speos.snm.pPhase2': { fr: 'Hors MVP · expansion + marketplace API', nl: 'Buiten MVP · expansie + marketplace API', en: 'Out of MVP · expansion + API marketplace' },
    'speos.snm.r1': { fr: '12 expert interviews internes', nl: '12 interne expertinterviews', en: '12 internal expert interviews' },
    'speos.snm.r2': { fr: '6 customer interviews externes', nl: '6 externe klanteninterviews', en: '6 external customer interviews' },
    'speos.snm.r3': { fr: 'Benchmark · 3 segments marché', nl: 'Benchmark · 3 marktsegmenten', en: 'Benchmark · 3 market segments' },
    'speos.snm.r4': { fr: '10 personas testés · 8 archétypes', nl: '10 geteste persona\'s · 8 archetypes', en: '10 tested personas · 8 archetypes' },
    'speos.snm.vp': { fr: 'Proposition de valeur · cristallisation D1', nl: 'Value proposition · kristallisatie D1', en: 'Value proposition · D1 crystallisation' },
    'speos.triplewin.c1.h': { fr: 'Une porte, pas cinq.', nl: 'Eén deur, geen vijf.', en: 'One door, not five.' },
    'speos.triplewin.c1.p': {
      fr: 'Large Accounts (built2mail), PME (easy2mail), Integrators. Trois segments, trois entrées dans la même plateforme. Onboarding piloté par persona, autonomie self-service, audit-ready par défaut. Le client arrête de jongler entre les apps.',
      nl: 'Large Accounts (built2mail), KMO (easy2mail), Integrators. Drie segmenten, drie ingangen op hetzelfde platform. Onboarding gestuurd per persona, self-service autonomie, audit-ready by default. De klant stopt met jongleren tussen apps.',
      en: 'Large Accounts (built2mail), SMEs (easy2mail), Integrators. Three segments, three entries into the same platform. Persona-driven onboarding, self-service autonomy, audit-ready by default. The client stops juggling between apps.'
    },
    'speos.triplewin.c1.who': { fr: 'Customer · 3 segments', nl: 'Customer · 3 segmenten', en: 'Customer · 3 segments' },
    'speos.triplewin.c2.h': { fr: 'Nouveau segment capté, position défendue.', nl: 'Nieuw segment veroverd, positie verdedigd.', en: 'New segment captured, position defended.' },
    'speos.triplewin.c2.p': {
      fr: 'Le pricing tiered ouvre le segment PME laissé aux concurrents agiles. Le multicanal print et digital sans couture libère SPEOS de la dépendance au volume papier. La position de leader compliance se consolide à l\'approche du mandate B2B 2026.',
      nl: 'De tiered pricing opent het KMO-segment dat aan wendbare concurrenten was overgelaten. Het multichannel print en digital zonder naad bevrijdt SPEOS van de afhankelijkheid van papiervolume. De compliance-leiderspositie consolideert in aanloop naar het B2B-mandaat 2026.',
      en: 'Tiered pricing opens the SME segment left to agile competitors. The seamless print and digital multichannel frees SPEOS from paper-volume dependence. The compliance leadership position consolidates as the 2026 B2B mandate approaches.'
    },
    'speos.triplewin.c2.who': { fr: 'Business · SPEOS Group', nl: 'Business · SPEOS Group', en: 'Business · SPEOS Group' },
    'speos.triplewin.c3.h': { fr: 'Une stack, pas cinq.', nl: 'Eén stack, geen vijf.', en: 'One stack, not five.' },
    'speos.triplewin.c3.p': {
      fr: 'L\'orchestration remplace les silos hérités. API-fication par couche, pipeline observable, fallback automatique entre canaux. L\'IT maintient une plateforme, plus cinq dettes héritées.',
      nl: 'Orchestratie vervangt de overgeërfde silo\'s. API-isatie per laag, observeerbare pipeline, automatische fallback tussen kanalen. IT onderhoudt één platform, geen vijf overgeërfde schulden meer.',
      en: 'Orchestration replaces the inherited silos. API-isation per layer, observable pipeline, automatic fallback between channels. IT maintains one platform, no longer five inherited debts.'
    },
    'speos.triplewin.c3.who': { fr: 'Tech · IT & Engineering', nl: 'Tech · IT & Engineering', en: 'Tech · IT & Engineering' },

    /* === VALUE PROPOSITION CONTENT (sprint 2 · 2026-05-08) · triptyque sortie diamant 1 === */
    'speos.snm.vpContent': { fr: 'VP déballée · posture · personas · pain→VP', nl: 'VP uitgepakt · houding · persona\'s · pain→VP', en: 'VP unpacked · posture · personas · pain→VP' },
    'speos.vp.eyebrow': { fr: 'Le contrat de valeur', nl: 'Het waardecontract', en: 'The value contract' },
    'speos.vp.title': {
      fr: 'Une plateforme, ce n\'est pas <span class="accent">cinq portes d\'entrée.</span><br>C\'est une orchestration qui se règle sur le persona devant elle.',
      nl: 'Een platform is geen <span class="accent">vijf toegangsdeuren.</span><br>Het is een orkestratie die zich afstemt op de persona ervoor.',
      en: 'A platform is not <span class="accent">five entry doors.</span><br>It is an orchestration that tunes itself to the persona in front of it.'
    },
    'speos.vp.lede': {
      fr: 'Avant · POs voulaient des features, PMs une stack, les clients cinq logins. Après · <strong>un host orchestré · 10 douleurs → 5 livrables MVP + 6 MVP++</strong>.',
      nl: 'Vóór · POs wilden features, PMs een stack, klanten vijf logins. Daarna · <strong>een georchestreerde host · 10 pijnen → 5 MVP-livrables + 6 MVP++</strong>.',
      en: 'Before · POs wanted features, PMs a stack, clients five logins. After · <strong>an orchestrated host · 10 pains → 5 MVP deliverables + 6 MVP++</strong>.'
    },
    'speos.vp.posture.h': { fr: 'La posture', nl: 'De houding', en: 'The posture' },
    'speos.vp.posture.claim': {
      fr: 'Pas une plateforme par segment. <span class="accent">Une plateforme orchestrée.</span>',
      nl: 'Geen platform per segment. <span class="accent">Eén georchestreerd platform.</span>',
      en: 'Not a platform per segment. <span class="accent">An orchestrated platform.</span>'
    },
    'speos.vp.posture.l1': { fr: '<strong>Pas</strong> 5 produits avec 5 logins, 5 back-offices, 5 supports.', nl: '<strong>Geen</strong> 5 producten met 5 logins, 5 back-offices, 5 supports.', en: '<strong>Not</strong> 5 products with 5 logins, 5 back-offices, 5 supports.' },
    'speos.vp.posture.l2': { fr: '<strong>Un host one-stop</strong> avec onboarding piloté par persona et typologie.', nl: '<strong>Eén one-stop host</strong> met onboarding gestuurd door persona en typologie.', en: '<strong>One one-stop host</strong> with onboarding driven by persona and typology.' },
    'speos.vp.posture.l3': { fr: '<strong>Capacités API-isées</strong> partagées par les 3 segments en dessous.', nl: '<strong>API-ised capabilities</strong> gedeeld door de 3 segmenten eronder.', en: '<strong>API-ised capabilities</strong> shared by the 3 segments below.' },
    'speos.vp.posture.l4': { fr: '<strong>Print et digital</strong> sans couture, fallback automatique multi-canal.', nl: '<strong>Print en digital</strong> zonder naad, automatische multichannel fallback.', en: '<strong>Print and digital</strong> without seams, automatic multi-channel fallback.' },
    'speos.vp.posture.l5': { fr: '<strong>Compliance ready</strong> pour les exigences B2G de demain.', nl: '<strong>Compliance ready</strong> voor de B2G-eisen van morgen.', en: '<strong>Compliance ready</strong> for tomorrow\'s B2G requirements.' },
    'speos.vp.posture.src': { fr: 'Source · Concept Report SPEOS 2024 · slide « VP statement » verbatim', nl: 'Bron · Concept Report SPEOS 2024 · slide « VP statement » verbatim', en: 'Source · SPEOS Concept Report 2024 · slide "VP statement" verbatim' },
    'speos.vp.persona.h': { fr: 'Les 2 personas qui décident', nl: 'De 2 persona\'s die beslissen', en: 'The 2 personas who decide' },
    'speos.vp.persona.claim': {
      fr: '10 personas testés terrain · 8 archétypes synthétisés. <span class="accent">Voici 2 d\'entre eux, illustratifs.</span>',
      nl: '10 op het terrein geteste persona\'s · 8 gesynthetiseerde archetypes. <span class="accent">Hier zijn er 2, ter illustratie.</span>',
      en: '10 field-tested personas · 8 synthesised archetypes. <span class="accent">Here are 2 of them, as illustration.</span>'
    },
    'speos.vp.persona.p1': {
      fr: '<strong>Nicolas</strong> · 45 ans · Responsable Opérations Documentaires · grand compte Énergie<br><em>« Un bon outil, c\'est un outil invisible quand tout va bien, et clair quand ça va mal. »</em>',
      nl: '<strong>Nicolas</strong> · 45 jaar · Verantwoordelijke Documentaire Operaties · grote energie-account<br><em>« Een goed tool is een tool dat onzichtbaar is als alles goed gaat, en duidelijk als er iets misgaat. »</em>',
      en: '<strong>Nicolas</strong> · 45 · Document Operations Manager · large Energy account<br><em>"A good tool is invisible when everything works, and clear when something breaks."</em>'
    },
    'speos.vp.persona.p2': {
      fr: '<strong>Moustafa</strong> · 62 ans · Expert Impression &amp; Archivage · grand compte Énergie<br><em>« Pas un produit cool. Un cockpit ultra-fiable pour piloter ses documents. »</em>',
      nl: '<strong>Moustafa</strong> · 62 jaar · Expert Print &amp; Archivering · grote energie-account<br><em>« Geen cool product. Een ultra-betrouwbare cockpit om zijn documenten te piloteren. »</em>',
      en: '<strong>Moustafa</strong> · 62 · Print &amp; Archiving Expert · large Energy account<br><em>"Not a cool product. An ultra-reliable cockpit to pilot his documents."</em>'
    },
    'speos.vp.persona.hint': {
      fr: 'Trois <strong>jobs-to-be-done</strong> partagés : reprendre la main, réduire les zones d\'ombre, disposer d\'outils calés sur leurs horaires (support 5h30) et leurs enjeux compliance.',
      nl: 'Drie gedeelde <strong>jobs-to-be-done</strong>: opnieuw greep krijgen, schaduwzones verkleinen, tools hebben afgestemd op hun uren (support vanaf 5u30) en hun compliance-uitdagingen.',
      en: 'Three shared <strong>jobs-to-be-done</strong>: take back control, reduce blind spots, have tools tuned to their hours (support from 5:30am) and their compliance stakes.'
    },
    'speos.vp.translate.h': { fr: '10 douleurs → 11 chances → 5 VPs MVP', nl: '10 pijnen → 11 kansen → 5 MVP VPs', en: '10 pains → 11 chances → 5 MVP VPs' },
    'speos.vp.translate.claim': {
      fr: 'La mécanique du Concept Report verbatim. <span class="accent">Les 10 pain points produisent 11 opportunités, dont 5 livrables sont scopés MVP, 6 placés MVP++.</span>',
      nl: 'De mechaniek van het Concept Report verbatim. <span class="accent">De 10 pain points produceren 11 opportuniteiten, waarvan 5 livrables in MVP-scope, 6 in MVP++.</span>',
      en: 'The verbatim mechanics of the Concept Report. <span class="accent">The 10 pain points produce 11 opportunities; 5 are scoped MVP, 6 placed MVP++.</span>'
    },
    'speos.vp.translate.colPain': { fr: '10 Pain Points', nl: '10 Pain Points', en: '10 Pain Points' },
    'speos.vp.translate.colVp': { fr: '5 VPs MVP livrées', nl: '5 MVP VPs geleverd', en: '5 MVP VPs delivered' },
    'speos.vp.translate.r1n': { fr: '1. Time-to-Market Delays', nl: '1. Time-to-Market Delays', en: '1. Time-to-Market Delays' },
    'speos.vp.translate.r1v': { fr: '<strong>VP 01 Onboarding</strong> · IT-less', nl: '<strong>VP 01 Onboarding</strong> · IT-less', en: '<strong>VP 01 Onboarding</strong> · IT-less' },
    'speos.vp.translate.r2n': { fr: '2. Lack of Automation', nl: '2. Lack of Automation', en: '2. Lack of Automation' },
    'speos.vp.translate.r2v': { fr: 'VP 01 Onboarding', nl: 'VP 01 Onboarding', en: 'VP 01 Onboarding' },
    'speos.vp.translate.r3n': { fr: '3. Customer Autonomy', nl: '3. Customer Autonomy', en: '3. Customer Autonomy' },
    'speos.vp.translate.r3v': { fr: '<strong>VP 02 Monitoring</strong> · real-time', nl: '<strong>VP 02 Monitoring</strong> · real-time', en: '<strong>VP 02 Monitoring</strong> · real-time' },
    'speos.vp.translate.r4n': { fr: '4. Tool Complexity', nl: '4. Tool Complexity', en: '4. Tool Complexity' },
    'speos.vp.translate.r4v': { fr: '<strong>VP 03 Reports &amp; Archives</strong>', nl: '<strong>VP 03 Reports &amp; Archives</strong>', en: '<strong>VP 03 Reports &amp; Archives</strong>' },
    'speos.vp.translate.r5n': { fr: '5. Lack of Proactivity', nl: '5. Lack of Proactivity', en: '5. Lack of Proactivity' },
    'speos.vp.translate.r5v': { fr: 'VP 02 Monitoring', nl: 'VP 02 Monitoring', en: 'VP 02 Monitoring' },
    'speos.vp.translate.r6n': { fr: '6. Gaps in Digital', nl: '6. Gaps in Digital', en: '6. Gaps in Digital' },
    'speos.vp.translate.r6v': { fr: 'VP 03 Reports', nl: 'VP 03 Reports', en: 'VP 03 Reports' },
    'speos.vp.translate.r7n': { fr: '7. Service Rigidity', nl: '7. Service Rigidity', en: '7. Service Rigidity' },
    'speos.vp.translate.r7v': { fr: '<strong>VP 05 Support</strong> · self-service', nl: '<strong>VP 05 Support</strong> · self-service', en: '<strong>VP 05 Support</strong> · self-service' },
    'speos.vp.translate.r8n': { fr: '8. Competitive Pressure', nl: '8. Competitive Pressure', en: '8. Competitive Pressure' },
    'speos.vp.translate.r8v': { fr: 'VP 02 + VP 05', nl: 'VP 02 + VP 05', en: 'VP 02 + VP 05' },
    'speos.vp.translate.r9n': { fr: '9. Billing Complexity', nl: '9. Billing Complexity', en: '9. Billing Complexity' },
    'speos.vp.translate.r9v': { fr: '<strong>VP 04 Billing</strong> · tiered', nl: '<strong>VP 04 Billing</strong> · tiered', en: '<strong>VP 04 Billing</strong> · tiered' },
    'speos.vp.translate.r10n': { fr: '10. Expansion Challenges', nl: '10. Expansion Challenges', en: '10. Expansion Challenges' },
    'speos.vp.translate.r10v': { fr: '<em>placé MVP++</em>', nl: '<em>geplaatst MVP++</em>', en: '<em>placed in MVP++</em>' },
    'speos.vp.translate.mvpScope': {
      fr: '<strong>MVP / MVP++ scope.</strong> 5 livrables MVP couvrent les 6 phases du Customer Lifecycle. Les opportunités <em>Market Expansion</em> et <em>Marketplace API Integrators</em> sont scopées <strong>MVP++ phase 2</strong>, post-validation host one-stop.',
      nl: '<strong>MVP / MVP++ scope.</strong> 5 MVP-livrables dekken de 6 fasen van de Customer Lifecycle. De opportuniteiten <em>Market Expansion</em> en <em>Marketplace API Integrators</em> zijn gescoped <strong>MVP++ fase 2</strong>, na validatie van de one-stop host.',
      en: '<strong>MVP / MVP++ scope.</strong> 5 MVP deliverables cover the 6 phases of the Customer Lifecycle. The <em>Market Expansion</em> and <em>Marketplace API Integrators</em> opportunities are scoped <strong>MVP++ phase 2</strong>, post one-stop host validation.'
    },
    'speos.vp.bridgeText': {
      fr: 'Project Owners, Project Managers, Operations et Sales partagent la même phrase. <span class="accent">Socle commun signé.</span> L\'arbitrage passe du « quoi » au « quand ».',
      nl: 'Project Owners, Project Managers, Operations en Sales delen dezelfde zin. <span class="accent">Gemeenschappelijke basis getekend.</span> De arbitrage verschuift van « wat » naar « wanneer ».',
      en: 'Project Owners, Project Managers, Operations and Sales share the same sentence. <span class="accent">Shared foundation signed.</span> Arbitration moves from "what" to "when".'
    },
    'speos.vp.bridgeNext': {
      fr: 'Suite logique <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 2 directions explorées, une retenue',
      nl: 'Logisch vervolg <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 2 richtingen verkend, één behouden',
      en: 'Logical next <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 2 directions explored, one retained'
    },

    /* === SPRINT 3 · 2026-05-08 · Personas deep-dive + 11 Opportunities + Classic vs Best Practice + Brief context + Customer Interview Guide === */

    /* Brief mandat (refonte compte rendu sprint S1 · 2026-05-08) */
    'speos.brief.lead4': {
      fr: 'Mandat · poser la méthode Service Design, aligner Business et IT autour de l\'utilisateur, livrer un Concept Report défendable devant le sponsor et un MVP priorisé en user stories. Contexte technique · IT en bascule Agile, pas encore SAFe.',
      nl: 'Opdracht · de Service Design-methode neerleggen, Business en IT afstemmen rond de gebruiker, een sponsor-ready Concept Report en een MVP geprioriteerd in user stories opleveren. Technische context · IT in Agile-overgang, nog niet SAFe.',
      en: 'Mandate · lay down the Service Design method, align Business and IT around the user, deliver a sponsor-ready Concept Report and an MVP prioritised in user stories. Technical context · IT in Agile transition, not yet SAFe.'
    },

    /* Customer Interview Guide source-link */
    'speos.research.guideLab': { fr: 'Voir le guide d\'entretien client utilisé', nl: 'Het gebruikte klantinterviewgids bekijken', en: 'See the customer interview guide used' },
    'speos.research.guideRef': { fr: 'Customer Interview Guide · 22 questions · 6 thèmes (Background · Customer Journey · Pain Points · Automation · Billing · Recommendations)', nl: 'Customer Interview Guide · 22 vragen · 6 thema\'s (Background · Customer Journey · Pain Points · Automation · Billing · Recommendations)', en: 'Customer Interview Guide · 22 questions · 6 themes (Background · Customer Journey · Pain Points · Automation · Billing · Recommendations)' },

    /* Personas deep-dive Nicolas + Moustafa */
    'speos.research.deepdiveEyebrow': { fr: 'Deep-dive · 2 personas illustratifs', nl: 'Deep-dive · 2 illustratieve persona\'s', en: 'Deep-dive · 2 illustrative personas' },
    'speos.research.deepdiveHead': {
      fr: 'Sur les 10 testés terrain, <span class="accent">deux qui parlent à voix haute.</span>',
      nl: 'Van de 10 op het terrein geteste, <span class="accent">twee die hardop spreken.</span>',
      en: 'Out of the 10 field-tested, <span class="accent">two that speak out loud.</span>'
    },
    'speos.research.deepdiveP1Name': { fr: 'Nicolas · 45 ans', nl: 'Nicolas · 45 jaar', en: 'Nicolas · 45' },
    'speos.research.deepdiveP1Role': {
      fr: 'Responsable Opérations Documentaires · <span class="accent">grand compte Énergie</span>',
      nl: 'Verantwoordelijke Documentaire Operaties · <span class="accent">grote energie-account</span>',
      en: 'Document Operations Manager · <span class="accent">large Energy account</span>'
    },
    'speos.research.deepdiveP1Quote': {
      fr: '« Un bon outil, c\'est un outil invisible quand tout va bien, et clair quand ça va mal. »',
      nl: '« Een goed tool is een tool dat onzichtbaar is als alles goed gaat, en duidelijk als er iets misgaat. »',
      en: '"A good tool is invisible when everything works, and clear when something breaks."'
    },
    'speos.research.deepdiveP1Pain1': { fr: '<strong>Black box post-envoi</strong> · pas de visibilité après l\'envoi', nl: '<strong>Black box post-verzending</strong> · geen zichtbaarheid na de verzending', en: '<strong>Post-send black box</strong> · no visibility after sending' },
    'speos.research.deepdiveP1Pain2': { fr: '<strong>Drops sur &gt;10k volumes</strong> · le système qui lâche en gros volume', nl: '<strong>Drops bij &gt;10k volumes</strong> · het systeem haakt af in grote volumes', en: '<strong>Drops on &gt;10k volumes</strong> · system fails at high volume' },
    'speos.research.deepdiveP1Pain3': { fr: '<strong>Support lent matin</strong> · personne avant 8h, alors que ses batchs partent à 5h30', nl: '<strong>Trage ochtendsupport</strong> · niemand vóór 8u, terwijl zijn batches om 5u30 vertrekken', en: '<strong>Slow morning support</strong> · no one before 8am, while his batches leave at 5:30am' },
    'speos.research.deepdiveP1Pain4': { fr: '<strong>Erreurs génériques</strong> · debug à l\'aveugle, pas de message actionnable', nl: '<strong>Generieke fouten</strong> · blind debuggen, geen actionable bericht', en: '<strong>Generic errors</strong> · blind debug, no actionable message' },
    'speos.research.deepdiveP2Name': { fr: 'Moustafa · 62 ans', nl: 'Moustafa · 62 jaar', en: 'Moustafa · 62' },
    'speos.research.deepdiveP2Role': {
      fr: 'Expert Impression &amp; Archivage · <span class="accent">grand compte Énergie</span>',
      nl: 'Expert Print &amp; Archivering · <span class="accent">grote energie-account</span>',
      en: 'Print &amp; Archiving Expert · <span class="accent">large Energy account</span>'
    },
    'speos.research.deepdiveP2Quote': {
      fr: '« Pas un produit cool. Un cockpit ultra-fiable pour piloter ses documents. »',
      nl: '« Geen cool product. Een ultra-betrouwbare cockpit om zijn documenten te piloteren. »',
      en: '"Not a cool product. An ultra-reliable cockpit to pilot his documents."'
    },
    'speos.research.deepdiveP2Pain1': { fr: '<strong>Boîte noire</strong> · dépendance à un intermédiaire pour chaque debug', nl: '<strong>Zwarte doos</strong> · afhankelijkheid van een tussenpersoon voor elk debug', en: '<strong>Black box</strong> · dependency on an intermediary for every debug' },
    'speos.research.deepdiveP2Pain2': { fr: '<strong>Anxiété 5h30</strong> · le support n\'est pas joignable quand ça plante', nl: '<strong>Angst om 5u30</strong> · de support is niet bereikbaar wanneer het crasht', en: '<strong>5:30am anxiety</strong> · support unreachable when it crashes' },
    'speos.research.deepdiveP2Pain3': { fr: '<strong>Batchs bloquants</strong> · pas de retraitement partiel d\'un fichier raté', nl: '<strong>Blokkerende batches</strong> · geen gedeeltelijke herwerking van een mislukt bestand', en: '<strong>Blocking batches</strong> · no partial reprocessing of a failed file' },
    'speos.research.deepdiveP2Pain4': { fr: '<strong>Changements lents</strong> · même pour un logo ou un gabarit, c\'est des semaines', nl: '<strong>Trage wijzigingen</strong> · zelfs voor een logo of template, het zijn weken', en: '<strong>Slow changes</strong> · even for a logo or template, it takes weeks' },
    /* 11 Opportunities for Innovation */
    'speos.analyse.oppEyebrow': { fr: 'Phase 02 · Define · 11 opportunités', nl: 'Fase 02 · Define · 11 opportuniteiten', en: 'Phase 02 · Define · 11 opportunities' },
    'speos.analyse.oppTitle': {
      fr: 'Des douleurs <span class="accent">aux chances.</span>',
      nl: 'Van pijnen <span class="accent">naar kansen.</span>',
      en: 'From pains <span class="accent">to chances.</span>'
    },
    'speos.analyse.oppLead': {
      fr: '10 pain points reformulés en 11 opportunités. <strong>Cinq deviendront des Value Props livrables MVP, six placées MVP++ phase 2.</strong>',
      nl: '10 pain points geherformuleerd als 11 opportuniteiten. <strong>Vijf worden geleverde MVP Value Props, zes geplaatst in MVP++ fase 2.</strong>',
      en: '10 pain points reframed as 11 opportunities. <strong>Five become MVP Value Props, six placed in MVP++ phase 2.</strong>'
    },
    'speos.analyse.opp1Name': { fr: 'Enhanced Customer Experience', nl: 'Enhanced Customer Experience', en: 'Enhanced Customer Experience' },
    'speos.analyse.opp1Desc': { fr: 'Self-service, real-time tracking, personalized dashboards par segment.', nl: 'Self-service, real-time tracking, personalized dashboards per segment.', en: 'Self-service, real-time tracking, personalized dashboards per segment.' },
    'speos.analyse.opp2Name': { fr: 'Automation & Scalability', nl: 'Automation & Scalability', en: 'Automation & Scalability' },
    'speos.analyse.opp2Desc': { fr: 'Automate repetitive tasks, intégrations API, self-onboarding pour les SMEs.', nl: 'Automate repetitive tasks, API-integraties, self-onboarding voor KMO\'s.', en: 'Automate repetitive tasks, API integrations, self-onboarding for SMEs.' },
    'speos.analyse.opp3Name': { fr: 'Multi-Channel Integration', nl: 'Multi-Channel Integration', en: 'Multi-Channel Integration' },
    'speos.analyse.opp3Desc': { fr: 'Email, SMS, print unifiés. Fallback automatique si un canal échoue.', nl: 'Email, SMS, print verenigd. Automatische fallback als een kanaal faalt.', en: 'Email, SMS, print unified. Automatic fallback if a channel fails.' },
    'speos.analyse.opp4Name': { fr: 'Data-Driven Insights', nl: 'Data-Driven Insights', en: 'Data-Driven Insights' },
    'speos.analyse.opp4Desc': { fr: 'Reporting BI, behaviors clients analysés, sector-specific insights.', nl: 'BI-reporting, klantgedragingen geanalyseerd, sector-specifieke insights.', en: 'BI reporting, client behaviors analysed, sector-specific insights.' },
    'speos.analyse.opp5Name': { fr: 'Flexible Pricing Models', nl: 'Flexible Pricing Models', en: 'Flexible Pricing Models' },
    'speos.analyse.opp5Desc': { fr: 'Tiered Basic / Gold / Custom. Pay-as-you-go ou subscription pour les SMEs.', nl: 'Tiered Basic / Gold / Custom. Pay-as-you-go of abonnement voor KMO\'s.', en: 'Tiered Basic / Gold / Custom. Pay-as-you-go or subscription for SMEs.' },
    'speos.analyse.opp6Name': { fr: 'Market Expansion', nl: 'Market Expansion', en: 'Market Expansion' },
    'speos.analyse.opp6Desc': { fr: 'Multi-langue, multi-juridiction, conformité B2G adaptée pays par pays. <em>MVP++.</em>', nl: 'Multi-taal, multi-jurisdictie, B2G-conformiteit aangepast per land. <em>MVP++.</em>', en: 'Multi-language, multi-jurisdiction, country-by-country B2G compliance. <em>MVP++.</em>' },
    'speos.analyse.opp7Name': { fr: 'Proactive Customer Engagement', nl: 'Proactive Customer Engagement', en: 'Proactive Customer Engagement' },
    'speos.analyse.opp7Desc': { fr: 'Predictive analytics, alertes proactives avant que le client appelle.', nl: 'Predictive analytics, proactieve alerts voor de klant belt.', en: 'Predictive analytics, proactive alerts before the client calls.' },
    'speos.analyse.opp8Name': { fr: 'Standardization with Flexibility', nl: 'Standardization with Flexibility', en: 'Standardization with Flexibility' },
    'speos.analyse.opp8Desc': { fr: 'Templates réutilisables + modular add-ons pour Large Accounts.', nl: 'Herbruikbare templates + modulaire add-ons voor Large Accounts.', en: 'Reusable templates + modular add-ons for Large Accounts.' },
    'speos.analyse.opp9Name': { fr: 'Innovation in Product Offerings', nl: 'Innovation in Product Offerings', en: 'Innovation in Product Offerings' },
    'speos.analyse.opp9Desc': { fr: 'Consent management, drag-and-drop builders, payment integrations.', nl: 'Consent management, drag-and-drop builders, payment integraties.', en: 'Consent management, drag-and-drop builders, payment integrations.' },
    'speos.analyse.opp10Name': { fr: 'Unified Client Portal', nl: 'Unified Client Portal', en: 'Unified Client Portal' },
    'speos.analyse.opp10Desc': { fr: 'Tracking + billing + reporting + ticketing en un seul portail. Open API marketplace.', nl: 'Tracking + billing + reporting + ticketing in één portaal. Open API marketplace.', en: 'Tracking + billing + reporting + ticketing in one portal. Open API marketplace.' },
    'speos.analyse.opp11Name': { fr: 'Competitive Differentiation', nl: 'Competitive Differentiation', en: 'Competitive Differentiation' },
    'speos.analyse.opp11Desc': { fr: 'Advanced analytics, fallback mechanisms, positionnement « One Stop Shop ». <em>MVP++.</em>', nl: 'Advanced analytics, fallback mechanisms, positionering « One Stop Shop ». <em>MVP++.</em>', en: 'Advanced analytics, fallback mechanisms, "One Stop Shop" positioning. <em>MVP++.</em>' },
    /* Classic vs Best Practice tableau */
    'speos.method.compEyebrow': { fr: 'Le pitch initial · pourquoi un département UX', nl: 'De initiële pitch · waarom een UX-afdeling', en: 'The initial pitch · why a UX department' },
    'speos.method.compTitle': { fr: 'Classic <span class="accent">vs Best Practice.</span>', nl: 'Classic <span class="accent">vs Best Practice.</span>', en: 'Classic <span class="accent">vs Best Practice.</span>' },
    'speos.method.comp.colDim': { fr: 'Dimension', nl: 'Dimensie', en: 'Dimension' },
    'speos.method.comp.colClassic': { fr: 'Classic approach', nl: 'Classic approach', en: 'Classic approach' },
    'speos.method.comp.colBest': { fr: 'Best Practice (grands comptes belges · banking, energy, telecoms)', nl: 'Best Practice (grote Belgische accounts · banking, energy, telecoms)', en: 'Best Practice (large Belgian accounts · banking, energy, telecoms)' },
    'speos.method.comp.r1Dim': { fr: '<strong>Business (ROI)</strong>', nl: '<strong>Business (ROI)</strong>', en: '<strong>Business (ROI)</strong>' },
    'speos.method.comp.r1Classic': { fr: 'Define needs.', nl: 'Define needs.', en: 'Define needs.' },
    'speos.method.comp.r1Best': { fr: 'Work with UX to define expectations.', nl: 'Werkt met UX om verwachtingen te definiëren.', en: 'Work with UX to define expectations.' },
    'speos.method.comp.r2Dim': { fr: '<strong>IT (Technology)</strong>', nl: '<strong>IT (Technology)</strong>', en: '<strong>IT (Technology)</strong>' },
    'speos.method.comp.r2Classic': { fr: 'Implements solutions.', nl: 'Implementeert oplossingen.', en: 'Implements solutions.' },
    'speos.method.comp.r2Best': { fr: 'Focus on architecture & delivery.', nl: 'Focus op architectuur & delivery.', en: 'Focus on architecture & delivery.' },
    'speos.method.comp.r3Dim': { fr: '<strong>UX (Users)</strong>', nl: '<strong>UX (Users)</strong>', en: '<strong>UX (Users)</strong>' },
    'speos.method.comp.r3Classic': { fr: 'Rare or integrated into IT.', nl: 'Zeldzaam of in IT geïntegreerd.', en: 'Rare or integrated into IT.' },
    'speos.method.comp.r3Best': { fr: '<strong>Dedicated, cross-functional, strategic department.</strong>', nl: '<strong>Toegewijde, cross-functionele, strategische afdeling.</strong>', en: '<strong>Dedicated, cross-functional, strategic department.</strong>' },
    'speos.research.custEyebrow': {
      fr: 'Phase 01 · Discover · 6 clients pilotes',
      nl: 'Fase 01 · Discover · 6 pilootklanten',
      en: 'Phase 01 · Discover · 6 pilot clients'
    },
    'speos.research.custTitle': {
      fr: 'Six clients. <span class="accent">Trois segments.</span>',
      nl: 'Zes klanten. <span class="accent">Drie segmenten.</span>',
      en: 'Six clients. <span class="accent">Three segments.</span>'
    },
    'speos.research.custOutcome': {
      fr: 'Build-to-Mail · Easy2Mail · Channel <span class="brief-teaser__sep">·</span> deux comptes par segment <span class="brief-teaser__sep">·</span> 22 questions, 6 thèmes',
      nl: 'Build-to-Mail · Easy2Mail · Channel <span class="brief-teaser__sep">·</span> twee klanten per segment <span class="brief-teaser__sep">·</span> 22 vragen, 6 thema\'s',
      en: 'Build-to-Mail · Easy2Mail · Channel <span class="brief-teaser__sep">·</span> two accounts per segment <span class="brief-teaser__sep">·</span> 22 questions, 6 themes'
    },
    'speos.research.custLead': {
      fr: 'Les experts internes lisent l\'organisation. Les clients lisent le service tel qu\'il vit chez eux.',
      nl: 'De interne experts lezen de organisatie. De klanten lezen de dienst zoals die bij hen leeft.',
      en: 'Internal experts read the organisation. Clients read the service as they live it.'
    },
    'speos.research.custLead2': {
      fr: '<strong>Les six mêmes reviennent en user test final.</strong>',
      nl: '<strong>Dezelfde zes komen terug voor de finale user test.</strong>',
      en: '<strong>The same six return for the final user test.</strong>'
    },
    'speos.prototype.utOutcome': {
      fr: '<strong class="accent">6 / 6 valident</strong> la direction one-stop <span class="brief-teaser__sep">·</span> <strong class="accent">Score combiné 4,03 / 5</strong> <span class="brief-teaser__sep">·</span> <strong class="accent">NPS 9 / 10</strong>',
      nl: '<strong class="accent">6 / 6 valideren</strong> de one-stop richting <span class="brief-teaser__sep">·</span> <strong class="accent">Gecombineerde score 4,03 / 5</strong> <span class="brief-teaser__sep">·</span> <strong class="accent">NPS 9 / 10</strong>',
      en: '<strong class="accent">6 / 6 validate</strong> the one-stop direction <span class="brief-teaser__sep">·</span> <strong class="accent">Combined score 4.03 / 5</strong> <span class="brief-teaser__sep">·</span> <strong class="accent">NPS 9 / 10</strong>'
    },
    'speos.prototype.utScenA': {
      fr: 'Dashboard temps réel',
      nl: 'Real-time Dashboard',
      en: 'Real-time Dashboard'
    },
    'speos.prototype.utScenAClaim': {
      fr: 'Score combiné <span class="accent">4,4 / 5 — 88%</span>',
      nl: 'Gecombineerde score <span class="accent">4,4 / 5 — 88%</span>',
      en: 'Combined score <span class="accent">4.4 / 5 — 88%</span>'
    },
    'speos.prototype.utScenAL1': {
      fr: '<strong>Moustafa · 4,0 / 5</strong> · Simplicité, utilité, pertinence, qualité validées',
      nl: '<strong>Moustafa · 4,0 / 5</strong> · Eenvoud, nut, relevantie, kwaliteit gevalideerd',
      en: '<strong>Moustafa · 4.0 / 5</strong> · Simplicity, usefulness, relevance, quality validated'
    },
    'speos.prototype.utScenAL2': {
      fr: '<strong>Bogdan · 4,8 / 5</strong> · NPS 9/10 sur le scénario',
      nl: '<strong>Bogdan · 4,8 / 5</strong> · NPS 9/10 op het scenario',
      en: '<strong>Bogdan · 4.8 / 5</strong> · NPS 9/10 on the scenario'
    },
    'speos.prototype.utScenAL3': {
      fr: 'Scénario · déposer un gros lot via SFTP, suivre le traitement en direct',
      nl: 'Scenario · een grote batch indienen via SFTP, de verwerking live volgen',
      en: 'Scenario · submit a large batch via SFTP, follow processing live'
    },
    'speos.prototype.utScenB': {
      fr: 'Gestion des erreurs',
      nl: 'Foutbeheer',
      en: 'Error Handling'
    },
    'speos.prototype.utScenBClaim': {
      fr: 'Score combiné <span class="accent">4,1 / 5 — 82%</span>',
      nl: 'Gecombineerde score <span class="accent">4,1 / 5 — 82%</span>',
      en: 'Combined score <span class="accent">4.1 / 5 — 82%</span>'
    },
    'speos.prototype.utScenBL1': {
      fr: '<strong>Moustafa · 3,7 / 5</strong> · Réassurance basse (3,0) sur la décision rapide',
      nl: '<strong>Moustafa · 3,7 / 5</strong> · Lage geruststelling (3,0) bij de snelle beslissing',
      en: '<strong>Moustafa · 3.7 / 5</strong> · Low reassurance (3.0) on the quick decision'
    },
    'speos.prototype.utScenBL2': {
      fr: '<strong>Bogdan · 4,5 / 5</strong> · Simplicité et qualité maximales',
      nl: '<strong>Bogdan · 4,5 / 5</strong> · Maximale eenvoud en kwaliteit',
      en: '<strong>Bogdan · 4.5 / 5</strong> · Maximum simplicity and quality'
    },
    'speos.prototype.utScenBL3': {
      fr: 'Scénario · un fichier rejeté, isoler, retraiter, replacer sans bloquer le batch',
      nl: 'Scenario · een afgewezen bestand isoleren, opnieuw verwerken, herplaatsen zonder de batch te blokkeren',
      en: 'Scenario · an isolated rejected file, reprocess, replace without blocking the batch'
    },
    'speos.prototype.utScenC': {
      fr: 'Audit Trail / Traçabilité',
      nl: 'Audit Trail / Traceerbaarheid',
      en: 'Audit Trail / Traceability'
    },
    'speos.prototype.utScenCClaim': {
      fr: 'Score combiné <span class="accent">3,6 / 5 — 72%</span>',
      nl: 'Gecombineerde score <span class="accent">3,6 / 5 — 72%</span>',
      en: 'Combined score <span class="accent">3.6 / 5 — 72%</span>'
    },
    'speos.prototype.utScenCL1': {
      fr: '<strong>Moustafa · 3,2 / 5</strong> · Réassurance à 1 / 5 sur la valeur de preuve légale',
      nl: '<strong>Moustafa · 3,2 / 5</strong> · Geruststelling op 1 / 5 voor de juridische bewijswaarde',
      en: '<strong>Moustafa · 3.2 / 5</strong> · Reassurance at 1 / 5 on legal proof value'
    },
    'speos.prototype.utScenCL2': {
      fr: '<strong>Bogdan · 4,0 / 5</strong> · NPS toujours 9/10, mais zone à retravailler',
      nl: '<strong>Bogdan · 4,0 / 5</strong> · NPS nog steeds 9/10, maar zone om aan te scherpen',
      en: '<strong>Bogdan · 4.0 / 5</strong> · NPS still 9/10, but area to refine'
    },
    'speos.prototype.utScenCL3': {
      fr: 'Scénario · produire une preuve de dépôt à un service juridique deux semaines après l\'envoi',
      nl: 'Scenario · twee weken na verzending een bewijs van indiening leveren aan een juridische dienst',
      en: 'Scenario · produce a proof of submission to a legal department two weeks after sending'
    },
    'speos.prototype.utClientsHead': {
      fr: 'Les six clients pilotes en validation directionnelle',
      nl: 'De zes pilootklanten in directionele validatie',
      en: 'The six pilot clients in directional validation'
    },
    'hms.hero.location': {
      fr: 'Nivelles · Hybrid',
      nl: 'Nijvel · Hybrid',
      en: 'Nivelles · Hybrid'
    },
    'hms.hero.eyebrow': {
      fr: 'Service Design + UX/UI · Case 03',
      nl: 'Service Design + UX/UI · Case 03',
      en: 'Service Design + UX/UI · Case 03'
    },
    'hms.hero.h1.start': {
      fr: 'Trois plateformes legacy.',
      nl: 'Drie legacy-platformen.',
      en: 'Three legacy platforms.'
    },
    'hms.hero.h1.alt': {
      fr: 'Une culture à installer.',
      nl: 'Eén cultuur om te installeren.',
      en: 'A culture to install.'
    },
    'hms.hero.lead': {
      fr: 'Un an freelance pour réunifier eCatcher, M2Web et Talk2M sous une même expérience. À la sortie · 2 M€ débloqués pour la mise en production, et le sponsor monte d\'un grade.',
      nl: 'Eén jaar freelance om eCatcher, M2Web en Talk2M te verenigen onder één enkele ervaring. Bij vertrek · 2 M€ vrijgemaakt voor productie, en de sponsor stijgt een rang.',
      en: 'One freelance year to unify eCatcher, M2Web and Talk2M under one experience. On exit · €2M unlocked for production, and the sponsor moves up a grade.'
    },
    'hms.hero.attribution': {
      fr: 'Service Design + UX/UI Consultant · mandat un an · 2021 → 2022',
      nl: 'Service Design + UX/UI Consultant · mandaat één jaar · 2021 → 2022',
      en: 'Service Design + UX/UI Consultant · one-year mandate · 2021 → 2022'
    },
    'hms.hero.metaRole': {
      fr: 'Service Design + UX/UI · Freelance',
      nl: 'Service Design + UX/UI · Freelance',
      en: 'Service Design + UX/UI · Freelance'
    },
    'hms.hero.metaWhere': {
      fr: '12 mois · Nivelles + remote',
      nl: '12 maanden · Nijvel + remote',
      en: '12 months · Nivelles + remote'
    },
    'hms.brief.eyebrow': {
      fr: 'Le brief',
      nl: 'De brief',
      en: 'The brief'
    },
    'hms.brief.title': {
      fr: 'Industrial IoT mondial. <span class="accent">eCatcher, M2Web, Talk2M à réunifier.</span>',
      nl: 'Wereldwijde Industrial IoT. <span class="accent">eCatcher, M2Web, Talk2M te verenigen.</span>',
      en: 'Global Industrial IoT. <span class="accent">eCatcher, M2Web, Talk2M to unify.</span>'
    },
    /* CVE 2026-05-12 · TL;DR Hero · 4 questions du recruteur en 90 secondes (HMS) */
    'hms.tldr.eyebrow': { fr: 'En 90 secondes', nl: 'In 90 seconden', en: 'In 90 seconds' },
    'hms.tldr.l1': { fr: 'Le problème', nl: 'Het probleem', en: 'The problem' },
    'hms.tldr.l2': { fr: 'La tension', nl: 'De spanning', en: 'The tension' },
    'hms.tldr.l3': { fr: 'Ce que j\'ai fait', nl: 'Wat ik gedaan heb', en: 'What I did' },
    'hms.tldr.l4': { fr: 'Ce qui en est sorti', nl: 'Wat eruit kwam', en: 'What came out of it' },
    'hms.tldr.t1': {
      fr: 'Ewon vendait des routeurs industriels. IXON arrivait avec une plateforme cloud-native sur le même segment IIoT. Trois apps legacy (eCatcher, M2Web, Talk2M) à réunifier sans casser la base installée mondiale.',
      nl: 'Ewon verkocht industriële routers. IXON kwam aan met een cloud-native platform op hetzelfde IIoT-segment. Drie legacy apps (eCatcher, M2Web, Talk2M) te verenigen zonder de wereldwijde geïnstalleerde basis te breken.',
      en: 'Ewon sold industrial routers. IXON arrived with a cloud-native platform on the same IIoT segment. Three legacy apps (eCatcher, M2Web, Talk2M) to reunify without breaking the worldwide installed base.'
    },
    'hms.tldr.t2': {
      fr: 'R&D, produit, business, service après-vente, support · cinq départements, cinq lectures du client. Cinq voix à réunir dans la même salle.',
      nl: 'R&D, product, business, after-sales, support · vijf afdelingen, vijf lezingen van de klant. Vijf stemmen om in dezelfde kamer samen te brengen.',
      en: 'R&D, product, business, after-sales, support · five departments, five readings of the customer. Five voices to bring into the same room.'
    },
    'hms.tldr.t3': {
      fr: 'Douze mois. Tous les chefs de département autour de la table en ateliers Customer Journey. Heuristic Evaluation Nielsen sur les écrans. 8 machine builders testés sur 5 fuseaux horaires.',
      nl: 'Twaalf maanden. Alle afdelingshoofden rond de tafel in Customer Journey workshops. Heuristische Evaluatie Nielsen op de schermen. 8 machinebouwers getest in 5 tijdzones.',
      en: 'Twelve months. All department heads around the table in Customer Journey workshops. Nielsen Heuristic Evaluation on the screens. 8 machine builders tested across 5 time zones.'
    },
    'hms.tldr.t4': {
      fr: 'Le sponsor a porté le Concept Report en comité de direction. 2 M€ de budget débloqués pour la mise en prod. Le sponsor monte d\'un grade. Position leader défendue face à IXON.',
      nl: 'De sponsor bracht het Concept Report naar het directiecomité. 2 M€ budget vrijgemaakt voor productie. De sponsor klimt een graad. Leiderspositie verdedigd tegen IXON.',
      en: 'The sponsor brought the Concept Report to the executive committee. €2M budget unlocked for production rollout. The sponsor moves up a grade. Leader position defended against IXON.'
    },
    'hms.brief.lead1': {
      fr: 'Ewon by HMS Networks. Entité basée à Nivelles, en Belgique. Filiale d\'un groupe industriel suédois (Halmstad), leader européen de la communication industrielle. Quatre marques au total · Anybus, Ewon, Ixxat, Intesis.',
      nl: 'Ewon by HMS Networks. Entiteit gevestigd in Nijvel, België. Dochteronderneming van een Zweedse industriële groep (Halmstad), Europese leider in industriële communicatie. Vier merken in totaal · Anybus, Ewon, Ixxat, Intesis.',
      en: 'Ewon by HMS Networks. Entity based in Nivelles, Belgium. Subsidiary of a Swedish industrial group (Halmstad), European leader in industrial communication. Four brands in total · Anybus, Ewon, Ixxat, Intesis.'
    },
    'hms.brief.lead2': {
      fr: 'Trois plateformes legacy à réunifier · eCatcher (desktop), M2Web (web), Talk2M (cloud SaaS). Plateformes orientées back-office IT, sans self-onboarding ni design system en place. UX, UI et culture user-centric à installer en parallèle.',
      nl: 'Drie legacy-platformen om te verenigen · eCatcher (desktop), M2Web (web), Talk2M (cloud SaaS). Platformen gericht op IT-backoffice, zonder self-onboarding of design system. UX, UI en user-centric cultuur parallel op te bouwen.',
      en: 'Three legacy platforms to unify · eCatcher (desktop), M2Web (web), Talk2M (cloud SaaS). Platforms built for IT back-office, with no self-onboarding and no design system in place. UX, UI and user-centric culture to install in parallel.'
    },
    'hms.brief.lead4': {
      fr: 'Mandat · installer le Design Thinking, la culture utilisateur et la transformation numérique dans une organisation historiquement IT-first. Mettre tous les chefs de département autour de la table · R&D, produit, business · et faire émerger un Concept Report priorisé que le sponsor pouvait défendre devant le board.',
      nl: 'Mandaat · Design Thinking, gebruikerscultuur en digitale transformatie installeren in een historisch IT-first organisatie. Alle afdelingshoofden rond de tafel brengen · R&D, product, business · en een geprioriteerd Concept Report doen ontstaan dat de sponsor voor het bestuur kon verdedigen.',
      en: 'Mandate · install Design Thinking, user culture and digital transformation into a historically IT-first organisation. Bring all department heads to the table · R&D, product, business · and produce a prioritised Concept Report that the sponsor could defend to the board.'
    },
    'hms.brief.sizing': {
      fr: 'Mission freelance <span class="dot">·</span> 12 mois <span class="dot">·</span> 2021 → 2022 <span class="dot">·</span> Service Design + UX/UI Consultant',
      nl: 'Freelance opdracht <span class="dot">·</span> 12 maanden <span class="dot">·</span> 2021 → 2022 <span class="dot">·</span> Service Design + UX/UI Consultant',
      en: 'Freelance engagement <span class="dot">·</span> 12 months <span class="dot">·</span> 2021 → 2022 <span class="dot">·</span> Service Design + UX/UI Consultant'
    },
    'hms.brief.teaser': {
      fr: 'À la sortie · <strong class="accent">Concept Report priorisé</strong> validé sponsor <span class="brief-teaser__sep">·</span> <strong class="accent">design system prêt pour la production</strong> <span class="brief-teaser__sep">·</span> <strong class="accent">2 M€ débloqués</strong> pour la mise en prod.',
      nl: 'Bij vertrek · <strong class="accent">Geprioriteerd Concept Report</strong> goedgekeurd door sponsor <span class="brief-teaser__sep">·</span> <strong class="accent">design system klaar voor productie</strong> <span class="brief-teaser__sep">·</span> <strong class="accent">2 M€ vrijgemaakt</strong> voor productie.',
      en: 'On exit · <strong class="accent">Prioritised Concept Report</strong> sponsor-validated <span class="brief-teaser__sep">·</span> <strong class="accent">design system ready for production</strong> <span class="brief-teaser__sep">·</span> <strong class="accent">€2M unlocked</strong> for production.'
    },
    'hms.chapResearch.label': {
      fr: 'Phase 01 · Research',
      nl: 'Fase 01 · Research',
      en: 'Phase 01 · Research'
    },
    'hms.chapResearch.overline': {
      fr: 'Discover · Observe & Understand',
      nl: 'Discover · Observeren & Begrijpen',
      en: 'Discover · Observe & Understand'
    },
    'hms.chapResearch.ddCap': {
      fr: 'Vous êtes ici · Diamant 1 · moitié gauche · 4 jalons',
      nl: 'U bent hier · Diamant 1 · linkerhelft · 4 mijlpalen',
      en: 'You are here · Diamond 1 · left half · 4 milestones'
    },
    'hms.concept.delivEyebrow': {
      fr: 'Le livrable post-DD',
      nl: 'De post-DD oplevering',
      en: 'The post-DD deliverable'
    },
    'hms.concept.delivPagesLabel': {
      fr: 'pages structurées',
      nl: 'gestructureerde pagina\'s',
      en: 'structured pages'
    },
    'hms.concept.delivPhrase': {
      fr: 'CEO, CTO et équipes ont tout pour décider ensemble.',
      nl: 'CEO, CTO en teams hebben alles om samen te beslissen.',
      en: 'CEO, CTO and teams have everything to decide together.'
    },
    'hms.concept.delivSourceLab': {
      fr: 'Document complet disponible sur demande',
      nl: 'Volledig document beschikbaar op aanvraag',
      en: 'Full document available on request'
    },
    'hms.concept.delivSourceRef': {
      fr: 'HMS Strategic Process Proposal 14p + HMS Design Thinking Strategy 14p + Phoenix AS-IS & TO-BE 43p + Heuristic Evaluation 29 slides + Roadmap HMS 40p + 6 mockups Phoenix HD + 44 screens dashboard ingénieur.',
      nl: 'HMS Strategic Process Proposal 14p + HMS Design Thinking Strategy 14p + Phoenix AS-IS & TO-BE 43p + Heuristic Evaluation 29 slides + Roadmap HMS 40p + 6 Phoenix HD-mockups + 44 schermen engineer dashboard.',
      en: 'HMS Strategic Process Proposal 14p + HMS Design Thinking Strategy 14p + Phoenix AS-IS & TO-BE 43p + Heuristic Evaluation 29 slides + Roadmap HMS 40p + 6 Phoenix HD mockups + 44 engineer dashboard screens.'
    },
    'hms.concept.toc1Title': {
      fr: 'Introduction',
      nl: 'Introductie',
      en: 'Introduction'
    },
    'hms.concept.toc2Title': {
      fr: 'Stakeholder Map',
      nl: 'Stakeholder Map',
      en: 'Stakeholder Map'
    },
    'hms.concept.toc3Title': {
      fr: 'Segmentation & Personas',
      nl: 'Segmentatie & Persona\'s',
      en: 'Segmentation & Personas'
    },
    'hms.concept.toc4Title': {
      fr: 'Journey AS IS vs TO BE',
      nl: 'Journey AS IS vs TO BE',
      en: 'Journey AS IS vs TO BE'
    },
    'hms.concept.toc5Title': {
      fr: 'GAP Features · Goals · Questions',
      nl: 'GAP Features · Goals · Questions',
      en: 'GAP Features · Goals · Questions'
    },
    'hms.concept.toc6Title': {
      fr: 'Value Proposition',
      nl: 'Value Proposition',
      en: 'Value Proposition'
    },
    'hms.concept.toc7Title': {
      fr: 'User Stories',
      nl: 'User Stories',
      en: 'User Stories'
    },
    'hms.concept.toc8Title': {
      fr: 'Concept',
      nl: 'Concept',
      en: 'Concept'
    },
    'hms.concept.toc9Title': {
      fr: 'ULab Insights',
      nl: 'ULab Insights',
      en: 'ULab Insights'
    },
    'hms.concept.toc10Title': {
      fr: 'Prototype',
      nl: 'Prototype',
      en: 'Prototype'
    },
    'hms.concept.toc11Title': {
      fr: 'Next Step',
      nl: 'Next Step',
      en: 'Next Step'
    },
    'hms.outcome.eyebrow': {
      fr: 'À la sortie du parcours',
      nl: 'Aan het einde van het traject',
      en: 'At the end of the journey'
    },
    'hms.outcome.title': {
      fr: 'Pas un rapport de plus. <span class="accent">2 M€ débloqués pour la mise en prod.</span>',
      nl: 'Geen rapport erbij. <span class="accent">2 M€ vrijgemaakt voor productie.</span>',
      en: 'Not just another report. <span class="accent">€2M unlocked for production.</span>'
    },
    'hms.outcome.lead': {
      fr: 'Un an d\'accompagnement refermé sur un Concept Report priorisé, un design system prêt pour la production, et tous les flots et prototypes testés et notés. Le sponsor qui m\'avait engagé a présenté ce travail à sa direction. Résultat · 2 millions d\'euros de budget additionnel pour passer le concept en production, et une promotion personnelle.',
      nl: 'Eén jaar begeleiding afgesloten met een geprioriteerd Concept Report, een design system klaar voor productie, en alle flows en prototypes getest en gescoord. De sponsor die mij aanstelde, presenteerde dit werk aan zijn directie. Resultaat · 2 miljoen euro extra budget om het concept in productie te brengen, en een persoonlijke promotie.',
      en: 'One year of engagement closed with a prioritised Concept Report, a production-ready design system, and all flows and prototypes tested and scored. The sponsor who hired me presented this work to his leadership. Result · €2 million in additional budget to take the concept to production, and a personal promotion.'
    },
    'hms.outcome.d1.h': {
      fr: 'Concept Report priorisé, défendable devant le sponsor.',
      nl: 'Geprioriteerd Concept Report, verdedigbaar voor de sponsor.',
      en: 'Prioritised Concept Report, defensible before the sponsor.'
    },
    'hms.outcome.d1.p': {
      fr: 'Tous les futurs services priorisés via story mapping. Lecture transverse Business + R&D + Service après-vente. Le document que le sponsor a porté en comité de direction pour défendre l\'investissement.',
      nl: 'Alle toekomstige diensten geprioriteerd via story mapping. Transversale lezing Business + R&D + after-sales. Het document dat de sponsor naar het directiecomité bracht om de investering te verdedigen.',
      en: 'All future services prioritised via story mapping. Cross-functional reading Business + R&D + after-sales. The document the sponsor took to the executive committee to defend the investment.'
    },
    'hms.outcome.d2.h': {
      fr: 'Design system prêt prod.',
      nl: 'Design system productieklaar.',
      en: 'Production-ready design system.'
    },
    'hms.outcome.d2.p': {
      fr: 'Tokens, composants, patterns d\'interaction. Tous les flots et prototypes testés avec des clients réels, scorés sur Simplicité, Utilité, Pertinence, Réassurance, Qualité. Pas une intention de design system. Le matériel qui passe en sprints.',
      nl: 'Tokens, componenten, interactiepatronen. Alle flows en prototypes getest met echte klanten, gescoord op Eenvoud, Nut, Relevantie, Geruststelling, Kwaliteit. Geen intentie van design system. Het materiaal dat in sprints gaat.',
      en: 'Tokens, components, interaction patterns. All flows and prototypes tested with real customers, scored on Simplicity, Usefulness, Relevance, Reassurance, Quality. Not a design system intent. The material that goes into sprints.'
    },
    'hms.outcome.d3.h': {
      fr: 'Leadership marché défendu.',
      nl: 'Marktleiderschap verdedigd.',
      en: 'Market leadership defended.'
    },
    'hms.outcome.d3.p': {
      fr: 'Face à IXON, cloud-native néerlandais qui visait le même segment industrial IoT, Ewon a installé une posture user-centric défendable. Le toolkit est passé du fournisseur d\'outils techniques à l\'éditeur de plateforme. Position consolidée, pas érodée.',
      nl: 'Tegenover IXON, de Nederlandse cloud-native speler die hetzelfde industrial IoT-segment viseerde, heeft Ewon een verdedigbare user-centric houding aangenomen. De toolkit verschoof van leverancier van technische tools naar platform-uitgever. Positie verstevigd, niet uitgehold.',
      en: 'Against IXON, the Dutch cloud-native player targeting the same industrial IoT segment, Ewon established a defensible user-centric posture. The toolkit moved from supplier of technical tools to platform editor. Position consolidated, not eroded.'
    },
    'hms.outcome.integrity': {
      fr: '<strong>Note d\'intégrité.</strong> Le rollout production est passé en sprints Agile côté Ewon après mon départ.',
      nl: '<strong>Integriteitsnota.</strong> De productie-rollout liep in Agile sprints aan Ewon-zijde na mijn vertrek.',
      en: '<strong>Integrity note.</strong> Production rollout ran in Agile sprints on the Ewon side after my departure.'
    },
    'hms.lessons.eyebrow': {
      fr: 'Ce qu\'Ewon m\'a appris',
      nl: 'Wat Ewon me geleerd heeft',
      en: 'What Ewon taught me'
    },
    'hms.lessons.h2': {
      fr: 'Trois leviers <span class="accent">que je rejouerais.</span>',
      nl: 'Drie hefbomen <span class="accent">die ik opnieuw zou inzetten.</span>',
      en: 'Three levers <span class="accent">I would replay.</span>'
    },
    'hms.lessons.lead': {
      fr: 'Trois choix méthodologiques tiennent encore un an après. Mission tenue, budget décroché, utilisateur installé comme boussole.',
      nl: 'Drie methodologische keuzes houden één jaar later nog stand. Opdracht gehouden, budget binnen, gebruiker als kompas verankerd.',
      en: 'Three methodological choices still hold one year later. Mission held, budget secured, user installed as compass.'
    },
    'hms.lessons.l1.h': {
      fr: 'Le toolkit, pas l\'école.',
      nl: 'De toolkit, niet de school.',
      en: 'The toolkit, not the school.'
    },
    'hms.lessons.l1.p': {
      fr: 'Strategyzer, Customer Journey, Heuristic Evaluation Nielsen, Service Blueprint, Design Sprint, story mapping sont des outils du même Design System. La maîtrise, ce n\'est pas d\'en choisir un. C\'est de savoir lequel, à quel moment, avec qui dans la salle. Chez Ewon, Customer Journey workshops + Heuristic Evaluation Nielsen + framework Relevance/Simplicity/Consistency avaient le bon ratio narratif et précision pour faire converger trois plateformes legacy.',
      nl: 'Strategyzer, Customer Journey, Heuristic Evaluation Nielsen, Service Blueprint, Design Sprint, story mapping zijn tools van hetzelfde Design System. Meesterschap zit niet in het kiezen van één tool. Het zit in weten welke, wanneer, met wie in de zaal. Bij Ewon hadden Customer Journey workshops + Heuristic Evaluation Nielsen + framework Relevance/Simplicity/Consistency de juiste verhouding tussen narratief en precisie om drie legacy-platformen te laten samenkomen.',
      en: 'Strategyzer, Customer Journey, Heuristic Evaluation Nielsen, Service Blueprint, Design Sprint, story mapping are tools of the same Design System. Mastery isn\'t choosing one. It\'s knowing which, when, with whom in the room. At Ewon, Customer Journey workshops + Heuristic Evaluation Nielsen + Relevance/Simplicity/Consistency framework had the right narrative-to-precision ratio to make three legacy platforms converge.'
    },
    'hms.lessons.l2.h': {
      fr: 'Tous les chefs autour de la table, pas un seul.',
      nl: 'Alle leiders rond de tafel, niet één.',
      en: 'All leaders at the table, not one.'
    },
    'hms.lessons.l2.p': {
      fr: 'Une société purement IT n\'écoute pas un consultant qui parle au seul Product Manager. Ce qui a fait basculer Ewon · les ateliers Customer Journey ont réuni R&D, produit, business, service après-vente, support — tous les chefs de département dans la même salle. La Value Proposition n\'a pas été imposée par la direction. Elle est née de la table où chacun reconnaissait son client.',
      nl: 'Een puur IT-bedrijf luistert niet naar een consultant die enkel met de Product Manager praat. Wat Ewon heeft doen kantelen · de Customer Journey workshops brachten R&D, product, business, after-sales, support samen — alle afdelingshoofden in dezelfde zaal. De Value Proposition werd niet door de directie opgelegd. Ze ontstond aan de tafel waar iedereen zijn klant herkende.',
      en: 'A pure IT company doesn\'t listen to a consultant talking only to the Product Manager. What tipped Ewon over · the Customer Journey workshops brought together R&D, product, business, after-sales, support — all department heads in the same room. The Value Proposition wasn\'t imposed by leadership. It emerged at the table where each one recognised their customer.'
    },
    'hms.lessons.l3.h': {
      fr: 'Tester et scorer. Pas tester pour rassurer.',
      nl: 'Testen en scoren. Niet testen om te geruststellen.',
      en: 'Test and score. Not test to reassure.'
    },
    'hms.lessons.l3.p': {
      fr: 'Tous les flots et tous les prototypes ont été testés avec des clients internationaux et scorés. Un test qui ne donne pas un chiffre n\'est pas un test, c\'est un atelier de réassurance. Le scoring rend les arbitrages défendables en comité, et c\'est ce qui a permis au sponsor de transporter le travail jusqu\'au budget de production.',
      nl: 'Alle flows en alle prototypes zijn getest met internationale klanten en gescoord. Een test die geen cijfer geeft is geen test, het is een geruststellingsworkshop. Scoring maakt de afwegingen verdedigbaar in comité, en dat is wat de sponsor in staat stelde om het werk tot het productie-budget te dragen.',
      en: 'All flows and prototypes were tested with international customers and scored. A test that produces no number is not a test, it\'s a reassurance workshop. Scoring makes trade-offs defensible in committee, and that\'s what allowed the sponsor to carry the work all the way to the production budget.'
    },
    'hms.triplewin.eyebrow': {
      fr: 'L\'arbitre de chaque décision',
      nl: 'De scheidsrechter van elke beslissing',
      en: 'The arbiter of every decision'
    },
    'hms.triplewin.h2': {
      fr: 'Customer · Business · Tech. <span class="accent">Le triangle qui rejetait les fausses pistes.</span>',
      nl: 'Customer · Business · Tech. <span class="accent">De driehoek die valse pistes verwierp.</span>',
      en: 'Customer · Business · Tech. <span class="accent">The triangle that rejected false leads.</span>'
    },
    'hms.triplewin.lead': {
      fr: 'La plateforme ne tenait que si les trois sommets gagnaient. Une idée qui faisait gagner deux et perdre un était écartée. Pas de compromis, pas de moyenne. Trois critères, pas une moyenne.',
      nl: 'Het platform hield enkel stand als de drie toppen wonnen. Een idee dat er twee liet winnen en één liet verliezen werd verworpen. Geen compromis, geen gemiddelde. Drie criteria, geen gemiddelde.',
      en: 'The platform only held if the three vertices won. An idea that made two win and one lose was rejected. No compromise, no average. Three criteria, not an average.'
    },
    'hms.triplewin.claim': {
      fr: 'Toute idée qui ne validait pas les <span class="accent">trois sommets</span> était écartée. Trois critères, pas une moyenne.',
      nl: 'Elk idee dat de <span class="accent">drie toppen</span> niet valideerde werd verworpen. Drie criteria, geen gemiddelde.',
      en: 'Any idea that did not validate the <span class="accent">three vertices</span> was rejected. Three criteria, not an average.'
    },
    'hms.triplewin.c1.who': {
      fr: 'Customer · 3 segments',
      nl: 'Customer · 3 segmenten',
      en: 'Customer · 3 segments'
    },
    'hms.triplewin.c1.h': {
      fr: 'Une porte, pas cinq.',
      nl: 'Eén deur, geen vijf.',
      en: 'One door, not five.'
    },
    'hms.triplewin.c1.p': {
      fr: 'OEM Machine Builders, End-User Plants, Integrators. Trois segments, trois entrées dans la même plateforme. Onboarding piloté par persona industriel, autonomie self-service, audit-ready par défaut. Le client arrête de jongler entre eCatcher, M2Web et Talk2M.',
      nl: 'OEM Machine Builders, End-User Plants, Integrators. Drie segmenten, drie ingangen in hetzelfde platform. Onboarding gestuurd door industriële persona, self-service autonomie, audit-ready by default. De klant stopt met jongleren tussen eCatcher, M2Web en Talk2M.',
      en: 'OEM Machine Builders, End-User Plants, Integrators. Three segments, three entries into the same platform. Onboarding driven by industrial persona, self-service autonomy, audit-ready by default. The customer stops juggling between eCatcher, M2Web and Talk2M.'
    },
    'hms.triplewin.c2.who': {
      fr: 'Business · Ewon by HMS Networks',
      nl: 'Business · Ewon by HMS Networks',
      en: 'Business · Ewon by HMS Networks'
    },
    'hms.triplewin.c2.h': {
      fr: 'Nouveau segment capté, position défendue.',
      nl: 'Nieuw segment gevangen, positie verdedigd.',
      en: 'New segment captured, position defended.'
    },
    'hms.triplewin.c2.p': {
      fr: 'Le freemium cloud-native ouvre le segment End-User Plants laissé à IXON. Le portail unifié sur eCatcher, M2Web et Talk2M libère Ewon de la fragmentation legacy. La position de leader IIoT face aux pure players cloud-natives se consolide à l\'approche d\'une décennie de croissance industrial IoT.',
      nl: 'De cloud-native freemium opent het End-User Plants-segment dat IXON had laten liggen. Het verenigde portaal over eCatcher, M2Web en Talk2M bevrijdt Ewon van de legacy-fragmentatie. De IIoT-leiderspositie tegenover cloud-native pure players verstevigt zich aan de vooravond van een decennium industrial IoT-groei.',
      en: 'The cloud-native freemium opens the End-User Plants segment left to IXON. The unified portal across eCatcher, M2Web and Talk2M frees Ewon from legacy fragmentation. The IIoT leadership position against cloud-native pure players consolidates as a decade of industrial IoT growth approaches.'
    },
    'hms.triplewin.c3.who': {
      fr: 'Tech · IT & Engineering',
      nl: 'Tech · IT & Engineering',
      en: 'Tech · IT & Engineering'
    },
    'hms.triplewin.c3.h': {
      fr: 'Une stack, pas cinq.',
      nl: 'Eén stack, geen vijf.',
      en: 'One stack, not five.'
    },
    'hms.triplewin.c3.p': {
      fr: 'L\'orchestration remplace les silos hérités. API-fication par couche, pipeline observable, fallback automatique entre canaux. L\'IT maintient une plateforme, plus cinq dettes héritées.',
      nl: 'Orchestratie vervangt de geërfde silo\'s. Layered API-fication, observable pipeline, automatische fallback tussen kanalen. IT onderhoudt één platform, geen vijf geërfde schulden meer.',
      en: 'Orchestration replaces the legacy silos. Layered API-fication, observable pipeline, automatic fallback between channels. IT maintains one platform, not five inherited debts.'
    },
    /* CVE 2026-05-18 · hms.fin.line supprimé · cf. feedback_voix_pas_de_claim_aphorisme_fin_royale */
    'hms.fin.signature': {
      fr: 'Christophe van Engelen · Service Designer · Bruxelles',
      nl: 'Christophe van Engelen · Service Designer · Brussel',
      en: 'Christophe van Engelen · Service Designer · Brussels'
    },
    'hms.fin.contact.eyebrow': {
      fr: 'Une conversation ?',
      nl: 'Een gesprek?',
      en: 'A conversation?'
    },
    'hms.fin.contact.sub': {
      fr: 'Service designer · Bruxelles · 20+ ans cross-secteurs. Références Ewon disponibles sur demande pour un projet réel.',
      nl: 'Service designer · Brussel · 20+ jaar cross-sectoraal. Ewon-referenties op aanvraag beschikbaar voor een echt project.',
      en: 'Service designer · Brussels · 20+ years cross-sector. Ewon references available on request for a real project.'
    },
    'hms.fin.ps.label': {
      fr: 'Postscript · références',
      nl: 'Postscript · referenties',
      en: 'Postscript · references'
    },
    'hms.fin.ps.text': {
      fr: 'Références disponibles sur demande pour un projet réel. Les responsables managers Ewon des différents départements — R&D, produit, business, service après-vente, support — savent ce qui s\'est passé pendant ces douze mois. <span class="accent">C\'est ça, la matière du Service Design : des gens qui te rappellent.</span>',
      nl: 'Referenties op aanvraag beschikbaar voor een echt project. De Ewon-managers van de verschillende afdelingen — R&D, product, business, after-sales, support — weten wat er tijdens die twaalf maanden is gebeurd. <span class="accent">Dat is het materiaal van Service Design: mensen die je terugbellen.</span>',
      en: 'References available on request for a real project. The Ewon managers from the different departments — R&D, product, business, after-sales, support — know what happened during those twelve months. <span class="accent">That\'s the material of Service Design: people who call you back.</span>'
    },// 55 entries
    'hms.alignment.eyebrow': {
      fr: 'Stakeholder Map · Alignement',
      nl: 'Stakeholder Map · Afstemming',
      en: 'Stakeholder Map · Alignment'
    },
    'hms.alignment.h2': {
      fr: 'Comment Business et IT ont fini par <span class="accent">parler la même langue.</span>',
      nl: 'Hoe Business en IT uiteindelijk <span class="accent">dezelfde taal spraken.</span>',
      en: 'How Business and IT eventually <span class="accent">spoke the same language.</span>'
    },
    'hms.alignment.lead': {
      fr: '<strong>Deux formats d\'atelier ont fait le pont.</strong> Petits ateliers ciblés avec les Project Managers IT pour caler les arbitrages techniques. Grands ateliers Customer Journey avec toutes les parties prenantes pour mettre le client au centre, pas l\'org chart.',
      nl: '<strong>Twee workshopformaten hebben de brug geslagen.</strong> Kleine gerichte workshops met de IT Project Managers voor de technische afwegingen. Grote Customer Journey workshops met alle stakeholders om de klant centraal te zetten in plaats van het org chart.',
      en: '<strong>Two workshop formats bridged it.</strong> Small focused workshops with IT Project Managers to lock down technical trade-offs. Large Customer Journey workshops with all stakeholders to put the customer at the centre, not the org chart.'
    },
    'hms.alignment.f1.fn': {
      fr: 'Product Owner · Ewon Nivelles',
      nl: 'Product Owner · Ewon Nijvel',
      en: 'Product Owner · Ewon Nivelles'
    },
    'hms.alignment.f1.h': {
      fr: '« On perd les PME face à IXON. »',
      nl: '« We verliezen kmo\'s aan IXON. »',
      en: '« We\'re losing SMEs to IXON. »'
    },
    'hms.alignment.f1.p': {
      fr: 'Friction · IXON cloud-native captait les PME avec self-onboarding et freemium pendant qu\'Ewon vendait du routeur. Les Customer Journey workshops sur trois personas industriels ont remis le client au centre de l\'arbitrage, du technicien terrain au directeur d\'usine.',
      nl: 'Frictie · het cloud-native IXON ving de kmo\'s met self-onboarding en freemium terwijl Ewon routers verkocht. De Customer Journey workshops rond drie industriële persona\'s zetten de klant terug centraal in de afwegingen, van veldtechnicus tot fabrieksdirecteur.',
      en: 'Friction · cloud-native IXON was capturing SMEs with self-onboarding and freemium while Ewon was selling routers. The Customer Journey workshops on three industrial personas put the customer back at the centre of trade-offs, from field technician to plant director.'
    },
    'hms.alignment.f2.fn': {
      fr: 'Project Manager · IT · HMS Halmstad',
      nl: 'Project Manager · IT · HMS Halmstad',
      en: 'Project Manager · IT · HMS Halmstad'
    },
    'hms.alignment.f2.h': {
      fr: '« Trois plateformes, trois roadmaps. »',
      nl: '« Drie platformen, drie roadmaps. »',
      en: '« Three platforms, three roadmaps. »'
    },
    'hms.alignment.f2.p': {
      fr: 'Friction · arbitrer les budgets entre Anybus, Ewon, Intesis et Ixxat avec un IT historique en Angular. La Heuristic Evaluation Nielsen scorée sur eCatcher, M2Web et Talk2M a posé le gap chiffré qui a justifié le rattrapage.',
      nl: 'Frictie · budgetten afwegen tussen Anybus, Ewon, Intesis en Ixxat met een historische Angular IT-stack. De Heuristic Evaluation Nielsen gescoord op eCatcher, M2Web en Talk2M legde de becijferde gap vast die de inhaalbeweging rechtvaardigde.',
      en: 'Friction · arbitrating budgets between Anybus, Ewon, Intesis and Ixxat with a legacy Angular IT stack. The Heuristic Evaluation Nielsen scored on eCatcher, M2Web and Talk2M established the quantified gap that justified the catch-up.'
    },
    'hms.alignment.f3.fn': {
      fr: 'Project Lead · freelance',
      nl: 'Project Lead · freelance',
      en: 'Project Lead · freelance'
    },
    'hms.alignment.f3.h': {
      fr: '« Tenir le mandat sur douze mois. »',
      nl: '« Het mandaat twaalf maanden vasthouden. »',
      en: '« Hold the mandate over twelve months. »'
    },
    'hms.alignment.f3.p': {
      fr: 'Friction · garder R&D, produit, business et service après-vente autour de la même table sans dévier. Les frictions AS-IS plateforme par plateforme, le gap TO-BE mesuré, et le story mapping sprint Agile ont produit un Concept Report priorisé · 2 M€ obtenus en comité par le sponsor.',
      nl: 'Frictie · R&D, product, business en after-sales rond dezelfde tafel houden zonder af te wijken. De AS-IS frictie platform per platform, de gemeten TO-BE gap, en het story mapping Agile sprint hebben een geprioriteerd Concept Report opgeleverd · 2 M€ binnengehaald in comité door de sponsor.',
      en: 'Friction · keeping R&D, product, business and after-sales around the same table without drifting. The AS-IS friction per platform, the measured TO-BE gap, and Agile sprint story mapping produced a prioritised Concept Report · €2M secured in committee by the sponsor.'
    },
    'hms.alignment.f4.fn': {
      fr: 'UI & UX · Ewon interne',
      nl: 'UI & UX · Ewon intern',
      en: 'UI & UX · Ewon internal'
    },
    'hms.alignment.f4.h': {
      fr: '« Pas de design system, pas de librairie. »',
      nl: '« Geen design system, geen bibliotheek. »',
      en: '« No design system, no library. »'
    },
    'hms.alignment.f4.p': {
      fr: 'Friction · trois interfaces qui n\'avaient jamais parlé entre elles · desktop eCatcher, web M2Web, cloud SaaS Talk2M. Le prototypage unifié et les tests utilisateurs notés sur les trois plateformes ont validé les composants à transférer vers la librairie Angular de production.',
      nl: 'Frictie · drie interfaces die nooit met elkaar hadden gepraat · desktop eCatcher, web M2Web, cloud SaaS Talk2M. De verenigde prototyping en de op de drie platformen gescoorde user tests valideerden de componenten die naar de productie-Angular-bibliotheek konden worden overgedragen.',
      en: 'Friction · three interfaces that had never spoken to each other · desktop eCatcher, web M2Web, cloud SaaS Talk2M. Unified prototyping and user tests scored across the three platforms validated the components to transfer to the production Angular library.'
    },
    'hms.alignment.pivotOutcome': {
      fr: 'Quand les quatre rôles ont vu les mêmes machine builders au centre · pas le client abstrait, le technicien que les Project Owners avaient observé sur trois fuseaux horaires · le projet est devenu <strong class="accent">la plateforme de tout le monde</strong>. Vision alignée. Plus de débat sur le « si », un débat structuré sur le « quand » et le « comment ».',
      nl: 'Toen de vier rollen dezelfde machine builders centraal zagen staan · niet de abstracte klant, maar de technicus die de Project Owners hadden geobserveerd over drie tijdzones · werd het project <strong class="accent">het platform van iedereen</strong>. Visie afgestemd. Geen debat meer over het « of », een gestructureerd debat over het « wanneer » en het « hoe ».',
      en: 'When the four roles saw the same machine builders at the centre · not the abstract customer, but the technician the Project Owners had observed across three time zones · the project became <strong class="accent">everyone\'s platform</strong>. Vision aligned. No more debate on the « if », a structured debate on the « when » and the « how ».'
    },
    'hms.barriers.label': {
      fr: 'Pain points UX · 6 expert interviews + 8 customer interviews',
      nl: 'UX pain points · 6 expert interviews + 8 customer interviews',
      en: 'UX pain points · 6 expert interviews + 8 customer interviews'
    },
    'hms.vp.eyebrow': {
      fr: 'Le contrat de valeur',
      nl: 'Het waardecontract',
      en: 'The value contract'
    },
    'hms.vp.lede': {
      fr: '<strong>Un host orchestré, deux personas reconnus, dix douleurs traduites en cinq livrables MVP, six en MVP++.</strong>',
      nl: '<strong>Eén georkestreerde host, twee herkende persona\'s, tien pijnen vertaald in vijf MVP-leveringen, zes in MVP++.</strong>',
      en: '<strong>An orchestrated host, two recognised personas, ten pains translated into five MVP deliverables, six more in MVP++.</strong>'
    },
    'hms.vp.bridgeText': {
      fr: '<strong>Project Owners, Project Managers IT, Operations, Sales</strong> partagent la même phrase. L\'arbitrage passe du « quoi » au « quand » et au « comment ».',
      nl: '<strong>Project Owners, Project Managers IT, Operations, Sales</strong> delen dezelfde zin. Het arbitrage verschuift van het « wat » naar het « wanneer » en het « hoe ».',
      en: '<strong>Project Owners, Project Managers IT, Operations, Sales</strong> share the same sentence. Arbitration shifts from the "what" to the "when" and the "how".'
    },
    'hms.vp.bridgeNext': {
      fr: 'Suite logique <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 2 directions explorées, une retenue',
      nl: 'Logische volgende stap <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 2 verkende richtingen, één weerhouden',
      en: 'Logical next step <span class="vp-content__arrow">→</span> <strong>Ideation</strong> · Develop · 2 directions explored, one retained'
    },
    'hms.vp.persona.h': {
      fr: 'Les 2 personas qui décident',
      nl: 'De 2 persona\'s die beslissen',
      en: 'The 2 personas who decide'
    },
    'hms.vp.persona.claim': {
      fr: '10 personas testés terrain · 8 archétypes synthétisés. <span class="accent">Voici 2 d\'entre eux, illustratifs.</span>',
      nl: '10 persona\'s getest op het terrein · 8 archetypes gesynthetiseerd. <span class="accent">Hier zijn er 2 ter illustratie.</span>',
      en: '10 personas tested on the field · 8 archetypes synthesised. <span class="accent">Here are 2 of them, illustrative.</span>'
    },
    'hms.proposed.eyebrow': {
      fr: 'La roadmap proposée',
      nl: 'De voorgestelde roadmap',
      en: 'The proposed roadmap'
    },
    'hms.proposed.title': {
      fr: 'Comment j\'ai cadré <span class="accent">les douze mois.</span>',
      nl: 'Hoe ik <span class="accent">de twaalf maanden gekaderd heb.</span>',
      en: 'How I framed <span class="accent">the twelve months.</span>'
    },
    'hms.proposed.lead': {
      fr: 'De la friction Business ↔ IT à un MVP que tout le monde signe. Quatre actes méthodologiques, ateliers de co-création comme colonne vertébrale, customer focus comme boussole partagée.',
      nl: 'Van Business ↔ IT-frictie naar een MVP die iedereen ondertekent. Vier methodologische acten, co-creatie workshops als ruggegraat, customer focus als gedeeld kompas.',
      en: 'From Business ↔ IT friction to an MVP everyone signs. Four methodological acts, co-creation workshops as backbone, customer focus as shared compass.'
    },
    'hms.proposed.cap': {
      fr: 'MVP one-stop platform priorisé en user stories. Signé Project Owners, Project Managers IT, Operations, Sales. 8 machine builders valident. Sponsor go prod.',
      nl: 'One-stop platform MVP geprioriteerd in user stories. Ondertekend door Project Owners, Project Managers IT, Operations, Sales. 8 machinebouwers valideren. Sponsor go prod.',
      en: 'One-stop platform MVP prioritised in user stories. Signed by Project Owners, Project Managers IT, Operations, Sales. 8 machine builders validate. Sponsor go prod.'
    },
    'hms.proposed.storyEyebrow': {
      fr: 'Le fil conducteur · 4 phases × 4 jalons',
      nl: 'De rode draad · 4 fasen × 4 mijlpalen',
      en: 'The narrative thread · 4 phases × 4 milestones'
    },
    'hms.proposed.researchLi1': {
      fr: 'Interviews internes · CEO, CTO, experts 20+ ans',
      nl: 'Interne interviews · CEO, CTO, 20+ jaar experts',
      en: 'Internal interviews · CEO, CTO, 20+ years experts'
    },
    'hms.proposed.researchLi2': {
      fr: 'Interviews externes · grands comptes + petits comptes',
      nl: 'Externe interviews · grote accounts + kleine accounts',
      en: 'External interviews · large accounts + small accounts'
    },
    'hms.proposed.researchLi3': {
      fr: 'Segmentation marché · 3 segments clients',
      nl: 'Marktsegmentatie · 3 klantsegmenten',
      en: 'Market segmentation · 3 customer segments'
    },
    'hms.proposed.researchLi4': {
      fr: 'Personas aux manettes · par typologie',
      nl: 'Persona\'s aan het roer · per typologie',
      en: 'Personas at the helm · by typology'
    },
    'hms.proposed.analyseLi1': {
      fr: 'Cartographie friction Project Owners ↔ Project Managers',
      nl: 'Frictie cartografie Project Owners ↔ Project Managers',
      en: 'Friction mapping Project Owners ↔ Project Managers'
    },
    'hms.proposed.analyseLi2': {
      fr: 'AS-IS journey · processus séparés et bordéliques',
      nl: 'AS-IS journey · gescheiden en rommelige processen',
      en: 'AS-IS journey · separate and messy processes'
    },
    'hms.proposed.analyseLi3': {
      fr: 'Could-Be journey · plateforme unifiée',
      nl: 'Could-Be journey · verenigd platform',
      en: 'Could-Be journey · unified platform'
    },
    'hms.proposed.analyseLi4': {
      fr: 'Ateliers de co-création · alignement Business + IT',
      nl: 'Co-creatie workshops · Business + IT afstemming',
      en: 'Co-creation workshops · Business + IT alignment'
    },
    'hms.proposed.vpLab': {
      fr: 'Value Proposition · pont',
      nl: 'Value Proposition · brug',
      en: 'Value Proposition · bridge'
    },
    'hms.proposed.vpLi1': {
      fr: 'Plateforme host · one-stop shop',
      nl: 'Host platform · one-stop shop',
      en: 'Host platform · one-stop shop'
    },
    'hms.proposed.vpLi2': {
      fr: 'Onboarding piloté par objectif + besoins',
      nl: 'Onboarding gestuurd door doel + behoeften',
      en: 'Onboarding driven by goal + needs'
    },
    'hms.proposed.prototypeLi1': {
      fr: 'Host commun · couche unifiée',
      nl: 'Gemeenschappelijke host · verenigde laag',
      en: 'Common host · unified layer'
    },
    'hms.proposed.prototypeLi2': {
      fr: 'Spécificités par typologie de marché',
      nl: 'Specifieke kenmerken per markttypologie',
      en: 'Specifics by market typology'
    },
    'hms.proposed.prototypeLi3': {
      fr: 'Customisations par persona',
      nl: 'Aanpassingen per persona',
      en: 'Customisations per persona'
    },
    'hms.proposed.prototypeLi4': {
      fr: 'User tests · 3 segments validés',
      nl: 'User tests · 3 segmenten gevalideerd',
      en: 'User tests · 3 segments validated'
    },
    'hms.proposed.conceptLi1': {
      fr: 'Concept report · features + wireframes',
      nl: 'Concept report · features + wireframes',
      en: 'Concept report · features + wireframes'
    },
    'hms.proposed.conceptLi2': {
      fr: 'User stories prioritisées · MVP scope',
      nl: 'Geprioriteerde user stories · MVP scope',
      en: 'Prioritised user stories · MVP scope'
    },
    'hms.proposed.conceptLi3': {
      fr: 'UX/UI directions par persona',
      nl: 'UX/UI richtingen per persona',
      en: 'UX/UI directions per persona'
    },
    'hms.proposed.conceptLi4': {
      fr: 'Decision pack · sponsor + comité de pilotage',
      nl: 'Decision pack · sponsor + stuurgroep',
      en: 'Decision pack · sponsor + steering committee'
    },
    'hms.proposed.crLab': {
      fr: 'Concept Report · livrable',
      nl: 'Concept Report · oplevering',
      en: 'Concept Report · deliverable'
    },



    'hms.chapAnalyse.label': {
      fr: 'Phase 02 · Analyse',
      nl: 'Fase 02 · Analyse',
      en: 'Phase 02 · Analyse'
    },
    'hms.chapAnalyse.overline': {
      fr: 'Discover · Define',
      nl: 'Discover · Define',
      en: 'Discover · Define'
    },
    'hms.chapAnalyse.ddCap': {
      fr: 'Vous êtes ici · Diamant 1 · moitié droite · 4 jalons',
      nl: 'U bent hier · Diamant 1 · rechterhelft · 4 mijlpalen',
      en: 'You are here · Diamond 1 · right half · 4 milestones'
    },
    'hms.chapValueProp.eyebrow': {
      fr: 'Diamant 1 · cristallisation',
      nl: 'Diamant 1 · kristallisatie',
      en: 'Diamond 1 · crystallisation'
    },
    'hms.chapValueProp.phrase': {
      fr: '<span class="chap-v2__reject"><span class="chap-v2__strike">Pas</span> une plateforme par segment qui multiplie les portes d\'entrée.</span><span class="chap-v2__affirm">Un host <em>one-stop</em>, avec un <em>onboarding piloté par persona industriel</em>, des <em>capacités API-isées</em>, du <em>monitoring et diagnostics sans couture</em>, prêt pour les exigences <em>compliance IEC 62443 / NIST / CRA</em> de demain.</span>',
      nl: '<span class="chap-v2__reject"><span class="chap-v2__strike">Geen</span> platform per segment dat de ingangen vermenigvuldigt.</span><span class="chap-v2__affirm">Eén <em>one-stop</em> host, met <em>onboarding gestuurd door industriële persona</em>, <em>API-iseerde capaciteiten</em>, <em>monitoring en diagnostics zonder breuk</em>, klaar voor de eisen rond <em>compliance IEC 62443 / NIST / CRA</em> van morgen.</span>',
      en: '<span class="chap-v2__reject"><span class="chap-v2__strike">Not</span> one platform per segment multiplying entry doors.</span><span class="chap-v2__affirm">A <em>one-stop</em> host, with <em>onboarding driven by industrial persona</em>, <em>API-fied capabilities</em>, <em>seamless monitoring and diagnostics</em>, ready for tomorrow\'s <em>IEC 62443 / NIST / CRA compliance</em> requirements.</span>'
    },
    'hms.chapValueProp.consequences': {
      fr: '<span>Project Owners <span class="chap-v2__arrow">→</span> portail self-service par persona</span><span class="chap-v2__bullet">·</span><span>Project Managers <span class="chap-v2__arrow">→</span> back-office IT contrôlé</span>',
      nl: '<span>Project Owners <span class="chap-v2__arrow">→</span> self-service portaal per persona</span><span class="chap-v2__bullet">·</span><span>Project Managers <span class="chap-v2__arrow">→</span> gecontroleerde IT back-office</span>',
      en: '<span>Project Owners <span class="chap-v2__arrow">→</span> self-service portal per persona</span><span class="chap-v2__bullet">·</span><span>Project Managers <span class="chap-v2__arrow">→</span> controlled IT back-office</span>'
    },
    'hms.chapIdeation.label': {
      fr: 'Phase 03 · Ideation',
      nl: 'Fase 03 · Ideation',
      en: 'Phase 03 · Ideation'
    },
    'hms.chapIdeation.overline': {
      fr: 'Develop · ateliers co-créatifs · explorer les pistes',
      nl: 'Develop · co-creatieve workshops · pistes verkennen',
      en: 'Develop · co-creative workshops · explore directions'
    },
    'hms.chapIdeation.ddCap': {
      fr: 'Vous êtes ici · Diamant 2 · moitié gauche · Develop',
      nl: 'U bent hier · Diamant 2 · linkerhelft · Develop',
      en: 'You are here · Diamond 2 · left half · Develop'
    },
    'hms.chapConcept.eyebrow': {
      fr: 'Le moment de bascule sponsor',
      nl: 'Het kantelmoment voor de sponsor',
      en: 'The sponsor\'s tipping point'
    },
    'hms.chapConcept.phrase': {
      fr: '<span class="chap-v2__reject"><span class="chap-v2__strike">Plus</span> à imaginer.</span><span class="chap-v2__affirm">Le sponsor voit <em>où il investit</em>, et six clients lui disent <em>que ça vaut le coup</em>.</span>',
      nl: '<span class="chap-v2__reject"><span class="chap-v2__strike">Niets</span> meer om voor te stellen.</span><span class="chap-v2__affirm">De sponsor ziet <em>waar hij investeert</em>, en zes klanten vertellen hem <em>dat het de moeite waard is</em>.</span>',
      en: '<span class="chap-v2__reject"><span class="chap-v2__strike">Nothing</span> more to imagine.</span><span class="chap-v2__affirm">The sponsor sees <em>where he\'s investing</em>, and six clients tell him <em>it\'s worth it</em>.</span>'
    },
    'hms.chapConcept.consequences': {
      fr: '<span>76 pages structurées</span><span class="chap-v2__bullet">·</span><span>12 entretiens experts internes</span><span class="chap-v2__bullet">·</span><span>3 segments validés</span>',
      nl: '<span>76 gestructureerde pagina\'s</span><span class="chap-v2__bullet">·</span><span>12 interne expertinterviews</span><span class="chap-v2__bullet">·</span><span>3 gevalideerde segmenten</span>',
      en: '<span>76 structured pages</span><span class="chap-v2__bullet">·</span><span>12 internal expert interviews</span><span class="chap-v2__bullet">·</span><span>3 validated segments</span>'
    },


// CVE 2026-05-17 · HMS i18n batch complete · 366 keys NL + EN

    /* Section · hms.research.* */
    'hms.research.benchEyebrow': {
      fr: 'Phase 01 · Discover · benchmark concurrentiel',
      nl: 'Fase 01 · Discover · competitive benchmark',
      en: 'Phase 01 · Discover · competitive benchmark'
    },
    'hms.research.benchLead': {
      fr: 'Les OEM Machine Builders intègrent Ewon à la commande, haute compliance. Les End-User Plants achètent du standard, autonomie atelier. Les Integrators achètent API et doc. Une seule plateforme sert les trois.',
      nl: 'OEM Machine Builders integreren Ewon bij de bestelling, hoge compliance. End-User Plants kopen standaard, werkplaatsautonomie. Integrators kopen API en documentatie. Eén platform bedient de drie.',
      en: 'OEM Machine Builders integrate Ewon at order, high compliance. End-User Plants buy standard, workshop autonomy. Integrators buy API and docs. A single platform serves the three.'
    },
    'hms.research.benchOutcome': {
      fr: '3 segments · OEM Machine Builders · End-User Plants · Integrators / Resellers <span class="brief-teaser__sep">·</span> concurrents · IXON, Welotec, Tosibox.',
      nl: '3 segmenten · OEM Machine Builders · End-User Plants · Integrators / Resellers <span class="brief-teaser__sep">·</span> concurrenten · IXON, Welotec, Tosibox.',
      en: '3 segments · OEM Machine Builders · End-User Plants · Integrators / Resellers <span class="brief-teaser__sep">·</span> competitors · IXON, Welotec, Tosibox.'
    },
    'hms.research.benchTitle': {
      fr: 'Trois segments marché. <span class="accent">Trois logiques d\'achat.</span>',
      nl: 'Drie marktsegmenten. <span class="accent">Drie aankooplogica\'s.</span>',
      en: 'Three market segments. <span class="accent">Three buying logics.</span>'
    },
    'hms.research.custEyebrow': {
      fr: 'Phase 01 · Discover · 8 clients internationaux',
      nl: 'Fase 01 · Discover · 8 internationale klanten',
      en: 'Phase 01 · Discover · 8 international customers'
    },
    'hms.research.custLead': {
      fr: 'Les six experts internes lisent l\'organisation. Les huit clients lisent la machine telle qu\'elle vit chez eux. Double écoute qui révèle le vrai parcours.',
      nl: 'De zes interne experts lezen de organisatie. De acht klanten lezen de machine zoals ze bij hen leeft. Dubbele luistering die de echte journey blootlegt.',
      en: 'The six internal experts read the organisation. The eight customers read the machine as it lives at their site. Double listening that reveals the real journey.'
    },
    'hms.research.custLead2': {
      fr: '<strong>Aucun ne savait qu\'il manquait quelque chose.</strong> Tous le décrivaient sans le nommer. Les ateliers Customer Journey ont mis ces mots sur le mur.',
      nl: '<strong>Niemand wist dat er iets ontbrak.</strong> Allen beschreven het zonder het te benoemen. De Customer Journey workshops hebben die woorden op de muur gezet.',
      en: '<strong>None knew something was missing.</strong> All described it without naming it. The Customer Journey workshops put those words on the wall.'
    },
    'hms.research.custOutcome': {
      fr: 'Machine builders en Europe, US, Asie <span class="brief-teaser__sep">·</span> tous équipés Ewon <span class="brief-teaser__sep">·</span> 22 questions, 6 thèmes par session.',
      nl: 'Machine builders in Europa, US, Azië <span class="brief-teaser__sep">·</span> allen uitgerust met Ewon <span class="brief-teaser__sep">·</span> 22 vragen, 6 thema\'s per sessie.',
      en: 'Machine builders in Europe, US, Asia <span class="brief-teaser__sep">·</span> all equipped with Ewon <span class="brief-teaser__sep">·</span> 22 questions, 6 themes per session.'
    },
    'hms.research.custTitle': {
      fr: 'Huit clients. <span class="accent">Cinq fuseaux horaires.</span>',
      nl: 'Acht klanten. <span class="accent">Vijf tijdzones.</span>',
      en: 'Eight customers. <span class="accent">Five time zones.</span>'
    },
    'hms.research.deepdiveP1Name': {
      fr: 'Klaus · 48 ans',
      nl: 'Klaus · 48 jaar',
      en: 'Klaus · 48 years old'
    },
    'hms.research.deepdiveP1Pain1': {
      fr: '<strong>Trois logins</strong> · eCatcher, M2Web, Talk2M',
      nl: '<strong>Drie logins</strong> · eCatcher, M2Web, Talk2M',
      en: '<strong>Three logins</strong> · eCatcher, M2Web, Talk2M'
    },
    'hms.research.deepdiveP1Pain2': {
      fr: '<strong>Tunnel cassé silencieux</strong> · la passerelle Flexy perd la connexion sans alerter',
      nl: '<strong>Stil gebroken tunnel</strong> · de Flexy gateway verliest de connectie zonder waarschuwing',
      en: '<strong>Silently broken tunnel</strong> · the Flexy gateway loses the connection without alerting'
    },
    'hms.research.deepdiveP1Pain3': {
      fr: '<strong>Multi-site multi-fuseaux</strong> · 200 machines, pas de vue fleet unifiée',
      nl: '<strong>Multi-site multi-tijdzone</strong> · 200 machines, geen geünificeerde fleet view',
      en: '<strong>Multi-site multi-timezone</strong> · 200 machines, no unified fleet view'
    },
    'hms.research.deepdiveP1Quote': {
      fr: '« Quand une machine tombe à 3h du matin à Atlanta, j\'ai besoin de voir le tunnel Talk2M, pas de chercher quel login marche. »',
      nl: '« Als een machine om 3 uur \'s nachts in Atlanta uitvalt, moet ik de Talk2M tunnel kunnen zien, niet zoeken welke login werkt. »',
      en: '"When a machine drops at 3am in Atlanta, I need to see the Talk2M tunnel, not hunt for which login works."'
    },
    'hms.research.deepdiveP1Role': {
      fr: 'Plant Manager · <span class="accent">OEM Machine Builder DACH</span>',
      nl: 'Plant Manager · <span class="accent">OEM Machine Builder DACH</span>',
      en: 'Plant Manager · <span class="accent">OEM Machine Builder DACH</span>'
    },
    'hms.research.deepdiveP2Name': {
      fr: 'Sven · 55 ans',
      nl: 'Sven · 55 jaar',
      en: 'Sven · 55 years old'
    },
    'hms.research.deepdiveP2Pain1': {
      fr: '<strong>Pas de vue fleet</strong> · 5 protocoles industriels, aucun dashboard cross-protocole',
      nl: '<strong>Geen fleet view</strong> · 5 industriële protocollen, geen cross-protocol dashboard',
      en: '<strong>No fleet view</strong> · 5 industrial protocols, no cross-protocol dashboard'
    },
    'hms.research.deepdiveP2Pain2': {
      fr: '<strong>Pas d\'audit trail</strong> · obligation IEC 62443, rien dans l\'UI pour produire la preuve',
      nl: '<strong>Geen audit trail</strong> · IEC 62443 verplichting, niets in de UI om het bewijs te produceren',
      en: '<strong>No audit trail</strong> · IEC 62443 obligation, nothing in the UI to produce the evidence'
    },
    'hms.research.deepdiveP2Pain3': {
      fr: '<strong>Onboarding lent</strong> · deux semaines pour activer un nouveau site sur Talk2M',
      nl: '<strong>Trage onboarding</strong> · twee weken om een nieuwe site op Talk2M te activeren',
      en: '<strong>Slow onboarding</strong> · two weeks to activate a new site on Talk2M'
    },
    'hms.research.deepdiveP2Quote': {
      fr: '« Mon job c\'est de tenir l\'uptime de 200 machines distribuées. Si l\'outil de monitoring me parle pas, je suis dans le noir. »',
      nl: '« Mijn job is de uptime van 200 verspreide machines volhouden. Als de monitoring tool niet tegen mij praat, sta ik in het donker. »',
      en: '"My job is to hold the uptime of 200 distributed machines. If the monitoring tool does not speak to me, I am in the dark."'
    },
    'hms.research.deepdiveP2Role': {
      fr: 'Field Service Engineer · <span class="accent">End-User Plant Operator</span>',
      nl: 'Field Service Engineer · <span class="accent">End-User Plant Operator</span>',
      en: 'Field Service Engineer · <span class="accent">End-User Plant Operator</span>'
    },
    'hms.research.it1Context': {
      fr: 'Veut un produit qui défend la position de leader face à IXON cloud-native.',
      nl: 'Wil een product dat de leiderspositie verdedigt tegenover een cloud-native IXON.',
      en: 'Wants a product that defends the leader position against a cloud-native IXON.'
    },
    'hms.research.it1Name': {
      fr: 'Le CEO',
      nl: 'De CEO',
      en: 'The CEO'
    },
    'hms.research.it1Quote': {
      fr: '« On reste leader, mais le marché bouge. Le digital nous met en concurrence frontale. »',
      nl: '« We blijven leider, maar de markt beweegt. Digitaal zet ons in directe concurrentie. »',
      en: '"We remain leader, but the market is moving. Digital puts us in direct competition."'
    },
    'hms.research.it2Context': {
      fr: 'IT fraîchement passée à l\'Agile. Cherche une stack maintenable.',
      nl: 'IT recent overgestapt op Agile. Op zoek naar een onderhoudbare stack.',
      en: 'IT freshly moved to Agile. Looking for a maintainable stack.'
    },
    'hms.research.it2Name': {
      fr: 'Le CTO',
      nl: 'De CTO',
      en: 'The CTO'
    },
    'hms.research.it2Quote': {
      fr: '« On a des plateformes par segment. Elles ne se parlent pas. »',
      nl: '« We hebben platformen per segment. Ze praten niet met elkaar. »',
      en: '"We have platforms per segment. They do not talk to each other."'
    },
    'hms.research.it3Context': {
      fr: 'Propriétaires de l\'offre commerciale. Frustrés par les cycles techniques opaques.',
      nl: 'Eigenaars van het commercieel aanbod. Gefrustreerd door ondoorzichtige technische cycli.',
      en: 'Owners of the commercial offer. Frustrated by opaque technical cycles.'
    },
    'hms.research.it3Name': {
      fr: 'Project Owners (Business)',
      nl: 'Project Owners (Business)',
      en: 'Project Owners (Business)'
    },
    'hms.research.it3Quote': {
      fr: '« Je sais ce que veut mon client. L\'IT ne m\'écoute pas. »',
      nl: '« Ik weet wat mijn klant wil. IT luistert niet naar mij. »',
      en: '"I know what my customer wants. IT does not listen to me."'
    },
    'hms.research.it4Context': {
      fr: 'Responsables livraison. Frustrés par les specs floues et les retours tardifs.',
      nl: 'Verantwoordelijk voor de oplevering. Gefrustreerd door vage specs en late feedback.',
      en: 'In charge of delivery. Frustrated by fuzzy specs and late feedback.'
    },
    'hms.research.it4Name': {
      fr: 'Project Managers (IT)',
      nl: 'Project Managers (IT)',
      en: 'Project Managers (IT)'
    },
    'hms.research.it4Quote': {
      fr: '« Le Business change d\'avis chaque sprint. On livre du flou. »',
      nl: '« Business verandert elke sprint van mening. We leveren onscherpte. »',
      en: '"Business changes its mind every sprint. We deliver fuzziness."'
    },
    'hms.research.it5Context': {
      fr: 'Mémoire vivante de l\'organisation industrielle.',
      nl: 'Levend geheugen van de industriële organisatie.',
      en: 'Living memory of the industrial organisation.'
    },
    'hms.research.it5Name': {
      fr: 'Experts métier 20+ ans',
      nl: 'Domeinexperts 20+ jaar',
      en: 'Domain experts 20+ years'
    },
    'hms.research.it5Quote': {
      fr: '« Tout est dans nos têtes. Rien n\'est documenté pour un client. »',
      nl: '« Alles zit in onze hoofden. Niets is gedocumenteerd voor een klant. »',
      en: '"Everything is in our heads. Nothing is documented for a customer."'
    },
    'hms.research.it6Context': {
      fr: 'Visibilité directe sur ce qui casse côté client final.',
      nl: 'Directe zichtbaarheid op wat stuk gaat aan de eindklantkant.',
      en: 'Direct visibility on what breaks at the end-customer side.'
    },
    'hms.research.it6Name': {
      fr: 'Operations & Production',
      nl: 'Operations & Production',
      en: 'Operations & Production'
    },
    'hms.research.it6Quote': {
      fr: '« On absorbe les ratés en bout de chaîne. Tous les jours. »',
      nl: '« We vangen de fouten op aan het einde van de keten. Elke dag. »',
      en: '"We absorb the misfires at the end of the chain. Every day."'
    },
    'hms.research.itEyebrow': {
      fr: 'Phase 01 · Discover · 6 expert interviews',
      nl: 'Fase 01 · Discover · 6 expert interviews',
      en: 'Phase 01 · Discover · 6 expert interviews'
    },
    'hms.research.itOutcome': {
      fr: 'Six chefs de département · R&amp;D, produit, business, service après-vente, support.',
      nl: 'Zes departementshoofden · R&amp;D, product, business, after-sales, support.',
      en: 'Six department heads · R&amp;D, product, business, after-sales, support.'
    },
    'hms.research.itTitle': {
      fr: 'On écoute <span class="accent">avant de dessiner.</span>',
      nl: 'Eerst luisteren, <span class="accent">dan tekenen.</span>',
      en: 'Listen first, <span class="accent">then design.</span>'
    },
    'hms.research.persoEyebrow': {
      fr: 'Phase 01 · Discover · personas',
      nl: 'Fase 01 · Discover · personas',
      en: 'Phase 01 · Discover · personas'
    },
    'hms.research.persoLead': {
      fr: 'Klaus pilote 200 machines distribuées en DACH. Sven tient l\'uptime sur 5 fuseaux horaires. Mêmes anxiétés, mêmes phrases dans la salle. Les deux servent de boussole pour prioriser le MVP.',
      nl: 'Klaus stuurt 200 machines verdeeld over DACH. Sven houdt de uptime over 5 tijdzones. Dezelfde angsten, dezelfde zinnen in de zaal. Beide dienen als kompas om de MVP te prioriteren.',
      en: 'Klaus pilots 200 machines distributed across DACH. Sven holds the uptime over 5 time zones. Same anxieties, same phrases in the room. Both serve as a compass to prioritise the MVP.'
    },
    'hms.research.persoTitle': {
      fr: '6 experts internes. 8 customer interviews. <span class="accent">2 personas illustratifs.</span>',
      nl: '6 interne experts. 8 customer interviews. <span class="accent">2 illustratieve personas.</span>',
      en: '6 internal experts. 8 customer interviews. <span class="accent">2 illustrative personas.</span>'
    },
    'hms.research.seg1Country': {
      fr: 'Segment 01 · OEM Machine Builders',
      nl: 'Segment 01 · OEM Machine Builders',
      en: 'Segment 01 · OEM Machine Builders'
    },
    'hms.research.seg1Li1': {
      fr: 'Machines automobiles, pharma, agro, packaging',
      nl: 'Machines automotive, pharma, agro, packaging',
      en: 'Machines for automotive, pharma, agro, packaging'
    },
    'hms.research.seg1Li2': {
      fr: 'Flottes massives, intégration Flexy à la commande',
      nl: 'Massieve vloten, Flexy-integratie bij de bestelling',
      en: 'Massive fleets, Flexy integration at order'
    },
    'hms.research.seg1Li3': {
      fr: 'Compliance IEC 62443, machinery directive',
      nl: 'Compliance IEC 62443, machinery directive',
      en: 'Compliance IEC 62443, machinery directive'
    },
    'hms.research.seg1Name': {
      fr: 'Large Accounts',
      nl: 'Large Accounts',
      en: 'Large Accounts'
    },
    'hms.research.seg1Sig': {
      fr: 'Signature · solutions complexes, compliance haute',
      nl: 'Signatuur · complexe oplossingen, hoge compliance',
      en: 'Signature · complex solutions, high compliance'
    },
    'hms.research.seg2Country': {
      fr: 'Segment 02 · End-User Plants',
      nl: 'Segment 02 · End-User Plants',
      en: 'Segment 02 · End-User Plants'
    },
    'hms.research.seg2Li1': {
      fr: 'Usines, ateliers exploitant des machines tierces',
      nl: 'Fabrieken, ateliers die machines van derden uitbaten',
      en: 'Factories, workshops operating third-party machines'
    },
    'hms.research.seg2Li2': {
      fr: 'Volumes modestes, autonomie sans équipe IT',
      nl: 'Bescheiden volumes, autonomie zonder IT-team',
      en: 'Modest volumes, autonomy without IT team'
    },
    'hms.research.seg2Li3': {
      fr: 'Segment cloud-native laissé ouvert par les pure-players',
      nl: 'Cloud-native segment opengelaten door de pure-players',
      en: 'Cloud-native segment left open by the pure-players'
    },
    'hms.research.seg2Name': {
      fr: 'Plants industriels & PMI',
      nl: 'Industriële plants & KMO',
      en: 'Industrial plants & SMEs'
    },
    'hms.research.seg2Sig': {
      fr: 'Signature · standardisation, self-service',
      nl: 'Signatuur · standaardisatie, self-service',
      en: 'Signature · standardisation, self-service'
    },
    'hms.research.seg3Country': {
      fr: 'Segment 03 · Channel',
      nl: 'Segment 03 · Channel',
      en: 'Segment 03 · Channel'
    },
    'hms.research.seg3Li1': {
      fr: 'Intégrateurs IT distribuant Flexy201/205 avec Talk2M embarqué',
      nl: 'IT-integrators die Flexy201/205 distribueren met embedded Talk2M',
      en: 'IT integrators distributing Flexy201/205 with embedded Talk2M'
    },
    'hms.research.seg3Li2': {
      fr: 'API et white-label comme conditions d\'entrée',
      nl: 'API en white-label als toetredingsvoorwaarden',
      en: 'API and white-label as entry conditions'
    },
    'hms.research.seg3Li3': {
      fr: 'Levier de croissance hors grand-compte historique',
      nl: 'Groeihefboom buiten de historische key accounts',
      en: 'Growth lever beyond the historical key accounts'
    },
    'hms.research.seg3Name': {
      fr: 'Integrators & resellers',
      nl: 'Integrators & resellers',
      en: 'Integrators & resellers'
    },
    'hms.research.seg3Sig': {
      fr: 'Signature · partenaires, Ewon embarqué',
      nl: 'Signatuur · partners, embedded Ewon',
      en: 'Signature · partners, embedded Ewon'
    },

    /* Section · hms.cjm.* */
    'hms.cjm.pp1': {
      fr: 'Competitive Pressure',
      nl: 'Competitive Pressure',
      en: 'Competitive Pressure'
    },
    'hms.cjm.pp10': {
      fr: 'Expansion Challenges',
      nl: 'Expansion Challenges',
      en: 'Expansion Challenges'
    },
    'hms.cjm.pp10Hint': {
      fr: 'Difficile d\'aller au-delà du grand-compte historique.',
      nl: 'Moeilijk om verder te gaan dan de historische key accounts.',
      en: 'Hard to move beyond the historical key accounts.'
    },
    'hms.cjm.pp1Hint': {
      fr: 'Le marché bouge plus vite que l\'offre.',
      nl: 'De markt beweegt sneller dan het aanbod.',
      en: 'The market moves faster than the offer.'
    },
    'hms.cjm.pp2': {
      fr: 'Time-to-Market Delays',
      nl: 'Time-to-Market Delays',
      en: 'Time-to-Market Delays'
    },
    'hms.cjm.pp2Hint': {
      fr: 'Onboarding qui prend plusieurs mois.',
      nl: 'Onboarding die meerdere maanden duurt.',
      en: 'Onboarding that takes months.'
    },
    'hms.cjm.pp3': {
      fr: 'Tool Complexity & Fragmentation',
      nl: 'Tool Complexity & Fragmentation',
      en: 'Tool Complexity & Fragmentation'
    },
    'hms.cjm.pp3Hint': {
      fr: 'Plateformes par segment, ne se parlent pas.',
      nl: 'Platformen per segment, praten niet met elkaar.',
      en: 'Platforms by segment, do not talk to each other.'
    },
    'hms.cjm.pp4': {
      fr: 'Lack of Automation & Standardization',
      nl: 'Lack of Automation & Standardization',
      en: 'Lack of Automation & Standardization'
    },
    'hms.cjm.pp4Hint': {
      fr: 'Workflows manuels, erreurs en chaîne.',
      nl: 'Handmatige workflows, fouten in keten.',
      en: 'Manual workflows, chained errors.'
    },
    'hms.cjm.pp5': {
      fr: 'Gaps in Digital Solutions',
      nl: 'Gaps in Digital Solutions',
      en: 'Gaps in Digital Solutions'
    },
    'hms.cjm.pp5Hint': {
      fr: 'APIs absentes ou outdated.',
      nl: 'API\'s afwezig of outdated.',
      en: 'APIs missing or outdated.'
    },
    'hms.cjm.pp6': {
      fr: 'Customer Autonomy Challenges',
      nl: 'Customer Autonomy Challenges',
      en: 'Customer Autonomy Challenges'
    },
    'hms.cjm.pp6Hint': {
      fr: 'Pas de self-service, dépendance aux équipes.',
      nl: 'Geen self-service, afhankelijkheid van de teams.',
      en: 'No self-service, dependence on the teams.'
    },
    'hms.cjm.pp7': {
      fr: 'Lack of Proactivity',
      nl: 'Lack of Proactivity',
      en: 'Lack of Proactivity'
    },
    'hms.cjm.pp7Hint': {
      fr: 'Le client appelle, pas l\'inverse.',
      nl: 'De klant belt, niet andersom.',
      en: 'The customer calls, not the other way around.'
    },
    'hms.cjm.pp8': {
      fr: 'Service Rigidity',
      nl: 'Service Rigidity',
      en: 'Service Rigidity'
    },
    'hms.cjm.pp8Hint': {
      fr: 'Customisations difficiles à faire évoluer.',
      nl: 'Customizations moeilijk te laten evolueren.',
      en: 'Customisations hard to evolve.'
    },
    'hms.cjm.pp9': {
      fr: 'Billing Complexity',
      nl: 'Billing Complexity',
      en: 'Billing Complexity'
    },
    'hms.cjm.pp9Hint': {
      fr: 'Modèles tarifaires opaques pour le client.',
      nl: 'Ondoorzichtige prijsmodellen voor de klant.',
      en: 'Opaque pricing models for the customer.'
    },
    'hms.cjm.s1Desc': {
      fr: 'Comparaison IXON, Welotec, Tosibox.',
      nl: 'Vergelijking IXON, Welotec, Tosibox.',
      en: 'Comparison IXON, Welotec, Tosibox.'
    },
    'hms.cjm.s1Name': {
      fr: 'Découverte',
      nl: 'Ontdekking',
      en: 'Discovery'
    },
    'hms.cjm.s2Desc': {
      fr: 'Cadrage, devis, signature.',
      nl: 'Kadering, offerte, ondertekening.',
      en: 'Scoping, quote, signature.'
    },
    'hms.cjm.s2Name': {
      fr: 'Contact & brief',
      nl: 'Contact & brief',
      en: 'Contact & brief'
    },
    'hms.cjm.s3Desc': {
      fr: 'Setup Talk2M. Mise en service Flexy, tunnel sécurisé.',
      nl: 'Setup Talk2M. Inproductiename Flexy, beveiligde tunnel.',
      en: 'Talk2M setup. Flexy commissioning, secured tunnel.'
    },
    'hms.cjm.s3Name': {
      fr: 'Onboarding',
      nl: 'Onboarding',
      en: 'Onboarding'
    },
    'hms.cjm.s4Desc': {
      fr: 'Diagnostics, alertes, audit trail compliance.',
      nl: 'Diagnostiek, alerts, compliance audit trail.',
      en: 'Diagnostics, alerts, compliance audit trail.'
    },
    'hms.cjm.s4Name': {
      fr: 'Exploitation',
      nl: 'Exploitatie',
      en: 'Operations'
    },
    'hms.cjm.s5Desc': {
      fr: 'Reporting SLA, support self-service, facturation volume.',
      nl: 'SLA reporting, self-service support, facturatie op volume.',
      en: 'SLA reporting, self-service support, volume billing.'
    },
    'hms.cjm.s5Name': {
      fr: 'Suivi & expansion',
      nl: 'Opvolging & uitbreiding',
      en: 'Follow-up & expansion'
    },

    /* Section · hms.analyse.* */
    'hms.analyse.cjmEyebrow': {
      fr: 'Phase 02 · Define · Customer Journey wall',
      nl: 'Fase 02 · Define · Customer Journey wall',
      en: 'Phase 02 · Define · Customer Journey wall'
    },
    'hms.analyse.cjmLead': {
      fr: 'Tous les départements autour de la même table. Les frictions ne sont plus discutées · elles sont épinglées.',
      nl: 'Alle afdelingen rond dezelfde tafel. Frustraties worden niet meer besproken · ze worden vastgeprikt.',
      en: 'Every department around the same table. Frictions are no longer debated · they are pinned.'
    },
    'hms.analyse.cjmSource': {
      fr: '<span class="source-link__lab">Référence sur demande</span> <span class="source-link__ref">HMS Heuristic Evaluation 29 slides · Phoenix AS-IS &amp; TO-BE 43 pages · Roadmap 40 pages · 6 mockups Phoenix HD · 44 screens dashboard.</span> <span class="source-link__arrow" aria-hidden="true">↗</span>',
      nl: '<span class="source-link__lab">Referentie op aanvraag</span> <span class="source-link__ref">HMS Heuristic Evaluation 29 slides · Phoenix AS-IS &amp; TO-BE 43 pagina\'s · Roadmap 40 pagina\'s · 6 mockups Phoenix HD · 44 screens dashboard.</span> <span class="source-link__arrow" aria-hidden="true">↗</span>',
      en: '<span class="source-link__lab">Reference on request</span> <span class="source-link__ref">HMS Heuristic Evaluation 29 slides · Phoenix AS-IS &amp; TO-BE 43 pages · Roadmap 40 pages · 6 Phoenix HD mockups · 44 dashboard screens.</span> <span class="source-link__arrow" aria-hidden="true">↗</span>'
    },
    'hms.analyse.cjmTitle': {
      fr: 'Le mur a remplacé <span class="accent">le PowerPoint.</span>',
      nl: 'De muur heeft <span class="accent">de PowerPoint vervangen.</span>',
      en: 'The wall replaced <span class="accent">the PowerPoint.</span>'
    },
    'hms.analyse.opp10Desc': {
      fr: 'Tracking + billing + reporting + ticketing en un seul portail.',
      nl: 'Tracking + billing + reporting + ticketing in één portaal.',
      en: 'Tracking + billing + reporting + ticketing in a single portal.'
    },
    'hms.analyse.opp10Name': {
      fr: 'Unified Client Portal',
      nl: 'Unified Client Portal',
      en: 'Unified Client Portal'
    },
    'hms.analyse.opp11Desc': {
      fr: 'Advanced analytics, positionnement One-Stop Shop. <em>MVP++.</em>',
      nl: 'Advanced analytics, One-Stop Shop positionering. <em>MVP++.</em>',
      en: 'Advanced analytics, One-Stop Shop positioning. <em>MVP++.</em>'
    },
    'hms.analyse.opp11Name': {
      fr: 'Competitive Differentiation',
      nl: 'Competitive Differentiation',
      en: 'Competitive Differentiation'
    },
    'hms.analyse.opp1Desc': {
      fr: 'Self-service, real-time tracking, dashboards par segment.',
      nl: 'Self-service, real-time tracking, dashboards per segment.',
      en: 'Self-service, real-time tracking, dashboards by segment.'
    },
    'hms.analyse.opp1Name': {
      fr: 'Enhanced Customer Experience',
      nl: 'Enhanced Customer Experience',
      en: 'Enhanced Customer Experience'
    },
    'hms.analyse.opp2Desc': {
      fr: 'API, self-onboarding pour les SMEs.',
      nl: 'API, self-onboarding voor SMEs.',
      en: 'API, self-onboarding for SMEs.'
    },
    'hms.analyse.opp2Name': {
      fr: 'Automation & Scalability',
      nl: 'Automation & Scalability',
      en: 'Automation & Scalability'
    },
    'hms.analyse.opp3Desc': {
      fr: 'Email, SMS, print unifiés. Fallback automatique.',
      nl: 'E-mail, SMS, print verenigd. Automatische fallback.',
      en: 'Email, SMS, print unified. Automatic fallback.'
    },
    'hms.analyse.opp3Name': {
      fr: 'Multi-Channel Integration',
      nl: 'Multi-Channel Integration',
      en: 'Multi-Channel Integration'
    },
    'hms.analyse.opp4Desc': {
      fr: 'Reporting BI, behaviors clients, sector-specific insights.',
      nl: 'BI reporting, klantgedrag, sectorspecifieke inzichten.',
      en: 'BI reporting, customer behaviours, sector-specific insights.'
    },
    'hms.analyse.opp4Name': {
      fr: 'Data-Driven Insights',
      nl: 'Data-Driven Insights',
      en: 'Data-Driven Insights'
    },
    'hms.analyse.opp5Desc': {
      fr: 'Basic / Gold / Custom. Pay-as-you-go pour les SMEs.',
      nl: 'Basic / Gold / Custom. Pay-as-you-go voor SMEs.',
      en: 'Basic / Gold / Custom. Pay-as-you-go for SMEs.'
    },
    'hms.analyse.opp5Name': {
      fr: 'Flexible Pricing Models',
      nl: 'Flexible Pricing Models',
      en: 'Flexible Pricing Models'
    },
    'hms.analyse.opp6Desc': {
      fr: 'Multi-langue, compliance par juridiction · IEC 62443, NIST, CE, FCC. <em>MVP++.</em>',
      nl: 'Meertalig, compliance per jurisdictie · IEC 62443, NIST, CE, FCC. <em>MVP++.</em>',
      en: 'Multi-language, compliance by jurisdiction · IEC 62443, NIST, CE, FCC. <em>MVP++.</em>'
    },
    'hms.analyse.opp6Name': {
      fr: 'Market Expansion',
      nl: 'Market Expansion',
      en: 'Market Expansion'
    },
    'hms.analyse.opp7Desc': {
      fr: 'Predictive analytics, alertes avant que le client appelle.',
      nl: 'Predictive analytics, alerts voor de klant belt.',
      en: 'Predictive analytics, alerts before the customer calls.'
    },
    'hms.analyse.opp7Name': {
      fr: 'Proactive Customer Engagement',
      nl: 'Proactive Customer Engagement',
      en: 'Proactive Customer Engagement'
    },
    'hms.analyse.opp8Desc': {
      fr: 'Templates + modular add-ons pour Large Accounts.',
      nl: 'Templates + modulaire add-ons voor Large Accounts.',
      en: 'Templates + modular add-ons for Large Accounts.'
    },
    'hms.analyse.opp8Name': {
      fr: 'Standardization with Flexibility',
      nl: 'Standardization with Flexibility',
      en: 'Standardization with Flexibility'
    },
    'hms.analyse.opp9Desc': {
      fr: 'Consent management, builders, payment integrations.',
      nl: 'Consent management, builders, payment integrations.',
      en: 'Consent management, builders, payment integrations.'
    },
    'hms.analyse.opp9Name': {
      fr: 'Innovation in Product Offerings',
      nl: 'Innovation in Product Offerings',
      en: 'Innovation in Product Offerings'
    },
    'hms.analyse.oppEyebrow': {
      fr: 'Analyse · 11 opportunités',
      nl: 'Analyse · 11 opportuniteiten',
      en: 'Analysis · 11 opportunities'
    },
    'hms.analyse.oppLead': {
      fr: '10 pain points reformulés en <strong>11 opportunités</strong>, sourcées verbatim Concept Report. 5 deviennent Value Props MVP. 6 placées MVP++ phase 2.',
      nl: '10 pain points geherformuleerd als <strong>11 opportuniteiten</strong>, verbatim uit het Concept Report. 5 worden Value Props MVP. 6 verschoven naar MVP++ fase 2.',
      en: '10 pain points reframed into <strong>11 opportunities</strong>, sourced verbatim from the Concept Report. 5 become MVP Value Props. 6 placed in MVP++ phase 2.'
    },
    'hms.analyse.oppTitle': {
      fr: 'Des douleurs <span class="accent">aux chances.</span>',
      nl: 'Van pijnpunten <span class="accent">naar kansen.</span>',
      en: 'From pains <span class="accent">to opportunities.</span>'
    },
    'hms.analyse.vpCliffhanger': {
      fr: 'Tout converge sur <span class="accent">une seule VP.</span>',
      nl: 'Alles convergeert naar <span class="accent">één enkele VP.</span>',
      en: 'Everything converges on <span class="accent">a single VP.</span>'
    },
    'hms.analyse.vpConvergeIntro': {
      fr: 'Tout converge vers une phrase, pas vers un canvas.',
      nl: 'Alles convergeert naar één zin, niet naar een canvas.',
      en: 'Everything converges on one sentence, not on a canvas.'
    },
    'hms.analyse.vpEyebrow': {
      fr: 'Au bout du diamant 1',
      nl: 'Aan het einde van diamant 1',
      en: 'End of diamond 1'
    },
    'hms.analyse.ws1Desc': {
      fr: 'Project Owners et Project Managers à la même table. Chacun construit l\'empathy map d\'un persona, puis confronte sa lecture. On découvre qu\'on parle du même utilisateur.',
      nl: 'Project Owners en Project Managers aan dezelfde tafel. Iedereen bouwt de empathy map van een persona, daarna confronteren we de lezingen. We ontdekken dat we het over dezelfde gebruiker hebben.',
      en: 'Project Owners and Project Managers at the same table. Each builds the empathy map of a persona, then confronts their reading. We discover we are talking about the same user.'
    },
    'hms.analyse.ws1Name': {
      fr: 'Empathy mapping cross-département',
      nl: 'Empathy mapping cross-departement',
      en: 'Cross-department empathy mapping'
    },
    'hms.analyse.ws1Output': {
      fr: 'Output · 6 empathy maps consolidées.',
      nl: 'Output · 6 geconsolideerde empathy maps.',
      en: 'Output · 6 consolidated empathy maps.'
    },
    'hms.analyse.ws2Desc': {
      fr: 'Reconstruire la journey end-to-end avec sales, ops, support, IT. Chaque touchpoint est validé par celui qui le tient. Pain points épinglés au mur.',
      nl: 'De end-to-end journey reconstrueren met sales, ops, support, IT. Elk touchpoint wordt gevalideerd door wie het bezit. Pain points op de muur vastgeprikt.',
      en: 'Rebuild the end-to-end journey with sales, ops, support, IT. Every touchpoint is validated by the person who owns it. Pain points pinned on the wall.'
    },
    'hms.analyse.ws2Name': {
      fr: 'Customer Journey workshops',
      nl: 'Customer Journey workshops',
      en: 'Customer Journey workshops'
    },
    'hms.analyse.ws2Output': {
      fr: 'Output · journey 5 phases · 10 pain points · ownership clair.',
      nl: 'Output · journey 5 fases · 10 pain points · helder ownership.',
      en: 'Output · journey 5 phases · 10 pain points · clear ownership.'
    },
    'hms.analyse.ws3Desc': {
      fr: 'Chaque pain point reformulé en opportunité. Les équipes votent les HMW qui méritent un MVP. Focus action.',
      nl: 'Elke pain point geherformuleerd als opportuniteit. De teams stemmen voor de HMW die een MVP verdienen. Actiegericht.',
      en: 'Every pain point reframed as an opportunity. Teams vote on the HMW worth an MVP. Action focused.'
    },
    'hms.analyse.ws3Name': {
      fr: '"How might we" sessions',
      nl: '"How might we" sessions',
      en: '"How might we" sessions'
    },
    'hms.analyse.ws3Output': {
      fr: 'Output · top 12 HMW · scoring impact/effort · backlog VP.',
      nl: 'Output · top 12 HMW · impact/effort scoring · VP backlog.',
      en: 'Output · top 12 HMW · impact/effort scoring · VP backlog.'
    },
    'hms.analyse.ws4Desc': {
      fr: 'Workshop final · condenser les outputs en une formulation de VP. Chacun défend, ajuste, signe.',
      nl: 'Slotworkshop · de outputs condenseren in één VP-formulering. Iedereen verdedigt, past aan, ondertekent.',
      en: 'Final workshop · condense the outputs into a single VP statement. Each defends, adjusts, signs.'
    },
    'hms.analyse.ws4Name': {
      fr: 'VP synthesis workshop',
      nl: 'VP synthesis workshop',
      en: 'VP synthesis workshop'
    },
    'hms.analyse.ws4Output': {
      fr: 'Output · VP en 1 phrase · alignement signé.',
      nl: 'Output · VP in 1 zin · ondertekende alignment.',
      en: 'Output · VP in 1 sentence · signed alignment.'
    },
    'hms.analyse.wsEyebrow': {
      fr: 'Analyse · ateliers cocréation',
      nl: 'Analyse · co-creatie workshops',
      en: 'Analysis · co-creation workshops'
    },
    'hms.analyse.wsLead': {
      fr: 'Deux régimes d\'atelier. <strong>Petits ateliers ciblés</strong> avec les Project Managers IT, au tableau. <strong>Grands ateliers Customer Journey</strong> avec Business, IT, Operations, Customer Service autour de la table. Quatre formats, quatre livrables. La VP est sortie de là.',
      nl: 'Twee workshopregimes. <strong>Kleine gerichte workshops</strong> met de IT Project Managers, aan het bord. <strong>Grote Customer Journey workshops</strong> met Business, IT, Operations, Customer Service rond de tafel. Vier formats, vier opleveringen. Daaruit kwam de VP.',
      en: 'Two workshop regimes. <strong>Small focused workshops</strong> with IT Project Managers, at the whiteboard. <strong>Large Customer Journey workshops</strong> with Business, IT, Operations, Customer Service around the table. Four formats, four deliverables. The VP came out of there.'
    },
    'hms.analyse.wsTitle': {
      fr: 'Le langage commun. <span class="accent">En atelier, pas en canvas.</span>',
      nl: 'De gemeenschappelijke taal. <span class="accent">In de workshop, niet op een canvas.</span>',
      en: 'Shared language. <span class="accent">In the workshop, not on a canvas.</span>'
    },

    /* Section · hms.pp.* */
    'hms.pp.p1.constraint': {
      fr: 'Règle · self-service guidé par objectif.',
      nl: 'Regel · self-service gestuurd door doel.',
      en: 'Rule · self-service guided by goal.'
    },
    'hms.pp.p1.eyebrow': {
      fr: 'Pain Point 01',
      nl: 'Pain Point 01',
      en: 'Pain Point 01'
    },
    'hms.pp.p1.h': {
      fr: '« L\'onboarding nous prend des mois. »',
      nl: '« Onze onboarding duurt maanden. »',
      en: '"Onboarding takes us months."'
    },
    'hms.pp.p1.theme': {
      fr: 'Time-to-Market',
      nl: 'Time-to-Market',
      en: 'Time-to-Market'
    },
    'hms.pp.p10.constraint': {
      fr: 'Argument · End-User Plants par freemium Talk2M, Integrators par API.',
      nl: 'Argument · End-User Plants via freemium Talk2M, Integrators via API.',
      en: 'Argument · End-User Plants via freemium Talk2M, Integrators via API.'
    },
    'hms.pp.p10.eyebrow': {
      fr: 'Pain Point 10',
      nl: 'Pain Point 10',
      en: 'Pain Point 10'
    },
    'hms.pp.p10.h': {
      fr: '« On reste collé à nos comptes historiques. »',
      nl: '« We blijven vasthangen aan onze historische accounts. »',
      en: '"We stay stuck on our historical accounts."'
    },
    'hms.pp.p10.theme': {
      fr: 'Expansion',
      nl: 'Expansion',
      en: 'Expansion'
    },
    'hms.pp.p2.constraint': {
      fr: 'Règle · base standard, dernier kilomètre par persona.',
      nl: 'Regel · standaardbasis, laatste kilometer per persona.',
      en: 'Rule · standard base, last mile per persona.'
    },
    'hms.pp.p2.eyebrow': {
      fr: 'Pain Point 02',
      nl: 'Pain Point 02',
      en: 'Pain Point 02'
    },
    'hms.pp.p2.h': {
      fr: '« Tout passe par des workflows manuels. »',
      nl: '« Alles loopt via handmatige workflows. »',
      en: '"Everything goes through manual workflows."'
    },
    'hms.pp.p2.theme': {
      fr: 'Automation',
      nl: 'Automation',
      en: 'Automation'
    },
    'hms.pp.p3.constraint': {
      fr: 'Règle · portail one-stop, self-service par persona.',
      nl: 'Regel · one-stop portaal, self-service per persona.',
      en: 'Rule · one-stop portal, self-service by persona.'
    },
    'hms.pp.p3.eyebrow': {
      fr: 'Pain Point 03',
      nl: 'Pain Point 03',
      en: 'Pain Point 03'
    },
    'hms.pp.p3.h': {
      fr: '« Le client doit nous appeler pour la moindre modif. »',
      nl: '« De klant moet ons bellen voor elke kleine aanpassing. »',
      en: '"The customer has to call us for the smallest change."'
    },
    'hms.pp.p3.theme': {
      fr: 'Autonomy',
      nl: 'Autonomy',
      en: 'Autonomy'
    },
    'hms.pp.p4.constraint': {
      fr: 'Règle · host commun, customisations par typologie.',
      nl: 'Regel · gemeenschappelijke host, customizations per typologie.',
      en: 'Rule · shared host, customisations by typology.'
    },
    'hms.pp.p4.eyebrow': {
      fr: 'Pain Point 04',
      nl: 'Pain Point 04',
      en: 'Pain Point 04'
    },
    'hms.pp.p4.h': {
      fr: '« Nos outils ne se parlent pas. »',
      nl: '« Onze tools praten niet met elkaar. »',
      en: '"Our tools do not talk to each other."'
    },
    'hms.pp.p4.theme': {
      fr: 'Fragmentation',
      nl: 'Fragmentation',
      en: 'Fragmentation'
    },
    'hms.pp.p5.constraint': {
      fr: 'Règle · alertes Flexy avant que le client n\'appelle.',
      nl: 'Regel · Flexy alerts voor de klant belt.',
      en: 'Rule · Flexy alerts before the customer calls.'
    },
    'hms.pp.p5.eyebrow': {
      fr: 'Pain Point 05',
      nl: 'Pain Point 05',
      en: 'Pain Point 05'
    },
    'hms.pp.p5.h': {
      fr: '« On apprend les problèmes par le client. »',
      nl: '« We horen de problemen via de klant. »',
      en: '"We learn about problems from the customer."'
    },
    'hms.pp.p5.theme': {
      fr: 'Proactivity',
      nl: 'Proactivity',
      en: 'Proactivity'
    },
    'hms.pp.p6.constraint': {
      fr: 'Règle · portail one-stop + API Integrators.',
      nl: 'Regel · one-stop portaal + API Integrators.',
      en: 'Rule · one-stop portal + Integrators API.'
    },
    'hms.pp.p6.eyebrow': {
      fr: 'Pain Point 06',
      nl: 'Pain Point 06',
      en: 'Pain Point 06'
    },
    'hms.pp.p6.h': {
      fr: '« Notre offre digitale n\'égale pas la concurrence. »',
      nl: '« Ons digitale aanbod evenaart de concurrentie niet. »',
      en: '"Our digital offer does not match the competition."'
    },
    'hms.pp.p6.theme': {
      fr: 'Digital gaps',
      nl: 'Digital gaps',
      en: 'Digital gaps'
    },
    'hms.pp.p7.constraint': {
      fr: 'Règle · features modulaires, configurables sans rebuilds.',
      nl: 'Regel · modulaire features, configureerbaar zonder rebuilds.',
      en: 'Rule · modular features, configurable without rebuilds.'
    },
    'hms.pp.p7.eyebrow': {
      fr: 'Pain Point 07',
      nl: 'Pain Point 07',
      en: 'Pain Point 07'
    },
    'hms.pp.p7.h': {
      fr: '« Une fois en prod, plus personne ne touche. »',
      nl: '« Eenmaal in productie raakt niemand er nog aan. »',
      en: '"Once in production, nobody touches it."'
    },
    'hms.pp.p7.theme': {
      fr: 'Rigidity',
      nl: 'Rigidity',
      en: 'Rigidity'
    },
    'hms.pp.p8.constraint': {
      fr: 'Argument · la VP défend le leadership ET ouvre un segment.',
      nl: 'Argument · de VP verdedigt het leiderschap EN opent een segment.',
      en: 'Argument · the VP defends leadership AND opens a segment.'
    },
    'hms.pp.p8.eyebrow': {
      fr: 'Pain Point 08',
      nl: 'Pain Point 08',
      en: 'Pain Point 08'
    },
    'hms.pp.p8.h': {
      fr: '« Le marché bouge plus vite que notre offre. »',
      nl: '« De markt beweegt sneller dan ons aanbod. »',
      en: '"The market moves faster than our offer."'
    },
    'hms.pp.p8.theme': {
      fr: 'Competition',
      nl: 'Competition',
      en: 'Competition'
    },
    'hms.pp.p9.constraint': {
      fr: 'Règle · facturation lisible, breakdown par poste.',
      nl: 'Regel · leesbare facturatie, breakdown per post.',
      en: 'Rule · readable billing, line-item breakdown.'
    },
    'hms.pp.p9.eyebrow': {
      fr: 'Pain Point 09',
      nl: 'Pain Point 09',
      en: 'Pain Point 09'
    },
    'hms.pp.p9.h': {
      fr: '« La facturation est opaque pour nos clients. »',
      nl: '« De facturatie is ondoorzichtig voor onze klanten. »',
      en: '"Billing is opaque for our customers."'
    },
    'hms.pp.p9.theme': {
      fr: 'Billing',
      nl: 'Billing',
      en: 'Billing'
    },

    /* Section · hms.vp.* */
    'hms.vp.persona.hint': {
      fr: 'Trois <strong>jobs-to-be-done</strong> · reprendre la main sur le fleet, réduire les zones d\'ombre cross-protocole, tenir IEC 62443.',
      nl: 'Drie <strong>jobs-to-be-done</strong> · de fleet terug onder controle krijgen, de blinde vlekken cross-protocol verkleinen, IEC 62443 volhouden.',
      en: 'Three <strong>jobs-to-be-done</strong> · regain control of the fleet, reduce cross-protocol blind spots, hold IEC 62443.'
    },
    'hms.vp.persona.p1': {
      fr: '<strong>Klaus</strong> · Plant Manager · OEM DACH<br> <em>« Voir le tunnel Talk2M, pas chercher quel login marche. »</em>',
      nl: '<strong>Klaus</strong> · Plant Manager · OEM DACH<br> <em>« De Talk2M tunnel zien, niet zoeken welke login werkt. »</em>',
      en: '<strong>Klaus</strong> · Plant Manager · OEM DACH<br> <em>"See the Talk2M tunnel, not hunt for which login works."</em>'
    },
    'hms.vp.persona.p2': {
      fr: '<strong>Sven</strong> · Field Service Engineer · End-User Plant<br> <em>« Tenir l\'uptime de 200 machines. Si l\'outil parle pas, je suis dans le noir. »</em>',
      nl: '<strong>Sven</strong> · Field Service Engineer · End-User Plant<br> <em>« De uptime van 200 machines volhouden. Als de tool niet praat, sta ik in het donker. »</em>',
      en: '<strong>Sven</strong> · Field Service Engineer · End-User Plant<br> <em>"Hold the uptime of 200 machines. If the tool does not speak, I am in the dark."</em>'
    },
    'hms.vp.posture.claim': {
      fr: 'Pas une plateforme par segment. <span class="accent">Une plateforme orchestrée.</span>',
      nl: 'Geen platform per segment. <span class="accent">Eén georchestreerd platform.</span>',
      en: 'Not one platform per segment. <span class="accent">One orchestrated platform.</span>'
    },
    'hms.vp.posture.h': {
      fr: 'La posture',
      nl: 'De posture',
      en: 'The posture'
    },
    'hms.vp.posture.l1': {
      fr: '<strong>Pas</strong> 5 produits avec 5 logins, 5 back-offices.',
      nl: '<strong>Geen</strong> 5 producten met 5 logins, 5 back-offices.',
      en: '<strong>Not</strong> 5 products with 5 logins, 5 back-offices.'
    },
    'hms.vp.posture.l2': {
      fr: '<strong>Un host one-stop</strong>, onboarding piloté par persona.',
      nl: '<strong>Eén one-stop host</strong>, onboarding gestuurd door persona.',
      en: '<strong>A one-stop host</strong>, onboarding driven by persona.'
    },
    'hms.vp.posture.l3': {
      fr: '<strong>Capacités API-isées</strong> partagées par les 3 segments.',
      nl: '<strong>API-gedragen capaciteiten</strong> gedeeld door de 3 segmenten.',
      en: '<strong>API-driven capabilities</strong> shared by the 3 segments.'
    },
    'hms.vp.posture.l4': {
      fr: '<strong>Monitoring sans couture</strong>, fallback cellular/ethernet automatique.',
      nl: '<strong>Naadloze monitoring</strong>, automatische cellular/ethernet fallback.',
      en: '<strong>Seamless monitoring</strong>, automatic cellular/ethernet fallback.'
    },
    'hms.vp.posture.l5': {
      fr: '<strong>Compliance ready</strong> IEC 62443, NIST, Cyber Resilience Act.',
      nl: '<strong>Compliance ready</strong> IEC 62443, NIST, Cyber Resilience Act.',
      en: '<strong>Compliance ready</strong> IEC 62443, NIST, Cyber Resilience Act.'
    },
    'hms.vp.posture.src': {
      fr: 'Source · Strategic Process Proposal HMS 2021 · Relevance · Simplicity · Consistency',
      nl: 'Bron · Strategic Process Proposal HMS 2021 · Relevance · Simplicity · Consistency',
      en: 'Source · Strategic Process Proposal HMS 2021 · Relevance · Simplicity · Consistency'
    },
    'hms.vp.title': {
      fr: 'Une plateforme, ce n\'est pas <span class="accent">cinq portes d\'entrée.</span><br>C\'est une orchestration qui se règle sur le persona devant elle.',
      nl: 'Een platform is geen <span class="accent">vijf voordeuren.</span><br>Het is een orchestratie die zich afstemt op de persona die voor haar staat.',
      en: 'A platform is not <span class="accent">five front doors.</span><br>It is an orchestration that tunes itself to the persona in front of it.'
    },
    'hms.vp.translate.claim': {
      fr: '<span class="accent">5 livrables scopés MVP, 6 placés MVP++.</span>',
      nl: '<span class="accent">5 opleveringen in MVP scope, 6 in MVP++.</span>',
      en: '<span class="accent">5 deliverables scoped for MVP, 6 placed in MVP++.</span>'
    },
    'hms.vp.translate.colPain': {
      fr: '10 Pain Points',
      nl: '10 Pain Points',
      en: '10 Pain Points'
    },
    'hms.vp.translate.colVp': {
      fr: '5 VPs MVP livrées',
      nl: '5 MVP VP\'s opgeleverd',
      en: '5 MVP VPs delivered'
    },
    'hms.vp.translate.h': {
      fr: '10 douleurs → 11 chances → 5 VPs MVP',
      nl: '10 pijnpunten → 11 kansen → 5 MVP VP\'s',
      en: '10 pains → 11 opportunities → 5 MVP VPs'
    },
    'hms.vp.translate.mvpScope': {
      fr: '<strong>5 livrables MVP</strong>. <em>Market Expansion</em> et <em>Marketplace API</em> scopées <strong>MVP++ phase 2</strong>.',
      nl: '<strong>5 MVP opleveringen</strong>. <em>Market Expansion</em> en <em>Marketplace API</em> in scope van <strong>MVP++ fase 2</strong>.',
      en: '<strong>5 MVP deliverables</strong>. <em>Market Expansion</em> and <em>Marketplace API</em> scoped to <strong>MVP++ phase 2</strong>.'
    },
    'hms.vp.translate.r10n': {
      fr: '10. Expansion',
      nl: '10. Expansion',
      en: '10. Expansion'
    },
    'hms.vp.translate.r10v': {
      fr: '<em>MVP++</em>',
      nl: '<em>MVP++</em>',
      en: '<em>MVP++</em>'
    },
    'hms.vp.translate.r1n': {
      fr: '1. Time-to-Market',
      nl: '1. Time-to-Market',
      en: '1. Time-to-Market'
    },
    'hms.vp.translate.r1v': {
      fr: '<strong>VP 01 Onboarding</strong>',
      nl: '<strong>VP 01 Onboarding</strong>',
      en: '<strong>VP 01 Onboarding</strong>'
    },
    'hms.vp.translate.r2n': {
      fr: '2. Automation',
      nl: '2. Automation',
      en: '2. Automation'
    },
    'hms.vp.translate.r2v': {
      fr: 'VP 01 Onboarding',
      nl: 'VP 01 Onboarding',
      en: 'VP 01 Onboarding'
    },
    'hms.vp.translate.r3n': {
      fr: '3. Customer Autonomy',
      nl: '3. Customer Autonomy',
      en: '3. Customer Autonomy'
    },
    'hms.vp.translate.r3v': {
      fr: '<strong>VP 02 Monitoring</strong>',
      nl: '<strong>VP 02 Monitoring</strong>',
      en: '<strong>VP 02 Monitoring</strong>'
    },
    'hms.vp.translate.r4n': {
      fr: '4. Fragmentation',
      nl: '4. Fragmentation',
      en: '4. Fragmentation'
    },
    'hms.vp.translate.r4v': {
      fr: '<strong>VP 03 Audit Trail</strong>',
      nl: '<strong>VP 03 Audit Trail</strong>',
      en: '<strong>VP 03 Audit Trail</strong>'
    },
    'hms.vp.translate.r5n': {
      fr: '5. Proactivity',
      nl: '5. Proactivity',
      en: '5. Proactivity'
    },
    'hms.vp.translate.r5v': {
      fr: 'VP 02 Monitoring',
      nl: 'VP 02 Monitoring',
      en: 'VP 02 Monitoring'
    },
    'hms.vp.translate.r6n': {
      fr: '6. No Design System',
      nl: '6. No Design System',
      en: '6. No Design System'
    },
    'hms.vp.translate.r6v': {
      fr: 'VP 03 Audit Trail',
      nl: 'VP 03 Audit Trail',
      en: 'VP 03 Audit Trail'
    },
    'hms.vp.translate.r7n': {
      fr: '7. Rigidity',
      nl: '7. Rigidity',
      en: '7. Rigidity'
    },
    'hms.vp.translate.r7v': {
      fr: '<strong>VP 05 Support</strong>',
      nl: '<strong>VP 05 Support</strong>',
      en: '<strong>VP 05 Support</strong>'
    },
    'hms.vp.translate.r8n': {
      fr: '8. IXON Pressure',
      nl: '8. IXON Pressure',
      en: '8. IXON Pressure'
    },
    'hms.vp.translate.r8v': {
      fr: 'VP 02 + VP 05',
      nl: 'VP 02 + VP 05',
      en: 'VP 02 + VP 05'
    },
    'hms.vp.translate.r9n': {
      fr: '9. SLA Reporting',
      nl: '9. SLA Reporting',
      en: '9. SLA Reporting'
    },
    'hms.vp.translate.r9v': {
      fr: '<strong>VP 04 SLR</strong>',
      nl: '<strong>VP 04 SLR</strong>',
      en: '<strong>VP 04 SLR</strong>'
    },

    /* Section · hms.prototype.* */
    'hms.prototype.cycleCaption': {
      fr: 'Cinq Value Props · <strong>boucle machine builder</strong>. Pairing Flexy, observabilité flotte, traces signées, facture réconciliée, diagnostic in-app.',
      nl: 'Vijf Value Props · <strong>machinebouwer-lus</strong>. Flexy-pairing, vloot-observability, gesigneerde logs, gereconcilieerde facturen, in-app diagnose.',
      en: 'Five Value Props · <strong>a machine builder loop</strong>. Flexy pairing, fleet observability, signed audit trail, reconciled invoicing, in-app diagnostics.'
    },
    'hms.prototype.directionEyebrow': {
      fr: 'Prototype · premiers drafts',
      nl: 'Prototype · eerste drafts',
      en: 'Prototype · first drafts'
    },
    'hms.prototype.directionLead': {
      fr: 'À gauche · garder chaque plateforme en silo. Rapide, mais reproduit la fragmentation. À droite · host one-stop, onboarding par persona, fonctions API-isées. <strong>Silo livrait en six mois, one-stop a doublé le temps de dev.</strong> Le sponsor a accepté · <strong class="accent">elle ferme la porte qu\'IXON laissait ouverte sur les End-User Plants</strong>.',
      nl: 'Links · elk platform in silo houden. Snel, maar reproduceert de fragmentatie. Rechts · one-stop host, onboarding per persona, API-gedreven functies. <strong>Silo leverde in zes maanden, one-stop verdubbelde de ontwikkeltijd.</strong> De sponsor heeft aanvaard · <strong class="accent">het sluit de deur die IXON open liet bij de End-User Plants</strong>.',
      en: 'On the left · keep each platform in a silo. Fast, but reproduces the fragmentation. On the right · one-stop host, onboarding by persona, API-driven functions. <strong>Silo delivered in six months, one-stop doubled the dev time.</strong> The sponsor accepted · <strong class="accent">it closes the door IXON was leaving open on End-User Plants</strong>.'
    },
    'hms.prototype.directionTitle': {
      fr: 'Deux directions explorées. <span class="accent">Une retenue.</span>',
      nl: 'Twee richtingen verkend. <span class="accent">Eén weerhouden.</span>',
      en: 'Two directions explored. <span class="accent">One retained.</span>'
    },
    'hms.prototype.overviewEyebrow': {
      fr: 'Phase 03 · Develop · Cloud Revamp',
      nl: 'Fase 03 · Develop · Cloud Revamp',
      en: 'Phase 03 · Develop · Cloud Revamp'
    },
    'hms.prototype.overviewLead': {
      fr: 'eCatcher, M2Web, Talk2M · trois interfaces, un seul utilisateur. Le Cloud Revamp les fait converger autour de la machine.',
      nl: 'eCatcher, M2Web, Talk2M · drie interfaces, één gebruiker. De Cloud Revamp laat ze convergeren rond de machine.',
      en: 'eCatcher, M2Web, Talk2M · three interfaces, one user. The Cloud Revamp brings them to converge around the machine.'
    },
    'hms.prototype.overviewTitle': {
      fr: 'Trois plateformes, <span class="accent">une seule expérience.</span>',
      nl: 'Drie platformen, <span class="accent">één enkele ervaring.</span>',
      en: 'Three platforms, <span class="accent">a single experience.</span>'
    },
    'hms.prototype.p2Eyebrow': {
      fr: 'MVP++ · phase 2 · horizon 2026-2027',
      nl: 'MVP++ · fase 2 · horizon 2026-2027',
      en: 'MVP++ · phase 2 · 2026-2027 horizon'
    },
    'hms.prototype.p2Feat1Desc': {
      fr: 'Multi-langue, multi-région, compliance industrielle par juridiction · IEC 62443 (EU), NIST (US), CE / FCC. La stack API et le pricing freemium rendent l\'expansion économiquement viable, là où la dépendance au marché DACH la plafonnait.',
      nl: 'Meertalig, multi-regio, industriële compliance per jurisdictie · IEC 62443 (EU), NIST (US), CE / FCC. De API-stack en de freemium pricing maken de uitbreiding economisch haalbaar, daar waar de afhankelijkheid van de DACH-markt ze plafonneerde.',
      en: 'Multi-language, multi-region, industrial compliance by jurisdiction · IEC 62443 (EU), NIST (US), CE / FCC. The API stack and freemium pricing make expansion economically viable, where dependence on the DACH market used to cap it.'
    },
    'hms.prototype.p2Feat1Name': {
      fr: 'Expansion internationale',
      nl: 'Internationale uitbreiding',
      en: 'International expansion'
    },
    'hms.prototype.p2Feat2Desc': {
      fr: 'Le 3e segment Concept Report, Integrators et Resellers, embarque les Value Props dans leur propre offre. Le marketplace expose les API, la doc et le pricing partenaire. Croissance par effet de levier.',
      nl: 'Het 3e segment van het Concept Report, Integrators en Resellers, integreert de Value Props in hun eigen aanbod. De marketplace toont de API\'s, de documentatie en de partner-pricing. Groei via hefboomeffect.',
      en: 'The 3rd Concept Report segment, Integrators and Resellers, embeds the Value Props into their own offer. The marketplace exposes the APIs, the docs and the partner pricing. Growth through leverage.'
    },
    'hms.prototype.p2Feat2Name': {
      fr: 'Marketplace API · Integrators',
      nl: 'Marketplace API · Integrators',
      en: 'Marketplace API · Integrators'
    },
    'hms.prototype.p2Lead': {
      fr: 'Deux capacités identifiées en Discovery, placées hors MVP. Elles n\'attendent que la consolidation du host pour s\'activer. Source : Concept Report · Opportunity 6 (Market Expansion) + Opportunity 11 (Competitive Differentiation).',
      nl: 'Twee capaciteiten geïdentificeerd in Discovery, buiten MVP geplaatst. Ze wachten enkel op de consolidatie van de host om te activeren. Bron · Concept Report · Opportunity 6 (Market Expansion) + Opportunity 11 (Competitive Differentiation).',
      en: 'Two capabilities identified in Discovery, placed outside the MVP. They only wait on the consolidation of the host to activate. Source · Concept Report · Opportunity 6 (Market Expansion) + Opportunity 11 (Competitive Differentiation).'
    },
    'hms.prototype.p2Tag': {
      fr: 'Roadmap horizon 2026-2027 · post-MVP rollout',
      nl: 'Roadmap horizon 2026-2027 · post-MVP rollout',
      en: 'Roadmap 2026-2027 horizon · post-MVP rollout'
    },
    'hms.prototype.p2Title': {
      fr: 'Après le host one-stop, <span class="accent">l\'écosystème.</span>',
      nl: 'Na de one-stop host, <span class="accent">het ecosysteem.</span>',
      en: 'After the one-stop host, <span class="accent">the ecosystem.</span>'
    },
    'hms.prototype.utClientsHead': {
      fr: 'Les huit machine builders en validation',
      nl: 'De acht machine builders in validatie',
      en: 'The eight machine builders in validation'
    },
    'hms.prototype.utEyebrow': {
      fr: 'Phase 04 · Deliver · 8 machine builders · 5 fuseaux horaires',
      nl: 'Fase 04 · Deliver · 8 machine builders · 5 tijdzones',
      en: 'Phase 04 · Deliver · 8 machine builders · 5 time zones'
    },
    'hms.prototype.utLead': {
      fr: 'Concept Report présenté à 8 machine builders sur 5 fuseaux horaires. Klaus et Sven scorent trois scénarios · Connect, Diagnose, Audit.',
      nl: 'Concept Report voorgesteld aan 8 machine builders over 5 tijdzones. Klaus en Sven scoren drie scenario\'s · Connect, Diagnose, Audit.',
      en: 'Concept Report presented to 8 machine builders across 5 time zones. Klaus and Sven score three scenarios · Connect, Diagnose, Audit.'
    },
    'hms.prototype.utLessons': {
      fr: 'Connect et Diagnose passent. Audit fleet IEC 62443 tient moins. Zone reportée à la roadmap MVP++.',
      nl: 'Connect en Diagnose komen door. Audit fleet IEC 62443 houdt minder stand. Zone verplaatst naar de MVP++ roadmap.',
      en: 'Connect and Diagnose pass. Audit fleet IEC 62443 holds less. Zone deferred to the MVP++ roadmap.'
    },
    'hms.prototype.utName1': {
      fr: 'OEM presses · DACH',
      nl: 'OEM presses · DACH',
      en: 'OEM presses · DACH'
    },
    'hms.prototype.utName2': {
      fr: 'OEM · USA',
      nl: 'OEM · USA',
      en: 'OEM · USA'
    },
    'hms.prototype.utName3': {
      fr: 'End-User · agro',
      nl: 'End-User · agro',
      en: 'End-User · agro'
    },
    'hms.prototype.utName4': {
      fr: 'End-User · pharma',
      nl: 'End-User · pharma',
      en: 'End-User · pharma'
    },
    'hms.prototype.utName5': {
      fr: 'Integrator · Allemagne',
      nl: 'Integrator · Duitsland',
      en: 'Integrator · Germany'
    },
    'hms.prototype.utName6': {
      fr: 'Integrator · automation',
      nl: 'Integrator · automation',
      en: 'Integrator · automation'
    },
    'hms.prototype.utOutcome': {
      fr: '<strong class="accent">8 / 8 valident</strong> la direction one-stop <span class="brief-teaser__sep">·</span> <strong class="accent">Score combiné 4,03 / 5</strong> · 81% <span class="brief-teaser__sep">·</span> <strong class="accent">NPS 9 / 10</strong> <span class="brief-teaser__sep">·</span> sponsor go production.',
      nl: '<strong class="accent">8 / 8 valideren</strong> de one-stop richting <span class="brief-teaser__sep">·</span> <strong class="accent">Gecombineerde score 4,03 / 5</strong> · 81% <span class="brief-teaser__sep">·</span> <strong class="accent">NPS 9 / 10</strong> <span class="brief-teaser__sep">·</span> sponsor geeft go voor productie.',
      en: '<strong class="accent">8 / 8 validate</strong> the one-stop direction <span class="brief-teaser__sep">·</span> <strong class="accent">Combined score 4.03 / 5</strong> · 81% <span class="brief-teaser__sep">·</span> <strong class="accent">NPS 9 / 10</strong> <span class="brief-teaser__sep">·</span> sponsor green-lights production.'
    },
    'hms.prototype.utQuote': {
      fr: '« Pour la première fois, on avait un signal client avant le développement. Le sponsor ne se demandait plus si la direction tenait, il se demandait quand le rollout commence. »',
      nl: '« Voor het eerst hadden we een klantsignaal voor de ontwikkeling. De sponsor vroeg zich niet meer af of de richting klopte, hij vroeg zich af wanneer de rollout begint. »',
      en: '"For the first time, we had a customer signal before development. The sponsor was no longer asking whether the direction held, he was asking when the rollout starts."'
    },
    'hms.prototype.utScenA': {
      fr: 'Connect machine',
      nl: 'Connect machine',
      en: 'Connect machine'
    },
    'hms.prototype.utScenAClaim': {
      fr: 'Score combiné <span class="accent">4,4 / 5 · 88%</span>',
      nl: 'Gecombineerde score <span class="accent">4,4 / 5 · 88%</span>',
      en: 'Combined score <span class="accent">4.4 / 5 · 88%</span>'
    },
    'hms.prototype.utScenAL1': {
      fr: '<strong>Klaus · 4,0 / 5</strong>',
      nl: '<strong>Klaus · 4,0 / 5</strong>',
      en: '<strong>Klaus · 4.0 / 5</strong>'
    },
    'hms.prototype.utScenAL2': {
      fr: '<strong>Sven · 4,8 / 5</strong> · NPS 9/10',
      nl: '<strong>Sven · 4,8 / 5</strong> · NPS 9/10',
      en: '<strong>Sven · 4.8 / 5</strong> · NPS 9/10'
    },
    'hms.prototype.utScenAL3': {
      fr: 'Raccorder une machine au tunnel Talk2M en moins de 10 minutes',
      nl: 'Een machine aansluiten op de Talk2M tunnel in minder dan 10 minuten',
      en: 'Connect a machine to the Talk2M tunnel in under 10 minutes'
    },
    'hms.prototype.utScenB': {
      fr: 'Diagnose offline gateway',
      nl: 'Diagnose offline gateway',
      en: 'Diagnose offline gateway'
    },
    'hms.prototype.utScenBClaim': {
      fr: 'Score combiné <span class="accent">4,1 / 5 · 82%</span>',
      nl: 'Gecombineerde score <span class="accent">4,1 / 5 · 82%</span>',
      en: 'Combined score <span class="accent">4.1 / 5 · 82%</span>'
    },
    'hms.prototype.utScenBL1': {
      fr: '<strong>Klaus · 3,7 / 5</strong> · réassurance basse sur fallback cellular',
      nl: '<strong>Klaus · 3,7 / 5</strong> · lage geruststelling op cellular fallback',
      en: '<strong>Klaus · 3.7 / 5</strong> · low reassurance on cellular fallback'
    },
    'hms.prototype.utScenBL2': {
      fr: '<strong>Sven · 4,5 / 5</strong>',
      nl: '<strong>Sven · 4,5 / 5</strong>',
      en: '<strong>Sven · 4.5 / 5</strong>'
    },
    'hms.prototype.utScenBL3': {
      fr: 'Flexy hors ligne · isoler, basculer cellular, replacer',
      nl: 'Flexy offline · isoleren, overschakelen naar cellular, terugplaatsen',
      en: 'Flexy offline · isolate, switch to cellular, restore'
    },
    'hms.prototype.utScenC': {
      fr: 'Audit fleet · IEC 62443',
      nl: 'Audit fleet · IEC 62443',
      en: 'Audit fleet · IEC 62443'
    },
    'hms.prototype.utScenCClaim': {
      fr: 'Score combiné <span class="accent">3,6 / 5 · 72%</span>',
      nl: 'Gecombineerde score <span class="accent">3,6 / 5 · 72%</span>',
      en: 'Combined score <span class="accent">3.6 / 5 · 72%</span>'
    },
    'hms.prototype.utScenCL1': {
      fr: '<strong>Klaus · 3,2 / 5</strong> · réassurance 1 / 5 sur preuve compliance',
      nl: '<strong>Klaus · 3,2 / 5</strong> · geruststelling 1 / 5 op compliance-bewijs',
      en: '<strong>Klaus · 3.2 / 5</strong> · reassurance 1 / 5 on compliance evidence'
    },
    'hms.prototype.utScenCL2': {
      fr: '<strong>Sven · 4,0 / 5</strong>',
      nl: '<strong>Sven · 4,0 / 5</strong>',
      en: '<strong>Sven · 4.0 / 5</strong>'
    },
    'hms.prototype.utScenCL3': {
      fr: 'Produire l\'audit trail à un auditeur IEC 62443',
      nl: 'De audit trail voorleggen aan een IEC 62443 auditor',
      en: 'Produce the audit trail to an IEC 62443 auditor'
    },
    'hms.prototype.utSeg1': {
      fr: 'OEM Machine Builder',
      nl: 'OEM Machine Builder',
      en: 'OEM Machine Builder'
    },
    'hms.prototype.utSeg2': {
      fr: 'OEM Machine Builder',
      nl: 'OEM Machine Builder',
      en: 'OEM Machine Builder'
    },
    'hms.prototype.utSeg3': {
      fr: 'End-User Plant',
      nl: 'End-User Plant',
      en: 'End-User Plant'
    },
    'hms.prototype.utSeg4': {
      fr: 'End-User Plant',
      nl: 'End-User Plant',
      en: 'End-User Plant'
    },
    'hms.prototype.utSeg5': {
      fr: 'Integrator',
      nl: 'Integrator',
      en: 'Integrator'
    },
    'hms.prototype.utSeg6': {
      fr: 'Integrator',
      nl: 'Integrator',
      en: 'Integrator'
    },
    'hms.prototype.utStat1': {
      fr: 'Machine builders valident',
      nl: 'Machine builders valideren',
      en: 'Machine builders validate'
    },
    'hms.prototype.utStat2': {
      fr: 'Score combiné Heuristique · 81%',
      nl: 'Gecombineerde Heuristic score · 81%',
      en: 'Combined Heuristic score · 81%'
    },
    'hms.prototype.utStat3': {
      fr: 'NPS · 3 scénarios',
      nl: 'NPS · 3 scenario\'s',
      en: 'NPS · 3 scenarios'
    },
    'hms.prototype.utTitle': {
      fr: 'Huit machine builders valident. <span class="accent">Klaus et Sven scorent la grille détaillée.</span>',
      nl: 'Acht machine builders valideren. <span class="accent">Klaus en Sven scoren het gedetailleerde grid.</span>',
      en: 'Eight machine builders validate. <span class="accent">Klaus and Sven score the detailed grid.</span>'
    },
    'hms.prototype.utVerdict1': {
      fr: 'Gros parc. Validation orchestration et audit-ready.',
      nl: 'Grote vloot. Validatie van orchestratie en audit-ready.',
      en: 'Large fleet. Validates orchestration and audit-ready.'
    },
    'hms.prototype.utVerdict2': {
      fr: 'Compliance NIST. Demande API phase 2.',
      nl: 'NIST compliance. Vraagt API in fase 2.',
      en: 'NIST compliance. Requests API in phase 2.'
    },
    'hms.prototype.utVerdict3': {
      fr: '50 machines, uptime 99,5%. Validation onboarding IT-less.',
      nl: '50 machines, uptime 99,5%. Validatie van IT-less onboarding.',
      en: '50 machines, 99.5% uptime. Validates IT-less onboarding.'
    },
    'hms.prototype.utVerdict4': {
      fr: 'Validation freemium tiered, pay-as-you-grow.',
      nl: 'Validatie van freemium tiered, pay-as-you-grow.',
      en: 'Validates freemium tiered, pay-as-you-grow.'
    },
    'hms.prototype.utVerdict5': {
      fr: 'Embarque Talk2M. Demande marketplace API.',
      nl: 'Integreert Talk2M. Vraagt marketplace API.',
      en: 'Embeds Talk2M. Requests marketplace API.'
    },
    'hms.prototype.utVerdict6': {
      fr: 'Validation API. Reproductible chez ses clients SCADA/MES.',
      nl: 'API validatie. Reproduceerbaar bij zijn SCADA/MES klanten.',
      en: 'Validates API. Reproducible across his SCADA/MES customers.'
    },
    'hms.prototype.vp1Eyebrow': {
      fr: 'VP 01 · Onboarding',
      nl: 'VP 01 · Onboarding',
      en: 'VP 01 · Onboarding'
    },
    'hms.prototype.vp1F1h': {
      fr: 'Self-service raccordement Flexy',
      nl: 'Self-service Flexy-aansluiting',
      en: 'Self-service Flexy connection'
    },
    'hms.prototype.vp1F1p': {
      fr: 'Le machine builder configure ses passerelles lui-même, sans ticket IT.',
      nl: 'De machine builder configureert zelf zijn gateways, zonder IT-ticket.',
      en: 'The machine builder configures gateways himself, no IT ticket.'
    },
    'hms.prototype.vp1F2h': {
      fr: 'Persona-driven dashboards',
      nl: 'Persona-driven dashboards',
      en: 'Persona-driven dashboards'
    },
    'hms.prototype.vp1F2p': {
      fr: 'Vues sur mesure pour OEM, End-User Plants, Integrators. Le wizard sait qui est devant lui.',
      nl: 'Views op maat voor OEM, End-User Plants, Integrators. De wizard weet wie er voor hem zit.',
      en: 'Tailored views for OEMs, End-User Plants, Integrators. The wizard knows who is in front of it.'
    },
    'hms.prototype.vp1F3h': {
      fr: 'Self-onboarding End-User Plants',
      nl: 'Self-onboarding End-User Plants',
      en: 'Self-onboarding End-User Plants'
    },
    'hms.prototype.vp1F3p': {
      fr: 'Process simplifié pour les plants sans équipe IT dédiée. Ferme la porte qu\'IXON laisse ouverte.',
      nl: 'Vereenvoudigd proces voor plants zonder eigen IT-team. Sluit de deur die IXON open laat.',
      en: 'Simplified process for plants without a dedicated IT team. Closes the door IXON leaves open.'
    },
    'hms.prototype.vp1SourceLab': {
      fr: 'Référence sur demande',
      nl: 'Referentie op aanvraag',
      en: 'Reference on request'
    },
    'hms.prototype.vp1SourceRef': {
      fr: 'HMS Strategic Process Proposal 2021 · VP 01 Self-Onboarding industriel · framework Relevance/Simplicity/Consistency',
      nl: 'HMS Strategic Process Proposal 2021 · VP 01 Industriële Self-Onboarding · framework Relevance/Simplicity/Consistency',
      en: 'HMS Strategic Process Proposal 2021 · VP 01 Industrial Self-Onboarding · Relevance/Simplicity/Consistency framework'
    },
    'hms.prototype.vp1Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p>Notre <strong>self-onboarding industriel</strong> aide les <strong>Plant Operators et machine builders</strong> à <strong>raccorder une nouvelle machine sans appeler l\'IT</strong> · accélère la mise en service sur passerelles Flexy.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p>Onze <strong>industriële self-onboarding</strong> helpt <strong>Plant Operators en machine builders</strong> om <strong>een nieuwe machine aan te sluiten zonder IT te bellen</strong> · versnelt de inproductiename op Flexy-gateways.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p>Our <strong>industrial self-onboarding</strong> helps <strong>Plant Operators and machine builders</strong> <strong>connect a new machine without calling IT</strong> · accelerates commissioning on Flexy gateways.</p>'
    },
    'hms.prototype.vp1Title': {
      fr: 'Démarrer sans <span class="accent">passer par l\'IT.</span>',
      nl: 'Starten zonder <span class="accent">langs IT te gaan.</span>',
      en: 'Start without <span class="accent">going through IT.</span>'
    },
    'hms.prototype.vp2Eyebrow': {
      fr: 'VP 02 · Monitoring',
      nl: 'VP 02 · Monitoring',
      en: 'VP 02 · Monitoring'
    },
    'hms.prototype.vp2F1h': {
      fr: 'End-to-end visibility',
      nl: 'End-to-end visibility',
      en: 'End-to-end visibility'
    },
    'hms.prototype.vp2F1p': {
      fr: 'Pipeline Connect → Monitor → Diagnose → Control observable. Plus d\'appel support à 5 fuseaux horaires.',
      nl: 'Pipeline Connect → Monitor → Diagnose → Control observeerbaar. Geen support-call meer over 5 tijdzones.',
      en: 'Pipeline Connect → Monitor → Diagnose → Control observable. No more support call across 5 time zones.'
    },
    'hms.prototype.vp2F2h': {
      fr: 'Proactive alerts',
      nl: 'Proactive alerts',
      en: 'Proactive alerts'
    },
    'hms.prototype.vp2F2p': {
      fr: 'Le système notifie avant que le machine builder ne s\'en aperçoive. SMS ou e-mail.',
      nl: 'Het systeem verwittigt voor de machine builder het merkt. SMS of e-mail.',
      en: 'The system notifies before the machine builder notices. SMS or email.'
    },
    'hms.prototype.vp2F3h': {
      fr: 'Fallback multi-canal',
      nl: 'Multi-channel fallback',
      en: 'Multi-channel fallback'
    },
    'hms.prototype.vp2F3p': {
      fr: 'Si le VPN échoue, fallback cellular en un clic.',
      nl: 'Als de VPN faalt, cellular fallback met één klik.',
      en: 'If the VPN fails, cellular fallback in one click.'
    },
    'hms.prototype.vp2SourceLab': {
      fr: 'Référence sur demande',
      nl: 'Referentie op aanvraag',
      en: 'Reference on request'
    },
    'hms.prototype.vp2SourceRef': {
      fr: 'HMS Heuristic Evaluation 2021 · VP 02 Remote Monitoring · Talk2M pipeline observable end-to-end',
      nl: 'HMS Heuristic Evaluation 2021 · VP 02 Remote Monitoring · Talk2M pipeline observable end-to-end',
      en: 'HMS Heuristic Evaluation 2021 · VP 02 Remote Monitoring · Talk2M pipeline observable end-to-end'
    },
    'hms.prototype.vp2Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p><strong>Monitoring temps réel</strong> · machine builders et end-user plants tracent l\'état des machines à distance · visibilité end-to-end Talk2M, alertes proactives Flexy.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p><strong>Real-time monitoring</strong> · machine builders en end-user plants volgen de staat van de machines op afstand · end-to-end zichtbaarheid via Talk2M, proactieve Flexy-alerts.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p><strong>Real-time monitoring</strong> · machine builders and end-user plants track the state of machines remotely · end-to-end Talk2M visibility, proactive Flexy alerts.</p>'
    },
    'hms.prototype.vp2Title': {
      fr: 'Voir les flux <span class="accent">en direct.</span>',
      nl: 'De flows zien <span class="accent">in real-time.</span>',
      en: 'See the flows <span class="accent">live.</span>'
    },
    'hms.prototype.vp3Eyebrow': {
      fr: 'VP 03 + VP 04 · Reports & Billing',
      nl: 'VP 03 + VP 04 · Reports & Billing',
      en: 'VP 03 + VP 04 · Reports & Billing'
    },
    'hms.prototype.vp3F1h': {
      fr: 'Audit-ready by default',
      nl: 'Audit-ready by default',
      en: 'Audit-ready by default'
    },
    'hms.prototype.vp3F1p': {
      fr: 'Chaque session distante génère ses traces signées. Conformité IEC 62443 et SOC 2.',
      nl: 'Elke remote sessie genereert ondertekende traces. Conform IEC 62443 en SOC 2.',
      en: 'Every remote session generates signed traces. Compliant with IEC 62443 and SOC 2.'
    },
    'hms.prototype.vp3F2h': {
      fr: 'Pricing tiered transparent',
      nl: 'Transparante tiered pricing',
      en: 'Transparent tiered pricing'
    },
    'hms.prototype.vp3F2p': {
      fr: 'Basic / Gold / Custom selon volume. Pay-as-you-go pour les End-User Plants.',
      nl: 'Basic / Gold / Custom volgens volume. Pay-as-you-go voor End-User Plants.',
      en: 'Basic / Gold / Custom by volume. Pay-as-you-go for End-User Plants.'
    },
    'hms.prototype.vp3F3h': {
      fr: 'Réconciliation uptime ↔ SLA',
      nl: 'Uptime ↔ SLA reconciliatie',
      en: 'Uptime ↔ SLA reconciliation'
    },
    'hms.prototype.vp3F3p': {
      fr: 'Chaque ligne de facture pointe vers les logs Talk2M. Plus de CSV réconcilié à la main.',
      nl: 'Elke factuurlijn verwijst naar de Talk2M logs. Geen CSV meer manueel reconciliëren.',
      en: 'Every billing line points to the Talk2M logs. No more CSV reconciled by hand.'
    },
    'hms.prototype.vp3SourceLab': {
      fr: 'Référence sur demande',
      nl: 'Referentie op aanvraag',
      en: 'Reference on request'
    },
    'hms.prototype.vp3SourceRef': {
      fr: 'HMS Heuristic Evaluation 2021 · VP 03 Audit Trail & Diagnostics + VP 04 Service Level Reporting',
      nl: 'HMS Heuristic Evaluation 2021 · VP 03 Audit Trail & Diagnostics + VP 04 Service Level Reporting',
      en: 'HMS Heuristic Evaluation 2021 · VP 03 Audit Trail & Diagnostics + VP 04 Service Level Reporting'
    },
    'hms.prototype.vp3Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p><strong>Audit Trail &amp; Diagnostics</strong> aident <strong>Compliance, Operations, Engineering</strong> à <strong>tracer chaque session et rester conformes</strong> · logs signés Talk2M, preuves IEC 62443 et SOC 2.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p><strong>Audit Trail &amp; Diagnostics</strong> helpen <strong>Compliance, Operations, Engineering</strong> om <strong>elke sessie te tracen en compliant te blijven</strong> · ondertekende Talk2M logs, bewijsstukken IEC 62443 en SOC 2.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p><strong>Audit Trail &amp; Diagnostics</strong> help <strong>Compliance, Operations, Engineering</strong> <strong>trace every session and stay compliant</strong> · signed Talk2M logs, IEC 62443 and SOC 2 evidence.</p>'
    },
    'hms.prototype.vp3Title': {
      fr: 'Tracer, archiver, <span class="accent">facturer juste.</span>',
      nl: 'Tracen, archiveren, <span class="accent">juist factureren.</span>',
      en: 'Trace, archive, <span class="accent">bill accurately.</span>'
    },
    'hms.prototype.vp4Statement': {
      fr: '<span class="vp-statement__lab">Service Level Reporting</span> <p><strong>Service Level Reporting</strong> centralise les rapports d\'uptime Flexy et preuves de connectivité par site.</p>',
      nl: '<span class="vp-statement__lab">Service Level Reporting</span> <p><strong>Service Level Reporting</strong> centraliseert de Flexy uptime-rapporten en connectiviteitsbewijzen per site.</p>',
      en: '<span class="vp-statement__lab">Service Level Reporting</span> <p><strong>Service Level Reporting</strong> centralises Flexy uptime reports and connectivity evidence per site.</p>'
    },
    'hms.prototype.vp5Eyebrow': {
      fr: 'VP 05 · Support',
      nl: 'VP 05 · Support',
      en: 'VP 05 · Support'
    },
    'hms.prototype.vp5F1h': {
      fr: 'Portail self-service',
      nl: 'Self-service portaal',
      en: 'Self-service portal'
    },
    'hms.prototype.vp5F1p': {
      fr: 'Tickets, suivi live, knowledge base par persona. L\'utilisateur résout d\'abord.',
      nl: 'Tickets, live opvolging, knowledge base per persona. De gebruiker lost eerst zelf op.',
      en: 'Tickets, live tracking, knowledge base by persona. The user resolves first.'
    },
    'hms.prototype.vp5F2h': {
      fr: 'Escalation 3 tiers',
      nl: 'Escalation 3 tiers',
      en: 'Escalation 3 tiers'
    },
    'hms.prototype.vp5F2p': {
      fr: 'Tier 1 self-service · Tier 2 Ewon SLA · Tier 3 Engineering Halmstad.',
      nl: 'Tier 1 self-service · Tier 2 Ewon SLA · Tier 3 Engineering Halmstad.',
      en: 'Tier 1 self-service · Tier 2 Ewon SLA · Tier 3 Halmstad Engineering.'
    },
    'hms.prototype.vp5F3h': {
      fr: 'Unified ticketing',
      nl: 'Unified ticketing',
      en: 'Unified ticketing'
    },
    'hms.prototype.vp5F3p': {
      fr: 'Un portail pour Flexy onboarding, Talk2M monitoring, diagnostics, SLA reporting.',
      nl: 'Eén portaal voor Flexy onboarding, Talk2M monitoring, diagnostiek, SLA reporting.',
      en: 'One portal for Flexy onboarding, Talk2M monitoring, diagnostics, SLA reporting.'
    },
    'hms.prototype.vp5SourceLab': {
      fr: 'Référence sur demande',
      nl: 'Referentie op aanvraag',
      en: 'Reference on request'
    },
    'hms.prototype.vp5SourceRef': {
      fr: 'HMS Strategic Process Proposal 2021 · VP 05 Support self-service + Ewon SLA Tier 2',
      nl: 'HMS Strategic Process Proposal 2021 · VP 05 Support self-service + Ewon SLA Tier 2',
      en: 'HMS Strategic Process Proposal 2021 · VP 05 Self-service Support + Ewon SLA Tier 2'
    },
    'hms.prototype.vp5Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p>Notre <strong>plateforme de support intégrée</strong> donne <strong>plus d\'autonomie et une résolution rapide</strong> aux machine builders et end-user plants sur passerelles Flexy critiques · portail self-service, tickets, SLA, accès direct Engineering Halmstad.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p>Ons <strong>geïntegreerd support-platform</strong> geeft <strong>meer autonomie en snelle oplossing</strong> aan machine builders en end-user plants op kritieke Flexy-gateways · self-service portaal, tickets, SLA, directe toegang Engineering Halmstad.</p>',
      en: '<span class="vp-statement__lab">Value Proposition · verbatim Strategic Process Proposal HMS</span> <p>Our <strong>integrated support platform</strong> gives <strong>more autonomy and fast resolution</strong> to machine builders and end-user plants on critical Flexy gateways · self-service portal, tickets, SLA, direct access to Halmstad Engineering.</p>'
    },
    'hms.prototype.vp5Title': {
      fr: 'Résoudre <span class="accent">sans appeler.</span>',
      nl: 'Oplossen <span class="accent">zonder te bellen.</span>',
      en: 'Resolve <span class="accent">without calling.</span>'
    },
    'hms.prototype.vpBadName': {
      fr: 'Silo as-is',
      nl: 'Silo as-is',
      en: 'Silo as-is'
    },
    'hms.prototype.vpBadNote': {
      fr: 'Cinq apps, cinq logins, cinq supports. Le client jongle, l\'IT maintient cinq stacks. La solution la plus rapide, mais qui reproduit la fragmentation pointée en interview.',
      nl: 'Vijf apps, vijf logins, vijf supports. De klant jongleert, de IT onderhoudt vijf stacks. De snelste oplossing, maar reproduceert de fragmentatie die in interviews naar boven kwam.',
      en: 'Five apps, five logins, five supports. The customer juggles, IT maintains five stacks. The fastest solution, but reproduces the fragmentation surfaced in interviews.'
    },
    'hms.prototype.vpBadVerdict': {
      fr: 'Une porte par produit',
      nl: 'Eén deur per product',
      en: 'One door per product'
    },
    'hms.prototype.vpClaim': {
      fr: 'Pas une suite de produits. <span class="accent">Un host orchestré, piloté par persona.</span>',
      nl: 'Geen suite van producten. <span class="accent">Eén georchestreerde host, gestuurd door persona.</span>',
      en: 'Not a suite of products. <span class="accent">An orchestrated host, driven by persona.</span>'
    },
    'hms.prototype.vpGoodName': {
      fr: 'Plateforme orchestrée',
      nl: 'Georchestreerd platform',
      en: 'Orchestrated platform'
    },
    'hms.prototype.vpGoodNote': {
      fr: 'La plateforme reconnaît Joseph, son rôle, son segment. KPI et notifications cadrés sur ses goals. Une stack pour l\'IT, une plateforme pour le Business, une page d\'accueil par persona.',
      nl: 'Het platform herkent Joseph, zijn rol, zijn segment. KPI\'s en notificaties gekaderd op zijn doelen. Eén stack voor IT, één platform voor Business, één homepage per persona.',
      en: 'The platform recognises Joseph, his role, his segment. KPIs and notifications framed by his goals. One stack for IT, one platform for Business, one home page per persona.'
    },
    'hms.prototype.vpGoodVerdict': {
      fr: 'One-stop platform',
      nl: 'One-stop platform',
      en: 'One-stop platform'
    },

    /* Section · hms.snm.* */
    'hms.snm.a1': {
      fr: '10 Pain Points',
      nl: '10 Pain Points',
      en: '10 Pain Points'
    },
    'hms.snm.a3': {
      fr: 'AS-IS journey',
      nl: 'AS-IS journey',
      en: 'AS-IS journey'
    },
    'hms.snm.a4': {
      fr: 'Ateliers cocréation',
      nl: 'Co-creatie workshops',
      en: 'Co-creation workshops'
    },
    'hms.snm.c1': {
      fr: '76 pages · sponsor go prod',
      nl: '76 pagina\'s · sponsor go productie',
      en: '76 pages · sponsor go production'
    },
    'hms.snm.c2': {
      fr: 'Alignement Business ⊥ IT',
      nl: 'Alignment Business ⊥ IT',
      en: 'Business ⊥ IT alignment'
    },
    'hms.snm.c3': {
      fr: 'Outcome · 2 M€ débloqués',
      nl: 'Outcome · 2 M€ vrijgemaakt',
      en: 'Outcome · 2 M€ unlocked'
    },
    'hms.snm.c4': {
      fr: 'Lessons · trois leviers',
      nl: 'Lessons · drie hefbomen',
      en: 'Lessons · three levers'
    },
    'hms.snm.cChap': {
      fr: 'Concept Report',
      nl: 'Concept Report',
      en: 'Concept Report'
    },
    'hms.snm.cTW': {
      fr: 'Triple-Win',
      nl: 'Triple-Win',
      en: 'Triple-Win'
    },
    'hms.snm.gAnalyse': {
      fr: 'Analyse',
      nl: 'Analyse',
      en: 'Analysis'
    },
    'hms.snm.gConceptReport': {
      fr: 'Report',
      nl: 'Report',
      en: 'Report'
    },
    'hms.snm.gIdeation': {
      fr: 'Ideation',
      nl: 'Ideation',
      en: 'Ideation'
    },
    'hms.snm.gIntake': {
      fr: 'Intake',
      nl: 'Intake',
      en: 'Intake'
    },
    'hms.snm.gPrototype': {
      fr: 'Prototype',
      nl: 'Prototype',
      en: 'Prototype'
    },
    'hms.snm.gResearch': {
      fr: 'Research',
      nl: 'Research',
      en: 'Research'
    },
    'hms.snm.gValueProp': {
      fr: 'VP',
      nl: 'VP',
      en: 'VP'
    },
    'hms.snm.iChap': {
      fr: 'Phase Ideation',
      nl: 'Fase Ideation',
      en: 'Phase Ideation'
    },
    'hms.snm.intakeRoadmap': {
      fr: 'Roadmap',
      nl: 'Roadmap',
      en: 'Roadmap'
    },
    'hms.snm.intakeTip': {
      fr: 'Brief intake',
      nl: 'Brief intake',
      en: 'Brief intake'
    },
    'hms.snm.p1': {
      fr: 'Silo vs one-stop',
      nl: 'Silo vs one-stop',
      en: 'Silo vs one-stop'
    },
    'hms.snm.p2': {
      fr: '3 segments · 1 host',
      nl: '3 segmenten · 1 host',
      en: '3 segments · 1 host'
    },
    'hms.snm.p4': {
      fr: 'User test 8 clients',
      nl: 'User test 8 klanten',
      en: 'User test 8 customers'
    },
    'hms.snm.pPhase2': {
      fr: 'MVP++',
      nl: 'MVP++',
      en: 'MVP++'
    },
    'hms.snm.pVp1': {
      fr: 'VP 01 Onboarding',
      nl: 'VP 01 Onboarding',
      en: 'VP 01 Onboarding'
    },
    'hms.snm.pVp2': {
      fr: 'VP 02 Monitoring',
      nl: 'VP 02 Monitoring',
      en: 'VP 02 Monitoring'
    },
    'hms.snm.pVp3': {
      fr: 'VP 03+04 Reports/Billing',
      nl: 'VP 03+04 Reports/Billing',
      en: 'VP 03+04 Reports/Billing'
    },
    'hms.snm.pVp5': {
      fr: 'VP 05 Support',
      nl: 'VP 05 Support',
      en: 'VP 05 Support'
    },
    'hms.snm.r1': {
      fr: '6 expert interviews internes',
      nl: '6 interne expert interviews',
      en: '6 internal expert interviews'
    },
    'hms.snm.r2': {
      fr: '8 customer interviews',
      nl: '8 customer interviews',
      en: '8 customer interviews'
    },
    'hms.snm.r3': {
      fr: '3 segments marché',
      nl: '3 marktsegmenten',
      en: '3 market segments'
    },
    'hms.snm.r4': {
      fr: '2 personas illustratifs · Klaus & Sven',
      nl: '2 illustratieve personas · Klaus & Sven',
      en: '2 illustrative personas · Klaus & Sven'
    },
    'hms.snm.vp': {
      fr: 'VP cristallisation',
      nl: 'VP kristallisatie',
      en: 'VP crystallisation'
    },
    'hms.snm.vpContent': {
      fr: 'VP déballée',
      nl: 'VP uitgepakt',
      en: 'VP unpacked'
    },

// 25 entries



  };

  /* --------- helpers --------- */
  function detectStartLang() {
    const url = new URLSearchParams(location.search);
    const hash = new URLSearchParams(location.hash.replace(/^#/, ''));
    const fromUrl = url.get('lang') || hash.get('lang');
    if (fromUrl && SUPPORTED.includes(fromUrl)) return fromUrl;
    let stored = null;
    try { stored = localStorage.getItem(STORE_KEY); } catch (_) {}
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : DEFAULT;
  }

  function getValue(key, lang) {
    const entry = dict[key];
    if (!entry) return null;
    return entry[lang] || entry[DEFAULT] || entry.en || null;
  }

  function applyLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = getValue(el.getAttribute('data-i18n'), lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = getValue(el.getAttribute('data-i18n-html'), lang);
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const v = getValue(key, lang);
        if (attr && v != null) el.setAttribute(attr, v);
      });
    });
    const titleKey = document.documentElement.getAttribute('data-title-key');
    if (titleKey) {
      const v = getValue(titleKey, lang);
      if (v) document.title = v;
    }
    const descKey = document.documentElement.getAttribute('data-desc-key');
    if (descKey) {
      const v = getValue(descKey, lang);
      const m = document.querySelector('meta[name="description"]');
      if (m && v) m.setAttribute('content', v);
    }
    /* CVE 2026-05-04 S6.2 · aria-current="page" sur la langue active +
       is-active class. Lecteur d'écran annonce "current page" sur le bouton. */
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      const isActive = btn.getAttribute('data-lang-btn') === lang;
      btn.classList.toggle('is-active', isActive);
      if (isActive) {
        btn.setAttribute('aria-current', 'page');
      } else {
        btn.removeAttribute('aria-current');
      }
    });
    try { localStorage.setItem(STORE_KEY, lang); } catch (_) {}
  }

  /* CVE 2026-05-04 S2.4 · le clic langue NAVIGUE vers la version pré-rendue
     (/, /nl/, /en/) au lieu de juste swap le DOM. SEO multilingue : Google
     crawle 3 URLs distinctes au lieu d'une seule. Fallback applyLang si la
     page cible n'existe pas (ex : luminus.html en NL/EN). */
  function langUrl(targetLang) {
    const path = location.pathname.replace(/\/(nl|en)\//, '/');
    if (targetLang === 'fr') return path;
    /* sinon préfixe /nl/ ou /en/ devant le chemin (en gardant le filename) */
    if (path === '/' || path === '/index.html') return `/${targetLang}/`;
    return `/${targetLang}${path}`;
  }
  function bindSwitcher() {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const next = btn.getAttribute('data-lang-btn');
        if (!SUPPORTED.includes(next)) return;
        const url = langUrl(next);
        /* HEAD check pour éviter 404 sur pages non traduites (ex: luminus) */
        fetch(url, { method: 'HEAD' }).then(r => {
          if (r.ok) {
            try { localStorage.setItem(STORE_KEY, next); } catch (_) {}
            location.href = url;
          } else {
            applyLang(next);  /* fallback DOM swap */
          }
        }).catch(() => applyLang(next));
      });
    });
  }

  function init() {
    bindSwitcher();
    applyLang(detectStartLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.cveI18n = { applyLang, dict, SUPPORTED };
})();
