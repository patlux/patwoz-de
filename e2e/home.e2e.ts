import { test, expect } from '@playwright/test';

test('Should see home page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Patrick Wozniak' })).toBeVisible();
});
