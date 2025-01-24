import { ApiClient } from '@/core/ApiClient';
import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';
import { SignUpRequestsRepository } from '@/domain/signupRequests/repositories/SignupRequestRepository';
import { SignUpRequestAdapter } from '@/interfaces/SignupRequestAdapter';

export class SignUpRequestsRepositoryAPI implements SignUpRequestsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/signup-requests';

  async getSignUpRequests(page: number, size: number): Promise<SignUpRequest[]> {
    const response = await this.apiClient.get<{ content: any[] }>(this.apiUrl, {
      params: { page, size },
    });

    return response.data.content.map(SignUpRequestAdapter.toDomain);
  }
}
