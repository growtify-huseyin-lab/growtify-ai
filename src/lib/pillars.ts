import fs from "fs";
import path from "path";
import matter from "gray-matter";

// EN-only pillar pages. Mirrors the blog.ts loader pattern: read every .mdx in
// content/pillars/en, parse frontmatter with gray-matter, cache in memory.
// Pillars are EN-native standalone pages (source_tr: null) served at top-level
// EN routes (en_path), NOT under /en/blog.
const PILLARS_DIR = path.join(process.cwd(), "content/pillars/en");

export type Pillar = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  featured: boolean;
  locale: string;
  type: string;
  en_path: string;
  schema: string[];
  wordCount: number;
  content: string;
};

export type PillarMeta = Omit<Pillar, "content">;

// In-memory cache (single locale: en).
let _cache: { metas: PillarMeta[]; pillars: Map<string, Pillar> } | null = null;

function load(): { metas: PillarMeta[]; pillars: Map<string, Pillar> } {
  if (_cache) return _cache;

  if (!fs.existsSync(PILLARS_DIR)) {
    _cache = { metas: [], pillars: new Map() };
    return _cache;
  }

  const files = fs.readdirSync(PILLARS_DIR).filter((f) => f.endsWith(".mdx"));
  const metas: PillarMeta[] = [];
  const pillars = new Map<string, Pillar>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(PILLARS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(".mdx", "");

    const meta: PillarMeta = {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "ai-transformation",
      author: data.author || "Growtify",
      date: data.date || "",
      readTime: data.readTime || "5 min read",
      seoTitle: data.seoTitle || data.title || "",
      seoDescription: data.seoDescription || data.excerpt || "",
      tags: data.tags || [],
      featured: data.featured || false,
      locale: data.locale || "en",
      type: data.type || "pillar",
      en_path: data.en_path || `/en/${slug}`,
      schema: data.schema || ["Article", "BreadcrumbList"],
      wordCount: data.wordCount || 0,
    };

    metas.push(meta);
    pillars.set(slug, { ...meta, content });
  }

  metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  _cache = { metas, pillars };
  return _cache;
}

export function getAllPillars(): PillarMeta[] {
  return load().metas;
}

export function getPillarBySlug(slug: string): Pillar | null {
  return load().pillars.get(slug) ?? null;
}
