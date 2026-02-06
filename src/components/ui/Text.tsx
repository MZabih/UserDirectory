/**
 * Text Component - Typography system
 * Provides consistent text styling across the app
 */

import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY } from '@constants';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption' | 'overline';

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'error'
  | 'success'
  | 'warning';

export interface TextComponentProps extends RNTextProps {
  /** Typography variant */
  variant?: TextVariant;
  /** Font weight */
  weight?: TextWeight;
  /** Text color from theme */
  color?: TextColor;
  /** Center align text */
  center?: boolean;
  /** Text content */
  children: React.ReactNode;
}

const Text: React.FC<TextComponentProps> = ({
  variant = 'body1',
  weight = 'regular',
  color = 'primary',
  center = false,
  style,
  children,
  ...rest
}) => {
  const variantStyle = variantStyles[variant];
  const weightStyle = weightStyles[weight];
  const colorStyle = colorStyles[color];
  const centerStyle = center ? styles.center : undefined;

  return (
    <RNText style={[variantStyle, weightStyle, colorStyle, centerStyle, style]} {...rest}>
      {children}
    </RNText>
  );
};

// Variant Styles
const variantStyles = StyleSheet.create({
  h1: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    lineHeight: TYPOGRAPHY.fontSize['4xl'] * TYPOGRAPHY.lineHeight.tight,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  h2: {
    fontSize: TYPOGRAPHY.fontSize['3xl'],
    lineHeight: TYPOGRAPHY.fontSize['3xl'] * TYPOGRAPHY.lineHeight.tight,
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
  h3: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    lineHeight: TYPOGRAPHY.fontSize['2xl'] * TYPOGRAPHY.lineHeight.tight,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  h4: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    lineHeight: TYPOGRAPHY.fontSize.xl * TYPOGRAPHY.lineHeight.normal,
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  body1: {
    fontSize: TYPOGRAPHY.fontSize.base,
    lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
  },
  body2: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
  },
  caption: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    lineHeight: TYPOGRAPHY.fontSize.xs * TYPOGRAPHY.lineHeight.normal,
  },
  overline: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    lineHeight: TYPOGRAPHY.fontSize.xs * TYPOGRAPHY.lineHeight.normal,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  },
});

// Weight Styles
const weightStyles = StyleSheet.create({
  regular: {
    fontWeight: TYPOGRAPHY.fontWeight.regular,
  },
  medium: {
    fontWeight: TYPOGRAPHY.fontWeight.medium,
  },
  semibold: {
    fontWeight: TYPOGRAPHY.fontWeight.semibold,
  },
  bold: {
    fontWeight: TYPOGRAPHY.fontWeight.bold,
  },
});

// Color Styles
const colorStyles = StyleSheet.create({
  primary: {
    color: COLORS.textPrimary,
  },
  secondary: {
    color: COLORS.textSecondary,
  },
  tertiary: {
    color: COLORS.textTertiary,
  },
  inverse: {
    color: COLORS.textInverse,
  },
  error: {
    color: COLORS.error,
  },
  success: {
    color: COLORS.success,
  },
  warning: {
    color: COLORS.warning,
  },
});

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
});

export default Text;
