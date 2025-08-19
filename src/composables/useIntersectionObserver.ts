/**
 * @file useIntersectionObserver.ts
 * @role Intersection Observer composable for element visibility detection
 * @patterns Observer Pattern, Hook Pattern
 * @solid SRP (Intersection detection only), DIP (Depends on abstraction)
 */

import { ref, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Intersection Observer composable options
 */
export interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  once?: boolean
}

/**
 * Intersection Observer composable return type
 */
export interface UseIntersectionObserverReturn {
  isIntersecting: Ref<boolean>
  isVisible: Ref<boolean>
  disconnect: () => void
  observe: () => void
}

/**
 * Composable for detecting element visibility using Intersection Observer API
 *
 * Provides reactive visibility state for elements entering/leaving viewport.
 * Useful for scroll animations, lazy loading, and performance optimizations.
 *
 * @param target - Element ref to observe
 * @param options - Intersection Observer options
 * @returns Intersection state and control functions
 *
 * @example
 * ```ts
 * const elementRef = ref<HTMLElement>()
 * const { isIntersecting, isVisible } = useIntersectionObserver(elementRef, {
 *   threshold: 0.1,
 *   once: true
 * })
 *
 * watch(isIntersecting, (visible) => {
 *   if (visible) {
 *     // Element is in viewport
 *     triggerAnimation()
 *   }
 * })
 * ```
 */
export function useIntersectionObserver(
  target: Ref<Element | null | undefined>,
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    once = false,
  } = options

  // State
  const isIntersecting = ref(false)
  const isVisible = ref(false)

  let observer: IntersectionObserver | null = null

  // Disconnect observer
  const disconnect = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  // Observe target element
  const observe = () => {
    if (!target.value) return

    // Disconnect existing observer
    disconnect()

    // Create new observer
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          isIntersecting.value = entry.isIntersecting

          // Update visibility state
          if (entry.isIntersecting) {
            isVisible.value = true

            // Disconnect if observing once
            if (once) {
              disconnect()
            }
          } else if (!once) {
            // Only update to false if not in once mode
            isVisible.value = false
          }
        })
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    // Start observing
    observer.observe(target.value)
  }

  // Lifecycle
  onMounted(() => {
    observe()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    isIntersecting,
    isVisible,
    disconnect,
    observe,
  }
}
