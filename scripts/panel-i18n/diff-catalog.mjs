// GHL'in yeni İngilizce kataloğunu, çevirinin dayandığı anlık görüntüyle karşılaştırır ve
// çevrilmesi gerekenleri (yeni anahtarlar + İngilizcesi değişenler) düz bir JSON'a yazar.
//
// Kullanım: node scripts/panel-i18n/diff-catalog.mjs /tmp/panel-en.new.json /tmp/panel-todo.en.json
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const [newPath, todoPath = "panel-todo.en.json"] = process.argv.slice(2);
const flat = (o, p = "", acc = {}) => {
  for (const [k, v] of Object.entries(o)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === "object") flat(v, key, acc);
    else acc[key] = v;
  }
  return acc;
};
const oldEn = flat(JSON.parse(fs.readFileSync(path.join(here, "panel-en.snapshot.json"), "utf8")));
const newEn = flat(JSON.parse(fs.readFileSync(newPath, "utf8")));
const tr = flat(JSON.parse(fs.readFileSync(path.join(here, "../../public/portal/panel-tr.json"), "utf8")));

const added = Object.keys(newEn).filter((k) => !(k in oldEn));
const changed = Object.keys(newEn).filter((k) => k in oldEn && oldEn[k] !== newEn[k]);
const removed = Object.keys(oldEn).filter((k) => !(k in newEn));
const untranslated = Object.keys(newEn).filter((k) => !(k in tr) && !added.includes(k));

const todo = {};
for (const k of [...added, ...changed, ...untranslated]) todo[k] = newEn[k];
fs.writeFileSync(todoPath, JSON.stringify(todo, null, 1) + "\n");
console.log(`yeni: ${added.length} · İngilizcesi değişen: ${changed.length} · kaldırılan: ${removed.length} · çevirisi eksik: ${untranslated.length}`);
console.log(`çevrilecek ${Object.keys(todo).length} metin → ${todoPath}`);
for (const k of changed.slice(0, 20)) console.log(`  ~ ${k}: "${oldEn[k]}" → "${newEn[k]}"`);
