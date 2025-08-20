<!--
/**
 * @file EventGrid.vue
 * @role Events grid organism component
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Grid layout orchestration), OCP (Extensible via props), DIP (Depends on abstractions)
 */
-->
<template>
  <section
    :class="['events-grid-container', className]"
    role="region"
    aria-label="Events grid"
  >
    <!-- Grid Header -->
    <div v-if="!isLoading && events.length > 0" class="mb-6">
      <h3 class="text-sm text-muted-foreground font-normal">
        {{ events.length }} event{{ events.length !== 1 ? 's' : '' }} available
      </h3>
    </div>

    <!-- Events Grid -->
    <div
      v-if="!isLoading && events.length > 0"
      class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      role="grid"
      aria-label="Events grid"
    >
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        :on-click="handleEventClick"
        role="gridcell"
      />
    </div>

    <!-- Empty State -->
    <EventGridEmpty v-else-if="!isLoading && events.length === 0" />

    <!-- Loading State -->
    <EventGridLoading v-else-if="isLoading" />

    <!-- Error State -->
    <EventGridError v-else-if="error" :error="error" />
  </section>
</template>

<script setup lang="ts">
/**
 * EventGrid Organism Component
 *
 * Features:
 * - Responsive grid layout
 * - Delegates states to specialized molecules
 * - Uses EventCard organism
 * - Accessibility support
 *
 * Design Patterns:
 * - Container Pattern: Contains event cards
 * - Composition Pattern: Composes molecules and organisms
 * - Delegation Pattern: Delegates states to molecules
 * 
 * SOLID Principles:
 * - SRP: Orchestrates grid layout only
 * - OCP: Open for extension via props
 * - DIP: Depends on molecule abstractions
 */
import EventGridEmpty from '../molecules/EventGridEmpty.vue'
import EventGridError from '../molecules/EventGridError.vue'
import EventGridLoading from '../molecules/EventGridLoading.vue'
import { type EventGridProps, type Event } from '../types'

import EventCard from './EventCard.vue'

const props = withDefaults(defineProps<EventGridProps>(), {
  events: () => [],
  isLoading: false,
  error: null,
  hasMore: false,
  className: '',
})

const emit = defineEmits<{
  'event-select': [event: Event]
}>()

// Event handler for card clicks
const handleEventClick = (event: Event) => {
  if (props.onEventSelect) {
    props.onEventSelect(event)
  } else {
    emit('event-select', event)
  }
}
</script>
