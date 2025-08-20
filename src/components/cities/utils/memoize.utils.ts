/**
 * @file memoize.utils.ts
 * @role Memoization utility for performance optimization
 * @patterns Memoization Pattern, Decorator Pattern
 * @solid SRP (Memoization only), OCP (Extensible caching)
 */

/**
 * Memoization options
 */
export interface MemoizeOptions<TArgs extends unknown[] = unknown[]> {
  maxSize?: number
  ttl?: number
  keyResolver?: (...args: TArgs) => string
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
export function memoize<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  options: MemoizeOptions<TArgs> = {}
): ((...args: TArgs) => TReturn) & { clear: () => void } {
  const {
    maxSize = 10,
    ttl = 0,
    keyResolver = (...args) => JSON.stringify(args),
  } = options

  const cache = new Map<string, CacheEntry<TReturn>>()

  const memoized = ((...args: TArgs) => {
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
  }) as (...args: TArgs) => TReturn

  // Add clear method
  const memoizedWithClear = memoized as ((...args: TArgs) => TReturn) & { clear: () => void }
  memoizedWithClear.clear = () => cache.clear()

  return memoizedWithClear
}

/**
 * Memoize with WeakMap for object arguments
 * 
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function weakMemoize<TArg extends object, TReturn>(
  fn: (arg: TArg) => TReturn
): ((arg: TArg) => TReturn) & { clear: () => void } {
  const cache = new WeakMap<TArg, TReturn>()

  const memoized = (arg: TArg) => {
    if (cache.has(arg)) {
      return cache.get(arg)!
    }

    const value = fn(arg)
    cache.set(arg, value)
    return value
  }

  // WeakMap doesn't support clear, but we provide a no-op for consistency
  const memoizedWithClear = memoized as ((arg: TArg) => TReturn) & { clear: () => void }
  memoizedWithClear.clear = () => {
    // WeakMap entries are automatically garbage collected
  }

  return memoizedWithClear
}

/**
 * Memoize async function
 * 
 * @param fn - Async function to memoize
 * @param options - Memoization options
 * @returns Memoized async function
 */
export function memoizeAsync<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  options: MemoizeOptions<TArgs> = {}
): ((...args: TArgs) => Promise<TReturn>) & { clear: () => void } {
  const {
    maxSize = 10,
    ttl = 0,
    keyResolver = (...args) => JSON.stringify(args),
  } = options

  const cache = new Map<string, CacheEntry<Promise<TReturn>>>()

  const memoized = (async (...args: TArgs) => {
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
  }) as (...args: TArgs) => Promise<TReturn>

  // Add clear method
  const memoizedWithClear = memoized as ((...args: TArgs) => Promise<TReturn>) & { clear: () => void }
  memoizedWithClear.clear = () => cache.clear()

  return memoizedWithClear
}