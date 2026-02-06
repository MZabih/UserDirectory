/**
 * SearchBar Component
 * Reusable search input component that can be used across the app
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Text } from '@ui';
import { COLORS, SPACING } from '@constants';

export interface SearchBarProps {
  /** Current search query value */
  value: string;
  /** Callback when search text changes */
  onChangeText: (text: string) => void;
  /** Callback when clear button is pressed */
  onClear: () => void;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text to show below the input */
  helperText?: string;
  /** Show search icon on the left */
  showSearchIcon?: boolean;
  /** Custom right icon/component */
  rightIcon?: React.ReactNode;
  /** Auto-correct enabled */
  autoCorrect?: boolean;
  /** Return key type */
  returnKeyType?: 'search' | 'done' | 'go' | 'next' | 'send';
  /** Callback when submit editing (Enter key) */
  onSubmitEditing?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  helperText,
  showSearchIcon = true,
  rightIcon,
  autoCorrect = false,
  returnKeyType = 'search',
  onSubmitEditing,
}) => {
  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onClear={onClear}
        showClear={true}
        autoCorrect={autoCorrect}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        leftIcon={showSearchIcon ? <Text style={styles.searchIcon}>🔍</Text> : undefined}
        rightIcon={rightIcon}
      />
      {helperText && (
        <Text variant="caption" style={[styles.helperText, { color: COLORS.textSecondary }]}>
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
  searchIcon: {
    fontSize: 20,
  },
  helperText: {
    marginTop: SPACING.xs,
  },
});
