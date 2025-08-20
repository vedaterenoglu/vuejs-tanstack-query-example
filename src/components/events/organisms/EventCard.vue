<!--
/**
 * @file EventCard.vue
 * @role Event card organism component
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Card orchestration), OCP (Extensible via molecules), DIP (Depends on abstractions)
 */
-->
<template>
  <article
    :class="[
      'event-card group relative overflow-hidden rounded-lg shadow-sm',
      'transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
      'bg-muted w-full',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      variant === 'compact'
        ? 'aspect-[3/2] min-h-[200px]'
        : 'aspect-[3/2] min-h-[266px]',
      className,
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleCardClick"
    role="article"
    :aria-label="`Event: ${event.name}`"
  >
    <!-- Event Card Header with Image and Price Badge -->
    <EventCardHeader
      :image-url="event.imageUrl"
      :alt="event.alt"
      :price="event.price"
      :is-hovered="isHovered"
      class="absolute inset-0"
    />

    <!-- Event Card Body with Title, Date, and Location -->
    <EventCardBody
      :name="event.name"
      :date="event.date"
      :location="event.location"
    />

    <!-- Event Card Footer with Action Button -->
    <EventCardFooter
      :on-action="handleCardClick"
      :is-visible="isHovered && showActionButton"
      :disabled="disabled"
    />

    <!-- Hover Overlay -->
    <EventCardOverlay :is-visible="isHovered && !disabled" />
  </article>
</template>

<script setup lang="ts">
/**
 * EventCard Organism Component
 *
 * Features:
 * - Orchestrates molecules and atoms
 * - Delegates logic to composable
 * - 3:2 aspect ratio responsive card
 *
 * Design Patterns:
 * - Container Pattern: Orchestrates components
 * - Composition Pattern: Composes molecules/atoms
 * - Delegation Pattern: Delegates logic to composable
 * 
 * SOLID Principles:
 * - SRP: Only orchestrates card components
 * - OCP: Open for extension via props
 * - DIP: Depends on composable and component abstractions
 */
import EventCardOverlay from '../atoms/EventCardOverlay.vue'
import { useEventCard } from '../composables/useEventCard'
import { EventCardHeader, EventCardBody, EventCardFooter } from '../molecules'
import { type EventCardProps } from '../types'

const props = withDefaults(defineProps<EventCardProps>(), {
  disabled: false,
  variant: 'default',
  showActionButton: true,
  className: '',
})

const emit = defineEmits<{
  click: [event: typeof props.event]
}>()

// Use composable for card logic
const { isHovered, handleCardClick, handleMouseEnter, handleMouseLeave } = useEventCard(
  props.event,
  {
    disabled: props.disabled,
    onClick: props.onClick,
    onEmit: (event) => emit('click', event),
  }
)
</script>
