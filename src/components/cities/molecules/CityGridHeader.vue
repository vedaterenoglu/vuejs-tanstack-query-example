<!--
/**
 * @file CityGridHeader.vue
 * @role City grid header molecule - displays results count and loading state
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Header display only)
 */
-->
<template>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-sm text-muted-foreground font-normal">
      <template v-if="isSearchActive">
        {{ resultText }}
      </template>
      <template v-else>
        {{ totalText }}
      </template>
    </h3>
    
    <div v-if="showPartialLoading" class="flex items-center text-muted-foreground">
      <RefreshCw class="w-4 h-4 animate-spin mr-2" />
      <span class="text-sm">Updating...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CityGridHeader Molecule Component
 * 
 * Features:
 * - Displays result count
 * - Shows search context
 * - Indicates loading state
 * 
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - SOLID: Single Responsibility
 */
import { RefreshCw } from 'lucide-vue-next'
import { computed } from 'vue'

interface CityGridHeaderProps {
  isSearchActive?: boolean
  filteredCount?: number
  totalCount?: number
  showPartialLoading?: boolean
}

const props = withDefaults(defineProps<CityGridHeaderProps>(), {
  isSearchActive: false,
  filteredCount: 0,
  totalCount: 0,
  showPartialLoading: false
})

const resultText = computed(() => {
  if (props.filteredCount === 1) {
    return '1 result found'
  }
  return `${props.filteredCount} results found`
})

const totalText = computed(() => {
  if (props.totalCount === 1) {
    return '1 city available'
  }
  return `${props.totalCount} cities available`
})
</script>

<style scoped>
/* Header-specific styles */
</style>