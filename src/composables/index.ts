/**
 * @file index.ts
 * @role Barrel export for composables
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Theme composable
export { useTheme } from './useTheme'

// City composables
export { useCities } from './useCities'
export { useCityCard } from './useCityCard'
export { useCitySelection } from './useCitySelection'

// Utility composables
export { useAnimation } from './useAnimation'
export { useDebounce } from './useDebounce'
export { useIntersectionObserver } from './useIntersectionObserver'

// Re-export tanstack composables if they exist - COMMENTED UNTIL WE FIX THEM
// export * from './tanstack'
