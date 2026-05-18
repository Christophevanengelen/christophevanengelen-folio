/**
 * /api/subscribe · POST endpoint newsletter
 *
 * Reçoit · { email, lang?, _honey? }
 * Stocke · Vercel KV
 *   · "subscribers:emails" (set) · pour dedup
 *   · "subscribers:records" (list) · historique avec metadata (ts, ua, ref, lang)
 *
 * Renvoie · { ok: true, duplicate?: boolean } ou { error }
 *
 * Honeypot · si _honey rempli, on simule succès pour les bots (pas de DB write).
 *
 * CVE 2026-05-12.
 */

import { kv } from '@vercel/kv';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  /* CORS · permettre POST depuis christophevanengelen.com */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Parse body · req.body est déjà parsé par Vercel pour content-type JSON */
  const body = req.body || {};
  const email = String(body.email || '').toLowerCase().trim();
  const lang = String(body.lang || 'fr').slice(0, 2);
  const honey = String(body._honey || '');

  /* Honeypot · si rempli, c'est un bot · pretend success */
  if (honey) {
    return res.status(200).json({ ok: true });
  }

  /* Validation email */
  if (!email || !EMAIL_RX.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  /* Storage Vercel KV */
  try {
    /* Check dedup via set */
    const exists = await kv.sismember('subscribers:emails', email);
    if (exists) {
      return res.status(200).json({ ok: true, duplicate: true });
    }

    /* Record metadata · facilite migration future vers Mailchimp/Substack */
    const record = {
      email,
      ts: new Date().toISOString(),
      lang,
      ua: String(req.headers['user-agent'] || '').slice(0, 200),
      ref: String(req.headers['referer'] || '').slice(0, 200),
      ip: String(req.headers['x-forwarded-for'] || '').split(',')[0].trim().slice(0, 64),
    };

    /* Multi-write · set pour dedup, list pour historique chronologique */
    await Promise.all([
      kv.sadd('subscribers:emails', email),
      kv.lpush('subscribers:records', JSON.stringify(record)),
    ]);

    /* Notif + welcome · CVE 2026-05-18 · await les deux pour garantir
       l'envoi (fire-and-forget peut être tronqué par serverless). On
       wrap chacun en .catch pour ne pas fail le subscribe si un échoue. */
    await Promise.allSettled([
      notifyEmail(record).catch((e) => console.warn('email notify fail', e && e.message)),
      sendWelcomeEmail(email, lang).catch((e) => console.warn('welcome email fail', e && e.message)),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    /* Si Vercel KV pas encore configuré · fallback · on envoie quand même
       l'email pour que l'inscription ne soit pas perdue. */
    console.error('subscribe KV error', err && err.message);
    const fallbackRecord = {
      email,
      ts: new Date().toISOString(),
      lang,
      note: 'KV indisponible · fallback email-only',
    };
    try {
      await notifyEmail(fallbackRecord);
      return res.status(200).json({ ok: true, fallback: 'email-only' });
    } catch (e2) {
      return res.status(500).json({
        error: 'Server error',
        hint: 'Vercel KV pas encore configuré et email notification a échoué.',
      });
    }
  }
}

/**
 * Envoie l'email de notification de subscription via Formsubmit.co
 * Anonymous forwarder · pas de compte requis · CVE confirme 1-clic la première fois.
 */
async function notifyEmail(record) {
  const url = 'https://formsubmit.co/ajax/hello@christophevanengelen.com';
  const payload = {
    _subject: 'Nouvelle inscription newsletter folio',
    _template: 'table',
    _captcha: 'false',
    email: record.email,
    timestamp: record.ts || '',
    language: record.lang || '',
    user_agent: record.ua || '',
    referrer: record.ref || '',
    ip: record.ip || '',
    note: record.note || '',
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Formsubmit returned ' + res.status);
  return res.json().catch(() => ({}));
}

/**
 * Auto-welcome email · CVE 2026-05-18 · via Gmail SMTP (Google Workspace hello@).
 * No-op si GMAIL_USER ou GMAIL_APP_PASSWORD absent · CVE peut activer plus tard.
 *
 * Setup CVE (Google Workspace hello@christophevanengelen.com) ·
 *   1. Activer 2-step verification dans Google Account (obligatoire)
 *   2. Créer App Password · myaccount.google.com/apppasswords
 *      → "App: Mail", "Device: Other (Vercel API)"
 *      → Copier le password 16-caractères
 *   3. Set env vars sur Vercel ·
 *      vercel env add GMAIL_USER             (= hello@christophevanengelen.com)
 *      vercel env add GMAIL_APP_PASSWORD     (= les 16 caractères copiés)
 *
 * Limite Gmail · 500 emails/jour outbound (largement suffisant pour newsletter).
 * Si Gmail pas configuré · fallback silencieux. L'inscription reste enregistrée.
 */
async function sendWelcomeEmail(email, lang) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return; /* not configured · noop */

  const messages = {
    fr: {
      subject: 'Bienvenue · arbitrages Service Design',
      body: `Bonjour,

Merci pour ton inscription · un mail par mois, pas plus.
Ce que tu vas recevoir · arbitrages Service Design qui ont marché, racontés courts. Lecture 5 minutes. Pas de pub, pas de relance.

Le prochain numéro arrive dans les semaines qui viennent. Si tu veux discuter d'un projet entre-temps · réponds à cet email ou booke un appel · https://cal.com/christophevanengelen/30min

À bientôt,
Christophe`,
    },
    nl: {
      subject: 'Welkom · Service Design afwegingen',
      body: `Hallo,

Bedankt voor je inschrijving · één mail per maand, niet meer.
Wat je gaat ontvangen · Service Design afwegingen die werkten, kort verteld. 5 minuten leestijd. Geen reclame, geen follow-up.

Het volgende nummer komt binnen enkele weken. Wil je een project bespreken in de tussentijd · antwoord op deze mail of boek een call · https://cal.com/christophevanengelen/30min

Tot snel,
Christophe`,
    },
    en: {
      subject: 'Welcome · Service Design trade-offs',
      body: `Hi,

Thanks for subscribing · one mail per month, no more.
What you'll get · Service Design trade-offs that worked, told short. 5-minute reads. No ads, no follow-ups.

Next issue arrives in the coming weeks. Want to discuss a project before then · reply to this mail or book a call · https://cal.com/christophevanengelen/30min

Talk soon,
Christophe`,
    },
  };

  const msg = messages[lang] || messages.fr;

  /* Lazy-load nodemailer · serverless cold-start friendly */
  const { default: nodemailer } = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"Christophe van Engelen" <${user}>`,
    to: email,
    replyTo: user,
    subject: msg.subject,
    text: msg.body,
  });
}
