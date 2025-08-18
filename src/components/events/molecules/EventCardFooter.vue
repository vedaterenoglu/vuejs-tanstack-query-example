<!--
/**
 * @file EventCardFooter.vue
 * @role Event card footer molecule - container for action button
 * @atomic molecule
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Footer section only), OCP (Extensible via atoms)
 */
-->
<template>
  <div 
    :class="[
      'event-card-footer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
      'transition-all duration-300 ease-out',
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75',
      className
    ]"
  >
    <!-- Event Button -->
    <EventButton
      label="View Details"
      variant="ghost"
      :disabled="disabled"
      :on-click="onAction"
      :class="isVisible ? 'hover:scale-110' : ''"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * EventCardFooter Molecule Component
 * 
 * Features:
 * - Container for action button
 * - Composes EventButton atom
 * 
 * Design Patterns:
 * - Container Pattern: Contains atoms
 * - Composition Pattern: Composes atoms
 */
import { EventButton } from '../atoms'

interface EventCardFooterProps {
  onAction?: () => void
  disabled?: boolean
  isVisible?: boolean
  className?: string
}

withDefaults(defineProps<EventCardFooterProps>(), {
  disabled: false,
  isVisible: false,
  className: ''
})
</script>