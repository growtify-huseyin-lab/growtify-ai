// Growtify AI — Kurumsal Quiz — 20 Screen Skeleton
// Structural configuration for corporate AI maturity assessment.

import type { KurumsalScreenConfig, KurumsalOptionItem } from "./types-kurumsal";

const EMOJI_SCALE_5: KurumsalOptionItem[] = [
  { value: 1, label: "Hiç", emoji: "\u{1F60C}" },
  { value: 2, label: "Az", emoji: "\u{1F642}" },
  { value: 3, label: "Orta", emoji: "\u{1F610}" },
  { value: 4, label: "Cok", emoji: "\u{1F61F}" },
  { value: 5, label: "Asiri", emoji: "\u{1F629}" },
];

const KURUMSAL_SECTORS: KurumsalOptionItem[] = [
  { value: "saas", label: "SaaS & Teknoloji", icon: "Cpu" },
  { value: "eticaret", label: "E-Ticaret & Perakende", icon: "ShoppingCart" },
  { value: "finans", label: "Finans & Bankacilik", icon: "Landmark" },
  { value: "saglik", label: "Saglik & Ilac", icon: "Heart" },
  { value: "hukuk", label: "Hukuk & Danismanlik", icon: "Scale" },
  { value: "uretim", label: "Uretim & Lojistik", icon: "Factory" },
  { value: "egitim", label: "Egitim", icon: "GraduationCap" },
  { value: "medya", label: "Medya & Reklam", icon: "Megaphone" },
  { value: "insaat", label: "Insaat & Gayrimenkul", icon: "Building2" },
  { value: "diger", label: "Diger", icon: "MoreHorizontal" },
];

// Phase 1 — ENGAGE (2 screens)
const engage: KurumsalScreenConfig[] = [
  {
    id: 1,
    phase: 1,
    phaseName: "ENGAGE",
    type: "hero",
    title: "Kurumsal AI Olgunluk Degerlendirmesi",
    subtitle: "3 dakikada sirketinizin AI hazirlik seviyesini ogrenin.",
    caption: "20 soru \u00B7 Ucretsiz \u00B7 Aninda sonuc",
    cta: "Degerlendirmeyi Baslat",
  },
  {
    id: 2,
    phase: 1,
    phaseName: "ENGAGE",
    type: "sector",
    stateKey: "sector",
    title: "Sirketiniz hangi sektorde faaliyet gosteriyor?",
    subtitle: "Sektorunuze ozel karsilastirma yapabilmemiz icin.",
    options: KURUMSAL_SECTORS,
  },
];

// Phase 2 — ASSESS (5 screens: Likert 1-10)
const assess: KurumsalScreenConfig[] = [
  {
    id: 3,
    phase: 2,
    phaseName: "ASSESS",
    type: "likert",
    stateKey: "d_strategy",
    title: "Sirketinizde AI kullanimina dair net bir strateji var mi?",
    subtitle: "Yonetim kadrolarinin AI vizyonu ve yol haritasi.",
    caption: "Boyut 1/5 \u00B7 Strateji & Vizyon",
    likertMin: "Hic yok",
    likertMax: "Tam olgun",
  },
  {
    id: 4,
    phase: 2,
    phaseName: "ASSESS",
    type: "likert",
    stateKey: "d_team",
    title: "Ekibiniz AI araclarini gunluk is akislarinda kullanabiliyor mu?",
    subtitle: "Teknik yetkinlik ve kullanim aliskanliklari.",
    caption: "Boyut 2/5 \u00B7 Ekip & Yetkinlik",
    likertMin: "Hic kullanilmiyor",
    likertMax: "Herkes kullaniyor",
  },
  {
    id: 5,
    phase: 2,
    phaseName: "ASSESS",
    type: "likert",
    stateKey: "d_process",
    title: "AI cozumleri mevcut is sureclerinize entegre mi?",
    subtitle: "Otomasyon, workflow ve sistem entegrasyonlari.",
    caption: "Boyut 3/5 \u00B7 Surec & Entegrasyon",
    likertMin: "Hic entegre degil",
    likertMax: "Tamamen entegre",
  },
  {
    id: 6,
    phase: 2,
    phaseName: "ASSESS",
    type: "likert",
    stateKey: "d_data",
    title: "Verileriniz AI modellerinin kullanabilecegi formatta mi?",
    subtitle: "Veri kalitesi, erisim ve altyapi hazirlik durumu.",
    caption: "Boyut 4/5 \u00B7 Veri & Altyapi",
    likertMin: "Hic hazir degil",
    likertMax: "Tam hazir",
  },
  {
    id: 7,
    phase: 2,
    phaseName: "ASSESS",
    type: "likert",
    stateKey: "d_culture",
    title: "Organizasyonda AI'a karsi ne kadar direnc var?",
    subtitle: "Degisim yonetimi, kabul ve benimsenme durumu.",
    caption: "Boyut 5/5 \u00B7 Kultur & Benimseme",
    likertMin: "Hic direnc yok",
    likertMax: "Cok yuksek direnc",
  },
];

// Phase 3 — PAIN (4 screens: Emoji 1-5)
const pain: KurumsalScreenConfig[] = [
  {
    id: 8,
    phase: 3,
    phaseName: "PAIN",
    type: "pain_emoji",
    stateKey: "p_pilot",
    title: "Pilot projeler uretime tasinamiyor",
    subtitle: "Demo asamasinda kaliyor, organizasyon genelinde benimseme yok.",
    caption: "Zorluk 1/4",
    options: EMOJI_SCALE_5,
  },
  {
    id: 9,
    phase: 3,
    phaseName: "PAIN",
    type: "pain_emoji",
    stateKey: "p_roi",
    title: "AI yatirimlarinin geri donusunu olcemiyoruz",
    subtitle: "Ne kadar tasarruf, gelir veya verimlilik artisi sagladi belli degil.",
    caption: "Zorluk 2/4",
    options: EMOJI_SCALE_5,
  },
  {
    id: 10,
    phase: 3,
    phaseName: "PAIN",
    type: "pain_emoji",
    stateKey: "p_resistance",
    title: "Ekip yeni araclara adapte olmakta zorlaniyor",
    subtitle: "Egitim verildi ama davranis degismedi, sahiplenme eksik.",
    caption: "Zorluk 3/4",
    options: EMOJI_SCALE_5,
  },
  {
    id: 11,
    phase: 3,
    phaseName: "PAIN",
    type: "pain_emoji",
    stateKey: "p_resources",
    title: "AI donusumu icin yeterli butce veya uzman yok",
    subtitle: "Teknik kaynak, butce veya dogru partner eksikligi.",
    caption: "Zorluk 4/4",
    options: EMOJI_SCALE_5,
  },
];

// Phase 4 — DECLARE (2 screens)
const declare: KurumsalScreenConfig[] = [
  {
    id: 12,
    phase: 4,
    phaseName: "DECLARE",
    type: "single_select",
    stateKey: "q_goal",
    title: "Bu yil AI ile en cok neyi basarmak istiyorsunuz?",
    subtitle: "Birincil hedefinizi secin.",
    caption: "Hedefler",
    options: [
      { value: "verimlilik", label: "Operasyonel verimlilik", emoji: "\u2699\uFE0F" },
      { value: "gelir", label: "Gelir artisi", emoji: "\u{1F4C8}" },
      { value: "maliyet", label: "Maliyet dusurme", emoji: "\u{1F4B0}" },
      { value: "deneyim", label: "Musteri deneyimi", emoji: "\u2B50" },
      { value: "rekabet", label: "Rekabet avantaji", emoji: "\u{1F3AF}" },
    ],
  },
  {
    id: 13,
    phase: 4,
    phaseName: "DECLARE",
    type: "multi_select",
    stateKey: "q_priority_depts",
    title: "AI donusumunde oncelikli departmanlar?",
    subtitle: "Birden fazla secebilirsiniz.",
    caption: "Oncelikler",
    options: [
      { value: "pazarlama", label: "Pazarlama" },
      { value: "satis", label: "Satis" },
      { value: "musteri_hizmetleri", label: "Musteri Hizmetleri" },
      { value: "finans", label: "Finans" },
      { value: "operasyon", label: "Operasyon" },
      { value: "ik", label: "Insan Kaynaklari" },
      { value: "it", label: "IT" },
      { value: "arge", label: "Ar-Ge" },
    ],
  },
];

// Phase 5 — PERSONALIZE (3 screens)
const personalize: KurumsalScreenConfig[] = [
  {
    id: 14,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "single_select",
    stateKey: "companySize",
    title: "Kac kisilik bir ekibiniz var?",
    subtitle: "Genel calisma sayinizi belirtin.",
    caption: "Sirket Profili",
    options: [
      { value: "1-10", label: "1-10 kisi", emoji: "\u{1F464}" },
      { value: "11-50", label: "11-50 kisi", emoji: "\u{1F465}" },
      { value: "51-200", label: "51-200 kisi", emoji: "\u{1F3E2}" },
      { value: "200+", label: "200+ kisi", emoji: "\u{1F3ED}" },
    ],
  },
  {
    id: 15,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "text_input",
    stateKey: "firstName",
    title: "Adiniz ve soyadiniz?",
    subtitle: "Raporunuzda ve gorusme davetinizde kullanilacak.",
    placeholder: "Ad Soyad",
    cta: "Devam",
  },
  {
    id: 16,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "text_input",
    stateKey: "email",
    title: "Is e-posta adresiniz?",
    subtitle: "Raporunuzu e-posta ile gonderecegiz.",
    placeholder: "isim@sirket.com",
    cta: "Devam",
  },
  {
    id: 17,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "text_input",
    stateKey: "phone",
    title: "Telefon numaraniz?",
    subtitle: "Strateji gorusmesi icin sizinle iletisime gececegiz.",
    placeholder: "+90 5XX XXX XX XX",
    cta: "Raporumu Olustur",
  },
];

// Phase 6 — REVEAL (2 screens)
const reveal: KurumsalScreenConfig[] = [
  {
    id: 18,
    phase: 6,
    phaseName: "REVEAL",
    type: "loading",
    title: "Kurumsal AI Olgunluk Raporunuz hazirlaniyor...",
    extra: {
      steps: [
        "5 boyutta degerlendirme analiz ediliyor...",
        "Sektorel karsilastirma yapiliyor...",
        "Kisisel rapor olusturuluyor...",
      ],
      durationMs: 5500,
    },
  },
  {
    id: 19,
    phase: 6,
    phaseName: "REVEAL",
    type: "result",
    title: "Kurumsal AI Olgunluk Sonucunuz",
    cta: "Ucretsiz Strateji Gorusmesi",
  },
];

// Phase 7 — OFFER (2 screens)
const offer: KurumsalScreenConfig[] = [
  {
    id: 20,
    phase: 7,
    phaseName: "OFFER",
    type: "paywall",
    title: "Sonraki Adim: Strateji Gorusmesi",
    subtitle: "30 dakikalik ucretsiz kesif gorusmesi ile baslayalim.",
    cta: "Gorusme Planla",
    extra: {
      bookingUrl: "https://app.growtify.app/widget/bookings/kurumsal-on-gorusme",
    },
  },
  {
    id: 21,
    phase: 7,
    phaseName: "OFFER",
    type: "paywall",
    title: "GROWT Method ile Donusum",
    subtitle: "Sirketiniz icin en uygun programi birlikte belirleyelim.",
    cta: "Detaylari Incele",
    extra: {
      isSecondaryPaywall: true,
      detailUrl: "https://growtify.ai/kurumsal",
    },
  },
];

export const KURUMSAL_SCREENS: KurumsalScreenConfig[] = [
  ...engage,
  ...assess,
  ...pain,
  ...declare,
  ...personalize,
  ...reveal,
  ...offer,
];

export const KURUMSAL_TOTAL_SCREENS = KURUMSAL_SCREENS.length; // 21
