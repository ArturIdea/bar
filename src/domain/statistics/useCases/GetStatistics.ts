import { Statistics } from '../entities/Statistics';
import { StatisticsRepository } from '../repositories/StatisticsRepository';

export class GetStatisticsUseCase {
  constructor(private statisticsRepository: StatisticsRepository) {}

  async execute(
    newAccountsSince: string,
    cardsIssuedSince: string,
    requestsSince?: string,
    successfulRequestsSince?: string,
    failedRequestsSince?: string
  ): Promise<Statistics> {
    const requestsDate = requestsSince || newAccountsSince;
    const successfulRequestsDate = successfulRequestsSince || newAccountsSince;
    const failedRequestsDate = failedRequestsSince || newAccountsSince;

    return this.statisticsRepository.getStatistics(
      newAccountsSince,
      cardsIssuedSince,
      requestsDate,
      successfulRequestsDate,
      failedRequestsDate
    );
  }
}
