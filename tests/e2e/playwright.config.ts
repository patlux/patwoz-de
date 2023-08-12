import type { PlaywrightTestConfig } from '@playwright/test';

// change to false for debugging
const headless = true;

process.env.BASE_URL ??= `http://localhost:3000`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './',
  testMatch: /.*.e2e.ts/,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
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
  webServer: {
    // playwright checks if this is reachable,
    url: `${process.env.BASE_URL}/health`,
    // if not, it will run the command
    command: `bun run build-start`,
    env: {
      PORT: '3000',
    },
    cwd: '../../',
    reuseExistingServer: true,
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
