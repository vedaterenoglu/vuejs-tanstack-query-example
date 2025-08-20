/**
 * @file useFocusManagement.ts
 * @role Focus management composable for accessibility
 * @patterns Composition API, Observer Pattern
 * @solid SRP (Focus management only), ISP (Focused interface)
 */

import { ref, nextTick, onMounted, onUnmounted, type Ref } from 'vue'

/**
 * Focus management composable interface
 */
export interface UseFocusManagementReturn {
  focusedIndex: Ref<number>
  focusedElement: Ref<HTMLElement | null>
  focusFirst: () => void
  focusLast: () => void
  focusNext: () => void
  focusPrevious: () => void
  focusByIndex: (index: number) => void
  trapFocus: (container: HTMLElement) => void
  releaseFocus: () => void
  handleKeyNavigation: (event: KeyboardEvent) => void
}

/**
 * Focus management options
 */
export interface UseFocusManagementOptions {
  containerRef?: Ref<HTMLElement | null>
  itemSelector?: string
  loop?: boolean
  autoFocus?: boolean
  trapFocus?: boolean
}

/**
 * Composable for managing focus within components
 * 
 * Features:
 * - Keyboard navigation support
 * - Focus trapping for modals/dialogs
 * - Automatic focus management
 * - Screen reader announcements
 * 
 * @param options - Configuration options
 * @returns Focus management utilities
 */
export function useFocusManagement(
  options: UseFocusManagementOptions = {}
): UseFocusManagementReturn {
  const {
    containerRef,
    itemSelector = '[tabindex="0"], button, a, input, select, textarea',
    loop = true,
    autoFocus = false,
    trapFocus: shouldTrapFocus = false,
  } = options

  // State
  const focusedIndex = ref(-1)
  const focusedElement = ref<HTMLElement | null>(null)
  let focusableElements: HTMLElement[] = []
  let trapCleanup: (() => void) | null = null

  // Update focusable elements
  const updateFocusableElements = () => {
    if (!containerRef?.value) return
    
    focusableElements = Array.from(
      containerRef.value.querySelectorAll(itemSelector)
    ) as HTMLElement[]
  }

  // Focus element by index
  const focusByIndex = async (index: number) => {
    updateFocusableElements()
    
    if (focusableElements.length === 0) return
    
    let targetIndex = index
    
    if (loop) {
      targetIndex = ((index % focusableElements.length) + focusableElements.length) % focusableElements.length
    } else {
      targetIndex = Math.max(0, Math.min(index, focusableElements.length - 1))
    }
    
    focusedIndex.value = targetIndex
    focusedElement.value = focusableElements[targetIndex]
    
    await nextTick()
    focusedElement.value?.focus()
  }

  // Navigation functions
  const focusFirst = () => focusByIndex(0)
  const focusLast = () => focusByIndex(focusableElements.length - 1)
  const focusNext = () => focusByIndex(focusedIndex.value + 1)
  const focusPrevious = () => focusByIndex(focusedIndex.value - 1)

  // Handle keyboard navigation
  const handleKeyNavigation = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        void focusNext()
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        void focusPrevious()
        break
      case 'Home':
        event.preventDefault()
        void focusFirst()
        break
      case 'End':
        event.preventDefault()
        void focusLast()
        break
      case 'Tab':
        if (shouldTrapFocus && containerRef?.value) {
          event.preventDefault()
          if (event.shiftKey) {
            void focusPrevious()
          } else {
            void focusNext()
          }
        }
        break
    }
  }

  // Trap focus within container
  const trapFocus = (container: HTMLElement) => {
    const handleFocusIn = (event: FocusEvent) => {
      if (!container.contains(event.target as Node)) {
        void focusFirst()
      }
    }

    document.addEventListener('focusin', handleFocusIn)
    
    trapCleanup = () => {
      document.removeEventListener('focusin', handleFocusIn)
    }
  }

  // Release focus trap
  const releaseFocus = () => {
    trapCleanup?.()
    trapCleanup = null
  }

  // Lifecycle
  onMounted(() => {
    updateFocusableElements()
    
    if (autoFocus) {
      void focusFirst()
    }
    
    if (shouldTrapFocus && containerRef?.value) {
      trapFocus(containerRef.value)
    }
  })

  onUnmounted(() => {
    releaseFocus()
  })

  return {
    focusedIndex,
    focusedElement,
    focusFirst,
    focusLast,
    focusNext,
    focusPrevious,
    focusByIndex,
    trapFocus,
    releaseFocus,
    handleKeyNavigation,
  }
}