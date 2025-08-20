<!--
/**
 * @file EventLoadingState.vue
 * @role Loading state display for events
 * @atomic molecule
 * @patterns Skeleton Pattern, Loading Pattern
 * @solid SRP (Loading display only), OCP (Configurable via props)
 */
-->
<template>
  <div class="event-loading-state">
    <div v-if="variant === 'spinner'" class="flex justify-center items-center py-12">
      <div class="relative">
        <div class="w-12 h-12 rounded-full border-4 border-muted animate-spin border-t-primary" />
        <span class="sr-only">Loading events...</span>
      </div>
      <p v-if="showMessage" class="ml-4 text-muted-foreground">
        {{ message }}
      </p>
    </div>
    
    <div v-else-if="variant === 'skeleton'" class="space-y-4">
      <div v-for="i in skeletonCount" :key="`skeleton-${i}`" class="animate-pulse">
        <div class="bg-muted rounded-lg p-4">
          <div class="h-40 bg-muted-foreground/10 rounded mb-4" />
          <div class="space-y-2">
            <div class="h-4 bg-muted-foreground/10 rounded w-3/4" />
            <div class="h-3 bg-muted-foreground/10 rounded w-1/2" />
            <div class="h-3 bg-muted-foreground/10 rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="flex flex-col items-center justify-center py-12">
      <div class="flex space-x-2 mb-4">
        <div 
          v-for="i in 3" 
          :key="`dot-${i}`"
          class="w-3 h-3 bg-primary rounded-full animate-bounce"
          :style="{ animationDelay: `${i * 0.1}s` }"
        />
      </div>
      <p v-if="showMessage" class="text-muted-foreground">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventLoadingState - Displays loading state for event operations
 * 
 * Responsibilities:
 * - Display loading indicators (spinner, skeleton, dots)
 * - Provide configurable loading variants
 * - Maintain consistent loading UI
 * 
 * SOLID Principles:
 * - SRP: Only handles loading state display
 * - OCP: Open for extension via variants
 * - ISP: Simple interface with optional configurations
 */

// Props
interface EventLoadingStateProps {
  variant?: 'spinner' | 'skeleton' | 'dots'
  message?: string
  showMessage?: boolean
  skeletonCount?: number
}

withDefaults(defineProps<EventLoadingStateProps>(), {
  variant: 'spinner',
  message: 'Loading events...',
  showMessage: true,
  skeletonCount: 3,
})
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>