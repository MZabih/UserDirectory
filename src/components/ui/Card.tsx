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
}

const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  pressable = false,
  onPress,
  children,
  style,
  ...rest
}) => {
  const variantStyle = variantStyles[variant];

  if (pressable && onPress) {
    return (
      <TouchableOpacity
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
    <View style={[styles.base, variantStyle, style]} {...rest}>
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

const variantStyles = StyleSheet.create({
  elevated: {
    ...SHADOWS.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    shadowOpacity: 0,
    elevation: 0,
  },
  flat: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;
