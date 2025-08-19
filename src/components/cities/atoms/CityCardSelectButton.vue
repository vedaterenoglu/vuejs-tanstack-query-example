<!--
/**
 * @file CityCardSelectButton.vue
 * @role Select button for city card
 * @atomic atom
 * @patterns Button Pattern, Loading State Pattern
 * @solid SRP (Button display and click handling only)
 */
-->
<template>
  <div
    v-if="showButton"
    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 ease-out pointer-events-none"
    :class="[isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75']"
  >
    <Button
      @click.stop.prevent="handleClick"
      :disabled="disabled || isLoading"
      variant="ghost"
      size="sm"
      class="shadow-lg backdrop-blur-sm min-h-[44px] min-w-[88px] bg-black/60 text-white hover:bg-black/70 hover:text-green-500 transform transition-all duration-200"
      :class="{ 'hover:scale-110': isHovered }"
      :aria-label="ariaLabel"
    >
      <div
        v-if="isLoading"
        class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      />
      <span v-else>{{ buttonText }}</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
/**
 * CityCardSelectButton - Atom component for city selection button
 *
 * Responsibilities:
 * - Display select button with visibility control
 * - Handle click events with stop propagation
 * - Show loading state during selection
 * - Provide accessible button with ARIA label
 *
 * Design Patterns:
 * - Button Pattern: Reusable button component
 * - Loading State Pattern: Visual feedback during async operations
 */
import { Button } from '@/components/ui/button'

// Props interface
interface CityCardSelectButtonProps {
  showButton?: boolean
  isVisible?: boolean
  isHovered?: boolean
  isLoading?: boolean
  disabled?: boolean
  isSelected?: boolean
  cityName?: string
  buttonText?: string
}

// Define props with defaults
const props = withDefaults(defineProps<CityCardSelectButtonProps>(), {
  showButton: true,
  isVisible: false,
  isHovered: false,
  isLoading: false,
  disabled: false,
  isSelected: false,
  cityName: '',
  buttonText: 'Select',
})

// Define emits
const emit = defineEmits<{
  click: []
}>()

// Computed aria label
const ariaLabel = props.isSelected
  ? `${props.cityName} selected`
  : `Select ${props.cityName}`

// Event handler
const handleClick = () => {
  emit('click')
}
</script>
