<!--
/**
 * @file EventPrice.vue
 * @role Event price display atom
 * @atomic atom
 * @patterns Presentation Pattern
 * @solid SRP (Price display only)
 */
-->
<template>
  <div :class="['event-price', className]">
    <EventBadge
      :text="displayPrice"
      :variant="variant"
      :class="badgeClass"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * EventPrice Atom Component
 * 
 * Responsibilities:
 * - Format price for display
 * - Handle free events
 * - Delegate badge display to EventBadge
 * 
 * SOLID Principles:
 * - SRP: Only handles price formatting and display
 * - OCP: Open for extension via props
 * - DIP: Depends on EventBadge abstraction
 */
import { computed } from 'vue'

import EventBadge from './EventBadge.vue'

// Props
interface EventPriceProps {
  price: number
  currency?: string
  locale?: string
  showFree?: boolean
  freeText?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'muted'
  className?: string
  badgeClass?: string
}

const props = withDefaults(defineProps<EventPriceProps>(), {
  currency: 'USD',
  locale: 'en-US',
  showFree: true,
  freeText: 'Free',
  variant: 'primary',
  className: '',
  badgeClass: '',
})

// Computed
const displayPrice = computed(() => {
  if (props.price === 0 && props.showFree) {
    return props.freeText
  }
  
  try {
    return new Intl.NumberFormat(props.locale, {
      style: 'currency',
      currency: props.currency,
      minimumFractionDigits: props.price % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(props.price)
  } catch {
    // Fallback for invalid locale/currency
    return `$${props.price.toFixed(2)}`
  }
})
</script>