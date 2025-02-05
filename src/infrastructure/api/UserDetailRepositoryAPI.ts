import { ApiClient } from '@/core/ApiClient';
import { UserDetail } from '@/domain/users/entities/UserDetail';
import { UserDetailRepository } from '@/domain/users/repositories/UserDetailRepository';
import { UserDetailAdapter } from '@/interfaces/UserDetailAdapter';

export class UserDetailRepositoryAPI implements UserDetailRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/user';

  async getUserDetails(userId: string): Promise<UserDetail> {
    const response = await this.apiClient.get(`${this.apiUrl}?userId=${userId}`);
    return UserDetailAdapter.toDomain(response.data);
  }
}
