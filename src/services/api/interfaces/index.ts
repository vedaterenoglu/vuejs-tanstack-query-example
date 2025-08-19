/**
 * @file index.ts
 * @role Barrel export for API interfaces
 * @patterns Barrel Export Pattern, Interface Segregation Pattern
 * @solid SRP (Export management only), ISP (Focused interfaces)
 */

// HTTP client interfaces
export type {
  HttpClient,
  HttpError,
  HttpRequestConfig,
  HttpResponse,
} from './httpClient.interface'
