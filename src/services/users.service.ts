/**
 * User API service
 * Handles all user-related API calls
 */

import { apiClient } from './api.client';
import { API_CONFIG } from '@constants';
import type { User, UsersResponse, UserSearchResponse } from '@types';

/**
 * Fetch paginated list of users
 */
export const fetchUsers = async (
  limit: number = API_CONFIG.PAGINATION.DEFAULT_LIMIT,
  skip: number = 0
): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(API_CONFIG.ENDPOINTS.USERS, {
    params: { limit, skip },
  });
  return response.data;
};

/**
 * Fetch a single user by ID
 */
export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await apiClient.get<User>(API_CONFIG.ENDPOINTS.USER_BY_ID(userId));
  return response.data;
};

/**
 * Search users by query string
 */
export const searchUsers = async (
  query: string,
  limit: number = API_CONFIG.PAGINATION.DEFAULT_LIMIT,
  skip: number = 0
): Promise<UserSearchResponse> => {
  const response = await apiClient.get<UserSearchResponse>(API_CONFIG.ENDPOINTS.SEARCH_USERS, {
    params: { q: query, limit, skip },
  });
  return response.data;
};
