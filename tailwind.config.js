module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: 'media',
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
