/**
 * @file useTicketSelection.ts
 * @role Ticket selection composable - manages ticket quantity state
 * @patterns Composable Pattern, State Management Pattern
 * @solid SRP (Ticket selection only), OCP (Extensible state management)
 */

import { ref, computed } from 'vue'

/**
 * useTicketSelection Composable
 *
 * Features:
 * - Manages ticket quantity selection
 * - Calculates total price
 * - Provides increment/decrement actions
 * - Validates quantity bounds
 *
 * Design Patterns:
 * - Composable Pattern: Encapsulates ticket selection logic
 * - State Management Pattern: Manages local state
 * - SOLID: Single Responsibility (ticket quantity management)
 */
export function useTicketSelection(eventPrice: number, maxQuantity = 10) {
  // State
  const quantity = ref(0)
  const isProcessing = ref(false)

  // Computed
  const totalPrice = computed(() => quantity.value * eventPrice)

  const formattedTotal = computed(() => {
    const total = totalPrice.value
    return total === 0 ? 'Free' : `$${total.toFixed(2)}`
  })

  const canIncrement = computed(
    () => quantity.value < maxQuantity && !isProcessing.value
  )
  const canDecrement = computed(() => quantity.value > 0 && !isProcessing.value)
  const hasSelection = computed(() => quantity.value > 0)

  // Actions
  const increment = () => {
    if (canIncrement.value) {
      quantity.value++
    }
  }

  const decrement = () => {
    if (canDecrement.value) {
      quantity.value--
    }
  }

  const reset = () => {
    quantity.value = 0
    isProcessing.value = false
  }

  const setQuantity = (value: number) => {
    if (value >= 0 && value <= maxQuantity) {
      quantity.value = value
    }
  }

  const setProcessing = (value: boolean) => {
    isProcessing.value = value
  }

  return {
    // State
    quantity: computed(() => quantity.value),
    totalPrice,
    formattedTotal,
    isProcessing: computed(() => isProcessing.value),

    // Computed flags
    canIncrement,
    canDecrement,
    hasSelection,

    // Actions
    increment,
    decrement,
    reset,
    setQuantity,
    setProcessing,
  }
}
