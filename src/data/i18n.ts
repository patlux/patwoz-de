export type Language = 'en' | 'de'

export type Localized = Record<Language, string>

export function isGermanPath(pathname: string): boolean {
  return pathname === '/de' || pathname.startsWith('/de/')
}

export function languageFromPath(pathname: string): Language {
  return isGermanPath(pathname) ? 'de' : 'en'
}

export function withLocale(lang: Language, path: string): string {
  if (lang === 'en') return path
  return path === '/' ? '/de' : `/de${path}`
}

export function switchLocalePath(pathname: string): string {
  if (isGermanPath(pathname)) {
    return pathname === '/de' ? '/' : pathname.replace(/^\/de\//, '/')
  }
  return pathname === '/' ? '/de' : `/de${pathname}`
}
