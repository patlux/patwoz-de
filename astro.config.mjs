import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import expressiveCode from 'astro-expressive-code'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'

export default defineConfig({
  site: 'https://patwoz.dev',
  output: 'static',
  adapter: cloudflare(),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api/contact': {
          target: 'http://127.0.0.1:8787',
          changeOrigin: false,
        },
      },
    },
  },
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
      themes: ['github-dark'],
      defaultProps: {
        showLineNumbers: true,
      },
      styleOverrides: {
        // Border in Zugriff border tone
        borderColor: '#3f3f46',
        borderWidth: '1px',
        borderRadius: '0.5rem',
        // Code styling
        codeFontFamily:
          "ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        codeFontSize: '0.875rem',
        codeLineHeight: '1.7',
        codePaddingBlock: '1rem',
        codePaddingInline: '1.25rem',
        // Background
        codeBackground: '#111111',
        // Frames
        frames: {
          frameBoxShadowCssValue: 'none',
          editorActiveTabBackground: '#111111',
          editorActiveTabBorderColor: '#0a84ff',
          editorTabBarBackground: '#1c1c1e',
          editorTabBarBorderBottomColor: '#2c2c2e',
          terminalBackground: '#111111',
          terminalTitlebarBackground: '#1c1c1e',
          terminalTitlebarBorderBottomColor: '#2c2c2e',
        },
        // Line numbers
        lineNumbers: {
          // 5.8:1 on the #111111 code background (WCAG AA)
          foreground: '#8e8e96',
        },
      },
      frames: {
        showCopyToClipboardButton: true,
      },
    }),
    mdx(),
    sitemap(),
  ],
})
