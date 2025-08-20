<!--
/**
 * @file CityCardWrapper.vue
 * @role City card wrapper atom - container element
 * @atomic atom
 * @patterns Container Pattern
 * @solid SRP (Wrapper element only)
 */
-->
<template>
  <article
    class="city-card group relative aspect-square rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
    :class="[
      isSelected ? 'ring-2 ring-primary ring-offset-2' : '',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ]"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot />
  </article>
</template>

<script setup lang="ts">
/**
 * CityCardWrapper Atom Component
 * 
 * Responsibilities:
 * - Provide container wrapper for city card
 * - Handle basic styling and transitions
 * - Emit interaction events
 * 
 * SOLID Principles:
 * - SRP: Only handles wrapper element
 * - OCP: Open for extension via slots
 */
interface CityCardWrapperProps {
  isSelected?: boolean
  disabled?: boolean
  ariaLabel: string
  className?: string
}

withDefaults(defineProps<CityCardWrapperProps>(), {
  isSelected: false,
  disabled: false,
  className: '',
})

const emit = defineEmits<{
  mouseenter: []
  mouseleave: []
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>