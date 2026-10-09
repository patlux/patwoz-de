import { describe, expect, test } from 'bun:test'
import {
  parseThemePreference,
  resolveTheme,
  revealRadius,
  toggleThemePreference,
} from '../../src/utils/theme'

describe('parseThemePreference', () => {
  test('accepts only light and dark', () => {
    expect(parseThemePreference('light')).toBe('light')
    expect(parseThemePreference('dark')).toBe('dark')
    expect(parseThemePreference('system')).toBeNull()
    expect(parseThemePreference(null)).toBeNull()
  })
})

describe('resolveTheme', () => {
  test('follows the system without a stored choice', () => {
    expect(resolveTheme(null, true)).toBe('dark')
    expect(resolveTheme(null, false)).toBe('light')
  })

  test('a stored choice wins over the system', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
  })
})

describe('toggleThemePreference', () => {
  test('stores the opposite of the system theme', () => {
    expect(toggleThemePreference(null, true)).toEqual({
      theme: 'light',
      preference: 'light',
    })
    expect(toggleThemePreference(null, false)).toEqual({
      theme: 'dark',
      preference: 'dark',
    })
  })

  test('choosing the system theme returns to following the system', () => {
    expect(toggleThemePreference('light', true)).toEqual({
      theme: 'dark',
      preference: null,
    })
    expect(toggleThemePreference('dark', false)).toEqual({
      theme: 'light',
      preference: null,
    })
  })
})

describe('revealRadius', () => {
  test('reaches the farthest corner', () => {
    // Theme toggle near the top right of a 1440 x 900 viewport.
    expect(revealRadius(998, 76, 1440, 900)).toBeCloseTo(1294.2, 1)
    expect(revealRadius(0, 0, 300, 400)).toBe(500)
    expect(revealRadius(150, 200, 300, 400)).toBe(250)
  })
})
