# 🤝 Contributing Guide

> **Development workflow and contribution guidelines for the Vue.js Event Booking Platform**

## 🎯 Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our code of conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## 🚀 Getting Started

### Prerequisites

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vue-tanstack-query-app.git
   cd vue-tanstack-query-app
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/vue-tanstack-query-app.git
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Development Guidelines

#### Component Development

Follow the atomic design pattern:

```vue
<!-- src/components/[feature]/atoms/NewButton.vue -->
<!--
/**
 * @file NewButton.vue
 * @role Button atom component
 * @atomic atom
 * @patterns Button Pattern
 * @solid SRP (Single button responsibility)
 */
-->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface NewButtonProps {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

withDefaults(defineProps<NewButtonProps>(), {
  variant: 'primary',
  disabled: false
})

defineEmits<{
  click: []
}>()
</script>
```

#### Composable Development

```typescript
// src/composables/useNewFeature.ts
/**
 * @file useNewFeature.ts
 * @role New feature composable
 * @patterns Composition API
 * @solid SRP, DIP
 */

import { ref, computed } from 'vue'
import type { NewFeature } from '@/types'

export function useNewFeature(options?: NewFeatureOptions) {
  const state = ref<NewFeature>()
  const loading = ref(false)
  const error = ref<Error | null>(null)
  
  // Computed properties
  const isReady = computed(() => 
    !loading.value && !error.value && !!state.value
  )
  
  // Methods
  const fetchData = async () => {
    loading.value = true
    error.value = null
    
    try {
      const data = await api.getNewFeature()
      state.value = data
    } catch (err) {
      error.value = err as Error
    } finally {
      loading.value = false
    }
  }
  
  return {
    state: readonly(state),
    loading: readonly(loading),
    error: readonly(error),
    isReady,
    fetchData
  }
}
```

### 3. Coding Standards

#### TypeScript Standards

```typescript
// ✅ Good: Explicit types
interface EventData {
  id: string
  name: string
  date: Date
  price: number
}

function processEvent(event: EventData): ProcessedEvent {
  // Implementation
}

// ❌ Bad: Using any
function processEvent(event: any): any {
  // Implementation
}
```

#### Vue Standards

```vue
<!-- ✅ Good: Composition API with TypeScript -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '@/types'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits<{
  update: [user: User]
}>()
</script>

<!-- ❌ Bad: Options API without types -->
<script>
export default {
  props: ['user'],
  methods: {
    updateUser(user) {
      this.$emit('update', user)
    }
  }
}
</script>
```

### 4. Testing Requirements

#### Unit Tests (if implementing)

```typescript
// src/components/[feature]/__tests__/Component.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Component from '../Component.vue'

describe('Component', () => {
  it('renders properly', () => {
    const wrapper = mount(Component, {
      props: {
        title: 'Test Title'
      }
    })
    
    expect(wrapper.text()).toContain('Test Title')
  })
  
  it('emits click event', async () => {
    const wrapper = mount(Component)
    
    await wrapper.trigger('click')
    
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### 5. Documentation Requirements

All code must be documented:

```typescript
/**
 * Fetches events for a specific city
 * 
 * @param cityId - The ID of the city
 * @param options - Optional query parameters
 * @returns Promise with array of events
 * @throws {ApiError} When the API request fails
 * 
 * @example
 * ```typescript
 * const events = await fetchEventsByCity('NYC', { 
 *   limit: 10,
 *   sortBy: 'date' 
 * })
 * ```
 */
export async function fetchEventsByCity(
  cityId: string,
  options?: QueryOptions
): Promise<Event[]> {
  // Implementation
}
```

## 📝 Commit Guidelines

### Commit Message Format

Follow the conventional commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test additions or corrections
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes that don't modify src or test files

### Examples

```bash
# Feature
git commit -m "feat(events): Add event filtering by date"

# Bug fix
git commit -m "fix(payment): Correct total calculation in checkout"

# Documentation
git commit -m "docs(readme): Update installation instructions"

# With body
git commit -m "feat(auth): Implement social login

- Add Google OAuth integration
- Add Facebook login support
- Update login UI with social buttons

Closes #123"
```

## 🔍 Code Review Process

### Before Submitting PR

1. **Run all checks:**
   ```bash
   npm run lint
   npm run format
   npm run type-check
   npm run build
   ```

2. **Self-review checklist:**
   - [ ] Code follows project style guidelines
   - [ ] All tests pass
   - [ ] Documentation is updated
   - [ ] No console.log statements
   - [ ] No commented-out code
   - [ ] Component size < 150 lines
   - [ ] Composables are pure functions
   - [ ] TypeScript types are explicit

3. **Update documentation:**
   - Add JSDoc comments
   - Update README if needed
   - Add usage examples

### Creating Pull Request

1. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create PR with template:
   ```markdown
   ## Description
   Brief description of changes
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## Testing
   - [ ] Unit tests pass
   - [ ] Manual testing completed
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

### Review Process

1. **Automated checks** run on PR
2. **Code review** by maintainers
3. **Feedback addressed** by contributor
4. **Approval** from 1+ maintainers
5. **Merge** to main branch

## 🏗️ Project Structure Guidelines

### Adding New Features

1. **Create feature directory:**
   ```
   src/components/newFeature/
   ├── atoms/
   ├── molecules/
   ├── organisms/
   ├── containers/
   ├── composables/
   ├── types/
   ├── utils/
   └── index.ts
   ```

2. **Export from barrel file:**
   ```typescript
   // src/components/newFeature/index.ts
   export * from './atoms'
   export * from './molecules'
   export * from './organisms'
   export * from './containers'
   ```

3. **Add to router if needed:**
   ```typescript
   // src/router/index.ts
   {
     path: '/new-feature',
     component: () => import('@/views/NewFeaturePage.vue'),
     meta: { requiresAuth: false }
   }
   ```

## 🐛 Reporting Issues

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., macOS]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.0.0]
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
Description of the problem

**Describe the solution**
What you'd like to happen

**Alternatives considered**
Other solutions you've thought about

**Additional context**
Any other information
```

## 📚 Resources

### Learning Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [TanStack Query Docs](https://tanstack.com/query)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Development Tools

- [Vue DevTools](https://devtools.vuejs.org/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)

## 🎉 Recognition

Contributors are recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes

## 📞 Getting Help

- **Discord**: Join our Discord server
- **GitHub Issues**: Search existing issues
- **Documentation**: Check docs first
- **Stack Overflow**: Tag with `vue-tanstack-query`

---

[← Back to README](../../../README.md) | [Next: API Reference →](API.md)