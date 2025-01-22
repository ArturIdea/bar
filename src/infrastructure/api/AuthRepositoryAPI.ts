import axios from 'axios';
import { AuthRepository } from '@/domain/auth/repositories/AuthRepository';

export class AuthRepositoryAPI implements AuthRepository {
  private apiUrl =
    'https://baraka-app-api-development.uz-pay-dev.ox.one/api-public/token-for-callback';

  async getToken(code: string, codeVerifier: string, state: string): Promise<any> {
    const payload = {
      redirectUrl: 'http://localhost:3000/en/callback',
      state,
      code,
      codeVerifier,
      deviceData: {
        manufacturer: 'Web',
        model: 'Browser',
        platform: 'Browser',
        osVersion: navigator.userAgent,
      },
      userType: 'ADMIN',
      clientId: 'baraka',
    };

    const headers = {
      'Content-Type': 'application/json',
      deviceId: this.generateDeviceId(),
    };

    try {
      const response = await axios.post(this.apiUrl, payload, { headers });

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
