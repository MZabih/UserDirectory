/**
 * Component Showcase
 * Displays all design system components in one view
 */

import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from '@components/ui';
import { SPACING } from '@constants';
import { TextDemo } from './TextDemo';
import { ButtonDemo } from './ButtonDemo';
import { InputDemo } from './InputDemo';
import { AvatarDemo } from './AvatarDemo';
import { CardDemo } from './CardDemo';
import { LoadingDemo } from './LoadingDemo';
import { EmptyStateDemo } from './EmptyStateDemo';

export const ComponentShowcase: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold" center>
          🎨 Design System
        </Text>
        <Text variant="body2" color="secondary" center>
          All 7 components ready!
        </Text>
      </View>

      <TextDemo />
      <ButtonDemo />
      <InputDemo />
      <AvatarDemo />
      <CardDemo />
      <LoadingDemo />
      <EmptyStateDemo />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.md,
  },
  header: {
    marginBottom: SPACING.lg,
    paddingTop: SPACING.md,
  },
});
