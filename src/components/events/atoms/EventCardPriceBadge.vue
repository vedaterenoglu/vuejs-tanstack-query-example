<!--
/**
 * @file EventCardPriceBadge.vue
 * @role Price badge display for event card
 * @atomic atom
 * @patterns Badge Pattern
 * @solid SRP (Price display only)
 */
-->
<template>
  <div 
    class="absolute top-3 right-3 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
    :class="className"
  >
    {{ formattedPrice }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface EventCardPriceBadgeProps {
  price: number
  className?: string
}

const props = withDefaults(defineProps<EventCardPriceBadgeProps>(), {
  className: ''
})

const formattedPrice = computed(() => {
  return props.price === 0 ? 'Free' : `$${props.price.toFixed(2)}`
})
</script>