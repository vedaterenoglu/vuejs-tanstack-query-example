/**
 * @file memoize.utils.ts
 * @role Memoization utility for performance optimization
 * @patterns Memoization Pattern, Decorator Pattern
 * @solid SRP (Memoization only), OCP (Extensible caching)
 */

/**
 * Memoization options
 */
export interface MemoizeOptions {
  maxSize?: number
  ttl?: number
  keyResolver?: (...args: any[]) => string
}

/**
 * Cache entry with timestamp
 */
interface CacheEntry<T> {
  value: T
  timestamp: number
}

/**
 * Create a memoized version of a function
 * 
 * @param fn - Function to memoize
 * @param options - Memoization options
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  options: MemoizeOptions = {}
): T & { clear: () => void } {
  const {
    maxSize = 10,
    ttl = 0,
    keyResolver = (...args) => JSON.stringify(args),
  } = options

  const cache = new Map<string, CacheEntry<ReturnType<T>>>()

  const memoized = ((...args: Parameters<T>) => {
    const key = keyResolver(...args)
    const cached = cache.get(key)

    // Check if cached value exists and is still valid
    if (cached) {
      if (ttl === 0 || Date.now() - cached.timestamp < ttl) {
        return cached.value
      }
      // Remove expired entry
      cache.delete(key)
    }

    // Compute new value
    const value = fn(...args)

    // Add to cache
    cache.set(key, {
      value,
      timestamp: Date.now(),
    })

    // Enforce max size (LRU eviction)
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }

    return value
  }) as T

  // Add clear method
  ;(memoized as any).clear = () => cache.clear()

  return memoized as T & { clear: () => void }
}

/**
 * Memoize with WeakMap for object arguments
 * 
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function weakMemoize<T extends (arg: object) => any>(
  fn: T
): T & { clear: () => void } {
  const cache = new WeakMap<object, ReturnType<T>>()

  const memoized = ((arg: Parameters<T>[0]) => {
    if (cache.has(arg)) {
      return cache.get(arg)!
    }

    const value = fn(arg)
    cache.set(arg, value)
    return value
  }) as T

  // WeakMap doesn't support clear, but we provide a no-op for consistency
  ;(memoized as any).clear = () => {
    // WeakMap entries are automatically garbage collected
  }

  return memoized as T & { clear: () => void }
}

/**
 * Memoize async function
 * 
 * @param fn - Async function to memoize
 * @param options - Memoization options
 * @returns Memoized async function
 */
export function memoizeAsync<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: MemoizeOptions = {}
): T & { clear: () => void } {
  const {
    maxSize = 10,
    ttl = 0,
    keyResolver = (...args) => JSON.stringify(args),
  } = options

  const cache = new Map<string, CacheEntry<Promise<Awaited<ReturnType<T>>>>>()

  const memoized = (async (...args: Parameters<T>) => {
    const key = keyResolver(...args)
    const cached = cache.get(key)

    // Check if cached value exists and is still valid
    if (cached) {
      if (ttl === 0 || Date.now() - cached.timestamp < ttl) {
        return cached.value
      }
      // Remove expired entry
      cache.delete(key)
    }

    // Create promise and cache immediately to handle concurrent calls
    const promise = fn(...args)
    cache.set(key, {
      value: promise,
      timestamp: Date.now(),
    })

    // Handle promise rejection to clear cache
    promise.catch(() => {
      cache.delete(key)
    })

    // Enforce max size
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }

    return promise
  }) as T

  // Add clear method
  ;(memoized as any).clear = () => cache.clear()

  return memoized as T & { clear: () => void }
}