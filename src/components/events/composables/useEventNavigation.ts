/**
 * @file useEventNavigation.ts
 * @role Navigation logic composable for events
 * @patterns Composition Pattern, Strategy Pattern
 * @solid SRP (Navigation logic only), DIP (Depends on Vue Router abstraction)
 * @ssot Vue Router for navigation state
 */

import { useRouter } from 'vue-router'

import type { Event } from '@/components/events/types'

import type { Router } from 'vue-router'


/**
 * Navigation options interface
 */
export interface NavigationOptions {
  router?: Router
}

/**
 * useEventNavigation return type
 */
export interface UseEventNavigationReturn {
  navigateToEvent: (event: Event) => void
  navigateToEventById: (eventId: number) => void
  navigateToEventBySlug: (slug: string) => void
  navigateToEvents: () => void
}

/**
 * Composable for managing event navigation logic
 * 
 * Features:
 * - Handles navigation to individual events
 * - Supports navigation by event object, ID, or slug
 * - Provides navigation to events list
 * - Encapsulates routing logic
 * 
 * SOLID Principles:
 * - SRP: Only handles navigation logic
 * - OCP: Extensible via new navigation methods
 * - LSP: Consistent navigation interface
 * - ISP: Focused navigation interface
 * - DIP: Depends on Router abstraction
 * 
 * @param options - Navigation configuration options
 * @returns Navigation handlers
 */
export function useEventNavigation(
  options: NavigationOptions = {}
): UseEventNavigationReturn {
  const router = options.router || useRouter()
  
  /**
   * Navigate to a specific event page
   * @param event - Event object to navigate to
   */
  const navigateToEvent = (event: Event): void => {
    void router.push(`/events/${event.slug}`)
  }
  
  /**
   * Navigate to event by ID
   * @param eventId - Event ID to navigate to
   */
  const navigateToEventById = (eventId: number): void => {
    void router.push(`/events/${eventId}`)
  }
  
  /**
   * Navigate to event by slug
   * @param slug - Event slug to navigate to
   */
  const navigateToEventBySlug = (slug: string): void => {
    void router.push(`/events/${slug}`)
  }
  
  /**
   * Navigate to events list page
   */
  const navigateToEvents = (): void => {
    void router.push('/events')
  }
  
  return {
    navigateToEvent,
    navigateToEventById,
    navigateToEventBySlug,
    navigateToEvents,
  }
}