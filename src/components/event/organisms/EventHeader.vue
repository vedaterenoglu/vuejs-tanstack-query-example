<!--
/**
 * @file EventHeader.vue
 * @role Event header organism - displays event title and location
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Event header only), OCP (Extensible via molecules)
 */
-->
<template>
  <header
    :class="[
      'event-header-organism',
      'border-b border-border pb-6 mb-6',
      className,
    ]"
  >
    <div class="max-w-4xl">
      <h1 class="text-4xl font-bold text-foreground mb-2">{{ name }}</h1>
      <p
        v-if="location"
        class="text-lg text-muted-foreground flex items-center gap-2"
      >
        <span>📍</span>
        {{ location }}
      </p>
    </div>
  </header>
</template>

<script setup lang="ts">
/**
 * EventHeader Organism Component
 *
 * Features:
 * - Container for event header section
 * - Will compose molecules for title and location
 * - Shell for progressive development
 *
 * Design Patterns:
 * - Container Pattern: Container for molecules
 * - Composition Pattern: Will compose molecules
 */
interface EventHeaderProps {
  name: string
  location?: string
  className?: string
}

defineProps<EventHeaderProps>()
</script>

<style scoped>
.event-header-organism {
  /* Organism-specific styles */
}
</style>
