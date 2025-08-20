<!--
/**
 * @file PaymentModalContent.vue
 * @role Payment modal content molecule - main content area
 * @atomic molecule
 * @patterns Composition Pattern
 * @solid SRP (Content layout only), OCP (Extensible via slots)
 */
-->
<template>
  <div
    :class="[
      'payment-modal-content',
      'p-6 space-y-6',
      'max-h-[60vh] overflow-y-auto',
      className,
    ]"
  >
    <!-- Test Mode Notice Slot -->
    <slot name="notice">
      <div
        v-if="showTestNotice"
        class="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
      >
        <slot name="notice-content" />
      </div>
    </slot>

    <!-- Order Summary Slot -->
    <slot name="order-summary">
      <div
        v-if="showOrderSummary"
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
      >
        <slot name="order-summary-content" />
      </div>
    </slot>

    <!-- Test Card Info Slot -->
    <slot name="test-card">
      <div
        v-if="showTestCard"
        class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 rounded-lg p-4"
      >
        <slot name="test-card-content" />
      </div>
    </slot>

    <!-- Instructions Slot -->
    <slot name="instructions">
      <div v-if="showInstructions" class="space-y-3">
        <slot name="instructions-content" />
      </div>
    </slot>

    <!-- Additional Notes Slot -->
    <slot name="notes">
      <div
        v-if="showNotes"
        class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-xs text-gray-600 dark:text-gray-400"
      >
        <slot name="notes-content" />
      </div>
    </slot>

    <!-- Default Content Slot -->
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * PaymentModalContent Molecule Component
 *
 * Features:
 * - Flexible content layout with multiple slots
 * - Scrollable content area
 * - Section visibility controls
 * - Dark mode compatible
 * - Responsive design
 *
 * Design Patterns:
 * - Composition Pattern: Composes content sections
 * - Slot Pattern: Flexible content injection
 * - SOLID: SRP (Content layout), OCP (Extensible via slots)
 */

interface PaymentModalContentProps {
  /** Show test mode notice section */
  showTestNotice?: boolean
  /** Show order summary section */
  showOrderSummary?: boolean
  /** Show test card info section */
  showTestCard?: boolean
  /** Show instructions section */
  showInstructions?: boolean
  /** Show additional notes section */
  showNotes?: boolean
  /** Additional CSS classes */
  className?: string
}

withDefaults(defineProps<PaymentModalContentProps>(), {
  showTestNotice: true,
  showOrderSummary: true,
  showTestCard: true,
  showInstructions: true,
  showNotes: true,
  className: '',
})
</script>