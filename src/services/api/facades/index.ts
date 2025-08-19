/**
 * @file index.ts
 * @role Barrel export for API facade services
 * @patterns Barrel Export Pattern, Facade Pattern
 * @solid SRP (Export management only)
 */

// Event API service
export { eventApiService, createEventApiService } from './eventApi'
export type { EventApiService } from './eventApi'

// City API service
export { cityApiService, createCityApiService } from './cityApi'
export type { CityApiService } from './cityApi'
