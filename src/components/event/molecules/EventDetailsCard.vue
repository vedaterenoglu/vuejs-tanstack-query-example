<!--
/**
 * @file EventDetailsCard.vue
 * @role Event details card molecule - composes event info atoms
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Event details composition only)
 */
-->
<template>
  <div
    :class="[
      'event-details-card-molecule',
      'bg-card border border-border rounded-lg p-6 space-y-4',
      className,
    ]"
  >
    <h3 class="text-lg font-semibold text-foreground">Event Details</h3>

    <!-- Event Information Items in correct order -->
    <div class="space-y-3">
      <!-- Date -->
      <EventDateItem :date="date" />

      <!-- Time -->
      <EventTimeItem :date="date" />

      <!-- Location -->
      <EventInfoItem
        icon="📍"
        label="Location"
        :value="location || 'Not specified'"
      />

      <!-- Organizer -->
      <EventInfoItem
        icon="👤"
        label="Organized by"
        :value="organizer || 'Not specified'"
      />

      <!-- Ticket Price -->
      <EventPriceItem :price="price" />

      <!-- Quantity Selector -->
      <div v-if="showQuantitySelector" class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <QuantitySelector
          v-model="localQuantity"
          :price="price"
          :show-price="true"
          :show-total="true"
          :min="1"
          :max="10"
          label="Tickets"
          item-name="ticket"
          :disabled="quantitySelectorDisabled"
        />
      </div>

      <!-- Purchase Button -->
      <div v-if="showPurchaseButton" class="pt-3">
        <button
          type="button"
          :disabled="purchaseButtonDisabled"
          :class="[
            'w-full px-4 py-3 rounded-md font-medium transition-colors',
            'bg-blue-600 hover:bg-blue-700 text-white',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            purchaseButtonClass,
          ]"
          @click="handlePurchase"
        >
          {{ purchaseButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventDetailsCard Molecule Component
 *
 * Features:
 * - Composes event detail atoms
 * - Correct order: Date, Time, Location, Organizer, Price
 * - Card styling with border
 * - Molecule-level component (composed unit)
 * - Quantity selector for tickets
 * - Purchase button with quantity
 *
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - Composition Pattern: Combines atoms
 * - SOLID: Single Responsibility
 */
import { ref, computed } from 'vue'

import EventDateItem from '../atoms/EventDateItem.vue'
import EventInfoItem from '../atoms/EventInfoItem.vue'
import EventPriceItem from '../atoms/EventPriceItem.vue'
import EventTimeItem from '../atoms/EventTimeItem.vue'
import QuantitySelector from '../atoms/QuantitySelector.vue'

interface EventDetailsCardProps {
  date: string
  location?: string
  organizer?: string
  price: number
  quantity?: number
  showQuantitySelector?: boolean
  showPurchaseButton?: boolean
  quantitySelectorDisabled?: boolean
  purchaseButtonDisabled?: boolean
  purchaseButtonClass?: string
  className?: string
}

const props = withDefaults(defineProps<EventDetailsCardProps>(), {
  quantity: 1,
  showQuantitySelector: false,
  showPurchaseButton: false,
  quantitySelectorDisabled: false,
  purchaseButtonDisabled: false,
  purchaseButtonClass: '',
})

const emit = defineEmits<{
  'update:quantity': [value: number]
  'purchase': [quantity: number]
}>()

// Local quantity state
const localQuantity = ref(props.quantity)

// Computed purchase button text
const purchaseButtonText = computed(() => {
  const ticketText = localQuantity.value === 1 ? 'Ticket' : 'Tickets'
  return `Buy ${localQuantity.value} ${ticketText} - $${(props.price * localQuantity.value).toFixed(2)}`
})

// Watch for quantity changes and emit
const handlePurchase = () => {
  emit('update:quantity', localQuantity.value)
  emit('purchase', localQuantity.value)
}
</script>

<style scoped>
.event-details-card-molecule {
  /* Molecule-specific styles */
}
</style>
