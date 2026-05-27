// feedback.js — per-pagina feedbackwidget → Netlify Forms
(function () {
  var page = document.title.replace('ATALIAN — ', '') || window.location.pathname.split('/').pop();
  var rating = 0;

  function encode(data) {
    return Object.keys(data)
      .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); })
      .join('&');
  }

  // ── HTML injecteren ────────────────────────────────────────────────────────
  var el = document.createElement('div');
  el.id = 'fb-root';
  el.innerHTML = `
<div id="fb-btn" title="Geef feedback op deze pagina">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  Feedback
</div>

<div id="fb-panel">
  <div id="fb-header">
    <span>Opmerking over <strong>${page}</strong></span>
    <button id="fb-close">✕</button>
  </div>
  <div id="fb-body">
    <label class="fb-label">Jouw naam</label>
    <input id="fb-name" type="text" placeholder="bijv. Jan Peeters">

    <label class="fb-label" style="margin-top:10px">Opmerking</label>
    <textarea id="fb-text" placeholder="Wat valt je op, wat ontbreekt, wat werkt goed…" rows="4"></textarea>

    <div id="fb-rating-row">
      <span class="fb-label">Beoordeling pagina</span>
      <div id="fb-stars">
        <span class="fb-star" data-v="1">★</span>
        <span class="fb-star" data-v="2">★</span>
        <span class="fb-star" data-v="3">★</span>
        <span class="fb-star" data-v="4">★</span>
        <span class="fb-star" data-v="5">★</span>
      </div>
    </div>

    <button id="fb-save">Verstuur feedback</button>
    <div id="fb-msg" style="display:none"></div>
  </div>
</div>`;
  document.body.appendChild(el);

  // ── Stijlen ────────────────────────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = `
#fb-btn {
  position:fixed; bottom:24px; right:24px; z-index:9000;
  background:#74AE25; color:#fff;
  padding:10px 16px; border-radius:24px;
  font-size:13px; font-weight:600; cursor:pointer;
  display:flex; align-items:center; gap:7px;
  box-shadow:0 3px 10px rgba(0,0,0,.25);
  transition:background .15s; font-family:inherit;
}
#fb-btn:hover { background:#5f9620; }

#fb-panel {
  position:fixed; bottom:72px; right:24px; z-index:9001;
  width:320px; background:#fff; border-radius:8px;
  box-shadow:0 6px 24px rgba(0,0,0,.18);
  display:none; flex-direction:column; overflow:hidden;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  font-size:13px;
}
#fb-panel.open { display:flex; }

#fb-header {
  background:#1A2024; color:#fff;
  padding:12px 16px;
  display:flex; align-items:center; justify-content:space-between;
  font-size:13px;
}
#fb-close {
  background:none; border:none; color:#ccc; cursor:pointer;
  font-size:16px; line-height:1; padding:0;
}
#fb-close:hover { color:#fff; }

#fb-body { padding:14px 16px 16px; }

.fb-label {
  display:block; font-size:11px; font-weight:700; color:#4B555C;
  text-transform:uppercase; letter-spacing:.05em; margin-bottom:4px;
}

#fb-name, #fb-text {
  width:100%; padding:8px 10px;
  border:1px solid #D5D9DD; border-radius:5px;
  font-size:13px; resize:vertical; box-sizing:border-box;
  font-family:inherit;
}
#fb-name:focus, #fb-text:focus {
  outline:2px solid #74AE25; border-color:#74AE25;
}

#fb-rating-row {
  display:flex; align-items:center; justify-content:space-between;
  margin-top:10px;
}
#fb-stars { display:flex; gap:3px; }
.fb-star { font-size:22px; color:#D5D9DD; cursor:pointer; transition:color .1s; user-select:none; }
.fb-star.on { color:#F4A300; }

#fb-save {
  display:block; width:100%; margin-top:14px;
  padding:9px; background:#74AE25; color:#fff;
  border:none; border-radius:5px; font-weight:600;
  cursor:pointer; font-size:13px; font-family:inherit;
}
#fb-save:hover { background:#5f9620; }
#fb-save:disabled { background:#aaa; cursor:not-allowed; }

#fb-msg {
  margin-top:10px; padding:8px 10px; border-radius:5px;
  font-size:13px; font-weight:600; text-align:center;
}
#fb-msg.ok  { background:#e8f5d6; color:#3a7010; }
#fb-msg.err { background:#fde8e8; color:#c0392b; }`;
  document.head.appendChild(style);

  // ── Sterren ────────────────────────────────────────────────────────────────
  document.querySelectorAll('.fb-star').forEach(function (s) {
    s.addEventListener('mouseover', function () {
      document.querySelectorAll('.fb-star').forEach(function (x) {
        x.classList.toggle('on', +x.dataset.v <= +s.dataset.v);
      });
    });
    s.addEventListener('click', function () { rating = +s.dataset.v; });
  });
  document.getElementById('fb-stars').addEventListener('mouseleave', function () {
    document.querySelectorAll('.fb-star').forEach(function (x) {
      x.classList.toggle('on', +x.dataset.v <= rating);
    });
  });

  // ── Open / sluit ───────────────────────────────────────────────────────────
  document.getElementById('fb-btn').addEventListener('click', function () {
    document.getElementById('fb-panel').classList.toggle('open');
  });
  document.getElementById('fb-close').addEventListener('click', function () {
    document.getElementById('fb-panel').classList.remove('open');
  });

  // ── Versturen naar Netlify ─────────────────────────────────────────────────
  document.getElementById('fb-save').addEventListener('click', function () {
    var text = document.getElementById('fb-text').value.trim();
    if (!text) { document.getElementById('fb-text').focus(); return; }

    var btn = document.getElementById('fb-save');
    btn.disabled = true;
    btn.textContent = 'Versturen…';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'feedback',
        'bot-field': '',
        'pagina':      page,
        'naam':        document.getElementById('fb-name').value.trim(),
        'opmerking':   text,
        'beoordeling': rating || ''
      })
    })
    .then(function (res) {
      var msg = document.getElementById('fb-msg');
      if (res.ok) {
        msg.textContent = '✓ Bedankt! Je feedback is ontvangen.';
        msg.className = 'ok';
        document.getElementById('fb-text').value = '';
        document.getElementById('fb-name').value = '';
        rating = 0;
        document.querySelectorAll('.fb-star').forEach(function (s) { s.classList.remove('on'); });
      } else {
        msg.textContent = '✗ Er ging iets mis. Probeer opnieuw.';
        msg.className = 'err';
      }
      msg.style.display = '';
      btn.disabled = false;
      btn.textContent = 'Verstuur feedback';
    })
    .catch(function () {
      var msg = document.getElementById('fb-msg');
      msg.textContent = '✗ Geen verbinding. Probeer opnieuw.';
      msg.className = 'err';
      msg.style.display = '';
      btn.disabled = false;
      btn.textContent = 'Verstuur feedback';
    });
  });
})();
