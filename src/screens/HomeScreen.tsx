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
import { Text, EmptyState, Loading, Button, Input } from '@ui';
import { UserListItem } from '@components/UserListItem';
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
  const allLoadedUsers = infiniteData?.pages.flatMap((page) => page.users) || [];

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
  const isSearching = searchQuery.length > 0 && searchMode === 'server';
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
        <Text variant="caption" style={{ color: COLORS.textSecondary, textAlign: 'center' }}>
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
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleClearSearch}
            showClear={true}
            autoCorrect={false}
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
          />
          {isClientSearch && (
            <Button
              variant="outline"
              onPress={handleLoadMoreSearch}
              style={styles.emptyLoadMoreButton}
            >
              Search All Users
            </Button>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        keyboardDismissMode="on-drag"
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={handleClearSearch}
              showClear={true}
              autoCorrect={false}
            />
            {isClientSearch && (
              <Text variant="caption" style={[styles.searchInfo, { color: COLORS.textSecondary }]}>
                Filtering {allLoadedUsers.length} loaded users
              </Text>
            )}
            {isServerSearch && (
              <Text variant="caption" style={[styles.searchInfo, { color: COLORS.textSecondary }]}>
                Searching all users for &quot;{searchQuery}&quot;
              </Text>
            )}
          </View>
        }
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
    paddingBottom: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  searchInfo: {
    marginTop: SPACING.xs,
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
  emptyLoadMoreButton: {
    marginTop: SPACING.lg,
  },
});
