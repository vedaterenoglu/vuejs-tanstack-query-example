<!--
/**
 * @file SelectTicketsButton.vue
 * @role Select tickets button atom - purchase action button
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Button display only)
 */
-->
<template>
  <button
    :class="[
      'select-tickets-button-atom',
      'w-full bg-muted/50 text-foreground py-2.5 rounded-md font-medium',
      'hover:bg-muted/70 transition-colors',
      'flex items-center justify-center gap-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className,
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
    <span>{{ label || 'Select Tickets' }}</span>
  </button>
</template>

<script setup lang="ts">
/**
 * SelectTicketsButton Atom Component
 *
 * Features:
 * - Purchase action button
 * - Cart icon
 * - Disabled state
 * - Atom-level component (smallest unit)
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
interface SelectTicketsButtonProps {
  label?: string
  disabled?: boolean
  className?: string
}

defineProps<SelectTicketsButtonProps>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.select-tickets-button-atom {
  /* Atom-specific styles */
}
</style>
