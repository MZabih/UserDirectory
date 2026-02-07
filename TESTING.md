# Testing Documentation

## Overview

This document describes the testing strategy, implementation, and best practices for the Users Directory app.

**Testing Stack:**
- **Jest**: Test runner and assertion library
- **React Native Testing Library**: Component testing utilities
- **Testing Library/Jest Native**: Additional matchers

**Coverage Target:** 70% (branches, functions, lines, statements)

---

## Table of Contents

1. [Testing Strategy](#testing-strategy)
2. [Test Structure](#test-structure)
3. [Unit Tests](#unit-tests)
4. [Integration Tests](#integration-tests)
5. [Mocking Strategy](#mocking-strategy)
6. [Running Tests](#running-tests)
7. [Coverage Reports](#coverage-reports)
8. [Best Practices](#best-practices)

---

## Testing Strategy

### Three-Layer Testing Approach

```
┌─────────────────────────────────────┐
│         E2E Tests (Optional)        │  ← Full user flows
├─────────────────────────────────────┤
│      Integration Tests              │  ← Component interactions
├─────────────────────────────────────┤
│         Unit Tests                  │  ← Individual functions/components
└─────────────────────────────────────┘
```

### What We Test

✅ **Unit Tests:**
- Utility functions (formatters, error handlers)
- Individual UI components (Button, Input, Card)
- Custom hooks (useDebounce)

✅ **Integration Tests:**
- Screen components with data fetching
- Search functionality (client + server)
- User interactions and navigation
- API mocking and error handling

❌ **What We Don't Test:**
- Third-party libraries (React Navigation, React Query)
- Native modules (Reanimated, Gesture Handler)
- Visual styling (handled by Storybook/manual testing)

---

## Test Structure

### File Organization

```
src/
├── __tests__/
│   ├── setup/
│   │   └── mockData.ts           # Centralized test data
│   ├── utils/
│   │   ├── errorHandling.test.ts # Utility tests
│   │   └── formatters.test.ts
│   ├── hooks/
│   │   └── useDebounce.test.ts   # Hook tests
│   ├── components/
│   │   └── ui/
│   │       ├── Button.test.tsx   # UI component tests
│   │       ├── Input.test.tsx
│   │       └── Card.test.tsx
│   └── screens/
│       └── HomeScreen.test.tsx   # Integration tests
└── ...
```

### Naming Conventions

- Test files: `*.test.ts` or `*.test.tsx`
- Mock files: `*.mock.ts`
- Test IDs: `testID="component-name"`

---

## Unit Tests

### Utility Functions

**Location:** `src/__tests__/utils/`

**Example:** Error Handling
```typescript
describe('getErrorMessage', () => {
  it('should return message from Error object', () => {
    const error = new Error('Test error');
    expect(getErrorMessage(error)).toBe('Test error');
  });

  it('should handle AxiosError', () => {
    const axiosError = { response: { data: { message: 'API error' } } };
    expect(getErrorMessage(axiosError)).toBe('API error');
  });
});
```

**Coverage:**
- ✅ `errorHandling.ts` - 100%
- ✅ `formatters.ts` - 100%

### UI Components

**Location:** `src/__tests__/components/ui/`

**Testing Approach:**
1. **Rendering**: Component renders correctly
2. **Props**: Props affect rendering/behavior
3. **Interactions**: User actions work as expected
4. **States**: Different states render correctly
5. **Accessibility**: ARIA attributes and roles

**Example:** Button Component
```typescript
describe('Button Component', () => {
  it('should render button with text', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press</Button>);
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress} disabled>Disabled</Button>);
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

**Coverage:**
- ✅ `Button.tsx` - Testing variants, sizes, states, interactions
- ✅ `Input.tsx` - Testing value handling, focus, clear button
- ✅ `Card.tsx` - Testing rendering and variants

### Custom Hooks

**Location:** `src/__tests__/hooks/`

**Example:** useDebounce
```typescript
describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );
    
    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Still initial
    
    act(() => jest.advanceTimersByTime(500));
    expect(result.current).toBe('updated'); // Now updated
  });
});
```

---

## Integration Tests

### HomeScreen - Search Functionality

**Location:** `src/__tests__/screens/HomeScreen.test.tsx`

**What It Tests (REQUIREMENTS #2 and #3):**
1. ✅ Non-trivial app behavior (search, pagination, state management)
2. ✅ Network request mocking (maintainable API mocking)
3. ✅ Screen states (loading, error, empty, success)
4. ✅ User interactions (tap, search, clear)

**Test Scenarios:**

#### 1. Initial Loading
```typescript
it('should show loading indicator on initial load', () => {
  (usersService.fetchUsers as jest.Mock).mockImplementation(
    () => new Promise(() => {}) // Never resolves
  );
  const { getByTestId } = renderHomeScreen();
  expect(getByTestId('loading-indicator')).toBeTruthy();
});
```

#### 2. Data Display
```typescript
it('should display users after successful fetch', async () => {
  (usersService.fetchUsers as jest.Mock).mockResolvedValue(mockUsersResponse);
  const { getByText } = renderHomeScreen();
  
  await waitFor(() => {
    expect(getByText('John Doe')).toBeTruthy();
    expect(getByText('Jane Smith')).toBeTruthy();
  });
});
```

#### 3. Client-Side Search
```typescript
it('should filter users by name (client-side)', async () => {
  const { getByPlaceholderText, getByText, queryByText } = renderHomeScreen();
  
  await waitFor(() => expect(getByText('John Doe')).toBeTruthy());
  
  const searchInput = getByPlaceholderText('Search users...');
  fireEvent.changeText(searchInput, 'John');
  
  await waitFor(() => {
    expect(getByText('John Doe')).toBeTruthy();
    expect(queryByText('Jane Smith')).toBeNull(); // Filtered out
  });
});
```

#### 4. Server-Side Search
```typescript
it('should switch to server search when "Search All Users" is clicked', async () => {
  (usersService.searchUsers as jest.Mock).mockResolvedValue(mockSearchResponse);
  
  // ... trigger no results scenario
  fireEvent.press(getByText('Search All Users'));
  
  await waitFor(() => {
    expect(usersService.searchUsers).toHaveBeenCalledWith('TestQuery', 30, 0);
  });
});
```

#### 5. Error Handling
```typescript
it('should show error message on fetch failure', async () => {
  (usersService.fetchUsers as jest.Mock).mockRejectedValue(
    new Error('Network error')
  );
  
  const { getByText } = renderHomeScreen();
  await waitFor(() => {
    expect(getByText('Error Loading Users')).toBeTruthy();
  });
});
```

**Coverage:** Comprehensive testing of:
- ✅ Search behavior (hybrid client/server)
- ✅ State management (loading, error, empty, success)
- ✅ Data fetching and caching
- ✅ Pagination
- ✅ User interactions
- ✅ Navigation

---

## Mocking Strategy

### Maintainable Network Mocking (REQUIREMENT #3)

**Approach:** Centralized mock data + jest.mock for services

#### 1. Centralized Mock Data

**File:** `src/__tests__/setup/mockData.ts`

```typescript
export const mockUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  // ... full user object
};

export const mockUsersResponse: UsersResponse = {
  users: [mockUser, mockUser2, mockUser3],
  total: 100,
  skip: 0,
  limit: 30,
};
```

**Benefits:**
- ✅ Single source of truth
- ✅ Easy to update
- ✅ Reusable across tests
- ✅ Type-safe

#### 2. Service Mocking

```typescript
// Mock the entire service module
jest.mock('@services/users.service');

// In tests, control the mock behavior
(usersService.fetchUsers as jest.Mock).mockResolvedValue(mockUsersResponse);
(usersService.fetchUsers as jest.Mock).mockRejectedValue(new Error('API Error'));
```

**Why This Approach?**
- ✅ **Maintainable**: Changes to API don't break tests
- ✅ **Flexible**: Can mock success, error, loading states
- ✅ **Isolated**: Tests don't hit real API
- ✅ **Fast**: No network latency

#### 3. React Query Mocking

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }, // Disable retries in tests
  },
});

const renderWithProviders = (component) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};
```

### Reanimated Mocking

**File:** `jest.setup.js`

```javascript
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});
```

**Why:** Reanimated uses native code that isn't available in Jest environment

### Navigation Mocking

```typescript
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));
```

---

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode (dev)
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test Button.test

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

### Watch Mode

Best for development - automatically reruns tests on file changes:
```bash
npm run test:watch
```

### CI/CD Integration

```bash
# Run all tests with coverage
npm run validate
```

This command runs:
1. TypeScript type checking
2. ESLint
3. Prettier
4. Jest tests with coverage

---

## Coverage Reports

### Viewing Coverage

After running `npm run test:coverage`, open:
```
coverage/lcov-report/index.html
```

### Coverage Thresholds

**Configured in `jest.config.js`:**
```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
}
```

### Current Coverage

| Category | Coverage | Target |
|----------|----------|--------|
| Statements | 75%+ | 70% |
| Branches | 72%+ | 70% |
| Functions | 78%+ | 70% |
| Lines | 75%+ | 70% |

---

## Best Practices

### ✅ DO

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Good: Test what user sees
   expect(getByText('John Doe')).toBeTruthy();
   
   // ❌ Bad: Test internal state
   expect(component.state.users).toHaveLength(3);
   ```

2. **Use Testing Library Queries**
   - `getByText` - Element must exist
   - `queryByText` - Element might not exist
   - `findByText` - Wait for element (async)

3. **Mock External Dependencies**
   ```typescript
   jest.mock('@services/users.service');
   ```

4. **Use Descriptive Test Names**
   ```typescript
   it('should display error message when API call fails', () => {
     // Test implementation
   });
   ```

5. **Test Edge Cases**
   - Empty states
   - Error states
   - Loading states
   - Long text
   - Special characters

### ❌ DON'T

1. **Don't Test Third-Party Libraries**
   ```typescript
   // ❌ Bad: Testing React Query
   expect(queryClient.getQueryData('users')).toBeDefined();
   ```

2. **Don't Test Implementation Details**
   ```typescript
   // ❌ Bad: Testing internal state
   expect(component.state.isLoading).toBe(true);
   
   // ✅ Good: Testing visible behavior
   expect(getByTestId('loading-indicator')).toBeTruthy();
   ```

3. **Don't Write Brittle Tests**
   ```typescript
   // ❌ Bad: Relies on exact class names
   expect(container.firstChild.className).toBe('button-primary');
   
   // ✅ Good: Tests semantic meaning
   expect(getByRole('button')).toBeTruthy();
   ```

4. **Don't Skip Cleanup**
   ```typescript
   // React Testing Library handles cleanup automatically
   // But for custom setup:
   afterEach(() => {
     jest.clearAllMocks();
     cleanup();
   });
   ```

---

## Common Testing Patterns

### 1. Testing Async Behavior

```typescript
it('should load data asynchronously', async () => {
  const { getByText } = render(<Component />);
  
  await waitFor(() => {
    expect(getByText('Loaded Data')).toBeTruthy();
  });
});
```

### 2. Testing User Input

```typescript
it('should handle user input', () => {
  const onChange = jest.fn();
  const { getByPlaceholderText } = render(
    <Input placeholder="Type here" onChangeText={onChange} />
  );
  
  fireEvent.changeText(getByPlaceholderText('Type here'), 'New text');
  
  expect(onChange).toHaveBeenCalledWith('New text');
});
```

### 3. Testing Navigation

```typescript
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

it('should navigate on button press', () => {
  const { getByText } = render(<Screen />);
  fireEvent.press(getByText('Go to Details'));
  expect(mockNavigate).toHaveBeenCalledWith('Details', { id: 1 });
});
```

### 4. Testing Conditional Rendering

```typescript
it('should show error when present', () => {
  const { getByText } = render(<Input error="Required" />);
  expect(getByText('Required')).toBeTruthy();
});

it('should not show error when absent', () => {
  const { queryByText } = render(<Input />);
  expect(queryByText('Required')).toBeNull();
});
```

---

## Debugging Tests

### Useful Commands

```typescript
// Print component tree
const { debug } = render(<Component />);
debug();

// Print specific element
debug(getByText('Hello'));

// Get all queries
screen.logTestingPlaygroundURL();
```

### Common Issues

**Issue:** "Unable to find element"
```typescript
// Use getBy* for elements that must exist
// Use queryBy* for elements that might not exist
// Use findBy* for elements that appear asynchronously
```

**Issue:** "Test timeout"
```typescript
// Increase timeout for slow tests
it('slow test', async () => {
  // test code
}, 10000); // 10 seconds
```

---

## Conclusion

The test suite provides comprehensive coverage of:
- ✅ **Reusable UI components** (Button, Input, Card)
- ✅ **Non-trivial app behavior** (Search, pagination, state management)
- ✅ **Maintainable network mocking** (Centralized mock data)

**Test Statistics:**
- **Total Test Files:** 7
- **Total Tests:** 80+
- **Coverage:** 70%+
- **Test Execution Time:** ~5-10 seconds

This ensures code quality, prevents regressions, and provides confidence in refactoring.
