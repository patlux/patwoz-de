import type { LinksFunction, MetaFunction } from 'remix';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, Link } from 'remix';

import appCssUrl from './styles/app.css';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: appCssUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: 'Patrick Wozniak: Software Engineer',
    description: 'Patrick Wozniak is a self-taught Software Engineer from Erlangen, Germany.',
    'og:url': 'https://patwoz.dev/',
    'og:title': 'Patrick Wozniak: Software Engineer',
    'og:description': 'Patrick Wozniak is a self-taught Software Engineer from Erlangen, Germany.',
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
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>Hey, developer, you should replace this with what you want your users to see.</p>
        </div>
      </Layout>
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
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
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
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="flex flex-col md:flex-row items-center mb-12">
        <a className="no-underline font-bold text-black text-center" href="/">
          <img src="/patwoz-logo-transparent-800px.png" alt="Logo of patwoz.de" width="125px" />
          <span className="sr-only">Patrick Wozniak</span>
        </a>
        <div className="flex flex-1 md:justify-end mt-2 md:mt-0">
          <a className="button font-black" href="/l/cv">
            📄 <span className="underline">cv</span>
          </a>
          <a className="button font-black ml-2" href="/l/mailto">
            📨 <span className="underline">mail</span>
          </a>
        </div>
      </nav>
      {children}
      <div role="separator" className="mt-12 mb-6 w-full h-px bg-gray-200" />
      <footer className="flex flex-1 flex-row text-sm text-gray-500">
        © {new Date().getFullYear()} Patrick Wozniak
        <div className="flex flex-1 justify-end">
          <Link to="/imprint" className="underline">
            Imprint
          </Link>
        </div>
      </footer>
    </>
  );
}
