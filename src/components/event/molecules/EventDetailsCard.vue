<!--
/**
 * @file EventDetailsCard.vue
 * @role Event details card molecule - composes event info atoms
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Event details composition only)
 */
-->
<template>
  <div
    :class="[
      'event-details-card-molecule',
      'bg-card border border-border rounded-lg p-6 space-y-4',
      className,
    ]"
  >
    <h3 class="text-lg font-semibold text-foreground">Event Details</h3>

    <!-- Event Information Items in correct order -->
    <div class="space-y-3">
      <!-- Date -->
      <EventDateItem :date="date" />

      <!-- Time -->
      <EventTimeItem :date="date" />

      <!-- Location -->
      <EventInfoItem
        icon="📍"
        label="Location"
        :value="location || 'Not specified'"
      />

      <!-- Organizer -->
      <EventInfoItem
        icon="👤"
        label="Organized by"
        :value="organizer || 'Not specified'"
      />

      <!-- Ticket Price -->
      <EventPriceItem :price="price" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventDetailsCard Molecule Component
 *
 * Features:
 * - Composes event detail atoms
 * - Correct order: Date, Time, Location, Organizer, Price
 * - Card styling with border
 * - Molecule-level component (composed unit)
 *
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - Composition Pattern: Combines atoms
 * - SOLID: Single Responsibility
 */
import EventDateItem from '../atoms/EventDateItem.vue'
import EventInfoItem from '../atoms/EventInfoItem.vue'
import EventPriceItem from '../atoms/EventPriceItem.vue'
import EventTimeItem from '../atoms/EventTimeItem.vue'

interface EventDetailsCardProps {
  date: string
  location?: string
  organizer?: string
  price: number
  className?: string
}

defineProps<EventDetailsCardProps>()
</script>

<style scoped>
.event-details-card-molecule {
  /* Molecule-specific styles */
}
</style>
