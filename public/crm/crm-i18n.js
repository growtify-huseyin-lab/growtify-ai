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
 * Farklı alan adında iframe içinde çalışan GHL uygulamalarına buradan ulaşılamaz. Bunlardan takvim
 * ayarları, İşletme Profili ve E-posta Hizmetleri, crm-config.json "frames" ile Growtify vekil adresinden
 * (workers/crm-frames) açılır; orada aynı yükleyici çerçeve modunda çalışır. Diğerleri (otomasyon
 * kurucusu, Yapay Zeka Stüdyosu…) şimdilik İngilizce.
 */
(function () {
  if (window.__gaiCrmI18n) return;
  window.__gaiCrmI18n = true;

  var BASE = "https://growtify.ai/crm/";
  var CONFIG_URL = BASE + "crm-config.json";
  var CATALOG_URL = window.__gaiCrmCatalogUrl || BASE + "crm-tr.json";
  var LS_KEY = "gai_crm_lang";
  // Çerçeve modu: GHL'in ayrı sitesinde çalışan bir uygulama (ör. takvim ayarları) Growtify vekil adresinden
  // açıldığında yükleyici o sayfanın içinde de çalışır. Orada #app GHL kabuğu değildir; düğme ve avcı gösterilmez,
  // dil seçimini üst sayfa adresle (?gai_frame=) iletir.
  var FRAME = !!window.__gaiCrmFrame;

  // Çerçevede dil, vekilin adrese eklediği gai_frame ile gelir. Uygulama açılmadan adresten silinir (bazı GHL
  // uygulamaları kendi adresini CRM'in adres çubuğuna yansıtıyor; işaret orada görünmesin) ve yalnız bu sekmede
  // saklanır (çerçevenin localStorage'ı tüm sekmelerde ortak: TR ve EN hesap aynı anda açıkken birbirini değiştirmesin).
  var frameLang = null;
  if (FRAME) {
    try {
      // Vekil (workers/crm-frames) işareti sayfa başındaki küçük betikte okuyup adresten siler ve buraya bırakır.
      if (window.__gaiCrmFrameLang === "tr" || window.__gaiCrmFrameLang === "en") frameLang = window.__gaiCrmFrameLang;
      var fm = frameLang ? null : location.search.match(/[?&]gai_(?:frame|lang)=(tr|en)(?=&|$)/);
      if (fm) {
        frameLang = fm[1];
        try {
          sessionStorage.setItem("gai_crm_frame_lang", frameLang);
        } catch (e) {}
        var clean = location.search.replace(/([?&])gai_(?:frame|lang)=(?:tr|en)(&|$)/g, function (x, a, b) {
          return b ? a : "";
        });
        history.replaceState(history.state, "", location.pathname + (clean === "?" ? "" : clean) + location.hash);
      } else if (!frameLang) {
        try {
          frameLang = sessionStorage.getItem("gai_crm_frame_lang");
        } catch (e) {}
      }
    } catch (e) {}
  }

  function getChoice() {
    if (FRAME) return frameLang === "tr" || frameLang === "en" ? frameLang : null;
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
    if (FRAME) return;
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

  // Düğme üst çubuktaki simgelerin yanına (akışın içine) yerleşir. Üst çubuğu olmayan tam ekran sayfalarda
  // (iş akışı kurucusu gibi) gizlenir: sağ üstte sabit dururken kurucunun Kaydet düğmesinin üstüne biniyordu.
  function placeToggle(el) {
    var host = document.querySelector("header.hl_header .hl_header--controls");
    if (host) {
      if (el.parentNode !== host) host.insertBefore(el, host.firstChild);
      el.style.display = "flex";
      el.style.position = "static";
      el.style.margin = "0 10px 0 0";
      el.style.alignSelf = "center";
    } else {
      if (!el.parentNode && document.body) document.body.appendChild(el); // tekrar tekrar oluşturulmasın
      el.style.display = "none";
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
    if (rootEl.id === "app" && !FRAME) return shell;
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
    if (shellHit / keys.length >= 0.9) {
      var subset = {};
      for (var k = 0; k < keys.length; k++) if (shell.messages[keys[k]] !== undefined) subset[keys[k]] = shell.messages[keys[k]];
      return { messages: subset };
    }
    return shellSubtree(keys);
  }

  // Bazı alt uygulamalar kendi i18n örneğini, ana katalogdaki bir bölümün (ör. shell.crmObjectsSettingsApp)
  // içeriğiyle kurar: üst anahtarları o bölümün alt anahtarlarıyla eşleşir → o bölümün Türkçesi kullanılır.
  var subtreeCache = {};
  function shellSubtree(keys) {
    var shell = catalog.instances.shell;
    if (!shell || keys.length < 2) return null;
    var sig = keys.slice().sort().join(",");
    if (Object.prototype.hasOwnProperty.call(subtreeCache, sig)) return subtreeCache[sig];
    var best = null;
    var bestScore = 0;
    for (var ns in shell.messages) {
      var node = shell.messages[ns];
      if (!node || typeof node !== "object") continue;
      var hit = 0;
      for (var i = 0; i < keys.length; i++) if (Object.prototype.hasOwnProperty.call(node, keys[i])) hit++;
      var score = hit / keys.length;
      if (score > bestScore) {
        bestScore = score;
        best = node;
      }
    }
    var res = bestScore >= 0.8 ? { messages: best } : null;
    subtreeCache[sig] = res;
    return res;
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

  // Bazı GHL uygulamaları (ör. takvim uygulaması) yalnız önceden derlenmiş mesajları anlar: düz metin olarak
  // verilen Türkçede {ad} yer tutucuları ve "a | b" çoğulları doldurulmaz. Böyle bir örnekte yer tutuculu
  // metinler küçük mesaj fonksiyonlarına çevrilir (vue-i18n mesaj bağlamı: normalize/interpolate/named/plural).
  function compilesStrings(g, locale) {
    try {
      g.mergeLocaleMessage(locale, { __gai_probe__: "a{x}" });
      return g.t("__gai_probe__", { x: "1" }) === "a1";
    } catch (e) {
      return true;
    }
  }
  function toMessageFn(src) {
    var forms = src.indexOf("|") === -1 ? [src] : src.split(/\s*\|\s*/);
    var parsed = forms.map(function (f) {
      var parts = [];
      var re = /\{\s*('(?:[^'\\]|\\.)*'|[A-Za-z0-9_]+)\s*\}/g;
      var last = 0;
      var m;
      while ((m = re.exec(f))) {
        if (m.index > last) parts.push(f.slice(last, m.index));
        parts.push({ p: m[1] });
        last = re.lastIndex;
      }
      if (last < f.length) parts.push(f.slice(last));
      return parts;
    });
    var fn = function (ctx) {
      var build = function (parts) {
        return ctx.normalize(
          parts.map(function (x) {
            if (typeof x === "string") return x;
            if (x.p.charAt(0) === "'") return x.p.slice(1, -1);
            return ctx.interpolate(/^\d+$/.test(x.p) ? ctx.list(+x.p) : ctx.named(x.p));
          })
        );
      };
      return parsed.length > 1 ? ctx.plural(parsed.map(build)) : build(parsed[0]);
    };
    fn.source = src;
    return fn;
  }
  function toFnMessages(o) {
    var out = {};
    for (var k in o) {
      var v = o[k];
      if (typeof v === "string") out[k] = /[{|]/.test(v) ? toMessageFn(v) : v;
      else if (v && typeof v === "object") out[k] = toFnMessages(v);
      else out[k] = v;
    }
    return out;
  }

  // Bazı uygulamalarda (ör. otomasyon) CRM içinde dil "en_US" olur ama metinler yedek dil "en" altında durur;
  // geçerli dil boşsa eşleştirme yedek dildeki metinlerle yapılır (Türkçe yine geçerli dile yazılır, önce o okunur).
  function localeMessages(g, locale) {
    var msgs = g.getLocaleMessage(locale);
    if (msgs && Object.keys(msgs).length) return msgs;
    var fb = g.fallbackLocale && (g.fallbackLocale.value !== undefined ? g.fallbackLocale.value : g.fallbackLocale);
    var list = typeof fb === "string" ? [fb] : Array.isArray(fb) ? fb : [];
    list.push("en", "en-US", "en_US");
    for (var i = 0; i < list.length; i++) {
      if (list[i] === locale) continue;
      var m = g.getLocaleMessage(list[i]);
      if (m && Object.keys(m).length) return m;
    }
    return msgs || {};
  }

  function patchInstance(rootEl, g) {
    var locale = g.locale && g.locale.value;
    if (!isEnglish(locale)) return; // kullanıcı GHL'de başka bir dil seçmiş
    var entry = g.__gaiTr || pickCatalog(rootEl, localeMessages(g, locale));
    if (!entry) return;
    if (!g.__gaiTr) {
      if (!compilesStrings(g, locale)) entry = { keys: entry.keys, messages: toFnMessages(entry.messages) };
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
    var k = m.slice(0, 3).toLowerCase();
    return m.replace(".", "").length > 3 ? MONTHS_TR[k] : MON_TR[k]; // "September" → "Eylül", "Sep" → "Eyl"
  }
  // Yalnız gerçek ay adları (kısa/uzun) — "Marketing 2", "Decimal 3" gibi adlar tarih sanılmasın.
  var M = "(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?";
  var DATE_RULES = [
    [new RegExp("^" + M + " (\\d{1,2}) [–-] " + M + " (\\d{1,2}), (\\d{4})$"), function (x, m1, d1, m2, d2, y) {
      return d1 + " " + ms(m1) + " – " + d2 + " " + ms(m2) + " " + y;
    }],
    [new RegExp("^" + M + " (\\d{1,2}) [–-] (\\d{1,2}), (\\d{4})$"), function (x, m1, d1, d2, y) {
      return d1 + " – " + d2 + " " + ms(m1) + " " + y;
    }],
    [new RegExp("^" + M + " (\\d{1,2}), (\\d{4}) [–-] " + M + " (\\d{1,2}), (\\d{4})$"), function (x, m1, d1, y1, m2, d2, y2) {
      return d1 + " " + ms(m1) + " " + y1 + " – " + d2 + " " + ms(m2) + " " + y2;
    }],
    [new RegExp("^" + M + " (\\d{1,2}),? (\\d{4}),? (\\d{1,2}):(\\d{2}) ?(AM|PM|am|pm)$"), function (x, m1, d, y, h, mm, ap) {
      return d + " " + ms(m1) + " " + y + ", " + to24(h, mm, ap); // "Jun 02 2026, 2:50 PM" → "02 Haz 2026, 14:50"
    }],
    [new RegExp("^" + M + " (\\d{1,2}) (\\d{4})$"), function (x, m1, d, y) {
      return d + " " + ms(m1) + " " + y;
    }],
    [new RegExp("^" + M + " (\\d{1,2}), (\\d{4}|20XX)$"), function (x, m1, d, y) {
      return d + " " + ms(m1) + " " + y;
    }],
    [new RegExp("^" + M + " (\\d{1,2})$"), function (x, m1, d) {
      return d + " " + ms(m1);
    }],
    [new RegExp("^(Created on: )?(\\d{1,2}) " + M + " (\\d{4})(,? .*)?$"), function (x, pre, d, m1, y, rest) {
      return (pre ? "Oluşturulma: " : "") + d + " " + ms(m1) + " " + y + (rest || "");
    }],
    [new RegExp("^" + M + " (\\d{4})$"), function (x, m1, y) {
      return MONTHS_TR[m1.slice(0, 3).toLowerCase()] + " " + y;
    }],
  ];
  // Tek başına duran saatler Türkiye'deki gibi 24 saat biçimine çevrilir: "03:12 PM" → "15:12",
  // "9:00 AM - 5:00 PM" → "09:00 - 17:00".
  var TIME_RE = /^(\d{1,2}):(\d{2}) ?(AM|PM|am|pm)$/;
  var TIME_RANGE_RE = /^(\d{1,2}):(\d{2}) ?(AM|PM|am|pm) ?[-–] ?(\d{1,2}):(\d{2}) ?(AM|PM|am|pm)$/;
  function to24(h, mm, ap) {
    var hh = parseInt(h, 10) % 12;
    if (/^p/i.test(ap)) hh += 12;
    return (hh < 10 ? "0" : "") + hh + ":" + mm;
  }
  function dateLookup(core) {
    for (var i = 0; i < DATE_RULES.length; i++) if (DATE_RULES[i][0].test(core)) return core.replace(DATE_RULES[i][0], DATE_RULES[i][1]);
    var m = core.match(TIME_RE);
    if (m) return to24(m[1], m[2], m[3]);
    m = core.match(TIME_RANGE_RE);
    if (m) return to24(m[1], m[2], m[3]) + " - " + to24(m[4], m[5], m[6]);
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
            if (huntActive && !v.global.__gaiTr) huntInstance(els[i], v.global);
            break;
          }
        }
      }
      // Oluşturucu çerçevelerinde (form/anket/test) sayfa sözlüğü kapalı (noDom): tuvaldeki önizleme kişinin kendi
      // içeriğidir; yalnız uygulamanın kendi metin kataloğu çevrilir (kaydedilen içerik önizlemeyle aynı kalsın).
      if (catalog.noDom) {
        // İzin verilen arayüz alanlarında (ör. öğe paleti: uygulama adları açılışta bir kez hesaplıyor) sözlük uygulanır.
        if (catalog.domOnly && catalog.text && !textPassDone) {
          textPassDone = true;
          trScoped(document.body, catalog.text);
        }
        return;
      }
      translateDom();
      if (!textPassDone && catalog.text) {
        textPassDone = true;
        trTree(document.body, catalog.text); // ilk tam geçiş; sonrası değişen düğümlerle (gözlemci)
      }
    } catch (e) {}
  }

  /* ---------- Çeviri avı (gizli bakım modu): ?gai_hunt=1 açar, ?gai_hunt=0 kapatır ----------
   * Türkçe açıkken ekranda İngilizce kalan arayüz metinlerini ve hiç eşleşmeyen i18n kataloglarını
   * yalnız bu tarayıcıda (localStorage) biriktirir; hiçbir yere gönderilmez. Sol alttaki rozetten kopyalanır.
   * Kişi/mesaj verisi toplamamak için yalnız arayüz öğelerine bakılır (düğme, sekme, başlık, etiket,
   * tablo başlığı, menü, yer tutucu…); tablo gövdesi, mesaj alanları ve yazı alanları hariç. */
  var HUNT_KEY = "gai_crm_hunt";
  var HUNT_LOG = "gai_crm_hunt_log";
  var huntActive = (function () {
    if (FRAME) return false;
    try {
      var m = location.search.match(/[?&]gai_hunt=(0|1)(?:&|$)/);
      if (m) localStorage.setItem(HUNT_KEY, m[1]);
      return localStorage.getItem(HUNT_KEY) === "1";
    } catch (e) {
      return false;
    }
  })();
  var hunt = null;
  var huntLast = 0;
  var HUNT_UI = "button,[role=button],[role=tab],[role=menuitem],[role=option],label,th,h1,h2,h3,h4,h5,legend,summary," +
    "[class*=title],[class*=header],[class*=label],[class*=empty],[class*=tab],[class*=menu],[class*=tooltip],[class*=badge],[class*=chip]";
  var HUNT_SKIP = "tbody,textarea,input,[contenteditable],[class*=message],[class*=Message],[class*=conversation-body],[class*=email-body],#__gai_lang_toggle,#__gai_hunt";
  var HUNT_EN = /\b(the|your|you|to|for|with|and|of|is|are|this|that|no|not|add|new|create|edit|delete|save|cancel|search|filter|sort|view|show|hide|select|all|none|more|settings|contacts?|opportunit\w*|pipelines?|calendars?|appointments?|conversations?|messages?|payments?|invoices?|products?|emails?|reports?|import|export|status|actions?|name|phone|date|time|today|week|month|total|open|won|lost|tags?|owner|assigned|due|tasks?|notes?|loading|learn|manage|connect|enable|disable|update|upload|download|next|back|close|done|apply|reset|clear|start|end|type|details?|overview|list|users?|team|price|amount|source|created|updated|last|first|group|duration|followers?|unassigned|groups?|blocked|slots?|buffer)\b/i;
  function huntData() {
    if (hunt) return hunt;
    try {
      hunt = JSON.parse(localStorage.getItem(HUNT_LOG) || "null");
    } catch (e) {}
    hunt = hunt && hunt.s ? hunt : { s: {}, i: {} };
    return hunt;
  }
  function huntSave() {
    try {
      localStorage.setItem(HUNT_LOG, JSON.stringify(hunt));
    } catch (e) {}
  }
  function huntAdd(t, kind) {
    t = (t || "").replace(/\s+/g, " ").trim();
    if (!t || t.length > 100 || /[çğıöşüÇĞİÖŞÜ]/.test(t) || !HUNT_EN.test(t) || /@|https?:/.test(t)) return false;
    var d = huntData();
    if (d.s[t]) return false;
    d.s[t] = { k: kind, p: location.pathname.replace(/\/location\/[A-Za-z0-9]+/, "/location/~").slice(0, 80) };
    return true;
  }
  function huntInstance(rootEl, g) {
    var loc = g.locale && g.locale.value;
    if (!isEnglish(loc)) return;
    var msgs = localeMessages(g, loc);
    var keys = Object.keys(msgs);
    if (!keys.length) return;
    var sig = keys.slice(0, 6).join(",");
    var d = huntData();
    if (d.i[sig]) return;
    d.i[sig] = { n: keys.length, root: (rootEl.id || String(rootEl.className || "")).slice(0, 40), p: location.pathname.replace(/\/location\/[A-Za-z0-9]+/, "/location/~").slice(0, 80) };
    huntSave();
    huntBadge();
  }
  function huntScan() {
    var now = Date.now();
    if (now - huntLast < 1500) return;
    huntLast = now;
    if (!document.getElementById("__gai_hunt")) huntBadge();
    var added = false;
    var els = document.querySelectorAll(HUNT_UI);
    for (var i = 0; i < els.length && i < 4000; i++) {
      var el = els[i];
      if (el.closest(HUNT_SKIP)) continue;
      for (var c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 3 && huntAdd(c.nodeValue, "text")) added = true;
      if (el.children.length === 0 && huntAdd(el.textContent, "text")) added = true;
    }
    var attrs = document.querySelectorAll("[placeholder],[title],[aria-label]");
    for (var a = 0; a < attrs.length && a < 4000; a++) {
      if (attrs[a].closest(HUNT_SKIP.replace("textarea,input,", ""))) continue;
      for (var k = 0; k < ATTRS.length; k++) if (huntAdd(attrs[a].getAttribute(ATTRS[k]), ATTRS[k])) added = true;
    }
    if (added) {
      huntSave();
      huntBadge();
    }
  }
  function huntBadge() {
    if (!document.body) return;
    var d = huntData();
    var el = document.getElementById("__gai_hunt");
    if (!el) {
      el = document.createElement("div");
      el.id = "__gai_hunt";
      el.style.cssText = "position:fixed;left:12px;bottom:12px;z-index:2147483000;background:#101828;color:#fff;border-radius:10px;" +
        "padding:6px 10px;font:600 11px/1.4 Inter,system-ui,sans-serif;display:flex;gap:8px;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,.25)";
      el.innerHTML = '<span data-c></span><button data-a="copy" style="all:unset;cursor:pointer;color:#84caff">Kopyala</button>' +
        '<button data-a="clear" style="all:unset;cursor:pointer;color:#fda29b">Temizle</button>';
      el.addEventListener("click", function (e) {
        var a = e.target && e.target.getAttribute && e.target.getAttribute("data-a");
        if (a === "copy") {
          try {
            navigator.clipboard.writeText(JSON.stringify(huntData(), null, 1));
          } catch (x) {}
        } else if (a === "clear") {
          hunt = { s: {}, i: {} };
          huntSave();
          huntBadge();
        }
      });
      document.body.appendChild(el);
    }
    el.querySelector("[data-c]").textContent = "Çeviri avı: " + Object.keys(d.s).length + " metin · " + Object.keys(d.i).length + " katalog";
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
  // GHL'in "her kelimenin ilk harfini büyüt" işlevi Türkçe harfleri kelime sınırı sanıyor:
  // "kişiler" → "KişIler", "açıklama" → "AçıKlama". Küçük Türkçe harften hemen sonra gelen tek büyük
  // ASCII harfi geri küçültür (kısaltmalara dokunmaz: arkasından yine büyük harf geliyorsa atlar).
  var CAPS_BUG = /([çğıöşü])([A-Z])(?![A-ZÇĞİÖŞÜ])/g;
  function fixCaps(s) {
    return s.replace(CAPS_BUG, function (m, a, b) {
      return a + b.toLowerCase();
    });
  }
  function lookup(core, dict) {
    var fixed = fixCaps(core);
    if (fixed !== core) {
      var r = lookupExact(fixed, dict);
      return r !== null ? r : fixed;
    }
    return lookupExact(core, dict);
  }
  // Yalnız belirli bir sayfada geçerli sözlük (catalog.textPages: { "/settings/labs": {...} }). Sunucudan gelen
  // uzun açıklamalar kalın yazı vb. ile parçalara bölünür; "From" gibi kısa parçalar başka ekranlarda farklı
  // anlama gelir, o yüzden genel sözlüğe değil sayfanın kendi sözlüğüne yazılır.
  var pageDictPath = null;
  var pageDictCache = null;
  function pageDict() {
    var pages = catalog && catalog.textPages;
    if (!pages) return null;
    var path = location.pathname;
    if (path === pageDictPath) return pageDictCache;
    pageDictPath = path;
    pageDictCache = null;
    for (var key in pages) {
      var i = path.indexOf(key);
      if (i >= 0 && (i + key.length === path.length || path.charAt(i + key.length) === "/")) {
        pageDictCache = pages[key];
        break;
      }
    }
    return pageDictCache;
  }
  function lookupExact(core, dict) {
    var pd = pageDict();
    if (pd && Object.prototype.hasOwnProperty.call(pd, core)) return pd[core];
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
    if (!core) return;
    if (core.length > 160) {
      // Uzun paragraflar yalnız sayfanın kendi sözlüğünde aranır (ör. Laboratuvar açıklamaları).
      var pd = pageDict();
      if (!pd || !Object.prototype.hasOwnProperty.call(pd, core)) return;
    }
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
  // Yalnız catalog.domOnly seçicisine uyan alanların içinde çevir (oluşturucularda tuval kişinin içeriği).
  function trScoped(node, dict) {
    var sel = catalog && catalog.domOnly;
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    if (!sel || !el) return;
    try {
      if (el.closest && el.closest(sel)) return trTree(node, dict);
      if (el.querySelectorAll) {
        var rs = el.querySelectorAll(sel);
        for (var i = 0; i < rs.length; i++) trTree(rs[i], dict);
      }
    } catch (e) {}
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

  /* ---------- Çerçeve vekili: GHL'in ayrı sitedeki uygulamaları Türkçe katmanla açılır ----------
   * Örn. takvim ayarlarındaki liste ekranları calendar-app.leadconnectorhq.com'dan iframe ile gelir; oraya betik
   * yüklenemez. Vekil adres (Growtify) aynı uygulamayı yükleyiciyle birlikte sunar. Kullanıcı aynı ekranda kalır:
   * yalnız iframe kaynağı değişir; CRM ile uygulama arasındaki postmate el sıkışması için mesaj adresleri çevrilir.
   * Açma: crm-config.json `frames` (ör. {"https://calendar-app.leadconnectorhq.com": "https://..."}) ya da yalnız
   * bu sekme için sessionStorage `gai_frame_proxy` (deneme). */
  function frameProxyMap() {
    try {
      var s = sessionStorage.getItem("gai_frame_proxy");
      if (s) return JSON.parse(s);
    } catch (e) {}
    return config.frames || null;
  }
  function installFrameProxy(map) {
    if (FRAME || !map || window.__gaiFrameProxy) return;
    window.__gaiFrameProxy = map;
    var rev = {};
    for (var o in map) rev[map[o]] = o;
    // Güvenlik ağı: vekil adres cevap vermezse ekran GHL'in kendi adresinden (İngilizce) açılır, hiç bozulmaz.
    // Bir kez cevapsız kalan vekil bu sekmede bir daha denenmez.
    var down = {};
    var lastMsg = {};
    for (var o2 in map) {
      (function (px) {
        try {
          fetch(px + "/__gai/health", { cache: "no-store", credentials: "omit" }).then(
            function (r) {
              if (!r.ok) down[px] = true;
            },
            function () {
              down[px] = true;
            }
          );
        } catch (e) {}
      })(map[o2]);
    }
    var sd = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src");
    var watch = function (frame, orig, px) {
      var restore = function () {
        if (!frame.isConnected) return; // kişi o ekrandan çıktı: vekil bozuk sayılmaz
        down[px] = true;
        sd.set.call(frame, orig);
      };
      var loadTimer = setTimeout(restore, 25000); // büyük uygulamalarda ilk yükleme uzun sürebilir
      var onload = function () {
        frame.removeEventListener("load", onload);
        clearTimeout(loadTimer);
        var t0 = Date.now();
        setTimeout(function () {
          if (!(lastMsg[px] >= t0)) restore();
        }, 5000);
      };
      frame.addEventListener("load", onload);
    };
    var rewrite = function (u, frame) {
      if (typeof u !== "string") return u;
      for (var o in map) {
        if (u.indexOf(o) === 0 && !down[map[o]]) {
          var nu = map[o] + u.slice(o.length);
          if (frame) watch(frame, u, map[o]);
          // Bakım: sessionStorage gai_frame_lang=en → çerçeve İngilizce açılır (katalog toplamak için)
          var fl = null;
          try {
            fl = sessionStorage.getItem("gai_frame_lang");
          } catch (e) {}
          return nu + (nu.indexOf("?") === -1 ? "?" : "&") + "gai_frame=" + (fl === "en" || mode === "en" ? "en" : "tr");
        }
      }
      return u;
    };
    Object.defineProperty(HTMLIFrameElement.prototype, "src", {
      configurable: true,
      get: function () {
        return sd.get.call(this);
      },
      set: function (v) {
        sd.set.call(this, rewrite(v, this));
      },
    });
    var sa = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (n, v) {
      if (this instanceof HTMLIFrameElement && String(n).toLowerCase() === "src") v = rewrite(v, this);
      return sa.call(this, n, v);
    };
    // Postmate (GHL'in CRM ↔ uygulama köprüsü) iframe'i adres vermeden önce ekler ve pencereyi o an saklar;
    // bu yüzden adresi henüz boş olan iframe'lerin penceresi de sarılır ve hedef adres mesaj anında çözülür.
    // Başka adrese giden iframe'lerin (ör. ödeme formu) penceresi sarılmaz. Boşken sarılan bir pencere için de
    // mesajların `source` alanı aynı sarmalı döndürür: `e.source === iframe.contentWindow` karşılaştırmaları bozulmaz.
    var cw = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "contentWindow");
    var wrapped = typeof WeakMap === "function" ? new WeakMap() : null;
    var rawToWrapped = wrapped ? new WeakMap() : null;
    var srcDesc = Object.getOwnPropertyDescriptor(MessageEvent.prototype, "source");
    var rawSource = function (e) {
      return srcDesc && srcDesc.get ? srcDesc.get.call(e) : e.source;
    };
    if (srcDesc && srcDesc.get && rawToWrapped) {
      Object.defineProperty(MessageEvent.prototype, "source", {
        configurable: true,
        get: function () {
          var s = srcDesc.get.call(this);
          return (s && rawToWrapped.get(s)) || s;
        },
      });
    }
    Object.defineProperty(HTMLIFrameElement.prototype, "contentWindow", {
      configurable: true,
      get: function () {
        var w = cw.get.call(this);
        if (!w || !wrapped) return w;
        var src = sd.get.call(this) || "";
        var proxied = !src || src === "about:blank";
        for (var p in rev) if (src.indexOf(p) === 0) proxied = true;
        for (var p2 in map) if (src.indexOf(p2) === 0) proxied = true; // birazdan vekile çevrilecek (aşağıdaki gözlemci)
        if (!proxied) return w;
        if (wrapped.has(this)) return wrapped.get(this);
        var frame = this;
        var px = new Proxy(w, {
          get: function (t, k) {
            if (k === "postMessage") {
              return function (msg, origin, tr) {
                var cur = sd.get.call(frame) || "";
                for (var q in rev) if (cur.indexOf(q) === 0 && origin === rev[q]) origin = q;
                return t.postMessage(msg, origin, tr);
              };
            }
            var v = t[k];
            return typeof v === "function" ? v.bind(t) : v;
          },
        });
        wrapped.set(this, px);
        rawToWrapped.set(w, px);
        return px;
      },
    });
    // Bazı GHL ekranları iframe'i adresiyle birlikte, yukarıdaki kancaları atlayan bir yolla ekler (ör. otomasyon:
    // name="workflow-builder"). Sayfaya eklenen böyle bir iframe hemen vekil adrese çevrilir.
    var catchFrame = function (f) {
      var s = f.getAttribute("src") || "";
      for (var o in map) {
        if (s.indexOf(o) === 0 && !down[map[o]]) {
          f.src = s; // yamalı ayarlayıcı: vekile çevirir + güvenlik ağını kurar
          return;
        }
      }
    };
    try {
      // Hem eklenme anı hem de sonradan verilen adres izlenir (GHL bazen iframe'i önce adressiz ekliyor). Güvenlik ağı
      // GHL adresine geri döndürdüğünde vekil "down" işaretli olduğundan tekrar yakalanmaz (döngü olmaz).
      new MutationObserver(function (recs) {
        for (var i = 0; i < recs.length; i++) {
          var r = recs[i];
          if (r.type === "attributes") {
            if (r.target.tagName === "IFRAME") catchFrame(r.target);
            continue;
          }
          var added = r.addedNodes;
          for (var j = 0; j < added.length; j++) {
            var n = added[j];
            if (n.nodeType !== 1) continue;
            if (n.tagName === "IFRAME") catchFrame(n);
            else if (n.getElementsByTagName) {
              var fs = n.getElementsByTagName("iframe");
              for (var k = 0; k < fs.length; k++) catchFrame(fs[k]);
            }
          }
        }
      }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
    } catch (e) {}
    // Uygulamadan gelen mesajlar vekil adresten gelir; CRM asıl adresi beklediği için kaynağı geri yazılır.
    window.addEventListener(
      "message",
      function (e) {
        if (e.__gai || !rev[e.origin]) return;
        lastMsg[e.origin] = Date.now();
        e.stopImmediatePropagation();
        var ev = new MessageEvent("message", {
          data: e.data,
          origin: rev[e.origin],
          source: rawSource(e), // kurucu gerçek pencere ister; okunurken yine sarmal döner
          ports: Array.prototype.slice.call(e.ports || []),
          lastEventId: e.lastEventId,
        });
        ev.__gai = true;
        window.dispatchEvent(ev);
      },
      true
    );
  }

  /* ---------- Bakım: çerçevedeki uygulamanın kataloğu ----------
   * CRM (üst pencere) {gaiCollect: 1} gönderirse bu çerçevedeki uygulamanın o anki i18n mesajları düz anahtar
   * listesi olarak geri gönderilir. GHL'in bazı uygulamaları metinlerini yalnız CRM içinde açılınca yükler;
   * yeni/değişen metinleri bulmak için kullanılır. Yalnız arayüz metinleri gider, kişi verisi değil. İngilizcesi
   * için çerçeve İngilizce açılmalıdır (üst sekmede sessionStorage gai_frame_lang=en). */
  var COLLECT_CTX = {
    normalize: function (a) {
      return a.join("");
    },
    interpolate: function (v) {
      return v;
    },
    named: function (k) {
      return "{" + k + "}";
    },
    list: function (i) {
      return "{" + i + "}";
    },
    plural: function (a) {
      return a.join(" | ");
    },
    linked: function (k) {
      return "@:" + k;
    },
    type: "text",
    values: {},
  };
  function astText(n) {
    if (n == null) return "";
    if (typeof n === "string") return n;
    var t = n.type != null ? n.type : n.t;
    var items = n.items || (Array.isArray(n.i) ? n.i : null);
    var stat = n.static != null ? n.static : n.s;
    if (t === 0) return astText(n.body || n.b);
    if (t === 1) return (n.cases || n.c || []).map(astText).join(" | ");
    if (t === 2) return stat != null ? stat : (items || []).map(astText).join("");
    if (t === 3 || t === 7) return n.value != null ? n.value : n.v;
    if (t === 4) return "{" + (n.key != null ? n.key : n.k) + "}";
    if (t === 5) return "{" + (n.index != null ? n.index : n.k != null ? n.k : n.i) + "}";
    if (t === 9) return "{'" + (n.value != null ? n.value : n.v) + "'}";
    if (t === 6) return "@:" + astText(n.key || n.k);
    return "";
  }
  function msgText(v) {
    if (typeof v === "string") return v;
    if (typeof v === "function") {
      if (typeof v.source === "string") return v.source;
      try {
        var r = v(COLLECT_CTX);
        return typeof r === "string" ? r : null;
      } catch (e) {
        return null;
      }
    }
    if (v && typeof v === "object" && (v.type === 0 || v.t === 0 || v.body || v.b)) return astText(v);
    return null;
  }
  function flattenMsgs(o, p, out) {
    for (var k in o) {
      var v = o[k];
      var key = p ? p + "." + k : k;
      var s = msgText(v);
      if (s !== null) out[key] = s;
      else if (v && typeof v === "object" && !Array.isArray(v)) flattenMsgs(v, key, out);
    }
    return out;
  }
  // Bakım: çerçevede oluşan hatalar ve yüklenemeyen dosyalar (yalnız son 30, kısaltılmış) — vekilden geçen
  // uygulamada bir özellik bozulursa görebilmek için {gaiCollect: 1} cevabına eklenir.
  var frameErrors = [];
  function noteFrameError(t) {
    if (frameErrors.length >= 30) frameErrors.shift();
    frameErrors.push(String(t).slice(0, 160));
  }
  if (FRAME) {
    window.addEventListener("error", function (e) {
      var tg = e && e.target;
      if (tg && tg !== window && (tg.src || tg.href)) noteFrameError("load " + (tg.tagName || "") + " " + String(tg.src || tg.href).replace(/[?#].*$/, ""));
      else noteFrameError("error " + (e && e.message));
    }, true);
    window.addEventListener("unhandledrejection", function (e) {
      var r = e && e.reason;
      noteFrameError("rejection " + (r && (r.message || r.status || r)));
    });
  }
  if (FRAME) {
    window.addEventListener("message", function (e) {
      if (!e.data || e.data.gaiCollect !== 1 || e.source !== window.parent) return;
      var res = [];
      try {
        var els = document.querySelectorAll("#app, [data-v-app]");
        for (var i = 0; i < els.length; i++) {
          var app = els[i].__vue_app__;
          if (!app || !app._context) continue;
          var prov = app._context.provides;
          var syms = Object.getOwnPropertySymbols(prov);
          for (var j = 0; j < syms.length; j++) {
            var g = prov[syms[j]] && prov[syms[j]].global;
            if (!g || typeof g.getLocaleMessage !== "function") continue;
            var loc = g.locale && (g.locale.value || g.locale);
            var msgs = localeMessages(g, loc);
            res.push({ root: (els[i].id || String(els[i].className || "")).slice(0, 40), locale: loc, top: Object.keys(msgs), flat: flattenMsgs(msgs, "", {}) });
            break;
          }
        }
      } catch (x) {}
      // Ekranda İngilizce kalan arayüz metinleri (çeviri avıyla aynı ölçüt: kişi verisi alanları hariç)
      var texts = {};
      try {
        var ui = document.querySelectorAll(HUNT_UI);
        for (var u = 0; u < ui.length && u < 6000; u++) {
          if (ui[u].closest(HUNT_SKIP)) continue;
          for (var c = ui[u].firstChild; c; c = c.nextSibling) {
            var tt = c.nodeType === 3 ? c.nodeValue.replace(/\s+/g, " ").trim() : "";
            if (tt && tt.length <= 100 && !/[çğıöşüÇĞİÖŞÜ]/.test(tt) && HUNT_EN.test(tt) && !/@|https?:/.test(tt)) texts[tt] = 1;
          }
        }
      } catch (x) {}
      try {
        var failed = [];
        try {
          var rs = performance.getEntriesByType("resource");
          for (var q = 0; q < rs.length; q++) if (rs[q].responseStatus >= 400) failed.push(rs[q].responseStatus + " " + rs[q].name.replace(/[?#].*$/, "").slice(0, 120));
        } catch (x) {}
        window.parent.postMessage({ gaiFrameCatalog: { frame: window.__gaiCrmFrame, path: location.pathname.replace(/location\/[A-Za-z0-9]+/, "location/~"), instances: res, texts: Object.keys(texts), errors: frameErrors.slice(), failed: failed.slice(0, 30) } }, "*");
      } catch (x) {}
    });
  }

  /* ---------- Akış ---------- */
  var mode = null; // "tr" | "en"
  var loading = false;

  // Yayındaki katalog sürümü sayfada görünsün (destek/test: <html data-gai-crm-tr="1.0.0">).
  function markVersion() {
    if (catalog && catalog.version) document.documentElement.setAttribute("data-gai-crm-tr", String(catalog.version));
  }

  // Katalog alınamazsa (ağ hatası, henüz yayında olmayan çerçeve kataloğu) giderek seyrelen aralıklarla yeniden denenir.
  var loadFails = 0;
  var nextLoad = 0;
  function loadFailed() {
    loading = false;
    loadFails++;
    nextLoad = Date.now() + Math.min(300000, 2000 * Math.pow(2, loadFails));
  }
  // Hızlı başlangıç: Türkçe açılacağı belli olan sayfada katalog, ayar dosyası beklenmeden istenir (bir gidiş-dönüş
  // kazanılır). Belirti: çerçevenin dil işareti, kişinin dil seçimi ya da son ayar dosyasından kalan küçük özet.
  var prefetched = null;
  function fetchCatalog() {
    return fetch(CATALOG_URL).then(function (r) {
      return r.ok ? r.json() : null;
    });
  }
  function likelyTr() {
    if (FRAME) return frameLang === "tr";
    var c = getChoice();
    if (c) return c === "tr";
    try {
      var h = JSON.parse(localStorage.getItem("gai_crm_cfg_hint") || "null");
      var loc = locationId();
      return !!(h && h.d === "tr" && !(loc && (h.e || []).indexOf(loc) !== -1));
    } catch (e) {
      return false;
    }
  }
  function loadCatalog() {
    if (catalog || loading || Date.now() < nextLoad) return;
    if (window.__gaiCrmCatalog) {
      catalog = window.__gaiCrmCatalog; // test için önceden verilmiş katalog
      markVersion();
      scanCatalog();
      return;
    }
    loading = true;
    var req = prefetched || fetchCatalog();
    prefetched = null;
    req
      .then(function (j) {
        if (!(j && j.instances)) return loadFailed();
        loading = false;
        catalog = j;
        markVersion();
        scanCatalog();
      })
      .catch(loadFailed);
  }

  function tick() {
    var want = decide();
    if (mode === "tr" && want === "en") {
      location.reload(); // Türkçeden İngilizceye temiz dönüş (ör. alt hesap değişti)
      return;
    }
    mode = want;
    renderToggle(mode);
    if (mode === "tr") installFrameProxy(frameProxyMap());
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
        if (mode === "tr" && catalog && catalog.text && (!catalog.noDom || catalog.domOnly)) {
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
          if (d)
            for (var k = 0; k < q.length; k++) {
              if (q[k].nodeType === 1 && !q[k].isConnected) continue;
              if (catalog.noDom) trScoped(q[k], d);
              else trTree(q[k], d);
            }
          if (huntActive) setTimeout(huntScan, 1200); // çeviri ve Vue yeniden çizimi bittikten SONRA kalan İngilizceyi kaydet
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

  try {
    if (!window.__gaiCrmCatalog && likelyTr()) {
      prefetched = fetchCatalog();
      prefetched.catch(function () {}); // kullanılmazsa sessiz; kullanılırsa hatayı loadCatalog ele alır
    }
  } catch (e) {}

  if (window.__gaiCrmConfig) {
    config = window.__gaiCrmConfig;
    start();
  } else if (FRAME && frameLang) {
    start(); // çerçevede dil vekilin işaretinden belli: ayar dosyası beklenmez
  } else {
    try {
      fetch(CONFIG_URL)
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (j) {
          if (j && typeof j === "object" && (j.default || j.english || j.turkish || j.locations)) {
            config = j;
            try {
              localStorage.setItem("gai_crm_cfg_hint", JSON.stringify({ d: j.default, e: j.english || [] }));
            } catch (e) {}
          }
        })
        .catch(function () {})
        .then(start);
    } catch (e) {
      start();
    }
  }
})();
