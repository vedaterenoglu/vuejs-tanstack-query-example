<!--
/**
 * @file EventSidebar.vue
 * @role Event sidebar organism - combines details and ticket purchase
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Sidebar orchestration only), OCP (Extensible via molecules)
 */
-->
<template>
  <div :class="['event-sidebar-organism', 'space-y-0', className]">
    <!-- Single card containing everything -->
    <div class="bg-card border border-border rounded-lg">
      <!-- Event Details Section -->
      <div class="p-6 space-y-4">
        <h3 class="text-lg font-semibold text-foreground">Event Details</h3>

        <!-- Event Information Items in correct order -->
        <div class="space-y-4">
          <!-- Date -->
          <EventDateItem :date="event.date" />

          <!-- Time -->
          <EventTimeItem :date="event.date" />

          <!-- Location -->
          <EventInfoItem
            icon="📍"
            label="Location"
            :value="event.location || 'Not specified'"
          />

          <!-- Organizer -->
          <EventInfoItem
            icon="👤"
            label="Organized by"
            :value="organizerName || 'Not specified'"
          />

          <!-- Ticket Price -->
          <EventPriceItem :price="event.price" />
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-border"></div>

      <!-- Ticket Purchase Section -->
      <div class="p-6 space-y-4">
        <!-- Quantity Selector -->
        <QuantitySelector v-model="quantity" />

        <!-- Select Tickets Button -->
        <SelectTicketsButton
          :disabled="quantity <= 0"
          @click="handlePurchase"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import type { Event } from '@/components/events/types'

import EventDateItem from '../atoms/EventDateItem.vue'
import EventInfoItem from '../atoms/EventInfoItem.vue'
import EventPriceItem from '../atoms/EventPriceItem.vue'
import EventTimeItem from '../atoms/EventTimeItem.vue'
import SelectTicketsButton from '../atoms/SelectTicketsButton.vue'
import QuantitySelector from '../molecules/QuantitySelector.vue'

/**
 * EventSidebar Organism Component
 *
 * Features:
 * - Orchestrates event details and ticket purchase
 * - Composes molecules and atoms
 * - Single card design matching React
 * - Manages ticket quantity state
 *
 * Design Patterns:
 * - Container Pattern: Orchestrates molecules/atoms
 * - Composition Pattern: Composes from smaller units
 * - SOLID: SRP (Sidebar orchestration only)
 */
interface EventSidebarProps {
  event: Event
  className?: string
}

const props = defineProps<EventSidebarProps>()
const emit = defineEmits<{
  purchase: [quantity: number]
}>()

// Local state for quantity
const quantity = ref(0)

// Extract organizer name from event
const organizerName = computed(() => {
  // Check for organizer field or derive from event
  interface EventWithOrganizer extends Event {
    organizer?: string
  }
  return (props.event as EventWithOrganizer).organizer || 'ATX Music Scene'
})

const handlePurchase = () => {
  emit('purchase', quantity.value)
}
</script>

<style scoped>
.event-sidebar-organism {
  /* Organism-specific styles */
}
</style>
