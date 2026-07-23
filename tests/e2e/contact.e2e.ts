import { expect, test, type Page } from '@playwright/test'

const fillRequired = async (page: Page) => {
  await page.locator('#contact-name').fill('Ada Lovelace')
  await page.locator('#contact-email').fill('ada@example.com')
  await page.locator('#contact-category').selectOption('new-project')
  await page
    .locator('#contact-description')
    .fill('A sufficiently detailed project description for this inquiry.')
}

const mockTurnstile = async (page: Page) => {
  await page.addInitScript(() => {
    window.turnstile = {
      render(_container, options) {
        options.callback('mock-turnstile-token')
        return 'widget-1'
      },
      reset() {},
    }
  })
  await page.route('https://challenges.cloudflare.com/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/javascript',
      body: '',
    })
  })
}

test.describe('contact pages', () => {
  test.skip(
    ({ javaScriptEnabled }) => !javaScriptEnabled,
    'interactive form requires JavaScript',
  )

  test.beforeEach(async ({ page }) => {
    await mockTurnstile(page)
  })

  for (const scenario of [
    {
      path: '/contact',
      heading: 'Start a project conversation',
      submit: 'Send inquiry',
    },
    {
      path: '/de/contact',
      heading: 'Projekt anfragen',
      submit: 'Anfrage senden',
    },
  ]) {
    test(`${scenario.path} renders equivalent progressive form`, async ({
      page,
    }) => {
      await page.goto(scenario.path)
      await expect(
        page.getByRole('heading', { name: scenario.heading }),
      ).toBeVisible()
      await expect(page.locator('#contact-company')).toBeVisible()
      const details = page.locator('details')
      await expect(details).not.toHaveAttribute('open', '')
      await details.locator('summary').focus()
      await page.keyboard.press('Enter')
      await expect(details).toHaveAttribute('open', '')
      await expect(
        page.getByRole('button', { name: scenario.submit }),
      ).toBeVisible()
      await expect(
        page.getByRole('link', { name: 'hi@patwoz.de' }).last(),
      ).toHaveAttribute('href', 'mailto:hi@patwoz.de')
    })
  }

  test('successful submission shows pending state, prevents duplicates, clears values, and focuses success', async ({
    page,
  }) => {
    let calls = 0
    let releaseResponse = () => {}
    const responseGate = new Promise<void>((resolve) => {
      releaseResponse = resolve
    })
    await page.route('**/api/contact', async (route) => {
      calls += 1
      await responseGate
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true}',
      })
    })
    await page.goto('/contact')
    await fillRequired(page)
    await page.locator('#contact-form').evaluate((form) => {
      const turnstileField = document.createElement('input')
      turnstileField.type = 'hidden'
      turnstileField.name = 'cf-turnstile-response'
      turnstileField.value = 'widget-managed-token'
      form.append(turnstileField)
    })

    const submit = page.locator('#contact-submit')
    const requestPromise = page.waitForRequest('**/api/contact')
    await submit.dispatchEvent('click')
    await expect(submit).toBeDisabled()
    await expect(submit).toHaveAttribute('data-state', 'pending')
    await expect(page.locator('#contact-form')).toHaveAttribute(
      'aria-busy',
      'true',
    )
    await expect(submit).toContainText('Sending')
    await expect(page.locator('.contact-submit__impulse')).toHaveCSS(
      'animation-name',
      'contact-send-impulse',
    )
    await submit.dispatchEvent('click')
    expect(calls).toBe(1)
    releaseResponse()
    const status = page.getByRole('status')
    await expect(status).toContainText('Thank you.')
    await expect(status).toHaveAttribute('data-kind', 'success')
    await expect(status).toHaveAttribute('aria-atomic', 'true')
    await expect(status).toBeFocused()
    await expect(status.locator('.contact-status__icon-success')).toBeVisible()
    await expect(status.locator('.contact-status__icon-error')).toBeHidden()
    await expect(status).toHaveCSS('animation-name', 'contact-result-in')
    await expect(page.locator('#contact-form')).toHaveAttribute(
      'aria-busy',
      'false',
    )
    await expect(submit).toHaveAttribute('data-state', 'idle')
    await expect(page.locator('#contact-name')).toHaveValue('')
    expect(calls).toBe(1)
    const request = await requestPromise
    const payload = request.postDataJSON()
    expect(payload.turnstileToken).toBe('mock-turnstile-token')
    expect(payload['cf-turnstile-response']).toBeUndefined()
  })

  test('failed submission retains values, restores submit, and focuses generic error', async ({
    page,
  }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: '{"ok":false}',
      })
    })
    await page.goto('/contact')
    await fillRequired(page)
    await page.getByRole('button', { name: 'Send inquiry' }).click()

    const status = page.getByRole('status')
    await expect(status).toContainText('That did not work.')
    await expect(status).toContainText('hi@patwoz.de')
    await expect(status).toHaveAttribute('data-kind', 'error')
    await expect(status).toBeFocused()
    await expect(status.locator('.contact-status__icon-error')).toBeVisible()
    await expect(status.locator('.contact-status__icon-success')).toBeHidden()
    await expect(status).toHaveCSS('animation-name', 'contact-result-in')
    await expect(page.locator('#contact-name')).toHaveValue('Ada Lovelace')
    await expect(page.locator('#contact-form')).toHaveAttribute(
      'aria-busy',
      'false',
    )
    await expect(
      page.getByRole('button', { name: 'Send inquiry' }),
    ).toBeEnabled()
  })

  test('fast success does not wait for the send impulse', async ({ page }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true}',
      })
    })
    await page.goto('/contact')
    await fillRequired(page)

    await page.getByRole('button', { name: 'Send inquiry' }).click()

    const status = page.getByRole('status')
    await expect(status).toHaveAttribute('data-kind', 'success')
    await expect(status).toBeFocused()
    await expect(page.locator('#contact-name')).toHaveValue('')
  })

  test('reduced motion keeps pending and success immediate', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    let releaseResponse = () => {}
    const responseGate = new Promise<void>((resolve) => {
      releaseResponse = resolve
    })
    await page.route('**/api/contact', async (route) => {
      await responseGate
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{"ok":true}',
      })
    })
    await page.goto('/contact')
    await fillRequired(page)

    const submit = page.getByRole('button', { name: 'Send inquiry' })
    await submit.click()
    await expect(page.locator('.contact-submit__impulse')).toHaveCSS(
      'animation-name',
      'none',
    )

    releaseResponse()
    const status = page.getByRole('status')
    await expect(status).toHaveAttribute('data-kind', 'success')
    await expect(status).toHaveCSS('animation-name', 'none')
    await expect(status).toBeFocused()
  })

  test('keyboard validation focuses the first invalid field', async ({
    page,
  }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Send inquiry' }).focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('#contact-name')).toBeFocused()
  })

  test('responsive dark mode remains usable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/contact')
    await page.evaluate(() => document.documentElement.classList.add('dark'))
    await expect(
      page.getByRole('heading', { name: 'Start a project conversation' }),
    ).toBeVisible()
    const submit = page.getByRole('button', { name: 'Send inquiry' })
    await submit.scrollIntoViewIfNeeded()
    await expect(submit).toBeVisible()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})

test.describe('contact pages without JavaScript', () => {
  test.skip(
    ({ javaScriptEnabled }) => javaScriptEnabled,
    'no-JavaScript project only',
  )

  test('keeps localized content and mail fallback visible', async ({
    page,
  }) => {
    await page.goto('/contact')
    await expect(
      page.getByRole('heading', { name: 'Start a project conversation' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'hi@patwoz.de' }).last(),
    ).toHaveAttribute('href', 'mailto:hi@patwoz.de')
  })
})
