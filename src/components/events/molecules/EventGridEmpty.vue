<!--
/**
 * @file EventGridEmpty.vue
 * @role Empty state molecule for event grid
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Empty state display only)
 */
-->
<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-muted-foreground">
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
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p class="text-lg font-medium">{{ title }}</p>
      <p class="text-sm mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventGridEmpty - Empty state display for event grid
 *
 * Responsibilities:
 * - Display empty state UI
 * - Show customizable message
 * - Provide visual feedback
 *
 * SOLID Principles:
 * - SRP: Only handles empty state display
 * - OCP: Extensible via props
 */

interface EventGridEmptyProps {
  title?: string
  message?: string
}

withDefaults(defineProps<EventGridEmptyProps>(), {
  title: 'No events found',
  message: 'Try adjusting your search or check back later',
})
</script>