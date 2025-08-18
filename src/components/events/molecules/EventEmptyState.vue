<!--
/**
 * @file EventEmptyState.vue
 * @role Event grid empty state display
 * @atomic molecule
 * @patterns Empty State Pattern
 * @solid SRP (Empty state display only)
 */
-->
<template>
  <div class="text-center py-12">
    <Calendar class="w-12 h-12 mx-auto text-muted-foreground mb-4" />
    <h3 class="text-lg font-semibold mb-2">No events found</h3>
    <p class="text-sm text-muted-foreground">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { computed } from 'vue'

interface EventEmptyStateProps {
  isSearchActive?: boolean
}

const props = withDefaults(defineProps<EventEmptyStateProps>(), {
  isSearchActive: false
})

const message = computed(() => 
  props.isSearchActive 
    ? 'Try adjusting your search criteria' 
    : 'No events available at this time'
)
</script>