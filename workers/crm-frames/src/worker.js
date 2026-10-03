/**
 * crm-*.growtify.app — GHL CRM'in iframe ile gömdüğü uygulamaları Türkçe katmanla sunar.
 *
 * CRM'deki bazı ekranlar (Ayarlar > Takvimler, İşletme Profili, E-posta Hizmetleri, Otomasyon, E-postalar,
 * Sohbet Sağlayıcıları, Satış Ortaklığı, Yapay Zeka Stüdyosu, form, sayfa ve e-posta oluşturucular) GHL'in
 * ayrı alan adlarındaki uygulamalardan iframe ile gelir; ajans Custom JS oraya ulaşamaz. CRM'deki Türkçe
 * yükleyici (growtify.ai/crm/crm-i18n.js) bu iframe'lerin adresini buradaki karşılığına çevirir; bu
 * Worker aynı uygulamayı GHL'den alıp sayfanın başına yükleyiciyi ekler. Kullanıcı aynı ekranda kalır.
 * Bir uygulamanın kendi gömdüğü uygulama (E-postalar içindeki e-posta oluşturucu) da aynı yoldan gelir: o
 * çerçevedeki yükleyici iç içe iframe'in adresini çevirir (frames.json "nested").
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
  // Yapay Zeka Stüdyosu: dosyaları CORS izni vermiyor → vekilden (kenar önbelleğiyle) geçer.
  "crm-studyo.growtify.app": { origin: "https://leadgen-vibe-ai-builder.leadconnectorhq.com", frame: "vibe" },
  // Form / anket / test oluşturucu (dosyaları CORS vermiyor → vekilden geçer).
  "crm-formlar.growtify.app": { origin: "https://leadgen-apps-form-survey-builder.leadconnectorhq.com", frame: "form" },
  // Satış hunisi / web sitesi sayfa oluşturucu (dosyaları CORS vermiyor → vekilden geçer).
  "crm-sayfa.growtify.app": { origin: "https://page-builder.leadconnectorhq.com", frame: "page" },
  // E-posta oluşturucu: E-postalar çerçevesinin (crm-epostalar) içinde iç içe çerçeve (dosyaları CORS vermiyor → vekilden geçer).
  "crm-eposta-tasarim.growtify.app": { origin: "https://email-builder-prod.leadconnectorhq.com", frame: "ebuild" },
};

// Kodda sabit olup ekrana değil işleme giden metinler: Yapay Zeka Stüdyosu şablonuna tıklanınca istem kutusuna yazılan
// hazır istemler (yapay zekâ siteyi bu dilde kurar). Bu vekil yalnız Türkçe arayüzde kullanıldığı için uygulama
// dosyasında doğrudan Türkçeleştirilir; GHL metni değiştirirse eşleşme olmaz, dosya olduğu gibi geçer (bozulmaz).
// İçerik değişince JS_TEXT_VERSION artırılır (kenar önbelleği anahtarı).
const JS_TEXT_VERSION = "1";
const JS_TEXT = {
  vibe: {
    "Create a modern SaaS landing page with hero, features, and pricing sections.":
      "Karşılama bölümü, özellikler ve fiyatlandırma bölümleri olan modern bir SaaS açılış sayfası oluştur.",
    "Build an admin dashboard with sidebar navigation, charts, and data tables.":
      "Kenar çubuğu menüsü, grafikler ve veri tabloları olan bir yönetim paneli oluştur.",
    "Create an e-commerce storefront with product grid, cart, and checkout flow.":
      "Ürün ızgarası, sepet ve ödeme akışı olan bir e-ticaret mağazası oluştur.",
    "Build a minimal developer portfolio with project gallery and about section.":
      "Proje galerisi ve hakkımda bölümü olan sade bir geliştirici portfolyosu oluştur.",
    "Build a blog platform with article listing, individual post pages, and a markdown content editor.":
      "Yazı listesi, ayrı yazı sayfaları ve Markdown içerik düzenleyicisi olan bir blog platformu oluştur.",
    "Create a task management app with drag-and-drop kanban board, task creation, and status tracking.":
      "Sürükle-bırak kanban panosu, görev oluşturma ve durum takibi olan bir görev yönetimi uygulaması oluştur.",
    "Build a real-time chat interface with conversation list, message bubbles, and a message input area.":
      "Sohbet listesi, mesaj balonları ve mesaj yazma alanı olan gerçek zamanlı bir sohbet arayüzü oluştur.",
    "Create a restaurant website with a menu, dish details, and an order cart with checkout.":
      "Menü, yemek ayrıntıları ve ödeme adımlı sipariş sepeti olan bir restoran web sitesi oluştur.",
    "Build a fitness tracker app with workout logging, exercise library, and progress charts.":
      "Antrenman kaydı, egzersiz kütüphanesi ve ilerleme grafikleri olan bir fitness takip uygulaması oluştur.",
    "Create a social media feed with posts, likes, comments, and a profile sidebar.":
      "Gönderiler, beğeniler, yorumlar ve profil kenar çubuğu olan bir sosyal medya akışı oluştur.",
    "Build a calendar app with monthly/weekly views, event creation, and time slot scheduling.":
      "Aylık ve haftalık görünümler, etkinlik oluşturma ve zaman aralığı planlaması olan bir takvim uygulaması oluştur.",
    "Create a weather dashboard with current conditions, 7-day forecast, and location search.":
      "Anlık hava durumu, 7 günlük tahmin ve konum arama özelliği olan bir hava durumu paneli oluştur.",
  },
};

// Yazı içeren çizimlerin Türkçe kopyası (yazılar SVG'de harf şekli olarak duruyor, metin olarak çevrilemiyor). GHL çizimi
// değiştirirse dosya adı (içerik özeti) değişir, eşleşme olmaz ve İngilizcesi gelir; Türkçe kopya alınamazsa da öyle.
const ASSET_TR_BASE = "https://growtify.ai/crm/frames/assets/";
const ASSET_TR = {
  aff: { "/assets/Frame1.7d8ea9f0.svg": "aff-hero.tr.svg" }, // Satış Ortaklığı tanıtım çizimi
};

// ?f= çerçevelerin önbellek anahtarı: çerçeve tarayıcı önbelleğinde eski yükleyicide takılırsa artırılır (deploy ile).
const LOADER_URL = "https://growtify.ai/crm/crm-i18n.js?f=2";
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
  "var c=location.search,p;do{p=c;c=c.replace(/([?&])gai_(?:(?:frame|lang)=(?:tr|en)|boot=1)(&|$)/,function(x,a,b){return b?a:''})}while(c!==p);" +
  "history.replaceState(history.state,'',location.pathname+(c==='?'?'':c)+location.hash)}catch(e){}})();";

// Yükleme ekranı: uygulama dosyaları inerken (uzun sürmesi yalnız ilk açılışta; sonra tarayıcı önbelleğinden gelir) boş
// ekran yerine Growtify animasyonu. 0,4 sn'den kısa yüklemede hiç görünmez; uygulama çizilince ya da en geç 90 sn'de kalkar.
// Uygulamanın kökü (#app) dışında, gövdenin başında durur; uygulamanın DOM'una dokunmaz.
const BOOT_CSS =
  "#gai-boot{position:fixed;inset:0;z-index:2147483646;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;" +
  "background:#fff;opacity:0;animation:gai-boot-in .3s ease .4s forwards;font-family:Inter,ui-sans-serif,system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}" +
  "#gai-boot .gai-w{font-size:34px;font-weight:700;letter-spacing:-.02em;color:#1f2433;line-height:1}" +
  "#gai-boot .gai-d{display:inline-block;color:#ff4f5e;animation:gai-dot 1.1s ease-in-out infinite}" +
  "#gai-boot .gai-b{position:relative;width:148px;height:3px;border-radius:3px;background:#eef0f5;overflow:hidden}" +
  "#gai-boot .gai-b i{position:absolute;top:0;bottom:0;left:0;width:42%;border-radius:3px;background:linear-gradient(90deg,#5d47f0,#ff4f5e);animation:gai-run 1.2s ease-in-out infinite}" +
  "#gai-boot .gai-t{font-size:13px;color:#7a8091}" +
  "@keyframes gai-boot-in{to{opacity:1}}" +
  "@keyframes gai-dot{0%,100%{transform:translateY(0)}45%{transform:translateY(-7px)}}" +
  "@keyframes gai-run{0%{transform:translateX(-105%)}100%{transform:translateX(245%)}}" +
  "html.gai-booted #gai-boot{opacity:0!important;animation:none;transition:opacity .3s;pointer-events:none}" +
  "@media (prefers-reduced-motion:reduce){#gai-boot .gai-d,#gai-boot .gai-b i{animation:none}}";
function bootMarkup(lang) {
  const t = lang === "en" ? "Loading…" : "Yükleniyor…";
  return (
    '<div id="gai-boot" aria-hidden="true"><div class="gai-w">growtify<span class="gai-d">.</span></div><div class="gai-b"><i></i></div><div class="gai-t">' +
    t +
    "</div></div><script>(function(){var d=document.documentElement,done=0;" +
    "function off(){if(done)return;done=1;d.className+=' gai-booted';setTimeout(function(){var b=document.getElementById('gai-boot');b&&b.parentNode&&b.parentNode.removeChild(b)},450)}" +
    "function drawn(){var a=document.getElementById('app')||document.querySelector('[data-v-app]');if(!a)return true;return a.children.length>0&&(a.textContent||'').replace(/\\s/g,'').length>0}" +
    "addEventListener('load',function(){var n=0;(function c(){if(drawn()||n++>13)off();else setTimeout(c,150)})()});setTimeout(off,90000)})();</script>"
  );
}
class BodyInjector {
  constructor(lang) {
    this.lang = lang;
  }
  element(el) {
    el.prepend(bootMarkup(this.lang), { html: true });
  }
}

// Yükleyici beklemeden (async) gelir: growtify.ai yavaş cevap verirse uygulama bekletilmez, yalnız Türkçe birkaç
// an sonra gelir. Yükleyici uygulamanın metinlerini açıldıktan sonra da değiştirebiliyor.
function injection(frame, boot) {
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
    '" async></script>' +
    (boot ? "<style>" + BOOT_CSS + "</style>" : "")
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

// Adında içerik özeti olan dosya (ör. index-lo00jb0I.js, Frame1.7d8ea9f0.svg) hiç değişmez; GHL yeni sürüm çıkarınca adı da
// değişir → tarayıcıda uzun süre tutulur (oluşturucular 26 MB; her gün yeniden inmesin). Özeti olmayan ya da bizim metnini
// değiştirdiğimiz (JS_TEXT) dosyalar 1 gün. Özet sayılan: son parçada en az 8 harf/rakam ve rakam ya da büyük-küçük karışık.
function immutableAsset(pathname) {
  const m = pathname.match(/[-.]([A-Za-z0-9_]{8,})\.[a-z0-9]+$/);
  if (!m) return false;
  const h = m[1];
  return /[0-9]/.test(h) || (/[A-Z]/.test(h) && /[a-z]/.test(h));
}

// Önce hazırla (/__gai/warm): CRM'deki yükleyici bir ekranı ancak uygulama dosyaları tarayıcıda hazırsa vekilden açar;
// hazır değilse GHL'in kendi sürümü anında açılır, bu küçük sayfa da görünmez bir çerçevede arka planda (düşük öncelik,
// sırayla) uygulamanın açılış dosyalarını tarayıcı önbelleğine alır ve bitince üst pencereye haber verir. Dosya listesi
// uygulamanın o anki giriş sayfasından okunur; liste özeti (sig) GHL yeni sürüm çıkardığında değişir.
function fnv1a(str) {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16);
}
async function warmPage(app) {
  const r = await fetch(app.origin + "/", { headers: { "user-agent": "Mozilla/5.0 (growtify-crm-frames warm)" } });
  const html = r.ok ? await r.text() : "";
  const list = [...new Set([...html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map((m) => m[1]))].sort();
  const sig = fnv1a(list.join("|"));
  const body =
    '<!doctype html><meta charset="utf-8"><title>gai</title><script>(function(){var A=' +
    JSON.stringify(list) +
    ",F=" +
    JSON.stringify(app.frame) +
    ",S=" +
    JSON.stringify(sig) +
    ',t0=Date.now(),i=0,d=0,n=A.length,bad=0;function fin(){try{parent.postMessage({gaiWarm:{frame:F,sig:S,n:n,bad:bad,ms:Date.now()-t0}},"*")}catch(e){}}' +
    'function next(){if(i>=n)return;var u=A[i++];var o={credentials:"same-origin"};try{o.priority="low"}catch(e){}' +
    'fetch(u,o).then(function(r){if(!r.ok)bad++;return r.arrayBuffer()}).catch(function(){bad++}).then(function(){d++;if(d===n)fin();else next()})}' +
    "if(!n)fin();for(var k=0;k<3;k++)next()})();</script>";
  return new Response(body, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } });
}

class HeadInjector {
  constructor(frame, boot) {
    this.frame = frame;
    this.boot = boot;
  }
  element(el) {
    el.prepend(injection(this.frame, this.boot), { html: true });
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
    if (url.pathname === "/__gai/warm") return warmPage(app);

    const trAsset = request.method === "GET" && ASSET_TR[app.frame] && ASSET_TR[app.frame][url.pathname];
    if (trAsset) {
      try {
        const r = await fetch(ASSET_TR_BASE + trAsset, { cf: { cacheTtl: 3600, cacheEverything: true } });
        if (r.ok) {
          return new Response(r.body, {
            headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=3600" },
          });
        }
      } catch (e) {}
    }

    const headers = new Headers();
    for (const h of PASS_REQUEST_HEADERS) {
      const v = request.headers.get(h);
      if (v) headers.set(h, v);
    }
    // Sürümlü (adı içerik özetli) /assets dosyaları Worker'ın kenar önbelleğinde tutulur: GHL bu dosyaları
    // önbelleklemeden veriyor (büyük paketler ilk istekte onlarca saniye sürebiliyor).
    const isAsset = url.pathname.startsWith("/assets/") && request.method === "GET";
    const jsText = isAsset && url.pathname.endsWith(".js") ? JS_TEXT[app.frame] : null;
    const cache = isAsset && typeof caches !== "undefined" ? caches.default : null;
    const cacheKey = cache
      ? new Request(url.origin + url.pathname + (jsText ? "?gai_t=" + JS_TEXT_VERSION : ""), { method: "GET" })
      : null;
    const assetCacheControl = !jsText && immutableAsset(url.pathname) ? "public, max-age=31536000, immutable" : "public, max-age=86400";
    if (cache) {
      const hit = await cache.match(cacheKey);
      if (hit) {
        // Önbellekteki kopya eski kuralla saklanmış olabilir: tarayıcıya giden süre her zaman güncel kurala göre.
        if (hit.headers.get("cache-control") === assetCacheControl) return hit;
        const r = new Response(hit.body, hit);
        r.headers.set("cache-control", assetCacheControl);
        return r;
      }
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
      const lang = url.searchParams.get("gai_frame") === "en" ? "en" : "tr";
      // Yükleme ekranı yalnız ilk açılışta (yükleyici dosyalar tarayıcıda hazır değilken ?gai_boot=1 ekler).
      const boot = url.searchParams.get("gai_boot") === "1";
      let rw = new HTMLRewriter().on("head", new HeadInjector(app.frame, boot));
      if (boot) rw = rw.on("body", new BodyInjector(lang));
      if (app.directAssets) rw = rw.on("script[src], link[href]", new AssetRewriter(app.origin));
      return rw.transform(res);
    }
    let body = upstream.body;
    if (jsText && upstream.status === 200) {
      let js = await upstream.text();
      for (const en in jsText) if (js.indexOf(en) !== -1) js = js.split(en).join(jsText[en]);
      body = js;
    }
    const res = new Response(body, { status: upstream.status, headers: out });
    if (cache && upstream.status === 200) {
      res.headers.set("cache-control", assetCacheControl);
      if (ctx && ctx.waitUntil) ctx.waitUntil(cache.put(cacheKey, res.clone()));
    }
    return res;
  },
};
