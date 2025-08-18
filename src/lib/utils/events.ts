/**
 * @file events.ts
 * @role Event utility functions
 * @patterns Utility Pattern, Pure Functions
 * @solid SRP (Single responsibility for each function)
 */

/**
 * Format event date to readable string
 * @param date - Date string to format
 * @param options - Intl date format options
 * @param locale - Locale string for formatting
 * @returns Formatted date string
 */
export function formatEventDate(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  },
  locale = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString(locale, options)
}

/**
 * Format event time to readable string
 * @param date - Date string to format
 * @param options - Intl time format options
 * @param locale - Locale string for formatting
 * @returns Formatted time string
 */
export function formatEventTime(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  },
  locale = 'en-US'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleTimeString(locale, options)
}

/**
 * Format event price to readable string
 * @param price - Price value to format
 * @param currency - Currency code
 * @param locale - Locale string for formatting
 * @returns Formatted price string or "Free" for zero price
 */
export function formatEventPrice(
  price: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  if (price === 0) {
    return 'Free'
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(price)
}