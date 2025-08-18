<!--
/**
 * @file SearchBox.vue
 * @role Search box container component (refactored)
 * @atomic organism
 * @patterns Container Pattern, Composition Pattern
 * @solid SRP (Search composition only), OCP (Open for extension)
 */
-->
<template>
  <div :class="`relative flex flex-col gap-2 search-mobile ${className}`">
    <!-- Main Search Container -->
    <div class="relative flex items-center gap-2">
      <!-- Search Input with Icon and Clear Button -->
      <SearchIconWrapper
        v-model="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :auto-focus="autoFocus"
        :aria-label="ariaLabel"
        @keydown="handleKeyDown"
      >
        <template #clear-button="{ hasValue }">
          <ClearButton
            :visible="hasValue"
            @click="handleClearClick"
          />
        </template>
      </SearchIconWrapper>
      
      <!-- Refresh Button -->
      <RefreshButton
        :visible="showRefreshButton"
        :disabled="disabled"
        @click="handleRefreshClick"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * SearchBox - Refactored container using decomposed components
 * 
 * Now composed of:
 * - SearchIconWrapper (molecule): Input with icon
 * - ClearButton (atom): Clear button
 * - RefreshButton (atom): Refresh button  
 * - useDebounce (composable): Debouncing logic
 * 
 * Maintains all original features:
 * - Debounced search with configurable delay
 * - Clear button when input has value
 * - Refresh button with configurable visibility
 * - Keyboard support (Escape to clear)
 * - Full accessibility
 * 
 * Design Patterns:
 * - Container Pattern: Orchestrates child components
 * - Composition Pattern: Composes from smaller units
 * - Delegation Pattern: Delegates logic to composable
 */
import { ref, watch } from 'vue'

import { useDebounce } from '@/composables'

import { ClearButton, RefreshButton } from './atoms'
import { SearchIconWrapper } from './molecules'

// Props interface matching React
interface SearchBoxProps {
  placeholder?: string
  debounceMs?: number
  onRefresh?: () => void
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  showRefreshButton?: boolean
  searchQuery?: string
  onSearchChange?: (value: string) => void
}

// Define props with defaults
const props = withDefaults(defineProps<SearchBoxProps>(), {
  placeholder: 'Search cities...',
  debounceMs: 300,
  autoFocus: false,
  disabled: false,
  className: '',
  showRefreshButton: true,
  searchQuery: '',
  onRefresh: undefined,
  onSearchChange: undefined
})

// Define emits
const emit = defineEmits<{
  'search-change': [value: string]
}>()

// Local state
const inputValue = ref(props.searchQuery)
const ariaLabel = 'Search cities'

// Use debounce composable
const { debouncedValue } = useDebounce(inputValue, { delay: props.debounceMs })

// Sync with external searchQuery
watch(() => props.searchQuery, (newValue) => {
  inputValue.value = newValue
})

// Emit debounced value changes
watch(debouncedValue, (newValue) => {
  if (props.onSearchChange) {
    props.onSearchChange(newValue)
  }
  emit('search-change', newValue)
})

// Event handlers
const handleClearClick = () => {
  inputValue.value = ''
  if (props.onSearchChange) {
    props.onSearchChange('')
  }
  emit('search-change', '')
}

const handleRefreshClick = () => {
  if (props.onRefresh) {
    props.onRefresh()
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleClearClick()
  }
}
</script>

<style scoped>
/* Mobile-specific styles */
.search-mobile {
  -webkit-tap-highlight-color: transparent;
}

/* iOS input fix */
.ios-fix {
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
}

/* Focus state for mobile */
.focus-visible-mobile:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--ring);
}
</style>