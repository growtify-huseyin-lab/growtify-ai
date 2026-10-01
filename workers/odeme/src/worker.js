/**
 * odeme.growtify.app — GHL ödeme linklerinin Growtify markalı, Türkçe sürümü.
 *
 * GHL'in ödeme sayfası (app.growtify.app/payment-link/{id}) Türkçe dilini desteklemiyor.
 * Bu Worker aynı sayfayı kendi alan adımızdan sunar:
 *   - sayfanın <head>'ine Türkçe katman + Stripe dil ayarı (client.client.js) ve marka stili (brand.css) gömülür,
 *   - <body>'ye uygulamanın DIŞINDA kalan marka başlığı ve alt bilgi eklenir (GHL'in Vue uygulamasına dokunulmaz).
 * Ödeme yine GHL + Stripe üzerinden yürür; bu Worker kart verisi görmez (kart alanları Stripe iframe'inde).
 *
 * Yalnız GET/HEAD ve yalnız /payment-link/{24 hex} yolu proxy'lenir — açık proxy değildir.
 */
import CLIENT_JS from "./client.client.js";
import BRAND_CSS from "./brand.css";

const ORIGIN = "https://app.growtify.app";
const HOME = "https://growtify.app/";
const ID_RE = /^[a-f0-9]{24}$/i;

const LOGO_URL = "https://assets.cdn.filesafe.space/e8ZRRmOybS08x5L6qgsS/media/68852c345468fca459ea1015.png";
const FAVICON_URL = "https://storage.googleapis.com/msgsndr/e8ZRRmOybS08x5L6qgsS/media/68bd845f7b3d2fefe4799086.png";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Urbanist:wght@700;800&display=swap";

const LOCK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>';

const HEAD_INJECT = [
  `<script>${CLIENT_JS}</script>`,
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${FONTS_URL}">`,
  `<style id="gai-brand">${BRAND_CSS}</style>`,
].join("");

const HEADER_HTML = `
<header class="gai-pay-header">
  <div class="gai-pay-header__inner">
    <img class="gai-pay-header__logo" src="${LOGO_URL}" alt="Growtify" width="125" height="40">
    <span class="gai-pay-header__secure">${LOCK_SVG}<span>Güvenli Ödeme</span></span>
  </div>
</header>
<div class="gai-pay-loader" role="status" aria-live="polite"><span class="gai-pay-loader__spin" aria-hidden="true"></span><span>Ödeme sayfası hazırlanıyor…</span></div>`;

function footerHtml(year) {
  return `
<footer class="gai-pay-footer">
  <p class="gai-pay-footer__trust">${LOCK_SVG}<span>Kart bilgileriniz şifreli bağlantıyla doğrudan ödeme altyapısına iletilir; Growtify kart numaranızı görmez ve saklamaz.</span></p>
  <p class="gai-pay-footer__meta">Sorunuz mu var? <a href="mailto:info@growtify.app">info@growtify.app</a><span class="gai-pay-footer__dot">·</span>© ${year} Growtify</p>
</footer>`;
}

// GHL'in Cloudflare'ı sayfadaki e-posta adreslerini gizleyip kendi /cdn-cgi betiğiyle çözüyor;
// o betik bizim alan adımızda yok. Adresi burada çözüp düz metin olarak yazıyoruz.
function decodeCfEmail(hex) {
  const key = parseInt(hex.slice(0, 2), 16);
  let out = "";
  for (let i = 2; i < hex.length; i += 2) out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ key);
  return out;
}

const SECURITY_HEADERS = {
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow, noarchive",
  "referrer-policy": "strict-origin-when-cross-origin",
  "x-content-type-options": "nosniff",
};

function plain(status, text) {
  return new Response(text, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8", ...SECURITY_HEADERS },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }

    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return Response.redirect(HOME, 302);
    // Kısa link: odeme.growtify.app/{id} → /payment-link/{id}
    if (parts.length === 1 && ID_RE.test(parts[0])) {
      return Response.redirect(`${url.origin}/payment-link/${parts[0]}${url.search}`, 302);
    }
    if (url.pathname === "/favicon.ico") return Response.redirect(FAVICON_URL, 302);
    if (!(parts.length === 2 && parts[0] === "payment-link" && ID_RE.test(parts[1]))) {
      return plain(404, "Sayfa bulunamadı.");
    }

    let upstream;
    try {
      upstream = await fetch(`${ORIGIN}/payment-link/${parts[1]}${url.search}`, {
        method: request.method,
        headers: {
          "user-agent": request.headers.get("user-agent") || "Mozilla/5.0",
          accept: "text/html,application/xhtml+xml",
          "accept-language": request.headers.get("accept-language") || "tr-TR,tr;q=0.9",
        },
        redirect: "manual",
      });
    } catch (e) {
      return plain(502, "Ödeme sayfasına şu an ulaşılamıyor. Lütfen birazdan tekrar deneyin.");
    }

    const headers = new Headers(upstream.headers);
    headers.delete("set-cookie"); // GHL'in kendi alan adına ait çerezler (ör. __cf_bm) burada geçersiz
    headers.delete("content-length");
    for (const [k, v] of Object.entries(SECURITY_HEADERS)) headers.set(k, v);

    const isHtml = (upstream.headers.get("content-type") || "").includes("text/html");
    if (upstream.status !== 200 || !isHtml || request.method === "HEAD") {
      return new Response(upstream.body, { status: upstream.status, headers });
    }

    const year = new Date().getUTCFullYear();
    return new HTMLRewriter()
      .on("html", { element: (el) => el.setAttribute("lang", "tr") })
      .on("head", { element: (el) => el.prepend(HEAD_INJECT, { html: true }) })
      .on("title", { element: (el) => el.setInnerContent("Güvenli Ödeme | Growtify") })
      .on('link[rel="icon"], link[rel="shortcut icon"]', {
        element: (el) => {
          el.setAttribute("href", FAVICON_URL);
          el.setAttribute("type", "image/png");
        },
      })
      .on('script[src*="/cdn-cgi/scripts/"]', { element: (el) => el.remove() })
      .on("a.__cf_email__", {
        element: (el) => {
          const hex = el.getAttribute("data-cfemail");
          if (hex && /^[0-9a-f]+$/i.test(hex)) el.replace(decodeCfEmail(hex), { html: false });
        },
      })
      .on("body", {
        element: (el) => {
          el.prepend(HEADER_HTML, { html: true });
          el.append(footerHtml(year), { html: true });
        },
      })
      .transform(new Response(upstream.body, { status: 200, headers }));
  },
};
