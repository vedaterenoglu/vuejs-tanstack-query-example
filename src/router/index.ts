/**
 * @file index.ts
 * @role Vue Router configuration with route definitions
 * @patterns Singleton Pattern, Factory Pattern, Guard Pattern
 * @solid SRP (Routing management only), OCP (Extensible for new routes)
 * @ssot URL is the single source of truth for navigation state
 */

import { createRouter, createWebHistory } from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

/**
 * Route definitions with lazy loading for code splitting
 * Following atomic design hierarchy for page components
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomePage.vue'),
    meta: {
      title: 'Home',
      requiresAuth: false,
    },
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('@/views/EventsPage.vue'),
    meta: {
      title: 'Events',
      requiresAuth: false,
    },
  },
  {
    path: '/test-hero',
    name: 'test-hero',
    component: () => import('@/views/TestEventHeroSection.vue'),
    meta: {
      title: 'Test Hero Section',
      requiresAuth: false,
    },
  },
  {
    path: '/events/:slug',
    name: 'event-detail',
    component: () => import('@/views/SingleEventPage.vue'),
    meta: {
      title: 'Event Details',
      requiresAuth: false,
    },
    props: true,
  },
  {
    path: '/authenticated',
    name: 'authenticated',
    component: () => import('@/views/Authenticated.vue'),
    meta: {
      title: 'Dashboard',
      requiresAuth: true,
    },
  },
  {
    path: '/payment/success',
    name: 'payment-success',
    component: () => import('@/views/PaymentSuccessPage.vue'),
    meta: {
      title: 'Payment Success',
      requiresAuth: true,
    },
  },
  {
    path: '/payment/cancel',
    name: 'payment-cancel',
    component: () => import('@/views/PaymentCancelPage.vue'),
    meta: {
      title: 'Payment Cancelled',
      requiresAuth: false,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundPage.vue'),
    meta: {
      title: '404 - Page Not Found',
      requiresAuth: false,
    },
  },
]

/**
 * Create router instance with history mode
 * Singleton pattern - single router instance for the application
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    // Restore scroll position on browser back/forward
    if (savedPosition) {
      return savedPosition
    }
    // Scroll to anchor if present
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // Scroll to top for new navigation
    return { top: 0 }
  },
})

/**
 * Global navigation guard for authentication
 * Guard Pattern - protects routes requiring authentication
 */
router.beforeEach((to, _from, next) => {
  // Update document title
  const title = to.meta.title as string | undefined
  document.title = `${title || 'App'} | Vue Events`

  // Check authentication requirement
  if (to.meta.requiresAuth) {
    // TODO: Implement actual auth check with Clerk
    // For now, proceed with navigation
    next()
  } else {
    next()
  }
})

export default router
