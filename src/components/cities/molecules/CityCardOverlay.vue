<!--
/**
 * @file CityCardOverlay.vue
 * @role City card overlay with name and selection state
 * @atomic molecule
 * @patterns Overlay Pattern, Composition Pattern
 * @solid SRP (Overlay display and city info only)
 */
-->
<template>
  <div class="city-card-overlay">
    <!-- Hover Overlay -->
    <div
      class="absolute inset-0 bg-black/20 transition-opacity duration-300"
      :class="isHovered && !disabled ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    />

    <!-- City Name with Container -->
    <div
      class="absolute bottom-2 left-4 right-4 z-10 bg-black/60 rounded px-2 py-1"
    >
      <div class="flex items-end justify-between">
        <h3
          class="font-semibold text-white truncate"
          :class="variant === 'compact' ? 'text-sm' : 'text-base'"
          :style="{ textShadow: '1px 1px 3px rgba(0,0,0,0.9)' }"
        >
          {{ cityName }}
        </h3>

        <!-- Selection Indicator -->
        <div v-if="isSelected" class="flex-shrink-0 ml-2" aria-label="Selected">
          <Check
            class="h-5 w-5 text-white"
            :style="{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }"
          />
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="mt-1 flex items-center gap-2 text-xs text-white/90"
      >
        <div
          class="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
        <span :style="{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }">
          Updating...
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CityCardOverlay - Molecule component for city card overlay
 *
 * Responsibilities:
 * - Display hover overlay effect
 * - Show city name with styling
 * - Display selection indicator
 * - Show loading state
 *
 * Design Patterns:
 * - Overlay Pattern: Visual feedback layer
 * - Composition Pattern: Combines multiple UI elements
 */
import { Check } from 'lucide-vue-next'

// Props interface
interface CityCardOverlayProps {
  cityName: string
  isHovered?: boolean
  isSelected?: boolean
  isLoading?: boolean
  disabled?: boolean
  variant?: 'default' | 'compact'
}

// Define props with defaults
withDefaults(defineProps<CityCardOverlayProps>(), {
  isHovered: false,
  isSelected: false,
  isLoading: false,
  disabled: false,
  variant: 'default',
})
</script>
