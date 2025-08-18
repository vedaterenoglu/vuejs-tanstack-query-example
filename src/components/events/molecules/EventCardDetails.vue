<!--
/**
 * @file EventCardDetails.vue
 * @role Event details overlay display
 * @atomic molecule
 * @patterns Overlay Pattern, Composition Pattern
 * @solid SRP (Event details display), OCP (Extensible via slots)
 */
-->
<template>
  <div class="absolute bottom-2 left-4 right-4 z-10 bg-black/60 rounded px-2 py-1">
    <h3 
      class="font-semibold text-white truncate text-base"
      style="text-shadow: 1px 1px 3px rgba(0,0,0,0.9);"
    >
      {{ name }}
    </h3>
    
    <div class="flex items-center gap-3 text-white/90 text-xs mt-1">
      <div class="flex items-center gap-1">
        <Calendar class="h-3 w-3" />
        <time :datetime="date">{{ formattedDate }}</time>
      </div>
      <div class="flex items-center gap-1">
        <Clock class="h-3 w-3" />
        <span>{{ formattedTime }}</span>
      </div>
    </div>
    
    <div class="flex items-center gap-1 text-white/80 text-xs mt-1">
      <MapPin class="h-3 w-3" />
      <span 
        class="line-clamp-1"
        style="text-shadow: 1px 1px 2px rgba(0,0,0,0.8);"
      >
        {{ location }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Clock, MapPin } from 'lucide-vue-next'
import { computed } from 'vue'

interface EventCardDetailsProps {
  name: string
  date: string
  location: string
}

const props = defineProps<EventCardDetailsProps>()

const formattedDate = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
})

const formattedTime = computed(() => {
  const date = new Date(props.date)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
})
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>