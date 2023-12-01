import { devices, type PlaywrightTestConfig } from '@playwright/test';

const headless = true;

process.env.BASE_URL ??= `http://localhost:3000`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  timeout: 1000 * 30,
  testDir: './tests/e2e',
  testMatch: /.*.e2e.ts/,
  forbidOnly: !!process.env.CI,
  retries: 1,
  use: {
    trace: 'on-first-retry',
    channel: 'chrome',
    headless,
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results/',
  webServer:
    process.env.NO_BUILD != null
      ? undefined
      : {
          command: `PORT=${process.env.PORT} bun run dev`,
          url: process.env.BASE_URL,
          reuseExistingServer: !process.env.CI,
        },
  fullyParallel: headless,
  workers: process.env.CI ? 1 : headless ? undefined : 1,
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        locale: 'de-DE',
        javaScriptEnabled: true,
      },
    },
    {
      name: 'Google Chrome Without Javascript',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        locale: 'de-DE',
        javaScriptEnabled: false,
      },
    },
  ],
};

export default config;
