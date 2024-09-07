import { expect, test } from 'bun:test'
import bun from 'bun'

const createServer = async () => {
  const bunServeOptions = (await import('../../server')).default
  const server = bun.serve({
    port: 0, // random free port
    ...bunServeOptions,
  })
  return server
}

test('Should build remix server', () => {
  const response = bun.spawnSync(['bun', 'run', 'build:remix'])
  expect(response.exitCode).toBe(0)
})

let server: bun.Server
let baseUrl: string

test('Should run server', async () => {
  server = await createServer()
  baseUrl = `http://${server.hostname}:${server.port}`

  const healthResponse = await server.fetch(new Request(`${baseUrl}/health`))
  expect(await healthResponse.text()).toBe('"OK"')
})

test('Should open /', async () => {
  const req = new Request(baseUrl)

  const res = await server.fetch(req)
  expect(res.status).toBe(200)

  const html = await res.text()
  expect(html).toContain('Views: <!-- -->1')

  const res2 = await server.fetch(req)
  const html2 = await res2.text()
  expect(html2).toContain('Views: <!-- -->2')
})

test('Should open /imprint', async () => {
  const server = await createServer()
  const req = new Request(`${baseUrl}/imprint`)
  const res = await server.fetch(req)
  expect(res.status).toBe(200)
})

test('Should throw 404 if page was not found', async () => {
  const server = await createServer()
  const req = new Request(
    `http://${server.hostname}:${server.port}/doesnt-exist`,
  )
  const res = await server.fetch(req)
  expect(res.status).toBe(404)

  const html = await res.text()
  expect(html.includes('Views:')).toBe(false)
})
