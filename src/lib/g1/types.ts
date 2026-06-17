// G1 / DeepGap — types matching the locked Creative content config
// (src/data/g1/g1-content-config.json): 6 dimensions × 2 likert questions + 8
// quantitative "hooks", 5 levels, 16 sector overlays. The whole test is one
// universal question core; a sector only changes {core_service}, n_top_task
// options, and the benchmark seed.

export interface G1Level {
  score: number; // 1..5
  label: string; // Kıyıda … Dönüştüren
}

export interface G1DimensionDef {
  id: string; // d_adoption, d_depth, …
  label: string;
  questions: string[]; // 2 likert question ids
  optional_per_sector?: boolean;
}

export interface G1LikertOption {
  score: number; // 1..5
  label: string;
}

export interface G1SelectOption {
  value: string;
  label: string;
}

export type G1QuestionType = "likert5" | "number" | "single_select";

// Raw question as stored in the JSON (options is polymorphic by type).
export interface G1RawQuestion {
  id: string;
  type: G1QuestionType;
  text: string;
  dimension?: string;
  options?: Array<G1LikertOption | G1SelectOption>;
  options_from?: string; // e.g. "sector.top_tasks"
  unit?: string;
  feeds?: string; // "synthesis" | "cost" | "synthesis,cost"
}

export interface G1Sector {
  label: string;
  core_service: string;
  top_tasks: string[];
  benchmark: Record<string, number>; // dimensionId -> benchmark score
}

export interface G1RawConfig {
  scoring: {
    levels: G1Level[];
    dimensions: G1DimensionDef[];
  };
  questions: G1RawQuestion[];
  sectors: Record<string, G1Sector>;
}

/* ----------------------------- resolved (per sector) ---------------------- */

export interface G1ResolvedQuestion {
  id: string;
  type: G1QuestionType;
  text: string; // {core_service} already injected
  dimension?: string;
  likertOptions?: G1LikertOption[]; // type likert5
  selectOptions?: G1SelectOption[]; // type single_select (concrete)
  unit?: string;
  feeds?: string;
}

export interface G1ResolvedConfig {
  levels: G1Level[];
  dimensions: G1DimensionDef[];
  questions: G1ResolvedQuestion[];
  benchmark: Record<string, number>;
  sector: { slug: string; label: string; core_service: string };
}

/* ----------------------------------- answers / result -------------------- */

// likert -> number (score), number -> number, single_select -> string (value)
export type G1Answers = Record<string, number | string>;

export interface G1DimensionResult {
  id: string;
  label: string;
  score: number; // 1.0..5.0 (avg of its 2 likert questions)
  levelLabel: string; // nearest level label
  benchmark: number;
  delta: number; // score - benchmark
}

export interface G1Result {
  overall: number; // avg of dimension scores (1.0..5.0)
  levelScore: number; // round(overall) 1..5
  levelLabel: string; // levels[levelScore]
  dimensions: G1DimensionResult[];
  weakest: string; // dimension id
  strongest: string; // dimension id
  quant: Record<string, number | string>; // raw quantitative answers (synthesis/cost — next)
  completedAt: string;
}

/* ----------------------------- synthesis (result copy) -------------------- */
// Built by synthesis.ts from g1-interpretations.json + g1-result-ux.json: the
// per-dimension "means/next" texts, the personal gap paragraph, and the
// cost-of-inaction lines.

export type G1BenchState = "ahead" | "ontrack" | "behind";

export interface G1SynthDimension {
  id: string;
  label: string;
  score: number;
  levelLabel: string;
  benchmark: number;
  delta: number;
  benchState: G1BenchState;
  means: string;
  next: string;
}

export interface G1Synthesis {
  levelLabel: string;
  overall: number;
  sectorOverallBenchmark: number;
  dimensions: G1SynthDimension[];
  weakest: { id: string; label: string; score: number; means: string; next: string };
  gapParagraph: string;
  cost: { intro: string; lines: string[]; closing: string } | null;
}

/* ----------------------------- re-access / retake ------------------------- */
// A member can re-open /g1 from the lesson at any time. If they already have a
// result on their GHL contact, we show it back (read-only) + offer a re-take.
// The re-take is the G→T (Gap→Transformation) before/after: the stored result IS
// the baseline, so submit reads it before overwriting and returns the delta.

export interface G1PriorResult {
  overall: number; // last stored overall (1..5)
  attempt: number; // how many times completed so far
  completedAt: string; // ISO of last completion
  archetype: string; // stored level/archetype label
  gapSummary: string; // short stored summary (built at writeback)
  dims: { id: string; score: number }[]; // Creative dimId -> score
}

export interface G1BeforeAfter {
  before: number; // baseline overall (prior attempt)
  after: number; // this attempt overall
  delta: number; // after - before
  attempt: number; // this attempt index (2 = first retake)
  dims: { id: string; label: string; before: number; after: number; delta: number }[];
}

// Interpreted comparison of this attempt vs the previous one — the "transformation"
// narrative. Every retake IS a transformation snapshot (no separate module): each
// reading is read against the last, so the member sees movement, not just numbers.
export interface G1Comparison {
  attempt: number;
  direction: "up" | "flat" | "down";
  levelChanged: boolean;
  headline: string; // short movement summary (level → level, or +Δ)
  paragraph: string; // 2-4 sentence interpretation
  topGain: { label: string; delta: number } | null; // most-improved dimension
  lagging: { label: string; delta: number } | null; // regressed / flat dimension = next focus
}
