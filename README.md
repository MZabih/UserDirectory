# User Directory - React Native App

A React Native application that demonstrates best practices in mobile development, including reusable component design, testing, and animations.

## 🎯 Features

- **User List Screen**: Paginated list of users with search functionality
- **User Detail Screen**: Detailed view of individual users with animations
- **Search**: Real-time search capability
- **Animations**: Smooth animations using react-native-reanimated
- **Design System**: Reusable UI components with consistent styling
- **Testing**: Comprehensive unit, integration, and E2E tests

## 🛠 Tech Stack

- **React Native** (Expo SDK 54)
- **TypeScript** - Type safety
- **React Navigation** (@react-navigation/stack) - Navigation management
- **React Query** (@tanstack/react-query) - Server state management
- **Axios** - HTTP client
- **react-native-reanimated** - Smooth animations
- **Jest & React Native Testing Library** - Unit/Integration testing
- **ESLint & Prettier** - Code quality and formatting
- **DummyJSON API** - Data source

## 📁 Project Structure

```
UserDirectory/
├── src/
│   ├── components/
│   │   └── ui/              # Reusable design system components
│   ├── screens/             # Screen components
│   ├── navigation/          # Navigation configuration
│   ├── services/            # API services
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   ├── constants/           # App constants (theme, API config)
│   └── utils/               # Utility functions
├── __tests__/               # Test files
├── assets/                  # Images, fonts, etc.
└── App.tsx                  # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- iOS Simulator (Mac only) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## 🧪 Testing

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📱 API

This app uses the [DummyJSON Users API](https://dummyjson.com/docs/users):

- **List Users**: `GET /users?limit=30&skip=0`
- **Get User**: `GET /users/{id}`
- **Search Users**: `GET /users/search?q={query}`

## 🎨 Design System

The app includes a design system with reusable components:

- **Button**: Multiple variants and sizes
- **Text**: Typography variants with consistent styling
- **Card**: Container component for content
- **Input**: Form input with validation states
- **Avatar**: User profile images
- **Loading**: Loading indicators
- **EmptyState**: Empty state placeholders

## 🏗 Architecture Decisions

### Component Design

- **Separation of Concerns**: UI components are separate from business logic
- **Composition over Configuration**: Components are composable and flexible
- **Type Safety**: All components are fully typed with TypeScript

### State Management

- **Server State**: React Query for API data caching, pagination, and synchronization
- **Client State**: React hooks (useState, useReducer) for local component state
- **Why React Query?**:
  - Automatic caching and background refetching
  - Built-in pagination and infinite scroll support
  - Request deduplication and retry logic
  - Optimistic updates support
  - Zero boilerplate compared to Redux

See [API_ARCHITECTURE_DECISIONS.md](./mdFiles/API_ARCHITECTURE_DECISIONS.md) for detailed explanation.

### Performance

- **FlatList**: Optimized list rendering with pagination
- **Memoization**: React.memo for expensive components
- **Reanimated**: Smooth 60fps animations on the UI thread

### Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Feature-level testing
- **E2E Tests**: Complete user flow testing

## 📝 Development Notes

### Search Implementation (Hybrid Client + Server)

The search uses a smart two-phase approach combining instant filtering with full database search:

**Phase 1: Client-Side Filtering** (Instant)

- Filters already loaded users (30/60/90+) as you type
- Instant results with zero latency
- Searches: name, email, username
- "Load More Results from Server" button appears

**Phase 2: Server-Side Search** (On Demand)

- Clicking "Load More" switches to full database search
- API: `/users/search?q={query}&limit=30&skip=0`
- Paginated results (30 per page)
- Infinite scroll for additional pages

**Benefits:**

- Instant feedback from loaded data
- Matches assignment: "filter the list"
- Optional full database search when needed
- Battery efficient (API only when requested)
- User controls scope of search

### Pagination Strategy

- Fetch 30 users per page (within required 20-50 range)
- Infinite scroll with FlatList's `onEndReached`
- Pull-to-refresh for manual data refresh

### Animation Approach

- Collapsible header on detail screen using react-native-reanimated
- Smooth list item animations
- 60fps performance target

## 🔧 Scripts

### Development

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator

### Testing

- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

### Code Quality

- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run validate` - Run all checks (type-check + lint + format + test)

## 📄 License

This project is for technical assessment purposes.

## 👤 Author

M Zabih Raja.
