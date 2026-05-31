import { SECTOR_PAGES } from "./sectors";
import { SECTOR_PAGES_EN } from "./sectors.en";
import { SECTOR_CONTENT } from "./sector-content";
import { SECTOR_CONTENT_EN } from "./sector-content.en";

// Locale-aware sector data selectors. TR = source of truth; EN = translated overrides.
export const sectorPagesFor = (locale: string) =>
  locale === "en" ? SECTOR_PAGES_EN : SECTOR_PAGES;

export const sectorContentFor = (locale: string) =>
  locale === "en" ? SECTOR_CONTENT_EN : SECTOR_CONTENT;
