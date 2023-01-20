import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react';

import { BaseLayout } from './components/BaseLayout';
import appCssUrl from './styles/app.css';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: appCssUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: 'Patrick Wozniak: Software Engineer',
    description: 'Patrick Wozniak is a self-taught Software Engineer from Nuremberg, Germany.',
    'og:url': 'https://patwoz.dev/',
    'og:title': 'Patrick Wozniak: Software Engineer',
    'og:description': 'Patrick Wozniak is a self-taught Software Engineer from Nuremberg, Germany.',
    'og:image': 'https://patwoz.dev/me.jpg',
    'og:image:width': '512',
    'og:image:height': '512',
    'og:type': 'profile',
    'profile:first_name': 'Patrick',
    'profile:last_name': 'Wozniak',
    'profile:username': 'patwoz',
  };
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <BaseLayout enabledPageViews={false}>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
        </div>
      </BaseLayout>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <BaseLayout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </BaseLayout>
    </Document>
  );
}

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head prefix="og: https://ogp.me/ns#">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload port={8004} />}
      </body>
    </html>
  );
}
