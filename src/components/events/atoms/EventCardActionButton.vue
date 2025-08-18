<!--
/**
 * @file EventCardActionButton.vue
 * @role Action button for event card
 * @atomic atom
 * @patterns Button Pattern
 * @solid SRP (Button display only)
 */
-->
<template>
  <div
    v-if="showButton"
    :class="[
      'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20',
      'transition-all duration-300 ease-out',
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
    ]"
  >
    <Button
      variant="ghost"
      size="sm"
      class="shadow-lg backdrop-blur-sm min-h-[44px] min-w-[88px] bg-black/60 text-white hover:bg-black/70 hover:text-green-500 transform transition-all duration-200"
      :class="isHovered ? 'hover:scale-110' : ''"
      :disabled="disabled"
      :aria-label="ariaLabel"
      @click.stop="$emit('click')"
    >
      {{ buttonText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'

interface EventCardActionButtonProps {
  showButton?: boolean
  isVisible?: boolean
  isHovered?: boolean
  disabled?: boolean
  buttonText?: string
  ariaLabel?: string
}

withDefaults(defineProps<EventCardActionButtonProps>(), {
  showButton: true,
  isVisible: false,
  isHovered: false,
  disabled: false,
  buttonText: 'View Details',
  ariaLabel: 'View event details'
})

defineEmits<{
  click: []
}>()
</script>