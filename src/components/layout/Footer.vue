<!--
/**
 * @file Footer.vue
 * @role Basic footer with copyright information
 * @atomic molecule
 * @patterns Container Pattern
 * @solid SRP (Footer display only)
 */
-->
<template>
  <footer
    class="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-center">
        <p class="text-base text-muted-foreground">
          © {{ year }} {{ author }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
/**
 * Footer - Basic footer component
 *
 * Displays copyright year and author information
 * with responsive styling and backdrop effects.
 *
 * Design Patterns:
 * - Container Pattern: Centered content with container
 * - Default Props: Year defaults to current year
 */

// Props interface
interface FooterProps {
  year?: number
  author: string
}

// Define props with defaults
withDefaults(defineProps<FooterProps>(), {
  year: () => new Date().getFullYear(),
})
</script>