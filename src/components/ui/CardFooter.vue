<!--
/**
 * @file CardFooter.vue
 * @role Footer section for Card component
 * @atomic atom
 * @patterns Compound Component Pattern
 * @solid SRP (Card footer layout only)
 */
-->
<template>
  <div
    data-slot="card-footer"
    :class="cn('flex items-center px-6 [.border-t]:pt-6', $attrs.class)"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CardFooter - Footer section for Card component
 *
 * Provides a footer area for actions or additional information.
 * Uses flexbox for horizontal alignment of footer content.
 *
 * Design Patterns:
 * - Compound Component: Part of Card component family
 * - Flexbox Layout: Horizontal content alignment
 */
import { cn } from '@/lib/utils'
</script>
