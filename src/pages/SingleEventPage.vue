<!--
/**
 * @file SingleEventPage.vue
 * @role Single event page - orchestrates event display with real data
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Page orchestration only), DIP (Depends on composables)
 */
-->
<template>
  <Layout>
    <div class="single-event-page min-h-screen py-8">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex items-center justify-center min-h-[400px]"
      >
        <div class="text-center">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"
          ></div>
          <p class="mt-4 text-muted-foreground">Loading event details...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="max-w-[900px] mx-auto px-4">
        <div
          class="bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center"
        >
          <h2 class="text-xl font-bold text-destructive mb-2">
            Error Loading Event
          </h2>
          <p class="text-destructive/80">
            {{ error.message || 'Failed to load event details' }}
          </p>
          <button
            @click="() => refetch()"
            class="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Event Content -->
      <EventContainer v-else-if="event" :event="event" />

      <!-- No Event Found -->
      <div v-else class="max-w-[900px] mx-auto px-4">
        <div
          class="bg-warning/10 border border-warning/20 rounded-lg p-6 text-center"
        >
          <h2 class="text-xl font-bold text-warning mb-2">Event Not Found</h2>
          <p class="text-warning/80">The requested event could not be found.</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * SingleEventPage Component
 *
 * Features:
 * - Fetches event data using composables
 * - Handles loading, error, and success states
 * - Integrates with EventContainer
 * - Uses real eventApiService data
 *
 * Design Patterns:
 * - Container Pattern: Orchestrates data and components
 * - Composition Pattern: Uses composables for logic
 */
import { useRoute } from 'vue-router'

import { useEventData } from '@/components/event/composables'
import EventContainer from '@/components/event/containers/EventContainer.vue'
import Layout from '@/components/layout/Layout.vue'

// Get event slug from route
const route = useRoute()
const slug = route.params.slug as string

// Use event data composable with real API
const { event, isLoading, error, refetch } = useEventData(slug)
</script>

<style scoped>
.single-event-page {
  /* Page-specific styles */
}
</style>
