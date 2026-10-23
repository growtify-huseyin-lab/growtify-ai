// @types/node 20'de node:sqlite tanımı yok; testlerin kullandığı kadarı.
declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): {
      get(...params: unknown[]): unknown;
      all(...params: unknown[]): unknown[];
      run(...params: unknown[]): { changes: number | bigint };
    };
  }
}
