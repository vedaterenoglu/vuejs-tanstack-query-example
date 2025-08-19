<!--
/**
 * @file EventHeroContent.vue
 * @role Event hero content molecule - composes hero atoms
 * @atomic molecule
 * @patterns Molecule Pattern, Composition Pattern
 * @solid SRP (Hero content composition only)
 */
-->
<template>
  <div :class="['event-hero-content-molecule', 'relative', className]">
    <!-- Hero Image -->
    <EventImage :imageUrl="imageUrl" :alt="imageAlt" class="mb-6 h-80" />

    <!-- Price Badge - positioned absolute top-right -->
    <div class="absolute top-4 right-4">
      <EventPrice :price="price" />
    </div>

    <!-- Hero Title below image -->
    <EventTitle :title="title" class="mt-4" />

    <!-- Subtitle (location) -->
    <EventSubtitle v-if="subtitle" :subtitle="subtitle" class="mt-1" />
  </div>
</template>

<script setup lang="ts">
/**
 * EventHeroContent Molecule Component
 *
 * Features:
 * - Composes multiple atoms for hero section
 * - Molecule-level component (composed unit)
 * - Minimal logic for composition
 *
 * Design Patterns:
 * - Molecule Pattern: Composed UI element
 * - Composition Pattern: Combines atoms
 * - SOLID: Single Responsibility
 */
import EventImage from '../atoms/EventImage.vue'
import EventPrice from '../atoms/EventPrice.vue'
import EventSubtitle from '../atoms/EventSubtitle.vue'
import EventTitle from '../atoms/EventTitle.vue'

import type { EventHeroContentProps } from '../types'

defineProps<EventHeroContentProps>()
</script>

<style scoped>
.event-hero-content-molecule {
  /* Molecule-specific styles */
}
</style>
