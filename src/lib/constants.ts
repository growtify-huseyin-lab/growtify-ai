export const SITE = {
  name: "Growtify.ai",
  tagline: "AI ile işini büyüten profesyonellerin platformu",
  domain: "growtify.ai",
  platformDomain: "go.growtify.ai",
  description:
    "Bireysel profesyonellere ve KOBİ'lere GROWT Method ile AI dönüşümü sağlıyoruz. Kurs değil danışmanlık, teori değil uygulama.",
} as const;

export const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "GROWT Method", href: "/growt-method" },
  { label: "Sektörler", href: "/sektor" },
  { label: "Blog", href: "/blog" },
  { label: "İletişim", href: "/iletisim" },
] as const;

export const GROWT_PHASES = [
  {
    letter: "G",
    name: "Gap Analysis",
    level: 1,
    moduleCount: 4,
    badge: { color: "#EF4444" },
    motto: "Neredesin, ne kaybediyorsun?",
    description:
      "İşindeki yapay zeka fırsatlarını keşfet, AI olmadan her ay neler kaçırdığını gör.",
    elements: [
      "Agentic Demolar",
      "Sektör Kütüphanesi",
      "Durum Değerlendirmesi",
      "Kayıp Hesaplama",
    ],
    color: "bg-red-500",
  },
  {
    letter: "R",
    name: "Roadmap",
    level: 2,
    moduleCount: 4,
    badge: { color: "#F97316" },
    motto: "Ne yapmalısın, hangi sırayla?",
    description:
      "Araç değil kafa yapısı. İşinin en çok büyüyeceği alanlara odaklan.",
    elements: [
      "AI Kafa Yapısı",
      "Öncelik Seçimi",
      "Beklenti Yönetimi",
      "Kişisel Plan",
    ],
    color: "bg-orange-500",
  },
  {
    letter: "O",
    name: "Operationalize",
    level: 3,
    moduleCount: 6,
    badge: { color: "#EAB308" },
    motto: "İlk adımını at",
    description:
      "Yapay zeka ile ilk iş problemini çöz ve günlük işleyişine entegre et.",
    elements: [
      "İlk Uygulama",
      "Sistematik Düşünme",
      "Problem Çözme",
      "Rutin Entegrasyonu",
      "Büyümeye Çevirme",
    ],
    color: "bg-yellow-500",
  },
  {
    letter: "W",
    name: "Win",
    level: 4,
    moduleCount: 4,
    badge: { color: "#22C55E" },
    motto: "İşini büyüt",
    description:
      "Müşteri bul, kazan, yönet — yapay zeka ile tam iş büyütme stratejisi.",
    elements: [
      "Potansiyel Müşterileri Bulma",
      "Müşteri Edinimi",
      "Müşteri Deneyimi",
      "Ölçüm ve Optimizasyon",
    ],
    color: "bg-green-500",
  },
  {
    letter: "T",
    name: "Transform",
    level: 5,
    moduleCount: 4,
    badge: { color: "#5d47f0" },
    motto: "AI ekiplerle çalış",
    description:
      "Tek başınasın ama tek kişi değilsin. Yapay zeka senin için çalışan bir ordu.",
    elements: [
      "Tavan Analizi",
      "AI Ekip Kurulumu",
      "Delegasyon",
      "Bağımsızlık",
    ],
    color: "bg-primary",
  },
] as const;

export const SECTORS = [
  { id: "saglik", label: "Sağlık", icon: "Heart", hook: "Danışan kazanımından takibe — yapay zeka ile kliniğini büyüt" },
  { id: "hukuk", label: "Hukuk", icon: "Scale", hook: "Araştırmadan müvekkil kazanımına — büro kapasiteni katla" },
  { id: "guzellik", label: "Güzellik", icon: "Sparkles", hook: "Randevudan sadakate — AI ile salonunu büyüt" },
  { id: "emlak", label: "Emlak", icon: "Home", hook: "İlan yazmaktan müşteri eşleştirmeye — portföyünü büyüt" },
  { id: "e_ticaret", label: "E-Ticaret", icon: "ShoppingCart", hook: "Ürün sayfasından satış otomasyonuna — mağazanı büyüt" },
  { id: "dis", label: "Diş Hekimliği", icon: "Smile", hook: "Hasta iletişiminden dental turizme — kliniğini büyüt" },
  { id: "muhasebe", label: "Muhasebe", icon: "Calculator", hook: "Belge işlemeden müşteri danışmanlığına — büronun değerini artır" },
  { id: "eczacilik", label: "Eczacılık", icon: "Pill", hook: "Stok yönetiminden müşteri sadakatine — eczaneni büyüt" },
  { id: "turizm", label: "Turizm", icon: "Plane", hook: "Rezervasyondan kişisel tur deneyimine — acenteni büyüt" },
  { id: "mimarlik", label: "Mimarlık", icon: "Ruler", hook: "Konseptten müşteri sunumuna — ofisini büyüt" },
  { id: "egitim", label: "Eğitim", icon: "GraduationCap", hook: "Materyal üretiminden katılımcı takibine — programını büyüt" },
  { id: "fitness", label: "Fitness", icon: "Dumbbell", hook: "Program yazımından müşteri takibine — stüdyonu büyüt" },
] as const;

export const STATS = [
  { value: "%92.5", label: "Türkiye'deki işletmelerin %92.5'i yapay zeka kullanmıyor — erken başlayanlar kazanıyor", source: "TÜİK 2025" },
  { value: "3.7x", label: "Yapay zeka kullananlar rakiplerinden 3.7 kat fazla getiri elde ediyor", source: "Accenture/McKinsey 2026" },
  { value: "%74.2", label: "Neden başlayamıyorlar? %74'ü aynı şeyi söylüyor: \"Nasıl yapacağımı bilmiyorum\"", source: "TÜİK 2025" },
] as const;

export const PRODUCT = {
  id: "growt",
  name: "GROWT Programı",
  subtitle: "Sektörüne özel AI dönüşüm programı — kendi hızında, süreç destekli",
  pricingModel: "personalized",
  pricingNote: "Kişisel fiyatınızı öğrenin",
  paymentType: "Tek seferlik ödeme",
  duration: "4 hafta erişim",
  moduleUnlock: "Danışman onaylı ilerleme",
  features: [
    "Tüm 5 GROWT seviyesine tam erişim",
    "Kapsamlı içerik — modüller, görevler, değerlendirmeler",
    "İlerleme takibi ve aşama tamamlama",
    "Danışman onaylı ilerleme sistemi",
    "AI araç kütüphanesi + şablonlar",
    "Topluluk erişimi — networking, soru-cevap",
    "WhatsApp destek hattı",
    "4 hafta tam erişim süresi",
  ],
  cta: "Kişisel Planını Oluştur",
  ctaHref: "/test",
} as const;

// Coaching ve Gamification — tamamen kaldırıldı (2026-04-08 session kararı)
