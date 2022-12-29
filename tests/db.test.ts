import { expect, test } from 'bun:test';
import { migrations } from '../server/migrations';
import { migrate, getDatabaseVersion } from '../server/migrate';
import { Database } from 'bun:sqlite';
import { getPageViewsForPath, increasePageViewsForPath } from '~/utils/pageViews.server';
import { addingPageViewHistory } from '~/utils/pageViewsHistory.server';

test('Should run migrations', () => {
  const db = new Database(':memory:', { create: true });

  const databaseVersionPrev = getDatabaseVersion(db);
  migrate(db, migrations);
  const databaseVersionNext = getDatabaseVersion(db);

  expect(databaseVersionPrev < databaseVersionNext).toBe(true);

  const pageViewsPrev = getPageViewsForPath(db, '/');
  expect(pageViewsPrev).toBe(null);
  increasePageViewsForPath(db, '/');

  const pageViewsNext = getPageViewsForPath(db, '/');
  expect(pageViewsNext).toBe(1);

  addingPageViewHistory(
    db,
    '/',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15'
  );

  const result = db.query('SELECT * FROM page_views_history;').all();
  expect(result.length).toBe(1);
});
