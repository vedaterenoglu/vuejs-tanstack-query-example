/**
 * @file index.ts
 * @role Barrel export for UI components
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Button components
export { default as Button } from './Button.vue'
export { buttonVariants } from './button-variants'

// Card components
export { default as Card } from './Card.vue'
export { default as CardHeader } from './CardHeader.vue'
export { default as CardTitle } from './CardTitle.vue'
export { default as CardDescription } from './CardDescription.vue'
export { default as CardAction } from './CardAction.vue'
export { default as CardContent } from './CardContent.vue'
export { default as CardFooter } from './CardFooter.vue'

// Input component
export { default as Input } from './Input.vue'
