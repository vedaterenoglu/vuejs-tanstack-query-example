<!--
/**
 * @file EventsPage.vue
 * @role Events page view component
 * @atomic template
 * @patterns Container Pattern, Template Pattern
 * @solid SRP (Events page display only)
 */
-->
<template>
  <Layout>
    <div class="min-h-screen bg-background">
      <!-- Main Container -->
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <header class="mb-6">
          <div class="text-center space-y-4">
            <h1 class="text-3xl font-bold mb-2">Upcoming Events</h1>
            <p class="text-muted-foreground max-w-2xl mx-auto">
              Discover exciting events happening in your area
            </p>
          </div>
        </header>

        <!-- Search Section -->
        <div class="max-w-2xl mx-auto mb-8">
          <SearchBox
            placeholder="Search events by name, description, organizer, or location..."
            :search-query="searchBoxQuery"
            :debounce-ms="300"
            :show-refresh-button="true"
            @search-change="handleSearchChange"
            @refresh="handleRefresh"
          />
        </div>

        <!-- Error State -->
        <div v-if="error" class="text-center py-12">
          <div
            class="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto"
          >
            <h3 class="text-lg font-semibold text-destructive mb-2">
              Unable to load events
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              {{ error.message }}
            </p>
            <button
              @click="() => refetch()"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>

        <!-- Events Grid -->
        <EventGrid
          v-else
          :events="events"
          :is-loading="isLoading"
          :error="error"
          :has-more="infiniteScroll.hasNextPage"
          :on-event-select="handleEventSelect"
        />

        <!-- Infinite Scroll Sentinel -->
        <div
          :ref="
            el => {
              if (el) infiniteScroll.sentinelRef.value = el as HTMLElement
            }
          "
          class="mt-8 p-4 flex justify-center min-h-[100px]"
        >
          <div
            v-if="infiniteScroll.isFetchingNextPage"
            class="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div
              class="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
            ></div>
            <span>Loading more events...</span>
          </div>
          <div
            v-else-if="!infiniteScroll.hasNextPage && events.length > 0"
            class="text-sm text-muted-foreground"
          >
            No more events to load
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * EventsPage - Events listing page
 *
 * Features:
 * - Infinite scroll pagination
 * - Search functionality
 * - Error handling
 * - Loading states
 *
 * Design Patterns:
 * - Container Pattern: Orchestrates event display
 * - Composition Pattern: Uses decomposed components
 */
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { EventGrid } from '@/components/events/organisms'
import type { Event } from '@/components/events/types'
import Layout from '@/components/layout/Layout.vue'
import { SearchBox } from '@/components/search'
import { useInfiniteEvents, useInfiniteScroll } from '@/composables'

// Get route for query params
const route = useRoute()
const router = useRouter()

// Search state - from SearchBox input
const searchBoxQuery = ref('')

// Get search from URL query params (can be city or text search)
const urlSearchQuery = computed(() => (route.query.search as string) || '')

// Create reactive search params
const searchParams = computed(() => ({
  // Use URL search if present, otherwise use SearchBox input
  search: urlSearchQuery.value || searchBoxQuery.value,
  sortBy: 'date' as const,
  order: 'asc' as const,
}))

// Use infinite query for paginated events (18 items per page)
const infiniteQuery = useInfiniteEvents(searchParams, 18)
const { events, isLoading, error, refetch, totalCount } = infiniteQuery

console.warn('[EventsPage] events.value:', events.value)
console.warn('[EventsPage] events.value length:', events.value?.length)
console.warn('[EventsPage] isLoading.value:', isLoading.value)
console.warn('[EventsPage] error.value:', error.value)
console.warn('[EventsPage] totalCount.value:', totalCount.value)

// Set up infinite scroll
const infiniteScroll = useInfiniteScroll(infiniteQuery.query, {
  rootMargin: '200px',
  loadMoreDelay: 100,
  enabled: true,
})

// Event handlers
const handleSearchChange = (value: string) => {
  searchBoxQuery.value = value
}

const handleRefresh = () => {
  searchBoxQuery.value = ''
  void refetch()
}

// Event selection handler
const handleEventSelect = (event: Event) => {
  void router.push(`/events/${event.slug}`)
}
</script>
