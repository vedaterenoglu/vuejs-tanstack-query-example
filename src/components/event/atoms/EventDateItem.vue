<!--
/**
 * @file EventDateItem.vue
 * @role Event date item atom - displays formatted date with icon
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Date display only)
 */
-->
<template>
  <div :class="['event-date-item-atom', 'flex items-start gap-3', className]">
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
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <div class="flex-1">
      <p class="text-base text-foreground">{{ formattedDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * EventDateItem Atom Component
 *
 * Features:
 * - Displays formatted date
 * - Calendar icon
 * - Atom-level component (smallest unit)
 * - No business logic beyond formatting
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
interface EventDateItemProps {
  date: string | Date
  label?: string
  className?: string
}

const props = defineProps<EventDateItemProps>()

// Format date as "Thursday, January 25, 2029"
const formattedDate = computed(() => {
  if (!props.date) return 'Date TBD'

  try {
    const dateObj =
      typeof props.date === 'string' ? new Date(props.date) : props.date
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return dateObj.toLocaleDateString('en-US', options)
  } catch {
    return 'Date TBD'
  }
})
</script>

<style scoped>
.event-date-item-atom {
  /* Atom-specific styles */
}
</style>
