/**
 * @file useEventCard.ts
 * @role Card interaction logic composable
 * @patterns Composition Pattern
 * @solid SRP (Card logic only), DIP (Depends on Vue abstractions)
 */

import { ref, type Ref } from 'vue'

import type { Event } from '@/components/events/types'

/**
 * useEventCard return type
 */
export interface UseEventCardReturn {
  isHovered: Ref<boolean>
  handleCardClick: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
}

/**
 * Event card options
 */
export interface EventCardOptions {
  disabled?: boolean
  onClick?: (event: Event) => void
  onEmit?: (event: Event) => void
}

/**
 * Composable for managing event card interactions
 * 
 * Features:
 * - Hover state management
 * - Click handling with disabled state
 * - Mouse event handlers
 * 
 * SOLID Principles:
 * - SRP: Only handles card interaction logic
 * - OCP: Extensible via options
 * - DIP: Depends on Vue composition abstractions
 * 
 * @param event - Event data
 * @param options - Card interaction options
 * @returns Card interaction handlers and state
 */
export function useEventCard(
  event: Event,
  options: EventCardOptions = {}
): UseEventCardReturn {
  const { disabled = false, onClick, onEmit } = options
  
  // Hover state
  const isHovered = ref(false)
  
  // Click handler
  const handleCardClick = () => {
    if (disabled) return
    
    if (onClick) {
      onClick(event)
    } else if (onEmit) {
      onEmit(event)
    }
  }
  
  // Mouse event handlers
  const handleMouseEnter = () => {
    if (!disabled) {
      isHovered.value = true
    }
  }
  
  const handleMouseLeave = () => {
    isHovered.value = false
  }
  
  return {
    isHovered,
    handleCardClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}