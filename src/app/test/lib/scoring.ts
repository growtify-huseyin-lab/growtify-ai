// Score calculation — matches SPEC v4 section "Score Calculation".

import type {
  QuizState,
  PainLevel,
  Persona,
  Discount,
} from "./types";

export function calculatePainScore(state: QuizState): number {
  const scores = [
    state.q_time,
    state.q_procrastination,
    state.q_focus,
    state.q_comparison,
    state.q_fomo,
    10 - state.q_progress, // reversed
    state.q_uncertainty * 2,
    state.q_overwhelm * 2,
    state.q_decision * 2,
    state.q_fear * 2,
    10 - state.q_selfworth, // reversed
    state.q_social,
    state.q_overthink,
    state.q_motivation,
  ];
  return scores.reduce((a, b) => a + b, 0);
}

export function determinePainLevel(score: number): PainLevel {
  if (score < 40) return "low";
  if (score < 80) return "medium";
  return "high";
}

export function determinePersona(score: number): Persona {
  if (score < 28) return "Meraklı Gözlemci";
  if (score < 60) return "Aktif Deneyici";
  if (score < 93) return "Uygulamacı";
  return "AI Lideri"; // %85+ — ulaşılmak istenen hedef nokta
}

/**
 * Weighted random discount.
 * Distribution (9.999 TL base):
 *   %60 chance → %40-50 indirim (4.999-5.999 TL)
 *   %25 chance → %30-39 indirim (6.099-6.999 TL)
 *   %15 chance → %20-29 indirim (7.099-7.999 TL)
 *
 * Her kullanıcıya farklı, tek kullanımlık kupon kodu ile eşleşir.
 * Kişiselleştirilmiş teklif — hak iddia edilemez (bkz. legal disclaimer).
 */
export function pickDiscount(): Discount {
  const roll = Math.random() * 100;
  if (roll < 60) {
    // %40-50 arası (en yaygın)
    return 40 + Math.floor(Math.random() * 11); // 40,41,...,50
  } else if (roll < 85) {
    // %30-39 arası
    return 30 + Math.floor(Math.random() * 10); // 30,31,...,39
  } else {
    // %20-29 arası (nadir)
    return 20 + Math.floor(Math.random() * 10); // 20,21,...,29
  }
}

export function computeResults(state: QuizState): Pick<
  QuizState,
  "totalScore" | "painLevel" | "persona" | "discount"
> {
  const totalScore = calculatePainScore(state);
  return {
    totalScore,
    painLevel: determinePainLevel(totalScore),
    persona: determinePersona(totalScore),
    discount: state.discount || pickDiscount(),
  };
}
