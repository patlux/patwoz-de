import type { ServeOptions } from 'bun'
import { z } from 'zod'
import type { ServerBuild } from '@remix-run/node'

import { createRequestHandler } from './server/remix-bun'
import { db } from '~/utils/db.server'
import { withLogging, withStaticDir } from './server/server-utils'
import { migrate } from './server/migrate'
import { migrations } from './server/migrations'

setInterval(() => Bun.gc(true), 9000)

migrate(db, migrations)

const port = z
  .string()
  .default('3000')
  .transform((v) => parseInt(v, 10))
  .parse(process.env.PORT)

// Otherwise the CI will fail because we don't create a build
// @ts-ignore
const getBuild = (): Promise<ServerBuild> => import('./build') as any

/**
 * For development
 */
const devHandler = async (request: Request): Promise<Response> => {
  const build = await getBuild()
  const requestHandler = createRequestHandler({ build, mode: 'development' })
  return requestHandler(request)
}

/**
 * For production
 */
const createProdHandler = () => {
  return async (request: Request): Promise<Response> => {
    // We should cache the build and the requestHandler
    // But then `fetch` is not working fully
    const build = await getBuild()
    const prodRequestHandler = createRequestHandler({ build, mode: 'production' })
    return prodRequestHandler(request)
  }
}

const bunServeOptions: ServeOptions = {
  port,
  fetch: withLogging()(
    withStaticDir('public')(
      process.env.NODE_ENV === 'development' ? devHandler : createProdHandler()
    )
  ),
}

export default bunServeOptions
