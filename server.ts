import type { ServeOptions } from 'bun';
import { createRequestHandler } from 'remix-bun';
import { db } from '~/utils/db.server';
import { withStaticDir } from './server/server-utils';
import { migrate } from './server/migrate';
import { migrations } from './server/migrations';

setInterval(() => Bun.gc(true), 9000);

console.log(`-- MIGRATIONS START --`);
migrate(db, migrations);
console.log('-- MIGRATIONS DONE --');

const bunServeOptions: ServeOptions = {
  port: parseInt(process.env.PORT ?? '3000', 10),
  fetch: withStaticDir('public')(
    process.env.NODE_ENV === 'production'
      ? createRequestHandler({
          build: require('./build'),
          mode: 'production',
        })
      : async (request: Request) => {
          const build = require('./build');
          const requestHandler = createRequestHandler({ build, mode: 'development' });
          return requestHandler(request);
        }
  ),
};

export default bunServeOptions;
