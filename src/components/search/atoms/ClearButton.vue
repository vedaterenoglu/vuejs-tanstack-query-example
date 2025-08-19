<!--
/**
 * @file ClearButton.vue
 * @role Clear button for search input
 * @atomic atom
 * @patterns Button Pattern
 * @solid SRP (Clear button only)
 */
-->
<template>
  <Button
    v-if="visible"
    type="button"
    variant="ghost"
    size="sm"
    @click="handleClick"
    :class="buttonClass"
    :aria-label="ariaLabel"
    :disabled="disabled"
  >
    <X :class="iconClass" />
  </Button>
</template>

<script setup lang="ts">
/**
 * ClearButton - Atom component for clearing input
 *
 * Responsibilities:
 * - Display clear button with X icon
 * - Handle click events
 * - Control visibility
 * - Provide accessibility
 *
 * Design Patterns:
 * - Button Pattern: Standard button behavior
 */
import { X } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

// Props interface
interface ClearButtonProps {
  visible?: boolean
  disabled?: boolean
  buttonClass?: string
  iconClass?: string
  ariaLabel?: string
}

// Define props with defaults
withDefaults(defineProps<ClearButtonProps>(), {
  visible: true,
  disabled: false,
  buttonClass:
    'absolute right-1 top-1/2 h-9 w-9 -translate-y-1/2 hover:bg-muted min-h-[36px] min-w-[36px] p-0 flex items-center justify-center',
  iconClass: 'h-3 w-3',
  ariaLabel: 'Clear search',
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
