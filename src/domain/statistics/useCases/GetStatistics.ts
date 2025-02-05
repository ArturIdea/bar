import { Statistics } from '../entities/Statistics';
import { StatisticsRepository } from '../repositories/StatisticsRepository';

export class GetStatisticsUseCase {
  constructor(private statisticsRepository: StatisticsRepository) {}

  async execute(
    newAccountsSince: string,
    newFundsDisbursedSince: string,
    cardsIssuedSince: string
  ): Promise<Statistics> {
    return this.statisticsRepository.getStatistics(
      newAccountsSince,
      newFundsDisbursedSince,
      cardsIssuedSince
    );
  }
}
