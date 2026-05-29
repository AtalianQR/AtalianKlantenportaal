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
    ]},
    { type: 'section', label: 'Exploitatie', icon: 'layers', children: [
      { label: 'Schoonmaak',           href: 'projectfiches.html',     icon: 'sparkles', subchildren: [
        { label: 'Glaswas',            href: 'glaswas.html',           icon: 'droplets' },
      ]},
      { label: 'Catering',             href: 'catering.html',          icon: 'coffee' },
      { label: 'Technisch onderhoud',  href: 'technisch.html',         icon: 'wrench' },
      { label: 'Groenonderhoud',       href: 'groen.html',             icon: 'leaf' },
      { label: 'Uitvoeringsbonnen',    href: 'uitvoeringsbonnen.html', icon: 'clipboard-list' },
      { label: 'Bestellingen',         href: 'bestelportaal.html',     icon: 'shopping-cart' },
    ]},
    { type: 'section', label: 'Financieel', icon: 'euro', children: [
      { label: 'Facturen',             href: 'invoices.html',  icon: 'receipt' },
      { label: 'Openstaande bedragen', href: 'openstaand.html',icon: 'alert-circle' },
    ]},
    { type: 'section', label: 'Documenten', icon: 'files', children: [
      { label: 'Alle documenten',   href: 'documenten.html', icon: 'files' },
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
        var isOpen = item.children.some(function (c) {
          return c.href === current ||
            (c.subchildren && c.subchildren.some(function (s) { return s.href === current; }));
        });
        var children = item.children.map(function (c) {
          var badge  = c.badge ? '<span class="nav-badge">' + c.badge + '</span>' : '';
          var accentStyle = c.accent ? ' style="color:var(--color-accent);font-weight:700"' : '';
          if (c.subchildren) {
            var subOpen = c.subchildren.some(function (s) { return s.href === current; }) || c.href === current;
            var grandchildren = c.subchildren.map(function (s) {
              var sa = current === s.href ? ' active' : '';
              return '<a href="' + s.href + '" class="nav-grandchild' + sa + '">' +
                icon(s.icon, 12) + '<span>' + s.label + '</span></a>';
            }).join('');
            return '<div class="nav-subsection' + (subOpen ? ' open' : '') + '">' +
              '<a href="' + c.href + '" class="nav-child nav-child-toggle' + (current === c.href ? ' active' : '') + '"' + accentStyle + '>' +
                icon(c.icon, 14) + '<span>' + c.label + '</span>' +
                '<span class="nav-sub-chevron" onclick="event.preventDefault();this.closest(\'.nav-subsection\').classList.toggle(\'open\')">▾</span>' +
              '</a>' +
              '<div class="nav-grandchildren">' + grandchildren + '</div>' +
            '</div>';
          }
          var active = current === c.href ? ' active' : '';
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

  // Atalian logo — echte PNG afbeelding
  var logoEl = document.querySelector('.topbar .logo');
  if (logoEl) {
    logoEl.innerHTML = '<img src="atalian-logo.png" alt="ATALIAN Global Services">';
  }

  var sidebar = document.getElementById('sidebar');
  if (sidebar) {
    sidebar.innerHTML = renderNav(NAV);
    initLucide();
  }

  // Gebruikersmenu: initialen + uitloggen
  var userBtn = document.querySelector('.topbar-actions span:last-child');
  if (userBtn) {
    var naam = sessionStorage.getItem('naam') || '';
    var initialen = naam ? naam.charAt(0).toUpperCase() : 'DS';
    userBtn.textContent = initialen + ' ▾';
    userBtn.style.cssText += 'cursor:pointer;position:relative;user-select:none';

    var dropdown = document.createElement('div');
    dropdown.id = 'user-dropdown';
    dropdown.style.cssText =
      'display:none;position:absolute;top:calc(100% + 6px);right:0;' +
      'background:#fff;border:1px solid #e2e6ea;border-radius:8px;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.12);min-width:160px;z-index:9999;overflow:hidden;';
    if (naam) {
      var nameRow = document.createElement('div');
      nameRow.style.cssText = 'padding:10px 14px 8px;font-size:12px;color:#6b7480;border-bottom:1px solid #f0f2f5;';
      nameRow.textContent = naam;
      dropdown.appendChild(nameRow);
    }
    var logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Uitloggen';
    logoutBtn.style.cssText =
      'display:flex;align-items:center;gap:8px;width:100%;padding:10px 14px;' +
      'background:none;border:none;font-size:13px;color:#D93025;font-weight:600;' +
      'cursor:pointer;text-align:left;font-family:inherit;';
    logoutBtn.addEventListener('mouseenter', function () { this.style.background = '#fef2f2'; });
    logoutBtn.addEventListener('mouseleave', function () { this.style.background = 'none'; });
    logoutBtn.addEventListener('click', function () {
      sessionStorage.removeItem('naam');
      window.location.href = 'index.html';
    });
    dropdown.appendChild(logoutBtn);

    userBtn.parentElement.style.position = 'relative';
    userBtn.parentElement.appendChild(dropdown);

    userBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', function () { dropdown.style.display = 'none'; });
  }
})();
