import { ApiClient } from '@/core/ApiClient';
import { SignUpRequest } from '@/domain/signupRequests/dev/entities/SignupRequest';
import { SignUpRequestsRepository } from '@/domain/signupRequests/dev/repositories/SignupRequestRepository';
import { SignUpRequestAdapter } from '@/interfaces/dev/SignupRequestAdapter';
import { PaginatedResponse } from '../SignupRequestRepositoryAPI';

export class SignUpRequestsRepositoryAPI implements SignUpRequestsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/signup-requests';

  async getSignUpRequests(
    page: number,
    size: number,
    signupRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ): Promise<PaginatedResponse<SignUpRequest>> {
    const response = await this.apiClient.get<PaginatedResponse<any>>(this.apiUrl, {
      params: {
        page,
        size,
        signupRequestId,
        documentTypeId,
        pinflSearch,
        sort: 'createdAt,DESC',
      },
    });

    return {
      content: response.data.content.map(SignUpRequestAdapter.toDomain),
      totalPages: response.data.totalPages,
      totalElements: response.data.totalElements,
    };
  }
}
