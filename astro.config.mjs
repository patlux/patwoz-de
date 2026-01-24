import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// Map github-dark hex colors to CSS class names
const colorToClass = {
  '#E1E4E8': 'c-fg',
  '#F97583': 'c-kw', // keyword
  '#79B8FF': 'c-cn', // constant
  '#FFAB70': 'c-pm', // parameter
  '#B392F0': 'c-fn', // function
  '#9ECBFF': 'c-st', // string
  '#6A737D': 'c-cm', // comment
}

// Custom transformer to convert inline color styles to classes
const transformerColorToClass = () => ({
  name: 'color-to-class',
  span(node) {
    const style = node.properties?.style
    if (typeof style === 'string') {
      const match = style.match(/color:(#[A-Fa-f0-9]+)/)
      if (match) {
        const color = match[1].toUpperCase()
        const className = colorToClass[color]
        if (className) {
          node.properties.class = className
          delete node.properties.style
        }
      }
    }
  },
})

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
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      transformers: [transformerColorToClass()],
    },
  },
})
