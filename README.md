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
- **React Navigation** - Navigation management
- **react-native-reanimated** - Smooth animations
- **Jest & React Native Testing Library** - Unit/Integration testing
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

- **Local State**: React hooks for component state
- **API Caching**: (To be implemented with React Query or similar)

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

The search functionality uses the DummyJSON search endpoint with debouncing to minimize API calls and improve performance.

### Pagination Strategy

- Fetch 30 users per page (within required 20-50 range)
- Infinite scroll with FlatList's `onEndReached`
- Pull-to-refresh for manual data refresh

### Animation Approach

- Collapsible header on detail screen using react-native-reanimated
- Smooth list item animations
- 60fps performance target

## 🔧 Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run type-check` - Run TypeScript type checking

## 📄 License

This project is for technical assessment purposes.

## 👤 Author

Built as a technical assessment for React Native position.
