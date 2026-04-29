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
    'nav.brand': { fr: 'Christophe van Engelen', nl: 'Christophe van Engelen', en: 'Christophe van Engelen' },
    'nav.role': { fr: 'Service Designer · Freelance', nl: 'Service Designer · Freelance', en: 'Service Designer · Freelance' },
    'nav.cases': { fr: 'Études de cas', nl: 'Case studies', en: 'Case studies' },
    'nav.back': { fr: '← Retour au portfolio', nl: '← Terug naar portfolio', en: '← Back to portfolio' },
    'nav.backCase': { fr: '← Retour au case BNP', nl: '← Terug naar BNP-case', en: '← Back to BNP case' },
    'nav.luminusPill': { fr: 'Pitch Luminus', nl: 'Luminus-pitch', en: 'Luminus pitch' },

    'footer.thanks': { fr: 'Merci.', nl: 'Dank u.', en: 'Thank you.' },
    'footer.lookForward': { fr: 'Au plaisir de la conversation.', nl: 'Ik kijk uit naar het gesprek.', en: 'I look forward to the conversation.' },
    'footer.contact': { fr: 'Contact', nl: 'Contact', en: 'Contact' },
    'footer.for': { fr: 'Pour', nl: 'Voor', en: 'For' },
    'footer.forCompany': { fr: 'Luminus', nl: 'Luminus', en: 'Luminus' },
    'footer.forSubtitle': { fr: 'Entretien Service Designer', nl: 'Sollicitatiegesprek Service Designer', en: 'Service Designer interview' },
    'footer.forDate': { fr: 'Avril / Mai 2026', nl: 'April / Mei 2026', en: 'April / May 2026' },
    'footer.copy': {
      fr: '© Christophe van Engelen, 2026. Artefacts originaux © BNP Paribas Fortis 2017–2018, repris ici pour illustration de portfolio.',
      nl: '© Christophe van Engelen, 2026. Originele artefacten © BNP Paribas Fortis 2017–2018, hier gebruikt ter illustratie van portfolio.',
      en: '© Christophe van Engelen, 2026. Original artefacts © BNP Paribas Fortis 2017–2018, used here for portfolio illustration.'
    },

    /* ============== PORTFOLIO INDEX ============== */
    'home.title': {
      fr: 'Christophe van Engelen, Service Designer freelance à Bruxelles',
      nl: 'Christophe van Engelen, freelance Service Designer in Brussel',
      en: 'Christophe van Engelen, freelance Service Designer in Brussels'
    },
    'home.metaDesc': {
      fr: 'Service Designer freelance basé à Bruxelles. Études de cas en service design stratégique, monétisation de la donnée, alignement multi-acteurs.',
      nl: 'Freelance Service Designer in Brussel. Case studies in strategisch service design, datamonetisatie, multi-stakeholder alignering.',
      en: 'Freelance Service Designer based in Brussels. Case studies in strategic service design, data monetization, multi-stakeholder alignment.'
    },
    'home.eyebrow': { fr: 'Portfolio · Service Design', nl: 'Portfolio · Service Design', en: 'Portfolio · Service Design' },
    'home.h1': {
      fr: 'Le service design qui<br><span class="alt">décide.</span>',
      nl: 'Service design dat<br><span class="alt">beslist.</span>',
      en: 'Service design that<br><span class="alt">decides.</span>'
    },
    'home.lead': {
      fr: 'Je suis Christophe van Engelen, Service Designer freelance à Bruxelles. Je travaille en amont. Là où une donnée brute, un objectif business ou une asymétrie stratégique se transforme en service que quelqu\'un veut payer. Voici un cas qui résume cette approche.',
      nl: 'Ik ben Christophe van Engelen, freelance Service Designer in Brussel. Ik werk upstream. Daar waar ruwe data, een businessdoel of een strategische asymmetrie omgezet wordt in een dienst waar iemand voor wil betalen. Hieronder een case die deze aanpak samenvat.',
      en: 'I\'m Christophe van Engelen, a freelance Service Designer in Brussels. I work upstream. Where raw data, a business goal or a strategic asymmetry get turned into a service someone wants to pay for. One case that sums up that approach is below.'
    },
    'home.casesEyebrow': { fr: 'Travaux sélectionnés', nl: 'Geselecteerd werk', en: 'Selected work' },
    'home.casesH2': {
      fr: 'Une étude de cas qui a fait <span class="accent">décider quelque chose.</span>',
      nl: 'Een case study die <span class="accent">iets heeft beslist.</span>',
      en: 'A case study that <span class="accent">decided something.</span>'
    },
    'home.casesIntro': {
      fr: 'Cliquez la carte pour ouvrir l\'étude. Pour Luminus, j\'ai aussi écrit ma manière d\'aborder les 90 premiers jours du rôle, accessible depuis la navigation.',
      nl: 'Klik op de kaart om de case te openen. Voor Luminus schreef ik ook mijn aanpak voor de eerste 90 dagen van de rol, te vinden in de navigatie.',
      en: 'Click the card to open the case. For Luminus, I also wrote how I would approach the first 90 days of the role, available from the navigation.'
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
    'case.bnp.title': { fr: 'Enterprise Intelligence', nl: 'Enterprise Intelligence', en: 'Enterprise Intelligence' },
    'case.bnp.subtitle': {
      fr: 'Comment j\'ai transformé la donnée transactionnelle d\'une banque en service que les PME acceptent de payer.',
      nl: 'Hoe ik transactiedata van een bank omzette in een dienst waar kmo\'s voor willen betalen.',
      en: 'How I turned a bank\'s transactional data into a service SMEs would actually pay for.'
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
      fr: 'Étude de cas Service Design · BNP Paribas Fortis · 2018 – 2019',
      nl: 'Service Design Case Study · BNP Paribas Fortis · 2018 – 2019',
      en: 'Service Design Case Study · BNP Paribas Fortis · 2018 – 2019'
    },
    'bnp.hero.h1.start': { fr: 'Enterprise', nl: 'Enterprise', en: 'Enterprise' },
    'bnp.hero.h1.alt': { fr: 'Intelligence.', nl: 'Intelligence.', en: 'Intelligence.' },
    'bnp.hero.lead': {
      fr: 'Une banque assise sur 30% des flux carte du pays voulait vendre quelque chose à ses propres clients PME. J\'ai transformé cette asymétrie de données en service que les commerçants acceptent de payer. De la découverte au concept MVP, jusqu\'à un signal d\'achat concret de Léonidas.',
      nl: 'Een bank zat op 30% van alle kaarttransacties van het land en wilde haar eigen kmo-klanten iets verkopen. Ik zette die data-asymmetrie om in een dienst waar merchants voor willen betalen. Van discovery naar MVP-concept, tot een concreet koopsignaal van Léonidas.',
      en: 'A bank that saw 30% of all card flows in the country wanted to sell something to its own SME clients. I turned that data asymmetry into a service merchants would actually pay for. From discovery to MVP concept, to a concrete buying signal from Léonidas.'
    },
    'bnp.hero.metaRole': { fr: 'Service Designer · Freelance', nl: 'Service Designer · Freelance', en: 'Service Designer · Freelance' },
    'bnp.hero.metaWhere': {
      fr: '12 mois · cadrage stratégique upstream',
      nl: '12 maanden · upstream strategisch kaderwerk',
      en: '12 months · upstream strategic framing'
    },
    'bnp.hero.location': { fr: 'Bruxelles', nl: 'Brussel', en: 'Brussels' },
    'bnp.hero.cap': { fr: 'Vision canal · Concept Report · Slide 02', nl: 'Kanaalvisie · Concept Report · Slide 02', en: 'Channel vision · Concept Report · Slide 02' },

    /* ============== CHAPTER DIVIDERS (NEW — cinematic 3-act structure) ============== */
    'bnp.chap1.label': { fr: 'Acte I', nl: 'Akte I', en: 'Act I' },
    'bnp.chap1.title': { fr: 'Le problème.', nl: 'Het probleem.', en: 'The problem.' },
    'bnp.chap1.lead': {
      fr: 'Une asymétrie stratégique. La banque voyait, les PME ignoraient.',
      nl: 'Een strategische asymmetrie. De bank zag, de kmo\'s wisten niet.',
      en: 'A strategic asymmetry. The bank saw, the SMEs were blind.'
    },
    'bnp.chap2.label': { fr: 'Acte II', nl: 'Akte II', en: 'Act II' },
    'bnp.chap2.title': { fr: 'L\'action.', nl: 'De actie.', en: 'The move.' },
    'bnp.chap2.lead': {
      fr: 'Cadrer un service, pas une feature. Six mouvements, un Triple-Win.',
      nl: 'Een dienst kaderen, geen feature. Zes bewegingen, één Triple-Win.',
      en: 'Frame a service, not a feature. Six moves, one Triple-Win.'
    },
    'bnp.chap3.label': { fr: 'Acte III', nl: 'Akte III', en: 'Act III' },
    'bnp.chap3.title': { fr: 'L\'épreuve du marché.', nl: 'De markttoets.', en: 'The market test.' },
    'bnp.chap3.lead': {
      fr: 'Le concept est de-risked. Mais est-ce qu\'un vrai client paierait pour ça ?',
      nl: 'Het concept is gederisicood. Maar zou een echte klant er voor betalen ?',
      en: 'The concept is de-risked. But would a real client actually pay for it ?'
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
    'bnp.brief.title': {
      fr: '30 % des flux ne devenaient<br><span class="accent">jamais une décision.</span>',
      nl: '30 % van de flows werden<br><span class="accent">nooit een beslissing.</span>',
      en: '30% of the flows never<br><span class="accent">became a decision.</span>'
    },
    'bnp.brief.lead1': {
      fr: 'BNP voyait passer chaque semaine des données de cartes consommateurs qui valaient de l\'or pour les commerçants. Personne ne les transformait en service.',
      nl: 'BNP zag elke week consumentenkaart-data passeren die goud waard was voor de winkeliers. Niemand zette ze om in een dienst.',
      en: 'BNP saw consumer-card data go by every week that was gold for merchants. No one turned it into a service.'
    },
    'bnp.brief.lead2': {
      fr: 'Mon mandat : un parcours design thinking pour valider — ou invalider — l\'opportunité B2B, et défendre une recommandation au sponsor exécutif.',
      nl: 'Mijn mandaat : een design thinking-traject om de B2B-opportuniteit te valideren — of te invalideren — en een aanbeveling te verdedigen bij de executive sponsor.',
      en: 'My mandate : a design thinking journey to validate — or invalidate — the B2B opportunity, and defend a recommendation to the executive sponsor.'
    },
    'bnp.brief.sizing': {
      fr: '12 mois <span class="dot">·</span> cadrage stratégique upstream <span class="dot">·</span> 4 fonctions internes <span class="dot">·</span> Service Designer freelance',
      nl: '12 maanden <span class="dot">·</span> upstream strategisch kaderwerk <span class="dot">·</span> 4 interne functies <span class="dot">·</span> Service Designer freelance',
      en: '12 months <span class="dot">·</span> upstream strategic framing <span class="dot">·</span> 4 internal functions <span class="dot">·</span> freelance Service Designer'
    },

    'bnp.catalyst.eyebrow': { fr: 'Le catalyseur', nl: 'De aanleiding', en: 'The catalyst' },
    'bnp.catalyst.title': {
      fr: 'Marketing m\'a <span class="accent">appelé.</span>',
      nl: 'Marketing <span class="accent">belde.</span>',
      en: 'Marketing <span class="accent">called.</span>'
    },
    'bnp.catalyst.lead': {
      fr: 'Leur POC partait dans le mur — trop « data exploration », inadapté à la cible. Ils m\'ont fait venir pour valider, ou invalider, l\'opportunité via un parcours design thinking. C\'est par là qu\'a démarré l\'enquête.',
      nl: 'Hun POC ging de verkeerde kant op — te « data exploration », niet aangepast aan de doelgroep. Ze haalden me erbij om de opportuniteit te valideren — of te invalideren — via een design thinking-traject. Daar begon het onderzoek.',
      en: 'Their POC was heading the wrong way — too « data exploration », a mismatch for the target. They brought me in to validate, or invalidate, the opportunity via a design thinking journey. That\'s where the investigation started.'
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
      fr: 'Douze mois entre service design, stratégie business et aide à la décision. Quatre chiffres résument ce qui comptait.',
      nl: 'Twaalf maanden tussen service design, bedrijfsstrategie en beslissingsondersteuning. Vier cijfers vatten samen wat telde.',
      en: 'Twelve months at the intersection of service design, business strategy and decision support. Four numbers sum up what mattered.'
    },
    'bnp.glance.sizing': {
      fr: '12 mois <span class="dot">·</span> 4 fonctions internes <span class="dot">·</span> 6 PME testées <span class="dot">·</span> 1 client pilote',
      nl: '12 maanden <span class="dot">·</span> 4 interne functies <span class="dot">·</span> 6 kmo\'s getest <span class="dot">·</span> 1 pilootklant',
      en: '12 months <span class="dot">·</span> 4 internal functions <span class="dot">·</span> 6 SMEs tested <span class="dot">·</span> 1 pilot client'
    },
    'bnp.glance.s1.label': { fr: 'Flux cartes consommateurs', nl: 'Consumentenkaart-flows', en: 'Consumer card flows' },
    'bnp.glance.s1.desc': {
      fr: 'Visibles par BNP, sans valeur traduite pour les PME.',
      nl: 'Zichtbaar voor BNP, zonder waarde vertaald voor kmo\'s.',
      en: 'BNP saw them. They never reached SME value.'
    },
    'bnp.glance.s2.label': { fr: 'Personas B2B conçus', nl: 'B2B-persona\'s ontworpen', en: 'B2B personas designed' },
    'bnp.glance.s2.desc': {
      fr: 'Des professions libérales aux PME corporate.',
      nl: 'Van vrije beroepen tot corporate kmo\'s.',
      en: 'From liberal professions to corporate SMEs.'
    },
    'bnp.glance.s3.label': { fr: 'Client pilote signé', nl: 'Pilootklant getekend', en: 'Pilot client signed' },
    'bnp.glance.s3.desc': {
      fr: 'Une PME a dit oui. Léonidas Wolluwé.',
      nl: 'Een kmo zei ja. Léonidas Wolluwé.',
      en: 'A real shopkeeper said yes. Léonidas Wolluwé.'
    },
    'bnp.glance.s4.label': { fr: 'PME Corporate Banking', nl: 'Kmo\'s Corporate Banking', en: 'Corporate Banking SMEs' },
    'bnp.glance.s4.desc': {
      fr: 'Population pilote cadrée et dé-risquée pour le MVP.',
      nl: 'Pilotpopulatie afgebakend en gederisicood voor de MVP.',
      en: 'Pilot population scoped and de-risked for the MVP.'
    },

    'bnp.problem.eyebrow': { fr: 'Le Problème · 1 / 3', nl: 'Het Probleem · 1 / 3', en: 'The Problem · 1 of 3' },
    'bnp.problem.h2': {
      fr: 'Quel problème<br>cherchait-on à résoudre ?',
      nl: 'Welk probleem<br>wilden we oplossen?',
      en: 'What problem<br>were we trying to solve?'
    },
    'bnp.problem.p1': {
      fr: 'BNP Paribas Fortis avait une asymétrie stratégique. Comme émetteur de cartes, la banque voyait environ <strong class="accent">30 % de toutes les transactions cartes consommateurs en Belgique</strong>. Côté commerçant (acquiring), elle ne détenait que 7 % du marché. Le board avait fixé une ambition : atteindre 20 % d\'ici 2020.',
      nl: 'BNP Paribas Fortis had een strategische asymmetrie. Als kaartuitgever zag de bank ongeveer <strong class="accent">30 % van alle consumentenkaarttransacties in België</strong>. Aan de merchant- (acquiring-) zijde had ze slechts 7 % marktaandeel. Het bestuur had een ambitie gezet : 20 % halen tegen 2020.',
      en: 'BNP Paribas Fortis had a strategic asymmetry. As a card issuer, the bank saw roughly <strong class="accent">30% of all consumer card transactions in Belgium</strong>. On the merchant (acquiring) side, it held only 7% of the market. The board had set an ambition : reach 20% by 2020.'
    },
    'bnp.problem.p2': {
      fr: 'Pendant ce temps, les PME commerçantes que BNP voulait gagner travaillaient en <strong class="accent">indigence de données</strong>. Aucune vision claire de leurs clients, aucun benchmark contre leurs voisins, aucun insight actionnable. La banque était assise sur une mine d\'or. Les clients en étaient affamés.',
      nl: 'Ondertussen werkten de kmo-merchants die BNP wilde winnen in <strong class="accent">data-armoede</strong>. Geen duidelijk zicht op hun klanten, geen benchmark tegen hun buren, geen actionable inzichten. De bank zat op een goudmijn. De klanten hadden honger.',
      en: 'Meanwhile, the SME merchants BNP wanted to win were operating in <strong class="accent">data poverty</strong>. No clear view of who their customers were. No benchmarking against neighbours. No actionable insight. The bank was sitting on a goldmine. The clients were starving.'
    },
    'bnp.problem.shiftH3': {
      fr: 'Du transactionnel à <span class="accent">l\'insight.</span>',
      nl: 'Van transactioneel naar <span class="accent">insight.</span>',
      en: 'From transactional<br>to <span class="accent">insightful.</span>'
    },
    'bnp.problem.shiftP1': {
      fr: 'Le cadrage était simple, le chemin moins. Transformer la donnée brute en couche de <em>conseil personnalisé</em> qu\'un commerçant accepterait de payer en abonnement. Sans casser le RGPD. Sans casser la confiance. Sans devenir un dashboard glorifié que personne n\'ouvre deux fois.',
      nl: 'De framing was simpel, het pad minder. Ruwe data omzetten in een laag <em>gepersonaliseerd advies</em> waarvoor een merchant een abonnement zou willen betalen. Zonder GDPR te breken. Zonder vertrouwen te breken. Zonder een opgeklopt dashboard te worden dat niemand twee keer opent.',
      en: 'The framing was simple, the path less so. Turn raw data into a layer of <em>personalised advice</em> a merchant would pay a subscription for. Without breaking GDPR. Without breaking trust. Without becoming a glorified dashboard nobody opens twice.'
    },
    'bnp.problem.shiftP2': {
      fr: 'Le brief : concevoir un service, pas une feature, bâti sur une logique de triple gain. <strong>Banque · Commerçant · Porteur de carte.</strong> Chacun gagne, personne ne perd la confiance.',
      nl: 'De briefing : een dienst ontwerpen, geen feature, gebouwd op triple-win-logica. <strong>Bank · Merchant · Kaarthouder.</strong> Iedereen wint, niemand verliest vertrouwen.',
      en: 'The brief : design a service, not a feature, built on triple-win logic. <strong>Bank · Retailer · Cardholder.</strong> Every party gains, nobody loses trust.'
    },
    'bnp.problem.shiftCap': {
      fr: 'Du transactionnel vers l\'insight · Pyramide d\'évolution canal',
      nl: 'Van transactioneel naar insight · Kanaalevolutie-piramide',
      en: 'From transactional to insightful · Channel evolution pyramid'
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
      fr: 'On a interviewé Jean-Paul, CEO multi-shops, et cinq autres commerçants. Six fois, la même réticence — exprimée différemment. <strong>Pas de la friction générique.</strong> Les phrases exactes qui sont sorties en interview, et qui sont devenues les six contraintes design du MVP.',
      nl: 'We interviewden Jean-Paul, CEO multi-winkels, en vijf andere merchants. Zes keer dezelfde terughoudendheid — anders verwoord. <strong>Geen generieke wrijving.</strong> De letterlijke zinnen uit de interviews, die de zes ontwerpbeperkingen van de MVP werden.',
      en: 'We interviewed Jean-Paul, multi-shop CEO, and five other merchants. Six times, the same reluctance — phrased differently. <strong>Not generic friction.</strong> The exact sentences from the interviews that became the six design constraints of the MVP.'
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
      fr: 'Hors scope MVP. Inscrit comme évolution roadmap phase 2 — connexion future avec les systèmes POS.',
      nl: 'Buiten MVP-scope. Opgenomen als roadmap fase 2 — toekomstige POS-systeem-koppeling.',
      en: 'Out of MVP scope. Logged as roadmap phase 2 — future POS systems integration.'
    },
    'bnp.barriers.b6.constraint': {
      fr: 'Devenu central dans le Triple-Win : commerçant gagne en décisions, banque crée une ligne B2B, cardholder garde sa privacy.',
      nl: 'Werd centraal in Triple-Win : merchant wint in beslissingen, bank creëert een B2B-omzetlijn, kaarthouder behoudt privacy.',
      en: 'Became central to Triple-Win : merchant gains in decisions, bank creates a B2B revenue line, cardholder keeps privacy.'
    },

    'bnp.role.eyebrow': { fr: 'Mon rôle · 2 / 3', nl: 'Mijn rol · 2 / 3', en: 'My Role · 2 of 3' },
    'bnp.role.h2': {
      fr: 'Quel rôle ai-je<br>joué dans le processus ?',
      nl: 'Welke rol speelde<br>ik in het proces?',
      en: 'What role did I<br>play in the process?'
    },
    'bnp.role.lead': {
      fr: 'Service design stratégique en amont. Pas du wireframing, pas de l\'UI. La couche de cadrage au-dessus, là où le brief se traduit en service vendable. J\'ai travaillé en <span class="accent">Double Diamond</span>, avec deux sponsors au-dessus de moi et une équipe pluridisciplinaire autour.',
      nl: 'Strategisch upstream service design. Geen wireframing, geen UI. De framing-laag erboven, waar de briefing in een verkoopbare dienst wordt vertaald. Ik werkte volgens <span class="accent">Double Diamond</span>, met twee sponsors boven mij en een multidisciplinair team rond mij.',
      en: 'Strategic upstream service design. Not wireframing, not UI. The framing layer above both, where the brief gets translated into a buyable service. I worked through a <span class="accent">Double Diamond</span>, with two sponsors above me and a multi-disciplinary team around me.'
    },
    'bnp.role.dd1': { fr: 'DÉCOUVRIR', nl: 'DISCOVER', en: 'DISCOVER' },
    'bnp.role.dd2': { fr: 'DÉFINIR', nl: 'DEFINE', en: 'DEFINE' },
    'bnp.role.dd3': { fr: 'DÉVELOPPER', nl: 'DEVELOP', en: 'DEVELOP' },
    'bnp.role.dd4': { fr: 'LIVRER', nl: 'DELIVER', en: 'DELIVER' },
    'bnp.role.ddCap1': { fr: 'Premier diamant · le bon problème', nl: 'Eerste diamant · het juiste probleem', en: 'First diamond · the right problem' },
    'bnp.role.ddCap2': { fr: 'Second diamant · la bonne solution', nl: 'Tweede diamant · de juiste oplossing', en: 'Second diamond · the right solution' },

    'bnp.role.l1.ph': { fr: 'Découvrir', nl: 'Discover', en: 'Discover' },
    'bnp.role.l1.h': { fr: 'Entretiens stakeholders et commerçants', nl: 'Stakeholder- en merchant-interviews', en: 'Stakeholder and merchant interviews' },
    'bnp.role.l1.p': {
      fr: 'Shadowing d\'un Brand and Marketing Manager, d\'un Brand Manager, et de propriétaires de POS. Cartographie des niveaux d\'intérêt par profil de PME.',
      nl: 'Shadowing van een Brand and Marketing Manager, een Brand Manager en POS-eigenaars. Mapping van interesseniveaus per kmo-profiel.',
      en: 'Shadowing a Brand and Marketing Manager, a Brand Manager, and POS owners. Mapping levels of interest by SME profile.'
    },
    'bnp.role.l2.ph': { fr: 'Définir', nl: 'Define', en: 'Define' },
    'bnp.role.l2.h': { fr: '9 personas et Value Proposition Canvas', nl: '9 persona\'s en Value Proposition Canvas', en: '9 personas and Value Proposition Canvas' },
    'bnp.role.l2.p': {
      fr: 'De « Liberal Profession Competent Challenger » à « Corporate Banking Specialised ». Cartographie pains, gains, jobs vers le scope MVP.',
      nl: 'Van "Liberal Profession Competent Challenger" tot "Corporate Banking Specialised". Pains, gains, jobs in kaart gebracht naar MVP-scope.',
      en: 'From "Liberal Profession Competent Challenger" to "Corporate Banking Specialised". Mapping pains, gains, and jobs to the right MVP scope.'
    },
    'bnp.role.l3.ph': { fr: 'Développer', nl: 'Develop', en: 'Develop' },
    'bnp.role.l3.h': { fr: 'Service blueprint, journeys, dashboards', nl: 'Service blueprint, journeys, dashboards', en: 'Service blueprint, journeys, dashboards' },
    'bnp.role.l3.p': {
      fr: 'Journey end-to-end pour la PME non enregistrée, la PME enregistrée et l\'utilisateur EBB. Prototypes dashboard Spotfire.',
      nl: 'End-to-end journey voor de niet-geregistreerde kmo, de geregistreerde kmo en de EBB-gebruiker. Spotfire-dashboardprototypes.',
      en: 'End-to-end journeys for the unregistered SME, the registered SME, and the EBB user. Spotfire dashboard prototypes.'
    },
    'bnp.role.l4.ph': { fr: 'Livrer', nl: 'Deliver', en: 'Deliver' },
    'bnp.role.l4.h': { fr: 'Lean Canvas, scope MVP, dossier de décision', nl: 'Lean Canvas, MVP-scope, beslissingspakket', en: 'Lean Canvas, MVP scope, decision pack' },
    'bnp.role.l4.p': {
      fr: 'Matrices de trade-off pour le sponsor exécutif. Registre des risques : juridique et RGPD, qualité de la donnée, défensibilité, ROI.',
      nl: 'Trade-off-matrixen voor de executive sponsor. Risicoregister : legal en GDPR, datakwaliteit, verdedigbaarheid, ROI.',
      en: 'Trade-off matrices for the executive sponsor. Risk register : legal and GDPR, data quality, defensibility, ROI.'
    },

    'bnp.role.roomH3': { fr: 'La salle dans laquelle j\'étais.', nl: 'De kamer waarin ik zat.', en: 'The room I was in.' },
    'bnp.role.roomP': {
      fr: 'Senior service designer dans un programme couvrant quatre fonctions de la banque, plus un partenaire externe. Mon rôle : garder la voix du commerçant audible, les options de l\'exécutif claires, et les trade-offs explicites.',
      nl: 'Senior service designer in een programma dat vier bankfuncties omvatte, plus een externe partner. Mijn job : de stem van de merchant luid houden, de opties van de executive helder, en de trade-offs expliciet.',
      en: 'A senior service designer in a programme spanning four functions of the bank, plus an external partner. My job : keep the merchant\'s voice loud, the executive\'s options clear, and the trade-offs explicit.'
    },
    'bnp.role.roomCap': {
      fr: 'Atelier interne · Principes KPI dashboard · synthèse post-it',
      nl: 'Interne workshop · Dashboard KPI-principes · post-it-synthese',
      en: 'In-house workshop · Dashboard KPI principles · sticky-note synthesis'
    },

    'bnp.role.st1.role': { fr: 'Sponsor', nl: 'Sponsor', en: 'Sponsor' },
    'bnp.role.st1.h': { fr: 'Sponsor exécutif', nl: 'Executive sponsor', en: 'Executive Sponsor' },
    'bnp.role.st1.p': { fr: 'Stratégie Innovation et Acquiring. Détenteur du « 20 % d\'ici 2020 ».', nl: 'Innovatie- en Acquiring-strategie. Eigenaar van "20 % tegen 2020".', en: 'Innovation and Acquiring strategy. The "20% by 2020" goal owner.' },
    'bnp.role.st2.role': { fr: 'Business', nl: 'Business', en: 'Business' },
    'bnp.role.st2.h': { fr: 'Corporate Banking', nl: 'Corporate Banking', en: 'Corporate Banking' },
    'bnp.role.st2.p': { fr: 'Population pilote de 1 500 clients. La voix du futur acheteur.', nl: 'Pilotpopulatie van 1 500 klanten. De stem van de toekomstige koper.', en: 'The 1,500-client pilot population. Voice of the future buyer.' },
    'bnp.role.st3.role': { fr: 'Build', nl: 'Build', en: 'Build' },
    'bnp.role.st3.h': { fr: 'IT et Data', nl: 'IT en Data', en: 'IT and Data' },
    'bnp.role.st3.p': { fr: 'Pipeline data POS (ATOS), dashboards Spotfire, intégration EBB.', nl: 'POS-datapijplijn (ATOS), Spotfire-dashboards, EBB-integratie.', en: 'POS data pipeline (ATOS), Spotfire dashboards, EBB integration.' },
    'bnp.role.st4.role': { fr: 'Garde-fou', nl: 'Vangrail', en: 'Guardrail' },
    'bnp.role.st4.h': { fr: 'Légal et Compliance', nl: 'Legal en Compliance', en: 'Legal and Compliance' },
    'bnp.role.st4.p': { fr: 'Cadrage RGPD, termes contractuels, risque réputationnel résiduel.', nl: 'GDPR-scoping, contractvoorwaarden, restrisico op reputatie.', en: 'GDPR scoping, contract terms, residual reputational risk.' },
    'bnp.role.st5.role': { fr: 'Commercial', nl: 'Commercieel', en: 'Commercial' },
    'bnp.role.st5.h': { fr: 'Marketing', nl: 'Marketing', en: 'Marketing' },
    'bnp.role.st5.p': { fr: 'Tiers de prix, go-to-market pour la cohorte MVP.', nl: 'Prijstiers, go-to-market voor de MVP-cohorte.', en: 'Pricing tiers, go-to-market for the MVP cohort.' },
    'bnp.role.st6.role': { fr: 'Voix', nl: 'Stem', en: 'Voice' },
    'bnp.role.st6.h': { fr: 'PME commerçantes', nl: 'Kmo-merchants', en: 'SME Merchants' },
    'bnp.role.st6.p': {
      fr: 'Professions libérales, retailers, propriétaires multi-shop. Les vrais utilisateurs.',
      nl: 'Vrije beroepen, retailers, multi-shop-eigenaars. De echte gebruikers.',
      en: 'Liberal professions, retailers, multi-shop owners. The actual users.'
    },

    'bnp.role.tension.label': { fr: 'Une tension résolue', nl: 'Een opgeloste spanning', en: 'A resolved tension' },
    'bnp.role.tension.h': {
      fr: 'Marketing × IT, recalibrés sur le commerçant.',
      nl: 'Marketing × IT, herijkt op de winkelier.',
      en: 'Marketing × IT, recalibrated on the shopkeeper.'
    },
    'bnp.role.tension.p': {
      fr: 'Atelier de cadrage. <strong>Vincent côté Marketing</strong> voulait un nom de marque qui claque. <strong>Philippe côté IT</strong> tenait à un nom de module technique. Les deux passaient à côté du commerçant. <strong class="accent">J\'ai ramené la conversation sur le travail réel</strong> : que doit-il décider lundi matin ? Trois objectifs sont sortis. <em>Performance Analysis.</em> <em>Business Expansion.</em> <em>Evaluating Actions.</em> Les deux équipes ont pu co-signer.',
      nl: 'Kaderingsworkshop. <strong>Vincent (Marketing)</strong> wilde een pakkende merknaam. <strong>Philippe (IT)</strong> stond op een technische modulenaam. Beide vergaten de winkelier. <strong class="accent">Ik bracht het gesprek terug naar het echte werk</strong> : wat moet hij maandagochtend beslissen ? Drie doelen kwamen eruit. <em>Performance Analysis.</em> <em>Business Expansion.</em> <em>Evaluating Actions.</em> Beide teams konden mee tekenen.',
      en: 'Framing workshop. <strong>Vincent on Marketing</strong> wanted a punchy brand name. <strong>Philippe on IT</strong> held out for a technical module name. Both missed the shopkeeper. <strong class="accent">I pulled the conversation back to the real job</strong> : what does he need to decide Monday morning ? Three goals came out. <em>Performance Analysis.</em> <em>Business Expansion.</em> <em>Evaluating Actions.</em> Both teams could sign.'
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
      fr: 'L\'enquête démarre par la cartographie. Segmenter le marché PME selon BNP, puis interviewer des commerçants susceptibles d\'acheter de la donnée. Pas pour valider une vision — pour identifier leurs problèmes réels. Le benchmark a confirmé l\'angle stratégique : <strong class="accent">BNP voit 30 % des comptes via Bancontact</strong>, position quasi-monopolistique sur la donnée transactionnelle B2B. <strong>Mes findings ont sorti la réponse : ces gens ne sont pas data scientists.</strong> Une bibliothèque de neuf personas B2B est sortie de la phase, du libéral au CPBB, avec leur niveau d\'intérêt mappé.',
      nl: 'Het onderzoek start met cartografie. De kmo-markt segmenteren zoals BNP die zag, dan merchants interviewen die mogelijk data zouden kopen. Niet om een visie te valideren — om hun reële problemen te identificeren. De benchmark bevestigde de strategische hoek : <strong class="accent">BNP ziet 30 % van de rekeningen via Bancontact</strong>, bijna-monopoliepositie op B2B-transactiedata. <strong>Mijn findings leverden het antwoord : deze mensen zijn geen data scientists.</strong> Een bibliotheek van negen B2B-persona\'s kwam uit de fase, van vrije beroepen tot CPBB, met hun interesseniveau in kaart gebracht.',
      en: 'The investigation starts with mapping. Segment the SME market the way BNP saw it, then interview merchants likely to buy data. Not to validate a vision — to identify their real problems. The benchmark confirmed the strategic angle : <strong class="accent">BNP sees 30% of accounts via Bancontact</strong>, near-monopoly on B2B transactional data. <strong>My findings gave the answer : these people aren\'t data scientists.</strong> A library of nine B2B personas came out of the phase, from liberal professions to CPBB, with their level of interest mapped.'
    },
    'bnp.steps.s1.deliv': { fr: 'Livrable · bibliothèque 9 personas · matrice Niveaux d\'intérêt', nl: 'Deliverable · 9-persona-bibliotheek · Interesseniveau-matrix', en: 'Deliverable · 9-persona library · Levels of Interest matrix' },
    'bnp.steps.s1.cap': { fr: '9 personas B2B · validés par recherche', nl: '9 B2B-persona\'s · onderzoeksgebaseerd', en: '9 B2B personas · research-backed' },

    'bnp.steps.s2.h': { fr: 'Value Proposition Canvas', nl: 'Value Proposition Canvas', en: 'Value Proposition Canvas' },
    'bnp.steps.s2.p': {
      fr: 'La question fondatrice tenait en une ligne, posée à chaque atelier : <em>« Comment transformer ce que la banque voit déjà en un service que les PME accepteraient de payer ? »</em> Le VPC a structuré la réponse en trois axes concrets, alignés sur les décisions hebdomadaires d\'un commerçant. <strong>Audience</strong> : qui est le bon client, où il habite, combien de kilomètres il parcourt. <strong>Trafic</strong> : à quelles heures les cartes passent, quand ouvrir et fermer. <strong>Marketing tout-boîte</strong> : depuis quelles communes les clients arrivent, donc où lancer une campagne ciblée. Trois colonnes, trois décisions hebdomadaires. Pas de data exploration — des outputs.',
      nl: 'De stichtingsvraag paste in één regel, gesteld in elke workshop : <em>« Hoe vertalen we wat de bank al ziet in een dienst waarvoor kmo\'s zouden willen betalen ? »</em> De VPC structureerde het antwoord in drie concrete assen, afgestemd op de wekelijkse beslissingen van een winkelier. <strong>Doelpubliek</strong> : wie is de goede klant, waar woont hij, hoeveel kilometer legt hij af. <strong>Verkeer</strong> : op welke uren passeren de kaarten, wanneer openen en sluiten. <strong>Marketing tout-boîte</strong> : uit welke gemeenten komen de klanten, dus waar een gerichte campagne lanceren. Drie kolommen, drie wekelijkse beslissingen. Geen data exploration — outputs.',
      en: 'The founding question fit in one line, asked in every workshop : <em>« How do we turn what the bank already sees into a service SMEs would actually pay for ? »</em> The VPC structured the answer in three concrete axes, aligned to a shopkeeper\'s weekly decisions. <strong>Audience</strong> : who\'s the right customer, where they live, how many kilometers they travel. <strong>Traffic</strong> : at what hours the cards swipe, when to open and close. <strong>Tout-boîte marketing</strong> : from which communes customers come, so where to launch a targeted campaign. Three columns, three weekly decisions. No data exploration — outputs.'
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
      fr: 'Tous les artefacts précédents — recherche, VPC, Lean Canvas, blueprints, prototypes — ont alimenté un seul livrable final : un dossier de décision exécutif. Roadmap séquencée Q1 2018 → 2020 (du MVP scope à 20 % de part de marché acquiring visé). Registre des risques RGPD / faisabilité technique / défensibilité concurrentielle. Matrice de trade-offs MVP. <strong class="accent">Construit pour être décidé, pas seulement lu.</strong> Le sponsor exécutif a eu son go.',
      nl: 'Alle voorgaande artefacten — onderzoek, VPC, Lean Canvas, blueprints, prototypes — voedden één finaal deliverable : een executive decision document. Gefaseerde roadmap Q1 2018 → 2020 (van MVP-scope naar 20 % market share acquiring). Risicoregister GDPR / technische haalbaarheid / concurrentie-verdedigbaarheid. MVP trade-off matrix. <strong class="accent">Gebouwd om beslist te worden, niet enkel gelezen.</strong> De executive sponsor kreeg zijn go.',
      en: 'Every prior artefact — research, VPC, Lean Canvas, blueprints, prototypes — fed into a single final deliverable : an executive decision pack. Sequenced roadmap Q1 2018 → 2020 (MVP scope to 20% acquiring market share target). Risk register GDPR / technical feasibility / competitive defensibility. MVP trade-off matrix. <strong class="accent">Built to be decided on, not just reviewed.</strong> The executive sponsor got his go.'
    },
    'bnp.steps.s6.deliv': { fr: 'Livrable · roadmap · registre des risques · dossier de décision', nl: 'Deliverable · roadmap · risicoregister · beslissingspakket', en: 'Deliverable · roadmap · Risk register · Decision pack' },
    'bnp.steps.s6.cap': { fr: 'Principe de sélection temporelle · cadre de comparaison étagé', nl: 'Principe tijdselectie · gefaseerd vergelijkingskader', en: 'Time selection principle · Staged comparison frame' },

    'bnp.roadmap.h3': { fr: 'La roadmap, en quatre temps.', nl: 'De roadmap, in vier zetten.', en: 'The roadmap, in four moves.' },
    'bnp.roadmap.lead': {
      fr: 'Du dé-risquage du MVP à l\'objectif acquiring 2020. Le travail a été cadencé pour donner à la banque une décision claire à chaque étape.',
      nl: 'Van het derisken van de MVP tot het acquiring-doel van 2020. Het werk was geritmeerd om de bank op elke etappe een duidelijke volgende beslissing te bieden.',
      en: 'From de-risking the MVP to the 2020 acquiring goal. The work was paced to give the bank a clear next-decision at every stage.'
    },
    'bnp.roadmap.r1.when': { fr: 'T1 2018 · Maintenant', nl: 'Q1 2018 · Nu', en: 'Q1 2018 · Now' },
    'bnp.roadmap.r1.h': { fr: 'Scope MVP verrouillé', nl: 'MVP-scope vastgelegd', en: 'MVP scope locked' },
    'bnp.roadmap.r1.p': {
      fr: 'Concept validé. 4 lentilles de données. Population pilote cadrée à 1 500 PME.',
      nl: 'Concept gevalideerd. 4 datalenzen. Pilotpopulatie afgebakend op 1 500 kmo\'s.',
      en: 'Concept validated. 4 data lenses. Pilot population framed at 1,500 SMEs.'
    },
    'bnp.roadmap.r2.when': { fr: 'T2 2018 · Pilote', nl: 'Q2 2018 · Pilot', en: 'Q2 2018 · Pilot' },
    'bnp.roadmap.r2.h': { fr: 'Offre acquiring pour grands retailers', nl: 'Acquiring-aanbod voor grote retailers', en: 'Acquiring offer for large retailers' },
    'bnp.roadmap.r2.p': {
      fr: 'Corporate Banking peut proposer l\'acquiring. Les commerçants gardent leurs terminaux.',
      nl: 'Corporate Banking kan acquiring aanbieden. Merchants behouden hun terminals.',
      en: 'Corporate Banking can offer acquiring. Merchants keep their terminals.'
    },
    'bnp.roadmap.r3.when': { fr: '2019 · Build', nl: '2019 · Build', en: '2019 · Build' },
    'bnp.roadmap.r3.h': { fr: 'Onboarding live via EBB', nl: 'Live onboarding via EBB', en: 'Live onboarding via EBB' },
    'bnp.roadmap.r3.p': {
      fr: 'Outil déployé via Easy Banking Business avec rafraîchissement quotidien des données.',
      nl: 'Tool uitgerold via Easy Banking Business met dagelijkse data-refresh.',
      en: 'Tool deployed via Easy Banking Business with daily data refresh.'
    },
    'bnp.roadmap.r4.when': { fr: '2020 · Objectif', nl: '2020 · Doel', en: '2020 · Goal' },
    'bnp.roadmap.r4.h': { fr: 'De 7 % à 20 % de part acquirer', nl: 'Van 7 % naar 20 % acquirer-aandeel', en: 'From 7% to 20% acquirer share' },
    'bnp.roadmap.r4.p': {
      fr: 'Présence acquirer complète. Enterprise Intelligence comme différenciateur.',
      nl: 'Volledige acquirer-aanwezigheid. Enterprise Intelligence als differentiator.',
      en: 'Full acquirer presence. Enterprise Intelligence as the differentiator.'
    },

    'bnp.result.eyebrow': { fr: 'Le résultat', nl: 'Het resultaat', en: 'The Result' },
    'bnp.result.h2': {
      fr: 'Du concept à <span class="accent">une vraie PME qui dit oui.</span>',
      nl: 'Van concept tot <span class="accent">een echte kmo die ja zegt.</span>',
      en: 'From concept to <span class="accent">a real PME saying yes.</span>'
    },

    'bnp.tw.h3': { fr: 'Le frame <span class="accent">Triple-Win.</span>', nl: 'Het <span class="accent">Triple-Win</span>-frame.', en: 'The <span class="accent">Triple-Win</span> frame.' },
    'bnp.tw.p': {
      fr: 'Chaque choix de design était noté contre ce triangle. Si une feature en cassait un seul, elle ne sortait pas. Peu importe sa pertinence.',
      nl: 'Elke ontwerpkeuze werd getoetst aan deze driehoek. Brak een feature één van de drie? Dan ging ze niet live. Hoe slim ook.',
      en: 'Every design choice was scored against this triangle. If a feature broke any of the three, it didn\'t ship. No matter how clever.'
    },
    'bnp.tw.w1.who': { fr: 'La banque', nl: 'De bank', en: 'The Bank' },
    'bnp.tw.w1.h': { fr: 'BNP Paribas Fortis', nl: 'BNP Paribas Fortis', en: 'BNP Paribas Fortis' },
    'bnp.tw.w1.p': {
      fr: 'Une nouvelle ligne de revenu B2B qui transforme la donnée transactionnelle existante en service défensif. Au service de l\'objectif acquiring 7 % à 20 %.',
      nl: 'Een nieuwe B2B-omzetlijn die bestaande transactiedata omzet in een verdedigbare dienst. Ter ondersteuning van het 7 % naar 20 % acquiring-doel.',
      en: 'A new B2B revenue line that turns existing transaction data into a defensible service. Supporting the 7% to 20% acquirer goal.'
    },
    'bnp.tw.w2.who': { fr: 'Le commerçant', nl: 'De merchant', en: 'The Retailer' },
    'bnp.tw.w2.h': { fr: 'PME commerçante', nl: 'Kmo-merchant', en: 'SME Merchant' },
    'bnp.tw.w2.p': {
      fr: 'Des décisions, pas des dashboards. Insight lisible qui suggère une action marketing, benchmarké contre la vraie concurrence locale.',
      nl: 'Beslissingen, geen dashboards. Leesbare insight die marketingactie voorstelt, gebenchmarkt tegen de echte lokale concurrentie.',
      en: 'Decisions, not dashboards. Readable insight that prompts a marketing action, benchmarked against real local competition.'
    },
    'bnp.tw.w3.who': { fr: 'Le porteur de carte', nl: 'De kaarthouder', en: 'The Cardholder' },
    'bnp.tw.w3.h': { fr: 'Consommateur final', nl: 'Eindconsument', en: 'End Consumer' },
    'bnp.tw.w3.p': {
      fr: 'Vie privée préservée : statistiques uniquement, aucune donnée personnelle. Des magasins mieux ajustés, des offres plus pertinentes, sans contrepartie de surveillance.',
      nl: 'Privacy gewaarborgd : enkel statistieken, geen persoonlijke data. Beter afgestemde winkels, relevantere aanbiedingen, zonder surveillance-trade-off.',
      en: 'Privacy preserved : statistics only, no personal data. Better-tuned shops, more relevant offers, no surveillance trade-off.'
    },

    'bnp.leo.lead1': {
      fr: 'On n\'a pas livré qu\'un deck. On a testé le concept sur une chaîne réelle, <strong class="accent">Léonidas</strong>, sur six mois de données BNP. Deux boutiques bruxelloises : une à Woluwe-Saint-Pierre, une à Ixelles.',
      nl: 'We leverden niet alleen een deck. We testten het concept op een echte keten, <strong class="accent">Léonidas</strong>, op zes maanden BNP-transactiedata. Twee Brusselse boetieken : één in Sint-Pieters-Woluwe, één in Elsene.',
      en: 'We didn\'t just ship a deck. We tested the concept on a real chain, <strong class="accent">Léonidas</strong>, using BNP transaction data over a six-month window. Two boutiques in Brussels : one in Wolluwé Saint-Pierre, one in Ixelles.'
    },
    'bnp.leo.lead2': {
      fr: 'Le shop de Wolluwé avait conduit des actions marketing segmentées par client. Celui d\'Ixelles non. Le dashboard Enterprise Intelligence rendait l\'impact <strong>visible d\'un coup d\'œil</strong>. Le chocolatier est devenu un <strong class="accent">acheteur potentiel</strong> du MVP.',
      nl: 'De Woluwe-shop had klant-gesegmenteerde marketingacties uitgevoerd. De Elsene-shop niet. Het Enterprise Intelligence-dashboard maakte de impact <strong>in één oogopslag zichtbaar</strong>. De chocolatier werd een <strong class="accent">potentiële koper</strong> van de MVP.',
      en: 'The Wolluwé store had run customer-segmented marketing actions. The Ixelles store hadn\'t. The Enterprise Intelligence dashboard made the impact <strong>visible at a glance</strong>. The chocolatier became a <strong class="accent">paying customer in waiting</strong> for the MVP.'
    },
    'bnp.leo.s1': { fr: 'Hausse de revenu', nl: 'Omzetstijging', en: 'Revenue increase' },
    'bnp.leo.s2': { fr: 'Six mois', nl: 'Zes maanden', en: 'Six months' },
    'bnp.leo.s3': { fr: 'Panier moyen', nl: 'Gemiddeld winkelmandje', en: 'Avg basket size' },
    'bnp.leo.s4': { fr: 'Clients fidélisés', nl: 'Behouden klanten', en: 'Maintained customers' },
    'bnp.leo.quote': {
      fr: 'Léonidas Wolluwé SP a atteint une part de marché sectorielle de <strong>35 %</strong>, contre <strong>10 %</strong> pour Léonidas Ixelles. Même marque, mêmes six mois, même dataset. Une seule variable : des actions marketing segmentées par client, rendues lisibles d\'un coup d\'œil par le dashboard EI.',
      nl: 'Léonidas Woluwe SP behaalde een sectoraal marktaandeel van <strong>35 %</strong>, tegenover <strong>10 %</strong> voor Léonidas Elsene. Zelfde merk, zelfde zes maanden, zelfde dataset. Eén variabele : klant-gesegmenteerde marketingacties, in één oogopslag zichtbaar gemaakt door het EI-dashboard.',
      en: 'Léonidas Wolluwé SP reached a sector market share of <strong>35%</strong>, against <strong>10%</strong> for Léonidas Ixelles. Same brand, same six months, same dataset. One variable : customer-segmented marketing actions, made visible at a glance by the EI dashboard.'
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
      fr: 'Au-delà du chiffre : un MVP signé Corporate Banking, IT, Legal et Marketing, dérisqué côté GDPR et qualité de données. Et une bibliothèque de <strong class="accent">9 personas B2B</strong> qui a survécu au projet.',
      nl: 'Voorbij het cijfer : een MVP ondertekend door Corporate Banking, IT, Legal en Marketing, zonder GDPR- of datakwaliteits-risico\'s. En een bibliotheek van <strong class="accent">9 B2B-persona\'s</strong> die het project overleefde.',
      en: 'Beyond the figure : an MVP signed off by Corporate Banking, IT, Legal and Marketing, de-risked on GDPR and data quality. And a <strong class="accent">9-persona B2B library</strong> that outlived the project.'
    },

    'bnp.lessons.eyebrow': { fr: 'Si je refaisais le projet', nl: 'Als ik het opnieuw zou doen', en: 'If I did it again' },
    'bnp.lessons.h2': {
      fr: 'Ce que je referais <span class="accent">différemment.</span>',
      nl: 'Wat ik <span class="accent">anders</span> zou doen.',
      en: 'What I\'d do <span class="accent">differently.</span>'
    },
    'bnp.lessons.lead': {
      fr: 'Sept ans après, le projet a tenu sa promesse. Mais trois choix mériteraient d\'être refaits autrement. Les voici, en clair.',
      nl: 'Zeven jaar later heeft het project zijn belofte ingelost. Maar drie keuzes verdienen een tweede ronde. Hier zijn ze, klare taal.',
      en: 'Seven years on, the project delivered. But three calls deserve a second take. Here they are, plain.'
    },
    'bnp.lessons.l1.h': {
      fr: 'Une prévente conditionnelle, ce n\'est qu\'un demi-pas.',
      nl: 'Een conditionele pré-aankoop is maar een halve stap.',
      en: 'A conditional pre-purchase is only a half-step.'
    },
    'bnp.lessons.l1.p': {
      fr: 'La prévente Léonidas est venue conditionnelle au build. Le sponsor avait son signal, mais le pari restait à courir. Aujourd\'hui, je négocierais une lettre d\'intention plus ferme dès le prototype, et un mandat qui m\'accompagne au moins jusqu\'à la mise en marché.',
      nl: 'De pré-aankoop van Léonidas kwam conditioneel op de build. De sponsor had zijn signaal, maar de gok bleef te lopen. Vandaag zou ik onderhandelen voor een hardere intentieverklaring vanaf het prototype, en een mandaat dat me minstens tot aan de marktintroductie begeleidt.',
      en: 'The Léonidas pre-purchase came conditional on the build. The sponsor had the signal, but the bet still had to run. Today, I would negotiate a firmer letter of intent at the prototype stage, and a mandate that takes me at least through the market launch.'
    },
    'bnp.lessons.l2.h': {
      fr: 'Élargir l\'échantillon avant de figer la promesse.',
      nl: 'Het sample uitbreiden voor je de value prop vastlegt.',
      en: 'Widen the sample before locking the value prop.'
    },
    'bnp.lessons.l2.p': {
      fr: 'Six PME testeurs, un seul secteur. Le signal Léonidas était fort, mais mono-vertical. Aujourd\'hui, je pousse pour douze testeurs en trois verticales avant de bétonner la value prop.',
      nl: 'Zes kmo-testers, één sector. Het Léonidas-signaal was sterk, maar mono-verticaal. Vandaag duw ik voor twaalf testers in drie verticalen voor ik de value prop betonneer.',
      en: 'Six SME testers, one sector. The Léonidas signal was strong, but mono-vertical. Today, I push for twelve testers across three verticals before I lock the value prop.'
    },
    'bnp.lessons.l3.h': {
      fr: 'Auditer la qualité de la donnée avant d\'écrire le service.',
      nl: 'De datakwaliteit auditen vóór je de service schrijft.',
      en: 'Audit data quality before writing the service.'
    },
    'bnp.lessons.l3.p': {
      fr: 'J\'ai découvert mi-parcours que toutes les catégories transactionnelles n\'étaient pas également propres. Aujourd\'hui, je commande un audit qualité avant la value prop.',
      nl: 'Ik ontdekte halverwege dat niet alle transactiecategorieën even proper waren. Vandaag bestel ik eerst een kwaliteitsaudit, dan pas de value prop.',
      en: 'I found out mid-project that not all transaction categories were equally clean. Today I commission a quality audit before the value prop.'
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
      en: 'What would, for Luminus, that first B2B customer look like — the one who signs a pre-purchase on a prototype, before you commit to build the whole platform?'
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
      fr: 'Je n\'arriverais pas avec des réponses sur Luminus. Je ne les ai pas. J\'arriverais avec une manière structurée de les trouver, et un calendrier honnête. Voici trois phases, neuf semaines, et le premier dossier de décision que je poserais sur la table.',
      nl: 'Ik zou niet binnenkomen met antwoorden over Luminus. Die heb ik niet. Ik zou binnenkomen met een gestructureerde manier om ze te vinden, en een eerlijk tijdsschema. Drie fases, negen weken, en het eerste beslissingsdocument dat ik op tafel zou leggen.',
      en: 'I wouldn\'t arrive with answers about Luminus. I don\'t have them. I\'d arrive with a structured way of finding them, and an honest timeline. Three phases, nine weeks, and the first decision document I\'d put on the table.'
    },

    'luminus.p1.eyebrow': { fr: 'Phase 1 · Semaines 1 à 3', nl: 'Fase 1 · Weken 1 tot 3', en: 'Phase 1 · Weeks 1 to 3' },
    'luminus.p1.h': { fr: 'Écouter.', nl: 'Luisteren.', en: 'Listen.' },
    'luminus.p1.p': {
      fr: 'Trois semaines de shadowing et d\'entretiens, pas de production. Je suivrais une journée du Corporate Sales Manager, une journée d\'un membre de la stratégie B2B, une journée d\'IT et Data, et un appel client B2B en live. Côté externe, je mènerais cinq entretiens semi-structurés avec des PME clientes Luminus déjà engagées dans la transition (PV, batterie, EV, contrats flexibles).',
      nl: 'Drie weken shadowing en interviews, geen productie. Ik zou een dag meelopen met de Corporate Sales Manager, een dag bij iemand uit B2B-strategie, een dag bij IT en Data, en een live klantgesprek B2B bijwonen. Extern zou ik vijf semi-gestructureerde interviews voeren met Luminus-kmo-klanten die al engageren in de transitie (PV, batterij, EV, flexibele contracten).',
      en: 'Three weeks of shadowing and interviews, no production. I would shadow a Corporate Sales Manager for a day, someone from B2B strategy for a day, IT and Data for a day, and sit in on a live B2B customer call. Outside, I would run five semi-structured interviews with Luminus SME clients already engaged in the transition (PV, battery, EV, flexible contracts).'
    },
    'luminus.p1.deliv': {
      fr: 'Livrable de fin de phase : carte des stakeholders, 5 verbatims clients, et trois hypothèses initiales sur la « zone Léonidas » de Luminus.',
      nl: 'Deliverable einde fase : stakeholder-map, 5 klant-verbatims, en drie initiële hypotheses over de "Léonidas-zone" van Luminus.',
      en: 'End-of-phase deliverable : stakeholder map, 5 customer verbatims, and three initial hypotheses about Luminus\'s "Léonidas zone".'
    },

    'luminus.p2.eyebrow': { fr: 'Phase 2 · Semaines 4 à 8', nl: 'Fase 2 · Weken 4 tot 8', en: 'Phase 2 · Weeks 4 to 8' },
    'luminus.p2.h': { fr: 'Cadrer.', nl: 'Kaderen.', en: 'Frame.' },
    'luminus.p2.p': {
      fr: 'Cinq semaines pour transformer les hypothèses en options testables. Pour chaque candidat MVP que j\'aurai identifié pendant l\'écoute (par exemple : un service flex-management pour PME énergivores, ou une couche d\'insight sur la consommation comparée aux pairs sectoriels), je produirais un mini Lean Canvas, une carte des risques (légal, régulatoire, technique, ROI) et une estimation du « coût de non-action ». Je présenterais à la mi-phase un comparatif des candidats, en groupe restreint.',
      nl: 'Vijf weken om hypotheses om te zetten in testbare opties. Voor elke MVP-kandidaat die ik tijdens de luisterfase identificeer (bijvoorbeeld : een flex-managementservice voor energie-intensieve kmo\'s, of een laag insight over verbruik vergeleken met sectoorpeers), zou ik een mini Lean Canvas maken, een risicokaart (legal, regulatoir, technisch, ROI) en een schatting van de "kostprijs van niet-actie". Halverwege fase zou ik een vergelijking van de kandidaten in beperkte groep voorstellen.',
      en: 'Five weeks to turn hypotheses into testable options. For each MVP candidate identified during the listen phase (for example : a flex-management service for energy-intensive SMEs, or an insight layer comparing consumption to sector peers), I would produce a mini Lean Canvas, a risk map (legal, regulatory, technical, ROI), and an estimate of the "cost of inaction". Mid-phase I\'d present a candidate comparison in a restricted group.'
    },
    'luminus.p2.deliv': {
      fr: 'Livrable de fin de phase : trois candidats MVP cadrés (Lean Canvas + risques + ROI), un recommandé.',
      nl: 'Deliverable einde fase : drie gekaderde MVP-kandidaten (Lean Canvas + risico\'s + ROI), één aanbevolen.',
      en: 'End-of-phase deliverable : three framed MVP candidates (Lean Canvas + risks + ROI), one recommended.'
    },

    'luminus.p3.eyebrow': { fr: 'Phase 3 · Semaines 9 à 12', nl: 'Fase 3 · Weken 9 tot 12', en: 'Phase 3 · Weeks 9 to 12' },
    'luminus.p3.h': { fr: 'Livrer le premier dossier de décision.', nl: 'Het eerste beslissingsdocument leveren.', en: 'Ship the first decision pack.' },
    'luminus.p3.p': {
      fr: 'Quatre semaines pour livrer un dossier exécutif sur le candidat recommandé. Roadmap séquencée (90 jours, 12 mois, 24 mois). Registre des risques. Matrice de trade-offs. Une logique Triple-Win Luminus (utilité · client B2B · ménage final). Et une proposition de pilote concret : un client B2B nominé, six mois, KPI mesurable. Le but n\'est pas que ce dossier soit lu. Le but est qu\'il soit décidé.',
      nl: 'Vier weken om een executive document te leveren over de aanbevolen kandidaat. Gefaseerde roadmap (90 dagen, 12 maanden, 24 maanden). Risicoregister. Trade-off-matrix. Een Triple-Win Luminus-logica (nut · B2B-klant · eindgezin). En een concreet pilotvoorstel : één benoemde B2B-klant, zes maanden, meetbare KPI. Het doel is niet dat dit document wordt gelezen. Het doel is dat het wordt beslist.',
      en: 'Four weeks to deliver an executive document on the recommended candidate. Sequenced roadmap (90 days, 12 months, 24 months). Risk register. Trade-off matrix. A Luminus Triple-Win logic (utility · B2B customer · end household). And a concrete pilot proposal : one named B2B customer, six months, measurable KPI. The goal isn\'t to be read. It\'s to be decided.'
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
      fr: 'Un sponsor exécutif identifié dès la semaine 1. Sans lui, le dossier de décision de la semaine 12 reste sur une étagère.',
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
    'luminus.cta.back': { fr: 'Lire le case BNP →', nl: 'Lees de BNP-case →', en: 'Read the BNP case →' }
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
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === lang);
    });
    try { localStorage.setItem(STORE_KEY, lang); } catch (_) {}
  }

  function bindSwitcher() {
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const next = btn.getAttribute('data-lang-btn');
        if (SUPPORTED.includes(next)) applyLang(next);
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
