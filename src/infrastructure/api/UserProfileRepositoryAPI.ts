import { ApiClient } from '@/core/ApiClient';
import { UserProfile } from '@/domain/users/entities/UserProfile';
import { UserProfileRepository } from '@/domain/users/repositories/UserProfileRepository';
import { UserDetailAdapter } from '@/interfaces/UserDetailAdapter';

export class UserProfileRepositoryAPI implements UserProfileRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/user';

  async getUserProfile(): Promise<UserProfile> {
    const response = await this.apiClient.get(this.apiUrl);

    return UserDetailAdapter.toDomain(response.data);
  }
}
