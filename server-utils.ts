import * as fs from 'fs';
import * as path from 'path';
import type { RequestHandler } from 'remix-bun';

export const withStaticDir =
  (staticDir: string) => (requestHandler: RequestHandler) => (request: Request) => {
    const file = tryServeStaticFile(staticDir, request);
    if (file) return file;
    return requestHandler(request);
  };

export const tryServeStaticFile = (staticDir: string, request: Request): Response | undefined => {
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
};
