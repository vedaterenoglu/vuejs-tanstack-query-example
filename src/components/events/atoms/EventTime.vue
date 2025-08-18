<!--
/**
 * @file EventTime.vue
 * @role Event time display atom
 * @atomic atom
 * @patterns Presentational Component Pattern
 * @solid SRP (Time display only)
 */
-->
<template>
  <div class="flex items-center gap-1">
    <Clock :class="iconClass" />
    <span>{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
import { Clock } from 'lucide-vue-next'
import { computed } from 'vue'

interface EventTimeProps {
  date: string
  format?: Intl.DateTimeFormatOptions
  iconClass?: string
}

const props = withDefaults(defineProps<EventTimeProps>(), {
  format: () => ({
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }),
  iconClass: 'h-3 w-3'
})

const formattedTime = computed(() => {
  return new Date(props.date).toLocaleTimeString('en-US', props.format)
})
</script>