import type { Migration } from './migrate'

// TODO: move this into files under migrations/*.sql

export const migrations: Migration[] = [
  {
    up: `CREATE TABLE page_views (path TEXT PRIMARY KEY, count INT DEFAULT 1);`,
    down: `DROP TABLE page_views;`,
    version: 1,
  },
  {
    up: `CREATE TABLE page_views_history (id INTEGER PRIMARY KEY, path TEXT NOT NULL, useragent TEXT NOT NULL, timestamp TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL);`,
    down: `DROP TABLE page_views_history;`,
    version: 2,
  },
  {
    up: `ALTER TABLE page_views_history ADD referrer TEXT;`,
    // not tested:
    down: `
      ALTER TABLE page_views_history RENAME TO _page_views_history_old;
      CREATE TABLE IF NOT EXISTS page_views_history (id INTEGER PRIMARY KEY, path TEXT NOT NULL, useragent TEXT NOT NULL, timestamp TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL)
      INSERT INTO page_views_history (id, path, useragent)
      SELECT id, path, useragent
      FROM _page_views_history_old;
    `,
    version: 3,
  },
]
