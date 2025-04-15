import { ApiClient } from '@/core/ApiClient';
import { UserImpersonationOtp } from '@/domain/users/dev/entities/UserImpersonationOtp';
import { UserImpersonationOtpRepository } from '@/domain/users/dev/repositories/UserImpersonationOtpRepository';
import { UserImpersonationOtpAdapter } from '@/interfaces/dev/UserImpersonationOtpAdapter';

export class UserImpersonationOtpRepositoryAPI implements UserImpersonationOtpRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserImpersonationOtps(
    userId: string,
    page = 0,
    size = 10
  ): Promise<{ impersonations: UserImpersonationOtp[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      `${this.apiUrl}/${userId}/impersonations-otps`,
      {
        params: {
          page,
          size,
          sort: 'createdAt,DESC',
        },
      }
    );

    return {
      impersonations: response.data.content.map(UserImpersonationOtpAdapter.toDomain),
      total: response.data.totalElements,
    };
  }
}
