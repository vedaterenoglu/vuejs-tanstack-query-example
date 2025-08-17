<!--
/**
 * @file CardAction.vue
 * @role Action area for Card header
 * @atomic atom
 * @patterns Compound Component Pattern
 * @solid SRP (Card action placement only)
 */
-->
<template>
  <div
    data-slot="card-action"
    :class="
      cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        $attrs.class
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CardAction - Action slot for Card header
 *
 * Provides a designated area for action buttons or controls
 * within the Card header. Positioned to the right of title/description.
 *
 * Design Patterns:
 * - Compound Component: Part of Card component family
 * - Grid Positioning: Auto-positions in header grid
 */
import { cn } from '@/lib/utils'
</script>
