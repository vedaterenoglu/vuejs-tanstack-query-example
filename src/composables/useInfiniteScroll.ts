/**
 * @file useInfiniteScroll.ts
 * @role Infinite scroll detection composable
 * @patterns Observer Pattern, Debounce Pattern
 * @solid SRP (Scroll detection only), DIP (Depends on abstractions)
 */

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

import type { UseInfiniteQueryReturnType } from '@tanstack/vue-query'

/**
 * Options for infinite scroll behavior
 */
interface UseInfiniteScrollOptions {
  /**
   * Root margin for intersection observer
   * Triggers loading before reaching the bottom
   * @default '200px'
   */
  rootMargin?: string
  
  /**
   * Delay before loading more items (ms)
   * Prevents excessive API calls
   * @default 100
   */
  loadMoreDelay?: number
  
  /**
   * Whether infinite scroll is enabled
   * @default true
   */
  enabled?: boolean
  
  /**
   * Threshold for intersection observer
   * @default 0.1
   */
  threshold?: number
}

/**
 * Infinite scroll composable using IntersectionObserver
 * 
 * Features:
 * - IntersectionObserver for efficient scroll detection
 * - Debounced loading to prevent excessive API calls
 * - Automatic cleanup on unmount
 * - Error handling with retry
 * - Loading state management
 * 
 * Design Patterns:
 * - Observer Pattern: IntersectionObserver for scroll events
 * - Debounce Pattern: Delayed execution for performance
 * 
 * @param query - TanStack infinite query instance
 * @param options - Configuration options
 * @returns Sentinel ref and loading state
 */
export function useInfiniteScroll<TData = unknown, TError = unknown>(
  query: UseInfiniteQueryReturnType<TData, TError>,
  options: UseInfiniteScrollOptions = {}
) {
  const {
    rootMargin = '200px',
    loadMoreDelay = 100,
    enabled = true,
    threshold = 0.1
  } = options
  
  // Refs
  const sentinelRef = ref<HTMLElement | null>(null)
  const isLoadingMore = ref(false)
  const observerRef = ref<IntersectionObserver | null>(null)
  const loadMoreTimeoutRef = ref<ReturnType<typeof setTimeout> | null>(null)
  
  /**
   * Load more items with debouncing
   */
  const loadMore = async () => {
    
    // Prevent multiple simultaneous loads
    if (
      !enabled ||
      isLoadingMore.value ||
      query.isFetchingNextPage.value ||
      !query.hasNextPage?.value
    ) {
      return
    }
    
    // Clear existing timeout
    if (loadMoreTimeoutRef.value) {
      clearTimeout(loadMoreTimeoutRef.value)
    }
    
    // Debounce the load operation
    loadMoreTimeoutRef.value = setTimeout(async () => {
      try {
        isLoadingMore.value = true
        await query.fetchNextPage()
      } catch (error) {
        // Error is handled by the query itself
        console.error('Error loading more items:', error)
      } finally {
        isLoadingMore.value = false
      }
    }, loadMoreDelay)
  }
  
  /**
   * Set up IntersectionObserver
   */
  const setupObserver = () => {
    if (!sentinelRef.value || !enabled) {
      return
    }
    
    // Clean up existing observer
    if (observerRef.value) {
      observerRef.value.disconnect()
    }
    
    // Create new observer
    observerRef.value = new IntersectionObserver(
      entries => {
        const target = entries[0]
        if (target?.isIntersecting) {
          void loadMore()
        }
      },
      {
        rootMargin,
        threshold
      }
    )
    
    // Start observing
    observerRef.value.observe(sentinelRef.value)
  }
  
  /**
   * Clean up observer and timeouts
   */
  const cleanup = () => {
    if (observerRef.value) {
      observerRef.value.disconnect()
      observerRef.value = null
    }
    
    if (loadMoreTimeoutRef.value) {
      clearTimeout(loadMoreTimeoutRef.value)
      loadMoreTimeoutRef.value = null
    }
  }
  
  // Watch for sentinel ref availability and setup observer
  watch(
    sentinelRef,
    async (newElement) => {
      if (newElement && enabled) {
        // Wait for next tick to ensure DOM is ready
        await nextTick()
        setupObserver()
      } else {
        cleanup()
      }
    },
    { immediate: true }
  )
  
  // Lifecycle hooks
  onMounted(async () => {
    // Wait for next tick and setup observer if sentinel is available
    await nextTick()
    if (sentinelRef.value) {
      setupObserver()
    }
  })
  
  onUnmounted(() => {
    cleanup()
  })
  
  return {
    /**
     * Ref to attach to sentinel element
     */
    sentinelRef,
    
    /**
     * Loading state for UI feedback
     */
    isLoadingMore,
    
    /**
     * Whether more pages are available
     */
    hasNextPage: query.hasNextPage,
    
    /**
     * Whether currently fetching next page
     */
    isFetchingNextPage: query.isFetchingNextPage,
    
    /**
     * Manually trigger load more
     */
    loadMore,
    
    /**
     * Clean up resources
     */
    cleanup
  }
}

/**
 * Type guard for infinite query
 */
export function isInfiniteQuery<TData = unknown, TError = unknown>(
  query: unknown
): query is UseInfiniteQueryReturnType<TData, TError> {
  return (
    query !== null &&
    typeof query === 'object' &&
    'fetchNextPage' in query &&
    'hasNextPage' in query &&
    'isFetchingNextPage' in query
  )
}