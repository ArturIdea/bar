import { ApiClient } from '@/core/ApiClient';
import { UserDetail } from '@/domain/users/entities/UserDetail';
import { UserDetailRepository } from '@/domain/users/repositories/UserDetailRepository';
import { UserDetailAdapter } from '@/interfaces/UserDetailAdapter';

export class UserDetailRepositoryAPI implements UserDetailRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/user';

  async getUserDetails(userId?: string, pinfl?: string): Promise<UserDetail> {
    if (!userId && !pinfl) {
      throw new Error('Either userId or pinfl must be provided');
    }

    const queryParams = userId ? `userId=${userId}` : `pinfl=${pinfl}`;
    const response = await this.apiClient.get(`${this.apiUrl}?${queryParams}`);

    return UserDetailAdapter.toDomain(response.data);
  }
}
