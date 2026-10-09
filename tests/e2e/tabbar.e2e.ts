import { expect, test, type Page } from '@playwright/test'

async function openPage(page: Page, path: string) {
  await page.goto(path)
  // The development-only toolbar overlaps the bottom navigation. It is absent
  // from production and must not intercept the navigation under test.
  await page.addStyleTag({
    content: 'astro-dev-toolbar { display: none !important; }',
  })
}

async function expectBottomTabBar(page: Page) {
  const bar = page.locator('[data-tabbar]')
  const slot = page.locator('[data-tabbar-slot]')
  await expect(slot).toHaveCSS('position', 'fixed')
  await expect(bar).toHaveCSS('height', '56px')
  await expect(bar).toHaveCSS('opacity', '1')

  const geometry = await bar.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    const slot = element.parentElement
    if (!slot) throw new Error('Tab bar slot is missing')
    return {
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      bottomInset: Number.parseFloat(getComputedStyle(slot).bottom),
    }
  })
  expect(geometry.bottom).toBeCloseTo(
    geometry.viewportHeight - geometry.bottomInset,
    0,
  )
  expect(geometry.bottomInset).toBeGreaterThanOrEqual(12)
  expect(geometry.left).toBeGreaterThanOrEqual(12)
  expect(geometry.right).toBeLessThanOrEqual(geometry.viewportWidth - 12)
  await expect(bar.locator('[aria-current="page"] svg')).toHaveCSS(
    'width',
    '18px',
  )

  const tabs = bar.locator('[data-tabbar-tab]')
  await expect(tabs).toHaveCount(6)
  for (const tab of await tabs.all()) {
    const rect = await tab.boundingBox()
    expect(rect).not.toBeNull()
    if (!rect) throw new Error('Navigation target is not visible')
    expect(rect.width).toBeGreaterThanOrEqual(44)
    expect(rect.height).toBeGreaterThanOrEqual(44)
    expect(rect.x).toBeGreaterThanOrEqual(geometry.left)
    expect(rect.x + rect.width).toBeLessThanOrEqual(geometry.right)
    await expect(tab).toHaveAttribute('aria-label', /.+/)
  }
}

for (const width of [320, 390, 639]) {
  test(`mobile tab bar stays at the bottom at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await openPage(page, '/de/what-i-built')
    await expectBottomTabBar(page)
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      'content',
      /viewport-fit=cover/,
    )

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expectBottomTabBar(page)
    const clearance = await page.evaluate(() => {
      const content = document.querySelector('[data-site-content]')
      const bar = document.querySelector('[data-tabbar]')
      if (!content || !bar) throw new Error('Page layout is missing')
      return (
        bar.getBoundingClientRect().top - content.getBoundingClientRect().bottom
      )
    })
    // Scroll offsets can round by a fraction of a CSS pixel at page end.
    expect(clearance).toBeGreaterThanOrEqual(11)
  })
}

test('mobile navigation works in both languages without hover expansion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const [path, destination, label] of [
    ['/de/work', '/de/skills', 'Kompetenzen'],
    ['/work', '/skills', 'Skills'],
  ]) {
    await openPage(page, path)
    const link = page.locator(`[data-tabbar-tab][href="${destination}"]`)
    await link.hover()
    await expect(page.locator('[data-tabbar]')).not.toHaveAttribute(
      'data-hover',
    )
    await link.click()
    await expect(page).toHaveURL(new RegExp(`${destination}/?$`))
    await expect(
      page.locator('[data-tabbar-tab][aria-current="page"]'),
    ).toHaveAttribute('aria-label', label)
    await expectBottomTabBar(page)
  }
})

test('resizing preserves desktop navigation and clears mobile scroll effects', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await openPage(page, '/de/work')
  await expect(page.locator('[data-tabbar-slot]')).toHaveCSS(
    'position',
    'sticky',
  )
  await page.evaluate(() => window.scrollTo(0, 500))
  await page.setViewportSize({ width: 390, height: 844 })
  await expectBottomTabBar(page)
  await expect(page.locator('[data-tabbar]')).not.toHaveClass(/is-lifted/)
  await page.setViewportSize({ width: 1280, height: 900 })
  await expect(page.locator('[data-tabbar-slot]')).toHaveCSS(
    'position',
    'sticky',
  )
})

test('reduced motion disables mobile press scaling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 844 })
  await openPage(page, '/de/work')
  const link = page.locator('[data-tabbar-tab][aria-current="page"]')
  await link.hover()
  await page.mouse.down()
  try {
    await expect(link).toHaveCSS('transform', 'none')
    await expect(link).toHaveCSS('transition-duration', '0s')
  } finally {
    await page.mouse.move(0, 0)
    await page.mouse.up()
  }
})
