import type { SQLQueryBindings } from 'bun:sqlite';
import { db } from '~/utils/db.server';

db.run('CREATE TABLE IF NOT EXISTS page_views (path TEXT PRIMARY KEY, count INT DEFAULT 1)');

export const increasePageViewsForPath = (pathname: string) => {
  db.run(
    `
    INSERT INTO
      page_views(path)
      VALUES(?)
    ON CONFLICT(path)
    DO UPDATE
    SET
      count=count+1;
  `,
    pathname
  );
};

export const getPageViewsForPath = (pathname: string) => {
  const result = db
    .query<SQLQueryBindings, { count: number }>(
      `
      SELECT
        count
      FROM
        page_views
      WHERE
        path = ?
      LIMIT 1;
    `
    )
    .get(pathname);

  return result?.count ?? null;
};
