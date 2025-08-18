/**
 * @file useEventCard.ts
 * @role Business logic composable for EventCard
 * @patterns Composition API, State Management Pattern
 * @solid SRP (Event card logic only), DIP (Depends on abstractions)
 */

import { ref } from 'vue'

import type { Event } from '../types'

export interface UseEventCardReturn {
  isHovered: typeof isHovered
  handleMouseEnter: typeof handleMouseEnter
  handleMouseLeave: typeof handleMouseLeave
  handleClick: typeof handleClick
}

export interface UseEventCardOptions {
  event: Event
  onClick?: (event: Event) => void
  onSelect?: (event: Event) => void
  disabled?: boolean
}

/**
 * Composable for EventCard business logic
 */
export function useEventCard(options: UseEventCardOptions): UseEventCardReturn {
  const { event, onClick, disabled = false } = options

  const isHovered = ref(false)

  const handleMouseEnter = () => {
    if (!disabled) {
      isHovered.value = true
    }
  }

  const handleMouseLeave = () => {
    isHovered.value = false
  }

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(event)
    }
  }

  return {
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleClick
  }
}