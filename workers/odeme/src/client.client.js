/*
 * odeme.growtify.app — GHL ödeme sayfası (ödeme linki / fatura / teklif) için Türkçe katman.
 * Worker bu betiği <head>'in en başına satır içi gömer; diğer tüm betiklerden önce çalışır.
 *
 * GHL'in ödeme sayfası 13 dili destekliyor ama Türkçe yok. Bu betik:
 *   1) Stripe kart alanlarını Türkçe ve marka renkleriyle açar,
 *   2) sayfanın kendi çeviri sistemine (vue-i18n) Türkçe metinleri ekler,
 *   3) çeviri oturunca sayfayı görünür yapar (İngilizce metin bir an bile görünmesin diye).
 *
 * Güvenlik ilkesi: her adım try/catch içinde. Bir şey ters giderse sayfa İngilizce
 * görünür, ödeme akışı etkilenmez. brand.css ayrıca 3,5 sn sonra sayfayı her koşulda açar.
 */
(function () {
  if (window.__gaiPayI18n) return;
  window.__gaiPayI18n = true;

  // ---------------------------------------------------------------------------
  // 1) Stripe kart alanları: Stripe yüklenmeden önce kancayı kur, dili 'tr' yap.
  //    Yalnız dil değişir. Stripe'a appearance/fonts vermeyi denedik: kart alanları boş
  //    çiziliyor (2026-10-01) — ödeme riskine girmemek için Stripe'ın görünümüne dokunmuyoruz.
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
      var stored;
      Object.defineProperty(window, "Stripe", {
        configurable: true,
        enumerable: true,
        get: function () { return stored; },
        set: function (v) { stored = wrapStripe(v); },
      });
    }
  } catch (e) {}

  // ---------------------------------------------------------------------------
  // 2) Sayfa metinleri: GHL'in İngilizce (en_US) mesajlarının üzerine Türkçeyi yaz.
  //    Anahtarlar GHL'in kendi mesaj anahtarları; eksik kalan İngilizce görünür.
  //    Hitap: ödeme sayfalarında yaygın olan "siz" (GHL'deki onay metniyle aynı).
  // ---------------------------------------------------------------------------
  var TR = {
    common: {
      subtotal: "Ara toplam",
      cancel: "İptal",
      processing: "İşleniyor",
      pay: "Ödeme Yap",
      donate: "Bağış Yap",
      book: "Randevu Al",
      submit: "Gönder",
      error: "Bir sorun oluştu, lütfen daha sonra tekrar deneyin.",
      code: "Kod",
      status: "Durum",
      day: "gün | gün",
      week: "hafta | hafta",
      month: "ay | ay",
      year: "yıl | yıl",
      minute: "dakika",
      createdAt: "Oluşturulma tarihi",
      apply: "Uygula",
      remove: "Kaldır",
      free: "ücretsiz",
      noPaymentMethod: "Geçerli bir ödeme yöntemi bulunamadı",
      completedOn: "Tamamlanma tarihi",
      errors: {
        somethingWentWrong: "Bir sorun oluştu",
        errorOccurred: "Bir hata oluştu",
      },
      chars: "Karakter",
    },
    paymentLink: {
      error: "Aradığınız ödeme bağlantısı bulunamadı.",
      productDetails: "Ürün Detayları",
      validation: {
        firstName: "Ad zorunludur",
        lastName: "Soyad zorunludur",
        address: "Adres zorunludur",
        city: "Şehir zorunludur",
        state: "İl / eyalet zorunludur",
        countryCode: "Ülke zorunludur",
        postalCode: "Posta kodu zorunludur",
        phoneRequried: "Telefon numarası zorunludur",
        phoneChars: "Telefon numarası yalnızca rakam içerebilir",
        phoneCountryCode: "Devam etmeden önce telefon numaranızın seçili ülke koduna uygun olduğundan emin olun",
        email: "E-posta zorunludur",
        validEmail: "Lütfen geçerli bir e-posta adresi girin",
        qtyRange: "Adet {minQty} ile {maxQty} arasında olmalıdır",
        selectAtLeastOneProduct: "Lütfen en az bir ürün seçin",
      },
      qty: "Adet",
      additionalSetupFee: "Tek seferlik kurulum ücreti",
      afterTrialText: "Deneme süreniz bittiğinde tahsil edilecek tutar:",
      afterTrialCancellationText: "Bu tarihten önce dilediğiniz zaman iptal edebilirsiniz.",
      subscriptionTextPrefix: "Aboneliğinizi onaylayarak,",
      subscriptionTextSuffix: "adlı işletmenin gelecekteki ödemeleri kendi şartları doğrultusunda sizden tahsil etmesine izin vermiş olursunuz. Aboneliğinizi dilediğiniz zaman iptal edebilirsiniz.",
      firstName: "Ad",
      lastName: "Soyad",
      email: "E-posta",
      phone: "Telefon",
      address: "Adres",
      addressLine1: "Adres satırı 1",
      addressLine2: "Adres satırı 2",
      city: "Şehir",
      state: "İl / Eyalet",
      country: "Ülke",
      postalCode: "Posta kodu",
      paymentSuccessful: "Ödemeniz başarıyla alındı! Bizi tercih ettiğiniz için teşekkür ederiz. İşleminiz onaylandı.",
      paymentProcessing: "Ödemeniz işleniyor! Bizi tercih ettiğiniz için teşekkür ederiz. İşleminiz bankanın onayını bekliyor.",
      thanksText: "Ödemeniz için teşekkürler",
      redirected: "Yönlendiriliyorsunuz...",
      redirectionText: "Kısa süre içinde şu adrese yönlendirileceksiniz:",
      redirectionText2: "{seconds} saniye içinde otomatik olarak yönlendirilmezseniz,",
      clickHere: "buraya tıklayın",
      notification: {
        errorPayment: "Ödeme sırasında bir hata oluştu",
        orderSuccessful: "Siparişiniz başarıyla oluşturuldu",
        orderInProcess: "Siparişiniz bankanın onayını bekliyor",
        invalidCoupon: "Geçersiz kupon kodu",
        invalidProductsTitle: "Bazı ürünler kullanılamıyor",
        invalidProductsMessage: "Bu bağlantıda geçersiz ürünler var. Lütfen satıcıyla iletişime geçin.",
      },
      per: "her",
      then: "Ardından",
      free: "ücretsiz",
      day: "gün",
      days: "gün",
      discount: "İndirim (kupon)",
      subtotal: "Ara toplam",
      subtotalAfterDiscount: "İndirim sonrası ara toplam",
      taxes: "Vergiler",
      priceAfterTrial: "Deneme sonrası {currency}{price} / {interval}",
      paypal: {
        multiRecurringError: "PayPal, abonelik ürünlerinde birden fazla adeti desteklemiyor",
        zeroCheckoutError: "PayPal ile sıfır tutarlı ödeme yapılamıyor",
      },
      selectProduct: "Ürün Seçin",
      recurringProducts: "Abonelik",
      oneTimeProducts: "Tek Seferlik Ürünler",
      selectedProducts: "Seçilen Ürünler",
      setupFee: "Kurulum Ücreti",
      total: "Toplam",
      totalAfterTrial: "Deneme sonrası toplam",
      totalDueToday: "Bugün ödenecek toplam",
      placeholders: { enterCouponCode: "Kupon kodunu girin" },
      errors: {
        paymentProcessError: "Ödeme işlemi sırasında bir hata oluştu",
        invalidPaymentLink: "Geçersiz ödeme bağlantısı",
        somethingWentWrong: "Bir sorun oluştu",
      },
    },
    invoice: {
      INVOICE: "FATURA",
      loading: "Yükleniyor...",
      contactDetailsSection: { billedTo: "Fatura edilen" },
      invoiceDetailsSection: { invoiceNo: "Fatura No", issueDate: "Düzenlenme Tarihi", dueDate: "Son Ödeme Tarihi" },
      invoicePayButton: { paid: "Ödendi", pay: "Ödeme Yap", processing: "Ödeme işleniyor" },
      invoiceItemsList: { itemName: "Ürün / Hizmet", price: "Fiyat", qty: "Adet" },
      orderSummary: {
        paymentSummaryLabel: "Ödeme özeti",
        amountDue: "Ödenecek Tutar",
        taxes: "Vergiler",
        discount: "İndirim",
        shipping: "Kargo",
        tax: "Vergi",
        includedInPrices: "fiyatlara dahil",
        taxSummary: "{taxName} ({taxableAmount} üzerinden %{taxRate})",
        taxSummaryInclusive: "{taxName} (%{taxRate} - fiyatlara dahil)",
      },
      amountPaid: "Ödenen Tutar",
      generatedOn: "Oluşturulma tarihi",
      generatingInvoicePDF: "Fatura PDF'i hazırlanıyor",
      generatingReceiptPDF: "Makbuz PDF'i hazırlanıyor",
      error: "Aradığınız fatura bulunamadı.",
      errorDraftInvoice: "Taslak fatura ödenemez",
      receipt: { RECEIPT: "MAKBUZ", receiptNo: "Makbuz No", datePaid: "Ödeme Tarihi", error: "Aradığınız makbuz bulunamadı." },
      download: { clickHere: "Buraya tıklayarak", toDownloadPDF: "PDF'i indirebilirsiniz" },
      clickHereToMakePaymentNow: "Ödemeyi şimdi yapmak için buraya tıklayın!",
      paymentProcessing: "Ödeme İşleniyor",
      initiatedOn: "ACH ödemesinin başlatıldığı tarih:",
      paymentInProgress: "Ödeme devam ediyor",
      PAID: "ÖDENDİ",
      termsAndNotes: "Şartlar ve Notlar",
      total: "Toplam",
      partialPayment: {
        minAmountValidation: "Ödenebilecek en düşük tutar: ",
        amountValidation: "Ödenecek tutar, kalan fatura tutarından fazla olamaz",
        amountToBePaid: "Ödenecek tutar",
        editPartiallyTooltip: "Faturayı kısmen ödemek için düzenleyin",
        editPartiallyPlaceholder: "Tutar girin",
      },
      paymentSchedule: {
        choosePayments: "Ödemeleri Seçin",
        scheduleLabelWithAmount: "Taksit {number}/{total} - {suffix}",
        scheduleLabel: "Ödeme {number}/{total}",
        scheduleDue: "Son ödeme: {dueDate}",
        validation: {
          required: "Lütfen en az bir ödeme seçin",
          ordered: "Lütfen ödemeleri sırayla seçin",
        },
      },
      tips: {
        tipLabel: "Bahşiş Ekle",
        tipDescription: "İsterseniz bahşiş bırakarak bu işletmeye teşekkür edebilirsiniz",
        tipCollected: "Bahşiş Alındı",
        inputTooltip: "Bahşiş tutarını girin",
        tippingVaueLabel: "Bahşiş Tutarı",
        none: "Yok",
        other: "Diğer",
      },
      lateFees: { applicable: "Gecikme Ücreti Uygulanır", charge: "Gecikme Ücreti" },
      miscellaneousCharges: "Diğer Ücretler",
      additionalChargesApplicable: "Ek Ücretler Uygulanır",
      status: { draft: "Taslak", sent: "Gönderildi", paymentProcessing: "Ödeme işleniyor", paid: "Ödendi", partiallyPaid: "Kısmen ödendi" },
    },
    estimates: {
      estimateTitle: "Teklif",
      estimateNo: "Teklif No",
      reason: "Reddetme nedeninizi ekleyin",
      reasonLabel: "Nedeni Belirtin",
      acceptLabel: "Teklifi Kabul Et",
      rejectEstimate: "Teklifi Reddet",
      acceptDescription: "Teklifi kabul etmek istediğinize emin misiniz? Bu işlem geri alınamaz.",
      acceptedSucessfully: "Teklifi başarıyla kabul ettiniz",
      declinedEstimate: "Teklifi reddettiniz",
      estimateOptionLabel: "Kabul etmek veya reddetmek için lütfen teklifi inceleyin",
      estimateDraftDescription: "Teklif henüz taslak aşamasında. Lütfen daha sonra tekrar bakın.",
      downloadEstimate: "Teklifi İndir",
      accepted: "Kabul Edildi",
      declined: "Reddedildi",
      sent: "Gönderildi",
      draft: "Taslak",
      expiryDate: "Geçerlilik Tarihi",
      expiryText: "Teklifinizin süresi {days} gün önce doldu",
      expired: "Süresi Doldu",
      invoiced: "Faturalandı",
      errorDownloadingEstimate: "Teklif indirilirken bir hata oluştu",
      estimateIntermediaryTitle: "Teklif kabul edildi, fatura oluşturuluyor",
      estimateIntermediaryDescription: "Ödeme için faturaya yönlendirileceksiniz",
      invoiceRedirectTitle: "Faturaya yönlendiriliyorsunuz",
      invoiceRedirectDescription: "Bu biraz zaman alabilir. Lütfen bekleyin.",
      redirectModal: { redirectInvoice: "Faturaya yönlendiriliyorsunuz", waitText: "Bu biraz zaman alabilir, lütfen bekleyin..." },
      error: "Aradığınız teklif bulunamadı.",
    },
    paymentMethod: {
      update: "Güncelle",
      upcomingInvoicePayment: "Yaklaşan fatura ödemesi",
      updatePaymentMethod: "Ödeme yöntemini güncelle",
      successTitle: "Ödeme yöntemi başarıyla güncellendi",
      successMessage: "Ödeme yöntemi aboneliğe eklendi",
    },
  };

  // ---------------------------------------------------------------------------
  // 3) Tutarlar: GHL "TL40,000.00" yazıyor → "40.000,00 TL" (binlik nokta, kuruş virgül, TL sonda).
  //    Sayının kendisi değişmez, yalnız yazımı. Yalnız "TL" + rakam kalıbı değişir; idempotent.
  //    Vue hidrasyonundan SONRA çalışır (önce çalışırsa hidrasyon metni geri yazar).
  // ---------------------------------------------------------------------------
  var AMOUNT_RE = /(^|[\s(])(-?)TL\s?(-?)(\d{1,3}(?:,\d{3})+|\d+)(?:\.(\d{1,2}))?(?![\d.,])/g;
  function trAmount(m, lead, sign1, sign2, intPart, dec) {
    var grouped = intPart.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    var frac = dec === undefined ? "" : "," + (dec.length === 1 ? dec + "0" : dec);
    return lead + (sign1 || sign2) + grouped + frac + " TL";
  }
  function formatAmounts() {
    try {
      var root = document.getElementById("__nuxt");
      if (!root) return;
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      var n;
      while ((n = w.nextNode())) {
        var v = n.nodeValue;
        if (!v || v.indexOf("TL") < 0) continue;
        var nv = v.replace(AMOUNT_RE, trAmount);
        if (nv !== v) n.nodeValue = nv;
      }
    } catch (e) {}
  }
  var amountObserver = null;
  function watchAmounts() {
    if (amountObserver || typeof MutationObserver !== "function") return;
    var root = document.getElementById("__nuxt");
    if (!root) return;
    var queued = false;
    amountObserver = new MutationObserver(function () {
      if (queued) return;
      queued = true;
      Promise.resolve().then(function () { queued = false; formatAmounts(); });
    });
    amountObserver.observe(root, { subtree: true, childList: true, characterData: true });
  }

  var TITLE = "Güvenli Ödeme | Growtify";
  var SENTINEL = "paymentLink.firstName";

  // Nuxt'ın $i18n'i ve vue-i18n'in global composer'ı (aynı nesne olabilir).
  function getComposers() {
    var list = [];
    try {
      var root = document.getElementById("__nuxt");
      var app = root && root.__vue_app__;
      var nuxt = app && app.config && app.config.globalProperties && app.config.globalProperties.$nuxt;
      if (nuxt && nuxt.$i18n) list.push(nuxt.$i18n);
      var g = nuxt && nuxt._vueI18n && nuxt._vueI18n.global;
      if (g && list.indexOf(g) < 0) list.push(g);
    } catch (e) {}
    return list.filter(function (c) { return typeof c.mergeLocaleMessage === "function"; });
  }

  // GHL ödeme linki yüklenince setLocale("en_US") ile İngilizce mesajları yeniden yükleyebiliyor.
  // Mesaj güncelleyen fonksiyonları sarıyoruz: en_US her güncellendiğinde Türkçe aynı anda geri gelir.
  function patch(c) {
    if (c.__gaiMerge) return;
    var merge = c.mergeLocaleMessage;
    c.__gaiMerge = merge;
    ["mergeLocaleMessage", "setLocaleMessage"].forEach(function (fn) {
      var orig = c[fn];
      if (typeof orig !== "function") return;
      c[fn] = function (loc) {
        var r = orig.apply(this, arguments);
        try { if (loc === "en_US") merge.call(c, "en_US", TR); } catch (e) {}
        return r;
      };
    });
  }

  // Sayfa, Türkçe oturana kadar gizli (brand.css). Emniyet: ne olursa olsun 4 sn'de açılır.
  var ready = false;
  function markReady() {
    if (ready) return;
    ready = true;
    try { document.documentElement.classList.add("gai-ready"); } catch (e) {}
  }
  setTimeout(markReady, 4000);

  function apply() {
    try {
      var list = getComposers();
      if (!list.length) return;
      var loc = list[0].locale && typeof list[0].locale === "object" ? list[0].locale.value : list[0].locale;
      if (loc && loc !== "en_US") { markReady(); return; } // GHL'de başka bir dil seçilmişse dokunma
      list.forEach(function (c) {
        patch(c);
        if (c.t(SENTINEL) !== TR.paymentLink.firstName) c.__gaiMerge.call(c, "en_US", TR);
      });
      formatAmounts();
      watchAmounts();
      if (document.documentElement.lang !== "tr") document.documentElement.lang = "tr";
      if (document.title !== TITLE) document.title = TITLE;
      // Vue değişikliği boyamadan önce (mikro görevde) uygular; İngilizce görünmez.
      if (list[0].t(SENTINEL) === TR.paymentLink.firstName) markReady();
    } catch (e) {}
  }

  // Açılışta sık (uygulama hidrasyonu hemen yakalansın), sonra seyrek kontrol.
  var start = Date.now();
  (function loop() {
    apply();
    var age = Date.now() - start;
    setTimeout(loop, age < 3000 ? 50 : age < 20000 ? 250 : 2000);
  })();
})();
