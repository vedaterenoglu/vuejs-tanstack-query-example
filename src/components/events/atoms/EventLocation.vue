<!--
/**
 * @file EventLocation.vue
 * @role Event location display atom
 * @atomic atom
 * @patterns Presentational Component Pattern
 * @solid SRP (Location display only)
 */
-->
<template>
  <div class="flex items-center gap-1">
    <MapPin :class="iconClass" />
    <span :class="textClass" :title="location">
      {{ location }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'

interface EventLocationProps {
  location: string
  iconClass?: string
  textClass?: string
}

withDefaults(defineProps<EventLocationProps>(), {
  iconClass: 'h-3 w-3',
  textClass: ''
})
</script>