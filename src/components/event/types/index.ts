/**
 * @file index.ts
 * @role TypeScript interfaces for single event page components
 * @patterns Interface Segregation, Type Safety Pattern
 * @solid ISP (Interface Segregation), DIP (Dependency Inversion)
 */

import type { Event } from '@/components/events/types'

/**
 * Organism component props - complete features
 * These will be expanded as components are created
 */

// EventHero organism - hero section with image/title
export interface EventHeroProps {
  event: Event
  className?: string
}

// EventDetails organism - main content section
export interface EventDetailsProps {
  description: string
  className?: string
}

// EventInfo organism - sidebar with date/time/location/price
export interface EventInfoProps {
  event: Event
  className?: string
}

// EventOrganizer organism - organizer information section
export interface EventOrganizerProps {
  organizerName: string
  className?: string
}

/**
 * Molecule component props - composed features
 * Following SOLID principles and atomic design
 */

// EventHeroContent molecule - composes image and title atoms
export interface EventHeroContentProps {
  imageUrl: string
  imageAlt: string
  title: string
  subtitle?: string
  price: number
  className?: string
}

// EventDescription molecule - composes description text atom
export interface EventDescriptionProps {
  description: string
  className?: string
}

// EventInfoCard molecule - composes info item atoms
export interface EventInfoCardProps {
  location?: string
  date?: string
  organizer?: string
  className?: string
}

/**
 * Atom component props - basic elements
 * Following SOLID principles and atomic design
 */

// EventImage atom - displays event image
export interface EventImageProps {
  imageUrl: string
  alt: string
  className?: string
}

// EventTitle atom - displays event title text
export interface EventTitleProps {
  title: string
  className?: string
}

// EventPrice atom - displays price badge
export interface EventPriceProps {
  price: number
  className?: string
}

// EventInfoItem atom - single info item with icon and text
export interface EventInfoItemProps {
  icon?: string
  label: string
  value: string
  className?: string
}

// EventDescriptionText atom - displays description text
export interface EventDescriptionTextProps {
  text: string
  className?: string
}

// Placeholder for future atom interfaces
export interface EventHeroImageProps {
  // To be defined when atom is created
  imageUrl?: string
  alt?: string
  className?: string
}

/**
 * Utility types for component composition
 */
export type EventComponentVariant = 'default' | 'compact' | 'full'

/**
 * Re-export Event type for convenience
 */
export type { Event } from '@/components/events/types'
