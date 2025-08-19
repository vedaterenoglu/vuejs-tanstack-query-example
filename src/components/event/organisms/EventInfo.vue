<!--
/**
 * @file EventInfo.vue
 * @role Event info organism component - sidebar with event metadata
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Event info sidebar only), OCP (Extensible via molecules)
 */
-->
<template>
  <aside :class="['event-info', className]">
    <!-- Using EventSidebar Organism -->
    <EventSidebar :event="event" @purchase="handlePurchase" />
  </aside>
</template>

<script setup lang="ts">
/**
 * EventInfo Organism Component
 *
 * Features:
 * - Container for event info sidebar
 * - Composes molecules for content
 * - Includes ticket purchase functionality
 * - Follows atomic design hierarchy
 *
 * Design Patterns:
 * - Container Pattern: Container for molecules
 * - Composition Pattern: Composes molecules
 */
import EventSidebar from './EventSidebar.vue'

import type { EventInfoProps } from '../types'

defineProps<EventInfoProps>()
const emit = defineEmits<{
  purchase: [quantity: number]
}>()

const handlePurchase = (quantity: number) => {
  emit('purchase', quantity)
}
</script>

<style scoped>
.event-info {
  width: 100%;
}
</style>
