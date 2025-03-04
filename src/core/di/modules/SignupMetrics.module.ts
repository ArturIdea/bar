import { Container } from 'inversify';
import { SignupMetricsRepository } from '@/domain/metrics/signupMetrics/repositories/SignupMetricsRepository';
import { GetSignupMetrics } from '@/domain/metrics/signupMetrics/useCases/GetSignupMetric';
import { SignupRequestMetricsRepositoryAPI } from '@/infrastructure/api/SignupMetricsRepositoryAPI';

export const loadSignupMetricsRepositories = (container: Container) => {
  container
    .bind('SignupMetricsRepository')
    .to(SignupRequestMetricsRepositoryAPI)
    .inSingletonScope();
};

export const loadSignupMetricsUseCases = (container: Container) => {
  container
    .bind('GetSignupMetrics')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<SignupMetricsRepository>('SignupMetricsRepository');
      return new GetSignupMetrics(publicRepo);
    })
    .inSingletonScope();
};
