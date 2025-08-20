/**
 * @file useVirtualScroll.ts
 * @role Virtual scrolling composable for performance
 * @patterns Composition API, Virtual Scrolling Pattern
 * @solid SRP (Virtual scrolling only), ISP (Focused interface)
 */

import { ref, computed, onMounted, onUnmounted, type Ref, type ComputedRef } from 'vue'

/**
 * Virtual scroll options
 */
export interface UseVirtualScrollOptions {
  itemHeight: number
  containerHeight: number
  buffer?: number
  containerRef?: Ref<HTMLElement | null>
}

/**
 * Virtual scroll return interface
 */
export interface UseVirtualScrollReturn<T> {
  visibleItems: ComputedRef<T[]>
  scrollTop: Ref<number>
  totalHeight: ComputedRef<number>
  startIndex: ComputedRef<number>
  endIndex: ComputedRef<number>
  handleScroll: (event: Event) => void
  scrollToIndex: (index: number) => void
  scrollToTop: () => void
  scrollToBottom: () => void
}

/**
 * Composable for virtual scrolling
 * 
 * Features:
 * - Renders only visible items
 * - Smooth scrolling performance
 * - Buffer for smoother experience
 * - Scroll position management
 * 
 * @param items - Array of items to virtualize
 * @param options - Virtual scroll options
 * @returns Virtual scroll utilities
 */
export function useVirtualScroll<T>(
  items: Ref<T[]> | T[],
  options: UseVirtualScrollOptions
): UseVirtualScrollReturn<T> {
  const {
    itemHeight,
    containerHeight,
    buffer = 3,
    containerRef,
  } = options

  // Normalize items to ref
  const itemsRef = ref(items) as Ref<T[]>

  // State
  const scrollTop = ref(0)

  // Computed properties
  const visibleCount = computed(() => 
    Math.ceil(containerHeight / itemHeight) + buffer * 2
  )

  const totalHeight = computed(() => 
    itemsRef.value.length * itemHeight
  )

  const startIndex = computed(() => {
    const index = Math.floor(scrollTop.value / itemHeight) - buffer
    return Math.max(0, index)
  })

  const endIndex = computed(() => {
    const index = startIndex.value + visibleCount.value
    return Math.min(itemsRef.value.length, index)
  })

  const visibleItems = computed(() => 
    itemsRef.value.slice(startIndex.value, endIndex.value)
  )

  // Handle scroll event
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement
    scrollTop.value = target.scrollTop
  }

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    const position = index * itemHeight
    scrollTop.value = position
    
    if (containerRef?.value) {
      containerRef.value.scrollTop = position
    }
  }

  // Scroll to top
  const scrollToTop = () => {
    scrollToIndex(0)
  }

  // Scroll to bottom
  const scrollToBottom = () => {
    scrollToIndex(itemsRef.value.length - 1)
  }

  // Setup scroll listener
  onMounted(() => {
    if (containerRef?.value) {
      containerRef.value.addEventListener('scroll', handleScroll, { passive: true })
    }
  })

  // Cleanup
  onUnmounted(() => {
    if (containerRef?.value) {
      containerRef.value.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    visibleItems,
    scrollTop,
    totalHeight,
    startIndex,
    endIndex,
    handleScroll,
    scrollToIndex,
    scrollToTop,
    scrollToBottom,
  }
}