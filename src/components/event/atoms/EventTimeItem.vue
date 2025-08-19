<!--
/**
 * @file EventTimeItem.vue
 * @role Event time item atom - displays formatted time with icon
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Time display only)
 */
-->
<template>
  <div :class="['event-time-item-atom', 'flex items-start gap-3', className]">
    <svg
      class="w-5 h-5 text-muted-foreground mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <div class="flex-1">
      <p class="text-base text-foreground">{{ formattedTime }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * EventTimeItem Atom Component
 *
 * Features:
 * - Displays formatted time
 * - Clock icon
 * - Atom-level component (smallest unit)
 * - No business logic beyond formatting
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
interface EventTimeItemProps {
  date: string | Date
  label?: string
  className?: string
}

const props = defineProps<EventTimeItemProps>()

// Format time as "8:00 PM"
const formattedTime = computed(() => {
  if (!props.date) return 'Time TBD'

  try {
    const dateObj =
      typeof props.date === 'string' ? new Date(props.date) : props.date
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }
    return dateObj.toLocaleTimeString('en-US', options)
  } catch {
    return 'Time TBD'
  }
})
</script>

<style scoped>
.event-time-item-atom {
  /* Atom-specific styles */
}
</style>
