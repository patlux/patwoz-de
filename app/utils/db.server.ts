import { Database } from 'bun:sqlite';

declare global {
  var db: Database;
}

export const db: Database =
  globalThis.db ||
  (globalThis.db = new Database(process.env.DB_PATH ?? 'patwoz.db', { create: true }));

db.run('CREATE TABLE IF NOT EXISTS page_views (path TEXT PRIMARY KEY, count INT DEFAULT 1)');
