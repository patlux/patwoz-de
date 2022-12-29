import type { Database } from 'bun:sqlite';

export const addingPageViewHistory = (db: Database, pathname: string, userAgent: string) => {
  db.run(`INSERT INTO page_views_history(path, useragent) VALUES (?, ?);`, pathname, userAgent);
};
