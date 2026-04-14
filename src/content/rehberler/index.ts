/**
 * Lead magnet content — 12 sectoral PDF guides + metadata.
 *
 * Each sector has:
 * - slug: URL path segment
 * - name: display name
 * - hero content (title, subtitle, pain hook)
 * - what's inside (bullet list)
 * - pdfUrl: public PDF path
 * - ghl tag keys (sector, lead magnet)
 *
 * NOT: hero.title, hero.subtitle, hero.painHook ve whatInside
 * alanları src/content/rehberler/pdf-content.ts içindeki coverTitle,
 * coverSubtitle, intro.painHook ve intro.whatYouGet ile senkron tutulmalıdır.
 */

export interface RehberContent {
  slug: string;
  name: string;
  icon: string;
  hero: {
    title: string;
    subtitle: string;
    painHook: string;
  };
  whatInside: string[];
  targetProfile: string;
  pdfUrl: string;
  ghlSectorTag: string;
  ghlLeadMagnetTag: string;
  seo: {
    title: string;
    description: string;
  };
}

export const REHBERLER: Record<string, RehberContent> = {
  saglik: {
    slug: "saglik",
    name: "Sağlık",
    icon: "🩺",
    hero: {
      title: "Diyetisyenler & Sağlık Profesyonelleri için AI Başlangıç Rehberi",
      subtitle: "Haftada 15 saat tekrar eden işleri 2 saate düşüren pratik bir rehber",
      painHook:
        "Danışan takip formları, seans notları, Instagram içeriği, randevu hatırlatmaları — bunlara zamanın çoğu gidiyor mu? AI bu tekrar eden yükü senden alır; sen danışanına odaklanırsın.",
    },
    whatInside: [
      "5 AI aracı — sağlık pratiği için seçilmiş (Claude, ChatGPT, Calendly, Whisper, Canva AI)",
      "3 pratik uygulama senaryosu — danışan onboarding, haftalık içerik, randevu sonrası takip",
      "10 kopyala-yapıştır prompt — beslenme planından Instagram postuna her şey hazır",
      "İlk 7 gün adım adım checklist — sıfırdan başlayıp ilk sonucu almak için",
      "Araç karşılaştırması — hangisini ne zaman kullanmalısın, ücretsiz mi değil mi?",
    ],
    targetProfile: "Diyetisyen, psikolog, fizyoterapist, sağlık koçu",
    pdfUrl: "/rehberler/growtify-saglik-rehberi.pdf",
    ghlSectorTag: "gai_sector_saglik",
    ghlLeadMagnetTag: "gai_lm_saglik",
    seo: {
      title: "Sağlık Profesyonelleri için AI Başlangıç Rehberi | Growtify AI",
      description:
        "Diyetisyen, psikolog, fizyoterapist için ücretsiz AI rehberi. 5 araç, 3 senaryo, 10 prompt. İndirmek için email ver.",
    },
  },

  hukuk: {
    slug: "hukuk",
    name: "Hukuk",
    icon: "⚖️",
    hero: {
      title: "Avukatlar için AI: 10 Dakikada Yapabileceğiniz 5 Şey",
      subtitle: "İçtihat araştırması, dilekçe yazımı, müvekkil iletişimi — AI ile demo eşliğinde",
      painHook:
        "İçtihat araştırmasına günde 3 saat, dilekçe taslağına 2 saat — bu sürelerin çoğunu geri alabilirsin. AI 3 saatlik işi 20 dakikaya sıkıştırır; müvekkile daha fazla zaman, büroyla daha az zaman.",
    },
    whatInside: [
      "AI ile içtihat araştırma — 3 saat → 20 dakika (adım adım demo)",
      "Dilekçe şablon üretimi — Claude ve ChatGPT prompt'larıyla hazır taslaklar",
      "Müvekkil iletişim şablonları — tutarlı, profesyonel, zaman kazandıran",
      "15 kopyala-yapıştır prompt paketi — hukuka özel, mesleğe uygun",
      "5 AI aracı karşılaştırması — avukatlık pratiği için hangisi ne zaman kullanılır",
    ],
    targetProfile: "Serbest avukat, hukuk danışmanı, arabulucu, hukuk bürosu yöneticisi",
    pdfUrl: "/rehberler/growtify-hukuk-rehberi.pdf",
    ghlSectorTag: "gai_sector_hukuk",
    ghlLeadMagnetTag: "gai_lm_hukuk",
    seo: {
      title: "Avukatlar için AI Rehberi — 10 Dakikada 5 İş | Growtify AI",
      description:
        "Avukatlar için ücretsiz AI rehberi. İçtihat, dilekçe, müvekkil iletişimi. 15 prompt + 5 araç karşılaştırması.",
    },
  },

  guzellik: {
    slug: "guzellik",
    name: "Güzellik & Estetik",
    icon: "💄",
    hero: {
      title: "Salon & Klinik için AI İçerik Üretim Rehberi",
      subtitle: "30 günlük Instagram plan + Canva prompt'ları + hashtag stratejisi",
      painHook:
        "Instagram içeriğine haftada 5 saat harcıyor musun? Sonra \"hiç kimse görmüyor\" diye üzülüyor musun? Sorun kalite değil — sistematik olmaması. AI ile bir kez oturuyorsun, ayın tamamını planlıyorsun.",
    },
    whatInside: [
      "30 günlük Instagram içerik planı — 30 post, her biri metni hazır",
      "50+ Canva AI prompt'u — salon/klinik görsellerine özel, farklı formatlar için",
      "Hashtag stratejisi — sektörel araştırma ile seçilmiş, segmentlere göre ayrılmış",
      "5 Reels script şablonu — hikaye anlatımından before/after formatına kadar",
      "Müşteri sadakat mesaj dizisi — randevu sonrasından doğum gününe kadar otomatik",
    ],
    targetProfile: "Salon sahibi, estetisyen, klinik yöneticisi, kuaför",
    pdfUrl: "/rehberler/growtify-guzellik-rehberi.pdf",
    ghlSectorTag: "gai_sector_guzellik",
    ghlLeadMagnetTag: "gai_lm_guzellik",
    seo: {
      title: "Salon & Klinik için AI İçerik Rehberi | Growtify AI",
      description:
        "30 günlük Instagram plan + 50+ Canva prompt + hashtag stratejisi + 5 Reels şablonu. Güzellik ve estetik için ücretsiz.",
    },
  },

  emlak: {
    slug: "emlak",
    name: "Emlak",
    icon: "🏠",
    hero: {
      title: "Emlak Profesyonelleri için AI Rehberi",
      subtitle: "İlan yazmaktan müşteri eşleştirmeye — haftada 10 saat geri kazan",
      painHook:
        "Bir gayrimenkul danışmanının zamanının %40'ı içerik üretimine ve idari işlere gidiyor — satışa değil. Her ilan sıfırdan, her görüşme ayrı bir rapor. AI bu tekrar eden yükü alır; sen alıcı-satıcıya odaklanırsın.",
    },
    whatInside: [
      "3 pratik senaryo — ilan üretim hattı, müşteri eşleştirme, piyasa raporu",
      "5 AI aracı karşılaştırması — emlak pratiği için hangisi ne zaman",
      "15 kopyala-yapıştır prompt — konut/ticari/arsa ilanından bölge analizine",
      "İlk 7 gün checklist — sıfırdan sistemi kurmak için adım adım",
      "Eskiden → Şimdi karşılaştırma — somut zaman tasarrufu rakamlarıyla",
    ],
    targetProfile: "Emlakçı, gayrimenkul danışmanı, arsa uzmanı",
    pdfUrl: "/rehberler/growtify-emlak-rehberi.pdf",
    ghlSectorTag: "gai_sector_emlak",
    ghlLeadMagnetTag: "gai_lm_emlak",
    seo: {
      title: "Emlak Profesyonelleri için AI Rehberi | Growtify AI",
      description:
        "İlan üretim hattı, müşteri eşleştirme, piyasa raporu. 15 prompt + 5 araç + 7 gün checklist. Emlakçılar için ücretsiz.",
    },
  },

  eticaret: {
    slug: "eticaret",
    name: "E-Ticaret",
    icon: "🛒",
    hero: {
      title: "E-Ticaret Satıcıları için AI İçerik & Büyüme Rehberi",
      subtitle: "Yüzlerce ürün açıklaması, müşteri hizmetleri ve reklam — hepsini AI ile yönet",
      painHook:
        "100 ürünlük bir mağaza için 100 farklı açıklama — her biri SEO uyumlu, ikna edici, platforma özel. Bu işe haftalar harcıyorsun ya da kaliteyi feda ediyorsun. AI üç sorunu aynı anda çözüyor.",
    },
    whatInside: [
      "3 pratik senaryo — ürün içerik fabrikası, müşteri hizmetleri asistanı, reklam optimizasyonu",
      "5 AI aracı — e-ticaret operasyonu için seçilmiş",
      "12 kopyala-yapıştır prompt — giyimden elektroniğe, kozmetikten gıdaya",
      "İlk 7 gün checklist — AI sistemini mağazana entegre etmek için adım adım",
      "Eskiden → Şimdi karşılaştırma — ürün başına zaman ve dönüşüm oranı",
    ],
    targetProfile: "E-ticaret satıcı, marka sahibi, dropshipping, butik işletme",
    pdfUrl: "/rehberler/growtify-eticaret-rehberi.pdf",
    ghlSectorTag: "gai_sector_eticaret",
    ghlLeadMagnetTag: "gai_lm_eticaret",
    seo: {
      title: "E-Ticaret için AI İçerik ve Büyüme Rehberi | Growtify AI",
      description:
        "Ürün içerik fabrikası + müşteri hizmetleri + reklam optimizasyonu. 12 prompt + 5 araç. Trendyol, Shopify satıcıları için ücretsiz.",
    },
  },

  dis: {
    slug: "dis",
    name: "Diş Hekimliği",
    icon: "🦷",
    hero: {
      title: "Dental Klinikler için AI İletişim & Pazarlama Rehberi",
      subtitle: "Çok dilli hasta iletişimi, klinik itibar ve tedavi bilgilendirmesi — AI ile sistematik",
      painHook:
        "Dental turizm Türkiye için büyük bir fırsat — ama dil bariyeri ve yetersiz online varlık bunu yavaşlatıyor. Türk hastalar da tedavi süreçleri hakkında yetersiz bilgiyle geliyor. AI her iki sorunu çözüyor.",
    },
    whatInside: [
      "3 pratik senaryo — çok dilli hasta iletişim sistemi, tedavi bilgilendirme, itibar yönetimi",
      "5 AI aracı — dental klinik için seçilmiş",
      "12 kopyala-yapıştır prompt — İngilizce/Almanca hasta yazışmasından Google yorum yanıtına",
      "İlk 7 gün checklist — sistemi kurmak için adım adım",
      "Dental turizm için özel sunum şablonu",
    ],
    targetProfile: "Diş hekimi, ortodontist, dental klinik yöneticisi",
    pdfUrl: "/rehberler/growtify-dis-rehberi.pdf",
    ghlSectorTag: "gai_sector_dis",
    ghlLeadMagnetTag: "gai_lm_dis",
    seo: {
      title: "Dental Klinikler için AI İletişim ve Pazarlama Rehberi | Growtify AI",
      description:
        "Çok dilli hasta iletişimi + tedavi bilgilendirme + itibar yönetimi + dental turizm şablonu. Diş hekimleri için ücretsiz.",
    },
  },

  muhasebe: {
    slug: "muhasebe",
    name: "Muhasebe (SMMM)",
    icon: "📊",
    hero: {
      title: "Mali Müşavirler için AI Otomasyon Rehberi",
      subtitle: "Ay sonu kapanışından mevzuat takibine — tekrar eden işleri AI'a bırak",
      painHook:
        "Ay sonu geliyor: yüzlerce belge, son dakika beyannameler, müşteri telefonları. Her şey aynı anda — ve danışmanlık yapmak için vakit kalmıyor. AI belge yükünü azaltıyor; sen değer katan işe odaklanıyorsun.",
    },
    whatInside: [
      "3 pratik senaryo — belge işleme otomasyonu, mevzuat takibi, aylık müşteri raporu",
      "5 AI aracı — muhasebe pratiği için seçilmiş",
      "12 kopyala-yapıştır prompt — belge sınıflandırmadan vergi planlama notuna",
      "İlk 7 gün checklist — sistemi büronuza entegre etmek için adım adım",
      "Eskiden → Şimdi karşılaştırma — ay sonu kapanış süresinde somut tasarruf",
    ],
    targetProfile: "SMMM, mali müşavir, muhasebe bürosu sahibi, finansal danışman",
    pdfUrl: "/rehberler/growtify-muhasebe-rehberi.pdf",
    ghlSectorTag: "gai_sector_muhasebe",
    ghlLeadMagnetTag: "gai_lm_muhasebe",
    seo: {
      title: "Mali Müşavirler için AI Otomasyon Rehberi | Growtify AI",
      description:
        "Belge işleme + mevzuat takibi + aylık müşteri raporu otomasyonu. 12 prompt + 5 araç. SMMM'ler için ücretsiz.",
    },
  },

  eczacilik: {
    slug: "eczacilik",
    name: "Eczacılık",
    icon: "💊",
    hero: {
      title: "Eczacılar için AI Stok, Müşteri & İçerik Rehberi",
      subtitle: "Stok tahmini, kronik hasta takibi ve e-eczane içeriği — hepsini sistematize et",
      painHook:
        "Mevsim değişiyor ama hangi ürünün stoğunu ne kadar artıracağını tam bilemiyorsun. Kronik hastalara düzenli hatırlatma gönderecek vakit yok. E-eczane içeriği ayrı bir iş. AI üç sorunu aynı anda çözüyor.",
    },
    whatInside: [
      "3 pratik senaryo — stok ve talep tahmini, e-eczane içerik üretimi, müşteri sadakat sistemi",
      "5 AI aracı — eczane operasyonu için seçilmiş",
      "10 kopyala-yapıştır prompt — ürün açıklamasından kronik hasta takibine",
      "İlk 7 gün checklist — sistemi eczanenize entegre etmek için adım adım",
      "Yasal uyarı şablonları — ilaç içeriğinde zorunlu uyarıları otomatize et",
    ],
    targetProfile: "Serbest eczacı, eczane sahibi, eczane zinciri yöneticisi",
    pdfUrl: "/rehberler/growtify-eczacilik-rehberi.pdf",
    ghlSectorTag: "gai_sector_eczacilik",
    ghlLeadMagnetTag: "gai_lm_eczacilik",
    seo: {
      title: "Eczacılar için AI Stok, Müşteri ve İçerik Rehberi | Growtify AI",
      description:
        "Stok tahmini + kronik hasta takibi + e-eczane içeriği. 10 prompt + 5 araç + yasal uyarı şablonları. Eczacılar için ücretsiz.",
    },
  },

  turizm: {
    slug: "turizm",
    name: "Turizm",
    icon: "✈️",
    hero: {
      title: "Turizm Profesyonelleri için AI Rehberi",
      subtitle: "Çok dilli 7/24 hizmet, kişisel tur planı ve rezervasyon otomasyonu tek rehberde",
      painHook:
        "Rusça müşteri mesaj attı, Almanca misafir özel tur istedi, İngilizce bir soru DM'de bekliyor. Hepsi anında cevap bekliyor — ama sen bir kişisin. AI bu çok dilli iletişimi 7/24 üstlenir.",
    },
    whatInside: [
      "5 AI aracı — turizm operasyonu için seçilmiş (Claude, ChatGPT, ManyChat, Calendly, Canva AI)",
      "3 pratik senaryo — çok dilli chatbot, kişisel tur planı, yorum yönetimi",
      "10 kopyala-yapıştır prompt — rezervasyon onayından gezi programına her şey hazır",
      "İlk 7 gün checklist — sıfırdan çok dilli sistemi kurmak için adım adım",
      "5 dil şablonu — TR, EN, AR, DE, RU için hazır mesajlar",
    ],
    targetProfile: "Tur operatörü, rehber, butik otel sahibi, seyahat acentesi",
    pdfUrl: "/rehberler/growtify-turizm-rehberi.pdf",
    ghlSectorTag: "gai_sector_turizm",
    ghlLeadMagnetTag: "gai_lm_turizm",
    seo: {
      title: "Turizm Profesyonelleri için AI Rehberi | Growtify AI",
      description:
        "Çok dilli chatbot + kişisel tur planı + yorum yönetimi. 5 dil şablonu + 10 prompt + 5 araç. Tur operatörleri için ücretsiz.",
    },
  },

  mimarlik: {
    slug: "mimarlik",
    name: "Mimarlık",
    icon: "📐",
    hero: {
      title: "Mimarlar için AI Render & Sunum Rehberi",
      subtitle: "2 günlük render beklentisini 2 dakikaya düşüren AI araçları — konsept, sunum, proje yönetimi",
      painHook:
        "Müşteri \"şöyle bir şey hayal ediyorum\" dediğinde, 3 farklı konsept için bir haftayı beklemek zorunda mı? O bir hafta içinde rakibine gidiyor. AI render araçları süreci dakikalara indiriyor.",
    },
    whatInside: [
      "5 AI aracı — mimarlık için seçilmiş (Midjourney, Leonardo AI, Claude, Canva, Stable Diffusion)",
      "3 pratik senaryo — AI render üretimi, müşteri sunumu, proje akışı otomasyonu",
      "10 prompt kütüphanesi — iç mekan, dış cephe, peyzaj, detay render için",
      "İlk 7 gün checklist — AI render sisteminizi kurmak için adım adım",
      "Müşteri sunumu pitch deck şablonu — konseptten teslim planına",
    ],
    targetProfile: "Mimar, iç mimar, peyzaj mimarı, proje tasarım ofisi",
    pdfUrl: "/rehberler/growtify-mimarlik-rehberi.pdf",
    ghlSectorTag: "gai_sector_mimarlik",
    ghlLeadMagnetTag: "gai_lm_mimarlik",
    seo: {
      title: "Mimarlar için AI Render ve Sunum Rehberi | Growtify AI",
      description:
        "2 dakikada 3 konsept render + pitch deck şablonu + proje akışı. 10 prompt + 5 araç. Mimarlar için ücretsiz.",
    },
  },

  egitim: {
    slug: "egitim",
    name: "Eğitim",
    icon: "🎓",
    hero: {
      title: "Eğitmenler için AI Materyal Üretim Rehberi",
      subtitle: "Soru bankası, sunum, kişisel geri bildirim — 10 saatlik materyal işi 90 dakikada",
      painHook:
        "Pazar gecesi, önündeki yığın: ders sunumu, 3 sınıfa soru, 20 ödev değerlendirmesi. Bunlar bitince ders anlatmaya mecal kalmıyor. AI bu yığını 1/5'ine indiriyor.",
    },
    whatInside: [
      "5 AI aracı — eğitim için seçilmiş (Claude, ChatGPT, Canva, Kahoot, Notion AI)",
      "3 pratik senaryo — soru bankası, sunum üretimi, kişisel geri bildirim sistemi",
      "10 kopyala-yapıştır prompt — her konu ve zorluk seviyesinde materyal için",
      "İlk 7 gün checklist — materyal iş akışını AI ile yeniden tasarlamak için",
      "Kişisel geri bildirim şablonu — 30 öğrenciye özel yorum 30 dakikada",
    ],
    targetProfile: "Eğitmen, akademisyen, özel ders öğretmeni, online kurs yapımcısı",
    pdfUrl: "/rehberler/growtify-egitim-rehberi.pdf",
    ghlSectorTag: "gai_sector_egitim",
    ghlLeadMagnetTag: "gai_lm_egitim",
    seo: {
      title: "Eğitmenler için AI Materyal Üretim Rehberi | Growtify AI",
      description:
        "Soru bankası + sunum + kişisel geri bildirim. 10 prompt + 5 araç + 7 gün checklist. Eğitmenler için ücretsiz rehber.",
    },
  },

  fitness: {
    slug: "fitness",
    name: "Fitness",
    icon: "💪",
    hero: {
      title: "Fitness Profesyonelleri için AI Program Rehberi",
      subtitle: "Her müşteriye özel antrenman + beslenme + takip — dakikalar içinde, ölçeklenebilir",
      painHook:
        "15 müşterin var, her birine özel program yazmak haftada 10 saat. Motivasyon mesajları, takip, beslenme düzeltmeleri birikiyor — sonra müşteri gidiyor. AI bu yükü senden alır.",
    },
    whatInside: [
      "5 AI aracı — fitness pratiği için seçilmiş (Claude, ChatGPT, Trainerize, Canva AI, WhatsApp Business)",
      "3 pratik senaryo — antrenman programı üretimi, beslenme planı, motivasyon takibi",
      "10 kopyala-yapıştır prompt — seviye × hedef × ekipman matrisinde hazır program",
      "İlk 7 gün checklist — müşteri sisteminizi AI ile yeniden kurmak için",
      "Motivasyon mesajı şablon paketi — haftanın her günü için hazır",
    ],
    targetProfile: "Personal trainer, fitness stüdyosu sahibi, beslenme danışmanı",
    pdfUrl: "/rehberler/growtify-fitness-rehberi.pdf",
    ghlSectorTag: "gai_sector_fitness",
    ghlLeadMagnetTag: "gai_lm_fitness",
    seo: {
      title: "Fitness Profesyonelleri için AI Program Rehberi | Growtify AI",
      description:
        "Kişisel antrenman + beslenme planı + motivasyon takibi. 10 prompt + 5 araç + 7 gün şablon paketi. PT'ler için ücretsiz.",
    },
  },
};

export const REHBER_SLUGS = Object.keys(REHBERLER) as Array<keyof typeof REHBERLER>;

export function getRehber(slug: string): RehberContent | null {
  return REHBERLER[slug] ?? null;
}
