/**
 * crm-*.growtify.app — GHL CRM'in iframe ile gömdüğü uygulamaları Türkçe katmanla sunar.
 *
 * CRM'deki bazı ekranlar (Ayarlar > Takvimler, İşletme Profili, E-posta Hizmetleri, Otomasyon, E-postalar,
 * Sohbet Sağlayıcıları, Satış Ortaklığı) GHL'in ayrı
 * alan adlarındaki uygulamalardan iframe ile gelir; ajans Custom JS oraya ulaşamaz. CRM'deki Türkçe
 * yükleyici (growtify.ai/crm/crm-i18n.js) bu iframe'lerin adresini buradaki karşılığına çevirir; bu
 * Worker aynı uygulamayı GHL'den alıp sayfanın başına yükleyiciyi ekler. Kullanıcı aynı ekranda kalır.
 *
 * Güvenlik:
 *   - Yalnız aşağıdaki GHL uygulama adresleri (açık vekil değil), yalnız GET/HEAD. Bir adresin kullanıcıya açılması
 *     ayrıca crm-config.json "frames" listesine bağlıdır (listede olmayan adres yalnız bakım/deneme içindir).
 *   - İstekte çerez/kimlik başlığı GHL'e iletilmez; yanıttaki Set-Cookie atılır. Uygulamanın kimlik
 *     bilgisi CRM'den tarayıcı içinde mesajla gelir ve API çağrıları doğrudan GHL'e gider — bu Worker'dan
 *     geçmez.
 *   - GHL bu uygulamalarda şu an CSP / X-Frame-Options göndermiyor (2026-10-03). Gönderirse çerçeveleme
 *     izni yalnız CRM adresleriyle sınırlanır, betik izni growtify.ai için genişletilir; korumanın geri
 *     kalanı aynen kalır.
 * Bozulmazlık: Worker cevap vermezse CRM'deki yükleyici birkaç saniye içinde iframe'i GHL'in kendi
 * adresine geri çevirir (ekran İngilizce açılır). Hepsini kapatmak için crm-config.json'dan "frames"
 * silinir — Worker'a dokunmak gerekmez.
 */

const APPS = {
  "crm-takvim.growtify.app": { origin: "https://calendar-app.leadconnectorhq.com", frame: "calapp" },
  "crm-ayarlar.growtify.app": { origin: "https://client-app-crm-settings.leadconnectorhq.com", frame: "crmset" },
  "crm-eposta.growtify.app": { origin: "https://ghl-isv-app-prod.leadconnectorhq.com", frame: "isv" },
  // directAssets: uygulamanın /assets dosyaları GHL'den doğrudan yüklenir (GHL bu uygulamada CORS'a izin veriyor);
  // büyük uygulama vekilden geçmez, kullanıcının tarayıcısındaki GHL önbelleği kullanılır.
  "crm-otomasyon.growtify.app": { origin: "https://client-app-automation-workflows.leadconnectorhq.com", frame: "wf", directAssets: true },
  "crm-epostalar.growtify.app": { origin: "https://email-home-prod.leadconnectorhq.com", frame: "email" },
  "crm-sohbet.growtify.app": { origin: "https://client-app-crm-conversations.leadconnectorhq.com", frame: "conv" },
  "crm-ortaklik.growtify.app": { origin: "https://client-app-affiliate-manager.leadconnectorhq.com", frame: "aff" },
};

const LOADER_URL = "https://growtify.ai/crm/crm-i18n.js";
const CATALOG_BASE = "https://growtify.ai/crm/frames/";
// GHL uygulamalarını çerçeveleyebilecek CRM adresleri (yalnız GHL frame-ancestors gönderirse kullanılır).
const CRM_ANCESTORS = "https://app.gohighlevel.com https://*.gohighlevel.com https://*.leadconnectorhq.com https://*.growtify.app";

const PASS_REQUEST_HEADERS = ["accept", "accept-language", "user-agent", "if-none-match", "if-modified-since", "range", "cache-control"];
const DROP_RESPONSE_HEADERS = /^(set-cookie|x-frame-options|strict-transport-security|alt-svc|report-to|nel|content-length|content-encoding|transfer-encoding|connection)$/i;

// Dil işareti (?gai_frame=tr|en) uygulama açılmadan adresten silinir: bazı uygulamalar (otomasyon) kendi adresini
// CRM'in adres çubuğuna yansıtıyor. İşaret yükleyiciye window.__gaiCrmFrameLang ile, yeniden yüklemeler için
// sekmeye özel sessionStorage ile kalır.
const BOOT =
  "(function(){try{var m=location.search.match(/[?&]gai_(?:frame|lang)=(tr|en)(?=&|$)/);if(!m)return;" +
  "window.__gaiCrmFrameLang=m[1];try{sessionStorage.setItem('gai_crm_frame_lang',m[1])}catch(e){}" +
  "var c=location.search.replace(/([?&])gai_(?:frame|lang)=(?:tr|en)(&|$)/g,function(x,a,b){return b?a:''});" +
  "history.replaceState(history.state,'',location.pathname+(c==='?'?'':c)+location.hash)}catch(e){}})();";

// Yükleyici beklemeden (async) gelir: growtify.ai yavaş cevap verirse uygulama bekletilmez, yalnız Türkçe birkaç
// an sonra gelir. Yükleyici uygulamanın metinlerini açıldıktan sonra da değiştirebiliyor.
function injection(frame) {
  return (
    "<script>window.__gaiCrmFrame=" +
    JSON.stringify(frame) +
    ";window.__gaiCrmCatalogUrl=" +
    JSON.stringify(CATALOG_BASE + frame + ".json") +
    ";" +
    BOOT +
    "</script>" +
    '<script src="' +
    LOADER_URL +
    '" async></script>'
  );
}

// GHL ileride CSP gönderirse: çerçevelemeyi CRM adresleriyle sınırla, yükleyiciye izin ver.
function adjustCsp(csp) {
  const parts = csp
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => !/^frame-ancestors\b/i.test(p));
  const out = parts.map((p) => (/^(script-src|script-src-elem|connect-src)\b/i.test(p) ? p + " https://growtify.ai" : p));
  out.push("frame-ancestors " + CRM_ANCESTORS);
  return out.join("; ");
}

// /assets/… dosyalarını GHL'in kendi adresine yönlendirir (yalnız directAssets uygulamalarda).
class AssetRewriter {
  constructor(origin) {
    this.origin = origin;
  }
  element(el) {
    for (const attr of ["src", "href"]) {
      const v = el.getAttribute(attr);
      if (v && v.startsWith("/assets/")) el.setAttribute(attr, this.origin + v);
    }
  }
}

class HeadInjector {
  constructor(frame) {
    this.frame = frame;
  }
  element(el) {
    el.prepend(injection(this.frame), { html: true });
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // Yerel deneme: `npx wrangler dev --var DEV_APP:crm-ayarlar.growtify.app` (localhost'ta hangi uygulama)
    const app = APPS[url.hostname] || (env && env.DEV_APP && APPS[env.DEV_APP]);
    if (!app) return new Response("Not found", { status: 404 });

    if (url.pathname === "/__gai/health") {
      return new Response(JSON.stringify({ ok: true, frame: app.frame }), {
        headers: { "content-type": "application/json", "cache-control": "no-store", "access-control-allow-origin": "*" },
      });
    }
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    const headers = new Headers();
    for (const h of PASS_REQUEST_HEADERS) {
      const v = request.headers.get(h);
      if (v) headers.set(h, v);
    }
    // Sürümlü (adı içerik özetli) /assets dosyaları Worker'ın kenar önbelleğinde tutulur: GHL bu dosyaları
    // önbelleklemeden veriyor (büyük paketler ilk istekte onlarca saniye sürebiliyor).
    const isAsset = url.pathname.startsWith("/assets/") && request.method === "GET";
    const cache = isAsset && typeof caches !== "undefined" ? caches.default : null;
    const cacheKey = cache ? new Request(url.origin + url.pathname, { method: "GET" }) : null;
    if (cache) {
      const hit = await cache.match(cacheKey);
      if (hit) return hit;
    }
    const upstream = await fetch(app.origin + url.pathname + url.search, { method: request.method, headers, redirect: "manual" });

    const out = new Headers();
    upstream.headers.forEach((v, k) => {
      if (DROP_RESPONSE_HEADERS.test(k)) return;
      if (/^content-security-policy$/i.test(k)) return out.set(k, adjustCsp(v));
      out.append(k, v);
    });
    const loc = out.get("location");
    if (loc && loc.startsWith(app.origin)) out.set("location", loc.slice(app.origin.length) || "/");

    const type = upstream.headers.get("content-type") || "";
    if (type.includes("text/html") && request.method === "GET") {
      out.set("cache-control", "no-store");
      const res = new Response(upstream.body, { status: upstream.status, headers: out });
      let rw = new HTMLRewriter().on("head", new HeadInjector(app.frame));
      if (app.directAssets) rw = rw.on("script[src], link[href]", new AssetRewriter(app.origin));
      return rw.transform(res);
    }
    const res = new Response(upstream.body, { status: upstream.status, headers: out });
    if (cache && upstream.status === 200) {
      res.headers.set("cache-control", "public, max-age=86400");
      if (ctx && ctx.waitUntil) ctx.waitUntil(cache.put(cacheKey, res.clone()));
    }
    return res;
  },
};
