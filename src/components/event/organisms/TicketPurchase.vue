<!--
/**
 * @file TicketPurchase.vue
 * @role Ticket purchase organism - handles ticket selection and purchase
 * @atomic organism
 * @patterns Container Pattern, State Management Pattern
 * @solid SRP (Ticket purchase only), OCP (Extensible via props)
 */
-->
<template>
  <div
    :class="[
      'ticket-purchase-organism',
      'bg-card border border-border rounded-lg p-6 space-y-4',
      className,
    ]"
  >
    <h3 class="text-lg font-semibold text-foreground">Get Tickets</h3>

    <!-- Quantity Selector -->
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-muted-foreground"
        >Number of tickets</span
      >
      <div class="flex items-center gap-2">
        <button
          class="w-8 h-8 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
          :disabled="quantity <= 0"
          @click="quantity--"
        >
          <span class="text-lg">−</span>
        </button>
        <span class="font-semibold text-lg min-w-[3ch] text-center">{{
          quantity
        }}</span>
        <button
          class="w-8 h-8 rounded-md border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
          @click="quantity++"
        >
          <span class="text-lg">+</span>
        </button>
      </div>
    </div>

    <!-- Price Display -->
    <div class="py-3 border-t border-border">
      <div class="flex justify-between items-center">
        <span class="text-sm text-muted-foreground">Price per ticket</span>
        <span class="font-medium">${{ price.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between items-center mt-2">
        <span class="font-medium">Total</span>
        <span class="text-xl font-bold text-primary"
          >${{ (price * quantity).toFixed(2) }}</span
        >
      </div>
    </div>

    <!-- Purchase Button -->
    <button
      class="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      :disabled="quantity <= 0"
      @click="$emit('purchase', quantity)"
    >
      {{
        quantity > 0
          ? `Purchase ${quantity} ${quantity === 1 ? 'Ticket' : 'Tickets'}`
          : 'Select Tickets'
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/**
 * TicketPurchase Organism Component
 *
 * Features:
 * - Manages ticket quantity selection
 * - Calculates total price
 * - Handles purchase action
 * - Shell for progressive development
 *
 * Design Patterns:
 * - Container Pattern: Contains quantity, price, purchase UI
 * - State Management: Internal quantity state
 */
interface TicketPurchaseProps {
  price: number
  eventName: string
  className?: string
}

defineProps<TicketPurchaseProps>()
defineEmits<{
  purchase: [quantity: number]
}>()

// Local state for quantity
const quantity = ref(0)
</script>

<style scoped>
.ticket-purchase-organism {
  /* Organism-specific styles */
}
</style>
