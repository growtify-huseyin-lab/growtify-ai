// Katalog farkı turunun dosyalarını (gai-crm-delta-*.json) bizim kataloğumuzla karşılaştırır.
// Bizde OLMAYAN anahtarları (GHL'in sonradan yüklediği metinler) örnek kimliğiyle çıkarır; önceki çevirilerden
// birebir aynı İngilizce metnin Türkçesi varsa onu kullanır, kalanı çeviriye hazırlar.
// Usage: node delta-process.mjs delta-A.json delta-B.json delta-C.json
import fs from "fs";
const SRC = new URL("../source/", import.meta.url).pathname;
const j = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const en = j(SRC + "crm-en.flat.json");
const tr = j(SRC + "crm-tr.flat.json");
const ik = j(SRC + "instance-keys.json");
const files = process.argv.slice(2);
const overlap = (a, b) => { if (!a.length) return 0; const B = new Set(b); let h = 0; for (const x of a) if (B.has(x)) h++; return h / a.length; };
// İngilizce metin → en sık kullanılan Türkçesi
const byEn = {};
for (const [k, e] of Object.entries(en)) {
  const t = tr[k];
  if (typeof e !== "string" || typeof t !== "string" || t === e) continue;
  (byEn[e] = byEn[e] || {})[t] = (byEn[e][t] || 0) + 1;
}
const best = (e) => { const c = byEn[e]; return c ? Object.entries(c).sort((a, b) => b[1] - a[1])[0][0] : null; };
// kabuk ad alanlarının alt anahtarları (alt uygulama kataloğu kabuğun bir bölümüyse)
const shellNs = {};
for (const k of Object.keys(en)) {
  if (!k.startsWith("shell::")) continue;
  const p = k.slice(7).split(".");
  if (p.length < 2) continue;
  (shellNs[p[0]] = shellNs[p[0]] || new Set()).add(p[1]);
}
const out = { new: {}, reuse: {}, dottedSkip: 0, unknownInstances: {} };
const stats = {};
for (const f of files) {
  const d = j(f);
  const SEP = d.sep || "\u0001";
  for (const [sig, e] of Object.entries(d.instances)) {
    const top = sig === "shell" ? null : sig.split(",");
    let id = null, prefix = "";
    if (sig === "shell") id = "shell";
    else {
      for (const [cand, keys] of Object.entries(ik)) if (cand !== "shell" && overlap(top, keys) >= 0.8) { id = cand; break; }
      if (!id && overlap(top, ik.shell) >= 0.9) id = "shell"; // kabuk kataloğunun kopyasıyla kurulan alt uygulama (ör. bulkActionsList)
      if (!id) for (const [ns, set] of Object.entries(shellNs)) if (overlap(top, [...set]) >= 0.8) { id = "shell"; prefix = ns + "."; break; }
    }
    if (!id) { out.unknownInstances[sig.slice(0, 120)] = { root: e.root, n: Object.keys(e.keys).length }; continue; }
    for (const [path, v] of Object.entries(e.keys)) {
      const parts = path.split(SEP);
      if (parts.some((p) => p.includes("."))) { out.dottedSkip++; continue; } // noktalı anahtar parçası düz yola sığmaz
      const fk = id + "::" + prefix + parts.join(".");
      if (fk in en) continue; // zaten kataloğumuzda
      if (out.new[fk] !== undefined || out.reuse[fk] !== undefined) continue;
      const b = best(v);
      if (b) out.reuse[fk] = b;
      else out.new[fk] = v;
      stats[id] = (stats[id] || 0) + 1;
    }
  }
}
fs.writeFileSync("delta.new.en.json", JSON.stringify(out.new, null, 1));
fs.writeFileSync("delta.reuse.tr.json", JSON.stringify(out.reuse, null, 1));
fs.writeFileSync("delta.unknown.json", JSON.stringify(out.unknownInstances, null, 1));
console.log(JSON.stringify({ new: Object.keys(out.new).length, reuse: Object.keys(out.reuse).length, dottedSkip: out.dottedSkip, byInstance: stats, unknown: Object.keys(out.unknownInstances).length }, null, 1));
