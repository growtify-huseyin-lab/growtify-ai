// public/crm/crm-tr.json'u kaynak dosyalardan derler.
// Usage (repo kökünden): npm i --no-save @intlify/message-compiler && node scripts/crm-i18n/build.mjs
//
// Kaynaklar (scripts/crm-i18n/source/):
//   crm-tr.flat.json      "örnek::anahtar.yolu" → Türkçe (çevirinin tek kaynağı; düzenlemeler burada yapılır)
//   crm-en.flat.json      aynı anahtarların İngilizcesi (GHL değişikliklerini bulmak için anlık görüntü)
//   instance-keys.json    örnek → İngilizce üst düzey anahtarlar (yükleyici hangi kataloğun hangi uygulamaya ait olduğunu bununla bulur)
//   dom-nav.json          menüde sunucudan gelen etiketler (birebir eşleşme)
//   dom-text.json         GHL kodunda sabit yazılı, katalogda olmayan metinler (birebir eşleşme)
//   dom-rules.json        sayı içeren kalıplar için [düzenli ifade, karşılık] ("1 - 10 of 50" → "1 - 10 / 50")
//   frames.json           iframe ile gömülen GHL uygulamaları → public/crm/frames/<id>.json (ana katalogda yok)
//   dom-pages.json        yalnız bir sayfada geçerli metinler { "/settings/labs": { İngilizce: Türkçe } } (sunucudan gelen
//                         parçalı açıklamalar; "From" gibi kısa parçalar başka ekranları bozmasın diye genel sözlüğe yazılmaz)
import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { baseCompile } = require("@intlify/message-compiler");
const dir = path.dirname(new URL(import.meta.url).pathname);
const src = (f) => JSON.parse(fs.readFileSync(path.join(dir, "source", f), "utf8"));
const VERSION = fs.readFileSync(path.join(dir, "VERSION"), "utf8").trim();
const out = path.join(dir, "..", "..", "public", "crm", "crm-tr.json");

const tr = src("crm-tr.flat.json");
const en = src("crm-en.flat.json");
const instanceKeys = src("instance-keys.json");
const compiles = (m) => {
  let bad = false;
  try { baseCompile(m, { onError: () => { bad = true; } }); } catch { bad = true; }
  return !bad;
};

const instances = {};
let count = 0, same = 0;
const broken = [];
for (const [fullKey, value] of Object.entries(tr)) {
  const sep = fullKey.indexOf("::");
  const id = fullKey.slice(0, sep);
  const keyPath = fullKey.slice(sep + 2).split(".");
  if (value === en[fullKey]) { same++; continue; } // İngilizcesiyle aynı → ezmeye gerek yok
  if (!compiles(value)) { broken.push(fullKey); continue; } // derlenmeyen metin arayüzü bozar → İngilizce kalır
  const inst = (instances[id] = instances[id] || { keys: instanceKeys[id] || [], messages: {} });
  let cur = inst.messages;
  for (let i = 0; i < keyPath.length - 1; i++) cur = cur[keyPath[i]] = cur[keyPath[i]] || {};
  cur[keyPath[keyPath.length - 1]] = value;
  count++;
}

const clean = (o) => Object.fromEntries(Object.entries(o).filter(([k, v]) => typeof v === "string" && v && v !== k && !k.startsWith("_")));
// iframe uygulamaları (frames.json) ana katalogda taşınmaz: her biri kendi küçük kataloğunu alır.
const frames = fs.existsSync(path.join(dir, "source", "frames.json")) ? src("frames.json") : {};
const frameIds = Object.keys(frames).filter((k) => !k.startsWith("_"));
const shellInstances = Object.fromEntries(Object.entries(instances).filter(([id]) => !frameIds.includes(id)));
const catalog = {
  version: VERSION,
  built_at: new Date().toISOString(),
  instances: shellInstances,
  dom: clean(src("dom-nav.json")),
  text: clean(src("dom-text.json")),
  textRules: src("dom-rules.json"), // [desen, karşılık] — sayı içeren kalıplar
  textPages: Object.fromEntries(Object.entries(fs.existsSync(path.join(dir, "source", "dom-pages.json")) ? src("dom-pages.json") : {}).map(([p, d]) => [p, clean(d)])), // yalnız o sayfada geçerli metinler
};
fs.writeFileSync(out, JSON.stringify(catalog));
const framesDir = path.join(path.dirname(out), "frames");
fs.mkdirSync(framesDir, { recursive: true });
const frameReport = {};
for (const id of frameIds) {
  if (!instances[id]) continue;
  const fc = { ...catalog, instances: { [id]: instances[id] } };
  delete fc.textPages; // sayfa sözlükleri CRM sayfalarına ait
  // Yalnız o uygulamada geçerli birebir metinler (ör. sunucudan gelen tür adları): frames.json "<id>".text
  if (frames[id].text) fc.text = { ...fc.text, ...clean(frames[id].text) };
  fs.writeFileSync(path.join(framesDir, id + ".json"), JSON.stringify(fc));
  frameReport[id] = fs.statSync(path.join(framesDir, id + ".json")).size;
}
console.log(JSON.stringify({ version: VERSION, strings: count, skipped_same_as_en: same, skipped_not_compiling: broken.length, broken: broken.slice(0, 10), page_text: Object.keys(catalog.text).length, bytes: fs.statSync(out).size, frames: frameReport }));
