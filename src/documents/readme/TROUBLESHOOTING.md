# 🔧 Troubleshooting Guide

> **Solutions to common issues in the Vue.js Event Booking Platform**

## 🚨 Common Issues

### Installation Issues

#### npm install fails

**Error:** `npm ERR! code ERESOLVE`

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Remove lock file and node_modules
rm -rf node_modules package-lock.json

# Reinstall with legacy peer deps
npm install --legacy-peer-deps
```

#### Node version mismatch

**Error:** `The engine "node" is incompatible with this module`

**Solution:**
```bash
# Check current version
node --version

# Use nvm to switch to correct version
nvm install 18
nvm use 18

# Or update Node.js
# Download from nodejs.org
```

#### Permission denied errors

**Error:** `EACCES: permission denied`

**Solution:**
```bash
# macOS/Linux
sudo npm install

# Or change npm default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Development Server Issues

#### Port already in use

**Error:** `Port 3061 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :3061

# Kill the process
kill -9 [PID]

# Or use a different port in vite.config.ts
export default defineConfig({
  server: {
    port: 3062
  }
})
```

#### Hot reload not working

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev

# If using WSL2, add to vite.config.ts
server: {
  watch: {
    usePolling: true
  }
}
```

#### CORS errors

**Error:** `Access to fetch at 'http://localhost:3060' from origin 'http://localhost:3061' has been blocked by CORS`

**Solution:**
1. Check API server CORS configuration
2. Add proxy to `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3060',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### TypeScript Issues

#### Type errors in IDE but not in build

**Solution:**
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Clear TypeScript cache
rm -rf node_modules/.cache/typescript

# Rebuild TypeScript
npm run type-check
```

#### Cannot find module errors

**Error:** `Cannot find module '@/components/...'`

**Solution:**
```typescript
// Check tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

// Restart IDE
```

#### Generic type errors

**Error:** `Type 'unknown' is not assignable to type 'Event'`

**Solution:**
```typescript
// Add proper type assertions
const event = data as Event

// Or validate with Zod
const event = EventSchema.parse(data)
```

### Component Issues

#### Component not rendering

**Checklist:**
1. Check import path is correct
2. Verify component is exported
3. Check for console errors
4. Verify props are passed correctly

**Example fix:**
```vue
<!-- Wrong -->
<MyComponent :prop="value" />

<!-- Correct -->
<MyComponent :my-prop="value" />
```

#### Props not updating

**Solution:**
```vue
<script setup lang="ts">
// Use computed for reactive props
const processedProp = computed(() => {
  return props.value?.toLowerCase()
})

// Or watch for changes
watch(() => props.value, (newValue) => {
  // Handle change
})
</script>
```

#### Slots not working

**Solution:**
```vue
<!-- Parent -->
<MyComponent>
  <template #header>
    <h1>Header Content</h1>
  </template>
  <template #default>
    <p>Default slot content</p>
  </template>
</MyComponent>

<!-- Child -->
<template>
  <div>
    <slot name="header" />
    <slot />
  </div>
</template>
```

### TanStack Query Issues

#### Query not refetching

**Solution:**
```typescript
// Force refetch
const { refetch } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents,
})

// Manual refetch
await refetch()

// Or invalidate queries
queryClient.invalidateQueries({ queryKey: ['events'] })
```

#### Stale data showing

**Solution:**
```typescript
// Adjust stale time
useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents,
  staleTime: 0, // Always fresh
  gcTime: 5 * 60 * 1000, // 5 minutes
})
```

#### Mutation not updating cache

**Solution:**
```typescript
const mutation = useMutation({
  mutationFn: updateEvent,
  onSuccess: (data) => {
    // Update cache manually
    queryClient.setQueryData(['event', data.id], data)
    
    // Or invalidate to refetch
    queryClient.invalidateQueries({ 
      queryKey: ['events'] 
    })
  }
})
```

### Routing Issues

#### 404 on page refresh

**Solution for SPA:**
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Navigation guard not working

**Solution:**
```typescript
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { isSignedIn } = useAuth()
    
    if (!isSignedIn.value) {
      return next('/login')
    }
  }
  
  next()
})
```

#### Route params not reactive

**Solution:**
```vue
<script setup lang="ts">
// Watch route params
const route = useRoute()

watch(() => route.params.id, (newId) => {
  // Fetch new data
  loadEvent(newId)
})

// Or use computed
const eventId = computed(() => route.params.id as string)
</script>
```

### State Management Issues

#### Pinia store not persisting

**Solution:**
```typescript
// Add persistence plugin
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

#### Store state not reactive

**Solution:**
```typescript
// Use ref/reactive properly
export const useStore = defineStore('app', () => {
  // ✅ Correct
  const state = ref<State>({})
  
  // ❌ Wrong
  let state = {}
  
  return {
    state: readonly(state)
  }
})
```

### API & Network Issues

#### API calls failing

**Debugging steps:**
```typescript
// Add request/response logging
httpClient.interceptors.request.use(request => {
  console.log('Request:', request)
  return request
})

httpClient.interceptors.response.use(
  response => {
    console.log('Response:', response)
    return response
  },
  error => {
    console.error('Error:', error)
    return Promise.reject(error)
  }
)
```

#### Authentication token issues

**Solution:**
```typescript
// Check token expiry
const isTokenValid = () => {
  const token = localStorage.getItem('token')
  if (!token) return false
  
  const decoded = jwt.decode(token)
  return decoded.exp > Date.now() / 1000
}

// Refresh token if expired
if (!isTokenValid()) {
  await refreshToken()
}
```

### Payment Issues

#### Stripe not loading

**Solution:**
```html
<!-- Add to index.html -->
<script src="https://js.stripe.com/v3/"></script>
```

```typescript
// Wait for Stripe to load
const stripe = await loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
)
```

#### Payment redirect not working

**Solution:**
```typescript
// Ensure URLs are absolute
const successUrl = `${window.location.origin}/payment/success`
const cancelUrl = `${window.location.origin}/payment/cancel`
```

### Build & Deployment Issues

#### Build failing

**Common fixes:**
```bash
# Clear all caches
rm -rf node_modules dist .vite
npm ci
npm run build

# Check for TypeScript errors
npm run type-check

# Check for ESLint errors
npm run lint
```

#### Environment variables not working

**Solution:**
```typescript
// Variables must start with VITE_
const apiUrl = import.meta.env.VITE_API_URL

// Check .env file location
// Should be in project root

// For production, set in hosting platform
```

#### Large bundle size

**Solution:**
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['@radix-ui/vue'],
        }
      }
    }
  }
})

// Lazy load components
const HeavyComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)
```

### Performance Issues

#### Slow initial load

**Solutions:**
1. Enable compression
2. Lazy load routes
3. Optimize images
4. Use CDN for assets
5. Implement service worker

#### Memory leaks

**Common causes and fixes:**
```vue
<script setup lang="ts">
// Clean up event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Clear intervals/timeouts
const timer = setInterval(() => {}, 1000)

onUnmounted(() => {
  clearInterval(timer)
})
</script>
```

### Browser-Specific Issues

#### Safari compatibility

```css
/* Add webkit prefixes */
.element {
  -webkit-appearance: none;
  -webkit-transform: translate3d(0, 0, 0);
}
```

#### IE11 support

```typescript
// Add polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

## 🛠️ Debugging Tools

### Vue DevTools

1. Install browser extension
2. Open DevTools → Vue tab
3. Inspect components, props, state
4. Track events and performance

### Network debugging

```typescript
// Log all API calls
if (import.meta.env.DEV) {
  window.__API_CALLS__ = []
  
  httpClient.interceptors.request.use(config => {
    window.__API_CALLS__.push({
      url: config.url,
      method: config.method,
      data: config.data,
      timestamp: Date.now()
    })
    return config
  })
}
```

### Performance profiling

```typescript
// Measure component render time
import { onMounted, onUpdated } from 'vue'

onMounted(() => {
  performance.mark('component-mounted')
})

onUpdated(() => {
  performance.mark('component-updated')
  performance.measure(
    'render-time',
    'component-mounted',
    'component-updated'
  )
  
  const measure = performance.getEntriesByName('render-time')[0]
  console.log(`Render time: ${measure.duration}ms`)
})
```

## 📞 Getting Help

If none of these solutions work:

1. **Check existing issues**:
   - [GitHub Issues](https://github.com/yourusername/vue-tanstack-query-app/issues)

2. **Create detailed bug report**:
   - Error message
   - Steps to reproduce
   - Environment details
   - Minimal reproduction

3. **Community resources**:
   - Vue.js Discord
   - Stack Overflow
   - TanStack Query discussions

## 🔍 Quick Reference

### Reset everything
```bash
rm -rf node_modules package-lock.json dist .vite
npm cache clean --force
npm install
npm run dev
```

### Check versions
```bash
node --version
npm --version
npm list vue @tanstack/vue-query typescript
```

### Environment check
```bash
# Print all VITE_ variables
env | grep VITE_
```

---

[← Back to README](../../../README.md) | [← Previous: Deployment Guide](DEPLOYMENT.md)