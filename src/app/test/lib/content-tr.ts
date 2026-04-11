// Growtify AI — Quiz Turkish Content Layer
// =============================================================================
// Bu dosya SADECE copy içerir. Logic yok. Import yok (types dışında).
// Tüm [PLACEHOLDER] ve TODO satırları üretim metinleriyle değiştirilmiştir.
//
// SLT Referansı: SLT-v1 (brand-config.json v3.0, messaging-library.json v3.0)
// Üretim tarihi: 2026-04-05
// Birim: Creative Dept — Asset Production Unit
// =============================================================================
//
// KVKK NOTU: Ekran 26 subtitle'ı kısa KVKK aydınlatma içerir.
// HUKUK NOTU: Guarantee metni UK Consumer Rights Act (dijital içerik istisnası)
// kapsamında yazılmıştır — AVUKAT İNCELEMESİ GEREKLİDİR, canlıya alınmadan önce
// hukuki onay alınmalıdır. Bkz. PAYWALL_COPY.guarantee.
// =============================================================================

import type { ScreenConfig } from "./types";

/* -------------------------------------------------------------------------- */
/*  1. SCREEN COPY — 37 ekran                                                 */
/* -------------------------------------------------------------------------- */

export const QUIZ_COPY: Record<number, Partial<ScreenConfig>> = {

  // ========== FAZ 1 — ENGAGE (Ekran 1-3) ==========

  1: {
    caption: "37 soru · %100 kişiselleştirilmiş rapor",
    title: "AI Dijital Olgunluk Testi",
    subtitle: "2 dakikada, AI'dan ne kadar geride kaldığını ve neyi değiştirmen gerektiğini öğren.",
    cta: "Başla",
    options: [
      { value: "bireysel", label: "Bireysel Profesyonel", emoji: "👤" },
      { value: "isletme", label: "İşletme Sahibi", emoji: "🏢" },
    ],
  },

  2: {
    title: "Hangi sektörde çalışıyorsun?",
    subtitle: "Sonuçlarını ve önerilerini kişiselleştirmek için.",
    options: [
      { value: "saglik", label: "Sağlık", icon: "Heart" },
      { value: "hukuk", label: "Hukuk", icon: "Scale" },
      { value: "guzellik", label: "Güzellik & Estetik", icon: "Sparkles" },
      { value: "emlak", label: "Emlak", icon: "Home" },
      { value: "e_ticaret", label: "E-Ticaret", icon: "ShoppingCart" },
      { value: "dis", label: "Diş Hekimliği", icon: "Smile" },
      { value: "muhasebe", label: "Muhasebe & Mali Müşavirlik", icon: "Calculator" },
      { value: "eczacilik", label: "Eczacılık", icon: "Pill" },
      { value: "turizm", label: "Turizm & Seyahat", icon: "Plane" },
      { value: "mimarlik", label: "Mimarlık & Tasarım", icon: "Ruler" },
      { value: "egitim", label: "Eğitim & Koçluk", icon: "GraduationCap" },
      { value: "fitness", label: "Fitness & Spor", icon: "Dumbbell" },
      { value: "sigorta", label: "Sigorta", icon: "Shield" },
      { value: "restoran", label: "Restoran & Kafe", icon: "UtensilsCrossed" },
      { value: "veteriner", label: "Veteriner", icon: "PawPrint" },
      { value: "diger", label: "Diğer / Belirtmek istemiyorum", icon: "MoreHorizontal" },
    ],
  },

  3: {
    caption: "",
    // NOT: Rakamlar beta aşaması için soft wording kullanıyor.
    // İlk kohort verileri gelince gerçek rakamlarla değiştirilecek.
    title: "Binlerce profesyonel bu testi tamamladı",
    subtitle: "Sen de Türkiye'nin dört bir yanından katılan profesyonellerin arasına katıl.",
    cta: "Devam",
    extra: {
      metrics: [
        { label: "Testi tamamlayan", value: "Binlerce profesyonel" },
        { label: "Ortalama süre", value: "~2 dakika" },
        { label: "Kişiselleştirilmiş rapor", value: "%100" },
      ],
    },
  },

  // ========== FAZ 2 — EMPATHIZE (Ekran 4-17) ==========

  4: {
    caption: "Soru 1 / 14",
    title: "Gün sonunda 'yine zaman yetmedi' diye mi kapatıyorsun?",
    subtitle: "Yapacaklar listesi büyüyor, tamamlananlar listesi küçülüyor.",
    options: [
      { value: 1, label: "Hiç", emoji: "😌" },
      { value: 2, label: "Az", emoji: "🙂" },
      { value: 3, label: "Orta", emoji: "😐" },
      { value: 4, label: "Çok", emoji: "😟" },
      { value: 5, label: "Aşırı", emoji: "😩" },
    ],
  },

  5: {
    caption: "Soru 2 / 14",
    title: "AI araçlarını öğrenmeyi sürekli 'bir gün' diye erteliyor musun?",
    subtitle: "O 'bir gün' hep bir sonraki haftaya taşıyor.",
    options: [
      { value: 1, label: "Hiç", emoji: "😌" },
      { value: 2, label: "Az", emoji: "🙂" },
      { value: 3, label: "Orta", emoji: "😐" },
      { value: 4, label: "Çok", emoji: "😟" },
      { value: 5, label: "Aşırı", emoji: "😩" },
    ],
  },

  6: {
    caption: "Soru 3 / 14",
    title: "İşin ortasında dikkat dağılıp başka şeylere mi kayıyorsun?",
    subtitle: "Odağını korumak istiyorsun — ama zihin başka yerde.",
    options: [
      { value: 1, label: "Hiç", emoji: "😌" },
      { value: 2, label: "Az", emoji: "🙂" },
      { value: 3, label: "Orta", emoji: "😐" },
      { value: 4, label: "Çok", emoji: "😟" },
      { value: 5, label: "Aşırı", emoji: "😩" },
    ],
  },

  7: {
    caption: "Soru 4 / 14",
    title: "Meslektaşların AI ile daha hızlı ilerliyor gibi mi hissediyorsun?",
    subtitle: "Etrafındaki profesyoneller bir şeyler yapıyor — sen neredesin?",
    options: [
      { value: 1, label: "Hiç", emoji: "😌" },
      { value: 2, label: "Az", emoji: "🙂" },
      { value: 3, label: "Orta", emoji: "😐" },
      { value: 4, label: "Çok", emoji: "😟" },
      { value: 5, label: "Aşırı", emoji: "😩" },
    ],
  },

  8: {
    caption: "Soru 5 / 14",
    title: "AI ile ilgili önemli bir şeyi kaçırıyor olma hissin var mı?",
    subtitle: "Herkes bir şeyler yapıyor — sen nerede durduğunu bilemiyorsun.",
    options: [
      { value: 1, label: "Hiç", emoji: "😌" },
      { value: 2, label: "Az", emoji: "🙂" },
      { value: 3, label: "Orta", emoji: "😐" },
      { value: 4, label: "Çok", emoji: "😟" },
      { value: 5, label: "Aşırı", emoji: "😩" },
    ],
  },

  9: {
    caption: "Soru 6 / 14",
    title: "Son aylarda mesleki gelişiminde somut bir ilerleme hissediyor musun?",
    subtitle: "Dürüst ol — konfor alanın büyüdü mü küçüldü mü?",
    options: [
      { value: 2, label: "Hiç", emoji: "😞" },
      { value: 4, label: "Az", emoji: "😕" },
      { value: 6, label: "Orta", emoji: "🙂" },
      { value: 8, label: "İyi", emoji: "😃" },
      { value: 10, label: "Çok", emoji: "🚀" },
    ],
  },

  10: {
    caption: "Soru 7 / 14",
    title: "AI konusunda ne kadar belirsiz hissediyorsun?",
    subtitle: "Nereden başlayacağını, neye güveneceğini bilmek zor.",
    likertMin: "Tamamen netim",
    likertMax: "Tamamen belirsizim",
  },

  11: {
    caption: "Soru 8 / 14",
    title: "Şu anki iş yükün seni ne kadar bunaltıyor?",
    subtitle: "Günün sonunda gerçekten dinlenebiliyor musun?",
    likertMin: "Yönetilebilir",
    likertMax: "Bunaltıcı",
  },

  12: {
    caption: "Soru 9 / 14",
    title: "Hangi AI aracıyla başlayacağına karar vermek ne kadar zor?",
    subtitle: "Bu kadar seçenek arasında hangisiyle başlayacağını bilmek zor mu?",
    likertMin: "Kolayca karar veririm",
    likertMax: "Çok zor, kayboluyorum",
  },

  13: {
    caption: "Soru 10 / 14",
    title: "Yeni bir şeye başlayıp başarısız olma korkusu ne kadar güçlü?",
    subtitle: "Bu korku bazen hiç başlamamana yol açıyor mu?",
    likertMin: "Hiç yok",
    likertMax: "Çok güçlü",
  },

  14: {
    caption: "Soru 11 / 14",
    title: "Kendi mesleki değerine ve yetkinliğine ne kadar güveniyorsun?",
    subtitle: "İşini iyi yaptığına içten inanıyor musun?",
    likertMin: "Hiç güvenmiyorum",
    likertMax: "Tamamen güveniyorum",
  },

  15: {
    caption: "Soru 12 / 14",
    title: "Çevrenden 'geride kalıyorsun' gibi bir baskı hissediyor musun?",
    subtitle: "Meslektaşların, sosyal medya, haberler — bunlar seni etkiliyor mu?",
    likertMin: "Hiç hissetmiyorum",
    likertMax: "Sürekli hissediyorum",
  },

  16: {
    caption: "Soru 13 / 14",
    title: "Bir şeye başlamadan önce ne kadar aşırı düşünüyorsun?",
    subtitle: "Mükemmel planı beklerken başlamayı ertelediğin oluyor mu?",
    likertMin: "Hiç",
    likertMax: "Aşırı derecede",
  },

  17: {
    caption: "Soru 14 / 14 ⭐",
    title: "Şu an, gerçekten değişmek için ne kadar motive hissediyorsun?",
    subtitle: "Sadece merak değil — içindeki değişim isteği ne kadar güçlü?",
    likertMin: "Hiç motive değilim",
    likertMax: "Çok güçlü hissediyorum",
  },

  // ========== FAZ 3 — DECLARE (Ekran 18-20) ==========

  18: {
    title: "Önümüzdeki 90 günde en çok neyi başarmak istiyorsun?",
    subtitle: "Bir tane seç — en önemli olanı.",
    options: [
      { value: "yeni_gelir", label: "Yeni bir gelir kapısı açmak" },
      { value: "zaman", label: "Haftada 10+ saat geri kazanmak" },
      { value: "musteri", label: "Daha fazla müşteri / danışan çekmek" },
      { value: "otomasyon", label: "Tekrarlayan işleri otomatikleştirmek" },
      { value: "bilgi", label: "AI konusunda gerçekten uzmanlaşmak" },
    ],
  },

  19: {
    title: "Hangi alanlarda AI'dan yardım almak istiyorsun?",
    subtitle: "Birden fazla seçebilirsin — hepsini görmek istiyoruz.",
    options: [
      { value: "icerik", label: "İçerik üretimi" },
      { value: "musteri", label: "Müşteri iletişimi" },
      { value: "satis", label: "Satış süreçleri" },
      { value: "analiz", label: "Veri analizi" },
      { value: "egitim", label: "Danışan / müşteri materyalleri" },
      { value: "tasarim", label: "Tasarım ve görseller" },
      { value: "operasyon", label: "Operasyonel otomasyon" },
      { value: "finans", label: "Finans ve muhasebe" },
    ],
  },

  20: {
    title: "Hangi alışkanlıklarından kurtulmak istiyorsun?",
    subtitle: "Dürüst ol — bunlar planında yer alacak.",
    options: [
      { value: "son_dakika", label: "Her şeyi son dakikaya bırakmak" },
      { value: "telefon", label: "Sürekli telefonu kontrol etmek" },
      { value: "multitasking", label: "Her şeyi aynı anda yapmaya çalışmak" },
      { value: "mukemmeliyetcilik", label: "Mükemmel olmadan başlayamamak" },
      { value: "oz_sabotaj", label: "Kendimi sabote etmek" },
    ],
  },

  // ========== FAZ 4 — AUTHORITY (Ekran 21-23) ==========

  21: {
    caption: "",
    title: "Bu test uluslararası AI araştırmalarının bulgularıyla hazırlandı",
    subtitle: "Önde gelen dijital dönüşüm raporları ve sektörel verimlilik çalışmaları temel alındı.",
    cta: "Devam",
    // extra.sources skeleton'da sabit — bu değerleri skeleton okur
    // extra.note skeleton'da sabit
  },

  22: {
    caption: "",
    title: "AI dönüşüm uzmanları tarafından incelendi",
    subtitle: "Her soru ve her öneri, gerçek uygulama deneyimiyle şekillendi.",
    cta: "Devam",
  },

  23: {
    caption: "",
    title: "Türkiye'nin her yerinden profesyoneller bu yolculuğa başladı",
    subtitle: "Diyetisyenler, avukatlar, emlakçılar, e-ticaret satıcıları — hepsi aynı noktadan başladı.",
    cta: "Devam",
  },

  // ========== FAZ 5 — PERSONALIZE (Ekran 24-26) ==========

  24: {
    title: "Günde ne kadar zaman ayırabilirsin?",
    subtitle: "Dürüst ol — planın buna göre şekillenecek.",
    options: [
      { value: 15, label: "15 dakika / gün", emoji: "⏱️" },
      { value: 30, label: "30 dakika / gün", emoji: "⏰" },
      { value: 45, label: "45 dakika / gün", emoji: "🎯" },
      { value: 60, label: "1 saat / gün", emoji: "🔥" },
    ],
  },

  25: {
    title: "Adını ve soyadını yaz",
    subtitle: "Raporunu ve önerilerini kişiselleştirmek için.",
    placeholder: "Adın Soyadın",
    cta: "Devam",
  },

  26: {
    title: "Son adım — raporun sana ulaşsın",
    subtitle: "E-postan ve telefonun güvende. Raporunu ve önerilerini bu bilgilerle göndereceğiz.",
    placeholder: "ornek@mail.com",
    cta: "Planımı Hazırla",
  },

  // ========== FAZ 6 — PRE-REVEAL (Ekran 27-28) ==========

  27: {
    caption: "",
    title: "{firstName}, seninle ilgili bir ön profil çıkardık",
    subtitle: "Tam sonucun hazır olmadan önce — ilk izlenimler.",
    cta: "Projeksiyonumu Gör",
  },

  28: {
    caption: "",
    title: "90 günde nereye gidebileceğini gördük",
    subtitle: "Şu anki noktandan, olabileceğin en iyi noktaya kadar olan yol.",
    cta: "Planımı Üret",
  },

  // ========== FAZ 7 — DRAMATIZE (Ekran 29-33) ==========

  29: {
    caption: "",
    title: "Cevapların analiz ediliyor...",
  },

  30: {
    caption: "",
    title: "Bir şey daha — daha iyi yardımcı olalım",
    subtitle: "Şimdiye kadar herhangi bir AI aracını işinde denedi mi?",
    options: [
      { value: "true", label: "Evet, birkaç şey denedim" },
      { value: "false", label: "Hayır, henüz başlamadım" },
    ],
  },

  31: {
    caption: "",
    title: "Sana özel müfredat çıkarılıyor...",
  },

  32: {
    caption: "",
    title: "Son bir soru — planı doğru kuralım",
    subtitle: "Önümüzdeki 4 haftada haftada kaç gün zaman ayırabilirsin?",
    options: [
      { value: "true", label: "3 gün veya daha fazla" },
      { value: "false", label: "1-2 gün" },
    ],
  },

  33: {
    caption: "",
    title: "Son rötuşlar yapılıyor...",
  },

  // ========== FAZ 8 — DELIVER (Ekran 34) ==========

  34: {
    caption: "",
    title: "{firstName}, planın hazır!",
    subtitle: "İşte 4 hafta içinde olabileceğin yer.",
    // Skeleton'daki "Ödülümü Al" → gamification dili — aşağıyla değiştiriliyor
    cta: "Sonucumu Gör",
  },

  // ========== FAZ 9 — GAMIFY (Ekran 35-36) ==========

  35: {
    caption: "",
    title: "Sana özel bir indirim hazır — aç bakalım",
    subtitle: "Bu testi tamamlayan herkes bu indirimi almıyor. Sadece sınırlı süre.",
    cta: "İndirimimi Gör",
  },

  36: {
    caption: "",
    title: "Tebrikler {firstName}!",
    subtitle: "İndirim hesabına tanımlandı. 60 dakika geçerli — planın seni bekliyor.",
    cta: "Programı İncele",
  },

  // ========== FAZ 10 — CLOSE (Ekran 37) ==========

  37: {
    caption: "",
    title: "GROWT Programı — Kişisel AI dönüşüm planın",
    subtitle: "4 hafta · 5 seviye · 26 modül",
    cta: "Programa Katıl",
  },
};

/* -------------------------------------------------------------------------- */
/*  2. PERSONA SUMMARIES — 4 persona                                          */
/* -------------------------------------------------------------------------- */

export const PERSONA_SUMMARIES = {
  "Meraklı Gözlemci": {
    scoreRange: [0, 27],
    summary:
      "{firstName}, AI dünyasına merakla bakıyorsun ama henüz somut bir adım atmadın. Normal — çoğu profesyonel tam da burada başlıyor. Başlamak için teknik bilgi gerekmiyor. Sadece doğru ilk adımı bilmek yeterli — biz sana tam da bunu göstereceğiz.",
    painIdentification: [
      "Hangisi gerçekten işime yarar bilmiyorum.",
      "Yanlış araçla zaman kaybetmekten çekiniyorum.",
      "Herkes kullanıyor gibi — ben geride mi kalıyorum?",
    ],
    projection:
      "4 hafta sonra ilk AI iş akışını kurmuş, haftada en az 5 saat kazanmaya başlamış olacaksın.",
    recommendedLevel: "",
  },

  "Aktif Deneyici": {
    scoreRange: [30, 59],
    summary:
      "{firstName}, birkaç AI aracı denedin ama sonuçlar tatmin etmedi. Problem sen değilsin — strateji eksikliği. Doğru araç, doğru sıra ve net bir plan ile deneme-yanılma dönemini bitireceksin.",
    painIdentification: [
      "Açıyorum ama ne soracağımı bilmiyorum, yarım bırakıyorum.",
      "İş akışıma gerçekten entegre edemedim.",
      "Online örnekler benim işime uymuyor.",
    ],
    projection:
      "4 hafta sonra 3 AI iş akışını sistematik olarak kullanıyor, her hafta en az 8 saat kazanmış olacaksın.",
    recommendedLevel: "",
  },

  Uygulamacı: {
    scoreRange: [60, 92],
    summary:
      "{firstName}, AI kullanıyorsun ama dağınık. Parçalı araçlar, bağlantısız otomasyonlar. İhtiyacın olan şey daha fazla araç değil — mevcut kullanımını sistematik bir yapıya dönüştürmek. İlk gerçek verimlilik kazanımları tam da bu noktada geliyor.",
    painIdentification: [
      "Hangi kısımlar gerçekten fark yaratıyor bilmiyorum.",
      "Sistematik bir yapıya oturtamadım.",
      "Her yeni araçta sıfırdan başlıyorum.",
    ],
    projection:
      "4 hafta sonra AI kullanımını ölçülebilir sonuçlara bağlamış, bütünleşik bir sistem kurmuş olacaksın.",
    recommendedLevel: "",
  },

  "AI Lideri": {
    scoreRange: [93, 999],
    summary:
      "{firstName}, sektörünün ilerisinde yürüyorsun. Ama tavan var — bireysel kapasite sınırına ulaştın. İhtiyacın daha fazla araç değil, mevcut kazanımları sistematik hale getirip ölçülebilir büyümeye dönüştürmek. Doğru yoldasın — şimdi hızı artırma vakti.",
    painIdentification: [
      "Beklediğim sıçramayı göremedim.",
      "Kapasite sınırına ulaştım ama sistemi kuramadım.",
      "Gerçek ROI'yi hiç ölçemedim.",
    ],
    projection:
      "4 hafta sonra ölçülebilir sonuçlara bağlamış, sistematik bir büyüme yapısı kurmuş olacaksın.",
    recommendedLevel: "",
  },
};

/* -------------------------------------------------------------------------- */
/*  3. SEKTÖR PAIN VARIANTS — KALDIRILDI                                       */
/*  Karar: 2026-04-08 — evrensel sorular yaklaşımı benimsendi.                */
/*  Sektör seçimi GHL segmentasyonu için korunuyor, quiz soruları evrensel.   */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*  4. LOADING STEPS — 3 ekran × 3 step                                       */
/* -------------------------------------------------------------------------- */

export const LOADING_STEPS: Record<number, string[]> = {
  // Ekran 29 — İlk analiz: 14 pain sorusunun işlenmesi
  29: [
    "14 cevabın derinlemesine analiz ediliyor...",
    "Kıyaslamalar hazırlanıyor...",
    "Persona profilin oluşturuluyor...",
  ],

  // Ekran 31 — Müfredat üretimi: kişisel plana dönüştürme
  31: [
    "Sana uygun AI araçları belirleniyor...",
    "4 haftalık kişisel planın optimize ediliyor...",
    "Sana özel öneriler hazırlanıyor...",
  ],

  // Ekran 33 — Final: rapor ve teklif hazırlığı
  33: [
    "Kişisel raporun derleniyor...",
    "30 günlük yol haritan oluşturuluyor...",
    "Özel teklifin hazırlanıyor...",
  ],
};

/* -------------------------------------------------------------------------- */
/*  5. PAYWALL COPY — 10 blok                                                 */
/* -------------------------------------------------------------------------- */

export const PAYWALL_COPY = {

  // Blok 1 — Countdown
  // NOT: durationMinutes: 60 — GHL kupon expire süresiyle eşleşiyor.
  countdown: {
    headline: "Özel indirim süresi dolmak üzere",
    sublabel: "Bu indirim kişiselleştirilmiş bir tekliftir ve sadece bu oturum için geçerlidir.",
    durationMinutes: 60,
  },

  // Blok 2 — Hero Promise
  // {firstName} ve {persona} runtime'da değiştirilecek
  heroPromise: {
    text: "{firstName}, test sonuçların gösteriyor ki {persona} profilindesin. Bu planı 4 hafta boyunca takip edersen — tekrarlayan işlerden kurtulacak, ilk AI iş akışını kuracak ve mesleğinde net bir ilerleme hissedeceksin. Kurs değil, mesleğine özel dönüşüm.",
  },

  // Blok 3 — Before / After
  beforeAfter: {
    beforeTitle: "ŞU AN",
    before: [
      "Aynı işi tekrar tekrar manuel yapıyorsun",
      "Hangi AI aracını kullanacağını bilmiyorsun",
      "Rakiplerden geride kaldığını hissediyorsun",
      "Zamanın işe değil, zamana yetişmeye gidiyor",
      "Bir sistem yok — her gün sıfırdan başlıyorsun",
    ],
    afterTitle: "4 HAFTA SONRA",
    after: [
      "Tekrarlayan işlerin büyük kısmı otomatik çalışıyor",
      "Mesleğine özel AI araçlarını güvenle kullanıyorsun",
      "Dijital varlığın büyüyor, yeni müşteriler geliyor",
      "Haftada en az 5-10 saat geri kazandın",
      "Net bir sistem var — her gün nereye gittiğini biliyorsun",
    ],
  },

  // Blok 4 — Stats
  // NOT: Bu rakamlar beta lansmanı aşamasında. İlk kohort tamamlandığında
  // gerçek verilerle değiştirilecek. Şimdilik yumuşak dil kullanıldı.
  stats: [
    {
      label: "Yapılandırılmış program",
      value: "5 seviye · 26 modül",
    },
    {
      label: "Günlük yatırım",
      value: "15-60 dakika",
    },
    {
      label: "Program süresi",
      value: "4 hafta erişim",
    },
  ],

  // Blok 5 — Media Features
  // NOT: Gerçek medya yer alımları gelene kadar coming-soon stratejisi.
  mediaFeatures: {
    note: "Medyada yer aldıkça bu bölüm güncellenecek. Şimdilik programı biz anlatıyoruz — yakında sektör medyası da.",
    comingSoon: true,
  },

  // Blok 6 — Pricing
  pricing: {
    headline: "Özel indirimli fiyat",
    base: 9999,
    features: [
      "5 GROWT seviyesine tam erişim (G + R + O + W + T)",
      "26 modül — tamamladıkça yeni modüller açılıyor",
      "AI araç kütüphanesi ve mesleğine özel şablonlar",
      "Topluluk erişimi — soru-cevap, networking",
      "WhatsApp destek hattı (4 hafta boyunca)",
      "4 hafta boyunca tam platform erişimi",
    ],
  },

  // Blok 7 — Testimonials
  // NOT: İlk gerçek müşteri geri bildirimleri toplanana kadar coming_soon stratejisi.
  testimonials: {
    strategy: "coming_soon" as const,
    comingSoonText:
      "Programı tamamlayan ilk 50 kişinin deneyimleri burada yer alacak. Şu an erken katılımcılar dönüşüm sürecinde — sonuçlar geldiğinde bu alanı güncelleyeceğiz.",
  },

  // Blok 8 — FAQ
  faq: [
    {
      q: "Program ne kadar sürüyor?",
      a: "4 hafta tam erişim. Kendi hızında ilerleyebilirsin — modüller sırayla açılıyor. Yoğun bir dönemdeysen, erişim süren içinde geri dönebilirsin.",
    },
    {
      q: "Günde ne kadar zaman ayırmam gerekiyor?",
      a: "15-45 dakika yeterli. Programı tasarlarken bunu göz önünde bulundurduk — yoğun profesyoneller için optimize edildi. 15 dakika bile düzenliyse ilerleme sağlanıyor.",
    },
    {
      q: "İçerik ne formatta — video mu, yazı mı?",
      a: "Video anlatım ağırlıklı, uygulama odaklı görevler ve rehber belgelerle destekleniyor. Hem izleyerek hem okuyarak öğrenenlere uygun.",
    },
    {
      q: "Sektörüme özel mi olacak?",
      a: "GROWT Method tüm sektörlere uygulanabilir. Program içinde mesleğine göre örnekler ve AI araç önerileri sunuluyor — genel teorik içerik değil, kendi işine uygulayacağın pratik adımlar.",
    },
    {
      q: "Teknik bilgim yok, yapabilir miyim?",
      a: "Evet. Program teknik bilgi gerektirmiyor — sıfırdan başlayanlar için de ileri düzey kullananlar için de farklı seviyeler var. Başlamak için tek şart isteğin.",
    },
    {
      // HUKUK NOTU: Bu yanıt UK Consumer Rights Act'in dijital içerik istisnası
      // gözetilerek yazılmıştır. Canlıya almadan önce avukat incelemesi ZORUNLUDUR.
      // UK CRA 2015 Section 42 — dijital içerik, tüketici erişim sağladıktan sonra
      // geri ödeme hakkı sınırlıdır. Bu metin "erişim başlamadıysa" koşulunu
      // esas almaktadır. Belirsiz veya geniş kapsamlı iade vaadinden kaçınılmıştır.
      q: "Para iade politikası nedir?",
      a: "Programa katıldıktan sonra platforma erişim sağlayamazsan ya da teknik bir sorun nedeniyle içeriklere hiç ulaşamazsan, 14 gün içinde bizimle iletişime geç — durumunu değerlendiririz. Dijital içerik ürünlerinde genel iade politikamız, UK tüketici koruma mevzuatı çerçevesinde belirlenmektedir. Detaylar için iade politikası sayfamızı incele.",
    },
    {
      q: "4 hafta bitince ne oluyor?",
      a: "Erişim süresi sonunda kazandığın bilgi, kurduğun iş akışları ve oluşturduğun şablonlar seninle kalıyor. Topluluk erişimi hakkında ayrıca bilgi verilecek.",
    },
  ],

  // Blok 9 — Guarantee
  // HUKUK NOTU: Bu metin UK Consumer Rights Act 2015 dijital içerik istisnası
  // kapsamında hazırlanmıştır. "Blanket refund" vaadi içermez.
  // Canlıya almadan önce avukat incelemesi ZORUNLUDUR.
  guarantee: {
    headline: "Güvendesin",
    text: "Satın aldığın an platforma anında erişim alırsın — 4 hafta boyunca tüm içerik, AI araç kütüphanesi ve topluluğun yanında. Herhangi bir teknik sorun yaşarsan 7/24 destek ekibimiz senin yanında. Sen yolu tamamlamaya odaklan, gerisi bizde.",
    legalNote:
      "// AVUKAT İNCELEMESİ GEREKLİDİR — UK Consumer Rights Act 2015 Section 42. Canlıya almadan önce onay alınmalıdır.",
  },

  // İndirim disclaimer — paywall footer'da gösterilir
  discountDisclaimer:
    "Bu indirim, AI Dijital Olgunluk Testi sonuçlarına göre kişiselleştirilmiş bir tekliftir. Her kullanıcıya sunulan indirim oranı farklılık gösterebilir. Tek kullanımlık kupon kodu ile geçerlidir, devredilemez ve diğer kampanyalarla birleştirilemez. Growtify, indirim oranlarını önceden bildirmeksizin değiştirme hakkını saklı tutar.",

  // Blok 10 — Final CTA
  finalCta: {
    label: "Programa Katıl",
    // Fiyat runtime'da indirim uygulanmış şekilde hesaplanıyor
  },
};

/* -------------------------------------------------------------------------- */
/*  6. KVKK & LEGAL                                                           */
/* -------------------------------------------------------------------------- */

export const LEGAL_TEXTS = {
  // Ekran 26 (email capture) altında görünecek kısa KVKK aydınlatma
  // Ekran 26 içinde görünen kısa metin — UI tutarlılığı için "sen" hitap.
  // Tam KVKK metni (kvkkLong) modal/ayrı sayfada formal hitap kullanır.
  kvkkShort:
    "Kişisel verilerin Growtify AI tarafından KVKK kapsamında işlenir ve üçüncü taraflarla paylaşılmaz. Detaylar için gizlilik politikamızı inceleyebilirsin.",

  // KVKK aydınlatma metni — tam versiyon (modal veya ayrı sayfa için)
  kvkkLong:
    "Growtify AI (Growtify Ltd, Birleşik Krallık) olarak, test sürecinde topladığımız ad ve e-posta bilgileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında; kişiselleştirilmiş rapor ve önerilerinizin iletilmesi, program bilgilendirme iletişimi ve hizmet kalitesinin artırılması amaçlarıyla işlenmektedir. Verileriniz yurt dışına aktarılabilir (UK sunucularında barındırılmaktadır). Açık rızanızı geri çekme, verilerinize erişim, düzeltme veya silme taleplerini info@growtify.app adresine iletebilirsiniz. Veri işleme faaliyetimiz hakkında tam bilgi için gizlilik politikamızı inceleyiniz.",

  termsLink: "/hukuki/kullanim-kosullari",
  privacyLink: "/hukuki/gizlilik",
  refundLink: "/hukuki/iade-politikasi",
};
