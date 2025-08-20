# 📚 API Reference

> **Complete API documentation for services, composables, and utilities**

## 🌐 Service APIs

### EventService

```typescript
import { eventService } from '@/services/api/eventService'
```

#### Methods

##### `getEvents()`
Fetches all available events.

```typescript
async getEvents(): Promise<Event[]>
```

**Returns:** Array of Event objects

**Example:**
```typescript
const events = await eventService.getEvents()
```

##### `getEvent(slug)`
Fetches a single event by slug.

```typescript
async getEvent(slug: string): Promise<Event>
```

**Parameters:**
- `slug` (string): The event's unique slug

**Returns:** Event object

**Example:**
```typescript
const event = await eventService.getEvent('summer-concert-2024')
```

##### `getEventsByCity(cityId)`
Fetches events for a specific city.

```typescript
async getEventsByCity(cityId: string): Promise<Event[]>
```

**Parameters:**
- `cityId` (string): The city's ID

**Returns:** Array of Event objects

**Example:**
```typescript
const events = await eventService.getEventsByCity('nyc')
```

### CityService

```typescript
import { cityService } from '@/services/api/cityService'
```

#### Methods

##### `getCities()`
Fetches all available cities.

```typescript
async getCities(): Promise<City[]>
```

**Returns:** Array of City objects

**Example:**
```typescript
const cities = await cityService.getCities()
```

##### `getCity(id)`
Fetches a single city by ID.

```typescript
async getCity(id: string): Promise<City>
```

**Parameters:**
- `id` (string): The city's ID

**Returns:** City object

### PaymentService

```typescript
import { paymentService } from '@/services/payment/paymentService'
```

#### Methods

##### `processPayment(request)`
Processes a payment request.

```typescript
async processPayment(request: PaymentRequest): Promise<PaymentResponse>
```

**Parameters:**
```typescript
interface PaymentRequest {
  eventSlug: string
  quantity: number
  successUrl: string
  cancelUrl: string
}
```

**Returns:**
```typescript
interface PaymentResponse {
  checkoutUrl: string
  sessionId: string
}
```

**Example:**
```typescript
const response = await paymentService.processPayment({
  eventSlug: 'concert-2024',
  quantity: 2,
  successUrl: 'https://app.com/success',
  cancelUrl: 'https://app.com/cancel'
})
```

## 🎣 Composables API

### useEvents

```typescript
import { useEvents } from '@/composables/useEvents'
```

Fetches and manages events data.

```typescript
function useEvents(options?: UseEventsOptions): UseEventsReturn
```

**Options:**
```typescript
interface UseEventsOptions {
  cityId?: Ref<string>
  enabled?: Ref<boolean>
}
```

**Returns:**
```typescript
interface UseEventsReturn {
  data: Ref<Event[] | undefined>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error | null>
  refetch: () => Promise<void>
}
```

**Example:**
```typescript
const { data: events, isLoading } = useEvents({
  cityId: ref('nyc')
})
```

### useEvent

```typescript
import { useEvent } from '@/composables/useEvent'
```

Fetches a single event.

```typescript
function useEvent(slug: Ref<string>): UseEventReturn
```

**Example:**
```typescript
const route = useRoute()
const { data: event, isLoading } = useEvent(
  computed(() => route.params.slug as string)
)
```

### useCities

```typescript
import { useCities } from '@/composables/useCities'
```

Fetches and manages cities data.

```typescript
function useCities(): UseCitiesReturn
```

**Returns:**
```typescript
interface UseCitiesReturn {
  data: Ref<City[] | undefined>
  isLoading: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error | null>
  refetch: () => Promise<void>
}
```

### useAuth

```typescript
import { useAuth } from '@/composables/useAuth'
```

Manages authentication state.

```typescript
function useAuth(): UseAuthReturn
```

**Returns:**
```typescript
interface UseAuthReturn {
  user: Ref<User | null>
  isSignedIn: Ref<boolean>
  isLoading: Ref<boolean>
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => Promise<void>
}
```

### usePayment

```typescript
import { usePayment } from '@/composables/usePayment'
```

Handles payment processing.

```typescript
function usePayment(): UsePaymentReturn
```

**Returns:**
```typescript
interface UsePaymentReturn {
  processPayment: (request: PaymentRequest) => Promise<PaymentResponse>
  isProcessing: Ref<boolean>
  error: Ref<Error | null>
}
```

### useDebounce

```typescript
import { useDebounce } from '@/composables/useDebounce'
```

Debounces a value.

```typescript
function useDebounce<T>(
  value: Ref<T>,
  delay: number = 300
): Ref<T>
```

**Example:**
```typescript
const searchQuery = ref('')
const debouncedQuery = useDebounce(searchQuery, 500)

watch(debouncedQuery, (newValue) => {
  // Triggered after 500ms of no changes
  performSearch(newValue)
})
```

## 🧩 Component APIs

### Atom Components

#### Button

```vue
<Button
  variant="primary"
  size="md"
  :disabled="false"
  @click="handleClick"
>
  Click me
</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' | 'danger'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean

**Events:**
- `click`: Emitted when clicked

#### Input

```vue
<Input
  v-model="value"
  type="text"
  placeholder="Enter text..."
  :error="errorMessage"
/>
```

**Props:**
- `modelValue`: string | number
- `type`: 'text' | 'email' | 'password' | 'number'
- `placeholder`: string
- `error`: string
- `disabled`: boolean

### Molecule Components

#### SearchBox

```vue
<SearchBox
  v-model="searchQuery"
  placeholder="Search..."
  :debounce="300"
  @search="handleSearch"
/>
```

**Props:**
- `modelValue`: string
- `placeholder`: string
- `debounce`: number (milliseconds)
- `showClear`: boolean

**Events:**
- `update:modelValue`: Value changed
- `search`: Search triggered
- `clear`: Clear button clicked

#### EventCard

```vue
<EventCard
  :event="event"
  :selected="false"
  @click="selectEvent"
/>
```

**Props:**
- `event`: Event object
- `selected`: boolean
- `showBadge`: boolean

### Organism Components

#### EventGrid

```vue
<EventGrid
  :events="events"
  :loading="isLoading"
  :columns="3"
  @select="handleEventSelect"
/>
```

**Props:**
- `events`: Event[]
- `loading`: boolean
- `columns`: 1 | 2 | 3 | 4
- `gap`: 'sm' | 'md' | 'lg'

#### PaymentModal

```vue
<PaymentModal
  :open="showModal"
  :event="selectedEvent"
  :quantity="2"
  @confirm="processPayment"
  @close="closeModal"
/>
```

**Props:**
- `open`: boolean
- `event`: Event
- `quantity`: number
- `processing`: boolean

**Events:**
- `confirm`: Payment confirmed
- `close`: Modal closed

## 🔧 Utility Functions

### Validators

```typescript
import { validators } from '@/utils/validators'
```

#### `isValidEmail(email)`
Validates email format.

```typescript
isValidEmail(email: string): boolean
```

#### `isValidPhone(phone)`
Validates phone number.

```typescript
isValidPhone(phone: string): boolean
```

#### `isValidDate(date)`
Validates date.

```typescript
isValidDate(date: string | Date): boolean
```

### Formatters

```typescript
import { formatters } from '@/utils/formatters'
```

#### `formatCurrency(amount)`
Formats number as currency.

```typescript
formatCurrency(amount: number): string
// Example: formatCurrency(99.99) => "$99.99"
```

#### `formatDate(date)`
Formats date.

```typescript
formatDate(date: Date, format?: string): string
// Example: formatDate(new Date()) => "Jan 1, 2024"
```

#### `formatPhone(phone)`
Formats phone number.

```typescript
formatPhone(phone: string): string
// Example: formatPhone("1234567890") => "(123) 456-7890"
```

### Performance Utilities

```typescript
import { debounce, throttle, memoize } from '@/utils/performance'
```

#### `debounce(fn, delay)`
Debounces a function.

```typescript
debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T & { cancel: () => void }
```

#### `throttle(fn, limit)`
Throttles a function.

```typescript
throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): T & { cancel: () => void }
```

#### `memoize(fn, options)`
Memoizes a function.

```typescript
memoize<T extends (...args: any[]) => any>(
  fn: T,
  options?: MemoizeOptions
): T & { clear: () => void }
```

## 📦 Type Definitions

### Core Types

```typescript
interface Event {
  id: string
  slug: string
  name: string
  description: string
  date: Date
  location: string
  price: number
  imageUrl: string
  capacity: number
  availableTickets: number
}

interface City {
  id: string
  name: string
  country: string
  imageUrl: string
  eventCount: number
}

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
}

interface PaymentRequest {
  eventSlug: string
  quantity: number
  successUrl: string
  cancelUrl: string
}

interface PaymentResponse {
  checkoutUrl: string
  sessionId: string
  amount: number
}
```

## 🔌 HTTP Client API

### Configuration

```typescript
import { httpClient } from '@/lib/http'

// Configure base URL
httpClient.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

// Add auth header
httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})
```

### Methods

```typescript
// GET request
const data = await httpClient.get<T>('/endpoint')

// POST request
const result = await httpClient.post<T>('/endpoint', payload)

// PUT request
const updated = await httpClient.put<T>('/endpoint/:id', data)

// DELETE request
await httpClient.delete('/endpoint/:id')
```

## 🎨 Theme API

### CSS Variables

```css
/* Available CSS variables */
--color-primary: #3b82f6;
--color-secondary: #8b5cf6;
--color-success: #10b981;
--color-danger: #ef4444;
--color-warning: #f59e0b;

--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-full: 9999px;
```

## 🔐 Environment Variables

```typescript
// Access environment variables
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appName = import.meta.env.VITE_APP_NAME
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
```

## 📝 Next Steps

- Review [Architecture Guide](ARCHITECTURE.md) for system design
- Check [Deployment Guide](DEPLOYMENT.md) for production setup
- See [Troubleshooting](TROUBLESHOOTING.md) for common issues
- Read [Contributing Guide](CONTRIBUTING.md) to contribute

---

[← Back to README](../../../README.md) | [Next: Deployment Guide →](DEPLOYMENT.md)