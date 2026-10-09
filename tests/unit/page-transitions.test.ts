import { readFileSync } from 'node:fs'
import { describe, expect, test } from 'bun:test'

type Tab = { path: string; prefix: boolean }
type Block = {
  index: number
  kind: 'text' | 'chip' | 'frame'
  tag: string
  top: number
}
type Note = {
  from: string
  to: string | null
  morph: 'in' | 'out' | null
  kinds: Array<'logo' | 'title'>
  at: number
  blocks?: Block[]
  scrollY?: number
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
  isLangSwitch: (from: string, to: string) => boolean
  pairBlocks: (
    before: readonly Block[],
    after: readonly Block[],
    maxShift: number,
  ) => Block[]
  refocusDelay: (rank: number) => number
  parentPath: (path: string) => string
  readNote: (raw: string | null, here: string, now: number) => Note | null
  parseTabs: (raw: string | undefined) => Tab[]
}

const helperNames = [
  'cleanPath',
  'stripLocale',
  'tabIndex',
  'slideType',
  'isLangSwitch',
  'pairBlocks',
  'refocusDelay',
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

  test('the same page in the other language is a language switch', () => {
    expect(helpers.slideType('/work/abl', '/de/work/abl', tabs, 0)).toBe('lang')
    expect(helpers.slideType('/de', '/', tabs, 0)).toBe('lang')
  })

  test('ignores trailing slashes', () => {
    expect(helpers.slideType('/work/', '/work', tabs, 0)).toBe('lang')
  })
})

describe('isLangSwitch', () => {
  test('pairs a page with its counterpart in the other language', () => {
    expect(helpers.isLangSwitch('/de', '/')).toBe(true)
    expect(helpers.isLangSwitch('/work/abl', '/de/work/abl/')).toBe(true)
  })

  test('ignores reloads and other pages', () => {
    expect(helpers.isLangSwitch('/work/', '/work')).toBe(false)
    expect(helpers.isLangSwitch('/de/work', '/work/abl')).toBe(false)
    expect(helpers.isLangSwitch('/de/blog', '/de')).toBe(false)
  })
})

describe('pairBlocks', () => {
  const block = (
    index: number,
    top: number,
    kind: Block['kind'] = 'text',
    tag = 'p',
  ): Block => ({ index, kind, tag, top })

  test('keeps the new position of blocks with a partner', () => {
    expect(
      helpers.pairBlocks(
        [block(0, 100), block(3, 300, 'frame', 'div')],
        [block(0, 100), block(3, 282, 'frame', 'div')],
        240,
      ),
    ).toEqual([block(0, 100), block(3, 282, 'frame', 'div')])
  })

  test('drops blocks whose partner differs or moved too far', () => {
    expect(
      helpers.pairBlocks(
        [block(0, 100), block(1, 140), block(2, 180), block(4, 400)],
        [block(0, 100, 'chip'), block(1, 140, 'text', 'h2'), block(2, 500)],
        240,
      ),
    ).toEqual([])
  })
})

describe('refocusDelay', () => {
  test('staggers 12 ms per block after 30 ms, at most seven steps', () => {
    expect(helpers.refocusDelay(0)).toBe(30)
    expect(helpers.refocusDelay(1)).toBe(42)
    expect(helpers.refocusDelay(7)).toBe(114)
    expect(helpers.refocusDelay(20)).toBe(114)
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

  test('accepts the blocks and scroll position of a language switch', () => {
    const lang: Note = {
      from: '/de',
      to: '/',
      morph: null,
      kinds: [],
      at: 1000,
      blocks: [{ index: 2, kind: 'chip', tag: 'a', top: 480 }],
      scrollY: 120,
    }
    expect(helpers.readNote(JSON.stringify(lang), '/', 1500)).toEqual(lang)
    expect(
      helpers.readNote(
        JSON.stringify({ ...lang, blocks: [{ index: -1, kind: 'text' }] }),
        '/',
        1500,
      ),
    ).toBeNull()
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
