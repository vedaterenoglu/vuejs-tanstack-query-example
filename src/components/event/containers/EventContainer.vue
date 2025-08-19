<!--
/**
 * @file EventContainer.vue
 * @role Event container component - orchestrates all event page components
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Event page container only), DIP (Depends on abstractions)
 */
-->
<template>
  <div class="event-container w-full max-w-[900px] mx-auto">
    <!-- Back Navigation -->
    <BackNavigation class="mb-4 px-4" @click="handleBackClick" />

    <!-- EventHero Component -->
    <EventHero :event="event" class="mb-6" />

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      <!-- Left Column: EventDetails (2/3 width) -->
      <div class="md:col-span-2">
        <EventDetails :description="event.description" />
      </div>

      <!-- Right Column: EventInfo sidebar (1/3 width) -->
      <div class="md:col-span-1">
        <EventInfo :event="event" />
      </div>
    </div>

    <!-- TestPaymentModal Component -->
    <TestPaymentModal
      :isOpen="showPaymentModal"
      :eventName="event.name"
      :quantity="ticketQuantity"
      :totalAmount="ticketQuantity * event.price"
      @close="showPaymentModal = false"
      @confirm="handlePaymentConfirm"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * EventContainer Component
 *
 * Features:
 * - Container for all event page components
 * - Max width constraint of 900px
 * - Orchestrates sub-components
 *
 * Design Patterns:
 * - Container Pattern: Manages all event components
 * - Composition Pattern: Composes organisms
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Event } from '@/components/events/types'

import BackNavigation from '../atoms/BackNavigation.vue'
import EventDetails from '../organisms/EventDetails.vue'
import EventHero from '../organisms/EventHero.vue'
import EventInfo from '../organisms/EventInfo.vue'
import TestPaymentModal from '../organisms/TestPaymentModal.vue'

interface EventContainerProps {
  event: Event
}

defineProps<EventContainerProps>()

const router = useRouter()
const showPaymentModal = ref(false)
const ticketQuantity = ref(0)

const handleBackClick = () => {
  router.back()
}

const handlePaymentConfirm = () => {
  // Payment logic will be handled by composables later
  // console.log('Payment confirmed for', ticketQuantity.value, 'tickets')
  showPaymentModal.value = false
}
</script>

<style scoped>
.event-container {
  min-height: 100vh;
}
</style>
