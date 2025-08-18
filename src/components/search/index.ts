/**
 * @file index.ts
 * @role Barrel export for search components
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Main search components
export { default as SearchBox } from './SearchBox.vue'

// Re-export atom components
export * from './atoms'

// Re-export molecule components
export * from './molecules'