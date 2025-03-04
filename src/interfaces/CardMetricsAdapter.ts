import { CardMetrics } from '@/domain/metrics/cardMetrics/entities/CardMetrics';

export const CardMetricsAdapter = {
  toDomain(raw: any): CardMetrics {
    return new CardMetrics(raw.physicalCards, raw.virtualCards);
  },
};
