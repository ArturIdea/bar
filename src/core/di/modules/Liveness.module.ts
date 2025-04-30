import { Container } from 'inversify';
import { LivenessRepository } from '@/domain/liveness/repositories/LivenessRepository';
import { GetLivenessUseCase } from '@/domain/liveness/useCases/GetLiveness';
import { LivenessRepositoryAPI } from '@/infrastructure/api/LivenessRepositoryAPI';

export const loadLivenessRepositories = (container: Container) => {
  container.bind('LivenessRepository').to(LivenessRepositoryAPI).inSingletonScope();
};

export const loadLivenessUseCases = (container: Container) => {
  container
    .bind('GetLiveness')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<LivenessRepository>('LivenessRepository');
      return new GetLivenessUseCase(publicRepo);
    })
    .inSingletonScope();
};
