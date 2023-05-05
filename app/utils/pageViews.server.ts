import type { SQLQueryBindings, Database } from 'bun:sqlite'

export const increasePageViewsForPath = (db: Database, pathname: string) => {
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
  )
}

export const getPageViewsForPath = (db: Database, pathname: string) => {
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
    .get(pathname)

  return result?.count ?? null
}
