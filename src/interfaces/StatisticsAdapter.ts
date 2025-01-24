import { Statistics } from '@/domain/statistics/entities/Statistics';

export const StatisticsAdapter = {
  toDomain(raw: any): Statistics {
    return new Statistics(raw.newAccountsSince, raw.newFundsDisbursedSince, raw.cardsIssuedSince);
  },
};
