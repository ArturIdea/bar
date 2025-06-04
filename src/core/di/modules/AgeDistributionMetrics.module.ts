import { Container } from 'inversify';
import { AgeDistributionMetricRepository } from '@/domain/metrics/ageDistributionMetrics/repositories/AgeDistributionRepository';
import { GetAgeDistribution } from '@/domain/metrics/ageDistributionMetrics/useCases/GetAgeDistributionMetric';
import { AgeDistributionMetricsRepositoryAPI } from '@/infrastructure/api/AgeDistributionMetricsRepository';

export const loadAgeDistributionMetricsRepositories = (container: Container) => {
  container
    .bind('AgeDistributionMetricsRepository')
    .to(AgeDistributionMetricsRepositoryAPI)
    .inSingletonScope();
};

export const loadAgeDistributionMetricsUseCases = (container: Container) => {
  container
    .bind('GetAgeDistribution')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<AgeDistributionMetricRepository>(
        'AgeDistributionMetricsRepository'
      );
      return new GetAgeDistribution(publicRepo);
    })
    .inSingletonScope();
};
