<!--
/**
 * @file EventGrid.vue
 * @role Events grid container component
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Grid orchestration only), OCP (Open for extension), DIP (Depends on abstractions)
 * @ssot Props for event data
 */
-->
<template>
  <section :class="className" role="region" aria-label="Events grid">
    <EventGridHeader
      v-if="hasEvents || isLoading"
      :event-count="events.length"
      :total-count="totalCount"
      :is-search-active="isSearchActive"
      :search-query="searchQuery"
      :is-loading="isLoading"
    />
    
    <div v-if="hasEvents" :class="gridClasses">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :event="event"
        @click="handleEventClick"
      />
    </div>
    
    <EventEmptyState 
      v-if="!hasEvents && !isLoading"
      :is-search-active="isSearchActive"
    />
    
    <EventGridSkeleton 
      v-if="isLoading && !hasEvents"
      :skeleton-count="8"
    />
  </section>
</template>

<script setup lang="ts">
import { useEventGrid } from './composables/useEventGrid'
import EventCard from './EventCard.vue'
import EventEmptyState from './molecules/EventEmptyState.vue'
import EventGridHeader from './molecules/EventGridHeader.vue'
import EventGridSkeleton from './molecules/EventGridSkeleton.vue'

import type { EventGridProps } from './types'

const props = withDefaults(defineProps<EventGridProps>(), {
  isLoading: false,
  isSearchActive: false,
  searchQuery: '',
  totalCount: 0,
  gridClasses: 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  className: '',
  onEventSelect: undefined
})

const { hasEvents, handleEventClick } = useEventGrid({
  events: props.events,
  onEventSelect: props.onEventSelect
})
</script>