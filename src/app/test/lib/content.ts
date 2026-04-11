// Growtify AI — Liven-style Quiz — 37 Screen Configuration
// Content is PLACEHOLDER for skeleton build. Final TR copy will replace
// these strings per spec (marketing/platform/ghl/quiz/SPEC-growtify-quiz-v4-FULL.md).

import type { ScreenConfig, OptionItem } from "./types";

const EMOJI_SCALE_5: OptionItem[] = [
  { value: 1, label: "Hiç", emoji: "😌" },
  { value: 2, label: "Az", emoji: "🙂" },
  { value: 3, label: "Orta", emoji: "😐" },
  { value: 4, label: "Çok", emoji: "😟" },
  { value: 5, label: "Aşırı", emoji: "😩" },
];

const SECTORS: OptionItem[] = [
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
];

// Phase 1 — ENGAGE (1-3)
const engage: ScreenConfig[] = [
  {
    id: 1,
    phase: 1,
    phaseName: "ENGAGE",
    type: "segmentation",
    stateKey: "segment",
    title: "AI Dijital Olgunluk Testi",
    subtitle:
      "2 dakikada, AI'dan ne kadar geride kaldığını ve neyi değiştirmen gerektiğini öğren.",
    caption: "37 soru · %100 kişiselleştirilmiş rapor",
    options: [
      { value: "bireysel", label: "Bireysel Profesyonel", emoji: "👤" },
      { value: "isletme", label: "İşletme Sahibi", emoji: "🏢" },
    ],
    cta: "Başla",
  },
  {
    id: 2,
    phase: 1,
    phaseName: "ENGAGE",
    type: "sector",
    stateKey: "sector",
    title: "Hangi sektörde çalışıyorsun?",
    subtitle: "Sana sektörüne özel örnekler göstereceğiz.",
    options: SECTORS,
  },
  {
    id: 3,
    phase: 1,
    phaseName: "ENGAGE",
    type: "social_proof",
    title: "[PLACEHOLDER] 12.000+ profesyonel bu testi tamamladı",
    subtitle:
      "Sen de Türkiye'nin dört bir yanından katılan profesyonellerin arasına katıl.",
    caption: "Social Proof #1",
    cta: "Devam",
    extra: {
      metrics: [
        { label: "Toplam Katılımcı", value: "12.487" },
        { label: "Ortalama Tamamlama", value: "2 dk 14 sn" },
        { label: "Kullanıcı Memnuniyeti", value: "%94" },
      ],
    },
  },
];

// Phase 2 — EMPATHIZE (4-17) — 14 pain questions
const empathize: ScreenConfig[] = [
  {
    id: 4,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "pain_emoji",
    stateKey: "q_time",
    caption: "Soru 1 / 14",
    title: "[PLACEHOLDER] Gün sonunda zaman yetmiyor gibi mi hissediyorsun?",
    subtitle: "Zaman yönetimi — fiziksel yorgunluk.",
    options: EMOJI_SCALE_5,
  },
  {
    id: 5,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "pain_emoji",
    stateKey: "q_procrastination",
    caption: "Soru 2 / 14",
    title: "[PLACEHOLDER] AI araçlarını öğrenmeyi sürekli erteliyor musun?",
    subtitle: "Erteleme (procrastination).",
    options: EMOJI_SCALE_5,
  },
  {
    id: 6,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "pain_emoji",
    stateKey: "q_focus",
    caption: "Soru 3 / 14",
    title: "[PLACEHOLDER] Odaklanmakta zorlanıyor musun?",
    subtitle: "Odaklanma — dikkat dağınıklığı.",
    options: EMOJI_SCALE_5,
  },
  {
    id: 7,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "pain_emoji",
    stateKey: "q_comparison",
    caption: "Soru 4 / 14",
    title: "[PLACEHOLDER] Rakiplerin senden daha hızlı ilerliyor gibi mi?",
    subtitle: "Rakip endişesi.",
    options: EMOJI_SCALE_5,
  },
  {
    id: 8,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "pain_emoji",
    stateKey: "q_fomo",
    caption: "Soru 5 / 14",
    title: "[PLACEHOLDER] Bir fırsatı kaçırıyor olma hissin var mı?",
    subtitle: "FOMO — fear of missing out.",
    options: EMOJI_SCALE_5,
  },
  {
    id: 9,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "pain_emoji",
    stateKey: "q_progress",
    caption: "Soru 6 / 14",
    title: "[PLACEHOLDER] Son aylarda ne kadar ilerleme hissediyorsun?",
    subtitle: "Progress feeling — ters skorlanır.",
    options: [
      { value: 2, label: "Hiç", emoji: "😞" },
      { value: 4, label: "Az", emoji: "😕" },
      { value: 6, label: "Orta", emoji: "🙂" },
      { value: 8, label: "İyi", emoji: "😃" },
      { value: 10, label: "Çok", emoji: "🚀" },
    ],
  },
  {
    id: 10,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_uncertainty",
    caption: "Soru 7 / 14",
    title: "[PLACEHOLDER] AI konusunda ne kadar belirsiz hissediyorsun?",
    subtitle: "1 = Netim · 10 = Tamamen belirsizim",
    likertMin: "Netim",
    likertMax: "Belirsizim",
  },
  {
    id: 11,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_overwhelm",
    caption: "Soru 8 / 14",
    title: "[PLACEHOLDER] İş yükü ne kadar bunaltıcı?",
    likertMin: "Yönetilebilir",
    likertMax: "Bunaltıcı",
  },
  {
    id: 12,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_decision",
    caption: "Soru 9 / 14",
    title: "[PLACEHOLDER] Hangi AI aracıyla başlayacağına karar vermek ne kadar zor?",
    likertMin: "Kolay",
    likertMax: "Çok zor",
  },
  {
    id: 13,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_fear",
    caption: "Soru 10 / 14",
    title: "[PLACEHOLDER] Başarısız olma korkusu ne kadar güçlü?",
    likertMin: "Hiç yok",
    likertMax: "Çok güçlü",
  },
  {
    id: 14,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_selfworth",
    caption: "Soru 11 / 14",
    title: "[PLACEHOLDER] Kendi mesleki değerine ne kadar güveniyorsun?",
    subtitle: "Öz değer — ters skorlanır.",
    likertMin: "Hiç",
    likertMax: "Tamamen",
  },
  {
    id: 15,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_social",
    caption: "Soru 12 / 14",
    title: "[PLACEHOLDER] Çevrenden 'geride kaldın' gibi bir sosyal baskı hissediyor musun?",
    likertMin: "Hiç",
    likertMax: "Çok",
  },
  {
    id: 16,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_overthink",
    caption: "Soru 13 / 14",
    title: "[PLACEHOLDER] Bir şeye başlamadan önce ne kadar aşırı düşünüyorsun?",
    likertMin: "Hiç",
    likertMax: "Aşırı",
  },
  {
    id: 17,
    phase: 2,
    phaseName: "EMPATHIZE",
    type: "likert",
    stateKey: "q_motivation",
    caption: "Soru 14 / 14 ⭐",
    title: "[PLACEHOLDER] Şu anda değişim için ne kadar motive hissediyorsun?",
    subtitle: "Motivation peak — dramatize edilir.",
    likertMin: "Hiç motive değilim",
    likertMax: "Çok motive",
  },
];

// Phase 3 — DECLARE (18-20)
const declare: ScreenConfig[] = [
  {
    id: 18,
    phase: 3,
    phaseName: "DECLARE",
    type: "single_select",
    stateKey: "q_goal",
    title: "[PLACEHOLDER] Önümüzdeki 90 günde en çok neyi başarmak istiyorsun?",
    subtitle: "Hedef tanımlama.",
    options: [
      { value: "yeni_gelir", label: "Yeni gelir kalemi açmak" },
      { value: "zaman", label: "Haftada 10+ saat kazanmak" },
      { value: "musteri", label: "Daha çok müşteri çekmek" },
      { value: "otomasyon", label: "Manuel işleri otomatikleştirmek" },
      { value: "bilgi", label: "AI konusunda uzmanlaşmak" },
    ],
  },
  {
    id: 19,
    phase: 3,
    phaseName: "DECLARE",
    type: "multi_select",
    stateKey: "q_areas",
    title: "[PLACEHOLDER] Hangi alanlarda AI'dan yardım almak istiyorsun? ⭐⭐⭐",
    subtitle: "Birden fazla seçebilirsin.",
    options: [
      { value: "icerik", label: "İçerik üretimi" },
      { value: "musteri", label: "Müşteri iletişimi" },
      { value: "satis", label: "Satış süreçleri" },
      { value: "analiz", label: "Veri analizi" },
      { value: "egitim", label: "Eğitim materyali" },
      { value: "tasarim", label: "Tasarım / görsel" },
      { value: "operasyon", label: "Operasyonel otomasyon" },
      { value: "finans", label: "Finans / muhasebe" },
    ],
  },
  {
    id: 20,
    phase: 3,
    phaseName: "DECLARE",
    type: "multi_select",
    stateKey: "q_habits",
    title: "[PLACEHOLDER] Hangi kötü alışkanlıklarından kurtulmak istiyorsun?",
    subtitle: "Birden fazla seçebilirsin.",
    options: [
      { value: "son_dakika", label: "Son dakikaya bırakma" },
      { value: "telefon", label: "Sürekli telefon kontrolü" },
      { value: "multitasking", label: "Çoklu görev yapma" },
      { value: "mukemmeliyetcilik", label: "Aşırı mükemmeliyetçilik" },
      { value: "oz_sabotaj", label: "Öz sabotaj" },
    ],
  },
];

// Phase 4 — AUTHORITY (21-23)
const authority: ScreenConfig[] = [
  {
    id: 21,
    phase: 4,
    phaseName: "AUTHORITY",
    type: "authority_academic",
    title:
      "[PLACEHOLDER] Uluslararası AI araştırmalarından elde edilen verilerle hazırlandı ⭐⭐⭐",
    subtitle:
      "Bu test, önde gelen AI araştırma kurumlarının bulgularına dayanır.",
    caption: "Academic Authority",
    cta: "Devam",
    extra: {
      sources: [
        "Önde gelen AI araştırma merkezleri",
        "Uluslararası dijital dönüşüm raporları",
        "Sektörel verimlilik çalışmaları",
      ],
    },
  },
  {
    id: 22,
    phase: 4,
    phaseName: "AUTHORITY",
    type: "authority_expert",
    title: "[PLACEHOLDER] 50+ AI uzmanı tarafından incelendi",
    subtitle: "Senin için en etkili öğrenme yolu uzmanlar tarafından belirlendi.",
    caption: "Expert Review",
    cta: "Devam",
  },
  {
    id: 23,
    phase: 4,
    phaseName: "AUTHORITY",
    type: "authority_community",
    title: "[PLACEHOLDER] Türkiye'nin her yerinden profesyoneller",
    subtitle: "Senin gibi bireysel profesyoneller bu yolculuğa başladı.",
    caption: "Social Proof #2",
    cta: "Devam",
  },
];

// Phase 5 — PERSONALIZE (24-26)
const personalize: ScreenConfig[] = [
  {
    id: 24,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "commitment",
    stateKey: "commitment",
    title: "[PLACEHOLDER] Günde ne kadar zaman ayırabilirsin? ⭐",
    subtitle: "Planını buna göre şekillendireceğiz.",
    options: [
      { value: 15, label: "15 dakika / gün", emoji: "⏱️" },
      { value: 30, label: "30 dakika / gün", emoji: "⏰" },
      { value: 45, label: "45 dakika / gün", emoji: "🎯" },
      { value: 60, label: "1 saat / gün", emoji: "🔥" },
    ],
  },
  {
    id: 25,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "text_input",
    stateKey: "firstName",
    title: "[PLACEHOLDER] Sana nasıl hitap edelim? ⭐⭐",
    subtitle: "Adını yazarsan, kişisel planını hazırlayalım.",
    placeholder: "Adın",
    cta: "Devam",
  },
  {
    id: 26,
    phase: 5,
    phaseName: "PERSONALIZE",
    type: "text_input",
    stateKey: "email",
    title: "[PLACEHOLDER] Kişisel planını hangi e-postaya gönderelim? ⭐⭐⭐",
    subtitle:
      "PDF raporunu ve 30 günlük AI yol haritanı bu adrese göndereceğiz.",
    placeholder: "ornek@mail.com",
    cta: "Planımı Hazırla",
  },
];

// Phase 6 — PRE-REVEAL (27-28)
const preReveal: ScreenConfig[] = [
  {
    id: 27,
    phase: 6,
    phaseName: "PRE-REVEAL",
    type: "profile_summary",
    title: "[PLACEHOLDER] {firstName}, seninle ilgili kısa bir profil çıkardık ⭐⭐⭐",
    subtitle: "Tam sonucun hazır olmadan önce, bir ön özet.",
    caption: "Profile Summary",
    cta: "Projeksiyonumu Gör",
  },
  {
    id: 28,
    phase: 6,
    phaseName: "PRE-REVEAL",
    type: "projection",
    title: "[PLACEHOLDER] 90 günde nereye gidebileceğini gördük ⭐⭐",
    subtitle: "Şu anki noktandan 90 gün sonraki hedef seviyene kadar olan yol.",
    caption: "Projection Chart",
    cta: "Planımı Üret",
  },
];

// Phase 7 — DRAMATIZE (29-33)
const dramatize: ScreenConfig[] = [
  {
    id: 29,
    phase: 7,
    phaseName: "DRAMATIZE",
    type: "loading",
    title: "[PLACEHOLDER] Cevapların analiz ediliyor...",
    caption: "Loading #1",
    extra: {
      steps: [
        "14 pain cevabın işleniyor",
        "Sektörel benchmark'lar getiriliyor",
        "Persona profilin oluşturuluyor",
      ],
      nextScreenId: 30,
      durationMs: 2500,
    },
  },
  {
    id: 30,
    phase: 7,
    phaseName: "DRAMATIZE",
    type: "bonus_modal",
    stateKey: "bonus_q1",
    title: "[PLACEHOLDER] Bir şey daha soralım — sana daha iyi yardımcı olalım",
    subtitle: "Şimdiye kadar AI araçlarını denedin mi?",
    options: [
      { value: "true", label: "Evet, denedim" },
      { value: "false", label: "Hayır, henüz denemedim" },
    ],
    caption: "Bonus Question Modal #1",
  },
  {
    id: 31,
    phase: 7,
    phaseName: "DRAMATIZE",
    type: "loading",
    title: "[PLACEHOLDER] Kişisel müfredatın çıkarılıyor...",
    caption: "Loading #2",
    extra: {
      steps: [
        "Sana uygun AI araçları seçiliyor",
        "4 haftalık plan optimize ediliyor",
        "Sektörel içerik önerileri hazırlanıyor",
      ],
      nextScreenId: 32,
      durationMs: 2500,
    },
  },
  {
    id: 32,
    phase: 7,
    phaseName: "DRAMATIZE",
    type: "bonus_modal",
    stateKey: "bonus_q2",
    title: "[PLACEHOLDER] Son bir soru — planı kişiselleştirelim",
    subtitle: "Düzenli bir öğrenme alışkanlığın var mı?",
    options: [
      { value: "true", label: "Evet, düzenliyim" },
      { value: "false", label: "Hayır, düzensizim" },
    ],
    caption: "Bonus Question Modal #2",
  },
  {
    id: 33,
    phase: 7,
    phaseName: "DRAMATIZE",
    type: "loading",
    title: "[PLACEHOLDER] Son rötuşlar yapılıyor...",
    caption: "Loading #3 (Final)",
    extra: {
      steps: [
        "Raporun PDF olarak hazırlanıyor",
        "30 günlük yol haritan oluşturuluyor",
        "Özel indirim kodun atanıyor",
      ],
      nextScreenId: 35,
      durationMs: 3000,
    },
  },
];

// Phase 8 — DELIVER (34)
const deliver: ScreenConfig[] = [
  {
    id: 34,
    phase: 8,
    phaseName: "DELIVER",
    type: "plan_ready",
    title: "[PLACEHOLDER] {firstName}, planın hazır! ⭐⭐",
    subtitle: "İşte 90 gün içinde olabileceğin yer.",
    caption: "Plan Ready Reveal",
    cta: "Ödülümü Al",
  },
];

// Phase 9 — GAMIFY (35-36)
const gamify: ScreenConfig[] = [
  {
    id: 35,
    phase: 9,
    phaseName: "GAMIFY",
    type: "scratch_card",
    title: "[PLACEHOLDER] Kazı-kazan! Özel indirim oranını aç ⭐⭐⭐",
    subtitle: "Sadece sana özel — süresi sınırlı.",
    caption: "Scratch Card Discount",
    cta: "İndirimimi Kullan",
  },
  {
    id: 36,
    phase: 9,
    phaseName: "GAMIFY",
    type: "celebration",
    title: "[PLACEHOLDER] Tebrikler {firstName}! 🎉",
    subtitle: "İndirim hesabına tanımlandı. 15 dakika geçerli.",
    caption: "Celebration Modal",
    cta: "Programı Gör",
  },
];

// Phase 10 — CLOSE (37)
const close: ScreenConfig[] = [
  {
    id: 37,
    phase: 10,
    phaseName: "CLOSE",
    type: "paywall",
    title: "[PLACEHOLDER] GROWT Programı — Kişisel AI dönüşüm planın",
    subtitle: "4 hafta · 5 seviye · 22 adım",
    caption: "Full Paywall",
    cta: "Programa Katıl",
    extra: {
      // Rough skeleton blocks for the 30+ element paywall —
      // each block will become its own component in polish phase.
      blocks: [
        "countdown",
        "hero_promise",
        "before_after",
        "stats",
        "media_features",
        "pricing_table",
        "testimonials",
        "faq",
        "guarantee",
        "final_cta",
      ],
    },
  },
];

export const SCREENS: ScreenConfig[] = [
  ...engage,
  ...empathize,
  ...declare,
  ...authority,
  ...personalize,
  ...preReveal,
  ...dramatize,
  ...deliver,
  ...gamify,
  ...close,
];

export const TOTAL_SCREENS = SCREENS.length; // 37
