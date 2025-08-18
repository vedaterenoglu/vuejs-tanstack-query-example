<!--
/**
 * @file EventPrice.vue
 * @role Event price display atom
 * @atomic atom
 * @patterns Presentational Component Pattern
 * @solid SRP (Price display only)
 */
-->
<template>
  <span :class="className">
    {{ formattedPrice }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface EventPriceProps {
  price: number
  currency?: string
  locale?: string
  className?: string
}

const props = withDefaults(defineProps<EventPriceProps>(), {
  currency: 'USD',
  locale: 'en-US',
  className: ''
})

const formattedPrice = computed(() => {
  if (props.price === 0) return 'Free'
  
  return new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency
  }).format(props.price)
})
</script>