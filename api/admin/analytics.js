/**
 * /api/admin/analytics · GET endpoint pour KPIs Vercel Web Analytics
 *
 * Auth · header "Authorization: Bearer <ADMIN_PASSWORD>"
 *
 * Lit l'API Vercel Web Insights et retourne les KPIs principaux ·
 *   - visitors / pageviews 30 jours
 *   - top 5 pages
 *   - top 5 referrers
 *   - split langue (via path / ou /en/ ou /nl/)
 *   - devices breakdown
 *   - countries top 5
 *   - daily visitors 30j (sparkline)
 *
 * Env vars requises ·
 *   - ADMIN_PASSWORD (auth admin · déjà utilisé par /api/admin)
 *   - VERCEL_TOKEN (token API Vercel · scope Read Analytics)
 *   - VERCEL_PROJECT_ID (prj_X3AXe0RwvAWFZ03c3k0egPWVTQdg · cf .vercel/project.json)
 *   - VERCEL_TEAM_ID (team_WOr8m0BlfvPCkEDuJrsX8Y9o · cf .vercel/project.json)
 *
 * Setup CVE ·
 *   1. Activer Web Analytics dans Vercel dashboard (Project → Analytics → Enable)
 *   2. Créer token API · vercel.com/account/tokens → "Create" · scope Read-only
 *   3. Set env vars · vercel env add VERCEL_TOKEN / PROJECT_ID / TEAM_ID
 *
 * CVE 2026-05-18.
 */

const VERCEL_API_BASE = 'https://api.vercel.com';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  /* Auth */
  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' });
  }
  if (token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  /* Env vars Vercel */
  const vercelToken = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!vercelToken || !projectId) {
    return res.status(200).json({
      configured: false,
      hint: 'Set VERCEL_TOKEN + VERCEL_PROJECT_ID env vars on Vercel dashboard. See /api/admin/analytics source for instructions.',
    });
  }

  /* Range · 30 jours */
  const to = new Date();
  const from = new Date(to.getTime() - 30 * 86400000);
  const fromIso = from.toISOString();
  const toIso = to.toISOString();

  const filterParams = new URLSearchParams({
    projectId,
    from: fromIso,
    to: toIso,
    environment: 'production',
  });
  if (teamId) filterParams.set('teamId', teamId);

  const headers = {
    'Authorization': `Bearer ${vercelToken}`,
    'Content-Type': 'application/json',
  };

  /* Helper · fetch with error handling */
  async function fetchInsights(path) {
    const url = `${VERCEL_API_BASE}${path}?${filterParams.toString()}`;
    const r = await fetch(url, { headers });
    if (!r.ok) {
      const errBody = await r.text().catch(() => '');
      throw new Error(`Vercel API ${path} → ${r.status}: ${errBody.slice(0, 200)}`);
    }
    return r.json();
  }

  try {
    /* Parallel fetch des endpoints Vercel Insights ·
       Vercel Web Insights API · https://vercel.com/docs/rest-api/endpoints/insights */
    const [
      visitorsData,
      pagesData,
      referrersData,
      devicesData,
      countriesData,
    ] = await Promise.all([
      fetchInsights('/v1/web/insights/visitors').catch((e) => ({ error: e.message })),
      fetchInsights('/v1/web/insights/path').catch((e) => ({ error: e.message })),
      fetchInsights('/v1/web/insights/referrer').catch((e) => ({ error: e.message })),
      fetchInsights('/v1/web/insights/device').catch((e) => ({ error: e.message })),
      fetchInsights('/v1/web/insights/country').catch((e) => ({ error: e.message })),
    ]);

    /* Si tous les endpoints fail · probablement Web Analytics pas activé */
    const allFailed = [visitorsData, pagesData, referrersData, devicesData, countriesData]
      .every((d) => d.error);

    if (allFailed) {
      return res.status(200).json({
        configured: true,
        enabled: false,
        hint: 'Web Analytics activé ? Vercel dashboard → Project → Analytics → Enable Web Analytics. Puis attendre quelques heures pour collecter des données.',
        debug: visitorsData.error,
      });
    }

    /* Agrégations · langue détectée via path prefix (/en/ ou /nl/, sinon FR) */
    const pages = (pagesData.data || []).slice(0, 5);
    const langSplit = computeLangSplit(pagesData.data || []);

    return res.status(200).json({
      configured: true,
      enabled: true,
      range: { from: fromIso, to: toIso },
      visitors: pickTotal(visitorsData, 'visitors'),
      pageviews: pickTotal(visitorsData, 'pageviews'),
      daily: pickSeries(visitorsData),
      topPages: pages.map((p) => ({ path: p.path || p.name || '', count: p.visitors || p.count || 0 })),
      topReferrers: (referrersData.data || []).slice(0, 5).map((r) => ({
        host: r.referrer || r.name || '(direct)',
        count: r.visitors || r.count || 0,
      })),
      devices: (devicesData.data || []).map((d) => ({
        name: d.device || d.name || '',
        count: d.visitors || d.count || 0,
      })),
      countries: (countriesData.data || []).slice(0, 5).map((c) => ({
        name: c.country || c.name || '',
        count: c.visitors || c.count || 0,
      })),
      langSplit,
    });
  } catch (err) {
    console.error('analytics error', err && err.message);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
}

/* Total pris du payload visitors (Vercel renvoie un summary + serie) */
function pickTotal(data, key) {
  if (!data || data.error) return 0;
  if (typeof data[key] === 'number') return data[key];
  if (data.summary && typeof data.summary[key] === 'number') return data.summary[key];
  if (Array.isArray(data.data)) {
    return data.data.reduce((sum, row) => sum + (row[key] || row.count || 0), 0);
  }
  return 0;
}

/* Série jour-par-jour pour sparkline */
function pickSeries(data) {
  if (!data || data.error) return [];
  if (Array.isArray(data.series)) {
    return data.series.map((p) => ({
      date: p.date || p.timestamp || p.t || '',
      count: p.visitors || p.count || 0,
    }));
  }
  if (Array.isArray(data.data)) {
    return data.data.map((p) => ({
      date: p.date || p.day || '',
      count: p.visitors || p.count || 0,
    }));
  }
  return [];
}

/* Détecte la langue par préfixe path · /en/, /nl/, sinon FR */
function computeLangSplit(pages) {
  const split = { fr: 0, nl: 0, en: 0 };
  for (const p of pages) {
    const path = String(p.path || p.name || '');
    const count = p.visitors || p.count || 0;
    if (path.startsWith('/en/') || path === '/en') split.en += count;
    else if (path.startsWith('/nl/') || path === '/nl') split.nl += count;
    else split.fr += count;
  }
  return split;
}
