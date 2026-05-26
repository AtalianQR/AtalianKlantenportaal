# ATALIAN Klantenportaal — Prototype Website Design

**Datum:** 2026-05-26  
**Status:** Goedgekeurd door gebruiker  
**Doel:** Itereerbaar HTML/CSS/JS prototype ter vervanging van de statische PDF (15 schermen)

---

## 1. Context & Probleemstelling

ATALIAN beschikt over een uitgebreid basisdocument (2026-01-07) en een PDF-front-end design (15 schermen). De PDF is moeilijk iteratief bij te sturen: elk detail aanpassen kost veel tokens en maakt gerichte feedback omslachtig.

**Oplossing:** Een kleine statische website met klikbare navigatie die als levend ontwerpdocument fungeert — zowel voor interne presentaties (management, collega's) als voor briefings aan softwareleveranciers.

---

## 2. Technologie & Locatie

- **Stack:** Pure HTML5 / CSS3 / vanilla JavaScript — geen framework, geen build-stap
- **Locatie:** `C:\Users\dsmey\OneDrive - ATALIAN\Documenten\GitHub\AtalianKlantenportaal`
- **Referentieproject:** `AtalianQRSite` (Astro/Netlify) in dezelfde GitHub-map

---

## 3. Bestandsstructuur

```
AtalianKlantenportaal/
├── index.html                        ← Startpagina / inhoudstafel
├── styles.css                        ← Globale stijlen + CSS-variabelen
├── nav.js                            ← Injecteert sidebar in elk scherm
│
├── work/
│   ├── administration/
│   │   ├── contract.html
│   │   ├── contactpersonen.html
│   │   └── services.html
│   ├── planning.html
│   ├── tickets.html                  ← incl. nieuwe melding + klacht als type
│   └── actions.html                  ← acties + offertes ter goedkeuring
│
├── operations/
│   ├── assets.html
│   ├── audits.html
│   └── projectfiches.html
│
├── finance/
│   └── invoices.html
│
├── documents/
│   ├── documenten.html               ← incl. contract-tab
│   └── uitvoeringsbonnen.html
│
└── extra/
    ├── bestelportaal.html
    └── communicatie.html
│
└── docs/
    └── superpowers/specs/            ← dit bestand
```

**Mechanisme:** `nav.js` wordt door elk HTML-bestand geladen en injecteert de volledige sidebar. Navigatiewijzigingen hoeven maar op één plaats te gebeuren.

---

## 4. Navigatiestructuur (sidebar)

Gangbare B2B-portaaltaal — geen ATALIAN-intern jargon:

```
HOME
MIJN CONTRACT
  ├── Contractdetails
  ├── Ons team
  └── Diensten
MELDINGEN & OPVOLGING
  ├── Nieuwe melding
  ├── Mijn meldingen
  ├── Planning
  └── Te ondertekenen
INSTALLATIES & KEURINGEN
  ├── Installaties
  ├── Keuringen & inspecties
  └── Werkdossiers
FINANCIEEL
  ├── Facturen
  └── Openstaande bedragen
DOCUMENTEN
  ├── Alle documenten
  └── Uitvoeringsbonnen
NIEUWS & UPDATES
```

**Ontwerpkeuzes:**
- "Ons team" i.p.v. "Contactpersonen ATALIAN" — klantgericht en warm
- "Te ondertekenen" i.p.v. "Acties" — klant ziet onmiddellijk dat er iets van hem verwacht wordt
- Klachten = type binnen "Nieuwe melding", geen aparte module
- Projectfiches onder INSTALLATIES & KEURINGEN (operationeel gebruik), niet onder Administratie

---

## 5. App Shell Layout

Alle schermen delen dezelfde shell:

```
┌─────────────────────────────────────────────────────────┐
│  ATALIAN.  │  Vlaeminck Logistics ▾  │  NL  🔔  DS ▾   │  topbalk (60px)
├────────────┼────────────────────────────────────────────┤
│  Sidebar   │  Hoofdinhoud                               │
│  (240px)   │  (achtergrond #E6E8EB, kaarten #FFFFFF)    │
│  #1A2024   │                                            │
└────────────┴────────────────────────────────────────────┘
```

---

## 6. Schermopbouw per type

### HOME (dashboard)
- Rij KPI-widgets: openstaande meldingen / geplande taken / SLA %
- Recente activiteit (lijst links) + Ons team (rechts)
- "Te ondertekenen" badge wanneer items wachten

### Lijstschermen (Mijn meldingen, Facturen, Documenten...)
- Filterbar: zoeken + filterknop + site-selector
- Tabel met status-badges (kleurgecodeerd)
- Actieknop linksboven ("+ Nieuwe melding", "+ Nieuwe bestelling"...)

### Detailschermen (Contract, Installaties, Audits...)
- Paginatitel + korte beschrijving (grijs, klein) voor leveranciersbriefing
- Placeholder-blokken in lichtgrijs met label (bv. `[Power BI rapport]`, `[Kalender]`)

### Formulierschermen (Nieuwe melding)
- Veld "Dienst" → placeholder `[gefilterd op contractuele diensten klant]`
- Veld "Type": Melding / Klacht / Vraag / Preventief
- Veld "Site", "Omschrijving", "Bijlage"

---

## 7. Branding & Kleuren

Overgenomen uit de bestaande PDF (geëxtraheerd):

| Variabele         | Hex       | Gebruik                              |
|-------------------|-----------|--------------------------------------|
| `--color-dark`    | `#1A2024` | Sidebar achtergrond, topbalk         |
| `--color-accent`  | `#74AE25` | Actieve nav, knoppen, badges         |
| `--color-text-2`  | `#4B555C` | Secundaire tekst                     |
| `--color-border`  | `#D5D9DD` | Scheidingslijnen, tabelranden        |
| `--color-bg`      | `#E6E8EB` | Paginaachtergrond                    |
| `--color-card`    | `#FFFFFF` | Kaarten, panelen                     |

---

## 8. Voorbeelddata

Alle schermen gebruiken één consistente voorbeeldklant: **Vlaeminck Logistics** (3 sites: Gent, Antwerpen, Brussel). Dit zorgt voor een coherente presentatie zonder te verzanden in configuratiedetails.

---

## 9. Wat dit prototype NIET bevat

- Geen echte backend of API-koppelingen
- Geen authenticatie
- Geen meertaligheid (NL als enige taal in prototype)
- Geen echte Power BI-rapporten (placeholder-blokken)
- Geen RBAC-logica (één vaste rol getoond)

---

## 10. Doel per scherm

| Scherm | Doel in prototype |
|--------|-------------------|
| HOME | Tonen van dashboard-concept: KPI's, activiteit, team |
| Contract | Contractuele info overzichtelijk tonen |
| Ons team | Aanspreekpunten per rol (KAM, DM, SHEQ, Sales) |
| Diensten | Gecontracteerde diensten per site |
| Planning | Kalenderweergave geplande activiteiten |
| Mijn meldingen | Lijstweergave met status en filters |
| Nieuwe melding | Formulier met dienst/type/site-selectie |
| Acties / Te ondertekenen | Offertes en acties die klant moet goedkeuren |
| Installaties | Asset-lijst per site, gekoppeld aan Ultimo |
| Keuringen & inspecties | Compliance-overzicht per asset |
| Werkdossiers | Operationele afspraken per site |
| Facturen | Lijst met status (betaald / openstaand / vervallen) |
| Openstaande bedragen | Financieel overzicht |
| Alle documenten | Categorieën: strategisch / tactisch / operationeel |
| Uitvoeringsbonnen | Gekoppeld aan planning en facturen |
| Bestelportaal | Productcatalogus met bestelfunctie |
| Nieuws & Updates | Aankondigingen, ESG, best practices |
