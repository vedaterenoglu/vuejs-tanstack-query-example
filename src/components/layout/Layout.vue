<!--
/**
 * @file Layout.vue
 * @role Main application layout structure
 * @atomic template
 * @patterns Layout Pattern, Slot Pattern
 * @solid SRP (Layout structure only)
 */
-->
<template>
  <div class="min-h-screen bg-background font-sans antialiased flex flex-col">
    <Navbar :title="appName" />
    <main class="flex-1">
      <slot />
    </main>
    <Footer author="Vedat Erenoglu" />
  </div>
</template>

<script setup lang="ts">
/**
 * Layout - Main application layout wrapper
 *
 * Provides consistent page layout with Navbar, content area,
 * and Footer. Implements responsive flex layout with
 * environment-based configuration.
 *
 * Design Patterns:
 * - Layout Pattern: Consistent page structure
 * - Slot Pattern: Vue slot for content injection
 * - Configuration Pattern: Environment-based app name
 */
import { computed } from 'vue'

import Footer from './Footer.vue'
import Navbar from './Navbar.vue'

// Compute app name from environment or default
const appName = computed(() => import.meta.env.VITE_APP_NAME || 'Online Ticket')
</script>