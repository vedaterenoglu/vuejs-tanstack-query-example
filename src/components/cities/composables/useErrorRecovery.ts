/**
 * @file useErrorRecovery.ts
 * @role Error recovery composable for handling errors
 * @patterns Composition API, Strategy Pattern
 * @solid SRP (Error recovery only), OCP (Extensible strategies)
 */

import { ref, type Ref } from 'vue'

/**
 * Error recovery strategy
 */
export interface RecoveryStrategy {
  name: string
  canRecover: (error: Error) => boolean
  recover: (error: Error) => Promise<void>
  maxAttempts?: number
}

/**
 * Error recovery options
 */
export interface UseErrorRecoveryOptions {
  strategies?: RecoveryStrategy[]
  maxRetries?: number
  retryDelay?: number
  onError?: (error: Error) => void
  onRecovered?: () => void
}

/**
 * Error recovery return interface
 */
export interface UseErrorRecoveryReturn {
  error: Ref<Error | null>
  isRecovering: Ref<boolean>
  attempts: Ref<number>
  handleError: (error: Error) => Promise<boolean>
  retry: () => Promise<void>
  reset: () => void
}

/**
 * Composable for error recovery
 * 
 * Features:
 * - Multiple recovery strategies
 * - Automatic retry with delay
 * - Recovery attempt tracking
 * - Extensible error handling
 * 
 * @param options - Configuration options
 * @returns Error recovery utilities
 */
export function useErrorRecovery(
  options: UseErrorRecoveryOptions = {}
): UseErrorRecoveryReturn {
  const {
    strategies = [],
    maxRetries = 3,
    retryDelay = 1000,
    onError,
    onRecovered,
  } = options

  // State
  const error = ref<Error | null>(null)
  const isRecovering = ref(false)
  const attempts = ref(0)
  let lastAction: (() => Promise<void>) | null = null

  // Find applicable recovery strategy
  const findStrategy = (err: Error): RecoveryStrategy | undefined => {
    return strategies.find(strategy => strategy.canRecover(err))
  }

  // Delay helper
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  // Handle error with recovery
  const handleError = async (err: Error): Promise<boolean> => {
    error.value = err
    attempts.value++
    
    // Call error handler
    onError?.(err)
    
    // Check max attempts
    if (attempts.value > maxRetries) {
      console.error('Max recovery attempts reached', err)
      return false
    }
    
    // Find recovery strategy
    const strategy = findStrategy(err)
    if (!strategy) {
      console.error('No recovery strategy found for error', err)
      return false
    }
    
    // Check strategy max attempts
    if (strategy.maxAttempts && attempts.value > strategy.maxAttempts) {
      console.error(`Max attempts for strategy ${strategy.name} reached`)
      return false
    }
    
    isRecovering.value = true
    
    try {
      // Apply recovery strategy
      await strategy.recover(err)
      
      // Success - reset state
      error.value = null
      attempts.value = 0
      isRecovering.value = false
      
      // Call recovered handler
      onRecovered?.()
      
      return true
    } catch (recoveryError) {
      console.error('Recovery failed:', recoveryError)
      
      // Add delay before next attempt
      if (attempts.value < maxRetries) {
        await delay(retryDelay * attempts.value)
      }
      
      isRecovering.value = false
      return false
    }
  }

  // Retry last action
  const retry = async () => {
    if (!lastAction) {
      console.warn('No action to retry')
      return
    }
    
    attempts.value++
    
    if (attempts.value > maxRetries) {
      throw new Error('Max retry attempts reached')
    }
    
    isRecovering.value = true
    
    try {
      await delay(retryDelay * attempts.value)
      await lastAction()
      
      // Success
      error.value = null
      attempts.value = 0
      onRecovered?.()
    } catch (err) {
      error.value = err as Error
      await handleError(err as Error)
    } finally {
      isRecovering.value = false
    }
  }

  // Reset error state
  const reset = () => {
    error.value = null
    isRecovering.value = false
    attempts.value = 0
    lastAction = null
  }

  return {
    error,
    isRecovering,
    attempts,
    handleError,
    retry,
    reset,
  }
}