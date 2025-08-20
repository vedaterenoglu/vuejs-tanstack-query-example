/**
 * @file formatters.utils.ts
 * @role Data formatting utility functions for city components
 * @patterns Utility Pattern, Pure Function Pattern
 * @solid SRP (Formatting only), OCP (Extensible formatters)
 */

import type { City } from '@/lib/types'

/**
 * Format city name for display
 * 
 * @param cityName - Raw city name
 * @returns Formatted city name
 */
export function formatCityName(cityName: string): string {
  if (!cityName) return ''
  return cityName.trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Format city slug for URL
 * 
 * @param citySlug - City slug
 * @returns URL-safe formatted slug
 */
export function formatCitySlug(citySlug: string): string {
  if (!citySlug) return ''
  return citySlug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

/**
 * Format city count display
 * 
 * @param count - Number of cities
 * @param singular - Singular form (default: 'city')
 * @param plural - Plural form (default: 'cities')
 * @returns Formatted count string
 */
export function formatCityCount(
  count: number,
  singular = 'city',
  plural = 'cities'
): string {
  if (count === 0) return `No ${plural}`
  if (count === 1) return `1 ${singular}`
  return `${count.toLocaleString()} ${plural}`
}

/**
 * Format search results message
 * 
 * @param filtered - Number of filtered results
 * @param total - Total number of items
 * @param searchTerm - Search term used
 * @returns Formatted search results message
 */
export function formatSearchResults(
  filtered: number,
  total: number,
  searchTerm?: string
): string {
  if (!searchTerm) {
    return formatCityCount(total)
  }

  if (filtered === 0) {
    return `No cities found for "${searchTerm}"`
  }

  if (filtered === total) {
    return `All ${formatCityCount(total)} match "${searchTerm}"`
  }

  return `Showing ${filtered} of ${total} cities for "${searchTerm}"`
}

/**
 * Format loading message
 * 
 * @param itemType - Type of items being loaded
 * @returns Loading message
 */
export function formatLoadingMessage(itemType = 'cities'): string {
  return `Loading ${itemType}...`
}

/**
 * Format error message
 * 
 * @param error - Error object or message
 * @param fallback - Fallback message
 * @returns Formatted error message
 */
export function formatErrorMessage(
  error: unknown,
  fallback = 'An error occurred'
): string {
  if (typeof error === 'string') return error
  if (error instanceof Error) return error.message
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message)
  }
  return fallback
}

/**
 * Format city data for display
 * 
 * @param city - City object
 * @returns Formatted city data
 */
export function formatCityData(city: City): {
  displayName: string
  urlSlug: string
  imageAlt: string
} {
  return {
    displayName: formatCityName(city.city),
    urlSlug: formatCitySlug(city.citySlug),
    imageAlt: city.alt || `View of ${formatCityName(city.city)}`,
  }
}

/**
 * Format accessibility label for city
 * 
 * @param city - City object
 * @param isSelected - Whether city is selected
 * @returns Accessibility label
 */
export function formatCityAriaLabel(
  city: City,
  isSelected = false
): string {
  const cityName = formatCityName(city.city)
  const status = isSelected ? ' (currently selected)' : ''
  return `${cityName} destination${status}`
}