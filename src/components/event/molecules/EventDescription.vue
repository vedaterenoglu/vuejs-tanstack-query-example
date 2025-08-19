<!--
/**
 * @file EventDescription.vue
 * @role Event description molecule - composes description atoms
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Description composition only)
 */
-->
<template>
  <div :class="['event-description-molecule', className]">
    <div class="prose prose-lg max-w-none -ml-4">
      <h3 class="text-xl font-bold text-foreground mb-4">About This Event</h3>
      <EventDescriptionText :text="description" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventDescription Molecule Component
 *
 * Features:
 * - Composes description-related atoms
 * - Molecule-level component (composed unit)
 * - Minimal logic for composition
 *
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - Composition Pattern: Combines atoms
 * - SOLID: Single Responsibility
 */
import EventDescriptionText from '../atoms/EventDescriptionText.vue'

import type { EventDescriptionProps } from '../types'

defineProps<EventDescriptionProps>()
</script>

<style scoped>
.event-description-molecule {
  /* Molecule-specific styles */
}
</style>
