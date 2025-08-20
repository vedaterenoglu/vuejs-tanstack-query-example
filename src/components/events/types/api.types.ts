/**
 * @file api.types.ts
 * @role API-related types for events
 * @patterns Type Safety Pattern, DTO Pattern
 * @solid ISP (API-specific interfaces)
 */

import type { Event } from './event.types'

/**
 * Events API response structure
 */
export interface EventsResponse {
  events: Event[]
  count: number
  pagination?: {
    limit: number
    offset: number
    hasMore: boolean
    total?: number
  }
}

/**
 * Query parameters for events fetching
 */
export interface EventsQueryParams {
  limit?: number
  offset?: number
  search?: string
  sortBy?: 'date' | 'name' | 'price' | 'city'
  order?: 'asc' | 'desc'
}