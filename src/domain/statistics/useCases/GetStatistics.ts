import { Statistics } from '../entities/Statistics';
import { StatisticsRepository } from '../repositories/StatisticsRepository';

export class GetStatistics {
  constructor(private statisticsRepository: StatisticsRepository) {}

  async execute(): Promise<Statistics> {
    return this.statisticsRepository.getStatistics();
  }
}
