/**
 * Card Component Demo
 * Showcases Card component variants
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const CardDemo: React.FC = () => {
  return (
    <Card variant="outlined" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        Card Component (Outlined)
      </Text>
      <Text variant="body2" color="secondary">
        This is an outlined card variant
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  title: {
    marginBottom: SPACING.sm,
  },
});
