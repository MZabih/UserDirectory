/**
 * E2E Test Constants
 * Standardized timeout values and test configuration
 */

/**
 * Timeout values in milliseconds
 * Used for waitFor() and setTimeout() calls in E2E tests
 */
export const TIMEOUTS = {
  /** Minimal delay for UI updates (client-side filtering, re-renders) */
  UI_UPDATE: 500,
  /** Short delay for app initialization after reload */
  APP_RELOAD: 1000,
  /** Short timeout for quick element visibility checks */
  SHORT: 2000,
  /** Medium timeout for general element waits */
  MEDIUM: 3000,
  /** Long timeout for initial data loads */
  LONG: 5000,
  /** Very long timeout for slow operations or initial app loads */
  VERY_LONG: 10000,
} as const;

/**
 * Test IDs used across E2E tests
 * Keep in sync with actual testID props in components
 */
export const TEST_IDS = {
  USERS_LIST: 'users-list',
  SEARCH_INPUT: 'search-input',
  USER_ITEM: (id: number) => `user-item-${id}`,
  USER_CARD: (id: number) => `user-card-${id}`,
  USER_DETAIL_SCREEN: 'user-detail-screen',
  USER_AVATAR: 'user-avatar',
  USER_FULL_NAME: 'user-full-name',
  EMPTY_STATE_ICON: 'empty-state-icon',
} as const;
