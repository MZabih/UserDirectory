/**
 * EmptyState Component Demo
 * Showcases EmptyState component
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { EmptyState, Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const EmptyStateDemo: React.FC = () => {
  return (
    <Card variant="flat" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        EmptyState Component
      </Text>
      <EmptyState
        icon="✅"
        title="All Components Ready!"
        description="Phase 2 Complete - Design System Built"
        actionText="View Code"
        onAction={() => console.log('Action pressed')}
      />
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
