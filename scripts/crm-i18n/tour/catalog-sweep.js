// Kullanım: CRM sekmesinde (Türkçe açık) konsola yapıştır, sonra çağır (sayfa listesi örn. qa-tour sonucundan):
//   (BU_FONKSİYON)(Object.keys(JSON.parse(localStorage.gai_qa_tour).pages), {wait: 4000, tag: "a"})
// Sonuç: sweep-process.py ile işlenir (bizde olmayan anahtarlar → çeviri paketleri).
// Katalog taraması v2b (güvenli + hızlı): derinlik sınırı, fonksiyon çağırmaz, aynı örneği imzası değişmedikçe
// yeniden düzleştirmez. Eşleşmiş örnekte bizim kataloğumuzda olmayan anahtarlar (miss), eşleşmemişte tümü.
// İndirir: gai-crm-newcats2-<tag>.json. Durum: window.__gaiSweep2 (stop: true ile durur)
(function (paths, opts) {
  opts = opts || {};
  var wait = opts.wait || 4000;
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var router = document.querySelector("#app").__vue_app__.config.globalProperties.$router;
  function astText(n, d) {
    if (n == null || d > 12) return "";
    if (typeof n === "string") return n;
    var t = n.type != null ? n.type : n.t, items = n.items || (Array.isArray(n.i) ? n.i : null), stt = n.static != null ? n.static : n.s;
    if (t === 0) return astText(n.body || n.b, d + 1);
    if (t === 1) return (n.cases || n.c || []).map(function (x) { return astText(x, d + 1); }).join(" | ");
    if (t === 2) return stt != null ? stt : (items || []).map(function (x) { return astText(x, d + 1); }).join("");
    if (t === 3 || t === 7) return n.value != null ? n.value : n.v;
    if (t === 4) return "{" + (n.key != null ? n.key : n.k) + "}";
    if (t === 5) return "{" + (n.index != null ? n.index : n.k != null ? n.k : n.i) + "}";
    if (t === 9) return "{'" + (n.value != null ? n.value : n.v) + "'}";
    if (t === 6) return "@:" + astText(n.key || n.k, d + 1);
    return "";
  }
  function leaf(v) {
    if (typeof v === "string") return v;
    if (typeof v === "function") return typeof v.source === "string" ? v.source : "[fn]";
    if (v && typeof v === "object" && (v.type === 0 || v.t === 0)) return astText(v, 0);
    return null;
  }
  function flatten(o, p, out, depth, budget) {
    if (depth > 9 || budget.n <= 0) return out;
    for (var k in o) {
      if (!Object.prototype.hasOwnProperty.call(o, k)) continue;
      var v = o[k], key = p ? p + "." + k : k, s = leaf(v);
      if (s !== null) { out[key] = s; if (--budget.n <= 0) return out; }
      else if (v && typeof v === "object" && !Array.isArray(v) && !(v instanceof Node)) flatten(v, key, out, depth + 1, budget);
    }
    return out;
  }
  function sig2(m) {
    var n = 0, top = Object.keys(m);
    for (var i = 0; i < top.length; i++) { var v = m[top[i]]; n += v && typeof v === "object" ? Object.keys(v).length : 1; }
    return top.length + ":" + n;
  }
  var ourKeys = new WeakMap();
  var seenG = new WeakMap();
  function keysOf(entry) {
    var k = ourKeys.get(entry);
    if (!k) { k = flatten(entry.messages || {}, "", {}, 0, { n: 400000 }); ourKeys.set(entry, k); }
    return k;
  }
  var st = (window.__gaiSweep2 = { done: false, stop: false, i: 0, n: paths.length, cats: {}, slow: [] });
  function grab(path) {
    var els = document.querySelectorAll("#app,[data-v-app]");
    for (var i = 0; i < els.length; i++) {
      var app = els[i].__vue_app__;
      if (!app || !app._context) continue;
      var syms = Object.getOwnPropertySymbols(app._context.provides);
      for (var j = 0; j < syms.length; j++) {
        var pv = app._context.provides[syms[j]];
        if (!(pv && pv.global && typeof pv.global.getLocaleMessage === "function")) continue;
        var g = pv.global;
        var loc = g.locale && (g.locale.value || g.locale);
        var m = g.getLocaleMessage(typeof loc === "string" ? loc : "en");
        var top = Object.keys(m).sort();
        if (!top.length) break;
        var root = (els[i].id || String(els[i].className || "")).slice(0, 60);
        var sg = sig2(m);
        var key = (g.__gaiTr ? "P:" : "U:") + root + ":" + top.slice(0, 10).join(",") + "#" + top.length;
        var c = st.cats[key] || (st.cats[key] = { root: root, patched: !!g.__gaiTr, locale: loc, top: top, miss: {}, paths: [] });
        if (c.paths.indexOf(path) === -1) c.paths.push(path);
        if (seenG.get(g) === sg) break; // değişmedi
        seenG.set(g, sg);
        var t0 = performance.now();
        var flat = flatten(m, "", {}, 0, { n: 400000 });
        if (g.__gaiTr) {
          var ours = keysOf(g.__gaiTr);
          for (var k in flat) if (!Object.prototype.hasOwnProperty.call(ours, k) && flat[k] && flat[k] !== "[fn]" && /[A-Za-z]{2}/.test(flat[k])) c.miss[k] = flat[k];
        } else for (var k2 in flat) c.miss[k2] = flat[k2];
        var ms = performance.now() - t0;
        if (ms > 500) st.slow.push(path + " " + Math.round(ms) + "ms " + root);
        break;
      }
    }
  }
  (async function run() {
    for (var p = 0; p < paths.length && !st.stop; p++) {
      st.i = p + 1;
      try { await router.push(paths[p]); } catch (e) {}
      await sleep(wait);
      try { grab(paths[p].replace(/location\/[A-Za-z0-9]+/, "location/~")); } catch (e) { st.err = String(e).slice(0, 120); }
    }
    st.done = true;
    var a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify({ slow: st.slow, cats: st.cats }, null, 1)], { type: "application/json" }));
    a.download = "gai-crm-newcats2-" + (opts.tag || "x") + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
  })();
  return "sweep2b started: " + paths.length;
})
