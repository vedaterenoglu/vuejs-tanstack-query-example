# 🚀 Deployment Guide

> **Production deployment guide for the Vue.js Event Booking Platform**

## 📋 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint checks pass
- [ ] Prettier formatting applied
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed

### Testing
- [ ] Manual testing completed
- [ ] Critical user flows verified
- [ ] Payment flow tested with test cards
- [ ] Error handling verified
- [ ] Mobile responsiveness checked

### Security
- [ ] Environment variables secured
- [ ] API keys not exposed in code
- [ ] CORS configured properly
- [ ] Input validation implemented
- [ ] XSS protection verified

## 🔧 Build Configuration

### Production Build

```bash
# Install dependencies
npm ci --production

# Run production build
npm run build

# Preview production build locally
npm run preview
```

### Build Output

The build creates optimized files in `dist/`:

```
dist/
├── assets/           # JS, CSS, and other assets
├── index.html        # Entry HTML file
└── favicon.ico       # Favicon
```

## 🌐 Vercel Deployment

### Initial Setup

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Connect GitHub Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import from GitHub
   - Select your repository

3. **Configure Project**:
   - Framework Preset: `Vue.js`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Environment Variables

Set up environment variables in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add the following variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
VITE_API_BASE_URL=https://your-api.com
VITE_APP_NAME=Your App Name
VITE_APP_URL=https://your-app.vercel.app
```

3. Select environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Deployment via CLI

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# Deploy with specific environment
vercel --env production
```

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Push to `main` branch
- **Preview**: Push to any other branch
- **Pull Requests**: Automatic preview deployments

## 🚢 Alternative Deployment Options

### Netlify

1. **Build settings**:
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Deploy**:
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli
   
   # Deploy
   netlify deploy --prod
   ```

### AWS S3 + CloudFront

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Upload to S3**:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

3. **Invalidate CloudFront**:
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

### Docker Deployment

1. **Create Dockerfile**:
   ```dockerfile
   # Build stage
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   
   # Production stage
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Build and run**:
   ```bash
   docker build -t vue-app .
   docker run -p 80:80 vue-app
   ```

## 🔐 Production Environment Setup

### Clerk Authentication

1. **Production Configuration**:
   - Add production domain to Clerk
   - Update redirect URLs
   - Enable production mode

2. **Update environment**:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxxxx
   ```

### Stripe Payments

1. **Production Setup**:
   - Switch to live keys
   - Configure webhooks
   - Set up redirect URLs

2. **Update environment**:
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   ```

### API Configuration

1. **Production API**:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com
   ```

2. **CORS Settings**:
   - Add production domain to allowed origins
   - Configure proper headers

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable in Vercel dashboard
2. Add to app:
   ```typescript
   import { inject } from '@vercel/analytics'
   
   inject()
   ```

### Error Tracking (Sentry)

1. **Install Sentry**:
   ```bash
   npm install @sentry/vue
   ```

2. **Configure**:
   ```typescript
   import * as Sentry from '@sentry/vue'
   
   Sentry.init({
     app,
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE,
   })
   ```

### Performance Monitoring

1. **Web Vitals**:
   ```typescript
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
   
   getCLS(console.log)
   getFID(console.log)
   getFCP(console.log)
   getLCP(console.log)
   getTTFB(console.log)
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_CLERK_PUBLISHABLE_KEY: ${{ secrets.VITE_CLERK_KEY }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

## 🎯 Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'ui': ['@radix-ui/vue', 'lucide-vue-next'],
          'query': ['@tanstack/vue-query'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})
```

### CDN Configuration

1. **Static Assets**:
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

2. **Compression**:
   ```nginx
   gzip on;
   gzip_types text/plain text/css application/json application/javascript;
   gzip_min_length 1000;
   ```

## 🔍 Post-Deployment Verification

### Smoke Tests

1. **Homepage loads** ✓
2. **Cities display** ✓
3. **Search works** ✓
4. **Event details load** ✓
5. **Payment modal opens** ✓
6. **Authentication works** ✓

### Performance Checks

```bash
# Lighthouse audit
lighthouse https://your-app.vercel.app \
  --output html \
  --view
```

Target metrics:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

## 🔧 Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]

# Or use dashboard
# Deployments → Select previous → Promote to Production
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard [commit-hash]
git push --force origin main
```

## 📝 Deployment Checklist

### Before Deployment
- [ ] Code review completed
- [ ] Tests passing
- [ ] Build successful locally
- [ ] Environment variables set
- [ ] Database migrations ready

### During Deployment
- [ ] Monitor deployment logs
- [ ] Check build output size
- [ ] Verify environment variables
- [ ] Test preview deployment

### After Deployment
- [ ] Smoke tests pass
- [ ] Performance acceptable
- [ ] Error tracking active
- [ ] Analytics working
- [ ] SSL certificate valid

## 🆘 Troubleshooting Deployment

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm ci
npm run build
```

### Environment Variables Not Working

1. Check variable names (must start with `VITE_`)
2. Rebuild after adding variables
3. Verify in Vercel dashboard

### 404 Errors on Routes

Add to `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vue.js Deployment Guide](https://vuejs.org/guide/best-practices/production-deployment.html)
- [Vite Production Guide](https://vitejs.dev/guide/build.html)

---

[← Back to README](../../../README.md) | [Next: Troubleshooting →](TROUBLESHOOTING.md)