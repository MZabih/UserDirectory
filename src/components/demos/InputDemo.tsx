/**
 * Input Component Demo
 * Showcases Input component with search functionality
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Input, Text, Card } from '@components/ui';
import { SPACING } from '@constants';

export const InputDemo: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Card variant="elevated" style={styles.card}>
      <Text variant="h4" weight="semibold" style={styles.title}>
        Input Component
      </Text>
      <Input
        label="Search"
        placeholder="Try typing..."
        value={searchText}
        onChangeText={setSearchText}
        showClear
        onClear={() => setSearchText('')}
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
