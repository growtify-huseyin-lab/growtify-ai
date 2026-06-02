export const BLOG_CATEGORIES = [
  { slug: "ai-donusum", label: "AI Dönüşüm", labelEn: "AI Transformation" },
  { slug: "sektorel", label: "Sektörel", labelEn: "By Sector" },
  { slug: "growt-method", label: "GROWT Method", labelEn: "GROWT Method" },
  { slug: "basari-hikayeleri", label: "Başarı Hikayeleri", labelEn: "Success Stories" },
] as const;

// EN-native blog categories (EN posts are not translations of TR posts; they have
// their own taxonomy). Currently a single category produced by SEO.
export const BLOG_CATEGORIES_EN = [
  { slug: "industry-guides", label: "Industry Guides", labelEn: "Industry Guides" },
] as const;

// Locale-aware category list (TR tabs for TR, EN tabs for EN).
export function getBlogCategories(locale: string) {
  return locale === "en" ? BLOG_CATEGORIES_EN : BLOG_CATEGORIES;
}

// Locale-aware category label (single source — used by BlogCard, CategoryTabs, related posts).
export function getCategoryLabel(slug: string, locale: string): string {
  const all = [...BLOG_CATEGORIES, ...BLOG_CATEGORIES_EN];
  const c = all.find((x) => x.slug === slug);
  if (!c) return slug;
  return locale === "en" ? c.labelEn : c.label;
}
