/**
 * @file index.ts
 * @role Barrel export for event types
 * @patterns Module Pattern, Facade Pattern
 * @solid ISP (Interface Segregation), SRP (Export management)
 */

// Re-export domain types
export type { Event, FormatEventDateOptions, FormatEventPriceOptions } from './event.types'

// Re-export API types  
export type { EventsResponse, EventsQueryParams } from './api.types'

// Re-export component types
export type {
  // Atom props
  EventButtonProps,
  EventBadgeProps,
  EventLocationProps,
  EventImageProps,
  EventTitleProps,
  EventDateProps,
  EventTimeProps,
  // Organism props
  EventCardProps,
  EventGridProps,
  // Molecule props
  EventCardHeaderProps,
  EventCardBodyProps,
  EventCardFooterProps,
  // Container/Presentation props
  EventsContainerProps,
  EventsPresentationProps,
} from './component.types'