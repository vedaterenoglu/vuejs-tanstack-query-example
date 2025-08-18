/**
 * @file useEventGrid.ts
 * @role Business logic composable for EventGrid
 * @patterns Composition API, State Management Pattern
 * @solid SRP (Event grid logic only), DIP (Depends on abstractions)
 */

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import type { Event } from '../types'

export interface UseEventGridOptions {
  events: Event[]
  onEventSelect?: (event: Event) => void
}

export function useEventGrid(options: UseEventGridOptions) {
  const { events, onEventSelect } = options
  const router = useRouter()

  const hasEvents = computed(() => events && events.length > 0)

  const handleEventClick = (event: Event) => {
    if (onEventSelect) {
      onEventSelect(event)
    } else {
      void router.push(`/events/${event.slug}`)
    }
  }

  return {
    hasEvents,
    handleEventClick
  }
}