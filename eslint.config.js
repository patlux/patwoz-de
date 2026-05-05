import eslintPluginAstro from 'eslint-plugin-astro'
import tsParser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist/**', 'build/**', 'node_modules/**', '.astro/**'],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
]
