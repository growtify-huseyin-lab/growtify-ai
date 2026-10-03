/* Growtify.app CRM — İngilizce metin kataloglarını toplama (tarayıcı konsolunda çalıştır).
 *
 * 1) CRM'de (app.gohighlevel.com veya admin.growtify.app) bir alt hesaba gir, bu betiği konsola yapıştır.
 * 2) Çevirmek istediğin bölümleri sırayla aç (Sohbetler, Kişiler, Fırsatlar, Takvim…); her sayfada
 *    __crmCollect() çalıştır. Alt uygulamalar kendi metinlerini ancak açılınca yükler.
 * 3) __crmDownload() → crm-katalog-en.json İndirilenler'e iner (yalnız arayüz metni, müşteri verisi yok).
 *
 * Katalog anahtarı: ana uygulama (#app) = "shell"; alt uygulamalar = "<locale>|<ilk 6 üst anahtar>".
 */
window.__crmCat = window.__crmCat || {};
window.__crmCollect = function () {
  var seen = [];
  var deep = function (t, s) {
    for (var k in s) {
      var x = s[k];
      if (x && typeof x === "object") {
        t[k] = t[k] && typeof t[k] === "object" ? t[k] : {};
        deep(t[k], x);
      } else t[k] = x;
    }
  };
  document.querySelectorAll("#app, [data-v-app]").forEach(function (r) {
    var app = r.__vue_app__;
    if (!app) return;
    var prov = app._context.provides;
    Object.getOwnPropertySymbols(prov).some(function (s) {
      var v = prov[s];
      if (!(v && v.global && typeof v.global.getLocaleMessage === "function")) return false;
      var g = v.global;
      var loc = g.locale.value;
      var m = JSON.parse(JSON.stringify(g.getLocaleMessage(loc)));
      var fp = r.id === "app" ? "shell" : loc + "|" + Object.keys(m).sort().slice(0, 6).join(",");
      var tgt = (window.__crmCat[fp] = window.__crmCat[fp] || { locale: loc, messages: {} });
      deep(tgt.messages, m);
      seen.push(fp);
      return true;
    });
  });
  return seen;
};
window.__crmDownload = function () {
  var json = JSON.stringify({ collectedAt: new Date().toISOString(), instances: window.__crmCat });
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
  a.download = "crm-katalog-en.json";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 5000);
  return json.length + " bytes";
};
__crmCollect();
