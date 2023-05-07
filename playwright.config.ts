import type { PlaywrightTestConfig } from '@playwright/test'
import { env } from './e2e/env'

// @ts-expect-error
process.env = { ...process.env, ...env }

const headless = true

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
    baseURL: env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  outputDir: 'test-results/',
  webServer: {
    command: process.env.TEST_ENV
      ? `PORT=${env.PORT} bun run build-start`
      : `PORT=${env.PORT} bun run dev`,
    url: env.BASE_URL,
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
}

export default config
