/**
 * @file index.ts
 * @role Barrel export for event composables
 * @patterns Module Pattern
 * @solid SRP (Export management only)
 */

export { useEventSearch } from './useEventSearch'
export type { SearchParams, UseEventSearchReturn } from './useEventSearch'

export { useEventGrid } from './useEventGrid'
export type { GridConfig, UseEventGridReturn } from './useEventGrid'

export { useEventNavigation } from './useEventNavigation'
export type { NavigationOptions, UseEventNavigationReturn } from './useEventNavigation'

export { useEventCard } from './useEventCard'
export type { EventCardOptions, UseEventCardReturn } from './useEventCard'