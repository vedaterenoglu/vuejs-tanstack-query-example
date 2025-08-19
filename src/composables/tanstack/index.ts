/**
 * @file index.ts
 * @role Barrel export for TanStack Query composables
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Events Query Composables
export {
  useEventsQuery,
  useEventsByCity,
  useEventsSearch,
  useInfiniteEventsQuery,
  useEventQuery,
  useEventSuspenseQuery,
  useEventsWithMeta,
} from './useEventsQuery'

export type {
  EventsQueryResult,
  EventQueryResult,
  EventsSearchResult,
  InfiniteEventsResult,
  EventsWithMetaResult,
} from './useEventsQuery'

// Cities Query Composables
export {
  useCitiesQuery,
  useCitiesSearch,
  useCityQuery,
  useCitySuspenseQuery,
  useCitiesWithMeta,
  useCityExists,
  useCityValidation,
  useCitiesFilter,
  useCityOperations,
} from './useCitiesQuery'

export type {
  CitiesQueryResult,
  CityQueryResult,
  CitiesSearchResult,
  CitiesWithMetaResult,
  CityExistsResult,
  CityValidationResult,
  CitiesFilterResult,
  CityOperationsResult,
} from './useCitiesQuery'

// Events Mutation Composables
export {
  useCreateEvent,
  useUpdateEvent,
  useDeleteEvent,
  useEventMutations,
  useBatchEventOperations,
} from './useEventsMutations'

export type {
  CreateEventMutation,
  UpdateEventMutation,
  DeleteEventMutation,
  EventMutationsResult,
  BatchEventOperationsResult,
} from './useEventsMutations'
