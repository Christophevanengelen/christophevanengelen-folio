/**
 * /api/admin/deployments · GET endpoint
 *
 * Fetch les 15 derniers deploys via Vercel REST API /v6/deployments,
 * agrège métriques (counts 7d/30d, durations, success rate, états).
 *
 * Auth · Bearer ADMIN_PASSWORD.
 * Requiert VERCEL_TOKEN + VERCEL_PROJECT_ID + VERCEL_TEAM_ID env vars.
 *
 * Renvoie ·
 *   {
 *     deployments: [{
 *       id, sha, subject, status, branch, createdAt,
 *       durationMs, author, repo, inspectorUrl, url
 *     }],
 *     counts: {
 *       total7d, total30d, ready, error, building
 *     },
 *     latestSuccess: { sha, subject, durationMs, createdAt } | null,
 *     avgDurationMs: number
 *   }
 *
 * CVE 2026-05-18.
 */

const VERCEL_API = 'https://api.vercel.com';
const DAY_MS = 86400000;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const vt = process.env.VERCEL_TOKEN;
  const pid = process.env.VERCEL_PROJECT_ID;
  const tid = process.env.VERCEL_TEAM_ID;
  if (!vt || !pid) {
    return res.status(200).json({
      configured: false,
      hint: 'VERCEL_TOKEN + VERCEL_PROJECT_ID required',
    });
  }

  const params = new URLSearchParams({ projectId: pid, limit: '15' });
  if (tid) params.set('teamId', tid);

  try {
    const r = await fetch(`${VERCEL_API}/v6/deployments?${params}`, {
      headers: { Authorization: `Bearer ${vt}` },
    });
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      return res.status(500).json({ error: 'Vercel API ' + r.status, detail: txt.slice(0, 300) });
    }
    const data = await r.json();
    const raw = Array.isArray(data.deployments) ? data.deployments : [];

    const now = Date.now();
    let total7d = 0, total30d = 0;
    let ready = 0, error = 0, building = 0;
    let durSum = 0, durCount = 0;
    let latestSuccess = null;

    const deployments = raw.map((d) => {
      const sha = d.meta?.githubCommitSha || '';
      const fullMsg = d.meta?.githubCommitMessage || '';
      const subject = fullMsg.split('\n')[0].slice(0, 120);
      const branch = d.meta?.githubCommitRef || '';
      const repo = d.meta?.githubCommitRepo || '';
      const createdAt = d.created || 0;
      const readyAt = d.ready || d.buildingAt || 0;
      const durationMs = readyAt && createdAt && readyAt > createdAt ? readyAt - createdAt : null;
      const author = d.creator?.username || '';
      const state = d.state || d.readyState || '';

      if (createdAt >= now - 7 * DAY_MS) total7d++;
      if (createdAt >= now - 30 * DAY_MS) total30d++;
      if (state === 'READY') {
        ready++;
        if (durationMs) { durSum += durationMs; durCount++; }
        if (!latestSuccess) {
          latestSuccess = { sha: sha.slice(0, 7), subject, durationMs, createdAt };
        }
      } else if (state === 'ERROR' || state === 'CANCELED') error++;
      else if (state === 'BUILDING' || state === 'QUEUED') building++;

      return {
        id: d.id,
        sha: sha.slice(0, 7),
        subject,
        status: state,
        branch,
        createdAt,
        durationMs,
        author,
        repo,
        inspectorUrl: d.inspectorUrl || '',
        url: d.url || '',
      };
    });

    return res.status(200).json({
      configured: true,
      deployments,
      counts: { total7d, total30d, ready, error, building },
      latestSuccess,
      avgDurationMs: durCount > 0 ? Math.round(durSum / durCount) : 0,
    });
  } catch (e) {
    return res.status(500).json({ error: 'Server error', detail: e.message });
  }
}
