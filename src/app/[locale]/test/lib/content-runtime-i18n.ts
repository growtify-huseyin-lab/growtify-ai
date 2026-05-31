// Locale selector over content-runtime (TR, untouched) + content-runtime-en (EN).
// TR path is byte-identical to the original static imports.
import * as TR from "./content-runtime";
import * as EN from "./content-runtime-en";
import type { ScreenConfig } from "./types";

const isEn = (l: string) => l === "en";

export function getScreens(locale: string): ScreenConfig[] {
  return isEn(locale) ? EN.SCREENS : TR.SCREENS;
}
export function getTotalScreens(): number {
  return TR.TOTAL_SCREENS; // structural — identical across locales
}
export function getPaywallCopy(locale: string) {
  return isEn(locale) ? EN.PAYWALL_COPY : TR.PAYWALL_COPY;
}
export function getLegalTexts(locale: string) {
  return isEn(locale) ? EN.LEGAL_TEXTS : TR.LEGAL_TEXTS;
}
export function getPersonaSummaryL(persona: string, locale: string) {
  return isEn(locale) ? EN.getPersonaSummary(persona) : TR.getPersonaSummary(persona);
}
// language-independent
export const interpolate = TR.interpolate;
