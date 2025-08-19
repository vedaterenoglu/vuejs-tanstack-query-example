<!--
/**
 * @file ErrorBoundary.vue
 * @role Error boundary component for catching component errors
 * @atomic organism
 * @patterns Error Boundary Pattern, Fallback Pattern
 * @solid SRP (Error handling only), OCP (Extensible via slots)
 */
-->
<template>
  <div class="error-boundary">
    <!-- Error State -->
    <div v-if="hasError" class="error-boundary-fallback">
      <!-- Custom Error Slot -->
      <slot
        v-if="$slots.error"
        name="error"
        :error="error"
        :reset="resetError"
      />

      <!-- Default Error Fallback -->
      <div
        v-else
        class="p-6 border border-destructive/20 rounded-lg bg-destructive/5"
      >
        <div class="flex flex-col items-center text-center space-y-4">
          <AlertTriangle class="h-12 w-12 text-destructive" />
          <div>
            <h3 class="text-lg font-semibold text-destructive">
              {{ fallbackTitle }}
            </h3>
            <p class="text-sm text-muted-foreground mt-2">
              {{ fallbackMessage }}
            </p>
            <details v-if="showDetails && error" class="mt-4 text-left">
              <summary
                class="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
              >
                Technical Details
              </summary>
              <pre class="mt-2 text-xs bg-muted p-2 rounded overflow-auto">{{
                errorDetails
              }}</pre>
            </details>
          </div>
          <Button
            v-if="showReset"
            @click="resetError"
            variant="outline"
            size="sm"
          >
            <RefreshCw class="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    </div>

    <!-- Normal Content -->
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
/**
 * ErrorBoundary - Component for catching and handling errors
 *
 * Responsibilities:
 * - Catch errors from child components
 * - Display fallback UI on error
 * - Provide error reset functionality
 * - Log errors for debugging
 *
 * Vue.js Implementation:
 * - Uses onErrorCaptured lifecycle hook
 * - Provides slot for custom error UI
 * - Supports error reset functionality
 *
 * Design Patterns:
 * - Error Boundary Pattern: Catch errors in component tree
 * - Fallback Pattern: Show fallback UI on error
 * - Slot Pattern: Customizable error display
 */
import { AlertTriangle, RefreshCw } from 'lucide-vue-next'
import { ref, onErrorCaptured, computed } from 'vue'

import { Button } from '@/components/ui/button'

// Props interface
interface ErrorBoundaryProps {
  fallbackTitle?: string
  fallbackMessage?: string
  showDetails?: boolean
  showReset?: boolean
  onError?: (error: Error) => void
  propagate?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<ErrorBoundaryProps>(), {
  fallbackTitle: 'Something went wrong',
  fallbackMessage: 'An unexpected error occurred. Please try again.',
  showDetails: import.meta.env.DEV, // Show details in development
  showReset: true,
  onError: undefined,
  propagate: false,
})

// State
const hasError = ref(false)
const error = ref<Error | null>(null)

// Computed error details
const errorDetails = computed(() => {
  if (!error.value) return ''

  return JSON.stringify(
    {
      message: error.value.message,
      stack: error.value.stack,
      name: error.value.name,
    },
    null,
    2
  )
})

// Error handling
onErrorCaptured((err: Error, instance, info) => {
  // Update state
  hasError.value = true
  error.value = err

  // Log error in development
  if (import.meta.env.DEV) {
    console.error('ErrorBoundary caught:', {
      error: err,
      instance,
      info,
    })
  }

  // Call custom error handler if provided
  if (props.onError) {
    props.onError(err)
  }

  // Prevent error propagation unless specified
  return !props.propagate
})

// Reset error state
const resetError = () => {
  hasError.value = false
  error.value = null
}

// Expose reset function for parent components
defineExpose({
  resetError,
  hasError,
  error,
})
</script>

<style scoped>
.error-boundary {
  position: relative;
  width: 100%;
}

.error-boundary-fallback {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
