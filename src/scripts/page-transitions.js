// @ts-check
/**
 * Cross-document page transitions.
 *
 * Runs inline in the <head> of every page, before the first render, so that
 * `pagereveal` can still choose the transition of the new page:
 *
 * - morph-in / morph-out: a list item and its detail page share their logo or
 *   title ([data-vt] inside the clicked link, [data-vt-hero] on the detail
 *   page). Only these two elements get a view-transition name.
 * - forward / back: every other navigation slides in the order of the tab
 *   bar. Pages outside the tab bar sit to the right of the last tab.
 * - lang: the same page in the other language. Header and images stay; text
 *   blocks, chips and boxes in view keep their own layer, so the text
 *   refocuses in place and the layout glides where lines wrap differently.
 *   The new page keeps the scroll position of the old one.
 *
 * The old page leaves a short note in sessionStorage during `pageswap`, the
 * new page reads it during `pagereveal` and sets `data-page-transition` on
 * <html>. The motion itself lives in global.css.
 *
 * The script evaluates to its pure helpers so unit tests can use them
 * without a DOM.
 */
;(function pageTransitions(maybeWindow) {
  'use strict'

  /** @typedef {{ path: string, prefix: boolean }} Tab */
  /** @typedef {'logo' | 'title'} Kind */
  /** @typedef {'in' | 'out'} Morph */
  /** @typedef {'morph-in' | 'morph-out' | 'forward' | 'back' | 'lang'} TransitionType */
  /** @typedef {'text' | 'chip' | 'frame'} BlockKind */
  /**
   * A text block, chip or box of the page content, numbered in document
   * order, with its distance from the top of the viewport.
   * @typedef {object} Block
   * @property {number} index
   * @property {BlockKind} kind
   * @property {string} tag
   * @property {number} top
   */
  /**
   * @typedef {object} Note
   * @property {string} from
   * @property {string | null} to
   * @property {Morph | null} morph
   * @property {Kind[]} kinds
   * @property {number} at
   * @property {Block[]} [blocks] language switch: named blocks of the old page
   * @property {number} [scrollY] language switch: scroll position to keep
   */
  /** @typedef {{ finished: Promise<unknown> }} Transition */

  const NOTE_KEY = 'page-transition'
  const ORIGINS_KEY = 'page-transition-origins'
  const NOTE_MAX_AGE_MS = 10000
  const CLICK_MAX_AGE_MS = 2000
  const MAX_ORIGINS = 30
  /** @type {readonly Kind[]} */
  const KINDS = ['logo', 'title']
  /** Language switch: at most this many blocks get their own layer. */
  const MAX_BLOCKS = 48
  /** Blocks that moved further than this between the languages stay in the page snapshot. */
  const MAX_BLOCK_SHIFT = 240
  const REFOCUS_DELAY_MS = 30
  const REFOCUS_STAGGER_MS = 12
  const REFOCUS_STAGGER_STEPS = 7

  /** @param {unknown} value @returns {value is object} */
  function isObject(value) {
    return typeof value === 'object' && value !== null
  }

  /** @param {unknown} value @returns {value is Kind} */
  function isKind(value) {
    return value === 'logo' || value === 'title'
  }

  /** @param {unknown} value @returns {value is BlockKind} */
  function isBlockKind(value) {
    return value === 'text' || value === 'chip' || value === 'frame'
  }

  /** @param {unknown} value @returns {value is Block} */
  function isBlock(value) {
    if (!isObject(value)) return false
    const index = Reflect.get(value, 'index')
    const top = Reflect.get(value, 'top')
    return (
      typeof index === 'number' &&
      Number.isInteger(index) &&
      index >= 0 &&
      isBlockKind(Reflect.get(value, 'kind')) &&
      typeof Reflect.get(value, 'tag') === 'string' &&
      typeof top === 'number' &&
      Number.isFinite(top)
    )
  }

  /** Pathname without a trailing slash. @param {string} pathname */
  function cleanPath(pathname) {
    return pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname
  }

  /** Path without the German locale prefix. @param {string} path */
  function stripLocale(path) {
    if (path === '/de') return '/'
    return path.startsWith('/de/') ? path.slice(3) : path
  }

  /**
   * Position of a path in the tab bar. Pages outside the tab bar sit to the
   * right of the last tab.
   * @param {string} path
   * @param {readonly Tab[]} tabs
   */
  function tabIndex(path, tabs) {
    const index = tabs.findIndex((tab) =>
      tab.prefix
        ? path === tab.path || path.startsWith(`${tab.path}/`)
        : path === tab.path,
    )
    return index === -1 ? tabs.length : index
  }

  /** @param {string} path */
  function depth(path) {
    return path.split('/').filter(Boolean).length
  }

  /**
   * Transition for a navigation without shared elements.
   * @param {string} from
   * @param {string} to
   * @param {readonly Tab[]} tabs
   * @param {number} historyDelta change of the session-history index, 0 if unknown
   * @returns {'forward' | 'back' | 'lang'}
   */
  function slideType(from, to, tabs, historyDelta) {
    const a = stripLocale(cleanPath(from))
    const b = stripLocale(cleanPath(to))
    if (a === b) return 'lang'

    const i = tabIndex(a, tabs)
    const j = tabIndex(b, tabs)
    if (i !== j) return j > i ? 'forward' : 'back'

    const depthA = depth(a)
    const depthB = depth(b)
    if (depthA !== depthB) return depthB > depthA ? 'forward' : 'back'

    return historyDelta < 0 ? 'back' : 'forward'
  }

  /**
   * Whether `to` is the same page as `from` in the other language.
   * @param {string} from
   * @param {string} to
   */
  function isLangSwitch(from, to) {
    const a = cleanPath(from)
    const b = cleanPath(to)
    return a !== b && stripLocale(a) === stripLocale(b)
  }

  /**
   * Language switch: pairs the named blocks of the old page with the blocks
   * of the new page. A pair has the same position in document order, the
   * same tag and kind, and moved at most `maxShift` pixels.
   * @param {readonly Block[]} before named blocks of the old page
   * @param {readonly Block[]} after blocks of the new page
   * @param {number} maxShift
   * @returns {Block[]} the blocks of the new page that have a partner
   */
  function pairBlocks(before, after, maxShift) {
    const byIndex = new Map(after.map((block) => [block.index, block]))
    return before.flatMap((old) => {
      const next = byIndex.get(old.index)
      return next &&
        next.kind === old.kind &&
        next.tag === old.tag &&
        Math.abs(next.top - old.top) <= maxShift
        ? [next]
        : []
    })
  }

  /**
   * Start of the new text, staggered from top to bottom by its rank.
   * @param {number} rank
   */
  function refocusDelay(rank) {
    return (
      REFOCUS_DELAY_MS +
      REFOCUS_STAGGER_MS * Math.min(Math.max(rank, 0), REFOCUS_STAGGER_STEPS)
    )
  }

  /** Parent of a detail path: /de/work/abl -> /de/work. @param {string} path */
  function parentPath(path) {
    const clean = cleanPath(path)
    return clean.slice(0, clean.lastIndexOf('/')) || '/'
  }

  /** @param {unknown} value @returns {value is Note} */
  function isNote(value) {
    if (!isObject(value)) return false
    const from = Reflect.get(value, 'from')
    const to = Reflect.get(value, 'to')
    const morph = Reflect.get(value, 'morph')
    const kinds = Reflect.get(value, 'kinds')
    const at = Reflect.get(value, 'at')
    const blocks = Reflect.get(value, 'blocks')
    const scrollY = Reflect.get(value, 'scrollY')
    return (
      typeof from === 'string' &&
      (to === null || typeof to === 'string') &&
      (morph === null || morph === 'in' || morph === 'out') &&
      Array.isArray(kinds) &&
      kinds.every(isKind) &&
      typeof at === 'number' &&
      (blocks === undefined ||
        (Array.isArray(blocks) && blocks.every(isBlock))) &&
      (scrollY === undefined ||
        (typeof scrollY === 'number' && Number.isFinite(scrollY)))
    )
  }

  /**
   * The note of the previous page, if it was left for this navigation.
   * @param {string | null} raw
   * @param {string} here
   * @param {number} now
   * @returns {Note | null}
   */
  function readNote(raw, here, now) {
    if (!raw) return null
    /** @type {unknown} */
    let value
    try {
      value = JSON.parse(raw)
    } catch {
      return null
    }
    if (!isNote(value)) return null
    if (now < value.at || now - value.at > NOTE_MAX_AGE_MS) return null
    if (value.to !== null && value.to !== here) return null
    return value
  }

  /** @param {string | undefined} raw @returns {Tab[]} */
  function parseTabs(raw) {
    if (!raw) return []
    /** @type {unknown} */
    let value
    try {
      value = JSON.parse(raw)
    } catch {
      return []
    }
    if (!Array.isArray(value)) return []
    return value.flatMap((item) => {
      if (!isObject(item)) return []
      const path = Reflect.get(item, 'path')
      const prefix = Reflect.get(item, 'prefix')
      return typeof path === 'string' ? [{ path, prefix: prefix === true }] : []
    })
  }

  const helpers = {
    cleanPath,
    stripLocale,
    tabIndex,
    slideType,
    isLangSwitch,
    pairBlocks,
    refocusDelay,
    parentPath,
    readNote,
    parseTabs,
  }

  if (!maybeWindow) return helpers

  const win = maybeWindow
  const doc = win.document
  const root = doc.documentElement
  const tabs = parseTabs(doc.currentScript?.dataset.tabs)

  /** @type {{ link: HTMLAnchorElement, at: number } | null} */
  let lastClick = null

  /** @param {string} key */
  function load(key) {
    try {
      return win.sessionStorage.getItem(key)
    } catch {
      return null
    }
  }

  /** @param {string} key @param {string | null} value */
  function store(key, value) {
    try {
      if (value === null) win.sessionStorage.removeItem(key)
      else win.sessionStorage.setItem(key, value)
    } catch {
      // Storage can be unavailable; the page then simply slides.
    }
  }

  /** Same-origin path of a URL. @param {string} url */
  function pathOf(url) {
    try {
      const parsed = new URL(url, win.location.href)
      return parsed.origin === win.location.origin
        ? cleanPath(parsed.pathname)
        : null
    } catch {
      return null
    }
  }

  function currentPath() {
    return cleanPath(win.location.pathname)
  }

  /** @param {unknown} event @returns {Transition | null} */
  function transitionOf(event) {
    const transition = isObject(event)
      ? Reflect.get(event, 'viewTransition')
      : null
    if (!isObject(transition)) return null
    const finished = Reflect.get(transition, 'finished')
    return finished instanceof Promise ? { finished } : null
  }

  /** @param {unknown} entry */
  function entryUrl(entry) {
    const url = isObject(entry) ? Reflect.get(entry, 'url') : null
    return typeof url === 'string' ? url : null
  }

  /** @param {unknown} entry */
  function entryIndex(entry) {
    const index = isObject(entry) ? Reflect.get(entry, 'index') : null
    return typeof index === 'number' && index >= 0 ? index : null
  }

  /** Where the Navigation API says this page was reached from. */
  function activation() {
    const navigation = Reflect.get(win, 'navigation')
    const value = isObject(navigation)
      ? Reflect.get(navigation, 'activation')
      : null
    if (!isObject(value)) return { from: null, delta: 0 }
    const from = Reflect.get(value, 'from')
    const fromUrl = entryUrl(from)
    const fromIndex = entryIndex(from)
    const toIndex = entryIndex(Reflect.get(value, 'entry'))
    return {
      from: fromUrl ? pathOf(fromUrl) : null,
      delta: fromIndex !== null && toIndex !== null ? toIndex - fromIndex : 0,
    }
  }

  /** Target of the navigation that is leaving this page. @param {Event} event */
  function swapTarget(event) {
    const activationValue = Reflect.get(event, 'activation')
    const url = isObject(activationValue)
      ? entryUrl(Reflect.get(activationValue, 'entry'))
      : null
    if (url) return pathOf(url)
    if (lastClick && Date.now() - lastClick.at < CLICK_MAX_AGE_MS) {
      return pathOf(lastClick.link.href)
    }
    return null
  }

  /** @param {Element} element */
  function isVisible(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < win.innerHeight &&
      rect.left < win.innerWidth
    )
  }

  /**
   * Gives the shared elements in `scope` their view-transition names.
   * @param {ParentNode} scope
   * @param {'data-vt' | 'data-vt-hero'} attribute
   * @param {readonly Kind[]} kinds
   * @returns {Kind[]}
   */
  function nameShared(scope, attribute, kinds) {
    /** @type {Kind[]} */
    const named = []
    for (const kind of kinds) {
      const element = scope.querySelector(`[${attribute}="${kind}"]`)
      if (!(element instanceof HTMLElement || element instanceof SVGElement)) {
        continue
      }
      if (!isVisible(element)) continue
      element.style.setProperty('view-transition-name', `vt-${kind}`)
      named.push(kind)
    }
    return named
  }

  function clearShared() {
    for (const element of doc.querySelectorAll('[data-vt], [data-vt-hero]')) {
      if (element instanceof HTMLElement || element instanceof SVGElement) {
        element.style.removeProperty('view-transition-name')
      }
    }
  }

  // --- Language switch: text blocks, chips and boxes keep their place. ---

  const BLOCK_SCOPE = '[data-site-content]'
  const BLOCK_ATTRIBUTE = 'data-vt-block'
  const REFOCUS_STYLE_ID = 'vt-refocus'
  const INLINE_DISPLAYS = new Set(['inline', 'contents'])
  const MEDIA_TAGS = new Set(['img', 'svg', 'picture', 'video', 'canvas'])

  /** @typedef {HTMLElement | SVGElement} Styleable */
  /** @typedef {{ element: Styleable, kind: BlockKind }} PageBlock */

  function reducedMotion() {
    return win.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  /** @param {string} color */
  function isTransparent(color) {
    return (
      color === 'transparent' ||
      color === 'rgba(0, 0, 0, 0)' ||
      /\/\s*0\)$/.test(color)
    )
  }

  /** Whether the element paints its own box. @param {Element} element */
  function hasBox(element) {
    const style = win.getComputedStyle(element)
    if (!isTransparent(style.backgroundColor)) return true
    if (style.backgroundImage !== 'none' || style.boxShadow !== 'none') {
      return true
    }
    return ['top', 'right', 'bottom', 'left'].some(
      (side) =>
        Number.parseFloat(style.getPropertyValue(`border-${side}-width`)) > 0 &&
        !isTransparent(style.getPropertyValue(`border-${side}-color`)),
    )
  }

  /** @param {Element} element @returns {element is Styleable} */
  function isStyleable(element) {
    return element instanceof HTMLElement || element instanceof SVGElement
  }

  /**
   * Whether an ancestor below `scope` is one of `blocks`, which already
   * carries the element along.
   * @param {Element} element
   * @param {Element} scope
   * @param {ReadonlySet<Element>} blocks
   */
  function insideBlock(element, scope, blocks) {
    for (
      let parent = element.parentElement;
      parent && parent !== scope;
      parent = parent.parentElement
    ) {
      if (blocks.has(parent)) return true
    }
    return false
  }

  /**
   * Blocks of the page content in document order. Both language versions
   * share the markup, so the same index names the same block.
   * - text: the nearest non-inline box around visible text
   * - chip: the same, with its own background, border or shadow
   * - frame: other boxes outside text blocks and chips, and media outside
   *   any other block (an icon moves with its button)
   * @param {Element} scope
   * @returns {PageBlock[]}
   */
  function collectBlocks(scope) {
    /** @type {Map<Element, BlockKind>} */
    const kinds = new Map()
    const walker = doc.createTreeWalker(scope, NodeFilter.SHOW_TEXT)
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.nodeValue?.trim()) continue
      let element = node.parentElement
      if (element?.closest('svg, script, style, template, noscript')) continue
      while (
        element &&
        element !== scope &&
        INLINE_DISPLAYS.has(win.getComputedStyle(element).display)
      ) {
        element = element.parentElement
      }
      if (!element || element === scope || kinds.has(element)) continue
      kinds.set(element, hasBox(element) ? 'chip' : 'text')
    }

    const texts = new Set(kinds.keys())
    /** @type {Set<Element>} */
    const frames = new Set()
    /** @type {PageBlock[]} */
    const blocks = []
    for (const element of scope.querySelectorAll('*')) {
      if (!isStyleable(element)) continue
      const kind = kinds.get(element)
      if (kind) {
        blocks.push({ element, kind })
        continue
      }
      if (element.parentElement?.closest('svg')) continue
      if (MEDIA_TAGS.has(element.localName)) {
        if (insideBlock(element, scope, texts)) continue
        if (insideBlock(element, scope, frames)) continue
      } else if (!hasBox(element) || insideBlock(element, scope, texts)) {
        continue
      }
      frames.add(element)
      blocks.push({ element, kind: 'frame' })
    }
    return blocks
  }

  /** @param {DOMRect} a @param {DOMRect} b */
  function overlaps(a, b) {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    )
  }

  /**
   * Position of a block, or null if it must stay in the page snapshot: off
   * screen, empty, huge, or under the tab bar, which would otherwise be
   * painted below it.
   * @param {Styleable} element
   * @param {DOMRect | null} tabBar
   */
  function blockTop(element, tabBar) {
    const rect = element.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) return null
    if (rect.bottom <= 0 || rect.top >= win.innerHeight) return null
    if (rect.right <= 0 || rect.left >= win.innerWidth) return null
    if (rect.height > win.innerHeight * 2) return null
    if (tabBar && overlaps(rect, tabBar)) return null
    return Math.round(rect.top)
  }

  function tabBarRect() {
    return doc.querySelector('[data-tabbar]')?.getBoundingClientRect() ?? null
  }

  /** @param {Styleable} element @param {number} index @param {BlockKind} kind */
  function nameBlock(element, index, kind) {
    element.style.setProperty('view-transition-name', `vt-b${index}`)
    element.style.setProperty('view-transition-class', `vt-${kind}`)
    element.setAttribute(BLOCK_ATTRIBUTE, '')
  }

  function clearBlocks() {
    for (const element of doc.querySelectorAll(`[${BLOCK_ATTRIBUTE}]`)) {
      if (!isStyleable(element)) continue
      element.style.removeProperty('view-transition-name')
      element.style.removeProperty('view-transition-class')
      element.removeAttribute(BLOCK_ATTRIBUTE)
    }
    doc.getElementById(REFOCUS_STYLE_ID)?.remove()
  }

  /** Old page: names the blocks in view and returns them for the note. */
  function nameVisibleBlocks() {
    const scope = doc.querySelector(BLOCK_SCOPE)
    if (!scope) return []
    const tabBar = tabBarRect()
    /** @type {Block[]} */
    const named = []
    for (const [index, { element, kind }] of collectBlocks(scope).entries()) {
      const top = blockTop(element, tabBar)
      if (top === null) continue
      nameBlock(element, index, kind)
      named.push({ index, kind, tag: element.localName, top })
      if (named.length >= MAX_BLOCKS) break
    }
    return named
  }

  /**
   * New page: keeps the scroll position, names the partners of the old
   * blocks and staggers the new text from top to bottom.
   * @param {readonly Block[]} before
   * @param {number} scrollY
   */
  function refocus(before, scrollY) {
    const scope = doc.querySelector(BLOCK_SCOPE)
    if (!scope || before.length === 0) return
    if (scrollY > 0) win.scrollTo(0, scrollY)

    const blocks = collectBlocks(scope)
    const tabBar = tabBarRect()
    /** @type {Block[]} */
    const after = []
    for (const { index } of before) {
      const block = blocks[index]
      const top = block ? blockTop(block.element, tabBar) : null
      if (!block || top === null) continue
      after.push({ index, kind: block.kind, tag: block.element.localName, top })
    }

    const paired = pairBlocks(before, after, MAX_BLOCK_SHIFT)
    for (const { index, kind } of paired) {
      const block = blocks[index]
      if (block) nameBlock(block.element, index, kind)
    }

    const delays = paired
      .filter((block) => block.kind === 'text')
      .sort((a, b) => a.top - b.top)
      .map(
        (block, rank) =>
          `::view-transition-new(vt-b${block.index}) { animation-delay: ${refocusDelay(rank)}ms !important; }`,
      )
    if (delays.length === 0) return
    const style = doc.createElement('style')
    style.id = REFOCUS_STYLE_ID
    style.textContent = delays.join('\n')
    doc.head.append(style)
  }

  /** A visible link to `path` that contains shared elements. @param {string} path */
  function findLink(path) {
    const clicked = lastClick?.link
    if (
      clicked?.isConnected &&
      pathOf(clicked.href) === path &&
      clicked.querySelector('[data-vt]')
    ) {
      return clicked
    }
    for (const link of doc.querySelectorAll('a[href]')) {
      if (
        link instanceof HTMLAnchorElement &&
        pathOf(link.href) === path &&
        link.querySelector('[data-vt]') &&
        isVisible(link)
      ) {
        return link
      }
    }
    return null
  }

  /** @returns {Record<string, string>} */
  function loadOrigins() {
    /** @type {unknown} */
    let value
    try {
      value = JSON.parse(load(ORIGINS_KEY) ?? '{}')
    } catch {
      return {}
    }
    if (!isObject(value)) return {}
    /** @type {Record<string, string>} */
    const origins = {}
    for (const [detail, list] of Object.entries(value)) {
      if (typeof list === 'string') origins[detail] = list
    }
    return origins
  }

  /** Remembers which list a detail page was opened from. @param {string} detail @param {string} list */
  function rememberOrigin(detail, list) {
    const origins = loadOrigins()
    delete origins[detail]
    origins[detail] = list
    const entries = Object.entries(origins).slice(-MAX_ORIGINS)
    store(ORIGINS_KEY, JSON.stringify(Object.fromEntries(entries)))
  }

  /** Whether the detail page `from` leads back to the list `to`. @param {string} from @param {string} to */
  function returnsTo(from, to) {
    return loadOrigins()[from] === to || parentPath(from) === to
  }

  /**
   * @param {Note | null} note
   * @param {string} here
   * @returns {TransitionType}
   */
  function chooseType(note, here) {
    if (note?.to === here && note.morph === 'in') {
      if (nameShared(doc, 'data-vt-hero', note.kinds).length > 0) {
        rememberOrigin(here, note.from)
        return 'morph-in'
      }
    }
    if (note?.to === here && note.morph === 'out') {
      const link = findLink(note.from)
      if (link && nameShared(link, 'data-vt', note.kinds).length > 0) {
        return 'morph-out'
      }
    }
    const reached = activation()
    const from =
      note?.from ?? reached.from ?? (doc.referrer ? pathOf(doc.referrer) : null)
    return from ? slideType(from, here, tabs, reached.delta) : 'forward'
  }

  // Shared elements further down a list, and the blocks of a language
  // switch, must exist before the first render.
  const pending = readNote(load(NOTE_KEY), currentPath(), Date.now())
  if (pending?.morph || pending?.blocks?.length) {
    const expect = doc.createElement('link')
    expect.rel = 'expect'
    expect.setAttribute('href', '#page-end')
    expect.setAttribute('blocking', 'render')
    doc.head.append(expect)
  }

  doc.addEventListener(
    'click',
    (event) => {
      const link =
        event.target instanceof Element ? event.target.closest('a') : null
      lastClick = link ? { link, at: Date.now() } : null
    },
    true,
  )

  win.addEventListener('pageswap', (event) => {
    if (!transitionOf(event)) return
    const from = currentPath()
    const to = swapTarget(event)
    /** @type {Note} */
    const note = { from, to, morph: null, kinds: [], at: Date.now() }

    if (to) {
      const link = findLink(to)
      const listKinds = link ? nameShared(link, 'data-vt', KINDS) : []
      if (listKinds.length > 0) {
        note.morph = 'in'
        note.kinds = listKinds
      } else if (returnsTo(from, to)) {
        const heroKinds = nameShared(doc, 'data-vt-hero', KINDS)
        if (heroKinds.length > 0) {
          note.morph = 'out'
          note.kinds = heroKinds
        }
      }
    }

    if (to && !note.morph && isLangSwitch(from, to) && !reducedMotion()) {
      note.blocks = nameVisibleBlocks()
      note.scrollY = Math.round(win.scrollY)
    }

    store(NOTE_KEY, JSON.stringify(note))
  })

  win.addEventListener('pagereveal', (event) => {
    // A page restored from the back/forward cache still has the old names.
    clearShared()
    clearBlocks()
    delete root.dataset.pageTransition

    const transition = transitionOf(event)
    if (!transition) return

    const here = currentPath()
    const note = readNote(load(NOTE_KEY), here, Date.now())
    store(NOTE_KEY, null)

    root.dataset.pageTransition = chooseType(note, here)
    if (
      root.dataset.pageTransition === 'lang' &&
      note?.blocks &&
      !reducedMotion()
    ) {
      refocus(note.blocks, note.scrollY ?? 0)
    }
    transition.finished.finally(() => {
      clearShared()
      clearBlocks()
      delete root.dataset.pageTransition
    })
  })

  return helpers
})(typeof window === 'undefined' ? null : window)
