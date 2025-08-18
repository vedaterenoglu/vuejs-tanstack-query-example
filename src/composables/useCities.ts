/**
 * @file useCities.ts
 * @role Cities data fetching composable
 * @patterns Composable Pattern, Repository Pattern
 * @solid SRP (Cities data fetching only)
 * @ssot TanStack Query for server state
 */

import { useQuery, useQueryClient } from '@tanstack/vue-query'

import type { City } from '@/lib/types'

/**
 * Fetch cities from API
 * 
 * Fetches cities from the backend API endpoint
 * Matches React implementation using VITE_API_BASE_URL
 */
const fetchCities = async (): Promise<City[]> => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
  
  if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured')
  }
  
  const response = await fetch(`${apiBaseUrl}/api/cities`)
  
  if (!response.ok) {
    throw new Error(`Failed to fetch cities: ${response.statusText}`)
  }
  
  const data = await response.json()
  
  // Handle both possible response formats from backend
  // The API returns { count: number, cities: City[] }
  if (data.cities && Array.isArray(data.cities)) {
    return data.cities
  }
  
  // Fallback if API returns array directly
  if (Array.isArray(data)) {
    return data
  }
  
  throw new Error('Invalid response format from cities API')
}

/**
 * Cities data fetching composable
 * 
 * Uses TanStack Query for caching, background refetching,
 * and optimistic updates. Provides loading and error states.
 * 
 * @returns Query result with cities data, loading, and error states
 */
export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

/**
 * Prefetch cities data
 * 
 * Used for server-side rendering or route preloading
 */
export const prefetchCities = async () => {
  const queryClient = useQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['cities'],
    queryFn: fetchCities,
  })
}