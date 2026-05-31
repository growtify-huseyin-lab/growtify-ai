// Locale selector over kurumsal content-runtime (TR, untouched) + -en mirror.
import * as TR from "./content-kurumsal-runtime";
import * as EN from "./content-kurumsal-runtime-en";
import type { KurumsalScreenConfig } from "./types-kurumsal";

const isEn = (l: string) => l === "en";
export function getKScreens(locale: string): KurumsalScreenConfig[] {
  return isEn(locale) ? EN.SCREENS : TR.SCREENS;
}
export function getKTotalScreens(): number {
  return TR.TOTAL_SCREENS;
}
export function getKPaywallCopy(locale: string) {
  return isEn(locale) ? EN.KURUMSAL_PAYWALL_COPY : TR.KURUMSAL_PAYWALL_COPY;
}
export function getKPersonaSummaries(locale: string) {
  return isEn(locale) ? EN.KURUMSAL_PERSONA_SUMMARIES : TR.KURUMSAL_PERSONA_SUMMARIES;
}
export const interpolate = TR.interpolate;
