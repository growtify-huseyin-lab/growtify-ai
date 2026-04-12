/**
 * Lead magnet content — 6 sectoral PDF guides + metadata.
 *
 * Each sector has:
 * - slug: URL path segment
 * - name: display name
 * - hero content (title, subtitle, pain hook)
 * - what's inside (bullet list)
 * - pdfUrl: public PDF path (placeholder until content production)
 * - ghl tag keys (sector, lead magnet)
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
      painHook: "Danışan takip formları, seans notları, Instagram içeriği, randevu hatırlatmaları — bunlara zamanın çoğu gidiyor mu?",
    },
    whatInside: [
      "5 AI aracı — sağlık pratiği için seçilmiş (ChatGPT, Claude, Calendly, Whisper, Canva)",
      "3 pratik uygulama senaryosu — adım adım, screenshot'lı",
      "Danışan iletişim şablon paketi — kopyala-yapıştır hazır",
      "İlk 7 gün checklist'i — sıfırdan başlayıp ilk sonucu alma",
      "Örnek: 10 saat tasarruf eden bir diyetisyenin süreç haritası",
    ],
    targetProfile: "Diyetisyen, psikolog, doktor, fizyoterapist, eczacı",
    pdfUrl: "/rehberler/growtify-saglik-rehberi.pdf",
    ghlSectorTag: "gai_sector_saglik",
    ghlLeadMagnetTag: "gai_lm_saglik",
    seo: {
      title: "Sağlık Profesyonelleri için AI Başlangıç Rehberi | Growtify AI",
      description: "Diyetisyen, psikolog, doktor için ücretsiz AI rehberi. 5 araç, 3 senaryo, 10 saat/hafta tasarruf. İndirmek için email ver.",
    },
  },

  hukuk: {
    slug: "hukuk",
    name: "Hukuk",
    icon: "⚖️",
    hero: {
      title: "Avukatlar için AI: 10 Dakikada Yapabileceğiniz 5 Şey",
      subtitle: "İçtihat araştırması, dilekçe yazımı, müvekkil iletişimi — AI ile demo eşliğinde",
      painHook: "İçtihat araştırmasına günde 3 saat, dilekçe taslağına 2 saat — bu sürelerin çoğunu geri alabilir misin?",
    },
    whatInside: [
      "AI ile içtihat araştırma — 3 saat → 20 dakika (adım adım demo)",
      "Dilekçe şablon üretimi — ChatGPT prompt'ları + Claude örnekleri",
      "Müvekkil iletişim şablonları — tutarlı, profesyonel, hızlı",
      "5 dakikalık video demo — canlı ekran kaydı",
      "Prompt kütüphanesi (15 hazır prompt, mesleğe özel)",
    ],
    targetProfile: "Serbest avukat, hukuk danışmanı, noter, arabulucu",
    pdfUrl: "/rehberler/growtify-hukuk-rehberi.pdf",
    ghlSectorTag: "gai_sector_hukuk",
    ghlLeadMagnetTag: "gai_lm_hukuk",
    seo: {
      title: "Avukatlar için AI Rehberi — 10 Dakikada 5 İş | Growtify AI",
      description: "Avukatlar için ücretsiz AI rehberi. İçtihat, dilekçe, müvekkil iletişimi. Video demo + prompt kütüphanesi.",
    },
  },

  guzellik: {
    slug: "guzellik",
    name: "Güzellik & Estetik",
    icon: "💄",
    hero: {
      title: "Salon & Klinik için AI İçerik Üretim Rehberi",
      subtitle: "30 günlük Instagram plan + Canva prompt'ları + hashtag stratejisi",
      painHook: "Instagram içeriğine haftada 5 saat harcıyor musun? Sonra \"hiç kimse görmüyor\" diye üzülüyor musun?",
    },
    whatInside: [
      "30 günlük Instagram içerik planı (30 post, her biri hazır)",
      "50+ Canva AI prompt'u — salon/klinik için özel tasarlandı",
      "Hashtag stratejisi — sektörel araştırma ile seçilmiş",
      "Reels script şablonları (5 farklı format)",
      "Randevu booking entegrasyon rehberi (Calendly + Instagram DM)",
    ],
    targetProfile: "Salon sahibi, estetisyen, klinik yöneticisi, kuaför",
    pdfUrl: "/rehberler/growtify-guzellik-rehberi.pdf",
    ghlSectorTag: "gai_sector_guzellik",
    ghlLeadMagnetTag: "gai_lm_guzellik",
    seo: {
      title: "Salon & Klinik için AI İçerik Rehberi | Growtify AI",
      description: "30 günlük Instagram plan + Canva prompt'ları + hashtag stratejisi. Güzellik ve estetik sektörüne özel.",
    },
  },

  emlak: {
    slug: "emlak",
    name: "Emlak",
    icon: "🏠",
    hero: {
      title: "AI ile Emlak İlanı Yazmak: Adım Adım Rehber",
      subtitle: "3 adımda AI ile ilan yazma + prompt şablonları + SEO optimize",
      painHook: "Her yeni ilan için 30-45 dakika harcıyor musun? Hangi ilanın neden satmadığını bilmiyor musun?",
    },
    whatInside: [
      "3 adımda AI ilan yazma süreci — 5 dakikada profesyonel ilan",
      "15 hazır prompt şablonu (konut tipi bazlı)",
      "SEO-optimize formül — sahibinden, hurriyetemlak için özelleştirilmiş",
      "Photo enhancement + AI görsel araçları",
      "İlan A/B test checklist'i — hangi başlık daha çok tıklanır",
    ],
    targetProfile: "Emlakçı, gayrimenkul danışmanı, arsa uzmanı",
    pdfUrl: "/rehberler/growtify-emlak-rehberi.pdf",
    ghlSectorTag: "gai_sector_emlak",
    ghlLeadMagnetTag: "gai_lm_emlak",
    seo: {
      title: "Emlakçılar için AI İlan Yazma Rehberi | Growtify AI",
      description: "5 dakikada profesyonel emlak ilanı. 15 prompt şablonu + SEO formül + A/B test rehberi.",
    },
  },

  eticaret: {
    slug: "eticaret",
    name: "E-Ticaret",
    icon: "🛒",
    hero: {
      title: "AI ile Ürün Açıklaması Yazma Rehberi",
      subtitle: "50 hazır prompt + SEO formülü + A/B test framework'u + örnek sonuçlar",
      painHook: "500 ürün açıklamasını tek tek yazmak imkansız görünüyor mu? Trendyol/Shopify SEO optimize düşen satışlar seni yoruyor mu?",
    },
    whatInside: [
      "50 hazır prompt paketi — ürün kategorilerine göre",
      "SEO formülü — Trendyol, N11, Hepsiburada için özelleştirilmiş",
      "A/B test framework'u — hangi açıklama daha çok satıyor",
      "Örnek before/after — 3 farklı ürün üzerinde dönüşüm",
      "Ürün fotoğrafı AI enhancement araçları listesi",
    ],
    targetProfile: "E-ticaret satıcı, marka sahibi, dropshipping, butik işletme",
    pdfUrl: "/rehberler/growtify-eticaret-rehberi.pdf",
    ghlSectorTag: "gai_sector_eticaret",
    ghlLeadMagnetTag: "gai_lm_eticaret",
    seo: {
      title: "E-Ticaret için AI Ürün Açıklama Rehberi | Growtify AI",
      description: "50 hazır prompt + SEO formülü + A/B test framework'u. Trendyol, N11, Shopify satıcıları için.",
    },
  },

  dis: {
    slug: "dis",
    name: "Diş Hekimliği",
    icon: "🦷",
    hero: {
      title: "Dental Klinikler için Dijital Pazarlama + AI Rehberi",
      subtitle: "Google profil optimizasyonu + AI hasta iletişimi + dental turizm stratejisi",
      painHook: "Dental turizm pazarından pay alabilir misin? Hasta iletişimi senin zamanının yarısını mı alıyor?",
    },
    whatInside: [
      "Google My Business optimizasyon checklist'i — dental klinikler için",
      "AI hasta iletişim şablon paketi (Türkçe + İngilizce + Arapça)",
      "Dental turizm pazarı — giriş rehberi + SEO stratejisi",
      "Multi-dil website setup rehberi",
      "Randevu chatbot kurulum örneği",
    ],
    targetProfile: "Diş hekimi, ortodontist, dental klinik yöneticisi",
    pdfUrl: "/rehberler/growtify-dis-rehberi.pdf",
    ghlSectorTag: "gai_sector_dis",
    ghlLeadMagnetTag: "gai_lm_dis",
    seo: {
      title: "Dental Klinikler için AI + Dijital Pazarlama Rehberi | Growtify AI",
      description: "Google profil + AI hasta iletişimi + dental turizm stratejisi. Diş hekimleri için özel.",
    },
  },

  muhasebe: {
    slug: "muhasebe",
    name: "Muhasebe (SMMM)",
    icon: "📊",
    hero: {
      title: "Mali Müşavirler için AI Otomasyon Rehberi",
      subtitle: "Ay sonu kapanışını 3 güne düşüren, müşteri danışmanlığına zaman kazandıran pratik rehber",
      painHook: "Ay sonu kapanışında her ay 3 gün uyuyamıyor musun? Belge tanıma + fatura eşleştirme hâlâ manuel mi?",
    },
    whatInside: [
      "5 AI aracı — mali müşavirler için seçilmiş (belge OCR, fatura eşleştirme, rapor üretimi)",
      "e-Fatura / e-Arşiv işlemleri için AI iş akışı örnekleri",
      "Müşteri danışmanlığına AI ile zaman kazanma stratejisi — düşük katma değerli işleri otomatikleştir",
      "Vergi beyannamesi hazırlık checklist'i (AI destekli kontrol listesi)",
      "Örnek: 3 günlük ay sonu kapanışını 1 güne indiren bir SMMM'nin iş akışı",
    ],
    targetProfile: "SMMM, muhasebeci, finansal danışman, mali müşavir büro yöneticisi",
    pdfUrl: "/rehberler/growtify-muhasebe-rehberi.pdf",
    ghlSectorTag: "gai_sector_muhasebe",
    ghlLeadMagnetTag: "gai_lm_muhasebe",
    seo: {
      title: "Mali Müşavirler için AI Otomasyon Rehberi | Growtify AI",
      description: "Ay sonu kapanışını 3 güne düşüren AI iş akışları. SMMM'ler için ücretsiz rehber.",
    },
  },

  eczacilik: {
    slug: "eczacilik",
    name: "Eczacılık",
    icon: "💊",
    hero: {
      title: "Eczacılar için AI Stok & Müşteri Yönetimi Rehberi",
      subtitle: "Stok yönetiminden müşteri sadakatine — eczaneni AI ile büyüt",
      painHook: "Stok fazlası nedeniyle fireniz yüksek mi? Müşterilerin ismen hatırlayamıyor musun?",
    },
    whatInside: [
      "AI destekli stok tahmin modelleri — mevsime ve satış geçmişine göre optimum sipariş",
      "Kronik hasta takip otomasyonu — reçete hatırlatma + takip WhatsApp şablonları",
      "Reçetesiz ürün (OTC) çapraz satış önerileri — AI ile kişisel tavsiye",
      "Eczane için Google Maps ve sosyal medya optimizasyonu rehberi",
      "Örnek: Fire oranını %30 düşüren bir eczanenin AI stok sistemi",
    ],
    targetProfile: "Serbest eczacı, eczane müdürü, eczane zinciri yöneticisi",
    pdfUrl: "/rehberler/growtify-eczacilik-rehberi.pdf",
    ghlSectorTag: "gai_sector_eczacilik",
    ghlLeadMagnetTag: "gai_lm_eczacilik",
    seo: {
      title: "Eczacılar için AI Stok ve Müşteri Yönetimi Rehberi | Growtify AI",
      description: "Fire oranını %30 düşüren AI stok modelleri + kronik hasta takip otomasyonu. Eczacılar için ücretsiz.",
    },
  },

  turizm: {
    slug: "turizm",
    name: "Turizm",
    icon: "✈️",
    hero: {
      title: "Turizm Profesyonelleri için AI Rehberi",
      subtitle: "7/24 çok dilli hizmet + kişisel tur deneyimi + rezervasyon otomasyonu",
      painHook: "Gece 2'de yabancı müşterinin WhatsApp mesajına cevap veriyor musun? Tur planlaması hâlâ manuel mi?",
    },
    whatInside: [
      "5 dilli AI chatbot kurulum rehberi (TR, EN, AR, DE, RU)",
      "Kişisel tur planlayıcısı — müşteri profiline göre özel rota üretimi",
      "Rezervasyon otomasyonu (Calendly + Stripe + email hatırlatma)",
      "TripAdvisor ve Google yorum yönetimi için AI şablonları",
      "Örnek: Sezon dışında bile günde 3 rezervasyon alan bir butik tur şirketi",
    ],
    targetProfile: "Tur operatörü, rehber, butik otel sahibi, seyahat acentesi",
    pdfUrl: "/rehberler/growtify-turizm-rehberi.pdf",
    ghlSectorTag: "gai_sector_turizm",
    ghlLeadMagnetTag: "gai_lm_turizm",
    seo: {
      title: "Turizm Profesyonelleri için AI Rehberi | Growtify AI",
      description: "5 dilli chatbot + kişisel tur planlayıcısı + rezervasyon otomasyonu. Tur operatörleri için ücretsiz.",
    },
  },

  mimarlik: {
    slug: "mimarlik",
    name: "Mimarlık",
    icon: "📐",
    hero: {
      title: "Mimarlar için AI Render & Sunum Rehberi",
      subtitle: "2 günlük render beklentisini 2 dakikaya düşüren AI araçları",
      painHook: "Müşteri 3 konsept istediğinde hâlâ \"1 hafta sonra\" mı diyorsun? Konsept aşamasında rakiplere iş kaptırıyor musun?",
    },
    whatInside: [
      "AI render araçları karşılaştırması (Midjourney, Leonardo AI, Stable Diffusion) — mimarlık için",
      "Konsept → render prompt kütüphanesi (iç mekan, dış cephe, peyzaj)",
      "Müşteri sunumu için AI destekli pitch deck şablonu",
      "Proje yönetimi otomasyonu: Müşteri brief → konsept → revizyon akışı",
      "Örnek: 2 günlük konsept sürecini 2 saate indiren bir iç mimarlık ofisi",
    ],
    targetProfile: "Mimar, iç mimar, peyzaj mimarı, proje tasarım ofisi",
    pdfUrl: "/rehberler/growtify-mimarlik-rehberi.pdf",
    ghlSectorTag: "gai_sector_mimarlik",
    ghlLeadMagnetTag: "gai_lm_mimarlik",
    seo: {
      title: "Mimarlar için AI Render ve Konsept Rehberi | Growtify AI",
      description: "2 dakikada 3 konsept render. Midjourney, Leonardo AI prompt kütüphanesi. Mimarlar için ücretsiz.",
    },
  },

  egitim: {
    slug: "egitim",
    name: "Eğitim",
    icon: "🎓",
    hero: {
      title: "Eğitmenler için AI Materyal Üretim Rehberi",
      subtitle: "Kişisel materyali dakikalar içinde üret — soru bankası + sunumlar + kişisel geri bildirim",
      painHook: "Ders materyali hazırlamaya haftada 10 saat harcıyor musun? Her öğrenciye özel geri bildirim fizibil değil mi?",
    },
    whatInside: [
      "AI ile soru bankası üretimi — her zorluk seviyesinde, her konu için",
      "Sunum ve ders notu otomasyonu — konu başlığından slide'a",
      "Her öğrenciye özel geri bildirim şablonları — 10 saatlik iş 30 dakikada",
      "Online kurs platformu setup rehberi (Teachable, Thinkific alternatifleri)",
      "Örnek: Haftalık materyal hazırlığını 10 saatten 1.5 saate indiren bir öğretmenin iş akışı",
    ],
    targetProfile: "Eğitmen, online kurs yapımcısı, akademisyen, özel ders öğretmeni",
    pdfUrl: "/rehberler/growtify-egitim-rehberi.pdf",
    ghlSectorTag: "gai_sector_egitim",
    ghlLeadMagnetTag: "gai_lm_egitim",
    seo: {
      title: "Eğitmenler için AI Materyal Üretim Rehberi | Growtify AI",
      description: "Soru bankası + sunum + kişisel geri bildirim otomasyonu. Eğitmenler için ücretsiz rehber.",
    },
  },

  fitness: {
    slug: "fitness",
    name: "Fitness",
    icon: "💪",
    hero: {
      title: "Fitness Profesyonelleri için AI Program Rehberi",
      subtitle: "Her müşteriye özel program — dakikalar içinde, haftada onlarca müşteri",
      painHook: "Her müşteriye özel program yazmak zaman alıyor mu? Müşteri takibi eksik kalıyor mu?",
    },
    whatInside: [
      "AI ile kişiye özel antrenman planı üretimi — seviye, hedef, ekipman bazında",
      "Beslenme planı otomasyonu — hedef kalori + makro bazlı",
      "Müşteri ilerleme takibi (fotoğraf + metrik analizi)",
      "WhatsApp motivasyon mesajları için AI şablon paketi",
      "Örnek: Haftada 50 müşteriye kişisel hizmet veren bir PT'nin AI iş akışı",
    ],
    targetProfile: "Personal trainer, fitness stüdyosu sahibi, beslenme danışmanı",
    pdfUrl: "/rehberler/growtify-fitness-rehberi.pdf",
    ghlSectorTag: "gai_sector_fitness",
    ghlLeadMagnetTag: "gai_lm_fitness",
    seo: {
      title: "Fitness Profesyonelleri için AI Program Rehberi | Growtify AI",
      description: "Kişiye özel antrenman ve beslenme planı otomasyonu. PT'ler ve stüdyolar için ücretsiz.",
    },
  },
};

export const REHBER_SLUGS = Object.keys(REHBERLER) as Array<keyof typeof REHBERLER>;

export function getRehber(slug: string): RehberContent | null {
  return REHBERLER[slug] ?? null;
}
