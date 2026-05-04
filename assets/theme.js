/* CVE 2026-05-04 S6.2 · theme toggle avec aria-pressed dynamique
   pour annoncer correctement l'état dark/light aux lecteurs d'écran. */
(function () {
  const root = document.documentElement;
  const KEY = 'cve-theme';
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  function reflectAriaPressed() {
    const isLight = root.classList.contains('theme-light');
    btn.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    btn.setAttribute('aria-label', isLight ? 'Basculer en mode sombre' : 'Basculer en mode clair');
  }
  reflectAriaPressed();

  btn.addEventListener('click', () => {
    const nowLight = root.classList.contains('theme-light');
    root.classList.toggle('theme-light', !nowLight);
    root.classList.toggle('theme-dark', nowLight);
    try { localStorage.setItem(KEY, nowLight ? 'dark' : 'light'); } catch (_) {}
    reflectAriaPressed();
  });
})();
