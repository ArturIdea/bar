import { Container } from 'inversify';
import { UserBenefitRepository } from '@/domain/users/dev/repositories/UserBenefitRepository';
import { GetUserBenefits } from '@/domain/users/dev/useCases/GetUserBenefits';
import { UserBenefitRepositoryAPI } from '@/infrastructure/api/dev/UserBenefitRepositoryAPI';

export const loadDevUserBenefitRepositories = (container: Container) => {
  container.bind('DevUserBenefitRepository').to(UserBenefitRepositoryAPI).inSingletonScope();
};

export const loadDevUserBenefitUseCases = (container: Container) => {
  container
    .bind('GetDevUserBenefits')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserBenefitRepository>('DevUserBenefitRepository');
      return new GetUserBenefits(publicRepo);
    })
    .inSingletonScope();
};
