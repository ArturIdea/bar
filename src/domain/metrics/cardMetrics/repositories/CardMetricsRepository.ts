import { CardMetrics } from '../entities/CardMetrics';

export interface CardMetricsRepository {
  getCardMetrics: () => Promise<CardMetrics>;
}
