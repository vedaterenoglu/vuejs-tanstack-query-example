<!--
/**
 * @file EventsPresentation.vue
 * @role Events presentation component
 * @atomic presentation
 * @patterns Presentation Pattern
 * @solid SRP (UI display only), OCP (Open for extension via props)
 */
-->
<template>
  <div class="min-h-screen bg-background">
    <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-foreground">Discover Events</h1>
        <p class="text-muted-foreground mt-2">
          Find and explore amazing events near you
        </p>
      </div>

      <!-- Search Section -->
      <div class="max-w-2xl mx-auto mb-8">
        <SearchBox
          placeholder="Search events by name, description, organizer, or location..."
          :search-query="searchQuery"
          :debounce-ms="300"
          :show-refresh-button="true"
          @search-change="$emit('search-change', $event)"
          @refresh="$emit('refresh')"
        />
      </div>

      <!-- Error State -->
      <EventGridError v-if="error" :error="error" @retry="$emit('refresh')" />

      <!-- Events Grid -->
      <EventGrid
        v-else
        :events="events"
        :is-loading="isLoading"
        :error="error"
        :has-more="hasMore"
        :on-event-select="event => $emit('event-select', event)"
      />

      <!-- Loading More Indicator -->
      <div v-if="isFetchingNext && hasMore" class="text-center py-4">
        <span class="text-muted-foreground">Loading more events...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventsPresentation - Presentation layer for events page
 *
 * Pure presentation component with no business logic.
 * All state and handlers are passed via props/events.
 */
import { EventGridError } from '@/components/events/molecules'
import { EventGrid } from '@/components/events/organisms'
import type { Event } from '@/components/events/types'
import { SearchBox } from '@/components/search'

// Props interface
interface EventsPresentationProps {
  events: Event[]
  isLoading: boolean
  error: Error | null
  searchQuery: string
  hasMore: boolean
  isFetchingNext: boolean
}

defineProps<EventsPresentationProps>()

// Emit events
defineEmits<{
  'search-change': [value: string]
  refresh: []
  'event-select': [event: Event]
}>()
</script>
