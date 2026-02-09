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

**Required for all platforms:**
- Node.js (v18 or higher)
- npm or yarn

**For iOS (Mac only):**
- Xcode (latest version recommended)
- iOS Simulator (comes with Xcode)
- CocoaPods (`sudo gem install cocoapods`)

**For Android:**
- Android Studio
- Android SDK configured
- Android Emulator created

### Installation

#### Step 1: Clone and Install Dependencies

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd UserDirectory

# Install npm dependencies
npm install
```

#### Step 2: iOS Setup (Mac only)

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..
```

**Note:** If you don't have CocoaPods installed:
```bash
sudo gem install cocoapods
```

#### Step 2a: Configure Xcode DerivedData Path (REQUIRED for E2E Testing!)

**⚠️ IMPORTANT:** Before building for E2E tests, you must configure Xcode's DerivedData path:

1. In Xcode: **Xcode → Settings** (or **Preferences**)
2. Go to **Locations** tab
3. Under **Derived Data**, click the arrow (→) next to the path
4. Navigate to your project folder
5. Set path to: `ios/build` (relative to your project root)
   - Example: If your project is at `/path/to/UserDirectory/`, set it to `/path/to/UserDirectory/ios/build`
6. Close Settings

**Why?** Detox expects the app at `ios/build/Build/Products/...`. Without this, builds go to Xcode's default location and Info.plist won't be processed correctly, causing test failures.

**📖 For detailed instructions, see: [HOW_TO_BUILD_AND_TEST.md](./HOW_TO_BUILD_AND_TEST.md)**

#### Step 3: Start the App

**Option A: Using Expo (Recommended for Development)**

```bash
# Start the Expo development server
npm start

# In another terminal, run on iOS
npm run ios

# Or run on Android
npm run android
```

**Option B: Using Expo Go App**

1. Install Expo Go on your iOS/Android device
2. Run `npm start`
3. Scan the QR code with Expo Go app

**Option C: Build Native App (For E2E Testing)**

For E2E testing with Detox, you need a native build. See [HOW_TO_BUILD_AND_TEST.md](./HOW_TO_BUILD_AND_TEST.md) for detailed instructions.

### Troubleshooting

**iOS: "No such module" or Pod errors**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android: "SDK not found"**
- Open Android Studio
- Go to Tools → SDK Manager
- Install required SDK components

**Metro bundler issues**
```bash
# Clear cache and restart
npm start -- --reset-cache
```

**Port already in use**
```bash
# Kill process on port 8081 (default Expo port)
lsof -ti:8081 | xargs kill -9
```

## 🧪 Testing

### Unit & Integration Tests

```bash
# Run unit and integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### E2E Tests (Detox)

```bash
# Build and run E2E tests on iOS
npm run build:e2e:ios
npm run test:e2e:ios

# Build and run E2E tests on Android
npm run build:e2e:android
npm run test:e2e:android
```

**📖 For detailed E2E testing documentation, see: [E2E_TESTING.md](./E2E_TESTING.md)**

### Test Results ✅

```
✅ Test Suites: 7 passed, 7 total
✅ Tests:       75 passed, 75 total
⏱️  Time:        ~3s
```

**Test Coverage:**
- ✅ **Unit Tests**: Button, Input, Card, Text components
- ✅ **Utility Tests**: Error handling, formatters, debounce hook
- ✅ **Integration Tests**: HomeScreen with search, pagination, and data handling
- ✅ **Network Mocking**: Maintainable API mocks with centralized test data

**📖 For detailed testing documentation, see: [TESTING.md](./TESTING.md)**

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

## 🏗 Architecture & Design Decisions

This project follows professional software engineering practices with a focus on:

- **Layered Architecture**: Clear separation between UI, business logic, and data layers
- **Component-Based Design**: Reusable, composable components with consistent APIs
- **Type Safety**: Full TypeScript coverage for better developer experience
- **Performance**: Optimized rendering, caching, and animations
- **Testability**: Comprehensive test coverage with maintainable mocks

### Key Technical Decisions

**State Management:**
- ✅ **React Query** for server state (caching, pagination, refetching)
- ✅ **React Hooks** for local component state
- ❌ Redux avoided to reduce boilerplate for this use case

**Navigation:**
- ✅ **Native Stack Navigator** for optimal performance
- ✅ Type-safe navigation with TypeScript

**Data Fetching:**
- ✅ Centralized API client with Axios
- ✅ Request/response interceptors for logging and error handling
- ✅ Infinite scroll pagination with React Query

**📖 For comprehensive architecture documentation including:**
- Detailed technology stack analysis
- Architecture patterns and layering
- State management comparison (React Query vs Redux)
- Component design principles
- Performance optimizations
- Trade-offs and alternatives considered

**See: [ARCHITECTURE.md](./ARCHITECTURE.md)**

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

The app implements **meaningful, user-interaction-driven animations** using `react-native-reanimated`:

**Implemented Animations:**
1. **Card Press Animation** - Subtle scale effect on user list items when pressed
2. **Empty State Icon Bounce** - Continuous, smooth bounce animation for empty state icons

**Why These Animations?**
- ✅ Tied to user interaction (press gestures)
- ✅ Smooth 60fps performance on UI thread
- ✅ Enhances UX without being intrusive
- ✅ Uses Reanimated's `useSharedValue`, `withSpring`, and `withRepeat`

**📖 For detailed animation documentation including:**
- Implementation details and code examples
- Alternative approaches considered
- Performance considerations
- Development journey and lessons learned

**See: [ANIMATION_IMPLEMENTATION.md](./ANIMATION_IMPLEMENTATION.md)**

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

## 📚 Documentation

- **[README.md](./README.md)** - Project overview and quick start
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture and design decisions
- **[SEARCH_IMPLEMENTATION.md](./SEARCH_IMPLEMENTATION.md)** - Search feature implementation
- **[ANIMATION_IMPLEMENTATION.md](./ANIMATION_IMPLEMENTATION.md)** - Animation implementation details
- **[TESTING.md](./TESTING.md)** - Testing strategy and guidelines
- **[TEST_SUMMARY.md](./TEST_SUMMARY.md)** - Test results summary

## 📄 License

This project is for technical assessment purposes.

## 👤 Author

**M Zabih Raja**

---

## ✨ Project Highlights

This project demonstrates:

✅ **Professional Code Quality**
- Clean, readable, and maintainable code
- Comprehensive TypeScript typing
- Consistent code style with ESLint and Prettier

✅ **Best Practices**
- Component-based architecture with design system
- Efficient state management with React Query
- Performance-optimized list rendering
- Smooth animations with Reanimated

✅ **Comprehensive Testing**
- 75 passing tests (100% pass rate)
- Unit, integration, and component tests
- Maintainable network mocking

✅ **Excellent Documentation**
- Clear README with setup instructions
- Detailed architecture documentation
- Implementation details for key features
- Code comments and inline documentation

✅ **User Experience**
- Instant search feedback
- Smooth animations and transitions
- Loading and error states
- Pull-to-refresh and infinite scroll
