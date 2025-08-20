<!--
/**
 * @file EventsContainer.vue
 * @role Events business logic container
 * @atomic container
 * @patterns Container Pattern, Facade Pattern
 * @solid SRP (Business logic only), DIP (Depends on abstractions)
 */
-->
<template>
  <EventsPresentation
    :events="events"
    :is-loading="isLoading"
    :error="error"
    :search-query="searchBoxQuery"
    :has-more="hasMore"
    :is-fetching-next="isFetchingNext"
    @search-change="handleSearchChange"
    @refresh="handleRefresh"
    @event-select="handleEventSelect"
  />
  <!-- Infinite Scroll Sentinel -->
  <div ref="sentinelRef" class="h-1" />
</template>

<script setup lang="ts">
/**
 * EventsContainer - Business logic container for events
 *
 * Responsibilities:
 * - Orchestrates business logic via composables
 * - Search handling via useEventSearch
 * - Grid data via useEventGrid
 * - Navigation via useEventNavigation
 *
 * Design Patterns:
 * - Container Pattern: Orchestrates composables
 * - Facade Pattern: Simplifies complex operations
 * - Delegation Pattern: Delegates UI to presentation component
 * 
 * SOLID Principles:
 * - SRP: Delegates to specialized composables
 * - OCP: Open for extension via composables
 * - DIP: Depends on composable abstractions
 */
import { useEventGrid } from '../composables/useEventGrid'
import { useEventNavigation } from '../composables/useEventNavigation'
import { useEventSearch } from '../composables/useEventSearch'
import { EventsPresentation } from '../presentation'

// Search logic via composable
const { searchBoxQuery, searchParams, handleSearchChange, handleRefresh: refreshSearch } = useEventSearch()

// Grid data management via composable
const { 
  events, 
  isLoading, 
  error, 
  hasMore, 
  isFetchingNext, 
  sentinelRef, 
  refetch 
} = useEventGrid(searchParams)

// Navigation logic via composable
const { navigateToEvent } = useEventNavigation()

// Event handlers
const handleRefresh = () => {
  refreshSearch(refetch)
}

const handleEventSelect = navigateToEvent
</script>