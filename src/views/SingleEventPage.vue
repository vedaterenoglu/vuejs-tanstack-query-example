<template>
  <Layout>
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-12">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"
        ></div>
        <p class="mt-4 text-muted-foreground">Loading event details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div
          class="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto"
        >
          <h3 class="text-lg font-semibold text-destructive mb-2">
            Error loading event
          </h3>
          <p class="text-sm text-muted-foreground">{{ error.message }}</p>
        </div>
      </div>

      <!-- Data State - Event Container -->
      <div v-else-if="data">
        <EventContainer :event="data" />
      </div>

      <!-- No Data State -->
      <div v-else class="text-center py-12">
        <p class="text-muted-foreground">No event data available</p>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * @file SingleEventPage.vue
 * @role Single event detail page view
 * @patterns Container Pattern
 * @solid SRP (Single event display only)
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import EventContainer from '@/components/event/containers/EventContainer.vue'
import Layout from '@/components/layout/Layout.vue'
import { useEventQuery } from '@/composables/tanstack/useEventsQuery'

// Extract slug from route params
const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Fetch event data using the slug
const { data, isLoading, error } = useEventQuery(slug)
</script>
