// Growtify AI — Liven-style Quiz — Types
// Matches SPEC-growtify-quiz-v4-FULL.md technical spec.

export type Segment = "bireysel" | "isletme";
export type PainLevel = "low" | "medium" | "high";
export type Persona =
  | "Meraklı Gözlemci"
  | "Aktif Deneyici"
  | "Uygulamacı"
  | "AI Lideri";
export type Commitment = 15 | 30 | 45 | 60;
export type Discount = number; // 20-50 arası, ağırlıklı 40-50 bandı

export interface QuizState {
  // Segmentation
  segment: Segment | null;
  sector: string | null;

  // Pain scores (emoji 1-5 scales)
  q_time: number;
  q_procrastination: number;
  q_focus: number;
  q_comparison: number;
  q_fomo: number;
  q_progress: number;

  // Likert (1-10)
  q_uncertainty: number;
  q_overwhelm: number;
  q_decision: number;
  q_fear: number;

  // Identity
  q_selfworth: number;
  q_social: number;
  q_overthink: number;
  q_motivation: number;

  // Declarations
  q_goal: string | null;
  q_areas: string[];
  q_habits: string[];

  // Personalization
  commitment: Commitment | null;
  firstName: string;
  email: string;
  phone: string;

  // Bonus
  bonus_q1: boolean | null;
  bonus_q2: boolean | null;

  // Computed (filled after email submit)
  totalScore: number;
  painLevel: PainLevel;
  persona: Persona;
  discount: Discount;
}

export const initialQuizState: QuizState = {
  segment: null,
  sector: null,
  q_time: 0,
  q_procrastination: 0,
  q_focus: 0,
  q_comparison: 0,
  q_fomo: 0,
  q_progress: 0,
  q_uncertainty: 0,
  q_overwhelm: 0,
  q_decision: 0,
  q_fear: 0,
  q_selfworth: 0,
  q_social: 0,
  q_overthink: 0,
  q_motivation: 0,
  q_goal: null,
  q_areas: [],
  q_habits: [],
  commitment: null,
  firstName: "",
  email: "",
  phone: "",
  bonus_q1: null,
  bonus_q2: null,
  totalScore: 0,
  painLevel: "low",
  persona: "Meraklı Gözlemci",
  discount: 50,
};

// --- Screen config schema ------------------------------------------------

export type ScreenType =
  | "segmentation"
  | "sector"
  | "social_proof"
  | "pain_emoji"
  | "likert"
  | "single_select"
  | "multi_select"
  | "authority_academic"
  | "authority_expert"
  | "authority_community"
  | "commitment"
  | "text_input"
  | "profile_summary"
  | "projection"
  | "loading"
  | "bonus_modal"
  | "plan_ready"
  | "scratch_card"
  | "celebration"
  | "paywall";

export interface OptionItem {
  value: string | number;
  label: string;
  emoji?: string;
  icon?: string;
}

export interface ScreenConfig {
  id: number; // 1..37
  phase: number; // 1..10
  phaseName: string;
  type: ScreenType;
  /** Key in QuizState that this screen writes to (optional for info screens). */
  stateKey?: keyof QuizState;
  title: string;
  subtitle?: string;
  /** Small caption shown above title (e.g. "Soru 4 / 14"). */
  caption?: string;
  options?: OptionItem[];
  /** For likert: min & max labels. */
  likertMin?: string;
  likertMax?: string;
  cta?: string;
  /** Placeholder / input hint for text_input screens. */
  placeholder?: string;
  /** For paywall / plan_ready screens: arbitrary display payload (kept loose for skeleton). */
  extra?: Record<string, unknown>;
}
