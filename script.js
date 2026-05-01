/* ============================================
   TAF — script.js
   Data layer · Utilities · i18n · Components
============================================ */

'use strict';

/* ══════════════════════════════════════════
   TRANSLATIONS (FR / EN)
══════════════════════════════════════════ */
const I18N = {
  fr: {
    nav_app: 'Accueil', nav_dashboard: 'Stats', nav_history: 'Historique', nav_settings: 'Réglages',
    add_expense: 'Ajouter une dépense', edit_expense: 'Modifier la dépense',
    amount: 'Montant', category: 'Catégorie', description: 'Description', date: 'Date',
    save: 'Enregistrer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier',
    balance: 'Solde', income: 'Revenus', expenses: 'Dépenses', savings: 'Épargne',
    budget: 'Budget', monthly_budget: 'Budget mensuel', add_income: 'Ajouter revenus',
    no_expenses: 'Aucune dépense', no_expenses_sub: 'Ajoutez votre première dépense ci-dessus.',
    objectives: 'Objectifs', add_objective: 'Nouvel objectif',
    obj_name: 'Nom de l\'objectif', obj_target: 'Montant cible', obj_saved: 'Déjà épargné',
    settings: 'Paramètres', currency: 'Devise', language: 'Langue',
    theme: 'Thème', light: 'Clair', dark: 'Sombre',
    profile: 'Profil', username: 'Votre prénom',
    month: 'Ce mois', today: 'Aujourd\'hui', all: 'Tout',
    dashboard: 'Tableau de bord', history: 'Historique',
    filter_all: 'Tout', filter_month: 'Ce mois', filter_week: 'Cette semaine',
    search: 'Rechercher...', total_spent: 'Total dépensé',
    cat_food: 'Alimentation', cat_transport: 'Transport', cat_health: 'Santé',
    cat_housing: 'Logement', cat_leisure: 'Loisirs', cat_shopping: 'Shopping',
    cat_education: 'Éducation', cat_savings: 'Épargne', cat_other: 'Autre',
    progress: 'Progression', remaining: 'Restant', spent: 'Dépensé',
    confirm_delete: 'Supprimer cette dépense ?', yes_delete: 'Oui, supprimer',
    added: 'Ajouté !', updated: 'Mis à jour !', deleted: 'Supprimé !', saved: 'Sauvegardé !',
    budget_alert: 'Budget dépassé !', obj_complete: 'Objectif atteint ! 🎉',
    income_added: 'Revenus ajoutés !', this_week: 'Cette semaine',
    top_categories: 'Top catégories', recent: 'Récentes', no_data: 'Aucune donnée',
    export: 'Exporter', monthly_stats: 'Stats mensuelles',
    privacy: 'Confidentialité', terms: 'Conditions',
    greeting_morning: 'Bonjour', greeting_afternoon: 'Bon après-midi', greeting_evening: 'Bonsoir',
    reset_data: 'Réinitialiser les données', reset_confirm: 'Effacer toutes les données ?',
    objective_progress: 'Progression des objectifs',
    add_to_obj: 'Ajouter des fonds', current_saved: 'Épargne actuelle',
    weekly_report: 'Rapport hebdomadaire', avg_daily: 'Moy. quotidienne',
    new_budget: 'Nouveau budget', income_month: 'Revenus du mois', expense_ratio: 'Taux de dépense',
    note: 'Note (optionnel)', recurring: 'Récurrent',
    savings_rate: 'Taux d\'épargne',
  },
  en: {
    nav_app: 'Home', nav_dashboard: 'Stats', nav_history: 'History', nav_settings: 'Settings',
    add_expense: 'Add expense', edit_expense: 'Edit expense',
    amount: 'Amount', category: 'Category', description: 'Description', date: 'Date',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit',
    balance: 'Balance', income: 'Income', expenses: 'Expenses', savings: 'Savings',
    budget: 'Budget', monthly_budget: 'Monthly budget', add_income: 'Add income',
    no_expenses: 'No expenses', no_expenses_sub: 'Add your first expense above.',
    objectives: 'Goals', add_objective: 'New goal',
    obj_name: 'Goal name', obj_target: 'Target amount', obj_saved: 'Already saved',
    settings: 'Settings', currency: 'Currency', language: 'Language',
    theme: 'Theme', light: 'Light', dark: 'Dark',
    profile: 'Profile', username: 'Your name',
    month: 'This month', today: 'Today', all: 'All',
    dashboard: 'Dashboard', history: 'History',
    filter_all: 'All', filter_month: 'This month', filter_week: 'This week',
    search: 'Search...', total_spent: 'Total spent',
    cat_food: 'Food', cat_transport: 'Transport', cat_health: 'Health',
    cat_housing: 'Housing', cat_leisure: 'Leisure', cat_shopping: 'Shopping',
    cat_education: 'Education', cat_savings: 'Savings', cat_other: 'Other',
    progress: 'Progress', remaining: 'Remaining', spent: 'Spent',
    confirm_delete: 'Delete this expense?', yes_delete: 'Yes, delete',
    added: 'Added!', updated: 'Updated!', deleted: 'Deleted!', saved: 'Saved!',
    budget_alert: 'Budget exceeded!', obj_complete: 'Goal reached! 🎉',
    income_added: 'Income added!', this_week: 'This week',
    top_categories: 'Top categories', recent: 'Recent', no_data: 'No data',
    export: 'Export', monthly_stats: 'Monthly stats',
    privacy: 'Privacy', terms: 'Terms',
    greeting_morning: 'Good morning', greeting_afternoon: 'Good afternoon', greeting_evening: 'Good evening',
    reset_data: 'Reset data', reset_confirm: 'Delete all data?',
    objective_progress: 'Goal progress',
    add_to_obj: 'Add funds', current_saved: 'Currently saved',
    weekly_report: 'Weekly report', avg_daily: 'Daily avg',
    new_budget: 'New budget', income_month: 'Monthly income', expense_ratio: 'Expense ratio',
    note: 'Note (optional)', recurring: 'Recurring',
    savings_rate: 'Savings rate',
  }
};

function t(key) {
  const lang = Store.get('settings', {}).language || 'fr';
  return (I18N[lang] && I18N[lang][key]) || (I18N['fr'][key]) || key;
}

/* ══════════════════════════════════════════
   DATA STORE (localStorage)
══════════════════════════════════════════ */
const Store = {
  _prefix: 'taf_',

  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(this._prefix + key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },

  set(key, value) {
    try { localStorage.setItem(this._prefix + key, JSON.stringify(value)); return true; }
    catch { return false; }
  },

  remove(key) {
    try { localStorage.removeItem(this._prefix + key); } catch {}
  },

  // Default structures
  defaultSettings() {
    return { currency: 'XOF', language: 'fr', theme: 'light', username: '', budget: 0, income: 0 };
  },

  getSettings()  { return { ...this.defaultSettings(), ...this.get('settings', {}) }; },
  saveSettings(s){ this.set('settings', s); },

  getExpenses()  { return this.get('expenses', []); },
  saveExpenses(e){ this.set('expenses', e); },

  getObjectives()  { return this.get('objectives', []); },
  saveObjectives(o){ this.set('objectives', o); },

  clearAll() {
    ['expenses','objectives','settings'].forEach(k => this.remove(k));
  }
};

/* ══════════════════════════════════════════
   CURRENCY HELPERS
══════════════════════════════════════════ */
const CURRENCIES = {
  XOF: { symbol: 'FCFA', rate: 655.96, position: 'after',  decimals: 0 },
  EUR: { symbol: '€',    rate: 1,      position: 'after',  decimals: 2 },
  USD: { symbol: '$',    rate: 1.08,   position: 'before', decimals: 2 },
  GBP: { symbol: '£',    rate: 0.86,   position: 'before', decimals: 2 },
  NGN: { symbol: '₦',   rate: 1700,   position: 'before', decimals: 0 },
  GHS: { symbol: 'GH₵', rate: 13.5,   position: 'before', decimals: 2 },
  MAD: { symbol: 'DH',  rate: 10.8,   position: 'after',  decimals: 2 },
  CAD: { symbol: 'CA$', rate: 1.47,   position: 'before', decimals: 2 },
  CHF: { symbol: 'CHF', rate: 0.94,   position: 'before', decimals: 2 },
};

function formatCurrency(amountEUR) {
  const cfg = Store.getSettings();
  const cur = CURRENCIES[cfg.currency] || CURRENCIES['EUR'];
  const val = amountEUR * cur.rate;
  const formatted = val.toFixed(cur.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return cur.position === 'before'
    ? `${cur.symbol}${formatted}`
    : `${formatted} ${cur.symbol}`;
}

function toEUR(amount) {
  const cfg = Store.getSettings();
  const cur = CURRENCIES[cfg.currency] || CURRENCIES['EUR'];
  return parseFloat(amount) / cur.rate;
}

function fromEUR(amountEUR) {
  const cfg = Store.getSettings();
  const cur = CURRENCIES[cfg.currency] || CURRENCIES['EUR'];
  return amountEUR * cur.rate;
}

/* ══════════════════════════════════════════
   DATE HELPERS
══════════════════════════════════════════ */
function today() { return new Date().toISOString().split('T')[0]; }
function thisMonth() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`; }
function thisWeekStart() {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + 1);
  return d.toISOString().split('T')[0];
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  const lang = Store.getSettings().language || 'fr';
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { day:'numeric', month:'short', year:'numeric' });
}

function isThisMonth(dateStr) {
  return dateStr && dateStr.startsWith(thisMonth());
}
function isThisWeek(dateStr) {
  return dateStr && dateStr >= thisWeekStart();
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return t('greeting_morning');
  if (h < 18) return t('greeting_afternoon');
  return t('greeting_evening');
}

/* ══════════════════════════════════════════
   EXPENSE MANAGER
══════════════════════════════════════════ */
const Expenses = {
  getAll()  { return Store.getExpenses(); },
  getMonth(){ return this.getAll().filter(e => isThisMonth(e.date)); },
  getWeek() { return this.getAll().filter(e => isThisWeek(e.date)); },

  add(data) {
    const expenses = this.getAll();
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const entry = {
      id,
      amount:      parseFloat(data.amount) || 0,
      category:    data.category || 'other',
      description: data.description || '',
      date:        data.date || today(),
      note:        data.note || '',
      recurring:   data.recurring || false,
      createdAt:   new Date().toISOString()
    };
    expenses.unshift(entry);
    Store.saveExpenses(expenses);
    return entry;
  },

  update(id, data) {
    const expenses = this.getAll();
    const idx = expenses.findIndex(e => e.id === id);
    if (idx === -1) return null;
    expenses[idx] = { ...expenses[idx], ...data, id };
    Store.saveExpenses(expenses);
    return expenses[idx];
  },

  delete(id) {
    const expenses = this.getAll().filter(e => e.id !== id);
    Store.saveExpenses(expenses);
  },

  totalMonth() { return this.getMonth().reduce((s, e) => s + (e.amount || 0), 0); },
  totalWeek()  { return this.getWeek().reduce((s, e)  => s + (e.amount || 0), 0); },
  totalAll()   { return this.getAll().reduce((s, e)   => s + (e.amount || 0), 0); },

  byCategory(list) {
    const map = {};
    (list || this.getMonth()).forEach(e => {
      map[e.category] = (map[e.category] || 0) + (e.amount || 0);
    });
    return map;
  }
};

/* ══════════════════════════════════════════
   OBJECTIVES MANAGER
══════════════════════════════════════════ */
const Objectives = {
  getAll()  { return Store.getObjectives(); },

  add(data) {
    const objs = this.getAll();
    const id   = Date.now().toString(36);
    const obj  = {
      id, name: data.name || '', target: parseFloat(data.target) || 0,
      saved: parseFloat(data.saved) || 0, color: data.color || '#22c55e',
      createdAt: new Date().toISOString()
    };
    objs.push(obj);
    Store.saveObjectives(objs);
    return obj;
  },

  addFunds(id, amount) {
    const objs = this.getAll();
    const idx  = objs.findIndex(o => o.id === id);
    if (idx === -1) return;
    objs[idx].saved = Math.min(objs[idx].target, (objs[idx].saved || 0) + parseFloat(amount || 0));
    Store.saveObjectives(objs);
    return objs[idx];
  },

  delete(id) {
    Store.saveObjectives(this.getAll().filter(o => o.id !== id));
  }
};

/* ══════════════════════════════════════════
   TOAST NOTIFICATIONS
══════════════════════════════════════════ */
const Toast = {
  show(message, type = 'success', duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const icon = { success:'✓', error:'✗', info:'ℹ' }[type] || '•';
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
  success(m) { this.show(m, 'success'); },
  error(m)   { this.show(m, 'error'); },
  info(m)    { this.show(m, 'info'); }
};

/* ══════════════════════════════════════════
   CATEGORY CONFIG
══════════════════════════════════════════ */
const CATEGORIES = [
  { id: 'food',       icon: '🍔', class: 'cat-food',      key: 'cat_food' },
  { id: 'transport',  icon: '🚗', class: 'cat-transport',  key: 'cat_transport' },
  { id: 'health',     icon: '💊', class: 'cat-health',     key: 'cat_health' },
  { id: 'housing',    icon: '🏠', class: 'cat-housing',    key: 'cat_housing' },
  { id: 'leisure',    icon: '🎮', class: 'cat-leisure',    key: 'cat_leisure' },
  { id: 'shopping',   icon: '🛍', class: 'cat-shopping',   key: 'cat_shopping' },
  { id: 'education',  icon: '📚', class: 'cat-education',  key: 'cat_education' },
  { id: 'savings',    icon: '💰', class: 'cat-savings',    key: 'cat_savings' },
  { id: 'other',      icon: '📌', class: 'cat-other',      key: 'cat_other' },
];

function getCatConfig(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

function buildCategoryOptions() {
  return CATEGORIES.map(c => `<option value="${c.id}">${c.icon} ${t(c.key)}</option>`).join('');
}

/* ══════════════════════════════════════════
   THEME MANAGER
══════════════════════════════════════════ */
const Theme = {
  apply() {
    const s = Store.getSettings();
    document.documentElement.setAttribute('data-theme', s.theme || 'light');
  },
  toggle() {
    const s = Store.getSettings();
    s.theme = s.theme === 'dark' ? 'light' : 'dark';
    Store.saveSettings(s);
    this.apply();
  }
};

/* ══════════════════════════════════════════
   CHART HELPER (canvas pie/donut)
══════════════════════════════════════════ */
const Charts = {
  drawDonut(canvasId, data, colors) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W/2, cy = H/2;
    const outerR = Math.min(W,H)/2 - 10;
    const innerR = outerR * 0.58;

    ctx.clearRect(0, 0, W, H);

    const total = data.reduce((s,d) => s + d.value, 0);
    if (total === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, 0, Math.PI*2);
      ctx.arc(cx, cy, innerR, 0, Math.PI*2, true);
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-3').trim() || '#f1f5f9';
      ctx.fill();
      return;
    }

    let startAngle = -Math.PI / 2;
    const gap = 0.025;

    data.forEach((d, i) => {
      const slice = (d.value / total) * (Math.PI * 2 - gap * data.length);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outerR, startAngle + gap/2, startAngle + slice + gap/2);
      ctx.arc(cx, cy, innerR, startAngle + slice + gap/2, startAngle + gap/2, true);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      startAngle += slice + gap;
    });
  },

  drawBars(canvasId, labels, values, color = '#22c55e') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx  = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    if (!values.length) return;

    const maxVal = Math.max(...values, 1);
    const barW   = Math.floor((W - 20) / values.length - 6);
    const padX   = 10;
    const padB   = 28;
    const chartH = H - padB - 10;

    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-4').trim() || '#94a3b8';
    ctx.font = '10px Plus Jakarta Sans';
    ctx.textAlign = 'center';

    values.forEach((v, i) => {
      const x   = padX + i * (barW + 6);
      const bh  = Math.max(4, (v / maxVal) * chartH);
      const y   = H - padB - bh;
      const r   = Math.min(4, barW/2);

      ctx.beginPath();
      ctx.roundRect(x, y, barW, bh, [r, r, 0, 0]);
      ctx.fillStyle = color;
      ctx.fill();

      if (labels[i]) {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-3').trim() || '#64748b';
        ctx.fillText(labels[i], x + barW/2, H - 8);
      }
    });
  }
};

/* ══════════════════════════════════════════
   BOTTOM NAV ACTIVE STATE
══════════════════════════════════════════ */
function setActiveNav(page) {
  document.querySelectorAll('.bnav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  document.querySelectorAll('.desktop-nav a').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
}

/* ══════════════════════════════════════════
   MODAL HELPER
══════════════════════════════════════════ */
const Modal = {
  open(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  close(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('open');
    document.body.style.overflow = '';
  },
  closeAll() {
    document.querySelectorAll('.modal-overlay.open').forEach(el => {
      el.classList.remove('open');
    });
    document.body.style.overflow = '';
  }
};

/* ══════════════════════════════════════════
   EXPORT TO CSV
══════════════════════════════════════════ */
function exportCSV() {
  const expenses = Expenses.getAll();
  if (!expenses.length) { Toast.info(t('no_data')); return; }
  const header = ['Date', 'Description', 'Category', 'Amount (EUR)', 'Note'].join(',');
  const rows = expenses.map(e =>
    [e.date, `"${e.description}"`, e.category, e.amount.toFixed(2), `"${e.note || ''}"`].join(',')
  );
  const csv  = [header, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `taf_export_${today()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

/* ══════════════════════════════════════════
   GLOBAL INIT (runs on every page)
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  Theme.apply();

  // Close modals on overlay click
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', e => {
      if (e.target === el) Modal.close(el.id);
    });
  });

  // Bottom nav routing
  document.querySelectorAll('.bnav-item[data-href]').forEach(el => {
    el.addEventListener('click', () => {
      window.location.href = el.dataset.href;
    });
  });

  // Desktop nav routing
  document.querySelectorAll('.desktop-nav a[data-href]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = el.dataset.href;
    });
  });
});

/* ══════════════════════════════════════════
   PAGE TRANSITION SYSTEM
══════════════════════════════════════════ */
const PageTransition = {
  _loaderEl: null,
  _duration: 800, // ms total transition

  _getLoader() {
    if (this._loaderEl) return this._loaderEl;
    const el = document.createElement('div');
    el.id = 'page-loader';
    el.innerHTML = `
      <div class="loader-logo">T<span>AF</span></div>
      <div class="loader-bar-track">
        <div class="loader-bar-fill" id="loader-bar"></div>
      </div>
      <div class="loader-dots">
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
        <div class="loader-dot"></div>
      </div>
    `;
    document.body.appendChild(el);
    this._loaderEl = el;
    return el;
  },

  show(callback) {
    const loader = this._getLoader();
    // Reset bar animation
    const bar = loader.querySelector('.loader-bar-fill');
    if (bar) { bar.style.animation = 'none'; bar.offsetHeight; bar.style.animation = ''; }
    loader.classList.add('visible');
    setTimeout(() => { if (callback) callback(); }, this._duration * 0.65);
  },

  hide() {
    const loader = this._getLoader();
    setTimeout(() => loader.classList.remove('visible'), 120);
  },

  // Navigate to URL with loading animation
  go(url) {
    if (!url) return;
    this.show(() => { window.location.href = url; });
  },

  // Intercept all internal navigation links
  init() {
    // Apply entrance animation to current page
    document.body.classList.add('page-enter');

    // Hide loader if visible (arriving on page)
    this.hide();

    // Intercept link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href], [data-href]');
      if (!link) return;

      const href = link.getAttribute('href') || link.dataset.href;
      if (!href) return;

      // Skip external, anchor, tel, mailto links
      if (href.startsWith('http') || href.startsWith('#') ||
          href.startsWith('tel') || href.startsWith('mailto')) return;

      // Skip if modifier key held
      if (e.ctrlKey || e.metaKey || e.shiftKey) return;

      e.preventDefault();
      this.go(href);
    }, true);
  }
};

// Auto-init on every page load
document.addEventListener('DOMContentLoaded', () => {
  PageTransition.init();
});