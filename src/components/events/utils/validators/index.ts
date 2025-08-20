/**
 * @file index.ts
 * @role Event data validators
 * @patterns Validation Pattern, Guard Pattern
 * @solid SRP (Single validation responsibility per function)
 */

import type { Event } from '../../types'

/**
 * Check if event is valid
 */
export function isValidEvent(event: unknown): event is Event {
  if (!event || typeof event !== 'object') {
    return false
  }
  
  const e = event as Record<string, unknown>
  
  return (
    typeof e.id === 'number' &&
    typeof e.name === 'string' &&
    typeof e.slug === 'string' &&
    typeof e.city === 'string' &&
    typeof e.location === 'string' &&
    typeof e.date === 'string' &&
    typeof e.price === 'number' &&
    e.name.length > 0 &&
    e.slug.length > 0
  )
}

/**
 * Check if event date is in the future
 */
export function isUpcomingEvent(event: Event): boolean {
  try {
    const eventDate = new Date(event.date)
    const now = new Date()
    return eventDate > now
  } catch {
    return false
  }
}

/**
 * Check if event date is in the past
 */
export function isPastEvent(event: Event): boolean {
  try {
    const eventDate = new Date(event.date)
    const now = new Date()
    return eventDate < now
  } catch {
    return false
  }
}

/**
 * Check if event is today
 */
export function isEventToday(event: Event): boolean {
  try {
    const eventDate = new Date(event.date)
    const today = new Date()
    
    return (
      eventDate.getFullYear() === today.getFullYear() &&
      eventDate.getMonth() === today.getMonth() &&
      eventDate.getDate() === today.getDate()
    )
  } catch {
    return false
  }
}

/**
 * Check if event is free
 */
export function isFreeEvent(event: Event): boolean {
  return event.price === 0
}

/**
 * Check if event is within price range
 */
export function isEventInPriceRange(
  event: Event,
  minPrice: number,
  maxPrice: number
): boolean {
  return event.price >= minPrice && event.price <= maxPrice
}

/**
 * Validate event date string
 */
export function isValidEventDate(dateString: string): boolean {
  if (!dateString) {
    return false
  }
  
  try {
    const date = new Date(dateString)
    return !isNaN(date.getTime())
  } catch {
    return false
  }
}

/**
 * Validate event price
 */
export function isValidEventPrice(price: unknown): price is number {
  return typeof price === 'number' && price >= 0 && isFinite(price)
}

/**
 * Validate event search query
 */
export function isValidSearchQuery(query: string): boolean {
  return query.length >= 2 && query.length <= 100
}

/**
 * Check if event matches search criteria
 */
export function doesEventMatchSearch(
  event: Event,
  searchQuery: string
): boolean {
  if (!searchQuery) {
    return true
  }
  
  const query = searchQuery.toLowerCase()
  
  return (
    event.name.toLowerCase().includes(query) ||
    event.description?.toLowerCase().includes(query) ||
    event.location.toLowerCase().includes(query) ||
    event.city.toLowerCase().includes(query) ||
    event.organizerName?.toLowerCase().includes(query) ||
    false
  )
}

/**
 * Validate events array
 */
export function isValidEventsArray(events: unknown): events is Event[] {
  if (!Array.isArray(events)) {
    return false
  }
  
  return events.every(isValidEvent)
}