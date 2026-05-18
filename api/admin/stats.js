/**
 * /api/admin/stats · GET endpoint pour KPIs newsletter aggrégés
 *
 * Auth · header "Authorization: Bearer <ADMIN_PASSWORD>"
 *
 * Renvoie ·
 *   {
 *     total: int,
 *     last7: int,
 *     last30: int,
 *     prev30: int,
 *     growthPct: number,
 *     langSplit: { fr, nl, en, other },
 *     topReferrers: [{host, count}],
 *     daily: [{date, count}], // 30 derniers jours
 *     recent: [{email, ts, lang, ref}], // 50 derniers
 *
 *     // CVE 2026-05-18 · phase A2 · KPIs étendus premium
 *     emailDomains: [{domain, count}],   // top 10 domaines email
 *     dowHours: number[7][24],           // grid jour-de-semaine × heure
 *     topSourcePages: [{path, count}],   // pages d'inscription (depuis ref)
 *     latestSub: {email, ts, lang} | null,
 *   }
 *
 * CVE 2026-05-18.
 */

import { kv } from '@vercel/kv';

const DAY_MS = 86400000;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' });
  }
  if (token !== process.env.ADMIN_PASSWORD) {
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
    const cut7 = now - 7 * DAY_MS;
    const cut30 = now - 30 * DAY_MS;
    const cut60 = now - 60 * DAY_MS;

    let last7 = 0, last30 = 0, prev30 = 0;
    const langSplit = { fr: 0, nl: 0, en: 0, other: 0 };
    const refHosts = new Map();
    const sourcePages = new Map();
    const emailDomains = new Map();
    const dailyMap = new Map();
    const dowHours = Array.from({ length: 7 }, () => Array(24).fill(0));

    // Init 30 derniers jours pour sparkline (asc dates)
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now - i * DAY_MS).toISOString().slice(0, 10);
      dailyMap.set(d, 0);
    }

    let latestSub = null;

    for (const r of records) {
      const tsMs = r.ts ? Date.parse(r.ts) : NaN;
      const lang = String(r.lang || '').toLowerCase();
      if (lang === 'fr' || lang === 'nl' || lang === 'en') langSplit[lang]++;
      else langSplit.other++;

      // Email domain
      const email = String(r.email || '');
      const at = email.lastIndexOf('@');
      if (at > 0) {
        const domain = email.slice(at + 1).toLowerCase();
        if (domain) emailDomains.set(domain, (emailDomains.get(domain) || 0) + 1);
      }

      // Referrer host + source page
      if (r.ref) {
        try {
          const u = new URL(r.ref);
          const host = u.hostname.replace(/^www\./, '');
          refHosts.set(host, (refHosts.get(host) || 0) + 1);
          // Source page if referer comes from own site
          if (host.endsWith('christophevanengelen.com')) {
            const p = u.pathname || '/';
            sourcePages.set(p, (sourcePages.get(p) || 0) + 1);
          }
        } catch { /* invalid URL */ }
      }

      if (!isNaN(tsMs)) {
        if (tsMs >= cut7) last7++;
        if (tsMs >= cut30) last30++;
        if (tsMs >= cut60 && tsMs < cut30) prev30++;

        const dayKey = new Date(tsMs).toISOString().slice(0, 10);
        if (dailyMap.has(dayKey)) dailyMap.set(dayKey, dailyMap.get(dayKey) + 1);

        const d = new Date(tsMs);
        const dow = (d.getUTCDay() + 6) % 7; // ISO · Mon=0, Sun=6
        dowHours[dow][d.getUTCHours()]++;

        if (!latestSub) {
          latestSub = { email: r.email, ts: r.ts, lang: r.lang || '' };
        }
      }
    }

    const topReferrers = Array.from(refHosts.entries())
      .sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([host, count]) => ({ host, count }));

    const topSourcePages = Array.from(sourcePages.entries())
      .sort((a, b) => b[1] - a[1]).slice(0, 8)
      .map(([path, count]) => ({ path, count }));

    const emailDomainsList = Array.from(emailDomains.entries())
      .sort((a, b) => b[1] - a[1]).slice(0, 10)
      .map(([domain, count]) => ({ domain, count }));

    const daily = Array.from(dailyMap.entries()).map(([date, count]) => ({ date, count }));

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
      emailDomains: emailDomainsList,
      dowHours,
      topSourcePages,
      latestSub,
    });
  } catch (err) {
    console.error('stats error', err && err.message);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}
