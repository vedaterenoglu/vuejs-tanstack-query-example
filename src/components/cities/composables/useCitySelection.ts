/**
 * @file useCitySelection.ts
 * @role City selection state management composable
 * @patterns Composable Pattern, State Management Pattern
 * @solid SRP (City selection logic only)
 */

import { ref, type Ref } from 'vue'

import type { City } from '@/lib/types'

interface UseCitySelectionReturn {
  selectedCity: Ref<City | null>
  selectCity: (citySlug: string) => Promise<void>
  isLoading: Ref<boolean>
  clearSelection: () => void
}

// Singleton state shared across all component instances
const selectedCity = ref<City | null>(null)
const isLoading = ref(false)

/**
 * City selection composable
 *
 * Manages the currently selected city state across the application.
 * Provides loading state for async operations.
 *
 * @returns City selection state and methods
 */
export const useCitySelection = (): UseCitySelectionReturn => {
  const selectCity = async (citySlug: string): Promise<void> => {
    isLoading.value = true

    try {
      // Simulate async operation (will be replaced with actual API call)
      await new Promise(resolve => setTimeout(resolve, 500))

      // For now, just set a mock city
      selectedCity.value = {
        city: citySlug,
        citySlug,
        url: '',
        alt: '',
      }
    } finally {
      isLoading.value = false
    }
  }

  const clearSelection = () => {
    selectedCity.value = null
  }

  return {
    selectedCity,
    selectCity,
    isLoading,
    clearSelection,
  }
}
