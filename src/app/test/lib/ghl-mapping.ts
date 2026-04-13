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
  "AI Lideri": "optimize",
};

/**
 * Quiz persona → slug value stored in GAI - Quiz Persona custom field.
 * Must exactly match one of the picklist options created on that field.
 */
const PERSONA_FIELD_MAP: Record<Persona, string> = {
  "Meraklı Gözlemci": "merakli_gozlemci",
  "Aktif Deneyici": "aktif_deneyici",
  Uygulamacı: "uygulamaci",
  "AI Lideri": "ai_lideri",
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
  if (state.segment) fields.push({ id: GHL_FIELD_IDS.profession, value: state.segment });
  // Normalize score to 0-100 (same formula as PDF: totalScore / 110 * 100, capped at 100)
  const MAX_PRACTICAL_SCORE = 5 * 6 + 10 * 8; // 110
  const normalizedScore = Math.min(100, Math.round((state.totalScore / MAX_PRACTICAL_SCORE) * 100));
  fields.push({ id: GHL_FIELD_IDS.quizScore, value: normalizedScore });
  fields.push({ id: GHL_FIELD_IDS.leadSource, value: "quiz_organic" });
  fields.push({ id: GHL_FIELD_IDS.landingPage, value: "https://growtify.ai/test" });

  // SINGLE_OPTIONS
  if (state.sector) fields.push({ id: GHL_FIELD_IDS.sector, value: state.sector });
  fields.push({
    id: GHL_FIELD_IDS.quizPersona,
    value: PERSONA_FIELD_MAP[state.persona] ?? "merakli_gozlemci",
  });
  fields.push({ id: GHL_FIELD_IDS.quizPainLevel, value: state.painLevel });
  if (state.q_goal) fields.push({ id: GHL_FIELD_IDS.quizGoal, value: state.q_goal });

  // NUMERICAL
  if (state.commitment)
    fields.push({ id: GHL_FIELD_IDS.dailyCommitmentMinutes, value: state.commitment });

  // DATE
  fields.push({ id: GHL_FIELD_IDS.quizCompletedAt, value: nowIso() });

  // MULTIPLE_OPTIONS (pass as arrays — GHL v2 accepts string[])
  if (state.q_areas?.length)
    fields.push({ id: GHL_FIELD_IDS.quizPainAreas, value: state.q_areas });
  if (state.q_habits?.length)
    fields.push({ id: GHL_FIELD_IDS.quizHabitsToQuit, value: state.q_habits });

  return fields;
}
