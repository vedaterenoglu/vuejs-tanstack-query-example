<!--
/**
 * @file EventTitle.vue
 * @role Event title atom component
 * @atomic atom
 * @patterns Text Display Pattern
 * @solid SRP (Title display only)
 */
-->
<template>
  <h3
    :class="[
      'event-title font-semibold text-white',
      truncate ? 'truncate' : '',
      className,
    ]"
    :style="{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }"
  >
    {{ title }}
  </h3>
</template>

<script setup lang="ts">
/**
 * EventTitle Atom Component
 *
 * Features:
 * - Title text display
 * - Optional truncation
 * - White text with shadow
 *
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 */
import { type EventTitleProps } from '../types'

withDefaults(defineProps<EventTitleProps>(), {
  truncate: true,
  className: 'text-base',
})
</script>
