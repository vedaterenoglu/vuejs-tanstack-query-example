<!--
/**
 * @file EventGridHeader.vue
 * @role Event grid header display
 * @atomic molecule
 * @patterns Presentational Component Pattern
 * @solid SRP (Header display only)
 * @ssot Props for header data
 */
-->
<template>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-sm text-muted-foreground font-normal">
      <template v-if="isSearchActive">
        Showing {{ eventCount }} of {{ totalCount }} results for "{{ searchQuery }}"
      </template>
      <template v-else>
        {{ eventCount }} event{{ eventCount !== 1 ? 's' : '' }} available
      </template>
    </h3>
    
    <div v-if="isLoading" class="flex items-center gap-2 text-sm text-muted-foreground">
      <RefreshCw class="h-3 w-3 animate-spin" />
      <span>Loading events...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RefreshCw } from 'lucide-vue-next'

interface EventGridHeaderProps {
  eventCount: number
  totalCount?: number
  isSearchActive?: boolean
  searchQuery?: string
  isLoading?: boolean
}

withDefaults(defineProps<EventGridHeaderProps>(), {
  totalCount: 0,
  isSearchActive: false,
  searchQuery: '',
  isLoading: false
})
</script>