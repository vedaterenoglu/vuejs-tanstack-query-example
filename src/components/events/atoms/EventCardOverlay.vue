<!--
/**
 * @file EventCardOverlay.vue
 * @role Hover overlay for event card
 * @atomic atom
 * @patterns Overlay Pattern
 * @solid SRP (Overlay display only)
 */
-->
<template>
  <div
    :class="[
      'absolute inset-0 bg-black/20 transition-opacity duration-300 z-10 pointer-events-none',
      isVisible ? 'opacity-100' : 'opacity-0',
      className
    ]"
  />
</template>

<script setup lang="ts">
interface EventCardOverlayProps {
  isVisible?: boolean
  className?: string
}

withDefaults(defineProps<EventCardOverlayProps>(), {
  isVisible: false,
  className: ''
})
</script>