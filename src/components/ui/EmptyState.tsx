/**
 * EmptyState Component - Empty/error state placeholders
 * Provides consistent empty states across the app
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SPACING } from '@constants';
import Text from './Text';
import Button from './Button';

export interface EmptyStateProps {
  /** Icon or emoji */
  icon?: string;
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Action button text */
  actionText?: string;
  /** Action button callback */
  onAction?: () => void;
  /** Custom style */
  style?: ViewStyle;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  actionText,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text variant="h1" center style={styles.icon}>
        {icon}
      </Text>

      <Text variant="h3" weight="semibold" center style={styles.title}>
        {title}
      </Text>

      {description && (
        <Text variant="body1" color="secondary" center style={styles.description}>
          {description}
        </Text>
      )}

      {actionText && onAction && (
        <Button onPress={onAction} style={styles.button}>
          {actionText}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  icon: {
    fontSize: 64,
    marginBottom: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    marginBottom: SPACING.sm,
  },
  description: {
    marginBottom: SPACING.xl,
  },
  button: {
    minWidth: 200,
  },
});

export default EmptyState;
