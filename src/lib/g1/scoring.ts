// G1 / DeepGap — pure scoring. dimension = avg of its 2 likert questions;
// overall = avg of dimension scores; level = round(overall) -> levels[];
// weakest = lowest dimension. Quantitative answers are collected raw (they feed
// the synthesis + cost-of-inaction copy — formula is the next Creative/dev step).
import type {
  G1Answers,
  G1DimensionResult,
  G1Level,
  G1ResolvedConfig,
  G1Result,
} from "./types";

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function levelLabel(levels: G1Level[], score: number): string {
  const idx = Math.min(5, Math.max(1, Math.round(score))); // 1..5
  return levels.find((l) => l.score === idx)?.label ?? "—";
}

export function scoreG1(config: G1ResolvedConfig, answers: G1Answers): G1Result {
  const dimensions: G1DimensionResult[] = config.dimensions.map((d) => {
    const scores = d.questions
      .map((qid) => answers[qid])
      .filter((v): v is number => typeof v === "number" && !Number.isNaN(v));
    const score = scores.length
      ? round1(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;
    const benchmark = config.benchmark[d.id] ?? 0;
    return {
      id: d.id,
      label: d.label,
      score,
      levelLabel: levelLabel(config.levels, score),
      benchmark,
      delta: round1(score - benchmark),
    };
  });

  const scored = dimensions.filter((d) => d.score > 0);
  const overall = scored.length
    ? round1(scored.reduce((a, b) => a + b.score, 0) / scored.length)
    : 0;
  const levelScore = Math.min(5, Math.max(1, Math.round(overall)));

  const ranked = [...scored].sort((a, b) => a.score - b.score);

  // Collect the quantitative answers (non-dimension questions) for synthesis/cost.
  const dimQuestionIds = new Set(config.dimensions.flatMap((d) => d.questions));
  const quant: Record<string, number | string> = {};
  for (const q of config.questions) {
    if (q.type !== "likert5" && !dimQuestionIds.has(q.id) && answers[q.id] !== undefined) {
      quant[q.id] = answers[q.id];
    }
  }

  return {
    overall,
    levelScore,
    levelLabel: levelLabel(config.levels, overall),
    dimensions,
    weakest: ranked[0]?.id ?? "",
    strongest: ranked[ranked.length - 1]?.id ?? "",
    quant,
    completedAt: new Date().toISOString(),
  };
}
