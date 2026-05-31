"use client";
import { useLocale } from "next-intl";
import { getStats, getNavLinks, getGrowtPhases, getProduct, getSectors } from "./constants-i18n";

export function useStats() { return getStats(useLocale()); }
export function useNavLinks() { return getNavLinks(useLocale()); }
export function useGrowtPhases() { return getGrowtPhases(useLocale()); }
export function useProduct() { return getProduct(useLocale()); }
export function useSectors() { return getSectors(useLocale()); }
