<!--
/**
 * @file EventInfoItem.vue
 * @role Event info item atom - displays info label/value pair
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Info item display only)
 */
-->
<template>
  <div :class="['event-info-item-atom', 'flex items-start gap-3', className]">
    <div v-if="icon === '📍'" class="flex-shrink-0 mt-0.5">
      <svg
        class="w-5 h-5 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    </div>
    <div v-else-if="icon === '👤'" class="flex-shrink-0 mt-0.5">
      <svg
        class="w-5 h-5 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-medium text-muted-foreground">{{ label }}</p>
      <p class="text-base text-foreground">{{ value || 'Not specified' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventInfoItem Atom Component
 *
 * Features:
 * - Displays info label and value
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
import type { EventInfoItemProps } from '../types'

defineProps<EventInfoItemProps>()
</script>

<style scoped>
.event-info-item-atom {
  /* Atom-specific styles */
}
</style>
