<!--
/**
 * @file EventLocation.vue
 * @role Event location atom component
 * @atomic atom
 * @patterns Location Display Pattern
 * @solid SRP (Location display only)
 */
-->
<template>
  <div 
    :class="[
      'event-location flex items-center gap-1 text-white/80 text-xs',
      className
    ]"
  >
    <svg 
      v-if="showIcon"
      class="h-3 w-3 flex-shrink-0" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
      />
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
      />
    </svg>
    <span 
      class="line-clamp-1"
      :style="{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }"
    >
      {{ location }}
    </span>
  </div>
</template>

<script setup lang="ts">
/**
 * EventLocation Atom Component
 * 
 * Features:
 * - Location text display
 * - Optional map pin icon
 * - Text truncation
 * 
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 */
import { type EventLocationProps } from '../types'

withDefaults(defineProps<EventLocationProps>(), {
  showIcon: true,
  className: ''
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>