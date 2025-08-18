<!--
/**
 * @file ScrollAnimateWrapper.vue
 * @role Scroll-triggered animation wrapper (refactored)
 * @atomic organism
 * @patterns Delegation Pattern, Composition Pattern
 * @solid SRP (Animation orchestration only), DIP (Depends on abstractions)
 */
-->
<template>
  <AnimationProvider
    ref="wrapperRef"
    :animation="animationType"
    :duration="duration"
    :delay="delay"
    :threshold="threshold"
    :class-name="`scroll-animate-wrapper ${className}`"
    :enable-intersection="true"
  >
    <slot />
  </AnimationProvider>
</template>

<script setup lang="ts">
/**
 * ScrollAnimateWrapper - Refactored using composables
 * 
 * Now delegates to:
 * - AnimationProvider: Handles animation wrapping
 * - useIntersectionObserver: Scroll detection (via AnimationProvider)
 * - useAnimation: Animation state (via AnimationProvider)
 * 
 * Maintains all original features:
 * - Intersection Observer for scroll detection
 * - Multiple animation types support
 * - Configurable threshold and duration
 * - One-time animation on first view
 * 
 * Design Patterns:
 * - Delegation Pattern: Delegates logic to composables
 * - Composition Pattern: Composes from smaller units
 */
import { ref, computed } from 'vue'

import type { AnimationType } from '@/composables/useAnimation'

import { AnimationProvider } from './animation'

// Props interface
interface ScrollAnimateWrapperProps {
  animation?: 'fadeUp' | 'fadeIn' | 'fadeDown' | 'slideIn' | 'zoomIn'
  threshold?: number
  duration?: number
  delay?: number
  className?: string
}

// Define props with defaults matching React
const props = withDefaults(defineProps<ScrollAnimateWrapperProps>(), {
  animation: 'fadeUp',
  threshold: 0.1,
  duration: 600,
  delay: 0,
  className: ''
})

// Template ref
const wrapperRef = ref<InstanceType<typeof AnimationProvider>>()

// Convert animation prop to AnimationType
const animationType = computed<AnimationType>(() => {
  // Map legacy animation names if needed
  const animationMap: Record<string, AnimationType> = {
    fadeUp: 'fadeUp',
    fadeIn: 'fadeIn',
    fadeDown: 'fadeDown',
    slideIn: 'slideIn',
    zoomIn: 'zoomIn'
  }
  
  return animationMap[props.animation] || 'fadeUp'
})
</script>

<style scoped>
.scroll-animate-wrapper {
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Initial state - hidden */
.opacity-0 {
  opacity: 0;
}

/* FadeUp animation */
.animate-fadeUp {
  animation: fadeUp v-bind(duration + 'ms') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* FadeIn animation */
.animate-fadeIn {
  animation: fadeIn v-bind(duration + 'ms') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* SlideIn animation */
.animate-slideIn {
  animation: slideIn v-bind(duration + 'ms') cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>