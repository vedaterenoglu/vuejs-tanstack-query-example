<!--
/**
 * @file EventCardBody.vue
 * @role Event card body molecule - container for title, date, and location atoms
 * @atomic molecule
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Body section only), OCP (Extensible via atoms)
 */
-->
<template>
  <div
    :class="[
      'event-card-body absolute bottom-2 left-4 right-4 z-10',
      'bg-black/60 rounded px-2 py-1',
      className,
    ]"
  >
    <!-- Event Title -->
    <EventTitle :title="name" :truncate="true" />

    <!-- Date and Time Row -->
    <div class="flex items-center gap-3 mt-1">
      <EventDate :date="date" format="short" />
      <EventTime :date="date" />
    </div>

    <!-- Event Location -->
    <div class="mt-1">
      <EventLocation :location="location" :show-icon="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventCardBody Molecule Component
 *
 * Features:
 * - Container for title, date, and location atoms
 * - Dark overlay background
 * - Composes multiple atoms
 *
 * Design Patterns:
 * - Container Pattern: Contains atoms
 * - Composition Pattern: Composes atoms
 */
import { EventTitle, EventDate, EventTime, EventLocation } from '../atoms'
import { type EventCardBodyProps } from '../types'

withDefaults(defineProps<EventCardBodyProps>(), {
  className: '',
})
</script>
