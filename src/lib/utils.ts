/**
 * @file utils.ts
 * @role Utility functions for component styling and class management
 * @patterns Utility Pattern
 * @solid SRP (Single utility purpose)
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge CSS classes with Tailwind CSS conflict resolution
 *
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 * of Tailwind utility classes. This ensures proper class precedence when
 * combining multiple class sources.
 *
 * @param inputs - Variable number of class values to merge
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
