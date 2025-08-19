<!--
/**
 * @file EventDetails.vue
 * @role Event details organism component - detailed event information section
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Event details only), OCP (Extensible via molecules)
 */
-->
<template>
  <section :class="['event-details', className]">
    <!-- Using EventDescription Molecule -->
    <EventDescription :description="description" />
  </section>
</template>

<script setup lang="ts">
/**
 * EventDetails Organism Component
 *
 * Features:
 * - Container for event details section
 * - Composes molecules for content
 * - Follows atomic design hierarchy
 *
 * Design Patterns:
 * - Container Pattern: Container for molecules
 * - Composition Pattern: Composes molecules
 */
import EventDescription from '../molecules/EventDescription.vue'

import type { EventDetailsProps } from '../types'

defineProps<EventDetailsProps>()
</script>

<style scoped>
.event-details {
  width: 100%;
}
</style>
