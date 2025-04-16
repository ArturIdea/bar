import { ApiClient } from '@/core/ApiClient';
import { UserDetail } from '@/domain/users/dev/entities/UserDetail';
import { UserDetailRepository } from '@/domain/users/dev/repositories/UserDetailsRepository';
import { UserDetailsAdapter } from '@/interfaces/dev/UserDetailsAdapter';

export class UserDetailRepositoryAPI implements UserDetailRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserDetailById(userId?: string): Promise<UserDetail> {
    if (!userId) {
      throw new Error('Either userId or pinfl must be provided');
    }

    const queryParams = userId ? `${userId}` : '';
    const response = await this.apiClient.get(`${this.apiUrl}/${queryParams}`);

    return UserDetailsAdapter.toDomain(response.data);
  }
}
