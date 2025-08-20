/**
 * @file event.types.ts
 * @role Core event domain types
 * @patterns Type Safety Pattern
 * @solid ISP (Interface Segregation)
 */

/**
 * Core Event interface matching API response
 */
export interface Event {
  id: number
  name: string
  slug: string
  city: string
  citySlug: string
  location: string
  date: string
  organizerName: string
  imageUrl: string
  alt?: string
  description: string
  price: number
}

/**
 * Utility function types for events
 */
export interface FormatEventDateOptions {
  format?: 'short' | 'long' | 'relative'
  locale?: string
}

export interface FormatEventPriceOptions {
  currency?: string
  locale?: string
}