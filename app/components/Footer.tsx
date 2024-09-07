import { Link } from '@remix-run/react'
import { type PropsWithChildren } from 'react'

export const Footer = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div role="separator" className="mt-12 mb-6 w-full h-px bg-gray-200" />
      <footer className="flex flex-1 flex-row justify-between text-sm text-gray-500">
        <span className="flex-1">
          © {new Date().getFullYear()} Patrick Wozniak
        </span>
        {children}
        <div className="flex flex-1 justify-end">
          <Link to="/imprint" className="underline">
            Imprint
          </Link>
        </div>
      </footer>
    </>
  )
}
