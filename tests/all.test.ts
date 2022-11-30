import { expect, test } from 'bun:test';

test('Should open /', async () => {
  process.env.PORT = '3005';
  const { server } = await import('../server');
  const req = new Request(`http://${server.hostname}:${server.port}/`);
  const res = await server.fetch(req);
  expect(res.status).toBe(200);
});

test('Should open /imprint', async () => {
  process.env.PORT = '3006';
  const { server } = await import('../server');
  const req = new Request(`http://${server.hostname}:${server.port}/imprint`);
  const res = await server.fetch(req);
  expect(res.status).toBe(200);
});

test('Should throw 404 if page was not found', async () => {
  process.env.PORT = '3007';
  const { server } = await import('../server');
  const req = new Request(`http://${server.hostname}:${server.port}/doesnt-exist`);
  const res = await server.fetch(req);
  expect(res.status).toBe(404);
});

const redirects = [
  {
    route: '/l/cv',
    target:
      'https://www.freelance.de/Freiberufler/215868-Senior-TypeScript-Developer-ReactJS-React-Native/highlight=react',
  },
  {
    route: '/l/github',
    target: 'https://github.com/patlux',
  },
  {
    route: '/l/mailto',
    target: 'mailto:hi@patwoz.de',
  },
  {
    route: '/l/stackoverflow',
    target: 'https://stackoverflow.com/users/6300994/patrick-wozniak?tab=profile',
  },
  {
    route: '/l/thingiverse',
    target: 'https://www.thingiverse.com/patwoz',
  },
  {
    route: '/l/twitter',
    target: 'https://twitter.com/de_patwoz',
  },
  {
    route: '/l/xing',
    target: 'https://www.xing.com/profile/Patrick_Wozniak5',
  },
];

for (const red of redirects) {
  test(`Should redirect from ${red.route} to ${new URL(red.target).hostname}`, async () => {
    process.env.PORT = '3005';
    const { server } = await import('../server');
    const req = new Request(`http://${server.hostname}:${server.port}${red.route}`);
    const res = await server.fetch(req);
    expect(res.status).toBe(302);
    expect(res.headers.get('location')).toBe(red.target);
  });
}
