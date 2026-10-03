// GHL'in Türkçeleştirdiğimiz uygulamalarının sürüm izlerini toplar (herkese açık adresler, giriş gerekmez).
// Bir uygulamanın izi değiştiyse GHL güncellemiştir: yeni ya da değişen metinler İngilizce kalıyor olabilir →
// o uygulamanın kataloğunu yeniden topla (scripts/crm-i18n/README.md "Bakım"), çevir, yayınla, sonra
// source/ghl-versions.json'u güncelle. Kullanım: node scripts/crm-i18n/watch-ghl.mjs [--write]
import fs from "node:fs";

const dir = new URL("./source/", import.meta.url);
const frames = JSON.parse(fs.readFileSync(new URL("frames.json", dir)));
const snapPath = new URL("ghl-versions.json", dir);

// Kabuk (CRM'in kendisi): app.js'in ETag'i. Gömülü uygulamalar: sayfadaki ana betik adı (içerik özetli).
const targets = { shell: { url: "https://app.gohighlevel.com/app.js", kind: "etag" } };
for (const [id, f] of Object.entries(frames)) if (!id.startsWith("_") && f.origin) targets[id] = { url: f.origin + "/", kind: "html" };

const now = {};
for (const [id, t] of Object.entries(targets)) {
  try {
    const r = await fetch(t.url, { redirect: "follow", signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error("HTTP " + r.status);
    if (t.kind === "etag") now[id] = r.headers.get("etag") || r.headers.get("last-modified") || "?";
    else now[id] = ((await r.text()).match(/\/assets\/index[-.][A-Za-z0-9_-]+\.js/) || ["?"])[0];
  } catch (e) {
    now[id] = "error: " + e.message;
  }
}

const snap = fs.existsSync(snapPath) ? JSON.parse(fs.readFileSync(snapPath)) : {};
const changed = Object.keys(now).filter((id) => !now[id].startsWith("error") && snap[id] && snap[id] !== now[id]);
const added = Object.keys(now).filter((id) => !snap[id]);
const errors = Object.keys(now).filter((id) => now[id].startsWith("error"));
if (process.argv.includes("--write")) fs.writeFileSync(snapPath, JSON.stringify(now, null, 1) + "\n");
console.log(JSON.stringify({ changed, added, errors, before: snap, now }, null, 1));
