// Yedek testi: kalıcı tablolar yedeğe girer, oturum/giriş kodu girmez; gzip açılınca veri aynıdır.
import { test } from "node:test";
import assert from "node:assert/strict";
import { gunzipSync } from "node:zlib";
import { runBackup } from "../src/backup";
import { StudentScope, createSession, upsertStudent } from "../src/db";
import { makeDb } from "./d1-sqlite";

test("yedek: kalıcı tablolar R2'ye gzip JSON olarak gider, gizli tablolar girmez", async () => {
  const db = makeDb();
  const now = Date.parse("2026-11-02T01:30:00Z");
  const s = await upsertStudent(db, { ghl_contact_id: "c-1", package: "temel", temel_baslangic: "2026-11-01T00:00:00Z" }, now);
  await (await StudentScope.open(db, s.id))!.saveDraft("R2", { neden: "N" }, now);
  await createSession(db, "a".repeat(64), s.id, now);
  const puts: { key: string; body: Uint8Array }[] = [];
  const r = await runBackup(db, { put: async (key, value) => void puts.push({ key, body: value as Uint8Array }) }, now);
  assert.equal(r.key, "yedek/2026-11-02.json.gz");
  assert.equal(puts.length, 1);
  const json = JSON.parse(gunzipSync(puts[0].body).toString("utf8"));
  assert.equal(json.tablolar.students.length, 1);
  assert.equal(JSON.parse(json.tablolar.submissions[0].data_json).neden, "N");
  assert.equal(json.tablolar.sessions, undefined);
  assert.equal(json.tablolar.auth_codes, undefined);
});
