// gai-dosyam-api testleri (ADR K13): kiracı izolasyonu, imzasız/tekrar istek, idempotency, sürüm, mod.
// Çalıştırma: node --no-warnings --import tsx --test workers/dosyam-api/test/*.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { handle, type Env } from "../src/index";
import { HEADER, newNonce, sha256Hex, signRequest } from "../src/sig";
import { makeDb } from "./d1-sqlite";

const KEY = "k".repeat(48);
const T0 = Date.parse("2026-11-02T09:00:00Z");

function env(): Env {
  return { DB: makeDb(), DOSYAM_HMAC_KEY: KEY };
}

async function call(
  e: Env,
  method: string,
  path: string,
  opts: { body?: unknown; student?: string; now?: number; key?: string; nonce?: string; idem?: string; tsShift?: number } = {},
) {
  const now = opts.now ?? T0;
  const raw = opts.body === undefined ? "" : JSON.stringify(opts.body);
  const ts = Math.floor(now / 1000) + (opts.tsShift ?? 0);
  const nonce = opts.nonce ?? newNonce();
  const student = opts.student ?? "";
  const sig = await signRequest(opts.key ?? KEY, { method, path, ts, nonce, student, bodyHash: await sha256Hex(raw) });
  const headers: Record<string, string> = {
    [HEADER.ts]: String(ts),
    [HEADER.nonce]: nonce,
    [HEADER.student]: student,
    [HEADER.sig]: sig,
    "content-type": "application/json",
  };
  if (opts.idem) headers[HEADER.idem] = opts.idem;
  const res = await handle(new Request(`https://x.test${path}`, { method, headers, body: method === "GET" ? undefined : raw }), e, now);
  return { status: res.status, body: (await res.json()) as Record<string, any> };
}

async function student(e: Env, contact: string, pkg = "temel", start = "2026-11-01T00:00:00Z") {
  const r = await call(e, "POST", "/v1/students/upsert", { body: { ghl_contact_id: contact, package: pkg, temel_baslangic: start } });
  assert.equal(r.status, 200);
  return r.body.student.id as string;
}

test("imzasız, yanlış anahtarlı, eski ve tekrar oynatılan istekler reddedilir", async () => {
  const e = env();
  const plain = await handle(new Request("https://x.test/v1/me", { method: "GET" }), e, T0);
  assert.equal(plain.status, 401);
  assert.equal((await call(e, "GET", "/v1/outbox/stats", { key: "z".repeat(48) })).status, 401);
  assert.equal((await call(e, "GET", "/v1/outbox/stats", { tsShift: -301 })).status, 401);
  const nonce = newNonce();
  assert.equal((await call(e, "GET", "/v1/outbox/stats", { nonce })).status, 200);
  const replay = await call(e, "GET", "/v1/outbox/stats", { nonce });
  assert.equal(replay.status, 401);
  assert.equal(replay.body.error, "imza_tekrar");
});

test("imza öğrenci kimliğini kapsar: başlık değiştirilirse geçmez", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const b = await student(e, "c-b");
  const nonce = newNonce();
  const ts = Math.floor(T0 / 1000);
  const sig = await signRequest(KEY, { method: "GET", path: "/v1/me", ts, nonce, student: a, bodyHash: await sha256Hex("") });
  const res = await handle(
    new Request("https://x.test/v1/me", { headers: { [HEADER.ts]: String(ts), [HEADER.nonce]: nonce, [HEADER.student]: b, [HEADER.sig]: sig } }),
    e,
    T0,
  );
  assert.equal(res.status, 401);
});

test("kiracı izolasyonu: bir öğrenci diğerinin bölümünü göremez", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const b = await student(e, "c-b");
  await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: { kime: "A'nın gizli metni" } } });
  const bList = await call(e, "GET", "/v1/me/sections", { student: b });
  assert.deepEqual(bList.body.sections, []);
  const bGet = await call(e, "GET", "/v1/me/sections/R2", { student: b });
  assert.equal(bGet.body.latest, null);
  const aGet = await call(e, "GET", "/v1/me/sections/R2", { student: a });
  assert.equal(aGet.body.latest.data.kime, "A'nın gizli metni");
  assert.equal((await call(e, "GET", "/v1/me", { student: "olmayan" })).status, 404);
});

test("taslak → onay → yeni sürüm; onay GHL kuyruğunu aynı işlemde doldurur", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const d1 = await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: { v: 1 } } });
  assert.equal(d1.body.submission.version, 1);
  const d1b = await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: { v: 2 } } });
  assert.equal(d1b.body.submission.version, 1); // taslak üstüne yazılır
  const outbox = [{ kind: "fields", payload: { "GAI - R2 Tek Cumle": "x" }, idempotency_key: "R2:1" }];
  const ap = await call(e, "POST", "/v1/me/sections/R2/approve", { student: a, body: { version: 1, outbox } });
  assert.equal(ap.body.submission.status, "onayli");
  const again = await call(e, "POST", "/v1/me/sections/R2/approve", { student: a, body: { version: 1, outbox } });
  assert.equal(again.status, 409);
  const d2 = await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: { v: 3 } } });
  assert.equal(d2.body.submission.version, 2);
  const g = await call(e, "GET", "/v1/me/sections/R2", { student: a });
  assert.equal(g.body.approved.version, 1);
  assert.equal(g.body.latest.version, 2);
  const stats = await call(e, "GET", "/v1/outbox/stats");
  assert.equal(stats.body.stats.bekliyor, 1);
});

test("sürüm çakışması: eski sürümle yazma reddedilir", async () => {
  const e = env();
  const a = await student(e, "c-a");
  await call(e, "PUT", "/v1/me/sections/R3", { student: a, body: { data: {} } });
  const r = await call(e, "PUT", "/v1/me/sections/R3", { student: a, body: { data: {}, expected_version: 0 } });
  assert.equal(r.status, 409);
  assert.equal(r.body.error, "surum_cakismasi");
});

test("idempotency: aynı anahtarla gelen ikinci yazma ilk cevabı alır, iş tekrar edilmez", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const first = await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: { v: 1 } }, idem: "i-1" });
  await call(e, "POST", "/v1/me/sections/R2/approve", { student: a, body: { version: 1 }, idem: "i-2" });
  const repeat = await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: { v: 9 } }, idem: "i-1" });
  assert.deepEqual(repeat.body, first.body);
  const g = await call(e, "GET", "/v1/me/sections/R2", { student: a });
  assert.equal(g.body.latest.status, "onayli"); // tekrar eden istek yeni taslak açmadı
});

test("kuyruk: aynı idempotency anahtarı ikinci kez kuyruğa girmez; hata geri çekilir, 8. denemede ölü", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const ob = [{ kind: "tag", payload: { tag: "gai_dosya_r2" }, idempotency_key: "tag:R2" }];
  await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: {} } });
  await call(e, "POST", "/v1/me/sections/R2/approve", { student: a, body: { version: 1, outbox: ob } });
  await call(e, "PUT", "/v1/me/sections/R2", { student: a, body: { data: {} } });
  await call(e, "POST", "/v1/me/sections/R2/approve", { student: a, body: { version: 2, outbox: ob } });
  const claim = await call(e, "POST", "/v1/outbox/claim", { body: { limit: 10 } });
  assert.equal(claim.body.jobs.length, 1);
  assert.equal(claim.body.jobs[0].ghl_contact_id, "c-a");
  const id = claim.body.jobs[0].id;
  assert.equal((await call(e, "POST", "/v1/outbox/claim", { body: {} })).body.jobs.length, 0); // işleniyor
  let status = "";
  for (let i = 0; i < 8; i++) status = (await call(e, "POST", `/v1/outbox/${id}/fail`, { body: { error: "429" } })).body.status;
  assert.equal(status, "olu");
});

test("erişim modu: Temel 28 gün sonra salt okunur; Tam 112 gün aktif", async () => {
  const e = env();
  const t = await student(e, "c-t", "temel", "2026-10-01T00:00:00Z");
  const me = await call(e, "GET", "/v1/me", { student: t });
  assert.equal(me.body.student.mode, "salt_okunur");
  const w = await call(e, "PUT", "/v1/me/sections/R2", { student: t, body: { data: {} } });
  assert.equal(w.status, 409);
  assert.equal(w.body.error, "salt_okunur");
  const full = await student(e, "c-f", "tam", "2026-10-01T00:00:00Z");
  assert.equal((await call(e, "GET", "/v1/me", { student: full })).body.student.mode, "aktif");
  const later = Date.parse("2027-01-22T00:00:00Z"); // 1 Ekim + 113 gün
  assert.equal((await call(e, "GET", "/v1/me", { student: full, now: later })).body.student.mode, "salt_okunur");
});

test("giriş kodu: yanlış kod sayılır, 5. denemede kilitlenir; doğru kod bir kez geçer", async () => {
  const e = env();
  const eh = await sha256Hex("ali@ornek.com");
  const good = await sha256Hex("123456");
  const bad = await sha256Hex("000000");
  await call(e, "POST", "/v1/auth/code", { body: { email_hash: eh, code_hash: good, contact_id: "c-1" } });
  assert.equal((await call(e, "POST", "/v1/auth/verify", { body: { email_hash: eh, code_hash: bad } })).body.reason, "hatali");
  const ok = await call(e, "POST", "/v1/auth/verify", { body: { email_hash: eh, code_hash: good } });
  assert.equal(ok.body.contact_id, "c-1");
  assert.equal((await call(e, "POST", "/v1/auth/verify", { body: { email_hash: eh, code_hash: good } })).body.reason, "yok");
  await call(e, "POST", "/v1/auth/code", { body: { email_hash: eh, code_hash: good, contact_id: "c-1" } });
  for (let i = 0; i < 4; i++) await call(e, "POST", "/v1/auth/verify", { body: { email_hash: eh, code_hash: bad } });
  const locked = await call(e, "POST", "/v1/auth/verify", { body: { email_hash: eh, code_hash: bad } });
  assert.equal(locked.body.reason, "deneme_bitti");
  assert.equal((await call(e, "POST", "/v1/auth/verify", { body: { email_hash: eh, code_hash: good } })).body.reason, "deneme_bitti");
});

test("oturum: oluştur, çöz, sil; süresi dolan oturum çözülmez", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const idh = await sha256Hex("cerez-degeri");
  await call(e, "POST", "/v1/sessions", { body: { id_hash: idh, student_id: a } });
  assert.equal((await call(e, "POST", "/v1/sessions/resolve", { body: { id_hash: idh } })).body.student.id, a);
  const late = T0 + 31 * 86_400_000;
  assert.equal((await call(e, "POST", "/v1/sessions/resolve", { body: { id_hash: idh }, now: late })).body.ok, false);
  await call(e, "POST", "/v1/sessions/delete", { body: { id_hash: idh } });
  assert.equal((await call(e, "POST", "/v1/sessions/resolve", { body: { id_hash: idh } })).body.ok, false);
});

test("oran sınırı: pencere içinde sınır aşılınca durur, yeni pencerede sıfırlanır", async () => {
  const e = env();
  for (let i = 0; i < 3; i++) assert.equal((await call(e, "POST", "/v1/rate", { body: { key: "ip:1", limit: 3, window: 600 } })).body.allowed, true);
  assert.equal((await call(e, "POST", "/v1/rate", { body: { key: "ip:1", limit: 3, window: 600 } })).body.allowed, false);
  const next = T0 + 601_000;
  assert.equal((await call(e, "POST", "/v1/rate", { body: { key: "ip:1", limit: 3, window: 600 }, now: next })).body.allowed, true);
});

test("Büyüme Döngüm haftası: yaz, güncelle, yalnız sahibi görür", async () => {
  const e = env();
  const a = await student(e, "c-a");
  const b = await student(e, "c-b");
  await call(e, "PUT", "/v1/me/weeks/2026-11-02", { student: a, body: { data: { gorusme: 3 }, note: "ilk hafta" } });
  await call(e, "PUT", "/v1/me/weeks/2026-11-02", { student: a, body: { data: { gorusme: 4 }, note: null } });
  const wa = await call(e, "GET", "/v1/me/weeks", { student: a });
  assert.equal(wa.body.weeks.length, 1);
  assert.equal(wa.body.weeks[0].data.gorusme, 4);
  assert.deepEqual((await call(e, "GET", "/v1/me/weeks", { student: b })).body.weeks, []);
});
