<!--
/**
 * @file EventSubtitle.vue
 * @role Event subtitle atom - displays location or subtitle text
 * @atomic atom
 * @patterns Atom Pattern
 * @solid SRP (Subtitle display only)
 */
-->
<template>
  <p
    :class="['event-subtitle-atom', 'text-lg text-muted-foreground', className]"
  >
    {{ subtitle }}
  </p>
</template>

<script setup lang="ts">
/**
 * EventSubtitle Atom Component
 *
 * Features:
 * - Displays subtitle text (usually location)
 * - Atom-level component (smallest unit)
 * - No business logic
 *
 * Design Patterns:
 * - Atom Pattern: Basic UI element
 * - SOLID: Single Responsibility
 */
interface EventSubtitleProps {
  subtitle: string
  className?: string
}

defineProps<EventSubtitleProps>()
</script>

<style scoped>
.event-subtitle-atom {
  /* Atom-specific styles */
}
</style>
