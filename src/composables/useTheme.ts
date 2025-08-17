/**
 * @file useTheme.ts
 * @role Theme management composable for dark/light mode
 * @patterns Composable Pattern, Observer Pattern, State Management Pattern
 * @solid SRP (Theme management only), OCP (Extensible for new themes)
 * @ssot CSS variables for theme state
 */

import { ref, computed, watchEffect, type Ref } from 'vue'

type Theme = 'light' | 'dark' | 'system'
type ResolvedTheme = 'light' | 'dark'

interface ThemeComposable {
  theme: Ref<Theme>
  resolvedTheme: Ref<ResolvedTheme>
  setTheme: (newTheme: Theme) => void
  toggleTheme: () => void
}

// Singleton state for theme management (SSOT)
const theme = ref<Theme>('system')
const resolvedTheme = ref<ResolvedTheme>('light')

/**
 * useTheme - Theme management composable
 * 
 * Provides reactive theme state and utilities for managing
 * application theme (light/dark mode). Follows SSOT principle
 * with CSS variables as the single source of truth for theme state.
 * 
 * Design Patterns Applied:
 * - Composable Pattern: Reusable theme logic
 * - Observer Pattern: Watches system theme changes
 * - State Management Pattern: Reactive state with computed properties
 */
export function useTheme(): ThemeComposable {
  // Initialize theme from localStorage or default to system
  if (typeof window !== 'undefined' && !theme.value) {
    const stored = localStorage.getItem('theme') as Theme | null
    theme.value = stored || 'system'
  }

  // Watch for theme changes and update DOM
  watchEffect(() => {
    if (typeof window === 'undefined') return

    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Resolve the actual theme based on user preference
    const updateResolvedTheme = () => {
      if (theme.value === 'system') {
        resolvedTheme.value = mediaQuery.matches ? 'dark' : 'light'
      } else {
        resolvedTheme.value = theme.value as ResolvedTheme
      }

      // Update DOM class for CSS variables
      root.classList.remove('light', 'dark')
      root.classList.add(resolvedTheme.value)
    }

    updateResolvedTheme()

    // Listen for system theme changes
    const handleChange = () => {
      if (theme.value === 'system') {
        updateResolvedTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  })

  // Set theme and persist to localStorage
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = resolvedTheme.value === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  return {
    theme: computed(() => theme.value),
    resolvedTheme: computed(() => resolvedTheme.value),
    setTheme,
    toggleTheme,
  }
}