import { db } from './db.server';

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

export const addingPageViewHistory = (values: PageViewHistoryValues) => {
  db.query(
    `INSERT INTO page_views_history(path, useragent, referrer) VALUES (:path, :useragent, :referrer);`,
  ).run({
    ':path': values.path,
    ':useragent': values.useragent,
    ':referrer': values.referrer,
  });
};

export const getAllPageViewHistory = () => {
  const result = db
    .query<PageViewHistory, []>('SELECT * FROM page_views_history;')
    .all();
  return result;
};
