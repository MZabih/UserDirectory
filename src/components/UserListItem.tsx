/**
 * UserListItem Component
 * Reusable component for displaying a user in a list
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Text } from '@ui';
import { COLORS, SPACING } from '@constants';
import type { User } from '@types';

interface UserListItemProps {
  user: User;
  onPress: (user: User) => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({ user, onPress }) => {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <TouchableOpacity onPress={() => onPress(user)} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.content}>
          <Avatar
            source={user.image}
            size="medium"
            initials={`${user.firstName[0]}${user.lastName[0]}`}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text variant="h3" numberOfLines={1}>
              {fullName}
            </Text>
            <Text variant="body1" style={{ color: COLORS.textSecondary }} numberOfLines={1}>
              {user.email}
            </Text>
            <Text variant="caption" style={{ color: COLORS.textSecondary }} numberOfLines={1}>
              {user.company?.title || 'No title'} at {user.company?.name || 'N/A'}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
    gap: SPACING.xs,
  },
});
