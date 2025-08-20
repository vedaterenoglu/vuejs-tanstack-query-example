<!--
/**
 * @file CityErrorBoundary.vue
 * @role Error boundary organism for graceful error handling
 * @atomic organism
 * @patterns Error Boundary Pattern, Fallback Pattern
 * @solid SRP (Error handling only), OCP (Extensible via slots)
 */
-->
<template>
  <div class="city-error-boundary">
    <slot v-if="!hasError" />
    
    <div
      v-else
      class="error-fallback p-8 text-center"
      role="alert"
      aria-live="assertive"
    >
      <slot name="error" :error="error" :retry="retry">
        <div class="max-w-md mx-auto">
          <svg
            class="w-16 h-16 mx-auto mb-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          
          <h2 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {{ errorTitle }}
          </h2>
          
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            {{ errorMessage }}
          </p>
          
          <button
            v-if="showRetry"
            @click="retry"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            :disabled="isRetrying"
          >
            {{ retryText }}
          </button>
          
          <details v-if="showDetails && error" class="mt-4 text-left">
            <summary class="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error details
            </summary>
            <pre class="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto">{{ errorDetails }}</pre>
          </details>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CityErrorBoundary Component
 * 
 * Catches and handles errors in child components.
 * Provides fallback UI and recovery mechanisms.
 * 
 * Responsibilities:
 * - Catch errors from child components
 * - Display fallback UI
 * - Provide retry functionality
 * - Log errors for debugging
 */

import { ref, onErrorCaptured, computed } from 'vue'

interface CityErrorBoundaryProps {
  errorTitle?: string
  errorMessage?: string
  retryText?: string
  showRetry?: boolean
  showDetails?: boolean
  onError?: (error: Error) => void
  onRetry?: () => void
}

const props = withDefaults(defineProps<CityErrorBoundaryProps>(), {
  errorTitle: 'Something went wrong',
  errorMessage: 'An unexpected error occurred. Please try again.',
  retryText: 'Try again',
  showRetry: true,
  showDetails: false,
})

const emit = defineEmits<{
  error: [error: Error]
  retry: []
  recovered: []
}>()

// State
const hasError = ref(false)
const error = ref<Error | null>(null)
const isRetrying = ref(false)

// Computed
const errorDetails = computed(() => {
  if (!error.value) return ''
  return `${error.value.name}: ${error.value.message}\n\nStack:\n${error.value.stack}`
})

// Error handler
onErrorCaptured((err: Error) => {
  hasError.value = true
  error.value = err
  
  // Call custom error handler
  props.onError?.(err)
  
  // Emit error event
  emit('error', err)
  
  // Log error in development
  if (import.meta.env.DEV) {
    console.error('Error caught by boundary:', err)
  }
  
  // Prevent error propagation
  return false
})

// Retry handler
const retry = async () => {
  isRetrying.value = true
  
  try {
    // Call custom retry handler
    await props.onRetry?.()
    
    // Reset error state
    hasError.value = false
    error.value = null
    
    // Emit events
    emit('retry')
    emit('recovered')
  } catch (err) {
    // Retry failed, keep error state
    error.value = err as Error
  } finally {
    isRetrying.value = false
  }
}

// Expose for parent components
defineExpose({
  hasError,
  error,
  retry,
})
</script>

<style scoped>
.city-error-boundary {
  position: relative;
  min-height: 100px;
}

.error-fallback {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>