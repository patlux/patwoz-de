import {
  getPageViewsForPath,
  increasePageViewsForPath,
} from './pageViews.server';
import { addingPageViewHistory } from './pageViewsHistory.server';

export const trackPage = (request: Request) => {
  const pathname = new URL(request.url).pathname;

  increasePageViewsForPath(pathname);
  const count = getPageViewsForPath(pathname);

  addingPageViewHistory({
    path: pathname,
    useragent: request.headers.get('User-Agent') ?? `NO_USERAGENT`,
    referrer: request.headers.get('Referer') ?? null,
  });

  return { count };
};
