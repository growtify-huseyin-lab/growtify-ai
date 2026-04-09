// Growtify AI — Kurumsal Quiz — Turkish Copy Layer
// Overrides structural skeleton with final TR copy.

import type { KurumsalScreenConfig, KurumsalOptionItem } from "./types-kurumsal";

type PartialScreen = Partial<Omit<KurumsalScreenConfig, "id" | "phase" | "phaseName" | "type" | "stateKey">>;

export const KURUMSAL_COPY: Record<number, PartialScreen> = {
  1: {
    title: "Kurumsal AI Olgunluk Değerlendirmesi",
    subtitle: "3 dakikada şirketinizin AI hazırlık seviyesini öğrenin. Sektörel karşılaştırma dahil.",
    caption: "21 soru · Ücretsiz · Anında sonuç",
    cta: "Değerlendirmeyi Başlat",
  },
  2: {
    title: "Şirketiniz hangi sektörde faaliyet gösteriyor?",
    subtitle: "Sektörünüze özel karşılaştırma yapabilmemiz için.",
    options: [
      { value: "saas", label: "SaaS & Teknoloji", icon: "Cpu" },
      { value: "eticaret", label: "E-Ticaret & Perakende", icon: "ShoppingCart" },
      { value: "finans", label: "Finans & Bankacılık", icon: "Landmark" },
      { value: "saglik", label: "Sağlık & İlaç", icon: "Heart" },
      { value: "hukuk", label: "Hukuk & Danışmanlık", icon: "Scale" },
      { value: "uretim", label: "Üretim & Lojistik", icon: "Factory" },
      { value: "egitim", label: "Eğitim", icon: "GraduationCap" },
      { value: "diger", label: "Diğer", icon: "MoreHorizontal" },
    ] as KurumsalOptionItem[],
  },
  3: {
    title: "Şirketinizde AI kullanımına dair net bir strateji var mı?",
    subtitle: "Yönetim kadrolarının AI vizyonu ve yol haritası.",
    caption: "Boyut 1/5 · Strateji & Vizyon",
    likertMin: "Hiç yok",
    likertMax: "Tam olgun",
  },
  4: {
    title: "Ekibiniz AI araçlarını günlük iş akışlarında kullanabiliyor mu?",
    subtitle: "Teknik yetkinlik ve kullanım alışkanlıkları.",
    caption: "Boyut 2/5 · Ekip & Yetkinlik",
    likertMin: "Hiç kullanılmıyor",
    likertMax: "Herkes kullanıyor",
  },
  5: {
    title: "AI çözümleri mevcut iş süreçlerinize entegre mi?",
    subtitle: "Otomasyon, workflow ve sistem entegrasyonları.",
    caption: "Boyut 3/5 · Süreç & Entegrasyon",
    likertMin: "Hiç entegre değil",
    likertMax: "Tamamen entegre",
  },
  6: {
    title: "Verileriniz AI modellerinin kullanabileceği formatta mı?",
    subtitle: "Veri kalitesi, erişim ve altyapı hazırlık durumu.",
    caption: "Boyut 4/5 · Veri & Altyapı",
    likertMin: "Hiç hazır değil",
    likertMax: "Tam hazır",
  },
  7: {
    title: "Organizasyonda AI'a karşı ne kadar direnç var?",
    subtitle: "Değişim yönetimi, kabul ve benimsenme durumu.",
    caption: "Boyut 5/5 · Kültür & Benimseme",
    likertMin: "Hiç direnç yok",
    likertMax: "Çok yüksek direnç",
  },
  8: {
    title: "Pilot projeler üretime taşınamıyor",
    subtitle: "Demo aşamasında kalıyor, organizasyon genelinde benimseme yok.",
    caption: "Zorluk 1/4",
    options: [
      { value: 1, label: "Hiç yaşamıyoruz", emoji: "😌" },
      { value: 2, label: "Nadiren", emoji: "🙂" },
      { value: 3, label: "Bazen", emoji: "😐" },
      { value: 4, label: "Sık sık", emoji: "😟" },
      { value: 5, label: "Sürekli", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  9: {
    title: "AI yatırımlarının geri dönüşünü ölçemiyoruz",
    subtitle: "Ne kadar tasarruf, gelir veya verimlilik artışı sağladı belli değil.",
    caption: "Zorluk 2/4",
    options: [
      { value: 1, label: "Hiç yaşamıyoruz", emoji: "😌" },
      { value: 2, label: "Nadiren", emoji: "🙂" },
      { value: 3, label: "Bazen", emoji: "😐" },
      { value: 4, label: "Sık sık", emoji: "😟" },
      { value: 5, label: "Sürekli", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  10: {
    title: "Ekip yeni araçlara adapte olmakta zorlanıyor",
    subtitle: "Eğitim verildi ama davranış değişmedi, sahiplenme eksik.",
    caption: "Zorluk 3/4",
    options: [
      { value: 1, label: "Hiç yaşamıyoruz", emoji: "😌" },
      { value: 2, label: "Nadiren", emoji: "🙂" },
      { value: 3, label: "Bazen", emoji: "😐" },
      { value: 4, label: "Sık sık", emoji: "😟" },
      { value: 5, label: "Sürekli", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  11: {
    title: "AI dönüşümü için yeterli bütçe veya uzman yok",
    subtitle: "Teknik kaynak, bütçe veya doğru partner eksikliği.",
    caption: "Zorluk 4/4",
    options: [
      { value: 1, label: "Hiç yaşamıyoruz", emoji: "😌" },
      { value: 2, label: "Nadiren", emoji: "🙂" },
      { value: 3, label: "Bazen", emoji: "😐" },
      { value: 4, label: "Sık sık", emoji: "😟" },
      { value: 5, label: "Sürekli", emoji: "😩" },
    ] as KurumsalOptionItem[],
  },
  12: {
    title: "Bu yıl AI ile en çok neyi başarmak istiyorsunuz?",
    subtitle: "Birincil hedefinizi seçin.",
    caption: "Hedefler",
    options: [
      { value: "verimlilik", label: "Operasyonel verimlilik", emoji: "⚙️" },
      { value: "gelir", label: "Gelir artışı", emoji: "📈" },
      { value: "maliyet", label: "Maliyet düşürme", emoji: "💰" },
      { value: "deneyim", label: "Müşteri deneyimi", emoji: "⭐" },
      { value: "rekabet", label: "Rekabet avantajı", emoji: "🎯" },
    ] as KurumsalOptionItem[],
  },
  13: {
    title: "AI dönüşümünde öncelikli departmanlar?",
    subtitle: "Birden fazla seçebilirsiniz.",
    caption: "Öncelikler",
    options: [
      { value: "pazarlama", label: "Pazarlama" },
      { value: "satis", label: "Satış" },
      { value: "musteri_hizmetleri", label: "Müşteri Hizmetleri" },
      { value: "finans", label: "Finans" },
      { value: "operasyon", label: "Operasyon" },
      { value: "ik", label: "İnsan Kaynakları" },
      { value: "it", label: "IT" },
    ] as KurumsalOptionItem[],
  },
  14: {
    title: "Kaç kişilik bir ekibiniz var?",
    subtitle: "Genel çalışan sayınızı belirtin.",
    caption: "Şirket Profili",
    options: [
      { value: "1-10", label: "1-10 kişi", emoji: "👤" },
      { value: "11-50", label: "11-50 kişi", emoji: "👥" },
      { value: "51-200", label: "51-200 kişi", emoji: "🏢" },
      { value: "200+", label: "200+ kişi", emoji: "🏭" },
    ] as KurumsalOptionItem[],
  },
  15: {
    title: "Adınız ve soyadınız?",
    subtitle: "Raporunuzda ve görüşme davetinizde kullanılacak.",
    placeholder: "Ad Soyad",
    cta: "Devam",
  },
  16: {
    title: "İş e-posta adresiniz?",
    subtitle: "Detaylı raporunuzu e-posta ile göndereceğiz.",
    placeholder: "isim@sirket.com",
    cta: "Devam",
  },
  17: {
    title: "Telefon numaranız?",
    subtitle: "Strateji görüşmesi için sizinle iletişime geçeceğiz.",
    placeholder: "+90 5XX XXX XX XX",
    cta: "Raporumu Oluştur",
  },
  18: {
    title: "Kurumsal AI Olgunluk Raporunuz hazırlanıyor...",
    extra: {
      steps: [
        "5 boyutta değerlendirme analiz ediliyor...",
        "Sektörel karşılaştırma yapılıyor...",
        "Kişisel rapor oluşturuluyor...",
      ],
      durationMs: 5500,
    },
  },
  19: {
    title: "Kurumsal AI Olgunluk Sonucunuz",
    cta: "Ücretsiz Strateji Görüşmesi",
  },
  20: {
    title: "Sonraki Adım: Strateji Görüşmesi",
    subtitle: "30 dakikalık ücretsiz keşif görüşmesi ile başlayalım. Ekibinizi, hedeflerinizi ve mevcut durumunuzu anladıktan sonra en uygun programı birlikte belirliyoruz.",
    cta: "Görüşme Planla",
  },
  21: {
    title: "GROWT Method ile Kurumsal Dönüşüm",
    subtitle: "Şirketiniz için en uygun programı birlikte belirleyelim.",
    cta: "Detayları İncele",
  },
};

/* -------------------------------------------------------------------------- */
/*  Persona summaries (4 corporate maturity levels)                           */
/* -------------------------------------------------------------------------- */

export const KURUMSAL_PERSONA_SUMMARIES: Record<string, {
  emoji: string;
  title: string;
  subtitle: string;
  summary: string;
  recommendations: string[];
}> = {
  Baslangic: {
    emoji: "🌱",
    title: "Başlangıç",
    subtitle: "AI Farkındalık Aşaması",
    summary: "Organizasyonunuz AI yolculuğunun başında. Strateji, ekip yetkinliği ve veri altyapısı henüz oluşturulma aşamasında. Doğru temeller atıldığında hızlı ilerleme potansiyeli yüksek.",
    recommendations: [
      "AI stratejisi ve vizyon belgesi oluşturun",
      "Pilot proje için en uygun departmanı belirleyin",
      "Ekip yetkinlik haritası çıkarın",
    ],
  },
  Kesif: {
    emoji: "🔍",
    title: "Keşif",
    subtitle: "AI Deneyimleme Aşaması",
    summary: "AI araçlarını deniyorsunuz ama henüz sistematik bir yaklaşım yok. Bireysel başarılar var ancak organizasyon genelinde ölçekleme eksik. Doğru yol haritası ile hızlanabilirsiniz.",
    recommendations: [
      "Mevcut pilot projeleri değerlendirin ve ölçekleme planı yapın",
      "ROI ölçüm çerçevesi kurun",
      "Değişim yönetimi programı başlatın",
    ],
  },
  Uygulama: {
    emoji: "⚙️",
    title: "Uygulama",
    subtitle: "AI Operasyonu Aşaması",
    summary: "AI çözümlerini aktif kullanıyorsunuz ve iş süreçlerine entegrasyon başlamış. Şimdi ölçeklendirme, yönetişim ve sürdürülebilirlik üzerine odaklanma zamanı.",
    recommendations: [
      "AI yönetişim çerçevesi ve politikalar oluşturun",
      "Çoklu departman entegrasyonu planlayın",
      "Ölçülebilir ROI raporlama sistemi kurun",
    ],
  },
  Lider: {
    emoji: "🚀",
    title: "Lider",
    subtitle: "AI Dönüşümü Aşaması",
    summary: "Organizasyonunuz AI'ı stratejik bir rekabet avantajı olarak kullanıyor. Süreçler entegre, ekip yetkin ve sonuçlar ölçülebilir. Şimdi yeni fırsatları keşfetme ve endüstri liderliği zamanı.",
    recommendations: [
      "Yeni AI kullanım senaryolarını keşfedin",
      "Endüstri liderliği için vaka çalışmaları yayınlayın",
      "AI inovasyon laboratuvarı kurun",
    ],
  },
};

/* -------------------------------------------------------------------------- */
/*  Paywall / CTA copy                                                        */
/* -------------------------------------------------------------------------- */

export const KURUMSAL_PAYWALL_COPY = {
  hero: {
    title: "{firstName}, şirketinizin AI dönüşüm yol haritası hazır",
    subtitle: "GROWT Method ile stratejik değerlendirmeden tam ölçekli dönüşüme.",
  },
  services: [
    {
      title: "AI Strateji & Yol Haritası",
      description: "Paydaş mülakatları, teknoloji incelemesi ve 90 günlük uygulama planı.",
      duration: "2-3 hafta",
    },
    {
      title: "GROWT Ekip Programı",
      description: "12 haftalık canlı mentorlük. Haftalık canlı yayın + aylık 1:1 strateji.",
      duration: "12 hafta",
    },
    {
      title: "GROWT Dönüşüm Mentorlüğü",
      description: "6-12 aylık mentorlük. Tam 5 level, çoklu departman desteği.",
      duration: "6-12 ay",
    },
  ],
  cta: {
    primary: "Ücretsiz Strateji Görüşmesi Planla",
    secondary: "Detaylı Bilgi Al",
    bookingUrl: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
    detailUrl: "https://growtify.ai/kurumsal",
  },
  faq: [
    {
      q: "Program ne kadar sürer?",
      a: "Kapsamına göre değişir. Ekip Programı 12 hafta, Dönüşüm Mentorlüğü 6-12 ay.",
    },
    {
      q: "Ekip büyüklüğü ne olmalı?",
      a: "Minimum 5 kişi önerilir. Dönüşüm Mentorlüğü'nde çoklu departman desteği var.",
    },
    {
      q: "ROI nasıl ölçülür?",
      a: "Her program ROI checkpoint'leri içerir. Zaman, verimlilik, maliyet ve gelir etkisi kantitatif olarak ölçülür.",
    },
    {
      q: "Nasıl başlıyoruz?",
      a: "30 dakikalık ücretsiz strateji görüşmesi ile. Ekibinizi ve hedeflerinizi anladıktan sonra programı birlikte belirliyoruz.",
    },
  ],
};

export const KURUMSAL_LEGAL = {
  disclaimer: "Bu değerlendirme Growtify.ai tarafından sunulan otomatik bir AI olgunluk analizidir. Profesyonel, hukuki veya mali danışmanlık niteliği taşımaz. Sonuçlar verilen cevaplara dayalıdır. Kişisel verileriniz 6698 sayılı KVKK kapsamında işlenmektedir.",
};
