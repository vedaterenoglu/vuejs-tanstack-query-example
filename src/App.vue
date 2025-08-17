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
        <!-- Router view will be added here in routing iteration -->
        <h1>Vue.js TanStack Query Events App</h1>
        <p>Application is ready for development</p>
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

import { onMounted } from 'vue'

import ClerkProvider from '@/components/providers/ClerkProvider.vue'
import QueryProvider from '@/components/providers/QueryProvider.vue'
import { useTheme } from '@/composables/useTheme'

// Initialize theme on app mount
useTheme()

onMounted(() => {
  // Theme is automatically initialized by the composable
  // This ensures the correct theme class is applied to the document
})
</script>

<style>
/* Import global styles */
@import '@/styles/globals.css';
@import '@/styles/animations.css';
@import '@/styles/responsive.css';

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>