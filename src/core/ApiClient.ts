import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import Cookies from 'universal-cookie';
import { API_URL } from '@/core/config';
import { getDeviceIdSync } from './utils/deviceUtils';
import { HEADER_NAMES } from './utils/headers';
import { setServerCookie } from './utils/setCookies';

const cookies = new Cookies();

export const getToken = () => {
  if (cookies.get('accessToken')) {
    return cookies.get('accessToken');
  }
  return null;
};

export type RefreshTokenType = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
};

export class ApiClient {
  private axiosInstance: AxiosInstance;
  public static shared = new ApiClient(API_URL);
  private cancelTokenSources: Map<string, CancelTokenSource>;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];
  private refreshTokenURL = `${API_URL}/api-public/refresh-token`;
  private channelType = 'WEB_PORTAL';

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL, // Set the base URL for all API requests
      // timeout: 5000, // Example timeout (adjust as necessary)
      headers: this.getDefaultHeaders(),
    });
    this.cancelTokenSources = new Map<string, CancelTokenSource>();
    this.setupInterceptors();
  }

  // Private method to get default headers
  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      // You can add other default headers here
      // Authorization: this.getAuthToken()
    };

    if (typeof window !== 'undefined') {
      headers[HEADER_NAMES.DEVICE_ID] = getDeviceIdSync();
      headers[HEADER_NAMES.CHANNEL_TYPE] = this.channelType;
    }

    return headers;
  }

  //interceptor to refresh the token
  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (typeof window !== 'undefined') {
          config.headers[HEADER_NAMES.DEVICE_ID] = getDeviceIdSync();
          config.headers[HEADER_NAMES.CHANNEL_TYPE] = this.channelType;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          const originalRequest = error.config;
          originalRequest._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            this.onTokenRefreshed(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public getAuthToken(): string | null {
    if (cookies.get('accessToken')) {
      return cookies.get('accessToken');
    }
    return null;
  }

  public getRefreshToken(): string | null {
    if (cookies.get('refreshToken')) {
      return cookies.get('refreshToken');
    }
    return null;
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise<string>((resolve) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available.');
      }

      const response = await this.axiosInstance.post<RefreshTokenType>(
        this.refreshTokenURL,
        { refreshToken },
        {
          headers: {
            'Content-Type': 'application/json',
            [HEADER_NAMES.DEVICE_ID]: getDeviceIdSync(),
            [HEADER_NAMES.CHANNEL_TYPE]: this.channelType,
          },
        }
      );

      const { access_token, refresh_token } = response.data;

      await setServerCookie({ name: 'accessToken', value: access_token });
      await setServerCookie({ name: 'refreshToken', value: refresh_token });

      this.refreshSubscribers.forEach((callback) => callback(access_token));
      this.refreshSubscribers = [];

      return access_token;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      this.logout();
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  private onTokenRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
  }

  private logout() {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
    // window.location.href = '/en';
  }

  // Method to handle cancellation of previous requests
  private setupCancelToken(requestKey: string): CancelTokenSource {
    // Cancel the previous request with the same key if it exists
    if (this.cancelTokenSources.has(requestKey)) {
      const previousTokenSource = this.cancelTokenSources.get(requestKey)!;
      previousTokenSource.cancel(`Request with key "${requestKey}" canceled due to a new request.`);
    }

    // Create a new cancel token source and store it with the key
    const cancelTokenSource = axios.CancelToken.source();
    this.cancelTokenSources.set(requestKey, cancelTokenSource);

    return cancelTokenSource;
  }

  // Clean up the cancel token after the request is completed
  private clearCancelToken(requestKey: string) {
    this.cancelTokenSources.delete(requestKey);
  }

  // GET method
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    requestKey?: string
  ): Promise<AxiosResponse<T>> {
    const cancelTokenSource = requestKey ? this.setupCancelToken(requestKey) : undefined;
    try {
      return await this.axiosInstance.get<T>(url, {
        ...config,
        cancelToken: cancelTokenSource?.token,
        headers: { ...(config?.headers || {}) },
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        throw new Error('Request was canceled'); // Throw a specific cancellation error
      } else {
        console.error('Error occurred during GET request:', error);
        throw error; // Re-throw the error to be handled by the caller
      }
    } finally {
      if (requestKey) {
        this.clearCancelToken(requestKey);
      }
    }
  }

  // POST method
  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    requestKey?: string
  ): Promise<AxiosResponse<T>> {
    const cancelTokenSource = requestKey ? this.setupCancelToken(requestKey) : undefined;

    try {
      return await this.axiosInstance.post<T>(url, data, {
        ...config,
        cancelToken: cancelTokenSource?.token,
        headers: { ...(config?.headers || {}) },
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        throw new Error('Request was canceled');
      } else {
        console.error('Error occurred during POST request:', error);
        throw error;
      }
    } finally {
      if (requestKey) {
        this.clearCancelToken(requestKey);
      }
    }
  }

  // PUT method
  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
    requestKey?: string
  ): Promise<AxiosResponse<T>> {
    const cancelTokenSource = requestKey ? this.setupCancelToken(requestKey) : undefined;

    try {
      return await this.axiosInstance.put<T>(url, data, {
        ...config,
        cancelToken: cancelTokenSource?.token,
        headers: { ...(config?.headers || {}) },
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        throw new Error('Request was canceled');
      } else {
        console.error('Error occurred during PUT request:', error);
        throw error;
      }
    } finally {
      if (requestKey) {
        this.clearCancelToken(requestKey);
      }
    }
  }

  // DELETE method
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
    requestKey?: string
  ): Promise<AxiosResponse<T>> {
    const cancelTokenSource = requestKey ? this.setupCancelToken(requestKey) : undefined;

    try {
      return await this.axiosInstance.delete<T>(url, {
        ...config,
        cancelToken: cancelTokenSource?.token,
        headers: { ...(config?.headers || {}) },
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
        throw new Error('Request was canceled');
      } else {
        console.error('Error occurred during DELETE request:', error);
        throw error;
      }
    } finally {
      if (requestKey) {
        this.clearCancelToken(requestKey);
      }
    }
  }
}
