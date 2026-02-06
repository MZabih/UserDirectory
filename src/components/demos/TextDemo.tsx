/**
 * Text Component Demo
 * Showcases all Text component variants
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const TextDemo: React.FC = () => {
  return (
    <Card variant="elevated" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        Text Component
      </Text>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h3" color="secondary">
        Heading 3 Secondary
      </Text>
      <Text variant="body1">Regular body text</Text>
      <Text variant="caption" color="tertiary">
        Caption text
      </Text>
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
