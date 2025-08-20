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
        <EventInfo 
          :event="event"
          @purchase="handlePurchaseClick"
        />
      </div>
    </div>

    <!-- EnhancedPaymentModal Component -->
    <EnhancedPaymentModal
      :is-open="showPaymentModal"
      :event-name="event.name"
      :quantity="ticketQuantity"
      :total-amount="ticketQuantity * event.price"
      :is-processing="isProcessingPayment"
      @close="handleModalClose"
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
 * - Integrates payment with server-side validation
 *
 * Design Patterns:
 * - Container Pattern: Manages all event components
 * - Composition Pattern: Composes organisms
 */
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import type { Event } from '@/components/events/types'
import { getAppUrl } from '@/lib/config/env'
import { processPayment, validatePaymentRequest } from '@/services/payment/paymentService'

import BackNavigation from '../atoms/BackNavigation.vue'
import EnhancedPaymentModal from '../organisms/EnhancedPaymentModal.vue'
import EventDetails from '../organisms/EventDetails.vue'
import EventHero from '../organisms/EventHero.vue'
import EventInfo from '../organisms/EventInfo.vue'

interface EventContainerProps {
  event: Event
}

const props = defineProps<EventContainerProps>()

const router = useRouter()
const showPaymentModal = ref(false)
const ticketQuantity = ref(1)
const isProcessingPayment = ref(false)
const paymentError = ref<string | null>(null)

const handleBackClick = () => {
  router.back()
}

const handlePurchaseClick = (quantity: number) => {
  ticketQuantity.value = quantity
  showPaymentModal.value = true
  paymentError.value = null
}

const handleModalClose = () => {
  if (!isProcessingPayment.value) {
    showPaymentModal.value = false
    paymentError.value = null
  }
}

const handlePaymentConfirm = async () => {
  try {
    isProcessingPayment.value = true
    paymentError.value = null

    // Validate payment request
    const paymentRequest = validatePaymentRequest({
      eventSlug: props.event.slug,
      quantity: ticketQuantity.value,
      successUrl: getAppUrl(`/payment/success?event=${props.event.slug}`),
      cancelUrl: getAppUrl(`/payment/cancel?event=${props.event.slug}`),
    })

    // Process payment with server-side validation
    // Server will fetch fresh price to prevent manipulation
    const response = await processPayment(paymentRequest)

    // Redirect to Stripe checkout
    if (response.checkoutUrl) {
      window.location.href = response.checkoutUrl
    }
  } catch (error) {
    // Handle errors
    if (error && typeof error === 'object' && 'message' in error) {
      paymentError.value = error.message as string
    } else {
      paymentError.value = 'Payment processing failed. Please try again.'
    }
    // Keep modal open on error for retry
  } finally {
    isProcessingPayment.value = false
  }
}
</script>

<style scoped>
.event-container {
  min-height: 100vh;
}
</style>
