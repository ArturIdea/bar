import { Container } from 'inversify';
import { UserMetricsRepository } from '@/domain/metrics/userMetrics/repositories/UserMetricsRepository';
import { GetUserMetrics } from '@/domain/metrics/userMetrics/useCases/GetUserMetric';
import { UserMetricsRepositoryAPI } from '@/infrastructure/api/UserMetricsRepositoryAPI';

export const loadUserMetricsRepositories = (container: Container) => {
  container.bind('UserMetricsRepository').to(UserMetricsRepositoryAPI).inSingletonScope();
};

export const loadUserMetricsUseCases = (container: Container) => {
  container
    .bind('GetUserMetrics')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserMetricsRepository>('UserMetricsRepository');
      return new GetUserMetrics(publicRepo);
    })
    .inSingletonScope();
};
