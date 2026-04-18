// Growtify AI — Quiz → GHL mapping table
// Maps quiz QuizState enums to GHL tag slugs and custom field IDs.
// All field IDs verified live on sub-account e8ZRRmOybS08x5L6qgsS.

import type { Persona, QuizState } from "./types";

/**
 * GHL custom field IDs (provisioned 2026-04-05).
 *
 * Lookup source: marketing/platform/ghl/scripts/provision-quiz-fields.sh
 * + manual PUT for Sector field to extend its picklist options to 10 values.
 */
export const GHL_FIELD_IDS = {
  // Existing (Faz 1-2 push)
  profession: "3TYaB31VAfI9GSBf6kGp",
  leadSource: "cYwB0lIMu7CBNWNeQurP",
  quizScore: "0MLmPpbEMEuREWMBeTZ5",
  landingPage: "5fLsVVQnHcFqenrkWltF",
  // Quiz-specific (provisioned this session)
  sector: "kWk6Jx9WGCpER8FjF1Oh",
  quizPersona: "QAkd2vjnWIHDwHDtWeAy",
  quizPainLevel: "m5ImybTUeJg4T7gmEmaM",
  quizGoal: "EJQnFrHk5Dqo5tQpkkDe",
  quizCompletedAt: "CJsTTHm6xcVi7PBzRz17",
  dailyCommitmentMinutes: "tsMaS1TlJoTziy2AcjYe",
  quizPainAreas: "2tSiDtz06j49T4RgRC7p", // MULTIPLE_OPTIONS
  quizHabitsToQuit: "9gcKFRAKeaE1rp3FAWdA", // MULTIPLE_OPTIONS
} as const;

/* -------------------- Tag mapping -------------------- */

/**
 * Quiz sector (10 values) → GHL sector tag (7 values, taxonomy limit).
 * The custom field `GAI - Sector` itself supports all 10 values (updated
 * via PUT). This map is only used for the sector tag, which must match
 * the existing tag taxonomy.
 */
const SECTOR_TAG_MAP: Record<string, string> = {
  saglik: "saglik",
  hukuk: "hukuk",
  guzellik: "guzellik",
  emlak: "emlak",
  e_ticaret: "eticaret",
  dis: "dis",
  muhasebe: "other",
  eczacilik: "other",
  turizm: "other",
  mimarlik: "other",
  egitim: "other",
  fitness: "other",
  sigorta: "other",
  restoran: "other",
  veteriner: "other",
  diger: "other",
};

/**
 * Quiz persona (4 values) → GHL brand persona tag (3 values).
 * Only affects the `gai_persona_*` tag; the custom field `GAI - Quiz Persona`
 * stores all 4 values distinctly via PERSONA_FIELD_MAP below.
 */
const PERSONA_TAG_MAP: Record<Persona, string> = {
  "Meraklı Gözlemci": "bilmiyorum",
  "Aktif Deneyici": "dijitale_gecis",
  Uygulamacı: "dijitale_gecis",
  "Dönüşüm Adayı": "optimize",
};

/**
 * Quiz persona → slug value stored in GAI - Quiz Persona custom field.
 * Must exactly match one of the picklist options created on that field.
 */
const PERSONA_FIELD_MAP: Record<Persona, string> = {
  "Meraklı Gözlemci": "merakli_gozlemci",
  "Aktif Deneyici": "aktif_deneyici",
  Uygulamacı: "uygulamaci",
  "Dönüşüm Adayı": "ai_lideri", // GHL slug unchanged for workflow compatibility
};

export function buildGhlTags(state: QuizState): string[] {
  const sectorKey = state.sector ? (SECTOR_TAG_MAP[state.sector] ?? "other") : "other";
  const personaKey = PERSONA_TAG_MAP[state.persona] ?? "bilmiyorum";
  return [
    "gai_lifecycle_lead",
    "gai_lm_quiz",
    `gai_sector_${sectorKey}`,
    `gai_persona_${personaKey}`,
  ];
}

/* -------------------- Custom field mapping -------------------- */

export type GhlFieldValue = string | number | string[];
export interface GhlCustomField {
  id: string;
  value: GhlFieldValue;
}

/* -------------------------------------------------------------------------- */
/*  Turkish label mappings (for GHL custom field display)                      */
/* -------------------------------------------------------------------------- */

const SECTOR_LABELS: Record<string, string> = {
  saglik: "Sağlık", hukuk: "Hukuk", guzellik: "Güzellik & Estetik", emlak: "Emlak",
  e_ticaret: "E-Ticaret", dis: "Diş Hekimliği", muhasebe: "Muhasebe", eczacilik: "Eczacılık",
  turizm: "Turizm", mimarlik: "Mimarlık", egitim: "Eğitim", fitness: "Fitness",
  sigorta: "Sigorta", restoran: "Restoran", veteriner: "Veteriner", diger: "Diğer",
};

const GOAL_LABELS: Record<string, string> = {
  yeni_gelir: "Yeni gelir kapısı açmak", zaman: "Haftada 10+ saat kazanmak",
  musteri: "Daha fazla müşteri çekmek", otomasyon: "Tekrarlayan işleri otomatikleştirmek",
  bilgi: "AI konusunda uzmanlaşmak",
};

const AREA_LABELS: Record<string, string> = {
  pazarlama: "Pazarlama Süreçleri",
  satis: "Satış Süreçleri",
  musteri: "Müşteri İletişimi",
  operasyon: "Operasyonel Otomasyon",
  finans: "Finans ve Muhasebe",
  strateji: "Strateji ve Analiz",
  personel: "Personel ve Çalışan Takibi",
  egitim: "Eğitim & Danışan Materyalleri",
  // Legacy (pre-2026-04-18) — old contacts may still have these values
  icerik: "Pazarlama Süreçleri",
  analiz: "Strateji ve Analiz",
  tasarim: "Pazarlama Süreçleri",
};

const HABIT_LABELS: Record<string, string> = {
  son_dakika: "Nereden başlayacağımı bilmiyorum",
  telefon: "Zamanım yok",
  multitasking: "Teknik bilgim yetersiz",
  mukemmeliyetcilik: "Yanlış araç seçme korkusu",
  oz_sabotaj: "Tek başıma yapamam hissi",
  mentor_yok: "Mentor veya rehber yok",
};

const PAIN_LEVEL_LABELS: Record<string, string> = {
  low: "Düşük", medium: "Orta", high: "Yüksek",
};

function toLabel(value: string, map: Record<string, string>): string {
  return map[value] ?? value;
}

function toLabels(values: string[], map: Record<string, string>): string[] {
  return values.map((v) => map[v] ?? v);
}

/**
 * GHL DATE fields expect ISO 8601 strings.
 * We emit the current timestamp as the quiz completion moment.
 */
function nowIso(): string {
  return new Date().toISOString();
}

export function buildGhlCustomFields(state: QuizState): GhlCustomField[] {
  const fields: GhlCustomField[] = [];

  // Simple TEXT / NUMERICAL
  if (state.segment) fields.push({ id: GHL_FIELD_IDS.profession, value: state.segment === "bireysel" ? "Bireysel Profesyonel" : state.segment === "isletme" ? "İşletme Sahibi" : state.segment });
  // Score not sent — persona name is the primary identifier
  // fields.push({ id: GHL_FIELD_IDS.quizScore, value: 0 });
  fields.push({ id: GHL_FIELD_IDS.leadSource, value: "quiz_organic" });
  fields.push({ id: GHL_FIELD_IDS.landingPage, value: "https://growtify.ai/test" });

  // SINGLE_OPTIONS — Turkish labels for GHL workflow email templates
  if (state.sector) fields.push({ id: GHL_FIELD_IDS.sector, value: toLabel(state.sector, SECTOR_LABELS) });
  fields.push({
    id: GHL_FIELD_IDS.quizPersona,
    value: state.persona, // Already Turkish (Meraklı Gözlemci, Aktif Deneyici, etc.)
  });
  fields.push({ id: GHL_FIELD_IDS.quizPainLevel, value: toLabel(state.painLevel, PAIN_LEVEL_LABELS) });
  if (state.q_goal) fields.push({ id: GHL_FIELD_IDS.quizGoal, value: toLabel(state.q_goal, GOAL_LABELS) });

  // NUMERICAL
  if (state.commitment)
    fields.push({ id: GHL_FIELD_IDS.dailyCommitmentMinutes, value: state.commitment });

  // DATE
  fields.push({ id: GHL_FIELD_IDS.quizCompletedAt, value: nowIso() });

  // MULTIPLE_OPTIONS — Turkish labels
  if (state.q_areas?.length)
    fields.push({ id: GHL_FIELD_IDS.quizPainAreas, value: toLabels(state.q_areas, AREA_LABELS) });
  if (state.q_habits?.length)
    fields.push({ id: GHL_FIELD_IDS.quizHabitsToQuit, value: toLabels(state.q_habits, HABIT_LABELS) });

  return fields;
}
