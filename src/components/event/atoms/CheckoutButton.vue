<!--
/**
 * @file CheckoutButton.vue
 * @role Checkout button atom - triggers payment flow
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Button display only)
 */
-->
<template>
  <button
    :class="[
      'checkout-button-atom',
      'w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-700',
      className,
    ]"
    @click="$emit('click')"
  >
    {{ label || 'Select Tickets' }}
  </button>
</template>

<script setup lang="ts">
/**
 * CheckoutButton Atom Component
 *
 * Features:
 * - Displays checkout/select tickets button
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
interface CheckoutButtonProps {
  label?: string
  className?: string
}

defineProps<CheckoutButtonProps>()
defineEmits<{
  click: []
}>()
</script>

<style scoped>
.checkout-button-atom {
  /* Atom-specific styles */
}
</style>
