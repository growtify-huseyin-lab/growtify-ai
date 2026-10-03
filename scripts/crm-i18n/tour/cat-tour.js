/* GAI katalog farkı turu — 2026-10-03
 * Her CRM sayfasını yalnız AÇAR (tıklama yok) ve o anda canlı olan tüm vue-i18n örneklerinin (ana kabuk #app +
 * alt uygulamalar) mesajlarını gezer. Türkçe karakter içermeyen yaprak metinleri anahtar yoluyla biriktirir:
 * GHL'in sayfa açılınca SONRADAN yüklediği (bizim kataloğumuzda olmayan) metinler böylece bulunur.
 * Sonuç sekmede bellekte tutulur, bitince gai-crm-delta-<ad>.json olarak indirilir. Kişi verisi yok (yalnız i18n).
 */
function gaiCatTour(name, range) {
  if (window.__gaiCatRunning) return "running";
  window.__gaiCatRunning = true;
  let W = window.__gaiTimerWorker;
  try { if (!W) W = window.__gaiTimerWorker = new Worker(URL.createObjectURL(new Blob(["onmessage=function(e){setTimeout(function(){postMessage(e.data)},e.data.ms)}"], { type: "text/javascript" }))); } catch (e) { W = null; }
  const waits = {}; let seq = 0;
  if (W) W.onmessage = (e) => { const f = waits[e.data.id]; if (f) { delete waits[e.data.id]; f(); } };
  const sleep = (ms) => new Promise((r) => { if (!W) return setTimeout(r, ms); const id = ++seq; waits[id] = r; W.postMessage({ id, ms }); });
  const LOC = (location.pathname.match(/\/location\/([A-Za-z0-9]+)/) || [])[1];
  const appEl = document.querySelector("#app");
  const router = appEl.__vue_app__.config.globalProperties.$router;
  const UNSAFE_SEG = /(^|[-_])(new|create|setup|import|restore|delete|remove|install|connect|checkout|purchase|upgrade|oauth|callback|contest|promo|demo|trial|wizard|edit|builder|preview|editor|launch|restricted|suspended|verification|logout|impersonate|switch|onboarding|sso|login|redirect|duplicate|clone|print|export|download|unsubscribe|confirm|accept|activate|deactivate|cancel|pay|test)([-_]|$)/i;
  const UNSAFE_ALL = /automation|workflow|vibe|\/seo|no-permissions|conversations\/conversations|\/inbox/i;
  const paths = [...new Set(router.getRoutes().map((r) => r.path)
    .filter((p) => /^\/v2\/location\/:location_id\??\//.test(p))
    .map((p) => p.replace(/:location_id\??/, LOC).replace(/\/$/, ""))
    .filter((p) => !/:/.test(p) && !/\*/.test(p))
    .filter((p) => { const rest = p.replace("/v2/location/" + LOC, ""); return !UNSAFE_ALL.test(rest) && !rest.split("/").some((s) => UNSAFE_SEG.test(s)); }))].sort();
  const TR_CH = /[çğıöşüÇĞİÖŞÜ]/;
  const SEP = "\u0001";
  const getG = (el) => {
    const app = el && el.__vue_app__;
    if (!app) return null;
    try { const p = app._context.provides; for (const s of Object.getOwnPropertySymbols(p)) { const v = p[s]; if (v && v.global && typeof v.global.getLocaleMessage === "function") return v.global; } } catch (e) {}
    return null;
  };
  const acc = (window.__gaiCat = window.__gaiCat || {});
  const st = (window.__gaiCatState = { name, i: range[0], end: range[1], total: paths.length, t0: Date.now() });
  const grabAll = () => {
    for (const el of document.querySelectorAll("#app, [data-v-app]")) {
      const g = getG(el);
      if (!g) continue;
      const loc = String(g.locale && g.locale.value !== undefined ? g.locale.value : g.locale);
      if (!/^en/i.test(loc)) continue;
      let m;
      try { m = g.getLocaleMessage(loc) || {}; } catch (e) { continue; }
      const top = Object.keys(m);
      if (!top.length) continue;
      const sig = el.id === "app" ? "shell" : top.slice().sort().join(",").slice(0, 240);
      const entry = (acc[sig] = acc[sig] || { root: (el.id || String(el.className || "")).slice(0, 40), locale: loc, patched: !!g.__gaiTr, keys: {} });
      const walk = (o, path) => {
        for (const k in o) {
          const v = o[k];
          const kp = path ? path + SEP + k : k;
          if (typeof v === "string") { if (!TR_CH.test(v) && /[A-Za-z]{2}/.test(v) && !(kp in entry.keys)) entry.keys[kp] = v; }
          else if (v && typeof v === "object") walk(v, kp);
        }
      };
      walk(m, "");
    }
  };
  (async () => {
    for (; st.i < Math.min(st.end, paths.length); st.i++) {
      if (window.__gaiCatStop) break;
      try { await Promise.race([router.push(paths[st.i]).catch(() => {}), sleep(4000)]); } catch (e) {}
      await sleep(2500);
      try { grabAll(); } catch (e) { st.err = String(e).slice(0, 100); }
    }
    st.done = true; st.ms = Date.now() - st.t0;
    window.__gaiCatRunning = false;
    try {
      const json = JSON.stringify({ name, collectedAt: new Date().toISOString(), sep: SEP, instances: acc });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = "gai-crm-delta-" + name + ".json";
      document.body.appendChild(a);
      a.click();
      st.bytes = json.length;
    } catch (e) { st.dlErr = String(e).slice(0, 100); }
  })();
  return { start: range[0], end: range[1], total: paths.length };
}
