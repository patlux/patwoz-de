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
