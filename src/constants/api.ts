/**
 * API Configuration Constants
 */

export const API_CONFIG = {
  BASE_URL: 'https://dummyjson.com',
  ENDPOINTS: {
    USERS: '/users',
    USER_BY_ID: (id: number) => `/users/${id}`,
    SEARCH_USERS: '/users/search',
  },
  PAGINATION: {
    DEFAULT_LIMIT: 30, // Fetch 30 users per page (within 20-50 range)
    MIN_LIMIT: 20,
    MAX_LIMIT: 50,
  },
} as const;

export const QUERY_KEYS = {
  USERS: 'users',
  USER_DETAIL: 'user-detail',
  SEARCH_USERS: 'search-users',
} as const;

// Backwards compatibility exports
export const API_BASE_URL = API_CONFIG.BASE_URL;
export const API_ENDPOINTS = API_CONFIG.ENDPOINTS;
