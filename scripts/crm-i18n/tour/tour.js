/* GAI çeviri turu (tıklamalı) — 2026-10-03
 * Her CRM sayfasını gezer; yalnız GÖRÜNÜM değiştiren tıklamalar yapar: sekmeler, filtre/sütun/sıralama düğmeleri,
 * açılır menü ve seçim kutularını AÇMA (Escape ile kapatır). Hiçbir seçeneğe tıklamaz; kaydetmez, silmez, göndermez,
 * oluşturmaz. İngilizce kalan arayüz metinlerini, Türkçe büyük harf hatalarını ("KişIler") ve eşleşmeyen i18n
 * kataloglarını yalnız bu sekmede biriktirir (sessionStorage gai_tour + IndexedDB gai-tour). Kişi/mesaj verisi
 * taranmaz: tablo gövdesi, mesaj ve yazı alanları hariç; pano/fırsat sayfalarında yalnız arayüz öğeleri.
 */
function gaiTour() {
  if (window.__gaiTourRunning) return "running";
  window.__gaiTourRunning = true;
  // Arka plandaki sekmede tarayıcı setTimeout'u dakikada bire kadar yavaşlatır; bekleme sayacı bir Worker'da çalışır.
  let W = window.__gaiTimerWorker;
  try { if (!W) W = window.__gaiTimerWorker = new Worker(URL.createObjectURL(new Blob(["onmessage=function(e){setTimeout(function(){postMessage(e.data)},e.data.ms)}"], { type: "text/javascript" }))); } catch (e) { W = null; }
  const waits = {}; let seq = 0;
  if (W) W.onmessage = (e) => { const f = waits[e.data.id]; if (f) { delete waits[e.data.id]; f(); } };
  const sleep = (ms) => new Promise((r) => { if (!W) return setTimeout(r, ms); const id = ++seq; waits[id] = r; W.postMessage({ id, ms }); });
  const LOC = (location.pathname.match(/\/location\/([A-Za-z0-9]+)/) || [])[1];
  const appEl = document.querySelector("#app");
  const router = appEl && appEl.__vue_app__ && appEl.__vue_app__.config.globalProperties.$router;
  if (!LOC || !router) { window.__gaiTourRunning = false; return "no-router"; }
  let D = window.__gaiTourData;
  if (!D) { try { D = JSON.parse(sessionStorage.getItem("gai_tour_data") || "null"); } catch (e) {} }
  if (!D) { window.__gaiTourRunning = false; return "no-data"; }
  const VOCAB = new Set(D.vocab);
  const INST = D.inst;
  let st = null;
  try { st = JSON.parse(sessionStorage.getItem("gai_tour") || "null"); } catch (e) {}
  if (!st) st = { i: 0, bad: [], s: {}, caps: {}, inst: {}, clicks: 0, pages: 0, t0: Date.now() };
  if (typeof st.cur === "number") { st.bad.push(st.path || st.cur); st.i = st.cur + 1; delete st.cur; }
  const R = window.__gaiTourRange; // [başlangıç, bitiş): sayfalar sekmeler arasında bölünür
  if (R) { st.i = Math.max(st.i, R[0]); st.end = R[1]; }
  window.__gaiTourState = st;
  const save = () => { try { sessionStorage.setItem("gai_tour", JSON.stringify(st)); } catch (e) { st.saveErr = String(e).slice(0, 100); } };

  const UNSAFE_SEG = /(^|[-_])(new|create|setup|import|restore|delete|remove|install|connect|checkout|purchase|upgrade|oauth|callback|contest|promo|demo|trial|wizard|edit|builder|preview|editor|launch|restricted|suspended|verification|logout|impersonate|switch|onboarding|sso|login|redirect|duplicate|clone|print|export|download|unsubscribe|confirm|accept|activate|deactivate|cancel|pay|test)([-_]|$)/i;
  const UNSAFE_ALL = /automation|workflow|vibe|\/seo|no-permissions|conversations\/conversations|\/inbox/i;
  const paths = [...new Set(router.getRoutes().map((r) => r.path)
    .filter((p) => /^\/v2\/location\/:location_id\??\//.test(p))
    .map((p) => p.replace(/:location_id\??/, LOC).replace(/\/$/, ""))
    .filter((p) => !/:/.test(p) && !/\*/.test(p))
    .filter((p) => { const rest = p.replace("/v2/location/" + LOC, ""); return !UNSAFE_ALL.test(rest) && !rest.split("/").some((s) => UNSAFE_SEG.test(s)); }))].sort();
  st.total = paths.length;

  const TR_CH = /[çğıöşüÇĞİÖŞÜ]/;
  const CAPS_BUG = /[çğıöşü][A-ZÇĞİÖŞÜ]/;
  const SKIP = "script,style,noscript,textarea,input,select,code,pre,[contenteditable],tbody,iframe,[class*=message],[class*=Message],[class*=conversation-body],[class*=email-body],[class*=chat-body],#__gai_lang_toggle,#__gai_hunt";
  const SKIP_ATTR = "script,style,noscript,code,pre,[contenteditable],tbody,iframe,[class*=message],[class*=Message],[class*=conversation-body],[class*=email-body],#__gai_lang_toggle,#__gai_hunt";
  const UI = "button,[role=button],[role=tab],[role=menuitem],[role=option],[role=columnheader],label,th,h1,h2,h3,h4,h5,h6,legend,summary," +
    "[class*=title],[class*=Title],[class*=header],[class*=Header],[class*=label],[class*=Label],[class*=empty],[class*=tab],[class*=menu]," +
    "[class*=tooltip],[class*=badge],[class*=chip],[class*=placeholder],[class*=description],[class*=subtitle],[class*=helper],[class*=hint]";
  const STRICT_ROUTE = /conversations|opportunities|dashboard|contacts\/detail/i;
  const norm = (t) => (t || "").replace(/\s+/g, " ").trim();
  const pathKey = () => location.pathname.replace(/\/location\/[A-Za-z0-9]+/, "/location/~").replace(/[A-Za-z0-9_-]{16,}/g, "ID").slice(0, 90);
  const isEn = (t) => {
    const w = t.match(/[A-Za-z]{2,}/g);
    if (!w) return false;
    let hit = 0, long = 0;
    for (const x of w) if (VOCAB.has(x.toLowerCase())) { hit++; if (x.length >= 3) long++; }
    return long > 0 && hit / w.length >= 0.6;
  };
  let strict = false;
  const add = (raw, kind) => {
    const t = norm(raw);
    if (!t || t.length > 180 || /@|https?:|www\.|\.com\b/i.test(t)) return;
    if (TR_CH.test(t)) {
      if (CAPS_BUG.test(t) && !st.caps[t]) st.caps[t] = { k: kind, p: pathKey() };
      return;
    }
    if (st.s[t] || !isEn(t)) return;
    st.s[t] = { k: kind, p: pathKey() };
  };
  const SKIP_TAGS = new Set(["script", "style", "noscript", "textarea", "input", "select", "code", "pre", "tbody", "iframe", "svg"]);
  const SKIP_CLS = /message|Message|conversation-body|email-body|chat-body/;
  const skipEl = (el) => SKIP_TAGS.has(el.localName) || el.id === "__gai_hunt" || el.id === "__gai_lang_toggle" || el.getAttribute("contenteditable") === "true" || el.getAttribute("contenteditable") === "" || SKIP_CLS.test(typeof el.className === "string" ? el.className : "");
  const seenText = new WeakSet(), seenAttr = new WeakSet();
  const scan = () => {
    if (strict) {
      for (const el of document.querySelectorAll(UI)) {
        if (el.closest(SKIP)) continue;
        for (let c = el.firstChild; c; c = c.nextSibling) if (c.nodeType === 3 && !seenText.has(c)) { seenText.add(c); add(c.nodeValue, "text:" + el.localName); }
      }
    } else {
      const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => (n.nodeType === 1 ? (skipEl(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_SKIP) : NodeFilter.FILTER_ACCEPT),
      });
      let n;
      while ((n = tw.nextNode())) {
        if (seenText.has(n)) continue;
        seenText.add(n);
        const v = n.nodeValue;
        if (!v || v.length < 2 || !/[A-Za-zçğıöşü]{2}/.test(v)) continue;
        add(v, "text:" + (n.parentElement ? n.parentElement.localName : "?"));
      }
    }
    for (const el of document.querySelectorAll("[placeholder],[title],[aria-label]")) {
      if (seenAttr.has(el)) continue;
      seenAttr.add(el);
      if (el.closest(SKIP_ATTR)) continue;
      for (const a of ["placeholder", "title", "aria-label"]) { const v = el.getAttribute(a); if (v) add(v, a); }
    }
  };
  const getG = (el) => {
    const app = el && el.__vue_app__;
    if (!app) return null;
    try { const p = app._context.provides; for (const s of Object.getOwnPropertySymbols(p)) { const v = p[s]; if (v && v.global && typeof v.global.getLocaleMessage === "function") return v.global; } } catch (e) {}
    return null;
  };
  const overlap = (a, b) => { if (!a.length) return 0; const B = new Set(b); let h = 0; for (const x of a) if (B.has(x)) h++; return h / a.length; };
  let shellNs = null;
  const shellNamespaces = () => {
    if (shellNs) return shellNs;
    shellNs = {};
    try { const g = getG(appEl); const m = g.getLocaleMessage(g.locale.value) || {}; for (const k of Object.keys(m)) if (m[k] && typeof m[k] === "object") shellNs[k] = Object.keys(m[k]); } catch (e) {}
    return shellNs;
  };
  const idbOpen = () => new Promise((res, rej) => { const r = indexedDB.open("gai-tour", 1); r.onupgradeneeded = () => r.result.createObjectStore("cat"); r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const idbPut = async (k, v) => { const db = await idbOpen(); try { await new Promise((res, rej) => { const tx = db.transaction("cat", "readwrite"); tx.objectStore("cat").put(v, k); tx.oncomplete = res; tx.onerror = () => rej(tx.error); }); } finally { db.close(); } };
  const grab = async () => {
    for (const el of document.querySelectorAll("[data-v-app]")) {
      if (el.id === "app") continue;
      const g = getG(el);
      if (!g || g.__gaiTr) continue;
      const loc = String(g.locale && g.locale.value !== undefined ? g.locale.value : g.locale);
      if (!/^en/i.test(loc)) continue;
      let msgs;
      try { msgs = g.getLocaleMessage(loc) || {}; } catch (e) { continue; }
      const keys = Object.keys(msgs);
      if (!keys.length) continue;
      const sig = keys.slice().sort().join(",").slice(0, 240);
      if (st.inst[sig]) continue;
      let known = "";
      for (const id in INST) if (overlap(keys, INST[id]) >= 0.8) { known = id; break; }
      if (!known) { const ns = shellNamespaces(); for (const k in ns) if (overlap(keys, ns[k]) >= 0.8) { known = "shell:" + k; break; } }
      st.inst[sig] = { n: keys.length, known, root: (el.id || String(el.className || "")).slice(0, 40), p: pathKey() };
      if (!known) {
        try { await idbPut(sig, JSON.stringify({ locale: loc, root: st.inst[sig].root, p: st.inst[sig].p, messages: msgs })); st.inst[sig].saved = true; } catch (e) { st.inst[sig].err = String(e).slice(0, 80); }
      }
    }
  };

  const EXCL = "#sidebar-v2,.hl_header,header,#__gai_hunt,#__gai_lang_toggle,[role=dialog],.n-modal,.hr-modal,.n-drawer,.hr-drawer,.modal,.n-popover,.hr-popover,.n-dropdown-menu";
  const TAB_SEL = "[role=tab],.hr-tabs-tab,.n-tabs-tab,.nav-tabs .nav-link";
  const TRIG_SEL = "[aria-haspopup]:not([aria-haspopup=false]),.n-base-selection,.hr-base-selection";
  const BTN_SAFE = /^(filters?|more filters|advanced filters?|columns?|manage columns|edit columns|sort( by)?|more|views?|group by|customi[sz]e|options|display|layout|show more|see more|expand all|keyboard shortcuts|filtreler|filtre|sütunlar|sırala|daha fazla)$/i;
  const DANGER = /delete|remove|archive|disconnect|log ?out|sign ?out|publish|send|uninstall|void|refund|charge|\bpay|deactivate|disable|reset|clear|cancel|sil\b|kaldır|arşiv|yayınla|gönder|çıkış|iptal|sıfırla|temizle|^\s*\+|^(new|create|add)\b|yeni|oluştur|ekle/i;
  const visible = (el) => { const r = el.getBoundingClientRect(); return r.width > 2 && r.height > 2; };
  const safeHref = (el) => { const a = el.closest("a[href]"); if (!a) return true; if (a.target === "_blank") return false; const h = a.getAttribute("href") || ""; return h.startsWith("#") || (h.startsWith("/") && !/logout|signout/i.test(h)); };
  const desc = (el) => norm((el.textContent || "").slice(0, 80) + " | " + (el.getAttribute("aria-label") || "") + " | " + (el.getAttribute("title") || "")).slice(0, 140);
  const isActiveTab = (t) => t.getAttribute("aria-selected") === "true" || /(^|\s)(active|n-tabs-tab--active|hr-tabs-tab--active|is-active)(\s|$)/.test(String(t.className || ""));
  const closeOverlays = async () => {
    const esc = { key: "Escape", code: "Escape", keyCode: 27, which: 27, bubbles: true, cancelable: true };
    for (let k = 0; k < 3; k++) {
      try { (document.activeElement || document.body).dispatchEvent(new KeyboardEvent("keydown", esc)); document.dispatchEvent(new KeyboardEvent("keydown", esc)); } catch (e) {}
      await sleep(150);
      const dlg = [...document.querySelectorAll("[role=dialog],.n-modal,.hr-modal,.n-drawer,.hr-drawer,.modal.show")].find(visible);
      if (!dlg) break;
      const x = dlg.querySelector('[aria-label*="lose" i],[aria-label*="Kapat"],.n-base-close,.hr-base-close,button.close,[class*=close-btn],[class*=closeButton],[class*=close-icon]');
      if (x && !/delete|remove|sil\b/i.test(desc(x))) { x.click(); await sleep(300); } else break;
    }
    try { for (const t of ["mousedown", "mouseup", "click"]) document.body.dispatchEvent(new MouseEvent(t, { bubbles: true })); } catch (e) {}
    try { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); } catch (e) {}
  };
  const clickTabs = async () => {
    const done = new Set([...document.querySelectorAll(TAB_SEL)].filter(isActiveTab).map(desc));
    for (let k = 0; k < 6; k++) {
      const t = [...document.querySelectorAll(TAB_SEL)].find((x) => !x.closest(EXCL) && visible(x) && safeHref(x) && !isActiveTab(x) && !done.has(desc(x)) &&
        !x.matches("[aria-disabled=true],[disabled],.disabled") && !/log ?out|sign ?out|delete|remove/i.test(desc(x)));
      if (!t) break;
      done.add(desc(t));
      try { t.scrollIntoView({ block: "center" }); t.click(); st.clicks++; } catch (e) {}
      await sleep(1300);
      scan(); await grab();
    }
  };
  const clickTriggers = async () => {
    const used = new WeakSet(), seenDesc = new Set();
    let inBody = 0;
    for (let k = 0; k < 6; k++) {
      const cands = [...document.querySelectorAll(TRIG_SEL + ",button,[role=button]")].filter((el) => {
        if (used.has(el) || el.closest(EXCL) || !visible(el) || !safeHref(el)) return false;
        if (el.matches("[role=switch],[role=checkbox],[role=radio],[disabled],[aria-disabled=true],.disabled")) return false;
        if (el.closest("[role=switch],label,.n-switch,.hr-switch,.n-checkbox,.hr-checkbox")) return false;
        const d = desc(el);
        if (seenDesc.has(d) || DANGER.test(d)) return false;
        if (el.matches(TRIG_SEL)) return true;
        return BTN_SAFE.test(norm(el.textContent)) || BTN_SAFE.test(norm(el.getAttribute("aria-label") || ""));
      });
      let el = cands.find((x) => !x.closest("tbody"));
      if (!el && inBody < 1) { el = cands.find((x) => x.closest("tbody")); if (el) inBody++; }
      if (!el) break;
      used.add(el); seenDesc.add(desc(el));
      const before = location.pathname;
      try { el.scrollIntoView({ block: "center" }); el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true })); el.click(); st.clicks++; } catch (e) {}
      await sleep(1200);
      scan(); await grab();
      await closeOverlays();
      await sleep(200);
      if (location.pathname !== before) break;
    }
  };

  (async () => {
    for (; st.i < Math.min(paths.length, st.end || paths.length); st.i++) {
      if (window.__gaiTourStop) { st.stopped = true; break; }
      st.cur = st.i; st.path = paths[st.i].replace(LOC, "~"); save();
      try { await Promise.race([router.push(paths[st.i]).catch(() => {}), sleep(4000)]); } catch (e) {}
      await sleep(2600);
      strict = STRICT_ROUTE.test(location.pathname);
      try { scan(); await grab(); } catch (e) { st.err = String(e).slice(0, 100); }
      try { await clickTabs(); } catch (e) { st.err = String(e).slice(0, 100); }
      try { await clickTriggers(); } catch (e) { st.err = String(e).slice(0, 100); }
      try { await closeOverlays(); } catch (e) {}
      delete st.cur; st.pages++; save();
    }
    st.done = !st.stopped; st.ms = Date.now() - st.t0; save();
    window.__gaiTourRunning = false;
  })();
  return { start: st.i, total: paths.length };
}
