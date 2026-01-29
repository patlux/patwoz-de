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
  },
  integrations: [
    expressiveCode({
      plugins: [pluginLineNumbers()],
      themes: ['github-dark'],
      defaultProps: {
        showLineNumbers: true,
      },
      styleOverrides: {
        // Border with indigo accent
        borderColor: '#6366f1',
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
        codeBackground: '#0a0a0a',
        // Frames
        frames: {
          frameBoxShadowCssValue: 'none',
          editorActiveTabBackground: '#0a0a0a',
          editorActiveTabBorderColor: '#6366f1',
          editorTabBarBackground: '#111',
          editorTabBarBorderBottomColor: '#222',
          terminalBackground: '#0a0a0a',
          terminalTitlebarBackground: '#111',
          terminalTitlebarBorderBottomColor: '#222',
        },
        // Line numbers
        lineNumbers: {
          foreground: '#404040',
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
