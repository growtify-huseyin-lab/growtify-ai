// G1 / DeepGap — config loader. The raw content config (Creative locked v1) is a
// universal question core + per-sector overlay. loadG1Config(sector) resolves a
// sector-ready config: injects {core_service}, expands n_top_task options from the
// sector's top_tasks, and attaches the sector benchmark. Adding a sector = one
// overlay row in the JSON, no engine change.
import rawConfig from "@/data/g1/g1-content-config.json";
import type {
  G1LikertOption,
  G1RawConfig,
  G1RawQuestion,
  G1ResolvedConfig,
  G1ResolvedQuestion,
  G1SelectOption,
} from "./types";

const RAW = rawConfig as unknown as G1RawConfig;
const DEFAULT_SECTOR = "diger";

function isLikert(o: unknown): o is G1LikertOption {
  return typeof o === "object" && o !== null && "score" in o;
}

function resolveQuestion(
  q: G1RawQuestion,
  coreService: string,
  topTasks: string[],
): G1ResolvedQuestion {
  const text = q.text.replace(/\{core_service\}/g, coreService);
  const base: G1ResolvedQuestion = {
    id: q.id,
    type: q.type,
    text,
    dimension: q.dimension,
    unit: q.unit,
    feeds: q.feeds,
  };

  if (q.type === "likert5") {
    base.likertOptions = (q.options ?? []).filter(isLikert) as G1LikertOption[];
    return base;
  }

  // single_select / number
  if (q.options_from === "sector.top_tasks") {
    base.selectOptions = topTasks.map((t, i) => ({ value: `t${i}`, label: t }));
  } else if (q.options) {
    base.selectOptions = q.options.filter(
      (o): o is G1SelectOption => typeof o === "object" && o !== null && "value" in o,
    );
  }
  return base;
}

export function loadG1Config(sector?: string, _locale?: string): G1ResolvedConfig {
  const slug = sector && RAW.sectors[sector] ? sector : DEFAULT_SECTOR;
  const sec = RAW.sectors[slug] ?? RAW.sectors[DEFAULT_SECTOR];

  const questions = RAW.questions.map((q) =>
    resolveQuestion(q, sec.core_service, sec.top_tasks),
  );

  return {
    levels: RAW.scoring.levels,
    dimensions: RAW.scoring.dimensions,
    questions,
    benchmark: sec.benchmark,
    sector: { slug, label: sec.label, core_service: sec.core_service },
  };
}

export function g1SectorSlugs(): string[] {
  return Object.keys(RAW.sectors);
}
