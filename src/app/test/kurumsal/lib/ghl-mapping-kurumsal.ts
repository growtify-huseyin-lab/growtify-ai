// Growtify AI — Kurumsal Quiz → GHL mapping
// Reuses the same GHL location and pipeline as bireysel, differentiated by tags.

import type { KurumsalQuizState, KurumsalPersona } from "./types-kurumsal";

// Reuse bireysel field IDs where applicable
export const GHL_FIELD_IDS = {
  profession: "3TYaB31VAfI9GSBf6kGp",      // TEXT — "kurumsal" (fixed)
  leadSource: "cYwB0lIMu7CBNWNeQurP",       // TEXT — "kurumsal_quiz"
  quizScore: "0MLmPpbEMEuREWMBeTZ5",        // NUMERICAL
  landingPage: "5fLsVVQnHcFqenrkWltF",      // TEXT
  sector: "kWk6Jx9WGCpER8FjF1Oh",           // SINGLE_OPTIONS
  quizPersona: "QAkd2vjnWIHDwHDtWeAy",      // SINGLE_OPTIONS
  quizPainLevel: "m5ImybTUeJg4T7gmEmaM",    // SINGLE_OPTIONS
  quizGoal: "EJQnFrHk5Dqo5tQpkkDe",         // SINGLE_OPTIONS
  quizCompletedAt: "CJsTTHm6xcVi7PBzRz17",  // DATE
  quizReportUrl: "HDzGAxcYfy0h8A1mjOH3",     // TEXT
  // Kurumsal-specific (provisioned 2026-04-09)
  companySize: "gAuTk4Hn7xuJvhZcuhx8",          // SINGLE_OPTIONS
  priorityDepartments: "yxaOZ02OrBuSW3KwEWQm",   // MULTIPLE_OPTIONS
} as const;

// GAI - Kurumsal Satış Pipeline (created 2026-04-09)
export const KURUMSAL_PIPELINE = {
  id: "M1ulhwFc5tfnjfBgxOEK",
  stages: {
    quizLead: "2f045a6f-3b41-423f-a968-89f3cb5db60c",
    gorusmePlanlandi: "9ae0d460-6192-454c-bfee-91f1330e35f4",
    gorusmeYapildi: "2caea178-2e52-4061-8b39-2971eea4c1b5",
    teklifGonderildi: "ede281a2-07de-494f-bae4-df6da2fc5ce2",
    musteri: "4d77bb43-1ee7-4781-a58d-09f12dbd1654",
    aktifEgitimde: "4b14a432-4c39-4caa-b56d-a36227776b52",
    mezun: "c9ba337a-d0d4-47fb-b504-a2e845c117c0",
    appAbone: "eefbb22c-17e7-41c3-b6fb-50363cccfb80",
    kaybedildi: "93a29393-424c-467f-bda5-4dea59f19bf8",
  },
} as const;

const SECTOR_TAG_MAP: Record<string, string> = {
  saas: "saas",
  eticaret: "eticaret",
  finans: "finans",
  saglik: "saglik",
  hukuk: "hukuk",
  uretim: "uretim",
  egitim: "egitim",
  diger: "other",
};

const PERSONA_TAG_MAP: Record<KurumsalPersona, string> = {
  Baslangic: "baslangic",
  Kesif: "kesif",
  Uygulama: "uygulama",
  Lider: "lider",
};

const PERSONA_FIELD_MAP: Record<KurumsalPersona, string> = {
  Baslangic: "baslangic",
  Kesif: "kesif",
  Uygulama: "uygulama",
  Lider: "lider",
};

const COMPANY_SIZE_TAG_MAP: Record<string, string> = {
  "1-10": "micro",
  "11-50": "small",
  "51-200": "medium",
  "200+": "enterprise",
};

export function buildGhlTags(state: KurumsalQuizState): string[] {
  const sectorKey = state.sector ? (SECTOR_TAG_MAP[state.sector] ?? "other") : "other";
  const personaKey = PERSONA_TAG_MAP[state.persona] ?? "baslangic";
  const sizeKey = state.companySize ? (COMPANY_SIZE_TAG_MAP[state.companySize] ?? "unknown") : "unknown";

  return [
    "gai_lifecycle_lead",
    "gai_lm_quiz_kurumsal",
    "gai_segment_kurumsal",
    `gai_sector_${sectorKey}`,
    `gai_persona_kurumsal_${personaKey}`,
    `gai_company_size_${sizeKey}`,
  ];
}

export type GhlFieldValue = string | number | string[];
export interface GhlCustomField {
  id: string;
  value: GhlFieldValue;
}

function nowIso(): string {
  return new Date().toISOString();
}

export function buildGhlCustomFields(state: KurumsalQuizState): GhlCustomField[] {
  const fields: GhlCustomField[] = [];

  fields.push({ id: GHL_FIELD_IDS.profession, value: "kurumsal" });
  fields.push({ id: GHL_FIELD_IDS.quizScore, value: 70 - state.totalScore }); // maturity score (inverted)
  fields.push({ id: GHL_FIELD_IDS.leadSource, value: "kurumsal_quiz" });
  fields.push({ id: GHL_FIELD_IDS.landingPage, value: "https://growtify.ai/test/kurumsal" });

  if (state.sector) fields.push({ id: GHL_FIELD_IDS.sector, value: state.sector });
  fields.push({
    id: GHL_FIELD_IDS.quizPersona,
    value: PERSONA_FIELD_MAP[state.persona] ?? "baslangic",
  });
  fields.push({ id: GHL_FIELD_IDS.quizPainLevel, value: state.painLevel });
  if (state.q_goal) fields.push({ id: GHL_FIELD_IDS.quizGoal, value: state.q_goal });

  fields.push({ id: GHL_FIELD_IDS.quizCompletedAt, value: nowIso() });

  // Kurumsal-specific fields
  if (state.companySize)
    fields.push({ id: GHL_FIELD_IDS.companySize, value: state.companySize });
  if (state.q_priority_depts?.length)
    fields.push({ id: GHL_FIELD_IDS.priorityDepartments, value: state.q_priority_depts });

  return fields;
}

/**
 * Build detailed note body for contact CRM record.
 * Includes dimension scores, pain areas, company size, priority departments.
 */
export function buildContactNote(state: KurumsalQuizState): string {
  const lines = [
    "Kurumsal AI Olgunluk Değerlendirmesi Tamamlandı",
    "",
    `Persona: ${state.persona}`,
    `Olgunluk Skoru: ${70 - state.totalScore}/70`,
    `Pain Level: ${state.painLevel}`,
    "",
    "5 Boyut Skorları:",
    `  Strateji & Vizyon: ${state.d_strategy}/10`,
    `  Ekip & Yetkinlik: ${state.d_team}/10`,
    `  Süreç & Entegrasyon: ${state.d_process}/10`,
    `  Veri & Altyapı: ${state.d_data}/10`,
    `  Kültür & Benimseme: ${10 - state.d_culture}/10 (direnç: ${state.d_culture}/10)`,
    "",
    "4 Zorluk Alanı:",
    `  Pilot Ölçekleme: ${state.p_pilot}/5`,
    `  ROI Ölçümü: ${state.p_roi}/5`,
    `  Ekip Direnci: ${state.p_resistance}/5`,
    `  Kaynak Yetersizliği: ${state.p_resources}/5`,
    "",
    `Sektör: ${state.sector ?? "Belirtilmedi"}`,
    `Şirket Büyüklüğü: ${state.companySize ?? "Belirtilmedi"}`,
    `Hedef: ${state.q_goal ?? "Belirtilmedi"}`,
    `Öncelikli Departmanlar: ${state.q_priority_depts?.join(", ") || "Belirtilmedi"}`,
  ];
  return lines.join("\n");
}
