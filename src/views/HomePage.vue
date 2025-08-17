<!--
/**
 * @file HomePage.vue
 * @role Home page view component
 * @atomic template
 * @patterns Container Pattern, Template Pattern
 * @solid SRP (Home page display only)
 * @ssot Router for navigation state
 */
-->
<template>
  <div class="home-page">
    <h1>Welcome to Events App</h1>
    <p>Select a city to browse events</p>
    <!-- City selection grid will be added here -->

    <div style="margin-top: 2rem">
      <button type="button" @click="toggleTheme">
        Toggle Theme (Current: {{ theme }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * HomePage - Landing page with city selection
 * Template-level component that will compose city grid organism
 */

import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

// Component logic will be added in later iterations
</script>

<style scoped>
.home-page {
  padding: 2rem;
  text-align: center;
}
</style>
