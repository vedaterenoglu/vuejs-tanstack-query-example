<!--
/**
 * @file CityPresentation.vue
 * @role Presentation component for city display - pure UI rendering
 * @atomic template
 * @patterns Presenter Pattern, Dumb Component Pattern
 * @solid SRP (UI rendering only), OCP (Open for extension via slots)
 */
-->
<template>
  <div 
    class="city-presentation container mx-auto p-4"
    :class="className"
  >
    <!-- Header Section -->
    <header class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ title }}
      </h1>
      <p 
        v-if="description" 
        class="text-gray-600 dark:text-gray-400"
      >
        {{ description }}
      </p>
    </header>

    <!-- Status Bar -->
    <div 
      v-if="showStatusBar"
      class="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {{ statusText }}
        </span>
        <button
          v-if="showRefreshButton"
          @click="$emit('refresh')"
          class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
          :disabled="isLoading"
        >
          {{ refreshButtonText }}
        </button>
      </div>
    </div>

    <!-- Content Slot -->
    <main class="city-content">
      <slot name="content" />
    </main>

    <!-- Loading State -->
    <div 
      v-if="isLoading && showLoadingState"
      class="flex justify-center items-center py-12"
    >
      <slot name="loading">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p class="mt-4 text-gray-600 dark:text-gray-400">{{ loadingText }}</p>
        </div>
      </slot>
    </div>

    <!-- Empty State -->
    <div 
      v-if="isEmpty && !isLoading && showEmptyState"
      class="text-center py-12"
    >
      <slot name="empty">
        <p class="text-gray-500 dark:text-gray-400">{{ emptyText }}</p>
      </slot>
    </div>

    <!-- Error State -->
    <div 
      v-if="hasError && showErrorState"
      class="text-center py-12"
    >
      <slot name="error">
        <p class="text-red-600 dark:text-red-400">{{ errorText }}</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CityPresentation Component
 * 
 * Pure presentation component for city UI.
 * No business logic, only UI rendering.
 * 
 * Responsibilities:
 * - Render UI structure
 * - Display states (loading, empty, error)
 * - Emit UI events
 * - Provide slots for customization
 */

interface CityPresentationProps {
  title?: string
  description?: string
  statusText?: string
  loadingText?: string
  emptyText?: string
  errorText?: string
  refreshButtonText?: string
  isLoading?: boolean
  isEmpty?: boolean
  hasError?: boolean
  showStatusBar?: boolean
  showRefreshButton?: boolean
  showLoadingState?: boolean
  showEmptyState?: boolean
  showErrorState?: boolean
  className?: string
}

withDefaults(defineProps<CityPresentationProps>(), {
  title: 'Cities',
  description: '',
  statusText: '',
  loadingText: 'Loading cities...',
  emptyText: 'No cities found',
  errorText: 'An error occurred',
  refreshButtonText: 'Refresh',
  isLoading: false,
  isEmpty: false,
  hasError: false,
  showStatusBar: true,
  showRefreshButton: true,
  showLoadingState: true,
  showEmptyState: true,
  showErrorState: true,
  className: '',
})

defineEmits<{
  refresh: []
}>()
</script>