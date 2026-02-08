/**
 * E2E Test Setup
 * Disables animations and mocks network for faster and more reliable E2E tests
 */

// Disable react-native-reanimated animations
// Use the official mock from react-native-reanimated
jest.mock('react-native-reanimated', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReanimatedMock = require('react-native-reanimated/mock');
  // Ensure call() executes immediately (no worklet delays)
  ReanimatedMock.default.call = (fn: (...args: unknown[]) => unknown, ...args: unknown[]) =>
    fn(...args);
  return ReanimatedMock;
});

// Mock users service to return instant responses (no network delays)
jest.mock('../src/services/users.service', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getMockUsersResponse, getMockSearchResponse, getMockUser } = require('./mockData');

  return {
    fetchUsers: jest.fn((limit: number, skip: number) => {
      // Return immediately with mock data (no async delay)
      return Promise.resolve(getMockUsersResponse(limit, skip));
    }),
    searchUsers: jest.fn((query: string, limit: number = 30, skip: number = 0) => {
      // Return immediately with filtered mock data
      return Promise.resolve(getMockSearchResponse(query, limit, skip));
    }),
    fetchUserById: jest.fn((id: number) => {
      // Return immediately with mock user
      const user = getMockUser(id);
      if (!user) {
        return Promise.reject(new Error(`User with id ${id} not found`));
      }
      return Promise.resolve(user);
    }),
  };
});
