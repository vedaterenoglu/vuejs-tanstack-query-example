<!--
/**
 * @file CityAnnouncer.vue
 * @role Screen reader announcement atom for accessibility
 * @atomic atom
 * @patterns Accessibility Pattern, Observer Pattern
 * @solid SRP (Announcements only)
 */
-->
<template>
  <div class="sr-only" aria-live="polite" aria-atomic="true">
    <div
      v-for="(announcement, index) in announcements"
      :key="`announcement-${index}`"
      :aria-live="announcement.priority"
      :aria-relevant="announcement.relevant"
    >
      {{ announcement.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CityAnnouncer Atom Component
 * 
 * Provides screen reader announcements for dynamic content changes.
 * Manages announcement queue and priorities.
 * 
 * Responsibilities:
 * - Queue and display announcements
 * - Handle announcement priorities
 * - Auto-clear old announcements
 */

import { ref, watch, onUnmounted } from 'vue'

export interface Announcement {
  message: string
  priority?: 'polite' | 'assertive'
  relevant?: 'additions' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals'
  duration?: number
}

interface CityAnnouncerProps {
  announcement?: string | null
  priority?: 'polite' | 'assertive'
  clearDelay?: number
  maxAnnouncements?: number
}

const props = withDefaults(defineProps<CityAnnouncerProps>(), {
  announcement: null,
  priority: 'polite',
  clearDelay: 5000,
  maxAnnouncements: 3,
})

const emit = defineEmits<{
  announced: [message: string]
  cleared: []
}>()

// State
const announcements = ref<Announcement[]>([])
const timers = new Map<number, ReturnType<typeof setTimeout>>()

// Add announcement
const addAnnouncement = (announcement: Announcement) => {
  const index = announcements.value.length
  
  // Add new announcement
  announcements.value.push({
    ...announcement,
    priority: announcement.priority || props.priority,
    relevant: announcement.relevant || 'additions text',
    duration: announcement.duration || props.clearDelay,
  })
  
  // Limit queue size
  if (announcements.value.length > props.maxAnnouncements) {
    const removed = announcements.value.shift()
    if (removed) {
      clearTimer(0)
    }
  }
  
  // Set auto-clear timer
  const timer = setTimeout(() => {
    removeAnnouncement(index)
  }, announcement.duration || props.clearDelay)
  
  timers.set(index, timer)
  emit('announced', announcement.message)
}

// Remove announcement
const removeAnnouncement = (index: number) => {
  clearTimer(index)
  announcements.value = announcements.value.filter((_, i) => i !== index)
  
  if (announcements.value.length === 0) {
    emit('cleared')
  }
}

// Clear timer
const clearTimer = (index: number) => {
  const timer = timers.get(index)
  if (timer) {
    clearTimeout(timer)
    timers.delete(index)
  }
}

// Clear all announcements
const clearAll = () => {
  timers.forEach((timer) => clearTimeout(timer))
  timers.clear()
  announcements.value = []
  emit('cleared')
}

// Watch for new announcements via prop
watch(
  () => props.announcement,
  (newAnnouncement) => {
    if (newAnnouncement) {
      addAnnouncement({
        message: newAnnouncement,
        priority: props.priority,
      })
    }
  }
)

// Cleanup on unmount
onUnmounted(() => {
  clearAll()
})

// Expose methods for parent components
defineExpose({
  addAnnouncement,
  clearAll,
})
</script>

<style scoped>
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>