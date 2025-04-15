import { UserBenefitBankAccountRepository } from '@/domain/users/dev/repositories/UserBenefitBankAccountRepository';
import { UserBenefitBankAccount } from '../entities/UserBenefitBankAccount';

export class GetUserBenefitBankAccounts {
  constructor(private repository: UserBenefitBankAccountRepository) {}

  async execute(userId: string): Promise<UserBenefitBankAccount[]> {
    return this.repository.getUserBenefitBankAccounts(userId);
  }
}
