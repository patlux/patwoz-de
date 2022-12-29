import type { Database, SQLQueryBindings } from 'bun:sqlite';

export type PageViewHistoryMeta = {
  id: number;
  timestamp: string;
};

export type PageViewHistoryValues = {
  path: string;
  useragent: string;
  referrer: string | null;
};

export type PageViewHistory = PageViewHistoryMeta & PageViewHistoryValues;

export const addingPageViewHistory = (db: Database, values: PageViewHistoryValues) => {
  db.run(
    `INSERT INTO page_views_history(path, useragent, referrer) VALUES (?, ?, ?);`,
    values.path,
    values.useragent,
    values.referrer
  );
};

export const getAllPageViewHistory = (db: Database) => {
  return db.query<SQLQueryBindings, PageViewHistory>('SELECT * FROM page_views_history;').all();
};
