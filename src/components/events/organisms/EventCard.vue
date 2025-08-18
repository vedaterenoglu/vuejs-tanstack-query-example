<!--
/**
 * @file EventCard.vue
 * @role Event card organism component - empty container for molecules
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Card container only), OCP (Extensible via molecules), DIP (Will depend on molecule abstractions)
 */
-->
<template>
  <article
    :class="[
      'event-card group relative overflow-hidden rounded-lg shadow-sm',
      'transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
      'bg-muted',
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
    <div
      :class="[
        'absolute inset-0 bg-black/10 transition-opacity duration-300',
        isHovered && !disabled ? 'opacity-100' : 'opacity-0',
      ]"
    />
  </article>
</template>

<script setup lang="ts">
/**
 * EventCard Organism Component
 *
 * Features:
 * - Container composing molecules
 * - 3:2 aspect ratio responsive card
 * - Hover animations and effects
 * - Click handling
 *
 * Design Patterns:
 * - Container Pattern: Container for molecules
 * - Composition Pattern: Composes molecules
 * - Event Handler Pattern: Mouse and click events
 */
import { ref } from 'vue'

import { EventCardHeader, EventCardBody, EventCardFooter } from '../molecules'
import { type EventCardProps, type Event } from '../types'

const props = withDefaults(defineProps<EventCardProps>(), {
  disabled: false,
  variant: 'default',
  showActionButton: true,
  className: '',
})

const emit = defineEmits<{
  click: [event: Event]
}>()

// State
const isHovered = ref(false)

// Event handlers
const handleCardClick = () => {
  if (props.disabled) return
  if (props.onClick) {
    props.onClick(props.event)
  } else {
    emit('click', props.event)
  }
}

const handleMouseEnter = () => {
  if (!props.disabled) {
    isHovered.value = true
  }
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.event-card {
  width: 100%;
}
</style>
