<!--
/**
 * @file EventGridSkeleton.vue
 * @role Event grid skeleton loading state
 * @atomic molecule
 * @patterns Skeleton Pattern, Loading Pattern
 * @solid SRP (Loading skeleton display only)
 */
-->
<template>
  <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <div 
      v-for="i in skeletonCount" 
      :key="`skeleton-${i}`"
      class="bg-card rounded-lg shadow-sm overflow-hidden animate-pulse"
    >
      <div class="aspect-[16/9] bg-muted"></div>
      <div class="p-4 space-y-3">
        <div class="h-5 bg-muted rounded w-3/4"></div>
        <div class="space-y-2">
          <div class="h-4 bg-muted rounded w-full"></div>
          <div class="h-4 bg-muted rounded w-2/3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface EventGridSkeletonProps {
  skeletonCount?: number
}

withDefaults(defineProps<EventGridSkeletonProps>(), {
  skeletonCount: 6
})
</script>