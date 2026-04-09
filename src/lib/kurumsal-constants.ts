import {
  ClipboardCheck,
  FileSearch,
  GraduationCap,
  Building2,
  Cpu,
  Phone,
  ArrowRight,
  Users,
  BarChart3,
  Shield,
  Target,
  Zap,
  Clock,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

export const KURUMSAL_HERO = {
  badge: "Kurumsal AI Dönüşümü",
  title: "İşletmenizin AI Dönüşümü Burada Başlıyor",
  subtitle:
    "GROWT Method™ ile stratejik değerlendirmeden tam ölçekli dönüşüme — ekibiniz, süreçleriniz, sonuçlarınız.",
  primaryCta: "Strateji Görüşmesi Planla",
  primaryCtaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  secondaryCta: "AI Hazırlık Testini Çöz",
  secondaryCtaHref: "/test/kurumsal",
} as const;

export const KURUMSAL_PROBLEMS = [
  {
    icon: "Target",
    title: "Pilot Projeler Ölçeklenmiyor",
    description:
      "Birkaç kişi AI kullanıyor ama organizasyon genelinde benimseme yok. Pilot projeler demo aşamasında kalıyor.",
  },
  {
    icon: "Zap",
    title: "Araç-Odaklı Başlangıçlar Başarısız",
    description:
      "Yapay zeka hesapları açıldı ama stratejik yönlendirme yok. Herkes farklı yöne çekiyor, ölçülebilir sonuç gelmiyor.",
  },
  {
    icon: "Users",
    title: "Eğitim Tek Başına Yetmiyor",
    description:
      "Ekip eğitim aldı ama davranış değişmedi. Sahiplenme, operasyonel kadans ve ölçüm sistemi eksik.",
  },
] as const;

export const KURUMSAL_SERVICES = [
  // Kategori 1 — Mentorlük
  {
    id: "degerlendirme",
    icon: "ClipboardCheck",
    title: "AI Hazırlık Değerlendirmesi",
    category: "Mentorlük",
    description:
      "5 dakikada kurumsal AI olgunluk skorunuzu öğrenin. Ücretsiz online değerlendirme ile öncelikli alanlarınızı keşfedin.",
    highlights: ["5 dakika", "Ücretsiz", "Anında sonuç"],
    cta: "Değerlendirmeyi Başlat",
    ctaHref: "/test/kurumsal",
  },
  {
    id: "strateji",
    icon: "FileSearch",
    title: "AI Strateji & Yol Haritası",
    category: "Mentorlük",
    description:
      "Birlikte değerlendirme — paydaş mülakatları, teknoloji incelemesi ve 90 günlük uygulama yol haritası. Ekibinizin nerede olduğunu ve nereye gidebileceğini birlikte görüyoruz.",
    highlights: ["2-3 hafta", "Birlikte değerlendirme", "90 günlük yol haritası"],
    cta: "Detayları İncele",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  {
    id: "ekip-programi",
    icon: "GraduationCap",
    title: "GROWT Ekip Programı",
    category: "Mentorlük",
    description:
      "12 haftalık canlı mentorlük. Haftalık canlı yayın + firma bazlı aylık 1:1 strateji görüşmesi. Ekibiniz AI kafa yapısını kazanır, ilk uygulamayı kendi yapar. Min. 5 kişi.",
    highlights: ["12 hafta", "Haftalık canlı", "Aylık 1:1", "Min. 5 kişi"],
    cta: "Ekibiniz İçin Planlayın",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  {
    id: "donusum-mentorlugu",
    icon: "Building2",
    title: "GROWT Dönüşüm Mentorlüğü",
    category: "Mentorlük",
    description:
      "6-12 aylık canlı mentorlük. Haftalık canlı yayın + firma bazlı aylık strateji görüşmesi. Tam GROWT Level 1-5, çoklu departman desteği.",
    highlights: ["6-12 ay", "Haftalık canlı mentorlük", "Tam 5 level", "Çoklu departman"],
    cta: "Detayları İncele",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  // Kategori 2 — Growtify.app
  {
    id: "otomasyon",
    icon: "Cpu",
    title: "AI Otomasyon & İş Akışları",
    category: "Growtify.app",
    description:
      "Ekibinizin öğrendiği yaklaşımı hayata geçirin — workflow otomasyonu, AI agent kurulumu, sistem entegrasyonları. İster ekibiniz kursun, ister biz kuralım.",
    highlights: ["Workflow otomasyon", "AI agent", "Sistem entegrasyonu"],
    cta: "Fırsatları Keşfedin",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
  {
    id: "is-altyapisi",
    icon: "LayoutDashboard",
    title: "AI İş Altyapısı",
    category: "Growtify.app",
    description:
      "Ekibiniz için dijital iş altyapısı — CRM, pipeline, otomasyon, funnel, takvim, chatbot, raporlama. Growtify.app ile tek platformda.",
    highlights: ["CRM + Pipeline", "Otomasyon", "Funnel", "Takvim", "Raporlama"],
    cta: "Demo İsteyin",
    ctaHref: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
  },
] as const;

export const KURUMSAL_GROWT_PHASES = [
  {
    letter: "G",
    name: "Gap Analysis",
    subtitle: "Stratejik Değerlendirme",
    description: "Organizasyonun AI olgunluğunu 5 boyutta değerlendirin. Paydaş mülakatları, teknoloji incelemesi, rekabet analizi.",
    deliverables: ["AI Hazırlık Raporu (20-30 sayfa)", "Kullanım Senaryosu Matrisi", "Yönetim Sunumu"],
    color: "#EF4444",
  },
  {
    letter: "R",
    name: "Roadmap",
    subtitle: "Yol Haritası Oluşturma",
    description: "90 günlük uygulama planı, kaynak gereksinimleri, karar noktaları ve başarı metrikleri.",
    deliverables: ["90 Günlük Yol Haritası", "Kaynak Planı", "ROI Projeksiyon"],
    color: "#F97316",
  },
  {
    letter: "O",
    name: "Operationalize",
    subtitle: "Uygulama & Entegrasyon",
    description: "Stratejik olarak belirlenen AI çözümlerini geliştirin, test edin ve üretime alın.",
    deliverables: ["3-5 Canlı AI Çözüm", "Entegrasyon Dokümantasyonu", "SOP'lar"],
    color: "#EAB308",
  },
  {
    letter: "W",
    name: "Win",
    subtitle: "Ölçüm & Raporlama",
    description: "Somut sonuçları ölçün, belgeleyin ve yönetim kuruluna raporlayın.",
    deliverables: ["ROI Raporu", "Yönetim Kurulu Sunumu", "İç Vaka Çalışmaları"],
    color: "#22C55E",
  },
  {
    letter: "T",
    name: "Transform",
    subtitle: "Ölçeklendirme & Yönetişim",
    description: "Başarılı çözümleri organizasyon geneline yaygınlaştırın. AI yönetişim çerçevesi kurun.",
    deliverables: ["AI Kullanım Politikası", "Ölçeklendirme Playbook", "Sürdürülebilirlik Planı"],
    color: "#5d47f0",
  },
] as const;

export const KURUMSAL_PROCESS = [
  {
    step: 1,
    title: "Strateji Görüşmesi",
    description: "30 dakikalık keşif görüşmesi. Ekibinizi, hedeflerinizi ve mevcut AI kullanımınızı anlıyoruz.",
    icon: "MessageSquare",
  },
  {
    step: 2,
    title: "Değerlendirme",
    description: "GROWT Method ile 5 boyutlu AI olgunluk analizi. Paydaş mülakatları ve teknoloji incelemesi.",
    icon: "FileSearch",
  },
  {
    step: 3,
    title: "Program Seçimi",
    description: "Değerlendirme sonuçlarına göre en uygun program ve kapsamı birlikte belirliyoruz.",
    icon: "CheckCircle2",
  },
  {
    step: 4,
    title: "Uygulama & Ölçüm",
    description: "GROWT fazları ile uygulama, düzenli ROI checkpoint'leri ve yönetim raporlaması.",
    icon: "TrendingUp",
  },
] as const;

// KURUMSAL_PACKAGES kaldırıldı — hizmet bazlı yapıya geçildi (2026-04-09)

export const KURUMSAL_STATS = [
  { value: "3.5x", label: "Yapay zekaya yatırılan her 1$'ın ortalama getirisi", icon: "TrendingUp", source: "IBM 2026" },
  { value: "%68", label: "İlk 12 ayda beklenen verimliliğe ulaşan işletmeler", icon: "Clock", source: "McKinsey 2026" },
  { value: "%62", label: "Çalışanlarının yapay zekaya hazır olmadığını söyleyen kurumlar", icon: "BarChart3", source: "Accenture 2026" },
  { value: "3.6x", label: "AI liderlerinin rakiplerine göre dönüşüm hızı farkı", icon: "Zap", source: "McKinsey 2026" },
] as const;

export const KURUMSAL_FAQ = [
  {
    q: "Program ne kadar sürer?",
    a: "Kapsamına göre değişir. GROWT Ekip Programı 12 hafta, Dönüşüm Mentorlüğü 6-12 ay. Strateji görüşmesinde birlikte belirliyoruz.",
  },
  {
    q: "Ekip büyüklüğü ne olmalı?",
    a: "Minimum 5 kişi önerilir. Dönüşüm Mentorlüğü'nde çoklu departman desteği var — organizasyon genelinde uygulanabilir.",
  },
  {
    q: "ROI nasıl ölçülür?",
    a: "Her program ROI checkpoint'leri içerir. Zaman tasarrufu, verimlilik artışı, maliyet tasarrufu ve gelir etkisi kantitatif olarak ölçülür ve raporlanır.",
  },
  {
    q: "Mevcut teknoloji altyapımıza uyum sağlar mı?",
    a: "Evet. GROWT Method teknoloji-bağımsızdır. Mevcut araçlarınızla çalışır. Growtify.app opsiyonel olarak entegre edilebilir.",
  },
  {
    q: "Sektörümüze özel mi yoksa genel bir program mı?",
    a: "Sektörünüze özel uyarlanır. Ön değerlendirmede sektörel ihtiyaçlar analiz edilir ve program içeriği buna göre özelleştirilir.",
  },
  {
    q: "Nasıl çalışıyor — canlı mı, kayıtlı mı?",
    a: "Haftalık canlı yayın (tüm kurumsal müşteriler birlikte) + firma bazlı aylık 1:1 strateji görüşmesi + WhatsApp firma grubu. Ekibiniz canlı etkileşimle öğreniyor.",
  },
  {
    q: "Başlamak için ne gerekiyor?",
    a: "30 dakikalık ücretsiz strateji görüşmesi ile başlıyoruz. Ekibinizi, hedeflerinizi ve mevcut durumunuzu anladıktan sonra en uygun programı birlikte belirliyoruz.",
  },
] as const;

export const KURUMSAL_SECTORS = [
  "SaaS & Teknoloji",
  "E-Ticaret & Perakende",
  "Finans & Bankacılık",
  "Sağlık & İlaç",
  "Hukuk & Danışmanlık",
  "Üretim & Lojistik",
] as const;
