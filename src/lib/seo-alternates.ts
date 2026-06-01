// Locale-aware canonical + hreflang alternates for bilingual (TR root / EN /en) pages.
// TR is the default locale served at root; EN is served under /en (localePrefix "as-needed").
// Page-level metadata.alternates REPLACES the layout's alternates (shallow merge), so every
// page that sets a canonical MUST also declare languages here to preserve hreflang.
//
// Usage in a page's generateMetadata:
//   alternates: localeAlternates(locale, `/sektor/${slug}`)
export function localeAlternates(locale: string, path: string) {
  const en = locale === "en";
  return {
    canonical: en ? `/en${path}` : path,
    languages: {
      tr: path,
      en: `/en${path}`,
      "x-default": path,
    },
  };
}

// Variant for pages whose EN path DIFFERS from the TR path (English-slug taxonomy):
// e.g. TR /sektor/saglik ↔ EN /en/sectors/healthcare, /hakkimizda ↔ /en/about.
// trPath is the root TR path; enPath is the EN path WITHOUT the /en prefix.
export function localeAltPair(locale: string, trPath: string, enPath: string) {
  const en = locale === "en";
  return {
    canonical: en ? `/en${enPath}` : trPath,
    languages: {
      tr: trPath,
      en: `/en${enPath}`,
      "x-default": trPath,
    },
  };
}
