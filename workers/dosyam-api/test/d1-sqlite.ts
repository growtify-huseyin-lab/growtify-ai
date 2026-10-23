// Testler için D1 benzeri bağdaştırıcı: Node'un yerleşik SQLite'ı üzerinde, gerçek migrasyonlarla.
import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { D1Like, D1Result, D1Stmt } from "../src/db";

type Val = string | number | null | bigint;
const norm = (v: unknown): Val => (v === undefined ? null : (v as Val));

class Stmt implements D1Stmt {
  constructor(
    private db: DatabaseSync,
    private sql: string,
    private params: Val[] = [],
  ) {}
  bind(...values: unknown[]): D1Stmt {
    return new Stmt(this.db, this.sql, values.map(norm));
  }
  async first<T>(): Promise<T | null> {
    return ((this.db.prepare(this.sql).get(...this.params) as T) ?? null) as T | null;
  }
  async all<T>(): Promise<D1Result<T>> {
    return { results: this.db.prepare(this.sql).all(...this.params) as T[] };
  }
  async run(): Promise<D1Result> {
    const r = this.db.prepare(this.sql).run(...this.params);
    return { results: [], meta: { changes: Number(r.changes) } };
  }
  runSync() {
    return this.db.prepare(this.sql).run(...this.params);
  }
}

export function makeDb(): D1Like & { raw: DatabaseSync } {
  const db = new DatabaseSync(":memory:");
  // Testler depo kökünden çalışır (npm run test:dosyam).
  const dir = join(process.cwd(), "workers", "dosyam-api", "migrations");
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) db.exec(readFileSync(join(dir, f), "utf8"));
  return {
    raw: db,
    prepare: (sql: string) => new Stmt(db, sql),
    async batch(stmts: D1Stmt[]) {
      // D1 batch'i tek işlem (transaction) olarak çalıştırır.
      db.exec("BEGIN");
      try {
        for (const s of stmts) (s as Stmt).runSync();
        db.exec("COMMIT");
      } catch (e) {
        db.exec("ROLLBACK");
        throw e;
      }
      return [];
    },
  };
}
