<!--
/**
 * @file EventEmptyState.vue
 * @role Empty state display for events
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Empty state display only), OCP (Configurable via props)
 */
-->
<template>
  <div class="event-empty-state">
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="mb-4">
        <svg
          class="w-20 h-20 text-muted-foreground/50 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-foreground mb-2">
        {{ title }}
      </h3>
      <p class="text-muted-foreground mb-6 max-w-md">
        {{ description }}
      </p>
      <div v-if="showAction" class="flex gap-3">
        <button
          v-if="showRefresh"
          class="px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          @click="$emit('refresh')"
        >
          Refresh
        </button>
        <button
          v-if="showClearSearch"
          class="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
          @click="$emit('clear-search')"
        >
          Clear Search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventEmptyState - Displays empty state for event listings
 * 
 * Responsibilities:
 * - Display empty state message
 * - Provide action buttons for user interaction
 * - Maintain consistent empty state UI
 * 
 * SOLID Principles:
 * - SRP: Only handles empty state display
 * - OCP: Open for configuration via props
 * - ISP: Simple interface with optional actions
 */

// Props
interface EventEmptyStateProps {
  title?: string
  description?: string
  showAction?: boolean
  showRefresh?: boolean
  showClearSearch?: boolean
}

withDefaults(defineProps<EventEmptyStateProps>(), {
  title: 'No events found',
  description: 'Try adjusting your search criteria or check back later for new events.',
  showAction: true,
  showRefresh: true,
  showClearSearch: false,
})

// Emit events
defineEmits<{
  refresh: []
  'clear-search': []
}>()
</script>