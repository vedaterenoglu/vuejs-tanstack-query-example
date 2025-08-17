/**
 * Types Index - Centralized type exports
 * Provides clean API surface for type imports throughout the application
 * Updated for TanStack Query patterns and SOLID principles
 */

// TanStack Query types
export type {
  TanStackQueryError,
  BaseQueryResult,
  BaseMutationResult,
  QueryOptions,
  MutationOptions,
  InfiniteQueryResult,
  InfiniteData,
  QueryKeyFactory,
  QueryState,
  OptimisticUpdateContext,
  RefetchStrategy,
  QueryClientConfig,
  QueryKey,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  UseMutationResult,
  UseInfiniteQueryResult,
} from './tanstack-query.types'

export {
  CACHE_TIMES,
  STALE_TIMES,
  isTanStackQueryError,
  isQuerySuccess,
  isMutationSuccess,
} from './tanstack-query.types'

// Event types
export type {
  Event,
  EventsApiResponse,
  SingleEventApiResponse,
  EventsQueryParams,
  FormattedEvent,
  CreateEventDto,
  UpdateEventDto,
  EventsQueryResult,
  EventQueryResult,
  EventMutationResult,
  EventQueryOptions,
  SingleEventQueryOptions,
  PaginationState,
  EventsClientState,
  PageCache,
  EventQueryKey,
} from './event.types'

export {
  EventSchema,
  EventsApiResponseSchema,
  SingleEventApiResponseSchema,
  EventsQueryParamsSchema,
  FormattedEventSchema,
  CreateEventSchema,
  UpdateEventSchema,
  PageCacheSchema,
  PaginationStateSchema,
  EventsClientStateSchema,
  validateEventsResponse,
  validateSingleEventResponse,
  validateEvent,
  eventQueryKeys,
} from './event.types'

// City types
export type {
  City,
  CreateCity,
  UpdateCity,
  CitiesApiResponse,
  CitySearchOptions,
  CityDisplay,
  CitiesQueryResult,
  CityQueryOptions,
  CitiesClientState,
  ApiError,
  CityQueryKey,
} from './city.types'

export {
  CitySchema,
  CreateCitySchema,
  UpdateCitySchema,
  CitiesApiResponseSchema,
  CitySearchOptionsSchema,
  CityDisplaySchema,
  CitiesClientStateSchema,
  ApiErrorSchema,
  validateCityResponse,
  validateCity,
  transformCityToDisplay,
  cityQueryKeys,
} from './city.types'
