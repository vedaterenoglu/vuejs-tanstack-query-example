<!--
/**
 * @file ModeToggle.vue
 * @role Theme toggle button component
 * @atomic molecule
 * @patterns Toggle Pattern
 * @solid SRP (Theme toggle only)
 */
-->
<template>
  <Button variant="outline" size="icon" @click="toggleTheme">
    <Sun
      class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<script setup lang="ts">
/**
 * ModeToggle - Theme toggle component
 *
 * Simple toggle button for switching between light and dark themes.
 * Uses animated icons for visual feedback.
 *
 * Design Patterns:
 * - Toggle Pattern: Binary state switching
 * - Animation Pattern: Smooth icon transitions
 * - Accessibility: Screen reader support
 */
import { Moon, Sun } from 'lucide-vue-next'

import { Button } from '@/components/ui'
import { useTheme } from '@/composables'

// Get theme composable
const { toggleTheme } = useTheme()
</script>