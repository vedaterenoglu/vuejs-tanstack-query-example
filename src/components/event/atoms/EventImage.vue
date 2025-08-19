<!--
/**
 * @file EventImage.vue
 * @role Event image atom component - displays event image
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Image display only)
 */
-->
<template>
  <div
    :class="[
      'event-image-atom',
      'relative w-full h-64 rounded-lg overflow-hidden bg-muted',
      className,
    ]"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <div v-else class="w-full h-full flex items-center justify-center bg-muted">
      <span class="text-muted-foreground">No image available</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventImage Atom Component
 *
 * Features:
 * - Displays event image
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
import type { EventImageProps } from '../types'

defineProps<EventImageProps>()
</script>

<style scoped>
.event-image-atom {
  /* Atom-specific styles */
}
</style>
