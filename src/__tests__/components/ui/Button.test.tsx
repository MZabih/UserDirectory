/**
 * Tests for Button Component
 * Tests a reusable UI component (REQUIREMENT #1)
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@ui';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with text', () => {
      const { getByText } = render(<Button>Click Me</Button>);
      expect(getByText('Click Me')).toBeTruthy();
    });

    it('should render disabled button', () => {
      const { getByText } = render(<Button disabled>Disabled</Button>);
      expect(getByText('Disabled')).toBeTruthy();
    });

    it('should render loading state', () => {
      const { getByTestId } = render(<Button loading>Loading</Button>);
      expect(getByTestId('button-loading-indicator')).toBeTruthy();
    });
  });

  describe('Variants', () => {
    it('should render primary variant by default', () => {
      const { getByText } = render(<Button>Primary</Button>);
      const button = getByText('Primary').parent?.parent;
      expect(button).toBeTruthy();
    });

    it('should render secondary variant', () => {
      const { getByText } = render(<Button variant="secondary">Secondary</Button>);
      expect(getByText('Secondary')).toBeTruthy();
    });

    it('should render outline variant', () => {
      const { getByText } = render(<Button variant="outline">Outline</Button>);
      expect(getByText('Outline')).toBeTruthy();
    });

    it('should render ghost variant', () => {
      const { getByText } = render(<Button variant="ghost">Ghost</Button>);
      expect(getByText('Ghost')).toBeTruthy();
    });
  });

  describe('Sizes', () => {
    it('should render medium size by default', () => {
      const { getByText } = render(<Button>Medium</Button>);
      expect(getByText('Medium')).toBeTruthy();
    });

    it('should render small size', () => {
      const { getByText } = render(<Button size="small">Small</Button>);
      expect(getByText('Small')).toBeTruthy();
    });

    it('should render large size', () => {
      const { getByText } = render(<Button size="large">Large</Button>);
      expect(getByText('Large')).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('should call onPress when pressed', () => {
      const onPress = jest.fn();
      const { getByText } = render(<Button onPress={onPress}>Press Me</Button>);
      
      fireEvent.press(getByText('Press Me'));
      
      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when disabled', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress} disabled>
          Disabled
        </Button>
      );
      
      fireEvent.press(getByText('Disabled'));
      
      expect(onPress).not.toHaveBeenCalled();
    });

    it('should not call onPress when loading', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <Button onPress={onPress} loading>
          Loading
        </Button>
      );
      
      fireEvent.press(getByText('Loading'));
      
      expect(onPress).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility role', () => {
      const { getByText } = render(<Button>Accessible</Button>);
      expect(getByText('Accessible')).toBeTruthy();
    });

    it('should have correct accessibility state when disabled', () => {
      const { getByText } = render(<Button disabled>Disabled</Button>);
      expect(getByText('Disabled')).toBeTruthy();
    });

    it('should have correct accessibility label', () => {
      const { getByLabelText } = render(
        <Button accessibilityLabel="Custom Label">Button</Button>
      );
      expect(getByLabelText('Custom Label')).toBeTruthy();
    });
  });

  describe('Custom Styling', () => {
    it('should accept custom style prop', () => {
      const customStyle = { marginTop: 20 };
      const { getByText } = render(
        <Button style={customStyle}>Styled</Button>
      );
      expect(getByText('Styled')).toBeTruthy();
    });
  });
});
