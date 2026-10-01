/**
 * panel.growtify.ai — GHL Client Portal (Client Club) edge proxy.
 *
 * Kaynağı canlıdaki `gai-portal-proxy` Worker'ından alındı (2026-10-01, son değişiklik 2026-07-01).
 * Tüm istekler GHL'in portal kökenine aktarılır; HTML'e favicon + panel Türkçe çeviri yükleyicisi
 * (growtify.ai/portal/community-i18n.js) eklenir. Kurs teklif sayfalarına ayrıca Türkçe + Growtify
 * marka katmanı (offer.client.js + offer.css + başlık/alt bilgi) eklenir.
 */

import OFFER_JS from "./offer.client.js";
import OFFER_CSS from "./offer.css";

const ORIGIN = "https://e8zrrmoybs08x5l6qgss.app.clientclub.net";
const ORIGIN_HOST = "e8zrrmoybs08x5l6qgss.app.clientclub.net";
const PORTAL_HOST = "panel.growtify.ai";

const LOADER =
  '<script>(function(){if(document.getElementById("__gai_portal_i18n"))return;var s=document.createElement("script");s.id="__gai_portal_i18n";s.src="https://growtify.ai/portal/community-i18n.js?v=2";s.async=true;document.head.appendChild(s);})();</script>';

const FAVICON_URL = "https://growtify.ai/images/fav-ai.png";
const FAVICON =
  '<link rel="icon" type="image/png" sizes="any" href="' + FAVICON_URL + '"/><link rel="apple-touch-icon" href="' + FAVICON_URL + '"/>';
// GHL favicon'u sonradan geri yazabildiği için kendi favicon'umuzu koruyan küçük betik.
const FAVICON_SCRIPT =
  "<script>(function(){var F='" +
  FAVICON_URL +
  "';function e(){try{var ls=document.getElementsByTagName('link'),i,r,g=false;for(i=0;i<ls.length;i++){r=ls[i].getAttribute('rel')||'';if(r.indexOf('icon')>-1){if(ls[i].getAttribute('href')!==F)ls[i].setAttribute('href',F);g=true;}}if(!g){var l=document.createElement('link');l.setAttribute('rel','icon');l.setAttribute('type','image/png');l.setAttribute('href',F);(document.head||document.documentElement).appendChild(l);}}catch(x){}}var t;function s(){clearTimeout(t);t=setTimeout(e,100);}e();try{new MutationObserver(s).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['href','rel']});}catch(x){}setInterval(e,1500);})();</script>";

// ---------------------------------------------------------------------------
// Kurs teklif (satın alma) sayfaları: odeme.growtify.app ile aynı Türkçe + Growtify katmanı.
// Yalnız /courses/offers/* HTML'ine eklenir; panelin geri kalanı değişmez.
// ---------------------------------------------------------------------------
const OFFER_PATH = /^\/courses\/offers\//;
const LOGO_URL = "https://assets.cdn.filesafe.space/e8ZRRmOybS08x5L6qgsS/media/68852c345468fca459ea1015.png";
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Urbanist:wght@700;800&display=swap";
const LOCK_SVG =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>';

const OFFER_HEAD = [
  `<script>${OFFER_JS}</script>`,
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${FONTS_URL}">`,
  `<style id="gai-offer-brand">${OFFER_CSS}</style>`,
].join("");

const OFFER_HEADER = `
<header class="gai-pay-header">
  <div class="gai-pay-header__inner">
    <img class="gai-pay-header__logo" src="${LOGO_URL}" alt="Growtify" width="125" height="40">
    <span class="gai-pay-header__secure">${LOCK_SVG}<span>Güvenli Ödeme</span></span>
  </div>
</header>
<div class="gai-pay-loader" role="status" aria-live="polite"><span class="gai-pay-loader__spin" aria-hidden="true"></span><span>Ödeme sayfası hazırlanıyor…</span></div>`;

function offerFooter(year) {
  return `
<footer class="gai-pay-footer">
  <p class="gai-pay-footer__trust">${LOCK_SVG}<span>Kart bilgilerin şifreli bağlantıyla doğrudan ödeme altyapısına iletilir; Growtify kart numaranı görmez ve saklamaz.</span></p>
  <p class="gai-pay-footer__meta">Yardım mı lazım? <a href="mailto:info@growtify.app">info@growtify.app</a><span class="gai-pay-footer__dot">·</span>© ${year} Growtify</p>
</footer>`;
}

class HeadInjector {
  element(el) {
    el.append(FAVICON, { html: true });
    el.append(FAVICON_SCRIPT, { html: true });
    el.append(LOADER, { html: true });
  }
}

class IconFixer {
  element(el) {
    el.setAttribute("href", FAVICON_URL);
  }
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = ORIGIN + url.pathname + url.search;

    const fwd = new Headers(request.headers);
    fwd.delete("accept-encoding");
    const init = { method: request.method, headers: fwd, redirect: "manual" };
    if (!["GET", "HEAD"].includes(request.method)) init.body = request.body;

    const resp = await fetch(target, init);
    const headers = new Headers(resp.headers);

    // Yönlendirmeler GHL kökenine değil portal adresine dönsün.
    const loc = headers.get("location");
    if (loc) {
      headers.set("location", loc.replace(new RegExp(ORIGIN_HOST.replace(/\./g, "\\."), "gi"), PORTAL_HOST));
    }

    // Çerezler portal alan adında geçerli olsun (GHL'in Domain= kısıtını kaldır).
    const setCookies = resp.headers.getSetCookie ? resp.headers.getSetCookie() : [];
    if (setCookies.length) {
      headers.delete("set-cookie");
      for (const c of setCookies) headers.append("set-cookie", c.replace(/;\s*Domain=[^;]+/gi, ""));
    }

    headers.delete("content-security-policy");
    headers.delete("content-security-policy-report-only");

    const out = new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers });

    const ct = headers.get("content-type") || "";
    if (ct.includes("text/html")) {
      let rw = new HTMLRewriter()
        .on("head", new HeadInjector())
        .on('link[rel="icon"]', new IconFixer())
        .on('link[rel="shortcut icon"]', new IconFixer());
      // İngilizce quizden gelen (?lang=en) teklif sayfası eskisi gibi GHL'in İngilizcesiyle kalır.
      if (OFFER_PATH.test(url.pathname) && resp.status === 200 && url.searchParams.get("lang") !== "en") {
        const year = new Date().getUTCFullYear();
        rw = rw
          .on("html", { element: (el) => el.setAttribute("lang", "tr") })
          .on("head", { element: (el) => el.prepend(OFFER_HEAD, { html: true }) })
          .on("body", {
            element: (el) => {
              el.prepend(OFFER_HEADER, { html: true });
              el.append(offerFooter(year), { html: true });
            },
          });
      }
      return rw.transform(out);
    }
    return out;
  },
};
