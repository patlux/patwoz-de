import { spawn, spawnSync } from 'bun'

export const getRandomFreePort = () => {
  const server = Bun.serve({ fetch: () => new Response('ok'), port: 0 })
  const port = server.port
  server.stop(true)
  return port
}

export const startServer = async () => {
  const port = getRandomFreePort()

  // Do not run "bun run dev" otherwise the server will not be killed
  // because we get the pid of the parent process and not from the sub process
  const proc = spawn(['bun', 'run', 'remix', 'vite:dev'], {
    env: {
      PATH: process.env.PATH,
      PORT: `${port}`,
    },
  })

  const waitUntilServerStarted = async () => {
    const td = new TextDecoder()
    // @ts-expect-error
    for await (const line of proc.stdout) {
      const lineStr = td.decode(line)
      if (lineStr.includes('Local')) {
        break
      }
    }
  }

  await waitUntilServerStarted()

  return {
    pid: proc.pid,
    port,
  }
}

export const killServer = (pid: number | null) => {
  if (pid == null) {
    throw new Error('Missing pid')
  }
  const result = spawnSync(['kill', '-9', `${pid}`])
  if (result.exitCode !== 0) {
    throw new Error(`Couldn't kill server with pid ${pid}.`)
  }
  console.log(`Killed ${pid}: "${result.exitCode}".`)
}
