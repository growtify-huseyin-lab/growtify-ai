// Locale-aware accessors over constants.ts (TR, untouched) + constants.en.ts.
import * as TR from "./constants";
import {
  GROWT_PHASES_EN, PRODUCT_EN, SECTORS_EN, STATS_EN, NAV_LINKS_EN, SITE_EN,
} from "./constants.en";

const en = (l: string) => l === "en";

export function getGrowtPhases(l: string): typeof TR.GROWT_PHASES {
  return (en(l) ? (GROWT_PHASES_EN as unknown as typeof TR.GROWT_PHASES) : TR.GROWT_PHASES);
}
export function getProduct(l: string): typeof TR.PRODUCT {
  return (en(l) ? (PRODUCT_EN as unknown as typeof TR.PRODUCT) : TR.PRODUCT);
}
export function getSectors(l: string): typeof TR.SECTORS {
  return (en(l) ? (SECTORS_EN as unknown as typeof TR.SECTORS) : TR.SECTORS);
}
export function getStats(l: string): typeof TR.STATS {
  return (en(l) ? (STATS_EN as unknown as typeof TR.STATS) : TR.STATS);
}
export function getNavLinks(l: string): typeof TR.NAV_LINKS {
  return (en(l) ? (NAV_LINKS_EN as unknown as typeof TR.NAV_LINKS) : TR.NAV_LINKS);
}
export function getSite(l: string): typeof TR.SITE {
  return (en(l) ? (SITE_EN as unknown as typeof TR.SITE) : TR.SITE);
}
