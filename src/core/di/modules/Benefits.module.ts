import { Container } from 'inversify';
import { BenefitsRepository } from '@/domain/benefits/repositories/BenefitsRepository';
import { GetBenefits } from '@/domain/benefits/useCases/GetBenefits';
import { BenefitsRepositoryAPI } from '@/infrastructure/api/BenefitsRepositoryAPI';

export const loadBenefitsRepositories = (container: Container) => {
  container.bind('BenefitsRepository').to(BenefitsRepositoryAPI).inSingletonScope();
};

export const loadBenefitsUseCases = (container: Container) => {
  container
    .bind('GetBenefits')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<BenefitsRepository>('BenefitsRepository');
      return new GetBenefits(publicRepo);
    })
    .inSingletonScope();
};
