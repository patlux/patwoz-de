const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      body: ['Comic Sans MS', 'Comic Sans', ...defaultTheme.fontFamily.mono],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
