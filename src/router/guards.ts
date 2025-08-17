/**
 * @file guards.ts
 * @role Route navigation guards for authentication and authorization
 * @patterns Guard Pattern, Strategy Pattern
 * @solid SRP (Authentication guard only), OCP (Extensible for new guard types)
 * @ssot Clerk for authentication state
 */

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

/**
 * Authentication guard to protect routes requiring login
 * Implements Guard Pattern for route protection
 */
export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    // TODO: Replace with actual Clerk authentication check
    // For now, we'll simulate authentication check
    const isAuthenticated = checkAuthentication()

    if (!isAuthenticated) {
      // Redirect to login or home page
      next({
        name: 'home',
        query: { redirect: to.fullPath },
      })
    } else {
      // User is authenticated, proceed
      next()
    }
  } else {
    // Route doesn't require auth, proceed
    next()
  }
}

/**
 * Check if user is authenticated
 * This will be replaced with actual Clerk authentication check
 */
function checkAuthentication(): boolean {
  // TODO: Implement actual Clerk authentication check
  // import { useAuth } from '@clerk/vue'
  // const { isSignedIn } = useAuth()
  // return isSignedIn.value

  // For development, return false to test guard behavior
  return false
}

/**
 * Guest guard to redirect authenticated users away from auth pages
 * Implements Strategy Pattern for different guard strategies
 */
export function guestGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const isAuthenticated = checkAuthentication()

  if (isAuthenticated && to.meta.requiresGuest) {
    // Redirect authenticated users to dashboard
    next({ name: 'authenticated' })
  } else {
    next()
  }
}

/**
 * Role-based access guard
 * Extensible for role-based authorization
 */
export function roleGuard(requiredRole: string) {
  return (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void => {
    // TODO: Implement role checking with Clerk
    const userRole = getUserRole()

    if (to.meta.requiresRole && userRole !== requiredRole) {
      next({ name: 'home' })
    } else {
      next()
    }
  }
}

/**
 * Get user role from authentication context
 * Placeholder for Clerk role management
 */
function getUserRole(): string | null {
  // TODO: Get role from Clerk user metadata
  return null
}

// Extend route meta type for TypeScript
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresGuest?: boolean
    requiresRole?: string
    title?: string
  }
}
