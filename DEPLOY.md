# DEPLOY — christophevanengelen.be sur Vercel

Procédure complète pour mettre le portfolio en ligne, brancher le domaine, et générer les 3 PDFs leave-behind.

## 1 · Prérequis

- Compte Vercel (gratuit, hobby tier suffit)
- Domaine `christophevanengelen.be` acheté et accessible chez ton registrar
- Vercel CLI installé : `npm i -g vercel` (ou `bun install -g vercel`)
- Google Chrome installé (pour les scripts PDF + OG cover)

## 2 · Premier déploiement

```bash
cd /Users/jhondoe/Desktop/folio/_BNP/_selected/web

# Login Vercel (une seule fois)
vercel login

# Lien le projet à un nouveau projet Vercel (interactif)
vercel link
# → "Set up and deploy ?" Y
# → "Which scope ?" ton compte personnel
# → "Link to existing project ?" N
# → "Project name ?" christophevanengelen
# → "Directory ?" ./
# → "Auto-detected settings ?" Y

# Premier deploy preview
vercel
# → renvoie une URL https://christophevanengelen-xxxx.vercel.app
# vérifie que tout marche dessus

# Deploy production
vercel --prod
# → renvoie https://christophevanengelen.vercel.app
```

## 3 · Brancher le domaine `christophevanengelen.be` (apex canonical)

Dans le dashboard Vercel → Project → Settings → Domains :

- Ajoute `christophevanengelen.be`
- Ajoute `www.christophevanengelen.be`
- Configure www → redirect 308 → apex (Vercel propose ça automatiquement)
- Vercel affiche les enregistrements DNS à créer chez ton registrar

Chez ton registrar (le DNS de `christophevanengelen.be`) :

| Type   | Nom (host) | Valeur                       | TTL  |
|--------|-----------|------------------------------|------|
| `A`    | `@` (apex)| `76.76.21.21`                | 3600 |
| `CNAME`| `www`     | `cname.vercel-dns.com.`      | 3600 |

> Si ton registrar ne supporte pas l'enregistrement `A` à l'apex (rare), remplace par un `ALIAS` ou `ANAME` pointant vers `cname.vercel-dns.com.`.

Sauvegarde. Propagation DNS : 5 à 60 min en général. Vercel auto-provisionne le certificat HTTPS dès que la propagation est faite.

Vérifie quand c'est OK :
```bash
dig +short christophevanengelen.be
# → doit renvoyer 76.76.21.21
curl -sI https://christophevanengelen.be | head -3
# → HTTP/2 200
```

## 4 · Générer les 3 PDFs leave-behind

Une fois le site live :

```bash
cd /Users/jhondoe/Desktop/folio/_BNP/_selected/web
./scripts/build-pdfs.sh
```

Sortie : `dist/cve-bnp-fr.pdf`, `cve-bnp-nl.pdf`, `cve-bnp-en.pdf`. Format A4, sans nav ni motion, prêts à attacher dans un email.

Pour tester en local avant le deploy :
```bash
./scripts/build-pdfs.sh local
```

## 5 · Régénérer le cover OG si tu modifies son design

Si tu changes `og-cover.html` (palette, copy, chiffres) :

```bash
./scripts/build-og-cover.sh
# → rewrite public/img/og-cover.jpg en 1200x630
```

Puis redeploy : `vercel --prod`.

## 6 · Vérifications post-deploy

- [ ] `https://christophevanengelen.be/` charge en 200, FR par défaut
- [ ] `?lang=nl` et `?lang=en` basculent correctement
- [ ] `/bnp.html` charge, le TL;DR strip et la section Léonidas s'animent
- [ ] `/luminus.html` charge, les 3 phases s'affichent
- [ ] `/404` (n'importe quoi) retourne notre 404 page
- [ ] `/sitemap.xml` est servi
- [ ] `/robots.txt` est servi
- [ ] Test OG : colle `https://christophevanengelen.be/bnp.html` dans LinkedIn ou un Slack ; le cover image apparaît
- [ ] Test mobile sur ton iPhone et un Android quelconque
- [ ] Le toggle dark/light persiste après navigation entre pages
- [ ] Cmd+P sur `/bnp.html` produit un PDF lisible (sans nav, sans toggle)

## 7 · Vercel Analytics (optionnel mais recommandé)

Dans le dashboard Vercel → Project → Analytics → Enable. Donne du request-count gratuit + Core Web Vitals. Utile pour savoir si Mathias a ouvert le lien avant l'entretien.

## 8 · Rollback

Tout deploy production reste accessible. Dashboard Vercel → Deployments → ancien deploy → "Promote to Production". Instantané.

## 9 · Domaine email (optionnel)

Si tu veux `christophe@christophevanengelen.be` plus tard, ça vient de ton registrar (records MX). Vercel n'héberge pas l'email. Recommandation : Fastmail (5€/mo) ou Google Workspace.
