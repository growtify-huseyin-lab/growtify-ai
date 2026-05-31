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

// UI microcopy not in the screen content layer (loading states, chart labels, etc.)
const QUIZ_UI = {
  tr: {
    savingAnswers: "Cevapların kaydediliyor...",
    preparingReport: "Kişisel raporun hazırlanıyor...",
    buildingProfile: "Profilin oluşturuluyor...",
    almostReady: "Neredeyse hazır...",
    ready: "Hazır! ✓",
    saveError: "Planını kaydederken bir sorun oluştu, devam edebilirsin — tekrar deneyeceğiz.",
    scratch: "Kazı!",
    offerExpired: "Teklif süresi doldu",
    chartToday: "Bugün",
    chart30: "30 gün",
    chart60: "60 gün",
    chart90: "90 gün",
  },
  en: {
    savingAnswers: "Saving your answers...",
    preparingReport: "Preparing your personal report...",
    buildingProfile: "Building your profile...",
    almostReady: "Almost ready...",
    ready: "Ready! ✓",
    saveError: "There was a problem saving your plan — you can continue, we'll try again.",
    scratch: "Scratch!",
    offerExpired: "Offer expired",
    chartToday: "Today",
    chart30: "30 days",
    chart60: "60 days",
    chart90: "90 days",
  },
} as const;

export function useQuizUi() {
  const locale = useLocale();
  return locale === "en" ? QUIZ_UI.en : QUIZ_UI.tr;
}
