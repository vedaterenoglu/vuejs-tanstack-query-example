<!--
/**
 * @file ClerkProvider.vue
 * @role Clerk authentication provider wrapper for Vue application
 * @atomic organism
 * @patterns Provider Pattern, Adapter Pattern, Configuration Pattern
 * @solid SRP (Single auth responsibility), DIP (Depends on Clerk abstraction)
 * @ssot Clerk for authentication state
 */
-->
<template>
  <slot />
</template>

<script setup lang="ts">
/**
 * ClerkProvider - Clerk authentication provider wrapper
 *
 * Provides Clerk authentication context to the entire application.
 * Note: In Vue, the actual Clerk plugin setup happens in main.ts
 * This component serves as a placeholder for consistency with React architecture
 * and future authentication-related enhancements.
 *
 * Design Patterns Applied:
 * - Provider Pattern: Provides auth context to component tree
 * - Adapter Pattern: Adapts Clerk API to Vue application needs
 * - Configuration Pattern: Uses environment variables for configuration
 */

// This component acts as a wrapper for future auth-related features
// The actual Clerk setup is done in main.ts with the Clerk plugin
// Environment variables are validated in env.ts configuration
</script>
