/**
 * @file useCityNavigation.ts
 * @role Composable for city navigation with proper URL encoding
 * @patterns Composition API, URL Encoding Pattern
 * @solid SRP (Navigation logic only)
 */

import { useRouter } from 'vue-router'

/**
 * City navigation composable
 * 
 * Handles navigation to events page with proper URL encoding
 * Matches React app behavior: /events?search=city-slug
 */
export function useCityNavigation() {
  const router = useRouter()

  /**
   * Navigate to events page with city search
   * Uses citySlug and encodes it properly for URL
   * 
   * @param citySlug - The city slug to search for
   */
  const navigateToCity = (citySlug: string) => {
    // Use encodeURIComponent to handle special characters and spaces
    // This matches the React app: navigate(`/events?search=${encodeURIComponent(city.citySlug)}`)
    const url = `/events?search=${encodeURIComponent(citySlug)}`
    void router.push(url)
  }

  return {
    navigateToCity
  }
}