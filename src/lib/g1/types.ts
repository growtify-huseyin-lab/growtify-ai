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
