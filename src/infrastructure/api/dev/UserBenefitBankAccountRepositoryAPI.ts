import { ApiClient } from '@/core/ApiClient';
import { UserBenefitBankAccount } from '@/domain/users/dev/entities/UserBenefitBankAccount';
import { UserBenefitBankAccountRepository } from '@/domain/users/dev/repositories/UserBenefitBankAccountRepository';
import { UserBenefitBankAccountAdapter } from '@/interfaces/dev/UserBenefitBankAccountAdapter';

export class UserBenefitBankAccountRepositoryAPI implements UserBenefitBankAccountRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserBenefitBankAccounts(userId: string): Promise<UserBenefitBankAccount[]> {
    const response = await this.apiClient.get(`${this.apiUrl}/${userId}/benefit-bank-account`);

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return UserBenefitBankAccountAdapter.toDomainList(response.data);
  }
}
