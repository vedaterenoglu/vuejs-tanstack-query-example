<!--
/**
 * @file PaymentSuccessPage.vue
 * @role Payment success page view
 * @patterns View Pattern
 * @solid SRP (Success display only)
 */
-->
<template>
  <Layout>
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-md mx-auto text-center">
        <!-- Success Icon -->
        <div class="mb-6">
          <div
            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30"
          >
            <CheckCircle class="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <!-- Success Message -->
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Payment Successful!
        </h1>

        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your tickets have been confirmed.
        </p>

        <!-- Order Details -->
        <div
          v-if="eventSlug"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 text-left"
        >
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Order Details
          </h2>
          
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Event ID:</span>
              <span class="text-gray-900 dark:text-white font-mono">
                {{ eventSlug }}
              </span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-400">Status:</span>
              <span class="text-green-600 dark:text-green-400 font-medium">
                Confirmed
              </span>
            </div>
          </div>
        </div>

        <!-- Test Mode Notice -->
        <div
          class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8"
        >
          <div class="flex items-start gap-2">
            <AlertCircle class="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
            <div class="text-left">
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Test Mode:</strong> This was a test payment. No real charges were made.
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
            View Event Details
          </router-link>

          <router-link
            to="/events"
            class="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md font-medium transition-colors"
          >
            Browse More Events
          </router-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * PaymentSuccessPage View
 *
 * Features:
 * - Displays payment success confirmation
 * - Shows order details from query params
 * - Test mode notice
 * - Navigation options
 *
 * Design Patterns:
 * - View Pattern: Page-level component
 * - SOLID: Single Responsibility (success display only)
 */
import { CheckCircle, AlertCircle } from 'lucide-vue-next'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import Layout from '@/components/layout/Layout.vue'

// Get event slug from query params
const route = useRoute()
const eventSlug = computed(() => route.query.event as string | undefined)
</script>
