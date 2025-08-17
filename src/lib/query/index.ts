/**
 * @file index.ts
 * @role Barrel export for query utilities
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Query client configuration
export * from './queryClient'

// Cache persistence
export {
  persistenceService,
  createPersistenceService,
  usePersistence,
  QueryPersistenceService,
  BrowserStorage,
  MemoryStorage,
} from './persistence'

export type { StorageInterface, PersistenceConfig } from './persistence'
