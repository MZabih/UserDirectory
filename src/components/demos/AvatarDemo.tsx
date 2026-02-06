/**
 * Avatar Component Demo
 * Showcases Avatar component with different sizes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const AvatarDemo: React.FC = () => {
  return (
    <Card variant="elevated" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        Avatar Component
      </Text>
      <View style={styles.avatarRow}>
        <Avatar source="https://dummyjson.com/icon/emilys/128" size="small" />
        <Avatar initials="JD" size="medium" />
        <Avatar size="large" />
        <Avatar initials="AB" size="xl" />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  title: {
    marginBottom: SPACING.md,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
});
