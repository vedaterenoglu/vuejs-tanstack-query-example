<!--
/**
 * @file AnimationProvider.vue
 * @role Animation provider component for wrapping animated content
 * @atomic molecule
 * @patterns Provider Pattern, Render Pattern
 * @solid SRP (Animation wrapping only), OCP (Extensible via slots)
 */
-->
<template>
  <div
    ref="elementRef"
    :class="[wrapperClass, animationClass]"
    :style="animationStyle"
  >
    <slot :is-visible="isVisible" :is-animating="isAnimating" />
  </div>
</template>

<script setup lang="ts">
/**
 * AnimationProvider - Component for providing animation context
 *
 * Responsibilities:
 * - Wrap content with animation container
 * - Apply animation classes and styles
 * - Provide animation state to children via slots
 * - Handle intersection observer integration
 *
 * Design Patterns:
 * - Provider Pattern: Provides animation context
 * - Render Pattern: Flexible content rendering via slots
 */
import { ref, watch } from 'vue'

import { useAnimation, useIntersectionObserver } from '@/composables'
import type { AnimationType } from '@/composables/useAnimation'

// Props interface
interface AnimationProviderProps {
  animation?: AnimationType
  duration?: number
  delay?: number
  once?: boolean
  threshold?: number
  className?: string
  enableIntersection?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<AnimationProviderProps>(), {
  animation: 'fadeUp',
  duration: 600,
  delay: 0,
  once: true,
  threshold: 0.1,
  className: '',
  enableIntersection: true,
})

// Template ref
const elementRef = ref<HTMLElement>()

// Use composables
const { animationClass, animationStyle, isAnimating, triggerAnimation } =
  useAnimation({
    animation: props.animation,
    duration: props.duration,
    delay: props.delay,
    once: props.once,
  })

const { isVisible } = props.enableIntersection
  ? useIntersectionObserver(elementRef, {
      threshold: props.threshold,
      once: props.once,
    })
  : { isVisible: ref(true) }

// Trigger animation when visible
watch(isVisible, visible => {
  if (visible && props.enableIntersection) {
    triggerAnimation()
  }
})

// Trigger immediately if intersection is disabled
if (!props.enableIntersection) {
  triggerAnimation()
}

// Computed wrapper class
const wrapperClass = props.className
</script>
