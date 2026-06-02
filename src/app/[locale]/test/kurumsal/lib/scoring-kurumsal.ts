// Growtify AI — Kurumsal Quiz Scoring
// 5 dimension Likert (1-10) + 4 pain emoji (1-5) = max 70

import type { KurumsalQuizState, PainLevel, KurumsalPersona } from "./types-kurumsal";

/**
 * Calculate total maturity score.
 * 5 Likert dimensions (1-10) + 4 Pain areas (1-5).
 * Culture (d_culture) is reversed: higher value = more resistance = higher pain score.
 * Max theoretical: 50 (Likert) + 20 (Pain) = 70
 */
export function calculateKurumsalScore(state: KurumsalQuizState): number {
  const dimensionScores = [
    10 - state.d_strategy,  // reversed: low strategy = high need
    10 - state.d_team,      // reversed: low team readiness = high need
    10 - state.d_process,   // reversed: low integration = high need
    10 - state.d_data,      // reversed: low data readiness = high need
    state.d_culture,        // already pain-direction: high = more resistance
  ];

  const painScores = [
    state.p_pilot,
    state.p_roi,
    state.p_resistance,
    state.p_resources,
  ];

  return (
    dimensionScores.reduce((a, b) => a + b, 0) +
    painScores.reduce((a, b) => a + b, 0)
  );
}

export function determinePainLevel(score: number): PainLevel {
  if (score < 24) return "low";
  if (score < 47) return "medium";
  return "high";
}

/**
 * Map total score to corporate AI maturity persona.
 * Higher score = more pain = lower maturity.
 */
export function determinePersona(score: number): KurumsalPersona {
  if (score >= 53) return "Baslangic";  // Most pain = lowest maturity
  if (score >= 35) return "Kesif";
  if (score >= 18) return "Uygulama";
  return "Lider";                        // Least pain = highest maturity
}

/* Locale-aware labels for dimensions + challenge areas (result screen + PDF). */
const DIMENSION_LABELS: Record<string, { tr: string; en: string }> = {
  d_strategy: { tr: "Strateji & Vizyon", en: "Strategy & Vision" },
  d_team: { tr: "Ekip & Yetkinlik", en: "Team & Capability" },
  d_process: { tr: "Süreç & Entegrasyon", en: "Process & Integration" },
  d_data: { tr: "Veri & Altyapı", en: "Data & Infrastructure" },
  d_culture: { tr: "Kültür & Benimseme", en: "Culture & Adoption" },
};

const PAIN_LABELS: Record<string, { tr: string; en: string }> = {
  p_pilot: { tr: "Pilot Ölçekleme", en: "Pilot Scaling" },
  p_roi: { tr: "ROI Ölçümü", en: "ROI Measurement" },
  p_resistance: { tr: "Ekip Direnci", en: "Team Resistance" },
  p_resources: { tr: "Kaynak Yetersizliği", en: "Resource Constraints" },
};

/**
 * Get dimension breakdown for PDF/result screen (locale-aware labels).
 * Returns individual dimension scores (0-10, where 10 = best).
 */
export function getDimensionBreakdown(state: KurumsalQuizState, locale: string = "tr") {
  const L = locale === "en" ? "en" : "tr";
  return [
    { key: "d_strategy", label: DIMENSION_LABELS.d_strategy[L], score: state.d_strategy, max: 10 },
    { key: "d_team", label: DIMENSION_LABELS.d_team[L], score: state.d_team, max: 10 },
    { key: "d_process", label: DIMENSION_LABELS.d_process[L], score: state.d_process, max: 10 },
    { key: "d_data", label: DIMENSION_LABELS.d_data[L], score: state.d_data, max: 10 },
    { key: "d_culture", label: DIMENSION_LABELS.d_culture[L], score: 10 - state.d_culture, max: 10 },
  ];
}

export function getPainBreakdown(state: KurumsalQuizState, locale: string = "tr") {
  const L = locale === "en" ? "en" : "tr";
  return [
    { key: "p_pilot", label: PAIN_LABELS.p_pilot[L], score: state.p_pilot, max: 5 },
    { key: "p_roi", label: PAIN_LABELS.p_roi[L], score: state.p_roi, max: 5 },
    { key: "p_resistance", label: PAIN_LABELS.p_resistance[L], score: state.p_resistance, max: 5 },
    { key: "p_resources", label: PAIN_LABELS.p_resources[L], score: state.p_resources, max: 5 },
  ];
}

export function computeKurumsalResults(state: KurumsalQuizState): Pick<
  KurumsalQuizState,
  "totalScore" | "painLevel" | "persona"
> {
  const totalScore = calculateKurumsalScore(state);
  return {
    totalScore,
    painLevel: determinePainLevel(totalScore),
    persona: determinePersona(totalScore),
  };
}
