import {
  BranchCode,
  UserBenefitBankAccount,
} from '@/domain/users/dev/entities/UserBenefitBankAccount';

export const UserBenefitBankAccountAdapter = {
  toDomain(raw: any): UserBenefitBankAccount {
    return new UserBenefitBankAccount(
      raw.id,
      raw.benefitTypeId,
      raw.masterBankAccountNumber,
      raw.subBankAccountNumber,
      new BranchCode(raw.branchCode.value),
      raw.bankCode,
      raw.createdAt
    );
  },

  toDomainList(rawList: any[]): UserBenefitBankAccount[] {
    return rawList.map((raw) => UserBenefitBankAccountAdapter.toDomain(raw));
  },
};
