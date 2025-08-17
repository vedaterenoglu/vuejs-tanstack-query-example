<!--
/**
 * @file Navbar.vue
 * @role Navigation header with authentication and theme toggle
 * @atomic organism
 * @patterns Conditional Rendering, Composition Pattern
 * @solid SRP (Navigation bar only)
 */
-->
<template>
  <nav
    class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <RouterLink
            to="/"
            class="group relative text-xl font-semibold text-foreground/90 hover:text-foreground transition-all duration-300 ease-out"
          >
            <span class="relative z-10">{{ title }}</span>
            <span
              class="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out bg-gradient-to-r from-primary/20 to-primary/10 blur-sm rounded-md"
            />
            <span
              class="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 ease-out"
            />
          </RouterLink>
        </div>
        <div class="flex items-center space-x-4">
          <ModeToggle />
          <div v-if="isSignedIn">
            <UserButton
              :appearance="{
                elements: {
                  avatarBox: 'h-8 w-8',
                },
              }"
            />
          </div>
          <SignInButton v-else mode="modal">
            <Button variant="outline" size="sm"> Sign In </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
/**
 * Navbar - Navigation header component
 *
 * Provides responsive navigation with authentication integration,
 * theme toggle functionality, and animated branding elements.
 *
 * Design Patterns:
 * - Conditional Rendering: Different UI based on auth state
 * - Composition: Combines auth, theme, and navigation
 * - Animation: CSS transitions for interactive elements
 */
import { SignInButton, UserButton, useUser } from '@clerk/vue'
import { RouterLink } from 'vue-router'

import { Button } from '@/components/ui'

import ModeToggle from './ModeToggle.vue'

// Props interface
interface NavbarProps {
  title: string
}

// Define props
defineProps<NavbarProps>()

// Get authentication state
const { isSignedIn } = useUser()
</script>