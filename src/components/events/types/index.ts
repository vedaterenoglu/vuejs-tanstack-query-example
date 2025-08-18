/**
 * @file index.ts
 * @role TypeScript interfaces for events components
 * @patterns Interface Segregation, Type Safety
 * @solid ISP (Specific interfaces for each component level)
 */

/**
 * Core Event interface matching API response
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
 * Events API response structure
 */
export interface EventsResponse {
  events: Event[]
  count: number
  pagination?: {
    limit: number
    offset: number
    hasMore: boolean
    total?: number
  }
}

/**
 * Query parameters for events fetching
 */
export interface EventsQueryParams {
  limit?: number
  offset?: number
  search?: string
  sortBy?: 'date' | 'name' | 'price' | 'city'
  order?: 'asc' | 'desc'
}

/**
 * Atom component props - minimal, single responsibility
 */
export interface EventImageProps {
  src: string
  alt: string
  className?: string
  onError?: () => void
  onLoad?: () => void
}

export interface EventBadgeProps {
  text: string
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  className?: string
}

export interface EventTitleProps {
  title: string
  className?: string
  truncate?: boolean
}

export interface EventDateProps {
  date: string | Date
  format?: 'short' | 'long' | 'relative'
  className?: string
}

export interface EventLocationProps {
  location: string
  className?: string
  showIcon?: boolean
}

export interface EventPriceProps {
  price: number
  currency?: string
  className?: string
}

export interface EventButtonProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * Molecule component props - composite of atoms
 */
export interface EventCardHeaderProps {
  imageUrl: string
  alt?: string
  price: number
  className?: string
}

export interface EventCardBodyProps {
  name: string
  date: string
  location: string
  className?: string
}

export interface EventCardFooterProps {
  onViewDetails?: () => void
  disabled?: boolean
  className?: string
}

export interface EventEmptyStateProps {
  message?: string
  showIcon?: boolean
  className?: string
}

export interface EventLoadingSkeletonProps {
  count?: number
  className?: string
}

export interface EventGridControlsProps {
  totalCount: number
  currentCount: number
  isLoading?: boolean
  className?: string
}

/**
 * Organism component props - complete features
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

export interface EventsHeaderProps {
  title?: string
  description?: string
  totalCount?: number
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
  hasMore: boolean
  totalCount: number
  onEventSelect: (event: Event) => void
  onLoadMore: () => void
  onRefresh: () => void
  onSearch: (query: string) => void
  searchQuery: string
}

/**
 * Composable return types
 */
export interface UseEventsDataReturn {
  events: Event[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  totalCount: number
}

export interface UseEventsPaginationReturn {
  page: number
  limit: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  previousPage: () => void
  setPage: (page: number) => void
}

export interface UseEventsInfiniteScrollReturn {
  events: Event[]
  isLoading: boolean
  error: Error | null
  hasMore: boolean
  loadMore: () => Promise<void>
  reset: () => void
}

/**
 * Template props
 */
export interface EventsPageTemplateProps {
  children: unknown
  className?: string
}

/**
 * Utility function types
 */
export interface FormatEventDateOptions {
  format?: 'short' | 'long' | 'relative'
  locale?: string
}

export interface FormatEventPriceOptions {
  currency?: string
  locale?: string
}