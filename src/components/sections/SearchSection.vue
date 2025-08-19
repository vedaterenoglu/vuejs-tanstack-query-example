<!--
/**
 * @file SearchSection.vue
 * @role Semantic search section wrapper with accessibility
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern, Proxy Pattern
 * @solid SRP (Search section layout only)
 */
-->
<template>
  <section :class="className" aria-labelledby="search-heading">
    <h2 id="search-heading" class="sr-only">Search Cities</h2>
    <div class="max-w-2xl mx-auto">
      <SearchBox
        :placeholder="placeholder"
        :on-refresh="onRefresh"
        :debounce-ms="debounceMs"
        :auto-focus="autoFocus"
        :disabled="disabled"
        :show-refresh-button="showRefreshButton"
        :search-query="searchQuery || ''"
        @search-change="handleSearchChange"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * SearchSection - Semantic search section with SearchBox
 *
 * Matches React SearchSection:
 * - Semantic section element with ARIA labeling
 * - Hidden h2 for screen readers
 * - Centered layout with max-width
 * - Props forwarding to SearchBox
 *
 * Design Patterns:
 * - Container Pattern: Wraps SearchBox
 * - Composition Pattern: Semantic section structure
 * - Proxy Pattern: Forwards props to SearchBox
 */
import SearchBox from '@/components/search/SearchBox.vue'

// Props interface matching React
interface SearchSectionProps {
  onRefresh?: () => void
  placeholder?: string
  className?: string
  showRefreshButton?: boolean
  debounceMs?: number
  autoFocus?: boolean
  disabled?: boolean
  searchQuery?: string
  onSearchChange?: (value: string) => void
}

// Define props with defaults
const props = withDefaults(defineProps<SearchSectionProps>(), {
  placeholder: 'Search for your city...',
  className: 'mb-8',
  showRefreshButton: true,
  debounceMs: 300,
  autoFocus: false,
  disabled: false,
  searchQuery: '',
  onRefresh: undefined,
  onSearchChange: undefined,
})

// Handle search change event
const handleSearchChange = (value: string) => {
  props.onSearchChange?.(value)
}
</script>
