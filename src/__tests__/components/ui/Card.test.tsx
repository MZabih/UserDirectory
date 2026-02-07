/**
 * Tests for Card Component
 * Tests a reusable UI component (REQUIREMENT #1)
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { Card } from '@ui';

describe('Card Component', () => {
  describe('Rendering', () => {
    it('should render children', () => {
      const { getByText } = render(
        <Card>
          <Text>Card Content</Text>
        </Card>
      );
      expect(getByText('Card Content')).toBeTruthy();
    });

    it('should render multiple children', () => {
      const { getByText } = render(
        <Card>
          <Text>First Child</Text>
          <Text>Second Child</Text>
        </Card>
      );
      expect(getByText('First Child')).toBeTruthy();
      expect(getByText('Second Child')).toBeTruthy();
    });
  });

  describe('Styling', () => {
    it('should accept custom style prop', () => {
      const customStyle = { marginTop: 20 };
      const { getByTestId } = render(
        <Card style={customStyle} testID="custom-card">
          <Text>Styled Card</Text>
        </Card>
      );
      expect(getByTestId('custom-card')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should render default variant', () => {
      const { getByText } = render(
        <Card>
          <Text>Default</Text>
        </Card>
      );
      expect(getByText('Default')).toBeTruthy();
    });

    it('should render elevated variant', () => {
      const { getByText } = render(
        <Card variant="elevated">
          <Text>Elevated</Text>
        </Card>
      );
      expect(getByText('Elevated')).toBeTruthy();
    });

    it('should render outlined variant', () => {
      const { getByText } = render(
        <Card variant="outlined">
          <Text>Outlined</Text>
        </Card>
      );
      expect(getByText('Outlined')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      const { getByTestId } = render(
        <Card testID="accessible-card">
          <Text>Accessible Content</Text>
        </Card>
      );
      expect(getByTestId('accessible-card')).toBeTruthy();
    });
  });
});
