/**
 * useUsers Hook
 * React Query hooks for user data fetching
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchUsers, fetchUserById, searchUsers } from '@services';
import type { UsersResponse, User } from '@types';

/**
 * Hook for fetching paginated users with infinite scroll
 */
export const useInfiniteUsers = (limit: number = 30) => {
  return useInfiniteQuery<UsersResponse, Error>({
    queryKey: ['users', 'infinite', limit],
    queryFn: ({ pageParam = 0 }) => fetchUsers(limit, pageParam as number),
    getNextPageParam: (lastPage: UsersResponse, allPages: UsersResponse[]) => {
      const currentCount = allPages.reduce((acc, page) => acc + page.users.length, 0);
      return currentCount < lastPage.total ? currentCount : undefined;
    },
    initialPageParam: 0,
  });
};

/**
 * Hook for fetching a single user by ID
 */
export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['users', id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};

/**
 * Hook for searching users (single query)
 */
export const useSearchUsers = (query: string, limit: number = 30) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', 'search', query, limit],
    queryFn: () => searchUsers(query, limit),
    enabled: query.length > 0,
  });
};

/**
 * Hook for searching users with infinite scroll pagination
 */
export const useInfiniteSearchUsers = (query: string, limit: number = 30) => {
  return useInfiniteQuery<UsersResponse, Error>({
    queryKey: ['users', 'search', 'infinite', query, limit],
    queryFn: ({ pageParam = 0 }) => searchUsers(query, limit, pageParam as number),
    getNextPageParam: (lastPage: UsersResponse, allPages: UsersResponse[]) => {
      const currentCount = allPages.reduce((acc, page) => acc + page.users.length, 0);
      return currentCount < lastPage.total ? currentCount : undefined;
    },
    initialPageParam: 0,
    enabled: query.length > 0,
  });
};
