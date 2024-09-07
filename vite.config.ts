import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
  },
  plugins: [
    remix({
      ignoredRouteFiles: ['**/.*'],
    }),
    tsconfigPaths(),
  ],
})
