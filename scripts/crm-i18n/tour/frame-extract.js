// GHL'in iframe uygulamalarından (takvim, ayarlar, e-posta hizmetleri, sohbet sağlayıcıları) İngilizce kataloğu çıkarır.
// Uygulamanın kendi adresinde (ör. https://client-app-crm-settings.leadconnectorhq.com/...) javascript ile çalıştırılır;
// sonucu gai-crm-<uygulama>-katalog.json olarak indirir. Derlenmiş mesajlar (fonksiyon ya da AST) kaynak metne çevrilir:
// "{ad}" yer tutucuları ve "a | b" çoğulları korunur.
(async function (fileTag) {
  var CTX = {
    normalize: function (a) { return a.join(""); },
    interpolate: function (v) { return v; },
    named: function (k) { return "{" + k + "}"; },
    list: function (i) { return "{" + i + "}"; },
    plural: function (a) { return a.join(" | "); },
    linked: function (k) { return "@:" + k; },
    type: "text",
    values: {},
  };
  function astText(n) {
    if (n == null) return "";
    if (typeof n === "string") return n;
    var t = n.type != null ? n.type : n.t;
    var body = n.body || n.b;
    var cases = n.cases || n.c;
    var items = n.items || (Array.isArray(n.i) ? n.i : null);
    var stat = n.static != null ? n.static : n.s;
    switch (t) {
      case 0: return astText(body);
      case 1: return (cases || []).map(astText).join(" | ");
      case 2: return stat != null ? stat : (items || []).map(astText).join("");
      case 3: return n.value != null ? n.value : n.v;
      case 4: return "{" + (n.key != null ? n.key : n.k) + "}";
      case 5: return "{" + (n.index != null ? n.index : (n.k != null ? n.k : n.i)) + "}";
      case 9: return "{'" + (n.value != null ? n.value : n.v) + "'}";
      case 6: return "@:" + astText(n.key || n.k);
      case 7: return n.value != null ? n.value : n.v;
      default: return "";
    }
  }
  function text(v) {
    if (typeof v === "string") return v;
    if (typeof v === "function") {
      if (typeof v.source === "string") return v.source;
      try { var r = v(CTX); return typeof r === "string" ? r : null; } catch (e) { return null; }
    }
    if (v && typeof v === "object" && ((v.type === 0) || (v.t === 0) || v.body || v.b)) return astText(v);
    return null;
  }
  function flatten(o, p, out) {
    for (var k in o) {
      var v = o[k];
      var key = p ? p + "." + k : k;
      var s = text(v);
      if (s !== null) out[key] = s;
      else if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    }
    return out;
  }
  var found = [];
  var els = document.querySelectorAll("*");
  for (var i = 0; i < els.length; i++) {
    var app = els[i].__vue_app__;
    if (!app) continue;
    var gp = app.config.globalProperties;
    var g = gp.$i18n && (gp.$i18n.global || gp.$i18n);
    if (!g || typeof g.getLocaleMessage !== "function") {
      // Kompozisyon modunda $i18n yalnız dil alanlarını taşır; asıl örnek uygulamanın provides'ında durur.
      g = null;
      var prov = app._context && app._context.provides;
      var syms = prov ? Object.getOwnPropertySymbols(prov) : [];
      for (var s = 0; s < syms.length && !g; s++) {
        var pv = prov[syms[s]];
        if (pv && pv.global && typeof pv.global.getLocaleMessage === "function") g = pv.global;
      }
    }
    if (!g) continue;
    var loc = g.locale && (g.locale.value || g.locale);
    var en = g.getLocaleMessage(typeof loc === "string" ? loc : "en");
    if (!en || !Object.keys(en).length) en = g.getLocaleMessage("en") || g.getLocaleMessage("en-US") || {};
    found.push({
      root: (els[i].id || String(els[i].className || "")).slice(0, 40),
      locale: loc,
      available: g.availableLocales || [],
      top: Object.keys(en),
      flat: flatten(en, "", {}),
    });
  }
  var best = found.sort(function (a, b) { return Object.keys(b.flat).length - Object.keys(a.flat).length; })[0] || null;
  var res = { app: location.host.split(".")[0], url: location.pathname.replace(/location\/[A-Za-z0-9]+/, "location/~"), instances: found.length };
  if (best) { res.locale = best.locale; res.available = best.available; res.top = best.top; res.flat = best.flat; res.root = best.root; }
  var raw = JSON.stringify(res, null, 1);
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
  a.download = "gai-crm-" + fileTag + "-katalog.json";
  document.body.appendChild(a);
  a.click();
  a.remove();
  return { instances: found.length, strings: best ? Object.keys(best.flat).length : 0, top: best ? best.top.length : 0, locale: res.locale, available: res.available };
})
