// gai-dosyam-api — Çalışma Dosyam veri katmanı. Yalnız growtify.ai sunucusu çağırır (imzalı istek).
// Uçlar:
//   POST /v1/students/upsert                 {ghl_contact_id, package, temel_baslangic, first_name?}
//   POST /v1/auth/code                       {email_hash, code_hash, contact_id}
//   POST /v1/auth/verify                     {email_hash, code_hash}
//   POST /v1/sessions                        {id_hash, student_id}
//   POST /v1/sessions/resolve                {id_hash}
//   POST /v1/sessions/delete                 {id_hash}
//   POST /v1/rate                            {key, limit, window}
//   GET  /v1/me                              (x-dosyam-student)
//   GET  /v1/me/sections | /v1/me/sections/:id
//   PUT  /v1/me/sections/:id                 {data, expected_version?}
//   POST /v1/me/sections/:id/approve         {version, outbox[]}
//   GET  /v1/me/weeks | PUT /v1/me/weeks/:week_start {data, note, outbox[]}
//   POST /v1/outbox/claim {limit} | POST /v1/outbox/:id/done | POST /v1/outbox/:id/fail {error}
//   GET  /v1/health
// Loglara yalnız yöntem, yol kalıbı ve durum kodu düşer; gövde asla loglanmaz.

import { HEADER, SIG_WINDOW_SECONDS, sha256Hex, verifySignature } from "./sig";
import {
  type D1Like,
  type OutboxItem,
  StudentScope,
  WriteError,
  claimOutbox,
  completeOutbox,
  consumeAuthCode,
  createAuthCode,
  createSession,
  deleteSession,
  effectiveMode,
  failOutbox,
  idemGet,
  idemPut,
  outboxStats,
  rateLimit,
  resolveSession,
  upsertStudent,
  useNonce,
} from "./db";

export interface Env {
  DB: D1Like;
  DOSYAM_HMAC_KEY: string;
  DOSYAM_HMAC_KEY_PREV?: string;
}

const MAX_BODY = 256 * 1024;
const SECTION_RE = /^[A-Z_]{1,16}[0-9]{0,2}[A-Z]?$/;
const HEX64 = /^[0-9a-f]{64}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8" } });
const err = (status: number, code: string) => json(status, { ok: false, error: code });

function isOutbox(v: unknown): v is OutboxItem[] {
  return (
    Array.isArray(v) &&
    v.length <= 20 &&
    v.every(
      (o) =>
        o &&
        typeof o === "object" &&
        ["fields", "tag", "buyume_week"].includes((o as OutboxItem).kind) &&
        typeof (o as OutboxItem).idempotency_key === "string" &&
        (o as OutboxItem).idempotency_key.length <= 128,
    )
  );
}

export async function handle(req: Request, env: Env, nowMs = Date.now()): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;
  if (path === "/v1/health" && req.method === "GET") return json(200, { ok: true });

  // 1) İmza — gövde okunmadan önce başlıklar ve boyut kontrol edilir.
  const ts = Number(req.headers.get(HEADER.ts));
  const nonce = req.headers.get(HEADER.nonce) ?? "";
  const student = req.headers.get(HEADER.student) ?? "";
  const sig = req.headers.get(HEADER.sig) ?? "";
  if (!sig) return err(401, "imza_yok");
  const len = Number(req.headers.get("content-length") ?? "0");
  if (len > MAX_BODY) return err(413, "govde_buyuk");
  const raw = req.method === "GET" ? "" : await req.text();
  if (raw.length > MAX_BODY) return err(413, "govde_buyuk");
  const nowSec = Math.floor(nowMs / 1000);
  const v = await verifySignature(
    [env.DOSYAM_HMAC_KEY, env.DOSYAM_HMAC_KEY_PREV ?? ""],
    { method: req.method, path: path + url.search, ts, nonce, student, bodyHash: await sha256Hex(raw) },
    sig,
    nowSec,
  );
  if (!v.ok) return err(401, `imza_${v.reason}`);
  if (!(await useNonce(env.DB, nonce, nowSec, SIG_WINDOW_SECONDS * 2))) return err(401, "imza_tekrar");

  let body: Record<string, unknown> = {};
  if (raw) {
    try {
      body = JSON.parse(raw);
    } catch {
      return err(400, "gecersiz_json");
    }
  }

  // 2) Idempotency — yazma isteklerinde aynı anahtar ilk cevabı geri alır.
  const idem = req.headers.get(HEADER.idem);
  const isWrite = req.method !== "GET";
  if (isWrite && idem) {
    const prev = await idemGet(env.DB, `${student}:${idem}`);
    if (prev) return new Response(prev, { status: 200, headers: { "content-type": "application/json; charset=utf-8" } });
  }
  const res = await route(req.method, path, body, student, env, nowMs);
  if (isWrite && idem && res.status === 200) {
    await idemPut(env.DB, `${student}:${idem}`, await res.clone().text(), nowMs);
  }
  return res;
}

async function route(
  method: string,
  path: string,
  body: Record<string, unknown>,
  studentId: string,
  env: Env,
  nowMs: number,
): Promise<Response> {
  const db = env.DB;
  const nowSec = Math.floor(nowMs / 1000);
  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");

  // --- öğrenciye bağlı olmayan uçlar (x-dosyam-student boş olmalı) ---
  if (!path.startsWith("/v1/me")) {
    if (studentId) return err(400, "ogrenci_basligi_beklenmiyor");

    if (method === "POST" && path === "/v1/students/upsert") {
      const pkg = str("package");
      const start = str("temel_baslangic");
      if (!str("ghl_contact_id") || !["temel", "tam"].includes(pkg) || Number.isNaN(Date.parse(start))) {
        return err(400, "gecersiz_ogrenci");
      }
      const s = await upsertStudent(
        db,
        { ghl_contact_id: str("ghl_contact_id"), package: pkg as "temel" | "tam", temel_baslangic: start, first_name: str("first_name") || null },
        nowMs,
      );
      return json(200, { ok: true, student: { ...s, mode: effectiveMode(s, nowMs) } });
    }
    if (method === "POST" && path === "/v1/auth/code") {
      if (!HEX64.test(str("email_hash")) || !HEX64.test(str("code_hash")) || !str("contact_id")) return err(400, "gecersiz_kod");
      await createAuthCode(db, { email_hash: str("email_hash"), code_hash: str("code_hash"), contact_id: str("contact_id") }, nowMs);
      return json(200, { ok: true });
    }
    if (method === "POST" && path === "/v1/auth/verify") {
      if (!HEX64.test(str("email_hash")) || !HEX64.test(str("code_hash"))) return err(400, "gecersiz_kod");
      return json(200, await consumeAuthCode(db, str("email_hash"), str("code_hash"), nowMs));
    }
    if (method === "POST" && path === "/v1/sessions") {
      if (!HEX64.test(str("id_hash")) || !str("student_id")) return err(400, "gecersiz_oturum");
      const scope = await StudentScope.open(db, str("student_id"));
      if (!scope) return err(404, "ogrenci_yok");
      return json(200, { ok: true, expires_at: await createSession(db, str("id_hash"), str("student_id"), nowMs) });
    }
    if (method === "POST" && path === "/v1/sessions/resolve") {
      if (!HEX64.test(str("id_hash"))) return err(400, "gecersiz_oturum");
      const s = await resolveSession(db, str("id_hash"), nowMs);
      return json(200, s ? { ok: true, student: { ...s, mode: effectiveMode(s, nowMs) } } : { ok: false });
    }
    if (method === "POST" && path === "/v1/sessions/delete") {
      if (!HEX64.test(str("id_hash"))) return err(400, "gecersiz_oturum");
      await deleteSession(db, str("id_hash"));
      return json(200, { ok: true });
    }
    if (method === "POST" && path === "/v1/rate") {
      const limit = Number(body.limit);
      const windowSec = Number(body.window);
      if (!str("key") || !(limit > 0) || !(windowSec > 0)) return err(400, "gecersiz_sinir");
      return json(200, { ok: true, ...(await rateLimit(db, str("key"), limit, windowSec, nowSec)) });
    }
    if (method === "POST" && path === "/v1/outbox/claim") {
      const limit = Math.min(Math.max(Number(body.limit) || 10, 1), 50);
      return json(200, { ok: true, jobs: await claimOutbox(db, limit, nowMs) });
    }
    const m = path.match(/^\/v1\/outbox\/([0-9a-f-]{36})\/(done|fail)$/);
    if (method === "POST" && m) {
      if (m[2] === "done") {
        await completeOutbox(db, m[1], nowMs);
        return json(200, { ok: true });
      }
      return json(200, { ok: true, status: await failOutbox(db, m[1], str("error") || "bilinmiyor", nowMs) });
    }
    if (method === "GET" && path === "/v1/outbox/stats") return json(200, { ok: true, stats: await outboxStats(db) });
    return err(404, "yok");
  }

  // --- öğrenci kapsamı: kimlik yalnız imzalı başlıktan gelir ---
  const scope = await StudentScope.open(db, studentId);
  if (!scope) return err(404, "ogrenci_yok");

  try {
    if (method === "GET" && path === "/v1/me") {
      return json(200, { ok: true, student: { ...scope.student, mode: effectiveMode(scope.student, nowMs) } });
    }
    if (method === "GET" && path === "/v1/me/sections") return json(200, { ok: true, sections: await scope.listSections() });
    if (method === "GET" && path === "/v1/me/weeks") return json(200, { ok: true, weeks: await scope.listWeeks() });

    const sec = path.match(/^\/v1\/me\/sections\/([^/]+)(\/approve)?$/);
    if (sec) {
      const id = decodeURIComponent(sec[1]);
      if (!SECTION_RE.test(id)) return err(400, "gecersiz_bolum");
      if (method === "GET" && !sec[2]) return json(200, { ok: true, ...(await scope.getSection(id)) });
      if (method === "PUT" && !sec[2]) {
        if (body.data === undefined) return err(400, "veri_yok");
        const ev = body.expected_version === undefined ? undefined : Number(body.expected_version);
        return json(200, { ok: true, submission: await scope.saveDraft(id, body.data, nowMs, ev) });
      }
      if (method === "POST" && sec[2]) {
        const outbox = body.outbox ?? [];
        if (!isOutbox(outbox)) return err(400, "gecersiz_kuyruk");
        return json(200, { ok: true, submission: await scope.approve(id, Number(body.version), outbox, nowMs) });
      }
    }

    const wk = path.match(/^\/v1\/me\/weeks\/(\d{4}-\d{2}-\d{2})$/);
    if (wk && method === "PUT") {
      if (!DATE_RE.test(wk[1]) || body.data === undefined) return err(400, "gecersiz_hafta");
      const outbox = body.outbox ?? [];
      if (!isOutbox(outbox)) return err(400, "gecersiz_kuyruk");
      const note = typeof body.note === "string" ? body.note.slice(0, 2000) : null;
      await scope.upsertWeek(wk[1], body.data, note, outbox, nowMs);
      return json(200, { ok: true });
    }
  } catch (e) {
    if (e instanceof WriteError) return err(409, e.code);
    throw e;
  }
  return err(404, "yok");
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    try {
      return await handle(req, env);
    } catch {
      // Hata ayrıntısı öğrenci verisi içerebilir; yalnız genel kod döner ve loglanır.
      console.error(JSON.stringify({ evt: "hata", method: req.method, path: new URL(req.url).pathname.replace(/\/[^/]+$/, "/:x") }));
      return err(500, "sunucu_hatasi");
    }
  },
};
