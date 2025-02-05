import { Container } from 'inversify';
import { StatisticsRepository } from '@/domain/statistics/repositories/StatisticsRepository';
import { GetStatisticsUseCase } from '@/domain/statistics/useCases/GetStatistics';
import { StatisticsRepositoryAPI } from '@/infrastructure/api/StatisticsRepositoryAPI';

export const loadStatisticsRepositories = (container: Container) => {
  container.bind('StatisticsRepository').to(StatisticsRepositoryAPI).inSingletonScope();
};

export const loadStatisticsUseCases = (container: Container) => {
  container
    .bind('GetStatistics')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<StatisticsRepository>('StatisticsRepository');
      return new GetStatisticsUseCase(publicRepo);
    })
    .inSingletonScope();
};
