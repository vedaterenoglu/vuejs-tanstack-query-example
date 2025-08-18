/**
 * @file index.ts
 * @role TypeScript interfaces for event components
 * @patterns Interface Segregation, Type Safety Pattern
 * @solid ISP (Interface Segregation Principle)
 */

/**
 * Event data structure
 */
export interface Event {
  id: number
  name: string
  slug: string
  city: string
  citySlug: string
  location: string
  date: string
  organizerName: string
  imageUrl: string
  alt?: string
  description: string
  price: number
}

/**
 * EventCard component props
 */
export interface EventCardProps {
  event: Event
  onClick?: (event: Event) => void
  className?: string
  variant?: 'default' | 'compact'
  disabled?: boolean
  showActionButton?: boolean
}

/**
 * EventGrid component props
 */
export interface EventGridProps {
  events: Event[]
  isLoading?: boolean
  isSearchActive?: boolean
  searchQuery?: string
  totalCount?: number
  gridClasses?: string
  className?: string
  onEventSelect?: (event: Event) => void
}

/**
 * Event formatting options
 */
export interface EventFormatOptions {
  dateFormat?: Intl.DateTimeFormatOptions
  timeFormat?: Intl.DateTimeFormatOptions
  priceFormat?: Intl.NumberFormatOptions
  locale?: string
}