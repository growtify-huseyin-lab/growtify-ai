// G1 / DeepGap — panel tarafı bağlantı yardımcısı (GHL Client Portal içinde, community-i18n.js yükler).
// Dersteki statik https://growtify.ai/g1 bağlantısına panel kişisinin kimliğini İPUCU olarak (k) ve dönüş
// adresini (ret) ekler. k kimlik kanıtı DEĞİLDİR: growtify.ai öğrenciyi kendi oturumuyla tanır; oturum yoksa
// kodu kişinin kendi e-postasına gönderir (bir kez), sonra program boyunca tek tık.
//
// v3 (2026-10-24): GHL panel 2026-09'da Firebase'den kendi oturumuna (catv2 çerezi) geçti; v2'nin okuduğu
// Firebase belirteci artık güncellenmiyor (süresi dolmuş kalıntı) → /g1 "Erişim doğrulanamadı" veriyordu.
(function () {
  "use strict";
  var TARGET = "growtify.ai/g1";

  // Paneldeki kişi kimliği (GHL'in kendi oturum çerezinden). Yalnız ipucu olarak kullanılır.
  function panelKisi() {
    var m = document.cookie.match(/(?:^|; )catv2=([^;]*)/);
    if (!m) return "";
    try {
      var j = JSON.parse(atob(decodeURIComponent(m[1]).replace(/-/g, "+").replace(/_/g, "/")));
      return /^[A-Za-z0-9]{10,40}$/.test(j.contactId || "") ? j.contactId : "";
    } catch (e) {
      return "";
    }
  }
  window.gaiPanelKisi = panelKisi;

  function buildHref(base) {
    var k = panelKisi();
    return base + "?ret=" + encodeURIComponent(location.href) + (k ? "&k=" + encodeURIComponent(k) : "");
  }

  function enrich() {
    var links = document.querySelectorAll('a[href*="' + TARGET + '"]');
    Array.prototype.forEach.call(links, function (a) {
      var href = buildHref(a.href.split("?")[0]);
      if (a.href !== href) a.href = href;
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  enrich();
  // Panel tek sayfalık uygulama — dersler arasında gezinirken yeniden tara.
  setInterval(enrich, 1000);
  console.log("[G1] link helper active (v3 oturum + ipucu)");
})();
