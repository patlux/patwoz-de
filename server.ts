import type { ServeOptions } from 'bun';
import { createRequestHandler, logDevReady } from '@remix-run/server-runtime';
import { migrate } from 'bun-sqlite-migrations';

import { db } from '~/utils/db.server';
import { getGitCommitHash } from '~/utils/git.server' assert { type: 'macro' };

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

// Otherwise the CI will fail because we don't create a build
// @ts-ignore
let build: ServerBuild = await import('./build/index.js');

if (process.env.NODE_ENV === 'development') {
  logDevReady(build);
}

const bunServeOptions: ServeOptions = {
  fetch: async (request) => {
    const url = new URL(request.url);

    if (url.pathname === '/version') {
      return Promise.resolve(new Response(getGitCommitHash()));
    }

    console.log(
      `[${request.method}] ${url.pathname} (${request.headers.get(
        'user-agent',
      )})`,
    );

    const filePath = 'public' + url.pathname;
    try {
      const file = Bun.file(filePath);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            'Content-Type': file.type,
            'Cache-Control': 'public, max-age=31536000',
          },
        });
      }
    } catch (error) {
      console.error(
        `ERROR in serving static file "${filePath}":`,
        { filePath, pathname: url.pathname },
        error,
      );
    }

    // We should cache the build and the requestHandler
    // But then `fetch` is not working fully
    // login not working because it follows the responses

    // Do not remove the @ts-ignore (also don't replace with @ts-expect-error)
    // otherwise the pipeline will fail because `./build`
    // only exists when the server is build once

    // @ts-ignore
    let build: ServerBuild = await import('./build/index.js');
    const handler = createRequestHandler(build, process.env.NODE_ENV);

    const response = await handler(request);
    response.headers.set('X-GIT-HASH', getGitCommitHash());

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  },
  error: () => {
    return new Response(
      `Something went wrong. Sorry for that! Contact me by mail: hi@patwoz.de :)`,
    );
  },
};

export default bunServeOptions;
