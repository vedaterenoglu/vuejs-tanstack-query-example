<!--
/**
 * @file CitySkipLink.vue
 * @role Skip link atom for improved keyboard navigation
 * @atomic atom
 * @patterns Accessibility Pattern
 * @solid SRP (Skip link only)
 */
-->
<template>
  <a
    :href="href"
    :class="[
      'skip-link',
      'sr-only focus:not-sr-only',
      'focus:absolute focus:top-4 focus:left-4',
      'focus:z-50 focus:px-4 focus:py-2',
      'focus:bg-blue-600 focus:text-white',
      'focus:rounded-md focus:outline-none',
      'focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
      className
    ]"
    @click="handleClick"
  >
    {{ text }}
  </a>
</template>

<script setup lang="ts">
/**
 * CitySkipLink Atom Component
 * 
 * Provides skip navigation for keyboard users.
 * Hidden by default, visible on focus.
 * 
 * Responsibilities:
 * - Provide skip navigation link
 * - Handle focus states
 * - Emit navigation events
 */

interface CitySkipLinkProps {
  href: string
  text?: string
  className?: string
}

withDefaults(defineProps<CitySkipLinkProps>(), {
  text: 'Skip to content',
  className: '',
})

const emit = defineEmits<{
  navigate: [href: string]
}>()

const handleClick = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLAnchorElement
  const href = target.getAttribute('href')
  
  if (href?.startsWith('#')) {
    event.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      ;(element as HTMLElement).focus?.()
    }
    emit('navigate', href)
  }
}
</script>

<style scoped>
.skip-link {
  transition: all 0.2s ease-in-out;
}

/* Screen reader only utility - Tailwind's sr-only class */
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

.focus\:not-sr-only:focus {
  position: absolute;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>