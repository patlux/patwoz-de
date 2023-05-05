import type { PropsWithChildren } from 'react'
import { Link } from '@remix-run/react'
import { PageViewCounter } from './PageViewCounter'

export type BaseLayoutProps = {
  enabledPageViews?: boolean
}

export const BaseLayout = ({
  children,
  enabledPageViews = true,
}: PropsWithChildren<BaseLayoutProps>) => {
  return (
    <>
      <nav className="flex flex-col md:flex-row items-center mb-12">
        <a className="no-underline font-bold text-black text-center" href="/">
          <img src="/patwoz-logo-transparent-800px.png" alt="Logo of patwoz.de" width="125px" />
          <span className="sr-only">Patrick Wozniak</span>
        </a>
        <div className="flex flex-1 md:justify-end mt-2 md:mt-0">
          <a
            className="button font-black"
            href="https://www.freelance.de/Freiberufler/215868-Senior-TypeScript-Developer-ReactJS-React-Native/highlight=react"
          >
            📄 <span className="underline">cv</span>
          </a>
          <a className="button font-black ml-2" href="mailto:hi@patwoz.de">
            📨 <span className="underline">mail</span>
          </a>
        </div>
      </nav>
      {children}
      <div role="separator" className="mt-12 mb-6 w-full h-px bg-gray-200" />
      <footer className="flex flex-1 flex-row justify-between text-sm text-gray-500">
        <span className="flex-1">© {new Date().getFullYear()} Patrick Wozniak</span>
        {enabledPageViews && <PageViewCounter />}
        <div className="flex flex-1 justify-end">
          <Link to="/imprint" className="underline">
            Imprint
          </Link>
        </div>
      </footer>
    </>
  )
}
