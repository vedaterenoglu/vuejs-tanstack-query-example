<!--
/**
 * @file CityGrid.vue
 * @role Semantic cities list with results header and animations
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern, Template Method Pattern
 * @solid SRP (Cities list display with metadata)
 */
-->
<template>
  <section v-if="hasResults" :class="className" role="region" aria-label="Cities grid">
    <!-- Results Header -->
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-sm text-muted-foreground font-normal">
        <template v-if="isSearchActive">
          Showing {{ cities.length }} of {{ filteredCount }} results for "{{ searchQuery }}"
          <span v-if="maxCities && filteredCount > maxCities" class="ml-2 text-xs">
            (limited to first {{ maxCities }})
          </span>
        </template>
        <template v-else>
          {{ cities.length }} destination{{ cities.length !== 1 ? 's' : '' }} available
          <span v-if="maxCities && filteredCount > maxCities" class="ml-2 text-xs">
            (showing first {{ maxCities }})
          </span>
        </template>
      </h3>
      
      <!-- Loading Indicator for Partial Updates -->
      <div v-if="isLoading" class="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw class="h-3 w-3 animate-spin" />
        <span>Updating...</span>
      </div>
    </div>
    
    <!-- Cities Grid -->
    <ScrollAnimateWrapper animation="fadeUp" :threshold="0.1" :duration="600">
      <ul :class="gridClasses" role="list">
        <li v-for="city in cities" :key="city.citySlug" class="list-none">
          <CityCard
            :city="city"
            :on-select="onCitySelect"
            :disabled="isLoading"
            :show-select-button="showSelectButton"
            @click="handleCityClick"
          />
        </li>
      </ul>
    </ScrollAnimateWrapper>
    
    <!-- Load More Hint -->
    <div v-if="shouldShowLoadMoreHint" class="text-center mt-8 p-4 bg-muted/50 rounded-lg">
      <p class="text-sm text-muted-foreground">
        {{ filteredCount - (maxCities || 0) }} more cities available. Try refining your
        search to see specific destinations.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
/**
 * CitiesGrid - Semantic cities list with results header and animations
 * 
 * Matches React CitiesGrid features:
 * - Semantic section with ARIA labeling
 * - Results header with count and search context
 * - Loading indicator for partial updates
 * - Semantic ul/li list structure
 * - Load more hints when results exceed limit
 * - Customizable grid classes
 * 
 * Design Patterns:
 * - Container/Presentational Pattern
 * - Composition Pattern
 * - Template Method Pattern
 * - Event Handler Pattern
 */
import { RefreshCw } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { ScrollAnimateWrapper } from '@/components/ui'
import type { City } from '@/lib/types'

import CityCard from './CityCard.vue'

// Props interface matching React CitiesGrid
interface CityGridProps {
  cities: City[]
  hasResults?: boolean
  isLoading?: boolean
  isSearchActive?: boolean
  searchQuery?: string
  filteredCount?: number
  maxCities?: number
  gridClasses?: string
  onCitySelect?: (city: City) => void
  showSelectButton?: boolean
  className?: string
}

// Define props with defaults
const props = withDefaults(defineProps<CityGridProps>(), {
  hasResults: true,
  isLoading: false,
  isSearchActive: false,
  searchQuery: '',
  filteredCount: 0,
  maxCities: undefined,
  gridClasses: 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  onCitySelect: undefined,
  showSelectButton: true,
  className: ''
})

// Router for navigation
const router = useRouter()

// Computed property for load more hint
const shouldShowLoadMoreHint = computed(() => {
  return props.maxCities && props.filteredCount > props.maxCities
})

// Handle city card click (receives city from emitted event)
const handleCityClick = (city: City) => {
  void router.push(`/events?search=${city.citySlug}`)
}
</script>