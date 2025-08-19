/**
 * @file index.ts
 * @role Barrel export for payment services
 * @patterns Barrel Export Pattern, Service Pattern
 * @solid SRP (Export management only)
 */

// Export payment service functions
export { processPayment, validatePaymentRequest } from './paymentService'
