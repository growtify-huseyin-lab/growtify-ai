"use client";
import { useLocale } from "next-intl";
import {
  getKScreens, getKTotalScreens, getKPaywallCopy, getKPersonaSummaries,
} from "./content-kurumsal-runtime-i18n";

export function useKScreens() { return getKScreens(useLocale()); }
export function useKTotalScreens() { return getKTotalScreens(); }
export function useKPaywallCopy() { return getKPaywallCopy(useLocale()); }
export function useKPersonaSummaries() { return getKPersonaSummaries(useLocale()); }
