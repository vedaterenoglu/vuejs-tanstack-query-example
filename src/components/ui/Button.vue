<!--
/**
 * @file Button.vue
 * @role Versatile button component with variant support
 * @atomic atom
 * @patterns Slot Pattern, Variant Pattern, Composition Pattern
 * @solid SRP (Button presentation only)
 */
-->
<template>
  <component
    :is="componentType"
    :class="cn(buttonVariants({ variant, size }), $attrs.class as string)"
    v-bind="filteredAttrs"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * Button - Atomic button component with variants
 *
 * Provides a flexible button component with CVA-based styling variants.
 * Supports polymorphic rendering via asChild prop for composition.
 *
 * Design Patterns:
 * - Variant Pattern: CVA-based styling system
 * - Slot Pattern: Vue slots for content composition
 * - Polymorphic Pattern: Render as different elements
 */
import { Primitive } from 'radix-vue'
import { computed, useAttrs } from 'vue'

import { cn } from '@/lib/utils'

import { buttonVariants } from './button-variants'

// Props interface
interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Define props with defaults
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  asChild: false,
})

// Get attrs for filtering
const attrs = useAttrs()

// Compute component type
const componentType = computed(() => (props.asChild ? Primitive : 'button'))

// Filter out class from attrs as we handle it separately
const filteredAttrs = computed(() => {
  const { class: className, ...rest } = attrs
  // className is intentionally excluded from the returned attrs
  void className // Mark as intentionally unused
  return rest
})
</script>
