# ATALIAN Klantenportaal Prototype — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bouw een klikbare HTML/CSS/JS prototype-website van het ATALIAN klantenportaal met 19 schermen, gedeelde sidebar-navigatie en ATALIAN-branding — ter vervanging van de statische PDF.

**Architecture:** Flat bestandsstructuur (alle HTML op rootniveau), gedeelde `styles.css` en `nav.js`. `nav.js` injecteert de volledige sidebar in elk scherm en markeert het actieve item op basis van de bestandsnaam. Geen framework, geen build-stap — direct openen in browser.

**Tech Stack:** HTML5, CSS3 (CSS Grid, CSS variabelen), vanilla JavaScript (ES6 IIFE)

**Werkmap:** `C:\Users\dsmey\OneDrive - ATALIAN\Documenten\GitHub\AtalianKlantenportaal`

---

## Bestandsoverzicht

| Bestand | Verantwoordelijkheid |
|---------|---------------------|
| `styles.css` | CSS-variabelen, app-shell layout, sidebar, topbar, kaarten, tabellen, formulieren, placeholders |
| `nav.js` | Sidebar-injectie in alle pagina's, actieve staat, badges |
| `index.html` | Inhoudstafel — demo-startpunt met links naar alle 19 schermen |
| `home.html` | HOME dashboard: KPI's, recente activiteit, team, badge "Te ondertekenen" |
| `contract.html` | MIJN CONTRACT — Contractdetails |
| `contactpersonen.html` | MIJN CONTRACT — Ons team |
| `services.html` | MIJN CONTRACT — Diensten |
| `tickets.html` | MELDINGEN — Mijn meldingen (lijst) |
| `tickets-nieuw.html` | MELDINGEN — Nieuwe melding (formulier) |
| `planning.html` | MELDINGEN — Planning (kalenderweergave) |
| `actions.html` | MELDINGEN — Te ondertekenen (offertes + acties) |
| `assets.html` | INSTALLATIES — Installaties (asset-lijst) |
| `audits.html` | INSTALLATIES — Keuringen & inspecties |
| `projectfiches.html` | INSTALLATIES — Werkdossiers |
| `invoices.html` | FINANCIEEL — Facturen |
| `openstaand.html` | FINANCIEEL — Openstaande bedragen |
| `documenten.html` | DOCUMENTEN — Alle documenten |
| `uitvoeringsbonnen.html` | DOCUMENTEN — Uitvoeringsbonnen |
| `bestelportaal.html` | Bestelportaal |
| `communicatie.html` | Nieuws & Updates |

---

## Task 1: styles.css — App shell, sidebar, globale componenten

**Files:**
- Create: `styles.css`

- [ ] **Stap 1: Maak styles.css aan met CSS-variabelen en reset**

```css
/* styles.css */
:root {
  --color-dark:    #1A2024;
  --color-accent:  #74AE25;
  --color-text-2:  #4B555C;
  --color-border:  #D5D9DD;
  --color-bg:      #E6E8EB;
  --color-card:    #FFFFFF;
  --color-success: #2DC653;
  --color-warning: #F4A300;
  --color-danger:  #D93025;
  --sidebar-w:     240px;
  --topbar-h:      60px;
  --radius:        6px;
  --shadow:        0 1px 3px rgba(0,0,0,.10);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  background: var(--color-bg);
  color: var(--color-dark);
  line-height: 1.5;
}

a { color: inherit; text-decoration: none; }
```

- [ ] **Stap 2: Voeg app-shell grid toe**

```css
/* App shell */
.app-shell {
  display: grid;
  grid-template-rows: var(--topbar-h) 1fr;
  grid-template-columns: var(--sidebar-w) 1fr;
  min-height: 100vh;
}

/* Topbar */
.topbar {
  grid-column: 1 / -1;
  background: var(--color-dark);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 16px;
  border-bottom: 2px solid var(--color-accent);
}
.topbar .logo {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #fff;
  margin-right: auto;
}
.topbar .client-selector {
  font-size: 13px;
  color: #aaa;
  cursor: pointer;
}
.topbar .topbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 13px;
  color: #ccc;
}
.topbar .topbar-actions span { cursor: pointer; }

/* Sidebar */
.sidebar {
  background: var(--color-dark);
  overflow-y: auto;
  padding: 8px 0 24px;
}
```

- [ ] **Stap 3: Voeg sidebar-navigatie stijlen toe**

```css
/* Sidebar navigatie */
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: #ccc;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background .15s, color .15s;
}
.nav-item:hover { background: rgba(255,255,255,.07); color: #fff; }
.nav-item.active { color: var(--color-accent); background: rgba(116,174,37,.10); }

.nav-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 6px;
  color: #888;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
}
.nav-section-header:hover { color: #aaa; }
.nav-chevron { font-size: 10px; transition: transform .2s; }
.nav-section.open .nav-chevron { transform: rotate(180deg); }

.nav-section-children { display: none; }
.nav-section.open .nav-section-children { display: block; }

.nav-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px 8px 32px;
  color: #aaa;
  font-size: 13px;
  transition: background .15s, color .15s;
}
.nav-child:hover { background: rgba(255,255,255,.05); color: #fff; }
.nav-child.active { color: var(--color-accent); }

.nav-badge {
  background: var(--color-accent);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 10px;
  padding: 1px 6px;
  min-width: 18px;
  text-align: center;
}

.nav-divider {
  border: none;
  border-top: 1px solid rgba(255,255,255,.08);
  margin: 8px 20px;
}
```

- [ ] **Stap 4: Voeg main content, kaarten en typografie toe**

```css
/* Hoofdinhoud */
.main-content {
  padding: 28px 32px;
  overflow-y: auto;
}

.page-header { margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 700; color: var(--color-dark); }
.page-desc  { font-size: 13px; color: var(--color-text-2); margin-top: 4px; }

/* Kaarten */
.card {
  background: var(--color-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px 24px;
  margin-bottom: 20px;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-dark);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

/* KPI widgets */
.kpi-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.kpi-card {
  background: var(--color-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px 24px;
  border-left: 4px solid var(--color-accent);
}
.kpi-card .kpi-value { font-size: 32px; font-weight: 700; color: var(--color-dark); }
.kpi-card .kpi-label { font-size: 12px; color: var(--color-text-2); margin-top: 4px; }
.kpi-card.warning { border-left-color: var(--color-warning); }
.kpi-card.danger  { border-left-color: var(--color-danger); }
```

- [ ] **Stap 5: Voeg tabellen, badges, formulieren en placeholders toe**

```css
/* Tabellen */
.data-table { width: 100%; border-collapse: collapse; }
.data-table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  color: var(--color-text-2);
  border-bottom: 2px solid var(--color-border);
}
.data-table td {
  padding: 12px 12px;
  border-bottom: 1px solid var(--color-border);
  font-size: 13px;
}
.data-table tr:last-child td { border-bottom: none; }
.data-table tr:hover td { background: #f7f8fa; }

/* Status badges */
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}
.badge-open    { background: #FEF3CD; color: #7D5A00; }
.badge-progress{ background: #D6EAF8; color: #1A5276; }
.badge-done    { background: #D5F5E3; color: #1E8449; }
.badge-alert   { background: #FADBD8; color: #922B21; }
.badge-sign    { background: #EBF5FB; color: #1B4F72; }

/* Actieknoppen */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
.btn-primary   { background: var(--color-accent); color: #fff; }
.btn-secondary { background: var(--color-card); color: var(--color-dark); border: 1px solid var(--color-border); }
.btn-primary:hover   { background: #689e20; }
.btn-secondary:hover { background: #f0f1f3; }

/* Filterbar */
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.filter-bar input[type="text"] {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 13px;
  background: var(--color-card);
}
.filter-bar select {
  padding: 8px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 13px;
  background: var(--color-card);
  cursor: pointer;
}

/* Formulieren */
.form-group { margin-bottom: 18px; }
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-2);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: .04em;
}
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 13px;
  background: var(--color-card);
}
.form-group textarea { min-height: 80px; resize: vertical; }
.form-note { font-size: 11px; color: var(--color-text-2); margin-top: 4px; font-style: italic; }

/* Placeholder blokken */
.placeholder {
  background: #f0f1f3;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius);
  padding: 32px;
  text-align: center;
  color: var(--color-text-2);
  font-size: 13px;
  font-style: italic;
}
.placeholder strong { display: block; font-size: 14px; margin-bottom: 4px; color: #555; }

/* 2-kolom grid */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }

/* Team kaarten */
.team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
.team-card {
  background: var(--color-card);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 20px;
  text-align: center;
}
.team-avatar {
  width: 56px; height: 56px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
}
.team-name  { font-weight: 600; font-size: 14px; }
.team-role  { font-size: 12px; color: var(--color-text-2); margin-top: 2px; }
.team-email { font-size: 12px; color: var(--color-accent); margin-top: 8px; }
```

- [ ] **Stap 6: Open `styles.css` in browser via een tijdelijke test-HTML en controleer dat er geen parse-fouten zijn**

Maak tijdelijk `_test.html` aan en open in browser:
```html
<!DOCTYPE html>
<html><head><link rel="stylesheet" href="styles.css"></head>
<body><div class="app-shell">
  <header class="topbar"><span class="logo">ATALIAN.</span></div>
  <nav class="sidebar"></nav>
  <main class="main-content"><h1 class="page-title">Test</h1></main>
</div></body></html>
```
Verwacht: topbar zichtbaar in donkergrijs (#1A2024), geen console-fouten, pagina laadt.

- [ ] **Stap 7: Verwijder `_test.html` en commit**

```
git init
git add styles.css
git commit -m "feat: add global styles with ATALIAN branding and app shell"
```

---

## Task 2: nav.js — Gedeelde sidebar-injectie

**Files:**
- Create: `nav.js`

- [ ] **Stap 1: Maak nav.js aan met navigatiestructuur en injectie-logica**

```javascript
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
```

- [ ] **Stap 2: Maak een minimale test-HTML om nav.js te verifiëren**

Sla op als `_navtest.html`:
```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <title>Nav test</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <h1 class="page-title">Nav test</h1>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

Open in browser. Verwacht:
- Donkere sidebar met alle secties
- Secties zijn inklapbaar via klik op de header
- Badge "2" zichtbaar naast "Te ondertekenen" in groen

- [ ] **Stap 3: Verwijder `_navtest.html` en commit**

```
git add nav.js
git commit -m "feat: add shared sidebar navigation via nav.js"
```

---

## Task 3: HTML-schermsjabloon en index.html

**Files:**
- Create: `index.html`

- [ ] **Stap 1: Definieer het herbruikbare HTML-schermsjabloon**

Elk scherm volgt dit patroon (kopieer dit voor elk nieuw scherm):
```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — [SCHERMTITEL]</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions">
        <span>NL</span>
        <span title="Meldingen">🔔</span>
        <span>DS ▾</span>
      </div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">[SCHERMTITEL]</h1>
        <p class="page-desc">[Korte beschrijving voor leveranciersbriefing]</p>
      </div>

      <!-- INHOUD HIER -->

    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `index.html` aan als demo-inhoudstafel**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN Klantenportaal — Prototype Overzicht</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    .index-hero { background: var(--color-dark); color: #fff; padding: 48px 32px; margin: -28px -32px 32px; }
    .index-hero h1 { font-size: 28px; font-weight: 700; }
    .index-hero p  { color: #aaa; margin-top: 8px; font-size: 14px; }
    .screen-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; margin-bottom: 24px; }
    .screen-link { background: var(--color-card); border-radius: var(--radius); box-shadow: var(--shadow); padding: 16px 20px; display: block; border-left: 3px solid var(--color-accent); }
    .screen-link:hover { box-shadow: 0 3px 8px rgba(0,0,0,.15); transform: translateY(-1px); }
    .screen-link .nr { font-size: 11px; color: var(--color-text-2); }
    .screen-link .name { font-weight: 600; font-size: 14px; margin-top: 2px; }
    .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--color-text-2); margin: 24px 0 8px; }
  </style>
</head>
<body>
  <div class="app-shell" style="grid-template-columns:1fr">
    <header class="topbar" style="grid-column:1">
      <span class="logo">ATALIAN.</span>
      <span style="color:#aaa;font-size:13px">Klantenportaal — Prototype overzicht</span>
    </header>
    <main class="main-content" style="grid-column:1">
      <div class="index-hero">
        <h1>ATALIAN Klantenportaal</h1>
        <p>Prototype — 19 schermen — Vlaeminck Logistics (demo-klant)</p>
      </div>

      <div class="section-label">HOME</div>
      <div class="screen-grid">
        <a href="home.html" class="screen-link"><div class="nr">01</div><div class="name">Dashboard</div></a>
      </div>

      <div class="section-label">Mijn Contract</div>
      <div class="screen-grid">
        <a href="contract.html"        class="screen-link"><div class="nr">02</div><div class="name">Contractdetails</div></a>
        <a href="contactpersonen.html" class="screen-link"><div class="nr">03</div><div class="name">Ons team</div></a>
        <a href="services.html"        class="screen-link"><div class="nr">04</div><div class="name">Diensten</div></a>
      </div>

      <div class="section-label">Meldingen & Opvolging</div>
      <div class="screen-grid">
        <a href="tickets-nieuw.html" class="screen-link"><div class="nr">05</div><div class="name">Nieuwe melding</div></a>
        <a href="tickets.html"       class="screen-link"><div class="nr">06</div><div class="name">Mijn meldingen</div></a>
        <a href="planning.html"      class="screen-link"><div class="nr">07</div><div class="name">Planning</div></a>
        <a href="actions.html"       class="screen-link"><div class="nr">08</div><div class="name">Te ondertekenen</div></a>
      </div>

      <div class="section-label">Installaties & Keuringen</div>
      <div class="screen-grid">
        <a href="assets.html"       class="screen-link"><div class="nr">09</div><div class="name">Installaties</div></a>
        <a href="audits.html"       class="screen-link"><div class="nr">10</div><div class="name">Keuringen & inspecties</div></a>
        <a href="projectfiches.html"class="screen-link"><div class="nr">11</div><div class="name">Werkdossiers</div></a>
      </div>

      <div class="section-label">Financieel</div>
      <div class="screen-grid">
        <a href="invoices.html"  class="screen-link"><div class="nr">12</div><div class="name">Facturen</div></a>
        <a href="openstaand.html"class="screen-link"><div class="nr">13</div><div class="name">Openstaande bedragen</div></a>
      </div>

      <div class="section-label">Documenten</div>
      <div class="screen-grid">
        <a href="documenten.html"       class="screen-link"><div class="nr">14</div><div class="name">Alle documenten</div></a>
        <a href="uitvoeringsbonnen.html"class="screen-link"><div class="nr">15</div><div class="name">Uitvoeringsbonnen</div></a>
      </div>

      <div class="section-label">Overige</div>
      <div class="screen-grid">
        <a href="bestelportaal.html"class="screen-link"><div class="nr">16</div><div class="name">Bestelportaal</div></a>
        <a href="communicatie.html" class="screen-link"><div class="nr">17</div><div class="name">Nieuws & Updates</div></a>
      </div>

    </main>
  </div>
</body>
</html>
```

- [ ] **Stap 3: Open `index.html` in browser**

Verwacht: overzichtspagina met alle 17 schermen gegroepeerd per sectie, ATALIAN donkere topbar, klikbare kaarten.

- [ ] **Stap 4: Commit**

```
git add index.html
git commit -m "feat: add demo index page with all 17 screens"
```

---

## Task 4: home.html — HOME dashboard

**Files:**
- Create: `home.html`

- [ ] **Stap 1: Maak `home.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Home</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Goedemorgen, Dirk</h1>
        <p class="page-desc">Overzicht van Vlaeminck Logistics — 3 sites</p>
      </div>

      <!-- KPI rij -->
      <div class="kpi-row">
        <div class="kpi-card warning">
          <div class="kpi-value">4</div>
          <div class="kpi-label">Openstaande meldingen</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">12</div>
          <div class="kpi-label">Geplande taken deze week</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">96%</div>
          <div class="kpi-label">SLA naleving (MTD)</div>
        </div>
        <div class="kpi-card danger">
          <div class="kpi-value">2</div>
          <div class="kpi-label">Te ondertekenen</div>
        </div>
      </div>

      <div class="grid-2">
        <!-- Recente activiteit -->
        <div class="card">
          <div class="card-title">Recente activiteit</div>
          <table class="data-table">
            <tbody>
              <tr>
                <td><span class="badge badge-open">Open</span></td>
                <td>Melding #1042 — Lekkage sanitair Gent</td>
                <td style="color:var(--color-text-2);font-size:12px">24/05</td>
              </tr>
              <tr>
                <td><span class="badge badge-progress">In uitvoering</span></td>
                <td>Melding #1038 — Verlichting hal B</td>
                <td style="color:var(--color-text-2);font-size:12px">18/05</td>
              </tr>
              <tr>
                <td><span class="badge badge-done">Afgehandeld</span></td>
                <td>Keuring lift — Antwerpen</td>
                <td style="color:var(--color-text-2);font-size:12px">14/05</td>
              </tr>
              <tr>
                <td><span class="badge badge-sign">Te tekenen</span></td>
                <td>Offerte meerwerk dakgoot — Brussel</td>
                <td style="color:var(--color-text-2);font-size:12px">10/05</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Ons team -->
        <div>
          <div class="card">
            <div class="card-title">Ons team</div>
            <table class="data-table">
              <tbody>
                <tr><td style="font-weight:600">Jan Peeters</td><td style="color:var(--color-text-2)">KAM / FM</td><td style="color:var(--color-accent);font-size:12px">j.peeters@atalian.be</td></tr>
                <tr><td style="font-weight:600">Marie Claes</td><td style="color:var(--color-text-2)">DM</td><td style="color:var(--color-accent);font-size:12px">m.claes@atalian.be</td></tr>
                <tr><td style="font-weight:600">Tom Wouters</td><td style="color:var(--color-text-2)">SHEQ</td><td style="color:var(--color-accent);font-size:12px">t.wouters@atalian.be</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Te ondertekenen banner -->
          <div class="card" style="border-left:4px solid var(--color-warning);padding:16px 20px">
            <div style="display:flex;align-items:center;justify-content:space-between">
              <div>
                <div style="font-weight:600;font-size:14px">⚠ 2 items wachten op uw handtekening</div>
                <div style="font-size:12px;color:var(--color-text-2);margin-top:2px">1 offerte · 1 actie</div>
              </div>
              <a href="actions.html" class="btn btn-primary">Bekijken</a>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Open `home.html` in browser**

Verwacht: KPI-rij zichtbaar (4 widgets), recente activiteit links, team + onderteken-banner rechts, sidebar met "HOME" actief gemarkeerd in groen.

- [ ] **Stap 3: Commit**

```
git add home.html
git commit -m "feat: add HOME dashboard screen"
```

---

## Task 5: MIJN CONTRACT — contract.html, contactpersonen.html, services.html

**Files:**
- Create: `contract.html`, `contactpersonen.html`, `services.html`

- [ ] **Stap 1: Maak `contract.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Contractdetails</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Contractdetails</h1>
        <p class="page-desc">Looptijd, gecontracteerde diensten, jaarwaarde, sites en addenda — ontsloten vanuit het financieel systeem.</p>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Contractgegevens</div>
          <table class="data-table">
            <tbody>
              <tr><td style="color:var(--color-text-2);width:140px">Contractnummer</td><td><strong>ATB-2024-0312</strong></td></tr>
              <tr><td style="color:var(--color-text-2)">Startdatum</td><td>01/01/2024</td></tr>
              <tr><td style="color:var(--color-text-2)">Einddatum</td><td>31/12/2026</td></tr>
              <tr><td style="color:var(--color-text-2)">Jaarwaarde</td><td><strong>€ 248.500</strong></td></tr>
              <tr><td style="color:var(--color-text-2)">Status</td><td><span class="badge badge-done">Actief</span></td></tr>
            </tbody>
          </table>
        </div>
        <div class="card">
          <div class="card-title">Gecontracteerde diensten</div>
          <table class="data-table">
            <tbody>
              <tr><td>Schoonmaak</td><td><span class="badge badge-done">Actief</span></td></tr>
              <tr><td>Glaswas</td><td><span class="badge badge-done">Actief</span></td></tr>
              <tr><td>Hard Services</td><td><span class="badge badge-done">Actief</span></td></tr>
              <tr><td>Soft FM</td><td><span class="badge badge-open">Niet actief</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Contractdocumenten & addenda</div>
        <table class="data-table">
          <thead><tr><th>Document</th><th>Versie</th><th>Datum</th><th>Actie</th></tr></thead>
          <tbody>
            <tr><td>Basiscontract ATB-2024-0312</td><td>v1.0</td><td>01/01/2024</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
            <tr><td>Addendum 1 — Glaswas uitbreiding</td><td>v1.1</td><td>01/06/2024</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
            <tr><td>SLA-bijlage</td><td>v2.0</td><td>01/01/2025</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Sites onder contract</div>
        <div class="grid-3">
          <div style="padding:12px;border:1px solid var(--color-border);border-radius:var(--radius)"><strong>Gent — Dok-Noord</strong><div style="font-size:12px;color:var(--color-text-2);margin-top:4px">Alle diensten</div></div>
          <div style="padding:12px;border:1px solid var(--color-border);border-radius:var(--radius)"><strong>Antwerpen — Haven</strong><div style="font-size:12px;color:var(--color-text-2);margin-top:4px">Schoonmaak · Hard Services</div></div>
          <div style="padding:12px;border:1px solid var(--color-border);border-radius:var(--radius)"><strong>Brussel — Evere</strong><div style="font-size:12px;color:var(--color-text-2);margin-top:4px">Schoonmaak · Glaswas</div></div>
        </div>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `contactpersonen.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Ons team</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Ons team</h1>
        <p class="page-desc">Vaste aanspreekpunten per rol — gesynchroniseerd vanuit Outlook/Salesforce.</p>
      </div>
      <div class="team-grid">
        <div class="team-card">
          <div class="team-avatar">JP</div>
          <div class="team-name">Jan Peeters</div>
          <div class="team-role">Key Account Manager</div>
          <div class="team-email">j.peeters@atalian.be</div>
          <div style="font-size:12px;color:var(--color-text-2);margin-top:4px">+32 470 12 34 56</div>
        </div>
        <div class="team-card">
          <div class="team-avatar">MC</div>
          <div class="team-name">Marie Claes</div>
          <div class="team-role">District Manager</div>
          <div class="team-email">m.claes@atalian.be</div>
          <div style="font-size:12px;color:var(--color-text-2);margin-top:4px">+32 470 23 45 67</div>
        </div>
        <div class="team-card">
          <div class="team-avatar">TW</div>
          <div class="team-name">Tom Wouters</div>
          <div class="team-role">SHEQ Manager</div>
          <div class="team-email">t.wouters@atalian.be</div>
          <div style="font-size:12px;color:var(--color-text-2);margin-top:4px">+32 470 34 56 78</div>
        </div>
        <div class="team-card">
          <div class="team-avatar">SV</div>
          <div class="team-name">Sara Van den Berg</div>
          <div class="team-role">Sales</div>
          <div class="team-email">s.vandenberg@atalian.be</div>
          <div style="font-size:12px;color:var(--color-text-2);margin-top:4px">+32 470 45 67 89</div>
        </div>
      </div>
      <div class="placeholder" style="margin-top:24px">
        <strong>[Foto's — Outlook-foto's via Graph API]</strong>
        Avatars worden in productie vervangen door profielfoto's gesynchroniseerd vanuit Microsoft 365.
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 3: Maak `services.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Diensten</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Diensten</h1>
        <p class="page-desc">Gecontracteerde diensten per site. Niet-actieve diensten zijn zichtbaar maar grijs — mogelijkheid tot activering via uw KAM.</p>
      </div>
      <div class="grid-3">
        <div class="card" style="border-top:3px solid var(--color-accent)">
          <div class="card-title">Schoonmaak</div>
          <span class="badge badge-done">Actief</span>
          <p style="font-size:13px;color:var(--color-text-2);margin-top:12px">Dagelijkse schoonmaak — alle 3 sites</p>
        </div>
        <div class="card" style="border-top:3px solid var(--color-accent)">
          <div class="card-title">Glaswas</div>
          <span class="badge badge-done">Actief</span>
          <p style="font-size:13px;color:var(--color-text-2);margin-top:12px">Maandelijks — Gent & Brussel</p>
        </div>
        <div class="card" style="border-top:3px solid var(--color-accent)">
          <div class="card-title">Hard Services</div>
          <span class="badge badge-done">Actief</span>
          <p style="font-size:13px;color:var(--color-text-2);margin-top:12px">Preventief & curatief onderhoud</p>
        </div>
        <div class="card" style="border-top:3px solid var(--color-border);opacity:.6">
          <div class="card-title">Soft FM</div>
          <span class="badge badge-open">Niet actief</span>
          <p style="font-size:13px;color:var(--color-text-2);margin-top:12px">Beschikbaar — contacteer uw KAM</p>
        </div>
        <div class="card" style="border-top:3px solid var(--color-border);opacity:.6">
          <div class="card-title">Catering</div>
          <span class="badge badge-open">Niet actief</span>
          <p style="font-size:13px;color:var(--color-text-2);margin-top:12px">Beschikbaar — contacteer uw KAM</p>
        </div>
        <div class="card" style="border-top:3px solid var(--color-border);opacity:.6">
          <div class="card-title">IFM</div>
          <span class="badge badge-open">Niet actief</span>
          <p style="font-size:13px;color:var(--color-text-2);margin-top:12px">Beschikbaar — contacteer uw KAM</p>
        </div>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 4: Open alle drie in browser en controleer**

Verwacht per scherm: sidebar toont "Mijn Contract" als open sectie met het juiste sub-item actief in groen.

- [ ] **Stap 5: Commit**

```
git add contract.html contactpersonen.html services.html
git commit -m "feat: add MIJN CONTRACT screens (3)"
```

---

## Task 6: MELDINGEN — tickets.html, tickets-nieuw.html

**Files:**
- Create: `tickets.html`, `tickets-nieuw.html`

- [ ] **Stap 1: Maak `tickets.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Mijn meldingen</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Mijn meldingen</h1>
        <p class="page-desc">Alle meldingen (interventies, klachten, vragen) — gesynchroniseerd met Ultimo Work Orders.</p>
      </div>
      <div class="filter-bar">
        <a href="tickets-nieuw.html" class="btn btn-primary">+ Nieuwe melding</a>
        <input type="text" placeholder="Zoeken op omschrijving, nummer…">
        <select><option>Alle sites</option><option>Gent — Dok-Noord</option><option>Antwerpen — Haven</option><option>Brussel — Evere</option></select>
        <select><option>Alle statussen</option><option>Open</option><option>In uitvoering</option><option>Afgehandeld</option></select>
        <select><option>Alle diensten</option><option>Schoonmaak</option><option>Glaswas</option><option>Hard Services</option></select>
      </div>
      <div class="card" style="padding:0">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nr</th><th>Type</th><th>Dienst</th><th>Omschrijving</th><th>Site</th><th>Status</th><th>Datum</th><th>WO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#1042</strong></td>
              <td>Melding</td>
              <td>Hard Services</td>
              <td>Lekkage sanitair — bureau 3e verd.</td>
              <td>Gent</td>
              <td><span class="badge badge-open">Open</span></td>
              <td>24/05/2026</td>
              <td style="color:var(--color-text-2);font-size:12px">WO-8821</td>
            </tr>
            <tr>
              <td><strong>#1041</strong></td>
              <td>Klacht</td>
              <td>Schoonmaak</td>
              <td>Toiletten niet proper — verdieping 2</td>
              <td>Antwerpen</td>
              <td><span class="badge badge-progress">In uitvoering</span></td>
              <td>20/05/2026</td>
              <td style="color:var(--color-text-2);font-size:12px">WO-8819</td>
            </tr>
            <tr>
              <td><strong>#1038</strong></td>
              <td>Melding</td>
              <td>Hard Services</td>
              <td>Verlichting defect — hal B</td>
              <td>Gent</td>
              <td><span class="badge badge-progress">In uitvoering</span></td>
              <td>18/05/2026</td>
              <td style="color:var(--color-text-2);font-size:12px">WO-8810</td>
            </tr>
            <tr>
              <td><strong>#1031</strong></td>
              <td>Vraag</td>
              <td>Glaswas</td>
              <td>Extra beurt gevelramen gevraagd</td>
              <td>Brussel</td>
              <td><span class="badge badge-done">Afgehandeld</span></td>
              <td>02/05/2026</td>
              <td style="color:var(--color-text-2);font-size:12px">WO-8798</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `tickets-nieuw.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Nieuwe melding</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Nieuwe melding</h1>
        <p class="page-desc">Registreer een melding, klacht of vraag. Na indiening wordt automatisch een Work Order aangemaakt in Ultimo.</p>
      </div>
      <div class="card" style="max-width:640px">
        <div class="form-group">
          <label>Dienst *</label>
          <select>
            <option value="">— Selecteer dienst —</option>
            <option>Schoonmaak</option>
            <option>Glaswas</option>
            <option>Hard Services</option>
          </select>
          <div class="form-note">Gefilterd op uw gecontracteerde diensten.</div>
        </div>
        <div class="form-group">
          <label>Type *</label>
          <select>
            <option>Melding</option>
            <option>Klacht</option>
            <option>Vraag</option>
            <option>Preventief</option>
          </select>
        </div>
        <div class="form-group">
          <label>Site *</label>
          <select>
            <option value="">— Selecteer site —</option>
            <option>Gent — Dok-Noord</option>
            <option>Antwerpen — Haven</option>
            <option>Brussel — Evere</option>
          </select>
        </div>
        <div class="form-group">
          <label>Locatie / zone</label>
          <input type="text" placeholder="Bijv. Bureau 3e verdieping, Hal B…">
        </div>
        <div class="form-group">
          <label>Omschrijving *</label>
          <textarea placeholder="Beschrijf het probleem of de vraag zo concreet mogelijk…"></textarea>
        </div>
        <div class="form-group">
          <label>Foto of bijlage</label>
          <input type="file">
          <div class="form-note">Max. 10 MB · JPG, PNG, PDF</div>
        </div>
        <div style="display:flex;gap:12px;margin-top:8px">
          <button class="btn btn-primary">Melding indienen</button>
          <a href="tickets.html" class="btn btn-secondary">Annuleren</a>
        </div>
      </div>
      <div class="placeholder" style="max-width:640px;margin-top:16px">
        <strong>[QR-code koppeling]</strong>
        Via QR-scan worden site, zone en asset automatisch ingevuld.
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 3: Open beide in browser en controleer**

Verwacht: tabel met 4 rijen en correcte badge-kleuren in `tickets.html`; formulier met alle velden in `tickets-nieuw.html`.

- [ ] **Stap 4: Commit**

```
git add tickets.html tickets-nieuw.html
git commit -m "feat: add MELDINGEN screens — lijst en nieuw formulier"
```

---

## Task 7: MELDINGEN — planning.html en actions.html

**Files:**
- Create: `planning.html`, `actions.html`

- [ ] **Stap 1: Maak `planning.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Planning</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:4px; }
    .cal-day-header { text-align:center; font-size:11px; font-weight:700; color:var(--color-text-2); padding:6px 0; text-transform:uppercase; }
    .cal-day { background:var(--color-card); border-radius:4px; min-height:80px; padding:6px; font-size:12px; }
    .cal-day.today { border:2px solid var(--color-accent); }
    .cal-day-nr { font-weight:600; font-size:13px; margin-bottom:4px; }
    .cal-event { background:var(--color-accent); color:#fff; border-radius:3px; padding:2px 6px; font-size:11px; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .cal-event.blue { background:#1A5276; }
  </style>
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Planning</h1>
        <p class="page-desc">Geplande activiteiten per site en dienst — gekoppeld aan Work Orders en uitvoeringsbonnen.</p>
      </div>
      <div class="filter-bar">
        <button class="btn btn-secondary">◀ Mei 2026</button>
        <strong style="margin:0 12px">Juni 2026</strong>
        <button class="btn btn-secondary">Juli 2026 ▶</button>
        <select style="margin-left:auto"><option>Alle sites</option><option>Gent</option><option>Antwerpen</option><option>Brussel</option></select>
        <select><option>Alle diensten</option><option>Schoonmaak</option><option>Hard Services</option><option>Glaswas</option></select>
      </div>
      <div class="card" style="padding:16px">
        <div class="cal-grid">
          <div class="cal-day-header">Ma</div><div class="cal-day-header">Di</div><div class="cal-day-header">Wo</div>
          <div class="cal-day-header">Do</div><div class="cal-day-header">Vr</div><div class="cal-day-header">Za</div><div class="cal-day-header">Zo</div>
          <div class="cal-day"><div class="cal-day-nr">2</div></div>
          <div class="cal-day"><div class="cal-day-nr">3</div><div class="cal-event">Glaswas — Gent</div></div>
          <div class="cal-day"><div class="cal-day-nr">4</div></div>
          <div class="cal-day"><div class="cal-day-nr">5</div></div>
          <div class="cal-day"><div class="cal-day-nr">6</div></div>
          <div class="cal-day"><div class="cal-day-nr">7</div></div>
          <div class="cal-day"><div class="cal-day-nr">8</div></div>
          <div class="cal-day"><div class="cal-day-nr">9</div></div>
          <div class="cal-day"><div class="cal-day-nr">10</div><div class="cal-event blue">Preventief onderhoud lift</div></div>
          <div class="cal-day today"><div class="cal-day-nr">11</div><div class="cal-event">Schoonmaak extra — Ant.</div></div>
          <div class="cal-day"><div class="cal-day-nr">12</div></div>
          <div class="cal-day"><div class="cal-day-nr">13</div></div>
          <div class="cal-day"><div class="cal-day-nr">14</div></div>
          <div class="cal-day"><div class="cal-day-nr">15</div></div>
          <div class="cal-day"><div class="cal-day-nr">16</div></div>
          <div class="cal-day"><div class="cal-day-nr">17</div><div class="cal-event">Glaswas — Brussel</div></div>
          <div class="cal-day"><div class="cal-day-nr">18</div></div>
          <div class="cal-day"><div class="cal-day-nr">19</div></div>
          <div class="cal-day"><div class="cal-day-nr">20</div></div>
          <div class="cal-day"><div class="cal-day-nr">21</div></div>
        </div>
      </div>
      <div class="placeholder" style="margin-top:4px"><strong>[Kalender data — Ultimo + Outlook]</strong>Activiteiten worden geladen uit Ultimo (Work Orders) en Outlook (klantmeetings).</div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `actions.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Te ondertekenen</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Te ondertekenen</h1>
        <p class="page-desc">Offertes voor meerwerken en acties die uw goedkeuring vereisen — gekoppeld aan Work Orders en facturatie.</p>
      </div>
      <div class="card" style="border-left:4px solid var(--color-warning);margin-bottom:24px">
        <strong>⚠ 2 items wachten op uw handtekening</strong>
      </div>
      <div class="card">
        <div class="card-title">Offertes ter goedkeuring</div>
        <table class="data-table">
          <thead><tr><th>Nr</th><th>Omschrijving</th><th>Bedrag</th><th>Site</th><th>Gekoppeld aan</th><th>Deadline</th><th>Actie</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>OFF-2026-089</strong></td>
              <td>Herstelling dakgoot — Noord gevel</td>
              <td><strong>€ 3.450</strong></td>
              <td>Brussel</td>
              <td style="font-size:12px;color:var(--color-text-2)">WO-8801</td>
              <td style="color:var(--color-danger)"><strong>30/05/2026</strong></td>
              <td>
                <button class="btn btn-primary" style="font-size:12px;padding:6px 12px">✓ Goedkeuren</button>
                <button class="btn btn-secondary" style="font-size:12px;padding:6px 12px;margin-left:4px">✗ Weigeren</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Openstaande acties</div>
        <table class="data-table">
          <thead><tr><th>Omschrijving</th><th>Prioriteit</th><th>Deadline</th><th>Verantwoordelijke</th><th>Status</th></tr></thead>
          <tbody>
            <tr>
              <td>Ondertekening addendum extra schoonmaakbeurt</td>
              <td><span class="badge badge-open">Hoog</span></td>
              <td>01/06/2026</td>
              <td>Dirk Smeyers</td>
              <td><span class="badge badge-sign">Wacht op klant</span></td>
            </tr>
            <tr>
              <td>Feedback veiligheidsinspectie Q1</td>
              <td><span class="badge badge-progress">Normaal</span></td>
              <td>15/06/2026</td>
              <td>Dirk Smeyers</td>
              <td><span class="badge badge-open">Open</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 3: Open beide in browser**

Verwacht: kalender met gekleurde events in `planning.html`; waarschuwingsbanner + offerte + acties in `actions.html`.

- [ ] **Stap 4: Commit**

```
git add planning.html actions.html
git commit -m "feat: add MELDINGEN planning and actions screens"
```

---

## Task 8: INSTALLATIES & KEURINGEN — assets.html, audits.html, projectfiches.html

**Files:**
- Create: `assets.html`, `audits.html`, `projectfiches.html`

- [ ] **Stap 1: Maak `assets.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Installaties</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Installaties</h1>
        <p class="page-desc">Assets per site en contract — ontsloten vanuit Ultimo. Basis voor Work Order-koppeling, historiek en keuringen.</p>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="Zoeken op naam, type, locatie…">
        <select><option>Alle sites</option><option>Gent</option><option>Antwerpen</option><option>Brussel</option></select>
        <select><option>Alle types</option><option>HVAC</option><option>Liften</option><option>Brandbeveiliging</option><option>Elektriciteit</option></select>
      </div>
      <div class="card" style="padding:0">
        <table class="data-table">
          <thead><tr><th>Asset ID</th><th>Naam</th><th>Type</th><th>Site</th><th>Locatie</th><th>Volgende keuring</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td style="font-size:12px;color:var(--color-text-2)">AST-0441</td><td><strong>Liftinstallatie A</strong></td><td>Lift</td><td>Gent</td><td>Hal Noord</td><td>15/07/2026</td><td><span class="badge badge-done">OK</span></td></tr>
            <tr><td style="font-size:12px;color:var(--color-text-2)">AST-0442</td><td><strong>Liftinstallatie B</strong></td><td>Lift</td><td>Gent</td><td>Hal Zuid</td><td>15/07/2026</td><td><span class="badge badge-done">OK</span></td></tr>
            <tr><td style="font-size:12px;color:var(--color-text-2)">AST-0501</td><td><strong>HVAC-unit — verdieping 1</strong></td><td>HVAC</td><td>Antwerpen</td><td>Machinekamer</td><td>01/06/2026</td><td><span class="badge badge-open">Gepland</span></td></tr>
            <tr><td style="font-size:12px;color:var(--color-text-2)">AST-0612</td><td><strong>Brandcentrale</strong></td><td>Brandbeveiliging</td><td>Brussel</td><td>Ingang</td><td>10/05/2026</td><td><span class="badge badge-alert">Vervallen</span></td></tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `audits.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Keuringen & inspecties</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Keuringen & inspecties</h1>
        <p class="page-desc">Compliance-overzicht per asset en site — wettelijke keuringen, frequenties en rapportageverplichtingen.</p>
      </div>
      <div class="kpi-row">
        <div class="kpi-card"><div class="kpi-value">14</div><div class="kpi-label">In orde</div></div>
        <div class="kpi-card warning"><div class="kpi-value">3</div><div class="kpi-label">Vervalt binnenkort</div></div>
        <div class="kpi-card danger"><div class="kpi-value">1</div><div class="kpi-label">Vervallen</div></div>
      </div>
      <div class="card" style="padding:0">
        <table class="data-table">
          <thead><tr><th>Keuring</th><th>Asset</th><th>Site</th><th>Laatste keuring</th><th>Volgende</th><th>Rapport</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Jaarlijkse liftkeuring</td><td>AST-0441</td><td>Gent</td><td>15/07/2025</td><td>15/07/2026</td><td><a href="#" style="color:var(--color-accent)">PDF</a></td><td><span class="badge badge-done">In orde</span></td></tr>
            <tr><td>HVAC-controle</td><td>AST-0501</td><td>Antwerpen</td><td>01/06/2025</td><td>01/06/2026</td><td><a href="#" style="color:var(--color-accent)">PDF</a></td><td><span class="badge badge-open">Gepland</span></td></tr>
            <tr><td>Brandcentrale inspectie</td><td>AST-0612</td><td>Brussel</td><td>10/05/2025</td><td>10/05/2026</td><td>—</td><td><span class="badge badge-alert">Vervallen</span></td></tr>
          </tbody>
        </table>
      </div>
      <div class="placeholder" style="margin-top:16px"><strong>[Compliance dashboard — Power BI]</strong>Geaggregeerde compliance-score per site, type keuring en wettelijke verplichting.</div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 3: Maak `projectfiches.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Werkdossiers</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Werkdossiers</h1>
        <p class="page-desc">Operationele afspraken per site — werktijden, producten, SDS-fiches, werkprogramma's en safetyprocedures.</p>
      </div>
      <div class="filter-bar">
        <select><option>Alle sites</option><option>Gent</option><option>Antwerpen</option><option>Brussel</option></select>
      </div>
      <div class="grid-3">
        <div class="card" style="border-top:3px solid var(--color-accent)">
          <div class="card-title">Gent — Dok-Noord</div>
          <table class="data-table"><tbody>
            <tr><td style="color:var(--color-text-2);font-size:12px">Werktijden</td><td>Ma–Vr 06:00–18:00</td></tr>
            <tr><td style="color:var(--color-text-2);font-size:12px">Diensten</td><td>Schoonmaak · Glaswas · HS</td></tr>
          </tbody></table>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
            <a href="#" class="btn btn-secondary" style="font-size:12px">Werkprogramma</a>
            <a href="#" class="btn btn-secondary" style="font-size:12px">SDS-fiches</a>
            <a href="#" class="btn btn-secondary" style="font-size:12px">Safety</a>
          </div>
        </div>
        <div class="card" style="border-top:3px solid var(--color-accent)">
          <div class="card-title">Antwerpen — Haven</div>
          <table class="data-table"><tbody>
            <tr><td style="color:var(--color-text-2);font-size:12px">Werktijden</td><td>Ma–Za 07:00–17:00</td></tr>
            <tr><td style="color:var(--color-text-2);font-size:12px">Diensten</td><td>Schoonmaak · Hard Services</td></tr>
          </tbody></table>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
            <a href="#" class="btn btn-secondary" style="font-size:12px">Werkprogramma</a>
            <a href="#" class="btn btn-secondary" style="font-size:12px">SDS-fiches</a>
          </div>
        </div>
        <div class="card" style="border-top:3px solid var(--color-accent)">
          <div class="card-title">Brussel — Evere</div>
          <table class="data-table"><tbody>
            <tr><td style="color:var(--color-text-2);font-size:12px">Werktijden</td><td>Ma–Vr 06:30–16:30</td></tr>
            <tr><td style="color:var(--color-text-2);font-size:12px">Diensten</td><td>Schoonmaak · Glaswas</td></tr>
          </tbody></table>
          <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
            <a href="#" class="btn btn-secondary" style="font-size:12px">Werkprogramma</a>
            <a href="#" class="btn btn-secondary" style="font-size:12px">SDS-fiches</a>
          </div>
        </div>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 4: Open alle drie in browser en controleer**

Verwacht: asset-lijst met badge "Vervallen" in rood in `assets.html`; KPI-rij + compliance-tabel in `audits.html`; 3 site-kaarten in `projectfiches.html`.

- [ ] **Stap 5: Commit**

```
git add assets.html audits.html projectfiches.html
git commit -m "feat: add INSTALLATIES & KEURINGEN screens (3)"
```

---

## Task 9: FINANCIEEL en DOCUMENTEN

**Files:**
- Create: `invoices.html`, `openstaand.html`, `documenten.html`, `uitvoeringsbonnen.html`

- [ ] **Stap 1: Maak `invoices.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Facturen</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Facturen</h1>
        <p class="page-desc">Alle facturen filterbaar per site — ontsloten vanuit Peppol/Nymus, gekoppeld aan uitvoeringsbonnen en Work Orders.</p>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="Zoeken op factuurnummer, bedrag…">
        <select><option>Alle sites</option><option>Gent</option><option>Antwerpen</option><option>Brussel</option></select>
        <select><option>Alle statussen</option><option>Betaald</option><option>Openstaand</option><option>Vervallen</option></select>
        <select><option>Alle periodes</option><option>2026</option><option>2025</option></select>
        <a href="openstaand.html" class="btn btn-secondary" style="margin-left:auto">Openstaande bedragen</a>
      </div>
      <div class="card" style="padding:0">
        <table class="data-table">
          <thead><tr><th>Factuurnr</th><th>Datum</th><th>Site</th><th>Dienst</th><th>Bedrag (excl. BTW)</th><th>Status</th><th>Actie</th></tr></thead>
          <tbody>
            <tr><td><strong>2026-0412</strong></td><td>01/05/2026</td><td>Gent</td><td>Schoonmaak</td><td>€ 8.240</td><td><span class="badge badge-done">Betaald</span></td><td><a href="#" style="color:var(--color-accent)">PDF</a></td></tr>
            <tr><td><strong>2026-0389</strong></td><td>01/04/2026</td><td>Antwerpen</td><td>Hard Services</td><td>€ 3.150</td><td><span class="badge badge-open">Openstaand</span></td><td><a href="#" style="color:var(--color-accent)">PDF</a> · <a href="#" style="color:var(--color-accent)">Betalen</a></td></tr>
            <tr><td><strong>2026-0361</strong></td><td>01/03/2026</td><td>Brussel</td><td>Glaswas</td><td>€ 1.820</td><td><span class="badge badge-alert">Vervallen</span></td><td><a href="#" style="color:var(--color-accent)">PDF</a> · <a href="#" style="color:var(--color-accent)">Betalen</a></td></tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `openstaand.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Openstaande bedragen</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Openstaande bedragen</h1>
        <p class="page-desc">Overzicht van openstaande en vervallen facturen met online betaalmogelijkheid.</p>
      </div>
      <div class="kpi-row">
        <div class="kpi-card warning"><div class="kpi-value">€ 4.970</div><div class="kpi-label">Openstaand</div></div>
        <div class="kpi-card danger"><div class="kpi-value">€ 1.820</div><div class="kpi-label">Vervallen</div></div>
        <div class="kpi-card"><div class="kpi-value">€ 6.790</div><div class="kpi-label">Totaal te betalen</div></div>
      </div>
      <div class="card">
        <div class="card-title">Openstaande facturen</div>
        <table class="data-table">
          <thead><tr><th>Factuurnr</th><th>Vervaldag</th><th>Bedrag</th><th>Status</th><th>Actie</th></tr></thead>
          <tbody>
            <tr><td>2026-0389</td><td>31/05/2026</td><td>€ 3.150</td><td><span class="badge badge-open">Openstaand</span></td><td><button class="btn btn-primary" style="font-size:12px;padding:6px 12px">Online betalen</button></td></tr>
            <tr><td>2026-0361</td><td>31/03/2026</td><td>€ 1.820</td><td><span class="badge badge-alert">Vervallen</span></td><td><button class="btn btn-primary" style="font-size:12px;padding:6px 12px">Online betalen</button></td></tr>
          </tbody>
        </table>
      </div>
      <div class="placeholder"><strong>[Online betalingsmodule — Peppol/Nymus integratie]</strong>Betaling verloopt via de geconfigureerde betaalgateway.</div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 3: Maak `documenten.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Alle documenten</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Alle documenten</h1>
        <p class="page-desc">Centraal documentencentrum — strategisch, tactisch en operationeel — gefilterd op rol, contract en site.</p>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="Zoeken op naam, categorie…">
        <select><option>Alle categorieën</option><option>Strategisch</option><option>Tactisch</option><option>Operationeel</option><option>Contract</option></select>
        <select><option>Alle sites</option><option>Gent</option><option>Antwerpen</option><option>Brussel</option></select>
      </div>
      <div class="card">
        <div class="card-title">Contract</div>
        <table class="data-table"><tbody>
          <tr><td>📄 Basiscontract ATB-2024-0312</td><td style="color:var(--color-text-2);font-size:12px">Contract</td><td style="color:var(--color-text-2);font-size:12px">01/01/2024</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
          <tr><td>📄 Addendum 1 — Glaswas</td><td style="color:var(--color-text-2);font-size:12px">Contract</td><td style="color:var(--color-text-2);font-size:12px">01/06/2024</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
        </tbody></table>
      </div>
      <div class="card">
        <div class="card-title">Strategisch</div>
        <table class="data-table"><tbody>
          <tr><td>📊 Jaarverslag 2025 — Vlaeminck</td><td style="color:var(--color-text-2);font-size:12px">Strategisch</td><td style="color:var(--color-text-2);font-size:12px">15/01/2026</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
          <tr><td>📊 Business Review Q1 2026</td><td style="color:var(--color-text-2);font-size:12px">Strategisch</td><td style="color:var(--color-text-2);font-size:12px">15/04/2026</td><td><a href="#" style="color:var(--color-accent)">Download</a></td></tr>
        </tbody></table>
      </div>
      <div class="card">
        <div class="card-title">Operationeel</div>
        <table class="data-table"><tbody>
          <tr><td>📋 Uitvoeringsbon #UB-2026-0412</td><td style="color:var(--color-text-2);font-size:12px">Operationeel</td><td style="color:var(--color-text-2);font-size:12px">01/05/2026</td><td><a href="uitvoeringsbonnen.html" style="color:var(--color-accent)">Bekijken</a></td></tr>
        </tbody></table>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 4: Maak `uitvoeringsbonnen.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Uitvoeringsbonnen</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Uitvoeringsbonnen</h1>
        <p class="page-desc">Digitale uitvoeringsbonnen — doorzoekbaar, downloadbaar, gekoppeld aan planning, Work Orders en facturen.</p>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="Zoeken op bonnummer, dienst…">
        <select><option>Alle sites</option><option>Gent</option><option>Antwerpen</option><option>Brussel</option></select>
        <select><option>Alle diensten</option><option>Schoonmaak</option><option>Glaswas</option><option>Hard Services</option></select>
        <select><option>Alle periodes</option><option>Mei 2026</option><option>April 2026</option></select>
      </div>
      <div class="card" style="padding:0">
        <table class="data-table">
          <thead><tr><th>Bon nr</th><th>Datum</th><th>Dienst</th><th>Site</th><th>Uitgevoerd door</th><th>WO</th><th>Factuur</th><th>Download</th></tr></thead>
          <tbody>
            <tr><td><strong>UB-2026-0412</strong></td><td>01/05/2026</td><td>Schoonmaak</td><td>Gent</td><td>Ploeg Gent-A</td><td style="font-size:12px;color:var(--color-text-2)">WO-8820</td><td style="font-size:12px;color:var(--color-text-2)">2026-0412</td><td><a href="#" style="color:var(--color-accent)">PDF</a></td></tr>
            <tr><td><strong>UB-2026-0398</strong></td><td>15/04/2026</td><td>Glaswas</td><td>Brussel</td><td>Ploeg Brussel-B</td><td style="font-size:12px;color:var(--color-text-2)">WO-8805</td><td style="font-size:12px;color:var(--color-text-2)">—</td><td><a href="#" style="color:var(--color-accent)">PDF</a></td></tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 5: Open alle vier in browser en controleer**

Verwacht: factuurlijst met "Betalen"-link in `invoices.html`; KPI-rij in `openstaand.html`; 3 documentcategorieën in `documenten.html`; bon-tabel in `uitvoeringsbonnen.html`.

- [ ] **Stap 6: Commit**

```
git add invoices.html openstaand.html documenten.html uitvoeringsbonnen.html
git commit -m "feat: add FINANCIEEL and DOCUMENTEN screens (4)"
```

---

## Task 10: Bestelportaal en Communicatie

**Files:**
- Create: `bestelportaal.html`, `communicatie.html`

- [ ] **Stap 1: Maak `bestelportaal.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Bestelportaal</title>
  <link rel="stylesheet" href="styles.css">
  <style>
    .product-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
    .product-card { background:var(--color-card); border-radius:var(--radius); box-shadow:var(--shadow); padding:16px; }
    .product-img { width:100%; height:100px; background:var(--color-bg); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--color-text-2); font-size:12px; margin-bottom:12px; }
    .product-name { font-weight:600; font-size:14px; }
    .product-price { color:var(--color-text-2); font-size:13px; margin-top:4px; }
    .product-action { margin-top:12px; }
  </style>
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Bestelportaal</h1>
        <p class="page-desc">Productbestellingen (verbruiksartikelen, catering, …) — aparte flow van meldingen, met optionele goedkeuringsflow.</p>
      </div>
      <div class="filter-bar">
        <input type="text" placeholder="Zoeken op product…">
        <select><option>Alle categorieën</option><option>Sanitair</option><option>Catering</option><option>Kantoor</option><option>Reiniging</option></select>
      </div>
      <div class="product-grid">
        <div class="product-card"><div class="product-img">[Productfoto]</div><div class="product-name">Handzeepdispenser navulling</div><div class="product-price">€ 4,50 / stuk</div><div class="product-action"><button class="btn btn-primary" style="font-size:12px;width:100%">+ Bestellen</button></div></div>
        <div class="product-card"><div class="product-img">[Productfoto]</div><div class="product-name">Papieren handdoeken (rol)</div><div class="product-price">€ 2,80 / rol</div><div class="product-action"><button class="btn btn-primary" style="font-size:12px;width:100%">+ Bestellen</button></div></div>
        <div class="product-card"><div class="product-img">[Productfoto]</div><div class="product-name">Koffiepads (pak 100)</div><div class="product-price">€ 12,00 / pak</div><div class="product-action"><button class="btn btn-primary" style="font-size:12px;width:100%">+ Bestellen</button></div></div>
        <div class="product-card"><div class="product-img">[Productfoto]</div><div class="product-name">Reinigingsdoekjes — SDS beschikbaar</div><div class="product-price">€ 6,20 / doos</div><div class="product-action"><button class="btn btn-primary" style="font-size:12px;width:100%">+ Bestellen</button></div></div>
      </div>
      <div class="placeholder" style="margin-top:24px"><strong>[Productcatalogus — ERP/bestelplatform]</strong>Productprijzen en beschikbaarheid worden geladen vanuit het gecontracteerde bestelplatform. SDS-fiches zijn per product downloadbaar.</div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 2: Maak `communicatie.html` aan**

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ATALIAN — Nieuws & Updates</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="app-shell">
    <header class="topbar">
      <span class="logo">ATALIAN.</span>
      <span class="client-selector">Vlaeminck Logistics ▾</span>
      <div class="topbar-actions"><span>NL</span><span>🔔</span><span>DS ▾</span></div>
    </header>
    <nav class="sidebar" id="sidebar"></nav>
    <main class="main-content">
      <div class="page-header">
        <h1 class="page-title">Nieuws & Updates</h1>
        <p class="page-desc">Aankondigingen, best practices en ESG-updates — rol- en contractgebonden, geen commerciële communicatie.</p>
      </div>
      <div class="card" style="border-left:4px solid var(--color-accent)">
        <div style="font-size:12px;color:var(--color-text-2);margin-bottom:6px">AANKONDIGING · 20/05/2026</div>
        <div style="font-weight:600;font-size:15px">Zomerplanning 2026 — aangepaste uren in augustus</div>
        <p style="font-size:13px;color:var(--color-text-2);margin-top:8px">Tijdens de maand augustus gelden aangepaste werktijden op alle sites. Uw planning in het portaal wordt automatisch bijgewerkt.</p>
      </div>
      <div class="card">
        <div style="font-size:12px;color:var(--color-text-2);margin-bottom:6px">BEST PRACTICE · 10/05/2026</div>
        <div style="font-weight:600;font-size:15px">Hoe QR-code ticketing tijd bespaart op uw Gent-site</div>
        <p style="font-size:13px;color:var(--color-text-2);margin-top:8px">Sinds de introductie van QR-scanning in maart is de gemiddelde responstijd voor meldingen op site Gent met 35% gedaald.</p>
      </div>
      <div class="card">
        <div style="font-size:12px;color:var(--color-text-2);margin-bottom:6px">ESG · 01/05/2026</div>
        <div style="font-weight:600;font-size:15px">ATALIAN ESG-rapport 2025 beschikbaar</div>
        <p style="font-size:13px;color:var(--color-text-2);margin-top:8px">Ons jaarlijks duurzaamheidsrapport is gepubliceerd. Bekijk onze CO₂-reductie, circulaire reinigingsproducten en sociale initiatieven.</p>
        <a href="#" style="color:var(--color-accent);font-size:13px;margin-top:8px;display:inline-block">Rapport downloaden →</a>
      </div>
    </main>
  </div>
  <script src="nav.js"></script>
</body>
</html>
```

- [ ] **Stap 3: Open beide in browser en controleer**

Verwacht: productgrid met 4 kaarten en bestelknoppen in `bestelportaal.html`; 3 nieuwsberichten met categorie-labels in `communicatie.html`.

- [ ] **Stap 4: Eindcontrole — open `index.html` en klik alle 17 links door**

Elk scherm moet openen zonder 404. Sidebar moet op elk scherm het correcte actieve item tonen.

- [ ] **Stap 5: Eindcommit**

```
git add bestelportaal.html communicatie.html
git commit -m "feat: add bestelportaal and communicatie screens — prototype complete"
```

---

## Verificatie checklist

Na Task 10 controleer je het volgende voor elk scherm:

| Check | Verwacht |
|-------|----------|
| Sidebar zichtbaar | Ja, op elk scherm |
| Actief nav-item | Correct gemarkeerd in groen |
| Topbar aanwezig | ATALIAN. + Vlaeminck Logistics |
| ATALIAN-kleuren | Donkere sidebar #1A2024, groen accent #74AE25 |
| Placeholder-blokken | Aanwezig waar data uit bronsystemen komt |
| Briefing-beschrijving | Aanwezig onder elke paginatitel |
| Links werkend | Alle nav-links navigeren correct |
