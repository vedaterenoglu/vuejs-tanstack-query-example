<!--
/**
 * @file CardHeader.vue
 * @role Header section for Card component
 * @atomic atom
 * @patterns Compound Component Pattern
 * @solid SRP (Card header layout only)
 */
-->
<template>
  <div
    data-slot="card-header"
    :class="
      cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        $attrs.class as string | undefined
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CardHeader - Header section for Card component
 *
 * Provides a structured header area with support for
 * title, description, and action slots.
 *
 * Design Patterns:
 * - Compound Component: Part of Card component family
 * - Grid Layout: Auto-adjusts for action slot presence
 */
import { cn } from '@/lib/utils'
</script>
