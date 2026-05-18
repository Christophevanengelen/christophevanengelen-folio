/**
 * /api/admin/stats · GET endpoint pour KPIs newsletter agrégés
 *
 * Auth · header "Authorization: Bearer <ADMIN_PASSWORD>"
 *
 * Renvoie ·
 *   {
 *     total: int,
 *     last7: int,
 *     last30: int,
 *     prev30: int,           // J-60 → J-30, pour calc croissance
 *     growthPct: number,     // (last30 - prev30) / prev30 * 100
 *     langSplit: { fr, nl, en, other },
 *     topReferrers: [{host, count}],
 *     daily: [{date, count}], // 30 derniers jours, ASC
 *     recent: [{email, ts, lang, ref}], // 50 derniers, DESC
 *   }
 *
 * CVE 2026-05-18.
 */

import { kv } from '@vercel/kv';

const DAY_MS = 86400000;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' });
  }
  if (token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const raw = await kv.lrange('subscribers:records', 0, -1);
    const records = (raw || []).map((r) => {
      if (typeof r === 'string') {
        try { return JSON.parse(r); } catch { return { email: r, ts: null }; }
      }
      return r;
    });

    const now = Date.now();
    const cutoff7 = now - 7 * DAY_MS;
    const cutoff30 = now - 30 * DAY_MS;
    const cutoff60 = now - 60 * DAY_MS;

    let last7 = 0, last30 = 0, prev30 = 0;
    const langSplit = { fr: 0, nl: 0, en: 0, other: 0 };
    const refHosts = new Map();
    const dailyMap = new Map();

    for (let i = 0; i < 30; i++) {
      const d = new Date(now - i * DAY_MS).toISOString().slice(0, 10);
      dailyMap.set(d, 0);
    }

    for (const r of records) {
      const tsMs = r.ts ? Date.parse(r.ts) : NaN;

      const lang = String(r.lang || '').toLowerCase();
      if (lang === 'fr' || lang === 'nl' || lang === 'en') langSplit[lang]++;
      else langSplit.other++;

      if (r.ref) {
        try {
          const u = new URL(r.ref);
          const host = u.hostname.replace(/^www\./, '');
          refHosts.set(host, (refHosts.get(host) || 0) + 1);
        } catch { /* invalid URL, skip */ }
      }

      if (!isNaN(tsMs)) {
        if (tsMs >= cutoff7) last7++;
        if (tsMs >= cutoff30) last30++;
        if (tsMs >= cutoff60 && tsMs < cutoff30) prev30++;

        const dayKey = new Date(tsMs).toISOString().slice(0, 10);
        if (dailyMap.has(dayKey)) {
          dailyMap.set(dayKey, dailyMap.get(dayKey) + 1);
        }
      }
    }

    const topReferrers = Array.from(refHosts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([host, count]) => ({ host, count }));

    const daily = Array.from(dailyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));

    const recent = records.slice(0, 50).map((r) => ({
      email: r.email,
      ts: r.ts || null,
      lang: r.lang || '',
      ref: r.ref || '',
    }));

    const growthPct = prev30 > 0
      ? Math.round(((last30 - prev30) / prev30) * 100)
      : (last30 > 0 ? 100 : 0);

    return res.status(200).json({
      total: records.length,
      last7,
      last30,
      prev30,
      growthPct,
      langSplit,
      topReferrers,
      daily,
      recent,
    });
  } catch (err) {
    console.error('stats error', err && err.message);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
