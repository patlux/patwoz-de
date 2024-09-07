import { db } from './db.server'

export const increasePageViewsForPath = (pathname: string) => {
  db.query(
    `
    INSERT INTO
      page_views(path)
      VALUES(?)
    ON CONFLICT(path)
    DO UPDATE
    SET
      count=count+1;
  `,
  ).run(pathname)
}

export const getPageViewsForPath = (pathname: string) => {
  const result = db
    .query<{ count: number }, string>(
      `
      SELECT
        count
      FROM
        page_views
      WHERE
        path = ?
      LIMIT 1;
    `,
    )
    .get(pathname)

  return result?.count ?? null
}
