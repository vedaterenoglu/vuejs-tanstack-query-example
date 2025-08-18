/**
 * @file useCityCard.ts
 * @role Business logic composable for CityCard component
 * @patterns Composition API, Observer Pattern, Strategy Pattern
 * @solid SRP (City card logic only), DIP (Depends on abstractions)
 */

import { ref, computed, type Ref, type ComputedRef } from 'vue'

import { useCitySelection } from '@/composables/useCitySelection'
import type { City } from '@/lib/types'

/**
 * CityCard composable interface
 */
export interface UseCityCardReturn {
  // State
  isHovered: Ref<boolean>
  imageError: Ref<boolean>
  isSelected: ComputedRef<boolean>
  showButton: ComputedRef<boolean>
  isLoading: Ref<boolean>
  
  // Actions
  handleSelectClick: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleImageError: () => void
  handleImageLoad: () => void
  handleClick: () => void
}

/**
 * CityCard composable options
 */
export interface UseCityCardOptions {
  city: City
  showSelectButton?: boolean
  disabled?: boolean
  onSelect?: (city: City) => void
  onClick?: (city: City) => void
}

/**
 * Composable for CityCard business logic
 * 
 * Extracts all stateful logic from CityCard component:
 * - Hover state management
 * - Image loading/error handling
 * - Selection state and actions
 * - Event handling coordination
 * 
 * @param options - Configuration options
 * @returns CityCard state and actions
 */
export function useCityCard(options: UseCityCardOptions): UseCityCardReturn {
  const { 
    city, 
    showSelectButton = true, 
    disabled = false,
    onSelect,
    onClick
  } = options
  
  // Integration with city selection composable
  const { selectedCity, selectCity, isLoading } = useCitySelection()
  
  // Local state
  const isHovered = ref(false)
  const imageError = ref(false)
  
  // Computed properties
  const isSelected = computed(() => selectedCity.value?.citySlug === city.citySlug)
  const showButton = computed(() => showSelectButton && isHovered.value)
  
  // Event handlers
  const handleSelectClick = () => {
    if (disabled || isLoading.value) return
    
    try {
      void selectCity(city.citySlug)
      onSelect?.(city)
    } catch (error) {
      console.error('Failed to select city:', error)
    }
  }
  
  const handleMouseEnter = () => {
    if (!disabled) {
      isHovered.value = true
    }
  }
  
  const handleMouseLeave = () => {
    isHovered.value = false
  }
  
  const handleImageError = () => {
    imageError.value = true
  }
  
  const handleImageLoad = () => {
    imageError.value = false
  }
  
  const handleClick = () => {
    if (onClick) {
      onClick(city)
    }
  }
  
  return {
    // State
    isHovered,
    imageError,
    isSelected,
    showButton,
    isLoading,
    
    // Actions
    handleSelectClick,
    handleMouseEnter,
    handleMouseLeave,
    handleImageError,
    handleImageLoad,
    handleClick
  }
}