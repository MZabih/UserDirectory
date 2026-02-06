/**
 * Axios HTTP client configuration
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from '@constants';

/**
 * Create axios instance with default configuration
 */
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config: any) => {
      if (__DEV__) {
        console.log('📡 API Request:', config.method?.toUpperCase(), config.url);
      }
      return config;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error('❌ Request Error:', error);
      }
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (__DEV__) {
        console.log('✅ API Response:', response.config.url, response.status);
      }
      return response;
    },
    (error: AxiosError) => {
      if (__DEV__) {
        console.error(
          '❌ Response Error:',
          error.config?.url,
          error.response?.status,
          error.message
        );
      }

      // Handle specific error cases
      if (!error.response) {
        // Network error
        console.error('Network error - no response received');
      } else if (error.response.status === 401) {
        // Unauthorized - could trigger logout
        console.error('Unauthorized access');
      } else if (error.response.status >= 500) {
        // Server error
        console.error('Server error');
      }

      return Promise.reject(error);
    }
  );

  return client;
};

export const apiClient = createApiClient();

/**
 * Generic API request wrapper with type safety
 */
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.request<T>(config);
  return response.data;
};
