# City Components Usage Guide

## Overview
City components follow atomic design principles with strict SOLID compliance and component decomposition.

## Architecture

### Atomic Design Hierarchy
- **Atoms**: Basic UI elements (buttons, images, wrappers)
- **Molecules**: Simple component groups (cards, overlays)
- **Organisms**: Complex components (grids, error boundaries)
- **Templates**: Page layouts (presentation components)
- **Containers**: Business logic components

### Design Patterns
- Container/Presenter Pattern
- Composition API Pattern
- Error Boundary Pattern
- Virtual Scrolling Pattern
- Memoization Pattern

## Component Usage

### Basic City Grid
```vue
<template>
  <CityContainer
    :cities="cities"
    :is-loading="isLoading"
    title="Select a City"
  />
</template>

<script setup lang="ts">
import { CityContainer } from '@/components/cities'
import { useCities } from '@/components/cities/composables'

const { cities, isLoading } = useCities()
</script>
```

### City Card with Custom Actions
```vue
<template>
  <CityCard
    :city="city"
    :disabled="isProcessing"
    @select="handleCitySelect"
  />
</template>

<script setup lang="ts">
import { CityCard } from '@/components/cities'

const handleCitySelect = (city: City) => {
  console.log('Selected:', city.citySlug)
}
</script>
```

### Error Boundary Usage
```vue
<template>
  <CityErrorBoundary
    :show-retry="true"
    @error="logError"
    @retry="refetchData"
  >
    <CityGrid :cities="cities" />
  </CityErrorBoundary>
</template>
```

## Composables

### useCities - Data Fetching
```typescript
const { cities, isLoading, error, refetch } = useCities()
```

### useCityCard - Card Logic
```typescript
const {
  isHovered,
  isSelected,
  handleSelectClick,
  handleMouseEnter,
  handleMouseLeave,
} = useCityCard({ city, onSelect })
```

### useFocusManagement - Accessibility
```typescript
const { focusFirst, focusNext, handleKeyNavigation } = useFocusManagement({
  containerRef,
  loop: true,
})
```

### useVirtualScroll - Performance
```typescript
const { visibleItems, scrollToIndex } = useVirtualScroll(cities, {
  itemHeight: 200,
  containerHeight: 600,
  buffer: 3,
})
```

## Utilities

### Formatting
```typescript
import { formatCityName, formatSearchResults } from '@/components/cities/utils'

const displayName = formatCityName(city.city)
const results = formatSearchResults(filtered, total, searchTerm)
```

### Validation
```typescript
import { isValidCity, sanitizeCityData } from '@/components/cities/utils'

if (isValidCity(data)) {
  const clean = sanitizeCityData(data)
}
```

### Performance
```typescript
import { memoize, debounce, createShallowState } from '@/components/cities/utils'

const memoizedSearch = memoize(searchFunction)
const debouncedUpdate = debounce(updateFunction, 300)
const { state, update } = createShallowState(initialData)
```

## Directives

### Lazy Loading Images
```vue
<template>
  <img
    v-lazy-load="imageUrl"
    :alt="city.alt"
    class="city-image"
  />
</template>

<script setup lang="ts">
import { vLazyLoad } from '@/components/cities/directives'
</script>
```

## Accessibility Features

### Skip Links
```vue
<CitySkipLink href="#main-content" text="Skip to cities" />
```

### Screen Reader Announcements
```vue
<CityAnnouncer
  :announcement="statusMessage"
  priority="polite"
/>
```

### Keyboard Navigation
- Arrow keys: Navigate between cities
- Enter/Space: Select city
- Tab: Focus next element
- Home/End: Jump to first/last
- Escape: Clear selection

## Performance Optimizations

### Memoization
All expensive computations are memoized using the `memoize` utility.

### Virtual Scrolling
Large lists automatically use virtual scrolling for optimal performance.

### Lazy Loading
Images load on-demand using Intersection Observer or native lazy loading.

### ShallowRef
Large data structures use `shallowRef` for optimized reactivity.

## TypeScript Support

All components are fully typed with comprehensive interfaces:

```typescript
import type {
  CityCardProps,
  UseCitiesReturn,
  CityFilterOptions,
} from '@/components/cities/types'
```

## Testing

Components follow these testing principles:
- Unit tests for utilities and composables
- Component tests for UI components
- Integration tests for data flow
- Accessibility tests for WCAG compliance

## Best Practices

1. **Always use container components** for business logic
2. **Keep components under size limits** (50/100/150 lines)
3. **Follow atomic design hierarchy** strictly
4. **Use composables** for reusable logic
5. **Apply SOLID principles** consistently
6. **Handle errors gracefully** with boundaries
7. **Optimize performance** proactively
8. **Ensure accessibility** compliance

## File Structure
```
cities/
├── atoms/           # Basic UI elements
├── molecules/       # Simple component groups
├── organisms/       # Complex components
├── templates/       # Page layouts
├── containers/      # Business logic
├── presentation/    # Pure UI components
├── composables/     # Reusable logic
├── utils/          # Utility functions
├── directives/     # Vue directives
├── types/          # TypeScript interfaces
└── index.ts        # Barrel exports
```