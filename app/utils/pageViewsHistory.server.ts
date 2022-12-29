import type { Database, SQLQueryBindings } from 'bun:sqlite';

export const addingPageViewHistory = (db: Database, pathname: string, userAgent: string) => {
  db.run(`INSERT INTO page_views_history(path, useragent) VALUES (?, ?);`, pathname, userAgent);
};

export type PageViewHistory = {
  id: number;
  path: string;
  useragent: string;
  timestamp: string;
};

export const getAllPageViewHistory = (db: Database) => {
  return db.query<SQLQueryBindings, PageViewHistory>('SELECT * FROM page_views_history;').all();
};
