/**
 * Error handling utilities
 */

import { AxiosError } from 'axios';

export interface AppError {
  message: string;
  code?: string;
  statusCode?: number;
}

/**
 * Parse API errors into a consistent format
 */
export const parseApiError = (error: unknown): AppError => {
  // Axios error
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      code: error.code,
      statusCode: error.response?.status,
    };
  }

  // Generic error
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  // Unknown error
  return {
    message: 'An unexpected error occurred',
  };
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyErrorMessage = (error: unknown): string => {
  const appError = parseApiError(error);

  // Network errors
  if (appError.code === 'ERR_NETWORK' || appError.code === 'ECONNABORTED') {
    return 'Network error. Please check your connection and try again.';
  }

  // HTTP status codes
  switch (appError.statusCode) {
    case 400:
      return 'Invalid request. Please try again.';
    case 401:
      return 'Unauthorized. Please log in again.';
    case 403:
      return 'You do not have permission to perform this action.';
    case 404:
      return 'The requested resource was not found.';
    case 500:
      return 'Server error. Please try again later.';
    case 503:
      return 'Service unavailable. Please try again later.';
    default:
      return appError.message || 'An unexpected error occurred';
  }
};

/**
 * Log error for debugging (can be extended with error reporting service)
 */
export const logError = (error: unknown, context?: string): void => {
  const appError = parseApiError(error);

  if (__DEV__) {
    console.error('[Error]', context || 'Unknown context', {
      message: appError.message,
      code: appError.code,
      statusCode: appError.statusCode,
    });
  }

  // TODO: Add error reporting service (e.g., Sentry)
};
