<!--
/**
 * @file EventsPage.vue
 * @role Events page view component
 * @atomic template
 * @patterns Template Pattern
 * @solid SRP (Page layout only), DIP (Depends on container abstraction)
 * @ssot EventsContainer for business logic
 */
-->
<template>
  <Layout>
    <EventsContainer />
  </Layout>
</template>

<script setup lang="ts">
/**
 * EventsPage - Events listing page template
 *
 * Responsibilities:
 * - Page layout structure
 * - Delegates all business logic to EventsContainer
 *
 * SOLID Principles:
 * - SRP: Single responsibility of page layout
 * - DIP: Depends on abstraction (EventsContainer)
 */
import { EventsContainer } from '@/components/events/containers'
import Layout from '@/components/layout/Layout.vue'
</script>
