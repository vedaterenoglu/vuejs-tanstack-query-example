/**
 * @file aria.utils.ts
 * @role ARIA attributes utility functions for city components
 * @patterns Utility Pattern, Factory Pattern
 * @solid SRP (ARIA logic only), OCP (Extensible for new attributes)
 */

import type { City } from '@/lib/types'

/**
 * ARIA attributes for CityCard
 */
export interface CityCardAriaAttributes {
  'aria-label': string
  'aria-selected'?: boolean
  'aria-disabled'?: boolean
  'aria-busy'?: boolean
  role?: string
}

/**
 * Generate ARIA attributes for CityCard component
 * 
 * @param city - City data object
 * @param options - Additional options for ARIA attributes
 * @returns ARIA attributes object
 */
export function getCityCardAria(
  city: City,
  options: {
    isSelected?: boolean
    isLoading?: boolean
    disabled?: boolean
  } = {}
): CityCardAriaAttributes {
  const { isSelected = false, isLoading = false, disabled = false } = options

  return {
    'aria-label': `City destination: ${city.city}`,
    'aria-selected': isSelected,
    'aria-disabled': disabled,
    'aria-busy': isLoading,
    role: 'article',
  }
}

/**
 * Generate ARIA label for city select button
 * 
 * @param cityName - Name of the city
 * @param isSelected - Whether city is selected
 * @returns ARIA label string
 */
export function getCitySelectButtonAria(
  cityName: string,
  isSelected: boolean
): string {
  return isSelected
    ? `${cityName} is currently selected`
    : `Select ${cityName} as destination`
}

/**
 * Generate ARIA attributes for city grid
 * 
 * @param citiesCount - Total number of cities
 * @param loadingState - Loading state
 * @returns ARIA attributes for grid container
 */
export function getCityGridAria(
  citiesCount: number,
  loadingState: 'idle' | 'loading' | 'error' = 'idle'
) {
  return {
    role: 'region',
    'aria-label': 'City destinations grid',
    'aria-busy': loadingState === 'loading',
    'aria-live': 'polite' as const,
    'aria-atomic': true,
    'aria-relevant': 'additions removals',
    'aria-rowcount': citiesCount,
  }
}

/**
 * Generate screen reader announcement for city selection
 * 
 * @param cityName - Name of selected city
 * @param action - Action performed
 * @returns Screen reader announcement text
 */
export function getCitySelectionAnnouncement(
  cityName: string,
  action: 'selected' | 'deselected' | 'navigated'
): string {
  switch (action) {
    case 'selected':
      return `${cityName} has been selected as destination`
    case 'deselected':
      return `${cityName} has been deselected`
    case 'navigated':
      return `Navigating to events in ${cityName}`
    default:
      return ''
  }
}