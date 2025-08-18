<!--
/**
 * @file Button.vue
 * @role Reusable button component
 * @atomic atom
 * @patterns Props Pattern, Emit Pattern
 * @solid SRP (Button display only)
 */
-->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
/**
 * Button - Reusable button atom component
 * 
 * Supports multiple variants and sizes
 * No business logic, pure presentation
 */
import { computed } from 'vue'

// Props interface
interface ButtonProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
}

// Define props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  class: ''
})

// Define emits
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// Computed classes
const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  }
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.class
  ].join(' ')
})

// Handle click
const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>