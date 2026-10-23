// content/dosyam/sections/*.yaml (Course yazar) → src/data/dosyam/sections.json (uygulama okur).
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
const json = JSON.stringify(sections, null, 1) + "\n";

if (process.argv.includes("--check")) {
  const cur = fs.existsSync(out) ? fs.readFileSync(out, "utf8") : "";
  if (cur !== json) {
    console.error(`${out} güncel değil: node scripts/dosyam/build-sections.mjs`);
    process.exit(1);
  }
  console.log(`${out} güncel (${sections.length} bölüm)`);
} else {
  fs.writeFileSync(out, json);
  console.log(`${out} yazıldı (${sections.length} bölüm)`);
}
