// G1 / DeepGap — pure scoring from config + answers. No I/O, fully testable.
import type {
  G1Answers,
  G1Band,
  G1Config,
  G1DimensionResult,
  G1Result,
} from "./types";

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function bandFor(config: G1Config, score: number): G1Band {
  // bands declared high->low by `min`; first whose min <= score wins
  const sorted = [...config.bands].sort((a, b) => b.min - a.min);
  return (
    sorted.find((b) => score >= b.min) ??
    sorted[sorted.length - 1] ?? { min: 0, key: "unknown", label: "—" }
  );
}

function recFor(config: G1Config, dimKey: string, score: number): string {
  const r = config.recommendations[dimKey];
  if (!r) return "";
  if (score < 2.5) return r.low;
  if (score < 3.5) return r.mid;
  return r.high;
}

function archetypeFor(config: G1Config, overall: number) {
  const sorted = [...config.archetypes].sort((a, b) => a.maxOverall - b.maxOverall);
  return (
    sorted.find((a) => overall <= a.maxOverall) ??
    sorted[sorted.length - 1] ?? {
      key: "unknown",
      label: "—",
      narrative: "",
      maxOverall: 5,
    }
  );
}

export function scoreG1(config: G1Config, answers: G1Answers): G1Result {
  const byDim: Record<string, number[]> = {};
  for (const q of config.questions) {
    const s = answers[q.id];
    if (typeof s === "number" && !Number.isNaN(s)) {
      (byDim[q.dimension] ??= []).push(s);
    }
  }

  const dimensions: G1DimensionResult[] = config.dimensions.map((d) => {
    const arr = byDim[d.key] ?? [];
    const score = arr.length
      ? round1(arr.reduce((a, b) => a + b, 0) / arr.length)
      : 0;
    const band = bandFor(config, score);
    const benchmark = config.benchmark[d.key] ?? 0;
    return {
      key: d.key,
      label: d.label,
      score,
      band: band.key,
      bandLabel: band.label,
      benchmark,
      delta: round1(score - benchmark),
      recommendation: recFor(config, d.key, score),
    };
  });

  const overall = dimensions.length
    ? round1(dimensions.reduce((a, b) => a + b.score, 0) / dimensions.length)
    : 0;
  const arch = archetypeFor(config, overall);
  const ranked = [...dimensions].sort((a, b) => b.score - a.score);

  return {
    overall,
    archetypeKey: arch.key,
    archetypeLabel: arch.label,
    narrative: arch.narrative,
    dimensions,
    strongest: ranked[0]?.key ?? "",
    weakest: ranked[ranked.length - 1]?.key ?? "",
    completedAt: new Date().toISOString(),
  };
}
