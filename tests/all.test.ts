import { beforeAll, expect, test } from 'bun:test'
import bun from 'bun'

beforeAll(() => {
  process.env.DB_PATH = ':memory:'
  process.env.PORT = '3005'
})

const createServer = async () => {
  const bunServeOptions = (await import('../server')).default
  const server = bun.serve(bunServeOptions)
  return server
}

test('Should open /', async () => {
  const server = await createServer()
  const req = new Request(`http://${server.hostname}:${server.port}/`)

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
  const req = new Request(`http://${server.hostname}:${server.port}/imprint`)
  const res = await server.fetch(req)
  expect(res.status).toBe(200)
})

test('Should throw 404 if page was not found', async () => {
  const server = await createServer()
  const req = new Request(`http://${server.hostname}:${server.port}/doesnt-exist`)
  const res = await server.fetch(req)
  expect(res.status).toBe(404)

  const html = await res.text()
  expect(html.includes('Views:')).toBe(false)
})
