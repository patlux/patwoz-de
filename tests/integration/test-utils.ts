import { spawn, spawnSync } from 'bun'

const SERVER_START_TIMEOUT_MS = 10_000
const SERVER_POLL_INTERVAL_MS = 100

export const getRandomFreePort = () => {
  const server = Bun.serve({ fetch: () => new Response('ok'), port: 0 })
  const port = server.port
  server.stop(true)
  return port
}

const sleep = (milliseconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

const waitUntilServerStarted = async (baseUrl: string) => {
  const startedAt = Date.now()

  while (Date.now() - startedAt < SERVER_START_TIMEOUT_MS) {
    try {
      const response = await fetch(baseUrl)
      await response.arrayBuffer()
      return
    } catch {
      await sleep(SERVER_POLL_INTERVAL_MS)
    }
  }

  throw new Error(
    `Server did not start at ${baseUrl} within ${SERVER_START_TIMEOUT_MS}ms`,
  )
}

export const startServer = async () => {
  const port = getRandomFreePort()

  // Do not run "bun run dev" otherwise the server will not be killed
  // because we get the pid of the parent process and not from the sub process
  const proc = spawn(
    ['bun', 'run', 'astro', 'dev', '--host', '127.0.0.1', '--port', `${port}`],
    {
      env: {
        PATH: process.env.PATH,
      },
      stdout: null,
      stderr: 'inherit',
    },
  )

  await waitUntilServerStarted(`http://127.0.0.1:${port}`)

  return {
    pid: proc.pid,
    port,
  }
}

export const killServer = (pid: number | null) => {
  if (pid == null) {
    return
  }

  const result = spawnSync(['kill', '-9', `${pid}`])
  if (result.exitCode !== 0) {
    console.warn(`Server process ${pid} was already stopped.`)
  }
}
