import { UserBenefitBankAccount } from '../entities/UserBenefitBankAccount';

export interface UserBenefitBankAccountRepository {
  getUserBenefitBankAccounts: (userId: string) => Promise<UserBenefitBankAccount[]>;
}
