/**
 * @file useEvents.ts
 * @role Events data fetching composable
 * @patterns Repository Pattern, Observer Pattern
 * @solid SRP (Events fetching only), DIP (Depends on abstractions)
 */

import { useQuery, useInfiniteQuery } from '@tanstack/vue-query'
import { computed, type MaybeRef, unref } from 'vue'

// Event interface
export interface Event {
  id: number
  name: string
  slug: string
  city: string
  citySlug: string
  location: string
  date: string
  organizerName: string
  imageUrl: string
  alt?: string
  description: string
  price: number
}

// Events response interface
interface EventsResponse {
  events: Event[]
  count: number
  pagination?: {
    limit: number
    offset: number
    hasMore: boolean
  }
}

/**
 * Fetch events from API with offset/limit pagination
 */
async function fetchEvents(params?: {
  limit?: number
  offset?: number
  search?: string
  orderBy?: 'date' | 'name' | 'city' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
}): Promise<EventsResponse> {
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  if (!baseUrl) {
    throw new Error(
      'API base URL is not configured. Please check your environment variables.'
    )
  }

  const queryParams = new URLSearchParams()

  if (params?.limit) queryParams.append('limit', params.limit.toString())
  if (params?.offset) queryParams.append('offset', params.offset.toString())
  if (params?.search) queryParams.append('search', params.search)
  if (params?.orderBy) queryParams.append('orderBy', params.orderBy)
  if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder)

  const url = `${baseUrl}/api/events${queryParams.toString() ? '?' + queryParams.toString() : ''}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`)
  }

  const data = await response.json()
  console.warn('[fetchEvents] API URL:', url)
  console.warn('[fetchEvents] API response:', data)
  console.warn('[fetchEvents] API events count:', data.events?.length)
  console.warn('[fetchEvents] API total count:', data.count)
  return data
}

/**
 * Fetch paginated events (converts page to offset)
 */
async function fetchPaginatedEvents(params: {
  page: number
  limit: number
  search?: string
  sortBy?: 'date' | 'name' | 'price'
  order?: 'asc' | 'desc'
}): Promise<EventsResponse> {
  // Convert page to offset (client-side pagination)
  const offset = (params.page - 1) * params.limit

  // Map sortBy values to backend expected values
  const orderBy = params.sortBy === 'price' ? 'name' : params.sortBy || 'date'

  return fetchEvents({
    limit: params.limit,
    offset,
    search: params.search,
    orderBy,
    sortOrder: params.order,
  })
}

/**
 * Composable for fetching and managing events data
 *
 * Features:
 * - TanStack Query integration
 * - Pagination support
 * - City filtering
 * - Error handling
 * - Loading states
 *
 * Design Patterns:
 * - Repository Pattern: Abstracts data access
 * - Observer Pattern: Reactive data updates
 */
export function useEvents(params?: {
  limit?: number
  offset?: number
  search?: string
  enabled?: boolean
}) {
  const queryKey = ['events', params?.limit, params?.offset, params?.search]

  const query = useQuery({
    queryKey,
    queryFn: () => fetchEvents(params),
    enabled: params?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Computed properties for easier access
  const events = computed(() => query.data.value?.events || [])
  const pagination = computed(() => query.data.value?.pagination)

  return {
    // Data
    events,
    pagination,
    data: query.data,

    // Query states
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    // Actions
    refetch: query.refetch,
  }
}

/**
 * Composable for infinite scroll events fetching
 *
 * Features:
 * - TanStack infinite query integration
 * - Client-side pagination (converts page to offset)
 * - Automatic page fetching
 * - Flattened events list
 *
 * @param baseParams - Base query parameters
 * @param itemsPerPage - Number of items per page (default: 18)
 * @returns Infinite query with flattened events
 */
export function useInfiniteEvents(
  baseParams: MaybeRef<{
    search?: string
    sortBy?: 'date' | 'name' | 'price'
    order?: 'asc' | 'desc'
  }> = {},
  itemsPerPage = 18
) {
  const queryKey = computed(() => [
    'events',
    'infinite',
    unref(baseParams),
    itemsPerPage,
  ])

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) => {
      const params = unref(baseParams)
      return fetchPaginatedEvents({
        page: pageParam as number,
        limit: itemsPerPage,
        search: params.search,
        sortBy: params.sortBy || 'date',
        order: params.order || 'asc',
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.pagination) return undefined

      const { hasMore } = lastPage.pagination
      const currentPage = allPages.length

      return hasMore ? currentPage + 1 : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  // Computed properties for easier access
  const events = computed(() => {
    console.warn('[useInfiniteEvents] query.data.value:', query.data.value)
    console.warn(
      '[useInfiniteEvents] query.data.value?.pages:',
      query.data.value?.pages
    )
    const result = query.data.value?.pages?.flatMap(page => page.events) || []
    console.warn('[useInfiniteEvents] computed events result:', result)
    console.warn('[useInfiniteEvents] computed events length:', result.length)
    return result
  })

  const totalCount = computed(() => {
    const firstPage = query.data.value?.pages[0]
    return firstPage?.count || 0
  })

  return {
    // Data
    events,
    totalCount,
    data: query.data,

    // Query states
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,

    // Infinite query specific
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,

    // Actions
    refetch: query.refetch,

    // Raw query for infinite scroll hook
    query,
  }
}
