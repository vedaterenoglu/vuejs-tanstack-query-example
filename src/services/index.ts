/**
 * @file index.ts
 * @role Barrel export for all services
 * @patterns Barrel Export Pattern, Facade Pattern
 * @solid SRP (Export management only)
 */

// Export API services
export {
  eventApiService,
  cityApiService,
  createEventApiService,
  createCityApiService,
  FetchAdapter,
} from './api'

export type {
  EventApiService,
  CityApiService,
  HttpClient,
  HttpError,
  HttpRequestConfig,
  HttpResponse,
} from './api'

// Export payment services
export { processPayment, validatePaymentRequest } from './payment'

// Re-export convenience aliases
export { eventApiService as eventService } from './api'
export { cityApiService as cityService } from './api'