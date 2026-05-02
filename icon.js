/* ============================================
   TAF — Lucide SVG Icon System
   Centralized, consistent, professional
============================================ */

const Icons = {
  // Size variants
  sizes: { xs: 14, sm: 16, md: 20, lg: 24, xl: 32 },

  // Core SVG builder
  svg(path, size = 20, extraAttrs = '') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extraAttrs}>${path}</svg>`;
  },

  // ─── Navigation Icons ───────────────────────
  home: (s=20) => Icons.svg('<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', s),
  barChart: (s=20) => Icons.svg('<line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/>', s),
  history: (s=20) => Icons.svg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>', s),
  settings: (s=20) => Icons.svg('<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>', s),

  // ─── Finance Icons ───────────────────────────
  wallet: (s=20) => Icons.svg('<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>', s),
  trendingUp: (s=20) => Icons.svg('<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>', s),
  trendingDown: (s=20) => Icons.svg('<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>', s),
  dollarSign: (s=20) => Icons.svg('<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', s),
  creditCard: (s=20) => Icons.svg('<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>', s),
  piggyBank: (s=20) => Icons.svg('<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M2 9v1a2 2 0 0 0 2 2h1"/><path d="M16 11h0"/>', s),
  target: (s=20) => Icons.svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', s),
  receipt: (s=20) => Icons.svg('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M14 8H8"/><path d="M16 12H8"/><path d="M13 16H8"/>', s),
  arrowUpRight: (s=20) => Icons.svg('<path d="M7 7h10v10"/><path d="M7 17 17 7"/>', s),
  arrowDownLeft: (s=20) => Icons.svg('<path d="M17 17H7V7"/><path d="m17 7-10 10"/>', s),

  // ─── Category Icons ──────────────────────────
  shoppingCart: (s=20) => Icons.svg('<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>', s),
  home2: (s=20) => Icons.svg('<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>', s),
  car: (s=20) => Icons.svg('<path d="M19 17H5v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1Z"/><path d="M3 17H1v-2a4 4 0 0 1 4-4h1"/><path d="M23 17h-2v-2a4 4 0 0 0-4-4h-1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/>', s),
  heartPulse: (s=20) => Icons.svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5.5-4 1.5 2h5.27"/>', s),
  graduationCap: (s=20) => Icons.svg('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', s),
  gamepad: (s=20) => Icons.svg('<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>', s),
  plane: (s=20) => Icons.svg('<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4c-2 0-4 0-4 1.5L11 9.2 3 7.4l-.4 2L8 12l-3 1H3l-1 2 2.5 1.5L6 19l2 1 1.5-2.5L12 21l2-.4L12 13l4.2-4.2 3.5 9.4z"/>', s),
  zap: (s=20) => Icons.svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>', s),
  moreHorizontal: (s=20) => Icons.svg('<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>', s),

  // ─── Action Icons ────────────────────────────
  plus: (s=20) => Icons.svg('<path d="M5 12h14"/><path d="M12 5v14"/>', s),
  minus: (s=20) => Icons.svg('<path d="M5 12h14"/>', s),
  edit: (s=20) => Icons.svg('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>', s),
  trash: (s=20) => Icons.svg('<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>', s),
  save: (s=20) => Icons.svg('<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>', s),
  download: (s=20) => Icons.svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>', s),
  upload: (s=20) => Icons.svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>', s),
  search: (s=20) => Icons.svg('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', s),
  filter: (s=20) => Icons.svg('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>', s),
  x: (s=20) => Icons.svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', s),
  check: (s=20) => Icons.svg('<path d="M20 6 9 17l-5-5"/>', s),
  chevronRight: (s=20) => Icons.svg('<path d="m9 18 6-6-6-6"/>', s),
  chevronLeft: (s=20) => Icons.svg('<path d="m15 18-6-6 6-6"/>', s),
  chevronDown: (s=20) => Icons.svg('<path d="m6 9 6 6 6-6"/>', s),
  arrowLeft: (s=20) => Icons.svg('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>', s),
  refreshCw: (s=20) => Icons.svg('<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>', s),

  // ─── Status / Info Icons ────────────────────
  sun: (s=20) => Icons.svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>', s),
  moon: (s=20) => Icons.svg('<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>', s),
  bell: (s=20) => Icons.svg('<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>', s),
  shield: (s=20) => Icons.svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', s),
  lock: (s=20) => Icons.svg('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', s),
  info: (s=20) => Icons.svg('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>', s),
  alertTriangle: (s=20) => Icons.svg('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>', s),
  checkCircle: (s=20) => Icons.svg('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', s),
  user: (s=20) => Icons.svg('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', s),
  users: (s=20) => Icons.svg('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', s),
  camera: (s=20) => Icons.svg('<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>', s),
  globe: (s=20) => Icons.svg('<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', s),
  package: (s=20) => Icons.svg('<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', s),
  smartphone: (s=20) => Icons.svg('<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>', s),
  fileText: (s=20) => Icons.svg('<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>', s),
  scroll: (s=20) => Icons.svg('<path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 3H8.5a2.5 2.5 0 0 0 0 5H19V3Z"/>', s),
  arrowRight: (s=20) => Icons.svg('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>', s),
  layoutDashboard: (s=20) => Icons.svg('<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>', s),
  repeat: (s=20) => Icons.svg('<path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>', s),

  // ─── Specific feature icons ──────────────────
  flame: (s=20) => Icons.svg('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>', s),
  percentage: (s=20) => Icons.svg('<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>', s),
  calendar: (s=20) => Icons.svg('<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>', s),
  star: (s=20) => Icons.svg('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', s),
  activity: (s=20) => Icons.svg('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', s),
};

// Helper: get icon for a category
function getCategoryIcon(catId, size = 20) {
  const map = {
    food:      Icons.shoppingCart(size),
    housing:   Icons.home2(size),
    transport: Icons.car(size),
    health:    Icons.heartPulse(size),
    education: Icons.graduationCap(size),
    leisure:   Icons.gamepad(size),
    travel:    Icons.plane(size),
    utilities: Icons.zap(size),
    other:     Icons.moreHorizontal(size),
  };
  return map[catId] || Icons.moreHorizontal(size);
}