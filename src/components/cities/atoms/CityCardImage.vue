<!--
/**
 * @file CityCardImage.vue
 * @role City card image display with error fallback
 * @atomic atom
 * @patterns Image Loading Pattern, Error Handling Pattern
 * @solid SRP (Image display only)
 */
-->
<template>
  <div class="city-card-image w-full h-full relative">
    <!-- Main Image -->
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover object-center transition-transform duration-300"
      :class="imageClasses"
      @error="handleError"
      @load="handleLoad"
      loading="lazy"
    />

    <!-- Fallback when image fails -->
    <div
      v-else
      class="w-full h-full bg-muted flex items-center justify-center"
      role="img"
      :aria-label="`${alt} - Image unavailable`"
    >
      <MapPin class="h-8 w-8 text-muted-foreground" />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CityCardImage - Atom component for city image display
 *
 * Responsibilities:
 * - Display city image with lazy loading
 * - Handle image loading errors
 * - Show fallback icon on error
 * - Apply hover transformations
 *
 * Design Patterns:
 * - Error Handling Pattern: Graceful fallback
 * - Loading Pattern: Lazy loading support
 */
import { MapPin } from 'lucide-vue-next'
import { ref } from 'vue'

// Props interface
interface CityCardImageProps {
  src: string
  alt: string
  imageClasses?: string
}

// Define props
withDefaults(defineProps<CityCardImageProps>(), {
  imageClasses: '',
})

// Define emits
const emit = defineEmits<{
  error: []
  load: []
}>()

// Local state
const hasError = ref(false)

// Event handlers
const handleError = () => {
  hasError.value = true
  emit('error')
}

const handleLoad = () => {
  hasError.value = false
  emit('load')
}
</script>
