/**
 * Input Component - Text input with label and validation states
 * Provides consistent input styling across the app
 */

import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '@constants';
import Text from './Text';

export interface InputProps extends TextInputProps {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Success state */
  success?: boolean;
  /** Helper text */
  helperText?: string;
  /** Show clear button */
  showClear?: boolean;
  /** Clear button callback */
  onClear?: () => void;
  /** Left icon/component */
  leftIcon?: React.ReactNode;
  /** Right icon/component */
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  helperText,
  showClear = false,
  onClear,
  leftIcon,
  rightIcon,
  value,
  style,
  testID,
  ...rest
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const hasError = !!error;
  const hasSuccess = success && !hasError;
  const showClearButton = showClear && value && value.length > 0;

  const borderColor = hasError
    ? COLORS.error
    : hasSuccess
      ? COLORS.success
      : isFocused
        ? COLORS.primary
        : COLORS.gray300;

  const backgroundColor = isFocused ? COLORS.primaryLight + '08' : COLORS.white;

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="body2" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}

      <View style={[styles.inputContainer, { borderColor, backgroundColor }]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          testID={testID}
          style={[styles.input, style]}
          value={value}
          placeholderTextColor={COLORS.textTertiary}
          onFocus={(e) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />

        {showClearButton && onClear && (
          <TouchableOpacity onPress={onClear} style={styles.clearButton}>
            <Text variant="body1" color="tertiary">
              ✕
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>

      {error && (
        <Text variant="caption" color="error" style={styles.helperText}>
          {error}
        </Text>
      )}

      {!error && helperText && (
        <Text variant="caption" color="secondary" style={styles.helperText}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    minHeight: 52,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textPrimary,
    paddingVertical: SPACING.sm,
  },
  leftIcon: {
    marginRight: SPACING.sm,
  },
  rightIcon: {
    marginLeft: SPACING.sm,
  },
  clearButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
  },
  helperText: {
    marginTop: SPACING.xs,
  },
});

export default Input;
