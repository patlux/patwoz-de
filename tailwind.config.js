module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,js,jsx,ts,tsx,vue,svelte}'],
  variants: {
    extend: {
      transform: ['hover', 'focus'],
    },
  },
  theme: {
    fontFamily: {
      mono: [
        'Menlo',
        'ui-monospace',
        'SFMono-Regular',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
