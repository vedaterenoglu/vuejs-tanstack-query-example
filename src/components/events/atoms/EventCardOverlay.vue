<!--
/**
 * @file EventCardOverlay.vue
 * @role Hover overlay atom for event card
 * @atomic atom
 * @patterns Presentation Pattern
 * @solid SRP (Overlay display only)
 */
-->
<template>
  <div
    :class="[
      'absolute inset-0 bg-black/10 transition-opacity duration-300',
      isVisible ? 'opacity-100' : 'opacity-0',
      'pointer-events-none',
    ]"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
/**
 * EventCardOverlay - Hover overlay effect for event card
 *
 * Responsibilities:
 * - Display hover overlay
 * - Handle opacity transitions
 * - Visual feedback on hover
 *
 * SOLID Principles:
 * - SRP: Only handles overlay display
 * - OCP: Extensible via props
 */

interface EventCardOverlayProps {
  isVisible: boolean
}

defineProps<EventCardOverlayProps>()
</script>