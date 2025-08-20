<!--
/**
 * @file CardTitle.vue
 * @role Title element for Card header
 * @atomic atom
 * @patterns Compound Component Pattern
 * @solid SRP (Card title display only)
 */
-->
<template>
  <div
    data-slot="card-title"
    :class="cn('leading-none font-semibold', $attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CardTitle - Title element for Card component
 *
 * Displays the main title within a Card header.
 * Styled with appropriate typography for emphasis.
 *
 * Design Patterns:
 * - Compound Component: Part of Card component family
 * - Typography Pattern: Consistent title styling
 */
import { cn } from '@/lib/utils'
</script>
