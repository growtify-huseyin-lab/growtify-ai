// G1 / DeepGap — config loader. Default config is the bundled seed. Sector
// overrides merge over the default by question id / dimension key, so a sector
// only needs to specify what differs.
//
// Adding a sector today = drop `src/data/g1/{sector}.json` and add one import
// line to SECTOR_CONFIGS below. (Fully zero-dev runtime loading from
// `public/g1/{sector}.json` is the planned follow-up — see docs/g1/README.md.)
import type { G1Config, G1Question } from "./types";
import defaultConfig from "@/data/g1/default.json";

const SECTOR_CONFIGS: Record<string, Partial<G1Config>> = {
  // saglik: sektorSaglik,  // example — uncomment after adding saglik.json
};

function mergeConfig(base: G1Config, override: Partial<G1Config>): G1Config {
  if (!override || Object.keys(override).length === 0) return base;
  const questions: G1Question[] = base.questions.map((q) => {
    const o = override.questions?.find((x) => x.id === q.id);
    return o ? { ...q, ...o } : q;
  });
  // any extra questions the override introduces
  for (const o of override.questions ?? []) {
    if (!questions.some((q) => q.id === o.id)) questions.push(o);
  }
  return {
    ...base,
    ...override,
    meta: { ...base.meta, ...(override.meta ?? {}) },
    dimensions: override.dimensions ?? base.dimensions,
    questions,
    bands: override.bands ?? base.bands,
    benchmark: { ...base.benchmark, ...(override.benchmark ?? {}) },
    archetypes: override.archetypes ?? base.archetypes,
    recommendations: { ...base.recommendations, ...(override.recommendations ?? {}) },
  };
}

export function loadG1Config(sector?: string, _locale?: string): G1Config {
  const base = defaultConfig as unknown as G1Config;
  if (sector && SECTOR_CONFIGS[sector]) {
    return mergeConfig(base, SECTOR_CONFIGS[sector]);
  }
  return base;
}
