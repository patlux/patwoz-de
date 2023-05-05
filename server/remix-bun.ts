import type { ServerBuild, AppLoadContext } from '@remix-run/server-runtime'
import { createRequestHandler as createRemixRequestHandler } from '@remix-run/server-runtime'

export type GetLoadContextFunction = (request: Request) => AppLoadContext
export type RequestHandler = (request: Request) => Promise<Response>

export const createRequestHandler = ({
  build,
  getLoadContext,
  mode,
}: {
  build: ServerBuild
  getLoadContext?: GetLoadContextFunction
  mode?: string
}): RequestHandler => {
  const handleRequest = createRemixRequestHandler(build, mode)
  return async (request: Request): Promise<Response> => {
    const loadContext = getLoadContext?.(request)
    const response = await handleRequest(request, loadContext)
    return response
  }
}
