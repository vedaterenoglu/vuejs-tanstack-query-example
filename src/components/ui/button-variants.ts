/**
 * @file button-variants.ts
 * @role Button styling variants configuration
 * @atomic atom-helper
 * @patterns Variant Pattern, Configuration Pattern
 * @solid SRP (Styling configuration only)
 */

import { cva } from 'class-variance-authority'

/**
 * Button variants configuration using CVA
 *
 * Defines all button styling variants with Tailwind classes.
 * Provides consistent button appearances across the application.
 *
 * Variants:
 * - default: Primary button with brand colors
 * - destructive: Danger/delete actions
 * - outline: Secondary bordered button
 * - secondary: Alternative secondary button
 * - ghost: Minimal hover-only button
 * - link: Text-only link-style button
 *
 * Sizes:
 * - sm: Small button for compact UIs
 * - default: Standard button size
 * - lg: Large button for emphasis
 * - icon: Square button for icon-only content
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
