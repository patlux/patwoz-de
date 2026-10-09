import { describe, expect, test } from 'bun:test'
import {
  parseThemePreference,
  resolveTheme,
  revealCircle,
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

describe('revealCircle', () => {
  test('uses percentages so the circle stays on the toggle at any pixel ratio', () => {
    const circle = revealCircle(1099, 58, 1708, 942)
    expect(circle.x).toBe('64.344%')
    expect(circle.y).toBe('6.157%')

    // Resolve the percentages against a 2x snapshot box (Retina) and map back.
    for (const scale of [1, 2]) {
      const width = 1708 * scale
      const height = 942 * scale
      const reference = Math.hypot(width, height) / Math.SQRT2
      const cx = (parseFloat(circle.x) / 100) * width
      const cy = (parseFloat(circle.y) / 100) * height
      const r = (parseFloat(circle.radius) / 100) * reference
      expect(cx / scale).toBeCloseTo(1099, 0)
      expect(cy / scale).toBeCloseTo(58, 0)
      // Reaches the farthest corner (bottom left) plus a 1 px margin.
      expect(r / scale).toBeCloseTo(Math.hypot(1099, 942 - 58) + 1, 0)
    }
  })
})
