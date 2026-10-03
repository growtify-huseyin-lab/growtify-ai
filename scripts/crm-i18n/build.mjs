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

// Kalıplar (değişken içeren metinler) → [desen, karşılık ($1…), dizin kelimesi, nesne adı grupları]. Kaynak:
// dom-templates.json ({İngilizce kalıp: Türkçe kalıp}, kataloğuna ulaşamadığımız modüller) + Türkçe kataloğumuzdaki nesne
// adı alan kalıplar (Türkçe → Türkçe: GHL nesne adını İngilizce yerleştiriyor, "İlişkili Company yok" → "İlişkili Şirket yok").
// Nesne adı yerine yalnız bilinen nesne adları, sayı yerine yalnız sayı eşleşir; dizin kelimesi en az 4 harf olmalı.
function buildTemplates(onlyPrefix) {
  const OBJ_PH = /^(object|objectName|objectLabel|objectPlural|objectSingular|objectNamePlural|objectNameSingular|objName|entity|entityName|entityLabel|recordLabel|recordType|module|moduleName)$/;
  const NUM_PH = /^(count|max|min|total|length|itemCount|number|num|n|limit|size|current|selected|pagination)$/i;
  const OBJ_ALT = "Contacts|Contact|Companies|Company|Opportunities|Opportunity|Tasks|Task|contacts|contact|companies|company|opportunities|opportunity|tasks|task|Kişiler|Kişi|Şirketler|Şirket|Fırsatlar|Fırsat|Görevler|Görev|kişiler|kişi|şirketler|şirket|fırsatlar|fırsat|görevler|görev";
  const PH = /\{\s*([A-Za-z0-9_]+)\s*\}/g;
  const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const out = [];
  const seen = new Set();
  const add = (from, to, objOnly) => {
    if (typeof from !== "string" || typeof to !== "string" || from.length > 220) return;
    if (/\{'|@:| \| |\$/.test(from) || /\{'|@:| \| |\$/.test(to)) return;
    const names = [];
    let re = "^";
    let last = 0;
    let m;
    PH.lastIndex = 0;
    while ((m = PH.exec(from))) {
      re += esc(from.slice(last, m.index));
      names.push(m[1]);
      re += OBJ_PH.test(m[1]) ? "(" + OBJ_ALT + ")" : NUM_PH.test(m[1]) ? "([\\d.,]+)" : "(.+?)";
      last = m.index + m[0].length;
    }
    if (!names.length) return;
    if (objOnly && !names.some((n) => OBJ_PH.test(n))) return;
    re += esc(from.slice(last)) + "$";
    let ok = true;
    const rep = to.replace(PH, (x, n) => {
      const i = names.indexOf(n);
      if (i === -1) ok = false;
      return "$" + (i + 1);
    });
    if (!ok) return;
    // Dizin kelimesi: en uzun sabit kelime (≥4 harf; yoksa ≥3: "No {objectLabel} Yet", "Add {object}")
    const words = (from.replace(PH, " ").match(/[A-Za-zÇĞİÖŞÜçğıöşü]{3,}/g) || []).sort((a, b) => b.length - a.length);
    if (!words.length) return;
    const key = re + "\u0000" + rep;
    if (seen.has(key)) return;
    seen.add(key);
    out.push([re, rep, words[0].toLowerCase(), names.map((n, i) => (OBJ_PH.test(n) ? i + 1 : 0)).filter(Boolean)]);
  };
  // Çerçeve kataloğunda (onlyPrefix "wf::" gibi) yalnız o uygulamanın kendi Türkçe kalıpları; sağ panel kalıpları CRM'e ait.
  if (!onlyPrefix) {
    for (const f of ["dom-templates.manual.json", "dom-templates.json"]) {
      const tpl = fs.existsSync(path.join(dir, "source", f)) ? src(f) : {};
      for (const [from, to] of Object.entries(tpl)) if (!from.startsWith("_")) add(from, to, false);
    }
  }
  for (const [k, t] of Object.entries(tr)) if (!onlyPrefix || k.startsWith(onlyPrefix)) add(t, t, true);
  return out;
}
const catalog = {
  version: VERSION,
  built_at: new Date().toISOString(),
  instances: shellInstances,
  dom: clean(src("dom-nav.json")),
  // Sayfa sözlüğü: GHL kodunda sabit metinler + kataloğuna ulaşamadığımız modüllerin (kişi sayfasının sağ paneli,
  // contacts-highrise) birebir metinleri. dom-text.json önceliklidir.
  text: { ...clean(fs.existsSync(path.join(dir, "source", "dom-highrise.json")) ? src("dom-highrise.json") : {}), ...clean(src("dom-text.json")) },
  textTpl: buildTemplates(),
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
  if (frames[id].noDom) delete fc.textTpl; // oluşturucularda kalıp yok (tuval kişinin içeriği)
  else {
    // Çerçeveye CRM'in sağ panel sözlüğü/kalıpları gitmez (boyut): genel sayfa sözlüğü + uygulamanın kendi kalıpları.
    fc.text = clean(src("dom-text.json"));
    fc.textTpl = buildTemplates(id + "::");
    if (!fc.textTpl.length) delete fc.textTpl;
  }
  // Yalnız o uygulamada geçerli birebir metinler (ör. sunucudan gelen tür adları): frames.json "<id>".text
  if (frames[id].text) fc.text = { ...fc.text, ...clean(frames[id].text) };
  // İç içe çerçeve: bu uygulamanın kendi gömdüğü GHL uygulamaları da vekilden açılır ({GHL adresi: vekil adresi};
  // yükleyici nestedProxyMap). Kapatmak için frames.json'dan "nested" silinir (ya da crm-config.json "frames" ile hepsi).
  if (frames[id].nested) fc.nested = frames[id].nested;
  // Oluşturucularda sayfa sözlüğü kapalı (tuvaldeki önizleme kişinin içeriği): yalnız katalog. domOnly verilmişse sözlük
  // yalnız o arayüz alanlarında (ör. öğe paleti) uygulanır; uygulamanın kataloğundan kısa, tek anlamlı İngilizce → Türkçe eklenir
  // (uygulama bazı adları açılışta bir kez hesaplıyor, Türkçe katalog sonradan gelince güncellenmiyor).
  if (frames[id].noDom) {
    fc.noDom = true;
    fc.textRules = [];
    delete fc.dom;
    if (frames[id].domOnly) {
      const seen = {};
      for (const [k, v] of Object.entries(en)) {
        if (!k.startsWith(id + "::") || typeof v !== "string" || v.length > 80 || /[{}<@|]/.test(v)) continue;
        const t = tr[k];
        if (typeof t !== "string" || !t || t === v || /[{}<@|]/.test(t)) continue;
        (seen[v] = seen[v] || new Set()).add(t);
      }
      const fromCatalog = Object.fromEntries(Object.entries(seen).filter(([, s]) => s.size === 1).map(([v, s]) => [v, [...s][0]]));
      // domText: "catalog" → genel sayfa sözlüğü eklenmez, yalnız uygulamanın kendi kataloğundan gelen eşlemeler.
      const base = frames[id].domText === "catalog" ? {} : { ...clean(src("dom-text.json")), ...clean(frames[id].text || {}) };
      fc.text = { ...base, ...fromCatalog, ...clean(frames[id].text || {}) };
      fc.domOnly = frames[id].domOnly;
    } else fc.text = {};
  }
  fs.writeFileSync(path.join(framesDir, id + ".json"), JSON.stringify(fc));
  frameReport[id] = fs.statSync(path.join(framesDir, id + ".json")).size;
}
console.log(JSON.stringify({ version: VERSION, strings: count, skipped_same_as_en: same, skipped_not_compiling: broken.length, broken: broken.slice(0, 10), page_text: Object.keys(catalog.text).length, bytes: fs.statSync(out).size, frames: frameReport }));
