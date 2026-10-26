// Üyelikler > Kurslar (memb) İngilizce kataloğunu GHL'in uygulama dosyasından çıkarır (giriş gerekmez).
// Uygulama Vue 2 + vue-i18n 8; diller app.<hash>.js içinde JSON.parse('…') olarak duruyor (13 dil).
// Kullanım: node scripts/crm-i18n/memb-catalog.mjs out.en.json   → { "memb::anahtar.yolu": "İngilizce" }
// Sonra crm-en.flat.json ile farkı al, yeni/değişen metinleri çevir (TRANSLATION-GUIDE + validate.mjs).
import fs from "node:fs";
import * as acorn from "acorn";

const page = await (await fetch("https://backend.memberships.apisystem.tech/v2/location/x/memberships/courses/products")).text();
const appUrl = page.match(/src="(https:\/\/storage\.googleapis\.com\/live-membership-builder\/app\.[0-9a-f]+\.js)"[^>]*type="module"/)?.[1];
if (!appUrl) throw new Error("uygulama dosyası bulunamadı");
const src = await (await fetch(appUrl)).text();
const ast = acorn.parse(src, { ecmaVersion: "latest", sourceType: "module" });
const locales = [];
(function walk(n) {
  if (!n || typeof n.type !== "string") return;
  if (n.type === "CallExpression" && n.callee.type === "MemberExpression" && n.callee.object.name === "JSON" && n.callee.property.name === "parse" && n.arguments[0]?.type === "Literal") {
    try {
      locales.push(JSON.parse(n.arguments[0].value));
    } catch {}
  }
  for (const k in n) {
    const c = n[k];
    if (Array.isArray(c)) c.forEach(walk);
    else if (c && typeof c.type === "string") walk(c);
  }
})(ast);
const en = locales.find((o) => o?.products?.heading === "Your Products");
if (!en) throw new Error("İngilizce katalog bulunamadı (products.heading değişmiş olabilir)");
const out = {};
(function flat(o, p) {
  for (const [k, v] of Object.entries(o)) {
    const q = p ? `${p}.${k}` : k;
    if (v && typeof v === "object") flat(v, q);
    else out[`memb::${q}`] = v;
  }
})(en, "");
fs.writeFileSync(process.argv[2] || "memb.en.json", JSON.stringify(out, null, 1));
console.log(`${appUrl.split("/").pop()}: ${Object.keys(out).length} metin`);
