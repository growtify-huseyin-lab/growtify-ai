// Veri erişimi. Öğrenciye ait her işlem StudentScope üzerinden yapılır: kapsam nesnesi
// student_id olmadan kurulamaz ve her sorgu `student_id = ?` ile süzülür (ADR K3, kiracı izolasyonu).

export interface D1Result<T = unknown> {
  results: T[];
  meta?: { changes?: number };
}
export interface D1Stmt {
  bind(...values: unknown[]): D1Stmt;
  first<T = Record<string, unknown>>(): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}
export interface D1Like {
  prepare(sql: string): D1Stmt;
  batch(stmts: D1Stmt[]): Promise<D1Result[]>;
}

export const TEMEL_DAYS = 28;
export const TAM_DAYS = 112; // 28 gün + 3 ay (CEO 2026-09-29, 2026-10-23)
const DAY = 86_400_000;

export const iso = (ms: number) => new Date(ms).toISOString();
export const uuid = () => crypto.randomUUID();

export interface Student {
  id: string;
  ghl_contact_id: string;
  package: "temel" | "tam";
  temel_baslangic: string;
  tam_bitis: string | null;
  mode: "aktif" | "salt_okunur" | "kapali";
  first_name: string | null;
}

// Erişim modu tarihten hesaplanır; `kapali` yalnız silme talebinde elle konur.
export function effectiveMode(s: Student, nowMs: number): Student["mode"] {
  if (s.mode === "kapali") return "kapali";
  const end =
    s.package === "tam" && s.tam_bitis
      ? Date.parse(s.tam_bitis)
      : Date.parse(s.temel_baslangic) + TEMEL_DAYS * DAY;
  return nowMs < end ? "aktif" : "salt_okunur";
}

export function tamBitis(temelBaslangic: string): string {
  return iso(Date.parse(temelBaslangic) + TAM_DAYS * DAY);
}

// --- öğrenci -----------------------------------------------------------------

export async function upsertStudent(
  db: D1Like,
  input: { ghl_contact_id: string; package: "temel" | "tam"; temel_baslangic: string; first_name?: string | null },
  nowMs: number,
): Promise<Student> {
  const now = iso(nowMs);
  const tam = input.package === "tam" ? tamBitis(input.temel_baslangic) : null;
  await db
    .prepare(
      `INSERT INTO students (id, ghl_contact_id, package, temel_baslangic, tam_bitis, mode, first_name, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'aktif', ?, ?, ?)
       ON CONFLICT (ghl_contact_id) DO UPDATE SET
         package = excluded.package,
         temel_baslangic = excluded.temel_baslangic,
         tam_bitis = excluded.tam_bitis,
         first_name = COALESCE(excluded.first_name, students.first_name),
         updated_at = excluded.updated_at`,
    )
    .bind(uuid(), input.ghl_contact_id, input.package, input.temel_baslangic, tam, input.first_name ?? null, now, now)
    .run();
  const s = await db.prepare(`SELECT * FROM students WHERE ghl_contact_id = ?`).bind(input.ghl_contact_id).first<Student>();
  if (!s) throw new Error("student_upsert_failed");
  return s;
}

export function getStudent(db: D1Like, id: string): Promise<Student | null> {
  return db.prepare(`SELECT * FROM students WHERE id = ?`).bind(id).first<Student>();
}

// --- giriş kodu ve oturum -------------------------------------------------------

export const CODE_TTL_MS = 10 * 60_000;
export const CODE_MAX_ATTEMPTS = 5;
export const SESSION_TTL_MS = 30 * DAY;

export async function createAuthCode(
  db: D1Like,
  input: { email_hash: string; code_hash: string; contact_id: string },
  nowMs: number,
): Promise<void> {
  // Aynı e-postanın eski, kullanılmamış kodları geçersiz olur: her zaman yalnız son kod geçer.
  await db.batch([
    db
      .prepare(`UPDATE auth_codes SET used_at = ? WHERE email_hash = ? AND used_at IS NULL`)
      .bind(iso(nowMs), input.email_hash),
    db
      .prepare(
        `INSERT INTO auth_codes (id, email_hash, code_hash, contact_id, expires_at, attempts, created_at)
         VALUES (?, ?, ?, ?, ?, 0, ?)`,
      )
      .bind(uuid(), input.email_hash, input.code_hash, input.contact_id, iso(nowMs + CODE_TTL_MS), iso(nowMs)),
  ]);
}

export type CodeCheck = { ok: true; contact_id: string } | { ok: false; reason: "yok" | "suresi_doldu" | "hatali" | "deneme_bitti" };

export async function consumeAuthCode(db: D1Like, emailHash: string, codeHash: string, nowMs: number): Promise<CodeCheck> {
  const row = await db
    .prepare(
      `SELECT id, code_hash, contact_id, expires_at, attempts FROM auth_codes
       WHERE email_hash = ? AND used_at IS NULL ORDER BY created_at DESC LIMIT 1`,
    )
    .bind(emailHash)
    .first<{ id: string; code_hash: string; contact_id: string; expires_at: string; attempts: number }>();
  if (!row) return { ok: false, reason: "yok" };
  if (Date.parse(row.expires_at) <= nowMs) return { ok: false, reason: "suresi_doldu" };
  if (row.attempts >= CODE_MAX_ATTEMPTS) return { ok: false, reason: "deneme_bitti" };
  if (row.code_hash !== codeHash) {
    await db.prepare(`UPDATE auth_codes SET attempts = attempts + 1 WHERE id = ?`).bind(row.id).run();
    return { ok: false, reason: row.attempts + 1 >= CODE_MAX_ATTEMPTS ? "deneme_bitti" : "hatali" };
  }
  await db.prepare(`UPDATE auth_codes SET used_at = ? WHERE id = ?`).bind(iso(nowMs), row.id).run();
  return { ok: true, contact_id: row.contact_id };
}

export async function createSession(db: D1Like, idHash: string, studentId: string, nowMs: number): Promise<string> {
  const expires = iso(nowMs + SESSION_TTL_MS);
  await db
    .prepare(`INSERT INTO sessions (id_hash, student_id, created_at, expires_at, last_seen) VALUES (?, ?, ?, ?, ?)`)
    .bind(idHash, studentId, iso(nowMs), expires, iso(nowMs))
    .run();
  return expires;
}

export async function resolveSession(db: D1Like, idHash: string, nowMs: number): Promise<Student | null> {
  const row = await db
    .prepare(
      `SELECT s.* FROM sessions x JOIN students s ON s.id = x.student_id
       WHERE x.id_hash = ? AND x.expires_at > ?`,
    )
    .bind(idHash, iso(nowMs))
    .first<Student>();
  if (row) await db.prepare(`UPDATE sessions SET last_seen = ? WHERE id_hash = ?`).bind(iso(nowMs), idHash).run();
  return row;
}

export async function deleteSession(db: D1Like, idHash: string): Promise<void> {
  await db.prepare(`DELETE FROM sessions WHERE id_hash = ?`).bind(idHash).run();
}

// --- oran sınırı ve nonce -------------------------------------------------------

export async function rateLimit(
  db: D1Like,
  key: string,
  limit: number,
  windowSec: number,
  nowSec: number,
): Promise<{ allowed: boolean; remaining: number }> {
  const windowStart = nowSec - (nowSec % windowSec);
  const row = await db
    .prepare(
      `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
       ON CONFLICT (key) DO UPDATE SET
         count = CASE WHEN rate_limits.window_start = excluded.window_start THEN rate_limits.count + 1 ELSE 1 END,
         window_start = excluded.window_start
       RETURNING count`,
    )
    .bind(key, windowStart)
    .first<{ count: number }>();
  const count = row?.count ?? limit + 1;
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

// true = ilk kullanım; false = tekrar oynatma.
export async function useNonce(db: D1Like, nonce: string, nowSec: number, ttlSec: number): Promise<boolean> {
  await db.prepare(`DELETE FROM nonces WHERE expires_at < ?`).bind(nowSec).run();
  const r = await db
    .prepare(`INSERT INTO nonces (nonce, expires_at) VALUES (?, ?) ON CONFLICT (nonce) DO NOTHING`)
    .bind(nonce, nowSec + ttlSec)
    .run();
  return (r.meta?.changes ?? 0) === 1;
}

// --- idempotency ----------------------------------------------------------------

export async function idemGet(db: D1Like, key: string): Promise<string | null> {
  const r = await db.prepare(`SELECT response_json FROM idempotency WHERE key = ?`).bind(key).first<{ response_json: string }>();
  return r?.response_json ?? null;
}

export async function idemPut(db: D1Like, key: string, response: string, nowMs: number): Promise<void> {
  await db
    .prepare(`INSERT INTO idempotency (key, response_json, created_at) VALUES (?, ?, ?) ON CONFLICT (key) DO NOTHING`)
    .bind(key, response, iso(nowMs))
    .run();
}

// --- öğrenci kapsamı ------------------------------------------------------------

export interface Submission {
  section_id: string;
  version: number;
  status: "taslak" | "onayli";
  data: unknown;
  updated_at: string;
  approved_at: string | null;
}

export interface OutboxItem {
  kind: "fields" | "tag" | "buyume_week";
  payload: unknown;
  idempotency_key: string;
}

export class WriteError extends Error {
  constructor(public code: "salt_okunur" | "surum_cakismasi" | "taslak_yok") {
    super(code);
  }
}

type SubRow = { section_id: string; version: number; status: Submission["status"]; data_json: string; updated_at: string; approved_at: string | null };
const toSub = (r: SubRow): Submission => ({
  section_id: r.section_id,
  version: r.version,
  status: r.status,
  data: JSON.parse(r.data_json),
  updated_at: r.updated_at,
  approved_at: r.approved_at,
});

export class StudentScope {
  private constructor(
    private db: D1Like,
    readonly student: Student,
  ) {}

  static async open(db: D1Like, studentId: string): Promise<StudentScope | null> {
    if (!studentId) return null;
    const s = await getStudent(db, studentId);
    return s ? new StudentScope(db, s) : null;
  }

  private get id() {
    return this.student.id;
  }

  private assertWritable(nowMs: number) {
    if (effectiveMode(this.student, nowMs) !== "aktif") throw new WriteError("salt_okunur");
  }

  // Her bölümün en son sürümü.
  async listSections(): Promise<Submission[]> {
    const { results } = await this.db
      .prepare(
        `SELECT section_id, version, status, data_json, updated_at, approved_at FROM submissions s
         WHERE student_id = ? AND version = (
           SELECT MAX(version) FROM submissions WHERE student_id = s.student_id AND section_id = s.section_id)
         ORDER BY section_id`,
      )
      .bind(this.id)
      .all<SubRow>();
    return results.map(toSub);
  }

  async getSection(sectionId: string): Promise<{ latest: Submission | null; approved: Submission | null }> {
    const { results } = await this.db
      .prepare(
        `SELECT section_id, version, status, data_json, updated_at, approved_at FROM submissions
         WHERE student_id = ? AND section_id = ? ORDER BY version DESC LIMIT 20`,
      )
      .bind(this.id, sectionId)
      .all<SubRow>();
    const subs = results.map(toSub);
    return { latest: subs[0] ?? null, approved: subs.find((s) => s.status === "onayli") ?? null };
  }

  // Taslağı kaydeder. En son sürüm onaylıysa yeni sürüm açar. expectedVersion verilirse
  // en son sürüm onunla eşleşmeli (iki sekmeden aynı anda yazma).
  async saveDraft(sectionId: string, data: unknown, nowMs: number, expectedVersion?: number): Promise<Submission> {
    this.assertWritable(nowMs);
    const { latest } = await this.getSection(sectionId);
    if (expectedVersion !== undefined && (latest?.version ?? 0) !== expectedVersion) throw new WriteError("surum_cakismasi");
    const now = iso(nowMs);
    const json = JSON.stringify(data);
    if (latest && latest.status === "taslak") {
      await this.db
        .prepare(`UPDATE submissions SET data_json = ?, updated_at = ? WHERE student_id = ? AND section_id = ? AND version = ?`)
        .bind(json, now, this.id, sectionId, latest.version)
        .run();
      return { ...latest, data, updated_at: now };
    }
    const version = (latest?.version ?? 0) + 1;
    await this.db
      .prepare(
        `INSERT INTO submissions (id, student_id, section_id, version, status, data_json, created_at, updated_at)
         VALUES (?, ?, ?, ?, 'taslak', ?, ?, ?)`,
      )
      .bind(uuid(), this.id, sectionId, version, json, now, now)
      .run();
    return { section_id: sectionId, version, status: "taslak", data, updated_at: now, approved_at: null };
  }

  // Son taslağı onaylar ve GHL kuyruğunu aynı işlemde (batch) doldurur.
  async approve(sectionId: string, version: number, outbox: OutboxItem[], nowMs: number): Promise<Submission> {
    this.assertWritable(nowMs);
    const { latest } = await this.getSection(sectionId);
    if (!latest || latest.status !== "taslak") throw new WriteError("taslak_yok");
    if (latest.version !== version) throw new WriteError("surum_cakismasi");
    const now = iso(nowMs);
    await this.db.batch([
      this.db
        .prepare(
          `UPDATE submissions SET status = 'onayli', approved_at = ?, updated_at = ?
           WHERE student_id = ? AND section_id = ? AND version = ? AND status = 'taslak'`,
        )
        .bind(now, now, this.id, sectionId, version),
      ...outbox.map((o) => this.outboxStmt(o, nowMs)),
    ]);
    return { ...latest, status: "onayli", approved_at: now, updated_at: now };
  }

  async listWeeks(): Promise<{ week_start: string; data: unknown; note: string | null; updated_at: string }[]> {
    const { results } = await this.db
      .prepare(`SELECT week_start, data_json, note, updated_at FROM buyume_weeks WHERE student_id = ? ORDER BY week_start DESC`)
      .bind(this.id)
      .all<{ week_start: string; data_json: string; note: string | null; updated_at: string }>();
    return results.map((r) => ({ week_start: r.week_start, data: JSON.parse(r.data_json), note: r.note, updated_at: r.updated_at }));
  }

  // Büyüme Döngüm haftaları programdan sonra da açık kalabilir (Course önerisi, CEO kararı bekliyor);
  // karar gelene kadar diğer yazmalarla aynı kural geçerli.
  async upsertWeek(weekStart: string, data: unknown, note: string | null, outbox: OutboxItem[], nowMs: number): Promise<void> {
    this.assertWritable(nowMs);
    const now = iso(nowMs);
    await this.db.batch([
      this.db
        .prepare(
          `INSERT INTO buyume_weeks (id, student_id, week_start, data_json, note, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON CONFLICT (student_id, week_start) DO UPDATE SET
             data_json = excluded.data_json, note = excluded.note, updated_at = excluded.updated_at`,
        )
        .bind(uuid(), this.id, weekStart, JSON.stringify(data), note, now, now),
      ...outbox.map((o) => this.outboxStmt(o, nowMs)),
    ]);
  }

  private outboxStmt(o: OutboxItem, nowMs: number): D1Stmt {
    const now = iso(nowMs);
    return this.db
      .prepare(
        `INSERT INTO ghl_outbox (id, student_id, kind, payload_json, idempotency_key, status, attempts, next_attempt_at, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, 'bekliyor', 0, ?, ?, ?)
         ON CONFLICT (idempotency_key) DO NOTHING`,
      )
      .bind(uuid(), this.id, o.kind, JSON.stringify(o.payload), o.idempotency_key, now, now, now);
  }
}

// --- GHL kuyruğu (tek tüketici: growtify.ai Vercel Cron) -----------------------

export const OUTBOX_MAX_ATTEMPTS = 8;

export interface OutboxJob {
  id: string;
  student_id: string;
  ghl_contact_id: string;
  kind: OutboxItem["kind"];
  payload: unknown;
  attempts: number;
}

export async function claimOutbox(db: D1Like, limit: number, nowMs: number): Promise<OutboxJob[]> {
  const now = iso(nowMs);
  // Takılı kalan "isleniyor" işler 10 dk sonra yeniden alınabilir.
  const stale = iso(nowMs - 10 * 60_000);
  const { results } = await db
    .prepare(
      `UPDATE ghl_outbox SET status = 'isleniyor', updated_at = ?
       WHERE id IN (
         SELECT id FROM ghl_outbox
         WHERE (status = 'bekliyor' AND next_attempt_at <= ?) OR (status = 'isleniyor' AND updated_at < ?)
         ORDER BY created_at LIMIT ?)
       RETURNING id, student_id, kind, payload_json, attempts`,
    )
    .bind(now, now, stale, limit)
    .all<{ id: string; student_id: string; kind: OutboxItem["kind"]; payload_json: string; attempts: number }>();
  const jobs: OutboxJob[] = [];
  for (const r of results) {
    const s = await getStudent(db, r.student_id);
    if (!s) continue;
    jobs.push({ id: r.id, student_id: r.student_id, ghl_contact_id: s.ghl_contact_id, kind: r.kind, payload: JSON.parse(r.payload_json), attempts: r.attempts });
  }
  return jobs;
}

export async function completeOutbox(db: D1Like, id: string, nowMs: number): Promise<void> {
  await db.prepare(`UPDATE ghl_outbox SET status = 'tamam', updated_at = ?, last_error = NULL WHERE id = ?`).bind(iso(nowMs), id).run();
}

export async function failOutbox(db: D1Like, id: string, error: string, nowMs: number): Promise<"bekliyor" | "olu"> {
  const row = await db.prepare(`SELECT attempts FROM ghl_outbox WHERE id = ?`).bind(id).first<{ attempts: number }>();
  const attempts = (row?.attempts ?? 0) + 1;
  const status = attempts >= OUTBOX_MAX_ATTEMPTS ? "olu" : "bekliyor";
  const backoff = Math.min(2 ** attempts * 60_000, 6 * 3_600_000); // 2 dk … 6 sa
  await db
    .prepare(`UPDATE ghl_outbox SET status = ?, attempts = ?, last_error = ?, next_attempt_at = ?, updated_at = ? WHERE id = ?`)
    .bind(status, attempts, error.slice(0, 300), iso(nowMs + backoff), iso(nowMs), id)
    .run();
  return status;
}

export async function outboxStats(db: D1Like): Promise<Record<string, number>> {
  const { results } = await db.prepare(`SELECT status, COUNT(*) AS n FROM ghl_outbox GROUP BY status`).all<{ status: string; n: number }>();
  return Object.fromEntries(results.map((r) => [r.status, r.n]));
}
