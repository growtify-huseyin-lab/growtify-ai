// G1 / DeepGap — config + result types. The whole assessment is data-driven by a
// JSON config (see src/data/g1/default.json). Adding a sector = adding/overriding
// JSON, no engine change.

export interface G1Dimension {
  key: string;
  label: string;
  desc: string;
}

export interface G1Option {
  score: number; // 1..5 maturity ladder (1 = no AI, 5 = orchestrated/autonomous)
  label: string;
}

export interface G1Question {
  id: string;
  dimension: string; // -> G1Dimension.key
  stem: string;
  options: G1Option[];
}

export interface G1Band {
  min: number; // inclusive lower bound on a 1..5 score
  key: string;
  label: string;
}

export interface G1Archetype {
  maxOverall: number; // inclusive upper bound on overall score
  key: string;
  label: string;
  narrative: string;
}

export interface G1Recommendation {
  low: string; // score < 2.5
  mid: string; // 2.5 <= score < 3.5
  high: string; // score >= 3.5
}

export interface G1Config {
  version: string;
  locale: string;
  meta: {
    id: string;
    title: string;
    subtitle: string;
    questionCount: number;
  };
  dimensions: G1Dimension[];
  questions: G1Question[];
  bands: G1Band[];
  benchmark: Record<string, number>; // dimensionKey -> benchmark score
  archetypes: G1Archetype[];
  recommendations: Record<string, G1Recommendation>; // dimensionKey -> rec
}

export type G1Answers = Record<string, number>; // questionId -> chosen score (1..5)

export interface G1DimensionResult {
  key: string;
  label: string;
  score: number;
  band: string;
  bandLabel: string;
  benchmark: number;
  delta: number; // score - benchmark
  recommendation: string;
}

export interface G1Result {
  overall: number;
  archetypeKey: string;
  archetypeLabel: string;
  narrative: string;
  dimensions: G1DimensionResult[];
  strongest: string; // dimension key
  weakest: string; // dimension key
  completedAt: string; // ISO
}
