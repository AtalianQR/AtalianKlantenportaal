// feedback.js — per-pagina feedbackwidget → Netlify Forms
(function () {
  var page = document.title.replace('ATALIAN — ', '') || window.location.pathname.split('/').pop();
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
    <label class="fb-label">Wat zie ik</label>
    <textarea id="fb-zien" placeholder="Beschrijf wat je ziet op deze pagina…" rows="2"></textarea>

    <label class="fb-label" style="margin-top:10px">Wat wens ik</label>
    <textarea id="fb-text" placeholder="Wat verwacht je, wat ontbreekt, wat kan beter…" rows="2"></textarea>

    <div id="fb-priority-row" style="margin-top:10px">
      <label class="fb-label">Prioriteit</label>
      <div id="fb-priority-btns">
        <label class="fb-prio-btn" data-v="must-have">
          <input type="radio" name="fb-prio" value="must-have" style="display:none">
          🔴 Must-have
        </label>
        <label class="fb-prio-btn" data-v="nice-to-have">
          <input type="radio" name="fb-prio" value="nice-to-have" style="display:none">
          🟡 Nice-to-have
        </label>
      </div>
    </div>

    <label class="fb-label" style="margin-top:10px">Printscreen(s) — optioneel</label>
    <label id="fb-file-label">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      Kies of sleep een printscreen
      <input id="fb-file" type="file" accept="image/*" multiple style="display:none">
    </label>
    <div id="fb-previews"></div>

    <div id="fb-lb-note">
      📄 Houd je feedback binnen het kader van het <a href="lastenboek.pdf" target="_blank">lastenboek</a>.
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

#fb-name, #fb-zien, #fb-text {
  width:100%; padding:8px 10px;
  border:1px solid #D5D9DD; border-radius:5px;
  font-size:13px; resize:vertical; box-sizing:border-box;
  font-family:inherit;
}
#fb-name:focus, #fb-zien:focus, #fb-text:focus {
  outline:2px solid #74AE25; border-color:#74AE25;
}

#fb-file-label {
  display:flex; align-items:center; gap:7px;
  width:100%; padding:8px 10px; box-sizing:border-box;
  border:1px dashed #aab; border-radius:5px;
  font-size:12px; color:#555; cursor:pointer;
  background:#f9fafb; transition:border-color .15s;
}
#fb-file-label:hover { border-color:#74AE25; color:#3a7010; }
#fb-file-label.drag { border-color:#74AE25; background:#f0f9e4; }

#fb-previews {
  display:flex; flex-wrap:wrap; gap:6px; margin-top:6px;
}
.fb-thumb {
  position:relative; width:58px; height:58px;
}
.fb-thumb img {
  width:100%; height:100%; object-fit:cover;
  border-radius:4px; border:1px solid #D5D9DD;
}
.fb-thumb-rm {
  position:absolute; top:-5px; right:-5px;
  width:16px; height:16px; border-radius:50%;
  background:#c0392b; color:#fff; border:none;
  font-size:10px; line-height:16px; text-align:center;
  cursor:pointer; padding:0;
}

#fb-lb-note {
  margin-top:12px; padding:8px 10px;
  background:#f9fafb; border:1px solid #e2e6ea; border-radius:5px;
  font-size:11px; color:#555; line-height:1.4;
}
#fb-lb-note a { color:#74AE25; font-weight:600; text-decoration:underline; }

#fb-save {
  display:block; width:100%; margin-top:14px;
  padding:9px; background:#74AE25; color:#fff;
  border:none; border-radius:5px; font-weight:600;
  cursor:pointer; font-size:13px; font-family:inherit;
}
#fb-save:hover { background:#5f9620; }
#fb-save:disabled { background:#aaa; cursor:not-allowed; }

#fb-priority-btns {
  display:flex; gap:8px; margin-top:4px;
}
.fb-prio-btn {
  flex:1; padding:7px 10px; border-radius:5px; text-align:center;
  border:2px solid #D5D9DD; font-size:12px; font-weight:600;
  cursor:pointer; transition:all .15s; user-select:none;
  background:#f9fafb; color:#4B555C;
}
.fb-prio-btn:hover { border-color:#aaa; background:#f0f0f0; }
.fb-prio-btn.selected[data-v="must-have"]    { border-color:#D93025; background:#fdecea; color:#c0392b; }
.fb-prio-btn.selected[data-v="nice-to-have"] { border-color:#F4A300; background:#fff8e0; color:#a06000; }

#fb-msg {
  margin-top:10px; padding:8px 10px; border-radius:5px;
  font-size:13px; font-weight:600; text-align:center;
}
#fb-msg.ok  { background:#e8f5d6; color:#3a7010; }
#fb-msg.err { background:#fde8e8; color:#c0392b; }`;
  document.head.appendChild(style);

  // ── Afbeeldingen ──────────────────────────────────────────────────────────
  var selectedFiles = [];

  function renderPreviews() {
    var box = document.getElementById('fb-previews');
    box.innerHTML = '';
    selectedFiles.forEach(function (file, i) {
      var url = URL.createObjectURL(file);
      var wrap = document.createElement('div');
      wrap.className = 'fb-thumb';
      wrap.innerHTML = '<img src="' + url + '" alt=""><button class="fb-thumb-rm" title="Verwijder">✕</button>';
      wrap.querySelector('.fb-thumb-rm').addEventListener('click', function () {
        selectedFiles.splice(i, 1);
        renderPreviews();
      });
      box.appendChild(wrap);
    });
  }

  function addFiles(files) {
    Array.from(files).forEach(function (f) {
      if (f.type.startsWith('image/')) selectedFiles.push(f);
    });
    renderPreviews();
  }

  document.getElementById('fb-file').addEventListener('change', function () {
    addFiles(this.files);
    this.value = '';
  });

  var lbl = document.getElementById('fb-file-label');
  lbl.addEventListener('dragover', function (e) { e.preventDefault(); lbl.classList.add('drag'); });
  lbl.addEventListener('dragleave', function () { lbl.classList.remove('drag'); });
  lbl.addEventListener('drop', function (e) {
    e.preventDefault();
    lbl.classList.remove('drag');
    addFiles(e.dataTransfer.files);
  });

  // ── Prioriteit knoppen ────────────────────────────────────────────────────
  document.querySelectorAll('.fb-prio-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.fb-prio-btn').forEach(function (b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      btn.querySelector('input').checked = true;
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
    var zien = document.getElementById('fb-zien').value.trim();
    var text = document.getElementById('fb-text').value.trim();
    if (!text) { document.getElementById('fb-text').focus(); return; }

    var btn = document.getElementById('fb-save');
    btn.disabled = true;
    btn.textContent = 'Versturen…';

    var fd = new FormData();
    fd.append('form-name',  'feedback');
    fd.append('bot-field',  '');
    fd.append('pagina',     page);
    fd.append('naam',       sessionStorage.getItem('naam') || '');
    fd.append('wat-zie-ik', zien);
    fd.append('wat-wens-ik', text);
    var prioEl = document.querySelector('input[name="fb-prio"]:checked');
    fd.append('prioriteit', prioEl ? prioEl.value : '');
    selectedFiles.forEach(function (f) { fd.append('afbeelding', f, f.name); });

    fetch('/', { method: 'POST', body: fd })
    .then(function (res) {
      var msg = document.getElementById('fb-msg');
      if (res.ok) {
        msg.textContent = '✓ Bedankt! Je feedback is ontvangen.';
        msg.className = 'ok';
        document.getElementById('fb-zien').value = '';
        document.getElementById('fb-text').value = '';
        selectedFiles = [];
        renderPreviews();
        document.querySelectorAll('.fb-prio-btn').forEach(function (b) { b.classList.remove('selected'); });
        document.querySelectorAll('input[name="fb-prio"]').forEach(function (r) { r.checked = false; });
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
