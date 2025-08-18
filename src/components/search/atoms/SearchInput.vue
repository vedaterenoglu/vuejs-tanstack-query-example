<!--
/**
 * @file SearchInput.vue
 * @role Basic search input field atom
 * @atomic atom
 * @patterns Input Pattern, Controlled Component Pattern
 * @solid SRP (Input field only)
 */
-->
<template>
  <Input
    type="text"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
    @keydown="handleKeyDown"
    :disabled="disabled"
    :auto-focus="autoFocus"
    :class="inputClass"
    :aria-label="ariaLabel"
    :role="role"
    :aria-expanded="ariaExpanded"
    :aria-autocomplete="ariaAutocomplete"
    :input-mode="inputMode"
  />
</template>

<script setup lang="ts">
/**
 * SearchInput - Atom component for search input field
 * 
 * Responsibilities:
 * - Display text input field
 * - Handle input events
 * - Handle keyboard events
 * - Provide accessibility attributes
 * 
 * Design Patterns:
 * - Controlled Component: Parent controls value
 * - Input Pattern: Standard form input
 */
import { Input } from '@/components/ui'

// Props interface
interface SearchInputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  autoFocus?: boolean
  inputClass?: string
  ariaLabel?: string
  role?: string
  ariaExpanded?: boolean
  ariaAutocomplete?: string
  inputMode?: string
}

// Define props with defaults
withDefaults(defineProps<SearchInputProps>(), {
  modelValue: '',
  placeholder: 'Search...',
  disabled: false,
  autoFocus: false,
  inputClass: '',
  ariaLabel: 'Search',
  role: 'searchbox',
  ariaExpanded: false,
  ariaAutocomplete: 'list',
  inputMode: 'search'
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  'keydown': [event: KeyboardEvent]
}>()

// Event handlers
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleKeyDown = (event: KeyboardEvent) => {
  emit('keydown', event)
}
</script>