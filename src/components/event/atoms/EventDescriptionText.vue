<!--
/**
 * @file EventDescriptionText.vue
 * @role Event description text atom - displays description text
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Description text display only)
 */
-->
<template>
  <p
    :class="[
      'event-description-text-atom',
      'text-base leading-relaxed text-foreground/90',
      className,
    ]"
  >
    {{ text || 'No description available' }}
  </p>
</template>

<script setup lang="ts">
/**
 * EventDescriptionText Atom Component
 *
 * Features:
 * - Displays event description text
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
import type { EventDescriptionTextProps } from '../types'

defineProps<EventDescriptionTextProps>()
</script>

<style scoped>
.event-description-text-atom {
  /* Atom-specific styles */
}
</style>
