import type { PlaywrightTestConfig } from '@playwright/test';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const baseURL = `http://localhost:${PORT}/`;
const headless = true;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './e2e',
  testMatch: /.*.e2e.ts/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  use: {
    trace: 'on-first-retry',
    channel: 'chrome',
    headless,
    baseURL,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results/',
  webServer: {
    command: process.env.TEST_ENV ? `PORT=${PORT} bun run build-start` : `PORT=${PORT} bun run dev`,
    url: baseURL,
    reuseExistingServer: !(process.env.TEST_ENV && process.env.CI),
  },
  fullyParallel: headless,
  workers: process.env.CI ? 1 : headless ? undefined : 1,
  projects: [
    {
      name: `dev+js`,
      use: {
        javaScriptEnabled: true,
      },
    },
    {
      name: `dev-js`,
      use: {
        javaScriptEnabled: false,
      },
    },
  ],
};

export default config;
