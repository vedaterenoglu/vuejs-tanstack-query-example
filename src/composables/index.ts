/**
 * @file index.ts
 * @role Barrel export for composables
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Theme composable
export { useTheme } from './useTheme'

// Re-export tanstack composables if they exist - COMMENTED UNTIL WE FIX THEM
// export * from './tanstack'
