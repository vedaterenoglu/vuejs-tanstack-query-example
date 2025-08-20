/**
 * @file performance.utils.ts
 * @role Performance optimization utilities
 * @patterns Performance Pattern, Optimization Pattern
 * @solid SRP (Performance only), OCP (Extensible optimizations)
 */

import { shallowRef, triggerRef, type ShallowRef } from 'vue'

/**
 * Create optimized shallow ref for large data structures
 * 
 * @param initialValue - Initial value
 * @returns Shallow ref with update helper
 */
export function createShallowState<T>(
  initialValue: T
): {
  state: ShallowRef<T>
  update: (updater: (prev: T) => T) => void
  reset: () => void
} {
  const state = shallowRef(initialValue)
  const initial = initialValue

  const update = (updater: (prev: T) => T) => {
    state.value = updater(state.value)
    triggerRef(state)
  }

  const reset = () => {
    state.value = initial
    triggerRef(state)
  }

  return {
    state,
    update,
    reset,
  }
}

/**
 * Batch multiple updates for performance
 * 
 * @param callback - Updates to batch
 */
export function batchUpdates(callback: () => void): void {
  // Vue 3 automatically batches updates in event handlers
  // This is a placeholder for explicit batching if needed
  void Promise.resolve().then(callback)
}

/**
 * Debounce function for performance
 * 
 * @param fn - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  delay: number
): ((...args: TArgs) => void) & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounced = ((...args: TArgs) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }) as (...args: TArgs) => void

  // Add cancel method
  const debouncedWithCancel = debounced as ((...args: TArgs) => void) & { cancel: () => void }
  debouncedWithCancel.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  return debouncedWithCancel
}

/**
 * Throttle function for performance
 * 
 * @param fn - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export function throttle<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  limit: number
): ((...args: TArgs) => void) & { cancel: () => void } {
  let inThrottle = false
  let lastArgs: TArgs | null = null
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const throttled = ((...args: TArgs) => {
    lastArgs = args

    if (!inThrottle) {
      fn(...args)
      inThrottle = true

      timeoutId = setTimeout(() => {
        inThrottle = false
        if (lastArgs) {
          throttled(...lastArgs)
          lastArgs = null
        }
      }, limit)
    }
  }) as (...args: TArgs) => void

  // Add cancel method
  const throttledWithCancel = throttled as ((...args: TArgs) => void) & { cancel: () => void }
  throttledWithCancel.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    inThrottle = false
    lastArgs = null
  }

  return throttledWithCancel
}

/**
 * Request idle callback wrapper
 * 
 * @param callback - Callback to run when idle
 * @param options - Idle options
 * @returns Cancel function
 */
export function whenIdle(
  callback: () => void,
  options?: IdleRequestOptions
): () => void {
  if ('requestIdleCallback' in window) {
    const handle = requestIdleCallback(callback, options)
    return () => cancelIdleCallback(handle)
  } else {
    // Fallback to setTimeout
    const timeoutId = setTimeout(callback, 0)
    return () => clearTimeout(timeoutId)
  }
}

/**
 * Measure performance of a function
 * 
 * @param name - Performance mark name
 * @param fn - Function to measure
 * @returns Function result
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  if (import.meta.env.DEV && 'performance' in window) {
    const startMark = `${name}-start`
    const endMark = `${name}-end`
    
    performance.mark(startMark)
    const result = fn()
    performance.mark(endMark)
    
    performance.measure(name, startMark, endMark)
    
    const measure = performance.getEntriesByName(name)[0]
    console.warn(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`)
    
    // Cleanup
    performance.clearMarks(startMark)
    performance.clearMarks(endMark)
    performance.clearMeasures(name)
    
    return result
  }
  
  return fn()
}