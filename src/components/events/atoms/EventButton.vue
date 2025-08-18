<!--
/**
 * @file EventButton.vue
 * @role Event button atom component
 * @atomic atom
 * @patterns Button Pattern
 * @solid SRP (Button display and interaction only)
 */
-->
<template>
  <button
    :disabled="disabled"
    :class="[
      'event-button px-4 py-2 min-h-[44px] min-w-[88px] rounded-md',
      'shadow-lg backdrop-blur-sm',
      'transform transition-all duration-200',
      variantClasses,
      className
    ]"
    @click.stop="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
/**
 * EventButton Atom Component
 * 
 * Features:
 * - Action button with variants
 * - Click handling
 * - Disabled state
 * 
 * Design Patterns:
 * - Presentation Pattern: Display with interaction
 */
import { computed } from 'vue'

import { type EventButtonProps } from '../types'

const props = withDefaults(defineProps<EventButtonProps>(), {
  label: 'View Details',
  disabled: false,
  variant: 'ghost',
  className: ''
})

const emit = defineEmits<{
  click: []
}>()

// Computed variant classes
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    ghost: 'bg-black/60 text-white hover:bg-black/70 hover:text-green-500'
  }
  return variants[props.variant || 'ghost']
})

// Event handler
const handleClick = () => {
  if (!props.disabled) {
    if (props.onClick) {
      props.onClick()
    }
    emit('click')
  }
}
</script>