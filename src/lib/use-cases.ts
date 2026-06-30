import fs from "fs";
import path from "path";
import matter from "gray-matter";

// pSEO use-case engine (REQ-seo-development-pseo-route-001 / SEO-S1.5-pSEO-001).
// Matrix: sector × problem × locale. TR pages live flat in content/use-case/*.mdx;
// EN-native pages live in content/use-case/en/*.mdx — same split pattern as blog.ts.
//
// noindex gate: Phase-1 launch ships noindex by default (quality-gate). A page becomes
// indexable + sitemap-eligible only when its frontmatter sets `noindex: false` (SEO flips
// per page once quality-cleared). Absent frontmatter `noindex` ⇒ treated as noindex:true.
const USE_CASE_DIRS: Record<string, string> = {
  tr: path.join(process.cwd(), "content/use-case"),
  en: path.join(process.cwd(), "content/use-case/en"),
};

export type UseCaseMeta = {
  slug: string;
  title: string;
  excerpt: string;
  sector: string;
  problem: string;
  growtLevel: string;
  author: string;
  date: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  locale: string;
  noindex: boolean;
};

export type UseCase = UseCaseMeta & { content: string };

const _cache: Record<string, { metas: UseCaseMeta[]; pages: Map<string, UseCase> }> = {};

function loadLocale(locale: string): { metas: UseCaseMeta[]; pages: Map<string, UseCase> } {
  const loc = locale === "en" ? "en" : "tr";
  if (_cache[loc]) return _cache[loc];

  const dir = USE_CASE_DIRS[loc];
  if (!fs.existsSync(dir)) {
    _cache[loc] = { metas: [], pages: new Map() };
    return _cache[loc];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const metas: UseCaseMeta[] = [];
  const pages = new Map<string, UseCase>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(".mdx", "");

    const meta: UseCaseMeta = {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      sector: data.sector || "",
      problem: data.problem || "",
      growtLevel: data.growtLevel || "",
      author: data.author || "Growtify",
      date: data.date || "",
      readTime: data.readTime || (loc === "en" ? "8 min read" : "8 dk okuma"),
      seoTitle: data.seoTitle || data.title || "",
      seoDescription: data.seoDescription || data.excerpt || "",
      locale: data.locale || loc,
      // Quality gate: indexable only when frontmatter explicitly sets noindex:false.
      noindex: data.noindex === false ? false : true,
    };

    metas.push(meta);
    pages.set(slug, { ...meta, content });
  }

  metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  _cache[loc] = { metas, pages };
  return _cache[loc];
}

export function getAllUseCases(locale: string = "tr"): UseCaseMeta[] {
  return loadLocale(locale).metas;
}

export function getUseCaseBySlug(slug: string, locale: string = "tr"): UseCase | null {
  return loadLocale(locale).pages.get(slug) ?? null;
}

// Sitemap-eligible = indexable (quality-gate passed). Phase-1 ⇒ empty until SEO flips flags.
export function getIndexableUseCases(locale: string = "tr"): UseCaseMeta[] {
  return getAllUseCases(locale).filter((u) => !u.noindex);
}
