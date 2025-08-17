/**
 * @file useEventsMutations.ts
 * @role TanStack Query mutation composables for events CRUD operations
 * @patterns Custom Hook Pattern, Optimistic Updates Pattern, Command Pattern, Cache Invalidation Pattern
 * @solid SRP (Event mutations only), OCP (Extensible), DIP (Depends on abstractions)
 */

import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { computed } from 'vue'

import { eventQueryKeys } from '@/lib/types/event.types'
import type {
  Event,
  CreateEventDto,
  UpdateEventDto,
} from '@/lib/types/event.types'
import { eventApiService } from '@/services/api'

/**
 * useEventsMutations - TanStack Query mutation composables for events CRUD operations
 * 
 * Provides mutation composables for creating, updating, and deleting events with
 * optimistic updates, proper error handling, and automatic cache invalidation.
 * Implements consistent patterns for all event mutation operations.
 * 
 * Design Patterns Applied:
 * - Composable Pattern: Encapsulates mutation logic for reuse across components
 * - Optimistic Updates Pattern: Immediate UI updates with rollback on failure
 * - Command Pattern: Mutation operations as executable commands with undo
 * - Cache Invalidation Pattern: Strategic cache updates after successful mutations
 */

/**
 * Mutation functions for events API
 */
const createEvent = async (eventData: CreateEventDto): Promise<Event> => {
  return await eventApiService.createEvent(eventData)
}

const updateEvent = async (params: {
  slug: string
  updates: UpdateEventDto
}): Promise<Event> => {
  return await eventApiService.updateEvent(params.slug, params.updates)
}

const deleteEvent = async (slug: string): Promise<void> => {
  await eventApiService.deleteEvent(slug)
}

/**
 * Composable for creating new events with optimistic updates
 * Follows Vue 3 Composition API Pattern with proper error handling
 */
export function useCreateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEvent,

    // Optimistic update: Add event to cache immediately
    onMutate: async (newEventData: CreateEventDto) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventQueryKeys.all })

      // Snapshot the previous value for rollback
      const previousEvents = queryClient.getQueryData(eventQueryKeys.list())

      // Optimistically update the cache
      queryClient.setQueryData(eventQueryKeys.list(), (old: unknown) => {
        const typedOld = old as
          | { data?: Event[]; pagination?: { total: number } }
          | undefined
        if (!typedOld?.data) return typedOld

        // Create temporary event with optimistic data
        const tempEvent: Event = {
          id: Date.now(), // Temporary ID
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...newEventData,
          slug: newEventData.slug || `temp-${Date.now()}`, // Use provided slug or temporary
        }

        return {
          ...typedOld,
          data: [tempEvent, ...typedOld.data],
          pagination: typedOld.pagination
            ? {
                ...typedOld.pagination,
                total: typedOld.pagination.total + 1,
              }
            : undefined,
        }
      })

      // Return context for rollback
      return { previousEvents }
    },

    // On success: Invalidate and refetch to get real data
    onSuccess: async newEvent => {
      // Invalidate all events queries to ensure fresh data
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })

      // Optionally set the specific event data
      queryClient.setQueryData(eventQueryKeys.detail(newEvent.slug), newEvent)
    },

    // On error: Rollback optimistic update
    onError: (_error, _variables, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(
          eventQueryKeys.list(),
          context.previousEvents
        )
      }
    },

    // Always run after mutation
    onSettled: async () => {
      // Ensure cache is consistent
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },
  })
}

/**
 * Composable for updating events with optimistic updates
 * Implements proper cache management and rollback strategies
 */
export function useUpdateEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEvent,

    // Optimistic update: Update event in cache immediately
    onMutate: async ({ slug, updates }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventQueryKeys.detail(slug) })
      await queryClient.cancelQueries({ queryKey: eventQueryKeys.all })

      // Snapshot previous values for rollback
      const previousEvent = queryClient.getQueryData(eventQueryKeys.detail(slug))
      const previousEventsList = queryClient.getQueryData(eventQueryKeys.list())

      // Optimistically update single event cache
      queryClient.setQueryData(eventQueryKeys.detail(slug), (old: unknown) => {
        const typedOld = old as Event | undefined
        if (!typedOld) return typedOld
        const cleanUpdates = Object.fromEntries(
          Object.entries(updates).filter(([, value]) => value !== undefined)
        )
        return {
          ...typedOld,
          ...cleanUpdates,
          updatedAt: new Date().toISOString(),
        }
      })

      // Optimistically update events list cache
      queryClient.setQueryData(eventQueryKeys.list(), (old: unknown) => {
        const typedOld = old as { data?: Event[] } | undefined
        if (!typedOld?.data) return typedOld

        return {
          ...typedOld,
          data: typedOld.data.map((event: Event) => {
            if (event.slug === slug) {
              const cleanUpdates = Object.fromEntries(
                Object.entries(updates).filter(
                  ([, value]) => value !== undefined
                )
              )
              return {
                ...event,
                ...cleanUpdates,
                updatedAt: new Date().toISOString(),
              }
            }
            return event
          }),
        }
      })

      return { previousEvent, previousEventsList, slug }
    },

    // On success: Set the real updated data
    onSuccess: async (updatedEvent, { slug }) => {
      // Set the actual updated event
      queryClient.setQueryData(eventQueryKeys.detail(slug), updatedEvent)

      // Update in events list
      queryClient.setQueryData(eventQueryKeys.list(), (old: unknown) => {
        const typedOld = old as { data?: Event[] } | undefined
        if (!typedOld?.data) return typedOld

        return {
          ...typedOld,
          data: typedOld.data.map((event: Event) =>
            event.slug === slug ? updatedEvent : event
          ),
        }
      })

      // Invalidate related queries
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },

    // On error: Rollback optimistic updates
    onError: (_error, { slug }, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(eventQueryKeys.detail(slug), context.previousEvent)
      }
      if (context?.previousEventsList) {
        queryClient.setQueryData(
          eventQueryKeys.list(),
          context.previousEventsList
        )
      }
    },

    // Always run after mutation
    onSettled: async (_data, _error, { slug }) => {
      // Ensure specific event is up to date
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.detail(slug) })
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },
  })
}

/**
 * Composable for deleting events with optimistic updates
 * Implements proper removal and cache cleanup
 */
export function useDeleteEvent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEvent,

    // Optimistic update: Remove event from cache immediately
    onMutate: async (slug: string) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventQueryKeys.detail(slug) })
      await queryClient.cancelQueries({ queryKey: eventQueryKeys.all })

      // Snapshot previous values for rollback
      const previousEvent = queryClient.getQueryData(eventQueryKeys.detail(slug))
      const previousEventsList = queryClient.getQueryData(eventQueryKeys.list())

      // Optimistically remove from cache
      queryClient.removeQueries({ queryKey: eventQueryKeys.detail(slug) })

      // Optimistically remove from events list
      queryClient.setQueryData(eventQueryKeys.list(), (old: unknown) => {
        const typedOld = old as
          | { data?: Event[]; pagination?: { total: number } }
          | undefined
        if (!typedOld?.data) return typedOld

        const filteredData = typedOld.data.filter(
          (event: Event) => event.slug !== slug
        )

        return {
          ...typedOld,
          data: filteredData,
          pagination: typedOld.pagination
            ? {
                ...typedOld.pagination,
                total: typedOld.pagination.total - 1,
              }
            : undefined,
        }
      })

      return { previousEvent, previousEventsList, slug }
    },

    // On success: Clean up cache
    onSuccess: async (_, slug) => {
      // Ensure event is completely removed
      queryClient.removeQueries({ queryKey: eventQueryKeys.detail(slug) })

      // Invalidate events lists to ensure consistency
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },

    // On error: Restore optimistic updates
    onError: (_error, slug, context) => {
      if (context?.previousEvent) {
        queryClient.setQueryData(eventQueryKeys.detail(slug), context.previousEvent)
      }
      if (context?.previousEventsList) {
        queryClient.setQueryData(
          eventQueryKeys.list(),
          context.previousEventsList
        )
      }
    },

    // Always run after mutation
    onSettled: async () => {
      // Ensure all events queries are consistent
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },
  })
}

/**
 * Compound composable that provides all event mutations
 * Follows Compound Components pattern for related functionality
 */
export function useEventMutations() {
  const createMutation = useCreateEvent()
  const updateMutation = useUpdateEvent()
  const deleteMutation = useDeleteEvent()

  // Convenient handlers
  const createEventHandler = (eventData: CreateEventDto) => {
    createMutation.mutate(eventData)
  }

  const updateEventHandler = (slug: string, updates: UpdateEventDto) => {
    // Filter out undefined values
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined)
    ) as UpdateEventDto
    updateMutation.mutate({ slug, updates: cleanUpdates })
  }

  const deleteEventHandler = (slug: string) => {
    deleteMutation.mutate(slug)
  }

  return {
    // Individual mutations
    createMutation,
    updateMutation,
    deleteMutation,

    // Convenient handlers
    createEvent: createEventHandler,
    updateEvent: updateEventHandler,
    deleteEvent: deleteEventHandler,

    // Combined loading state
    isLoading: computed(() =>
      createMutation.isPending.value ||
      updateMutation.isPending.value ||
      deleteMutation.isPending.value
    ),

    // Combined error state
    error: computed(() =>
      createMutation.error.value || updateMutation.error.value || deleteMutation.error.value
    ),

    // Reset all mutations
    reset: () => {
      createMutation.reset()
      updateMutation.reset()
      deleteMutation.reset()
    },
  }
}

/**
 * Composable for batch operations on events
 * Implements efficient bulk operations with proper cache management
 */
export function useBatchEventOperations() {
  const queryClient = useQueryClient()

  const batchDelete = useMutation({
    mutationFn: async (slugs: string[]) => {
      // Execute all deletes in parallel
      await Promise.all(slugs.map(slug => deleteEvent(slug)))
    },

    onMutate: async (slugs: string[]) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: eventQueryKeys.all })

      // Snapshot previous state
      const previousEventsList = queryClient.getQueryData(eventQueryKeys.list())

      // Optimistically remove all events
      queryClient.setQueryData(eventQueryKeys.list(), (old: unknown) => {
        const typedOld = old as
          | { data?: Event[]; pagination?: { total: number } }
          | undefined
        if (!typedOld?.data) return typedOld

        const filteredData = typedOld.data.filter(
          (event: Event) => !slugs.includes(event.slug)
        )

        return {
          ...typedOld,
          data: filteredData,
          pagination: typedOld.pagination
            ? {
                ...typedOld.pagination,
                total: typedOld.pagination.total - slugs.length,
              }
            : undefined,
        }
      })

      // Remove individual event caches
      slugs.forEach(slug => {
        queryClient.removeQueries({ queryKey: eventQueryKeys.detail(slug) })
      })

      return { previousEventsList, slugs }
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },

    onError: (_error, _slugs, context) => {
      if (context?.previousEventsList) {
        queryClient.setQueryData(
          eventQueryKeys.list(),
          context.previousEventsList
        )
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: eventQueryKeys.all })
    },
  })

  return {
    batchDelete,
    deleteBatch: (slugs: string[]) => batchDelete.mutate(slugs),
  }
}

/**
 * Utility types for mutation consumers
 */
export type CreateEventMutation = ReturnType<typeof useCreateEvent>
export type UpdateEventMutation = ReturnType<typeof useUpdateEvent>
export type DeleteEventMutation = ReturnType<typeof useDeleteEvent>
export type EventMutationsResult = ReturnType<typeof useEventMutations>
export type BatchEventOperationsResult = ReturnType<
  typeof useBatchEventOperations
>