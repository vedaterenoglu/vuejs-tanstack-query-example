<!--
/**
 * @file TestPaymentModal.vue
 * @role Payment modal organism - test payment confirmation dialog
 * @atomic organism
 * @patterns Modal Pattern, Container Pattern
 * @solid SRP (Payment modal only), OCP (Extensible via props)
 */
-->
<template>
  <div
    v-if="isOpen"
    :class="[
      'test-payment-modal-organism',
      'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
      className,
    ]"
  >
    <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Test Payment Modal (Shell)
      </h2>

      <div class="bg-gray-100 p-4 rounded mb-4">
        <p class="text-sm text-gray-600 mb-2">Event: {{ eventName }}</p>
        <p class="text-sm text-gray-600 mb-2">Quantity: {{ quantity }}</p>
        <p class="text-lg font-bold">Total: ${{ totalAmount.toFixed(2) }}</p>
      </div>

      <div
        class="bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded mb-4"
      >
        <p class="text-sm">This is a test payment modal</p>
      </div>

      <div class="flex gap-3">
        <button
          class="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          @click="$emit('confirm')"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * TestPaymentModal Organism Component
 *
 * Features:
 * - Displays payment confirmation dialog
 * - Shows order summary
 * - Handles confirm/cancel actions
 * - Shell for progressive development
 *
 * Design Patterns:
 * - Modal Pattern: Overlay dialog
 * - Container Pattern: Contains payment UI
 */
interface TestPaymentModalProps {
  isOpen: boolean
  eventName: string
  quantity: number
  totalAmount: number
  isProcessing?: boolean
  className?: string
}

defineProps<TestPaymentModalProps>()
defineEmits<{
  close: []
  confirm: []
}>()
</script>

<style scoped>
.test-payment-modal-organism {
  /* Organism-specific styles */
}
</style>
