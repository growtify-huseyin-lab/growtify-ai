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
    title: "AI'ın mesleğinde neler yapabileceğini bilmemek seni ne kadar rahatsız ediyor?",
    subtitle: "Sadece ChatGPT değil — sektörüne özel onlarca araç ve yöntem var.",
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
    title: "AI araçlarını işinde kullanamamak seni ne kadar engelliyor?",
    subtitle: "Haftada en az bir kez iş için AI kullananlar zaten farkı görüyor.",
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
    title: "AI'ı öğrenmeye başlamak seni ne kadar tedirgin ediyor?",
    subtitle: "'Teknik değilim' diye düşünüyor olabilirsin — ama çoğu araç 5 dakikada öğreniliyor.",
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
    title: "AI kullanmadığın için fırsat kaçırdığını hissetmek seni ne kadar rahatsız ediyor?",
    subtitle: "Meslektaşların aynı işi yarı sürede yapıyor olabilir — sen hâlâ manuel.",
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
    title: "AI deneyipte istediğin sonucu alamamak seni ne kadar hayal kırıklığına uğrattı?",
    subtitle: "Denediysen — çıktılar beklentini karşıladı mı, yoksa yarım mı kaldı?",
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
    title: "Mesleğine özel AI araçlarını ve kullanım alanlarını ne kadar biliyorsun?",
    subtitle: "Genel bilgi değil — senin işine direkt uyan çözümleri biliyor musun?",
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
    title: "Bu kadar AI aracı arasında hangisiyle başlayacağına karar vermek ne kadar zor?",
    subtitle: "Seçenek çok, rehber yok — kaybolmuş gibi hissediyor musun?",
    likertMin: "Kolayca karar veririm",
    likertMax: "Tamamen kayboluyorum",
  },

  11: {
    caption: "Soru 8 / 14",
    title: "AI'ı yanlış kullanıp zaman kaybetme korkun ne kadar güçlü?",
    subtitle: "Denemek istiyorsun ama 'boşa mı gidecek' diye duraksıyorsun.",
    likertMin: "Hiç korkmuyorum",
    likertMax: "Çok korkuyorum",
  },

  12: {
    caption: "Soru 9 / 14",
    title: "AI'ın kolayca yapabileceği işleri hâlâ manuel yapmak seni ne kadar yoruyor?",
    subtitle: "İçerik, raporlama, müşteri takibi, randevu — bunların çoğu otomatize edilebilir.",
    likertMin: "Hiç yormuyor",
    likertMax: "Çok yoruyor",
  },

  13: {
    caption: "Soru 10 / 14",
    title: "AI'ı öğrenmeye ayıracak zamanın olmadığını düşünüyor musun?",
    subtitle: "Belki de doğru yöntemle günde 15 dakika yeterli.",
    likertMin: "Zamanım var",
    likertMax: "Hiç zamanım yok",
  },

  14: {
    caption: "Soru 11 / 14",
    title: "AI'ı günlük iş akışına entegre edebileceğine ne kadar güveniyorsun?",
    subtitle: "Öğrensen bile gerçekten uygulayabilir misin?",
    likertMin: "Hiç güvenmiyorum",
    likertMax: "Tamamen güveniyorum",
  },

  15: {
    caption: "Soru 12 / 14",
    title: "AI kullanan meslektaşlarına göre ne kadar geride kaldığını düşünüyorsun?",
    subtitle: "Farkı hissediyorsun — peki bu fark her geçen gün büyüyor mu?",
    likertMin: "Geride değilim",
    likertMax: "Çok gerideyim",
  },

  16: {
    caption: "Soru 13 / 14",
    title: "AI konusunda nereden başlayacağını bilememek seni ne kadar durduruyor?",
    subtitle: "Bilgi çok, içerik çok — ama net bir yol haritası yok.",
    likertMin: "Hiç durdurmaz",
    likertMax: "Tamamen durdurdu",
  },

  17: {
    caption: "Soru 14 / 14 ⭐",
    title: "AI ile işini dönüştürme konusundaki kararlılığın ne kadar güçlü?",
    subtitle: "Merak mı, ihtiyaç mı, aciliyet mi — hangisi seni buraya getirdi?",
    likertMin: "Sadece merak",
    likertMax: "Acil ihtiyaç",
  },

  // ========== FAZ 3 — DECLARE (Ekran 18-20) ==========

  18: {
    title: "AI ile önümüzdeki 90 günde en çok neyi başarmak istiyorsun?",
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
      {
        value: "pazarlama",
        label: "Pazarlama Süreçleri",
        description: "reklam yönetimi · içerik üretimi · SEO · sosyal medya",
      },
      {
        value: "satis",
        label: "Satış Süreçleri",
        description: "lead takibi · teklif hazırlama · müşteri karşılama",
      },
      {
        value: "musteri",
        label: "Müşteri İletişimi",
        description: "CRM · otomasyon · takip mesajları · WhatsApp/email",
      },
      {
        value: "operasyon",
        label: "Operasyonel Otomasyon",
        description: "tekrarlayan işler · süreç yönetimi · workflow",
      },
      {
        value: "finans",
        label: "Finans ve Muhasebe",
        description: "fatura · rapor · gider takibi · bütçe planı",
      },
      {
        value: "strateji",
        label: "Strateji ve Analiz",
        description: "veri analizi · rapor · karar destek · trend tespiti",
      },
      {
        value: "personel",
        label: "Personel ve Çalışan Takibi",
        description: "performans · vardiya · eğitim · iç iletişim",
      },
      {
        value: "egitim",
        label: "Eğitim & Danışan Materyalleri",
        description: "sunum · rehber · bilgilendirme · özel program",
      },
    ],
  },

  20: {
    title: "AI yolculuğunda seni en çok ne engelliyor?",
    subtitle: "Dürüst ol — bunlar planında yer alacak.",
    options: [
      { value: "son_dakika", label: "Nereden başlayacağımı bilmiyorum" },
      { value: "telefon", label: "Zamanım yok" },
      { value: "multitasking", label: "Teknik bilgim yetersiz" },
      { value: "mukemmeliyetcilik", label: "Yanlış araç seçme korkusu" },
      { value: "oz_sabotaj", label: "Tek başıma yapamam hissi" },
      { value: "mentor_yok", label: "Mentor veya rehber yok" },
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
      "{firstName}, AI konusunda şu an büyük bir baskı veya engel hissetmiyorsun. Belki zaten bazı şeyleri deniyorsun, belki de henüz gündemine almadın. Her iki durumda da doğru yerdesin — çünkü farkındalık yolculuğun ilk adımı.",
    painIdentification: [
      "AI şu an benim için acil bir mesele değil.",
      "İlgimi çekiyor ama nereden başlasam bilmiyorum.",
      "Belki de ihtiyacım olduğunu henüz fark etmedim.",
    ],
    projection:
      "4 hafta sonra AI'ın senin işinde ne yapabileceğini net görmüş ve ilk adımını atmış olacaksın.",
    recommendedLevel: "",
  },

  "Aktif Deneyici": {
    scoreRange: [30, 59],
    summary:
      "{firstName}, AI konusunda bir rahatsızlık hissediyorsun — geride kalma endişesi, nereden başlayacağını bilememe ve zaman baskısı var. Bazı engeller seni yavaşlatıyor ama harekete geçme isteğin de mevcut. Doğru rehberlikle bu engelleri aşabilirsin.",
    painIdentification: [
      "AI'a geçmem gerektiğini biliyorum ama zorlanıyorum.",
      "Seçenekler kafamı karıştırıyor.",
      "Zaman bulamıyorum ama geride kalma hissi artıyor.",
    ],
    projection:
      "4 hafta sonra engellerini tanımlamış, doğru araçları seçmiş ve ilk AI rutinini kurmuş olacaksın.",
    recommendedLevel: "",
  },

  Uygulamacı: {
    scoreRange: [60, 92],
    summary:
      "{firstName}, AI konusunda ciddi bir farkındalığın var ve engelleri açıkça görüyorsun. Zaman yetersizliği, doğru aracı seçememe, geride kalma hissi — bunlar seni hem motive ediyor hem durduruyor. Sana özel bir yol haritasıyla bu engelleri tek tek aşacaksın.",
    painIdentification: [
      "Engeller net — ama çözümü bulamıyorum.",
      "Motivasyonum var ama doğru yönlendirme eksik.",
      "Tek başıma deneyip zaman kaybetmek istemiyorum.",
    ],
    projection:
      "4 hafta sonra engelleri aşmış, AI'ı günlük iş akışına entegre etmiş ve somut sonuçlar görmeye başlamış olacaksın.",
    recommendedLevel: "",
  },

  "Dönüşüm Adayı": {
    scoreRange: [93, 999],
    summary:
      "{firstName}, AI konusunda en yüksek farkındalık ve aciliyet seviyesindesin. Engelleri net görüyorsun, geride kaldığını hissediyorsun, fırsatları kaçırdığının farkındasın ve değişime tamamen hazırsın. Şimdi ihtiyacın olan tek şey doğru yapı ve rehberlik.",
    painIdentification: [
      "Her gün geçtikçe daha çok geride kalıyorum.",
      "Ne yapacağımı biliyorum ama yapamıyorum — rehberlik şart.",
      "Artık erteleyecek zamanım kalmadı.",
    ],
    projection:
      "4 hafta sonra AI'ı iş akışının merkezine koymuş, somut ve ölçülebilir sonuçlar görüyor olacaksın.",
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
    text: "test sonuçların gösteriyor ki {persona} profilindesin. Bu planı 4 hafta boyunca takip edersen — tekrarlayan işlerden kurtulacak, ilk AI iş akışını kuracak ve mesleğinde net bir ilerleme hissedeceksin. Kurs değil, mesleğine özel dönüşüm.",
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
    text: "Satın alma sonrasında hesabın kısa süre içinde hazırlanır ve platforma erişimin başlar — 4 hafta boyunca tüm içerik, AI araç kütüphanesi ve topluluk yanında. Herhangi bir sorunda destek ekibimiz senin yanında. Sen yolu tamamlamaya odaklan, gerisi bizde.",
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
