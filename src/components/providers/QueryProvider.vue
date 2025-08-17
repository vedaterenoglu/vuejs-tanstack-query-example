<!--
/**
 * @file QueryProvider.vue
 * @role TanStack Query provider with dev tools for Vue application
 * @atomic organism
 * @patterns Provider Pattern, Configuration Pattern, Development Tools Pattern
 * @solid SRP (Single query management responsibility), DIP (Depends on query client abstraction)
 * @ssot TanStack Query for server state
 */
-->
<template>
  <slot />
</template>

<script setup lang="ts">
/**
 * QueryProvider - TanStack Query provider wrapper
 *
 * Provides TanStack Query client configuration to the entire application.
 * Note: In Vue, the actual VueQuery plugin setup happens in main.ts
 * This component serves as a placeholder for consistency with React architecture
 *
 * Design Patterns Applied:
 * - Provider Pattern: Provides query client context to component tree
 * - Configuration Pattern: Uses centralized query client configuration
 */

// This component acts as a wrapper for future enhancements
// The actual TanStack Query setup is done in main.ts with app.use(VueQueryPlugin)
</script>
