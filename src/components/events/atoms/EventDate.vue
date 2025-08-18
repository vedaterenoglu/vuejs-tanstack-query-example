<!--
/**
 * @file EventDate.vue
 * @role Event date display atom
 * @atomic atom
 * @patterns Presentational Component Pattern
 * @solid SRP (Date display only)
 */
-->
<template>
  <div class="flex items-center gap-1">
    <Calendar :class="iconClass" />
    <time :datetime="date">{{ formattedDate }}</time>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { computed } from 'vue'

interface EventDateProps {
  date: string
  format?: Intl.DateTimeFormatOptions
  iconClass?: string
}

const props = withDefaults(defineProps<EventDateProps>(), {
  format: () => ({
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }),
  iconClass: 'h-3 w-3'
})

const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('en-US', props.format)
})
</script>