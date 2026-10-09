import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'bun:test'

type Tab = { path: string; prefix: boolean }
type Note = {
  from: string
  to: string | null
  morph: 'in' | 'out' | null
  kinds: Array<'logo' | 'title'>
  at: number
}

type PageTransitionHelpers = {
  cleanPath: (pathname: string) => string
  stripLocale: (path: string) => string
  tabIndex: (path: string, tabs: readonly Tab[]) => number
  slideType: (
    from: string,
    to: string,
    tabs: readonly Tab[],
    historyDelta: number,
  ) => 'forward' | 'back' | 'lang'
  parentPath: (path: string) => string
  readNote: (raw: string | null, here: string, now: number) => Note | null
  parseTabs: (raw: string | undefined) => Tab[]
}

const helperNames = [
  'cleanPath',
  'stripLocale',
  'tabIndex',
  'slideType',
  'parentPath',
  'readNote',
  'parseTabs',
] as const

function isHelpers(value: unknown): value is PageTransitionHelpers {
  return (
    typeof value === 'object' &&
    value !== null &&
    helperNames.every((name) => typeof Reflect.get(value, name) === 'function')
  )
}

/** The inline script evaluates to its helpers when no window exists. */
function loadHelpers(): PageTransitionHelpers {
  const source = readFileSync(
    new URL('../../src/scripts/page-transitions.js', import.meta.url),
    'utf8',
  )
  const result: unknown = (0, eval)(source)
  if (!isHelpers(result)) throw new Error('Script does not expose its helpers')
  return result
}

const helpers = loadHelpers()

const tabs: Tab[] = [
  { path: '/', prefix: false },
  { path: '/work', prefix: true },
  { path: '/skills', prefix: true },
  { path: '/blog', prefix: true },
  { path: '/what-i-built', prefix: false },
  { path: '/what-i-use', prefix: false },
]

describe('slideType', () => {
  test('follows the order of the tab bar', () => {
    expect(helpers.slideType('/', '/work', tabs, 0)).toBe('forward')
    expect(helpers.slideType('/skills', '/work', tabs, 0)).toBe('back')
    expect(helpers.slideType('/what-i-use', '/', tabs, 0)).toBe('back')
  })

  test('uses the tab order in both languages', () => {
    expect(helpers.slideType('/de/work', '/de/blog', tabs, 0)).toBe('forward')
    expect(helpers.slideType('/de/blog', '/de', tabs, 0)).toBe('back')
  })

  test('keeps the spatial order on browser back', () => {
    expect(helpers.slideType('/work', '/skills', tabs, -1)).toBe('forward')
  })

  test('detail pages slide deeper and back inside their tab', () => {
    expect(helpers.slideType('/work', '/work/stroeer', tabs, 0)).toBe('forward')
    expect(helpers.slideType('/work/ibm/bonus', '/work/ibm', tabs, 0)).toBe(
      'back',
    )
  })

  test('detail pages of another tab follow the tab order', () => {
    expect(helpers.slideType('/', '/work/stroeer', tabs, 0)).toBe('forward')
    expect(helpers.slideType('/blog/post', '/skills/react', tabs, 0)).toBe(
      'back',
    )
  })

  test('pages outside the tab bar sit right of the last tab', () => {
    expect(helpers.slideType('/what-i-use', '/imprint', tabs, 0)).toBe(
      'forward',
    )
    expect(helpers.slideType('/de/datenschutz', '/de/work', tabs, 0)).toBe(
      'back',
    )
  })

  test('siblings at the same depth use the history direction', () => {
    expect(helpers.slideType('/blog/a', '/blog/b', tabs, 1)).toBe('forward')
    expect(helpers.slideType('/blog/b', '/blog/a', tabs, -1)).toBe('back')
    expect(helpers.slideType('/imprint', '/privacy', tabs, 0)).toBe('forward')
  })

  test('the same page in the other language only cross-fades', () => {
    expect(helpers.slideType('/work/abl', '/de/work/abl', tabs, 0)).toBe('lang')
    expect(helpers.slideType('/de', '/', tabs, 0)).toBe('lang')
  })

  test('ignores trailing slashes', () => {
    expect(helpers.slideType('/work/', '/work', tabs, 0)).toBe('lang')
  })
})

describe('parentPath', () => {
  test('returns the list of a detail page', () => {
    expect(helpers.parentPath('/work/stroeer')).toBe('/work')
    expect(helpers.parentPath('/de/work/ibm/bonus/')).toBe('/de/work/ibm')
    expect(helpers.parentPath('/blog')).toBe('/')
  })
})

describe('readNote', () => {
  const note: Note = {
    from: '/work',
    to: '/work/stroeer',
    morph: 'in',
    kinds: ['logo'],
    at: 1000,
  }

  test('accepts a fresh note for this page', () => {
    expect(
      helpers.readNote(JSON.stringify(note), '/work/stroeer', 1500),
    ).toEqual(note)
  })

  test('accepts a note without a known target', () => {
    const open = { ...note, to: null, morph: null, kinds: [] }
    expect(helpers.readNote(JSON.stringify(open), '/skills', 1500)).toEqual(
      open,
    )
  })

  test('rejects notes for another page, stale notes and invalid data', () => {
    expect(helpers.readNote(JSON.stringify(note), '/work/abl', 1500)).toBeNull()
    expect(
      helpers.readNote(JSON.stringify(note), '/work/stroeer', 20_000),
    ).toBeNull()
    expect(helpers.readNote('{', '/work/stroeer', 1500)).toBeNull()
    expect(
      helpers.readNote(
        JSON.stringify({ ...note, kinds: ['icon'] }),
        '/work/stroeer',
        1500,
      ),
    ).toBeNull()
  })
})

describe('parseTabs', () => {
  test('reads the tab order from the script attribute', () => {
    expect(helpers.parseTabs(JSON.stringify(tabs))).toEqual(tabs)
    expect(helpers.parseTabs('[{"path":"/work"},{"label":"x"}]')).toEqual([
      { path: '/work', prefix: false },
    ])
    expect(helpers.parseTabs(undefined)).toEqual([])
    expect(helpers.parseTabs('nope')).toEqual([])
  })
})
