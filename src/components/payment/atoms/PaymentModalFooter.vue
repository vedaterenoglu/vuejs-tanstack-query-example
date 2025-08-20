<!--
/**
 * @file PaymentModalFooter.vue
 * @role Payment modal footer atom - action buttons area
 * @atomic atom
 * @patterns Presentation Pattern
 * @solid SRP (Footer actions only)
 */
-->
<template>
  <div
    :class="[
      'payment-modal-footer',
      'flex gap-3 p-6',
      'border-t border-gray-200 dark:border-gray-700',
      className,
    ]"
  >
    <!-- Cancel Button -->
    <button
      type="button"
      :disabled="disabled || isProcessing"
      :class="[
        'flex-1 px-4 py-2 rounded-md font-medium transition-colors',
        'text-gray-700 dark:text-gray-300',
        'bg-gray-100 dark:bg-gray-700',
        'hover:bg-gray-200 dark:hover:bg-gray-600',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        cancelButtonClass,
      ]"
      @click="$emit('cancel')"
    >
      {{ cancelLabel }}
    </button>

    <!-- Confirm Button -->
    <button
      type="button"
      :disabled="disabled || isProcessing"
      :class="[
        'flex-1 px-4 py-2 rounded-md font-medium transition-colors',
        'bg-blue-600 hover:bg-blue-700',
        'text-white',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2',
        confirmButtonClass,
      ]"
      @click="$emit('confirm')"
    >
      <!-- Loading Spinner -->
      <div
        v-if="isProcessing"
        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
      />
      
      <!-- Button Text -->
      <span>{{ isProcessing ? processingLabel : confirmLabel }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * PaymentModalFooter Atom Component
 *
 * Features:
 * - Cancel and confirm action buttons
 * - Processing state with spinner
 * - Disabled state support
 * - Dark mode compatible
 * - Customizable button labels
 * - Responsive flex layout
 *
 * Design Patterns:
 * - Presentation Pattern: Pure UI component
 * - SOLID: Single Responsibility (footer actions only)
 */

interface PaymentModalFooterProps {
  /** Cancel button label */
  cancelLabel?: string
  /** Confirm button label */
  confirmLabel?: string
  /** Processing state label */
  processingLabel?: string
  /** Show processing state */
  isProcessing?: boolean
  /** Disabled state for all buttons */
  disabled?: boolean
  /** Additional CSS classes for wrapper */
  className?: string
  /** Additional CSS classes for cancel button */
  cancelButtonClass?: string
  /** Additional CSS classes for confirm button */
  confirmButtonClass?: string
}

withDefaults(defineProps<PaymentModalFooterProps>(), {
  cancelLabel: 'Cancel',
  confirmLabel: 'Proceed to Payment',
  processingLabel: 'Processing...',
  isProcessing: false,
  disabled: false,
  className: '',
  cancelButtonClass: '',
  confirmButtonClass: '',
})

defineEmits<{
  cancel: []
  confirm: []
}>()
</script>