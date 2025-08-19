<!--
/**
 * @file EventPrice.vue
 * @role Event price atom component - displays event price badge
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Price display only)
 */
-->
<template>
  <span
    :class="[
      'event-price-atom',
      'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold',
      'bg-primary text-primary-foreground',
      'shadow-sm border border-primary/20',
      className,
    ]"
  >
    ${{ price.toFixed(2) }}
  </span>
</template>

<script setup lang="ts">
/**
 * EventPrice Atom Component
 *
 * Features:
 * - Displays event price as badge
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
import type { EventPriceProps } from '../types'

defineProps<EventPriceProps>()
</script>

<style scoped>
.event-price-atom {
  /* Atom-specific styles */
}
</style>
