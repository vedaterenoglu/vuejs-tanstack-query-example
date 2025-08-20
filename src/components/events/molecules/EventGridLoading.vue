<!--
/**
 * @file EventGridLoading.vue
 * @role Loading state molecule for event grid
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Loading state display only)
 */
-->
<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="i in skeletonCount"
      :key="`skeleton-${i}`"
      class="bg-card rounded-lg shadow-sm h-64 animate-pulse"
      role="status"
      aria-label="Loading event"
    >
      <div class="w-full h-full bg-muted rounded-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventGridLoading - Loading skeleton display for event grid
 *
 * Responsibilities:
 * - Display loading skeleton UI
 * - Show configurable number of skeletons
 * - Provide visual loading feedback
 *
 * SOLID Principles:
 * - SRP: Only handles loading state display
 * - OCP: Extensible via props
 */

interface EventGridLoadingProps {
  skeletonCount?: number
}

withDefaults(defineProps<EventGridLoadingProps>(), {
  skeletonCount: 6,
})
</script>