import type { Migration } from './migrate';

// TODO: move this into files under migrations/*.sql

export const migrations: Migration[] = [
  {
    up: `CREATE TABLE IF NOT EXISTS page_views (path TEXT PRIMARY KEY, count INT DEFAULT 1)`,
    down: `DROP TABLE page_views;`,
    version: 1,
  },
  {
    up: `CREATE TABLE IF NOT EXISTS page_views_history (id INTEGER PRIMARY KEY, path TEXT NOT NULL, useragent TEXT NOT NULL, timestamp TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL)`,
    down: `DROP TABLE page_views_history;`,
    version: 2,
  },
];
