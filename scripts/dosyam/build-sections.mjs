// content/dosyam/sections/*.yaml + prompts/*.yaml (Course yazar) → src/data/dosyam/{sections,prompts}.json.
// Çalışma anında dosya okumaya gerek kalmaz (Vercel'de dosya izleme sorunu yok).
// Kullanım: node scripts/dosyam/build-sections.mjs          → yazar
//           node scripts/dosyam/build-sections.mjs --check  → güncel değilse hata (CI)
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const FILES = ["R.yaml", "O.yaml", "OV.yaml", "W.yaml", "BUYUME_DONGUM.yaml", "T.yaml", "FREE_BB_G.yaml"];
const dir = path.join("content", "dosyam", "sections");
const out = path.join("src", "data", "dosyam", "sections.json");

const sections = FILES.flatMap((f) => yaml.load(fs.readFileSync(path.join(dir, f), "utf8")).map((s) => ({ ...s, _dosya: f })));
const ids = new Set();
for (const s of sections) {
  if (!s.anahtar || ids.has(s.anahtar)) throw new Error(`bölüm anahtarı eksik ya da tekrar: ${s.anahtar} (${s._dosya})`);
  ids.add(s.anahtar);
  if (!Array.isArray(s.alanlar)) throw new Error(`alanlar yok: ${s.anahtar}`);
}
// Asistan ders yönergeleri: dosya adı = bölüm anahtarı (R2.yaml → R2).
const pdir = path.join("content", "dosyam", "prompts");
const prompts = {};
for (const f of fs.readdirSync(pdir).filter((f) => f.endsWith(".yaml")).sort()) {
  const p = yaml.load(fs.readFileSync(path.join(pdir, f), "utf8"));
  const id = f.replace(/\.yaml$/, "");
  if (p.id !== id) throw new Error(`yönerge kimliği dosya adıyla aynı değil: ${f} (${p.id})`);
  if (!ids.has(id)) throw new Error(`yönergenin bölümü yok: ${id}`);
  prompts[id] = p;
}

const outputs = [
  [out, JSON.stringify(sections, null, 1) + "\n", `${sections.length} bölüm`],
  [path.join("src", "data", "dosyam", "prompts.json"), JSON.stringify(prompts, null, 1) + "\n", `${Object.keys(prompts).length} yönerge`],
];
for (const [file, json, label] of outputs) {
  if (process.argv.includes("--check")) {
    const cur = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
    if (cur !== json) {
      console.error(`${file} güncel değil: node scripts/dosyam/build-sections.mjs`);
      process.exit(1);
    }
    console.log(`${file} güncel (${label})`);
  } else {
    fs.writeFileSync(file, json);
    console.log(`${file} yazıldı (${label})`);
  }
}
