/**
 * @file index.ts
 * @role Barrel export for event atoms
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 * @ssot Central export point for all event atoms
 */

// Card-specific atoms
export { default as EventCardActionButton } from './EventCardActionButton.vue'
export { default as EventCardImage } from './EventCardImage.vue'
export { default as EventCardOverlay } from './EventCardOverlay.vue'
export { default as EventCardPriceBadge } from './EventCardPriceBadge.vue'

// Generic event atoms
export { default as EventDate } from './EventDate.vue'
export { default as EventLocation } from './EventLocation.vue'
export { default as EventPrice } from './EventPrice.vue'
export { default as EventTime } from './EventTime.vue'