<!--
/**
 * @file PaymentCancelPage.vue
 * @role Payment cancel page view
 * @patterns View Pattern
 * @solid SRP (Cancel display only)
 */
-->
<template>
  <Layout>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-md mx-auto text-center">
        <!-- Cancel Icon -->
        <div class="mb-6">
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30"
          >
            <XCircle class="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
          </div>
        </div>

        <!-- Cancel Message -->
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Cancelled
        </h1>

        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Your payment was cancelled. No charges were made to your account.
        </p>

        <!-- Reason Section -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 text-left">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            What happened?
          </h2>
          
          <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>You cancelled the payment process</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>No payment was processed</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-gray-400">•</span>
              <span>Your tickets were not reserved</span>
            </li>
          </ul>
        </div>

        <!-- Help Section -->
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <div class="flex items-start gap-2">
            <Info class="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div class="text-left">
              <p class="text-sm text-blue-800 dark:text-blue-200">
                <strong>Need help?</strong> If you experienced any issues during checkout, 
                please try again or contact our support team.
              </p>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <router-link
            v-if="eventSlug"
            :to="`/events/${eventSlug}`"
            class="block w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
          >
            Try Again
          </router-link>

          <router-link
            to="/events"
            class="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium transition-colors"
          >
            Browse Events
          </router-link>

          <router-link
            to="/"
            class="block w-full px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
          >
            Return to Home
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * PaymentCancelPage View
 *
 * Features:
 * - Displays payment cancellation message
 * - Explains what happened
 * - Provides help information
 * - Navigation options to retry or browse
 *
 * Design Patterns:
 * - View Pattern: Page-level component
 * - SOLID: Single Responsibility (cancel display only)
 */
import { XCircle, Info } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '@/components/layout/Layout.vue'

// Get event slug from query params
const route = useRoute()
const eventSlug = computed(() => route.query.event as string | undefined)
</script>