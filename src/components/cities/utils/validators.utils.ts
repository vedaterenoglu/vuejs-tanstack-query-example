/**
 * @file validators.utils.ts
 * @role Data validation utility functions for city components
 * @patterns Utility Pattern, Guard Pattern
 * @solid SRP (Validation only), OCP (Extensible validators)
 */

import type { City } from '@/lib/types'

/**
 * Validate if value is a valid city object
 * 
 * @param value - Value to validate
 * @returns True if valid city object
 */
export function isValidCity(value: unknown): value is City {
  if (!value || typeof value !== 'object') return false
  
  const city = value as Record<string, unknown>
  
  return (
    typeof city.city === 'string' &&
    city.city.length > 0 &&
    typeof city.citySlug === 'string' &&
    city.citySlug.length > 0 &&
    typeof city.url === 'string' &&
    city.url.length > 0
  )
}

/**
 * Validate city array
 * 
 * @param value - Value to validate
 * @returns True if valid city array
 */
export function isValidCityArray(value: unknown): value is City[] {
  return Array.isArray(value) && value.every(isValidCity)
}

/**
 * Validate city name
 * 
 * @param name - City name to validate
 * @returns True if valid city name
 */
export function isValidCityName(name: string): boolean {
  if (!name || typeof name !== 'string') return false
  
  const trimmed = name.trim()
  return trimmed.length > 0 && trimmed.length <= 100
}

/**
 * Validate city slug
 * 
 * @param slug - City slug to validate
 * @returns True if valid slug
 */
export function isValidCitySlug(slug: string): boolean {
  if (!slug || typeof slug !== 'string') return false
  
  // Slug should be lowercase, alphanumeric with hyphens
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugPattern.test(slug) && slug.length <= 50
}

/**
 * Validate image URL
 * 
 * @param url - URL to validate
 * @returns True if valid image URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    const urlObj = new URL(url)
    const validProtocols = ['http:', 'https:']
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg']
    
    const hasValidProtocol = validProtocols.includes(urlObj.protocol)
    const hasValidExtension = validExtensions.some(ext => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    )
    
    return hasValidProtocol && (hasValidExtension || urlObj.pathname.includes('/'))
  } catch {
    // Relative URLs are also valid
    return url.startsWith('/') || url.startsWith('./')
  }
}

/**
 * Validate search query
 * 
 * @param query - Search query to validate
 * @returns True if valid search query
 */
export function isValidSearchQuery(query: string): boolean {
  if (typeof query !== 'string') return false
  
  const trimmed = query.trim()
  return trimmed.length >= 0 && trimmed.length <= 100
}

/**
 * Validate city filter criteria
 * 
 * @param criteria - Filter criteria object
 * @returns True if valid filter criteria
 */
export function isValidFilterCriteria(criteria: unknown): boolean {
  if (!criteria || typeof criteria !== 'object') return false
  
  const filter = criteria as Record<string, unknown>
  
  // Validate optional search field
  if ('search' in filter && filter.search !== undefined) {
    if (typeof filter.search !== 'string') return false
    if (!isValidSearchQuery(filter.search)) return false
  }
  
  // Validate optional selected field
  if ('selected' in filter && filter.selected !== undefined) {
    if (typeof filter.selected !== 'boolean') return false
  }
  
  return true
}

/**
 * Sanitize city data
 * 
 * @param city - City object to sanitize
 * @returns Sanitized city object
 */
export function sanitizeCityData(city: Partial<City>): Partial<City> {
  return {
    city: city.city?.trim() || '',
    citySlug: city.citySlug?.trim().toLowerCase() || '',
    url: city.url?.trim() || '',
    alt: city.alt?.trim() || '',
  }
}