import { Container } from 'inversify';
import { SignupStageMetricsRepository } from '@/domain/metrics/signupMetrics/repositories/SignupStageMetricsRepository';
import { GetSignupStageMetrics } from '@/domain/metrics/signupMetrics/useCases/GetSignupStageMetrics';
import { SignupStageMetricsRepositoryAPI } from '@/infrastructure/api/SignupStageMetricsRepositoryAPI';

export const loadSignupStageMetricsRepositories = (container: Container) => {
  container
    .bind('SignupStageMetricsRepository')
    .to(SignupStageMetricsRepositoryAPI)
    .inSingletonScope();
};

export const loadSignupStageMetricsUseCases = (container: Container) => {
  container
    .bind('GetSignupStageMetrics')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<SignupStageMetricsRepository>(
        'SignupStageMetricsRepository'
      );
      return new GetSignupStageMetrics(publicRepo);
    })
    .inSingletonScope();
};
