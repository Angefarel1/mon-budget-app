/**
 * TAF — Auth Guard
 * Protège toutes les pages sauf auth.html
 * Gère la déconnexion et la suppression de compte
 */

const TAFAuth = (function () {

  const KEYS = {
    user: 'taf_user',
    session: 'taf_session',
    lang: 'taf_lang',
  };

  // Pages qui ne nécessitent PAS d'authentification
  const PUBLIC_PAGES = ['auth.html', 'index.html'];

  function isAuthenticated() {
    return !!localStorage.getItem(KEYS.session);
  }

  function getCurrentUser() {
    const raw = localStorage.getItem(KEYS.user);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  function guard() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';

    // Si sur auth.html et déjà connecté → rediriger vers index.html
    if (page === 'auth.html' && isAuthenticated()) {
      window.location.replace('index.html');
      return;
    }

    // Si page protégée et non connecté → rediriger vers auth.html
    if (!PUBLIC_PAGES.includes(page) && !isAuthenticated()) {
      window.location.replace('auth.html');
      return;
    }
  }

  function logout() {
    localStorage.removeItem(KEYS.session);
    window.location.replace('auth.html');
  }

  function deleteAccount() {
    // Supprimer toutes les données TAF
    const keysToKeep = []; // rien à garder
    const allKeys = Object.keys(localStorage).filter(k => k.startsWith('taf_'));
    allKeys.forEach(k => localStorage.removeItem(k));
    // Supprimer aussi les données de l'app
    ['expenses', 'goals', 'settings', 'taf_expenses', 'taf_goals', 'taf_settings'].forEach(k => {
      localStorage.removeItem(k);
    });
    window.location.replace('auth.html');
  }

  function injectLogoutBtn(navSelector) {
    if (!isAuthenticated()) return;
    const nav = document.querySelector(navSelector);
    if (!nav) return;

    const user = getCurrentUser();
    const btn = document.createElement('button');
    btn.className = 'btn btn-sm';
    btn.style.cssText = 'font-size:0.75rem;padding:6px 12px;margin-left:8px;';
    btn.textContent = (user ? '👤 ' + user.username + ' · ' : '') + 'Déconnexion';
    btn.addEventListener('click', () => {
      if (confirm('Se déconnecter ?')) logout();
    });
    nav.appendChild(btn);
  }

  // Exécuter le guard immédiatement
  guard();

  return { isAuthenticated, getCurrentUser, logout, deleteAccount, injectLogoutBtn, guard };
})();