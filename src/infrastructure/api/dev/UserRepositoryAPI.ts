import { ApiClient } from '@/core/ApiClient';
import { User } from '@/domain/users/dev/entities/User';
import { UserRepository } from '@/domain/users/dev/repositories/UserRepository';
import { UserAdapter } from '@/interfaces/dev/UserAdapter';

export class UserRepositoryAPI implements UserRepository {
  private apiClient = ApiClient.shared;
  private ApiUrl = '/api/developer/users';

  async getUsers(
    page: number,
    size: number,
    signupRequestId?: string,
    documentTypeId?: string,
    pinflSearch?: string
  ): Promise<{ users: User[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      this.ApiUrl,
      {
        params: {
          page,
          size,
          signupRequestId,
          documentTypeId,
          pinflSearch,
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
