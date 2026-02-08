/**
 * HomeScreen
 * Displays paginated list of users with search functionality
 */

import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, EmptyState, Loading, Button } from '@ui';
import { UserListItem } from '@components/UserListItem';
import { SearchBar } from '@components/SearchBar';
import { useInfiniteUsers, useInfiniteSearchUsers } from '@hooks';
import { COLORS, SPACING } from '@constants';
import { getErrorMessage } from '@utils';
import type { User, RootStackParamList } from '@types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<'none' | 'client' | 'server'>('client');

  // Infinite scroll query for normal list
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchInfinite,
    isLoading: isLoadingInfinite,
    isError: isErrorInfinite,
    error: errorInfinite,
  } = useInfiniteUsers(30);

  // Infinite scroll query for server search
  const {
    data: searchInfiniteData,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
    isLoading: isLoadingSearch,
    isError: isErrorSearch,
    error: errorSearch,
  } = useInfiniteSearchUsers(searchQuery, 30);

  // Get all loaded users from main list
  const allLoadedUsers = React.useMemo(
    () => infiniteData?.pages.flatMap((page) => page.users) || [],
    [infiniteData]
  );

  // Client-side filtered users
  const clientFilteredUsers = React.useMemo(() => {
    if (searchQuery.length === 0 || searchMode !== 'client') return [];
    const query = searchQuery.toLowerCase();
    return allLoadedUsers.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
    );
  }, [allLoadedUsers, searchQuery, searchMode]);

  // Server search users (flattened)
  const serverSearchUsers = searchInfiniteData?.pages.flatMap((page) => page.users) || [];

  // Determine which data to display
  const isSearching = searchQuery.length > 0;
  const isClientSearch = searchMode === 'client' && searchQuery.length > 0;
  const isServerSearch = searchMode === 'server';

  const users = isServerSearch
    ? serverSearchUsers
    : isClientSearch
      ? clientFilteredUsers
      : allLoadedUsers;

  const isLoading = isServerSearch ? isLoadingSearch : isLoadingInfinite;
  const isError = isServerSearch ? isErrorSearch : isErrorInfinite;
  const error = isServerSearch ? errorSearch : errorInfinite;

  // Update search mode based on query
  React.useEffect(() => {
    if (searchQuery.length === 0 && searchMode !== 'client') {
      setSearchMode('client');
    }
    // If already in server mode, stay in server mode
  }, [searchQuery, searchMode]);

  // Handle user press
  const handleUserPress = useCallback(
    (user: User) => {
      navigation.navigate('UserDetail', { userId: user.id });
    },
    [navigation]
  );

  // Handle "Load More" button click (switch to server search)
  const handleLoadMoreSearch = useCallback(() => {
    setSearchMode('server');
  }, []);

  // Handle load more (pagination)
  const handleLoadMore = useCallback(() => {
    if (isServerSearch && hasNextSearchPage && !isFetchingNextSearchPage) {
      fetchNextSearchPage();
    } else if (!isSearching && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    isServerSearch,
    hasNextSearchPage,
    isFetchingNextSearchPage,
    fetchNextSearchPage,
    isSearching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    if (!isSearching) {
      refetchInfinite();
    }
  }, [isSearching, refetchInfinite]);

  // Handle search clear
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchMode('client');
  }, []);

  // Render user item
  const renderItem: ListRenderItem<User> = useCallback(
    ({ item }) => <UserListItem user={item} onPress={handleUserPress} />,
    [handleUserPress]
  );

  // Render "Load More" button for client search
  const renderLoadMoreButton = useCallback(() => {
    if (!isClientSearch || clientFilteredUsers.length === 0) return null;
    return (
      <View style={styles.loadMoreContainer}>
        <Button variant="outline" onPress={handleLoadMoreSearch} style={styles.loadMoreButton}>
          Load More Results from Server
        </Button>
        <Text variant="caption" style={[styles.helperText, { color: COLORS.textSecondary }]}>
          Showing {clientFilteredUsers.length} results from loaded data
        </Text>
      </View>
    );
  }, [isClientSearch, clientFilteredUsers.length, handleLoadMoreSearch]);

  // Render footer (pagination loader)
  const renderFooter = useCallback(() => {
    const showLoader = isServerSearch ? isFetchingNextSearchPage : isFetchingNextPage;
    if (!showLoader || isClientSearch) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={COLORS.primary} />
      </View>
    );
  }, [isFetchingNextSearchPage, isFetchingNextPage, isServerSearch, isClientSearch]);

  // Loading state
  if (isLoading && users.length === 0) {
    return <Loading />;
  }

  // Error state
  if (isError && users.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <EmptyState icon="⚠️" title="Error Loading Users" description={getErrorMessage(error)} />
      </View>
    );
  }

  // Empty search state
  if (isSearching && users.length === 0 && !isLoading) {
    return (
      <View style={styles.container}>
        {/* Fixed Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search users by name, email, or username..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            helperText={
              isClientSearch
                ? `Filtering ${allLoadedUsers.length} loaded users`
                : isServerSearch
                  ? `Searching all users for "${searchQuery}"`
                  : undefined
            }
          />
        </View>
        <View style={styles.centerContainer}>
          <EmptyState
            icon="🔍"
            title="No Results"
            description={
              isClientSearch
                ? `No users found in loaded data. Try "Load More" to search all users.`
                : `No users found for '${searchQuery}'`
            }
            actionText={isClientSearch ? 'Search All Users' : undefined}
            onAction={isClientSearch ? handleLoadMoreSearch : undefined}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fixed Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search users by name, email, or username..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
          helperText={
            isClientSearch
              ? `Filtering ${allLoadedUsers.length} loaded users`
              : isServerSearch
                ? `Searching all users for "${searchQuery}"`
                : undefined
          }
        />
      </View>

      {/* Scrollable User List */}
      <FlatList
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        testID="users-list"
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          <>
            {renderLoadMoreButton()}
            {renderFooter()}
          </>
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          !isSearching ? (
            <RefreshControl
              refreshing={false}
              onRefresh={handleRefresh}
              colors={[COLORS.primary]}
              tintColor={COLORS.primary}
            />
          ) : undefined
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listContent: {
    paddingBottom: SPACING.md,
  },
  footerLoader: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  loadMoreContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  loadMoreButton: {
    minWidth: 200,
  },
  helperText: {
    textAlign: 'center',
  },
});
