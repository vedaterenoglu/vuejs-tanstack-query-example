/**
 * @file useCitiesQuery.ts
 * @role TanStack Query composables for cities data fetching
 * @patterns Custom Hook Pattern, Factory Pattern, Memoization Pattern
 * @solid SRP (City queries only), OCP (Extensible), ISP (Focused interfaces), DIP (Depends on abstractions)
 */

import {
  useQuery,
  useSuspenseQuery,
} from '@tanstack/vue-query'
import { computed, type MaybeRef, unref } from 'vue'

import { cityQueryKeys } from '@/lib/types/city.types'
import type { City, CitySearchOptions } from '@/lib/types/city.types'
import { cityApiService } from '@/services/api'

/**
 * useCitiesQuery - TanStack Query composables for cities data
 * 
 * Provides useQuery, useSuspenseQuery, and useCityQuery composables for fetching
 * cities data with search capabilities and individual city details.
 * 
 * Design Patterns Applied:
 * - Composable Pattern: Encapsulates TanStack Query logic
 * - Factory Pattern: Multiple query composable variants
 * - Memoization Pattern: Optimized query key and params computation
 */

/**
 * Query functions for cities API
 */
const fetchCities = async (): Promise<City[]> => {
  const response = await cityApiService.getCities()
  return response.data
}

const fetchCitiesWithSearch = async (searchQuery: string): Promise<City[]> => {
  const response = await cityApiService.getCities({ query: searchQuery })
  return response.data
}

const fetchCityBySlug = async (citySlug: string): Promise<City | undefined> => {
  return await cityApiService.getCityBySlug(citySlug)
}

/**
 * Composable for fetching cities data
 */
export function useCitiesQuery(options?: MaybeRef<CitySearchOptions | undefined>) {
  const queryParams = computed(() => {
    const defaultOptions: CitySearchOptions = {
      query: '',
      limit: 50,
      offset: 0,
    }
    const unwrappedOptions = unref(options)
    return { ...defaultOptions, ...unwrappedOptions }
  })

  const queryKey = computed(() => {
    const filters = Object.fromEntries(
      Object.entries(queryParams.value).filter(([, value]) => value !== undefined && value !== '')
    )
    return cityQueryKeys.list(filters)
  })

  return useQuery({
    queryKey,
    queryFn: () => fetchCities(),
    staleTime: 10 * 60 * 1000, // 10 minutes (cities change less frequently)
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for searching cities with query string
 * Implements debounced search pattern for performance
 * Open/Closed Principle: Extensible for different search strategies
 */
export function useCitiesSearch(
  searchQuery: MaybeRef<string>,
  enabled: MaybeRef<boolean> = true
) {
  const unwrappedSearchQuery = computed(() => unref(searchQuery))
  const isEnabled = computed(() =>
    unref(enabled) && Boolean(unwrappedSearchQuery.value.trim())
  )

  const queryKey = computed(() =>
    cityQueryKeys.list({ query: unwrappedSearchQuery.value })
  )

  return useQuery({
    queryKey,
    queryFn: () => fetchCitiesWithSearch(unwrappedSearchQuery.value),
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000, // 5 minutes for search results
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for fetching a single city by slug
 * Dependency Inversion: Abstracts API implementation details
 * Single Responsibility: Focused on single city data management
 */
export function useCityQuery(
  citySlug: MaybeRef<string>,
  enabled: MaybeRef<boolean> = true
) {
  const unwrappedCitySlug = computed(() => unref(citySlug))
  const isEnabled = computed(() => unref(enabled) && Boolean(unwrappedCitySlug.value))

  const queryKey = computed(() => cityQueryKeys.detail(unwrappedCitySlug.value))

  return useQuery({
    queryKey,
    queryFn: () => fetchCityBySlug(unwrappedCitySlug.value),
    enabled: isEnabled,
    staleTime: 15 * 60 * 1000, // 15 minutes for individual cities
    refetchOnWindowFocus: false,
  })
}

/**
 * Suspense-enabled composable for fetching single city
 * Uses Vue 3 Suspense integration pattern
 * Interface Segregation: Focused interface for suspense consumers
 */
export function useCitySuspenseQuery(citySlug: MaybeRef<string>) {
  const unwrappedCitySlug = computed(() => unref(citySlug))
  const queryKey = computed(() => cityQueryKeys.detail(unwrappedCitySlug.value))

  return useSuspenseQuery({
    queryKey,
    queryFn: () => fetchCityBySlug(unwrappedCitySlug.value),
    staleTime: 15 * 60 * 1000,
  })
}

/**
 * Utility composable for combining cities data with computed values
 * Follows Vue 3 pattern of extracting logic into composables
 * Single Responsibility: Data transformation and computed properties
 */
export function useCitiesWithMeta(options?: MaybeRef<CitySearchOptions | undefined>) {
  const citiesQuery = useCitiesQuery(options)

  const computedData = computed(() => {
    if (!citiesQuery.data.value) {
      return {
        cities: [],
        totalCount: 0,
        hasCities: false,
        citiesByFirstLetter: new Map<string, City[]>(),
        popularCities: [],
      }
    }

    const cities = citiesQuery.data.value
    const totalCount = cities.length

    // Group cities by first letter for enhanced navigation
    const citiesByFirstLetter = cities.reduce((acc: Map<string, City[]>, city: City) => {
      const firstLetter = city.city.charAt(0).toUpperCase()
      if (!acc.has(firstLetter)) {
        acc.set(firstLetter, [])
      }
      const letterCities = acc.get(firstLetter)
      if (letterCities) {
        letterCities.push(city)
      }
      return acc
    }, new Map<string, City[]>())

    // Sort cities by name for popular cities (could be extended with analytics)
    const popularCities = [...cities]
      .sort((a, b) => a.city.localeCompare(b.city))
      .slice(0, 10)

    return {
      cities,
      totalCount,
      hasCities: cities.length > 0,
      citiesByFirstLetter,
      popularCities,
    }
  })

  return {
    ...citiesQuery,
    ...computedData.value,
  }
}

/**
 * Composable for checking city existence
 * Implements business logic for city validation
 * Single Responsibility: City existence checking
 */
export function useCityExists(
  citySlug: MaybeRef<string>,
  enabled: MaybeRef<boolean> = true
) {
  const unwrappedCitySlug = computed(() => unref(citySlug))
  const isEnabled = computed(() => unref(enabled) && Boolean(unwrappedCitySlug.value))

  const queryKey = computed(() => [...cityQueryKeys.detail(unwrappedCitySlug.value), 'exists'])

  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const city = await fetchCityBySlug(unwrappedCitySlug.value)
        return { exists: Boolean(city), city }
      } catch {
        return { exists: false, city: null }
      }
    },
    enabled: isEnabled,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for city validation utilities
 * Implements client-side validation rules
 * Single Responsibility: City validation logic
 */
export function useCityValidation() {
  return {
    /**
     * Validate city slug format
     * Client-side validation before API calls
     */
    validateCitySlug: (slug: string): { isValid: boolean; error?: string } => {
      if (!slug) {
        return { isValid: false, error: 'City slug is required' }
      }
      if (slug.length > 50) {
        return { isValid: false, error: 'City slug too long (max 50 characters)' }
      }
      if (!/^[a-z0-9-]+$/.test(slug)) {
        return { isValid: false, error: 'City slug must contain only lowercase letters, numbers, and hyphens' }
      }
      return { isValid: true }
    },
  }
}

/**
 * Composable for cities filtering and sorting operations
 * Implements client-side data manipulation patterns
 * Open/Closed Principle: Extensible for new filter types
 */
export function useCitiesFilter() {
  return {
    /**
     * Filter cities by search query
     * Implements fuzzy search on city name and slug
     */
    filterCitiesByQuery: (cities: City[], query: string): City[] => {
      if (!query.trim()) return cities

      const searchTerm = query.toLowerCase().trim()
      return cities.filter(
        city =>
          city.city.toLowerCase().includes(searchTerm) ||
          city.citySlug.toLowerCase().includes(searchTerm)
      )
    },

    /**
     * Sort cities by various criteria
     * Implements multiple sorting strategies
     */
    sortCities: (cities: City[], sortBy: 'name' | 'slug' | 'created' = 'name'): City[] => {
      return [...cities].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.city.localeCompare(b.city)
          case 'slug':
            return a.citySlug.localeCompare(b.citySlug)
          case 'created':
            if (!a.createdAt || !b.createdAt) return 0
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          default:
            return 0
        }
      })
    },

    /**
     * Group cities alphabetically
     * Returns Map for efficient lookups
     */
    groupCitiesAlphabetically: (cities: City[]): Map<string, City[]> => {
      return cities.reduce((acc, city) => {
        const firstLetter = city.city.charAt(0).toUpperCase()
        if (!acc.has(firstLetter)) {
          acc.set(firstLetter, [])
        }
        const letterCities = acc.get(firstLetter)
        if (letterCities) {
          letterCities.push(city)
        }
        return acc
      }, new Map<string, City[]>())
    },
  }
}

/**
 * Compound composable that provides comprehensive city functionality
 * Follows Compound Components pattern for related functionality
 * Dependency Inversion: High-level module depends on abstractions
 */
export function useCityOperations(citySlug?: MaybeRef<string | undefined>) {
  const citiesQuery = useCitiesQuery()
  const unwrappedCitySlug = computed(() => unref(citySlug) || '')
  const cityQuery = useCityQuery(unwrappedCitySlug, computed(() => Boolean(unwrappedCitySlug.value)))
  const cityExists = useCityExists(unwrappedCitySlug, computed(() => Boolean(unwrappedCitySlug.value)))
  const validation = useCityValidation()
  const filter = useCitiesFilter()

  return {
    // Query results
    cities: citiesQuery,
    city: cityQuery,
    exists: cityExists,

    // Utility functions
    validation,
    filter,

    // Combined loading state
    isLoading: computed(() =>
      citiesQuery.isLoading.value || cityQuery.isLoading.value || cityExists.isLoading.value
    ),

    // Combined error state
    error: computed(() =>
      citiesQuery.error.value || cityQuery.error.value || cityExists.error.value
    ),

    // Helper methods
    getCityBySlug: (slug: string) => {
      return citiesQuery.data.value?.find((city: City) => city.citySlug === slug)
    },

    searchCities: (query: string) => {
      if (!citiesQuery.data.value) return []
      return filter.filterCitiesByQuery(citiesQuery.data.value, query)
    },

    // Data availability checks
    hasCitiesData: computed(() => Boolean(citiesQuery.data.value?.length)),
    hasCityData: computed(() => Boolean(cityQuery.data.value)),
  }
}

/**
 * Utility types for composable consumers
 * Type safety and IntelliSense support
 */
export type CitiesQueryResult = ReturnType<typeof useCitiesQuery>
export type CityQueryResult = ReturnType<typeof useCityQuery>
export type CitiesSearchResult = ReturnType<typeof useCitiesSearch>
export type CitiesWithMetaResult = ReturnType<typeof useCitiesWithMeta>
export type CityExistsResult = ReturnType<typeof useCityExists>
export type CityValidationResult = ReturnType<typeof useCityValidation>
export type CitiesFilterResult = ReturnType<typeof useCitiesFilter>
export type CityOperationsResult = ReturnType<typeof useCityOperations>