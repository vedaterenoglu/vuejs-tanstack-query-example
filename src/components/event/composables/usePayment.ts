/**
 * @file usePayment.ts
 * @role Payment composable - handles payment processing logic
 * @patterns Composable Pattern, Command Pattern
 * @solid SRP (Payment processing only), DIP (Depends on service abstraction)
 */

import { ref, computed } from 'vue'

import {
  processPayment,
  validatePaymentRequest,
} from '@/services/payment/paymentService'

/**
 * usePayment Composable
 *
 * Features:
 * - Handles payment processing
 * - Manages payment state and errors
 * - Validates payment requests
 * - Integrates with payment service
 *
 * Design Patterns:
 * - Composable Pattern: Encapsulates payment logic
 * - Command Pattern: Payment actions
 * - SOLID: Single Responsibility (payment processing)
 */
export function usePayment() {
  // State
  const isProcessing = ref(false)
  const paymentError = ref<string | null>(null)
  const showModal = ref(false)

  // Computed
  const hasError = computed(() => !!paymentError.value)
  const canProcess = computed(() => !isProcessing.value)

  // Actions
  const handlePayment = async (
    eventSlug: string,
    quantity: number,
    onSuccess?: () => void
  ) => {
    try {
      isProcessing.value = true
      paymentError.value = null

      // Create and validate payment request
      const paymentRequest = validatePaymentRequest({
        eventSlug,
        quantity,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      })

      // Process payment through service
      const response = await processPayment(paymentRequest)

      // Handle success
      if (response.checkoutUrl) {
        if (onSuccess) {
          onSuccess()
        }
        // In real app, would redirect to Stripe
        // console.log('Redirecting to checkout:', response.checkoutUrl)
        // window.location.href = response.checkoutUrl
      }

      return response
    } catch (error) {
      // Handle errors
      if (error instanceof Error) {
        paymentError.value = error.message
      } else {
        paymentError.value = 'Payment processing failed. Please try again.'
      }
      throw error
    } finally {
      isProcessing.value = false
    }
  }

  const clearError = () => {
    paymentError.value = null
  }

  const openModal = () => {
    showModal.value = true
  }

  const closeModal = () => {
    if (!isProcessing.value) {
      showModal.value = false
    }
  }

  const reset = () => {
    isProcessing.value = false
    paymentError.value = null
    showModal.value = false
  }

  return {
    // State
    isProcessing: computed(() => isProcessing.value),
    paymentError: computed(() => paymentError.value),
    showModal: computed(() => showModal.value),

    // Computed flags
    hasError,
    canProcess,

    // Actions
    processPayment: handlePayment,
    clearError,
    openModal,
    closeModal,
    reset,
  }
}
