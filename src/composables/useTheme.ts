/**
 * @file useTheme.ts
 * @role Singleton theme management composable with cross-tab sync
 * @patterns Singleton Pattern, Observer Pattern
 * @solid SRP (Theme management only)
 * @ssot The `isDarkMode` ref is the single source of truth post-initialization.
 */

import { ref, computed, readonly, watchEffect, type Ref } from 'vue'

// Theme type
type Theme = 'light' | 'dark'

// Singleton state - shared across the entire app
const isDarkMode = ref<boolean>(false)
const isInitialized = ref<boolean>(false)

// localStorage key
const STORAGE_KEY = 'theme-preference'

/**
 * Updates the DOM by adding or removing the 'dark' class from the html element.
 * This is the single function responsible for DOM manipulation.
 */
function updateDOM(isDark: boolean): void {
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/**
 * Initializes the theme state by reading from localStorage or defaulting to dark mode.
 * This function only sets the initial value of the `isDarkMode` ref.
 */
function initializeTheme(): void {
  if (isInitialized.value) return

  const storedPreference = localStorage.getItem(STORAGE_KEY)

  if (storedPreference) {
    // Validate stored preference. If it's not 'light', default to 'dark'.
    isDarkMode.value = storedPreference !== 'light'
  } else {
    // If no preference is stored, default to dark mode.
    isDarkMode.value = true
  }

  isInitialized.value = true
}

/**
 * Sets up cross-tab synchronization. When a change is detected in another tab,
 * it updates the local `isDarkMode` state. The `watchEffect` handles the rest.
 */
function setupCrossTabSync(): void {
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY && e.newValue && e.newValue !== e.oldValue) {
      isDarkMode.value = e.newValue === 'dark'
    }
  })
}

/**
 * A singleton composable for managing the application's theme.
 *
 * Features:
 * - A single `watchEffect` handles all DOM and localStorage updates, acting as the single point of synchronization.
 * - Initialization is separated from reactive effects to prevent race conditions.
 * - Cross-tab synchronization updates the reactive state, letting the `watchEffect` handle the side effects.
 */
export function useTheme() {
  // This block runs only once for the lifetime of the app.
  if (!isInitialized.value) {
    // 1. Set the initial state of `isDarkMode`
    initializeTheme()
    // 2. Listen for changes from other tabs
    setupCrossTabSync()

    // 3. This single effect reacts to ANY change in `isDarkMode`
    watchEffect(() => {
      const newTheme = isDarkMode.value ? 'dark' : 'light'
      // Update the DOM
      updateDOM(isDarkMode.value)
      // Update localStorage to persist the change
      localStorage.setItem(STORAGE_KEY, newTheme)
    })
  }

  // Function to toggle the theme
  const toggleTheme = (): void => {
    isDarkMode.value = !isDarkMode.value
  }

  // Function to set a specific theme
  const setTheme = (theme: Theme): void => {
    isDarkMode.value = theme === 'dark'
  }

  // Computed property for the current theme string ('light' or 'dark')
  const theme = computed(() => (isDarkMode.value ? 'dark' : 'light'))

  return {
    isDark: readonly(isDarkMode) as Ref<boolean>,
    theme: readonly(theme),
    toggleTheme,
    setTheme,
  }
}
