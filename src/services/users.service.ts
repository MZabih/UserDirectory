/**
 * Users Service
 * API calls for user-related operations
 */

import { apiClient } from './api.client';
import { API_ENDPOINTS } from '@constants';
import type { UsersResponse, User } from '@types';

/**
 * Fetch paginated list of users
 */
export const fetchUsers = async (limit: number, skip: number): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(API_ENDPOINTS.USERS, {
    params: { limit, skip },
  });
  return response.data;
};

/**
 * Fetch a single user by ID
 */
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`);
  return response.data;
};

/**
 * Search users by query with pagination support
 */
export const searchUsers = async (
  query: string,
  limit: number = 30,
  skip: number = 0
): Promise<UsersResponse> => {
  const response = await apiClient.get<UsersResponse>(API_ENDPOINTS.SEARCH_USERS, {
    params: { q: query, limit, skip },
  });
  return response.data;
};
