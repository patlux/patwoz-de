import type { ServeOptions } from 'bun'
import { createRequestHandler } from './server/remix-bun'
import { db } from '~/utils/db.server'
import { withLogging, withStaticDir } from './server/server-utils'
import { migrate } from './server/migrate'
import { migrations } from './server/migrations'
import { z } from 'zod'

setInterval(() => Bun.gc(true), 9000)

migrate(db, migrations)

const port = z
  .string()
  .default('3000')
  .transform((v) => parseInt(v, 10))
  .parse(process.env.PORT)

const bunServeOptions: ServeOptions = {
  port,
  fetch: withStaticDir('public')(
    withLogging()(
      process.env.NODE_ENV === 'production'
        ? createRequestHandler({
            build: require('./build'),
            mode: 'production',
          })
        : async (request: Request) => {
            const build = require('./build')
            const requestHandler = createRequestHandler({ build, mode: 'development' })
            return requestHandler(request)
          }
    )
  ),
}

export default bunServeOptions
