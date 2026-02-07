/**
 * Tests for Formatter Utilities
 */

import { formatPhoneNumber } from '@utils/formatters';

describe('formatPhoneNumber', () => {
  it('should format US phone number correctly', () => {
    expect(formatPhoneNumber('+1-555-123-4567')).toBe('+1-555-123-4567');
  });

  it('should return original if already formatted', () => {
    const formatted = '+1 (555) 123-4567';
    expect(formatPhoneNumber(formatted)).toBe(formatted);
  });

  it('should handle empty string', () => {
    expect(formatPhoneNumber('')).toBe('');
  });

  it('should handle invalid phone numbers', () => {
    expect(formatPhoneNumber('invalid')).toBe('invalid');
  });

  it('should handle phone numbers without country code', () => {
    expect(formatPhoneNumber('555-123-4567')).toBe('(555) 123-4567');
  });
});
