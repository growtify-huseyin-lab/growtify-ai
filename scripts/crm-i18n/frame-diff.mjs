// Gömülü ekran (çerçeve) uygulamalarının İngilizce kataloglarını OTURUMSUZ indirir ve source/crm-en.flat.json ile
// karşılaştırır → çevrilecek (yeni + İngilizcesi değişen) metinler. Uygulamalar kataloğu giriş yapılmadan da yüklüyor.
// Yapay Zeka Stüdyosu (vibe) başsız tarayıcıda bağlanmıyor → kataloğu doğrudan JS dosyasından çıkarılır (acorn).
// Kullanım (repo kökünden): npm i --no-save puppeteer-core acorn acorn-walk
//   node scripts/crm-i18n/frame-diff.mjs out.en.json [calapp wf …]   (boşsa frames.json'daki hepsi)
// ebuild, email ile aynı kataloğu paylaşır: aynı anahtarın çevirisi kopyalanabilir.
import fs from "fs"; import os from "os"; import path from "path";
const here = path.dirname(new URL(import.meta.url).pathname);
const frames = JSON.parse(fs.readFileSync(path.join(here, "source/frames.json")));
const en = JSON.parse(fs.readFileSync(path.join(here, "source/crm-en.flat.json")));
const out = process.argv[2] || "frames-todo.en.json";
let ids = process.argv.slice(3);
if (!ids.length) ids = Object.keys(frames).filter((k) => !k.startsWith("_") && frames[k].origin);
const NOISE = /^(https?:\/\/\S+|[\w.-]+@[\w.-]+|[#\d\s.,:%/+\-()]+|[A-Z0-9_]+|[a-z0-9_.-]+)$/;
const ua = { "User-Agent": "Mozilla/5.0 Chrome/141" };
async function vibeCatalog(origin) {
  const acorn = await import("acorn"); const walk = await import("acorn-walk");
  const html = await (await fetch(origin + "/", { headers: ua })).text();
  const seen = new Set(); let q = [...html.matchAll(/(?:src|href)="([^"]+\.js)"/g)].map((m) => new URL(m[1], origin + "/").href);
  while (q.length) {
    const u = q.shift(); if (seen.has(u)) continue; seen.add(u);
    let t; try { t = await (await fetch(u, { headers: ua })).text(); } catch { continue; }
    for (const m of t.matchAll(/["'`](\.{0,2}\/?(?:assets\/)?[\w.-]+\.js)["'`]/g)) q.push(new URL(m[1], u).href);
    if (!/\bnav\s*:/.test(t) || !/\bchat\s*:/.test(t)) continue;
    let ast; try { ast = acorn.parse(t, { ecmaVersion: "latest", sourceType: "module" }); } catch { continue; }
    const kn = (p) => p.key && (p.key.name ?? p.key.value); const decl = {}; let best = null;
    walk.full(ast, (n) => {
      if (n.type === "VariableDeclarator" && n.id.type === "Identifier" && n.init && n.init.type === "ObjectExpression") decl[n.id.name] = n.init;
      if (n.type === "ObjectExpression") { const ns = n.properties.map(kn); if (ns.includes("nav") && ns.includes("chat") && (!best || n.properties.length > best.properties.length)) best = n; }
    });
    if (!best) continue;
    const lit = (v) => v.type === "Literal" && typeof v.value === "string" ? v.value : v.type === "TemplateLiteral" && !v.expressions.length ? v.quasis.map((x) => x.value.cooked).join("") : null;
    const flat = {};
    (function rec(o, p) { for (const pr of o.properties) { if (pr.type !== "Property") continue; const k = p ? p + "." + kn(pr) : kn(pr); const s = lit(pr.value);
      if (s !== null) flat[k] = s; else if (pr.value.type === "ObjectExpression") rec(pr.value, k); else if (pr.value.type === "Identifier" && decl[pr.value.name]) rec(decl[pr.value.name], k); } })(best, "");
    return flat;
  }
  return null;
}
async function vueCatalogs(list) {
  const puppeteer = (await import("puppeteer-core")).default;
  let src = fs.readFileSync(path.join(here, "tour/frame-extract.js"), "utf8");
  src = src.replace(/var raw = JSON\.stringify[\s\S]*?a\.remove\(\);\s*return \{[\s\S]*?\};\s*\}\)\s*$/, "return res; })");
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), "frm-"));
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true, userDataDir: prof, args: ["--no-first-run", "--lang=en-US", ...(process.env.CI ? ["--no-sandbox"] : [])] });
  const res = {};
  for (const id of list) {
    const page = await browser.newPage();
    try { await page.goto(frames[id].origin + "/", { waitUntil: "networkidle2", timeout: 60000 }); await new Promise((r) => setTimeout(r, 6000));
      const r = await page.evaluate("(" + src + ")('x')"); res[id] = r && r.flat; } catch (e) { console.error(id, "HATA", String(e).slice(0, 80)); }
    await page.close();
  }
  await browser.close(); fs.rmSync(prof, { recursive: true, force: true });
  return res;
}
const cats = await vueCatalogs(ids.filter((i) => i !== "vibe"));
if (ids.includes("vibe")) cats.vibe = await vibeCatalog(frames.vibe.origin);
const todo = {};
for (const [id, flat] of Object.entries(cats)) {
  if (!flat) { console.log(id, "katalog alınamadı"); continue; }
  let nw = 0, ch = 0;
  for (const [k, v] of Object.entries(flat)) {
    if (typeof v !== "string" || !v.trim() || NOISE.test(v.trim()) || !/[A-Za-z]{2}/.test(v)) continue;
    const fk = id + "::" + k;
    if (!(fk in en)) { todo[fk] = v; nw++; } else if (en[fk] !== v) { todo[fk] = v; ch++; }
  }
  console.log(id, Object.keys(flat).length, "metin · yeni", nw, "· değişen", ch);
}
fs.writeFileSync(out, JSON.stringify(todo, null, 1) + "\n");
console.log("çevrilecek", Object.keys(todo).length, "→", out);
