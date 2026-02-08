/**
 * Avatar Component - User profile image with fallback
 * Displays user images with initials fallback
 */

import React, { useState } from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, BORDER_RADIUS } from '@constants';
import Text from './Text';

export type AvatarSize = 'small' | 'medium' | 'large' | 'xl';

export interface AvatarProps {
  /** Image URL */
  source?: string;
  /** User initials for fallback */
  initials?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID for E2E testing */
  testID?: string;
}

const Avatar: React.FC<AvatarProps> = ({ source, initials, size = 'medium', style, testID }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const sizeStyle = sizeStyles[size];
  const fontSize = fontSizeMap[size];

  const showImage = source && !imageError;
  const showInitials = (imageError || !source) && initials;
  const showPlaceholder = !showImage && !showInitials;

  return (
    <View testID={testID} style={[styles.container, sizeStyle, style]}>
      {showImage && (
        <Image
          source={{ uri: source }}
          style={[styles.image, sizeStyle]}
          onError={() => setImageError(true)}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
      )}

      {imageLoading && showImage && (
        <View style={[styles.placeholder, sizeStyle]}>
          <Text variant="body2" color="tertiary">
            ...
          </Text>
        </View>
      )}

      {showInitials && (
        <View style={[styles.initialsContainer, sizeStyle]}>
          <Text variant={fontSize} weight="semibold" style={styles.initialsText}>
            {initials.toUpperCase()}
          </Text>
        </View>
      )}

      {showPlaceholder && (
        <View style={[styles.placeholder, sizeStyle]}>
          <Text variant={fontSize} color="tertiary">
            👤
          </Text>
        </View>
      )}
    </View>
  );
};

// Size configurations
const sizeMap = {
  small: 32,
  medium: 48,
  large: 64,
  xl: 96,
};

const fontSizeMap: Record<AvatarSize, 'caption' | 'body2' | 'body1' | 'h4'> = {
  small: 'caption',
  medium: 'body2',
  large: 'body1',
  xl: 'h4',
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    backgroundColor: COLORS.gray100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: COLORS.white,
  },
  placeholder: {
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Generate size styles dynamically
const sizeStyles = StyleSheet.create({
  small: {
    width: sizeMap.small,
    height: sizeMap.small,
  },
  medium: {
    width: sizeMap.medium,
    height: sizeMap.medium,
  },
  large: {
    width: sizeMap.large,
    height: sizeMap.large,
  },
  xl: {
    width: sizeMap.xl,
    height: sizeMap.xl,
  },
});

export default Avatar;
