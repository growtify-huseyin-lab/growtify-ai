import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  // TR (default) serves at root — existing /sektor, /hakkimizda URLs unchanged.
  // EN serves under /en. Preserves all current TR SEO.
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
