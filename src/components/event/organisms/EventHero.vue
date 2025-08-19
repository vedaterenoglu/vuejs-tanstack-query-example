<!--
/**
 * @file EventHero.vue
 * @role Event hero organism component - hero section with image/title
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Hero section only), OCP (Extensible via molecules)
 */
-->
<template>
  <section :class="['event-hero', className]">
    <!-- Using EventHeroContent Molecule -->
    <EventHeroContent
      :imageUrl="event.imageUrl || ''"
      :imageAlt="event.alt || event.name"
      :title="event.name"
      :subtitle="event.city"
      :price="event.price"
    />
  </section>
</template>

<script setup lang="ts">
/**
 * EventHero Organism Component
 *
 * Features:
 * - Container for hero section
 * - Composes molecules for content
 * - Follows atomic design hierarchy
 *
 * Design Patterns:
 * - Container Pattern: Container for molecules
 * - Composition Pattern: Composes molecules
 */
import EventHeroContent from '../molecules/EventHeroContent.vue'

import type { EventHeroProps } from '../types'

defineProps<EventHeroProps>()
</script>

<style scoped>
.event-hero {
  width: 100%;
}
</style>
