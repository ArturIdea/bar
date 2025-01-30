import { ApiClient } from '@/core/ApiClient';
import { SignUpRequest } from '@/domain/signupRequests/entities/SignupRequest';
import { SignUpRequestsRepository } from '@/domain/signupRequests/repositories/SignupRequestRepository';
import { SignUpRequestAdapter } from '@/interfaces/SignupRequestAdapter';

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export class SignUpRequestsRepositoryAPI implements SignUpRequestsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/signup-requests';

  async getSignUpRequests(
    page: number,
    size: number,
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    statuses?: string[]
  ): Promise<PaginatedResponse<SignUpRequest>> {
    const response = await this.apiClient.get<PaginatedResponse<any>>(this.apiUrl, {
      params: {
        page,
        size,
        createdAtFrom,
        createdAtTo,
        pinflSearch,
        statuses,
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
