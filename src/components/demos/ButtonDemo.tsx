/**
 * Button Component Demo
 * Showcases all Button component variants
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const ButtonDemo: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Card variant="elevated" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        Button Component
      </Text>
      <Button variant="primary" onPress={() => {}} style={styles.button}>
        Primary Button
      </Button>
      <Button variant="outline" onPress={() => {}} style={styles.button}>
        Outline Button
      </Button>
      <Button
        variant="secondary"
        size="small"
        loading={loading}
        onPress={() => setLoading(!loading)}
      >
        Toggle Loading
      </Button>
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
  button: {
    marginBottom: SPACING.sm,
  },
});
