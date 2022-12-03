import * as fs from 'fs';
import * as path from 'path';
import type { ServeOptions } from 'bun';
import type { RequestHandler } from '@remix-run/node';
import type { ServerBuild } from '@remix-run/server-runtime';
import { createRequestHandler } from '@remix-run/server-runtime';

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

setInterval(() => {
  Bun.gc(true);
}, 9000);

const getBuild = async (): Promise<ServerBuild> => import('./build') as any as ServerBuild;

let prodRequestHandler: RequestHandler;

async function handler(request: Request): Promise<Response> {
  let requestHandler: RequestHandler;

  if (mode === 'production') {
    if (!prodRequestHandler) {
      prodRequestHandler = createRequestHandler(await getBuild(), mode);
    }
    requestHandler = prodRequestHandler;
  } else {
    const url = new URL(request.url);
    console.log(`${request.method.toUpperCase()} ${url.pathname}${url.search}`);
    requestHandler = createRequestHandler(await getBuild(), mode);
  }

  return requestHandler(request);
}

const withStaticDir =
  (staticDir: string) => (requestHandler: RequestHandler) => (request: Request) => {
    const file = tryServeStaticFile(staticDir, request);
    if (file) return file;
    return requestHandler(request);
  };

function tryServeStaticFile(staticDir: string, request: Request): Response | undefined {
  const url = new URL(request.url);

  if (url.pathname.length < 2) return undefined;

  const filePath = path.join(staticDir, url.pathname);

  if (fs.existsSync(filePath)) {
    const file = Bun.file(filePath);
    return new Response(file, {
      headers: {
        'Content-Type': file.type,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  }

  return undefined;
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const bunServeOptions: ServeOptions = {
  port,
  fetch: withStaticDir('public')(handler),
};

export default bunServeOptions;
