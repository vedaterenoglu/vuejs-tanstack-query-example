<!--
/**
 * @file EventBadge.vue
 * @role Event badge atom component
 * @atomic atom
 * @patterns Badge Pattern
 * @solid SRP (Badge display only)
 */
-->
<template>
  <div
    :class="[
      'event-badge inline-flex items-center justify-center',
      'px-3 py-1 rounded-full text-sm font-semibold shadow-lg',
      variantClasses,
      className,
    ]"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
/**
 * EventBadge Atom Component
 *
 * Features:
 * - Text badge display
 * - Multiple variants
 * - Rounded style
 *
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 */
import { computed } from 'vue'

import { type EventBadgeProps } from '../types'

const props = withDefaults(defineProps<EventBadgeProps>(), {
  variant: 'primary',
  className: '',
})

// Computed variant classes
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
  }
  return variants[props.variant || 'primary']
})
</script>
