# 📘 Usage Guide

> **Common tasks and workflows for the Vue.js Event Booking Platform**

## 🎯 Core Features

### 1. Browsing Cities

Navigate to the home page to see all available cities:

```typescript
// Cities are automatically loaded via TanStack Query
// Data is cached for 5 minutes
const { data: cities, isLoading } = useCities()
```

**User Actions:**
- Click on any city card to view events
- Use the search bar to filter cities
- Cities display event count badges

### 2. Searching for Events

The search feature provides real-time results:

```vue
<!-- Search is debounced by 300ms -->
<SearchBox 
  v-model="searchQuery"
  placeholder="Search cities or events..."
  :debounce="300"
/>
```

**Search Features:**
- Debounced input (300ms delay)
- Searches across cities and events
- Preserves search state during navigation
- Clear button to reset search

### 3. Viewing Event Details

Click on any event to see full details:

```typescript
// Event data is fetched and cached
const { data: event } = useEvent(slug)
```

**Event Page Features:**
- Hero image with event details
- Date, time, and location information
- Ticket pricing and availability
- Purchase button with quantity selector

### 4. Purchasing Tickets

The ticket purchase flow:

1. **Select Quantity**
   ```vue
   <QuantitySelector 
     v-model="quantity"
     :min="1"
     :max="10"
   />
   ```

2. **Review Order**
   - Modal shows order summary
   - Total price calculation
   - Test payment information

3. **Complete Payment**
   ```typescript
   // Payment is processed server-side
   const { mutate: processPayment } = usePayment()
   ```

### 5. Authentication Flow

User authentication via Clerk:

```typescript
// Check authentication status
const { isSignedIn, user } = useAuth()

// Protected routes automatically redirect
if (!isSignedIn) {
  router.push('/sign-in')
}
```

## 💻 Development Workflows

### Working with Components

#### Creating a New Atom Component

```vue
<!-- src/components/[feature]/atoms/MyButton.vue -->
<template>
  <button 
    class="btn"
    :class="[variant, size]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface MyButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<MyButtonProps>(), {
  variant: 'primary',
  size: 'md'
})

defineEmits<{
  click: []
}>()
</script>
```

#### Creating a Molecule Component

```vue
<!-- src/components/[feature]/molecules/EventCard.vue -->
<template>
  <CardWrapper :class="className">
    <CardImage :src="event.image" :alt="event.name" />
    <CardContent>
      <CardTitle>{{ event.name }}</CardTitle>
      <CardDescription>{{ event.description }}</CardDescription>
    </CardContent>
  </CardWrapper>
</template>
```

#### Creating an Organism Component

```vue
<!-- src/components/[feature]/organisms/EventGrid.vue -->
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
      @click="handleEventClick(event)"
    />
  </div>
</template>
```

### Working with Composables

#### Creating a Custom Composable

```typescript
// src/composables/useCustomFeature.ts
export function useCustomFeature() {
  const state = ref<string>('')
  const loading = ref(false)
  
  const fetchData = async () => {
    loading.value = true
    try {
      const data = await api.getData()
      state.value = data
    } finally {
      loading.value = false
    }
  }
  
  return {
    state: readonly(state),
    loading: readonly(loading),
    fetchData
  }
}
```

#### Using TanStack Query

```typescript
// src/composables/useEvents.ts
export function useEvents(cityId: Ref<string>) {
  return useQuery({
    queryKey: ['events', cityId],
    queryFn: () => eventService.getEventsByCity(cityId.value),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: computed(() => !!cityId.value)
  })
}
```

### API Integration

#### Making API Calls

```typescript
// src/services/api/eventService.ts
class EventService {
  async getEvents(): Promise<Event[]> {
    const response = await httpClient.get('/events')
    return eventAdapter.adaptEvents(response.data)
  }
  
  async getEvent(slug: string): Promise<Event> {
    const response = await httpClient.get(`/events/${slug}`)
    return eventAdapter.adaptEvent(response.data)
  }
}

export const eventService = new EventService()
```

#### Error Handling

```typescript
// Global error handling with TanStack Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error.status === 404) return false
        return failureCount < 3
      },
      onError: (error) => {
        toast.error(error.message)
      }
    }
  }
})
```

### State Management

#### Using Pinia Store

```typescript
// src/stores/appStore.ts
export const useAppStore = defineStore('app', () => {
  const searchQuery = ref('')
  const selectedCity = ref<City | null>(null)
  
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }
  
  return {
    searchQuery: readonly(searchQuery),
    selectedCity: readonly(selectedCity),
    setSearchQuery
  }
})
```

## 🧪 Testing Features

### Manual Testing Checklist

#### Home Page
- [ ] City cards load correctly
- [ ] Search filters cities
- [ ] Click navigates to events

#### Event Page
- [ ] Event details display
- [ ] Quantity selector works
- [ ] Purchase button opens modal

#### Payment Flow
- [ ] Modal shows correct total
- [ ] Test card info is displayed
- [ ] Redirect to Stripe works

### Test Mode Features

The app includes test mode for payments:

```typescript
// Test credit card (Stripe)
const TEST_CARD = {
  number: '4242 4242 4242 4242',
  expiry: 'Any future date',
  cvc: 'Any 3 digits',
  zip: 'Any 5 digits'
}
```

## 🎨 Styling and Theming

### Using Tailwind Classes

```vue
<!-- Responsive design with Tailwind -->
<div class="
  w-full
  px-4 sm:px-6 lg:px-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 sm:gap-6
">
  <!-- Content -->
</div>
```

### Component Variants with CVA

```typescript
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)
```

## 🔧 Advanced Features

### Performance Optimization

```typescript
// Lazy loading components
const EventDetails = defineAsyncComponent(
  () => import('@/components/event/organisms/EventDetails.vue')
)

// Memoizing expensive computations
const memoizedCalculation = computed(() => {
  return expensiveFunction(data.value)
})

// Debouncing user input
const debouncedSearch = debounce(search, 300)
```

### Error Boundaries

```vue
<!-- Wrap components with error boundaries -->
<ErrorBoundary :fallback="ErrorFallback">
  <EventGrid :events="events" />
</ErrorBoundary>
```

### Accessibility Features

```vue
<!-- ARIA labels and keyboard navigation -->
<button
  :aria-label="`Select ${city.name}`"
  :aria-pressed="isSelected"
  @click="selectCity"
  @keydown.enter="selectCity"
  @keydown.space.prevent="selectCity"
>
  {{ city.name }}
</button>
```

## 📝 Common Patterns

### Container/Presenter Pattern

```vue
<!-- Container Component -->
<script setup lang="ts">
const { data, loading, error } = useEvents()
const handleAction = () => { /* business logic */ }
</script>

<template>
  <EventPresenter 
    :events="data"
    :loading="loading"
    :error="error"
    @action="handleAction"
  />
</template>
```

### Composition Pattern

```typescript
// Compose multiple composables
export function useEventPage(slug: string) {
  const { data: event, isLoading } = useEvent(slug)
  const { user } = useAuth()
  const { mutate: purchase } = usePurchase()
  
  return {
    event,
    isLoading,
    canPurchase: computed(() => !!user.value),
    purchase
  }
}
```

## 🚀 Next Steps

- Explore the [Architecture Guide](ARCHITECTURE.md) for system design
- Read [API Reference](API.md) for detailed API documentation
- Check [Troubleshooting](TROUBLESHOOTING.md) for common issues
- See [Contributing Guide](CONTRIBUTING.md) to contribute

---

[← Back to README](../../../README.md) | [Next: Architecture Guide →](ARCHITECTURE.md)