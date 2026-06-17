// G1 / DeepGap — result synthesis (Creative ART-...creative-010 + 011).
// Turns the numeric result + raw answers into: per-dimension means/next texts,
// the personal gap paragraph (archetype → weakest → quant → first move → tagline),
// and the cost-of-inaction lines ("masada duran para"). Pure, server-side.
import interpretations from "@/data/g1/g1-interpretations.json";
import resultUx from "@/data/g1/g1-result-ux.json";
import type {
  G1Answers,
  G1BenchState,
  G1ResolvedConfig,
  G1Result,
  G1SynthDimension,
  G1Synthesis,
} from "./types";

interface InterpEntry {
  level: string;
  means: string;
  next: string;
}
const INTERP = interpretations as unknown as Record<
  string,
  Record<string, InterpEntry>
>;

const UX = resultUx as unknown as {
  synthesis: {
    archetypes: { id: string; opening: string }[];
    weakest_callout_template: string;
    quant_gap_template: string;
    first_move_template: string;
    tagline_template: string;
  };
  cost_model: {
    midpoints: {
      n_missed: Record<string, number>;
      n_income: Record<string, number>;
      n_capacity: Record<string, number>;
    };
  };
};

// weakest tiebreak (bottleneck priority)
const WEAKEST_PRIORITY = [
  "d_measure",
  "d_integration",
  "d_data",
  "d_depth",
  "d_trust",
  "d_adoption",
];

function round5(score: number): string {
  return String(Math.min(5, Math.max(1, Math.round(score))));
}

function interpOf(dimId: string, score: number): InterpEntry {
  const d = INTERP[dimId];
  return (d && d[round5(score)]) || { level: "—", means: "", next: "" };
}

function benchState(delta: number): G1BenchState {
  if (delta > 0.3) return "ahead";
  if (delta < -0.3) return "behind";
  return "ontrack";
}

function fillAd(s: string, name: string): string {
  if (name) return s.replace(/\{ad\}/g, name);
  const r = s.replace(/^\{ad\},\s*/, "").replace(/\{ad\}/g, "");
  return r.charAt(0).toUpperCase() + r.slice(1);
}

function fill(s: string, slots: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(slots[k] ?? ""));
}

function tl(n: number): string {
  return `${Math.round(n).toLocaleString("tr-TR")}₺`;
}

function pickArchetypeOpening(
  d: Record<string, number>,
  overall: number,
  weakest: string,
  name: string,
): string {
  const open = (id: string) =>
    UX.synthesis.archetypes.find((a) => a.id === id)?.opening ?? "";
  const scores = Object.values(d);
  const minDim = scores.length ? Math.min(...scores) : 0;
  let id = "default";
  if (d.d_adoption >= 4 && (d.d_depth + d.d_integration) / 2 <= 2) id = "istekli_sistemsiz";
  else if (overall <= 1.6) id = "kiyida";
  else if (weakest === "d_measure" && d.d_measure <= 1.5 && overall >= 2) id = "olcmeyen";
  else if (d.d_depth >= 3 && d.d_integration <= 2) id = "daginik";
  else if (minDim >= 2.5) id = "dengeli";
  return fillAd(open(id), name);
}

function topTaskLabel(config: G1ResolvedConfig, answers: G1Answers): string {
  const q = config.questions.find((x) => x.id === "n_top_task");
  const v = answers["n_top_task"];
  return q?.selectOptions?.find((o) => o.value === v)?.label ?? "asıl işin";
}

function buildCost(
  config: G1ResolvedConfig,
  answers: G1Answers,
): G1Synthesis["cost"] {
  const mp = UX.cost_model.midpoints;
  const topTask = topTaskLabel(config, answers);
  const hours = Number(answers["n_hours_task"]);
  const missedMid = mp.n_missed[String(answers["n_missed"])] ?? 0;
  const incomeMid = mp.n_income[String(answers["n_income"])] ?? 0;
  const capacityMid = mp.n_capacity[String(answers["n_capacity"])] ?? 0;

  const savedYear = Number.isFinite(hours) && hours > 0 ? Math.round(hours * 0.7) * 52 : 0;
  const lostRevenueYear = missedMid * incomeMid * 6;
  const openCapacityMonth = capacityMid * incomeMid;

  const lines: string[] = [];
  if (savedYear > 0) {
    lines.push(
      `${topTask} işine haftada ~${hours} saat veriyorsun. AI bunun büyük kısmını devralabilir → yılda ~${savedYear} saat sana geri döner.`,
    );
  }
  if (lostRevenueYear > 0) {
    lines.push(
      `Son 1 yılda zaman/kapasite yüzünden ~${missedMid} müşteri kaçırmışsın — kabaca ${tl(lostRevenueYear)}.`,
    );
  }
  if (openCapacityMonth > 0) {
    lines.push(
      `Hâlâ ${capacityMid} müşterilik boş kapasiten var (ayda ~${tl(openCapacityMonth)}).`,
    );
  }
  if (lines.length === 0) return null;
  return {
    intro: "İşinin bugünkü tablosu, kendi rakamlarınla:",
    lines,
    closing:
      "Unutma: bu, harcayacağın para değil — masada zaten duran, senin almadığın para.",
  };
}

export function buildG1Synthesis(
  config: G1ResolvedConfig,
  result: G1Result,
  answers: G1Answers,
  name: string,
): G1Synthesis {
  const dims: G1SynthDimension[] = result.dimensions.map((d) => {
    const it = interpOf(d.id, d.score);
    return {
      id: d.id,
      label: d.label,
      score: d.score,
      levelLabel: d.levelLabel,
      benchmark: d.benchmark,
      delta: d.delta,
      benchState: benchState(d.delta),
      means: it.means,
      next: it.next,
    };
  });

  const scoreMap: Record<string, number> = {};
  for (const d of dims) scoreMap[d.id] = d.score;

  // weakest: lowest score, tie broken by bottleneck priority
  const weakestDim = [...dims].sort(
    (a, b) =>
      a.score - b.score ||
      WEAKEST_PRIORITY.indexOf(a.id) - WEAKEST_PRIORITY.indexOf(b.id),
  )[0];

  const benchValues = config.dimensions.map((d) => config.benchmark[d.id] ?? 0);
  const sectorOverallBenchmark =
    Math.round(
      (benchValues.reduce((a, b) => a + b, 0) / (benchValues.length || 1)) * 10,
    ) / 10;

  const topTask = topTaskLabel(config, answers);
  const hours = answers["n_hours_task"];

  const opening = pickArchetypeOpening(scoreMap, result.overall, weakestDim.id, name);
  const weakestCallout = fill(UX.synthesis.weakest_callout_template, {
    weakest_label: weakestDim.label,
    weakest_score: weakestDim.score,
    weakest_means: weakestDim.means,
  });
  const quantGap =
    topTask && hours !== undefined && Number(hours) > 0
      ? fill(UX.synthesis.quant_gap_template, { n_top_task: topTask, n_hours_task: hours })
      : "";
  const firstMove = fill(UX.synthesis.first_move_template, {
    weakest_next: weakestDim.next,
    n_top_task: topTask,
  });
  const tagline = fill(UX.synthesis.tagline_template, {
    sector_overall_benchmark: sectorOverallBenchmark,
    overall: result.overall,
  });

  const gapParagraph = [opening, weakestCallout, quantGap, firstMove, tagline]
    .filter(Boolean)
    .join(" ");

  return {
    levelLabel: result.levelLabel,
    overall: result.overall,
    sectorOverallBenchmark,
    dimensions: dims,
    weakest: {
      id: weakestDim.id,
      label: weakestDim.label,
      score: weakestDim.score,
      means: weakestDim.means,
      next: weakestDim.next,
    },
    gapParagraph,
    cost: buildCost(config, answers),
  };
}
