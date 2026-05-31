"use client";
// Client hooks that pick locale-aware quiz content via next-intl useLocale().
// TR locale → byte-identical to original content-runtime static exports.
import { useLocale } from "next-intl";
import {
  getScreens,
  getTotalScreens,
  getPaywallCopy,
  getLegalTexts,
  getPersonaSummaryL,
} from "./content-runtime-i18n";

export function useQuizScreens() {
  return getScreens(useLocale());
}
export function useTotalScreens() {
  return getTotalScreens();
}
export function usePaywallCopy() {
  return getPaywallCopy(useLocale());
}
export function useLegalTexts() {
  return getLegalTexts(useLocale());
}
export function usePersonaResolver() {
  const locale = useLocale();
  return (persona: string) => getPersonaSummaryL(persona, locale);
}
