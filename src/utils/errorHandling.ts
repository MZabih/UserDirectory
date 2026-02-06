/**
 * Error Handling Utilities
 * Consistent error handling and messaging
 */

import axios from 'axios';

/**
 * Extract user-friendly error message from error object
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Network error
    if (!error.response) {
      return 'Network error. Please check your connection.';
    }

    // API error with message
    if (error.response.data?.message) {
      return error.response.data.message;
    }

    // HTTP status error
    const status = error.response.status;
    switch (status) {
      case 400:
        return 'Invalid request. Please try again.';
      case 401:
        return 'Unauthorized. Please log in.';
      case 403:
        return 'Access forbidden.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return `Request failed with status ${status}`;
    }
  }

  // Generic error
  if (error instanceof Error) {
    return error.message;
  }

  // Unknown error
  return 'An unexpected error occurred.';
};

/**
 * Log error to console (can be extended to send to error tracking service)
 */
export const logError = (error: unknown, context?: string): void => {
  const message = getErrorMessage(error);
  console.error(`[Error${context ? ` - ${context}` : ''}]:`, message, error);
};
