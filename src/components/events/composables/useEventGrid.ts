/**
 * @file useEventGrid.ts
 * @role Grid data management composable for events
 * @patterns Composition Pattern, Facade Pattern
 * @solid SRP (Grid data management only), DIP (Depends on abstractions)
 * @ssot TanStack Query for server state
 */


import type { Event } from '@/components/events/types'
import { useInfiniteEvents, useInfiniteScroll } from '@/composables'

import type { SearchParams } from './useEventSearch'
import type { ComputedRef, Ref } from 'vue'

/**
 * Grid configuration interface
 */
export interface GridConfig {
  itemsPerPage?: number
  scrollOptions?: {
    rootMargin?: string
    loadMoreDelay?: number
    enabled?: boolean
  }
}

/**
 * useEventGrid return type
 */
export interface UseEventGridReturn {
  // Data
  events: ComputedRef<Event[]>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
  
  // Infinite scroll
  hasMore: Ref<boolean>
  isFetchingNext: Ref<boolean>
  sentinelRef: Ref<HTMLElement | null>
  
  // Actions
  refetch: (() => unknown) | (() => Promise<unknown>)
}

/**
 * Composable for managing event grid data and infinite scroll
 * 
 * Features:
 * - Manages event data fetching via TanStack Query
 * - Handles infinite scroll pagination
 * - Provides loading and error states
 * - Encapsulates grid-specific data logic
 * 
 * SOLID Principles:
 * - SRP: Only handles grid data management
 * - OCP: Extensible via configuration
 * - DIP: Depends on query abstractions
 * 
 * @param searchParams - Search parameters for filtering
 * @param config - Grid configuration options
 * @returns Grid data and infinite scroll state
 */
export function useEventGrid(
  searchParams: ComputedRef<SearchParams>,
  config: GridConfig = {}
): UseEventGridReturn {
  const {
    itemsPerPage = 18,
    scrollOptions = {
      rootMargin: '200px',
      loadMoreDelay: 100,
      enabled: true,
    }
  } = config
  
  // Infinite query for events
  const infiniteQuery = useInfiniteEvents(searchParams, itemsPerPage)
  const { events, isLoading, error, refetch } = infiniteQuery
  
  // Infinite scroll management
  const infiniteScroll = useInfiniteScroll(infiniteQuery.query, scrollOptions)
  
  return {
    // Data
    events,
    isLoading,
    error,
    
    // Infinite scroll
    hasMore: infiniteScroll.hasNextPage,
    isFetchingNext: infiniteScroll.isFetchingNextPage,
    sentinelRef: infiniteScroll.sentinelRef,
    
    // Actions
    refetch,
  }
}