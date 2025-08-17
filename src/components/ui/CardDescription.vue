<!--
/**
 * @file CardDescription.vue
 * @role Description text for Card header
 * @atomic atom
 * @patterns Compound Component Pattern
 * @solid SRP (Card description display only)
 */
-->
<template>
  <div
    data-slot="card-description"
    :class="cn('text-muted-foreground text-sm', $attrs.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CardDescription - Description element for Card component
 *
 * Displays supporting text within a Card header.
 * Styled with muted colors for secondary information.
 *
 * Design Patterns:
 * - Compound Component: Part of Card component family
 * - Typography Pattern: Consistent description styling
 */
import { cn } from '@/lib/utils'
</script>
