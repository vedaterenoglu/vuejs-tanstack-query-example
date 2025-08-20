/**
 * @file index.ts
 * @role Event data formatters
 * @patterns Utility Pattern, Facade Pattern
 * @solid SRP (Single formatting responsibility per function)
 */

import type { Event } from '../../types'

/**
 * Format event date for display
 */
export function formatEventDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options,
    }
    
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj)
  } catch {
    return typeof date === 'string' ? date : 'Invalid date'
  }
}

/**
 * Format event time for display
 */
export function formatEventTime(
  time: string | Date,
  format: '12h' | '24h' = '12h'
): string {
  try {
    const dateObj = typeof time === 'string' ? new Date(time) : time
    
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: format === '12h',
    }
    
    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
  } catch {
    return typeof time === 'string' ? time : 'Invalid time'
  }
}

/**
 * Format event price for display
 */
export function formatEventPrice(
  price: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  if (price === 0) {
    return 'Free'
  }
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(price)
  } catch {
    return `$${price.toFixed(2)}`
  }
}

/**
 * Format event location for display
 */
export function formatEventLocation(
  location: string,
  city?: string,
  maxLength = 50
): string {
  const fullLocation = city ? `${location}, ${city}` : location
  
  if (fullLocation.length <= maxLength) {
    return fullLocation
  }
  
  return `${fullLocation.substring(0, maxLength - 3)}...`
}

/**
 * Format event title with truncation
 */
export function formatEventTitle(
  title: string,
  maxLength = 60
): string {
  if (title.length <= maxLength) {
    return title
  }
  
  return `${title.substring(0, maxLength - 3)}...`
}

/**
 * Format relative time (e.g., "2 days ago", "in 3 hours")
 */
export function formatRelativeTime(date: string | Date): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = dateObj.getTime() - now.getTime()
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Tomorrow'
    } else if (diffDays === -1) {
      return 'Yesterday'
    } else if (diffDays > 0 && diffDays <= 7) {
      return `In ${diffDays} days`
    } else if (diffDays < 0 && diffDays >= -7) {
      return `${Math.abs(diffDays)} days ago`
    } else {
      return formatEventDate(dateObj)
    }
  } catch {
    return 'Invalid date'
  }
}

/**
 * Format event summary for cards
 */
export function formatEventSummary(event: Event): {
  title: string
  date: string
  location: string
  price: string
} {
  return {
    title: formatEventTitle(event.name),
    date: formatEventDate(event.date),
    location: formatEventLocation(event.location, event.city),
    price: formatEventPrice(event.price),
  }
}