<!--
/**
 * @file EventTitle.vue
 * @role Event title atom component - displays event title
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Title display only)
 */
-->
<template>
  <h2
    :class="[
      'event-title-atom',
      'text-3xl font-bold text-foreground',
      className,
    ]"
  >
    {{ title || 'Untitled Event' }}
  </h2>
</template>

<script setup lang="ts">
/**
 * EventTitle Atom Component
 *
 * Features:
 * - Displays event title text
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
import type { EventTitleProps } from '../types'

defineProps<EventTitleProps>()
</script>

<style scoped>
.event-title-atom {
  /* Atom-specific styles */
}
</style>
