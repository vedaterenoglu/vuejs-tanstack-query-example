<!--
/**
 * @file EventCardHeader.vue
 * @role Event card header molecule - container for image and badge atoms
 * @atomic molecule
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Header section only), OCP (Extensible via atoms)
 */
-->
<template>
  <div
    :class="[
      'event-card-header relative w-full h-full overflow-hidden',
      className,
    ]"
  >
    <!-- Event Image -->
    <EventImage
      :src="imageUrl"
      :alt="alt || ''"
      :class="[
        'w-full h-full transition-transform duration-300',
        isHovered ? 'scale-105' : '',
      ]"
    />

    <!-- Price -->
    <EventPrice
      :price="price"
      class="absolute top-3 right-3 z-10"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * EventCardHeader Molecule Component
 *
 * Features:
 * - Container for image and badge atoms
 * - Maintains aspect ratio
 * - Composes EventImage and EventBadge
 * - Passes hover state for image scaling
 *
 * Design Patterns:
 * - Container Pattern: Contains atoms
 * - Composition Pattern: Composes atoms
 */
interface EventCardHeaderProps {
  imageUrl: string
  alt?: string
  price: number
  isHovered?: boolean
  className?: string
}

import { EventImage, EventPrice } from '../atoms'

withDefaults(defineProps<EventCardHeaderProps>(), {
  isHovered: false,
  className: '',
})
</script>

<style scoped>
.event-card-header {
  min-height: 150px;
}
</style>
