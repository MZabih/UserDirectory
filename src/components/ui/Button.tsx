/**
 * Button Component - Interactive button with variants
 * Provides consistent button styling and behavior
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@constants';
import Text from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends TouchableOpacityProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Loading state */
  loading?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Button text */
  children: string;
  /** Full width button */
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  children,
  fullWidth = false,
  style,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const disabledStyle = isDisabled ? styles.disabled : undefined;
  const fullWidthStyle = fullWidth ? styles.fullWidth : undefined;

  const textColor = getTextColor(variant, isDisabled);
  const textSize = getTextSize(size);

  return (
    <TouchableOpacity
      style={[styles.base, variantStyle, sizeStyle, disabledStyle, fullWidthStyle, style]}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="small"
            color={variant === 'primary' ? COLORS.white : COLORS.primary}
          />
          <Text variant={textSize} weight="semibold" style={[styles.text, { color: textColor }]}>
            {children}
          </Text>
        </View>
      ) : (
        <Text variant={textSize} weight="semibold" style={[styles.text, { color: textColor }]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Helper functions
const getTextColor = (variant: ButtonVariant, disabled: boolean): string => {
  if (disabled) return COLORS.gray400;

  switch (variant) {
    case 'primary':
    case 'danger':
      return COLORS.white;
    case 'secondary':
      return COLORS.textPrimary;
    case 'outline':
    case 'ghost':
      return COLORS.primary;
    default:
      return COLORS.white;
  }
};

const getTextSize = (size: ButtonSize): 'body1' | 'body2' => {
  return size === 'small' ? 'body2' : 'body1';
};

// Base Styles
const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    ...SHADOWS.sm,
  },
  text: {
    textAlign: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  disabled: {
    opacity: 0.5,
    ...SHADOWS.sm,
  },
  fullWidth: {
    width: '100%',
  },
});

// Variant Styles
const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  danger: {
    backgroundColor: COLORS.error,
    borderWidth: 0,
  },
});

// Size Styles
const sizeStyles = StyleSheet.create({
  small: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    minHeight: 36,
  },
  medium: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    minHeight: 44,
  },
  large: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    minHeight: 52,
  },
});

export default Button;
