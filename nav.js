// nav.js
(function () {
  var current = window.location.pathname.split('/').pop() || 'index.html';

  var NAV = [
    { type: 'link', label: 'Dashboard', href: 'home.html', icon: 'layout-dashboard' },
    { type: 'divider' },
    { type: 'section', label: 'Mijn Contract', icon: 'file-text', children: [
      { label: 'Contractdetails', href: 'contract.html',       icon: 'file-text' },
      { label: 'Ons team',        href: 'contactpersonen.html',icon: 'users' },
      { label: 'Diensten',        href: 'services.html',       icon: 'settings-2' },
    ]},
    { type: 'section', label: 'Meldingen & Opvolging', icon: 'bell', children: [
      { label: 'Nieuwe melding',  href: 'tickets-nieuw.html', icon: 'plus-circle', accent: true },
      { label: 'Mijn meldingen',  href: 'tickets.html',       icon: 'message-circle' },
      { label: 'Planning',        href: 'planning.html',       icon: 'calendar' },
      { label: 'Te ondertekenen', href: 'actions.html',        icon: 'pen-line', badge: 2 },
    ]},
    { type: 'section', label: 'Installaties & Keuringen', icon: 'wrench', children: [
      { label: 'Installaties',           href: 'assets.html',       icon: 'cpu' },
      { label: 'Keuringen & inspecties', href: 'audits.html',        icon: 'clipboard-check' },
      { label: 'Werkdossiers',           href: 'projectfiches.html', icon: 'folder-open' },
    ]},
    { type: 'section', label: 'Financieel', icon: 'euro', children: [
      { label: 'Facturen',             href: 'invoices.html',  icon: 'receipt' },
      { label: 'Openstaande bedragen', href: 'openstaand.html',icon: 'alert-circle' },
    ]},
    { type: 'section', label: 'Documenten', icon: 'files', children: [
      { label: 'Alle documenten',   href: 'documenten.html',      icon: 'files' },
      { label: 'Uitvoeringsbonnen', href: 'uitvoeringsbonnen.html',icon: 'clipboard-list' },
    ]},
    { type: 'divider' },
    { type: 'section', label: 'Nieuws & Updates', icon: 'megaphone', children: [
      { label: 'Updates & aankondigingen', href: 'communicatie.html', icon: 'megaphone' },
    ]},
  ];

  function icon(name, size) {
    size = size || 16;
    return '<i data-lucide="' + name + '" style="width:' + size + 'px;height:' + size + 'px;flex-shrink:0"></i>';
  }

  function renderNav(items) {
    return items.map(function (item) {
      if (item.type === 'divider') return '<hr class="nav-divider">';
      if (item.type === 'link') {
        var active = current === item.href ? ' active' : '';
        return '<a href="' + item.href + '" class="nav-item' + active + '">' +
          icon(item.icon) + '<span>' + item.label + '</span></a>';
      }
      if (item.type === 'section') {
        var isOpen = item.children.some(function (c) { return c.href === current; });
        var children = item.children.map(function (c) {
          var active = current === c.href ? ' active' : '';
          var badge  = c.badge ? '<span class="nav-badge">' + c.badge + '</span>' : '';
          var accentStyle = c.accent ? ' style="color:var(--color-accent);font-weight:700"' : '';
          return '<a href="' + c.href + '" class="nav-child' + active + '"' + accentStyle + '>' +
            icon(c.icon, 14) + '<span>' + c.label + '</span>' + badge + '</a>';
        }).join('');
        return (
          '<div class="nav-section' + (isOpen ? ' open' : '') + '">' +
            '<div class="nav-section-header" onclick="this.parentElement.classList.toggle(\'open\')">' +
              '<span class="nav-section-label">' + icon(item.icon, 13) + item.label + '</span>' +
              '<span class="nav-chevron">▾</span>' +
            '</div>' +
            '<div class="nav-section-children">' + children + '</div>' +
          '</div>'
        );
      }
      return '';
    }).join('');
  }

  // Lucide laden als nog niet aanwezig
  function initLucide() {
    if (window.lucide) { window.lucide.createIcons(); return; }
    var s = document.createElement('script');
    s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
    s.onload = function () { window.lucide.createIcons(); };
    document.head.appendChild(s);
  }

  // Logo met gekleurde blokjes op alle pagina's
  var logoEl = document.querySelector('.topbar .logo');
  if (logoEl && !logoEl.querySelector('svg')) {
    logoEl.innerHTML =
      '<svg width="26" height="26" viewBox="0 0 28 28" style="vertical-align:middle;margin-right:7px;flex-shrink:0">' +
        '<rect x="0"  y="0"  width="12" height="12" rx="2" fill="#4A90D9"/>' +
        '<rect x="16" y="0"  width="12" height="12" rx="2" fill="#74AE25"/>' +
        '<rect x="0"  y="16" width="12" height="12" rx="2" fill="#F4A300"/>' +
        '<rect x="16" y="16" width="12" height="12" rx="2" fill="#D93025"/>' +
      '</svg>ATALIAN.';
  }

  var sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = renderNav(NAV);
    initLucide();
  }
})();
