// Kullanım: CRM sekmesinde (Türkçe açık) konsola yapıştır, sonra çağır:
//   (BU_FONKSİYON)(["/v2/location/:loc/dashboard", ...başlangıç sayfaları], {wait: 6000, max: 150, clicks: true, tag: "1"})
// Sayfa tam yenilenirse durum localStorage gai_qa_tour'da kalır; aynı çağrı kaldığı yerden sürer.
// CRM tam kalite turu (Türkçe). Sayfayı bekletmeden arka planda çalışır; durum window.__gaiTour'da.
// Başlangıç sayfalarından gider, her sayfada aynı bölümün bağlantılarını kuyruğa ekler (en çok opts.max sayfa).
// Her sayfada görünür İngilizce arayüz metinlerini + gömülü (vekil) ekranların kalıntılarını toplar; yalnız güvenli
// düğmelere (sekme, filtre, sıralama, alan yönetimi) tıklar, açılanı tarar, Escape ile kapatır. Kayıt/silme/gönderme yok.
// Bitince sonucu indirir: gai-crm-qa-tour-<tag>.json
(function (seeds, opts) {
  opts = opts || {};
  var wait = opts.wait || 6000;
  var max = opts.max || 150;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var router = document.querySelector("#app").__vue_app__.config.globalProperties.$router;
  var loc = location.pathname.match(/location\/([A-Za-z0-9]+)/)[1];
  var EN = /\b(the|your|you|to|for|with|and|of|is|are|this|that|no|not|add|new|create|edit|delete|save|cancel|search|filter|sort|view|show|hide|select|all|none|more|settings|contacts?|opportunit\w*|pipelines?|calendars?|appointments?|conversations?|messages?|payments?|invoices?|products?|emails?|reports?|import|export|status|actions?|name|phone|date|time|today|week|month|total|open|won|lost|tags?|owner|assigned|due|tasks?|notes?|loading|learn|manage|connect|enable|disable|update|upload|download|next|back|close|done|apply|reset|clear|start|end|type|details?|overview|list|users?|team|price|amount|source|created|updated|last|first|group|yet|link|existing|associations?|compan\w+|business|address|city|country|state|postal|activit\w+|track|stay|keep|items?|records?|fields?|columns?|rows?|page|per|go|get|why|how|what|revenue|rate|conversion|enrollments?|checkouts?|value|order|highest|lowest|unique|views?|cumulative|activate|free|unlimited|automated|daily|instant|launch|migrate|seamless|lightning|fast|hosting|course|courses|progress|average|overall|previous|days|hrs|learning|completed|members?|analytics|assessment)\b/i;
  var TRCH = /[çğıöşüÇĞİÖŞÜ]/;
  var SKIP = "script,style,textarea,input,select,code,pre,[contenteditable],[contenteditable] *,tbody,#__gai_lang_toggle,#__gai_hunt,[class*=message],[class*=Message],[class*=conversation-body],[class*=email-body],.fc-event";
  var SAFE_BTN = /^(Filtreler|Filtre|Gelişmiş filtreler|Sırala|Sıralama|Alanları yönet|Sütunlar|Sütunları yönet|Görünümler)$/;
  var KEY = "gai_qa_tour";
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}
  var st = (window.__gaiTour = saved && !saved.done ? saved : { started: new Date().toISOString(), done: false, i: 0, queue: [], seen: {}, pages: {}, errors: [], reloads: [] });
  if (st.current) { st.reloads.push(st.current); st.pages[st.current] = st.pages[st.current] || { texts: {}, note: "sayfa tam yeniledi" }; st.current = null; }
  var save = function () { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { st.errors.push("save: " + String(e).slice(0, 80)); } };
  window.__gaiTourRunning = true;
  function norm(h) {
    try {
      var u = new URL(h, location.origin);
      if (u.origin !== location.origin) return null;
      var p = u.pathname;
      if (!/^\/v2\/location\/[A-Za-z0-9]+\//.test(p)) return null;
      p = p.replace(/location\/[A-Za-z0-9]+/, "location/" + loc);
      if (/\/(edit|builder|preview|detail|details|create|new)(\/|$)/.test(p) || /[0-9a-f]{20,}|[A-Za-z0-9]{20}/.test(p.split("/").slice(4).join("/"))) return null; // kayıt/oluşturucu sayfaları değil
      return p;
    } catch (e) {
      return null;
    }
  }
  function enqueue(p) {
    if (!p || st.seen[p] || st.queue.length + Object.keys(st.pages).length >= max) return;
    st.seen[p] = 1;
    st.queue.push(p);
  }
  if (!saved || saved.done) seeds.forEach(function (s) { enqueue(norm(s.replace(":loc", loc))); });
  function visible(el) {
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0;
  }
  function collect(into, where) {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) {
      var t = n.nodeValue.replace(/\s+/g, " ").trim();
      if (!t || t.length > 160 || TRCH.test(t) || !EN.test(t) || /@|https?:\/\//.test(t)) continue;
      var el = n.parentElement;
      if (!el || el.closest(SKIP) || !visible(el)) continue;
      if (!(t in into)) into[t] = where;
    }
    var at = document.querySelectorAll("[placeholder],[title],[aria-label]");
    for (var i = 0; i < at.length; i++) {
      if (at[i].closest(SKIP.replace("input,", "").replace("textarea,", "").replace("select,", "")) || !visible(at[i])) continue;
      ["placeholder", "title", "aria-label"].forEach(function (a) {
        var v = at[i].getAttribute(a);
        var key = "[" + a + "] " + v;
        if (v && v.length < 160 && !TRCH.test(v) && EN.test(v) && !/@|https?:\/\//.test(v) && !(key in into)) into[key] = where;
      });
    }
  }
  function frameTexts() {
    return new Promise(function (resolve) {
      var fr = Array.prototype.filter.call(document.querySelectorAll("iframe"), function (f) { return /crm-[a-z-]+\.growtify\.app/.test(f.getAttribute("src") || ""); });
      var direct = Array.prototype.filter.call(document.querySelectorAll("iframe"), function (f) { return /leadconnectorhq\.com|gohighlevel\.com|\.web\.app/.test(f.getAttribute("src") || ""); }).map(function (f) { try { return new URL(f.src).host; } catch (e) { return "?"; } });
      if (!fr.length) return resolve({ proxied: [], direct: direct });
      var got = [];
      var h = function (e) { if (e.data && e.data.gaiFrameCatalog) got.push({ frame: e.data.gaiFrameCatalog.frame, texts: e.data.gaiFrameCatalog.texts || [], errors: (e.data.gaiFrameCatalog.errors || []).length, failed: (e.data.gaiFrameCatalog.failed || []).length }); };
      window.addEventListener("message", h);
      fr.forEach(function (f) { try { f.contentWindow.postMessage({ gaiCollect: 1 }, "*"); } catch (x) {} });
      setTimeout(function () { window.removeEventListener("message", h); resolve({ proxied: got, direct: direct }); }, 1500);
    });
  }
  (async function run() {
    while (st.queue.length) {
      var path = st.queue.shift();
      st.i++;
      var rec = { texts: {}, frames: null, clicked: [], t0: Date.now() };
      st.pages[path] = rec;
      st.current = path;
      save();
      try {
        await router.push(path);
      } catch (e) {
        rec.error = String(e).slice(0, 120);
      }
      await sleep(wait);
      rec.url = location.pathname.replace(/location\/[A-Za-z0-9]+/, "location/~");
      try {
        collect(rec.texts, "sayfa");
        rec.frames = await frameTexts();
        var section = path.split("/").slice(0, 5).join("/"); // /v2/location/<id>/<bölüm>
        Array.prototype.forEach.call(document.querySelectorAll("a[href]"), function (a) {
          var p = norm(a.getAttribute("href"));
          if (p && p.indexOf(section) === 0) enqueue(p);
        });
        if (opts.clicks) {
          var tabs = Array.prototype.slice.call(document.querySelectorAll("[role=tab]")).filter(visible).slice(0, 4);
          var btns = Array.prototype.slice.call(document.querySelectorAll("button,[role=button]")).filter(function (b) {
            return visible(b) && SAFE_BTN.test((b.innerText || "").replace(/\s+/g, " ").trim());
          }).slice(0, 2);
          var targets = tabs.concat(btns);
          for (var t = 0; t < targets.length; t++) {
            if (!targets[t].isConnected) continue;
            var label = (targets[t].innerText || "").replace(/\s+/g, " ").trim().slice(0, 40);
            targets[t].click();
            await sleep(2000);
            collect(rec.texts, "tıklama: " + label);
            rec.clicked.push(label);
            document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
            await sleep(500);
          }
        }
      } catch (e) {
        st.errors.push(path + ": " + String(e).slice(0, 100));
      }
      rec.ms = Date.now() - rec.t0;
      rec.n = Object.keys(rec.texts).length;
      st.current = null;
      save();
    }
    st.done = true;
    st.ended = new Date().toISOString();
    save();
    window.__gaiTourRunning = false;
    var out = { started: st.started, ended: st.ended, errors: st.errors, reloads: st.reloads, pages: st.pages };
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(out, null, 1)], { type: "application/json" }));
    a.download = "gai-crm-qa-tour-" + (opts.tag || "x") + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
  })();
  return "started: " + st.queue.length + " seeds";
})
