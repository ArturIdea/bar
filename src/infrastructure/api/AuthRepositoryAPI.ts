import axios from 'axios';
import { ApiClient } from '@/core/ApiClient';
import { API_URL, USER_TYPE } from '@/core/config';
import { getDeviceId } from '@/core/utils/deviceUtils';
import { CHANNEL_TYPE, HEADER_NAMES } from '@/core/utils/headers';
import { getRedirectURI } from '@/core/utils/oauth';
import { AuthRepository } from '@/domain/auth/repositories/AuthRepository';

export class AuthRepositoryAPI implements AuthRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = `${API_URL}/api-public/token-for-callback`;

  async getToken(code: string, codeVerifier: string, state: string): Promise<any> {
    const payload = {
      redirectUrl: getRedirectURI(),
      state,
      code,
      codeVerifier,
      deviceData: {
        manufacturer: 'Web',
        model: 'Browser',
        platform: 'Browser',
        osVersion: navigator.userAgent,
      },
      userType: USER_TYPE,
    };

    const deviceId = await getDeviceId();
    const headers = {
      'Content-Type': 'application/json',
      [HEADER_NAMES.DEVICE_HEADER]: deviceId,
      [HEADER_NAMES.CHANNEL_HEADER]: CHANNEL_TYPE,
    };

    try {
      const response = await this.apiClient.post(this.apiUrl, payload, { headers });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching token:', error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || error.message);
      }

      console.error('An unknown error occurred:', error);
      throw new Error('An unknown error occurred.');
    }
  }

  private generateDeviceId(): string {
    return crypto.randomUUID();
  }
}
