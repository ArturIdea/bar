import { Statistics } from '@/domain/statistics/entities/Statistics';

export const StatisticsAdapter = {
  toDomain(raw: any): Statistics {
    return new Statistics(
      raw.newAccounts,
      raw.newCards,
      raw.requests,
      raw.successfulRequests,
      raw.failedRequests
    );
  },
};
