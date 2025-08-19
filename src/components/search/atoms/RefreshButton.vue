<!--
/**
 * @file RefreshButton.vue
 * @role Refresh button for data reload
 * @atomic atom
 * @patterns Button Pattern
 * @solid SRP (Refresh button only)
 */
-->
<template>
  <Button
    v-if="visible"
    type="button"
    :variant="variant"
    :size="size"
    @click="handleClick"
    :disabled="disabled"
    :class="buttonClass"
    :aria-label="ariaLabel"
    :title="title"
  >
    <RefreshCw :class="iconClass" />
  </Button>
</template>

<script setup lang="ts">
/**
 * RefreshButton - Atom component for refreshing data
 *
 * Responsibilities:
 * - Display refresh button with icon
 * - Handle click events
 * - Control visibility and state
 * - Provide accessibility
 *
 * Design Patterns:
 * - Button Pattern: Standard button behavior
 */
import { RefreshCw } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

// Props interface
interface RefreshButtonProps {
  visible?: boolean
  disabled?: boolean
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  buttonClass?: string
  iconClass?: string
  ariaLabel?: string
  title?: string
}

// Define props with defaults
withDefaults(defineProps<RefreshButtonProps>(), {
  visible: true,
  disabled: false,
  variant: 'outline',
  size: 'icon',
  buttonClass: 'min-h-[44px] min-w-[44px] focus-visible-mobile',
  iconClass: 'h-4 w-4',
  ariaLabel: 'Refresh data',
  title: 'Refresh data',
})

// Define emits
const emit = defineEmits<{
  click: []
}>()

// Event handler
const handleClick = () => {
  emit('click')
}
</script>
