/**
 * @file useEventData.ts
 * @role Event data composable - fetches and manages event data
 * @patterns Composable Pattern, Repository Pattern
 * @solid SRP (Event data only), DIP (Depends on service abstraction)
 */

import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'

import type { Event } from '@/components/events/types'
import { eventApiService } from '@/services/api/facades/eventApi'

/**
 * useEventData Composable
 *
 * Features:
 * - Fetches single event data using TanStack Query
 * - Provides loading and error states
 * - Caches event data
 * - Returns formatted event data
 *
 * Design Patterns:
 * - Composable Pattern: Encapsulates event data logic
 * - Repository Pattern: Abstracts data access
 * - SOLID: Single Responsibility (event data management)
 */
export function useEventData(slug: string) {
  // TanStack Query for event data fetching
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['event', slug],
    queryFn: () => eventApiService.getEventBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  })

  // Computed properties for formatted data
  const event = computed<Event | null>(() => data.value || null)

  const formattedPrice = computed(() => {
    if (!event.value) return ''
    return event.value.price === 0 ? 'Free' : `$${event.value.price.toFixed(2)}`
  })

  const formattedDate = computed(() => {
    if (!event.value) return ''
    const date = new Date(event.value.date)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  })

  const formattedTime = computed(() => {
    if (!event.value) return ''
    const date = new Date(event.value.date)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  })

  return {
    // Data
    event,
    formattedPrice,
    formattedDate,
    formattedTime,

    // States
    isLoading,
    error,

    // Actions
    refetch,
  }
}
