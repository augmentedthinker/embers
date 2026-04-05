(function () {
  const STORAGE_KEY = 'embers-theme';
  const themes = {
    base: {
      id: 'theme-base',
      href: '../assets/styles/embers-base.css'
    },
    light: {
      id: 'theme-light',
      href: '../assets/styles/embers-minimal-light.css'
    }
  };

  function resolveHref(type) {
    const path = window.location.pathname;
    const inArtifact = /\/artifacts\//.test(path);
    if (type === 'base') return inArtifact ? '../assets/styles/embers-base.css' : './assets/styles/embers-base.css';
    return inArtifact ? '../assets/styles/embers-minimal-light.css' : './assets/styles/embers-minimal-light.css';
  }

  function applyTheme(name) {
    const theme = name === 'light' ? 'light' : 'base';
    const link = document.getElementById('theme-variant');
    if (link) link.setAttribute('href', resolveHref(theme));
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelectorAll('[data-theme-button]').forEach((button) => {
      const active = button.getAttribute('data-theme-button') === theme;
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      button.classList.toggle('is-active', active);
    });
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
  }

  function init() {
    const saved = (() => {
      try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    })();
    applyTheme(saved || 'base');
    document.querySelectorAll('[data-theme-button]').forEach((button) => {
      button.addEventListener('click', () => applyTheme(button.getAttribute('data-theme-button')));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
