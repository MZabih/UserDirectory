/**
 * Card Component - Container with elevation and variants
 * Provides consistent card styling across the app
 */

import React from 'react';
import { View, ViewProps, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@constants';

export type CardVariant = 'elevated' | 'outlined' | 'flat';

export interface CardProps extends ViewProps {
  /** Card variant */
  variant?: CardVariant;
  /** Make card pressable */
  pressable?: boolean;
  /** Callback when pressed (only if pressable) */
  onPress?: () => void;
  /** Card content */
  children: React.ReactNode;
  /** Test ID for E2E testing */
  testID?: string;
}

const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  pressable = false,
  onPress,
  children,
  style,
  testID,
  ...rest
}) => {
  // Get variant style - using switch to help linter understand usage
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return variantStyles.elevated;
      case 'outlined':
        return variantStyles.outlined;
      case 'flat':
        return variantStyles.flat;
      default:
        return variantStyles.elevated;
    }
  };
  const variantStyle = getVariantStyle();

  if (pressable && onPress) {
    return (
      <TouchableOpacity
        testID={testID}
        style={[styles.base, variantStyle, style]}
        onPress={onPress}
        activeOpacity={0.7}
        {...(rest as TouchableOpacityProps)}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View testID={testID} style={[styles.base, variantStyle, style]} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.surface,
  },
});

// eslint-disable-next-line react-native/no-unused-styles
const variantStyles = StyleSheet.create({
  elevated: {
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;
