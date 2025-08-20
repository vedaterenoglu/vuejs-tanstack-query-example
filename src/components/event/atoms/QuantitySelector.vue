<!--
/**
 * @file QuantitySelector.vue
 * @role Quantity selector atom - ticket quantity input
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Quantity selection only)
 */
-->
<template>
  <div :class="['quantity-selector', className]">
    <!-- Label -->
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
      <span v-if="showPrice" class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatPrice(price) }} each
      </span>
    </div>

    <!-- Selector Controls -->
    <div class="flex items-center gap-2">
      <!-- Decrease Button -->
      <button
        type="button"
        :disabled="disabled || quantity <= min"
        :class="[
          'p-2 rounded-md transition-colors',
          'border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonClass,
        ]"
        :aria-label="`Decrease ${itemName}`"
        @click="handleDecrease"
      >
        <Minus class="h-4 w-4" />
      </button>

      <!-- Quantity Display -->
      <div
        :class="[
          'min-w-[60px] px-3 py-2 text-center',
          'border border-gray-300 dark:border-gray-600 rounded-md',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100 font-medium',
          displayClass,
        ]"
      >
        {{ quantity }}
      </div>

      <!-- Increase Button -->
      <button
        type="button"
        :disabled="disabled || quantity >= max"
        :class="[
          'p-2 rounded-md transition-colors',
          'border border-gray-300 dark:border-gray-600',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonClass,
        ]"
        :aria-label="`Increase ${itemName}`"
        @click="handleIncrease"
      >
        <Plus class="h-4 w-4" />
      </button>
    </div>

    <!-- Total Price Display -->
    <div
      v-if="showTotal"
      class="mt-2 text-right text-sm font-medium text-gray-900 dark:text-gray-100"
    >
      Total: {{ formatPrice(quantity * price) }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * QuantitySelector Atom Component
 *
 * Features:
 * - Increment/decrement buttons
 * - Min/max constraints
 * - Price display per item
 * - Total price calculation
 * - Disabled state
 * - Accessible with ARIA labels
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility (quantity selection only)
 */
import { Plus, Minus } from 'lucide-vue-next'

interface QuantitySelectorProps {
  /** Current quantity value */
  modelValue: number
  /** Minimum allowed quantity */
  min?: number
  /** Maximum allowed quantity */
  max?: number
  /** Label text */
  label?: string
  /** Item name for ARIA labels */
  itemName?: string
  /** Price per item */
  price?: number
  /** Show price per item */
  showPrice?: boolean
  /** Show total price */
  showTotal?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Currency symbol */
  currencySymbol?: string
  /** Additional CSS classes */
  className?: string
  /** Additional CSS classes for buttons */
  buttonClass?: string
  /** Additional CSS classes for display */
  displayClass?: string
}

const props = withDefaults(defineProps<QuantitySelectorProps>(), {
  min: 1,
  max: 10,
  label: 'Quantity',
  itemName: 'quantity',
  price: 0,
  showPrice: false,
  showTotal: false,
  disabled: false,
  currencySymbol: '$',
  className: '',
  buttonClass: '',
  displayClass: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

// Computed property for reactive quantity
const quantity = props.modelValue

/**
 * Format price with currency symbol
 */
const formatPrice = (amount: number): string => {
  return `${props.currencySymbol}${amount.toFixed(2)}`
}

/**
 * Handle decrease quantity
 */
const handleDecrease = () => {
  if (quantity > props.min) {
    emit('update:modelValue', quantity - 1)
  }
}

/**
 * Handle increase quantity
 */
const handleIncrease = () => {
  if (quantity < props.max) {
    emit('update:modelValue', quantity + 1)
  }
}
</script>