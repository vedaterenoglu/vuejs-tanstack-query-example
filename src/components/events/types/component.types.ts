/**
 * @file component.types.ts
 * @role Component prop types for events
 * @patterns Type Safety Pattern, Atomic Design Pattern
 * @solid ISP (Component-specific interfaces), SRP (Single responsibility per interface)
 */

import type { Event } from './event.types'

/**
 * Atom component props
 */
export interface EventButtonProps {
  label?: string
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export interface EventBadgeProps {
  text: string
  variant?: 'primary' | 'secondary' | 'accent' | 'muted'
  className?: string
}

export interface EventLocationProps {
  location: string
  showIcon?: boolean
  className?: string
}

export interface EventImageProps {
  src: string
  alt?: string
  fallbackSrc?: string
  className?: string
}

export interface EventTitleProps {
  title: string
  truncate?: boolean
  className?: string
}

export interface EventDateProps {
  date: string
  format?: 'short' | 'long' | 'relative'
  className?: string
}

export interface EventTimeProps {
  time: string
  format?: '12h' | '24h'
  className?: string
}

/**
 * Organism component props
 */
export interface EventCardProps {
  event: Event
  onClick?: (event: Event) => void
  disabled?: boolean
  variant?: 'default' | 'compact'
  showActionButton?: boolean
  className?: string
}

export interface EventGridProps {
  events: Event[]
  isLoading?: boolean
  error?: Error | null
  hasMore?: boolean
  onEventSelect?: (event: Event) => void
  className?: string
}

/**
 * Molecule component props
 */
export interface EventCardHeaderProps {
  imageUrl: string
  alt?: string
  price: number
  isHovered?: boolean
  className?: string
}

export interface EventCardBodyProps {
  name: string
  date: string
  location: string
  className?: string
}

export interface EventCardFooterProps {
  onAction?: () => void
  isVisible?: boolean
  disabled?: boolean
  className?: string
}

/**
 * Container/Presentation props
 */
export interface EventsContainerProps {
  initialSearch?: string
}

export interface EventsPresentationProps {
  events: Event[]
  isLoading: boolean
  error: Error | null
  searchQuery: string
  hasMore: boolean
  isFetchingNext: boolean
  sentinelRef: { value: HTMLElement | null }
  onSearchChange: (value: string) => void
  onRefresh: () => void
  onEventSelect: (event: Event) => void
}