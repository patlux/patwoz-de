import { afterAll, beforeAll, expect, test } from 'bun:test'
import { killServer, startServer } from './test-utils'

let pid: number | null = null
let port: number | null = null
let baseUrl: string

beforeAll(async () => {
  const server = await startServer()
  pid = server.pid
  port = server.port
  baseUrl = `http://localhost:${port}`
})

afterAll(() => {
  console.log(`KILL SERVER "${pid}".`)
  killServer(pid)
})

test('Should run server', async () => {
  const healthResponse = await fetch(new Request(`${baseUrl}/health`))
  expect(await healthResponse.text()).toBe('"OK"')
})

test('Should open /', async () => {
  const req = new Request(baseUrl)

  const res = await fetch(req)
  expect(res.status).toBe(200)

  const html = await res.text()
  expect(html).toContain('Views: <!-- -->1')

  const res2 = await fetch(req)
  const html2 = await res2.text()
  expect(html2).toContain('Views: <!-- -->2')
})

test('Should open /imprint', async () => {
  const req = new Request(`${baseUrl}/imprint`)
  const res = await fetch(req)
  expect(res.status).toBe(200)
})

test('Should throw 404 if page was not found', async () => {
  const req = new Request(`${baseUrl}/doesnt-exist`)
  const res = await fetch(req)
  expect(res.status).toBe(404)

  const html = await res.text()
  expect(html.includes('Views:')).toBe(false)
})

// test('Should build remix server', () => {
//   const response = bun.spawnSync(['bun', 'run', 'build:remix']);
//   expect(response.exitCode).toBe(0);
// });
