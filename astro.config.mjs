export default {
  buildOptions: {
    site: 'https://patwoz.dev',
    sitemap: true,
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  renderers: ['@astrojs/renderer-react'],
};
