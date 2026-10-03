/* Growtify.app CRM (GoHighLevel white-label) — Türkçe arayüz katmanı.
 *
 * GHL'in kendi vue-i18n kataloglarını anahtar bazında Türkçeleştirir: ana uygulama ("shell")
 * ve kendi kataloğu olan alt uygulamalar (sohbetler, takvim…) için public/crm/crm-tr.json'daki
 * Türkçe, o kataloğun İngilizcesinin üstüne yazılır (dil kodu değişmez → GHL mantığı aynı kalır).
 * GHL'de başka bir dil (es, de…) seçilmişse dokunulmaz.
 *
 * Kimde Türkçe (CEO kararları 2026-10-03):
 *   1) Kişinin kendi seçimi — üst çubuktaki TR/EN düğmesi (tarayıcıda hatırlanır; ?gai_lang=tr|en de olur)
 *   2) Seçim yoksa public/crm/crm-config.json: "english" listesindeki alt hesaplar İngilizce
 *      (Harrington Housing, Rentser), "turkish" listesindekiler Türkçe, diğerleri "default" ("tr").
 *   İngilizce açılan sayfada büyük Türkçe katalog hiç indirilmez.
 *
 * Yükleyici: GHL Ajans Ayarları → Company → White Label → Custom JS.
 * Farklı alan adında iframe içinde çalışan GHL uygulamalarına (otomasyon kurucusu, takvim ayarları,
 * Ayarlar içeriği, Yapay Zeka Stüdyosu) ulaşılamaz.
 */
(function () {
  if (window.__gaiCrmI18n) return;
  window.__gaiCrmI18n = true;

  var BASE = "https://growtify.ai/crm/";
  var CONFIG_URL = BASE + "crm-config.json";
  var CATALOG_URL = BASE + "crm-tr.json";
  var LS_KEY = "gai_crm_lang";

  function getChoice() {
    try {
      var m = location.search.match(/[?&]gai_lang=(tr|en)(?:&|$)/);
      if (m) localStorage.setItem(LS_KEY, m[1]);
      var v = localStorage.getItem(LS_KEY);
      return v === "tr" || v === "en" ? v : null;
    } catch (e) {
      return null;
    }
  }

  function setChoice(v) {
    try {
      localStorage.setItem(LS_KEY, v);
    } catch (e) {}
  }

  function locationId() {
    var m = location.pathname.match(/\/location\/([A-Za-z0-9]+)/);
    return m ? m[1] : null;
  }

  var config = { default: "en", english: [], turkish: [] };

  // Kişinin seçimi (TR/EN düğmesi, ?gai_lang) > alt hesap listeleri > varsayılan dil.
  function decide() {
    var c = getChoice();
    if (c) return c;
    var loc = locationId();
    var en = config.english || [];
    var tr = config.turkish || config.locations || []; // "locations" = eski adı (Türkçe liste)
    if (loc && en.indexOf(loc) !== -1) return "en";
    if (loc && tr.indexOf(loc) !== -1) return "tr";
    return config.default === "tr" ? "tr" : "en";
  }

  /* ---------- TR/EN düğmesi ---------- */
  function renderToggle(current) {
    var el = document.getElementById("__gai_lang_toggle");
    if (!el) {
      if (!document.body) return;
      el = document.createElement("div");
      el.id = "__gai_lang_toggle";
      el.setAttribute("role", "group");
      el.setAttribute("aria-label", "Arayüz dili / Interface language");
      el.style.cssText =
        "z-index:2147483000;display:flex;gap:2px;padding:2px;flex:0 0 auto;" +
        "border:1px solid #d0d5dd;border-radius:999px;background:#fff;box-shadow:0 1px 2px rgba(16,24,40,.06);" +
        "font:600 11px/1 Inter,system-ui,sans-serif;";
      ["tr", "en"].forEach(function (lang) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = lang.toUpperCase();
        b.setAttribute("data-lang", lang);
        b.title = lang === "tr" ? "Türkçe" : "English";
        b.style.cssText = "border:0;border-radius:999px;padding:5px 8px;cursor:pointer;";
        b.addEventListener("click", function () {
          if (decide() === lang) return;
          setChoice(lang);
          location.reload();
        });
        el.appendChild(b);
      });
    }
    placeToggle(el);
    var btns = el.querySelectorAll("button");
    for (var i = 0; i < btns.length; i++) {
      var on = btns[i].getAttribute("data-lang") === current;
      btns[i].style.background = on ? "#155eef" : "transparent";
      btns[i].style.color = on ? "#fff" : "#475467";
      btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  // Düğme üst çubuktaki simgelerin yanına (akışın içine) yerleşir; üst çubuk yoksa sağ üstte sabit durur.
  function placeToggle(el) {
    var host = document.querySelector("header.hl_header .hl_header--controls");
    if (host) {
      if (el.parentNode !== host) host.insertBefore(el, host.firstChild);
      el.style.position = "static";
      el.style.margin = "0 10px 0 0";
      el.style.alignSelf = "center";
    } else if (document.body && el.parentNode !== document.body) {
      document.body.appendChild(el);
      el.style.position = "fixed";
      el.style.top = "14px";
      el.style.right = "16px";
      el.style.margin = "0";
    }
  }

  /* ---------- Katalog katmanı ---------- */
  var catalog = null; // { instances: { id: { keys?: [...], messages: {...} } }, dom: {...} }
  var patched = typeof WeakSet === "function" ? new WeakSet() : null;

  function keySet(entry) {
    if (!entry.__keySet) {
      entry.__keySet = {};
      var ek = entry.keys || Object.keys(entry.messages || {});
      for (var i = 0; i < ek.length; i++) entry.__keySet[ek[i]] = true;
    }
    return entry.__keySet;
  }

  // Bir i18n örneğine ait Türkçe kataloğu bul: ana uygulama (#app) → "shell"; diğerleri → üst düzey
  // anahtarları en çok örtüşen alt uygulama kataloğu (en az %80). Hiçbiri tutmazsa ve anahtarların
  // neredeyse tamamı ana katalogda varsa (ana kataloğun kopyasını taşıyan alt uygulama), ana
  // kataloğun yalnız o bölümleri kullanılır.
  function pickCatalog(rootEl, messages) {
    var shell = catalog.instances.shell || null;
    if (rootEl.id === "app") return shell;
    var keys = Object.keys(messages || {});
    if (!keys.length) return null;
    var best = null;
    var bestScore = 0;
    for (var id in catalog.instances) {
      if (id === "shell") continue;
      var entry = catalog.instances[id];
      var set = keySet(entry);
      var size = (entry.keys || []).length || Object.keys(set).length;
      var hit = 0;
      for (var i = 0; i < keys.length; i++) if (set[keys[i]]) hit++;
      var score = hit / Math.max(size, keys.length);
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    }
    if (bestScore >= 0.8) return best;
    if (!shell) return null;
    var sset = keySet(shell);
    var shellHit = 0;
    for (var j = 0; j < keys.length; j++) if (sset[keys[j]]) shellHit++;
    if (shellHit / keys.length < 0.9) return null;
    var subset = {};
    for (var k = 0; k < keys.length; k++) if (shell.messages[keys[k]] !== undefined) subset[keys[k]] = shell.messages[keys[k]];
    return { messages: subset };
  }

  function firstLeaf(o, path) {
    for (var k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      var p = path.concat(k);
      if (typeof o[k] === "string") return [p, o[k]];
      if (o[k] && typeof o[k] === "object") {
        var r = firstLeaf(o[k], p);
        if (r) return r;
      }
    }
    return null;
  }

  function at(o, path) {
    for (var i = 0; i < path.length; i++) {
      if (!o || typeof o !== "object") return undefined;
      o = o[path[i]];
    }
    return o;
  }

  function isEnglish(loc) {
    return !!loc && String(loc).toLowerCase().indexOf("en") === 0;
  }

  // Her üst düzey bölümden bir örnek metin (en çok 80): alt uygulamalar metinlerini bazen dil
  // sisteminin API'si dışından ekliyor; örneklerden biri İngilizceye dönmüşse Türkçe yeniden uygulanır.
  function makeProbes(messages) {
    var keys = Object.keys(messages);
    var step = Math.max(1, Math.ceil(keys.length / 80));
    var probes = [];
    for (var i = 0; i < keys.length; i += step) {
      var v = messages[keys[i]];
      if (typeof v === "string") probes.push([[keys[i]], v]);
      else if (v && typeof v === "object") {
        var leaf = firstLeaf(v, [keys[i]]);
        if (leaf) probes.push(leaf);
      }
    }
    return probes;
  }

  function probesDrifted(g, locale, probes) {
    var current = g.getLocaleMessage(locale);
    for (var i = 0; i < probes.length; i++) {
      var have = at(current, probes[i][0]);
      if (have !== undefined && have !== probes[i][1]) return true;
    }
    return false;
  }

  function patchInstance(rootEl, g) {
    var locale = g.locale && g.locale.value;
    if (!isEnglish(locale)) return; // kullanıcı GHL'de başka bir dil seçmiş
    var entry = g.__gaiTr || pickCatalog(rootEl, g.getLocaleMessage(locale));
    if (!entry) return;
    if (!g.__gaiTr) {
      g.__gaiTr = entry;
      entry.probes = entry.probes || makeProbes(entry.messages);
      // GHL bu kataloğa sonradan İngilizce eklerse (alt uygulama yüklenince) Türkçeyi yeniden uygula.
      var origMerge = g.mergeLocaleMessage;
      var origSet = g.setLocaleMessage;
      var applying = false;
      g.__gaiReapply = function (loc, part) {
        if (applying || !isEnglish(loc)) return;
        applying = true;
        try {
          origMerge.call(g, loc, part || entry.messages);
        } finally {
          applying = false;
        }
      };
      g.mergeLocaleMessage = function (loc, msgs) {
        var r = origMerge.apply(g, arguments);
        // Yalnız GHL'in az önce eklediği bölümlerin Türkçesini yeniden yaz (tüm kataloğu değil — büyük katalogda hızlı kalır).
        if (!applying) {
          var part = null;
          if (msgs && typeof msgs === "object") {
            for (var k in msgs) {
              if (Object.prototype.hasOwnProperty.call(entry.messages, k)) (part = part || {})[k] = entry.messages[k];
            }
          }
          if (part) g.__gaiReapply(loc, part);
        }
        return r;
      };
      g.setLocaleMessage = function (loc) {
        var r = origSet.apply(g, arguments);
        if (!applying) g.__gaiReapply(loc);
        return r;
      };
    }
    if (!patched || !patched.has(g) || probesDrifted(g, locale, entry.probes)) {
      g.__gaiReapply(locale);
      if (patched) patched.add(g);
    }
  }

  // Kodda birleştirilen birkaç ifade (sayı + çoğul ad, "Ekle" + ad): yalnız bu öğelerde düzeltilir.
  var SINGULAR = { "fırsatlar": "fırsat", "kişiler": "kişi", "şirketler": "şirket" };
  var DOM_FIXES = [
    {
      sel: ".pipeline-ribbon .count",
      re: /^(\s*\d+\s+)(fırsatlar|kişiler|şirketler)(\s*)$/i,
      to: function (m, num, word, tail) {
        return num + (SINGULAR[word.toLowerCase()] || word) + tail;
      },
    },
    { sel: "#add-record-btn .hr-button__content", re: /^(\s*)Ekle\s+(\S.*?)(\s*)$/, to: "$1Yeni $2$3" },
  ];

  function fixTextIn(el, re, to) {
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) {
      var t = n.textContent;
      if (re.test(t)) {
        var r = t.replace(re, to);
        if (r !== t) n.textContent = r;
      }
    }
  }

  // Sunucudan gelen sabit etiketler (ör. sol menüde ve üst menüde "Contacts"): yalnız menülerde,
  // tam eşleşme — müşteri verisine dokunmaz.
  /* ---------- Tarih seçici (HighRise UI): ay ve gün adları — yalnız .hr-date-panel içinde ---------- */
  var MONTHS_TR = { jan: "Ocak", feb: "Şubat", mar: "Mart", apr: "Nisan", may: "Mayıs", jun: "Haziran", jul: "Temmuz", aug: "Ağustos", sep: "Eylül", oct: "Ekim", nov: "Kasım", dec: "Aralık" };
  var MONTH_RE = /^(\s*)(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?(\s*)$/;
  var MONTH_YEAR_RE = /^(\s*)(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?[\s\u00a0]+(\d{4})(\s*)$/;
  // İngilizce "Sa" = Cumartesi, Türkçe "Sa" = Salı → çevrilen hücrenin özgün adı data-gai-en'de tutulur (çift çeviri olmaz).
  var DAYS_TR = { Su: "Pz", Mo: "Pt", Tu: "Sa", We: "Ça", Th: "Pe", Fr: "Cu", Sa: "Ct", Sun: "Paz", Mon: "Pzt", Tue: "Sal", Wed: "Çar", Thu: "Per", Fri: "Cum", Sat: "Cmt" };
  function fixDatePanels() {
    var panels = document.querySelectorAll(".hr-date-panel");
    for (var i = 0; i < panels.length; i++) {
      var days = panels[i].querySelectorAll(".hr-date-panel-weekdays__day");
      for (var d = 0; d < days.length; d++) {
        var el = days[d];
        var t = el.textContent.trim();
        var orig = el.getAttribute("data-gai-en");
        if (orig && DAYS_TR[orig] === t) continue; // zaten Türkçe
        if (Object.prototype.hasOwnProperty.call(DAYS_TR, t)) {
          el.setAttribute("data-gai-en", t);
          el.textContent = DAYS_TR[t];
        }
      }
      fixTextIn(panels[i], MONTH_YEAR_RE, function (m, a, mon, year, b) {
        return a + MONTHS_TR[mon.toLowerCase()] + " " + year + b;
      });
      fixTextIn(panels[i], MONTH_RE, function (m, a, mon, b) {
        return a + MONTHS_TR[mon.toLowerCase()] + b;
      });
    }
  }

  /* ---------- Tarih metinleri: "Sep 28 – Oct 4, 2026", "Oct 3, 2026", "19 Jun 2026, 12:05 AM" (metnin tamamı) ---------- */
  var MON_TR = { jan: "Oca", feb: "Şub", mar: "Mar", apr: "Nis", may: "May", jun: "Haz", jul: "Tem", aug: "Ağu", sep: "Eyl", oct: "Eki", nov: "Kas", dec: "Ara" };
  function ms(m) {
    return MON_TR[m.slice(0, 3).toLowerCase()];
  }
  var M = "(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\.?";
  var DATE_RULES = [
    [new RegExp("^" + M + " (\\d{1,2}) [–-] " + M + " (\\d{1,2}), (\\d{4})$"), function (x, m1, d1, m2, d2, y) {
      return d1 + " " + ms(m1) + " – " + d2 + " " + ms(m2) + " " + y;
    }],
    [new RegExp("^" + M + " (\\d{1,2}) [–-] (\\d{1,2}), (\\d{4})$"), function (x, m1, d1, d2, y) {
      return d1 + " – " + d2 + " " + ms(m1) + " " + y;
    }],
    [new RegExp("^" + M + " (\\d{1,2}), (\\d{4})$"), function (x, m1, d, y) {
      return d + " " + ms(m1) + " " + y;
    }],
    [new RegExp("^(Created on: )?(\\d{1,2}) " + M + " (\\d{4})(,? .*)?$"), function (x, pre, d, m1, y, rest) {
      return (pre ? "Oluşturulma: " : "") + d + " " + ms(m1) + " " + y + (rest || "");
    }],
    [new RegExp("^" + M + " (\\d{4})$"), function (x, m1, y) {
      return MONTHS_TR[m1.toLowerCase()] + " " + y;
    }],
  ];
  function dateLookup(core) {
    for (var i = 0; i < DATE_RULES.length; i++) if (DATE_RULES[i][0].test(core)) return core.replace(DATE_RULES[i][0], DATE_RULES[i][1]);
    return null;
  }

  /* ---------- Takvim görünümü (FullCalendar, .fc): gün başlıkları ve saat etiketleri ---------- */
  var DAY3_TR = { Mon: "Pzt", Tue: "Sal", Wed: "Çar", Thu: "Per", Fri: "Cum", Sat: "Cmt", Sun: "Paz" };
  var DAYFULL_TR = { Monday: "Pazartesi", Tuesday: "Salı", Wednesday: "Çarşamba", Thursday: "Perşembe", Friday: "Cuma", Saturday: "Cumartesi", Sunday: "Pazar" };
  var FC_DAYNUM_RE = /^(\s*)(\d{1,2}) (Mon|Tue|Wed|Thu|Fri|Sat|Sun)(\s*)$/;
  var FC_DAY_RE = /^(\s*)(Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?: (\d{1,2}\/\d{1,2}))?(\s*)$/;
  var FC_DAYFULL_RE = /^(\s*)(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(\s*)$/;
  var FC_HOUR_RE = /^(\s*)(\d{1,2})(?::(\d{2}))? ?(AM|PM|am|pm|a|p)(\s*)$/;
  function fixCalendars() {
    var cals = document.querySelectorAll(".fc");
    for (var i = 0; i < cals.length; i++) {
      fixTextIn(cals[i], FC_DAYNUM_RE, function (x, a, d, day, b) {
        return a + d + " " + DAY3_TR[day] + b;
      });
      fixTextIn(cals[i], FC_DAY_RE, function (x, a, day, md, b) {
        return a + DAY3_TR[day] + (md ? " " + md : "") + b;
      });
      fixTextIn(cals[i], FC_DAYFULL_RE, function (x, a, day, b) {
        return a + DAYFULL_TR[day] + b;
      });
      fixTextIn(cals[i], FC_HOUR_RE, function (x, a, h, mm, ap, b) {
        var hh = parseInt(h, 10) % 12;
        if (/^p/i.test(ap)) hh += 12;
        return a + (hh < 10 ? "0" : "") + hh + ":" + (mm || "00") + b;
      });
      fixTextIn(cals[i], /^(\s*)all-day(\s*)$/, "$1tüm gün$2");
    }
  }

  function translateDom() {
    var dict = catalog.dom;
    var roots = document.querySelectorAll("#sidebar-v2, nav, [role=navigation], header.hl_header");
    for (var i = 0; dict && i < roots.length; i++) {
      var w = document.createTreeWalker(roots[i], NodeFilter.SHOW_TEXT);
      var n;
      while ((n = w.nextNode())) {
        var t = n.textContent;
        var core = t.trim();
        if (core && Object.prototype.hasOwnProperty.call(dict, core)) n.textContent = t.replace(core, dict[core]);
      }
    }
    for (var f = 0; f < DOM_FIXES.length; f++) {
      var els = document.querySelectorAll(DOM_FIXES[f].sel);
      for (var e = 0; e < els.length; e++) fixTextIn(els[e], DOM_FIXES[f].re, DOM_FIXES[f].to);
    }
    fixDatePanels();
    fixCalendars();
  }

  function scanCatalog() {
    if (!catalog) return;
    try {
      var els = document.querySelectorAll("#app, [data-v-app]");
      for (var i = 0; i < els.length; i++) {
        var app = els[i].__vue_app__;
        if (!app || !app._context) continue;
        var prov = app._context.provides;
        var syms = Object.getOwnPropertySymbols(prov);
        for (var j = 0; j < syms.length; j++) {
          var v = prov[syms[j]];
          if (v && v.global && typeof v.global.mergeLocaleMessage === "function" && typeof v.global.getLocaleMessage === "function") {
            patchInstance(els[i], v.global);
            break;
          }
        }
      }
      translateDom();
      if (!textPassDone && catalog.text) {
        textPassDone = true;
        trTree(document.body, catalog.text); // ilk tam geçiş; sonrası değişen düğümlerle (gözlemci)
      }
    } catch (e) {}
  }

  /* ---------- Sayfa sözlüğü: katalogda olmayan, GHL kodunda sabit yazılı metinler ---------- */
  // Yalnız metnin TAMAMI sözlükteki bir ifadeyle birebir aynıysa çevrilir → kişi/mesaj verisine dokunulmaz.
  var textPassDone = false;
  var SKIP_SEL = "script,style,textarea,code,pre,[contenteditable],[contenteditable] *";
  var ATTRS = ["placeholder", "title", "aria-label"];
  // Sayı içeren kalıplar ("1 - 10 of 50", "Page 2 of 5"): katalogdaki [desen, karşılık] kuralları.
  var RULES = null;
  function rules() {
    if (RULES) return RULES;
    RULES = [];
    var src = (catalog && catalog.textRules) || [];
    for (var i = 0; i < src.length; i++) {
      try {
        RULES.push([new RegExp(src[i][0]), src[i][1]]);
      } catch (e) {}
    }
    return RULES;
  }
  function lookup(core, dict) {
    if (Object.prototype.hasOwnProperty.call(dict, core)) return dict[core];
    var dt = dateLookup(core);
    if (dt !== null) return dt;
    var rr = rules();
    for (var i = 0; i < rr.length; i++) if (rr[i][0].test(core)) return core.replace(rr[i][0], rr[i][1]);
    return null;
  }
  function trText(n, dict) {
    var t = n.nodeValue;
    if (!t) return;
    var core = t.trim();
    if (!core || core.length > 160) return;
    var tr = lookup(core, dict);
    if (tr === null || tr === core) return;
    var p = n.parentElement;
    if (!p || p.closest(SKIP_SEL)) return;
    n.nodeValue = t.replace(core, tr);
  }
  function trAttrs(el, dict) {
    if (!el.getAttribute) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i]);
      var core = v && v.trim();
      if (!core || core.length > 160) continue;
      var tr = lookup(core, dict);
      if (tr !== null && tr !== core) el.setAttribute(ATTRS[i], v.replace(core, tr));
    }
  }
  function trTree(root, dict) {
    if (!root) return;
    if (root.nodeType === 3) return trText(root, dict);
    if (root.nodeType !== 1 || (root.closest && root.closest(SKIP_SEL))) return;
    trAttrs(root, dict);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    var n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) trText(n, dict);
      else trAttrs(n, dict);
    }
  }

  /* ---------- Akış ---------- */
  var mode = null; // "tr" | "en"
  var loading = false;

  // Yayındaki katalog sürümü sayfada görünsün (destek/test: <html data-gai-crm-tr="1.0.0">).
  function markVersion() {
    if (catalog && catalog.version) document.documentElement.setAttribute("data-gai-crm-tr", String(catalog.version));
  }

  function loadCatalog() {
    if (catalog || loading) return;
    if (window.__gaiCrmCatalog) {
      catalog = window.__gaiCrmCatalog; // test için önceden verilmiş katalog
      markVersion();
      scanCatalog();
      return;
    }
    loading = true;
    fetch(CATALOG_URL)
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (j) {
        loading = false;
        if (j && j.instances) {
          catalog = j;
          markVersion();
          scanCatalog();
        }
      })
      .catch(function () {
        loading = false;
      });
  }

  function tick() {
    var want = decide();
    if (mode === "tr" && want === "en") {
      location.reload(); // Türkçeden İngilizceye temiz dönüş (ör. alt hesap değişti)
      return;
    }
    mode = want;
    renderToggle(mode);
    if (mode === "tr") {
      document.documentElement.setAttribute("data-gai-lang", "tr");
      loadCatalog();
      scanCatalog();
    }
  }

  function start() {
    tick();
    setInterval(tick, 700);
    try {
      var t = null;
      var queue = [];
      new MutationObserver(function (recs) {
        if (mode === "tr" && catalog && catalog.text) {
          for (var i = 0; i < recs.length; i++) {
            var r = recs[i];
            if (r.type === "childList") for (var j = 0; j < r.addedNodes.length; j++) queue.push(r.addedNodes[j]);
            else queue.push(r.target);
          }
        }
        if (t) return;
        t = setTimeout(function () {
          t = null;
          var q = queue;
          queue = [];
          if (mode !== "tr") return;
          scanCatalog();
          var d = catalog && catalog.text;
          if (d) for (var k = 0; k < q.length; k++) q[k].nodeType === 1 && !q[k].isConnected ? 0 : trTree(q[k], d);
        }, 150);
      }).observe(document.documentElement, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ATTRS,
      });
    } catch (e) {}
  }

  if (window.__gaiCrmConfig) {
    config = window.__gaiCrmConfig;
    start();
  } else {
    try {
      fetch(CONFIG_URL)
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (j) {
          if (j && typeof j === "object" && (j.default || j.english || j.turkish || j.locations)) config = j;
        })
        .catch(function () {})
        .then(start);
    } catch (e) {
      start();
    }
  }
})();
