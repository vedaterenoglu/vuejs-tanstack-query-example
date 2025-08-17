/**
 * @file index.ts
 * @role Barrel export for API services
 * @patterns Barrel Export Pattern, Facade Pattern
 * @solid SRP (Export management only)
 */

// Export facades
export { eventApiService, cityApiService } from './facades'
export { createEventApiService, createCityApiService } from './facades'
export type { EventApiService, CityApiService } from './facades'

// Export adapters
export { FetchAdapter } from './adapters'

// Export interfaces
export type {
  HttpClient,
  HttpError,
  HttpRequestConfig,
  HttpResponse,
} from './interfaces'