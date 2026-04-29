(function () {
  const root = document.documentElement;
  const KEY = 'cve-theme';
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const nowLight = root.classList.contains('theme-light');
    root.classList.toggle('theme-light', !nowLight);
    root.classList.toggle('theme-dark', nowLight);
    try { localStorage.setItem(KEY, nowLight ? 'dark' : 'light'); } catch (_) {}
  });
})();
