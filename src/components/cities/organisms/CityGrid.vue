<!--
/**
 * @file CityGrid.vue
 * @role City grid organism - presentation component for city list
 * @atomic organism
 * @patterns Presentation Pattern, Composition Pattern
 * @solid SRP (Presentation only), OCP (Extensible via props)
 */
-->
<template>
  <section
    v-if="cities.length > 0"
    :class="className"
    role="region"
    aria-label="Cities grid"
  >
    <!-- Results Header -->
    <CityGridHeader
      :is-search-active="isSearchActive"
      :filtered-count="filteredCount"
      :total-count="totalCount"
      :show-partial-loading="isLoading && cities.length > 0"
    />

    <!-- Cities Grid -->
    <ul :class="gridClass">
      <ScrollAnimateWrapper
        v-for="(city, index) in cities"
        :key="city.citySlug"
        :delay="index * 100"
        animation="fadeIn"
        :once="false"
      >
        <li class="list-none">
          <CityCard :city="city" />
        </li>
      </ScrollAnimateWrapper>
    </ul>

    <!-- Load More Hint -->
    <p
      v-if="cities.length >= 12"
      class="text-center text-sm text-muted-foreground mt-6"
    >
      Showing {{ cities.length }} of {{ filteredCount || totalCount }} cities
    </p>
  </section>
</template>

<script setup lang="ts">
/**
 * CityGrid Presentation Component
 *
 * Features:
 * - Pure presentation component
 * - Displays city grid with animations
 * - Shows results header and load more hint
 *
 * Design Patterns:
 * - Presentation Pattern: No business logic
 * - Composition Pattern: Composes molecules
 * - SOLID: SRP (Presentation only)
 */
import { computed } from 'vue'

import { ScrollAnimateWrapper } from '@/components/ui'
import type { City } from '@/lib/types'

import { CityCard, CityGridHeader } from '../molecules'

interface CityGridProps {
  cities: City[]
  isLoading?: boolean
  isSearchActive?: boolean
  filteredCount?: number
  totalCount?: number
  className?: string
}

withDefaults(defineProps<CityGridProps>(), {
  isLoading: false,
  isSearchActive: false,
  className: '',
})

const gridClass = computed(() => {
  return 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
})
</script>

<style scoped>
/* Grid-specific styles */
</style>
