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
  <Layout>
    <div class="home-page">
      <!-- Empty body - will be filled according to TODO list -->
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * HomePage - Landing page with city selection
 * Template-level component that will compose city grid organism
 */

import Layout from '@/components/layout/Layout.vue'

// Component logic will be added in later iterations
</script>

<style scoped>
.home-page {
  min-height: calc(100vh - 64px - 64px); /* Minus navbar and footer heights */
}
</style>
