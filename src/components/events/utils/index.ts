/**
 * @file index.ts
 * @role Barrel export for event utilities
 * @patterns Module Pattern, Facade Pattern
 * @solid SRP (Export management), ISP (Interface segregation)
 */

// Export all formatters
export {
  formatEventDate,
  formatEventTime,
  formatEventPrice,
  formatEventLocation,
  formatEventTitle,
  formatRelativeTime,
  formatEventSummary,
} from './formatters'

// Export all validators
export {
  isValidEvent,
  isUpcomingEvent,
  isPastEvent,
  isEventToday,
  isFreeEvent,
  isEventInPriceRange,
  isValidEventDate,
  isValidEventPrice,
  isValidSearchQuery,
  doesEventMatchSearch,
  isValidEventsArray,
} from './validators'