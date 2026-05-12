/**
 * /api/admin · GET endpoint pour lire la liste des subscribers
 *
 * Auth · header "Authorization: Bearer <ADMIN_PASSWORD>"
 *   · ADMIN_PASSWORD = env var setée via Vercel CLI ou dashboard
 *
 * Renvoie · { count, records: [{email, ts, lang, ua, ref, ip}, ...] }
 *   · records en ordre reverse-chrono (plus récents en haut)
 *
 * CVE 2026-05-12.
 */

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Auth via Bearer token dans header Authorization */
  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return res.status(500).json({
      error: 'ADMIN_PASSWORD env var not set',
      hint: 'Run: vercel env add ADMIN_PASSWORD',
    });
  }
  if (token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /* Read from Vercel KV */
  try {
    const [count, raw] = await Promise.all([
      kv.scard('subscribers:emails'),
      kv.lrange('subscribers:records', 0, -1),
    ]);

    /* Parse JSON records · accepte aussi objects (si KV renvoie déjà parsé) */
    const records = (raw || []).map((r) => {
      if (typeof r === 'string') {
        try { return JSON.parse(r); } catch { return { email: r, ts: null }; }
      }
      return r;
    });

    return res.status(200).json({
      count: count || 0,
      records,
    });
  } catch (err) {
    console.error('admin error', err && err.message);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
