/**
 * /api/admin/health · GET endpoint
 *
 * Vérif rapide en parallèle ·
 *   - KV reachable (read 1 op)
 *   - Vercel API reachable (project endpoint)
 *   - Prod URL up (HEAD https://christophevanengelen.com)
 *
 * Auth · Bearer ADMIN_PASSWORD.
 *
 * Renvoie ·
 *   {
 *     kv: { ok, latencyMs, count? },
 *     vercel: { ok, latencyMs, env? },
 *     prod: { ok, latencyMs, status? },
 *     gmail: { configured }  // pas de ping, juste check env vars
 *   }
 *
 * CVE 2026-05-18.
 */

import { kv } from '@vercel/kv';

const PROD_URL = 'https://christophevanengelen.com/';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [kvR, vercelR, prodR] = await Promise.all([
    checkKv(),
    checkVercel(),
    checkProd(),
  ]);

  return res.status(200).json({
    kv: kvR,
    vercel: vercelR,
    prod: prodR,
    gmail: {
      configured: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
    },
  });
}

async function checkKv() {
  const t0 = Date.now();
  try {
    const count = await kv.scard('subscribers:emails');
    return { ok: true, latencyMs: Date.now() - t0, count: count || 0 };
  } catch (e) {
    return { ok: false, latencyMs: Date.now() - t0, error: e.message };
  }
}

async function checkVercel() {
  const t0 = Date.now();
  const vt = process.env.VERCEL_TOKEN;
  const pid = process.env.VERCEL_PROJECT_ID;
  const tid = process.env.VERCEL_TEAM_ID;
  if (!vt || !pid) return { ok: false, configured: false };
  try {
    const url = `https://api.vercel.com/v9/projects/${pid}${tid ? '?teamId=' + tid : ''}`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${vt}` } });
    if (!r.ok) return { ok: false, latencyMs: Date.now() - t0, status: r.status };
    const data = await r.json();
    return {
      ok: true,
      latencyMs: Date.now() - t0,
      env: data.live ? 'live' : 'ready',
      nodeVersion: data.nodeVersion,
    };
  } catch (e) {
    return { ok: false, latencyMs: Date.now() - t0, error: e.message };
  }
}

async function checkProd() {
  const t0 = Date.now();
  try {
    const r = await fetch(PROD_URL, { method: 'HEAD' });
    return { ok: r.ok, latencyMs: Date.now() - t0, status: r.status };
  } catch (e) {
    return { ok: false, latencyMs: Date.now() - t0, error: e.message };
  }
}
