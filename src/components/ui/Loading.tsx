/**
 * Loading Component - Loading indicators
 * Provides consistent loading states across the app
 */

import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING } from '@constants';
import Text from './Text';

export type LoadingSize = 'small' | 'medium' | 'large';

export interface LoadingProps {
  /** Loading size */
  size?: LoadingSize;
  /** Loading text */
  text?: string;
  /** Full screen overlay */
  fullScreen?: boolean;
  /** Custom color */
  color?: string;
  /** Custom style */
  style?: ViewStyle;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  text,
  fullScreen = false,
  color = COLORS.primary,
  style,
}) => {
  const indicatorSize = sizeMap[size];
  const containerStyle = fullScreen ? styles.fullScreen : styles.inline;

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={indicatorSize} color={color} />
      {text && (
        <Text variant="body2" color="secondary" center style={styles.text}>
          {text}
        </Text>
      )}
    </View>
  );
};

const sizeMap: Record<LoadingSize, 'small' | 'large'> = {
  small: 'small',
  medium: 'large',
  large: 'large',
};

const styles = StyleSheet.create({
  inline: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  fullScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  text: {
    marginTop: SPACING.md,
  },
});

export default Loading;
