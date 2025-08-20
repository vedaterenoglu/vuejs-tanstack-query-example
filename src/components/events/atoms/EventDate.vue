<!--
/**
 * @file EventDate.vue
 * @role Event date atom component
 * @atomic atom
 * @patterns Date Display Pattern
 * @solid SRP (Date display only)
 */
-->
<template>
  <div
    :class="[
      'event-date flex items-center gap-1 text-white/90 text-xs',
      className,
    ]"
  >
    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <time :datetime="dateString">{{ formattedDate }}</time>
  </div>
</template>

<script setup lang="ts">
/**
 * EventDate Atom Component
 *
 * Features:
 * - Date display with icon
 * - Semantic time element
 * - Formatted date text
 *
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 */
import { computed } from 'vue'

import { type EventDateProps } from '../types'

const props = withDefaults(defineProps<EventDateProps>(), {
  format: 'short',
  className: '',
})

// Convert date to string for datetime attribute
const dateString = computed(() => {
  if (typeof props.date === 'string') {
    // If it's already a string, try to parse it to get ISO format
    const parsedDate = new Date(props.date)
    return parsedDate.toISOString()
  }
  return props.date
})

// Format date for display
const formattedDate = computed(() => {
  const date =
    typeof props.date === 'string' ? new Date(props.date) : props.date

  if (props.format === 'long') {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>
