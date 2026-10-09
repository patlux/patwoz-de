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
 * - lang: the same page in the other language only cross-fades.
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
  /**
   * @typedef {object} Note
   * @property {string} from
   * @property {string | null} to
   * @property {Morph | null} morph
   * @property {Kind[]} kinds
   * @property {number} at
   */
  /** @typedef {{ finished: Promise<unknown> }} Transition */

  const NOTE_KEY = 'page-transition'
  const ORIGINS_KEY = 'page-transition-origins'
  const NOTE_MAX_AGE_MS = 10000
  const CLICK_MAX_AGE_MS = 2000
  const MAX_ORIGINS = 30
  /** @type {readonly Kind[]} */
  const KINDS = ['logo', 'title']

  /** @param {unknown} value @returns {value is object} */
  function isObject(value) {
    return typeof value === 'object' && value !== null
  }

  /** @param {unknown} value @returns {value is Kind} */
  function isKind(value) {
    return value === 'logo' || value === 'title'
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
    return (
      typeof from === 'string' &&
      (to === null || typeof to === 'string') &&
      (morph === null || morph === 'in' || morph === 'out') &&
      Array.isArray(kinds) &&
      kinds.every(isKind) &&
      typeof at === 'number'
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

  // Shared elements further down a list must exist before the first render.
  if (readNote(load(NOTE_KEY), currentPath(), Date.now())?.morph) {
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

    store(NOTE_KEY, JSON.stringify(note))
  })

  win.addEventListener('pagereveal', (event) => {
    // A page restored from the back/forward cache still has the old names.
    clearShared()
    delete root.dataset.pageTransition

    const transition = transitionOf(event)
    if (!transition) return

    const here = currentPath()
    const note = readNote(load(NOTE_KEY), here, Date.now())
    store(NOTE_KEY, null)

    root.dataset.pageTransition = chooseType(note, here)
    transition.finished.finally(() => {
      clearShared()
      delete root.dataset.pageTransition
    })
  })

  return helpers
})(typeof window === 'undefined' ? null : window)
