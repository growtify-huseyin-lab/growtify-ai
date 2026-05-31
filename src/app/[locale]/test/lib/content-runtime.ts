// Growtify AI — Content runtime integration layer
// =============================================================================
// Merges the skeleton SCREENS[] (structural) with content-tr.ts (copy).
// Every screen gets its `title`, `subtitle`, `caption`, `cta`, `options[].label`,
// `placeholder` overridden from QUIZ_COPY. Loading steps for ekran 29/31/33
// are also overridden.
//
// Also re-exports the rest of content-tr so the rest of the app has one place
// to import runtime copy from.
// =============================================================================

import { SCREENS as RAW_SCREENS, TOTAL_SCREENS as RAW_TOTAL } from "./content";
import {
  QUIZ_COPY,
  LOADING_STEPS,
  PERSONA_SUMMARIES,
  PAYWALL_COPY,
  LEGAL_TEXTS,
} from "./content-tr";
import type { ScreenConfig, OptionItem } from "./types";

/**
 * Merge a skeleton option with a content-layer option. Matches by `value`.
 * Content-layer option can override label/emoji/icon; value is preserved.
 */
function mergeOptions(
  base: OptionItem[] | undefined,
  override: OptionItem[] | undefined,
): OptionItem[] | undefined {
  if (!base) return override;
  if (!override) return base;
  return base.map((baseOpt) => {
    const overrideOpt = override.find((o) => o.value === baseOpt.value);
    return overrideOpt ? { ...baseOpt, ...overrideOpt } : baseOpt;
  });
}

function mergeScreen(base: ScreenConfig): ScreenConfig {
  const override = QUIZ_COPY[base.id];
  if (!override) return base;

  // Start with structural base, layer copy override, then restore extras:
  const merged: ScreenConfig = {
    ...base,
    ...override,
    // Never let override change the structural fields:
    id: base.id,
    phase: base.phase,
    phaseName: base.phaseName,
    type: base.type,
    stateKey: base.stateKey,
    likertMin: base.likertMin ?? override.likertMin,
    likertMax: base.likertMax ?? override.likertMax,
    options: mergeOptions(base.options, override.options),
    extra: { ...(base.extra ?? {}), ...(override.extra ?? {}) },
  };

  // Loading-step override for ekran 29 / 31 / 33
  const loadingSteps = LOADING_STEPS[base.id];
  if (loadingSteps && merged.extra) {
    merged.extra = { ...merged.extra, steps: loadingSteps };
  }

  return merged;
}

/** Runtime-merged screen array. Use this instead of raw SCREENS. */
export const SCREENS: ScreenConfig[] = RAW_SCREENS.map(mergeScreen);
export const TOTAL_SCREENS = RAW_TOTAL;

// Re-export content-tr assets so consumers have one import source.
export {
  QUIZ_COPY,
  LOADING_STEPS,
  PERSONA_SUMMARIES,
  PAYWALL_COPY,
  LEGAL_TEXTS,
};

/* -------------------------------------------------------------------------- */
/*  Dynamic content helpers                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Apply {firstName} / {persona} / {sector} substitution on a string.
 * Non-matching placeholders are left as-is.
 */
export function interpolate(
  template: string,
  vars: { firstName?: string; persona?: string; sector?: string },
): string {
  return template
    .replace(/\{firstName\}/g, vars.firstName || "sen")
    .replace(/\{persona\}/g, vars.persona || "")
    .replace(/\{sector\}/g, vars.sector || "");
}

/**
 * Resolve persona summary from state.persona.
 * Returns null if persona is not in the mapping (shouldn't happen).
 */
export function getPersonaSummary(persona: string) {
  return PERSONA_SUMMARIES[persona as keyof typeof PERSONA_SUMMARIES] ?? null;
}
