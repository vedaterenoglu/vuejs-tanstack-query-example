<!--
/**
 * @file PaymentModalHeader.vue
 * @role Payment modal header atom - displays title and close button
 * @atomic atom
 * @patterns Presentation Pattern
 * @solid SRP (Header display only)
 */
-->
<template>
  <div
    :class="[
      'payment-modal-header',
      'flex items-center justify-between p-6',
      'border-b border-gray-200 dark:border-gray-700',
      className,
    ]"
  >
    <!-- Title -->
    <h2
      class="text-xl font-semibold text-gray-900 dark:text-white"
      :class="titleClass"
    >
      {{ title }}
    </h2>

    <!-- Close Button -->
    <button
      v-if="showCloseButton"
      type="button"
      :disabled="disabled"
      :class="[
        'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200',
        'transition-colors duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        closeButtonClass,
      ]"
      :aria-label="closeAriaLabel"
      @click="$emit('close')"
    >
      <X :class="['h-6 w-6', iconClass]" />
    </button>
  </div>
</template>

<script setup lang="ts">
/**
 * PaymentModalHeader Atom Component
 *
 * Features:
 * - Displays modal title
 * - Optional close button with X icon
 * - Disabled state support
 * - Dark mode compatible
 * - Accessible with ARIA labels
 *
 * Design Patterns:
 * - Presentation Pattern: Pure UI component
 * - SOLID: Single Responsibility (header display only)
 */
import { X } from 'lucide-vue-next'

interface PaymentModalHeaderProps {
  /** Header title text */
  title: string
  /** Show close button */
  showCloseButton?: boolean
  /** Disabled state for close button */
  disabled?: boolean
  /** Additional CSS classes for wrapper */
  className?: string
  /** Additional CSS classes for title */
  titleClass?: string
  /** Additional CSS classes for close button */
  closeButtonClass?: string
  /** Additional CSS classes for icon */
  iconClass?: string
  /** ARIA label for close button */
  closeAriaLabel?: string
}

withDefaults(defineProps<PaymentModalHeaderProps>(), {
  showCloseButton: true,
  disabled: false,
  className: '',
  titleClass: '',
  closeButtonClass: '',
  iconClass: '',
  closeAriaLabel: 'Close modal',
})

defineEmits<{
  close: []
}>()
</script>