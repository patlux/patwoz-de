import { type ComponentProps, useState } from 'react'
import { Link, NavLink, type NavLinkProps } from '@remix-run/react'

import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import BriefcaseIcon from '@heroicons/react/24/outline/BriefcaseIcon'
import RocketLaunchIcon from '@heroicons/react/24/outline/RocketLaunchIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
// import QrCodeIcon from '@heroicons/react/24/outline/QrCodeIcon'
import PencilIcon from '@heroicons/react/24/outline/PencilIcon'

import { GithubIcon } from '~/icons/GithubIcon'
import { LinkedInIcon } from '~/icons/LinkedInIcon'
import { StackOverflowIcon } from '~/icons/StackOverflowIcon'
import { TwitterIcon } from '~/icons/TwitterIcon'
import { XingIcon } from '~/icons/XingIcon'
import { classNames } from '~/utils/classNames'

const MenuLinkTextIcon = ({
  initial,
  className,
}: {
  initial: string
  className?: string
}) => {
  return (
    <div
      className={classNames(
        'w-5 h-5 border border-black rounded-sm text-xs flex justify-center items-center',
        className,
      )}
    >
      {initial}
    </div>
  )
}

const MenuLink = ({ className, ...navLinkProps }: NavLinkProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <NavLink
      {...navLinkProps}
      className={({ isActive }) =>
        classNames(
          'flex gap-x-2 items-center',
          'rounded-md px-4 py-0.5',
          'text-sm leading-6 font-semibold',
          'text-black hover:bg-zinc-200',
          isActive && 'bg-black hover:bg-black/70 text-white',
          className,
        )
      }
    />
  )
}

const ExternalLinkIcon = () => (
  <>
    <div className="flex-1" />
    <ArrowTopRightOnSquareIcon className="w-4 opacity-20" />
  </>
)

export const Menu = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div className="xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div
        className={classNames(
          'flex grow flex-col xl:gap-y-5 overflow-y-auto',
          'bg-gray-50 px-6',
          'ring-1 ring-white/5',
          'border-b xl:border-b-0 xl:border-r border-gray-200',
          isOpen ? 'overflow-y-auto' : 'overflow-y-hidden',
        )}
      >
        <HeaderBar toggleMenu={() => setOpen((prev) => !prev)} />
        <Navigation
          className={classNames(
            'h-0 xl:h-auto xl:flex-1',
            isOpen && 'flex-1 pb-6',
          )}
        />
      </div>
    </div>
  )
}

export type HeaderBarProps = ComponentProps<'div'> & {
  toggleMenu: () => void
}

export const HeaderBar = ({
  toggleMenu,
  className,
  ...divProps
}: HeaderBarProps) => {
  return (
    <div
      {...divProps}
      className={classNames(
        'flex h-16 shrink-0 items-center justify-center relative',
        'xl:justify-start',
        className,
      )}
    >
      <button
        type="button"
        className="-m-2.5 p-2.5 text-black rounded-lg hover:bg-gray-200 absolute left-0 xl:hidden"
        onClick={toggleMenu}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
      </button>
      <Link to="/">
        <img
          src="/patwoz-logo-transparent-800px.png"
          alt="Logo of patwoz.de"
          width="60px"
        />
      </Link>
    </div>
  )
}

export const Navigation = ({
  className,
  ...navProps
}: ComponentProps<'nav'>) => {
  return (
    <nav {...navProps} className={classNames('flex flex-col', className)}>
      <ul className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul className="-mx-2 space-y-1">
            <MenuLink to="/" className="py-2">
              <HomeIcon className="w-4" />
              Introduction
            </MenuLink>
            <MenuLink to="/blog" className="py-2">
              <PencilIcon className="w-4" />
              Blog
            </MenuLink>
            <MenuLink to="/what-i-built" className="py-2">
              <BriefcaseIcon className="w-4" />
              What I Built
            </MenuLink>
            <MenuLink to="/what-i-use" className="py-2">
              <RocketLaunchIcon className="w-4" />
              What I Use
            </MenuLink>
          </ul>
        </li>
        {/* <li> */}
        {/*   <div className="text-xs font-semibold leading-6 text-gray-400 uppercase"> */}
        {/*     Tools */}
        {/*   </div> */}
        {/*   <ul className="-mx-2 mt-2 space-y-1"> */}
        {/*     <MenuLink to="/qr"> */}
        {/*       <QrCodeIcon className="w-5" /> */}
        {/*       QR-Code Generator */}
        {/*     </MenuLink> */}
        {/*   </ul> */}
        {/* </li> */}
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400 uppercase">
            Social
          </div>
          <ul className="-mx-2 mt-2 space-y-1">
            <MenuLink to="https://github.com/patlux">
              <GithubIcon className="w-5" />
              Github
              <ExternalLinkIcon />
            </MenuLink>
            <MenuLink to="https://stackoverflow.com/users/6300994/patrick-wozniak?tab=profile">
              <StackOverflowIcon className="w-5" />
              Stack Overflow
              <ExternalLinkIcon />
            </MenuLink>
            <MenuLink to="https://twitter.com/de_patwoz">
              <TwitterIcon className="w-5" />
              Twitter
              <ExternalLinkIcon />
            </MenuLink>
            <MenuLink to="https://www.thingiverse.com/patwoz">
              <MenuLinkTextIcon initial="3D" />
              Thingiverse
              <ExternalLinkIcon />
            </MenuLink>
          </ul>
        </li>
        <li>
          <div className="text-xs font-semibold leading-6 text-gray-400 uppercase">
            Business
          </div>
          <ul className="-mx-2 mt-2 space-y-1">
            <MenuLink
              to="mailto:hi@patwoz.de"
              className={classNames(
                'bg-gradient-to-r from-blue-500/80 via-blue-600/80 to-blue-700/80',
                'hover:bg-gradient-to-br',
                'focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800',
                'shadow-lg shadow-blue-500/20 dark:shadow-lg dark:shadow-blue-800/80',
                'text-white text-sm font-medium text-center',
                'rounded-lg',
                'py-2',
                'mb-4',
              )}
            >
              🔥 Hire me
            </MenuLink>
            <MenuLink to="https://de.linkedin.com/in/patrick-wozniak-696453123">
              <LinkedInIcon className="w-5" />
              LinkedIn
              <ExternalLinkIcon />
            </MenuLink>
            <MenuLink to="https://www.xing.com/profile/Patrick_Wozniak5">
              <XingIcon className="w-5" />
              Xing
              <ExternalLinkIcon />
            </MenuLink>

            <MenuLink to="https://www.freelance.de/Freiberufler/215868-Senior-TypeScript-Developer-ReactJS-React-Native/highlight=react">
              Freelance.de
              <ExternalLinkIcon />
            </MenuLink>
            <MenuLink to="https://www.freelancermap.de/freelancer-verzeichnis/profile/entwicklung/381396-profil-patrick-wozniak-senior-typescript-developer-reactjs-react-native-aus-schwaig.html">
              Freelancermap.de
              <ExternalLinkIcon />
            </MenuLink>
          </ul>
        </li>
      </ul>
    </nav>
  )
}
