/**
 * Tests for Input Component
 * Tests a reusable UI component (REQUIREMENT #1)
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';
import { Input } from '@ui';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input with placeholder', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Enter text" />
      );
      expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('should render with label', () => {
      const { getByText } = render(<Input label="Username" />);
      expect(getByText('Username')).toBeTruthy();
    });

    it('should render with helper text', () => {
      const { getByText } = render(<Input helperText="Enter your email" />);
      expect(getByText('Enter your email')).toBeTruthy();
    });

    it('should render with error message', () => {
      const { getByText } = render(<Input error="Invalid input" />);
      expect(getByText('Invalid input')).toBeTruthy();
    });
  });

  describe('Value Handling', () => {
    it('should display value', () => {
      const { getByDisplayValue } = render(<Input value="Test Value" />);
      expect(getByDisplayValue('Test Value')).toBeTruthy();
    });

    it('should call onChangeText when text changes', () => {
      const onChangeText = jest.fn();
      const { getByPlaceholderText } = render(
        <Input placeholder="Type here" onChangeText={onChangeText} />
      );
      
      fireEvent.changeText(getByPlaceholderText('Type here'), 'New text');
      
      expect(onChangeText).toHaveBeenCalledWith('New text');
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when showClear is true and has value', () => {
      const { getByText } = render(
        <Input value="Some text" showClear onClear={jest.fn()} />
      );
      expect(getByText('✕')).toBeTruthy();
    });

    it('should not show clear button when value is empty', () => {
      const { queryByText } = render(
        <Input value="" showClear onClear={jest.fn()} />
      );
      expect(queryByText('✕')).toBeNull();
    });

    it('should call onClear when clear button is pressed', () => {
      const onClear = jest.fn();
      const { getByText } = render(
        <Input value="Text" showClear onClear={onClear} />
      );
      
      fireEvent.press(getByText('✕'));
      
      expect(onClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('Focus States', () => {
    it('should call onFocus when input is focused', () => {
      const onFocus = jest.fn();
      const { getByPlaceholderText } = render(
        <Input placeholder="Focus me" onFocus={onFocus} />
      );
      
      fireEvent(getByPlaceholderText('Focus me'), 'focus');
      
      expect(onFocus).toHaveBeenCalled();
    });

    it('should call onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      const { getByPlaceholderText } = render(
        <Input placeholder="Blur me" onBlur={onBlur} />
      );
      
      fireEvent(getByPlaceholderText('Blur me'), 'blur');
      
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('should handle error state', () => {
      const { getByText } = render(
        <Input error="This field is required" />
      );
      expect(getByText('This field is required')).toBeTruthy();
    });

    it('should handle success state', () => {
      const { getByPlaceholderText } = render(
        <Input placeholder="Input" success />
      );
      expect(getByPlaceholderText('Input')).toBeTruthy();
    });
  });

  describe('Icons', () => {
    it('should render with left icon', () => {
      const LeftIcon = <RNText>L</RNText>;
      const { getByText } = render(<Input leftIcon={LeftIcon} />);
      expect(getByText('L')).toBeTruthy();
    });

    it('should render with right icon', () => {
      const RightIcon = <RNText>R</RNText>;
      const { getByText } = render(<Input rightIcon={RightIcon} />);
      expect(getByText('R')).toBeTruthy();
    });
  });
});
