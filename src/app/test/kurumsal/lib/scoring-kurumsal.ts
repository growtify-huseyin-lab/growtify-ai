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

/**
 * Get dimension breakdown for PDF/result screen.
 * Returns individual dimension scores (0-10, where 10 = best).
 */
export function getDimensionBreakdown(state: KurumsalQuizState) {
  return [
    { key: "d_strategy", label: "Strateji & Vizyon", score: state.d_strategy, max: 10 },
    { key: "d_team", label: "Ekip & Yetkinlik", score: state.d_team, max: 10 },
    { key: "d_process", label: "Süreç & Entegrasyon", score: state.d_process, max: 10 },
    { key: "d_data", label: "Veri & Altyapı", score: state.d_data, max: 10 },
    { key: "d_culture", label: "Kültür & Benimseme", score: 10 - state.d_culture, max: 10 },
  ];
}

export function getPainBreakdown(state: KurumsalQuizState) {
  return [
    { key: "p_pilot", label: "Pilot Ölçekleme", score: state.p_pilot, max: 5 },
    { key: "p_roi", label: "ROI Ölçümü", score: state.p_roi, max: 5 },
    { key: "p_resistance", label: "Ekip Direnci", score: state.p_resistance, max: 5 },
    { key: "p_resources", label: "Kaynak Yetersizliği", score: state.p_resources, max: 5 },
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
