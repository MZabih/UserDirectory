# Architecture & Design Decisions

This document outlines the key architectural decisions, design patterns, and technical choices made in building the User Directory application.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Patterns](#architecture-patterns)
4. [State Management](#state-management)
5. [Component Design](#component-design)
6. [Navigation](#navigation)
7. [Data Fetching & Caching](#data-fetching--caching)
8. [Testing Strategy](#testing-strategy)
9. [Performance Optimizations](#performance-optimizations)
10. [Trade-offs & Alternatives](#trade-offs--alternatives)

---

## 🎯 Project Overview

**User Directory** is a React Native mobile application that demonstrates professional mobile development practices, including:

- Scalable component architecture
- Efficient state management
- Comprehensive testing
- Smooth animations
- Performance optimization

**Key Requirements Met:**
- ✅ Paginated user list with FlatList
- ✅ Hybrid search (client + server)
- ✅ User detail screen
- ✅ Reanimated animations
- ✅ Design system with 3+ reusable components
- ✅ Unit & Integration tests

---

## 🛠 Technology Stack

### Core Framework
- **React Native (Expo SDK 54)**: Cross-platform mobile development
- **TypeScript**: Type safety and better developer experience

### State Management
- **React Query (@tanstack/react-query)**: Server state management
- **React Hooks**: Local component state

### Navigation
- **React Navigation (@react-navigation/native-stack)**: Native stack navigation

### HTTP Client
- **Axios**: Promise-based HTTP client with interceptors

### Animations
- **react-native-reanimated**: High-performance animations on UI thread

### Testing
- **Jest**: Test runner and assertion library
- **React Native Testing Library**: Component testing utilities

---

## 🏗 Architecture Patterns

### 1. **Feature-Based Structure**

```
src/
├── components/
│   ├── ui/                    # Design system components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Text.tsx
│   │   └── ...
│   ├── UserListItem.tsx       # Feature-specific components
│   └── SearchBar.tsx
├── screens/                   # Screen components
│   ├── HomeScreen.tsx
│   └── UserDetailScreen.tsx
├── navigation/                # Navigation configuration
├── services/                  # API services
├── hooks/                     # Custom hooks
├── types/                     # TypeScript types
├── constants/                 # App constants
└── utils/                     # Utility functions
```

**Why This Structure?**
- ✅ Clear separation of concerns
- ✅ Easy to locate files
- ✅ Scalable as the app grows
- ✅ Reusable components are isolated

---

### 2. **Layered Architecture**

```
┌─────────────────────────────────┐
│   Presentation Layer (UI)       │  ← Screens, Components
├─────────────────────────────────┤
│   Business Logic Layer          │  ← Hooks, State Management
├─────────────────────────────────┤
│   Data Access Layer             │  ← Services, API Clients
├─────────────────────────────────┤
│   External APIs                 │  ← DummyJSON API
└─────────────────────────────────┘
```

**Benefits:**
- Each layer has a single responsibility
- Easy to test each layer independently
- Changes in one layer don't affect others

---

## 🔄 State Management

### React Query for Server State

**Why React Query?**

| Feature | React Query | Redux + RTK Query | Context API |
|---------|-------------|-------------------|-------------|
| Caching | ✅ Built-in | ✅ Built-in | ❌ Manual |
| Pagination | ✅ `useInfiniteQuery` | ⚠️ Manual | ❌ Manual |
| Refetching | ✅ Automatic | ⚠️ Manual | ❌ Manual |
| Request Deduplication | ✅ Yes | ✅ Yes | ❌ No |
| Boilerplate | ✅ Minimal | ⚠️ Moderate | ✅ Minimal |
| Learning Curve | ✅ Easy | ⚠️ Steep | ✅ Easy |
| Bundle Size | ✅ ~13KB | ⚠️ ~40KB | ✅ 0KB (built-in) |

**Implementation Example:**

```typescript
// Custom hook for infinite user list
export const useInfiniteUsers = (limit: number = 30) => {
  return useInfiniteQuery<UsersResponse, Error>({
    queryKey: ['users', 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => fetchUsers(limit, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const currentCount = allPages.reduce((acc, page) => acc + page.users.length, 0);
      return currentCount < lastPage.total ? currentCount : undefined;
    },
    initialPageParam: 0,
  });
};
```

**Key Benefits:**
- Automatic caching with configurable stale time
- Background refetching for fresh data
- Optimistic updates support
- Built-in loading and error states
- Pagination and infinite scroll support

---

### React Hooks for Local State

For component-specific state (search query, UI toggles, form inputs), we use standard React hooks:

```typescript
const [searchQuery, setSearchQuery] = useState('');
const [searchMode, setSearchMode] = useState<'client' | 'server'>('client');
```

**Why Not Redux for Everything?**
- ❌ Overkill for simple local state
- ❌ More boilerplate
- ❌ Harder to co-locate state with components
- ✅ React hooks are simpler and more intuitive

---

## 🎨 Component Design

### Design System Principles

1. **Consistency**: All components follow the same design tokens (colors, spacing, typography)
2. **Composability**: Components can be composed together
3. **Extensibility**: Easy to add variants and customize
4. **Type Safety**: Fully typed with TypeScript
5. **Accessibility**: Proper accessibility props

### Example: Button Component

```typescript
export interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  children: string;
  fullWidth?: boolean;
}
```

**Design Tokens:**

```typescript
export const COLORS = {
  primary: '#06B6D4',      // Teal/Cyan
  secondary: '#8B5CF6',    // Purple
  accent: '#F59E0B',       // Amber
  // ... more colors
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};
```

---

## 🧭 Navigation

### Stack Navigation

We use **React Navigation's Native Stack Navigator** for optimal performance:

```typescript
const Stack = createNativeStackNavigator<RootStackParamList>();

<Stack.Navigator
  screenOptions={{
    headerStyle: { backgroundColor: COLORS.primary },
    headerTintColor: COLORS.white,
    headerBackTitle: '',
  }}
>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="UserDetail" component={UserDetailScreen} />
</Stack.Navigator>
```

**Why Native Stack?**
- ✅ Uses native navigation primitives (UINavigationController on iOS, Fragment on Android)
- ✅ Better performance than JS-based stack
- ✅ Native animations and gestures
- ✅ Smaller bundle size

**Type-Safe Navigation:**

```typescript
export type RootStackParamList = {
  Home: undefined;
  UserDetail: { userId: number };
};

// Usage
navigation.navigate('UserDetail', { userId: 123 });
```

---

## 📡 Data Fetching & Caching

### API Service Layer

**Centralized API Client:**

```typescript
// api.client.ts
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    logError(error, 'API Request');
    return Promise.reject(error);
  }
);
```

**Service Functions:**

```typescript
// users.service.ts
export const fetchUsers = async (limit: number, skip: number): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(API_ENDPOINTS.USERS, {
    params: { limit, skip },
  });
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  return response.data;
};

export const searchUsers = async (query: string, limit: number, skip: number): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(API_ENDPOINTS.SEARCH_USERS, {
    params: { q: query, limit, skip },
  });
  return response.data;
};
```

**Benefits:**
- ✅ Single source of truth for API calls
- ✅ Easy to add interceptors (auth, logging, error handling)
- ✅ Testable with mocks
- ✅ Type-safe responses

---

### Caching Strategy

**React Query Configuration:**

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,                        // Retry failed requests twice
      staleTime: 5 * 60 * 1000,       // Data is fresh for 5 minutes
      refetchOnWindowFocus: false,     // Don't refetch on app focus
    },
  },
});
```

**Cache Keys:**

```typescript
['users', 'infinite', limit]              // Infinite user list
['users', userId]                         // Single user
['users', 'search', 'infinite', query]    // Search results
```

**Why This Approach?**
- ✅ Reduces unnecessary API calls
- ✅ Instant UI updates from cache
- ✅ Background refetching for fresh data
- ✅ Automatic garbage collection of unused cache

---

## 🧪 Testing Strategy

### Test Pyramid

```
        /\
       /E2E\         ← Few (1-2 critical flows)
      /------\
     /  INT   \      ← Some (5-10 feature tests)
    /----------\
   /   UNIT     \    ← Many (50+ component/util tests)
  /--------------\
```

### Unit Tests

**What We Test:**
- UI Components (Button, Input, Card, Text)
- Utility Functions (formatters, error handling)
- Custom Hooks (useDebounce)

**Example:**

```typescript
describe('Button Component', () => {
  it('should render button with text', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<Button onPress={mockOnPress}>Press</Button>);
    fireEvent.press(getByText('Press'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

---

### Integration Tests

**What We Test:**
- Screen behavior (HomeScreen with search, pagination)
- Data flow (API → UI)
- User interactions (search, navigation)

**Example:**

```typescript
describe('HomeScreen', () => {
  it('should perform client-side search', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<HomeScreen />);
    
    const searchInput = getByPlaceholderText('Search users...');
    fireEvent.changeText(searchInput, 'John');
    
    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(queryByText('Jane Smith')).toBeNull();
    });
  });
});
```

---

### Network Mocking

**Centralized Mock Data:**

```typescript
// test-utils/mockData.ts
export const mockUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  // ... more fields
};

export const mockUsersResponse: UsersResponse = {
  users: [mockUser],
  total: 1,
  skip: 0,
  limit: 30,
};
```

**Mocking in Tests:**

```typescript
jest.mock('@services/users.service', () => ({
  fetchUsers: jest.fn(),
  searchUsers: jest.fn(),
}));

// In test
(usersService.fetchUsers as jest.Mock).mockResolvedValue(mockUsersResponse);
```

**Benefits:**
- ✅ No real API calls in tests
- ✅ Fast and deterministic tests
- ✅ Easy to test error scenarios
- ✅ Reusable mock data

---

## ⚡ Performance Optimizations

### 1. **FlatList Optimization**

```typescript
<FlatList
  data={users}
  renderItem={renderItem}
  keyExtractor={(item) => item.id.toString()}
  onEndReached={handleLoadMore}
  onEndReachedThreshold={0.5}
  removeClippedSubviews={true}           // Unmount off-screen items
  maxToRenderPerBatch={10}               // Render 10 items per batch
  windowSize={10}                        // Keep 10 screens worth of items
  initialNumToRender={15}                // Render 15 items initially
/>
```

---

### 2. **Memoization**

```typescript
// Memoize expensive computations
const clientFilteredUsers = React.useMemo(() => {
  if (searchQuery.length === 0) return [];
  return allLoadedUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [allLoadedUsers, searchQuery]);

// Memoize callbacks
const handleUserPress = useCallback((user: User) => {
  navigation.navigate('UserDetail', { userId: user.id });
}, [navigation]);

// Memoize components
const UserListItem = React.memo(({ user, onPress }) => {
  // ...
});
```

---

### 3. **Reanimated for Smooth Animations**

```typescript
// Runs on UI thread, not JS thread
const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

// Spring animation for natural feel
scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
```

**Why Reanimated?**
- ✅ Runs on UI thread (60fps guaranteed)
- ✅ No bridge communication overhead
- ✅ Smooth even when JS thread is busy
- ❌ Animated API runs on JS thread (can drop frames)

---

### 4. **Debouncing**

```typescript
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

**Use Case:** Delay API calls while user is typing

---

## ⚖️ Trade-offs & Alternatives

### State Management: React Query vs Redux

**Chose: React Query**

| Aspect | React Query | Redux |
|--------|-------------|-------|
| Server State | ✅ Excellent | ⚠️ Requires middleware |
| Caching | ✅ Built-in | ❌ Manual |
| Boilerplate | ✅ Minimal | ❌ High |
| Learning Curve | ✅ Easy | ⚠️ Steep |
| Bundle Size | ✅ 13KB | ⚠️ 40KB+ |
| DevTools | ✅ Excellent | ✅ Excellent |

**When to Use Redux:**
- Complex client-side state
- State shared across many components
- Time-travel debugging needed
- Middleware for side effects (sagas, thunks)

**Why React Query for This App:**
- Most state is server state (user list, user details)
- Built-in caching and pagination
- Less boilerplate
- Easier to test

---

### Navigation: Native Stack vs Stack

**Chose: Native Stack**

| Aspect | Native Stack | Stack |
|--------|--------------|-------|
| Performance | ✅ Native | ⚠️ JS-based |
| Bundle Size | ✅ Smaller | ⚠️ Larger |
| Customization | ⚠️ Limited | ✅ Full control |
| Animations | ✅ Native | ⚠️ JS-based |

**When to Use Stack:**
- Need custom animations
- Need full control over header
- Cross-platform consistency more important than performance

---

### Search: Hybrid vs Pure Server-Side

**Chose: Hybrid (Client + Server)**

**Alternatives Considered:**

1. **Pure Client-Side**
   - ✅ Instant results
   - ❌ Limited to loaded data
   - ❌ Can't search all users

2. **Pure Server-Side (Debounced)**
   - ✅ Searches all data
   - ❌ Network latency
   - ❌ More API calls

3. **Hybrid (Our Choice)**
   - ✅ Instant client-side filtering
   - ✅ On-demand server search
   - ✅ User control
   - ✅ Network-efficient

**See [SEARCH_IMPLEMENTATION.md](./SEARCH_IMPLEMENTATION.md) for details**

---

## 🎯 Key Takeaways

1. **React Query** is excellent for server state management in modern React Native apps
2. **Native Stack** provides better performance than JS-based navigation
3. **Design System** with TypeScript ensures consistency and type safety
4. **Hybrid Search** balances instant feedback with comprehensive search
5. **Reanimated** is essential for smooth, performant animations
6. **Testing** with centralized mocks makes tests maintainable
7. **FlatList optimization** is crucial for large lists

---

## 📚 Further Reading

- [React Query Documentation](https://tanstack.com/query/latest)
- [React Navigation Documentation](https://reactnavigation.org/)
- [Reanimated Documentation](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated:** February 2026  
**Author:** M Zabih Raja
