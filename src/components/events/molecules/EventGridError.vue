<!--
/**
 * @file EventGridError.vue
 * @role Error state molecule for event grid
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Error state display only)
 */
-->
<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-destructive">
      <svg
        class="mx-auto h-12 w-12 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p class="text-lg font-medium">{{ title }}</p>
      <p class="text-sm mt-2">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventGridError - Error state display for event grid
 *
 * Responsibilities:
 * - Display error state UI
 * - Show error message
 * - Provide visual error feedback
 *
 * SOLID Principles:
 * - SRP: Only handles error state display
 * - OCP: Extensible via props
 */

interface EventGridErrorProps {
  title?: string
  errorMessage?: string
  error?: Error | null
}

const props = withDefaults(defineProps<EventGridErrorProps>(), {
  title: 'Unable to load events',
  errorMessage: 'An error occurred while loading events',
})

// Use error message from Error object if available
const errorMessage = props.error?.message || props.errorMessage
</script>