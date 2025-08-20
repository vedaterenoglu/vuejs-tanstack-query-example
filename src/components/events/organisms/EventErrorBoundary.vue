<!--
/**
 * @file EventErrorBoundary.vue
 * @role Error boundary for event components
 * @atomic organism
 * @patterns Error Boundary Pattern, Fallback Pattern
 * @solid SRP (Error handling only), OCP (Extensible via slots)
 */
-->
<template>
  <div class="event-error-boundary">
    <div v-if="hasError" class="error-fallback">
      <div class="flex flex-col items-center justify-center p-8 text-center">
        <div class="mb-4">
          <svg
            class="w-16 h-16 text-destructive mx-auto"
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
        </div>
        <h3 class="text-lg font-semibold text-foreground mb-2">
          Something went wrong
        </h3>
        <p class="text-muted-foreground mb-4 max-w-md">
          {{ errorMessage }}
        </p>
        <button
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          @click="handleReset"
        >
          Try Again
        </button>
      </div>
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
/**
 * EventErrorBoundary - Catches and handles errors in child components
 * 
 * Responsibilities:
 * - Catch errors from child components
 * - Display fallback UI on error
 * - Allow error recovery via reset
 * 
 * SOLID Principles:
 * - SRP: Only handles error catching and display
 * - OCP: Open for extension via slots
 * - LSP: Can replace any container component
 * - DIP: Depends on Vue's error handling abstraction
 */
import { onErrorCaptured, ref } from 'vue'

// Error state
const hasError = ref(false)
const errorMessage = ref('An unexpected error occurred. Please try again.')

// Props
interface EventErrorBoundaryProps {
  fallbackMessage?: string
  onError?: (error: Error) => void
  onReset?: () => void
}

const props = withDefaults(defineProps<EventErrorBoundaryProps>(), {
  fallbackMessage: 'An unexpected error occurred. Please try again.',
})

// Emit events
const emit = defineEmits<{
  error: [error: Error]
  reset: []
}>()

// Error handler
onErrorCaptured((error: Error) => {
  hasError.value = true
  errorMessage.value = props.fallbackMessage || error.message
  
  // Call error callback if provided
  props.onError?.(error)
  
  // Emit error event
  emit('error', error)
  
  // Log error in development
  if (import.meta.env.DEV) {
    console.error('Error caught by EventErrorBoundary:', error)
  }
  
  // Prevent error propagation
  return false
})

// Reset handler
const handleReset = () => {
  hasError.value = false
  errorMessage.value = props.fallbackMessage
  
  // Call reset callback if provided
  props.onReset?.()
  
  // Emit reset event
  emit('reset')
}
</script>