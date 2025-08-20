# 📦 Setup Guide

> **Complete installation and configuration guide for the Vue.js Event Booking Platform**

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** for version control
- **VS Code** (recommended) with Vue Language Features extension

## 🚀 Installation Steps

### 1. Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/vue-tanstack-query-app.git

# Using SSH
git clone git@github.com:yourusername/vue-tanstack-query-app.git

# Navigate to project directory
cd vue-tanstack-query-app
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Configuration

#### Create Environment Files

```bash
# Copy example environment file
cp .env.example .env.development

# For production
cp .env.example .env.production
```

#### Configure Environment Variables

Edit `.env.development` with your credentials:

```env
# Clerk Authentication (Required)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Stripe Payment (Required for payments)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# API Configuration (Required)
VITE_API_BASE_URL=http://localhost:3060

# Application Settings
VITE_APP_NAME=Online Ticket
VITE_APP_URL=http://localhost:3061
```

### 4. Obtain API Keys

#### Clerk Setup

1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your **Publishable Key** from the dashboard
4. Add `http://localhost:3061` to allowed origins

#### Stripe Setup

1. Go to [stripe.com](https://stripe.com)
2. Sign up for a test account
3. Navigate to **Developers → API Keys**
4. Copy your **Publishable test key**

#### Backend API

The application requires a backend API running on port 3060. Options:

1. **Use the production API**: 
   ```env
   VITE_API_BASE_URL=https://portfolio-events-rest-api-i6z5q.ondigitalocean.app
   ```

2. **Run locally** (if you have the backend project):
   ```bash
   # In backend project directory
   npm install
   npm run dev
   ```

## 🔧 Development Setup

### Start Development Server

```bash
# Start the development server
npm run dev

# The application will be available at
# http://localhost:3061
```

### Verify Installation

1. Open browser at `http://localhost:3061`
2. You should see the home page with city cards
3. Click on a city to view events
4. Test search functionality

### Development Tools

```bash
# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check

# Build for production
npm run build
```

## 🐳 Docker Setup (Optional)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3061
CMD ["npm", "run", "preview"]
```

```bash
# Build and run with Docker
docker build -t vue-event-app .
docker run -p 3061:3061 vue-event-app
```

## 📱 IDE Configuration

### VS Code Extensions

Install recommended extensions:

```json
{
  "recommendations": [
    "Vue.volar",
    "Vue.vscode-typescript-vue-plugin",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss"
  ]
}
```

### VS Code Settings

Add to `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## 🔍 Troubleshooting Installation

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3061
lsof -ti:3061 | xargs kill -9

# Or change port in vite.config.ts
server: {
  port: 3062
}
```

#### Node Version Issues

```bash
# Check Node version
node --version

# Use nvm to switch versions
nvm install 18
nvm use 18
```

#### Permission Errors

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors

```bash
# Rebuild TypeScript
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.vite
npm run dev
```

## 🏗️ Project Structure

After setup, your project structure should look like:

```
vue-tanstack-query-app/
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/        # Vue components
│   ├── composables/       # Composition utilities
│   ├── services/          # API services
│   ├── views/             # Page components
│   └── router/            # Routing config
├── .env.development       # Development environment
├── .env.production        # Production environment
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite configuration
└── README.md              # Documentation
```

## ✅ Verification Checklist

- [ ] Node.js v18+ installed
- [ ] Dependencies installed without errors
- [ ] Environment variables configured
- [ ] Development server starts on port 3061
- [ ] Home page loads with city cards
- [ ] Search functionality works
- [ ] No TypeScript errors
- [ ] ESLint passes

## 📚 Next Steps

- Read the [Usage Guide](USAGE.md) for common tasks
- Review the [Architecture Guide](ARCHITECTURE.md)
- Check [Contributing Guidelines](CONTRIBUTING.md) for development workflow
- See [Deployment Guide](DEPLOYMENT.md) for production setup

## 🆘 Getting Help

If you encounter issues:

1. Check [Troubleshooting Guide](TROUBLESHOOTING.md)
2. Search existing [GitHub Issues](https://github.com/yourusername/vue-tanstack-query-app/issues)
3. Create a new issue with:
   - Node.js version
   - Error messages
   - Steps to reproduce

---

[← Back to README](../../../README.md) | [Next: Usage Guide →](USAGE.md)