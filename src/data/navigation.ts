import type { Language, Localized } from './i18n'
import { withLocale } from './i18n'

export type NavItem = {
  label: Localized
  path: string
  /** Match the current pathname as a prefix instead of exactly. */
  prefix?: boolean
}

export const navigation: NavItem[] = [
  { label: { en: 'Introduction', de: 'Über mich' }, path: '/' },
  { label: { en: 'Work', de: 'Referenzen' }, path: '/work', prefix: true },
  { label: { en: 'Skills', de: 'Kompetenzen' }, path: '/skills', prefix: true },
  { label: { en: 'Blog', de: 'Blog' }, path: '/blog', prefix: true },
  {
    label: { en: 'What I Built', de: 'Was ich gebaut habe' },
    path: '/what-i-built',
  },
  { label: { en: 'What I Use', de: 'Was ich nutze' }, path: '/what-i-use' },
]

export function isActiveNavItem(
  item: NavItem,
  lang: Language,
  pathname: string,
): boolean {
  const href = withLocale(lang, item.path)
  if (item.prefix) return pathname === href || pathname.startsWith(`${href}/`)
  return pathname === href || pathname === `${href}/`
}

export type ContactLink = {
  label: Localized
  value: string
  href: string
  kind: 'copy' | 'external' | 'primary'
}

export function contactLinks(lang: Language): ContactLink[] {
  return [
    {
      label: { en: 'Email', de: 'E-Mail' },
      value: 'hi@patwoz.de',
      href: 'mailto:hi@patwoz.de',
      kind: 'copy',
    },
    {
      label: { en: 'Project', de: 'Projekt' },
      value: lang === 'de' ? 'Kontaktformular' : 'Contact form',
      href: withLocale(lang, '/contact'),
      kind: 'primary',
    },
    {
      label: { en: 'LinkedIn', de: 'LinkedIn' },
      value: 'de.linkedin.com/in/patrick-wozniak-696453123',
      href: 'https://de.linkedin.com/in/patrick-wozniak-696453123',
      kind: 'external',
    },
    {
      label: { en: 'GitHub', de: 'GitHub' },
      value: 'github.com/patlux',
      href: 'https://github.com/patlux',
      kind: 'external',
    },
    {
      label: { en: 'X', de: 'X' },
      value: 'x.com/patwoz',
      href: 'https://x.com/patwoz',
      kind: 'external',
    },
  ]
}

export const moreLinks: { label: string; href: string }[] = [
  { label: 'Xing', href: 'https://www.xing.com/profile/Patrick_Wozniak5' },
  {
    label: 'Freelance.de',
    href: 'https://www.freelance.de/Freiberufler/215868-Senior-TypeScript-Developer-ReactJS-React-Native/highlight=react',
  },
  {
    label: 'Freelancermap.de',
    href: 'https://www.freelancermap.de/freelancer-verzeichnis/profile/entwicklung/381396-profil-patrick-wozniak-senior-typescript-developer-reactjs-react-native-aus-schwaig.html',
  },
  {
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/6300994/patrick-wozniak?tab=profile',
  },
  { label: 'Thingiverse', href: 'https://www.thingiverse.com/patwoz' },
]
