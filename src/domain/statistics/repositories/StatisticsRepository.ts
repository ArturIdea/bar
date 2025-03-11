import { Statistics } from '../entities/Statistics';

export interface StatisticsRepository {
  getStatistics: (
    newAccountsSince: string,
    newFundsDisbursedSince: string,
    cardsIssuedSince: string,
    requestsSince: string,
    successfulRequestsSince: string,
    failedRequestsSince: string
  ) => Promise<Statistics>;
}
