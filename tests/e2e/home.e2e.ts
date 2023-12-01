import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL;

if (BASE_URL == null) {
  throw new Error(`Missing environment variable "BASE_URL".`);
}

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('Should see home page', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Patrick Wozniak' }),
  ).toBeVisible();
});
