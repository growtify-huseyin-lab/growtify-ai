import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Daily updates ("Gelişmeler") hub. SEPARATE TR + EN content (not translations),
// mirroring the blog loader: TR lives in content/gelismeler/*.mdx, EN-native in
// content/gelismeler/en/*.mdx. readdir on the TR dir ignores the `en` subdir
// (it is a directory, not a .mdx file). Authored by rephrasing CEO-provided raw
// notes into brand voice per locale, then published via deploy (no admin/DB).

export type UpdateMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  locale: string;
};

export type Update = UpdateMeta & { content: string };

const GELISMELER_DIRS: Record<string, string> = {
  tr: path.join(process.cwd(), "content/gelismeler"),
  en: path.join(process.cwd(), "content/gelismeler/en"),
};

// Per-locale in-memory cache.
const _cache: Record<
  string,
  { metas: UpdateMeta[]; map: Map<string, Update> }
> = {};

function loadLocale(locale: string): {
  metas: UpdateMeta[];
  map: Map<string, Update>;
} {
  const loc = locale === "en" ? "en" : "tr";
  if (_cache[loc]) return _cache[loc];

  const dir = GELISMELER_DIRS[loc];
  if (!fs.existsSync(dir)) {
    _cache[loc] = { metas: [], map: new Map() };
    return _cache[loc];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  const metas: UpdateMeta[] = [];
  const map = new Map<string, Update>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(/\.mdx$/, "");

    const meta: UpdateMeta = {
      slug,
      title: data.title || "",
      summary: data.summary || "",
      date: String(data.date || ""),
      tags: Array.isArray(data.tags) ? data.tags : [],
      locale: loc,
    };

    metas.push(meta);
    map.set(slug, { ...meta, content });
  }

  metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  _cache[loc] = { metas, map };
  return _cache[loc];
}

export function getAllUpdates(locale: string = "tr"): UpdateMeta[] {
  return loadLocale(locale).metas;
}

export function getUpdateBySlug(
  slug: string,
  locale: string = "tr",
): Update | null {
  return loadLocale(locale).map.get(slug) ?? null;
}
