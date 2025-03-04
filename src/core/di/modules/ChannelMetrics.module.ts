import { Container } from 'inversify';
import { ChannelMetricsRepository } from '@/domain/metrics/onboardingChannelsMetrics/repositories/ChannelMetricRepository';
import { GetChannelMetrics } from '@/domain/metrics/onboardingChannelsMetrics/useCases/GetChannelMetrics';
import { ChannelMetricsRepositoryAPI } from '@/infrastructure/api/ChannelMetricsRepositoryAPI';

export const loadChannelMetricsRepositories = (container: Container) => {
  container.bind('ChannelMetricsRepository').to(ChannelMetricsRepositoryAPI).inSingletonScope();
};

export const loadChannelMetricsUseCases = (container: Container) => {
  container
    .bind('GetChannelMetrics')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<ChannelMetricsRepository>(
        'ChannelMetricsRepository'
      );
      return new GetChannelMetrics(publicRepo);
    })
    .inSingletonScope();
};
