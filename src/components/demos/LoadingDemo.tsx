/**
 * Loading Component Demo
 * Showcases Loading component
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Loading, Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const LoadingDemo: React.FC = () => {
  return (
    <Card variant="elevated" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        Loading Component
      </Text>
      <Loading size="medium" text="Loading users..." />
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
});
