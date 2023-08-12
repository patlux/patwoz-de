import type { ServeOptions } from 'bun';
import type { RequestHandler } from '@remix-run/server-runtime';
import { createRequestHandler } from '@remix-run/server-runtime';
import { migrate } from 'bun-sqlite-migrations';

import { db } from '~/utils/db.server';

migrate(db, [
  {
    up: [
      `CREATE TABLE page_views (path TEXT PRIMARY KEY, count INT DEFAULT 1);`,
    ],
    down: `DROP TABLE page_views;`,
    version: 1,
  },
  {
    up: [
      `CREATE TABLE page_views_history (id INTEGER PRIMARY KEY, path TEXT NOT NULL, useragent TEXT NOT NULL, timestamp TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL);`,
    ],
    down: `DROP TABLE page_views_history;`,
    version: 2,
  },
  {
    up: [`ALTER TABLE page_views_history ADD referrer TEXT;`],
    // not tested:
    down: `
      ALTER TABLE page_views_history RENAME TO _page_views_history_old;
      CREATE TABLE IF NOT EXISTS page_views_history (id INTEGER PRIMARY KEY, path TEXT NOT NULL, useragent TEXT NOT NULL, timestamp TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL)
      INSERT INTO page_views_history (id, path, useragent)
      SELECT id, path, useragent
      FROM _page_views_history_old;
    `,
    version: 3,
  },
]);

const requestHandler: RequestHandler = async (request) => {
  // We should cache the build and the requestHandler
  // But then `fetch` is not working fully
  // login not working because it follows the responses

  // Do not remove the @ts-ignore (also don't replace with @ts-expect-error)
  // otherwise the pipeline will fail because `./build`
  // only exists when the server is build once

  // @ts-ignore
  const build = await import('./build');
  const handler = createRequestHandler(
    // @ts-ignore
    build,
    process.env.NODE_ENV === 'development' ? 'development' : 'production'
  );
  const response = await handler(request);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

export const withStaticDir =
  (requestHandler: RequestHandler) => async (request: Request) => {
    const url = new URL(request.url);

    if (url.pathname.length < 2) {
      return requestHandler(request);
    }

    const filePath = `public/${url.pathname}`;

    const file = Bun.file(filePath);
    if (await file.exists()) {
      const file = Bun.file(filePath);
      return new Response(file, {
        headers: {
          'Content-Type': file.type,
          'Cache-Control': 'public, max-age=31536000',
        },
      });
    }

    return requestHandler(request);
  };

export const withLogging =
  (requestHandler: RequestHandler) => (request: Request) => {
    const url = new URL(request.url);
    console.log(
      `[${request.method}] ${url.pathname} (${request.headers.get(
        'user-agent'
      )})`
    );
    return requestHandler(request);
  };

const bunServeOptions: ServeOptions = {
  fetch: withStaticDir(withLogging(requestHandler)),
  error: () => {
    return new Response(
      `Something went wrong. Sorry for that! Contact me by mail: hi@patwoz.de :)`
    );
  },
};

export default bunServeOptions;
