/**
 * @file useAnimation.ts
 * @role Animation composable for managing CSS animations
 * @patterns State Pattern, Strategy Pattern
 * @solid SRP (Animation logic only), OCP (Open for extension)
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

/**
 * Animation types
 */
export type AnimationType = 
  | 'fadeIn'
  | 'fadeUp'
  | 'fadeDown'
  | 'slideIn'
  | 'zoomIn'
  | 'none'

/**
 * Animation composable options
 */
export interface UseAnimationOptions {
  animation?: AnimationType
  duration?: number
  delay?: number
  once?: boolean
}

/**
 * Animation composable return type
 */
export interface UseAnimationReturn {
  isAnimating: Ref<boolean>
  hasAnimated: Ref<boolean>
  animationClass: ComputedRef<string>
  animationStyle: ComputedRef<Record<string, string>>
  triggerAnimation: () => void
  resetAnimation: () => void
}

/**
 * Animation class mappings
 */
const ANIMATION_CLASSES: Record<AnimationType, string> = {
  fadeIn: 'animate-fadeIn',
  fadeUp: 'animate-fadeUp',
  fadeDown: 'animate-fadeDown',
  slideIn: 'animate-slideIn',
  zoomIn: 'animate-zoomIn',
  none: ''
}

/**
 * Composable for managing CSS animations
 * 
 * Provides reactive animation state and CSS classes/styles.
 * Supports various animation types with configurable timing.
 * 
 * @param options - Animation configuration
 * @returns Animation state and control functions
 * 
 * @example
 * ```ts
 * const { animationClass, triggerAnimation } = useAnimation({
 *   animation: 'fadeUp',
 *   duration: 600,
 *   once: true
 * })
 * 
 * // Trigger animation when element is visible
 * watch(isVisible, (visible) => {
 *   if (visible) triggerAnimation()
 * })
 * ```
 */
export function useAnimation(
  options: UseAnimationOptions = {}
): UseAnimationReturn {
  const {
    animation = 'none',
    duration = 600,
    delay = 0,
    once = true
  } = options
  
  // State
  const isAnimating = ref(false)
  const hasAnimated = ref(false)
  
  // Computed animation class
  const animationClass = computed(() => {
    if (animation === 'none') return ''
    
    // Don't apply animation if already animated in once mode
    if (once && hasAnimated.value) {
      return ANIMATION_CLASSES[animation]
    }
    
    // Apply animation when animating
    if (isAnimating.value) {
      return ANIMATION_CLASSES[animation]
    }
    
    // Apply initial hidden state for animations
    if (!hasAnimated.value) {
      return 'opacity-0 translate-y-4'
    }
    
    return ''
  })
  
  // Computed animation styles
  const animationStyle = computed(() => {
    const styles: Record<string, string> = {}
    
    if (isAnimating.value) {
      styles['animation-duration'] = `${duration}ms`
      
      if (delay > 0) {
        styles['animation-delay'] = `${delay}ms`
      }
      
      styles['animation-fill-mode'] = 'forwards'
    }
    
    return styles
  })
  
  // Trigger animation
  const triggerAnimation = () => {
    // Skip if already animated in once mode
    if (once && hasAnimated.value) return
    
    isAnimating.value = true
    
    // Mark as animated after duration
    setTimeout(() => {
      hasAnimated.value = true
      
      if (!once) {
        // Reset for next animation if not once mode
        isAnimating.value = false
      }
    }, duration + delay)
  }
  
  // Reset animation state
  const resetAnimation = () => {
    isAnimating.value = false
    hasAnimated.value = false
  }
  
  return {
    isAnimating,
    hasAnimated,
    animationClass,
    animationStyle,
    triggerAnimation,
    resetAnimation
  }
}