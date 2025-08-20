/**
 * @file useImageLoader.ts
 * @role Image loading state management composable
 * @patterns Composition API, State Pattern
 * @solid SRP (Image loading only), ISP (Focused interface)
 */

import { ref, type Ref } from 'vue'

/**
 * Image loader composable interface
 */
export interface UseImageLoaderReturn {
  imageError: Ref<boolean>
  imageLoading: Ref<boolean>
  handleImageError: () => void
  handleImageLoad: () => void
  resetImageState: () => void
}

/**
 * Composable for managing image loading states
 * 
 * Handles:
 * - Image loading state
 * - Image error state
 * - State reset functionality
 * 
 * @returns Image loading state and actions
 */
export function useImageLoader(): UseImageLoaderReturn {
  // State
  const imageError = ref(false)
  const imageLoading = ref(true)

  // Actions
  const handleImageError = () => {
    imageError.value = true
    imageLoading.value = false
  }

  const handleImageLoad = () => {
    imageError.value = false
    imageLoading.value = false
  }

  const resetImageState = () => {
    imageError.value = false
    imageLoading.value = true
  }

  return {
    // State
    imageError,
    imageLoading,

    // Actions
    handleImageError,
    handleImageLoad,
    resetImageState,
  }
}