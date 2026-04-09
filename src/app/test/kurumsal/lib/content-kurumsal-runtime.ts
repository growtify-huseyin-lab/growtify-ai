// Growtify AI — Kurumsal Quiz — Content Runtime Merge Layer
// Merges structural skeleton with Turkish copy.

import { KURUMSAL_SCREENS as RAW_SCREENS, KURUMSAL_TOTAL_SCREENS as RAW_TOTAL } from "./content-kurumsal";
import {
  KURUMSAL_COPY,
  KURUMSAL_PERSONA_SUMMARIES,
  KURUMSAL_PAYWALL_COPY,
  KURUMSAL_LEGAL,
} from "./content-kurumsal-tr";
import type { KurumsalScreenConfig, KurumsalOptionItem } from "./types-kurumsal";

function mergeOptions(
  base: KurumsalOptionItem[] | undefined,
  override: KurumsalOptionItem[] | undefined,
): KurumsalOptionItem[] | undefined {
  if (!base) return override;
  if (!override) return base;
  return base.map((baseOpt) => {
    const overrideOpt = override.find((o) => o.value === baseOpt.value);
    return overrideOpt ? { ...baseOpt, ...overrideOpt } : baseOpt;
  });
}

function mergeScreen(base: KurumsalScreenConfig): KurumsalScreenConfig {
  const override = KURUMSAL_COPY[base.id];
  if (!override) return base;

  return {
    ...base,
    ...override,
    id: base.id,
    phase: base.phase,
    phaseName: base.phaseName,
    type: base.type,
    stateKey: base.stateKey,
    likertMin: override.likertMin ?? base.likertMin,
    likertMax: override.likertMax ?? base.likertMax,
    options: mergeOptions(base.options, override.options as KurumsalOptionItem[] | undefined),
    extra: { ...(base.extra ?? {}), ...(override.extra ?? {}) },
  };
}

export const SCREENS: KurumsalScreenConfig[] = RAW_SCREENS.map(mergeScreen);
export const TOTAL_SCREENS = RAW_TOTAL;

export {
  KURUMSAL_COPY,
  KURUMSAL_PERSONA_SUMMARIES,
  KURUMSAL_PAYWALL_COPY,
  KURUMSAL_LEGAL,
};

export function interpolate(
  template: string,
  vars: { firstName?: string; persona?: string; sector?: string },
): string {
  return template
    .replace(/\{firstName\}/g, vars.firstName || "siz")
    .replace(/\{persona\}/g, vars.persona || "")
    .replace(/\{sector\}/g, vars.sector || "");
}

export function getPersonaSummary(persona: string) {
  return KURUMSAL_PERSONA_SUMMARIES[persona] ?? null;
}
