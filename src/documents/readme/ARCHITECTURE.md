# 🏗️ Architecture Guide

> **System design and architectural patterns of the Vue.js Event Booking Platform**

## 📐 Architectural Overview

The application follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│                  Presentation Layer              │
│         (Vue Components, Views, Routes)          │
├─────────────────────────────────────────────────┤
│                 Business Logic Layer             │
│        (Composables, Stores, Utilities)          │
├─────────────────────────────────────────────────┤
│                  Service Layer                   │
│         (API Services, External Services)        │
├─────────────────────────────────────────────────┤
│                    Data Layer                    │
│      (TanStack Query, Adapters, Validators)      │
└─────────────────────────────────────────────────┘
```

## 🎯 Design Principles

### SOLID Principles Implementation

#### Single Responsibility Principle (SRP)
Each component/module has one reason to change:

```typescript
// ✅ Good: Single responsibility
export class EventService {
  async getEvents(): Promise<Event[]> { }
  async getEvent(slug: string): Promise<Event> { }
}

// ❌ Bad: Multiple responsibilities
export class EventManager {
  async getEvents() { }
  async validateEvent() { }
  async renderEvent() { }
  async cacheEvent() { }
}
```

#### Open/Closed Principle (OCP)
Components are open for extension, closed for modification:

```vue
<!-- Base component open for extension via slots -->
<template>
  <Card>
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </Card>
</template>
```

#### Liskov Substitution Principle (LSP)
Derived components can replace base components:

```typescript
interface IApiClient {
  get<T>(url: string): Promise<T>
  post<T>(url: string, data: unknown): Promise<T>
}

class HttpClient implements IApiClient { }
class MockClient implements IApiClient { }
```

#### Interface Segregation Principle (ISP)
Interfaces are specific and focused:

```typescript
// Segregated interfaces
interface Readable {
  read(): Promise<Data>
}

interface Writable {
  write(data: Data): Promise<void>
}

interface Deletable {
  delete(id: string): Promise<void>
}
```

#### Dependency Inversion Principle (DIP)
High-level modules don't depend on low-level modules:

```typescript
// High-level module depends on abstraction
export function useEvents(apiClient: IApiClient) {
  return useQuery({
    queryFn: () => apiClient.get('/events')
  })
}
```

## 🧩 Component Architecture

### Atomic Design Pattern

```
atoms/          # Basic building blocks (50 lines max)
├── Button.vue
├── Input.vue
└── Label.vue

molecules/      # Composed components (100 lines max)
├── SearchBox.vue
├── EventCard.vue
└── FormField.vue

organisms/      # Complex features (150 lines max)
├── EventGrid.vue
├── PaymentModal.vue
└── NavigationBar.vue

templates/      # Page layouts
├── DefaultLayout.vue
└── AuthLayout.vue

pages/          # Route components
├── HomePage.vue
└── EventPage.vue
```

### Component Composition Pattern

```vue
<!-- Container Component -->
<script setup lang="ts">
import { useEventLogic } from '@/composables/useEventLogic'
import EventPresenter from './EventPresenter.vue'

const { events, loading, error, refetch } = useEventLogic()
</script>

<template>
  <EventPresenter
    :events="events"
    :loading="loading"
    :error="error"
    @refresh="refetch"
  />
</template>
```

## 📊 State Management

### State Categories

1. **Server State** - Managed by TanStack Query
2. **Client State** - Managed by Pinia
3. **Form State** - Managed by Vee-Validate
4. **URL State** - Managed by Vue Router
5. **UI State** - Component local state

### TanStack Query Architecture

```typescript
// Query key factory pattern
export const queryKeys = {
  all: ['events'] as const,
  lists: () => [...queryKeys.all, 'list'] as const,
  list: (filters: EventFilters) => 
    [...queryKeys.lists(), filters] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (id: string) => 
    [...queryKeys.details(), id] as const,
}

// Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 minutes
      gcTime: 10 * 60 * 1000,         // 10 minutes
      retry: 3,
      retryDelay: attemptIndex => 
        Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})
```

### Pinia Store Pattern

```typescript
// Feature-based store organization
export const useEventStore = defineStore('events', () => {
  // State
  const selectedEvent = ref<Event | null>(null)
  const filters = reactive<EventFilters>({})
  
  // Getters
  const hasActiveFilters = computed(() => 
    Object.keys(filters).length > 0
  )
  
  // Actions
  const selectEvent = (event: Event) => {
    selectedEvent.value = event
  }
  
  return {
    selectedEvent: readonly(selectedEvent),
    filters: readonly(filters),
    hasActiveFilters,
    selectEvent,
  }
})
```

## 🔌 Service Layer

### Service Architecture

```typescript
// Base HTTP client
class HttpClient {
  private baseURL: string
  private timeout: number
  
  constructor(config: HttpConfig) {
    this.baseURL = config.baseURL
    this.timeout = config.timeout
  }
  
  async request<T>(config: RequestConfig): Promise<T> {
    // Implementation with error handling
  }
}

// Service facade
class EventService {
  constructor(private http: HttpClient) {}
  
  async getEvents(): Promise<Event[]> {
    const response = await this.http.get('/events')
    return EventAdapter.adaptList(response)
  }
}

// Singleton instance
export const eventService = new EventService(httpClient)
```

### Adapter Pattern

```typescript
// Transform external API data to internal format
export class EventAdapter {
  static adapt(data: ApiEvent): Event {
    return {
      id: data.event_id,
      name: data.event_name,
      date: new Date(data.event_date),
      price: data.ticket_price / 100, // cents to dollars
      imageUrl: data.image_url || DEFAULT_IMAGE,
    }
  }
  
  static adaptList(data: ApiEvent[]): Event[] {
    return data.map(EventAdapter.adapt)
  }
}
```

## 🛡️ Error Handling

### Error Boundary Pattern

```vue
<!-- ErrorBoundary.vue -->
<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err
  logError(err)
  return false
})
</script>

<template>
  <slot v-if="!error" />
  <ErrorFallback v-else :error="error" @retry="error = null" />
</template>
```

### Global Error Handler

```typescript
// Global error handling
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  
  // Report to error tracking service
  if (import.meta.env.PROD) {
    errorReporter.report(err, { instance, info })
  }
}
```

## 🚀 Performance Patterns

### Code Splitting

```typescript
// Route-based code splitting
const routes = [
  {
    path: '/events/:slug',
    component: () => import('@/views/EventPage.vue'),
  },
]
```

### Lazy Loading

```vue
<!-- Component lazy loading -->
<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent({
  loader: () => import('./HeavyComponent.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000,
})
</script>
```

### Memoization

```typescript
// Memoize expensive computations
import { memoize } from '@/utils/memoize'

const expensiveCalculation = memoize(
  (data: ComplexData) => {
    // Expensive computation
    return result
  },
  { maxSize: 10, ttl: 60000 }
)
```

## 🔒 Security Patterns

### Input Validation

```typescript
// Zod schema validation
const EventSchema = z.object({
  name: z.string().min(1).max(100),
  date: z.date().min(new Date()),
  price: z.number().positive(),
  capacity: z.number().int().positive(),
})

// Validate before processing
const validateEvent = (data: unknown): Event => {
  return EventSchema.parse(data)
}
```

### XSS Prevention

```vue
<!-- Always use v-text or {{ }} for user content -->
<div v-text="userContent" />
<div>{{ userContent }}</div>

<!-- Never use v-html with user content -->
<!-- ❌ <div v-html="userContent" /> -->
```

## 📁 Project Structure

```
src/
├── components/              # UI components (Atomic Design)
│   ├── [feature]/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── containers/
│   │   ├── composables/
│   │   ├── types/
│   │   └── utils/
│   └── ui/                 # Shared UI components
│
├── composables/            # Vue composition functions
│   ├── useAuth.ts
│   ├── useEvents.ts
│   └── usePayment.ts
│
├── services/               # External services
│   ├── api/               # API clients
│   ├── auth/              # Authentication
│   └── payment/           # Payment processing
│
├── stores/                 # Pinia stores
│   ├── appStore.ts
│   └── userStore.ts
│
├── lib/                    # Core utilities
│   ├── config/            # Configuration
│   ├── constants/         # Constants
│   └── utils/             # Utilities
│
├── router/                 # Vue Router
│   └── index.ts
│
├── views/                  # Page components
│   ├── HomePage.vue
│   └── EventPage.vue
│
└── App.vue                 # Root component
```

## 🔄 Data Flow

```
User Action
    ↓
Vue Component
    ↓
Composable/Store
    ↓
Service Layer
    ↓
External API
    ↓
Adapter/Validator
    ↓
TanStack Query Cache
    ↓
Component Update
```

## 📋 Best Practices

### Component Guidelines

1. **Keep components small** - Max 150 lines
2. **Use composition API** - Better TypeScript support
3. **Extract logic to composables** - Reusability
4. **Follow naming conventions** - PascalCase for components
5. **Document with JSDoc** - Better IDE support

### Performance Guidelines

1. **Use v-memo for lists** - Optimize re-renders
2. **Lazy load routes** - Reduce initial bundle
3. **Debounce user input** - Reduce API calls
4. **Cache API responses** - TanStack Query
5. **Optimize images** - Use appropriate formats

### Security Guidelines

1. **Validate all inputs** - Use Zod schemas
2. **Sanitize user content** - Prevent XSS
3. **Use environment variables** - Hide secrets
4. **Implement CSP headers** - Content security
5. **Regular dependency updates** - Security patches

## 🚀 Next Steps

- Review [API Reference](API.md) for service documentation
- Check [Contributing Guide](CONTRIBUTING.md) for development
- See [Deployment Guide](DEPLOYMENT.md) for production setup
- Read [Troubleshooting](TROUBLESHOOTING.md) for common issues

---

[← Back to README](../../../README.md) | [Next: Contributing Guide →](CONTRIBUTING.md)