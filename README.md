# 🎫 Vue.js Event Booking Platform

> **Modern event booking application built with Vue 3, TanStack Query, and SOLID principles**

[![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.85-ff4154.svg)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC.svg)](https://tailwindcss.com/)

## ✨ Features

- 🏙️ **City & Event Management** - Browse cities and discover events
- 💳 **Stripe Payment Integration** - Secure ticket purchasing with test mode
- 🔐 **Authentication** - User authentication via Clerk
- ⚡ **Real-time Search** - Debounced search with instant results
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🏗️ **Atomic Design** - Component architecture with atoms, molecules, organisms
- 🎯 **SOLID Principles** - Clean, maintainable, and scalable codebase
- 🚀 **Production Ready** - Deployed on Vercel with environment configurations

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vedaterenoglu/vue-tanstack-query-app.git
cd vue-tanstack-query-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.development

# Start development server
npm run dev
```

Visit `http://localhost:3061` to see the application running.

## 📖 Documentation

### 👥 For Users
- [**Setup Guide**](src/documents/readme/SETUP.md) - Installation and configuration
- [**Usage Examples**](src/documents/readme/USAGE.md) - Common tasks and workflows
- [**Troubleshooting**](src/documents/readme/TROUBLESHOOTING.md) - Solutions to common issues

### 👨‍💻 For Developers
- [**Architecture**](src/documents/readme/ARCHITECTURE.md) - System design and patterns
- [**Contributing**](src/documents/readme/CONTRIBUTING.md) - Development workflow
- [**API Reference**](src/documents/readme/API.md) - Service and composable APIs

### 🚢 For DevOps
- [**Deployment**](src/documents/readme/DEPLOYMENT.md) - Production deployment guide

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Vue 3.5, TypeScript 5.8, Composition API |
| **State Management** | TanStack Query 5.85, Pinia 3.0 |
| **UI Framework** | Tailwind CSS 4.1, Radix Vue, Lucide Icons |
| **Form Handling** | Vee-Validate 4.15, Zod 3.25 |
| **Authentication** | Clerk Vue 1.11 |
| **Payments** | Stripe Integration |
| **Build Tools** | Vite 7.1, ESLint, Prettier |
| **Deployment** | Vercel |

## 📁 Project Structure

```
src/
├── components/          # Atomic design components
│   ├── */atoms/        # Basic building blocks
│   ├── */molecules/    # Composed components
│   ├── */organisms/    # Complex features
│   └── */containers/   # Container components
├── composables/        # Vue composition utilities
├── services/           # API and external services
├── views/              # Page components
├── router/             # Vue Router configuration
├── lib/                # Core utilities
└── documents/readme/   # Documentation files
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server (port 3061)
npm run build        # Build for production
npm run lint         # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

## 🌟 Key Features Explained

### Atomic Design Architecture
Components are organized following atomic design principles:
- **Atoms**: Buttons, inputs, labels (< 50 lines)
- **Molecules**: Search boxes, cards (< 100 lines)
- **Organisms**: Grids, forms, modals (< 150 lines)

### SOLID Principles Implementation
- ✅ **S**ingle Responsibility - One concern per component
- ✅ **O**pen/Closed - Extensible via props and slots
- ✅ **L**iskov Substitution - Consistent interfaces
- ✅ **I**nterface Segregation - Focused APIs
- ✅ **D**ependency Inversion - Abstract dependencies

### Performance Optimizations
- Query caching with TanStack Query
- Lazy loading with Vue Router
- Debounced search inputs
- Optimized re-renders with computed properties

## 🔐 Environment Variables

Create `.env.development` with:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_API_BASE_URL=http://localhost:3060
VITE_APP_NAME=Online Ticket
VITE_APP_URL=http://localhost:3061
```

See [Setup Guide](src/documents/readme/SETUP.md) for detailed configuration.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](src/documents/readme/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://your-app.vercel.app)
- [API Documentation](src/documents/readme/API.md)
- [Architecture Guide](src/documents/readme/ARCHITECTURE.md)
- [Deployment Guide](src/documents/readme/DEPLOYMENT.md)

---

<p align="center">Built with ❤️ using Vue.js and TanStack Query</p>