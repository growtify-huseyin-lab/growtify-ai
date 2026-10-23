// Çalışma Dosyam — panel tarafı (panel.growtify.ai içinde, community-i18n.js yükler).
// 1) Sol menüde "Üyelikler" altına, Kurslar'ın arkasına "Çalışma Dosyam" ekler — yalnız programa kayıtlı
//    üyeye (growtify.ai/api/dosyam/hak ile sorulur; ücretsiz üye görmez).
// 2) Derslerdeki statik growtify.ai/dosyam bağlantılarını (ör. /dosyam/R2) üyenin kendi oturumuyla açar.
// Kimlik: growtify.ai öğrenciyi kendi oturumuyla tanır (bir kez e-posta koduyla giriş, program boyunca hatırlanır).
// Panel kişisinin kimliği yalnız İPUCU olarak gider (k): görünürlük ve kodun kişinin kendi e-postasına
// kendiliğinden gönderilmesi için; giriş kanıtı değildir. (Panel 2026-09'da Firebase'den kendi oturumuna geçti.)
(function () {
  "use strict";
  var BASE = "https://growtify.ai";
  var ITEM_ID = "cp-portal-sidebar-nav-dosyam";
  var LINK_RE = /^https?:\/\/(www\.)?growtify\.ai\/dosyam(\/([A-Z_]{1,16}[0-9]{0,2}[A-Z]?))?\/?$/;
  var hak = null; // null = sorulmadı, true/false = cevap
  var soruluyor = false;

  function kisi() {
    return typeof window.gaiPanelKisi === "function" ? window.gaiPanelKisi() : "";
  }

  function ac(bolum) {
    var k = kisi();
    var url = BASE + "/dosyam" + (bolum ? "/" + encodeURIComponent(bolum) : "") + (k ? "?k=" + encodeURIComponent(k) : "");
    window.open(url, "_blank", "noopener");
  }

  function hakSor() {
    if (hak !== null || soruluyor) return;
    var k = kisi();
    if (!k) return;
    soruluyor = true;
    fetch(BASE + "/api/dosyam/hak", { method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify({ k: k }) })
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (j) {
        // Ağ hatasında tekrar sorulabilsin; kesin cevap saklanır.
        if (j && typeof j.ok === "boolean") hak = j.ok;
      })
      .catch(function () {})
      .then(function () {
        soruluyor = false;
      });
  }

  var IKON =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0 h-4 w-4 text-inherit" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 13h4"/><path d="M10 17h4"/></svg>';

  function menuyeEkle() {
    if (hak !== true || document.getElementById(ITEM_ID)) return;
    var kurslar = document.getElementById("cp-portal-sidebar-nav-courses");
    var li = kurslar && kurslar.closest("li");
    if (!li) return;
    var yeni = li.cloneNode(true);
    var a = yeni.querySelector("a");
    a.id = ITEM_ID;
    a.removeAttribute("href");
    a.removeAttribute("aria-current");
    a.setAttribute("role", "link");
    a.setAttribute("tabindex", "0");
    a.className = a.className.replace(/\b(router-link-active|router-link-exact-active|is-active|active)\b/g, "");
    var svg = a.querySelector("svg");
    if (svg) svg.outerHTML = IKON;
    var etiket = a.querySelector(".hr-text") || a.querySelector(".app-sidebar-nav-item__label") || a;
    etiket.textContent = "Çalışma Dosyam";
    a.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      ac("");
    });
    a.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        ac("");
      }
    });
    li.parentNode.insertBefore(yeni, li.nextSibling);
  }

  // Derslerdeki bağlantılar: tıklayınca üyenin oturumuyla aç.
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a) return;
      var m = a.href.match(LINK_RE);
      if (!m) return;
      e.preventDefault();
      e.stopPropagation();
      ac(m[3] || "");
    },
    true
  );

  function dongu() {
    hakSor();
    menuyeEkle();
  }
  dongu();
  // Panel tek sayfalık uygulama: menü yeniden çizilince düğme geri eklenir.
  setInterval(dongu, 1000);
})();
