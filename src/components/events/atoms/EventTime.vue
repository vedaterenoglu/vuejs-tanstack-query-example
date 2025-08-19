<!--
/**
 * @file EventTime.vue
 * @role Event time atom component
 * @atomic atom
 * @patterns Time Display Pattern
 * @solid SRP (Time display only)
 */
-->
<template>
  <div
    :class="[
      'event-time flex items-center gap-1 text-white/90 text-xs',
      className,
    ]"
  >
    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <span>{{ formattedTime }}</span>
  </div>
</template>

<script setup lang="ts">
/**
 * EventTime Atom Component
 *
 * Features:
 * - Time display with clock icon
 * - 12-hour format with AM/PM
 * - Consistent formatting
 *
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 */
import { computed } from 'vue'

interface EventTimeProps {
  date: string | Date
  className?: string
}

const props = withDefaults(defineProps<EventTimeProps>(), {
  className: '',
})

// Format time for display
const formattedTime = computed(() => {
  const date =
    typeof props.date === 'string' ? new Date(props.date) : props.date

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
})
</script>
