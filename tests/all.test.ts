import { expect, test } from 'bun:test';
import bun from 'bun';

test('Should open /', async () => {
  process.env.PORT = '3005';
  const bunServeOptions = (await import('../server')).default;
  const server = bun.serve(bunServeOptions);
  const req = new Request(`http://${server.hostname}:${server.port}/`);
  const res = await server.fetch(req);
  expect(res.status).toBe(200);
});

test('Should open /imprint', async () => {
  process.env.PORT = '3006';
  const bunServeOptions = (await import('../server')).default;
  const server = bun.serve(bunServeOptions);
  const req = new Request(`http://${server.hostname}:${server.port}/imprint`);
  const res = await server.fetch(req);
  expect(res.status).toBe(200);
});

test('Should throw 404 if page was not found', async () => {
  process.env.PORT = '3007';
  const bunServeOptions = (await import('../server')).default;
  const server = bun.serve(bunServeOptions);
  const req = new Request(`http://${server.hostname}:${server.port}/doesnt-exist`);
  const res = await server.fetch(req);
  expect(res.status).toBe(404);
});
