/**
 * @file useCityGrid.ts
 * @role Business logic composable for CityGrid component
 * @patterns Composition API, Observer Pattern
 * @solid SRP (Grid logic only), DIP (Depends on abstractions)
 */

import { computed, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'

import type { City } from '@/lib/types'

/**
 * CityGrid composable interface
 */
export interface UseCityGridReturn {
  // Computed
  hasResults: ComputedRef<boolean>
  showPartialLoading: ComputedRef<boolean>
  gridClass: ComputedRef<string>
  
  // Actions
  handleCitySelect: (citySlug: string) => void
}

/**
 * CityGrid composable for grid-specific business logic
 */
export function useCityGrid(props: {
  cities: City[]
  isLoading?: boolean
  isSearchActive?: boolean
  filteredCount?: number
}): UseCityGridReturn {
  const router = useRouter()

  // Check if we have results to display
  const hasResults = computed(() => {
    return Boolean(props.cities && props.cities.length > 0)
  })

  // Show partial loading indicator
  const showPartialLoading = computed(() => {
    return Boolean(props.isLoading && props.cities.length > 0)
  })

  // Dynamic grid class based on number of results
  const gridClass = computed(() => {
    const baseClasses = 'grid gap-4'
    const columnClasses = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    return `${baseClasses} ${columnClasses}`
  })

  // Handle city selection
  const handleCitySelect = (citySlug: string) => {
    void router.push(`/events/${citySlug}`)
  }

  return {
    hasResults,
    showPartialLoading,
    gridClass,
    handleCitySelect
  }
}