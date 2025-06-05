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
    createdAtFrom?: string,
    createdAtTo?: string,
    pinflSearch?: string,
    usernameSearch?: string,
    createdBy?: string,
    isCitizen?: boolean
  ): Promise<{ users: User[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      this.ApiUrl,
      {
        params: {
          page,
          size,
          registrationChannel,
          createdAtFrom,
          createdAtTo,
          pinflSearch,
          usernameSearch,
          createdBy,
          isCitizen,
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
