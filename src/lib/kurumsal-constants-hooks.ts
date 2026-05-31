"use client";
// Client hooks that pick locale-aware kurumsal constants via next-intl useLocale().
import { useLocale } from "next-intl";
import {
  getKHero,
  getKProblems,
  getKServices,
  getKGrowtPhases,
  getKProcess,
  getKStats,
  getKFaq,
  getKSectors,
} from "./kurumsal-constants-i18n";

export const useKHero = () => getKHero(useLocale());
export const useKProblems = () => getKProblems(useLocale());
export const useKServices = () => getKServices(useLocale());
export const useKGrowtPhases = () => getKGrowtPhases(useLocale());
export const useKProcess = () => getKProcess(useLocale());
export const useKStats = () => getKStats(useLocale());
export const useKFaq = () => getKFaq(useLocale());
export const useKSectors = () => getKSectors(useLocale());
