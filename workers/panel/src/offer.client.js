/*
 * panel.growtify.ai/courses/offers/* — GROWT satın alma sayfası için Türkçe katman.
 * Worker bu betiği yalnız teklif sayfalarında, <head>'in en başına satır içi gömer.
 *
 * GHL'in teklif ödeme uygulaması (live-membership-preview) 13 dil destekliyor, Türkçe yok.
 * Teklifin GHL ayarındaki eski çeviri kodu (TR Localization v8.4) GHL güncellemesinden sonra
 * çalışmıyor; bu betik onun yerini alır ve GHL'in özel kod kutusuna bağlı değildir.
 *
 *   1) Stripe kart alanları Türkçe (locale "tr")
 *   2) Uygulamanın kendi çeviri sistemine (vue-i18n) Türkçe metinler
 *   3) Kod içine gömülü İngilizce doğrulama mesajları (tam eşleşme)
 *   4) Telefon varsayılanı Türkiye (GHL lokasyon ülkesi GB olduğu için İngiltere açılıyordu)
 *   5) Tutarlar "TL9999.00" → "9.999,00 TL"
 *   6) Şartlar linki growtify-ai.vercel.app → growtify.ai
 *   7) Türkçe oturunca sayfayı görünür yap (offer.css 3,5 sn'de her koşulda açar)
 *
 * Hitap "sen" — GROWT programının dili ve eski v8.4 çevirisiyle aynı.
 * Güvenlik ilkesi: her adım try/catch içinde; bir şey ters giderse sayfa İngilizce kalır,
 * satın alma akışı etkilenmez.
 */
(function () {
  if (window.__gaiOfferTR) return;
  window.__gaiOfferTR = true;

  // ---------------------------------------------------------------------------
  // 1) Stripe: yüklenmeden önce kancayı kur, dili 'tr' yap. Görünüm ayarına dokunma
  //    (odeme.growtify.app'te appearance/fonts vermek kart alanlarını boş bırakmıştı).
  // ---------------------------------------------------------------------------
  function wrapStripe(S) {
    if (typeof S !== "function" || S.__gaiWrapped) return S;
    var W = function (key, opts) {
      var o = {};
      try { o = Object.assign({}, opts || {}, { locale: "tr" }); } catch (e) { o = opts; }
      var inst = S.call(this, key, o);
      try {
        var origElements = inst && inst.elements;
        if (typeof origElements === "function") {
          inst.elements = function (elOpts) {
            var args = Array.prototype.slice.call(arguments);
            try { args[0] = Object.assign({}, elOpts || {}, { locale: "tr" }); } catch (e) {}
            return origElements.apply(this, args);
          };
        }
      } catch (e) {}
      return inst;
    };
    try { Object.keys(S).forEach(function (k) { W[k] = S[k]; }); } catch (e) {}
    W.__gaiWrapped = true;
    return W;
  }
  try {
    if (typeof window.Stripe === "function") {
      window.Stripe = wrapStripe(window.Stripe);
    } else {
      var storedStripe;
      Object.defineProperty(window, "Stripe", {
        configurable: true,
        enumerable: true,
        get: function () { return storedStripe; },
        set: function (v) { storedStripe = wrapStripe(v); },
      });
    }
  } catch (e) {}

  // ---------------------------------------------------------------------------
  // 2) Uygulama metinleri — GHL'in kendi anahtarları (live-membership-preview, en).
  //    `{'@'}`: vue-i18n'de @ özel karakter, düz yazmak için bu biçim gerekiyor.
  // ---------------------------------------------------------------------------
  var TR = {
    checkout: {
      remote: { bootstrapError: "Ödeme sayfası yüklenemedi." },
      form: {
        email: "E-posta Adresin",
        emailPlaceholder: "ornek{'@'}eposta.com",
        fullName: "Ad Soyad",
        fullNamePlaceholder: "Adın Soyadın",
        phoneNumber: "Telefon Numaran",
        phonePlaceholder: "5XX XXX XX XX",
        address: "Adres (sokak, bina, daire)",
        addressPlaceholder: "Örn: Atatürk Cad. No:10 D:5",
        city: "Şehir",
        cityPlaceholder: "İstanbul",
        state: "İl / Eyalet",
        statePlaceholder: "İl",
        zipCode: "Posta Kodu",
        zipCodePlaceholder: "Posta kodu",
        country: "Ülke",
        countryPlaceholder: "Türkiye",
        termsAgreementRequired: "Bu sayfanın şartlarını ve koşullarını okudum ve kabul ediyorum.",
        agreementRequired: "Devam etmek için şartları kabul etmelisin.",
        proceedToCheckout: "Ödemeye Geç",
        saferPayment: "Güvenli ve kolay ödeme yöntemi",
        billingAddress: "Fatura Adresi",
      },
      payment: {
        information: "Ödeme Bilgileri",
        checkoutButton: "Ödemeye Geç",
        errors: { clientSecretMissing: "Ödeme hazırlanamadı, lütfen tekrar dene." },
      },
      button: {
        checkout: "Ödemeye Geç",
        login: "Giriş yapmak için tıkla!",
        noThanks: "Hayır teşekkürler, satın aldığım içeriğe git",
        enrollFor: "Kaydol:",
      },
      message: { alreadyPurchased: "Bu teklifi zaten satın aldın!" },
      title: { courseDescription: "Kurs Açıklaması", courseCurriculum: "Kurs İçeriği" },
      label: {
        totalAmount: "Toplam Tutar",
        dayTrial: "günlük deneme",
        subtotal: "Ara Toplam",
        setupFee: "Kurulum Ücreti",
        trial: "Deneme",
        dueNow: "Şimdi Ödenecek",
        total: "Toplam Tutar",
      },
      tax: {
        addressRequired: "Bu işletmede otomatik vergi açık olduğu için adres bilgisi gerekiyor.",
        label: "Vergi",
        calculating: "Hesaplanıyor...",
        stateDropdownPlaceholder: "İl / eyalet seç",
      },
      tooltip: { subtotalDeduction: "Bu ara toplam, deneme süresi bitince tahsil edilir" },
      coupon: {
        label: "Kupon Kodun (Varsa)",
        placeholder: "Kupon kodun (varsa)",
        apply: "Uygula",
        discount: "İndirim",
        modal: { title: "Kupon Uygula", apply: "Kuponu Uygula" },
      },
      draftMode: {
        title: "Bu teklif şu an taslak durumunda.",
        description: "Durumunu yayında yapana kadar müşteriler bu sayfayı göremez.",
      },
    },
    payment: {
      failed: { title: "Ödeme başarısız!", description: "Lütfen tekrar dene." },
      amount_to_be_paid: "Ödenecek Tutar",
      enter_card_details: "Kart Bilgilerini Gir",
      no_payment_required: "Ödeme gerekmiyor. Kaydını tamamlamak için onayla.",
      saved_cards: "Kayıtlı kartlar",
      new_card: "Yeni kart",
      cardIcon: "Kart simgesi",
      secure_payment_message: "*%100 güvenli ödeme*",
      confirm_payment: "Ödemeyi Onayla",
      dashboard_button: "Programa Başla",
      coupon: {
        have_coupon: "Kuponun var mı? Tıkla",
        remove_applied: "Kuponu kaldır",
        discount_applied: "İndirim uygulandı (kupon)",
      },
      thank_you: {
        signup: "Kaydın için teşekkürler!",
        signup_kollab: "Kursa kaydın için teşekkürler",
        purchase: "Satın aldığın için teşekkürler!",
        credentials_sent: "Erişimin açıldı! Giriş bilgilerini e-postana gönderdik; şifreni belirleyip hemen başlayabilirsin.",
      },
      v2: {
        recaptcha: { verification_failed: "Doğrulama başarısız! Lütfen tekrar dene" },
        errors: {
          payment_element_not_ready: "Ödeme alanı henüz hazır değil",
          processing_payment: "Ödeme işlenirken bir hata oluştu",
        },
        warning_icon_alt: "Uyarı",
        custom_provider: { pay_button: "Ödeme altyapısıyla öde" },
      },
      stripe: {
        card_number: "Kart Numarası",
        expiry_date: "Son Kullanma Tarihi",
        cvc: "CVC",
        errors: {
          load_failed: "Ödeme altyapısı yüklenemedi",
          incomplete_info: "Kart bilgilerin eksik",
        },
      },
    },
    upsellCheckout: { loading: { message: "Yükleniyor..." }, payment: { form: "Ödeme Formu" } },
    common: {
      loading: "Yükleniyor...",
      error: "Bir hata oluştu",
      success: "Başarılı",
      close: "Kapat",
      cancel: "İptal",
      back: "Geri",
      next: "İleri",
      submit: "Gönder",
      continue: "Devam Et",
      retry: "Tekrar Dene",
      thankYou: "Teşekkürler",
      button: { cancel: "İptal", proceed: "Ödemeye Geç" },
      adminMode: "Yönetici modunda önizliyorsun",
      adminModeViewContent: "İçeriği Gör (Kilitsiz)",
      adminModeHideContent: "İçeriği Gizle",
      logo: { alt: "Logo" },
      image: { brandLogo: "Marka logosu", offerPoster: "Teklif görseli" },
    },
  };
  var SENTINEL = "checkout.form.proceedToCheckout";

  // Kodun içine gömülü (çeviri sistemine girmeyen) İngilizce metinler — tam eşleşme.
  var HARD = {
    "Please input your email": "E-posta adresini gir",
    "Please enter valid email": "Geçerli bir e-posta adresi gir",
    "Please input your full name": "Adını soyadını gir",
    "You forgot to enter phone number": "Telefon numaranı girmeyi unuttun",
    "Phone number can only contain numbers": "Telefon numarası sadece rakam içerebilir",
    "Please ensure that your phone number contains characters as per country code before proceeding.":
      "Telefon numaranın seçili ülke koduna uygun olduğundan emin ol, sonra devam et.",
    "Please accept the agreement": "Devam etmek için şartları kabul etmelisin",
    "Please input your address": "Adresini gir",
    "Please input your city": "Şehrini gir",
    "Please input your state": "İlini gir",
    "Please input your zip code": "Posta kodunu gir",
    "Please select your country": "Ülkeni seç",
    "Please select your state": "İlini seç",
    "Client secret missing! Payment setup failed, try again!": "Ödeme hazırlanamadı, lütfen tekrar dene.",
    "Something went wrong": "Bir şeyler ters gitti",
    "Invalid coupon code": "Geçersiz kupon kodu",
    "Invalid coupon": "Geçersiz kupon",
    "Coupon code is not valid": "Kupon kodu geçerli değil",
    "Coupon is not valid": "Kupon geçerli değil",
    "Coupon not found": "Kupon bulunamadı",
    "Coupon expired": "Kuponun süresi dolmuş",
    "Coupon has expired": "Kuponun süresi dolmuş",
    "Coupon code is expired": "Kuponun süresi dolmuş",
    "Coupon code has expired": "Kuponun süresi dolmuş",
    "Coupon code not found": "Kupon kodu bulunamadı",
    "Coupon code is not applicable": "Bu kupon bu ürün için geçerli değil",
    "Coupon is not applicable": "Bu kupon bu ürün için geçerli değil",
    "Coupon code is already used": "Bu kupon daha önce kullanılmış",
    "Coupon limit reached": "Kuponun kullanım sınırı dolmuş",
    "Test Mode": "Test Modu",
  };
  // GHL'den gelen, listede olmayan diğer kupon hataları İngilizce kalmasın.
  var COUPON_FALLBACK_RE = /^Coupon\b[^.]{0,80}\b(?:expired|invalid|not|limit|used|exceed\w*|applicable|found|already|reached|maximum)\b[^.]{0,40}\.?$/i;
  var COUPON_FALLBACK_TR = "Bu kupon kodu kullanılamıyor";

  // Sayfadaki Vue uygulamalarının vue-i18n örnekleri (Vue 3 bağlama noktasına data-v-app koyar).
  function findI18nGlobals() {
    var out = [];
    try {
      var roots = document.querySelectorAll("[data-v-app]");
      for (var i = 0; i < roots.length; i++) {
        var app = roots[i].__vue_app__;
        var prov = app && app._context && app._context.provides;
        if (!prov) continue;
        var keys = Object.getOwnPropertySymbols(prov).concat(Object.keys(prov));
        for (var j = 0; j < keys.length; j++) {
          var v = prov[keys[j]];
          var g = v && v.global;
          if (g && typeof g.mergeLocaleMessage === "function" && out.indexOf(g) < 0) out.push(g);
        }
      }
    } catch (e) {}
    return out;
  }

  function localeOf(g) {
    return g.locale && typeof g.locale === "object" ? g.locale.value : g.locale;
  }

  // Mesajlar sonradan yeniden yüklenirse Türkçe aynı anda geri gelsin.
  function patch(g) {
    if (g.__gaiMerge) return;
    var merge = g.mergeLocaleMessage;
    g.__gaiMerge = merge;
    ["mergeLocaleMessage", "setLocaleMessage"].forEach(function (fn) {
      var orig = g[fn];
      if (typeof orig !== "function") return;
      g[fn] = function (loc) {
        var r = orig.apply(this, arguments);
        try { if (loc === "en") merge.call(g, "en", TR); } catch (e) {}
        return r;
      };
    });
  }

  var translated = false;
  function applyMessages() {
    var globals = findI18nGlobals();
    for (var i = 0; i < globals.length; i++) {
      var g = globals[i];
      try {
        if (localeOf(g) !== "en") continue; // GHL'de başka dil seçilmişse dokunma
        // Yalnız teklif ödeme uygulaması (portal kabuğunun i18n'i bu anahtarı taşımıyor)
        if (typeof g.te === "function" && !g.te(SENTINEL, "en") && g.t(SENTINEL) === SENTINEL) continue;
        patch(g);
        if (g.t(SENTINEL) !== TR.checkout.form.proceedToCheckout) g.__gaiMerge.call(g, "en", TR);
        if (g.t(SENTINEL) === TR.checkout.form.proceedToCheckout) translated = true;
      } catch (e) {}
    }
  }

  // ---------------------------------------------------------------------------
  // 3) + 5) Metin düğümleri: gömülü İngilizce mesajlar ve tutar biçimi.
  // ---------------------------------------------------------------------------
  var AMOUNT_RE = /(^|[\s(])(-?)TL\s?(-?)(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?(?![\d.,])/g;
  function trAmount(m, lead, sign1, sign2, intPart, dec) {
    var grouped = intPart.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var frac = dec === undefined ? "" : "," + (dec.length === 1 ? dec + "0" : dec);
    return lead + (sign1 || sign2) + grouped + frac + " TL";
  }
  function fixTextNodes(root) {
    try {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      var n;
      while ((n = w.nextNode())) {
        var v = n.nodeValue;
        if (!v || !v.trim()) continue;
        var key = v.trim();
        if (Object.prototype.hasOwnProperty.call(HARD, key)) {
          n.nodeValue = v.replace(key, HARD[key]);
          continue;
        }
        if (COUPON_FALLBACK_RE.test(key)) {
          n.nodeValue = v.replace(key, COUPON_FALLBACK_TR);
          continue;
        }
        if (v.indexOf("TL") >= 0) {
          var nv = v.replace(AMOUNT_RE, trAmount);
          if (nv !== v) n.nodeValue = nv;
        }
      }
    } catch (e) {}
  }

  // ---------------------------------------------------------------------------
  // 4) Telefon varsayılanı Türkiye. Telefon alanı seçili ülkeyi kendi içinde tutuyor (dışarıdan
  //    countryCode değişikliğini izlemiyor); bu yüzden kullanıcı listeden ülke seçtiğinde çalışan
  //    işleyicinin aynısını çağırıyoruz — bayrak, örnek numara ve doğrulama birlikte Türkiye olur.
  //    Yalnız bir kez ve alan boşken; kullanıcı sonra başka ülke seçerse dokunulmaz.
  // ---------------------------------------------------------------------------
  var phoneDone = false;
  function findComponents(pred) {
    // Üretim derlemesinde app._instance yok; kök bileşene bağlama noktasının _vnode'u üzerinden ulaşılır.
    var el = document.getElementById("remote-membership-preview-mount");
    var root = (el && el._vnode && el._vnode.component) || (el && el.__vue_app__ && el.__vue_app__._instance);
    var found = [];
    if (!root) return found;
    var stack = [root.subTree];
    var guard = 0;
    while (stack.length && guard++ < 20000) {
      var v = stack.pop();
      if (!v || typeof v !== "object") continue;
      var c = v.component;
      if (c) {
        if (pred(c)) found.push(c);
        stack.push(c.subTree);
      }
      if (v.suspense && v.suspense.activeBranch) stack.push(v.suspense.activeBranch);
      if (Array.isArray(v.children)) for (var i = 0; i < v.children.length; i++) stack.push(v.children[i]);
    }
    return found;
  }
  function setPhoneTR() {
    if (phoneDone) return;
    try {
      var form = findComponents(function (c) {
        return c.data && Object.prototype.hasOwnProperty.call(c.data, "phoneNumberCountry") && c.data.formValue;
      })[0];
      if (!form) return;
      var d = form.data;
      if (d.phoneNumberCountry === "TR" || (d.formValue && d.formValue.phoneNumber)) { phoneDone = true; return; }
      var picker = findComponents(function (c) {
        return c.type && c.type.__name === "dropdownComp" && c.vnode && c.vnode.props && typeof c.vnode.props.onOnSelect === "function";
      })[0];
      if (!picker) return;
      phoneDone = true;
      picker.vnode.props.onOnSelect({ code: "TR", phoneCode: "+90", name: "Turkey" });
    } catch (e) {}
  }

  // ---------------------------------------------------------------------------
  // Sol taraf (CEO 2026-10-01): teklif görseli yerine Growtify panel kapağı + açıklamadan tek paragraf.
  // Kapak: panel topluluğunun kapağı ("Yapay Zekayla Büyüyenlerin Topluluğu"). Paragraf GHL'deki
  // açıklamadan metin eşleşmesiyle seçilir; bulunamazsa açıklama tamamen gizli kalır (offer.css).
  // ---------------------------------------------------------------------------
  var COVER_URL =
    "https://assetsdrm.clientclub.net/images/client-portal/gcs_revex-client-portal-production/e8ZRRmOybS08x5L6qgsS/users/8bf2eeca-f81a-41ed-b776-d7096886d11b?fmt=webp&qlt=90&wdt=1280&rsz=fill";
  var COVER_ALT = "Growtify — Yapay Zekayla Büyüyenlerin Topluluğu";
  var LEAD_START = "Yapay zeka kursu satmıyoruz";
  function fixLeftSide() {
    try {
      var img = document.getElementById("offer-poster-image");
      if (img && img.getAttribute("src") !== COVER_URL) {
        img.removeAttribute("srcset");
        img.setAttribute("src", COVER_URL);
        img.setAttribute("alt", COVER_ALT);
      }
      var copy = document.getElementById("offer-checkout-copy");
      if (copy && !copy.querySelector(".gai-lead")) {
        var ps = copy.querySelectorAll("p");
        for (var i = 0; i < ps.length; i++) {
          if ((ps[i].textContent || "").trim().indexOf(LEAD_START) === 0) {
            ps[i].classList.add("gai-lead");
            break;
          }
        }
      }
    } catch (e) {}
  }

  // ---------------------------------------------------------------------------
  // Kupon linkle gelir: quizdeki buton ?coupon=KOD ekler (KOD kişiye özel, tek kullanımlık GHL kuponu).
  // Alan doldurulup "Uygula"ya basılır — kullanıcının yapacağının aynısı. Bir kez; kullanıcı kuponu
  // kaldırırsa tekrar uygulanmaz. Telefonun TR'ye geçmesiyle başlayan yeniden hesap bitsin diye kısa beklenir.
  // ---------------------------------------------------------------------------
  var COUPON = (function () {
    try {
      var q = new URLSearchParams(location.search);
      var c = (q.get("coupon") || q.get("kupon") || "").trim().toUpperCase();
      return /^[A-Z0-9]{4,24}$/.test(c) ? c : "";
    } catch (e) {
      return "";
    }
  })();
  var couponState = COUPON ? "waiting" : "none"; // waiting → filled → clicked
  var couponReadyAt = 0;
  function applyCouponFromUrl() {
    if (couponState === "none" || couponState === "clicked") return;
    try {
      var wrap = document.getElementById("coupon-code");
      var input = wrap && wrap.querySelector("input");
      var btn = document.getElementById("coupon-apply");
      if (!input || !btn) return;
      if (!couponReadyAt) couponReadyAt = Date.now() + 1200;
      if (Date.now() < couponReadyAt) return;
      if (couponState === "waiting") {
        var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        setter.call(input, COUPON);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        couponState = "filled";
        return; // Vue butonu bir sonraki turda etkinleştirir
      }
      if (couponState === "filled" && !btn.disabled && btn.className.indexOf("n-button--disabled") < 0) {
        couponState = "clicked";
        btn.click();
      }
    } catch (e) {}
  }

  // 6) Şartlar linki: GHL ayarında eski vercel adresi kayıtlı.
  function fixLegalLinks() {
    try {
      var as = document.querySelectorAll('a[href*="growtify-ai.vercel.app"]');
      for (var i = 0; i < as.length; i++) as[i].href = as[i].href.replace("growtify-ai.vercel.app", "growtify.ai");
    } catch (e) {}
  }

  // ---------------------------------------------------------------------------
  // 7) Hazır olunca göster + düzenli/olay tabanlı kontrol.
  // ---------------------------------------------------------------------------
  var TITLE = "Güvenli Ödeme | Growtify";
  var ready = false;
  function markReady() {
    if (ready) return;
    ready = true;
    try { document.documentElement.classList.add("gai-ready"); } catch (e) {}
  }
  setTimeout(markReady, 4000);

  function pass() {
    applyMessages();
    var mount = document.getElementById("remote-membership-preview-mount");
    if (translated && mount) {
      fixTextNodes(mount);
      var tp = document.getElementById("teleports");
      if (tp) fixTextNodes(tp);
      setPhoneTR();
      fixLegalLinks();
      fixLeftSide();
      markReady();
      applyCouponFromUrl();
    }
    try {
      if (document.documentElement.lang !== "tr") document.documentElement.lang = "tr";
      if (document.title !== TITLE) document.title = TITLE;
    } catch (e) {}
  }

  // DOM değişince (ödeme penceresi açılması, hata mesajı, kupon) aynı görevde düzelt — boyamadan önce.
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    Promise.resolve().then(function () { queued = false; pass(); });
  }
  function observe() {
    if (!document.body || typeof MutationObserver !== "function") return false;
    new MutationObserver(schedule).observe(document.body, { subtree: true, childList: true, characterData: true });
    return true;
  }
  if (!observe()) document.addEventListener("DOMContentLoaded", observe);

  var start = Date.now();
  (function loop() {
    pass();
    var age = Date.now() - start;
    setTimeout(loop, age < 3000 ? 50 : age < 20000 ? 250 : 2000);
  })();
})();
