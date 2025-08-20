<!--
/**
 * @file Card.vue
 * @role Container component for card layout
 * @atomic molecule
 * @patterns Compound Component Pattern
 * @solid SRP (Card container only)
 */
-->
<template>
  <div
    data-slot="card"
    :class="
      cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        $attrs.class as string | undefined
      )
    "
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * Card - Container component for structured content
 *
 * Provides a styled container for card-based layouts.
 * Works with CardHeader, CardContent, and CardFooter components.
 *
 * Design Patterns:
 * - Compound Component: Works with related Card sub-components
 * - Slot Pattern: Uses Vue slots for content composition
 */
import { cn } from '@/lib/utils'
</script>
