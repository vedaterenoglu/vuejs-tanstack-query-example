# Vue.js Event Component Hierarchy

## Architecture Overview
This application follows **Atomic Design Pattern** with **SOLID Principles** and **Clean Architecture**.

## Component Hierarchy

```
SingleEventPage.vue (Page)
└── EventContainer.vue (Container - Orchestrates all components)
    ├── BackNavigation.vue (Organism - Navigation)
    ├── EventHeader.vue (Organism - Header with title)
    │   └── EventTitle.vue (Atom - Title text)
    ├── EventHero.vue (Organism - Hero section)
    │   └── EventHeroContent.vue (Molecule)
    │       ├── EventImage.vue (Atom - Image display)
    │       ├── EventTitle.vue (Atom - Title text)
    │       └── EventPrice.vue (Atom - Price badge)
    ├── EventDetails.vue (Organism - Content section)
    │   └── EventDescription.vue (Molecule)
    │       └── EventDescriptionText.vue (Atom - Description text)
    ├── EventInfo.vue (Organism - Sidebar)
    │   ├── EventInfoCard.vue (Molecule - Info card)
    │   │   └── EventInfoItem.vue (Atom - Info item) [x3]
    │   └── TicketPurchase.vue (Organism - Purchase section)
    └── TestPaymentModal.vue (Organism - Payment modal)
```

## Atomic Design Levels

### **Atoms** (Basic UI elements)
- `EventImage.vue` - Image display component
- `EventTitle.vue` - Title text component
- `EventPrice.vue` - Price badge component
- `EventInfoItem.vue` - Single info item (label + value)
- `EventDescriptionText.vue` - Description text display

### **Molecules** (Composed units)
- `EventHeroContent.vue` - Composes image, title, price atoms
- `EventDescription.vue` - Wraps description text atom
- `EventInfoCard.vue` - Composes multiple info item atoms

### **Organisms** (Complex features)
- `BackNavigation.vue` - Navigation with back button
- `EventHeader.vue` - Page header with title
- `EventHero.vue` - Hero section using EventHeroContent molecule
- `EventDetails.vue` - Details section using EventDescription molecule
- `EventInfo.vue` - Sidebar using EventInfoCard molecule
- `TicketPurchase.vue` - Ticket purchase with quantity selector
- `TestPaymentModal.vue` - Payment confirmation modal

### **Container** (Smart component)
- `EventContainer.vue` - Orchestrates all organisms, manages state

### **Page** (Route component)
- `SingleEventPage.vue` - Fetches data, handles loading/error states

## Composables (Business Logic)

```
composables/
├── useEventData.ts - Event data fetching with TanStack Query
├── useTicketSelection.ts - Ticket quantity management
└── usePayment.ts - Payment processing logic
```

## Data Flow

1. **SingleEventPage** fetches event data via `useEventData` composable
2. **EventContainer** receives event data as props
3. **EventContainer** distributes data to organisms
4. **Organisms** pass data to molecules
5. **Molecules** pass data to atoms
6. **User interactions** bubble up through emit events

## SOLID Principles Applied

- **S**ingle Responsibility: Each component has one clear purpose
- **O**pen/Closed: Components extendable via props/slots
- **L**iskov Substitution: Components interchangeable at same level
- **I**nterface Segregation: Minimal, focused interfaces
- **D**ependency Inversion: Depend on abstractions (composables)

## Performance Optimizations

- Components < 100 lines
- No prop drilling beyond 2 levels
- Lazy loading for modals
- Computed properties for derived state
- Event delegation for interactions

## TypeScript Coverage

- All props fully typed
- All composables return typed interfaces
- API responses typed
- No use of `any` type