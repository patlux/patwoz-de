import type { LinksFunction, V2_MetaFunction } from '@remix-run/node'
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react'

import { BaseLayout } from './components/BaseLayout'
import appCssUrl from './styles/app.css'

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: appCssUrl }]
}

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: 'Patrick Wozniak: Software Engineer',
    },
    {
      name: 'description',
      content: 'Patrick Wozniak is a self-taught Software Engineer from Nuremberg, Germany.',
    },
    { property: 'og:url', content: 'https://patwoz.dev/' },
    { property: 'og:title', content: 'Patrick Wozniak: Software Engineer' },
    {
      property: 'og:description',
      content: 'Patrick Wozniak is a self-taught Software Engineer from Nuremberg, Germany.',
    },
    { property: 'og:image', content: 'https://patwoz.dev/me.jpg' },
    { property: 'og:image:width', content: '512' },
    { property: 'og:image:height', content: '512' },
    { property: 'og:type', content: 'profile' },
    { property: 'profile:first_name', content: 'Patrick' },
    { property: 'profile:last_name', content: 'Wozniak' },
    { property: 'profile:username', content: 'patwoz' },
  ]
}

export default function Root() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    let message
    switch (error.status) {
      case 401:
        message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>
        break
      case 404:
        message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>
        break

      default:
        throw new Error(error.data || error.statusText)
    }

    return (
      <Document title={`${error.status} ${error.statusText}`}>
        <BaseLayout>
          <h1>
            {error.status}: {error.statusText}
          </h1>
          {message}
        </BaseLayout>
      </Document>
    )
  }

  return (
    <Document title="Error!">
      <BaseLayout>
        <div>
          <h1>There was an error</h1>
          <p>{error instanceof Error ? error.message : `${error}`}</p>
        </div>
      </BaseLayout>
    </Document>
  )
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
  )
}
