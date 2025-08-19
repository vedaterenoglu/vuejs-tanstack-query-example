<!--
/**
 * @file CityCard.vue
 * @role City card container component (refactored)
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Card composition only), OCP (Open for extension via slots)
 */
-->
<template>
  <article
    class="city-card group relative aspect-square overflow-hidden rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
    :class="[
      isSelected ? 'ring-2 ring-primary ring-offset-2' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    :aria-label="`City destination: ${city.city}`"
  >
    <!-- Image Component -->
    <CityCardImage
      :src="city.url"
      :alt="city.alt"
      :image-classes="isHovered && !disabled ? 'scale-105' : ''"
      @error="handleImageError"
      @load="handleImageLoad"
    />

    <!-- Overlay Component -->
    <CityCardOverlay
      :city-name="city.city"
      :is-hovered="isHovered"
      :is-selected="isSelected"
      :is-loading="isLoading"
      :disabled="disabled"
      :variant="variant"
    />

    <!-- Select Button Component -->
    <CityCardSelectButton
      :show-button="showSelectButton"
      :is-visible="showButton"
      :is-hovered="isHovered"
      :is-loading="isLoading"
      :disabled="disabled"
      :is-selected="isSelected"
      :city-name="city.city"
      @click="handleSelectClick"
    />
  </article>
</template>

<script setup lang="ts">
/**
 * CityCard - Refactored container using decomposed components
 *
 * Now composed of:
 * - CityCardImage (atom): Image display with fallback
 * - CityCardOverlay (molecule): Overlay and city info
 * - CityCardSelectButton (atom): Select button
 * - useCityCard (composable): Business logic
 *
 * Design Patterns:
 * - Container Pattern: Orchestrates child components
 * - Composition Pattern: Composes from smaller units
 * - Delegation Pattern: Delegates logic to composable
 */
import { useCityCard } from '@/composables/useCityCard'
import type { City } from '@/lib/types'

import { CityCardImage, CityCardSelectButton } from './atoms'
import { CityCardOverlay } from './molecules'

// Props interface
interface CityCardProps {
  city: City
  onSelect?: (city: City) => void
  className?: string
  showSelectButton?: boolean
  disabled?: boolean
  variant?: 'default' | 'compact'
}

// Define props with defaults
const props = withDefaults(defineProps<CityCardProps>(), {
  className: '',
  showSelectButton: true,
  disabled: false,
  variant: 'default',
})

// Define emits
const emit = defineEmits<{
  click: [city: City]
}>()

// Use composable for business logic
const {
  isHovered,
  isSelected,
  showButton,
  isLoading,
  handleSelectClick,
  handleMouseEnter,
  handleMouseLeave,
  handleImageError,
  handleImageLoad,
  handleClick: composableHandleClick,
} = useCityCard({
  city: props.city,
  showSelectButton: props.showSelectButton,
  disabled: props.disabled,
  onSelect: props.onSelect,
  onClick: city => {
    emit('click', city)
  },
})

// Wrapper to emit event
const handleClick = () => {
  composableHandleClick()
}
</script>

<style scoped>
.city-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.city-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
</style>
