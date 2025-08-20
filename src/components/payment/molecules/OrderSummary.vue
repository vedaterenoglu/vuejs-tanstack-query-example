<!--
/**
 * @file OrderSummary.vue
 * @role Order summary molecule - displays order details
 * @atomic molecule
 * @patterns Presentation Pattern
 * @solid SRP (Order display only)
 */
-->
<template>
  <div :class="['order-summary', className]">
    <!-- Header -->
    <h3
      :class="[
        'font-semibold text-gray-900 dark:text-white mb-3',
        headerClass,
      ]"
    >
      {{ title }}
    </h3>

    <!-- Order Details -->
    <div class="space-y-2 text-sm">
      <!-- Event Name -->
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">
          {{ eventLabel }}:
        </span>
        <span class="text-gray-900 dark:text-white font-medium truncate ml-2">
          {{ eventName }}
        </span>
      </div>

      <!-- Quantity -->
      <div class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">
          {{ quantityLabel }}:
        </span>
        <span class="text-gray-900 dark:text-white">
          {{ quantity }} {{ quantity === 1 ? ticketSingular : ticketPlural }}
        </span>
      </div>

      <!-- Unit Price (if showing) -->
      <div v-if="showUnitPrice" class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400">
          {{ unitPriceLabel }}:
        </span>
        <span class="text-gray-900 dark:text-white">
          {{ formatPrice(unitPrice || 0) }}
        </span>
      </div>

      <!-- Divider -->
      <div
        v-if="showDivider"
        class="pt-2 border-t border-gray-200 dark:border-gray-600"
      />

      <!-- Total -->
      <div
        :class="[
          'flex justify-between font-semibold',
          showDivider ? '' : 'pt-2',
        ]"
      >
        <span class="text-gray-900 dark:text-white">{{ totalLabel }}:</span>
        <span class="text-gray-900 dark:text-white">
          {{ formatPrice(totalAmount) }}
        </span>
      </div>
    </div>

    <!-- Additional Info Slot -->
    <slot name="additional-info" />
  </div>
</template>

<script setup lang="ts">
/**
 * OrderSummary Molecule Component
 *
 * Features:
 * - Displays event name, quantity, and total
 * - Optional unit price display
 * - Customizable labels
 * - Dark mode compatible
 * - Price formatting
 * - Slot for additional information
 *
 * Design Patterns:
 * - Presentation Pattern: Pure display component
 * - SOLID: Single Responsibility (order summary display only)
 */

interface OrderSummaryProps {
  /** Section title */
  title?: string
  /** Event name */
  eventName: string
  /** Ticket quantity */
  quantity: number
  /** Unit price per ticket */
  unitPrice?: number
  /** Total amount */
  totalAmount: number
  /** Show unit price row */
  showUnitPrice?: boolean
  /** Show divider before total */
  showDivider?: boolean
  /** Label for event */
  eventLabel?: string
  /** Label for quantity */
  quantityLabel?: string
  /** Label for unit price */
  unitPriceLabel?: string
  /** Label for total */
  totalLabel?: string
  /** Singular ticket label */
  ticketSingular?: string
  /** Plural ticket label */
  ticketPlural?: string
  /** Additional CSS classes */
  className?: string
  /** Additional CSS classes for header */
  headerClass?: string
  /** Currency symbol */
  currencySymbol?: string
}

const props = withDefaults(defineProps<OrderSummaryProps>(), {
  title: 'Order Summary',
  showUnitPrice: false,
  showDivider: true,
  eventLabel: 'Event',
  quantityLabel: 'Quantity',
  unitPriceLabel: 'Price per ticket',
  totalLabel: 'Total',
  ticketSingular: 'ticket',
  ticketPlural: 'tickets',
  className: '',
  headerClass: '',
  currencySymbol: '$',
})

/**
 * Format price with currency symbol
 */
const formatPrice = (price: number): string => {
  return `${props.currencySymbol}${price.toFixed(2)}`
}
</script>