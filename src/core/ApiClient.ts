import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { API_URL } from '@/core/config';

export class ApiClient {
  private axiosInstance: AxiosInstance;
  public static shared = new ApiClient(API_URL);
  private cancelTokenSources: Map<string, CancelTokenSource>;

  private constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL, // Set the base URL for all API requests
      // timeout: 5000, // Example timeout (adjust as necessary)
      headers: this.getDefaultHeaders(),
    });
    this.cancelTokenSources = new Map<string, CancelTokenSource>();
  }

  // Private method to get default headers
  private getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      // You can add other default headers here
      // Authorization: this.getAuthToken()
    };
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
