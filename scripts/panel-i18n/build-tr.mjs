// Türkçe kataloğu (public/portal/panel-tr.json) kurar/günceller.
//
// Kullanım (repo kökünden):
//   node scripts/panel-i18n/build-tr.mjs [--en /tmp/panel-en.new.json] [çeviri.tr.json ...]
//
// - Mevcut panel-tr.json ile verilen düz ("a.b.c": "Türkçe") çeviri dosyaları birleşir (yeniler öncelikli).
// - Yapı İngilizce kataloğa göre kurulur; GHL'in kaldırdığı anahtarlar düşer.
// - --en verilirse o katalog yeni anlık görüntü (panel-en.snapshot.json) olarak kaydedilir.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const snapPath = path.join(here, "panel-en.snapshot.json");
const trPath = path.join(here, "../../public/portal/panel-tr.json");

const args = process.argv.slice(2);
let enPath = snapPath;
const inputs = [];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--en") enPath = args[++i];
  else inputs.push(args[i]);
}
const flat = (o, p = "", acc = {}) => {
  for (const [k, v] of Object.entries(o)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === "object") flat(v, key, acc);
    else acc[key] = v;
  }
  return acc;
};

const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
const trFlat = fs.existsSync(trPath) ? flat(JSON.parse(fs.readFileSync(trPath, "utf8"))) : {};
for (const f of inputs) Object.assign(trFlat, JSON.parse(fs.readFileSync(f, "utf8")));

let total = 0;
const missing = [];
function build(node, p) {
  const out = {};
  for (const [k, v] of Object.entries(node)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === "object") {
      const sub = build(v, key);
      if (Object.keys(sub).length) out[k] = sub;
    } else {
      total++;
      if (typeof trFlat[key] === "string" && trFlat[key] !== "") out[k] = trFlat[key];
      else missing.push(key);
    }
  }
  return out;
}
const tr = build(en, "");
fs.writeFileSync(trPath, JSON.stringify(tr) + "\n");
if (enPath !== snapPath) fs.writeFileSync(snapPath, JSON.stringify(en, null, 1) + "\n");
console.log(`${total - missing.length}/${total} metin Türkçe → public/portal/panel-tr.json (${fs.statSync(trPath).size} bayt)`);
if (missing.length) console.log(`çevirisi eksik ${missing.length} anahtar (İngilizce görünür): ${missing.slice(0, 15).join(", ")}`);
