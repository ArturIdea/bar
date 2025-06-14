import { Statistics } from '../entities/Statistics';

export interface StatisticsRepository {
  getStatistics: (
    newAccountsSince: string,
    cardsIssuedSince: string,
    requestsSince: string,
    successfulRequestsSince: string,
    failedRequestsSince: string,
    onboardingChannel?: string,
    bankType?: string
  ) => Promise<Statistics>;
}
