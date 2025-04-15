import { Container } from 'inversify';
import { UserBenefitBankAccountRepository } from '@/domain/users/dev/repositories/UserBenefitBankAccountRepository';
import { GetUserBenefitBankAccounts } from '@/domain/users/dev/useCases/GetUserBenefitBankAccounts';
import { UserBenefitBankAccountRepositoryAPI } from '@/infrastructure/api/dev/UserBenefitBankAccountRepositoryAPI';

export const loadDevUserBenefitBankAccountRepositories = (container: Container) => {
  container
    .bind('DevUserBenefitBankAccountRepository')
    .to(UserBenefitBankAccountRepositoryAPI)
    .inSingletonScope();
};

export const loadDevUserBenefitBankAccountUseCases = (container: Container) => {
  container
    .bind('GetDevUserBenefitBankAccount')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserBenefitBankAccountRepository>(
        'DevUserBenefitBankAccountRepository'
      );
      return new GetUserBenefitBankAccounts(publicRepo);
    })
    .inSingletonScope();
};
