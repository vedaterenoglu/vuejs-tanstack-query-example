<!--
/**
 * @file SearchIconWrapper.vue
 * @role Search input with icon molecule
 * @atomic molecule
 * @patterns Composition Pattern, Wrapper Pattern
 * @solid SRP (Input with icon composition only)
 */
-->
<template>
  <div class="relative flex-1">
    <!-- Search Icon -->
    <Search
      class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
      aria-hidden="true"
    />

    <!-- Search Input with Padding for Icon -->
    <SearchInput
      v-model="localValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :auto-focus="autoFocus"
      :input-class="`${inputClass} pl-10 ${hasValue && showClearButton ? 'pr-10' : ''}`"
      :aria-label="ariaLabel"
      :role="role"
      :aria-expanded="ariaExpanded"
      :aria-autocomplete="ariaAutocomplete"
      :input-mode="inputMode"
      @keydown="handleKeyDown"
    />

    <!-- Clear Button Slot -->
    <slot name="clear-button" :has-value="hasValue" />
  </div>
</template>

<script setup lang="ts">
/**
 * SearchIconWrapper - Molecule component combining search icon with input
 *
 * Responsibilities:
 * - Display search icon in input field
 * - Manage input padding for icon
 * - Provide slot for clear button
 * - Handle value synchronization
 *
 * Design Patterns:
 * - Composition Pattern: Combines icon and input
 * - Wrapper Pattern: Wraps input with additional UI
 */
import { Search } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { SearchInput } from '../atoms'

// Props interface
interface SearchIconWrapperProps {
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
  showClearButton?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<SearchIconWrapperProps>(), {
  modelValue: '',
  placeholder: 'Search...',
  disabled: false,
  autoFocus: false,
  inputClass: 'text-base ios-fix',
  ariaLabel: 'Search',
  role: 'searchbox',
  ariaExpanded: false,
  ariaAutocomplete: 'list',
  inputMode: 'search',
  showClearButton: true,
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: string]
  keydown: [event: KeyboardEvent]
}>()

// Local value for two-way binding
const localValue = ref(props.modelValue)

// Computed properties
const hasValue = computed(() => localValue.value.length > 0)

// Sync with parent modelValue
watch(
  () => props.modelValue,
  newValue => {
    localValue.value = newValue
  }
)

// Emit changes to parent
watch(localValue, newValue => {
  emit('update:modelValue', newValue)
})

// Event handlers
const handleKeyDown = (event: KeyboardEvent) => {
  emit('keydown', event)
}
</script>
