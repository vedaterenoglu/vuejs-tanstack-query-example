<!--
/**
 * @file EventImage.vue
 * @role Event image atom component
 * @atomic atom
 * @patterns Image Loading Pattern, Error Handling Pattern
 * @solid SRP (Image display only)
 */
-->
<template>
  <div class="event-image-container w-full h-full relative">
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      :class="['w-full h-full object-cover object-center', className]"
      loading="lazy"
      @error="handleError"
      @load="handleLoad"
    />

    <!-- Fallback when image fails -->
    <div v-else class="w-full h-full bg-muted flex items-center justify-center">
      <svg
        class="h-12 w-12 text-muted-foreground"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * EventImage Atom Component
 *
 * Features:
 * - Lazy loading
 * - Error fallback
 * - Full container coverage
 *
 * Design Patterns:
 * - Error Handling Pattern: Graceful fallback
 * - Performance Pattern: Lazy loading
 */
import { ref } from 'vue'

import { type EventImageProps } from '../types'

const props = withDefaults(defineProps<EventImageProps>(), {
  alt: '',
  className: '',
})

const emit = defineEmits<{
  error: []
  load: []
}>()

// State
const hasError = ref(false)

// Handlers
const handleError = () => {
  hasError.value = true
  if (props.onError) {
    props.onError()
  }
  emit('error')
}

const handleLoad = () => {
  hasError.value = false
  if (props.onLoad) {
    props.onLoad()
  }
  emit('load')
}
</script>
