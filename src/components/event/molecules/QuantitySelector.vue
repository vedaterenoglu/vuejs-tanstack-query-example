<!--
/**
 * @file QuantitySelector.vue
 * @role Quantity selector molecule - composes quantity controls
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Quantity selection only)
 */
-->
<template>
  <div
    :class="[
      'quantity-selector-molecule',
      'flex items-center justify-between',
      className,
    ]"
  >
    <span class="text-sm font-medium text-foreground">{{
      label || 'Quantity'
    }}</span>
    <div class="flex items-center gap-3">
      <button
        class="w-8 h-8 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
        :disabled="modelValue <= 0"
        @click="$emit('update:modelValue', modelValue - 1)"
      >
        <span class="text-lg">−</span>
      </button>
      <span class="font-semibold text-lg min-w-[3ch] text-center">{{
        modelValue
      }}</span>
      <button
        class="w-8 h-8 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
        @click="$emit('update:modelValue', modelValue + 1)"
      >
        <span class="text-lg">+</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * QuantitySelector Molecule Component
 *
 * Features:
 * - Increment/decrement buttons
 * - Displays current quantity
 * - v-model compatible
 * - Molecule-level component (composed unit)
 *
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - SOLID: Single Responsibility
 */
interface QuantitySelectorProps {
  modelValue: number
  label?: string
  className?: string
}

defineProps<QuantitySelectorProps>()
defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<style scoped>
.quantity-selector-molecule {
  /* Molecule-specific styles */
}
</style>
