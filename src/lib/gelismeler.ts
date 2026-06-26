import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Daily updates ("Gelişmeler") hub. Content lives in content/gelismeler/*.mdx
// (TR-first). Authored by rephrasing CEO-provided raw notes into brand voice,
// then published via deploy — no admin/DB needed (publisher = deploy pipeline).
// Mirrors the blog loader pattern (gray-matter frontmatter + MDX body).

export type UpdateMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
};

export type Update = UpdateMeta & { content: string };

const DIR = path.join(process.cwd(), "content/gelismeler");

let _cache: { metas: UpdateMeta[]; map: Map<string, Update> } | null = null;

function load(): { metas: UpdateMeta[]; map: Map<string, Update> } {
  if (_cache) return _cache;

  if (!fs.existsSync(DIR)) {
    _cache = { metas: [], map: new Map() };
    return _cache;
  }

  const files = fs.readdirSync(DIR).filter((f) => f.endsWith(".mdx"));
  const metas: UpdateMeta[] = [];
  const map = new Map<string, Update>();

  for (const file of files) {
    const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(/\.mdx$/, "");

    const meta: UpdateMeta = {
      slug,
      title: data.title || "",
      summary: data.summary || "",
      date: String(data.date || ""),
      tags: Array.isArray(data.tags) ? data.tags : [],
    };

    metas.push(meta);
    map.set(slug, { ...meta, content });
  }

  metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  _cache = { metas, map };
  return _cache;
}

export function getAllUpdates(): UpdateMeta[] {
  return load().metas;
}

export function getUpdateBySlug(slug: string): Update | null {
  return load().map.get(slug) ?? null;
}
