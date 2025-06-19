import { ApiClient } from '@/core/ApiClient';
import { User } from '@/domain/users/entities/User';
import { UserRepository } from '@/domain/users/repositories/UserRepository';
import { UserAdapter } from '@/interfaces/UserAdapter';

export class UserRepositoryAPI implements UserRepository {
  private apiClient = ApiClient.shared;
  private ApiUrl = '/api/admin/users';

  async getUsers(
    page: number,
    size: number,
    registrationChannel?: string,
    fromDate?: string,
    toDate?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string,
    isCitizen?: boolean,
    userId?: string,
    bankType?: string,
    onboardingChannel?: string
  ): Promise<{ users: User[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      this.ApiUrl,
      {
        params: {
          page,
          size,
          registrationChannel,
          fromDate,
          toDate,
          pinflSearch,
          usernameSearch,
          createdBy,
          isCitizen,
          ...(userId && { userId }),
          ...(bankType && { bankType }),
          ...(onboardingChannel && { onboardingChannel }),
          sort: 'createdAt,DESC',
        },
      }
    );

    return {
      users: response.data.content.map(UserAdapter.toDomain),
      total: response.data.totalElements,
    };
  }
}
