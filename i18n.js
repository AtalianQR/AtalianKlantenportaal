// i18n.js — eenvoudig vertaalsysteem (NL/FR/EN)
(function () {
  var LANGS = ['nl', 'fr', 'en'];
  var LABELS = { nl: 'NL', fr: 'FR', en: 'EN' };

  function getLang() {
    var l = localStorage.getItem('lang');
    return LANGS.indexOf(l) !== -1 ? l : 'nl';
  }

  function setLang(l) {
    localStorage.setItem('lang', l);
    apply(l);
    buildSwitcher(l);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: l } }));
  }

  function t(dict, lang, key) {
    if (dict[key] && dict[key][lang] != null) return dict[key][lang];
    if (dict[key] && dict[key].nl != null) return dict[key].nl;
    return null;
  }

  function apply(lang) {
    var dict = window.I18N_DICT || {};
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var val = t(dict, lang, el.getAttribute('data-i18n'));
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var val = t(dict, lang, el.getAttribute('data-i18n-placeholder'));
      if (val != null) el.setAttribute('placeholder', val);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      var val = t(dict, lang, el.getAttribute('data-i18n-title'));
      if (val != null) el.setAttribute('title', val);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var val = t(dict, lang, el.getAttribute('data-i18n-html'));
      if (val != null) el.innerHTML = val;
    });
  }

  function buildSwitcher(lang) {
    var host = document.querySelector('.topbar-actions');
    if (!host) return;

    var existing = host.querySelector('#lang-switcher');
    if (existing) existing.remove();

    var wrap = document.createElement('span');
    wrap.id = 'lang-switcher';
    wrap.style.cssText = 'cursor:pointer;position:relative;user-select:none';
    wrap.textContent = LABELS[lang] + ' ▾';

    var menu = document.createElement('div');
    menu.style.cssText =
      'display:none;position:absolute;top:calc(100% + 6px);left:0;' +
      'background:#fff;border:1px solid #e2e6ea;border-radius:8px;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.12);min-width:90px;z-index:9999;overflow:hidden;';

    LANGS.forEach(function (l) {
      var opt = document.createElement('button');
      opt.textContent = LABELS[l];
      opt.style.cssText =
        'display:block;width:100%;padding:8px 14px;background:none;border:none;' +
        'font-size:13px;color:#1A2024;cursor:pointer;text-align:left;font-family:inherit;' +
        (l === lang ? 'font-weight:700;color:var(--color-accent,#EC732C)' : '');
      opt.addEventListener('mouseenter', function () { this.style.background = '#f5f6f8'; });
      opt.addEventListener('mouseleave', function () { this.style.background = 'none'; });
      opt.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.style.display = 'none';
        setLang(l);
      });
      menu.appendChild(opt);
    });

    wrap.appendChild(menu);
    wrap.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', function () { menu.style.display = 'none'; });

    host.insertBefore(wrap, host.firstChild);
  }

  function init() {
    var lang = getLang();
    apply(lang);
    buildSwitcher(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
