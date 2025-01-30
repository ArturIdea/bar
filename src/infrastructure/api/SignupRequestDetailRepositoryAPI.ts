import { ApiClient } from '@/core/ApiClient';
import { SignupRequestDetail } from '@/domain/signupRequests/entities/SignupRequestDetail';
import { SignupRequestDetailRepository } from '@/domain/signupRequests/repositories/SignupRequestDetailRepository';
import { SignupRequestDetailAdapter } from '@/interfaces/SignupRequestDetailAdapter';

export class SignupRequestDetailRepositoryAPI implements SignupRequestDetailRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/signup-request';

  async getSignupRequestDetailById(id: string): Promise<SignupRequestDetail> {
    const response = await this.apiClient.get(`${this.apiUrl}/${id}`);
    return SignupRequestDetailAdapter.toDomain(response.data);
  }
}
