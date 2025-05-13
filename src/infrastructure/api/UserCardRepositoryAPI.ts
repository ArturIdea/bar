import { ApiClient } from '@/core/ApiClient';
import { UserCard } from '@/domain/users/entities/UserCard';
import { UserCardRepository } from '@/domain/users/repositories/UserCardRepository';
import { UserCardAdapter } from '@/interfaces/UserCardAdapter';

export class UserCardRepositoryAPI implements UserCardRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/user';

  async getUserCards(userId?: string): Promise<UserCard> {
    if (!userId) {
      throw new Error('Either userId or pinfl must be provided');
    }

    const response = await this.apiClient.get(`${this.apiUrl}/${userId}/card`);

    return UserCardAdapter.toDomain(response.data);
  }
}
