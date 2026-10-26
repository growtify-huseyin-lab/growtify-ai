// Bölüm tanımları ve GHL yansıması testleri. Çalıştırma: npm run test:dosyam
import { test } from "node:test";
import assert from "node:assert/strict";
import { cleanData, fieldKeyFromName, getSection, loadSections, missingRequired, modules, outboxFor } from "../../src/lib/dosyam/sections";

test("tanımlar: 51 bölüm (Free/BB/G dahil, en başta), anahtarlar tekil", () => {
  const all = loadSections();
  assert.equal(all.length, 51);
  assert.equal(new Set(all.map((s) => s.anahtar)).size, all.length);
  assert.ok(getSection("R2") && getSection("BUYUME_DONGUM"));
  // 2026-10-26: FREE_BB_G yüklenmiyordu → Free/BB/G sayfaları 404. Free, Buradan Başla ve G dosyada ve ilk sırada.
  for (const k of ["FREE2", "FREE4B", "BB1", "G1", "G2"]) assert.ok(getSection(k), k);
  assert.equal(all[0].anahtar.startsWith("FREE"), true);
  assert.ok(!modules().some((m) => m.sections.some((s) => s.anahtar === "BUYUME_DONGUM")));
});

test("GHL anahtarı addan türetilir (GHL'in kendi kuralı)", () => {
  assert.equal(fieldKeyFromName("GAI - R2 Kimlik Cekirdegi"), "contact.gai__r2_kimlik_cekirdegi");
  assert.equal(fieldKeyFromName("GAI - Harita OV0"), "contact.gai__harita_ov0");
});

test("doğrulama: bilinmeyen alan atılır, metin kırpılır, liste adedi sınırlanır", () => {
  const r3 = getSection("R3")!;
  const d = cleanData(r3, { kim_icin: "x".repeat(2000), gizli: "atılmalı", itirazlar: ["a", "b", "c", "d", "e", "f", "g"], tek_olcut: "3" });
  assert.equal((d.kim_icin as string).length, 600);
  assert.equal(d.gizli, undefined);
  assert.equal((d.itirazlar as string[]).length, 5);
  assert.equal(d.tek_olcut, 3);
});

test("onay: zorunlu alan eksikse liste döner; sonradan doldurulan tek ölçüt zorunlu sayılmaz", () => {
  const r2 = getSection("R2")!;
  const eksik = missingRequired(r2, cleanData(r2, { neden: "bir an" })).map((f) => f.anahtar);
  assert.ok(eksik.includes("tek_cumle"));
  assert.ok(!eksik.includes("neden"));
  assert.ok(!eksik.includes("tek_olcut"));
});

test("GHL kuyruğu: R2 → 3 alan + etiket; idempotency anahtarı sürüme bağlı", () => {
  const r2 = getSection("R2")!;
  const data = cleanData(r2, { neden: "N", kime_kime_degil: "K", tek_cumle: "Tek cümle", ses: ["a", "b"] });
  const items = outboxFor(r2, 2, data, new Set(["R2"]));
  const fields = items.find((i) => i.kind === "fields")!;
  assert.equal(fields.idempotency_key, "fields:R2:v2");
  assert.deepEqual(Object.keys(fields.payload.fields!).sort(), [
    "contact.gai__r2_kimlik_cekirdegi",
    "contact.gai__r2_tek_cumle",
    "contact.gai__r2_tek_olcut",
  ]);
  assert.equal(fields.payload.fields!["contact.gai__r2_tek_cumle"], "Tek cümle");
  assert.match(fields.payload.fields!["contact.gai__r2_kimlik_cekirdegi"], /Neden: N/);
  assert.ok(items.some((i) => i.kind === "tag" && i.payload.tag === "gai_dosya_r2"));
});

test("Harita tamam etiketi yalnız 9 satırın hepsi onaylıyken", () => {
  const ov9 = getSection("OV9")!;
  const some = outboxFor(ov9, 1, {}, new Set(["OV9", "OV0"]));
  assert.ok(!some.some((i) => i.payload.tag === "gai_harita_tamam"));
  const all = new Set(["OV0", "OV2", "OV3", "OV4", "OV5", "OV6", "OV7", "OV8", "OV9"]);
  assert.ok(outboxFor(ov9, 1, {}, all).some((i) => i.payload.tag === "gai_harita_tamam"));
});

test("1. partide GHL alanı olmayan bölüm kuyruğa bir şey koymaz", () => {
  assert.deepEqual(outboxFor(getSection("W1")!, 1, {}, new Set()), []);
});
