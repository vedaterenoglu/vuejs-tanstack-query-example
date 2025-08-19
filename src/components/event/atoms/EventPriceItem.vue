<!--
/**
 * @file EventPriceItem.vue
 * @role Event price item atom - displays price with icon and label
 * @atomic atom
 * @patterns Atom Pattern, Composition Pattern
 * @solid SRP (Price item display only)
 */
-->
<template>
  <div :class="['event-price-item-atom', 'flex items-start gap-3', className]">
    <svg
      class="w-5 h-5 text-muted-foreground mt-0.5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <line x1="12" x2="12" y1="2" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
    <div class="flex-1">
      <p class="text-sm font-medium text-muted-foreground">
        {{ label || 'Ticket Price' }}
      </p>
      <p class="text-xl font-bold text-foreground mt-1">
        ${{ price.toFixed(2) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventPriceItem Atom Component
 *
 * Features:
 * - Displays price with dollar icon
 * - Wraps EventPrice atom
 * - Consistent with other info items
 * - Atom-level component
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - Composition Pattern: Uses EventPrice atom
 * - SOLID: Single Responsibility
 */

interface EventPriceItemProps {
  price: number
  label?: string
  className?: string
}

defineProps<EventPriceItemProps>()
</script>

<style scoped>
.event-price-item-atom {
  /* Atom-specific styles */
}
</style>
