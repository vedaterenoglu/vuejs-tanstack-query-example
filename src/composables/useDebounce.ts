/**
 * @file useDebounce.ts
 * @role Debounce composable for delayed value updates
 * @patterns Debounce Pattern, Observer Pattern
 * @solid SRP (Debounce logic only), ISP (Simple interface)
 */

import { ref, watch, type Ref } from 'vue'

/**
 * Debounce composable options
 */
export interface UseDebounceOptions {
  delay?: number
  immediate?: boolean
}

/**
 * Debounce composable return type
 */
export interface UseDebounceReturn<T> {
  debouncedValue: Ref<T>
  isPending: Ref<boolean>
  cancel: () => void
  flush: () => void
}

/**
 * Composable for debouncing value changes
 * 
 * Provides debounced value updates with configurable delay.
 * Useful for search inputs, API calls, and expensive operations.
 * 
 * @param value - The value to debounce
 * @param options - Configuration options
 * @returns Debounced value and control functions
 * 
 * @example
 * ```ts
 * const searchQuery = ref('')
 * const { debouncedValue, isPending } = useDebounce(searchQuery, { delay: 300 })
 * 
 * watch(debouncedValue, (newValue) => {
 *   // Perform search with debounced value
 *   performSearch(newValue)
 * })
 * ```
 */
export function useDebounce<T>(
  value: Ref<T>,
  options: UseDebounceOptions = {}
): UseDebounceReturn<T> {
  const { delay = 300, immediate = false } = options
  
  // State
  const debouncedValue = ref<T>(value.value) as Ref<T>
  const isPending = ref(false)
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  
  // Cancel pending debounce
  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
      isPending.value = false
    }
  }
  
  // Flush pending value immediately
  const flush = () => {
    cancel()
    debouncedValue.value = value.value
    isPending.value = false
  }
  
  // Watch for value changes
  watch(
    value,
    (newValue) => {
      // Cancel previous timeout
      cancel()
      
      // Set pending state
      isPending.value = true
      
      // Handle immediate mode
      if (immediate && debouncedValue.value === undefined) {
        debouncedValue.value = newValue
        isPending.value = false
        return
      }
      
      // Set new timeout
      timeoutId = setTimeout(() => {
        debouncedValue.value = newValue
        isPending.value = false
        timeoutId = null
      }, delay)
    },
    { immediate: immediate }
  )
  
  return {
    debouncedValue,
    isPending,
    cancel,
    flush
  }
}