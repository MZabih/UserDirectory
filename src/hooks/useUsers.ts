/**
 * React Query hooks for users data
 */

import {
  useQuery,
  useInfiniteQuery,
  UseQueryResult,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { fetchUsers, fetchUserById, searchUsers } from '../services';
import { QUERY_KEYS, API_CONFIG } from '@constants';
import type { User, UsersResponse, UserSearchResponse } from '@types';

/**
 * Hook to fetch paginated users list
 */
export const useUsers = (
  limit: number = API_CONFIG.PAGINATION.DEFAULT_LIMIT
): UseQueryResult<UsersResponse, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.USERS, limit],
    queryFn: () => fetchUsers(limit, 0),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch infinite scrolling users list
 */
export const useInfiniteUsers = (
  limit: number = API_CONFIG.PAGINATION.DEFAULT_LIMIT
): UseInfiniteQueryResult<UsersResponse, Error> => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.USERS, 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => fetchUsers(limit, pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((sum, page) => sum + page.users.length, 0);
      return totalFetched < lastPage.total ? totalFetched : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a single user by ID
 */
export const useUser = (userId: number): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_DETAIL, userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId, // Only fetch if userId is provided
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to search users
 */
export const useSearchUsers = (
  searchQuery: string,
  limit: number = API_CONFIG.PAGINATION.DEFAULT_LIMIT
): UseQueryResult<UserSearchResponse, Error> => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_USERS, searchQuery, limit],
    queryFn: () => searchUsers(searchQuery, limit, 0),
    enabled: searchQuery.length > 0, // Only search if query is not empty
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
