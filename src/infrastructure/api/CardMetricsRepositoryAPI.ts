import { ApiClient } from '@/core/ApiClient';
import { CardMetrics } from '@/domain/cards/entities/CardMetrics';
import { CardMetricsRepository } from '@/domain/cards/repositories/CardMetricsRepository';
import { CardMetricsAdapter } from '@/interfaces/CardMetricsAdapter';

export class CardMetricsRepositoryAPI implements CardMetricsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/cards';

  async getCardMetrics(): Promise<CardMetrics> {
    const response = await this.apiClient.get(this.apiUrl);
    return CardMetricsAdapter.toDomain(response.data);
  }
}
