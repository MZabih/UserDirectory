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

For detailed comparison with Redux and other state management solutions, see project documentation.

### Performance

- **FlatList**: Optimized list rendering with pagination
- **Memoization**: React.memo for expensive components
- **Reanimated**: Smooth 60fps animations on the UI thread

### Testing Strategy

- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Feature-level testing
- **E2E Tests**: Complete user flow testing

## 📝 Development Notes

### Search Implementation

The app implements a **Hybrid Search Approach** that combines client-side filtering with server-side search capabilities.

**Quick Overview:**

- **Client-Side Search**: Instant filtering of loaded users as you type (⚡ < 50ms)
- **Server-Side Search**: On-demand comprehensive search via "Load More Results from Server" button
- **Smart State Management**: Automatically switches between modes based on user actions

**Why This Approach?**

- ⚡ Instant feedback for common searches
- 🔍 Complete dataset search when needed
- 📊 Network-efficient (API calls only when requested)
- 🎯 User control and clear affordances

**📖 For detailed documentation including:**

- Implementation details and code examples
- Alternative approaches considered (debounced search, autocomplete, etc.)
- Performance analysis and trade-offs
- Scalability considerations
- Testing strategy

**See: [SEARCH_IMPLEMENTATION.md](./SEARCH_IMPLEMENTATION.md)**

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
