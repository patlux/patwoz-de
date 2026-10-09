export type ThemeState = 'light' | 'dark'

/** Stored choice; `null` means "follow the system preference". */
export type ThemePreference = ThemeState | null

export const THEME_STORAGE_KEY = 'theme'

export function parseThemePreference(value: string | null): ThemePreference {
  return value === 'light' || value === 'dark' ? value : null
}

export function resolveTheme(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): ThemeState {
  if (preference !== null) return preference
  return systemPrefersDark ? 'dark' : 'light'
}

/**
 * Toggle to the opposite theme. Choosing the theme the system already
 * prefers clears the stored choice, so the page follows the system again.
 */
export function toggleThemePreference(
  preference: ThemePreference,
  systemPrefersDark: boolean,
): { theme: ThemeState; preference: ThemePreference } {
  const theme =
    resolveTheme(preference, systemPrefersDark) === 'dark' ? 'light' : 'dark'
  const systemTheme: ThemeState = systemPrefersDark ? 'dark' : 'light'
  return { theme, preference: theme === systemTheme ? null : theme }
}

/** Radius that reaches the farthest viewport corner from (x, y). */
export function revealRadius(
  x: number,
  y: number,
  width: number,
  height: number,
): number {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y))
}

/**
 * Reveal circle in percentages of the root snapshot. Chrome may lay out the
 * snapshot in device pixels (e.g. twice the CSS size on Retina), so px values
 * in its clip-path land at the wrong place; percentages scale with the box.
 * A circle radius percentage refers to hypot(width, height) / sqrt(2).
 */
export function revealCircle(
  x: number,
  y: number,
  width: number,
  height: number,
): { x: string; y: string; radius: string } {
  const percent = (value: number) => `${Number(value.toFixed(3))}%`
  const radius = revealRadius(x, y, width, height) + 1
  const reference = Math.hypot(width, height) / Math.SQRT2
  return {
    x: percent((x / width) * 100),
    y: percent((y / height) * 100),
    radius: percent((radius / reference) * 100),
  }
}
