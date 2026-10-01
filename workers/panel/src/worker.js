/**
 * panel.growtify.ai — GHL Client Portal (Client Club) edge proxy.
 *
 * Kaynağı canlıdaki `gai-portal-proxy` Worker'ından alındı (2026-10-01, son değişiklik 2026-07-01):
 * davranış birebir aynı. Tüm istekler GHL'in portal kökenine aktarılır; HTML'e favicon + panel
 * Türkçe çeviri yükleyicisi (growtify.ai/portal/community-i18n.js) eklenir.
 */

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
      return new HTMLRewriter()
        .on("head", new HeadInjector())
        .on('link[rel="icon"]', new IconFixer())
        .on('link[rel="shortcut icon"]', new IconFixer())
        .transform(out);
    }
    return out;
  },
};
