/**
 * @file index.ts
 * @role Barrel export for events components
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only), OCP (Open for extension)
 * @ssot Central export point for all event components
 */

// Main components
export { default as EventCard } from './EventCard.vue'
export { default as EventGrid } from './EventGrid.vue'

// Re-export atoms
export * from './atoms'

// Re-export molecules
export * from './molecules'

// Re-export types
export type * from './types'

// Re-export composables
export { useEventCard } from './composables/useEventCard'
export { useEventGrid } from './composables/useEventGrid'