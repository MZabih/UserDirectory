/**
 * Tests for Error Handling Utilities
 */

import { getErrorMessage } from '@utils/errorHandling';
import axios, { AxiosError } from 'axios';

describe('getErrorMessage', () => {
  it('should return message from Error object', () => {
    const error = new Error('Test error message');
    expect(getErrorMessage(error)).toBe('Test error message');
  });

  it('should return message from AxiosError with response', () => {
    const axiosError: Partial<AxiosError> = {
      response: {
        data: {
          message: 'API error message',
        },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {} as any,
      },
      isAxiosError: true,
    };
    expect(getErrorMessage(axiosError as AxiosError)).toBe('API error message');
  });

  it('should return default message for AxiosError without response', () => {
    const axiosError: Partial<AxiosError> = {
      message: 'Network Error',
      isAxiosError: true,
    };
    expect(getErrorMessage(axiosError as AxiosError)).toBe('Network error. Please check your connection.');
  });

  it('should return string error as-is', () => {
    expect(getErrorMessage('String error')).toBe('An unexpected error occurred.');
  });

  it('should return default message for unknown error types', () => {
    expect(getErrorMessage(null)).toBe('An unexpected error occurred.');
    expect(getErrorMessage(undefined)).toBe('An unexpected error occurred.');
    expect(getErrorMessage(123)).toBe('An unexpected error occurred.');
  });

  it('should handle error object with message property', () => {
    const error = { message: 'Custom error' };
    expect(getErrorMessage(error)).toBe('An unexpected error occurred.');
  });
});
