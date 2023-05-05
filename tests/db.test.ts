import { expect, test } from 'bun:test'
import { migrations } from '../server/migrations'
import { migrate, getDatabaseVersion } from '../server/migrate'
import { Database } from 'bun:sqlite'
import { getPageViewsForPath, increasePageViewsForPath } from '~/utils/pageViews.server'
import { addingPageViewHistory, getAllPageViewHistory } from '~/utils/pageViewsHistory.server'

test('Should run migrations', () => {
  const db = new Database(':memory:', { create: true })

  const databaseVersionPrev = getDatabaseVersion(db)
  migrate(db, migrations)
  const databaseVersionNext = getDatabaseVersion(db)

  expect(databaseVersionPrev < databaseVersionNext).toBe(true)

  const pageViewsPrev = getPageViewsForPath(db, '/')
  expect(pageViewsPrev).toBe(null)
  increasePageViewsForPath(db, '/')

  const pageViewsNext = getPageViewsForPath(db, '/')
  expect(pageViewsNext).toBe(1)

  const useragent =
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15'
  const referrer = 'https://example.org'
  addingPageViewHistory(db, { path: '/', useragent, referrer })

  const result = getAllPageViewHistory(db)
  expect(result.length).toBe(1)

  const firstPageView = result[0]
  expect(firstPageView.path).toBe('/')
  expect(firstPageView.useragent).toBe(useragent)
  expect(firstPageView.referrer).toBe(referrer)
})

// test('Should run migrations down', async () => {
//   const db = new Database(':memory:', { create: true, readonly: false, readwrite: true });

//   expect(getDatabaseVersion(db)).toBe(0);

//   console.log('Run migrations to 1');
//   migrate(db, migrations, 1);
//   expect(getDatabaseVersion(db)).toBe(1);

//   console.log('Run migrations to 2');
//   migrate(db, migrations, 2);
//   expect(getDatabaseVersion(db)).toBe(2);

//   increasePageViewsForPath(db, '/');
//   expect(getPageViewsForPath(db, '/')).toBe(1);

//   console.log('inTransaction', db.inTransaction);

//   db.exec('DROP TABLE page_views;');
//   console.log('DROPPED!');
//   setDatabaseVersion(db, 0);

//   // migrate(db, migrations, 0);
//   const databaseVersionDown = getDatabaseVersion(db);
//   expect(databaseVersionDown).toBe(0);
// });
