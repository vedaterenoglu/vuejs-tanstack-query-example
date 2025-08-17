/**
 * @file index.ts
 * @role Barrel export for view components
 * @patterns Barrel Export Pattern
 * @solid SRP (Export management only)
 */

// Page view components
export { default as Authenticated } from './Authenticated.vue'
export { default as EventsListPage } from './EventsListPage.vue'
export { default as HomePage } from './HomePage.vue'
export { default as NotFoundPage } from './NotFoundPage.vue'
export { default as PaymentCancelPage } from './PaymentCancelPage.vue'
export { default as PaymentSuccessPage } from './PaymentSuccessPage.vue'
export { default as SingleEventPage } from './SingleEventPage.vue'
