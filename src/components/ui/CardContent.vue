<!--
/**
 * @file CardContent.vue
 * @role Main content area for Card component
 * @atomic atom
 * @patterns Compound Component Pattern
 * @solid SRP (Card content container only)
 */
-->
<template>
  <div data-slot="card-content" :class="cn('px-6', $attrs.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * CardContent - Content section for Card component
 *
 * Provides the main content area within a Card.
 * Applies consistent padding for content alignment.
 *
 * Design Patterns:
 * - Compound Component: Part of Card component family
 * - Container Pattern: Consistent content spacing
 */
import { cn } from '@/lib/utils'
</script>
