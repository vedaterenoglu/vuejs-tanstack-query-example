/**
 * @file index.ts
 * @role Barrel export for composables
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Theme composable
export { useTheme } from './useTheme'

// Event composables
export { useEvents, useInfiniteEvents } from './useEvents'

// Utility composables
export { useAnimation } from './useAnimation'
export { useDebounce } from './useDebounce'
export { useIntersectionObserver } from './useIntersectionObserver'
export { useInfiniteScroll } from './useInfiniteScroll'

// Re-export tanstack composables if they exist - COMMENTED UNTIL WE FIX THEM
// export * from './tanstack'
