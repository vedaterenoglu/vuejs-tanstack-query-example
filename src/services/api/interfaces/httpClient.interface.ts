/**
 * @file httpClient.interface.ts
 * @role HTTP client type definitions
 * @patterns Interface Segregation Pattern
 * @solid ISP (Interface Segregation), DIP (Dependency Inversion)
 */

/**
 * HTTP request configuration
 */
export interface HttpRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number | boolean>
}

/**
 * HTTP response structure
 */
export interface HttpResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Headers
}

/**
 * HTTP error structure
 */
export interface HttpError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

/**
 * HTTP client interface
 *
 * Defines contract for HTTP client implementations.
 * Follows Interface Segregation Principle with focused methods.
 *
 * Design Patterns:
 * - Adapter Pattern: Allows different HTTP implementations
 * - Generic Pattern: Type-safe responses
 */
export interface HttpClient {
  get<T>(
    url: string,
    config?: Omit<HttpRequestConfig, 'method'>
  ): Promise<HttpResponse<T>>

  post<T>(
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, 'method' | 'body'>
  ): Promise<HttpResponse<T>>

  put<T>(
    url: string,
    data?: unknown,
    config?: Omit<HttpRequestConfig, 'method' | 'body'>
  ): Promise<HttpResponse<T>>

  delete<T>(
    url: string,
    config?: Omit<HttpRequestConfig, 'method'>
  ): Promise<HttpResponse<T>>
}
