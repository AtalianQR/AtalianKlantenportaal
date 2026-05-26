// nav.js
(function () {
  var current = window.location.pathname.split('/').pop() || 'index.html';

  var NAV = [
    { type: 'link', label: 'HOME', href: 'home.html' },
    { type: 'divider' },
    { type: 'section', label: 'Mijn Contract', children: [
      { label: 'Contractdetails', href: 'contract.html' },
      { label: 'Ons team',        href: 'contactpersonen.html' },
      { label: 'Diensten',        href: 'services.html' },
    ]},
    { type: 'section', label: 'Meldingen & Opvolging', children: [
      { label: 'Nieuwe melding',  href: 'tickets-nieuw.html', accent: true },
      { label: 'Mijn meldingen',  href: 'tickets.html' },
      { label: 'Planning',        href: 'planning.html' },
      { label: 'Te ondertekenen', href: 'actions.html', badge: 2 },
    ]},
    { type: 'section', label: 'Installaties & Keuringen', children: [
      { label: 'Installaties',          href: 'assets.html' },
      { label: 'Keuringen & inspecties',href: 'audits.html' },
      { label: 'Werkdossiers',          href: 'projectfiches.html' },
    ]},
    { type: 'section', label: 'Financieel', children: [
      { label: 'Facturen',            href: 'invoices.html' },
      { label: 'Openstaande bedragen',href: 'openstaand.html' },
    ]},
    { type: 'section', label: 'Documenten', children: [
      { label: 'Alle documenten',    href: 'documenten.html' },
      { label: 'Uitvoeringsbonnen',  href: 'uitvoeringsbonnen.html' },
    ]},
    { type: 'divider' },
    { type: 'section', label: 'Nieuws & Updates', children: [
      { label: 'Updates & aankondigingen', href: 'communicatie.html' },
    ]},
  ];

  function renderNav(items) {
    return items.map(function (item) {
      if (item.type === 'divider') return '<hr class="nav-divider">';
      if (item.type === 'link') {
        var active = current === item.href ? ' active' : '';
        return '<a href="' + item.href + '" class="nav-item' + active + '">' + item.label + '</a>';
      }
      if (item.type === 'section') {
        var isOpen = item.children.some(function (c) { return c.href === current; });
        var children = item.children.map(function (c) {
          var active = current === c.href ? ' active' : '';
          var badge  = c.badge ? '<span class="nav-badge">' + c.badge + '</span>' : '';
          var style  = c.accent ? ' style="color:var(--color-accent);font-weight:600"' : '';
          return '<a href="' + c.href + '" class="nav-child' + active + '"' + style + '>' + c.label + badge + '</a>';
        }).join('');
        return (
          '<div class="nav-section' + (isOpen ? ' open' : '') + '">' +
            '<div class="nav-section-header" onclick="this.parentElement.classList.toggle(\'open\')">' +
              '<span>' + item.label + '</span>' +
              '<span class="nav-chevron">▾</span>' +
            '</div>' +
            '<div class="nav-section-children">' + children + '</div>' +
          '</div>'
        );
      }
      return '';
    }).join('');
  }

  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = renderNav(NAV);
})();
