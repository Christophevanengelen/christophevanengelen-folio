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

    return res.status(200).json({ ok: true });
  } catch (err) {
    /* Si Vercel KV pas encore configuré · err contient probablement "KV_REST_API_URL is not defined" */
    console.error('subscribe error', err && err.message);
    return res.status(500).json({
      error: 'Server error',
      hint: 'Vercel KV pas encore configuré dans le dashboard ?',
    });
  }
}
