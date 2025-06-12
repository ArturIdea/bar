/* eslint-disable no-console */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import Cookies from 'universal-cookie';
import { API_URL } from '@/core/config';
import { getDeviceIdSync } from './utils/deviceUtils';
import { CHANNEL_TYPE, HEADER_NAMES } from './utils/headers';
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

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: this.getDefaultHeaders(),
    });
    this.cancelTokenSources = new Map<string, CancelTokenSource>();
    this.setupInterceptors();
  }

  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    if (typeof window !== 'undefined') {
      headers[HEADER_NAMES.DEVICE_HEADER] = getDeviceIdSync();
      headers[HEADER_NAMES.CHANNEL_HEADER] = CHANNEL_TYPE;
    }

    return headers;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (typeof window !== 'undefined') {
          config.headers[HEADER_NAMES.DEVICE_HEADER] = getDeviceIdSync();
          config.headers[HEADER_NAMES.CHANNEL_HEADER] = CHANNEL_TYPE;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        const originalRequest = error.config;
        if (status === 401 && !originalRequest._retry) {
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
    const maxRetries = 3;
    let lastError: any;

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

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const response = await this.axiosInstance.post<RefreshTokenType>(
            this.refreshTokenURL,
            { refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
                [HEADER_NAMES.DEVICE_HEADER]: getDeviceIdSync(),
                [HEADER_NAMES.CHANNEL_HEADER]: CHANNEL_TYPE,
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
          lastError = error;
          console.warn(`Attempt ${attempt} to refresh token failed:`, error);
        }
      }

      throw lastError;
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
    window.location.href = '/';
  }

  private setupCancelToken(requestKey: string): CancelTokenSource {
    if (this.cancelTokenSources.has(requestKey)) {
      const previousTokenSource = this.cancelTokenSources.get(requestKey)!;
      previousTokenSource.cancel(`Request with key "${requestKey}" canceled due to a new request.`);
    }

    const cancelTokenSource = axios.CancelToken.source();
    this.cancelTokenSources.set(requestKey, cancelTokenSource);

    return cancelTokenSource;
  }

  private clearCancelToken(requestKey: string) {
    this.cancelTokenSources.delete(requestKey);
  }

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
        headers: {
          ...this.getDefaultHeaders(),
          ...(config?.headers || {}),
        },
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new Error('Request was canceled');
      } else {
        console.error('Error occurred during GET request:', error);
        throw error;
      }
    } finally {
      if (requestKey) {
        this.clearCancelToken(requestKey);
      }
    }
  }

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
        headers: {
          ...this.getDefaultHeaders(),
          ...(config?.headers || {}),
        },
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
        headers: {
          ...this.getDefaultHeaders(),
          ...(config?.headers || {}),
        },
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
        headers: {
          ...this.getDefaultHeaders(),
          ...(config?.headers || {}),
        },
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
