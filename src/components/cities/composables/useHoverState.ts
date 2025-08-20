/**
 * @file useHoverState.ts
 * @role Hover state management composable
 * @patterns Composition API, State Pattern
 * @solid SRP (Hover state only), ISP (Minimal interface)
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

/**
 * Hover state composable interface
 */
export interface UseHoverStateReturn {
  isHovered: Ref<boolean>
  showButton: ComputedRef<boolean>
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  setHovered: (value: boolean) => void
}

/**
 * Options for hover state composable
 */
export interface UseHoverStateOptions {
  showSelectButton?: boolean
  disabled?: boolean
}

/**
 * Composable for managing hover state
 * 
 * Handles:
 * - Hover state tracking
 * - Conditional button visibility
 * - Mouse event handlers
 * 
 * @param options - Configuration options
 * @returns Hover state and actions
 */
export function useHoverState(
  options: UseHoverStateOptions = {}
): UseHoverStateReturn {
  const { showSelectButton = true, disabled = false } = options

  // State
  const isHovered = ref(false)

  // Computed
  const showButton = computed(() => showSelectButton && isHovered.value)

  // Actions
  const handleMouseEnter = () => {
    if (!disabled) {
      isHovered.value = true
    }
  }

  const handleMouseLeave = () => {
    isHovered.value = false
  }

  const setHovered = (value: boolean) => {
    isHovered.value = value
  }

  return {
    // State
    isHovered,
    showButton,

    // Actions
    handleMouseEnter,
    handleMouseLeave,
    setHovered,
  }
}