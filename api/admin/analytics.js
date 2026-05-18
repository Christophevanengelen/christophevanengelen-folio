/**
 * /api/admin/analytics · GET endpoint pour Vercel Web Analytics
 *
 * Auth · header "Authorization: Bearer <ADMIN_PASSWORD>"
 *
 * ⚠️ LIMITATION DÉCOUVERTE 2026-05-18 ·
 *   Vercel n'expose AUCUN endpoint REST API public pour lire les données
 *   Web Analytics. Le dashboard utilise un API interne (vercel.com/api/stream/internal)
 *   qui nécessite la session browser cookies, pas Bearer token.
 *
 * Donc · cet endpoint retourne juste des URLs deep-link vers le dashboard
 *   Vercel pour que le admin /admin tab Analytics affiche un bouton
 *   "Voir sur Vercel Dashboard".
 *
 * Si Vercel ouvre l'API plus tard · on remplit `kpis` ici.
 *
 * CVE 2026-05-18.
 */

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = String(req.headers['authorization'] || '');
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return res.status(500).json({ error: 'ADMIN_PASSWORD env var not set' });
  if (token !== expected) return res.status(401).json({ error: 'Unauthorized' });

  const teamSlug = 'vanengelenchristophe-6584s-projects';
  const projectName = 'folio';
  const base = `https://vercel.com/${teamSlug}/${projectName}`;

  return res.status(200).json({
    mode: 'dashboard-only',
    reason: 'Vercel n\'expose pas d\'API publique pour Web Analytics · dashboard-only.',
    links: {
      webAnalytics: `${base}/analytics`,
      speedInsights: `${base}/speed-insights`,
      logs: `${base}/logs`,
      overview: `${base}`,
    },
    docs: 'https://vercel.com/docs/analytics',
  });
}
