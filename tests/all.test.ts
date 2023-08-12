import { beforeAll, expect, test } from 'bun:test';
import bun from 'bun';

beforeAll(() => {
  process.env.PORT = '3005';
});

const createServer = async () => {
  const bunServeOptions = (await import('../server')).default;
  const server = bun.serve(bunServeOptions);
  return server;
};

test('Should build remix server', () => {
  const response = bun.spawnSync(['bun', 'run', 'build:remix']);
  expect(response.exitCode).toBe(0);
});

let server: bun.Server;
let baseUrl: string;

test('Should run server', async () => {
  server = await createServer();
  baseUrl = `http://${server.hostname}:${server.port}`;
  expect(baseUrl).toBe('http://0.0.0.0:3005');

  const healthResponse = await server.fetch(new Request(`${baseUrl}/health`));
  expect(await healthResponse.text()).toBe('"OK"');
});

test('Should open /', async () => {
  const req = new Request(baseUrl);

  const res = await server.fetch(req);
  expect(res.status).toBe(200);

  const html = await res.text();
  expect(html).toContain('Views: <!-- -->2');

  const res2 = await server.fetch(req);
  const html2 = await res2.text();
  expect(html2).toContain('Views: <!-- -->3');
});

test('Should open /imprint', async () => {
  const server = await createServer();
  const req = new Request(`${baseUrl}/imprint`);
  const res = await server.fetch(req);
  expect(res.status).toBe(200);
});

test('Should throw 404 if page was not found', async () => {
  const server = await createServer();
  const req = new Request(
    `http://${server.hostname}:${server.port}/doesnt-exist`
  );
  const res = await server.fetch(req);
  expect(res.status).toBe(404);

  const html = await res.text();
  expect(html.includes('Views:')).toBe(false);
});
