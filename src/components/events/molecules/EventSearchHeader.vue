<!--
/**
 * @file EventSearchHeader.vue
 * @role Search header display for events page
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Header display only), OCP (Configurable via props)
 */
-->
<template>
  <header class="event-search-header">
    <div :class="['text-center', containerClass]">
      <h1 :class="['font-bold text-foreground', titleClass]">
        {{ title }}
      </h1>
      <p v-if="subtitle" :class="['text-muted-foreground mt-2', subtitleClass]">
        {{ subtitle }}
      </p>
      <div v-if="showStats" class="flex justify-center gap-6 mt-4">
        <div v-if="eventCount !== undefined" class="text-sm">
          <span class="font-semibold text-foreground">{{ eventCount }}</span>
          <span class="text-muted-foreground ml-1">Events</span>
        </div>
        <div v-if="cityCount !== undefined" class="text-sm">
          <span class="font-semibold text-foreground">{{ cityCount }}</span>
          <span class="text-muted-foreground ml-1">Cities</span>
        </div>
        <div v-if="activeFilters !== undefined && activeFilters > 0" class="text-sm">
          <span class="font-semibold text-primary">{{ activeFilters }}</span>
          <span class="text-muted-foreground ml-1">Active Filters</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * EventSearchHeader - Page header for event search/listing pages
 * 
 * Responsibilities:
 * - Display page title and subtitle
 * - Show optional statistics
 * - Maintain consistent header styling
 * 
 * SOLID Principles:
 * - SRP: Only handles header display
 * - OCP: Open for customization via props
 * - ISP: Simple interface with optional features
 */

// Props
interface EventSearchHeaderProps {
  title?: string
  subtitle?: string
  showStats?: boolean
  eventCount?: number
  cityCount?: number
  activeFilters?: number
  containerClass?: string
  titleClass?: string
  subtitleClass?: string
}

withDefaults(defineProps<EventSearchHeaderProps>(), {
  title: 'Discover Events',
  subtitle: 'Find and explore amazing events near you',
  showStats: false,
  containerClass: 'mb-8',
  titleClass: 'text-4xl',
  subtitleClass: '',
})
</script>