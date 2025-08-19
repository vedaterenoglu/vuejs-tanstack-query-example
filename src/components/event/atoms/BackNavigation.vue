<!--
/**
 * @file BackNavigation.vue
 * @role Back navigation atom - navigation link/button
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Navigation display only)
 */
-->
<template>
  <button
    :class="[
      'back-navigation-atom',
      'flex items-center gap-2 text-foreground hover:text-foreground/80 font-medium',
      className,
    ]"
    @click="$emit('click')"
  >
    <span class="text-lg">←</span>
    <span>{{ label || 'Back to Events' }}</span>
  </button>
</template>

<script setup lang="ts">
/**
 * BackNavigation Atom Component
 *
 * Features:
 * - Displays back navigation button
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
interface BackNavigationProps {
  label?: string
  className?: string
}

defineProps<BackNavigationProps>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.back-navigation-atom {
  /* Atom-specific styles */
}
</style>
