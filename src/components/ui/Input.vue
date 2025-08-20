<!--
/**
 * @file Input.vue
 * @role Styled input field component
 * @atomic atom
 * @patterns Form Control Pattern
 * @solid SRP (Input field presentation only)
 */
-->
<template>
  <input
    :type="type"
    data-slot="input"
    :class="
      cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        $attrs.class as string | undefined
      )
    "
    v-bind="filteredAttrs"
  />
</template>

<script setup lang="ts">
/**
 * Input - Form input field component
 *
 * Provides a styled input field with focus states,
 * validation styling, and file input support.
 *
 * Design Patterns:
 * - Form Control: Standard input with validation states
 * - Accessibility: ARIA invalid state styling
 * - Dark Mode: Adaptive styling for dark theme
 */
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

// Props interface
interface InputProps {
  type?: string
}

// Define props with destructure default values
const { type = 'text' } = defineProps<InputProps>()

// Get attrs for filtering
const attrs = useAttrs()

// Filter out class from attrs as we handle it separately
const filteredAttrs = computed(() => {
  const { class: className, ...rest } = attrs
  // className is intentionally excluded from the returned attrs
  void className // Mark as intentionally unused
  return rest
})
</script>
