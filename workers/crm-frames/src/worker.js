/**
 * crm-*.growtify.app — GHL CRM'in iframe ile gömdüğü uygulamaları Türkçe katmanla sunar.
 *
 * CRM'deki bazı ekranlar (Ayarlar > Takvimler, İşletme Profili, E-posta Hizmetleri) GHL'in ayrı
 * alan adlarındaki uygulamalardan iframe ile gelir; ajans Custom JS oraya ulaşamaz. CRM'deki Türkçe
 * yükleyici (growtify.ai/crm/crm-i18n.js) bu iframe'lerin adresini buradaki karşılığına çevirir; bu
 * Worker aynı uygulamayı GHL'den alıp sayfanın başına yükleyiciyi ekler. Kullanıcı aynı ekranda kalır.
 *
 * Güvenlik:
 *   - Yalnız aşağıdaki GHL uygulama adresleri (açık vekil değil), yalnız GET/HEAD.
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
};

const LOADER_URL = "https://growtify.ai/crm/crm-i18n.js";
const CATALOG_BASE = "https://growtify.ai/crm/frames/";
// GHL uygulamalarını çerçeveleyebilecek CRM adresleri (yalnız GHL frame-ancestors gönderirse kullanılır).
const CRM_ANCESTORS = "https://app.gohighlevel.com https://*.gohighlevel.com https://*.leadconnectorhq.com https://*.growtify.app";

const PASS_REQUEST_HEADERS = ["accept", "accept-language", "user-agent", "if-none-match", "if-modified-since", "range", "cache-control"];
const DROP_RESPONSE_HEADERS = /^(set-cookie|x-frame-options|strict-transport-security|alt-svc|report-to|nel|content-length|content-encoding|transfer-encoding|connection)$/i;

function injection(frame) {
  return (
    "<script>window.__gaiCrmFrame=" +
    JSON.stringify(frame) +
    ";window.__gaiCrmCatalogUrl=" +
    JSON.stringify(CATALOG_BASE + frame + ".json") +
    ";</script>" +
    '<script src="' +
    LOADER_URL +
    '"></script>'
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

class HeadInjector {
  constructor(frame) {
    this.frame = frame;
  }
  element(el) {
    el.prepend(injection(this.frame), { html: true });
  }
}

export default {
  async fetch(request, env) {
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
      return new HTMLRewriter().on("head", new HeadInjector(app.frame)).transform(res);
    }
    return new Response(upstream.body, { status: upstream.status, headers: out });
  },
};
