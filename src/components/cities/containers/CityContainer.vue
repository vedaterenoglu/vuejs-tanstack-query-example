<!--
/**
 * @file CityContainer.vue
 * @role Container component for city grid - handles business logic
 * @patterns Container Pattern, Smart Component Pattern
 * @solid SRP (Business logic only), DIP (Depends on abstractions)
 */
-->
<template>
  <CityGrid
    :cities="cities"
    :is-loading="isLoading"
    :is-search-active="isSearchActive"
    :filtered-count="filteredCount"
    :total-count="totalCount"
    :class-name="className"
    @refresh="onRefresh"
  />
</template>

<script setup lang="ts">
/**
 * CityContainer Component
 * 
 * Features:
 * - Manages city data and state
 * - Handles business logic
 * - Delegates presentation to CityGrid
 * - Orchestrates data flow
 * 
 * Design Patterns:
 * - Container Pattern: Business logic container
 * - Smart/Dumb Pattern: Smart container, dumb presentation
 * - SOLID: SRP (Business logic only)
 */
import type { City } from '@/lib/types'

import { CityGrid } from '../organisms'

interface CityContainerProps {
  cities: City[]
  isLoading?: boolean
  isSearchActive?: boolean
  filteredCount?: number
  totalCount?: number
  className?: string
}

withDefaults(defineProps<CityContainerProps>(), {
  isLoading: false,
  isSearchActive: false,
  filteredCount: 0,
  totalCount: 0,
  className: ''
})

const emit = defineEmits<{
  refresh: []
}>()

const onRefresh = () => {
  emit('refresh')
}
</script>

<style scoped>
/* Container-specific styles */
</style>