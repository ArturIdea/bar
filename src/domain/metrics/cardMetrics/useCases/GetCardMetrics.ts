import { CardMetrics } from '../entities/CardMetrics';
import { CardMetricsRepository } from '../repositories/CardMetricsRepository';

export class GetCardMetrics {
  constructor(private metricsRepository: CardMetricsRepository) {}

  async execute(): Promise<CardMetrics> {
    return this.metricsRepository.getCardMetrics();
  }
}
