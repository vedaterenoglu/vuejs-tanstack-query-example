<!--
/**
 * @file EventsListPage.vue
 * @role Events listing page view component
 * @atomic template
 * @patterns Container Pattern, Template Pattern
 * @solid SRP (Events list display only)
 * @ssot Router for navigation state, TanStack Query for server state
 */
-->
<template>
  <Layout>
    <div class="events-list-page">
      <!-- Empty body - will be filled according to TODO list -->
    </div>
  </Layout>
</template>

<script setup lang="ts">
/**
 * EventsListPage - Events listing with filtering and search
 * Template-level component that will compose events grid organism
 */

import Layout from '@/components/layout/Layout.vue'

// Component logic will be added in later iterations
</script>

<style scoped>
.events-list-page {
  min-height: calc(100vh - 64px - 64px); /* Minus navbar and footer heights */
}
</style>
