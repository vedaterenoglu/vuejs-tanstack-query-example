<!--
/**
 * @file EventGrid.vue
 * @role Events grid organism component
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Grid layout only), OCP (Extensible via props), DIP (Depends on abstractions)
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
      v-if="events.length > 0"
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
    <div
      v-else-if="!isLoading && events.length === 0"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <div class="text-muted-foreground">
        <svg
          class="mx-auto h-12 w-12 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="text-lg font-medium">No events found</p>
        <p class="text-sm mt-2">Try adjusting your search or check back later</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else-if="isLoading" class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="`skeleton-${i}`"
        class="bg-card rounded-lg shadow-sm h-64 animate-pulse"
      >
        <div class="w-full h-full bg-muted rounded-lg"></div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <div class="text-destructive">
        <svg
          class="mx-auto h-12 w-12 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p class="text-lg font-medium">Unable to load events</p>
        <p class="text-sm mt-2">{{ error.message }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * EventGrid Organism Component
 * 
 * Features:
 * - Responsive grid layout
 * - Loading, empty, and error states
 * - Uses EventCard organism
 * - Accessibility support
 * 
 * Design Patterns:
 * - Container Pattern: Contains event cards
 * - Composition Pattern: Composes EventCard organisms
 * - Observer Pattern: Reacts to prop changes
 */
import { type EventGridProps, type Event } from '../types'

import EventCard from './EventCard.vue'

const props = withDefaults(defineProps<EventGridProps>(), {
  events: () => [],
  isLoading: false,
  error: null,
  hasMore: false,
  className: ''
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

<style scoped>
.events-grid-container {
  width: 100%;
}
</style>