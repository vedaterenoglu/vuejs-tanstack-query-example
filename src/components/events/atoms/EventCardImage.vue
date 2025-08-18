<!--
/**
 * @file EventCardImage.vue
 * @role Event card image with fallback
 * @atomic atom
 * @patterns Image Pattern, Fallback Pattern
 * @solid SRP (Image display only)
 */
-->
<template>
  <div class="relative aspect-[3/2] overflow-hidden">
    <img
      v-if="!error"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover transition-transform duration-300"
      :class="imageClasses"
      loading="lazy"
      @error="handleError"
      @load="handleLoad"
    />
    <div v-else class="w-full h-full bg-muted flex items-center justify-center">
      <Calendar class="h-12 w-12 text-muted-foreground" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar } from 'lucide-vue-next'
import { ref } from 'vue'

interface EventCardImageProps {
  src: string
  alt?: string
  imageClasses?: string
}

defineProps<EventCardImageProps>()

const emit = defineEmits<{
  error: []
  load: []
}>()

const error = ref(false)

const handleError = () => {
  error.value = true
  emit('error')
}

const handleLoad = () => {
  error.value = false
  emit('load')
}
</script>