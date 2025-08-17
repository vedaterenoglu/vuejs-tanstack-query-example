<!--
/**
 * @file App.vue
 * @role Root application component with provider setup
 * @atomic template
 * @patterns Provider Pattern, Composition Pattern, Template Pattern
 * @solid SRP (Application root only), OCP (Extensible through slots)
 * @ssot Providers manage their respective state domains
 */
-->
<template>
  <QueryProvider>
    <ClerkProvider>
      <div id="app">
        <RouterView />
      </div>
    </ClerkProvider>
  </QueryProvider>
</template>

<script setup lang="ts">
/**
 * App - Root application component
 * 
 * Sets up the application with all necessary providers following
 * the provider pattern. Each provider manages its own domain of
 * responsibility (Query for server state, Clerk for auth, Theme for UI).
 * 
 * Design Patterns Applied:
 * - Provider Pattern: Wraps app with necessary providers
 * - Composition Pattern: Composes providers hierarchically
 * - Template Pattern: Defines application structure
 */

import { RouterView } from 'vue-router'

import ClerkProvider from '@/components/providers/ClerkProvider.vue'
import QueryProvider from '@/components/providers/QueryProvider.vue'
import { useTheme } from '@/composables/useTheme'

// Initialize theme singleton
// The composable handles everything internally:
// - Checks localStorage
// - Falls back to system preference
// - Sets up cross-tab sync
// - Manages DOM updates
useTheme()
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>