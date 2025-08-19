/**
 * @file useEventsQuery.ts
 * @role TanStack Query composables for events data fetching
 * @patterns Custom Hook Pattern, Query Key Pattern, Infinite Query Pattern, Suspense Pattern
 * @solid SRP (Event queries only), OCP (Extensible), DIP (Depends on abstractions)
 */

import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { computed, type MaybeRef, unref } from 'vue'

import { eventQueryKeys } from '@/lib/types/event.types'
import type {
  Event,
  EventsQueryParams,
  EventsApiResponse,
} from '@/lib/types/event.types'
import { eventApiService } from '@/services/api'

/**
 * useEventsQuery - TanStack Query composables for events data fetching
 *
 * Provides comprehensive Vue Query composables for events API integration including
 * standard queries, infinite queries, suspense queries, and specialized composables
 * for city-specific and search-based event fetching with proper caching.
 *
 * Design Patterns Applied:
 * - Composable Pattern: Encapsulates TanStack Query logic for reuse
 * - Query Key Pattern: Consistent query key generation for cache management
 * - Infinite Query Pattern: Pagination support with automatic data merging
 * - Suspense Pattern: Suspense-compatible queries for loading boundaries
 */

/**
 * Query functions for events API
 */
const fetchEvents = async (
  params: EventsQueryParams
): Promise<EventsApiResponse> => {
  return await eventApiService.getEvents(params)
}

const fetchEventsByCity = async (
  citySlug: string
): Promise<EventsApiResponse> => {
  const params: EventsQueryParams = {
    search: citySlug, // Use search parameter with citySlug value
    limit: 50,
    offset: 0,
    sortBy: 'date',
    order: 'asc',
  }
  return await eventApiService.getEvents(params)
}

const fetchEventsWithSearch = async (
  searchQuery: string
): Promise<EventsApiResponse> => {
  const params: EventsQueryParams = {
    search: searchQuery,
    limit: 50,
    offset: 0,
    sortBy: 'date',
    order: 'asc',
  }
  return await eventApiService.getEvents(params)
}

const fetchPaginatedEvents = async (params: {
  page: number
  limit: number
  search?: string
  sortBy?: 'date' | 'name' | 'price'
  order?: 'asc' | 'desc'
}): Promise<EventsApiResponse> => {
  const queryParams: EventsQueryParams = {
    limit: params.limit,
    offset: (params.page - 1) * params.limit,
    sortBy: params.sortBy || 'date',
    order: params.order || 'asc',
    ...(params.search && { search: params.search }),
  }
  return await eventApiService.getEvents(queryParams)
}

const fetchEventBySlug = async (slug: string): Promise<Event> => {
  return await eventApiService.getEventBySlug(slug)
}

/**
 * Composable for fetching events with pagination and filtering
 * Follows Vue 3 Composition API Pattern with data logic abstraction
 */
export function useEventsQuery(
  params?: MaybeRef<EventsQueryParams | undefined>
) {
  const queryParams = computed(() => {
    const defaultParams: EventsQueryParams = {
      limit: 20,
      offset: 0,
      sortBy: 'date',
      order: 'asc',
    }
    const unwrappedParams = unref(params)
    return { ...defaultParams, ...unwrappedParams }
  })

  const queryKey = computed(() => {
    const filters = Object.fromEntries(
      Object.entries(queryParams.value).filter(
        ([, value]) => value !== undefined
      )
    )
    return eventQueryKeys.list(filters)
  })

  return useQuery({
    queryKey,
    queryFn: () => fetchEvents(queryParams.value),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for fetching events by city slug
 * CRITICAL: Uses search parameter with citySlug value
 * Example: useEventsByCity('austin') -> GET /api/events?search=austin
 */
export function useEventsByCity(
  citySlug: MaybeRef<string>,
  enabled: MaybeRef<boolean> = true
) {
  const unwrappedCitySlug = computed(() => unref(citySlug))
  const isEnabled = computed(
    () => unref(enabled) && Boolean(unwrappedCitySlug.value)
  )

  const queryKey = computed(() =>
    eventQueryKeys.list({ search: unwrappedCitySlug.value })
  )

  return useQuery({
    queryKey,
    queryFn: () => fetchEventsByCity(unwrappedCitySlug.value),
    enabled: isEnabled,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for searching events
 * Uses search parameter for text-based searching
 */
export function useEventsSearch(
  searchQuery: MaybeRef<string>,
  enabled: MaybeRef<boolean> = true
) {
  const unwrappedSearchQuery = computed(() => unref(searchQuery))
  const isEnabled = computed(
    () => unref(enabled) && Boolean(unwrappedSearchQuery.value.trim())
  )

  const queryKey = computed(() =>
    eventQueryKeys.list({ search: unwrappedSearchQuery.value })
  )

  return useQuery({
    queryKey,
    queryFn: () => fetchEventsWithSearch(unwrappedSearchQuery.value),
    enabled: isEnabled,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for infinite pagination of events
 * Implements infinite scrolling pattern with TanStack Query
 */
export function useInfiniteEventsQuery(
  baseParams: MaybeRef<
    Partial<Omit<EventsQueryParams, 'limit' | 'offset'>>
  > = {},
  itemsPerPage: MaybeRef<number> = 20
) {
  const unwrappedBaseParams = computed(() => unref(baseParams))
  const unwrappedItemsPerPage = computed(() => unref(itemsPerPage))

  const queryKey = computed(() => {
    const params = Object.fromEntries(
      Object.entries({
        ...unwrappedBaseParams.value,
        limit: unwrappedItemsPerPage.value,
      }).filter(([, value]) => value !== undefined)
    )
    return eventQueryKeys.list(params)
  })

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      const params: Parameters<typeof fetchPaginatedEvents>[0] = {
        page: pageParam as number,
        limit: unwrappedItemsPerPage.value,
        sortBy: unwrappedBaseParams.value.sortBy || 'date',
        order: unwrappedBaseParams.value.order || 'asc',
      }
      if (unwrappedBaseParams.value.search) {
        params.search = unwrappedBaseParams.value.search
      }
      return fetchPaginatedEvents(params)
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination) return undefined

      const { total, limit } = lastPage.pagination
      const currentPage = allPages.length
      const hasMore = currentPage * limit < total

      return hasMore ? currentPage + 1 : undefined
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

/**
 * Composable for fetching a single event by slug
 * Follows single responsibility principle with focused functionality
 */
export function useEventQuery(
  slug: MaybeRef<string>,
  enabled: MaybeRef<boolean> = true
) {
  const unwrappedSlug = computed(() => unref(slug))
  const isEnabled = computed(
    () => unref(enabled) && Boolean(unwrappedSlug.value)
  )

  const queryKey = computed(() => eventQueryKeys.detail(unwrappedSlug.value))

  return useQuery({
    queryKey,
    queryFn: () => fetchEventBySlug(unwrappedSlug.value),
    enabled: isEnabled,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual events
    refetchOnWindowFocus: false,
  })
}

/**
 * Suspense-enabled composable for fetching single event
 * Uses Vue 3 Suspense integration pattern
 */
export function useEventSuspenseQuery(slug: MaybeRef<string>) {
  const unwrappedSlug = computed(() => unref(slug))
  const queryKey = computed(() => eventQueryKeys.detail(unwrappedSlug.value))

  return useQuery({
    queryKey,
    queryFn: () => fetchEventBySlug(unwrappedSlug.value),
    staleTime: 10 * 60 * 1000,
  })
}

/**
 * Utility composable for combining events data with computed values
 * Follows Vue 3 pattern of extracting logic into composables
 */
export function useEventsWithMeta(
  params?: MaybeRef<EventsQueryParams | undefined>
) {
  const eventsQuery = useEventsQuery(params)

  const computedData = computed(() => {
    if (!eventsQuery.data.value?.data) {
      return {
        events: [],
        totalCount: 0,
        hasEvents: false,
        eventsByCity: new Map<string, Event[]>(),
      }
    }

    const events = eventsQuery.data.value.data
    const totalCount = eventsQuery.data.value.pagination?.total || events.length

    // Group events by city for enhanced filtering
    const eventsByCity = events.reduce((acc, event) => {
      const citySlug = event.citySlug
      if (!acc.has(citySlug)) {
        acc.set(citySlug, [])
      }
      const cityEvents = acc.get(citySlug)
      if (cityEvents) {
        cityEvents.push(event)
      }
      return acc
    }, new Map<string, Event[]>())

    return {
      events,
      totalCount,
      hasEvents: events.length > 0,
      eventsByCity,
    }
  })

  return {
    ...eventsQuery,
    ...computedData.value,
  }
}

/**
 * Utility types for composable consumers
 */
export type EventsQueryResult = ReturnType<typeof useEventsQuery>
export type EventQueryResult = ReturnType<typeof useEventQuery>
export type EventsSearchResult = ReturnType<typeof useEventsSearch>
export type InfiniteEventsResult = ReturnType<typeof useInfiniteEventsQuery>
export type EventsWithMetaResult = ReturnType<typeof useEventsWithMeta>
