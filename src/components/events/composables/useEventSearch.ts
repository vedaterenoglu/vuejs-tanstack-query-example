/**
 * @file useEventSearch.ts
 * @role Search logic composable for events
 * @patterns Composition Pattern, Facade Pattern
 * @solid SRP (Search logic only), DIP (Depends on Vue abstractions)
 * @ssot URL and local state for search
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Search parameters interface matching useInfiniteEvents
 */
export interface SearchParams {
  search?: string
  sortBy?: 'date' | 'name' | 'price'
  order?: 'asc' | 'desc'
}

/**
 * useEventSearch return type
 */
export interface UseEventSearchReturn {
  searchBoxQuery: Ref<string>
  urlSearchQuery: ComputedRef<string>
  searchParams: ComputedRef<SearchParams>
  handleSearchChange: (value: string) => void
  handleRefresh: (refetch: () => void) => void
}

/**
 * Composable for managing event search logic
 * 
 * Features:
 * - Manages search box input state
 * - Reads search from URL query params
 * - Combines URL and local search state
 * - Provides search parameter formatting
 * 
 * SOLID Principles:
 * - SRP: Only handles search-related logic
 * - OCP: Extensible via return interface
 * - DIP: Depends on Vue composition abstractions
 */
export function useEventSearch(): UseEventSearchReturn {
  const route = useRoute()
  
  // Local search state from SearchBox input
  const searchBoxQuery = ref('')
  
  // URL search query (can be city or text search)
  const urlSearchQuery = computed(() => (route.query.search as string) || '')
  
  // Combined search parameters
  const searchParams = computed<SearchParams>(() => ({
    // Use URL search if present, otherwise use SearchBox input
    search: urlSearchQuery.value || searchBoxQuery.value,
    sortBy: 'date' as const,
    order: 'asc' as const,
  }))
  
  // Search change handler
  const handleSearchChange = (value: string) => {
    searchBoxQuery.value = value
  }
  
  // Refresh handler - clears search and refetches
  const handleRefresh = (refetch: () => void) => {
    searchBoxQuery.value = ''
    void refetch()
  }
  
  return {
    searchBoxQuery,
    urlSearchQuery,
    searchParams,
    handleSearchChange,
    handleRefresh,
  }
}