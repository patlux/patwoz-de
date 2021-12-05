const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./app/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      body: ['Comic Sans MS', 'Comic Sans', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
