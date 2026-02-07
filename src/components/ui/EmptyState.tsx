/**
 * EmptyState Component - Empty/error state placeholders
 * Provides consistent empty states across the app with animated icon
 */

import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring } from 'react-native-reanimated';
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
  // Animation values
  const scale = useSharedValue(1);

  // Start animation on mount
  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withSpring(1.1, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 8, stiffness: 100 })
      ),
      -1, // Infinite repeat
      false
    );
  }, []);

  // Animated style
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={[styles.container, style]}>
        <Animated.View style={animatedIconStyle}>
          <Text variant="h1" center style={styles.icon}>
            {icon}
          </Text>
        </Animated.View>

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
    </TouchableWithoutFeedback>
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
