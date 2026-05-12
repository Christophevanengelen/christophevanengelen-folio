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
    'nav.role': { fr: 'Service Designer · Freelance', nl: 'Service Designer · Freelance', en: 'Service Designer · Freelance' },
    'nav.cases': { fr: 'Études de cas', nl: 'Case studies', en: 'Case studies' },
    'nav.back': { fr: '← Retour au portfolio', nl: '← Terug naar portfolio', en: '← Back to portfolio' },
    'nav.backCase': { fr: '← Retour au case BNP', nl: '← Terug naar BNP-case', en: '← Back to BNP case' },
    'nav.luminusPill': { fr: 'Pitch Luminus', nl: 'Luminus-pitch', en: 'Luminus pitch' },

    'footer.thanks': { fr: 'Merci.', nl: 'Dank u.', en: 'Thank you.' },
    'footer.lookForward': { fr: 'Au plaisir de la conversation.', nl: 'Ik kijk uit naar het gesprek.', en: 'I look forward to the conversation.' },
    'footer.contact': { fr: 'Contact', nl: 'Contact', en: 'Contact' },
    'footer.for': { fr: 'Préparé pour', nl: 'Voorbereid voor', en: 'Prepared for' },
    'footer.forCompany': { fr: 'Luminus', nl: 'Luminus', en: 'Luminus' },
    'footer.forSubtitle': { fr: 'Entretien Service Designer', nl: 'Sollicitatiegesprek Service Designer', en: 'Service Designer interview' },
    'footer.forDate': { fr: 'Avril 2026', nl: 'April 2026', en: 'April 2026' },
    'footer.copy': {
      fr: '© Christophe van Engelen, 2026. Artefacts originaux © BNP Paribas Fortis 2017–2018, repris ici pour illustration de portfolio.',
      nl: '© Christophe van Engelen, 2026. Originele artefacten © BNP Paribas Fortis 2017–2018, hier gebruikt ter illustratie van portfolio.',
      en: '© Christophe van Engelen, 2026. Original artefacts © BNP Paribas Fortis 2017–2018, used here for portfolio illustration.'
    },

    /* ============== PORTFOLIO INDEX ============== */
    /* CVE 2026-05-04 S0.2 · titre + meta resserrés pour SEO ·
       title < 65 chars (limite SERP Google), desc 155-160 chars max. */
    'home.title': {
      fr: 'Christophe van Engelen — Service Design · UX · CX · Freelance Bruxelles',
      nl: 'Christophe van Engelen — Service Design · UX · CX · Freelance Brussel',
      en: 'Christophe van Engelen — Service Design · UX · CX · Freelance Brussels'
    },
    /* CVE 2026-05-11 audit team-review Pack v4-final · consensus de 6 reviewers
       indépendants (5 Anthropic agents + Codex GPT-5) · score moyen 85/100.
       Voix Lou Downe / Cagan · humble, française native, end-to-end UI→Partner. */
    'home.metaDesc': {
      fr: 'Service Design · UX · CX freelance à Bruxelles. Vingt ans dans des écosystèmes complexes · banque, postal industriel, SaaS, legal-tech. Du grand groupe international à la start-up. J\'écoute, je cadre, je tranche.',
      nl: 'Service Design · UX · CX freelance in Brussel. Twintig jaar in complexe ecosystemen · banking, industriële post, SaaS, legal-tech. Van internationaal concern tot start-up. Ik luister, kadreer, beslis.',
      en: 'Service Design · UX · CX freelance in Brussels. Twenty years in complex ecosystems · banking, industrial postal, SaaS, legal-tech. From global corporate to start-up. I listen, I frame, I decide.'
    },
    'home.eyebrow': {
      fr: 'Service Design · UX · CX · Bruxelles',
      nl: 'Service Design · UX · CX · Brussel',
      en: 'Service Design · UX · CX · Brussels'
    },
    'home.h1': {
      fr: 'J\'aide les équipes à transformer<br><span class="alt">un cadrage flou en service que le client signe.</span>',
      nl: 'Ik help teams om<br><span class="alt">een vaag kader te transformeren in een dienst die de klant tekent.</span>',
      en: 'I help teams transform<br><span class="alt">a fuzzy brief into a service the client signs.</span>'
    },
    'home.lead': {
      fr: 'Vingt ans dans des écosystèmes complexes · banque, postal industriel, SaaS, legal-tech. Du grand groupe international à la start-up. J\'écoute, je cadre, je tranche. En mission courte ou en accompagnement durable. Trois cases publics ci-dessous.',
      nl: 'Twintig jaar in complexe ecosystemen · banking, industriële post, SaaS, legal-tech. Van internationaal concern tot start-up. Ik luister, ik kadreer, ik beslis. In korte opdracht of in duurzame begeleiding. Drie publieke cases hieronder.',
      en: 'Twenty years in complex ecosystems · banking, industrial postal, SaaS, legal-tech. From global corporate to start-up. I listen, I frame, I decide. In short engagements or long-term partnerships. Three public cases below.'
    },
    'home.casesEyebrow': { fr: 'Travaux sélectionnés', nl: 'Geselecteerd werk', en: 'Selected work' },
    'home.casesH2': {
      fr: 'Deux missions. <span class="accent">Deux décisions de production signées.</span>',
      nl: 'Twee opdrachten. <span class="accent">Twee getekende productiebeslissingen.</span>',
      en: 'Two missions. <span class="accent">Two signed production decisions.</span>'
    },
    'home.casesIntro': {
      fr: 'Cliquez la carte pour ouvrir le cas. Pour Luminus, j\'ai écrit séparément ma manière d\'aborder les 90 premiers jours du rôle.',
      nl: 'Klik op de kaart om de case te openen. Voor Luminus schreef ik apart mijn aanpak voor de eerste 90 dagen van de rol.',
      en: 'Click the card to open the case. For Luminus, I wrote separately how I would approach the first 90 days of the role.'
    },
    'home.openCase': { fr: 'Ouvrir le cas →', nl: 'Open de case →', en: 'Open the case →' },

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
    'home.luminusCTA': {
      fr: 'Voir comment j\'aborderais le rôle chez Luminus →',
      nl: 'Zie hoe ik de rol bij Luminus zou aanpakken →',
      en: 'See how I\'d approach the role at Luminus →'
    },
    'home.year': { fr: 'Année', nl: 'Jaar', en: 'Year' },
    'home.role': { fr: 'Rôle', nl: 'Rol', en: 'Role' },
    'home.client': { fr: 'Client', nl: 'Klant', en: 'Client' },

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

    /* ============== BNP CASE STUDY ============== */
    'bnp.title': {
      fr: 'Enterprise Intelligence chez BNP Paribas Fortis · Étude de cas Service Design par Christophe van Engelen',
      nl: 'Enterprise Intelligence bij BNP Paribas Fortis · Service Design Case Study door Christophe van Engelen',
      en: 'Enterprise Intelligence at BNP Paribas Fortis · Service Design Case Study by Christophe van Engelen'
    },
    'bnp.metaDesc': {
      fr: 'Étude de cas en service design : la donnée transactionnelle d\'une banque devient un service payant pour les PME. Recherche réelle, wireframes réels, résultats Léonidas réels.',
      nl: 'Service design case study : de transactiedata van een bank wordt een betalende dienst voor kmo\'s. Echt onderzoek, echte wireframes, echte Léonidas-resultaten.',
      en: 'Service design case study : a bank\'s transactional data turned into a paying service for SME merchants. Real research, real wireframes, real Léonidas results.'
    },

    'bnp.nav.pill1': { fr: 'Service Design · Étude de cas', nl: 'Service Design · Case Study', en: 'Service Design · Case Study' },
    'bnp.nav.pill2': { fr: 'Pour Luminus · 2026', nl: 'Voor Luminus · 2026', en: 'For Luminus · 2026' },

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
    'bnp.hero.lead': {
      fr: 'Six mois de service design en amont chez BNP Paribas Fortis. La donnée transactionnelle dormait sur les serveurs · à la sortie, des PME commerçantes acceptaient de payer pour y accéder, avant la première ligne de code.',
      nl: 'Zes maanden service design vooraan bij BNP Paribas Fortis. De transactiedata sluimerde op de servers · aan het einde wilden handelaars-kmo\'s betalen om er toegang toe te krijgen, nog vóór de eerste regel code.',
      en: 'Six months of upstream service design at BNP Paribas Fortis. The transactional data was sleeping on the servers · at the exit, SME merchants were willing to pay to access it, before the first line of code.'
    },
    'bnp.hero.metaRole': { fr: 'Service Designer · Freelance', nl: 'Service Designer · Freelance', en: 'Service Designer · Freelance' },
    'bnp.hero.metaWhere': {
      fr: '6 mois · cadrage amont · stratégique',
      nl: '6 maanden · upstream strategisch kaderwerk',
      en: '6 months · upstream strategic framing'
    },
    'bnp.hero.location': { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels' },
    'bnp.hero.cap': { fr: 'Vision canal · Concept Report · Slide 02', nl: 'Kanaalvisie · Concept Report · Slide 02', en: 'Channel vision · Concept Report · Slide 02' },
    'bnp.hero.hook': {
      fr: 'Comment une donnée bancaire est devenue un service que quelqu\'un a accepté de payer.',
      nl: 'Hoe bankdata een dienst werd die iemand bereid was te betalen.',
      en: 'How banking data became a service someone agreed to pay for.'
    },

    /* ============== BRIDGE — jaquette → histoire ============== */
    'bnp.bridge.phrase': {
      fr: 'Six mois. Une enquête. Un commerçant qui dit oui.',
      nl: 'Zes maanden. Een onderzoek. Een handelaar die ja zegt.',
      en: 'Six months. One investigation. A merchant who says yes.'
    },
    'bnp.bridge.sub': {
      fr: 'Une asymétrie de données · un processus design thinking · un premier paiement.',
      nl: 'Een data-asymmetrie · een design thinking-traject · een eerste betaling.',
      en: 'A data asymmetry · a design thinking process · a first payment.'
    },

    /* ============== FIN ROYALE — onboarding intelligent (NEW 2026-04-30 s2) ============== */
    /* CVE 2026-05-03 v9 · ligne d'or renforcée · audit Storyteller :
       la version "La donnée vaut ce qu'on en fait" était générique (data analyst).
       Nouvelle version signe le service designer · contient "décision". */
    'bnp.fin.line': {
      fr: 'La donnée ne vaut rien tant qu\'elle ne décide rien.',
      nl: 'Data is niets waard zolang ze niets beslist.',
      en: 'Data is worth nothing until it decides something.'
    },
    'bnp.fin.next.eyebrow': { fr: 'Et après ?', nl: 'Wat daarna?', en: 'What\'s next?' },
    'bnp.fin.next.title': {
      fr: 'Comment j\'aborderais Luminus.',
      nl: 'Hoe ik Luminus zou aanpakken.',
      en: 'How I\'d approach Luminus.'
    },
    'bnp.fin.contact.eyebrow': { fr: 'Une conversation ?', nl: 'Een gesprek?', en: 'A conversation?' },
    'bnp.fin.contact.sub': {
      fr: 'Service designer freelance · Bruxelles · disponible pour des missions service design en amont, recherche utilisateur, atelier de cadrage.',
      nl: 'Freelance service designer · Brussel · beschikbaar voor opdrachten upstream service design, user research, scoping-workshops.',
      en: 'Freelance service designer · Brussels · available for upstream service design briefs, user research, scoping workshops.'
    },
    'bnp.fin.ps.label': {
      fr: 'Postscript · sept ans plus tard',
      nl: 'Postscriptum · zeven jaar later',
      en: 'Postscript · seven years later'
    },
    'bnp.fin.ps.text': {
      fr: 'Je ressors ce dossier quand un sponsor me demande ce que vaut un projet en amont. La réponse tient dans le triangle : si les trois sommets gagnent, on garde. Sinon, on jette. <span class="accent">Le reste, c\'est du bruit.</span>',
      nl: 'Ik haal dit dossier weer boven wanneer een sponsor me vraagt wat een upstream-project waard is. Het antwoord zit in de driehoek : winnen de drie hoekpunten, dan houden we het. Zo niet, weg ermee. <span class="accent">De rest is ruis.</span>',
      en: 'I bring this case back out whenever a sponsor asks what an upstream project is worth. The answer sits inside the triangle : if the three vertices win, we keep it. Otherwise, we drop it. <span class="accent">The rest is noise.</span>'
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
    'bnp.research.itTitle': {
      fr: 'Six entrepreneurs. <span class="accent">Six magasins. Six matins.</span>',
      nl: 'Zes ondernemers. <span class="accent">Zes winkels. Zes ochtenden.</span>',
      en: 'Six entrepreneurs. <span class="accent">Six shops. Six mornings.</span>'
    },
    'bnp.research.itLead': {
      fr: 'Pas un sondage en ligne. Pas un focus group. Six commerçants rencontrés sur leur sol — chocolatier, restaurateur, retailer mode, libéral, multi-shops franchisé, BFE smaller corporate. Une heure et demie chacun, derrière la caisse, à observer ce qui se décide vraiment dans la journée.',
      nl: 'Geen online enquête. Geen focusgroep. Zes merchants ontmoet op hun werkvloer — chocolatier, restaurateur, mode-retailer, vrij beroep, multi-shop franchisenemer, BFE smaller corporate. Anderhalf uur elk, achter de toonbank, om te observeren wat er echt op een dag beslist wordt.',
      en: 'No online survey. No focus group. Six shopkeepers met on their floor — chocolatier, restaurateur, fashion retailer, liberal professional, multi-shop franchisee, BFE smaller corporate. Ninety minutes each, behind the counter, watching what actually gets decided in a day.'
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
    'bnp.research.itSource': {
      fr: 'Six interviews qualitatives · 1h30 chacune · juin-août 2017 · transcripts validés en peer review',
      nl: 'Zes kwalitatieve interviews · 1u30 elk · juni-augustus 2017 · transcripts gevalideerd in peer review',
      en: 'Six qualitative interviews · 90 min each · June-August 2017 · transcripts validated in peer review'
    },

    'bnp.research.benchEyebrow': { fr: 'Research · Benchmark', nl: 'Research · Benchmark', en: 'Research · Benchmark' },
    'bnp.research.benchTitle': {
      fr: 'Trois benchmarks <span class="accent">live.</span>',
      nl: 'Drie <span class="accent">live</span> benchmarks.',
      en: 'Three <span class="accent">live</span> benchmarks.'
    },
    'bnp.research.benchLead': {
      fr: 'Qu\'est-ce qui marche ailleurs ? Trois acteurs étudiés. Trois signatures distinctes — chacun isolé sur son angle de force.',
      nl: 'Wat werkt elders ? Drie spelers bestudeerd. Drie onderscheidende handtekeningen — elk gericht op hun sterkste hoek.',
      en: 'What works elsewhere ? Three players studied. Three distinct signatures — each isolated on its angle of strength.'
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
    'bnp.research.benchSource': {
      fr: 'Source · Ideation Report · pages 3-4 · 30 octobre 2017',
      nl: 'Bron · Ideation Report · pagina\'s 3-4 · 30 oktober 2017',
      en: 'Source · Ideation Report · pages 3-4 · October 30, 2017'
    },

    'bnp.research.targetEyebrow': { fr: 'Research · Targeting', nl: 'Research · Targeting', en: 'Research · Targeting' },
    'bnp.research.targetTitle': {
      fr: 'Qui est <span class="accent">vraiment</span> intéressé ?',
      nl: 'Wie is <span class="accent">echt</span> geïnteresseerd ?',
      en: 'Who is <span class="accent">really</span> interested ?'
    },
    'bnp.research.targetLead': {
      fr: 'Quatre segments cartographiés sur leur appétit pour Enterprise Intelligence. Le KEY TARGET sort net : B2C avec plusieurs boutiques, peu de support data interne. Très intéressé.',
      nl: 'Vier segmenten in kaart gebracht op hun appetijt voor Enterprise Intelligence. Het KEY TARGET komt scherp naar voren : B2C met meerdere winkels, weinig interne data-support. Zeer geïnteresseerd.',
      en: 'Four segments mapped on their appetite for Enterprise Intelligence. The KEY TARGET comes out clean : B2C with several shops, little/no internal data support. Very interested.'
    },
    'bnp.research.segKey': { fr: 'Key target', nl: 'Key target', en: 'Key target' },
    'bnp.research.segSecondary': { fr: 'Secondary', nl: 'Secondary', en: 'Secondary' },
    'bnp.research.segThird': { fr: 'Third', nl: 'Third', en: 'Third' },
    'bnp.research.segOut': { fr: 'Out of scope', nl: 'Out of scope', en: 'Out of scope' },
    'bnp.research.seg1Name': { fr: 'B2C · plusieurs boutiques · peu/pas de support data', nl: 'B2C · meerdere winkels · weinig/geen data-support', en: 'B2C · several shops · little/no data support' },
    'bnp.research.seg1Verdict': { fr: 'Très intéressé · à prendre en compte pour écrire le concept', nl: 'Zeer geïnteresseerd · meenemen om het concept te schrijven', en: 'Very interested · take into consideration to write the concept' },
    'bnp.research.seg2Name': { fr: 'B2C · une seule boutique', nl: 'B2C · één winkel', en: 'B2C · single shop' },
    'bnp.research.seg2Verdict': { fr: 'Peut être intrigué · capter l\'intérêt avec accompagnement', nl: 'Kan geïntrigeerd worden · interesse vangen met begeleiding', en: 'Can be intrigued · catch their interest with guidance' },
    'bnp.research.seg3Name': { fr: 'B2C · plusieurs boutiques · support data fort', nl: 'B2C · meerdere winkels · sterke data-support', en: 'B2C · several shops · strong data support' },
    'bnp.research.seg3Verdict': { fr: 'Pas intéressé · déjà couvert par leurs outils existants', nl: 'Niet geïnteresseerd · al gedekt door hun bestaande tools', en: 'Not interested · already covered by their existing tools' },
    'bnp.research.seg4Name': { fr: 'Entreprises B2B', nl: 'B2B-bedrijven', en: 'B2B businesses' },
    'bnp.research.seg4Verdict': { fr: 'Pas intéressé · les data de facturation couvrent déjà leurs besoins', nl: 'Niet geïnteresseerd · facturatiedata dekt hun behoeften al', en: 'Not interested · invoicing data already covers their needs' },
    'bnp.research.targetSource': {
      fr: 'Source · Ideation Report · pages 5-6 · « Levels of Interest »',
      nl: 'Bron · Ideation Report · pagina\'s 5-6 · « Levels of Interest »',
      en: 'Source · Ideation Report · pages 5-6 · "Levels of Interest"'
    },

    'bnp.research.persoEyebrow': { fr: 'Research · Personas', nl: 'Research · Personas', en: 'Research · Personas' },
    'bnp.research.persoTitle': {
      fr: 'Neuf personas B2B, <span class="accent">pas un de plus.</span>',
      nl: 'Negen B2B-personas, <span class="accent">geen één meer.</span>',
      en: 'Nine B2B personas, <span class="accent">not one more.</span>'
    },
    'bnp.research.persoLead': {
      fr: 'Du Liberal Pro au Corporate Banking SME. Une bibliothèque construite sur les interviews + les matrices de segmentation, qui a survécu au projet et a servi à d\'autres initiatives BNP B2B.',
      nl: 'Van Liberal Pro tot Corporate Banking SME. Een bibliotheek gebouwd op de interviews + segmentatiematrices, die het project overleefde en werd gebruikt door andere BNP B2B-initiatieven.',
      en: 'From Liberal Pro to Corporate Banking SME. A library built on interviews + segmentation matrices, that outlived the project and was reused by other BNP B2B initiatives.'
    },
    'bnp.research.persoCap': {
      fr: '9 personas B2B · provisional research-backed · Concept Report p34',
      nl: '9 B2B-personas · provisional research-backed · Concept Report p34',
      en: '9 B2B personas · provisional research-backed · Concept Report p34'
    },

    /* ============== ANALYSE subsections : AS-IS + GAP + VPC/Lean ============== */
    'bnp.analyse.asisEyebrow': { fr: 'Analyse · AS-IS journey', nl: 'Analyse · AS-IS journey', en: 'Analyse · AS-IS journey' },
    'bnp.analyse.asisTitle': {
      fr: 'Quinze étapes <span class="accent">avant le premier insight.</span>',
      nl: 'Vijftien stappen <span class="accent">vóór het eerste inzicht.</span>',
      en: 'Fifteen steps <span class="accent">before the first insight.</span>'
    },
    'bnp.analyse.asisLead': {
      fr: 'Le journey end-to-end d\'un commerçant non-EBB. Quinze étapes étalées sur 1 à 3 jours juste pour onboarder. Chiffre qui a tué le débat « on peut builder demain ».',
      nl: 'De end-to-end journey van een niet-EBB-merchant. Vijftien stappen verspreid over 1 tot 3 dagen, enkel om aan boord te komen. Het cijfer dat het « we kunnen morgen bouwen »-debat sloot.',
      en: 'The end-to-end journey of a non-EBB merchant. Fifteen steps spread over 1 to 3 days just to onboard. The figure that killed the « we can build it tomorrow » debate.'
    },
    'bnp.analyse.asisCap': {
      fr: 'AS-IS journey · PME non-enregistrée · 15 étapes · 1-3 jours · Concept Report p75',
      nl: 'AS-IS journey · niet-geregistreerde kmo · 15 stappen · 1-3 dagen · Concept Report p75',
      en: 'AS-IS journey · unregistered SME · 15 steps · 1-3 days · Concept Report p75'
    },
    /* AS-IS flow natif — 15 steps en 3 phases temporelles */
    'bnp.analyse.asisFlowTitle': { fr: '15 étapes onboarding non-EBB en 3 phases', nl: '15 onboarding-stappen non-EBB in 3 fases', en: '15 non-EBB onboarding steps in 3 phases' },
    'bnp.analyse.asisPhase1':    { fr: 'Jour 1 · Découverte',     nl: 'Dag 1 · Ontdekking',       en: 'Day 1 · Discovery' },
    'bnp.analyse.asisPhase2':    { fr: 'Jour 2 · Setup bancaire', nl: 'Dag 2 · Bank-setup',       en: 'Day 2 · Bank setup' },
    'bnp.analyse.asisPhase3':    { fr: 'Jour 3 · Activation E.I.', nl: 'Dag 3 · E.I.-activatie',  en: 'Day 3 · E.I. activation' },
    'bnp.analyse.asisStep1':     { fr: 'Découvre l\'offre',        nl: 'Ontdekt het aanbod',      en: 'Discovers the offer' },
    'bnp.analyse.asisStep2':     { fr: 'Cherche infos site',       nl: 'Zoekt info op site',      en: 'Looks up info on site' },
    'bnp.analyse.asisStep3':     { fr: 'Compare concurrence',      nl: 'Vergelijkt concurrentie', en: 'Compares competitors' },
    'bnp.analyse.asisStep4':     { fr: 'Décide d\'essayer',         nl: 'Beslist te proberen',     en: 'Decides to try' },
    'bnp.analyse.asisStep5':     { fr: 'Demande RDV agence',       nl: 'Vraagt afspraak agentschap', en: 'Requests branch appointment' },
    'bnp.analyse.asisStep6':     { fr: 'RDV agence physique',      nl: 'Fysieke afspraak agentschap', en: 'Physical branch meeting' },
    'bnp.analyse.asisStep7':     { fr: 'Documents identité',       nl: 'Identiteitsdocumenten',   en: 'ID documents' },
    'bnp.analyse.asisStep8':     { fr: 'Ouvre compte pro',         nl: 'Opent zakelijke rekening', en: 'Opens business account' },
    'bnp.analyse.asisStep9':     { fr: 'Attente activation',       nl: 'Wacht op activatie',      en: 'Waits for activation' },
    'bnp.analyse.asisStep10':    { fr: 'Reçoit codes EBB',         nl: 'Ontvangt EBB-codes',      en: 'Receives EBB codes' },
    'bnp.analyse.asisStep11':    { fr: 'Login Easy Banking',       nl: 'Login Easy Banking',      en: 'Easy Banking login' },
    'bnp.analyse.asisStep12':    { fr: 'Cherche E.I. dans menu',   nl: 'Zoekt E.I. in menu',      en: 'Hunts for E.I. in menu' },
    'bnp.analyse.asisStep13':    { fr: 'Active service',           nl: 'Activeert dienst',        en: 'Activates service' },
    'bnp.analyse.asisStep14':    { fr: 'Attente données J+1',      nl: 'Wacht data D+1',          en: 'Waits for D+1 data' },
    'bnp.analyse.asisStep15':    { fr: 'Premier insight',          nl: 'Eerste insight',          en: 'First insight' },
    'bnp.analyse.asisFrictions': { fr: 'frictions critiques identifiées · cibles MVP P1', nl: 'kritieke fricties geïdentificeerd · MVP P1-doelen', en: 'critical frictions identified · MVP P1 targets' },
    'bnp.analyse.asisSource': {
      fr: 'Référence interne · Concept Report p75 — flow journey redessiné à la charte du folio',
      nl: 'Interne referentie · Concept Report p75 — flow journey hertekend in de folio-stijl',
      en: 'Internal reference · Concept Report p75 — journey flow redrawn in the folio design system'
    },

    'bnp.analyse.gapEyebrow': { fr: 'Analyse · GAP & Could-Be', nl: 'Analyse · GAP & Could-Be', en: 'Analyse · GAP & Could-Be' },
    'bnp.analyse.gapTitle': {
      fr: 'De l\'AS-IS <span class="accent">au Could-Be.</span>',
      nl: 'Van AS-IS <span class="accent">naar Could-Be.</span>',
      en: 'From AS-IS <span class="accent">to Could-Be.</span>'
    },
    'bnp.analyse.gapLead': {
      fr: 'Cinq journeys end-to-end dessinés, un par point d\'entrée : non-enregistré · enregistré nouveau EBB · utilisateur EBB existant · via deep link · via app launcher. Le GAP entre l\'AS-IS et le Could-Be devient la backlog du MVP onboarding.',
      nl: 'Vijf end-to-end journeys getekend, één per instappunt : niet-geregistreerd · geregistreerd nieuw EBB · bestaande EBB-gebruiker · via deep link · via app launcher. De GAP tussen AS-IS en Could-Be wordt de MVP onboarding-backlog.',
      en: 'Five end-to-end journeys drawn, one per entry point : unregistered · registered new EBB · existing EBB user · via deep link · via app launcher. The GAP between AS-IS and Could-Be becomes the MVP onboarding backlog.'
    },
    'bnp.analyse.gap1': { fr: 'Non-enregistré · 15 étapes', nl: 'Niet-geregistreerd · 15 stappen', en: 'Unregistered · 15 steps' },
    'bnp.analyse.gap2': { fr: 'Enregistré · nouveau EBB', nl: 'Geregistreerd · nieuw EBB', en: 'Registered · new EBB' },
    'bnp.analyse.gap3': { fr: 'EBB existant · deep link', nl: 'Bestaande EBB · deep link', en: 'Existing EBB · deep link' },
    'bnp.analyse.gap4': { fr: 'App launcher', nl: 'App launcher', en: 'App launcher' },
    'bnp.analyse.gap5': { fr: 'Contract manager flow', nl: 'Contract manager flow', en: 'Contract manager flow' },
    'bnp.analyse.gapSource': {
      fr: 'Source · Concept Report · 5 journeys end-to-end',
      nl: 'Bron · Concept Report · 5 end-to-end journeys',
      en: 'Source · Concept Report · 5 end-to-end journeys'
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
    'bnp.analyse.dataLead': {
      fr: 'BNP avait <strong>trois familles de données</strong> sur ses commerçants : transactions Bancontact, profils carte des consommateurs, comptes bancaires. Brutes, elles ne valaient rien pour un commerçant. Il a fallu les organiser sur trois axes lisibles, vérifier leur qualité, les combiner. C\'est l\'agrégation qui a fait émerger six lectures actionnables, chacune calée sur un type de persona.',
      nl: 'BNP had <strong>drie families gegevens</strong> over haar handelaars : Bancontact-transacties, kaartprofielen van consumenten, bankrekeningen. Ruw waren ze waardeloos voor een handelaar. Het vereiste organiseren op drie leesbare assen, kwaliteit controleren, combineren. De aggregatie deed zes actionable lezingen verschijnen, elk afgestemd op een type persona.',
      en: 'BNP had <strong>three families of data</strong> on its merchants : Bancontact transactions, consumer card profiles, bank accounts. Raw, they were worthless to a merchant. We had to organise them on three readable axes, check their quality, combine them. Aggregation surfaced six actionable readings, each tied to a persona type.'
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
    'bnp.analyse.dataSource': {
      fr: 'Référence interne · Concept Report mars 2018, p24 — typologie redessinée à la charte du folio',
      nl: 'Interne referentie · Concept Report maart 2018, p24 — typologie hertekend in de folio-stijl',
      en: 'Internal reference · Concept Report March 2018, p24 — typology redrawn in folio style'
    },

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
    'bnp.analyse.vpPyramidIntro': {
      fr: 'La transformation, en image : à gauche le dashboard classique qui pousse de la donnée. À droite le rapport orienté objectif, qui produit des insights actionnables.',
      nl: 'De transformatie, in beeld : links het klassieke dashboard dat data pusht. Rechts het doelgerichte rapport, dat actionable insights produceert.',
      en: 'The transformation, in pictures : on the left the classic dashboard pushing data. On the right the goal-oriented report producing actionable insights.'
    },
    /* Legacy keys gardées (orphelins inertes) */
    'bnp.analyse.vpTitle': {
      fr: 'Pas de la donnée à explorer.<br><span class="accent">Un récit qui décide.</span>',
      nl: 'Geen data om te verkennen.<br><span class="accent">Een verhaal dat beslist.</span>',
      en: 'Not data to explore.<br><span class="accent">A story that decides.</span>'
    },
    'bnp.analyse.vpLead': {
      fr: 'Un dashboard, ce n\'est pas pousser de la donnée brute par graphiques et visualisations. C\'est <strong>raconter une histoire</strong> avec la donnée, qui résonne pour le commerçant et soutient sa <strong>prise de décision</strong>. Au bout du premier diamant, c\'est ce concept qui a aligné les quatre fonctions internes avant d\'attaquer le prototypage.',
      nl: 'Een dashboard is geen ruwe data pushen via grafieken en visualisaties. Het is <strong>een verhaal vertellen</strong> met de data, dat resoneert voor de handelaar en zijn <strong>besluitvorming</strong> ondersteunt. Aan het einde van het eerste diamant heeft dat concept de vier interne functies op één lijn gebracht voor het prototypen.',
      en: 'A dashboard is not about pushing raw data through charts and visualisations. It\'s about <strong>telling a story</strong> with the data that resonates with the merchant and supports their <strong>decision-making</strong>. At the close of the first diamond, this concept aligned the four internal functions before we moved to prototyping.'
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
    'bnp.analyse.vpBadVerdict': { fr: 'Cognitive overload', nl: 'Cognitive overload', en: 'Cognitive overload' },
    'bnp.analyse.vpBadName':    { fr: 'Data exploration',   nl: 'Data exploration',   en: 'Data exploration'   },
    'bnp.analyse.vpBadNote': {
      fr: 'Filtres contextuels + 5 dimensions démographiques. Le commerçant doit construire sa propre lecture. Personne ne le fait deux fois.',
      nl: 'Contextuele filters + 5 demografische dimensies. De handelaar moet zelf zijn lezing bouwen. Niemand doet dat twee keer.',
      en: 'Contextual filters + 5 demographic dimensions. The merchant has to build their own reading. Nobody does it twice.'
    },
    'bnp.analyse.vpGoodVerdict': { fr: 'Focused information', nl: 'Focused information', en: 'Focused information' },
    'bnp.analyse.vpGoodName':    { fr: 'Goal-oriented report', nl: 'Goal-oriented report', en: 'Goal-oriented report' },
    'bnp.analyse.vpGoodNote': {
      fr: 'Quatre KPI calés sur quatre objectifs business. Le rouge demande une décision tout de suite. L\'orange signale un point à surveiller. Le vert confirme ce qui marche. Une lecture, une décision.',
      nl: 'Vier KPI\'s afgestemd op vier business-doelen. Het rood vraagt onmiddellijk een beslissing. Het oranje signaleert een aandachtspunt. Het groen bevestigt wat werkt. Eén lezing, één beslissing.',
      en: 'Four KPIs tied to four business goals. Red asks for a decision now. Orange flags a watchpoint. Green confirms what works. One read, one decision.'
    },
    'bnp.analyse.vpClaim': {
      fr: 'Pas un système exploratoire de métriques. <span class="accent">Des rapports orientés objectifs, avec des outcomes actionnables.</span>',
      nl: 'Geen verkennend metrieksysteem. <span class="accent">Doelgerichte rapporten met actionable outcomes.</span>',
      en: 'Not an exploratory metrics system. <span class="accent">Goal-oriented reports with actionable outcomes.</span>'
    },
    'bnp.analyse.vpSource': {
      fr: 'Source · Concept Report mars 2018, p27-31 — value proposition Enterprise Intelligence',
      nl: 'Bron · Concept Report maart 2018, p27-31 — value proposition Enterprise Intelligence',
      en: 'Source · Concept Report March 2018, p27-31 — value proposition Enterprise Intelligence'
    },

    /* ============== ANALYSE 2.4a — Value Proposition Canvas natif ============== */
    'bnp.analyse.vpcEyebrow': { fr: 'Analyse · Value Proposition Canvas', nl: 'Analyse · Value Proposition Canvas', en: 'Analyse · Value Proposition Canvas' },
    'bnp.analyse.vpcTitle': {
      fr: 'Mapper les <span class="accent">Jobs · Pains · Gains</span> du commerçant.',
      nl: 'De <span class="accent">Jobs · Pains · Gains</span> van de merchant in kaart brengen.',
      en: 'Mapping the merchant\'s <span class="accent">Jobs · Pains · Gains</span>.'
    },
    'bnp.analyse.vpcLead': {
      fr: 'Avant la solution, la friction. Le Value Proposition Canvas confronte les jobs du commerçant (mieux connaître ses clients, calibrer ses actions) à l\'offre BNP. Chaque feature MVP doit cocher au moins un Pain Reliever ou un Gain Creator. Sinon, elle dégage du scope.',
      nl: 'Voor de oplossing, de wrijving. De Value Proposition Canvas zet de jobs van de merchant (klanten beter kennen, acties kalibreren) tegenover het BNP-aanbod. Elke MVP-feature moet minstens één Pain Reliever of Gain Creator afvinken. Anders verlaat ze de scope.',
      en: 'Before the solution, the friction. The Value Proposition Canvas pits the merchant\'s jobs (knowing customers better, calibrating actions) against the BNP offer. Every MVP feature must tick at least one Pain Reliever or Gain Creator. Otherwise it leaves the scope.'
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

    /* ============== PROTOTYPE subsections : Vision + 4 axes + Spotfire POC ============== */
    'bnp.prototype.visionEyebrow': { fr: 'Prototype · Channel vision', nl: 'Prototype · Channel vision', en: 'Prototype · Channel vision' },
    'bnp.prototype.visionTitle': {
      fr: 'Du transactionnel <span class="accent">à l\'insightful.</span>',
      nl: 'Van transactioneel <span class="accent">naar insightful.</span>',
      en: 'From transactional <span class="accent">to insightful.</span>'
    },
    'bnp.prototype.visionLead': {
      fr: 'La vision canal BNP — passer d\'une expérience transactionnelle à une expérience d\'insights. Personalised & insightful advice. La data de la banque devient un service de conseil.',
      nl: 'De BNP-kanaalvisie — van een transactionele ervaring naar een insights-ervaring. Personalised & insightful advice. De data van de bank wordt een adviesdienst.',
      en: 'BNP\'s channel vision — from a transactional experience to an insights experience. Personalised & insightful advice. The bank\'s data becomes an advisory service.'
    },
    'bnp.prototype.visionCap': {
      fr: 'Channel vision · Du transactionnel à l\'insightful · Concept Report p3',
      nl: 'Channel vision · Van transactioneel naar insightful · Concept Report p3',
      en: 'Channel vision · From transactional to insightful · Concept Report p3'
    },
    'bnp.prototype.visionSource': {
      fr: 'Source · Concept Report · pages 2-3 · 1ᵉʳ mars 2018',
      nl: 'Bron · Concept Report · pagina\'s 2-3 · 1 maart 2018',
      en: 'Source · Concept Report · pages 2-3 · March 1, 2018'
    },

    'bnp.prototype.vennEyebrow': {
      fr: 'Prototype · agrégation des données BNP',
      nl: 'Prototype · BNP-data-aggregatie',
      en: 'Prototype · BNP data aggregation'
    },
    'bnp.prototype.vennTitle': {
      fr: 'Pas une intuition. <span class="accent">Trois axes de données BNP, superposés.</span>',
      nl: 'Geen onderbuikgevoel. <span class="accent">Drie BNP-data-assen, gestapeld.</span>',
      en: 'Not a hunch. <span class="accent">Three BNP data axes, layered.</span>'
    },
    'bnp.prototype.vennLead': {
      fr: 'Trois axes de données déjà disponibles à la banque : <strong>clients</strong>, <strong>zone</strong>, <strong>secteur</strong>. Leurs chevauchements font émerger six opportunités concrètes. C\'est l\'agrégation qui crée la valeur, pas la donnée brute.',
      nl: 'Drie data-assen die de bank al in handen had : <strong>klanten</strong>, <strong>zone</strong>, <strong>sector</strong>. Hun overlappingen brengen zes concrete kansen aan het licht. De aggregatie creëert de waarde, niet de ruwe data.',
      en: 'Three data axes the bank already had on hand : <strong>customers</strong>, <strong>area</strong>, <strong>sector</strong>. Their overlaps surface six concrete opportunities. Aggregation creates the value, not the raw data.'
    },
    'bnp.prototype.vennCaption': {
      fr: 'Référence interne · Concept Report mars 2018, p24 — redessiné à la charte du folio',
      nl: 'Interne referentie · Concept Report maart 2018, p24 — hertekend in de folio-stijl',
      en: 'Internal reference · Concept Report March 2018, p24 — redrawn in the folio design system'
    },
    'bnp.prototype.vennSvgTitle': {
      fr: 'Schéma de Venn — agrégation données BNP en six opportunités',
      nl: 'Venn-diagram — BNP-data-aggregatie in zes kansen',
      en: 'Venn diagram — BNP data aggregation into six opportunities'
    },
    'bnp.prototype.vennSvgDesc': {
      fr: 'Trois cercles superposés Customers, Area, Sector — leurs chevauchements produisent six opportunités business : crosselling diversification, loyalty, expansion, crosselling, opening hours, new portfolio offers.',
      nl: 'Drie overlappende cirkels Customers, Area, Sector — de overlappingen produceren zes business-kansen: crosselling diversification, loyalty, expansion, crosselling, opening hours, new portfolio offers.',
      en: 'Three overlapping circles Customers, Area, Sector — their overlaps produce six business opportunities: crosselling diversification, loyalty, expansion, crosselling, opening hours, new portfolio offers.'
    },
    'bnp.prototype.vennAxisCustomers': { fr: 'CUSTOMERS', nl: 'CUSTOMERS', en: 'CUSTOMERS' },
    'bnp.prototype.vennAxisArea':      { fr: 'AREA',      nl: 'AREA',      en: 'AREA' },
    'bnp.prototype.vennAxisSector':    { fr: 'SECTOR',    nl: 'SECTOR',    en: 'SECTOR' },

    'bnp.prototype.vennZone1': { fr: 'Customers seuls',           nl: 'Customers alleen',          en: 'Customers only' },
    'bnp.prototype.vennOpp1':  { fr: 'Crosselling diversification', nl: 'Crosselling diversification', en: 'Crosselling diversification' },
    'bnp.prototype.vennHint1': { fr: 'Non clients en autre secteur et zone', nl: 'Niet-klanten in andere sector en zone', en: 'Non-customers in other sector and area' },

    'bnp.prototype.vennZone2': { fr: 'Customers ∩ Area',  nl: 'Customers ∩ Area',  en: 'Customers ∩ Area' },
    'bnp.prototype.vennOpp2':  { fr: 'Crosselling',       nl: 'Crosselling',       en: 'Crosselling' },
    'bnp.prototype.vennHint2': { fr: 'Non clients dans ma zone', nl: 'Niet-klanten in mijn zone', en: 'Non-customers in my area' },

    'bnp.prototype.vennZone3': { fr: 'Area seul',         nl: 'Area alleen',       en: 'Area only' },
    'bnp.prototype.vennOpp3':  { fr: 'Opening hours',     nl: 'Opening hours',     en: 'Opening hours' },
    'bnp.prototype.vennHint3': { fr: 'Non clients dans ma zone', nl: 'Niet-klanten in mijn zone', en: 'Non-customers in my area' },

    'bnp.prototype.vennZone4': { fr: 'Customers ∩ Sector ∩ Area', nl: 'Customers ∩ Sector ∩ Area', en: 'Customers ∩ Sector ∩ Area' },
    'bnp.prototype.vennOpp4':  { fr: 'Loyalty',           nl: 'Loyalty',           en: 'Loyalty' },
    'bnp.prototype.vennHint4': { fr: 'Mes clients dans mon secteur et zone', nl: 'Mijn klanten in mijn sector en zone', en: 'My customers in my sector and area' },

    'bnp.prototype.vennZone5': { fr: 'Customers ∩ Sector', nl: 'Customers ∩ Sector', en: 'Customers ∩ Sector' },
    'bnp.prototype.vennOpp5':  { fr: 'Expansion',         nl: 'Expansion',         en: 'Expansion' },
    'bnp.prototype.vennHint5': { fr: 'Mes clients dans mon secteur', nl: 'Mijn klanten in mijn sector', en: 'My customers in my sector' },

    'bnp.prototype.vennZone6': { fr: 'Area ∩ Sector',     nl: 'Area ∩ Sector',     en: 'Area ∩ Sector' },
    'bnp.prototype.vennOpp6':  { fr: 'New portfolio offers', nl: 'New portfolio offers', en: 'New portfolio offers' },
    'bnp.prototype.vennHint6': { fr: 'Non clients dans mon secteur et zone', nl: 'Niet-klanten in mijn sector en zone', en: 'Non-customers in my sector and area' },

    'bnp.prototype.relevantEyebrow': {
      fr: 'Prototype · priorisation',
      nl: 'Prototype · prioritering',
      en: 'Prototype · prioritisation'
    },
    'bnp.prototype.relevantTitle': {
      fr: 'Des six opportunités, <span class="accent">quatre features priorisées.</span>',
      nl: 'Van zes kansen, <span class="accent">vier geprioriteerde features.</span>',
      en: 'Of the six opportunities, <span class="accent">four prioritised features.</span>'
    },
    'bnp.prototype.relevantLead': {
      fr: 'Sur les six opportunités cartographiées, quatre se sont imposées comme prioritaires pour le MVP. Celles que la donnée BNP éclaire le plus directement. Une feature par axe, prête à entrer dans le prototype Spotfire.',
      nl: 'Van de zes in kaart gebrachte kansen drongen vier zich op als prioritair voor de MVP. Die welke de BNP-data het meest rechtstreeks verheldert. Eén feature per as, klaar om in het Spotfire-prototype te belanden.',
      en: 'Of the six opportunities mapped, four emerged as priorities for the MVP. The ones BNP data lights up most directly. One feature per axis, ready to enter the Spotfire prototype.'
    },
    'bnp.prototype.axe1Name': { fr: 'Advanced profiling', nl: 'Advanced profiling', en: 'Advanced profiling' },
    'bnp.prototype.axe1Desc': {
      fr: 'Origine · profil socio · revenus · trends spending → cross-selling, marketing local',
      nl: 'Herkomst · socio-profiel · inkomen · spending trends → cross-selling, lokale marketing',
      en: 'Origin · socio profile · income · spending trends → cross-selling, local marketing'
    },
    'bnp.prototype.axe2Name': { fr: 'Loyalty ranking', nl: 'Loyalty ranking', en: 'Loyalty ranking' },
    'bnp.prototype.axe2Desc': {
      fr: 'Nombre transactions par client → ranker la fidélité, tracker l\'évolution',
      nl: 'Aantal transacties per klant → loyalty ranken, evolutie tracken',
      en: 'Transactions per customer → rank loyalty, track evolution'
    },
    'bnp.prototype.axe3Name': { fr: 'Help for marketing', nl: 'Help for marketing', en: 'Help for marketing' },
    'bnp.prototype.axe3Desc': {
      fr: 'Origine clients · part de marché → opportunités locales, expansion trackée',
      nl: 'Klantherkomst · marktaandeel → lokale opportuniteiten, getrackte expansie',
      en: 'Customer origin · market share → local opportunities, tracked expansion'
    },
    'bnp.prototype.axe4Name': { fr: 'POS & competitors comparison', nl: 'POS & concurrenten-vergelijking', en: 'POS & competitors comparison' },
    'bnp.prototype.axe4Desc': {
      fr: 'Volume clients · trafic · revenus → opening hours, market share, brand performance',
      nl: 'Klantvolume · traffic · omzet → opening hours, marktaandeel, brand performance',
      en: 'Customer volume · traffic · revenue → opening hours, market share, brand performance'
    },
    'bnp.prototype.relevantSource': {
      fr: 'Source · Concept Report · page 41 · « Why our data are relevant »',
      nl: 'Bron · Concept Report · pagina 41 · « Why our data are relevant »',
      en: 'Source · Concept Report · page 41 · "Why our data are relevant"'
    },

    /* ============== PROTOTYPE 01 — premiers drafts wireframes (2 directions) ============== */
    'bnp.prototype.directionEyebrow': {
      fr: 'Prototype · premiers drafts',
      nl: 'Prototype · eerste drafts',
      en: 'Prototype · first drafts'
    },
    'bnp.prototype.directionTitle': {
      fr: 'Deux directions explorées. <span class="accent">Une retenue.</span>',
      nl: 'Twee richtingen verkend. <span class="accent">Eén weerhouden.</span>',
      en: 'Two directions explored. <span class="accent">One retained.</span>'
    },
    'bnp.prototype.directionLead': {
      fr: 'Les premiers wireframes ont matérialisé le concept en deux directions opposées. La gauche pousse la donnée brute par graphiques et filtres : cognitive overload garanti, le commerçant doit construire sa propre lecture. La droite pose quatre KPI calés sur quatre objectifs business : une lecture, une décision. C\'est cette deuxième direction qui a été retenue pour le prototype Spotfire.',
      nl: 'De eerste wireframes hebben het concept in twee tegenovergestelde richtingen gematerialiseerd. Links pusht ruwe data via grafieken en filters : cognitive overload gegarandeerd, de handelaar moet zijn eigen lezing bouwen. Rechts plaatst vier KPI\'s afgestemd op vier business-doelen : één lezing, één beslissing. Het is die tweede richting die voor het Spotfire-prototype is weerhouden.',
      en: 'The first wireframes materialised the concept in two opposing directions. The left pushes raw data through charts and filters : cognitive overload guaranteed, the merchant has to build their own reading. The right lays four KPIs tied to four business goals : one read, one decision. It\'s this second direction that was retained for the Spotfire prototype.'
    },
    'bnp.prototype.directionSource': {
      fr: 'Source · Concept Report mars 2018, p30-31 — premiers wireframes Enterprise Intelligence',
      nl: 'Bron · Concept Report maart 2018, p30-31 — eerste wireframes Enterprise Intelligence',
      en: 'Source · Concept Report March 2018, p30-31 — first wireframes Enterprise Intelligence'
    },

    /* ============== PROTOTYPE 02 — overview wall + 4 goals strip ============== */
    'bnp.prototype.overviewEyebrow': { fr: 'Prototype · 4 goals identifiés',                nl: 'Prototype · 4 doelen geïdentificeerd',      en: 'Prototype · 4 goals identified' },
    'bnp.prototype.overviewTitle': {
      fr: 'Du wall d\'atelier <span class="accent">aux 4 rapports priorisés.</span>',
      nl: 'Van de werkmuur <span class="accent">naar de 4 geprioriteerde rapporten.</span>',
      en: 'From the workshop wall <span class="accent">to the 4 prioritised reports.</span>'
    },
    'bnp.prototype.overviewLead': {
      fr: 'Le wall ci-dessous, c\'est le moment où toutes les features candidates ont été étalées et regroupées en grandes intentions. Chaque rapport correspond à un objectif business du commerçant, avec son propre type de données pertinentes. Trois retenues pour le MVP, une placée en roadmap phase 2.',
      nl: 'De muur hieronder is het moment waarop alle kandidaat-features werden uitgespreid en gegroepeerd in grote intenties. Elk rapport komt overeen met een business-doel van de handelaar, met eigen relevante data. Drie weerhouden voor de MVP, één geplaatst in roadmap fase 2.',
      en: 'The wall below is the moment when every candidate feature was spread out and grouped into core intents. Each report maps to a merchant business goal, with its own relevant data. Three retained for the MVP, one placed in the phase 2 roadmap.'
    },
    'bnp.prototype.overviewCycle1': { fr: 'Control business state',  nl: 'Control business state',  en: 'Control business state' },
    'bnp.prototype.overviewName1':  { fr: 'Performance Analysis',     nl: 'Performance Analysis',     en: 'Performance Analysis' },
    'bnp.prototype.overviewQ1':     { fr: '« Comment je performe ce mois-ci ? »', nl: '« Hoe presteer ik deze maand? »', en: '"How am I performing this month?"' },
    'bnp.prototype.overviewCycle2': { fr: 'Learn & take actions',     nl: 'Learn & take actions',     en: 'Learn & take actions' },
    'bnp.prototype.overviewName2':  { fr: 'Business Expansion',       nl: 'Business Expansion',       en: 'Business Expansion' },
    'bnp.prototype.overviewQ2':     { fr: '« Comment j\'agrandis mon business ? »', nl: '« Hoe laat ik mijn business groeien? »', en: '"How do I grow my business?"' },
    'bnp.prototype.overviewCycle3': { fr: 'Observe impact of actions', nl: 'Observe impact of actions', en: 'Observe impact of actions' },
    'bnp.prototype.overviewName3':  { fr: 'Evaluating Actions',        nl: 'Evaluating Actions',        en: 'Evaluating Actions' },
    'bnp.prototype.overviewQ3':     { fr: '« L\'action que j\'ai prise, elle a marché ? »', nl: '« De actie die ik heb genomen, heeft die gewerkt? »', en: '"The action I took, did it work?"' },
    'bnp.prototype.overviewCycle4': { fr: 'Phase 2 · roadmap',         nl: 'Fase 2 · roadmap',         en: 'Phase 2 · roadmap' },
    'bnp.prototype.overviewName4':  { fr: 'Market Research',           nl: 'Market Research',           en: 'Market Research' },
    'bnp.prototype.overviewQ4':     { fr: '« Où ouvrir le prochain shop ? »', nl: '« Waar open ik mijn volgende winkel? »', en: '"Where do I open my next shop?"' },
    'bnp.prototype.overviewSource': {
      fr: 'Référence · Concept Report mars 2018, p37 — wall d\'atelier original',
      nl: 'Referentie · Concept Report maart 2018, p37 — originele werkmuur',
      en: 'Reference · Concept Report March 2018, p37 — original workshop wall'
    },

    /* ============== PROTOTYPE · cycle hero (3 goals reliés en boucle) ============== */
    'bnp.prototype.cycleG1Phase': { fr: 'Control business state',  nl: 'Control business state',  en: 'Control business state' },
    'bnp.prototype.cycleG1Name':  { fr: 'Performance Analysis',     nl: 'Performance Analysis',     en: 'Performance Analysis' },
    'bnp.prototype.cycleG1Q':     { fr: '« Comment je performe ce mois-ci ? »', nl: '« Hoe presteer ik deze maand? »', en: '"How am I performing this month?"' },
    'bnp.prototype.cycleG2Phase': { fr: 'Learn & take actions',     nl: 'Learn & take actions',     en: 'Learn & take actions' },
    'bnp.prototype.cycleG2Name':  { fr: 'Business Expansion',       nl: 'Business Expansion',       en: 'Business Expansion' },
    'bnp.prototype.cycleG2Q':     { fr: '« Comment j\'agrandis mon business ? »', nl: '« Hoe laat ik mijn business groeien? »', en: '"How do I grow my business?"' },
    'bnp.prototype.cycleG3Phase': { fr: 'Observe impact of actions', nl: 'Observe impact of actions', en: 'Observe impact of actions' },
    'bnp.prototype.cycleG3Name':  { fr: 'Evaluating Actions',        nl: 'Evaluating Actions',        en: 'Evaluating Actions' },
    'bnp.prototype.cycleG3Q':     { fr: '« L\'action que j\'ai prise, elle a marché ? »', nl: '« De actie die ik heb genomen, heeft die gewerkt? »', en: '"The action I took, did it work?"' },
    'bnp.prototype.cycleCaption': {
      fr: 'Trois rapports qui forment <strong>une seule boucle de décision</strong>. Le commerçant entre par la question qui le préoccupe ce jour-là — et chaque rapport le ramène vers l\'action, puis vers la mesure. Pas de big data à explorer : trois lectures coachées, un seul flux de décision.',
      nl: 'Drie rapporten die <strong>één enkele beslissingsloop</strong> vormen. De handelaar stapt in via de vraag die hem die dag bezighoudt — en elk rapport brengt hem terug naar de actie, dan naar de meting. Geen big data om te verkennen : drie gecoachte lezingen, één beslissingsstroom.',
      en: 'Three reports that form <strong>a single decision loop</strong>. The merchant enters through the question on his mind that day — and each report brings him back to action, then to measurement. No big data to explore : three coached reads, one decision flow.'
    },
    'bnp.prototype.cyclePhase2': {
      fr: '<strong>Goal 4 · Market Research</strong> — « Où ouvrir le prochain shop ? » — identifié hors scope MVP, placé en roadmap phase 2.',
      nl: '<strong>Doel 4 · Market Research</strong> — « Waar open ik mijn volgende winkel? » — geïdentificeerd buiten MVP-scope, geplaatst in roadmap fase 2.',
      en: '<strong>Goal 4 · Market Research</strong> — "Where do I open my next shop?" — identified out of MVP scope, placed in phase 2 roadmap.'
    },

    /* ============== PROTOTYPE · value prop par goal (no big data, coached reads) ============== */
    'bnp.prototype.g1ValueProp': {
      fr: '<strong>La promesse :</strong> ce que ferait un analyste en 30 minutes (extraire, croiser, visualiser, comparer N-1, écrire la conclusion), le commerçant l\'a en 5 secondes. Aucune compétence data requise.',
      nl: '<strong>De belofte :</strong> wat een analist in 30 minuten zou doen (extraheren, kruisen, visualiseren, N-1 vergelijken, conclusie schrijven), heeft de handelaar in 5 seconden. Geen data-vaardigheid vereist.',
      en: '<strong>The promise :</strong> what an analyst would do in 30 minutes (extract, cross-reference, visualise, compare to last year, write the conclusion), the merchant has in 5 seconds. No data skill required.'
    },
    'bnp.prototype.g2ValueProp': {
      fr: '<strong>La promesse :</strong> au lieu d\'explorer 20 segments démographiques, le rapport ne montre que les 3 segments qui pèsent — et dit lequel décroche. Le commerçant n\'a pas besoin de savoir ce qu\'est une cohorte.',
      nl: '<strong>De belofte :</strong> in plaats van 20 demografische segmenten te verkennen, toont het rapport alleen de 3 die ertoe doen — en zegt welke afhaakt. De handelaar hoeft niet te weten wat een cohort is.',
      en: '<strong>The promise :</strong> instead of exploring 20 demographic segments, the report shows only the 3 that matter — and tells which one is slipping. The merchant doesn\'t need to know what a cohort is.'
    },
    'bnp.prototype.g3ValueProp': {
      fr: '<strong>La promesse :</strong> aucune arithmétique mentale. Le delta entre deux périodes est calculé côté serveur, affiché en chiffre clair à droite de chaque graphique. Le commerçant lit le résultat, pas la formule.',
      nl: '<strong>De belofte :</strong> geen mentaal rekenwerk. Het verschil tussen twee periodes wordt aan serverzijde berekend, in duidelijke cijfers rechts van elke grafiek getoond. De handelaar leest het resultaat, niet de formule.',
      en: '<strong>The promise :</strong> no mental arithmetic. The delta between two periods is computed server-side, shown in clear numbers next to each chart. The merchant reads the result, not the formula.'
    },

    /* ============== PROTOTYPE 03 — Goal 1 Performance Analysis ============== */
    'bnp.prototype.g1Eyebrow': { fr: 'Goal 1 · Performance Analysis · cycle position : Control', nl: 'Doel 1 · Performance Analysis · cycle position : Control', en: 'Goal 1 · Performance Analysis · cycle position : Control' },
    'bnp.prototype.g1Title': {
      fr: 'Comment je performe <span class="accent">ce mois-ci ?</span>',
      nl: 'Hoe presteer ik <span class="accent">deze maand?</span>',
      en: 'How am I performing <span class="accent">this month?</span>'
    },
    'bnp.prototype.g1Lead': {
      fr: 'Le commerçant ouvre le dashboard, en cinq secondes il a sa lecture du mois : trois KPI lus en un coup d\'œil, son shop comparé aux autres du réseau, l\'écart vs N-1 mis en lumière. Pas de filtres à manipuler, pas de graphique à construire. La donnée parle, il décide.',
      nl: 'De handelaar opent het dashboard, in vijf seconden heeft hij zijn maandlezing : drie KPI\'s in één oogopslag, zijn winkel vergeleken met de andere van het netwerk, het verschil vs N-1 in beeld gebracht. Geen filters te manipuleren, geen grafiek te bouwen. De data spreekt, hij beslist.',
      en: 'The merchant opens the dashboard, in five seconds he has his read of the month : three KPIs at a glance, his shop compared to the network, the gap vs last year highlighted. No filters to manipulate, no chart to build. The data speaks, he decides.'
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
    'bnp.prototype.g2Lead': {
      fr: 'Une fois la photo du business prise, le commerçant entre en mode action. Cinq lectures coachées l\'aident à décider quoi changer concrètement : qui sont mes clients réels, quand achètent-ils, ceux qui reviennent, ceux qui partent, et quand j\'ouvre. Chaque feature pointe vers une décision concrète.',
      nl: 'Eens de foto van de business genomen, gaat de handelaar in actiemodus. Vijf gecoachte lezingen helpen hem concreet te beslissen wat te veranderen : wie zijn mijn echte klanten, wanneer kopen ze, wie komt terug, wie vertrekt, wanneer ben ik open. Elke feature wijst naar een concrete beslissing.',
      en: 'Once the picture of the business is taken, the merchant moves to action mode. Five coached reads help him decide concretely what to change : who my real customers are, when they buy, who returns, who leaves, and when I open. Each feature points to a concrete call.'
    },
    'bnp.prototype.g2Feat1Name': { fr: 'Personas', nl: 'Personas', en: 'Personas' },
    'bnp.prototype.g2Feat1Desc': { fr: 'Profil socio-démographique des acheteurs réels. Âge, genre, langue, revenu, taille de famille, origine géographique.', nl: 'Sociodemografisch profiel van de echte kopers. Leeftijd, gender, taal, inkomen, gezinsgrootte, geografische herkomst.', en: 'Socio-demographic profile of actual buyers. Age, gender, language, income, family size, geographic origin.' },
    'bnp.prototype.g2Feat2Name': { fr: 'Spending Patterns', nl: 'Spending Patterns', en: 'Spending Patterns' },
    'bnp.prototype.g2Feat2Desc': { fr: 'Quand achètent-ils, combien dépensent-ils en moyenne, sur quelles catégories. Heatmap horaire et hebdomadaire.', nl: 'Wanneer kopen ze, hoeveel besteden ze gemiddeld, in welke categorieën. Heatmap per uur en per week.', en: 'When they buy, how much they spend on average, in which categories. Hourly and weekly heatmap.' },
    'bnp.prototype.g2Feat3Name': { fr: 'Customer Retention', nl: 'Customer Retention', en: 'Customer Retention' },
    'bnp.prototype.g2Feat3Desc': { fr: 'Qui revient, qui ne revient plus. Cohorte des clients fidèles vs ceux à reconquérir.', nl: 'Wie komt terug, wie niet meer. Cohorte trouwe klanten versus klanten om terug te winnen.', en: 'Who comes back, who does not. Loyal customer cohort versus those to win back.' },
    'bnp.prototype.g2Feat4Name': { fr: 'Customer Origin', nl: 'Customer Origin', en: 'Customer Origin' },
    'bnp.prototype.g2Feat4Desc': { fr: 'Carte des codes postaux d\'origine. D\'où viennent vos clients, quelle commune cibler en marketing local.', nl: 'Kaart van postcodes van herkomst. Waar uw klanten vandaan komen, welke gemeente te targeten in lokale marketing.', en: 'Map of postcode origins. Where your customers come from, which commune to target in local marketing.' },
    'bnp.prototype.g2Feat5Name': { fr: 'Open Hours Efficiency', nl: 'Open Hours Efficiency', en: 'Open Hours Efficiency' },
    'bnp.prototype.g2Feat5Desc': { fr: 'Trafic carte heure par heure. L\'amplitude actuelle est-elle calée sur la fréquentation réelle ?', nl: 'Kaartverkeer per uur. Is de huidige openingsamplitude afgestemd op de werkelijke bezoekersaantallen?', en: 'Hourly card traffic. Are current opening hours aligned with actual footfall?' },
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
    'bnp.prototype.g3Lead': {
      fr: 'Pour évaluer une action, il faut comparer. Le concept fixe trois fenêtres temps : <strong>même période N-1</strong>, <strong>période précédente</strong>, <strong>même période courante (multi-shops)</strong>. Sur ce socle, le co-design avec Léonidas a posé le test décisif.',
      nl: 'Om een actie te evalueren, moet je vergelijken. Het concept legt drie tijdsvensters vast : <strong>zelfde periode N-1</strong>, <strong>vorige periode</strong>, <strong>zelfde lopende periode (multi-shops)</strong>. Op die basis heeft de co-design met Léonidas de beslissende test gelegd.',
      en: 'To evaluate an action, you need to compare. The concept fixes three time windows : <strong>same period last year</strong>, <strong>previous period</strong>, <strong>same current period (multi-shops)</strong>. On this foundation, the Léonidas co-design ran the decisive test.'
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
    'bnp.prototype.g4Lead': {
      fr: 'Le quatrième goal vise une décision plus stratégique : où implanter une nouvelle boutique, sur quelle vertical étendre l\'enseigne. Hors scope MVP — la donnée est là, mais le service demande un cran de maturité supplémentaire côté sponsor. Identifié comme axe d\'expansion phase 2, horizon 2020.',
      nl: 'Het vierde doel mikt op een meer strategische beslissing : waar een nieuwe winkel openen, in welke verticale de keten uitbreiden. Buiten MVP-scope — de data is er, maar de dienst vraagt een trapje extra maturiteit aan sponsor-zijde. Geïdentificeerd als expansie-as fase 2, horizon 2020.',
      en: 'The fourth goal targets a more strategic call : where to open a new shop, in which vertical to extend the chain. Out of MVP scope — the data exists, but the service requires another step of sponsor maturity. Identified as a phase 2 expansion axis, 2020 horizon.'
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
    /* Legacy (orphelins inertes) */
    'bnp.concept.delivEyebrowLegacy': { fr: 'Concept · livrable de fin de parcours', nl: 'Concept · oplevering einde traject',  en: 'Concept · journey deliverable' },
    'bnp.concept.delivTitle': {
      fr: '86 pages, <span class="accent">une seule décision à prendre.</span>',
      nl: '86 pagina\'s, <span class="accent">één enkele beslissing te nemen.</span>',
      en: '86 pages, <span class="accent">one single call to make.</span>'
    },
    'bnp.concept.delivLead': {
      fr: 'Tout le travail des quatre phases du Double Diamond, ramassé dans un seul document. Le Concept Report sert d\'argumentation au sponsor : pas un rapport de recherche, un dossier de décision. Il rejoue le parcours du commerçant, la matière analysée, les quatre rapports prototypés, le scope MVP arrêté en P1/P2, et ouvre directement sur la validation utilisateur.',
      nl: 'Het volledige werk van de vier Double Diamond fasen, samengevat in één document. Het Concept Report dient als argumentatie voor de executive sponsor : geen onderzoeksrapport, een beslissingsdossier. Het herbespeelt het traject van de handelaar, de geanalyseerde materie, de vier geprototypeerde rapporten, de vastgelegde MVP-scope in P1/P2, en opent rechtstreeks op de gebruikersvalidatie.',
      en: 'All the work of the four Double Diamond phases, gathered in a single document. The Concept Report serves as argumentation for the executive sponsor : not a research report, a decision file. It replays the merchant journey, the analysed matter, the four prototyped reports, the MVP scope locked in P1/P2, and opens directly on user validation.'
    },
    'bnp.concept.delivPhase1': { fr: 'Research',  nl: 'Research',  en: 'Research' },
    'bnp.concept.delivPhase2': { fr: 'Analyse',   nl: 'Analyse',   en: 'Analyse' },
    'bnp.concept.delivPhase3': { fr: 'Prototype', nl: 'Prototype', en: 'Prototype' },
    'bnp.concept.delivPhase4': { fr: 'Concept',   nl: 'Concept',   en: 'Concept' },
    'bnp.concept.delivP1L1': { fr: '6 interviews PME terrain',                nl: '6 kmo-interviews op het terrein',         en: '6 SME field interviews' },
    'bnp.concept.delivP1L2': { fr: 'Benchmark Barclays · Proximus · BBVA',    nl: 'Benchmark Barclays · Proximus · BBVA',    en: 'Benchmark Barclays · Proximus · BBVA' },
    'bnp.concept.delivP1L3': { fr: '9 personas B2B livrés',                   nl: '9 B2B-personas opgeleverd',                en: '9 B2B personas delivered' },
    'bnp.concept.delivP2L1': { fr: '3 sources de données fusionnées',         nl: '3 datasources samengevoegd',               en: '3 data sources fused' },
    'bnp.concept.delivP2L2': { fr: '6 Key Barriers identifiées',              nl: '6 Key Barriers geïdentificeerd',           en: '6 Key Barriers identified' },
    'bnp.concept.delivP2L3': { fr: 'Value proposition statement',             nl: 'Value proposition statement',              en: 'Value proposition statement' },
    'bnp.concept.delivP3L1': { fr: '4 goals priorisés (3 MVP · 1 phase 2)',   nl: '4 doelen geprioriteerd (3 MVP · 1 fase 2)', en: '4 goals prioritised (3 MVP · 1 phase 2)' },
    'bnp.concept.delivP3L2': { fr: 'Wireframes goal par goal',                nl: 'Wireframes per doel',                      en: 'Wireframes goal by goal' },
    'bnp.concept.delivP3L3': { fr: 'POC Spotfire cliquable',                  nl: 'Klikbare Spotfire POC',                    en: 'Clickable Spotfire POC' },
    'bnp.concept.delivP4L1': { fr: 'Concept Report 86 pages signé',           nl: 'Concept Report 86 pagina\'s ondertekend', en: 'Concept Report 86 pages signed' },
    'bnp.concept.delivP4L2': { fr: 'User stories prioritisées P1/P2',         nl: 'User stories geprioriteerd P1/P2',         en: 'User stories prioritised P1/P2' },
    'bnp.concept.delivP4L3': { fr: 'MVP scope arrêté · prêt pour user test',  nl: 'MVP-scope vastgelegd · klaar voor user test', en: 'MVP scope locked · ready for user test' },
    'bnp.concept.delivClaim': {
      fr: 'Le sponsor n\'a plus à imaginer le service. Il a un <span class="accent">prototype clickable, des stories prioritisées, un MVP arrêté</span>. Il ne lui reste qu\'à valider la dernière chose qui manque : la voix du commerçant.',
      nl: 'De sponsor hoeft de dienst niet meer in te beelden. Hij heeft een <span class="accent">klikbaar prototype, geprioriteerde stories, een vastgelegde MVP</span>. Hem rest alleen het laatste te valideren : de stem van de handelaar.',
      en: 'The sponsor no longer has to imagine the service. He has a <span class="accent">clickable prototype, prioritised stories, a locked MVP</span>. All he has left is to validate the last missing piece : the merchant\'s voice.'
    },
    'bnp.concept.delivSourceLab': { fr: 'Ouvrir le document complet',                       nl: 'Open het volledige document',           en: 'Open the full document' },
    'bnp.concept.delivSourceRef': { fr: 'Concept Report · mars 2018 · PDF complet 86 pages', nl: 'Concept Report · maart 2018 · volledige PDF 86 pagina\'s', en: 'Concept Report · March 2018 · full PDF 86 pages' },

    'bnp.prototype.spotfireEyebrow': { fr: 'Prototype · Spotfire POC', nl: 'Prototype · Spotfire POC', en: 'Prototype · Spotfire POC' },
    'bnp.prototype.spotfireTitle': {
      fr: 'Trois lectures coachées <span class="accent">par graphique.</span>',
      nl: 'Drie begeleide lezingen <span class="accent">per diagram.</span>',
      en: 'Three coached reads <span class="accent">per chart.</span>'
    },
    'bnp.prototype.spotfireLead': {
      fr: 'IT proposait 47 indicateurs. J\'ai dit non. Trois lectures coachées par graphique, parce que les six barrières en interview disaient toutes la même chose : un commerçant ne sait pas quoi faire avec des chiffres bruts. Le détail qui change tout : chaque graphique entouré d\'une annotation « What\'s important » qui suggère une décision concrète.',
      nl: 'IT stelde 47 indicatoren voor. Ik zei nee. Drie begeleide lezingen per diagram, omdat de zes barrières uit de interviews allemaal hetzelfde zeiden : een merchant weet niet wat te doen met ruwe cijfers. Het detail dat alles verandert : elk diagram omringd door een « What\'s important »-annotatie die een concrete beslissing voorstelt.',
      en: 'IT proposed 47 indicators. I said no. Three coached reads per chart, because the six interview barriers all said the same thing : a shopkeeper doesn\'t know what to do with raw numbers. The detail that changes everything : each chart wrapped in a « What\'s important » annotation that suggests a concrete decision.'
    },
    'bnp.prototype.spotfireCap': {
      fr: 'Dashboard KPI Principles · POC Spotfire · 4 goals · Concept Report p42',
      nl: 'Dashboard KPI Principles · POC Spotfire · 4 goals · Concept Report p42',
      en: 'Dashboard KPI Principles · POC Spotfire · 4 goals · Concept Report p42'
    },
    'bnp.prototype.spotfireSource': {
      fr: 'Source · Concept Report · pages 42-44 · « Dashboard Principles »',
      nl: 'Bron · Concept Report · pagina\'s 42-44 · « Dashboard Principles »',
      en: 'Source · Concept Report · pages 42-44 · "Dashboard Principles"'
    },

    /* ============== PROTOTYPE 3.1 — Service blueprint 5 journeys ============== */
    /* ============== PROTOTYPE 3.2 — Sprint design 3 goals coachés ============== */
    'bnp.prototype.sdEyebrow': { fr: 'Prototype · Sprint design', nl: 'Prototype · Sprint design', en: 'Prototype · Sprint design' },
    'bnp.prototype.sdTitle': {
      fr: 'Trois goals coachés. <span class="accent">Trois sprints. Trois questions du commerçant.</span>',
      nl: 'Drie gecoachte goals. <span class="accent">Drie sprints. Drie merchant-vragen.</span>',
      en: 'Three coached goals. <span class="accent">Three sprints. Three shopkeeper questions.</span>'
    },
    'bnp.prototype.sdLead': {
      fr: 'Le service blueprint posé, on a découpé le concept en trois sprints design — un par goal. Chaque sprint répond à une question concrète du commerçant. Pas une feature isolée : une lecture coachée du dashboard sur cette question.',
      nl: 'Service blueprint gelegd, we knipten het concept in drie design sprints — één per goal. Elke sprint beantwoordt een concrete merchant-vraag. Geen geïsoleerde feature: een gecoachte lezing van het dashboard rond die vraag.',
      en: 'With the service blueprint in place, we sliced the concept into three design sprints — one per goal. Each sprint answers a concrete shopkeeper question. Not an isolated feature: a coached read of the dashboard on that question.'
    },
    'bnp.prototype.sdSprint1': { fr: 'Sprint 1 · 2 semaines', nl: 'Sprint 1 · 2 weken', en: 'Sprint 1 · 2 weeks' },
    'bnp.prototype.sdSprint2': { fr: 'Sprint 2 · 2 semaines', nl: 'Sprint 2 · 2 weken', en: 'Sprint 2 · 2 weeks' },
    'bnp.prototype.sdSprint3': { fr: 'Sprint 3 · 2 semaines', nl: 'Sprint 3 · 2 weken', en: 'Sprint 3 · 2 weeks' },
    'bnp.prototype.sd1Name':   { fr: 'Performance Analysis', nl: 'Performance Analysis', en: 'Performance Analysis' },
    'bnp.prototype.sd1Q':      { fr: '« Comment je performe ce mois-ci ? »', nl: '« Hoe presteer ik deze maand ? »', en: '"How am I performing this month ?"' },
    'bnp.prototype.sd1Out':    { fr: '3 KPIs · shop ranking · monthly trends · annotation what\'s important', nl: '3 KPI\'s · shop ranking · monthly trends · what\'s important annotatie', en: '3 KPIs · shop ranking · monthly trends · what\'s important annotation' },
    'bnp.prototype.sd2Name':   { fr: 'Business Expansion', nl: 'Business Expansion', en: 'Business Expansion' },
    'bnp.prototype.sd2Q':      { fr: '« Comment j\'agrandis mon business ? »', nl: '« Hoe vergroot ik mijn business ? »', en: '"How do I grow my business ?"' },
    'bnp.prototype.sd2Out':    { fr: 'Cycle Control / Learn / Observe · personas · spending patterns · open hours', nl: 'Cyclus Control / Learn / Observe · personas · spending patterns · open hours', en: 'Cycle Control / Learn / Observe · personas · spending patterns · open hours' },
    'bnp.prototype.sd3Name':   { fr: 'Evaluating Actions', nl: 'Evaluating Actions', en: 'Evaluating Actions' },
    'bnp.prototype.sd3Q':      { fr: '« L\'action que j\'ai prise — elle a marché ? »', nl: '« De actie die ik heb genomen — werkte die ? »', en: '"The action I took — did it work ?"' },
    'bnp.prototype.sd3Out':    { fr: 'Time selection 3 fenêtres · shop comparison · period comparison · maintained customers', nl: 'Time selection 3 vensters · shop comparison · period comparison · maintained customers', en: 'Time selection 3 windows · shop comparison · period comparison · maintained customers' },
    'bnp.prototype.sdSource': {
      fr: 'Trois sprints design successifs · co-animés avec le PO IT et le sponsor · janvier-mars 2018',
      nl: 'Drie opeenvolgende design sprints · co-gefaciliteerd met de IT PO en de sponsor · januari-maart 2018',
      en: 'Three successive design sprints · co-facilitated with the IT PO and the sponsor · January-March 2018'
    },

    /* ============== CONCEPT 4.4 — Decision pack consolidé ============== */
    'bnp.dp.eyebrow': { fr: 'Concept · Decision pack pour sponsor', nl: 'Concept · Decision pack voor executive sponsor', en: 'Concept · Decision pack for executive sponsor' },
    'bnp.dp.title': {
      fr: 'Le pack qui a <span class="accent">fait passer le projet en production.</span>',
      nl: 'Het pack dat <span class="accent">het project in productie liet gaan.</span>',
      en: 'The pack that <span class="accent">moved the project into production.</span>'
    },
    'bnp.dp.lead': {
      fr: 'À la sortie de la phase Concept, un seul livrable atterrissait sur le bureau du sponsor : un decision pack qui contenait tout — la VP signée, les 3 goals MVP prototypés, le climax Léonidas chiffré, le scope MVP arrêté en P1/P2, le budget sprint, la roadmap phase 2. Une seule réunion. Une seule décision.',
      nl: 'Aan het einde van de Concept-fase landde één enkel deliverable op het bureau van de sponsor: een decision pack met alles erin — de getekende VP, de 3 geprototypeerde MVP-goals, de gekwantificeerde Léonidas-climax, de MVP-scope vastgelegd in P1/P2, het sprint-budget, de fase 2-roadmap. Eén meeting. Eén beslissing.',
      en: 'Out of the Concept phase, a single deliverable landed on the sponsor\'s desk: a decision pack with everything inside — signed VP, 3 prototyped MVP goals, the Léonidas climax quantified, the MVP scope locked in P1/P2, the sprint budget, the phase 2 roadmap. One meeting. One decision.'
    },
    'bnp.dp.i1Name': { fr: 'VP signée + Lean Canvas', nl: 'Getekende VP + Lean Canvas', en: 'Signed VP + Lean Canvas' },
    'bnp.dp.i1Desc': {
      fr: '+15-25% de revenue PME pour qui suit les rapports. Triple Win Bank · Retailer · Cardholder.',
      nl: '+15-25% kmo-omzet voor wie de rapporten volgt. Triple Win Bank · Retailer · Cardholder.',
      en: '+15-25% SME revenue for those who follow the reports. Triple Win Bank · Retailer · Cardholder.'
    },
    'bnp.dp.i2Name': { fr: '3 Goals prototypés Spotfire', nl: '3 geprototypeerde Spotfire-goals', en: '3 Goals prototyped on Spotfire' },
    'bnp.dp.i2Desc': {
      fr: 'Performance · Business Expansion · Evaluating Actions. Wireframes spec InVision livrés au studio interne.',
      nl: 'Performance · Business Expansion · Evaluating Actions. Wireframes spec InVision opgeleverd aan de interne studio.',
      en: 'Performance · Business Expansion · Evaluating Actions. Wireframes spec InVision handed to the in-house studio.'
    },
    'bnp.dp.i3Name': { fr: 'Climax Léonidas chiffré', nl: 'Gekwantificeerde Léonidas-climax', en: 'Léonidas climax quantified' },
    'bnp.dp.i3Desc': {
      fr: '+80% revenue · +€34k en 6 mois · 6/1/0. Le seul cas de promesse d\'achat ferme avant le développement, sur ce projet, à BNP.',
      nl: '+80% omzet · +€34k op 6 maanden · 6/1/0. Het enige geval van een harde aankoopbelofte voor de ontwikkeling, op dit project, bij BNP.',
      en: '+80% revenue · +€34k in 6 months · 6/1/0. The only case of a firm purchase commitment before development, on this project, at BNP.'
    },
    'bnp.dp.i4Name': { fr: 'MVP scope arrêté · P1/P2', nl: 'Vastgelegde MVP-scope · P1/P2', en: 'MVP scope locked · P1/P2' },
    'bnp.dp.i4Desc': {
      fr: '12 user stories P1 (sprints 1-3) · 4 user stories P2 (Marketing tout-boîte · Market Research). Backlog signé Banking, IT, Legal, Marketing.',
      nl: '12 user stories P1 (sprints 1-3) · 4 user stories P2 (Marketing tout-boîte · Market Research). Backlog ondertekend door Banking, IT, Legal, Marketing.',
      en: '12 P1 user stories (sprints 1-3) · 4 P2 user stories (Marketing tout-boîte · Market Research). Backlog signed by Banking, IT, Legal, Marketing.'
    },
    'bnp.dp.i5Name': { fr: 'Goal 4 · roadmap phase 2', nl: 'Goal 4 · roadmap fase 2', en: 'Goal 4 · phase 2 roadmap' },
    'bnp.dp.i5Desc': {
      fr: 'Market Research (Best business location · Opportunities by industry) — out of MVP scope, identifié comme axe d\'expansion 2020 vers Acquirer share 7→20%.',
      nl: 'Market Research (Best business location · Opportunities by industry) — buiten MVP-scope, geïdentificeerd als expansie-as 2020 richting Acquirer share 7→20%.',
      en: 'Market Research (Best business location · Opportunities by industry) — out of MVP scope, identified as 2020 expansion axis toward Acquirer share 7→20%.'
    },
    'bnp.dp.source': {
      fr: 'Decision pack présenté au sponsor · BNPPF Bank for Entrepreneurs · mars 2018 · décision : MVP en production Q2 2018',
      nl: 'Decision pack voorgesteld aan de executive sponsor · BNPPF Bank for Entrepreneurs · maart 2018 · beslissing: MVP in productie Q2 2018',
      en: 'Decision pack presented to the executive sponsor · BNPPF Bank for Entrepreneurs · March 2018 · decision: MVP into production Q2 2018'
    },

    'bnp.prototype.bpEyebrow': { fr: 'Prototype · Service blueprint', nl: 'Prototype · Service blueprint', en: 'Prototype · Service blueprint' },
    'bnp.prototype.bpTitle': {
      fr: 'Cinq journeys end-to-end. <span class="accent">Une seule promesse.</span>',
      nl: 'Vijf end-to-end journeys. <span class="accent">Eén belofte.</span>',
      en: 'Five end-to-end journeys. <span class="accent">One promise.</span>'
    },
    'bnp.prototype.bpLead': {
      fr: 'Avant de dessiner un écran, j\'ai posé le service au complet. Cinq journeys end-to-end qui couvrent l\'onboarding non-EBB, la première connexion, la lecture d\'un goal, la prise de décision, et le retour avec un nouveau résultat. Côté backstage : qui pousse la donnée, qui la calcule, qui la rafraîchit.',
      nl: 'Voor er een scherm getekend werd, lag de hele service al neer. Vijf end-to-end journeys: onboarding non-EBB, eerste login, lezen van een goal, beslissing nemen, en terugkomen met een nieuw resultaat. Backstage: wie pusht de data, wie berekent ze, wie refresht ze.',
      en: 'Before drawing a single screen, I laid out the whole service. Five end-to-end journeys: non-EBB onboarding, first login, reading a goal, making a call, coming back with a new outcome. Backstage: who pushes the data, who computes it, who refreshes it.'
    },
    'bnp.prototype.bp1Name': { fr: 'Onboarding non-EBB', nl: 'Onboarding non-EBB', en: 'Non-EBB onboarding' },
    'bnp.prototype.bp1Desc': {
      fr: 'Du compte commerçant à l\'activation Enterprise Intelligence — 15 étapes nettoyées, 5 frictions retirées.',
      nl: 'Van merchant-account naar activatie Enterprise Intelligence — 15 stappen opgekuist, 5 fricties weggehaald.',
      en: 'From merchant account to Enterprise Intelligence activation — 15 steps cleaned, 5 frictions removed.'
    },
    'bnp.prototype.bp2Name': { fr: 'Première lecture', nl: 'Eerste raadpleging', en: 'First read' },
    'bnp.prototype.bp2Desc': {
      fr: 'Login Easy Banking Business → home E.I. → premier goal coaché. Zéro tutoriel, l\'interface guide.',
      nl: 'Login Easy Banking Business → home E.I. → eerste gecoachte goal. Geen tutorial, het scherm leidt.',
      en: 'Easy Banking Business login → E.I. home → first coached goal. No tutorial — the interface guides.'
    },
    'bnp.prototype.bp3Name': { fr: 'Décision business', nl: 'Business-beslissing', en: 'Business call' },
    'bnp.prototype.bp3Desc': {
      fr: 'Du KPI au geste : campagne Marketing tout-boîte, ajustement opening hours, repositionnement panier.',
      nl: 'Van KPI naar actie: Marketing tout-boîte campagne, opening hours bijstellen, basket herpositioneren.',
      en: 'From KPI to action: Marketing tout-boîte campaign, opening hours adjustment, basket repositioning.'
    },
    'bnp.prototype.bp4Name': { fr: 'Retour mesuré', nl: 'Gemeten terugkeer', en: 'Measured return' },
    'bnp.prototype.bp4Desc': {
      fr: 'Le mois suivant, le commerçant revient et lit l\'effet de sa décision. Boucle fermée.',
      nl: 'De volgende maand komt de merchant terug en leest het effect van zijn beslissing. Lus gesloten.',
      en: 'Next month, the shopkeeper returns and reads the effect of his call. Loop closed.'
    },
    'bnp.prototype.bp5Name': { fr: 'Backstage data', nl: 'Backstage data', en: 'Backstage data' },
    'bnp.prototype.bp5Desc': {
      fr: 'ATOS pousse la donnée transactionnelle, IT calcule les agrégats, BNP push les insights dans EBB. Un seul SLA visible côté commerçant.',
      nl: 'ATOS pusht de transactionele data, IT berekent de aggregaten, BNP pusht de insights in EBB. Eén SLA zichtbaar aan de merchant.',
      en: 'ATOS pushes transactional data, IT computes aggregates, BNP pushes insights into EBB. One SLA visible to the merchant.'
    },
    'bnp.prototype.bpSource': {
      fr: 'Référence interne · Service blueprint atelier · novembre 2017',
      nl: 'Interne referentie · Service blueprint workshop · november 2017',
      en: 'Internal reference · Service blueprint workshop · November 2017'
    },

    /* ============== PROTOTYPE 3.4 — User test 6 PME ============== */
    'bnp.prototype.utEyebrow': { fr: 'Prototype · User test 6 PME', nl: 'Prototype · User test 6 kmo\'s', en: 'Prototype · 6 SME user test' },
    'bnp.prototype.utTitle': {
      fr: 'Six commerçants. <span class="accent">Une promesse d\'achat ferme.</span>',
      nl: 'Zes merchants. <span class="accent">Eén harde aankoopbelofte.</span>',
      en: 'Six shopkeepers. <span class="accent">One firm purchase commitment.</span>'
    },
    'bnp.prototype.utLead': {
      fr: 'Le prototype Spotfire est testé avec six PME. Les six lisent leur dashboard sans aide. Cinq disent oui à un pilote. <strong>Un — le groupe Léonidas — accepte de signer une promesse d\'achat ferme.</strong> Pas un usability test poli. Une validation commerciale.',
      nl: 'Het Spotfire-prototype wordt getest met zes kmo\'s. Alle zes lezen hun dashboard zonder hulp. Vijf zeggen ja tegen een pilot. <strong>Eén — de Léonidas-groep — tekent een harde aankoopbelofte.</strong> Geen beleefde usability test. Een commerciële validatie.',
      en: 'The Spotfire prototype is tested with six SMEs. All six read their dashboard unaided. Five say yes to a pilot. <strong>One — the Léonidas group — signs a firm purchase commitment.</strong> Not a polite usability test. A commercial validation.'
    },
    'bnp.prototype.utStat1': { fr: 'PME testées',                       nl: 'Kmo\'s getest',                        en: 'SMEs tested' },
    'bnp.prototype.utStat2': { fr: 'Promesse d\'achat signée (Léonidas)', nl: 'Aankoopbelofte getekend (Léonidas)',  en: 'Purchase commitment signed (Léonidas)' },
    'bnp.prototype.utStat3': { fr: 'Refus catégorique',                  nl: 'Categorische weigering',               en: 'Categorical refusal' },
    'bnp.prototype.utQuote': {
      fr: 'Le sponsor a signé. Six PME ont été testées · une a souscrit, cinq ont refusé. Le go production a été décidé sur l\'engagement écrit du groupe Léonidas, daté avant le développement.',
      nl: 'De sponsor heeft getekend. Zes kmo\'s zijn getest · één heeft zich geëngageerd, vijf hebben geweigerd. De go-productie werd genomen op basis van het schriftelijke engagement van de groep Léonidas, gedateerd vóór de ontwikkeling.',
      en: 'The sponsor signed. Six SMEs were tested · one committed, five declined. The go-production decision was made on the written commitment of the Léonidas group, dated before development.'
    },
    'bnp.prototype.utSource': {
      fr: 'Tests menés en co-design avec le groupe Léonidas · janvier-juin 2018',
      nl: 'Tests uitgevoerd in co-design met de Léonidas-groep · januari-juni 2018',
      en: 'Tests run in co-design with the Léonidas group · January-June 2018'
    },

    /* ============== CONCEPT 4.2 — User stories prioritisées ============== */
    'bnp.concept.usEyebrow': { fr: 'Concept · User stories prioritisées', nl: 'Concept · Geprioriteerde user stories', en: 'Concept · Prioritised user stories' },
    'bnp.concept.usTitle': {
      fr: 'Du Concept Report <span class="accent">au backlog signable.</span>',
      nl: 'Van Concept Report <span class="accent">naar tekenbaar backlog.</span>',
      en: 'From Concept Report <span class="accent">to a signable backlog.</span>'
    },
    'bnp.concept.usLead': {
      fr: 'Le Concept Report seul ne se développe pas. Chaque goal est cassé en user stories prioritisées, scope MVP arrêté, frontière P1/P2 dessinée. Le sponsor lit ce qui sera livré au sprint 1, le développement lit ce qu\'il code lundi matin.',
      nl: 'Het Concept Report alleen wordt niet ontwikkeld. Elke goal wordt opgesplitst in geprioriteerde user stories, MVP-scope vastgelegd, P1/P2-grens getrokken. De sponsor leest wat er in sprint 1 wordt opgeleverd, de devs lezen wat ze maandagochtend coderen.',
      en: 'The Concept Report alone doesn\'t get built. Each goal is broken into prioritised user stories, MVP scope locked, P1/P2 boundary drawn. The sponsor reads what ships in sprint 1, the dev team reads what they code Monday morning.'
    },
    'bnp.concept.us1Name': { fr: 'Performance Analysis · MVP scope', nl: 'Performance Analysis · MVP-scope', en: 'Performance Analysis · MVP scope' },
    'bnp.concept.us1Desc': {
      fr: '« En tant que commerçant, je veux voir transactions · revenus · panier moyen sur le mois écoulé pour décider où agir. » <strong>5 stories · livrable sprint 1.</strong>',
      nl: '« Als merchant wil ik transacties · omzet · gemiddelde basket van de afgelopen maand zien om te beslissen waar ik optreed. » <strong>5 stories · oplevering sprint 1.</strong>',
      en: '"As a shopkeeper, I want to see transactions · revenue · average basket for last month to decide where to act." <strong>5 stories · sprint 1 delivery.</strong>'
    },
    'bnp.concept.us2Name': { fr: 'Shop Comparison · MVP scope', nl: 'Shop Comparison · MVP-scope', en: 'Shop Comparison · MVP scope' },
    'bnp.concept.us2Desc': {
      fr: '« En tant que groupe multi-shops, je veux comparer mes points de vente entre eux pour repérer celui qui décroche. » <strong>4 stories · livrable sprint 2.</strong>',
      nl: '« Als multi-shop groep wil ik mijn verkooppunten onderling vergelijken om te zien welke loslaat. » <strong>4 stories · oplevering sprint 2.</strong>',
      en: '"As a multi-shop group, I want to compare my points of sale to spot the one falling behind." <strong>4 stories · sprint 2 delivery.</strong>'
    },
    'bnp.concept.us3Name': { fr: 'Period Comparison · MVP scope', nl: 'Period Comparison · MVP-scope', en: 'Period Comparison · MVP scope' },
    'bnp.concept.us3Desc': {
      fr: '« En tant que commerçant, je veux confronter ce mois au même mois N-1 pour mesurer ce qui a changé. » <strong>3 stories · livrable sprint 3.</strong>',
      nl: '« Als merchant wil ik deze maand vergelijken met dezelfde maand N-1 om te meten wat veranderd is. » <strong>3 stories · oplevering sprint 3.</strong>',
      en: '"As a shopkeeper, I want this month set against the same month last year to measure what changed." <strong>3 stories · sprint 3 delivery.</strong>'
    },
    'bnp.concept.us4Name': { fr: 'Marketing tout-boîte · phase 2', nl: 'Marketing tout-boîte · fase 2', en: 'Marketing tout-boîte · phase 2' },
    'bnp.concept.us4Desc': {
      fr: '« En tant que commerçant, je veux cibler une campagne par source-commune sans toucher aux données personnelles. » <strong>Out of MVP, roadmap 2020.</strong>',
      nl: '« Als merchant wil ik een campagne per source-commune targeten zonder persoonsgegevens aan te raken. » <strong>Buiten MVP, roadmap 2020.</strong>',
      en: '"As a shopkeeper, I want to target a campaign by source-commune without touching personal data." <strong>Out of MVP, 2020 roadmap.</strong>'
    },
    'bnp.concept.usSource': {
      fr: 'Backlog co-rédigé avec le PO IT · validé par Banking, Legal et Marketing · mars 2018',
      nl: 'Backlog samen geschreven met de IT-PO · gevalideerd door Banking, Legal en Marketing · maart 2018',
      en: 'Backlog co-written with the IT PO · validated by Banking, Legal and Marketing · March 2018'
    },

    /* ============== CONCEPT 4.3 — User flows + UX/UI directions ============== */
    'bnp.concept.ufEyebrow': { fr: 'Concept · User flows + UX/UI', nl: 'Concept · User flows + UX/UI', en: 'Concept · User flows + UX/UI' },
    'bnp.concept.ufTitle': {
      fr: 'Des wireframes <span class="accent">aux directions UI livrées au studio.</span>',
      nl: 'Van wireframes <span class="accent">naar UI-richtingen geleverd aan de studio.</span>',
      en: 'From wireframes <span class="accent">to UI directions handed to the studio.</span>'
    },
    'bnp.concept.ufLead': {
      fr: 'Trois user flows tracés bout-en-bout : Performance, Comparison, Reporting. Chaque écran avec ses états, ses erreurs, ses chargements. Trois directions UI proposées au studio interne — typographie, palette, motion. La direction retenue est celle qui héritait du système Easy Banking Business pour zéro friction d\'apprentissage.',
      nl: 'Drie user flows end-to-end uitgewerkt: Performance, Comparison, Reporting. Elk scherm met states, errors, loadings. Drie UI-richtingen voorgesteld aan de interne studio — typografie, palet, motion. De gekozen richting erft van het Easy Banking Business design system voor nul leerwrijving.',
      en: 'Three end-to-end user flows: Performance, Comparison, Reporting. Each screen with its states, errors, loadings. Three UI directions handed to the in-house studio — typography, palette, motion. The retained direction inherits from the Easy Banking Business system, for zero learning friction.'
    },
    'bnp.concept.uf1Name': { fr: 'Flow Performance', nl: 'Flow Performance', en: 'Performance flow' },
    'bnp.concept.uf1Desc': {
      fr: 'Login EBB → home E.I. → goal Performance → drill-down KPI → décision suggérée. 4 écrans, 8 états, 2 fallbacks data-not-ready.',
      nl: 'Login EBB → home E.I. → goal Performance → KPI drill-down → voorgestelde beslissing. 4 schermen, 8 states, 2 fallbacks data-not-ready.',
      en: 'EBB login → E.I. home → Performance goal → KPI drill-down → suggested call. 4 screens, 8 states, 2 data-not-ready fallbacks.'
    },
    'bnp.concept.uf2Name': { fr: 'Flow Comparison', nl: 'Flow Comparison', en: 'Comparison flow' },
    'bnp.concept.uf2Desc': {
      fr: 'Multi-shops switch → comparaison à plat → tri par signal d\'écart → focus sur le shop qui décroche. 5 écrans, 3 états vides bien storytellés.',
      nl: 'Multi-shops switch → vlakke vergelijking → sorteren op afwijking → focus op de shop die loslaat. 5 schermen, 3 lege states goed verteld.',
      en: 'Multi-shop switch → flat comparison → sort by deviation → focus on the shop falling behind. 5 screens, 3 empty states told well.'
    },
    'bnp.concept.uf3Name': { fr: 'Flow Reporting', nl: 'Flow Reporting', en: 'Reporting flow' },
    'bnp.concept.uf3Desc': {
      fr: 'Période → comparaison N vs N-1 → annotation « what\'s important » → export PDF prêt à présenter au comptable. Boucle fermée.',
      nl: 'Periode → vergelijking N vs N-1 → annotatie « what\'s important » → PDF-export klaar voor de boekhouder. Lus gesloten.',
      en: 'Period → N vs N-1 comparison → "what\'s important" annotation → PDF export ready for the accountant. Loop closed.'
    },
    'bnp.concept.uf4Name': { fr: 'Direction visuelle retenue', nl: 'Gekozen visuele richting', en: 'Visual direction retained' },
    'bnp.concept.uf4Desc': {
      fr: 'Héritée du design system Easy Banking Business · typo BNP corporate · palette ambre + neutres · motion sobre. Zéro friction d\'apprentissage pour les commerçants déjà clients EBB.',
      nl: 'Geërfd van het Easy Banking Business design system · BNP-corporate typografie · palet amber + neutralen · sobere motion. Nul leerwrijving voor merchants die al EBB-klant zijn.',
      en: 'Inherited from the Easy Banking Business design system · BNP corporate typography · amber + neutrals palette · sober motion. Zero learning friction for merchants who already use EBB.'
    },
    'bnp.concept.ufSource': {
      fr: 'Wireframes Sketch + spec InVision · transmission au studio interne BNP · mars 2018',
      nl: 'Wireframes Sketch + spec InVision · doorgegeven aan de interne BNP-studio · maart 2018',
      en: 'Sketch wireframes + InVision spec · handed to the in-house BNP studio · March 2018'
    },

    /* ============== CHAPTERS — 4 phases Double Diamond (Research/Analyse/Prototype/Concept) ============== */
    'bnp.chapResearch.overline': { fr: 'Discover · récolter la matière du terrain', nl: 'Discover · het materiaal van het terrein verzamelen', en: 'Discover · gather raw material from the field' },
    'bnp.chapResearch.ddCap':    { fr: 'Vous êtes ici · Diamant 1 · moitié gauche · 4 jalons', nl: 'U bent hier · Diamant 1 · linkerhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · left half · 4 milestones' },
    'bnp.chapResearch.label': { fr: 'Phase 01 · Research', nl: 'Fase 01 · Research', en: 'Phase 01 · Research' },
    'bnp.chapResearch.title': { fr: 'Le terrain enseigne.', nl: 'Het terrein leert.', en: 'The ground teaches.' },
    'bnp.chapResearch.lead': {
      fr: 'Comprendre avant de proposer.',
      nl: 'Begrijpen voor je voorstelt.',
      en: 'Understand before proposing.'
    },
    'bnp.chapAnalyse.overline': { fr: 'Define · resserrer le focus, argumenter', nl: 'Define · de focus aanscherpen, argumenteren', en: 'Define · sharpen the focus, build the argument' },
    'bnp.chapAnalyse.ddCap':    { fr: 'Vous êtes ici · Diamant 1 · moitié droite · 4 jalons', nl: 'U bent hier · Diamant 1 · rechterhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · right half · 4 milestones' },
    'bnp.chapAnalyse.label': { fr: 'Phase 02 · Analyse', nl: 'Fase 02 · Analyse', en: 'Phase 02 · Analyse' },
    'bnp.chapAnalyse.title': { fr: 'Le bon problème.', nl: 'Het juiste probleem.', en: 'The right problem.' },
    'bnp.chapAnalyse.lead': {
      fr: 'Reformuler avant de construire.',
      nl: 'Herkaderen voor je bouwt.',
      en: 'Reframe before building.'
    },
    /* CVE 2026-05-03 · canonical narrative DD · chap-prototype = D2 H2 (Deliver) */
    'bnp.chapPrototype.overline': { fr: 'Deliver · prototyping & testing · valider avec les clients', nl: 'Deliver · prototyping & testing · valideren met klanten', en: 'Deliver · prototyping & testing · validate with clients' },
    'bnp.chapPrototype.label': { fr: 'Phase 04 · Prototype', nl: 'Fase 04 · Prototype', en: 'Phase 04 · Prototype' },
    /* NEW · chap-ideation = D2 H1 (Develop · ateliers co-créatifs) */
    'bnp.chapIdeation.overline': { fr: 'Develop · ateliers co-créatifs · explorer les pistes', nl: 'Develop · co-creatieve workshops · pistes verkennen', en: 'Develop · co-creative workshops · explore the paths' },
    'bnp.chapIdeation.label':    { fr: 'Phase 03 · Ideation', nl: 'Fase 03 · Ideation', en: 'Phase 03 · Ideation' },
    'bnp.chapIdeation.ddCap':    { fr: 'Vous êtes ici · Diamant 2 · moitié gauche · Develop', nl: 'U bent hier · Diamant 2 · linkerhelft · Develop', en: 'You are here · Diamond 2 · left half · Develop' },
    /* Legacy (orphelins inertes mais conservés) */
    'bnp.chapPrototype.ddCap':    { fr: 'Vous êtes ici · Diamant 2 · moitié droite · 4 jalons', nl: 'U bent hier · Diamant 2 · rechterhelft · 4 mijlpalen', en: 'You are here · Diamond 2 · right half · 4 milestones' },
    'bnp.chapPrototype.title': { fr: 'Pas un dashboard. Un service.', nl: 'Geen dashboard. Een dienst.', en: 'Not a dashboard. A service.' },
    'bnp.chapPrototype.lead': {
      fr: 'Chaque écran, une décision.',
      nl: 'Elk scherm, een beslissing.',
      en: 'Each screen, a decision.'
    },
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
    /* Legacy gardées (orphelines mais inertes) */
    'bnp.chapConcept.overline': { fr: 'Livrable post-DD · 86 pages signées', nl: 'Oplevering post-DD · 86 ondertekende pagina\'s', en: 'Post-DD deliverable · 86 signed pages' },
    'bnp.chapConcept.label':    { fr: 'Le sponsor voit où il investit', nl: 'De sponsor ziet waarin hij investeert', en: 'The sponsor sees where they invest' },
    'bnp.chapConcept.main':     { fr: 'Concept Report', nl: 'Concept Report', en: 'Concept Report' },
    'bnp.chapConcept.sub':      { fr: 'Réflexion sourcée · alignement interne · traction de marché', nl: 'Onderbouwde reflectie · interne afstemming · markttractie', en: 'Sourced rationale · internal alignment · market traction' },
    /* Anciennes clés gardées (orphelines mais inertes) */
    'bnp.chapConcept.ddCap':    { fr: 'Vous êtes ici · Diamant 2 · moitié droite · 4 jalons', nl: 'U bent hier · Diamant 2 · rechterhelft · 4 mijlpalen', en: 'You are here · Diamond 2 · right half · 4 milestones' },
    'bnp.chapConcept.title': {
      fr: 'Quatre goals. Un dashboard qui raconte.',
      nl: 'Vier goals. Eén dashboard dat een verhaal vertelt.',
      en: 'Four goals. One dashboard that tells a story.'
    },
    'bnp.chapConcept.lead': {
      fr: 'Le sponsor n\'a plus à imaginer.',
      nl: 'De sponsor hoeft zich niets meer in te beelden.',
      en: 'The sponsor stops imagining.'
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
    /* Legacy gardées (orphelines inertes) */
    'bnp.chapValueProp.overline': { fr: 'Cristallisation D1', nl: 'Kristallisatie D1', en: 'D1 crystallization' },
    'bnp.chapValueProp.label':    { fr: 'Stakeholders dans la peau du commerçant', nl: 'Stakeholders in de schoenen van de handelaar', en: 'Stakeholders in the merchant\'s shoes' },
    'bnp.chapValueProp.main':     { fr: 'Value Proposition', nl: 'Value Proposition', en: 'Value Proposition' },
    'bnp.chapValueProp.statement': {
      fr: 'Pas la donnée à explorer — un rapport clé en main, aligné sur l\'objectif du commerçant.',
      nl: 'Geen data om te verkennen — een kant-en-klaar rapport, afgestemd op het doel van de handelaar.',
      en: 'Not data to explore — a turnkey report, aligned on the merchant\'s goal.'
    },
    'bnp.chapValueProp.sub':      { fr: 'Cristallisation', nl: 'Kristallisatie', en: 'Crystallization' },

    /* Snm-nav · sub-labels pour les outcome gems · narrative canonique CVE */
    'bnp.snm.gValuePropSub':     { fr: 'Outcome D1 · preuve chiffrée', nl: 'Outcome D1 · cijfermatig bewijs', en: 'Outcome D1 · quantified proof' },
    'bnp.snm.gConceptReportSub': { fr: 'Outcome final · décision sponsor', nl: 'Finale outcome · sponsorbeslissing', en: 'Final outcome · sponsor decision' },

    /* ============== CONCEPT VP STATEMENT — citation premium Concept Report p31 ============== */
    'bnp.conceptVp.eyebrow': { fr: 'Concept Report · page 31', nl: 'Concept Report · pagina 31', en: 'Concept Report · page 31' },
    'bnp.conceptVp.quote': {
      fr: 'Un dashboard, ce n\'est pas pousser de la donnée. C\'est <span class="accent">raconter une histoire</span> avec les chiffres et les insights — qui aide le commerçant à décider et déclenche l\'action.',
      nl: 'Een dashboard is geen data pushen. Het is <span class="accent">een verhaal vertellen</span> met de cijfers en insights — dat de merchant helpt beslissen en actie triggert.',
      en: 'A dashboard is not about pushing data. It\'s about <span class="accent">telling a story</span> with the data and insights at hand — that supports decision-making and drives action.'
    },

    /* ============== CONCEPT 4.1 — Goals Overview (wall p37) ============== */
    'bnp.concept.overviewEyebrow': { fr: 'Concept · 4 goals identifiés', nl: 'Concept · 4 goals geïdentificeerd', en: 'Concept · 4 goals identified' },
    'bnp.concept.overviewTitle': {
      fr: 'Du brainstorming <span class="accent">au scope arrêté.</span>',
      nl: 'Van brainstorming <span class="accent">naar vastgelegde scope.</span>',
      en: 'From brainstorm <span class="accent">to locked scope.</span>'
    },
    'bnp.concept.overviewLead': {
      fr: 'L\'atelier a posé toutes les questions auxquelles un commerçant veut répondre avec sa donnée transactionnelle. Vingt features brutes. Quatre regroupements. Trois priorisés MVP, un repoussé en phase 2.',
      nl: 'De workshop stelde alle vragen die een merchant met zijn transactionele data wil beantwoorden. Twintig ruwe features. Vier groeperingen. Drie geprioriteerd voor MVP, één doorgeschoven naar fase 2.',
      en: 'The workshop laid out every question a shopkeeper wants his transactional data to answer. Twenty raw features. Four groupings. Three prioritised for MVP, one pushed to phase 2.'
    },
    'bnp.concept.goal1Status':   { fr: 'MVP scope',     nl: 'MVP-scope',    en: 'MVP scope' },
    'bnp.concept.goal1Name':     { fr: 'Performance Analysis', nl: 'Performance Analysis', en: 'Performance Analysis' },
    'bnp.concept.goal1Features': { fr: 'Shop ranking · Basket evolution · Daily traffic', nl: 'Shop ranking · Basket evolution · Daily traffic', en: 'Shop ranking · Basket evolution · Daily traffic' },
    'bnp.concept.goal2Status':   { fr: 'MVP scope',     nl: 'MVP-scope',    en: 'MVP scope' },
    'bnp.concept.goal2Name':     { fr: 'Business Expansion', nl: 'Business Expansion', en: 'Business Expansion' },
    'bnp.concept.goal2Features': { fr: 'Personas · Spending patterns · Customer retention · Customer origin · Open hours efficiency', nl: 'Personas · Spending patterns · Customer retention · Customer origin · Open hours efficiency', en: 'Personas · Spending patterns · Customer retention · Customer origin · Open hours efficiency' },
    'bnp.concept.goal3Status':   { fr: 'MVP scope',     nl: 'MVP-scope',    en: 'MVP scope' },
    'bnp.concept.goal3Name':     { fr: 'Evaluating Actions', nl: 'Evaluating Actions', en: 'Evaluating Actions' },
    'bnp.concept.goal3Features': { fr: 'Evaluate marketing channel · Plan + track campaign · Event organisation', nl: 'Evaluate marketing channel · Plan + track campaign · Event organisation', en: 'Evaluate marketing channel · Plan + track campaign · Event organisation' },
    'bnp.concept.goal4Status':   { fr: 'Phase 2 · roadmap', nl: 'Fase 2 · roadmap', en: 'Phase 2 · roadmap' },
    'bnp.concept.goal4Name':     { fr: 'Market Research', nl: 'Market Research', en: 'Market Research' },
    'bnp.concept.goal4Features': { fr: 'Best business location · Opportunities by industry', nl: 'Best business location · Opportunities by industry', en: 'Best business location · Opportunities by industry' },
    'bnp.concept.overviewSource': {
      fr: 'Référence interne · Concept Report mars 2018, wall atelier p37 — redessiné à la charte du folio',
      nl: 'Interne referentie · Concept Report maart 2018, workshop wall p37 — hertekend in de folio-stijl',
      en: 'Internal reference · Concept Report March 2018, workshop wall p37 — redrawn in the folio design system'
    },

    /* ============== CONCEPT 4.2 — Goal 1 Performance Analysis ============== */
    'bnp.concept.g1Eyebrow': { fr: 'Goal 1 · Performance Analysis', nl: 'Goal 1 · Performance Analysis', en: 'Goal 1 · Performance Analysis' },
    'bnp.concept.g1Title': {
      fr: 'Comment je performe <span class="accent">ce mois-ci ?</span>',
      nl: 'Hoe presteer ik <span class="accent">deze maand ?</span>',
      en: 'How am I performing <span class="accent">this month ?</span>'
    },
    'bnp.concept.g1Lead': {
      fr: 'Trois KPIs en haut, une comparaison shop par shop, une courbe vs le même mois N-1. Pas une exploration. Une décision par écran. Et chaque graphique entouré d\'une annotation « What\'s important » qui suggère où agir.',
      nl: 'Drie KPI\'s bovenaan, een shop-per-shop-vergelijking, een curve vs dezelfde maand N-1. Geen verkenning. Eén beslissing per scherm. En elke grafiek omringd door een « What\'s important »-annotatie die suggereert waar op te treden.',
      en: 'Three KPIs at the top, a shop-by-shop comparison, a curve vs the same month last year. Not exploration. One call per screen. And every chart surrounded by a "What\'s important" annotation suggesting where to act.'
    },
    'bnp.concept.g1Branch': { fr: 'Branch',       nl: 'Filiaal',      en: 'Branch' },
    'bnp.concept.g1Trans':  { fr: 'Transactions', nl: 'Transacties',  en: 'Transactions' },
    'bnp.concept.g1Rev':    { fr: 'Revenue',      nl: 'Omzet',        en: 'Revenue' },
    'bnp.concept.g1Share':  { fr: 'Part',         nl: 'Aandeel',      en: 'Share' },
    'bnp.concept.g1WhatLab': { fr: 'What\'s important', nl: 'What\'s important', en: 'What\'s important' },
    'bnp.concept.g1WhatTxt': {
      fr: 'En janvier 2018, votre panier moyen a chuté de 7% par rapport à janvier 2017, mais vous avez plus de transactions et plus de revenu. C\'est probablement que vous avez plus de clients ou de visiteurs récurrents — ils achètent moins par visite.',
      nl: 'In januari 2018 daalde uw gemiddelde basket met 7% tegenover januari 2017, maar u had meer transacties en meer omzet. Waarschijnlijk hebt u meer klanten of terugkerende bezoekers — ze kopen minder per bezoek.',
      en: 'In January 2018, your average basket size declined by 7% compared to January 2017, but you had more transactions and revenue. It must be you have more clients or returning visitors — however, they buy less per visit.'
    },
    'bnp.concept.g1Source': {
      fr: 'Référence interne · Concept Report p41-44 — redessiné à la charte du folio',
      nl: 'Interne referentie · Concept Report p41-44 — hertekend in de folio-stijl',
      en: 'Internal reference · Concept Report p41-44 — redrawn in the folio design system'
    },

    /* ============== CONCEPT 4.3 — Goal 2 Business Expansion (cycle 3 cellules) ============== */
    'bnp.concept.g2Eyebrow': { fr: 'Goal 2 · Business Expansion', nl: 'Goal 2 · Business Expansion', en: 'Goal 2 · Business Expansion' },
    'bnp.concept.g2Title': {
      fr: 'Mesurer l\'effet, <span class="accent">refermer la boucle.</span>',
      nl: 'Het effect meten, <span class="accent">de lus sluiten.</span>',
      en: 'Measure the effect, <span class="accent">close the loop.</span>'
    },
    'bnp.concept.g2Lead': {
      fr: 'Le commerçant ne consomme pas la donnée — il l\'utilise. Trois temps répétés en boucle : prendre la photo de mon business, agir, revenir vérifier l\'effet. Chaque feature de Goal 2 sert un de ces trois temps.',
      nl: 'De merchant consumeert de data niet — hij gebruikt ze. Drie tempo\'s in lus: foto van mijn business, actie, terugkomen om het effect te checken. Elke Goal 2-feature bedient één van die drie tempo\'s.',
      en: 'The shopkeeper doesn\'t consume data — he uses it. Three loops: snapshot my business, act, come back and check the effect. Every Goal 2 feature serves one of those three beats.'
    },
    'bnp.concept.g2CycleTitle': { fr: 'Cycle Business Expansion en trois temps', nl: 'Business Expansion cyclus in drie tempo\'s', en: 'Business Expansion cycle in three beats' },
    'bnp.concept.g2Step1': { fr: 'Control business state', nl: 'Control business state', en: 'Control business state' },
    'bnp.concept.g2Hint1': { fr: 'Photo du business · personas · spending patterns', nl: 'Business-foto · personas · spending patterns', en: 'Business snapshot · personas · spending patterns' },
    'bnp.concept.g2Step2': { fr: 'Learn & take actions', nl: 'Learn & take actions', en: 'Learn & take actions' },
    'bnp.concept.g2Hint2': { fr: 'Décisions guidées · campagnes · opening hours · paniers', nl: 'Geleide beslissingen · campagnes · opening hours · baskets', en: 'Guided calls · campaigns · opening hours · baskets' },
    'bnp.concept.g2Step3': { fr: 'Observe impact of actions', nl: 'Observe impact of actions', en: 'Observe impact of actions' },
    'bnp.concept.g2Hint3': { fr: 'Customer retention · origin · maintained customers', nl: 'Customer retention · origin · maintained customers', en: 'Customer retention · origin · maintained customers' },
    'bnp.concept.g2Source': {
      fr: 'Référence interne · Concept Report p46 — schéma cycle redessiné à la charte du folio',
      nl: 'Interne referentie · Concept Report p46 — cyclusschema hertekend in de folio-stijl',
      en: 'Internal reference · Concept Report p46 — cycle diagram redrawn in the folio design system'
    },

    /* ============== CONCEPT 4.4 — Goal 3 Evaluating Actions + climax Léonidas ============== */
    'bnp.concept.g3Eyebrow': { fr: 'Goal 3 · Evaluating Actions · climax', nl: 'Goal 3 · Evaluating Actions · climax', en: 'Goal 3 · Evaluating Actions · climax' },
    'bnp.concept.g3Title': {
      fr: 'Trois fenêtres temps. <span class="accent">Une preuve d\'usage.</span>',
      nl: 'Drie tijdvensters. <span class="accent">Eén gebruiksbewijs.</span>',
      en: 'Three time windows. <span class="accent">One proof of use.</span>'
    },
    'bnp.concept.g3Lead': {
      fr: 'Pour évaluer une action, il faut comparer. Le concept fixe trois fenêtres temps canoniques : <strong>même période N-1</strong>, <strong>période précédente</strong>, <strong>même période courante (multi-shops)</strong>. Sur ce socle, le co-design avec Léonidas a posé le test décisif.',
      nl: 'Om een actie te evalueren, moet je vergelijken. Het concept legt drie canonieke tijdvensters vast: <strong>zelfde periode N-1</strong>, <strong>vorige periode</strong>, <strong>zelfde periode huidig (multi-shops)</strong>. Op die fundering legde de co-design met Léonidas de doorslaggevende test.',
      en: 'To evaluate an action, you compare. The concept locks three canonical time windows: <strong>same period last year</strong>, <strong>previous period</strong>, <strong>same period current (multi-shops)</strong>. On that foundation, the Léonidas co-design ran the decisive test.'
    },
    'bnp.concept.g3LastYear': { fr: 'Même période · N-1', nl: 'Zelfde periode · N-1', en: 'Same period · last year' },
    'bnp.concept.g3Prev':     { fr: 'Période précédente', nl: 'Vorige periode',      en: 'Previous period' },
    'bnp.concept.g3Current':  { fr: 'Même période · multi-shops', nl: 'Zelfde periode · multi-shops', en: 'Same period · multi-shops' },
    'bnp.concept.g3ClimaxEyebrow': { fr: 'Co-design Léonidas · Jan→Jun 2017', nl: 'Co-design Léonidas · Jan→Jun 2017', en: 'Co-design Léonidas · Jan→Jun 2017' },
    'bnp.concept.g3ClimaxTitle': {
      fr: 'Le test qui a décidé le sponsor.',
      nl: 'De test die de sponsor deed beslissen.',
      en: 'The test that made the sponsor decide.'
    },
    'bnp.concept.g3Stat1': { fr: 'Revenue increase',     nl: 'Omzetstijging',        en: 'Revenue increase' },
    'bnp.concept.g3Stat2': { fr: 'en six mois',          nl: 'op zes maanden',       en: 'over six months' },
    'bnp.concept.g3Stat3': { fr: 'Average basket size',  nl: 'Gemiddelde basket',    en: 'Average basket size' },
    'bnp.concept.g3Stat4': { fr: 'Maintained customers', nl: 'Behouden klanten',     en: 'Maintained customers' },
    'bnp.concept.g3ClimaxCaption': {
      fr: 'Wolluwé Saint-Pierre <strong>35% de market share</strong> vs Ixelles <strong>10%</strong>. Le manager général de Léonidas ne discute plus du <em>si</em>, il signe le <em>quand</em>. Six PME testées · une promesse d\'achat ferme · zéro refus. Le signal qui manquait au sponsor.',
      nl: 'Sint-Pieters-Woluwe <strong>35% marktaandeel</strong> vs Elsene <strong>10%</strong>. De algemeen directeur van Léonidas discussieert niet meer over het <em>of</em>, hij tekent het <em>wanneer</em>. Zes kmo\'s getest · één harde aankoopbelofte · nul weigeringen. Het signaal dat de sponsor miste.',
      en: 'Wolluwé Saint-Pierre <strong>35% market share</strong> vs Ixelles <strong>10%</strong>. The Léonidas general manager stops debating <em>if</em>, he signs the <em>when</em>. Six SMEs tested · one firm purchase commitment · zero refusals. The signal the sponsor was missing.'
    },
    'bnp.concept.g3Source': {
      fr: 'Référence interne · Concept Report p53-58 — Time Selection + Shop Comparison + Period Comparison redessinés',
      nl: 'Interne referentie · Concept Report p53-58 — Time Selection + Shop Comparison + Period Comparison hertekend',
      en: 'Internal reference · Concept Report p53-58 — Time Selection + Shop Comparison + Period Comparison redrawn'
    },

    /* ============== CHAPTER S — Situation (NEW 2026-04-30 s2 — STAR 4 acts) ============== */
    /* STORY NAV sticky — 4 phases × 4 jalons, juste les noms d'ateliers/deliverables */
    'bnp.snm.gResearch':   { fr: 'Research',  nl: 'Research',  en: 'Research' },
    'bnp.snm.gAnalyse':    { fr: 'Analyse',   nl: 'Analyse',   en: 'Analyse' },
    'bnp.snm.gPrototype':  { fr: 'Prototype', nl: 'Prototype', en: 'Prototype' },
    'bnp.snm.gConcept':    { fr: 'Concept',   nl: 'Concept',   en: 'Concept' },
    'bnp.snm.r1': { fr: '6 interviews PME terrain', nl: '6 kmo-interviews op het terrein', en: '6 SME field interviews' },
    'bnp.snm.r2': { fr: 'Benchmark concurrents (Barclays, Proximus, BBVA)', nl: 'Benchmark concurrenten (Barclays, Proximus, BBVA)', en: 'Competitors benchmark (Barclays, Proximus, BBVA)' },
    'bnp.snm.r3': { fr: 'Analyse marché B2B + segments', nl: 'B2B-marktanalyse + segmenten', en: 'B2B market analysis + segments' },
    'bnp.snm.r4': { fr: '9 personas B2B livrés', nl: '9 B2B-personas opgeleverd', en: '9 B2B personas delivered' },
    'bnp.snm.a1': { fr: '6 Key Barriers identifiées', nl: '6 Key Barriers geïdentificeerd', en: '6 Key Barriers identified' },
    'bnp.snm.a2': { fr: 'AS-IS journey · 15 étapes onboarding', nl: 'AS-IS journey · 15 onboarding-stappen', en: 'AS-IS journey · 15 onboarding steps' },
    'bnp.snm.a3': { fr: 'Could-Be journey + GAP analyse', nl: 'Could-Be journey + GAP-analyse', en: 'Could-Be journey + GAP analysis' },
    'bnp.snm.a4': { fr: 'Value Proposition Canvas + Lean Canvas', nl: 'Value Proposition Canvas + Lean Canvas', en: 'Value Proposition Canvas + Lean Canvas' },
    'bnp.snm.p1': { fr: 'Service blueprint · 5 journeys end-to-end', nl: 'Service blueprint · 5 end-to-end journeys', en: 'Service blueprint · 5 end-to-end journeys' },
    'bnp.snm.p2': { fr: 'Sprint design · 3 goals coachés', nl: 'Sprint design · 3 gecoachte goals', en: 'Sprint design · 3 coached goals' },
    'bnp.snm.p3': { fr: 'Prototype Spotfire · POC dashboard', nl: 'Prototype Spotfire · POC dashboard', en: 'Spotfire prototype · POC dashboard' },
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
    'bnp.snm.cFin': { fr: 'Bilan & contact', nl: 'Slot & contact', en: 'Wrap-up & contact' },
    'bnp.snm.c1':  { fr: 'Concept Report signé · argumentation sponsor', nl: 'Concept Report ondertekend · sponsorargumentatie', en: 'Concept Report signed · sponsor argumentation' },
    'bnp.snm.c2':  { fr: 'Stakeholder alignment · « le bébé de tout le monde »', nl: 'Stakeholder alignment · « ieders kindje »', en: 'Stakeholder alignment · "everyone\'s baby"' },
    'bnp.snm.cTW': { fr: 'Triple-Win · arbitre de chaque décision', nl: 'Triple-Win · scheidsrechter van elke beslissing', en: 'Triple-Win · arbiter of every decision' },
    'bnp.snm.c3':  { fr: 'Outcome · signal commercial écrit', nl: 'Outcome · geschreven commercieel signaal', en: 'Outcome · written commercial signal' },
    'bnp.snm.c4':  { fr: 'Lessons learned', nl: 'Lessons learned', en: 'Lessons learned' },

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
    'bnp.proposed.bandStrat': {
      fr: 'Strategic digital guidelines & frameworks',
      nl: 'Strategic digital guidelines & frameworks',
      en: 'Strategic digital guidelines & frameworks'
    },
    'bnp.proposed.bandResearch': {
      fr: 'Market & user research',
      nl: 'Market & user research',
      en: 'Market & user research'
    },
    'bnp.proposed.bandConcept': { fr: 'Concept design', nl: 'Concept design', en: 'Concept design' },
    'bnp.proposed.bandUx': { fr: 'UX & UI design', nl: 'UX & UI design', en: 'UX & UI design' },
    'bnp.proposed.phaseIdea': { fr: 'Idea to maturity', nl: 'Idea to maturity', en: 'Idea to maturity' },
    'bnp.proposed.phaseInception': { fr: 'Inception', nl: 'Inception', en: 'Inception' },
    'bnp.proposed.phaseAgile': { fr: 'Agile project', nl: 'Agile project', en: 'Agile project' },

    'bnp.proposed.colResearch': { fr: 'Research', nl: 'Research', en: 'Research' },
    'bnp.proposed.colAnalyse': { fr: 'Analyse', nl: 'Analyse', en: 'Analyse' },
    'bnp.proposed.colPrototype': { fr: 'Prototype', nl: 'Prototype', en: 'Prototype' },
    'bnp.proposed.colConcept': { fr: 'Concept', nl: 'Concept', en: 'Concept' },

    'bnp.proposed.researchLi1': { fr: 'Interviews PME', nl: 'Kmo-interviews', en: 'SME interviews' },
    'bnp.proposed.researchLi2': { fr: 'Benchmark', nl: 'Benchmark', en: 'Benchmark' },
    'bnp.proposed.researchLi3': { fr: 'Segments B2B', nl: 'B2B-segmenten', en: 'B2B segments' },
    'bnp.proposed.researchLi4': { fr: 'Personas', nl: 'Personas', en: 'Personas' },

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
    'bnp.psl.j1.when': { fr: 'Q3 2017', nl: 'Q3 2017', en: 'Q3 2017' },
    'bnp.psl.j1.what': { fr: 'Brief reçu', nl: 'Briefing ontvangen', en: 'Brief received' },
    'bnp.psl.j2.when': { fr: 'Sept. 2017', nl: 'Sept. 2017', en: 'Sept 2017' },
    'bnp.psl.j2.what': { fr: 'Catalyseur · Marketing appelle', nl: 'Aanleiding · Marketing belt', en: 'Catalyst · Marketing calls' },
    'bnp.psl.j3.when': { fr: 'Oct. 2017', nl: 'Okt. 2017', en: 'Oct 2017' },
    'bnp.psl.j3.what': { fr: '6 PME interviewées · 6 Key Barriers', nl: '6 kmo\'s geïnterviewd · 6 Key Barriers', en: '6 SMEs interviewed · 6 Key Barriers' },
    'bnp.psl.j4.when': { fr: 'Oct. 2017', nl: 'Okt. 2017', en: 'Oct 2017' },
    'bnp.psl.j4.what': { fr: '9 personas B2B livrés', nl: '9 B2B-personas opgeleverd', en: '9 B2B personas delivered' },
    'bnp.psl.j5.when': { fr: '30 oct. 2017', nl: '30 okt. 2017', en: 'Oct 30, 2017' },
    'bnp.psl.j5.what': { fr: 'Lean Canvas signé · Triple Win', nl: 'Lean Canvas getekend · Triple Win', en: 'Lean Canvas signed off · Triple Win' },
    'bnp.psl.j6.when': { fr: 'Nov. 2017', nl: 'Nov. 2017', en: 'Nov 2017' },
    'bnp.psl.j6.what': { fr: 'VP +15-25 % CA · 4 rapports', nl: 'VP +15-25 % omzet · 4 rapporten', en: 'VP +15-25% revenue · 4 reports' },
    'bnp.psl.j7.when': { fr: 'Déc. 2017', nl: 'Dec. 2017', en: 'Dec 2017' },
    'bnp.psl.j7.what': { fr: 'Service blueprint · 5 journeys', nl: 'Service blueprint · 5 journeys', en: 'Service blueprint · 5 journeys' },
    'bnp.psl.j8.when': { fr: 'Janv. 2018', nl: 'Jan. 2018', en: 'Jan 2018' },
    'bnp.psl.j8.what': { fr: '47→7 indicateurs · sprint design', nl: '47→7 indicatoren · sprint design', en: '47→7 indicators · sprint design' },
    'bnp.psl.j9.when': { fr: 'Févr. 2018', nl: 'Feb. 2018', en: 'Feb 2018' },
    'bnp.psl.j9.what': { fr: 'Prototype Spotfire · POC dashboard', nl: 'Spotfire-prototype · POC dashboard', en: 'Spotfire prototype · POC dashboard' },
    'bnp.psl.j10.when': { fr: 'Mars 2018', nl: 'Maart 2018', en: 'March 2018' },
    'bnp.psl.j10.what': { fr: '6 testées · 1 promesse · 0 refus', nl: '6 getest · 1 belofte · 0 weigeringen', en: '6 tested · 1 commitment · 0 refusals' },
    'bnp.psl.j11.when': { fr: 'Mars 2018', nl: 'Maart 2018', en: 'March 2018' },
    'bnp.psl.j11.what': { fr: 'Concept Report · decision pack', nl: 'Concept Report · decision pack', en: 'Concept Report · decision pack' },
    'bnp.psl.j12.when': { fr: 'Q2 2018', nl: 'Q2 2018', en: 'Q2 2018' },
    'bnp.psl.j12.what': { fr: 'Sponsor go production', nl: 'Sponsor go productie', en: 'Sponsor go production' },

    'bnp.proposed.cap': {
      fr: 'À la sortie : un MVP (un produit minimum viable, le périmètre prêt à embarquer en agile) prioritisé en user stories, signé Banking · IT · Legal · Marketing. Ce qui suit dans le case montre ce qui s\'est joué à chaque étape.',
      nl: 'Aan de uitgang : een MVP (een Minimum Viable Product, de minimale scope klaar om in agile uitgerold te worden) geprioriteerd in user stories, ondertekend door Banking · IT · Legal · Marketing. Wat volgt toont wat er bij elke stap gespeeld werd.',
      en: 'Exit deliverable : an MVP (a Minimum Viable Product, the smallest scope ready to ship in agile) prioritised in user stories, signed off by Banking · IT · Legal · Marketing. What follows shows what played out at each step.'
    },

    /* STAR menu sticky guide — labels courts pour les 4 nodes */
    'bnp.starMenu.s': { fr: 'Situation', nl: 'Situatie', en: 'Situation' },
    'bnp.starMenu.t': { fr: 'Proposition', nl: 'Voorstel', en: 'Proposal' },
    'bnp.starMenu.a': { fr: 'Démarche', nl: 'Aanpak', en: 'Approach' },
    'bnp.starMenu.r': { fr: 'Résultat', nl: 'Resultaat', en: 'Result' },

    'bnp.chapS.label': { fr: 'Situation · L\'observation', nl: 'Situation · De observatie', en: 'Situation · Observation' },
    'bnp.chapS.title': { fr: 'L\'observation.', nl: 'De observatie.', en: 'Observation.' },
    'bnp.chapS.lead': {
      fr: 'Avant de proposer, comprendre. Le terrain enseigne ce que la donnée seule ne dit jamais : ce qu\'un commerçant choisit de faire avec ce qu\'il sait.',
      nl: 'Eerst begrijpen, dan voorstellen. Het terrein leert wat de data alleen nooit zegt : wat een merchant kiest te doen met wat hij weet.',
      en: 'Understand before proposing. The shop floor teaches what data alone never says : what a shopkeeper chooses to do with what he knows.'
    },

    /* ============== CHAPTER DIVIDERS (T/A/R — cinematic narrative structure) ============== */
    'bnp.chap1.label': { fr: 'Task · La proposition', nl: 'Task · Het voorstel', en: 'Task · The proposal' },
    'bnp.chap1.title': { fr: 'La proposition.', nl: 'Het voorstel.', en: 'The proposal.' },
    'bnp.chap1.lead': {
      fr: 'Le bon problème vaut la moitié de la solution. Reframer la donnée brute en service que le commerçant achète, parce qu\'il décide mieux avec.',
      nl: 'Het juiste probleem is de helft van de oplossing. De ruwe data herkaderen tot een dienst die de merchant koopt, omdat hij er betere beslissingen mee neemt.',
      en: 'The right problem is half the solution. Reframe raw data into a service the merchant buys, because it sharpens the calls he has to make.'
    },
    'bnp.chap2.label': { fr: 'Action · La démarche', nl: 'Action · De aanpak', en: 'Action · The approach' },
    'bnp.chap2.title': { fr: 'La démarche.', nl: 'De aanpak.', en: 'The approach.' },
    'bnp.chap2.lead': {
      fr: 'Aligner quatre fonctions sur la même PME. Le double diamant tient le rythme : on diverge pour comprendre, on converge pour décider, deux fois.',
      nl: 'Vier functies uitlijnen op dezelfde kmo. De double diamond houdt het ritme : divergeren om te begrijpen, convergeren om te beslissen, twee keer.',
      en: 'Align four functions on the same SME. The double diamond holds the tempo : diverge to understand, converge to decide, twice.'
    },
    'bnp.chap3.label': { fr: 'Result · Le résultat', nl: 'Result · Het resultaat', en: 'Result · The outcome' },
    'bnp.chap3.title': { fr: 'Le résultat.', nl: 'Het resultaat.', en: 'The outcome.' },
    'bnp.chap3.lead': {
      fr: 'Le résultat ne se déclare pas, il se prouve. Six PME testent, une dit oui par écrit, zéro refus chez les autres. Le sponsor a son signal.',
      nl: 'Het resultaat verklaar je niet, je bewijst het. Zes kmo\'s testen, één zegt schriftelijk ja, nul weigeringen bij de anderen. De sponsor heeft zijn signaal.',
      en: 'A result is not declared, it\'s proven. Six SMEs test, one signs yes in writing, zero refusals among the others. The sponsor has his signal.'
    },
    'bnp.chapBridge.label': { fr: 'Pont', nl: 'Brug', en: 'Bridge' },
    'bnp.chapBridge.title': { fr: 'Vers Luminus.', nl: 'Naar Luminus.', en: 'To Luminus.' },
    'bnp.chapBridge.lead': {
      fr: 'Là où ce playbook bancaire rencontre la donnée énergétique.',
      nl: 'Waar dit bank-playbook de energiedata ontmoet.',
      en: 'Where this banking playbook meets energy data.'
    },

    /* ============== STAR TL;DR STRIP (NEW) ============== */
    /* LE BRIEF + LE CATALYSEUR — 2 sections vertical, ouvrent l'histoire sans
       spoilers. Le climax (Léonidas + chiffres) est réservé à la section Result.
       CVE 2026-04-30 night spec : "découvrir les choses petit à petit". */
    'bnp.brief.eyebrow': { fr: 'Le brief', nl: 'De opdracht', en: 'The brief' },
    /* CVE 2026-05-11 BNP v2 · sujet noble, verbe sec (Brand Guardian reco) */
    'bnp.brief.title': {
      fr: '30 % des paiements du pays passaient par BNP.<br><span class="accent">Personne ne les vendait.</span>',
      nl: '30 % van de betalingen van het land liep via BNP.<br><span class="accent">Niemand verkocht ze.</span>',
      en: '30% of the country\'s payments ran through BNP.<br><span class="accent">No one was selling them.</span>'
    },
    'bnp.brief.lead1': {
      fr: 'BNP traitait près de 30 % des paiements Bancontact en Belgique, soit une vue privilégiée sur les habitudes d\'achat des consommateurs. Aucun service ne valorisait cette matière auprès des commerçants qui acceptaient ces paiements.',
      nl: 'BNP verwerkte zo\'n 30 % van de Bancontact-betalingen in België, een bevoorrechte blik op het koopgedrag van consumenten. Geen enkele dienst valoriseerde die data bij de handelaars die de betalingen aanvaardden.',
      en: 'BNP processed close to 30% of all Bancontact payments in Belgium, an unmatched view of consumer purchasing behaviour. No service was turning that data into value for the merchants accepting those payments.'
    },
    'bnp.brief.lead2': {
      fr: 'Forte sur les cartes consommateurs, BNP restait peu visible auprès des PME qui les acceptaient. Le projet devait combler cet écart par un nouveau service B2B (de la banque vers ses entreprises clientes), sans entamer la confiance déjà installée.',
      nl: 'Sterk op de consumentenkaarten, bleef BNP weinig zichtbaar bij de kmo\'s die ze aanvaardden. Het project moest die kloof dichten met een nieuwe B2B-dienst (van de bank naar haar zakelijke klanten), zonder het bestaande vertrouwen aan te tasten.',
      en: 'Strong on the consumer card side, BNP remained little visible to the SMEs accepting them. The project had to close that gap with a new B2B service (from the bank to its business customers), without eroding the trust already in place.'
    },
    /* CVE 2026-05-11 BNP v2 · mandat en 4 verbes secs (Brand Guardian + Content Creator) */
    'bnp.brief.lead3': {
      fr: 'Mon mandat tenait en quatre verbes · <strong>cadrer, tester, aligner, défendre</strong>. Six mois pour confronter l\'opportunité au terrain, mettre Banking, IT, Legal et Marketing dans la même pièce, et porter la recommandation jusqu\'au comité. Choix d\'entrée méthodologique · Lean Canvas pour cadrer l\'opportunité business avec le sponsor, puis Value Proposition Canvas pour aligner sur la voix du commerçant en atelier. Deux outils, deux moments, un même Design System.',
      nl: 'Mijn opdracht in vier werkwoorden · <strong>kaderen, testen, aligneren, verdedigen</strong>. Zes maanden om de opportuniteit aan het terrein te toetsen, Banking, IT, Legal en Marketing in dezelfde ruimte te zetten, en de aanbeveling tot in het comité te dragen. Methodologische instap · Lean Canvas om de business-opportuniteit met de sponsor te kaderen, daarna Value Proposition Canvas om af te stemmen op de stem van de handelaar in workshop. Twee tools, twee momenten, één Design System.',
      en: 'My mandate held in four verbs · <strong>frame, test, align, defend</strong>. Six months to confront the opportunity with the field, get Banking, IT, Legal and Marketing in the same room, and carry the recommendation up to the steering committee. Methodological entry · Lean Canvas to frame the business opportunity with the sponsor, then Value Proposition Canvas to align on the merchant\'s voice in workshops. Two tools, two moments, one Design System.'
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
    /* CVE 2026-05-08 · toolkit signal · transpire mastery · pattern « maturité → toolkit choisi » */
    'bnp.brief.toolkitSignal': {
      fr: '<strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>, méthodologie native du département CXC. Toolkit calibré pour valider une hypothèse de revenu en B2B mature, pas pour ouvrir une page blanche. La discipline du parcours · <strong class="accent">Léonidas signé avant la première ligne de code</strong>.',
      nl: '<strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>, de eigen methodologie van de CXC-afdeling. Toolkit afgestemd op het valideren van een omzet-hypothese in B2B-volwassen context, niet op het openen van een blanco pagina. De discipline van het traject · <strong class="accent">Léonidas getekend vóór de eerste coderegel</strong>.',
      en: '<strong>Strategyzer · Lean Canvas + Value Proposition Canvas</strong>, the native methodology of the CXC department. Toolkit calibrated to validate a revenue hypothesis in mature B2B, not to open a blank page. The discipline of the journey · <strong class="accent">Léonidas signed before the first line of code</strong>.'
    },

    'bnp.catalyst.eyebrow': { fr: 'Le catalyseur', nl: 'De aanleiding', en: 'The catalyst' },
    'bnp.catalyst.title': {
      fr: 'Marketing m\'a <span class="accent">appelé.</span>',
      nl: 'Marketing <span class="accent">belde.</span>',
      en: 'Marketing <span class="accent">called.</span>'
    },
    'bnp.catalyst.lead': {
      fr: 'Leur premier prototype partait dans le mur. Trop centré sur la data brute, déconnecté du quotidien des commerçants visés. Ils m\'ont fait venir pour reprendre la question depuis le terrain. L\'enquête a démarré là.',
      nl: 'Hun eerste prototype liep tegen de muur. Te veel op ruwe data gericht, los van het dagelijks leven van de beoogde handelaars. Ze haalden me erbij om de vraag opnieuw vanaf het terrein te benaderen. Daar begon het onderzoek.',
      en: 'Their first prototype was heading nowhere. Too focused on raw data, disconnected from the day-to-day reality of the merchants they were targeting. They brought me in to take the question back to the ground. The investigation started there.'
    },

    /* STAR keys legacy — gardés mais plus utilisés en HTML */
    'bnp.star.label': { fr: 'STAR · l\'histoire en trois temps', nl: 'STAR · het verhaal in drie tijden', en: 'STAR · the story in three beats' },

    'bnp.star.s1.eyebrow': { fr: '01 · La situation', nl: '01 · De situatie', en: '01 · The situation' },
    'bnp.star.s1.title': {
      fr: '30 % des flux ne devenaient<br>jamais une <span class="accent">décision.</span>',
      nl: '30 % van de flows werden<br>nooit een <span class="accent">beslissing.</span>',
      en: '30% of the flows never<br>became a <span class="accent">decision.</span>'
    },
    'bnp.star.s1.lead': {
      fr: 'BNP voyait passer chaque semaine des données de cartes consommateurs qui valaient de l\'or pour les commerçants. Personne ne les transformait en service. Tout restait au passif de la banque.',
      nl: 'BNP zag elke week consumentenkaart-data passeren die goud waard was voor de winkeliers. Niemand zette ze om in een dienst. Alles bleef in het passief van de bank.',
      en: 'BNP saw consumer-card data go by every week that was gold for merchants. No one was turning it into a service. Everything sat on the bank\'s liability side.'
    },
    'bnp.star.s1.p1': {
      fr: 'L\'asymétrie : <strong>BNP voyait. Les PME ignoraient.</strong>',
      nl: 'De asymmetrie : <strong>BNP zag. De kmo\'s wisten van niets.</strong>',
      en: 'The asymmetry : <strong>BNP saw. SMEs didn\'t.</strong>'
    },
    'bnp.star.s1.p2': {
      fr: 'L\'enjeu : qu\'un client réel signe une prévente sur le prototype final. Sans ce signal de traction, le sponsor n\'a rien pour valider l\'investissement build.',
      nl: 'De inzet : dat een echte klant een pré-aankoop tekent op het finale prototype. Zonder dat tractie-signaal heeft de sponsor niets om de build-investering te valideren.',
      en: 'The stake : a real client signs a pre-purchase on the final prototype. Without that traction signal, the sponsor has nothing to validate the build investment.'
    },
    'bnp.star.s1.p3': {
      fr: 'Six commerçants, six objections. La même au fond : <em>« Pas la donnée. La décision. »</em>',
      nl: 'Zes winkeliers, zes bezwaren. In de grond hetzelfde : <em>« Niet de data. De beslissing. »</em>',
      en: 'Six merchants, six objections. Underneath, the same one : <em>"Not the data. The decision."</em>'
    },

    'bnp.star.s2.eyebrow': { fr: '02 · L\'action', nl: '02 · De actie', en: '02 · The action' },
    'bnp.star.s2.title': {
      fr: 'Pas un dashboard. Un<br>service qui <span class="accent">décide pour eux.</span>',
      nl: 'Geen dashboard. Een dienst<br>die <span class="accent">voor hen beslist.</span>',
      en: 'Not a dashboard. A service<br>that <span class="accent">decides for them.</span>'
    },
    'bnp.star.s2.lead': {
      fr: 'J\'ai cadré un MVP sur trois lectures coachées par graphique, pas quarante-sept indicateurs. La donnée ne s\'achète pas. La décision si.',
      nl: 'Ik kaderde een MVP op drie begeleide lezingen per diagram, geen zevenenveertig indicatoren. Data koop je niet. Beslissingen wel.',
      en: 'I framed an MVP around three coached reads per chart, not forty-seven KPIs. Data isn\'t bought. Decisions are.'
    },
    'bnp.star.s2.p1': {
      fr: 'Semaine 6. IT voulait démarrer le build. <strong class="accent">J\'ai bloqué.</strong> Pas avant le service blueprint.',
      nl: 'Week 6. IT wilde met de build beginnen. <strong class="accent">Ik blokkeerde.</strong> Niet vóór het service blueprint.',
      en: 'Week 6. IT wanted to start the build. <strong class="accent">I blocked it.</strong> Not before the service blueprint.'
    },
    'bnp.star.s2.p2': {
      fr: 'Semaine 9. IT proposait 47 indicateurs. <strong class="accent">J\'ai dit non.</strong> Trois lectures coachées par graphique.',
      nl: 'Week 9. IT stelde 47 indicatoren voor. <strong class="accent">Ik zei nee.</strong> Drie begeleide lezingen per diagram.',
      en: 'Week 9. IT proposed 47 KPIs. <strong class="accent">I said no.</strong> Three coached reads per chart.'
    },
    'bnp.star.s2.p3': {
      fr: 'Atelier. Marketing × IT recalibrés sur le commerçant : <em>« Que doit-il décider lundi matin ? »</em> Trois objectifs sont sortis. Les deux équipes ont co-signé.',
      nl: 'Workshop. Marketing × IT herijkt op de winkelier : <em>« Wat moet hij maandagochtend beslissen ? »</em> Drie doelen kwamen eruit. Beide teams tekenden mee.',
      en: 'Workshop. Marketing × IT recalibrated on the shopkeeper : <em>"What does he need to decide Monday morning?"</em> Three goals came out. Both teams signed.'
    },
    'bnp.star.s2.act.eyebrow': {
      fr: 'Semaine 9 · MVP scope',
      nl: 'Week 9 · MVP-scope',
      en: 'Week 9 · MVP scope'
    },
    'bnp.star.s2.act.caption': {
      fr: 'indicateurs <strong class="accent">→</strong> lectures coachées par graphique',
      nl: 'indicatoren <strong class="accent">→</strong> begeleide lezingen per diagram',
      en: 'KPIs <strong class="accent">→</strong> coached reads per chart'
    },
    'bnp.star.s2.act.t1': { fr: 'Sem. 6 · Bloqué', nl: 'Wk 6 · Geblokkeerd', en: 'Wk 6 · Blocked' },
    'bnp.star.s2.act.t2': { fr: 'Sem. 9 · 47 → 3', nl: 'Wk 9 · 47 → 3', en: 'Wk 9 · 47 → 3' },
    'bnp.star.s2.act.t3': { fr: 'Atelier · Recalibré', nl: 'Workshop · Herijkt', en: 'Workshop · Recalibrated' },

    'bnp.star.s3.eyebrow': { fr: '03 · La traction', nl: '03 · De tractie', en: '03 · The traction' },
    'bnp.star.s3.title': {
      fr: 'Une PME a signé<br>une <span class="accent">prévente.</span>',
      nl: 'Een kmo tekende<br>een <span class="accent">pré-aankoop.</span>',
      en: 'An SME signed<br>a <span class="accent">pre-purchase.</span>'
    },
    'bnp.star.s3.lead': {
      fr: 'Léonidas a accompagné les deux diamants. Itérations VPC, prototype final, ils ont vu chaque version. À la dernière, <strong class="accent">ils ont demandé eux-mêmes à signer une prévente.</strong> Avant le build.',
      nl: 'Léonidas volgde beide diamanten. VPC-iteraties, finaal prototype, ze zagen elke versie. Bij de laatste <strong class="accent">vroegen ze zelf om een pré-aankoop te tekenen.</strong> Vóór de build.',
      en: 'Léonidas walked both diamonds with us. VPC iterations, final prototype, they saw each version. On the last one, <strong class="accent">they asked themselves to sign a pre-purchase.</strong> Before the build.'
    },
    'bnp.star.s3.p1': {
      fr: 'Le sponsor avait sa <strong class="accent">preuve de traction</strong>. Mon mandat se terminait là. La suite, je l\'ai laissée à l\'équipe.',
      nl: 'De sponsor had zijn <strong class="accent">proof of traction</strong>. Mijn mandaat eindigde daar. Het vervolg, dat heb ik aan het team overgelaten.',
      en: 'The sponsor had <strong class="accent">proof of traction</strong>. My mandate ended there. The follow-up, I left it to the team.'
    },
    'bnp.star.s3.p2': {
      fr: '<strong class="accent">+80 % de revenu</strong> entre Wolluwé Saint-Pierre et Ixelles sur six mois, mêmes flux Bancontact, simplement lus différemment. Ce que le prototype a montré.',
      nl: '<strong class="accent">+80 % omzet</strong> tussen Sint-Pieters-Woluwe en Elsene op zes maanden, dezelfde Bancontact-flows, gewoon anders gelezen. Wat het prototype liet zien.',
      en: '<strong class="accent">+80% revenue</strong> between Wolluwé Saint-Pierre and Ixelles over six months, same Bancontact flows, simply read differently. What the prototype surfaced.'
    },
    'bnp.star.s3.p3': {
      fr: 'Triple-Win signé Corporate Banking, IT, Legal et Marketing. <strong>Une seule promesse, trois oui simultanés.</strong>',
      nl: 'Triple-Win goedgekeurd door Corporate Banking, IT, Legal en Marketing. <strong>Eén belofte, drie ja\'s tegelijk.</strong>',
      en: 'Triple-Win signed off by Corporate Banking, IT, Legal and Marketing. <strong>One promise, three yeses at once.</strong>'
    },

    'bnp.glance.eyebrow': { fr: 'En un coup d\'œil', nl: 'In één oogopslag', en: 'At a glance' },
    'bnp.glance.h2': {
      fr: 'Les chiffres-clés,<br><span class="accent">avant l\'histoire.</span>',
      nl: 'De kerncijfers,<br><span class="accent">vóór het verhaal.</span>',
      en: 'The numbers,<br><span class="accent">before the story.</span>'
    },
    'bnp.glance.lead': {
      fr: 'Six mois entre service design, stratégie business et aide à la décision. Quatre chiffres résument ce qui comptait.',
      nl: 'Zes maanden tussen service design, bedrijfsstrategie en beslissingsondersteuning. Vier cijfers vatten samen wat telde.',
      en: 'Six months at the intersection of service design, business strategy and decision support. Four numbers sum up what mattered.'
    },
    'bnp.glance.sizing': {
      fr: '6 mois <span class="dot">·</span> 4 fonctions internes <span class="dot">·</span> 6 PME testées <span class="dot">·</span> 1 client pilote',
      nl: '6 maanden <span class="dot">·</span> 4 interne functies <span class="dot">·</span> 6 kmo\'s getest <span class="dot">·</span> 1 pilootklant',
      en: '6 months <span class="dot">·</span> 4 internal functions <span class="dot">·</span> 6 SMEs tested <span class="dot">·</span> 1 pilot client'
    },
    'bnp.glance.s1.label': {
      fr: 'Flux carte conso · vus, pas convertis',
      nl: 'Consumentenkaart-flows · gezien, niet omgezet',
      en: 'Card flows seen, not turned to value'
    },
    'bnp.glance.s2.label': {
      fr: 'CA promis aux PME · 4 rapports business',
      nl: 'Beloofde omzetgroei kmo\'s · 4 business-rapporten',
      en: 'Revenue uplift promised · 4 business-goal reports'
    },
    'bnp.glance.s3.label': {
      fr: 'Personas B2B livrés · réutilisés downstream',
      nl: 'B2B-personas opgeleverd · downstream herbruikt',
      en: 'B2B personas delivered · reused downstream'
    },
    'bnp.glance.s4.label': {
      fr: 'Promesse d\'achat · sur 6 PME testées · 0 refus',
      nl: 'Aankoopbelofte · op 6 geteste kmo\'s · 0 weigeringen',
      en: 'Pre-purchase commitment · across 6 SMEs tested · 0 refusals'
    },

    /* VP statement — Act T claim that opens the proposition (the "why merchants pay") */
    'bnp.vp.eyebrow': {
      fr: 'La proposition de valeur',
      nl: 'De waardepropositie',
      en: 'The value proposition'
    },
    'bnp.vp.claim': {
      fr: '<span class="vp-claim__num">+15<span class="vp-claim__sep">–</span>25<span class="vp-claim__unit">%</span></span><span class="vp-claim__text">de chiffre d\'affaires<br>pour les PME qui suivent les rapports.</span>',
      nl: '<span class="vp-claim__num">+15<span class="vp-claim__sep">–</span>25<span class="vp-claim__unit">%</span></span><span class="vp-claim__text">extra omzet<br>voor kmo\'s die de rapporten volgen.</span>',
      en: '<span class="vp-claim__num">+15<span class="vp-claim__sep">–</span>25<span class="vp-claim__unit">%</span></span><span class="vp-claim__text">in revenue<br>for SMEs who act on the reports.</span>'
    },
    'bnp.vp.sub': {
      fr: 'Quatre rapports orientés objectifs business — <em>qui cibler</em>, <em>où</em>, <em>quand</em>, <em>avec quels critères</em> — répondus par les données de la banque. Pas une exploration. Une décision par écran.',
      nl: 'Vier doelgerichte business-rapporten — <em>wie targeten</em>, <em>waar</em>, <em>wanneer</em>, <em>met welke criteria</em> — beantwoord door de data van de bank. Geen exploratie. Eén beslissing per scherm.',
      en: 'Four goal-oriented business reports — <em>who to target</em>, <em>where</em>, <em>when</em>, <em>by which criteria</em> — answered by the bank\'s data. Not an exploration. One decision per screen.'
    },

    'bnp.barriers.h3': {
      fr: 'Six barrières réelles<br>identifiées en recherche.',
      nl: 'Zes echte barrières,<br>uit het onderzoek.',
      en: 'Six real barriers<br>we surfaced in research.'
    },
    'bnp.barriers.intro': {
      fr: 'Pas des frictions génériques. Ce sont les préoccupations exactes des commerçants interviewés. Elles sont devenues les contraintes de design du MVP.',
      nl: 'Geen generieke wrijving. Dit zijn de letterlijke zorgen van merchants in interviews. Ze werden de ontwerpbeperkingen voor de MVP.',
      en: 'Not generic friction. These are the exact concerns merchants raised in interviews. They became the design constraints for the MVP.'
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
    'bnp.barriers.cap': {
      fr: 'Artefact original · Rapport de découverte · Key Driver et 6 barrières clés',
      nl: 'Origineel artefact · Discovery rapport · Key Driver en 6 sleutel-barrières',
      en: 'Original artefact · Discovery report · Key Driver and 6 Key Barriers'
    },

    /* Barriers intro slide — transition typographique avant le horizontal pin */
    'bnp.barriersIntro.eyebrow': {
      fr: 'Recherche utilisateur · interviews qualitatives',
      nl: 'Gebruikersonderzoek · kwalitatieve interviews',
      en: 'User research · qualitative interviews'
    },
    'bnp.barriersIntro.title': {
      fr: 'Six voix.<br><span class="accent">Une seule conviction.</span>',
      nl: 'Zes stemmen.<br><span class="accent">Eén overtuiging.</span>',
      en: 'Six voices.<br><span class="accent">One conviction.</span>'
    },
    'bnp.barriersIntro.lead': {
      fr: 'On a interviewé Jean-Paul, CEO multi-shops, et cinq autres commerçants. Six fois, la même réticence, formulée différemment. <strong>Pas de la friction générique.</strong> Les phrases exactes qui sont sorties en interview, et qui sont devenues les six contraintes design du MVP.',
      nl: 'We interviewden Jean-Paul, CEO multi-winkels, en vijf andere merchants. Zes keer dezelfde terughoudendheid, anders verwoord. <strong>Geen generieke wrijving.</strong> De letterlijke zinnen uit de interviews, die de zes ontwerpbeperkingen van de MVP werden.',
      en: 'We interviewed Jean-Paul, multi-shop CEO, and five other merchants. Six times, the same reluctance, expressed differently. <strong>Not generic friction.</strong> The exact sentences from the interviews that became the six design constraints of the MVP.'
    },
    'bnp.barriersIntro.cue': {
      fr: 'Faites défiler · les six voix prennent la parole',
      nl: 'Scroll · de zes stemmen nemen het woord',
      en: 'Scroll · the six voices speak'
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

    /* Pull-quotes hero — extraits du Concept Report 2018, posés en respiration entre actes */
    'bnp.pq1.eyebrow': { fr: 'Concept Report · mars 2018', nl: 'Concept Report · maart 2018', en: 'Concept Report · March 2018' },
    'bnp.pq1.quote': {
      fr: 'Pas de système exploratoire de métriques. <span class="accent">Des rapports orientés objectifs, avec des outcomes actionnables.</span>',
      nl: 'Geen exploratief metrics-systeem. <span class="accent">Doelgerichte rapporten, met actiegerichte outcomes.</span>',
      en: 'No exploratory metrics system. <span class="accent">Goals oriented reports, with actionable outcomes.</span>'
    },
    'bnp.pq2.eyebrow': { fr: 'Concept Report · mars 2018', nl: 'Concept Report · maart 2018', en: 'Concept Report · March 2018' },
    'bnp.pq2.quote': {
      fr: 'Un dashboard, ce n\'est pas pousser de la donnée. <span class="accent">C\'est raconter une histoire</span> qui aide le commerçant à décider.',
      nl: 'Een dashboard, dat is geen data pushen. <span class="accent">Dat is een verhaal vertellen</span> dat de winkelier helpt beslissen.',
      en: 'A dashboard isn\'t about pushing data. <span class="accent">It\'s about telling a story</span> that helps the shopkeeper decide.'
    },
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

    'bnp.steps.eyebrow': { fr: 'Les étapes · 3 / 3', nl: 'De stappen · 3 / 3', en: 'The Steps · 3 of 3' },
    'bnp.steps.label': { fr: 'Six décisions, six livrables', nl: 'Zes beslissingen, zes deliverables', en: 'Six decisions, six deliverables' },

    'bnp.steps.s1.eyebrow': { fr: 'Étape 01 · DISCOVER', nl: 'Stap 01 · DISCOVER', en: 'Step 01 · DISCOVER' },
    'bnp.steps.s2.eyebrow': { fr: 'Étape 02 · DEFINE', nl: 'Stap 02 · DEFINE', en: 'Step 02 · DEFINE' },
    'bnp.steps.s3.eyebrow': { fr: 'Étape 03 · DEFINE', nl: 'Stap 03 · DEFINE', en: 'Step 03 · DEFINE' },
    'bnp.steps.s4.eyebrow': { fr: 'Étape 04 · DEVELOP', nl: 'Stap 04 · DEVELOP', en: 'Step 04 · DEVELOP' },
    'bnp.steps.s5.eyebrow': { fr: 'Étape 05 · DEVELOP', nl: 'Stap 05 · DEVELOP', en: 'Step 05 · DEVELOP' },
    'bnp.steps.s6.eyebrow': { fr: 'Étape 06 · DELIVER', nl: 'Stap 06 · DELIVER', en: 'Step 06 · DELIVER' },

    'bnp.roadmap.eyebrow': { fr: 'La suite', nl: 'Het vervolg', en: 'What came next' },
    'bnp.steps.h2': {
      fr: 'Quelles étapes ai-je suivies<br>pour <span class="accent">obtenir le résultat ?</span>',
      nl: 'Welke stappen heb ik gezet<br>om <span class="accent">het resultaat te bereiken?</span>',
      en: 'What steps did I take<br>to <span class="accent">achieve the result?</span>'
    },
    'bnp.steps.lead': {
      fr: 'Six mouvements concrets, chacun avec un livrable concret, chacun dé-risquant une pièce du puzzle. Voici les artefacts tels qu\'ils ont été produits.',
      nl: 'Zes concrete bewegingen, elk met een concrete deliverable, elk een puzzelstuk dat risico vermindert. Hieronder de artefacten zoals ze daadwerkelijk werden gemaakt.',
      en: 'Six concrete moves, each with a concrete deliverable, each de-risking one piece of the puzzle. Below, the artefacts as they actually shipped.'
    },

    'bnp.steps.s1.h': { fr: 'Recherche personas et segmentation B2B', nl: 'Persona-onderzoek en B2B-segmentatie', en: 'Persona research and B2B segmentation' },
    'bnp.steps.s1.p': {
      fr: 'L\'enquête démarre par la cartographie. Segmenter le marché PME selon BNP, puis interviewer des commerçants susceptibles d\'acheter de la donnée. Pas pour valider une vision, mais pour identifier leurs problèmes réels. Le benchmark a confirmé l\'angle stratégique : <strong class="accent">BNP voit 30 % des comptes via Bancontact</strong>, position quasi-monopolistique sur la donnée transactionnelle B2B. <strong>Mes findings ont sorti la réponse : ces gens ne sont pas data scientists.</strong> Une bibliothèque de neuf personas B2B est sortie de la phase, du libéral au CPBB, avec leur niveau d\'intérêt mappé.',
      nl: 'Het onderzoek start met cartografie. De kmo-markt segmenteren zoals BNP die zag, dan merchants interviewen die mogelijk data zouden kopen. Niet om een visie te valideren, maar om hun reële problemen te identificeren. De benchmark bevestigde de strategische hoek : <strong class="accent">BNP ziet 30 % van de rekeningen via Bancontact</strong>, bijna-monopoliepositie op B2B-transactiedata. <strong>Mijn findings leverden het antwoord : deze mensen zijn geen data scientists.</strong> Een bibliotheek van negen B2B-persona\'s kwam uit de fase, van vrije beroepen tot CPBB, met hun interesseniveau in kaart gebracht.',
      en: 'The investigation starts with mapping. Segment the SME market the way BNP saw it, then interview merchants likely to buy data. Not to validate a vision, but to identify their real problems. The benchmark confirmed the strategic angle : <strong class="accent">BNP sees 30% of accounts via Bancontact</strong>, near-monopoly on B2B transactional data. <strong>My findings gave the answer : these people aren\'t data scientists.</strong> A library of nine B2B personas came out of the phase, from liberal professions to CPBB, with their level of interest mapped.'
    },
    'bnp.steps.s1.deliv': { fr: 'Livrable · bibliothèque 9 personas · matrice Niveaux d\'intérêt', nl: 'Deliverable · 9-persona-bibliotheek · Interesseniveau-matrix', en: 'Deliverable · 9-persona library · Levels of Interest matrix' },
    'bnp.steps.s1.cap': { fr: '9 personas B2B · validés par recherche', nl: '9 B2B-persona\'s · onderzoeksgebaseerd', en: '9 B2B personas · research-backed' },

    'bnp.steps.s2.h': { fr: 'Value Proposition Canvas', nl: 'Value Proposition Canvas', en: 'Value Proposition Canvas' },
    'bnp.steps.s2.p': {
      fr: 'La question fondatrice tenait en une ligne, posée à chaque atelier : <em>« Comment transformer ce que la banque voit déjà en un service que les PME accepteraient de payer ? »</em> Le VPC a structuré la réponse en trois axes concrets, alignés sur les décisions hebdomadaires d\'un commerçant. <strong>Audience</strong> : qui est le bon client, où il habite, combien de kilomètres il parcourt. <strong>Trafic</strong> : à quelles heures les cartes passent, quand ouvrir et fermer. <strong>Marketing tout-boîte</strong> : depuis quelles communes les clients arrivent, donc où lancer une campagne ciblée. Trois colonnes, trois décisions hebdomadaires. Pas de data exploration. Des outputs actionnables.',
      nl: 'De stichtingsvraag paste in één regel, gesteld in elke workshop : <em>« Hoe vertalen we wat de bank al ziet in een dienst waarvoor kmo\'s zouden willen betalen ? »</em> De VPC structureerde het antwoord in drie concrete assen, afgestemd op de wekelijkse beslissingen van een winkelier. <strong>Doelpubliek</strong> : wie is de goede klant, waar woont hij, hoeveel kilometer legt hij af. <strong>Verkeer</strong> : op welke uren passeren de kaarten, wanneer openen en sluiten. <strong>Marketing tout-boîte</strong> : uit welke gemeenten komen de klanten, dus waar een gerichte campagne lanceren. Drie kolommen, drie wekelijkse beslissingen. Geen data exploration. Enkel outputs.',
      en: 'The founding question fit in one line, asked in every workshop : <em>« How do we turn what the bank already sees into a service SMEs would actually pay for ? »</em> The VPC structured the answer in three concrete axes, aligned to a shopkeeper\'s weekly decisions. <strong>Audience</strong> : who\'s the right customer, where they live, how many kilometers they travel. <strong>Traffic</strong> : at what hours the cards swipe, when to open and close. <strong>Tout-boîte marketing</strong> : from which communes customers come, so where to launch a targeted campaign. Three columns, three weekly decisions. No data exploration. Actionable outputs only.'
    },
    'bnp.steps.s2.deliv': { fr: 'Livrable · VPC · Pains / Gains / Jobs vers features MVP', nl: 'Deliverable · VPC · Pains / Gains / Jobs naar MVP-features', en: 'Deliverable · VPC · Pains / Gains / Jobs to MVP features' },
    'bnp.steps.s2.cap': { fr: 'VPC · Besoins · Envies · Peurs vers offre MVP', nl: 'VPC · Behoeften · Wensen · Angsten naar MVP-aanbod', en: 'VPC · Needs · Wants · Fears to MVP offer' },

    'bnp.steps.s3.h': { fr: 'Lean Canvas et cadrage MVP', nl: 'Lean Canvas en MVP-framing', en: 'Lean Canvas and MVP framing' },
    'bnp.steps.s3.p': {
      fr: 'Lean Canvas. Une page. Problème · Solution · UVP · Avantage déloyal · Segments · Canaux · Coûts · Revenus. La discipline d\'une page : ce qui ne tient pas dessus n\'est pas dans le MVP. <strong class="accent">L\'avantage déloyal</strong> tenait en une ligne défendable : profiling banking et données transactionnelles combinés ne sont disponibles nulle part ailleurs. Et le 30 % de part Bancontact rendait l\'échantillon statistiquement représentatif. Le scope MVP s\'est précisé : <strong>1 500 PME Corporate Banking en pilote, 901 dans EBB, 234 utilisateurs réguliers.</strong> Pas plus, pas moins.',
      nl: 'Lean Canvas. Eén pagina. Probleem · Oplossing · UVP · Oneerlijk voordeel · Segmenten · Kanalen · Kosten · Omzet. De discipline van één pagina : wat er niet op past zit niet in de MVP. <strong class="accent">Het oneerlijk voordeel</strong> paste in één verdedigbare zin : banking profiling en transactionele data gecombineerd zijn nergens anders beschikbaar. En de 30 % Bancontact-marktaandeel maakte de sample statistisch representatief. De MVP-scope versmalde : <strong>1 500 Corporate Banking-kmo\'s in pilot, 901 in EBB, 234 reguliere gebruikers.</strong> Niet meer, niet minder.',
      en: 'Lean Canvas. One page. Problem · Solution · UVP · Unfair Advantage · Segments · Channels · Cost · Revenue. The one-page discipline : what doesn\'t fit isn\'t in the MVP. <strong class="accent">The unfair advantage</strong> fit into one defensible line : banking profiling combined with transactional data isn\'t available anywhere else. And the 30% Bancontact market share made the sample statistically representative. The MVP scope sharpened : <strong>1 500 Corporate Banking SMEs in pilot, 901 in EBB, 234 regular users.</strong> No more, no less.'
    },
    'bnp.steps.s3.deliv': { fr: 'Livrable · Lean Canvas · scope MVP · 4 lentilles de données', nl: 'Deliverable · Lean Canvas · MVP-scope · 4 datalenzen', en: 'Deliverable · Lean Canvas · MVP scope · 4 data lenses' },
    'bnp.steps.s3.cap': { fr: 'Lean Canvas · MVP Enterprise Intelligence', nl: 'Lean Canvas · Enterprise Intelligence MVP', en: 'Lean Canvas · Enterprise Intelligence MVP' },

    'bnp.steps.s4.h': { fr: 'Service blueprint et customer journeys', nl: 'Service blueprint en customer journeys', en: 'Service blueprint and customer journeys' },
    'bnp.steps.s4.p': {
      fr: 'Semaine 6. IT voulait démarrer le build du dashboard. <strong class="accent">J\'ai bloqué.</strong> Pas avant le service blueprint. J\'ai dessiné cinq journeys « as-is » end-to-end, un pour chaque point d\'entrée : non-enregistré à la banque, enregistré mais nouveau dans EBB, utilisateur EBB existant via deep-link, via app launcher, et flux contract manager. Le journey du non-enregistré comptait à lui seul <strong class="accent">15 étapes étalées sur 1 à 3 jours</strong>. Ce constat a sorti l\'onboarding du backlog « plus tard » et l\'a remis dans le scope MVP, le jour même.',
      nl: 'Week 6. IT wilde met de dashboardbouw beginnen. <strong class="accent">Ik blokkeerde.</strong> Niet vóór het service blueprint. Ik tekende vijf end-to-end "as-is" journeys, één per instappunt : niet-geregistreerd bij de bank, geregistreerd maar nieuw in EBB, bestaande EBB-gebruiker via deeplink, via app-launcher, en de contract-manager-flow. De journey van de niet-geregistreerde alleen al telde <strong class="accent">15 stappen verspreid over 1 tot 3 dagen</strong>. Die bevinding haalde de onboarding uit de "later"-backlog en zette die diezelfde dag terug in de MVP-scope.',
      en: 'Week 6. IT wanted to start building the dashboard. <strong class="accent">I blocked it.</strong> Not before the service blueprint. I drew five end-to-end "as-is" journeys, one per entry point : unregistered with the bank, registered but new to EBB, existing EBB user via deep link, via app launcher, and the contract manager flow. The unregistered journey alone had <strong class="accent">15 steps spread over 1 to 3 days</strong>. That finding pulled onboarding out of the "later" backlog and back into MVP scope the same day.'
    },
    'bnp.steps.s4.deliv': { fr: 'Livrable · 5 blueprints de journey · refonte du flux d\'onboarding', nl: 'Deliverable · 5 journey blueprints · onboarding-flow herontworpen', en: 'Deliverable · 5 journey blueprints · Onboarding flow redesigned' },
    'bnp.steps.s4.cap': { fr: 'Journey as-is · PME non-enregistrée · 15 étapes · 1–3 jours', nl: 'As-is journey · niet-geregistreerde kmo · 15 stappen · 1–3 dagen', en: 'As-is journey · Unregistered SME · 15 steps · 1-3 days' },

    'bnp.steps.s5.h': { fr: 'Concept et prototypes dashboard', nl: 'Concept en dashboardprototypes', en: 'Concept and dashboard prototypes' },
    'bnp.steps.s5.p': {
      fr: 'Semaine 9. IT proposait un dashboard de <strong class="accent">47 indicateurs</strong> pour le MVP. <strong class="accent">J\'ai dit non.</strong> Les six barrières en interview disaient toutes la même chose : un commerçant ne sait pas quoi faire avec des chiffres bruts. J\'ai défendu trois lectures coachées par graphique. Le concept de service a pris la forme d\'un dashboard Spotfire avec trois objectifs : <em>Performance Analysis</em>, <em>Business Expansion</em>, <em>Evaluating Actions</em>. Le détail qui a tout changé : chaque graphique était entouré d\'une annotation <em>« What\'s important »</em> qui suggérait une décision concrète. Pas de la donnée. Une lecture coachée.',
      nl: 'Week 9. IT stelde een dashboard met <strong class="accent">47 indicatoren</strong> voor in het MVP. <strong class="accent">Ik zei nee.</strong> De zes barrières uit de interviews zeiden allemaal hetzelfde : een winkelier weet niet wat te doen met ruwe cijfers. Ik verdedigde drie begeleide lezingen per diagram. Het serviceconcept werd een Spotfire-dashboard met drie doelen : <em>Performance Analysis</em>, <em>Business Expansion</em>, <em>Evaluating Actions</em>. Het detail dat alles veranderde : elk diagram was omkaderd met een <em>"What\'s important"</em>-annotatie die een concrete beslissing voorstelde. Geen data. Een begeleide lezing.',
      en: 'Week 9. IT proposed a <strong class="accent">47-KPI dashboard</strong> for the MVP. <strong class="accent">I said no.</strong> The six barriers from the interviews all said the same thing : a shopkeeper doesn\'t know what to do with raw numbers. I defended three coached reads per chart. The service concept took the shape of a Spotfire dashboard with three goals : <em>Performance Analysis</em>, <em>Business Expansion</em>, <em>Evaluating Actions</em>. The detail that changed everything : each chart was wrapped with a <em>"What\'s important"</em> annotation that suggested a concrete decision. Not data. A coached read.'
    },
    'bnp.steps.s5.deliv': { fr: 'Livrable · Goals 1·2·3 · wireframes · dashboards POC', nl: 'Deliverable · Goals 1·2·3 · wireframes · POC-dashboards', en: 'Deliverable · Goals 1·2·3 · Wireframes · POC dashboards' },
    'bnp.steps.s5.cap': { fr: 'Dashboard POC · module POS Turnover · prototype Spotfire', nl: 'POC-dashboard · POS Turnover-module · Spotfire-prototype', en: 'POC dashboard · POS Turnover module · Spotfire prototype' },

    'bnp.steps.s6.h': { fr: 'Roadmap et dossier de décision exécutif', nl: 'Roadmap en executive beslissingspakket', en: 'Roadmap and executive decision pack' },
    'bnp.steps.s6.p': {
      fr: 'Tous les artefacts précédents (recherche, VPC, Lean Canvas, blueprints, prototypes) ont alimenté un seul livrable final : un dossier de décision exécutif. Roadmap séquencée Q1 2018 vers 2020. Registre des risques RGPD / faisabilité technique / défensibilité concurrentielle. <strong class="accent">Et la preuve commerciale en avance : six PME testées avec le prototype. Une promesse d\'achat ferme — le groupe Léonidas, sur décision de son manager général, qui s\'engageait à acheter à la sortie pour tous ses magasins. Aucun refus chez les cinq autres ; toutes prêtes à être dans les premières acheteuses.</strong> C\'était le signal qui manquait au sponsor pour passer en production. <strong class="accent">Construit pour être décidé, pas seulement lu.</strong>',
      nl: 'Alle voorgaande artefacten (onderzoek, VPC, Lean Canvas, blueprints, prototypes) voedden één finaal deliverable : een executive decision document. Gefaseerde roadmap Q1 2018 naar 2020. Risicoregister GDPR / technische haalbaarheid / concurrentie-verdedigbaarheid. <strong class="accent">En het commerciële bewijs vooraf : zes kmo\'s testten het prototype. Eén harde aankoopbelofte — de Léonidas-groep, op beslissing van haar algemeen directeur, die zich engageerde om bij lancering aan te kopen voor al haar winkels. Geen weigering bij de vijf anderen ; allemaal bereid om bij de eerste kopers te zijn.</strong> Dat was het signaal dat de sponsor nodig had om in productie te gaan. <strong class="accent">Gebouwd om beslist te worden, niet enkel gelezen.</strong>',
      en: 'Every prior artefact (research, VPC, Lean Canvas, blueprints, prototypes) fed into a single final deliverable : an executive decision pack. Sequenced roadmap Q1 2018 to 2020. Risk register GDPR / technical feasibility / competitive defensibility. <strong class="accent">And the commercial proof up-front : six SMEs tested the prototype. One firm pre-purchase commitment — the Léonidas group, by decision of its general manager, committing to buy on launch for all of its stores. No refusals among the other five ; all of them ready to be first-buyers.</strong> That was the signal the sponsor needed to push for production. <strong class="accent">Built to be decided on, not just reviewed.</strong>'
    },
    'bnp.steps.s6.deliv': { fr: 'Livrable · roadmap · registre des risques · dossier de décision', nl: 'Deliverable · roadmap · risicoregister · beslissingspakket', en: 'Deliverable · roadmap · Risk register · Decision pack' },
    'bnp.steps.s6.cap': { fr: 'Principe de sélection temporelle · cadre de comparaison étagé', nl: 'Principe tijdselectie · gefaseerd vergelijkingskader', en: 'Time selection principle · Staged comparison frame' },

    'bnp.roadmap.h3': { fr: 'La roadmap, en six temps.', nl: 'De roadmap, in zes zetten.', en: 'The roadmap, in six moves.' },
    'bnp.roadmap.lead': {
      fr: 'Six mois. De l\'observation du commerçant à la signature d\'un vrai contrat. À chaque étape, une décision claire pour la banque.',
      nl: 'Zes maanden. Van shadowing op de winkelvloer tot een handtekening op een echt contract. Bij elke stap één duidelijke beslissing voor de bank.',
      en: 'Six months. From shadowing the merchant to a signature on a real contract. Each step, one clear decision for the bank.'
    },
    'bnp.roadmap.r1.phase': { fr: 'Observer', nl: 'Observeren', en: 'Discover' },
    'bnp.roadmap.r1.when': { fr: 'Q3 2017', nl: 'Q3 2017', en: 'Q3 2017' },
    'bnp.roadmap.r1.h': { fr: 'À l\'écoute du terrain', nl: 'Luisteren op de winkelvloer', en: 'Listening on the shop floor' },
    'bnp.roadmap.r1.p': {
      fr: 'Entretiens PME, observation des points de vente, benchmark des outils existants (Barclays, Proximus, BBVA).',
      nl: 'Kmo-interviews, shadowing van pos-locaties, benchmark van bestaande tools (Barclays, Proximus, BBVA).',
      en: 'SME interviews, shadowing on sales floors, benchmark of existing tools (Barclays, Proximus, BBVA).'
    },
    'bnp.roadmap.r2.phase': { fr: 'Cadrer', nl: 'Kaderen', en: 'Define' },
    'bnp.roadmap.r2.when': { fr: '30 oct. 2017', nl: '30 okt. 2017', en: 'Oct 30, 2017' },
    'bnp.roadmap.r2.h': { fr: 'Lean Canvas posé', nl: 'Lean Canvas vastgelegd', en: 'Lean Canvas signed off' },
    'bnp.roadmap.r2.p': {
      fr: 'Value Proposition Canvas cartographié. Triple Win verrouillé : banque, commerçant, porteur de carte.',
      nl: 'Value Proposition Canvas in kaart gebracht. Triple Win vastgelegd: bank, merchant, kaarthouder.',
      en: 'Value Proposition Canvas mapped. Triple Win locked: bank, retailer, cardholder.'
    },
    'bnp.roadmap.r3.phase': { fr: 'Recadrer', nl: 'Herkaderen', en: 'Reframe' },
    'bnp.roadmap.r3.when': { fr: 'Q4 2017', nl: 'Q4 2017', en: 'Q4 2017' },
    'bnp.roadmap.r3.h': { fr: 'Pas un dashboard. Un service.', nl: 'Geen dashboard. Een dienst.', en: 'Not a dashboard. A service.' },
    'bnp.roadmap.r3.p': {
      fr: 'Reports orientés objectifs au lieu de tableaux de bord. La surcharge cognitive devient l\'ennemi.',
      nl: 'Doelgerichte rapporten in plaats van data-dumps. Cognitieve overload wordt de vijand.',
      en: 'Goal-oriented reports replace data-dump screens. Cognitive overload becomes the enemy.'
    },
    'bnp.roadmap.r4.phase': { fr: 'Concevoir', nl: 'Ontwerpen', en: 'Concept' },
    'bnp.roadmap.r4.when': { fr: '1ᵉʳ mars 2018', nl: '1 maart 2018', en: 'Mar 1, 2018' },
    'bnp.roadmap.r4.h': { fr: 'Quatre goals, un canal', nl: 'Vier goals, één kanaal', en: 'Four goals, one channel' },
    'bnp.roadmap.r4.p': {
      fr: 'Performance · Expansion · Actions · Comparaison. Le tout dans Easy Banking Business.',
      nl: 'Performance · Expansion · Actions · Comparison. Alles binnen Easy Banking Business.',
      en: 'Performance · Expansion · Actions · Comparison. All inside Easy Banking Business.'
    },
    'bnp.roadmap.r5.phase': { fr: 'Piloter', nl: 'Piloteren', en: 'Pilot' },
    'bnp.roadmap.r5.when': { fr: 'Q2 2018', nl: 'Q2 2018', en: 'Q2 2018' },
    'bnp.roadmap.r5.h': { fr: 'Léonidas signe', nl: 'Léonidas tekent', en: 'Léonidas signs' },
    'bnp.roadmap.r5.p': {
      fr: 'Co-création avec un client réel. Pont ATOS résolu. Le concept se valide en boutique.',
      nl: 'Co-creatie met een echte klant. ATOS-brug opgelost. Het concept wordt in de winkel gevalideerd.',
      en: 'Co-creation with a real merchant. ATOS bridge resolved. Concept validated on the shop floor.'
    },
    'bnp.roadmap.r6.phase': { fr: 'Étendre', nl: 'Schalen', en: 'Scale' },
    'bnp.roadmap.r6.when': { fr: '2020 · Étoile polaire', nl: '2020 · Noordster', en: '2020 · North star' },
    'bnp.roadmap.r6.h': { fr: 'De 7 % à 20 % de part acquirer', nl: 'Van 7 % naar 20 % acquirer-aandeel', en: 'From 7% to 20% acquirer share' },
    'bnp.roadmap.r6.p': {
      fr: 'Enterprise Intelligence comme différenciateur, sur 1 500 retailers corporate.',
      nl: 'Enterprise Intelligence als differentiator, op 1 500 corporate retailers.',
      en: 'Enterprise Intelligence as the differentiator, across 1,500 corporate retailers.'
    },

    'bnp.result.eyebrow': { fr: 'Le résultat', nl: 'Het resultaat', en: 'The Result' },
    'bnp.result.h2': {
      fr: 'Du concept à <span class="accent">une vraie PME qui dit oui.</span>',
      nl: 'Van concept tot <span class="accent">een echte kmo die ja zegt.</span>',
      en: 'From concept to <span class="accent">a real PME saying yes.</span>'
    },

    'bnp.tw.h3': { fr: 'Le frame <span class="accent">Triple-Win.</span>', nl: 'Het <span class="accent">Triple-Win</span>-frame.', en: 'The <span class="accent">Triple-Win</span> frame.' },
    'bnp.tw.p': {
      fr: 'Chaque feature était notée contre ce triangle. Une seule branche cassée, elle ne sortait pas.',
      nl: 'Elke feature werd getoetst aan deze driehoek. Eén tak gebroken, dan niet live.',
      en: 'Every feature was scored against this triangle. One branch broken, it didn\'t ship.'
    },
    'bnp.tw.w1.who': { fr: 'La banque', nl: 'De bank', en: 'The Bank' },
    'bnp.tw.w1.h': { fr: 'BNP Paribas Fortis', nl: 'BNP Paribas Fortis', en: 'BNP Paribas Fortis' },
    'bnp.tw.w1.p': {
      fr: 'Nouvelle ligne B2B. Au service du 7 % → 20 % acquiring.',
      nl: 'Nieuwe B2B-lijn. Ten dienste van 7 % → 20 % acquiring.',
      en: 'New B2B revenue line. Serving the 7% → 20% acquirer goal.'
    },
    'bnp.tw.w2.who': { fr: 'Le commerçant', nl: 'De merchant', en: 'The Retailer' },
    'bnp.tw.w2.h': { fr: 'PME commerçante', nl: 'Kmo-merchant', en: 'SME Merchant' },
    'bnp.tw.w2.p': {
      fr: 'Des décisions, pas des dashboards. Benchmarké sur la concurrence réelle.',
      nl: 'Beslissingen, geen dashboards. Gebenchmarkt op de echte concurrentie.',
      en: 'Decisions, not dashboards. Benchmarked on real competition.'
    },
    'bnp.tw.w3.who': { fr: 'Le porteur de carte', nl: 'De kaarthouder', en: 'The Cardholder' },
    'bnp.tw.w3.h': { fr: 'Consommateur final', nl: 'Eindconsument', en: 'End Consumer' },
    'bnp.tw.w3.p': {
      fr: 'Statistiques agrégées seulement. Zéro donnée personnelle exposée.',
      nl: 'Enkel geaggregeerde statistieken. Nul persoonlijke data blootgesteld.',
      en: 'Aggregated statistics only. Zero personal data exposed.'
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
    'bnp.triplewin.lead': {
      fr: 'Le service ne tenait que si les trois sommets gagnaient. Une idée qui faisait gagner deux et perdre un était écartée. Pas de compromis, pas de moyenne. Le triangle tranchait.',
      nl: 'De dienst hield enkel stand als de drie hoekpunten wonnen. Een idee dat er twee deed winnen en één verliezen werd terzijde gelegd. Geen compromis, geen gemiddelde. De driehoek besliste.',
      en: 'The service only held if all three vertices won. An idea that made two win and one lose was set aside. No compromise, no average. The triangle decided.'
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
      fr: 'Statistiques agrégées seulement, jamais une transaction nominative. GDPR dérisqué dès la value prop, validé Legal &amp; Compliance avant le build.',
      nl: 'Enkel geaggregeerde statistieken, nooit een nominale transactie. GDPR gederisicood vanaf de value prop, gevalideerd door Legal &amp; Compliance vóór de build.',
      en: 'Aggregated statistics only, never a named transaction. GDPR de-risked from the value prop onwards, validated by Legal &amp; Compliance before build.'
    },
    'bnp.triplewin.claim': {
      fr: 'Toute idée qui ne validait pas les <span class="accent">trois sommets</span> était écartée. Trois critères, pas une moyenne.',
      nl: 'Elk idee dat de <span class="accent">drie hoekpunten</span> niet valideerde, werd terzijde gelegd. Drie criteria, geen gemiddelde.',
      en: 'Any idea that did not validate the <span class="accent">three vertices</span> was set aside. Three criteria, not an average.'
    },

    'bnp.leo.lead1': {
      fr: 'Test grandeur nature sur <strong class="accent">Léonidas</strong>. Six mois de données BNP. Deux boutiques bruxelloises : Wolluwé SP (test) vs Ixelles (control).',
      nl: 'Test op ware grootte op <strong class="accent">Léonidas</strong>. Zes maanden BNP-data. Twee Brusselse boetieken : Wolluwé SP (test) vs Elsene (control).',
      en: 'Live test on <strong class="accent">Léonidas</strong>. Six months of BNP data. Two Brussels boutiques : Wolluwé SP (test) vs Ixelles (control).'
    },
    'bnp.leo.lead2': {
      fr: 'Une seule variable : Wolluwé a appliqué les rapports. Ixelles non. <strong class="accent">Le manager général Léonidas a décidé pour tous les magasins</strong> : promesse d\'achat à la sortie.',
      nl: 'Eén variabele : Wolluwé paste de rapporten toe. Elsene niet. <strong class="accent">De algemeen directeur van Léonidas besliste voor al haar winkels</strong> : aankoopbelofte bij lancering.',
      en: 'One variable : Wolluwé applied the reports. Ixelles didn\'t. <strong class="accent">The Léonidas general manager decided for all stores</strong> : pre-purchase commitment on launch.'
    },
    'bnp.leo.s1': { fr: 'Hausse de revenu', nl: 'Omzetstijging', en: 'Revenue increase' },
    'bnp.leo.s2': { fr: 'Six mois', nl: 'Zes maanden', en: 'Six months' },
    'bnp.leo.s3': { fr: 'Panier moyen', nl: 'Gemiddeld winkelmandje', en: 'Avg basket size' },
    'bnp.leo.s4': { fr: 'Clients fidélisés', nl: 'Behouden klanten', en: 'Maintained customers' },
    'bnp.leo.quote': {
      fr: 'Wolluwé SP : <strong>35 %</strong> de part sectorielle. Ixelles : <strong>10 %</strong>. Même marque, même dataset. Une variable : les rapports appliqués.',
      nl: 'Wolluwé SP : <strong>35 %</strong> sectoraal aandeel. Elsene : <strong>10 %</strong>. Zelfde merk, zelfde dataset. Eén variabele : de rapporten toegepast.',
      en: 'Wolluwé SP : <strong>35%</strong> sector share. Ixelles : <strong>10%</strong>. Same brand, same dataset. One variable : the reports applied.'
    },
    'bnp.leo.src': {
      fr: 'Concept Report · Goal 2 / Business Expansion · Jan → Juin 2017',
      nl: 'Concept Report · Goal 2 / Business Expansion · Jan → Juni 2017',
      en: 'Concept Report · Goal 2 / Business Expansion · Jan → June 2017'
    },
    'bnp.leo.cap1': {
      fr: 'Comparaison Boutiques · Wolluwé SP vs Ixelles · Concept Report BNP · juin 2017 · p54',
      nl: 'Winkelvergelijking · Woluwe SP vs Elsene · Concept Report BNP · juni 2017 · p54',
      en: 'Shop Comparison · Wolluwé SP vs Ixelles · Concept Report BNP · June 2017 · p54'
    },
    'bnp.leo.cap2': {
      fr: 'Comparaison périodique · +80 % revenu · +10 % panier · Concept Report BNP · juin 2017 · p57',
      nl: 'Periodevergelijking · +80 % omzet · +10 % winkelmandje · Concept Report BNP · juni 2017 · p57',
      en: 'Period Comparison · +80% revenue · +10% basket · Concept Report BNP · June 2017 · p57'
    },

    'bnp.beyond.h3': {
      fr: 'Ce que le projet a livré<br>au-delà du pilote.',
      nl: 'Wat het project leverde<br>buiten de pilot.',
      en: 'What the project delivered<br>beyond the pilot.'
    },
    'bnp.beyond.cap': {
      fr: 'Pourquoi nos données sont pertinentes · Intersection BNP unique',
      nl: 'Waarom onze data relevant is · Unieke BNP-intersectie',
      en: 'Why our data is relevant · Unique BNP value intersection'
    },
    'bnp.beyond.summary': {
      fr: 'MVP signé Banking + IT + Legal + Marketing. GDPR et qualité données dérisqués. <strong class="accent">9 personas B2B</strong> qui ont survécu au projet.',
      nl: 'MVP ondertekend door Banking + IT + Legal + Marketing. GDPR en datakwaliteit gederisicood. <strong class="accent">9 B2B-persona\'s</strong> die het project overleefden.',
      en: 'MVP signed by Banking + IT + Legal + Marketing. GDPR and data quality de-risked. <strong class="accent">9 B2B personas</strong> that outlived the project.'
    },

    /* TIMELINE INTRO — graphique synthétique avant l'histoire (entre star-bridge et Chapter S) */
    'bnp.timeline.eyebrow': {
      fr: 'Six mois · en un coup d\'œil',
      nl: 'Zes maanden · in één oogopslag',
      en: 'Six months · at a glance'
    },
    'bnp.timeline.t1.when': { fr: 'Q3 2017', nl: 'Q3 2017', en: 'Q3 2017' },
    'bnp.timeline.t1.what': { fr: 'Brief reçu', nl: 'Briefing ontvangen', en: 'Brief received' },
    'bnp.timeline.t2.when': { fr: 'Oct 2017', nl: 'Okt 2017', en: 'Oct 2017' },
    'bnp.timeline.t2.what': { fr: 'VPC + Lean Canvas', nl: 'VPC + Lean Canvas', en: 'VPC + Lean Canvas' },
    'bnp.timeline.t3.when': { fr: 'Nov–Déc 2017', nl: 'Nov–Dec 2017', en: 'Nov–Dec 2017' },
    'bnp.timeline.t3.what': { fr: '6 PME interviewées', nl: '6 kmo\'s geïnterviewd', en: '6 SMEs interviewed' },
    'bnp.timeline.t4.when': { fr: 'Q1 2018', nl: 'Q1 2018', en: 'Q1 2018' },
    'bnp.timeline.t4.what': { fr: 'Blueprint + prototypes Spotfire', nl: 'Blueprint + Spotfire-prototypes', en: 'Blueprint + Spotfire prototypes' },
    'bnp.timeline.t5.when': { fr: 'Mars 2018', nl: 'Maart 2018', en: 'March 2018' },
    'bnp.timeline.t5.what': { fr: '6 testées · 1 promesse · 0 refus', nl: '6 getest · 1 belofte · 0 weigeringen', en: '6 tested · 1 commitment · 0 refusals' },
    'bnp.timeline.t6.when': { fr: 'Q2 2018', nl: 'Q2 2018', en: 'Q2 2018' },
    'bnp.timeline.t6.what': { fr: 'Sponsor go production', nl: 'Sponsor go productie', en: 'Sponsor go production' },

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
    'bnp.alignment.lead': {
      fr: 'Chaque fonction arrivait avec sa friction propre. Le Double Diamant a servi à caler chaque conversation au moment où elle pouvait être tenue · pas avant, pas après. Le scope MVP a été arrêté au commerçant solo · la donnée tout-boîte (campagnes marketing) a été placée hors MVP, à la demande du sponsor, pour sécuriser un premier signal commercial avant d\'élargir.',
      nl: 'Elke functie kwam met haar eigen wrijving. De Double Diamond diende om elk gesprek te plaatsen op het moment dat het gevoerd kon worden · niet eerder, niet later. De MVP-scope werd vastgelegd op de solo-handelaar · de all-in-one data (marketingcampagnes) werd buiten MVP geplaatst, op vraag van de sponsor, om een eerste commercieel signaal veilig te stellen vóór de uitbreiding.',
      en: 'Each function showed up with its own friction. The Double Diamond served to place each conversation at the moment it could be held · not earlier, not later. The MVP scope was locked on the solo merchant · the all-in-one data (marketing campaigns) was placed out of MVP, at the sponsor\'s request, to secure a first commercial signal before broadening.'
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

    'bnp.alignment.pivotClaim': { fr: '', nl: '', en: '' },
    /* CVE 2026-05-08 · toolkit signal · workshop choice = ateliers de cocréation (Service Design / DT) */
    'bnp.alignment.toolkitSignal': {
      fr: '<strong>Marketing et IT à la même table d\'atelier</strong>, distants dans l\'org. Pas de Value Proposition défendable sans les deux qui la portent. Sortie · <strong class="accent">scope MVP clair, sprints priorisés</strong>, plus de débat sur le périmètre.',
      nl: '<strong>Marketing en IT aan dezelfde workshoptafel</strong>, ver van elkaar in de org. Geen verdedigbare Value Proposition zonder beide die ze dragen. Uitkomst · <strong class="accent">duidelijke MVP-scope, geprioriteerde sprints</strong>, geen debat meer over het bereik.',
      en: '<strong>Marketing and IT at the same workshop table</strong>, distant in the org chart. No defensible Value Proposition unless both carry it. Outcome · <strong class="accent">clear MVP scope, prioritised sprints</strong>, no more debate on perimeter.'
    },
    'bnp.alignment.pivotOutcome': {
      fr: 'Quand les quatre fonctions ont vu la même PME au centre · pas le commerçant abstrait, le commerçant observé sur sa caisse, dont on connaissait la phrase exacte · le projet est devenu <strong class="accent">le bébé de tout le monde</strong>. Vision alignée. Aucune incompréhension sur où mettre le focus.',
      nl: 'Toen de vier functies dezelfde kmo in het centrum zagen · niet de abstracte handelaar, de handelaar die we aan zijn kassa hadden geobserveerd, van wie we de exacte zin kenden · werd het project <strong class="accent">de baby van iedereen</strong>. Uitgelijnde visie. Geen misverstand over waar de focus moest liggen.',
      en: 'When the four functions saw the same SME at the centre · not the abstract merchant, the merchant we had observed at his till, whose exact phrase we knew · the project became <strong class="accent">everyone\'s baby</strong>. Aligned vision. No misunderstanding on where to focus.'
    },

    /* CLIMAX STAT BLOCK 6 / 1 / 0 — fin du double diamant, signal sponsor */
    'bnp.climax.eyebrow': {
      fr: 'Fin du double diamant · Phase prototype',
      nl: 'Einde van de double diamond · Prototype-fase',
      en: 'End of double diamond · Prototype phase'
    },
    'bnp.climax.tested': {
      fr: 'PME testées avec le prototype',
      nl: 'kmo\'s die het prototype testten',
      en: 'SMEs tested the prototype'
    },
    'bnp.climax.commit': {
      fr: 'Promesse d\'achat ferme · groupe Léonidas',
      nl: 'Harde aankoopbelofte · Léonidas-groep',
      en: 'Firm pre-purchase commitment · Léonidas group'
    },
    'bnp.climax.refused': {
      fr: 'Refus chez les cinq autres',
      nl: 'Weigeringen bij de vijf anderen',
      en: 'Refusals among the five others'
    },
    'bnp.climax.caption': {
      fr: 'Le manager général de Léonidas a décidé pour tous ses magasins : promesse d\'achat à la sortie. Les cinq autres : « c\'est bien · prêts à acheter avant la sortie pour être les premiers. » Le signal qui manquait au sponsor pour passer en production.',
      nl: 'De algemeen directeur van Léonidas besliste voor al haar winkels : aankoopbelofte bij lancering. De vijf anderen : « het is goed · klaar om voor lancering te kopen om bij de eersten te zijn. » Het signaal dat de sponsor nodig had om in productie te gaan.',
      en: 'The general manager of Léonidas decided for all of its stores : pre-purchase commitment on launch. The other five : "it\'s good · ready to buy before launch to be among the first." The signal the sponsor needed to push for production.'
    },

    /* Double Diamond — methodology label + caption */
    'bnp.dd.eyebrow': {
      fr: 'Méthodologie · Design Council',
      nl: 'Methodologie · Design Council',
      en: 'Methodology · Design Council'
    },
    'bnp.dd.cap': {
      fr: 'Diverger pour comprendre, converger pour décider — deux fois. La structure exacte des six mois BNP.',
      nl: 'Divergeren om te begrijpen, convergeren om te beslissen — twee keer. De exacte structuur van de zes maanden BNP.',
      en: 'Diverge to understand, converge to decide — twice. The exact shape of the six BNP months.'
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
    'bnp.outcome.lead': {
      fr: 'Six mois de cadrage amont refermés sur une promesse d\'achat ferme, signée avant la première ligne de code. Pas un usability test poli, pas un oui de principe en interview. Une intention écrite, datée, sur le bureau du sponsor.',
      nl: 'Zes maanden voorafgaand kaderwerk afgesloten met een vaste aankoopbelofte, getekend vóór de eerste regel code. Geen beleefde usability test, geen ja-in-principe in een interview. Een geschreven intentie, gedateerd, op het bureau van de sponsor.',
      en: 'Six months of upstream framing closed on a firm purchase commitment, signed before the first line of code. Not a polite usability test, not a yes-in-principle from an interview. A written intent, dated, on the sponsor\'s desk.'
    },
    'bnp.outcome.d1.h': { fr: 'Concept Report signé',     nl: 'Concept Report ondertekend', en: 'Concept Report signed' },
    'bnp.outcome.d1.p': {
      fr: 'Quatre fonctions internes (Banking · IT · Legal · Marketing) alignées sur un MVP arrêté. Mars 2018.',
      nl: 'Vier interne functies (Banking · IT · Legal · Marketing) op één lijn rond een vastgelegd MVP. Maart 2018.',
      en: 'Four internal functions (Banking · IT · Legal · Marketing) aligned on a locked MVP scope. March 2018.'
    },
    'bnp.outcome.d2.h': { fr: 'Léonidas pré-signe',       nl: 'Léonidas tekent vooraf',     en: 'Léonidas pre-signs' },
    'bnp.outcome.d2.p': {
      fr: 'Une PME sur six testées s\'est engagée par écrit. Promesse d\'achat ferme, conditionnée à la mise en production. Le seul cas du projet.',
      nl: 'Eén kmo van zes geteste heeft zich schriftelijk geëngageerd. Vaste aankoopbelofte, voorwaardelijk aan de productie. Het enige geval van het project.',
      en: 'One SME out of the six tested signed a written commitment. Firm purchase commitment, conditional on go-live. The only such case in the project.'
    },
    'bnp.outcome.d3.h': { fr: 'Backlog prêt à coder',     nl: 'Backlog klaar om te coderen', en: 'Backlog ready to ship' },
    'bnp.outcome.d3.p': {
      fr: 'User stories prioritisées P1/P2, scope MVP arrêté, prêtes à entrer en sprints agiles côté IT.',
      nl: 'User stories geprioriteerd P1/P2, MVP-scope vastgelegd, klaar om in agile sprints te gaan aan de IT-zijde.',
      en: 'User stories prioritised P1/P2, MVP scope locked, ready to enter agile sprints on the IT side.'
    },
    'bnp.outcome.integrity': {
      fr: '<strong>Note d\'intégrité.</strong> J\'ai quitté BNP après la livraison du Concept Report pour rejoindre Belfius. Je n\'ai plus eu de nouvelles du projet. Ce que je peux affirmer s\'arrête ici · à la sortie du parcours, le signal commercial était documenté noir sur blanc.',
      nl: '<strong>Integriteitsnota.</strong> Ik ben na de oplevering van het Concept Report bij BNP vertrokken om bij Belfius te beginnen. Ik heb geen nieuws meer gehad van het project. Wat ik met zekerheid kan zeggen stopt hier · aan het einde van het traject was het commerciële signaal zwart op wit gedocumenteerd.',
      en: '<strong>Integrity note.</strong> I left BNP after the Concept Report was delivered, to join Belfius. I had no further news of the project. What I can assert stops here · at the close of the journey, the commercial signal was documented in black and white.'
    },

    'bnp.lessons.eyebrow': { fr: 'Si je refaisais le projet', nl: 'Als ik het opnieuw zou doen', en: 'If I did it again' },
    'bnp.lessons.h2': {
      fr: 'Ce que je referais <span class="accent">différemment.</span>',
      nl: 'Wat ik <span class="accent">anders</span> zou doen.',
      en: 'What I\'d do <span class="accent">differently.</span>'
    },
    'bnp.lessons.lead': {
      fr: 'Sept ans après. Trois choix à refaire autrement.',
      nl: 'Zeven jaar later. Drie keuzes om anders te maken.',
      en: 'Seven years on. Three calls to make differently.'
    },
    'bnp.lessons.l1.h': {
      fr: 'Mettre un prix sur la table dès la semaine 8.',
      nl: 'Een prijs op tafel leggen vanaf week 8.',
      en: 'Put a price on the table by week 8.'
    },
    'bnp.lessons.l1.p': {
      fr: 'La promesse Léonidas restait conditionnelle au build. Aujourd\'hui : bons de commande fermes dès le prototype, accompagnement jusqu\'au marché.',
      nl: 'De Léonidas-belofte bleef afhankelijk van de build. Vandaag : harde bestelbonnen vanaf het prototype, begeleiding tot in de markt.',
      en: 'The Léonidas commitment stayed conditional on the build. Today : firm purchase orders from the prototype, engagement through to market.'
    },
    'bnp.lessons.l2.h': {
      fr: 'Élargir l\'échantillon avant de figer la promesse.',
      nl: 'Het sample uitbreiden voor je de value prop vastlegt.',
      en: 'Widen the sample before locking the value prop.'
    },
    'bnp.lessons.l2.p': {
      fr: '6 testeurs, 1 secteur. Signal fort, mono-vertical. Aujourd\'hui : 12 testeurs sur 3 verticales avant de bétonner.',
      nl: '6 testers, 1 sector. Sterk signaal, mono-verticaal. Vandaag : 12 testers in 3 verticalen voor ik betonneer.',
      en: '6 testers, 1 vertical. Strong signal, mono-vertical. Today : 12 testers across 3 verticals before locking.'
    },
    'bnp.lessons.l3.h': {
      fr: 'Auditer la qualité de la donnée avant d\'écrire le service.',
      nl: 'De datakwaliteit auditen vóór je de service schrijft.',
      en: 'Audit data quality before writing the service.'
    },
    'bnp.lessons.l3.p': {
      fr: 'Découvert mi-parcours : toutes les catégories transactionnelles n\'étaient pas également propres. Aujourd\'hui : audit qualité avant la value prop.',
      nl: 'Halverwege ontdekt : niet alle transactiecategorieën waren even proper. Vandaag : kwaliteitsaudit vóór de value prop.',
      en: 'Found mid-project : not all transaction categories were equally clean. Today : quality audit before the value prop.'
    },

    'bnp.qa.eyebrow': {
      fr: 'Pont vers Luminus · à vous',
      nl: 'Brug naar Luminus · aan u',
      en: 'Bridge to Luminus · over to you'
    },
    'bnp.qa.h2': {
      fr: 'Et chez <span class="accent">vous ?</span>',
      nl: 'En bij <span class="accent">jullie ?</span>',
      en: 'And on <span class="accent">your side ?</span>'
    },
    'bnp.qa.lead': {
      fr: 'Quatre fils que j\'aimerais tirer en live, sur les ponts entre BNP et vos enjeux.',
      nl: 'Vier draden die ik graag live oppak, op de bruggen tussen BNP en jullie uitdagingen.',
      en: 'Four threads I\'d love to pull on live, on the bridges between BNP and your challenges.'
    },
    'bnp.qa.q1': {
      fr: 'On entend parler côté énergie de signal compteur intelligent, données de flexibilité géo, comportement de recharge VE. Où en est Luminus aujourd\'hui sur la productisation de ces signaux, et où le service design intervient-il dans la décision ?',
      nl: 'We horen veel aan de energiekant over smart-meter-signaal, geo-flexibiliteitsdata, EV-laadgedrag. Waar staat Luminus vandaag in het productiseren van die signalen, en waar past service design in die beslissing?',
      en: 'We hear about smart-meter signal on the energy side, geo-flexibility data, EV-charging behaviour. Where is Luminus today on productising those signals, and where does service design fit in the decision?'
    },
    'bnp.qa.q2': {
      fr: 'À quoi ressemblerait, pour Luminus, ce premier client B2B qui signerait une prévente sur un prototype, avant qu\'on engage toute la plateforme ?',
      nl: 'Hoe zou voor Luminus die eerste B2B-klant eruitzien die een pré-aankoop tekent op een prototype, vóór we het hele platform bouwen?',
      en: 'What would, for Luminus, that first B2B customer look like? The one who signs a pre-purchase on a prototype, before you commit to build the whole platform?'
    },
    'bnp.qa.q3': {
      fr: 'Quelle couche de stakeholders est la plus dure à aligner aujourd\'hui : business, IT, légal et régulateur, ou client final ? L\'énergie ajoute le régulateur au-dessus de la contrainte compliance de BNP. J\'aimerais comparer nos retours.',
      nl: 'Welke stakeholder-laag is vandaag het moeilijkst af te stemmen : business, IT, legal en regulator, of eindklant? Energie voegt de regulator toe boven op BNP\'s compliance-beperking. Graag wissel ik ervaringen uit.',
      en: 'Which stakeholder layer is hardest to align right now : business, IT, legal and regulator, or end-customer? Energy adds the regulator on top of BNP\'s compliance constraint. I\'d love to compare notes.'
    },
    'bnp.qa.q4': {
      fr: 'Périmètre senior service designer : comment voulez-vous équilibrer le rôle entre <strong>cadrage en amont</strong> (où je suis le plus à l\'aise) et <strong>UX en delivery</strong> sur les journeys existants ? Quel split réaliste pour les 90 premiers jours ?',
      nl: 'Senior-service-designer-scope : hoe wilt u de rol balanceren tussen <strong>upstream framing</strong> (waar ik me het sterkst voel) en <strong>delivery-time UX</strong> op bestaande journeys? Wat is een realistische verdeling voor de eerste 90 dagen?',
      en: 'Senior service designer scope : how do you want the role to balance <strong>upstream framing</strong> (where I sit naturally) with <strong>delivery-time UX</strong> on existing journeys? What\'s a realistic split for the first 90 days?'
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
    'home.openCases': { fr: 'Voir les deux cases →', nl: 'Bekijk beide cases →', en: 'See both cases →' },

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

    /* ============== SPEOS CASE STUDY · clés critiques ============== */
    'speos.title': {
      fr: 'SPEOS One-Stop Platform · Étude de cas Service Design par Christophe van Engelen',
      nl: 'SPEOS One-Stop Platform · Service Design Case Study door Christophe van Engelen',
      en: 'SPEOS One-Stop Platform · Service Design Case Study by Christophe van Engelen'
    },
    'speos.metaDesc': {
      fr: 'Étude de cas en service design : installer une plateforme one-stop chez SPEOS, filiale bpost. 12 entretiens experts, 10 pain points, 5 Value Props MVP, 6 clients pilotes pré-validateurs dont Luminus.',
      nl: 'Service design case study: een one-stop platform installeren bij SPEOS, een bpost-dochter. 12 expertinterviews, 10 pain points, 5 MVP Value Props, 6 pilootklanten waaronder Luminus.',
      en: 'Service design case study: installing a one-stop platform at SPEOS, a bpost subsidiary. 12 expert interviews, 10 pain points, 5 MVP Value Props, 6 pre-validating pilot customers including Luminus.'
    },

    'speos.chapResearch.overline': { fr: 'Discover · Observe &amp; Understand', nl: 'Discover · Observe &amp; Understand', en: 'Discover · Observe &amp; Understand' },
    'speos.chapResearch.label': { fr: 'Phase 01 · Research', nl: 'Fase 01 · Research', en: 'Phase 01 · Research' },
    'speos.chapResearch.title': { fr: 'Le terrain enseigne.', nl: 'Het terrein leert.', en: 'The field teaches.' },
    'speos.chapResearch.lead': { fr: 'Comprendre avant de proposer.', nl: 'Begrijpen voor je voorstelt.', en: 'Understand before you propose.' },
    'speos.chapResearch.ddCap': { fr: 'Vous êtes ici · Diamant 1 · moitié gauche · 4 jalons', nl: 'Hier ben je · Diamant 1 · linkerhelft · 4 mijlpalen', en: 'You are here · Diamond 1 · left half · 4 milestones' },

    'speos.chapAnalyse.overline': { fr: 'Discover · Define', nl: 'Discover · Define', en: 'Discover · Define' },
    'speos.chapAnalyse.label': { fr: 'Phase 02 · Analyse', nl: 'Fase 02 · Analyse', en: 'Phase 02 · Analyse' },
    'speos.chapAnalyse.title': { fr: 'Le bon problème.', nl: 'Het juiste probleem.', en: 'The right problem.' },
    'speos.chapAnalyse.lead': { fr: 'Reformuler avant de construire.', nl: 'Herformuleren voor je bouwt.', en: 'Reframe before you build.' },
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
    'speos.method.claim': {
      fr: 'Strategyzer, Customer Journey, Service Blueprint, Design Sprint sont des outils du <strong class="accent">même Design System</strong>. La maîtrise, ce n\'est pas d\'en choisir un. C\'est de savoir lequel, à quel moment, avec qui dans la salle.',
      nl: 'Strategyzer, Customer Journey, Service Blueprint en Design Sprint zijn tools van <strong class="accent">hetzelfde Design System</strong>. De expertise zit niet in er één kiezen. Maar weten welke, op welk moment, met wie in de kamer.',
      en: 'Strategyzer, Customer Journey, Service Blueprint and Design Sprint are tools from the <strong class="accent">same Design System</strong>. Mastery isn\'t about picking one. It\'s about knowing which one, at which moment, with whom in the room.'
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

    /* Fin-royale SPEOS */
    'speos.fin.line': { fr: 'La méthode ne vaut rien tant qu\'elle ne décide rien.', nl: 'De methode is niets waard zolang ze niets beslist.', en: 'A method is worth nothing until it decides something.' },
    'speos.fin.signature': { fr: 'Christophe van Engelen · Service Designer · Bruxelles', nl: 'Christophe van Engelen · Service Designer · Brussel', en: 'Christophe van Engelen · Service Designer · Brussels' },
    'speos.fin.contact.eyebrow': { fr: 'Une conversation ?', nl: 'Een gesprek?', en: 'A conversation?' },

    'speos.climax.eyebrow': { fr: 'Fin du double diamant · Phase prototype', nl: 'Einde dubbele diamant · Prototype-fase', en: 'End of the double diamond · Prototype phase' },
    'speos.climax.tested': { fr: 'clients testés · 3 segments', nl: 'klanten getest · 3 segmenten', en: 'customers tested · 3 segments' },
    'speos.climax.commit': { fr: 'sur 6 valident la direction one-stop', nl: 'op 6 valideren de one-stop richting', en: 'out of 6 validate the one-stop direction' },
    'speos.climax.refused': { fr: 'référence forte · Luminus', nl: 'sterke referentie · Luminus', en: 'strong reference · Luminus' },

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
    'bnp.prototype.homeLead': {
      fr: 'La page d\'accueil ne montre pas un rapport, elle donne un panorama : trois KPI de performance en haut, trois indicateurs d\'amélioration en bas. Le commerçant voit en cinq secondes ce qui marche et ce qui glisse. C\'est le tableau de bord d\'entrée — chaque rapport détaillé se déclenche depuis ici.',
      nl: 'De homepagina toont geen rapport, ze geeft een panorama: drie performance-KPI bovenaan, drie verbeterindicatoren onderaan. De handelaar ziet binnen vijf seconden wat werkt en wat afglijdt. Dit is het instapdashboard, elk detailrapport opent vanaf hier.',
      en: 'The home page does not show a report, it gives a panorama: three performance KPIs on top, three improvement indicators below. In five seconds the shopkeeper sees what works and what slips. This is the entry dashboard, every detailed report opens from here.'
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
    'bnp.research.persoSource': {
      fr: 'Source · BNPPF B2B Personas (23p) + Concept Report personas overview · 2018',
      nl: 'Bron · BNPPF B2B Personas (23p) + Concept Report personas overview · 2018',
      en: 'Source · BNPPF B2B Personas (23p) + Concept Report personas overview · 2018'
    },
    'bnp.snm.p2a': { fr: 'Rapport 1 · Performance', nl: 'Rapport 1 · Performance', en: 'Report 1 · Performance' },
    'bnp.snm.p2b': { fr: 'Rapport 2 · Business Expansion', nl: 'Rapport 2 · Business Expansion', en: 'Report 2 · Business Expansion' },
    'bnp.snm.p2c': { fr: 'Rapport 3 · Evaluating Actions (ROI)', nl: 'Rapport 3 · Evaluating Actions (ROI)', en: 'Report 3 · Evaluating Actions (ROI)' },
    'bnp.snm.p2d': { fr: 'Market Research · phase 2 roadmap', nl: 'Market Research · fase 2 roadmap', en: 'Market Research · phase 2 roadmap' },
    'bnp.snm.p2home': { fr: 'Home · panorama d\'accueil', nl: 'Home · onthaalpanorama', en: 'Home · welcome panorama' },
    'home.contact': { fr: 'hello@christophevanengelen.com', nl: 'hello@christophevanengelen.com', en: 'hello@christophevanengelen.com' },

    /* CVE 2026-05-04 S3.x · trust signals & conversion (sprint S3) */
    /* CVE 2026-05-11 Pack v4-final · pill scarcity sans date (Brand Guardian).
       "Un mandat à la fois" signale la rareté du senior, pas une fenêtre Q3. */
    'home.statusAvailability': {
      fr: 'Disponible · briefs sérieux · un mandat à la fois.',
      nl: 'Beschikbaar · serieuze briefs · één opdracht tegelijk.',
      en: 'Available · serious briefs · one engagement at a time.'
    },
    'home.trustEyebrow': {
      fr: 'Travaillé avec',
      nl: 'Gewerkt met',
      en: 'Worked with'
    },
    'home.testimonialEyebrow': {
      fr: 'Ce qu\'ils disent',
      nl: 'Wat ze zeggen',
      en: 'What they say'
    },
    'home.testimonialH2': {
      fr: 'Trois sponsors. Trois décisions signées.',
      nl: 'Drie sponsors. Drie getekende beslissingen.',
      en: 'Three sponsors. Three signed decisions.'
    },
    /* BNP */
    'home.testimonial.bnpClient': { fr: 'BNP Paribas Fortis · 2018 — 2019', nl: 'BNP Paribas Fortis · 2018 — 2019', en: 'BNP Paribas Fortis · 2018 — 2019' },
    'home.testimonial.bnpQuote': {
      fr: '« Christophe a aligné Banking, IT, Legal et Marketing en six mois. Léonidas a signé avant la première ligne de code. »',
      nl: '« Christophe heeft Banking, IT, Legal en Marketing in zes maanden uitgelijnd. Léonidas heeft getekend nog vóór de eerste regel code. »',
      en: '"Christophe aligned Banking, IT, Legal and Marketing in six months. Léonidas signed before the first line of code."'
    },
    'home.testimonial.bnpName': { fr: 'Sponsor projet', nl: 'Projectsponsor', en: 'Project sponsor' },
    'home.testimonial.bnpRole': { fr: 'Enterprise Intelligence · BNP Paribas Fortis', nl: 'Enterprise Intelligence · BNP Paribas Fortis', en: 'Enterprise Intelligence · BNP Paribas Fortis' },
    'home.testimonial.bnpLink': { fr: 'Lire le case →', nl: 'Lees de case →', en: 'Read the case →' },
    /* SPEOS */
    'home.testimonial.speosClient': { fr: 'SPEOS · bpost group · 2024 — 2025', nl: 'SPEOS · bpost group · 2024 — 2025', en: 'SPEOS · bpost group · 2024 — 2025' },
    'home.testimonial.speosQuote': {
      fr: '« Christophe a posé une méthode là où chacun parlait sa langue. Six clients pilotes ont validé. Le sponsor a donné le go prod. »',
      nl: '« Christophe heeft een methode neergezet waar iedereen zijn eigen taal sprak. Zes pilootklanten valideerden. De sponsor gaf het productie-go. »',
      en: '"Christophe laid down a method where everyone spoke their own language. Six pilot customers validated. The sponsor gave the production go."'
    },
    'home.testimonial.speosName': { fr: 'Sponsor digital', nl: 'Digitaal sponsor', en: 'Digital sponsor' },
    'home.testimonial.speosRole': { fr: 'One-Stop Platform · SPEOS', nl: 'One-Stop Platform · SPEOS', en: 'One-Stop Platform · SPEOS' },
    'home.testimonial.speosLink': { fr: 'Lire le case →', nl: 'Lees de case →', en: 'Read the case →' },
    /* HMS */
    'home.testimonial.hmsClient': { fr: 'Ewon by HMS Networks · 2021 — 2022', nl: 'Ewon by HMS Networks · 2021 — 2022', en: 'Ewon by HMS Networks · 2021 — 2022' },
    'home.testimonial.hmsQuote': {
      fr: '« Trois plateformes legacy, trois équipes, un seul concept au bout. Le board a débloqué 2 M€ pour la mise en prod. »',
      nl: '« Drie legacy-platformen, drie teams, één concept aan het eind. De board heeft 2 M€ vrijgemaakt voor productie. »',
      en: '"Three legacy platforms, three teams, one single concept at the end. The board released €2M for production."'
    },
    'home.testimonial.hmsName': { fr: 'Product Lead', nl: 'Product Lead', en: 'Product Lead' },
    'home.testimonial.hmsRole': { fr: 'Cloud Revamp · Ewon by HMS Networks', nl: 'Cloud Revamp · Ewon by HMS Networks', en: 'Cloud Revamp · Ewon by HMS Networks' },
    'home.testimonial.hmsLink': { fr: 'Lire le case →', nl: 'Lees de case →', en: 'Read the case →' },

    'home.testimonialNote': {
      fr: 'Noms et coordonnées des sponsors fournis sur demande à recruteur ou client.',
      nl: 'Namen en contactgegevens van sponsors worden op aanvraag aan recruiter of klant verstrekt.',
      en: 'Sponsor names and contacts shared on request to recruiter or client.'
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
    'home.contactCtaLabel': {
      fr: 'Réserver un premier call de 30 min',
      nl: 'Boek een eerste call van 30 min',
      en: 'Book a 30-min first call'
    },
    'home.contactCtaMeta': {
      fr: 'Calendrier en direct · réponse en 24 h ouvrées sinon.',
      nl: 'Agenda live · anders antwoord binnen 24u (werkdagen).',
      en: 'Live calendar · otherwise reply within 24h on business days.'
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
      fr: 'Je réponds en 24h ouvrées. Premier call 30 min, gratuit, sans engagement, pour qualifier votre besoin. Disponible pour des missions service design en amont, recherche utilisateur, ateliers d\'alignement Business / IT à Bruxelles et en remote.',
      nl: 'Ik antwoord binnen 24u (werkdagen). Eerste call 30 min, gratis, zonder verbintenis, om uw behoefte te kwalificeren. Beschikbaar voor opdrachten upstream service design, gebruikersonderzoek, alignment workshops Business / IT in Brussel en remote.',
      en: 'I reply within 24h on business days. First call 30 min, free, no commitment, to qualify your need. Available for upstream service design assignments, user research, Business / IT alignment workshops in Brussels and remote.'
    },
    'home.footerCopy': { fr: '© Christophe van Engelen, 2026.', nl: '© Christophe van Engelen, 2026.', en: '© Christophe van Engelen, 2026.' },
    'home.practice.p1': {
      fr: 'Mon métier consiste à mettre les bonnes personnes autour d\'une table, écouter, recadrer le problème, puis dessiner un service qui tient en production. La méthode change selon le contexte. Strategyzer, Customer Journey Mapping, Service Blueprint, Design Sprint sont des outils du même système, pas des écoles concurrentes.',
      nl: 'Mijn werk: de juiste mensen rond een tafel zetten, luisteren, het probleem herformuleren, en dan een dienst tekenen die het in productie houdt. De methode hangt af van de context. Strategyzer, Customer Journey Mapping, Service Blueprint, Design Sprint zijn tools van hetzelfde systeem, geen concurrerende scholen.',
      en: 'My job is to put the right people around a table, listen, reframe the problem, then draw a service that holds in production. The method changes with the context. Strategyzer, Customer Journey Mapping, Service Blueprint, Design Sprint are tools of the same system, not competing schools.'
    },
    'home.practice.p2': {
      fr: 'Je rentre par le métier, j\'installe avec l\'IT. Cette double allégeance est ce que mes clients viennent chercher. La donnée et la voix utilisateur tiennent la même place dans la salle.',
      nl: 'Ik kom binnen langs Business en installeer met IT. Die dubbele loyaliteit is wat mijn klanten komen zoeken. Data en de stem van de gebruiker hebben dezelfde plaats in de zaal.',
      en: 'I come in through Business and install with IT. That double allegiance is what my clients come looking for. Data and the user voice hold the same place in the room.'
    },
    'home.practice.p3': {
      fr: 'Vingt ans dans des contextes très différents : banque retail et entreprise (BNP Paribas Fortis, Belfius), SaaS industriel (HMS Networks, SPEOS), legal-tech (WeJustice), produit digital (Unfold, Homerun), services financiers (DCY Dubai). Le fil rouge : aligner business, utilisateurs et delivery autour de solutions faisables.',
      nl: 'Twintig jaar in heel verschillende contexten: retail en corporate banking (BNP Paribas Fortis, Belfius), industriële SaaS (HMS Networks, SPEOS), legal-tech (WeJustice), digitaal product (Unfold, Homerun), financiële diensten (DCY Dubai). De rode draad: business, gebruikers en delivery aligneren rond haalbare oplossingen.',
      en: 'Twenty years in very different contexts: retail and corporate banking (BNP Paribas Fortis, Belfius), industrial SaaS (HMS Networks, SPEOS), legal-tech (WeJustice), digital product (Unfold, Homerun), financial services (DCY Dubai). The thread: aligning business, users and delivery around feasible solutions.'
    },
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
    /* CVE 2026-05-11 audit action #1 · 3 formats commercial + Bon match / Pas bon match */
    'home.formatsEyebrow': { fr: 'Formats', nl: 'Formats', en: 'Formats' },
    'home.formatsH2': { fr: 'Trois façons de m\'engager.', nl: 'Drie manieren om met mij te werken.', en: 'Three ways to engage me.' },
    'home.formatsLead': { fr: 'Le scope dicte le format. Pas l\'inverse.', nl: 'De scope dicteert het format. Niet andersom.', en: 'The scope dictates the format. Not the other way around.' },
    'home.formats.durationLabel': { fr: 'Durée', nl: 'Duur', en: 'Duration' },
    'home.formats.outputLabel': { fr: 'Livrable', nl: 'Oplevering', en: 'Output' },
    'home.formats.budgetLabel': { fr: 'Ordre de grandeur', nl: 'Orde van grootte', en: 'Ballpark' },
    'home.formats.f1Tag': { fr: 'Format 01', nl: 'Format 01', en: 'Format 01' },
    'home.formats.f1Title': { fr: 'Sprint Discovery.', nl: 'Discovery Sprint.', en: 'Discovery Sprint.' },
    'home.formats.f1Pitch': { fr: 'Une question stratégique, une semaine, une réponse défendable.', nl: 'Eén strategische vraag, één week, één verdedigbaar antwoord.', en: 'One strategic question, one week, one defensible answer.' },
    'home.formats.f1Duration': { fr: '1 à 2 semaines', nl: '1 tot 2 weken', en: '1 to 2 weeks' },
    'home.formats.f1Output': { fr: 'Synthèse + recommandation + roadmap court terme', nl: 'Synthese + aanbeveling + korte-termijn roadmap', en: 'Synthesis + recommendation + short-term roadmap' },
    'home.formats.f1Budget': { fr: '<strong>8 — 15 k€</strong> · forfait', nl: '<strong>8 — 15 k€</strong> · forfait', en: '<strong>€8 — 15k</strong> · fixed' },
    'home.formats.f2Tag': { fr: 'Format 02 · le plus demandé', nl: 'Format 02 · meest gevraagd', en: 'Format 02 · most requested' },
    'home.formats.f2Title': { fr: 'Discovery + Concept.', nl: 'Discovery + Concept.', en: 'Discovery + Concept.' },
    'home.formats.f2Pitch': { fr: 'De l\'écoute terrain au scope MVP signé. Le format des trois cases en ligne.', nl: 'Van veldonderzoek tot ondertekende MVP-scope. Het format van de drie cases online.', en: 'From field listening to a signed MVP scope. The format of the three live cases.' },
    'home.formats.f2Duration': { fr: '3 à 6 mois', nl: '3 tot 6 maanden', en: '3 to 6 months' },
    'home.formats.f2Output': { fr: 'Insights · Customer Journey · Value Proposition · Concept testé · roadmap', nl: 'Inzichten · Customer Journey · Value Proposition · Getest concept · roadmap', en: 'Insights · Customer Journey · Value Proposition · Tested concept · roadmap' },
    'home.formats.f2Budget': { fr: '<strong>60 — 120 k€</strong> · TJM senior', nl: '<strong>60 — 120 k€</strong> · senior dagtarief', en: '<strong>€60 — 120k</strong> · senior day rate' },
    'home.formats.f3Tag': { fr: 'Format 03', nl: 'Format 03', en: 'Format 03' },
    'home.formats.f3Title': { fr: 'Advisory continu.', nl: 'Doorlopende advisory.', en: 'Ongoing advisory.' },
    'home.formats.f3Pitch': { fr: 'Un design leader externe pour vos comités produit et arbitrages.', nl: 'Een externe design leader voor jullie productcomités en afwegingen.', en: 'An outside design leader for your product committees and trade-offs.' },
    'home.formats.f3Duration': { fr: '2 à 4 jours / mois', nl: '2 tot 4 dagen / maand', en: '2 to 4 days / month' },
    'home.formats.f3Output': { fr: 'Coaching équipe · revue critique · arbitrage scope', nl: 'Team coaching · kritische review · scope-afweging', en: 'Team coaching · critical review · scope arbitration' },
    'home.formats.f3Budget': { fr: '<strong>3 — 6 k€</strong> · forfait mensuel', nl: '<strong>3 — 6 k€</strong> · maandelijks forfait', en: '<strong>€3 — 6k</strong> · monthly retainer' },
    'home.formatsNote': {
      fr: 'Tarifs indicatifs hors TVA · ajustés selon contexte. <a href="#contact">Premier call gratuit</a> pour cadrer.',
      nl: 'Indicatieve tarieven excl. BTW · aangepast aan de context. <a href="#contact">Eerste call gratis</a> om af te bakenen.',
      en: 'Indicative rates excl. VAT · adjusted to context. <a href="#contact">First call free</a> to scope it.'
    },

    'home.fitEyebrow': { fr: 'Fit', nl: 'Fit', en: 'Fit' },
    'home.fitH2': { fr: 'Bon match. Pas bon match.', nl: 'Goede match. Geen match.', en: 'Good fit. Not a fit.' },
    'home.fitLead': { fr: 'La transparence évite trois mois de friction.', nl: 'Transparantie bespaart drie maanden frictie.', en: 'Transparency saves three months of friction.' },
    'home.fit.yesTag': { fr: 'Bon match', nl: 'Goede match', en: 'Good fit' },
    'home.fit.noTag': { fr: 'Pas bon match', nl: 'Geen match', en: 'Not a fit' },
    'home.fit.yes1': { fr: 'Vous voulez un design leader autonome, pas un exécutant.', nl: 'Je wil een autonome design leader, geen uitvoerder.', en: 'You want an autonomous design leader, not an executor.' },
    'home.fit.yes2': { fr: 'Business et IT ne sont pas d\'accord et il faut trancher.', nl: 'Business en IT zijn het oneens en er moet beslist worden.', en: 'Business and IT disagree and a call has to be made.' },
    'home.fit.yes3': { fr: 'Vous avez un sponsor interne qui couvre la mission.', nl: 'Je hebt een interne sponsor die de opdracht dekt.', en: 'You have an internal sponsor who covers the mission.' },
    'home.fit.yes4': { fr: 'Le sujet engage de la prod, du budget, ou un pivot stratégique.', nl: 'Het onderwerp raakt productie, budget of een strategische pivot.', en: 'The topic involves production, budget, or a strategic pivot.' },
    'home.fit.yes5': { fr: 'Vous acceptez qu\'une recherche puisse remettre le scope en cause.', nl: 'Je aanvaardt dat onderzoek de scope ter discussie kan stellen.', en: 'You accept that research might question the scope.' },
    'home.fit.no1': { fr: 'Vous cherchez un UX designer en délivery sur backlog Jira.', nl: 'Je zoekt een UX designer in delivery op een Jira-backlog.', en: 'You\'re looking for a UX designer delivering on a Jira backlog.' },
    'home.fit.no2': { fr: 'Le scope, le concept et la roadmap sont déjà figés à signer.', nl: 'Scope, concept en roadmap liggen al vast en hoeven enkel getekend.', en: 'Scope, concept and roadmap are already locked, just sign here.' },
    'home.fit.no3': { fr: 'L\'achat passe par appel d\'offres lowest-bid sans cadrage.', nl: 'Inkoop verloopt via lowest-bid aanbesteding zonder afbakening.', en: 'Procurement goes through lowest-bid tendering without framing.' },
    'home.fit.no4': { fr: 'La recherche utilisateur est vue comme une case à cocher.', nl: 'Gebruikersonderzoek wordt gezien als een hokje om af te vinken.', en: 'User research is seen as a box to tick.' },
    'home.fit.no5': { fr: 'Le besoin est purement graphique, brand ou pixel-perfect.', nl: 'De behoefte is puur grafisch, brand of pixel-perfect.', en: 'The need is purely graphic, brand or pixel-perfect.' },

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

    /* CVE 2026-05-04 audit i18n · BNP Value Proposition content section (30 clés) */
    'bnp.vp.title': {
      fr: 'Un dashboard, ce n\'est pas <span class="accent">pousser de la donnée.</span><br>C\'est raconter une histoire qui décide.',
      nl: 'Een dashboard is geen <span class="accent">data pushen.</span><br>Het is een verhaal vertellen dat beslist.',
      en: 'A dashboard is not about <span class="accent">pushing data.</span><br>It\'s about telling a story that decides.'
    },
    'bnp.vp.lede': {
      fr: 'Avant la VP, chaque fonction parlait sa propre langue. Après, une phrase tient debout dans la salle : <strong>l\'utilisateur a un objectif, on lui livre un rapport orienté objectif, point</strong>. Plus de cognitive overload, plus de visualisation pour la visualisation. Cette section est l\'alignement qui rend la suite légitime.',
      nl: 'Vóór de VP sprak elke functie haar eigen taal. Erna staat één zin overeind in de zaal: <strong>de gebruiker heeft een doel, we leveren een doelgericht rapport, punt</strong>. Geen cognitieve overbelasting meer, geen visualisatie omwille van de visualisatie. Deze sectie is de uitlijning die de rest legitiem maakt.',
      en: 'Before the VP, every function spoke its own language. After, one sentence holds in the room: <strong>the user has an objective, we deliver an objective-oriented report, period</strong>. No more cognitive overload, no more visualisation for visualisation\'s sake. This section is the alignment that makes the rest legitimate.'
    },
    'bnp.vp.posture.h': { fr: 'La posture', nl: 'De houding', en: 'The posture' },
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
    'bnp.vp.bridgeText': {
      fr: 'À la sortie de cette VP, <strong>Banking, IT, Legal et Marketing</strong> partagent la même phrase, le même utilisateur, les mêmes 5 livrables. C\'est ce <span class="accent">socle commun</span> qui rend l\'idéation légitime, on n\'arbitre plus sur le « quoi », on arbitre sur le « comment ».',
      nl: 'Aan het eind van deze VP delen <strong>Banking, IT, Legal en Marketing</strong> dezelfde zin, dezelfde gebruiker, dezelfde 5 deliverables. Het is dit <span class="accent">gemeenschappelijke fundament</span> dat de ideation legitiem maakt: we arbitreren niet meer over het "wat", maar over het "hoe".',
      en: 'At the end of this VP, <strong>Banking, IT, Legal and Marketing</strong> share the same sentence, the same user, the same 5 deliverables. It\'s this <span class="accent">common ground</span> that makes ideation legitimate: we no longer arbitrate on the "what", we arbitrate on the "how".'
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
      fr: '<p><strong>Cela dépend du projet et de la valeur en jeu.</strong> Réponse en 24h ouvrées. Premier call 30 min gratuit. Pour un brief qui a du sens, je sais faire bouger l\'agenda · démarrage habituel en 2 à 4 semaines.</p>',
      nl: '<p><strong>Hangt af van het project en de waarde die op het spel staat.</strong> Antwoord binnen 24u (werkdagen). Eerste call 30 min gratis. Voor een brief die telt, kan ik de agenda doen schuiven · gewoonlijke start in 2 tot 4 weken.</p>',
      en: '<p><strong>It depends on the project and the value at stake.</strong> Reply within 24h business days. First call 30 min free. For a brief that matters, I can move the calendar · usual start in 2 to 4 weeks.</p>'
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
    'speos.alignment.f1.p': {
      fr: 'Friction · la rente print s\'érode pendant que les concurrents agiles capturent les PME. La Value Proposition multicanale et le pricing tiered ont ouvert l\'expansion et capturé le segment Easy2Mail.',
      nl: 'Wrijving · de print-rente brokkelt af terwijl wendbare concurrenten de kmo\'s veroveren. De multichannel Value Proposition en de tiered pricing openden de expansie en veroverden het Easy2Mail-segment.',
      en: 'Friction · the print rent erodes while agile competitors capture SMEs. The multichannel Value Proposition and the tiered pricing opened expansion and captured the Easy2Mail segment.'
    },
    'speos.alignment.f2.fn': { fr: 'Project Manager · IT', nl: 'Project Manager · IT', en: 'Project Manager · IT' },
    'speos.alignment.f2.h': { fr: '« On peut builder demain. »', nl: '« We kunnen morgen bouwen. »', en: '"We can build tomorrow."' },
    'speos.alignment.f2.p': {
      fr: 'Friction · envie de coder avant d\'aligner. Le Customer Journey AS-IS posé sur les 12 expert interviews internes a fermé le débat · cinq systèmes déconnectés à orchestrer et 10 Pain Points cartographiés avant la moindre ligne MVP.',
      nl: 'Wrijving · zin om te coderen voor er afgestemd is. De AS-IS Customer Journey, gebouwd op de 12 interne expertinterviews, sloot het debat · vijf losgekoppelde systemen te orkestreren en 10 Pain Points in kaart gebracht vóór de eerste MVP-regel.',
      en: 'Friction · urge to code before aligning. The AS-IS Customer Journey, built on the 12 internal expert interviews, closed the debate · five disconnected systems to orchestrate and 10 Pain Points mapped before any MVP line.'
    },
    'speos.alignment.f3.fn': { fr: 'Project Lead · arbitrage', nl: 'Project Lead · arbitrage', en: 'Project Lead · arbitration' },
    'speos.alignment.f3.h': { fr: '« L\'obligation 2026 ne bouge pas. »', nl: '« De verplichting 2026 schuift niet op. »', en: '"The 2026 deadline does not move."' },
    'speos.alignment.f3.p': {
      fr: 'Friction · tenir le calendrier face à la volonté de tout faire. Le scope MVP a tranché à 5 Value Props, le reste placé en roadmap phase 2. Une décision écrite, pas un compromis flou.',
      nl: 'Wrijving · de planning houden tegenover de wil om alles te doen. De MVP-scope sneed op 5 Value Props, de rest geplaatst in fase 2 van de roadmap. Een schriftelijke beslissing, geen vaag compromis.',
      en: 'Friction · holding the timeline against the wish to do everything. The MVP scope cut at 5 Value Props, the rest placed in phase 2 of the roadmap. A written decision, not a fuzzy compromise.'
    },
    'speos.alignment.f4.fn': { fr: 'UI & UX · validation', nl: 'UI & UX · validatie', en: 'UI & UX · validation' },
    'speos.alignment.f4.h': { fr: '« Et l\'expérience ? »', nl: '« En de ervaring? »', en: '"And the experience?"' },
    'speos.alignment.f4.p': {
      fr: 'Friction · l\'expérience reste impensée si on découpe par fonctionnalité. Le persona-first onboarding et le test des 6 clients pilotes ont sécurisé le signal sponsor · Luminus parmi eux.',
      nl: 'Wrijving · de ervaring blijft ondoordacht als je per feature snijdt. De persona-first onboarding en de test bij 6 pilootklanten stelden het sponsorvertrouwen veilig · Luminus als één van hen.',
      en: 'Friction · experience stays unthought when we slice by feature. The persona-first onboarding and the 6 pilot client test secured the sponsor signal · Luminus among them.'
    },
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
      fr: 'Pendant huit mois, Business et IT décrivaient le même produit avec deux vocabulaires différents. La phrase suivante a fini par sortir des deux côtés, mot pour mot, à l\'oral et dans le Concept Report. C\'est ce moment-là qui a débloqué le sponsor.',
      nl: 'Acht maanden lang beschreven Business en IT hetzelfde product met twee verschillende vocabulaires. De onderstaande zin kwam uiteindelijk woord voor woord uit beide kanten, mondeling en in het Concept Report. Dat moment heeft de sponsor gedeblokkeerd.',
      en: 'For eight months, Business and IT described the same product with two different vocabularies. The following sentence ended up coming out of both sides, word for word, in conversation and in the Concept Report. That moment unlocked the sponsor.'
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
      fr: 'C\'est cette phrase, exacte, qui a fini sur la couverture du Concept Report présenté au sponsor. Plus aucun arbitrage de scope n\'a remis en cause la direction.',
      nl: 'Deze exacte zin belandde op de cover van het Concept Report aan de sponsor. Geen enkele scope-afweging heeft de richting nadien nog ter discussie gesteld.',
      en: 'That exact sentence ended up on the cover of the Concept Report presented to the sponsor. No scope arbitration questioned the direction afterwards.'
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
      fr: 'Au démarrage, chaque rôle défendait sa lecture. Le Project Owner côté Business voulait des fonctionnalités vendables. Le Project Manager côté IT voulait une stack maintenable. Le Project Lead arbitrait sur le calendrier. <strong>Deux formats d\'atelier ont fait le pont.</strong> Des petits ateliers ciblés avec les Project Managers et les figures clés côté IT pour caler les arbitrages techniques. Des grands ateliers Customer Journey avec toutes les parties prenantes autour de la table, pour mettre le client au centre, pas l\'org chart.',
      nl: 'Bij de start verdedigde elke rol zijn lezing. De Project Owner aan Business-zijde wou verkoopbare features. De Project Manager aan IT-zijde wou een onderhoudbare stack. De Project Lead bewaakte de planning. <strong>Twee workshopformats sloegen de brug.</strong> Kleine gerichte workshops met de Project Managers en de sleutelfiguren aan IT-zijde om de technische afwegingen vast te zetten. Grote Customer Journey workshops met alle stakeholders rond de tafel, om de klant centraal te zetten, niet het organigram.',
      en: 'At the start, each role defended its reading. The Project Owner on Business side wanted sellable features. The Project Manager on IT side wanted a maintainable stack. The Project Lead arbitrated on the schedule. <strong>Two workshop formats bridged the gap.</strong> Small targeted workshops with the Project Managers and key IT figures to lock technical trade-offs. Large Customer Journey workshops with all stakeholders around the table, to put the customer at the centre, not the org chart.'
    },
    'speos.alignment.pivotClaim': { fr: '', nl: '', en: '' },
    'speos.alignment.pivotOutcome': {
      fr: 'Quand les quatre rôles ont vu les mêmes 6 clients pilotes au centre · pas le client abstrait, le client qu\'on avait observé, dont on connaissait la phrase exacte · le projet est devenu <strong class="accent">la plateforme de tout le monde</strong>. Vision alignée. Plus de débat sur le « si », un débat structuré sur le « quand » et le « comment ».',
      nl: 'Toen de vier rollen dezelfde 6 pilootklanten in het midden zagen · niet de abstracte klant, de klant die we hadden geobserveerd, van wie we de exacte zin kenden · werd het project <strong class="accent">het platform van iedereen</strong>. Visie afgestemd. Geen debat meer over het « als », een gestructureerd debat over het « wanneer » en « hoe ».',
      en: 'When the four roles saw the same 6 pilot clients at the centre · not the abstract customer, the customer we had observed, whose exact phrase we knew · the project became <strong class="accent">everyone\'s platform</strong>. Aligned vision. No more debate on "if", a structured debate on "when" and "how".'
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
      fr: 'Pas un canvas hypothétique. Une journey réelle, suivie pas à pas avec les 12 experts internes et les 6 clients interviewés. Sur cette ligne, dix pain points ont émergé. Chacun épinglé là où il bloque vraiment. C\'est cette journey, pas un Lean Canvas, qui est devenue le langage commun de tous les départements.',
      nl: 'Geen hypothetisch canvas. Een echte journey, stap voor stap gevolgd met de 12 interne experts en de 6 geïnterviewde klanten. Op die lijn kwamen tien pain points naar boven, elk vastgepind waar hij echt blokkeert. Het is die journey, geen Lean Canvas, die de gedeelde taal van alle departementen werd.',
      en: 'Not a hypothetical canvas. A real journey, walked step by step with the 12 internal experts and the 6 interviewed customers. On that line, ten pain points emerged, each pinned where it actually blocks. It is that journey, not a Lean Canvas, that became the shared language across all departments.'
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
      fr: 'Douze experts internes. Six clients interviewés. Dix personas testés terrain. Trois segments marché. Dix pain points cartographiés. Quatre ateliers cocréation. Tout converge. Pas vers un canvas, vers une phrase.',
      nl: 'Twaalf interne experts. Zes geïnterviewde klanten. Tien persona\'s getest op het terrein. Drie marktsegmenten. Tien pain points in kaart. Vier co-creatie workshops. Alles komt samen. Niet in een canvas, in één zin.',
      en: 'Twelve internal experts. Six interviewed customers. Ten personas tested in the field. Three market segments. Ten pain points mapped. Four co-creation workshops. Everything converges. Not into a canvas, into a sentence.'
    },
    'speos.analyse.vpEyebrow': { fr: 'Au bout du diamant 1', nl: 'Aan het einde van diamant 1', en: 'At the end of diamond 1' },
    'speos.analyse.vpSource': {
      fr: 'Source · SPEOS Concept Report 2024-2025 · synthèse Discovery + Analyse + ateliers cocréation',
      nl: 'Bron · SPEOS Concept Report 2024-2025 · synthese Discovery + Analyse + co-creatie workshops',
      en: 'Source · SPEOS Concept Report 2024-2025 · synthesis of Discovery + Analysis + co-creation workshops'
    },
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
      fr: 'Pour aligner Business, IT et Operations sur la voix du client, il a fallu sortir des slides. <strong>Deux régimes d\'atelier</strong> ont rythmé la phase Analyse. Des <strong>petits ateliers ciblés</strong> avec les Project Managers et les figures clés côté IT pour caler les arbitrages techniques, en groupe restreint, au tableau. Des <strong>grands ateliers Customer Journey</strong> avec toutes les parties prenantes autour de la table : Business, IT, Operations, Customer Service. Pour mettre le client au centre, pas l\'org chart. Quatre formats au total, chacun avec un livrable concret. C\'est par ces ateliers que la VP est apparue, pas par un canvas théorique.',
      nl: 'Om Business, IT en Operations rond de stem van de klant af te stemmen, moesten we uit de slides. <strong>Twee workshopregimes</strong> ritmeerden de Analysefase. <strong>Kleine gerichte workshops</strong> met de Project Managers en sleutelfiguren aan IT-zijde, om in beperkte groep aan het bord de technische afwegingen vast te zetten. <strong>Grote Customer Journey workshops</strong> met alle stakeholders rond de tafel, Business, IT, Operations, Customer Service, om de klant centraal te zetten, niet het organigram. Vier formats in totaal, elk met een concreet resultaat. Het is via die workshops dat de VP verscheen, niet via een theoretisch canvas.',
      en: 'To align Business, IT and Operations on the customer voice, we had to leave the slides. <strong>Two workshop regimes</strong> paced the Analysis phase. <strong>Small targeted workshops</strong> with the Project Managers and key IT figures, in a tight group at the board, to lock technical trade-offs. <strong>Large Customer Journey workshops</strong> with all stakeholders around the table, Business, IT, Operations, Customer Service, to put the customer at the centre, not the org chart. Four formats in total, each with a concrete deliverable. It is through these workshops that the VP appeared, not through a theoretical canvas.'
    },
    'speos.analyse.wsSource': {
      fr: 'Approche Service Design · Customer Journey + Pain Points overlay · adaptée à une organisation early-Agile en change management. Pas de Lean Canvas. La parole et l\'atelier comme outils.',
      nl: 'Service Design aanpak · Customer Journey + Pain Points overlay · aangepast aan een early-Agile organisatie in change management. Geen Lean Canvas. Het gesprek en de workshop als tools.',
      en: 'Service Design approach · Customer Journey + Pain Points overlay · adapted to an early-Agile organisation in change management. No Lean Canvas. Conversation and the workshop as tools.'
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
      fr: 'Le pattern UX en département dédié est déployé depuis quinze ans aux États-Unis et dix ans en Europe dans les grands comptes belges (banking, energy, telecoms). SPEOS a souhaité l\'adopter à son tour, en cohérence avec l\'obligation B2G PEPPOL (facturation B2G obligatoire) au 1<sup>er</sup> janvier 2026 et la pression des acteurs nés sur le numérique.',
      nl: 'Het patroon van een toegewijde UX-afdeling wordt al vijftien jaar in de Verenigde Staten en tien jaar in Europa toegepast in de grote Belgische accounts (banking, energy, telecoms). SPEOS heeft het op zijn beurt willen overnemen, in lijn met het B2G PEPPOL-mandaat van 1 januari 2026 en de concurrentiedruk van digital-first spelers.',
      en: 'The pattern of a dedicated UX department has been deployed for fifteen years in the United States and ten years in Europe across large Belgian accounts (banking, energy, telecoms). SPEOS chose to adopt it in turn, in line with the B2G PEPPOL mandate of 1 January 2026 and the competitive pressure of digital-first players.'
    },
    'speos.brief.lead3': {
      fr: 'À mon arrivée, deux initiatives produit étaient en cours. Archetype, refonte de la plateforme E2M, conduite en interne sur stack Angular. Communication Platform, née de l\'appel d\'offres Ethias, conduite avec des ressources externes sur stack React. Les deux s\'appuyaient sur le même back-end stream platform. La direction cherchait une vision produit unifiée pour la suite. L\'arrivée d\'un consultant UX a été inscrite au comité de direction du 21 novembre 2024.',
      nl: 'Bij mijn aankomst waren twee productinitiatieven aan de gang. Archetype, refactoring van het E2M-platform, intern uitgevoerd op een Angular-stack. Communication Platform, voortgekomen uit de Ethias-tender, met externe resources op een React-stack. Beide bouwden op dezelfde stream platform back-end. De directie zocht een verenigde productvisie voor de volgende fase. De onboarding van een UX-consultant werd ingeschreven in de exec review van 21 november 2024.',
      en: 'At my arrival, two product initiatives were under way. Archetype, the refactor of the E2M platform, run internally on an Angular stack. Communication Platform, born from the Ethias tender opportunity, run with external resources on a React stack. Both relied on the same stream platform back-end. The direction sought a unified product vision for the next stage. The onboarding of a UX consultant was registered in the exec review of 21 November 2024.'
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
      fr: 'Quand un sponsor me demande la preuve, je donne un numéro. Toute personne avec qui j\'ai travaillé sur SPEOS, du CEO au tech lead en passant par les chefs d\'équipe Production et Customer Service, peut témoigner. <span class="accent">C\'est ça, la matière du Service Design : des gens qui te rappellent.</span>',
      nl: 'Wanneer een sponsor om bewijs vraagt, geef ik een nummer. Iedereen waarmee ik op SPEOS heb gewerkt, van CEO tot tech lead, via de teamleads Productie en Customer Service, kan getuigen. <span class="accent">Dat is de stof van Service Design: mensen die je terugbellen.</span>',
      en: 'When a sponsor asks for proof, I give a number. Anyone I worked with on SPEOS, from CEO to tech lead, through the Production and Customer Service team leads, can vouch for it. <span class="accent">That is the matter of Service Design: people who call you back.</span>'
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
      fr: 'Six mois après la livraison, trois choix méthodologiques tiennent encore. <strong>Rien à rejouer autrement</strong> · la mission a tenu son contrat, le design a trouvé sa place dans le workflow et dans l\'organigramme.',
      nl: 'Zes maanden na de oplevering houden drie methodologische keuzes nog stand. <strong>Niets anders te spelen</strong> · de opdracht heeft haar contract gehouden, design heeft zijn plaats gevonden in de workflow en in het organigram.',
      en: 'Six months after delivery, three methodological choices still hold. <strong>Nothing to replay differently</strong> · the mission held its contract, design found its place in the workflow and in the org chart.'
    },
    'speos.method.c1.h': { fr: 'Stakeholder Map · pour rendre la friction visible', nl: 'Stakeholder Map · om de wrijving zichtbaar te maken', en: 'Stakeholder Map · to make friction visible' },
    'speos.method.c1.p': {
      fr: 'Avant de proposer une solution, on a cartographié qui décide, qui exécute, qui valide, qui influence. Le Project Owner Business et le Project Manager IT n\'avaient jamais été assis dans la même salle avec un objet partagé. La Stakeholder Map a été cet objet.',
      nl: 'Voor we een oplossing voorstelden, brachten we in kaart wie beslist, wie uitvoert, wie valideert, wie beïnvloedt. De Project Owner Business en de Project Manager IT hadden nooit in dezelfde zaal gezeten met een gedeeld object. De Stakeholder Map was dat object.',
      en: 'Before proposing a solution, we mapped who decides, who executes, who validates, who influences. The Business Project Owner and the IT Project Manager had never sat in the same room with a shared object. The Stakeholder Map was that object.'
    },
    'speos.method.c1.src': { fr: 'Source · Service Design / Stickdorn & Schneider', nl: 'Bron · Service Design / Stickdorn & Schneider', en: 'Source · Service Design / Stickdorn & Schneider' },
    'speos.method.c2.h': { fr: 'Customer Journey AS-IS / TO-BE · pour montrer le bordel', nl: 'Customer Journey AS-IS / TO-BE · om de chaos te tonen', en: 'Customer Journey AS-IS / TO-BE · to show the mess' },
    'speos.method.c2.p': {
      fr: 'La journey actuelle est posée sans accuser. Cinq phases, dix pain points épinglés là où ils font mal. La même journey, version cible, montre où on veut aller. Pas un argument. Une preuve visuelle posée sur un mur, qui résiste aux opinions.',
      nl: 'De huidige journey wordt neergezet zonder beschuldiging. Vijf fasen, tien pain points geprikt waar ze pijn doen. Dezelfde journey, doelversie, toont waar we naartoe willen. Geen argument. Een visueel bewijs op een muur, dat opinies weerstaat.',
      en: 'The current journey is laid out without accusation. Five phases, ten pain points pinned where they hurt. The same journey, target version, shows where we want to go. Not an argument. A visual proof on a wall, that resists opinion.'
    },
    'speos.method.c2.src': { fr: 'Source · Service Design Network · NN/G', nl: 'Bron · Service Design Network · NN/G', en: 'Source · Service Design Network · NN/G' },
    'speos.method.c3.h': { fr: 'Pains / Gains / Tasks · pour entrer dans la peau', nl: 'Pains / Gains / Tasks · om in de huid te kruipen', en: 'Pains / Gains / Tasks · to step into the skin' },
    'speos.method.c3.p': {
      fr: 'Strategyzer entre dans le toolkit, pas comme entrée principale, comme outil d\'extraction. Pour chaque persona, on liste les jobs à faire, les pains à éviter, les gains attendus. Le canvas ne porte pas le projet, il prépare le terrain de la VP.',
      nl: 'Strategyzer komt in de toolkit, niet als hoofdingang, als extractietool. Voor elke persona lijsten we de jobs to do, de pains te vermijden, de verwachte gains. Het canvas draagt het project niet, het bereidt het terrein van de VP voor.',
      en: 'Strategyzer enters the toolkit, not as the main door, as an extraction tool. For each persona, we list the jobs to be done, the pains to avoid, the gains expected. The canvas does not carry the project, it prepares the ground for the VP.'
    },
    'speos.method.c3.src': { fr: 'Source · Strategyzer · Value Proposition Canvas', nl: 'Bron · Strategyzer · Value Proposition Canvas', en: 'Source · Strategyzer · Value Proposition Canvas' },
    'speos.method.c4.h': { fr: 'Empathy Map + How Might We · pour reformuler', nl: 'Empathy Map + How Might We · om te herformuleren', en: 'Empathy Map + How Might We · to reframe' },
    'speos.method.c4.p': {
      fr: 'En atelier, chaque pain point se transforme en opportunité par la formule « how might we ». Les équipes votent, priorisent, jettent. Pas de débat sur le canvas, focus sur l\'action. C\'est ce qui produit le top 12 HMW qui devient le backlog VP.',
      nl: 'In workshop wordt elke pain point een opportuniteit via « how might we ». De teams stemmen, prioriteren, gooien weg. Geen debat over het canvas, focus op de actie. Dat levert de top 12 HMW die het VP-backlog wordt.',
      en: 'In workshop, every pain point becomes an opportunity through "how might we". Teams vote, prioritise, discard. No debate on the canvas, focus on the action. That produces the top 12 HMW that becomes the VP backlog.'
    },
    'speos.method.c4.src': { fr: 'Source · IDEO · Stanford d.school', nl: 'Bron · IDEO · Stanford d.school', en: 'Source · IDEO · Stanford d.school' },
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
    /* CVE 2026-05-08 · toolkit signal · outcome = compréhension d'intégration design (Agile SAFe + 5 IT teams) */
    'speos.outcome.toolkitSignal': {
      fr: '<strong>L\'outcome n\'est pas un chiffre, c\'est une compréhension.</strong> Une équipe design (UX, UI, Service Design) intégrée à l\'<strong class="accent">Agile SAFe</strong> et à une roadmap long terme priorisée en MVPs successifs. <strong class="accent">Cinq équipes IT alignées sur la même Value Proposition</strong>, valeur user en tête. Et cette fois · pas Strategyzer. L\'outil se choisit selon la maturité digital transformation et user-centric.',
      nl: '<strong>De outcome is geen cijfer, het is een begrip.</strong> Een design team (UX, UI, Service Design) geïntegreerd in <strong class="accent">Agile SAFe</strong> en in een lange-termijn roadmap geprioriteerd in opeenvolgende MVPs. <strong class="accent">Vijf IT-teams uitgelijnd op dezelfde Value Proposition</strong>, gebruikerswaarde voor ogen. En deze keer · geen Strategyzer. Het instrument kiest zich naar de maturiteit van digitale transformatie en user-centric.',
      en: '<strong>The outcome is not a number, it is an understanding.</strong> A design team (UX, UI, Service Design) integrated into <strong class="accent">Agile SAFe</strong> and into a long-term roadmap prioritised across successive MVPs. <strong class="accent">Five IT teams aligned on the same Value Proposition</strong>, user value at the front. And this time · not Strategyzer. The tool is chosen by the maturity of digital transformation and user-centric culture.'
    },
    'speos.outcome.integrity': {
      fr: '<strong>Note d\'intégrité.</strong> Le Concept Report a été remis et validé. Le rollout est passé en sprints Agile côté équipes SPEOS. Ce que je peux affirmer s\'arrête à la sortie de la phase Design Thinking · un livrable de 76 pages, six clients pilotes alignés, un triangle Customer · Business · Tech au vert. Le ROI exact post-rollout dépend des choix produit et go-to-market faits par les équipes internes après mon départ. Je ne peux pas le revendiquer.',
      nl: '<strong>Integriteitsnota.</strong> Het Concept Report werd opgeleverd en gevalideerd. De rollout ging in Agile sprints langs de SPEOS-teams. Wat ik kan beweren stopt aan de uitgang van de Design Thinking-fase · een livrable van 76 pagina\'s, zes pilootklanten op één lijn, een driehoek Customer · Business · Tech in het groen. De exacte ROI na rollout hangt af van de product- en go-to-market-keuzes die de interne teams na mijn vertrek hebben gemaakt. Ik kan die niet opeisen.',
      en: '<strong>Integrity note.</strong> The Concept Report was delivered and validated. The rollout moved into Agile sprints on the SPEOS teams. What I can claim stops at the exit of the Design Thinking phase · a 76-page deliverable, six aligned pilot clients, a Customer · Business · Tech triangle in the green. The exact ROI post-rollout depends on product and go-to-market choices made by the internal teams after my departure. I cannot claim it.'
    },
    'speos.outcome.lead': {
      fr: 'Six mois de Design Thinking refermés sur un Concept Report de 76 pages signé par le sponsor. Six clients pilotes valident les trois segments marché. Une roadmap de Value Props priorisée, prête à entrer en sprints. Pas un usability test poli, pas un oui de principe. Une décision de production écrite.',
      nl: 'Zes maanden Design Thinking afgesloten met een Concept Report van 76 pagina\'s getekend door de sponsor. Zes pilootklanten valideren de drie marktsegmenten. Een geprioriteerde Value Props roadmap, klaar voor sprints. Geen beleefde usability test, geen principieel ja. Een schriftelijke productiebeslissing.',
      en: 'Six months of Design Thinking closed on a 76-page Concept Report signed by the sponsor. Six pilot clients validate the three market segments. A prioritised Value Props roadmap, ready for sprints. Not a polite usability test, not a yes in principle. A written production decision.'
    },
    'speos.pp.p1.constraint': {
      fr: 'Devenue règle de design : automatiser l\'onboarding. Self-service guidé par objectif et besoins.',
      nl: 'Werd designregel: onboarding automatiseren. Self-service gestuurd door doel en noden.',
      en: 'Became a design rule: automate onboarding. Self-service guided by goal and needs.'
    },
    'speos.pp.p1.eyebrow': { fr: 'Pain Point 01', nl: 'Pain Point 01', en: 'Pain Point 01' },
    'speos.pp.p1.h': { fr: '« L\'onboarding nous prend des mois. »', nl: '« Onze onboarding duurt maanden. »', en: '"Onboarding takes us months."' },
    'speos.pp.p1.p': {
      fr: 'Intégration de nouveaux clients qui s\'étire. Besoins urgents (campagnes, SLA) souvent ratés. Processus manuels qui ralentissent chaque déploiement.',
      nl: 'Integratie van nieuwe klanten die uitloopt. Dringende noden (campagnes, SLA) worden vaak gemist. Manuele processen vertragen elke uitrol.',
      en: 'Integration of new clients that drags on. Urgent needs (campaigns, SLAs) often missed. Manual processes that slow every rollout.'
    },
    'speos.pp.p1.theme': { fr: 'Time-to-Market', nl: 'Time-to-Market', en: 'Time-to-Market' },
    'speos.pp.p10.constraint': {
      fr: 'Devenue argument MVP : capter les PME via Easy2Mail et le canal Integrators via API. Plus besoin de la poste comme béquille.',
      nl: 'Werd MVP-argument: KMO veroveren via Easy2Mail en het Integrators-kanaal via API. Geen post meer nodig als kruk.',
      en: 'Became an MVP argument: capture SMEs through Easy2Mail and the Integrators channel through APIs. No more relying on mail as a crutch.'
    },
    'speos.pp.p10.eyebrow': { fr: 'Pain Point 10', nl: 'Pain Point 10', en: 'Pain Point 10' },
    'speos.pp.p10.h': { fr: '« On reste collé à nos comptes historiques. »', nl: '« We blijven kleven aan onze historische rekeningen. »', en: '"We stay glued to our historical accounts."' },
    'speos.pp.p10.p': {
      fr: 'Difficulté à ouvrir le marché PME et le canal Integrators. Force commerciale calibrée pour le grand-compte. Outillage non adapté aux petits volumes.',
      nl: 'Moeite om de KMO-markt en het Integrators-kanaal te openen. Salesforce gekalibreerd op key accounts. Tooling niet aangepast aan kleine volumes.',
      en: 'Difficulty opening the SME market and the Integrators channel. Sales force calibrated for the key account. Tooling unfit for small volumes.'
    },
    'speos.pp.p10.theme': { fr: 'Expansion', nl: 'Expansion', en: 'Expansion' },
    'speos.pp.p2.constraint': {
      fr: 'Devenue règle : standardiser la base, customiser le dernier kilomètre par persona.',
      nl: 'Werd regel: de basis standaardiseren, de laatste kilometer customiseren per persona.',
      en: 'Became a rule: standardise the base, customise the last mile per persona.'
    },
    'speos.pp.p2.eyebrow': { fr: 'Pain Point 02', nl: 'Pain Point 02', en: 'Pain Point 02' },
    'speos.pp.p2.h': { fr: '« Tout passe par des workflows manuels. »', nl: '« Alles loopt via manuele workflows. »', en: '"Everything goes through manual workflows."' },
    'speos.pp.p2.p': {
      fr: 'Erreurs en chaîne sur la facturation et le file handling. Customisations clients qui empêchent la scalabilité. APIs absentes ou outdated.',
      nl: 'Kettingfouten in facturatie en file handling. Klantcustomisaties die schaalbaarheid blokkeren. API\'s afwezig of verouderd.',
      en: 'Chained errors on billing and file handling. Client customisations that block scalability. APIs missing or outdated.'
    },
    'speos.pp.p2.theme': { fr: 'Automation', nl: 'Automation', en: 'Automation' },
    'speos.pp.p3.constraint': {
      fr: 'Devenue règle : portail client one-stop avec suivi temps réel + actions self-service par persona.',
      nl: 'Werd regel: one-stop klantportaal met real-time opvolging + self-service acties per persona.',
      en: 'Became a rule: one-stop client portal with real-time tracking + self-service actions per persona.'
    },
    'speos.pp.p3.eyebrow': { fr: 'Pain Point 03', nl: 'Pain Point 03', en: 'Pain Point 03' },
    'speos.pp.p3.h': { fr: '« Le client doit nous appeler pour la moindre modif. »', nl: '« De klant moet ons bellen voor de minste wijziging. »', en: '"The client has to call us for the smallest change."' },
    'speos.pp.p3.p': {
      fr: 'Pas de self-service (configuration campagne, tracking temps réel). Interfaces non-intuitives pour les non-techs. Pas de portail transparent pour suivre l\'avancement.',
      nl: 'Geen self-service (campagneconfiguratie, real-time tracking). Niet-intuïtieve interfaces voor niet-techs. Geen transparant portaal om de voortgang te volgen.',
      en: 'No self-service (campaign configuration, real-time tracking). Non-intuitive interfaces for non-techs. No transparent portal to follow progress.'
    },
    'speos.pp.p3.theme': { fr: 'Autonomy', nl: 'Autonomy', en: 'Autonomy' },
    'speos.pp.p4.constraint': {
      fr: 'Devenue règle : plateforme host commune, customisations par typologie au-dessus.',
      nl: 'Werd regel: gemeenschappelijk hostplatform, customisaties per typologie erbovenop.',
      en: 'Became a rule: common host platform, customisations per typology on top.'
    },
    'speos.pp.p4.eyebrow': { fr: 'Pain Point 04', nl: 'Pain Point 04', en: 'Pain Point 04' },
    'speos.pp.p4.h': { fr: '« Nos outils ne se parlent pas. »', nl: '« Onze tools praten niet met elkaar. »', en: '"Our tools do not talk to each other."' },
    'speos.pp.p4.p': {
      fr: 'Plateformes différentes par segment (Build-to-Mail, Easy2Mail, Integrators). Outils internes hétérogènes (TopDesk, Navision, Salesforce…). Connaissance tacite, peu documentée.',
      nl: 'Verschillende platformen per segment (Build-to-Mail, Easy2Mail, Integrators). Heterogene interne tools (TopDesk, Navision, Salesforce…). Stilzwijgende kennis, weinig gedocumenteerd.',
      en: 'Different platforms per segment (Build-to-Mail, Easy2Mail, Integrators). Heterogeneous internal tools (TopDesk, Navision, Salesforce…). Tacit knowledge, little documented.'
    },
    'speos.pp.p4.theme': { fr: 'Fragmentation', nl: 'Fragmentation', en: 'Fragmentation' },
    'speos.pp.p5.constraint': {
      fr: 'Devenue règle : monitoring proactif, alertes côté client + côté SPEOS, communication push avant que le client ne demande.',
      nl: 'Werd regel: proactieve monitoring, alerts aan klantzijde + aan SPEOS-zijde, push-communicatie voor de klant het vraagt.',
      en: 'Became a rule: proactive monitoring, alerts on client and SPEOS side, push communication before the client asks.'
    },
    'speos.pp.p5.eyebrow': { fr: 'Pain Point 05', nl: 'Pain Point 05', en: 'Pain Point 05' },
    'speos.pp.p5.h': { fr: '« On apprend les problèmes par le client. »', nl: '« We horen problemen van de klant. »', en: '"We learn about problems from the client."' },
    'speos.pp.p5.p': {
      fr: 'Posture réactive sur les incidents. Pas d\'alerting préventif. Le client appelle, pas l\'inverse.',
      nl: 'Reactieve houding bij incidenten. Geen preventieve alerting. De klant belt, niet omgekeerd.',
      en: 'Reactive posture on incidents. No preventive alerting. The client calls, not the other way round.'
    },
    'speos.pp.p5.theme': { fr: 'Proactivity', nl: 'Proactivity', en: 'Proactivity' },
    'speos.pp.p6.constraint': {
      fr: 'Devenue règle : combler les gaps via le portail one-stop + ouverture API pour les Integrators.',
      nl: 'Werd regel: de gaps dichten via het one-stop portaal + API-opening voor de Integrators.',
      en: 'Became a rule: close the gaps through the one-stop portal + API opening for the Integrators.'
    },
    'speos.pp.p6.eyebrow': { fr: 'Pain Point 06', nl: 'Pain Point 06', en: 'Pain Point 06' },
    'speos.pp.p6.h': { fr: '« Notre offre digitale n\'égale pas la concurrence. »', nl: '« Ons digitaal aanbod evenaart de concurrentie niet. »', en: '"Our digital offer does not match the competition."' },
    'speos.pp.p6.p': {
      fr: 'Concurrents 100 % digitaux (Easypost, Doccle…) qui mordent sur le marché historique. Manque de produits self-service et d\'API ouvertes.',
      nl: '100% digitale concurrenten (Easypost, Doccle…) die de historische markt aanbijten. Tekort aan self-service producten en open API\'s.',
      en: '100% digital competitors (Easypost, Doccle…) biting into the historical market. Lack of self-service products and open APIs.'
    },
    'speos.pp.p6.theme': { fr: 'Digital gaps', nl: 'Digital gaps', en: 'Digital gaps' },
    'speos.pp.p7.constraint': {
      fr: 'Devenue règle : modulariser l\'offre. Chaque feature configurable indépendamment, sans rebuilds.',
      nl: 'Werd regel: het aanbod modulariseren. Elke feature onafhankelijk configureerbaar, zonder rebuilds.',
      en: 'Became a rule: modularise the offer. Every feature configurable independently, without rebuilds.'
    },
    'speos.pp.p7.eyebrow': { fr: 'Pain Point 07', nl: 'Pain Point 07', en: 'Pain Point 07' },
    'speos.pp.p7.h': { fr: '« Une fois en prod, plus personne ne touche. »', nl: '« Eens in prod raakt niemand het nog aan. »', en: '"Once in production, no one touches it any more."' },
    'speos.pp.p7.p': {
      fr: 'Setup client figé après onboarding. Évolutions vécues comme des projets lourds. Aucune logique d\'itération continue.',
      nl: 'Klant-setup vastgepind na onboarding. Evoluties beleefd als zware projecten. Geen logica van continue iteratie.',
      en: 'Client setup frozen after onboarding. Evolutions felt like heavy projects. No logic of continuous iteration.'
    },
    'speos.pp.p7.theme': { fr: 'Rigidity', nl: 'Rigidity', en: 'Rigidity' },
    'speos.pp.p8.constraint': {
      fr: 'Devenue argument central : la VP doit défendre le leadership ET ouvrir un nouveau segment marché.',
      nl: 'Werd centraal argument: de VP moet het leiderschap verdedigen ÉN een nieuw marktsegment openen.',
      en: 'Became a central argument: the VP must defend leadership AND open a new market segment.'
    },
    'speos.pp.p8.eyebrow': { fr: 'Pain Point 08', nl: 'Pain Point 08', en: 'Pain Point 08' },
    'speos.pp.p8.h': { fr: '« Le marché bouge plus vite que notre offre. »', nl: '« De markt beweegt sneller dan ons aanbod. »', en: '"The market moves faster than our offer."' },
    'speos.pp.p8.p': {
      fr: 'Pression sur la position de leader. Plateformes digitales qui captent le segment PME. Risque de cantonnement aux grands comptes historiques.',
      nl: 'Druk op de leiderspositie. Digitale platformen die het KMO-segment veroveren. Risico om vast te zitten in de historische key accounts.',
      en: 'Pressure on the leadership position. Digital platforms capturing the SME segment. Risk of being confined to historical key accounts.'
    },
    'speos.pp.p8.theme': { fr: 'Competition', nl: 'Competition', en: 'Competition' },
    'speos.pp.p9.constraint': {
      fr: 'Devenue règle : facturation lisible côté portail, breakdown par poste + dashboard suivi consommation.',
      nl: 'Werd regel: leesbare facturatie via het portaal, breakdown per post + verbruiksdashboard.',
      en: 'Became a rule: readable billing in the portal, breakdown by line item + consumption dashboard.'
    },
    'speos.pp.p9.eyebrow': { fr: 'Pain Point 09', nl: 'Pain Point 09', en: 'Pain Point 09' },
    'speos.pp.p9.h': { fr: '« La facturation est opaque pour nos clients. »', nl: '« De facturatie is ondoorzichtig voor onze klanten. »', en: '"Billing is opaque for our clients."' },
    'speos.pp.p9.p': {
      fr: 'Modèles tarifaires complexes. Factures lourdes à décortiquer. Friction au moment du renew, perte de confiance.',
      nl: 'Complexe tariefmodellen. Zware facturen om te ontleden. Wrijving bij vernieuwing, vertrouwensverlies.',
      en: 'Complex pricing models. Heavy invoices to untangle. Friction at renewal, loss of trust.'
    },
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
    'speos.prototype.cyclePhase2': {
      fr: '<strong>5 livrables MVP sur 11 opportunités identifiées</strong> · les 6 autres (notamment <strong>Market Expansion</strong> internationale et <strong>Marketplace API</strong> Integrators) sont scopées <strong>MVP++ phase 2</strong>, après validation du host one-stop.',
      nl: '<strong>5 MVP-livrables op 11 geïdentificeerde opportuniteiten</strong> · de 6 andere (met name <strong>Market Expansion</strong> internationaal en <strong>Marketplace API</strong> Integrators) zijn gescoped <strong>MVP++ fase 2</strong>, na validatie van de one-stop host.',
      en: '<strong>5 MVP deliverables out of 11 identified opportunities</strong> · the 6 others (notably <strong>Market Expansion</strong> international and <strong>Marketplace API</strong> Integrators) are scoped <strong>MVP++ phase 2</strong>, after one-stop host validation.'
    },
    'speos.prototype.directionEyebrow': { fr: 'Phase 03 · Develop · 2 directions explorées', nl: 'Fase 03 · Develop · 2 verkende richtingen', en: 'Phase 03 · Develop · 2 directions explored' },
    'speos.prototype.directionLead': {
      fr: 'À la sortie des ateliers Customer Journey, deux pistes étaient sur la table. À gauche, conserver chaque produit dans son silo (easy2mail, built2mail, e-Invoicing, archive eIDAS, support) avec son propre login et son propre back-office. Solution rapide à livrer mais qui reproduit la fragmentation que les clients eux-mêmes pointaient. À droite, un host one-stop, avec un onboarding piloté par persona et par typologie de besoin, et des capacités API-isées en dessous. C\'est la deuxième direction qui a été retenue, validée par le sponsor, puis testée chez 6 clients pilotes. <strong>La direction silo aurait livré en 6 mois. La direction one-stop a doublé le temps de dev.</strong> Le sponsor a accepté le coût parce que le <strong class="accent">pricing tiered ouvre le segment PME laissé aux concurrents</strong>.',
      nl: 'Uit de Customer Journey workshops kwamen twee pistes op tafel. Links, elk product in zijn silo houden (easy2mail, built2mail, e-Invoicing, archive eIDAS, support), met eigen login en eigen back-office. Snelle oplevering, maar die reproduceert de fragmentatie die de klanten zelf aanwezen. Rechts, een one-stop host, met onboarding gestuurd per persona en per noodtype, en API-iseerbare capaciteiten daaronder. De tweede richting werd weerhouden, gevalideerd door de sponsor, daarna getest bij 6 pilootklanten. <strong>De silo-richting had in 6 maanden geleverd. De one-stop richting heeft de ontwikkelingstijd verdubbeld.</strong> De sponsor accepteerde de kost omdat de <strong class="accent">tiered pricing het kmo-segment opent dat aan de concurrenten was overgelaten</strong>.',
      en: 'Out of the Customer Journey workshops, two paths were on the table. On the left, keep each product in its silo (easy2mail, built2mail, e-Invoicing, eIDAS archive, support) with its own login and own back-office. Fast to ship, but it reproduces the fragmentation the clients were pointing at. On the right, a one-stop host, with onboarding driven by persona and need typology, and API-ised capabilities underneath. The second direction was retained, validated by the sponsor, then tested with 6 pilot clients. <strong>The silo direction would have shipped in 6 months. The one-stop direction doubled the dev time.</strong> The sponsor accepted the cost because the <strong class="accent">tiered pricing opens the SME segment left to the competitors</strong>.'
    },
    'speos.prototype.directionSource': {
      fr: 'Source · Speos Concept Report 2024 · synthèse Discovery + ateliers cocréation, validée par CEO et CTO avant prototyping',
      nl: 'Bron · Speos Concept Report 2024 · synthese Discovery + co-creatie workshops, gevalideerd door CEO en CTO voor prototyping',
      en: 'Source · Speos Concept Report 2024 · synthesis Discovery + co-creation workshops, validated by CEO and CTO before prototyping'
    },
    'speos.prototype.directionTitle': {
      fr: 'Deux directions explorées. <span class="accent">Une retenue.</span>',
      nl: 'Twee richtingen verkend. <span class="accent">Eén weerhouden.</span>',
      en: 'Two directions explored. <span class="accent">One retained.</span>'
    },
    'speos.prototype.overviewEyebrow': { fr: 'Phase 03 · Develop · 5 Value Props priorisées MVP', nl: 'Fase 03 · Develop · 5 Value Props geprioriteerd MVP', en: 'Phase 03 · Develop · 5 Value Props prioritised MVP' },
    'speos.prototype.overviewLead': {
      fr: 'Le pipeline canonique SPEOS : ingest → compose & enrich → distribute → archive. Sur ce squelette, les 12 entretiens experts internes et les 6 clients pilotes ont fait émerger cinq Value Props prioritaires. Chacune adresse une étape précise du cycle de vie client. Onboarding · Monitoring · Reports & Archives · Billing · Support. Une plateforme, cinq promesses cohérentes.',
      nl: 'De canonieke SPEOS pipeline: ingest → compose & enrich → distribute → archive. Op dat skelet brachten de 12 interne expertinterviews en de 6 pilootklanten vijf prioritaire Value Props naar boven. Elk adresseert een precieze stap van de klantlevenscyclus. Onboarding · Monitoring · Reports & Archives · Billing · Support. Eén platform, vijf coherente beloftes.',
      en: 'The canonical SPEOS pipeline: ingest → compose & enrich → distribute → archive. On that skeleton, the 12 internal expert interviews and the 6 pilot clients surfaced five priority Value Props. Each addresses a precise step in the client lifecycle. Onboarding · Monitoring · Reports & Archives · Billing · Support. One platform, five coherent promises.'
    },
    'speos.prototype.overviewSource': {
      fr: 'Source · Speos Concept Report 2024 · 5 VP cartographiées sur le pipeline ingest → compose → distribute → archive (Roadmap p17)',
      nl: 'Bron · Speos Concept Report 2024 · 5 VP in kaart op de pipeline ingest → compose → distribute → archive (Roadmap p17)',
      en: 'Source · Speos Concept Report 2024 · 5 VPs mapped on the ingest → compose → distribute → archive pipeline (Roadmap p17)'
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
      fr: 'Le Concept Report est testé en présentation structurée chez 6 clients couvrant les 3 segments marché : Large Accounts (Build-to-Mail), PMEs (Easy2Mail), Integrators / Resellers. Les six valident la direction one-stop. <strong>L\'un d\'entre eux est Luminus.</strong> Référence energy belge qui sécurise le retour sponsor : la plateforme est rassurante avant même le développement.',
      nl: 'Het Concept Report wordt in een gestructureerde presentatie getest bij 6 klanten die de 3 marktsegmenten dekken: Large Accounts (Build-to-Mail), KMO (Easy2Mail), Integrators / Resellers. De zes valideren de one-stop richting. <strong>Eén ervan is Luminus</strong>, een Belgische energiereferentie die het sponsorvertrouwen veilig stelt: het platform is geruststellend nog voor de ontwikkeling.',
      en: 'The Concept Report is tested in a structured presentation with 6 clients covering the 3 market segments: Large Accounts (Build-to-Mail), SMEs (Easy2Mail), Integrators / Resellers. The six validate the one-stop direction. <strong>One of them is Luminus</strong>, a Belgian energy reference that secures the sponsor signal: the platform is reassuring even before development.'
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
    'speos.prototype.utSource': {
      fr: 'Tests menés en présentation directe et co-design chez les 6 clients pilotes · 3 segments couvrant Build-to-Mail, Easy2Mail et Integrators · Speos Concept Report 2024',
      nl: 'Tests via directe presentatie en co-design bij de 6 pilootklanten · 3 segmenten Build-to-Mail, Easy2Mail en Integrators · Speos Concept Report 2024',
      en: 'Tests run in direct presentation and co-design with the 6 pilot clients · 3 segments covering Build-to-Mail, Easy2Mail and Integrators · Speos Concept Report 2024'
    },
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
    'speos.prototype.vp4Statement': {
      fr: '<span class="vp-statement__lab">Value Proposition Billing · verbatim Concept Report</span>\n          <p>Notre <strong>billing</strong> aide les mêmes équipes en délivrant un accès centralisé aux rapports structurés, preuves légales et archives d\'usage, réduisant le travail manuel et les processus error-prone.</p>',
      nl: '<span class="vp-statement__lab">Value Proposition Billing · verbatim Concept Report</span>\n          <p>Onze <strong>billing</strong> helpt dezelfde teams door centrale toegang te bieden tot gestructureerde rapporten, juridische bewijzen en gebruiksarchieven, en verkleint manueel werk en foutgevoelige processen.</p>',
      en: '<span class="vp-statement__lab">Value Proposition Billing · verbatim Concept Report</span>\n          <p>Our <strong>billing</strong> helps the same teams by providing centralised access to structured reports, legal proofs and usage archives, reducing manual work and error-prone processes.</p>'
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
    'speos.research.benchSource': {
      fr: 'Source · SPEOS Concept Report · pages 7-8 · 3 segments marché · 2024-2025. Concurrents observés en parallèle : Easypost, Doccle, plateformes de digital mail européennes.',
      nl: 'Bron · SPEOS Concept Report · pagina\'s 7-8 · 3 marktsegmenten · 2024-2025. Concurrenten parallel geobserveerd: Easypost, Doccle, Europese digital mail platformen.',
      en: 'Source · SPEOS Concept Report · pages 7-8 · 3 market segments · 2024-2025. Competitors observed in parallel: Easypost, Doccle, European digital mail platforms.'
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
      fr: '12 entretiens experts internes <span class="brief-teaser__sep">·</span> 6 archétypes fonctionnels couverts <span class="brief-teaser__sep">·</span> Direction, IT, Operations, Customer Service, Production, Sales, Marketing <span class="brief-teaser__sep">·</span> menés sur les premières semaines de mission.',
      nl: '12 interne expertinterviews <span class="brief-teaser__sep">·</span> 6 functionele archetypes gedekt <span class="brief-teaser__sep">·</span> Directie, IT, Operations, Customer Service, Production, Sales, Marketing <span class="brief-teaser__sep">·</span> gevoerd in de eerste weken van de opdracht.',
      en: '12 internal expert interviews <span class="brief-teaser__sep">·</span> 6 functional archetypes covered <span class="brief-teaser__sep">·</span> Management, IT, Operations, Customer Service, Production, Sales, Marketing <span class="brief-teaser__sep">·</span> conducted in the first weeks of the mission.'
    },
    'speos.research.itLead': {
      fr: 'Direction, IT, opérations, experts métier 20+ ans d\'ancienneté. Objectif · comprendre l\'organisation telle qu\'elle est, le métier postal-mailing tel qu\'il se pratique au quotidien, et ce que chaque rôle attend d\'une plateforme unifiée. Pas pour vendre la méthode. Pour la fonder sur le terrain.',
      nl: 'Directie, IT, operations, domeinexperts met 20+ jaar anciënniteit. Doel · de organisatie begrijpen zoals ze is, het postale mailing-vak zoals het dagelijks wordt beoefend, en wat elke rol verwacht van een verenigd platform. Niet om de methode te verkopen. Om haar op het terrein te funderen.',
      en: 'Management, IT, operations, domain experts with 20+ years of seniority. Goal · understand the organisation as it is, the postal-mailing trade as practised daily, and what each role expects from a unified platform. Not to sell the method. To ground it on the field.'
    },
    'speos.research.itSource': {
      fr: '12 expert interviews internes · CEO, CTO, Operations Director, ICT Operational Manager, Customer Service Manager, Production Manager, Marketing Director, Sales Director, Key Account Manager, IT Product Owner, IT Quality Assurance · noms cités dans le Concept Report (Vanhaeren, Damsin, Ide, Diederich, Roelands, Delcourt, D\'hooge, Germonpré, Tran…) · 2024',
      nl: '12 interne expertinterviews · CEO, CTO, Operations Director, ICT Operational Manager, Customer Service Manager, Production Manager, Marketing Director, Sales Director, Key Account Manager, IT Product Owner, IT Quality Assurance · namen geciteerd in het Concept Report (Vanhaeren, Damsin, Ide, Diederich, Roelands, Delcourt, D\'hooge, Germonpré, Tran…) · 2024',
      en: '12 internal expert interviews · CEO, CTO, Operations Director, ICT Operational Manager, Customer Service Manager, Production Manager, Marketing Director, Sales Director, Key Account Manager, IT Product Owner, IT Quality Assurance · names cited in the Concept Report (Vanhaeren, Damsin, Ide, Diederich, Roelands, Delcourt, D\'hooge, Germonpré, Tran…) · 2024'
    },
    'speos.research.itTitle': {
      fr: 'Première étape · <span class="accent">écouter ceux qui font tourner SPEOS.</span>',
      nl: 'Eerste stap · <span class="accent">luisteren naar wie SPEOS draaiende houdt.</span>',
      en: 'First step · <span class="accent">listen to those who run SPEOS.</span>'
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
      fr: 'Issues des 12 entretiens experts internes et des 10 personas testés terrain. Synthétisés en 8 archétypes dans le Concept Report. La carte qui a servi de boussole pour prioriser le MVP : à qui on parle, à quel moment du cycle, et avec quel ton.',
      nl: 'Voortgekomen uit de 12 interne expertinterviews en de 10 op het terrein geteste persona\'s. Gesynthetiseerd in 8 archetypes in het Concept Report. De kaart die als kompas diende om het MVP te prioriteren: tegen wie spreken we, op welk moment in de cyclus, met welke toon.',
      en: 'Drawn from the 12 internal expert interviews and the 10 field-tested personas. Synthesised into 8 archetypes in the Concept Report. The map that served as compass to prioritise the MVP: who we talk to, at what moment in the cycle, and with what tone.'
    },
    'speos.research.persoSource': {
      fr: 'Source · Speos Concept Report 2024 · 8 archétypes « Potential Personas » synthétisés sur 12 entretiens experts internes + 10 personas testés terrain.',
      nl: 'Bron · Speos Concept Report 2024 · 8 archetypes « Potential Personas » gesynthetiseerd uit 12 interne expertinterviews + 10 op het terrein geteste persona\'s.',
      en: 'Source · Speos Concept Report 2024 · 8 "Potential Personas" archetypes synthesised from 12 internal expert interviews + 10 field-tested personas.'
    },
    'speos.research.persoTitle': {
      fr: '12 experts. 10 personas testés terrain. <span class="accent">8 archétypes synthétisés.</span>',
      nl: '12 experts. 10 op het terrein geteste persona\'s. <span class="accent">8 gesynthetiseerde archetypes.</span>',
      en: '12 experts. 10 field-tested personas. <span class="accent">8 synthesised archetypes.</span>'
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
    'speos.snm.p2a': { fr: 'Segment 01 · Large Accounts (Build-to-Mail)', nl: 'Segment 01 · Large Accounts (Build-to-Mail)', en: 'Segment 01 · Large Accounts (Build-to-Mail)' },
    'speos.snm.p2b': { fr: 'Segment 02 · PMEs (Easy2Mail)', nl: 'Segment 02 · KMO (Easy2Mail)', en: 'Segment 02 · SMEs (Easy2Mail)' },
    'speos.snm.p2c': { fr: 'Segment 03 · Integrators (API)', nl: 'Segment 03 · Integrators (API)', en: 'Segment 03 · Integrators (API)' },
    'speos.snm.p2d': { fr: 'Multicanal print → digital', nl: 'Multichannel print → digital', en: 'Multichannel print → digital' },
    'speos.snm.p2home': { fr: 'Onboarding piloté objectif + persona', nl: 'Onboarding gestuurd doel + persona', en: 'Onboarding driven goal + persona' },
    'speos.snm.p4': { fr: 'User test 6 clients dont Luminus · go prod', nl: 'User test 6 klanten waaronder Luminus · go prod', en: 'User test 6 clients including Luminus · go prod' },
    'speos.snm.pChap': { fr: 'Phase 04 · Prototype · ouverture validation', nl: 'Fase 04 · Prototype · opening validatie', en: 'Phase 04 · Prototype · validation opening' },
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
      fr: 'Avant la VP, chaque rôle défendait sa lecture. Project Owners voulaient des features vendables. Project Managers voulaient une stack maintenable. Les clients juxtaposaient cinq logins. Après, une phrase tient debout : <strong>un host orchestré, des personas reconnus, dix douleurs traduites en cinq livrables MVP, six de plus en MVP++</strong>. C\'est cette VP qui rend l\'Ideation légitime.',
      nl: 'Vóór de VP verdedigde elke rol zijn lezing. Project Owners wilden verkoopbare features. Project Managers wilden een onderhoudbare stack. De klanten jongleerden met vijf logins. Daarna staat één zin overeind: <strong>een georchestreerde host, herkende persona\'s, tien pijnen vertaald in vijf MVP-livrables, zes meer in MVP++</strong>. Het is die VP die de Ideation legitiem maakt.',
      en: 'Before the VP, each role defended its reading. Project Owners wanted sellable features. Project Managers wanted a maintainable stack. Clients juggled five logins. After, one sentence stands: <strong>an orchestrated host, recognised personas, ten pains translated into five MVP deliverables, six more in MVP++</strong>. That VP is what makes Ideation legitimate.'
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
      fr: 'À la sortie de cette VP, <strong>Project Owners (Business), Project Managers (IT), Operations et Sales</strong> partagent la même phrase, les mêmes deux personas, la même traduction des dix douleurs en cinq livrables MVP. C\'est ce <span class="accent">socle commun</span> qui rend l\'Ideation légitime. On n\'arbitre plus sur le « quoi », on arbitre sur le « quand » et le « comment ».',
      nl: 'Aan het einde van deze VP delen <strong>Project Owners (Business), Project Managers (IT), Operations en Sales</strong> dezelfde zin, dezelfde twee persona\'s, dezelfde vertaling van tien pijnen in vijf MVP-livrables. Het is die <span class="accent">gemeenschappelijke basis</span> die de Ideation legitiem maakt. Men arbitreert niet meer over het « wat », men arbitreert over het « wanneer » en het « hoe ».',
      en: 'At the exit of this VP, <strong>Project Owners (Business), Project Managers (IT), Operations and Sales</strong> share the same sentence, the same two personas, the same translation of ten pains into five MVP deliverables. It is that <span class="accent">shared foundation</span> that makes Ideation legitimate. No more arbitration on the "what", arbitration on the "when" and "how".'
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
    'speos.research.deepdiveLead': {
      fr: 'Synthétiser huit archétypes est un acte d\'arbitrage. Pour ne pas perdre la voix, je garde deux personas en deep-dive, qui incarnent les archétypes #1 IT & Operations Manager et #3 Production Coordinator vus chez les grands comptes Énergie. Mêmes horaires, mêmes anxiétés, mêmes phrases dans la salle.',
      nl: 'Acht archetypes synthetiseren is een arbitrage-act. Om de stem niet te verliezen, hou ik twee persona\'s in deep-dive, die de archetypes #1 IT & Operations Manager en #3 Production Coordinator belichamen zoals waargenomen bij de grote Energie-accounts. Zelfde uren, zelfde angsten, zelfde zinnen in de zaal.',
      en: 'Synthesising eight archetypes is an act of arbitration. To not lose the voice, I keep two personas in deep-dive, embodying archetypes #1 IT & Operations Manager and #3 Production Coordinator observed in large Energy accounts. Same hours, same anxieties, same sentences in the room.'
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
    'speos.research.deepdiveP1Src': { fr: 'Profil composite · 12 entretiens experts internes + 10 personas testés terrain · 2024-2025', nl: 'Samengesteld profiel · 12 interne expertinterviews + 10 op het terrein geteste persona\'s · 2024-2025', en: 'Composite profile · 12 internal expert interviews + 10 field-tested personas · 2024-2025' },
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
    'speos.research.deepdiveP2Src': { fr: 'Profil composite · 12 entretiens experts internes + 10 personas testés terrain · 2024-2025', nl: 'Samengesteld profiel · 12 interne expertinterviews + 10 op het terrein geteste persona\'s · 2024-2025', en: 'Composite profile · 12 internal expert interviews + 10 field-tested personas · 2024-2025' },
    'speos.research.deepdiveSource': { fr: 'Source · personna_speos.docx · Speos research 2024-2025 · 2 personas en deep-dive sur 10 testés terrain · 8 archétypes synthétisés dans le Concept Report.', nl: 'Bron · personna_speos.docx · Speos research 2024-2025 · 2 persona\'s in deep-dive op 10 op het terrein geteste · 8 gesynthetiseerde archetypes in het Concept Report.', en: 'Source · personna_speos.docx · Speos research 2024-2025 · 2 personas in deep-dive on 10 field-tested · 8 synthesised archetypes in the Concept Report.' },

    /* 11 Opportunities for Innovation */
    'speos.analyse.oppEyebrow': { fr: 'Phase 02 · Define · 11 opportunités', nl: 'Fase 02 · Define · 11 opportuniteiten', en: 'Phase 02 · Define · 11 opportunities' },
    'speos.analyse.oppTitle': {
      fr: 'Des douleurs <span class="accent">aux chances.</span>',
      nl: 'Van pijnen <span class="accent">naar kansen.</span>',
      en: 'From pains <span class="accent">to chances.</span>'
    },
    'speos.analyse.oppLead': {
      fr: 'Le passage des dix pain points aux <strong>onze opportunités</strong> est l\'arbitrage clé de la phase Analyse. Pas de raccourci : chaque douleur a été reformulée en chance d\'innover, sourcée verbatim dans le Concept Report. Ces onze pistes ne sont pas toutes scopées MVP. Cinq deviendront des Value Props livrables, six seront placées en MVP++ phase 2.',
      nl: 'De overgang van de tien pain points naar de <strong>elf opportuniteiten</strong> is de sleutelarbitrage van de Analysefase. Geen kortere weg: elke pijn werd geherformuleerd als innovatiekans, verbatim gesourced in het Concept Report. Deze elf sporen zijn niet allemaal MVP-scoped. Vijf worden geleverde Value Props, zes worden geplaatst in MVP++ fase 2.',
      en: 'The shift from the ten pain points to the <strong>eleven opportunities</strong> is the key arbitration of the Analysis phase. No shortcut: each pain was reformulated as a chance to innovate, sourced verbatim from the Concept Report. These eleven tracks are not all MVP-scoped. Five become delivered Value Props, six are placed in MVP++ phase 2.'
    },
    'speos.analyse.opp1Name': { fr: 'Enhanced Customer Experience', nl: 'Enhanced Customer Experience', en: 'Enhanced Customer Experience' },
    'speos.analyse.opp1Desc': { fr: 'Self-service, real-time tracking, personalized dashboards par segment.', nl: 'Self-service, real-time tracking, personalized dashboards per segment.', en: 'Self-service, real-time tracking, personalized dashboards per segment.' },
    'speos.analyse.opp2Name': { fr: 'Automation &amp; Scalability', nl: 'Automation &amp; Scalability', en: 'Automation &amp; Scalability' },
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
    'speos.analyse.oppSource': { fr: 'Source · Speos Concept Report 2024 · « 11 Opportunities for Innovation » verbatim · synthèse des 12 expert interviews internes + 6 customer interviews.', nl: 'Bron · Speos Concept Report 2024 · « 11 Opportunities for Innovation » verbatim · synthese van 12 interne expertinterviews + 6 klanteninterviews.', en: 'Source · Speos Concept Report 2024 · "11 Opportunities for Innovation" verbatim · synthesis of 12 internal expert interviews + 6 customer interviews.' },

    /* Classic vs Best Practice tableau */
    'speos.method.compEyebrow': { fr: 'Le pitch initial · pourquoi un département UX', nl: 'De initiële pitch · waarom een UX-afdeling', en: 'The initial pitch · why a UX department' },
    'speos.method.compTitle': { fr: 'Classic <span class="accent">vs Best Practice.</span>', nl: 'Classic <span class="accent">vs Best Practice.</span>', en: 'Classic <span class="accent">vs Best Practice.</span>' },
    'speos.method.compLead': {
      fr: 'Le pitch que j\'ai porté à l\'arrivée pour justifier la mission : montrer comment les grands comptes belges (banking, energy, telecoms) ont structuré leur fonction UX, et où SPEOS se trouvait sur cette ligne. Trois rôles. Deux modes d\'organisation. Un choix d\'architecture.',
      nl: 'De pitch die ik bij aankomst heb gevoerd om de missie te verantwoorden: tonen hoe de grote Belgische accounts (banking, energy, telecoms) hun UX-functie hebben gestructureerd, en waar SPEOS zich op die lijn bevond. Drie rollen. Twee organisatiewijzen. Eén architectuurkeuze.',
      en: 'The pitch I carried on arrival to justify the mission: show how large Belgian accounts (banking, energy, telecoms) structured their UX function, and where SPEOS stood on that line. Three roles. Two organisation modes. One architectural choice.'
    },
    'speos.method.comp.colDim': { fr: 'Dimension', nl: 'Dimensie', en: 'Dimension' },
    'speos.method.comp.colClassic': { fr: 'Classic approach', nl: 'Classic approach', en: 'Classic approach' },
    'speos.method.comp.colBest': { fr: 'Best Practice (grands comptes belges · banking, energy, telecoms)', nl: 'Best Practice (grote Belgische accounts · banking, energy, telecoms)', en: 'Best Practice (large Belgian accounts · banking, energy, telecoms)' },
    'speos.method.comp.r1Dim': { fr: '<strong>Business (ROI)</strong>', nl: '<strong>Business (ROI)</strong>', en: '<strong>Business (ROI)</strong>' },
    'speos.method.comp.r1Classic': { fr: 'Define needs.', nl: 'Define needs.', en: 'Define needs.' },
    'speos.method.comp.r1Best': { fr: 'Work with UX to define expectations.', nl: 'Werkt met UX om verwachtingen te definiëren.', en: 'Work with UX to define expectations.' },
    'speos.method.comp.r2Dim': { fr: '<strong>IT (Technology)</strong>', nl: '<strong>IT (Technology)</strong>', en: '<strong>IT (Technology)</strong>' },
    'speos.method.comp.r2Classic': { fr: 'Implements solutions.', nl: 'Implementeert oplossingen.', en: 'Implements solutions.' },
    'speos.method.comp.r2Best': { fr: 'Focus on architecture &amp; delivery.', nl: 'Focus op architectuur &amp; delivery.', en: 'Focus on architecture &amp; delivery.' },
    'speos.method.comp.r3Dim': { fr: '<strong>UX (Users)</strong>', nl: '<strong>UX (Users)</strong>', en: '<strong>UX (Users)</strong>' },
    'speos.method.comp.r3Classic': { fr: 'Rare or integrated into IT.', nl: 'Zeldzaam of in IT geïntegreerd.', en: 'Rare or integrated into IT.' },
    'speos.method.comp.r3Best': { fr: '<strong>Dedicated, cross-functional, strategic department.</strong>', nl: '<strong>Toegewijde, cross-functionele, strategische afdeling.</strong>', en: '<strong>Dedicated, cross-functional, strategic department.</strong>' },
    'speos.method.compNote': {
      fr: 'Le pattern Best Practice est <strong>déployé depuis 15+ ans</strong> aux États-Unis (Amazon, IBM, Capital One) et <strong>10+ ans</strong> en Europe dans les secteurs complexes (banking, energy, telecoms). À l\'arrivée chez SPEOS, je ne réinventais rien : je transposais un pattern industrialisé.',
      nl: 'Het Best Practice-patroon is <strong>al 15+ jaar uitgerold</strong> in de Verenigde Staten (Amazon, IBM, Capital One) en <strong>10+ jaar</strong> in Europa in complexe sectoren (banking, energy, telecoms). Bij aankomst bij SPEOS herontdekte ik niets: ik transponeerde een geïndustrialiseerd patroon.',
      en: 'The Best Practice pattern has been <strong>deployed for 15+ years</strong> in the United States (Amazon, IBM, Capital One) and <strong>10+ years</strong> in Europe in complex sectors (banking, energy, telecoms). On arrival at SPEOS, I was not reinventing anything: I was transposing an industrialised pattern.'
    },
    'speos.method.compSource': { fr: 'Source · pitch méthodologique CVE porté à l\'interne SPEOS · 2024.', nl: 'Bron · methodologische pitch CVE gevoerd intern bij SPEOS · 2024.', en: 'Source · CVE methodological pitch carried internally at SPEOS · 2024.' },

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
