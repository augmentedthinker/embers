(function () {
  const STORAGE_KEY = 'embers-theme';

  function themeHref(name, artifactPage) {
    const basePath = artifactPage ? '../assets/styles/' : './assets/styles/';
    switch (name) {
      case 'embers-light': return basePath + 'embers-light.css';
      case 'editorial': return basePath + 'editorial.css';
      case 'embers-dark':
      default: return basePath + 'embers-base.css';
    }
  }

  function applyTheme(name) {
    const valid = ['embers-dark', 'embers-light', 'editorial'];
    const theme = valid.includes(name) ? name : 'embers-dark';
    const artifactPage = /\/artifacts\//.test(window.location.pathname);
    const link = document.getElementById('theme-variant');
    if (link) link.setAttribute('href', themeHref(theme, artifactPage));

    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-button]').forEach((button) => {
      const active = button.getAttribute('data-theme-button') === theme;
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      button.classList.toggle('is-active', active);
    });

    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  function init() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    applyTheme(saved || 'embers-dark');

    document.querySelectorAll('[data-theme-button]').forEach((button) => {
      button.addEventListener('click', () => {
        applyTheme(button.getAttribute('data-theme-button'));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
