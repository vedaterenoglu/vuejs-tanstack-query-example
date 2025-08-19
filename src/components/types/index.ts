/**
 * @file index.ts
 * @role Central TypeScript interfaces for all components
 * @patterns Interface Segregation, Single Source of Truth
 * @solid Interface Segregation Principle (ISP)
 * @ssot Central type definitions
 */

import type { City, Event } from '@/lib/types'

// ============================================================================
// ATOMIC LEVEL: Atoms
// ============================================================================

/**
 * Button component props interface
 * @atomic atom
 */
export interface ButtonProps {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
  onClick?: () => void
}

/**
 * Input component props interface
 * @atomic atom
 */
export interface InputProps {
  type?: string
  placeholder?: string
  value?: string
  disabled?: boolean
  autoFocus?: boolean
  class?: string
  ariaLabel?: string
  role?: string
  ariaExpanded?: boolean
  ariaAutocomplete?: string
  inputMode?: string
}

/**
 * Card component props interface
 * @atomic atom
 */
export interface CardProps {
  class?: string
}

// ============================================================================
// ATOMIC LEVEL: Molecules
// ============================================================================

/**
 * SearchBox component props interface
 * @atomic molecule
 */
export interface SearchBoxProps {
  placeholder?: string
  debounceMs?: number
  onRefresh?: () => void
  autoFocus?: boolean
  disabled?: boolean
  className?: string
  showRefreshButton?: boolean
  searchQuery?: string
  onSearchChange?: (value: string) => void
}

/**
 * CityCard component props interface
 * @atomic molecule
 */
export interface CityCardProps {
  city: City
  onSelect?: (city: City) => void
  disabled?: boolean
  showSelectButton?: boolean
}

/**
 * ScrollAnimateWrapper component props interface
 * @atomic molecule
 */
export interface ScrollAnimateWrapperProps {
  animation?: 'fadeIn' | 'fadeUp' | 'fadeDown' | 'slideIn' | 'zoomIn'
  duration?: number
  delay?: number
  once?: boolean
  threshold?: number
  className?: string
}

// ============================================================================
// ATOMIC LEVEL: Organisms
// ============================================================================

/**
 * CityGrid component props interface
 * @atomic organism
 */
export interface CityGridProps {
  cities: City[]
  hasResults?: boolean
  isLoading?: boolean
  isSearchActive?: boolean
  searchQuery?: string
  filteredCount?: number
  maxCities?: number
  gridClasses?: string
  onCitySelect?: (city: City) => void
  showSelectButton?: boolean
  className?: string
}

/**
 * SearchSection component props interface
 * @atomic organism
 */
export interface SearchSectionProps {
  onRefresh?: () => void
  placeholder?: string
  debounceMs?: number
  autoFocus?: boolean
  showRefreshButton?: boolean
  searchQuery?: string
  onSearchChange?: (value: string) => void
}

/**
 * Navbar component props interface
 * @atomic organism
 */
export interface NavbarProps {
  isDarkMode?: boolean
  onThemeToggle?: () => void
  currentRoute?: string
}

/**
 * Footer component props interface
 * @atomic organism
 */
export interface FooterProps {
  brandName?: string
  currentYear?: number
}

// ============================================================================
// ATOMIC LEVEL: Templates
// ============================================================================

/**
 * Layout component props interface
 * @atomic template
 */
export interface LayoutProps {
  className?: string
}

// ============================================================================
// CONTAINER/PRESENTER PATTERN
// ============================================================================

/**
 * Container component props (business logic)
 */
export interface ContainerProps<T> {
  data?: T
  loading?: boolean
  error?: Error | null
  onRetry?: () => void
}

/**
 * Presenter component props (UI only)
 */
export interface PresenterProps<T> {
  data: T
  className?: string
  disabled?: boolean
}

// ============================================================================
// COMPOSABLE RETURN TYPES
// ============================================================================

/**
 * Debounce composable return type
 */
export interface UseDebounceReturn {
  debouncedValue: string
  isPending: boolean
  cancel: () => void
}

/**
 * Intersection Observer composable return type
 */
export interface UseIntersectionObserverReturn {
  isIntersecting: boolean
  disconnect: () => void
}

/**
 * Animation composable return type
 */
export interface UseAnimationReturn {
  animationClass: string
  isAnimating: boolean
  triggerAnimation: () => void
}

// ============================================================================
// ERROR BOUNDARY
// ============================================================================

/**
 * Error Boundary component props
 */
export interface ErrorBoundaryProps {
  fallback?: string
  onError?: (error: Error) => void
}

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Type guard for City type
 */
export const isCity = (obj: unknown): obj is City => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'citySlug' in obj &&
    'city' in obj
  )
}

/**
 * Type guard for Event type
 */
export const isEvent = (obj: unknown): obj is Event => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'eventId' in obj &&
    'title' in obj
  )
}

// Export all interfaces for barrel export pattern
export type { City, Event }
