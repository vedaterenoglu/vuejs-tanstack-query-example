<!--
/**
 * @file EventCard.vue
 * @role Event card container component
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Event card orchestration only), OCP (Open for extension), DIP (Depends on abstractions)
 * @ssot Props for event data
 */
-->
<template>
  <article 
    class="event-card group relative bg-card rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
    :class="[
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    ]"
    role="article"
    :aria-label="`Event: ${event.name}`"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleEventClick"
  >
    <EventCardOverlay :is-visible="isHovered && !disabled" />
    
    <EventCardImage 
      :src="event.imageUrl"
      :alt="event.alt || `Image for ${event.name}`"
      image-classes="group-hover:scale-105"
    />
    
    <EventCardPriceBadge :price="event.price" />
    
    <EventCardDetails
      :name="event.name"
      :date="event.date"
      :location="event.location"
    />
    
    <EventCardActionButton
      :show-button="showActionButton"
      :is-visible="isHovered"
      :is-hovered="isHovered"
      :disabled="disabled"
      button-text="View Details"
      :aria-label="`View details for ${event.name}`"
      @click="handleEventClick"
    />
  </article>
</template>

<script setup lang="ts">
import { EventCardActionButton, EventCardImage, EventCardOverlay, EventCardPriceBadge } from './atoms'
import { useEventCard } from './composables/useEventCard'
import { EventCardDetails } from './molecules'

import type { EventCardProps } from './types'

const props = withDefaults(defineProps<EventCardProps>(), {
  onClick: undefined,
  className: '',
  variant: 'default',
  disabled: false,
  showActionButton: true
})

const emit = defineEmits<{
  click: [event: EventCardProps['event']]
}>()

const handleEventClick = () => {
  if (props.onClick) {
    props.onClick(props.event)
  }
  emit('click', props.event)
}

const { isHovered, handleMouseEnter, handleMouseLeave } = useEventCard({
  event: props.event,
  onClick: handleEventClick,
  disabled: props.disabled
})
</script>

<style scoped>
.event-card {
  border: 1px solid hsl(var(--border));
  transition: all 0.3s ease;
}

.event-card:hover {
  transform: translateY(-2px);
}
</style>