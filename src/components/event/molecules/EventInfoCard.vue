<!--
/**
 * @file EventInfoCard.vue
 * @role Event info card molecule - composes info atoms
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Info card composition only)
 */
-->
<template>
  <div
    :class="[
      'event-info-card-molecule',
      'bg-card border border-border rounded-lg p-6',
      className,
    ]"
  >
    <h3 class="text-lg font-semibold text-foreground mb-4">Event Details</h3>
    <div class="divide-y divide-border">
      <EventInfoItem icon="📍" label="Location" :value="location" />
      <EventInfoItem icon="📅" label="Date & Time" :value="date" />
      <EventInfoItem icon="👤" label="Organized by" :value="organizer" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventInfoCard Molecule Component
 *
 * Features:
 * - Composes info-related atoms
 * - Molecule-level component (composed unit)
 * - Minimal logic for composition
 *
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - Composition Pattern: Combines atoms
 * - SOLID: Single Responsibility
 */
import EventInfoItem from '../atoms/EventInfoItem.vue'

import type { EventInfoCardProps } from '../types'

defineProps<EventInfoCardProps>()
</script>

<style scoped>
.event-info-card-molecule {
  /* Molecule-specific styles */
}
</style>
