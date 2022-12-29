import { json, LoaderFunction } from '@remix-run/node';
import { db } from '~/utils/db.server';
import { getAllPageViewHistory } from '~/utils/pageViewsHistory.server';

export const loader: LoaderFunction = () => {
  const pageViewHistory = getAllPageViewHistory(db);
  return json({ data: pageViewHistory });
};
