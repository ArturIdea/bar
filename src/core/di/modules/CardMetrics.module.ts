import { Container } from 'inversify';
import { CardMetricsRepository } from '@/domain/metrics/cardMetrics/repositories/CardMetricsRepository';
import { GetCardMetrics } from '@/domain/metrics/cardMetrics/useCases/GetCardMetrics';
import { CardMetricsRepositoryAPI } from '@/infrastructure/api/CardMetricsRepositoryAPI';

export const loadCardMetricsRepositories = (container: Container) => {
  container.bind('CardMetricsRepository').to(CardMetricsRepositoryAPI).inSingletonScope();
};

export const loadCardMetricsUseCases = (container: Container) => {
  container
    .bind('GetCardMetrics')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<CardMetricsRepository>('CardMetricsRepository');
      return new GetCardMetrics(publicRepo);
    })
    .inSingletonScope();
};
