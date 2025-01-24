import { ApiClient } from '@/core/ApiClient';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { StatisticsRepository } from '@/domain/statistics/repositories/StatisticsRepository';
import { StatisticsAdapter } from '@/interfaces/StatisticsAdapter';

export class StatisticsRepositoryAPI implements StatisticsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/statistics';

  async getStatistics(): Promise<Statistics> {
    const response = await this.apiClient.post<{
      newAccounts: number;
      fundsDisbursed: number;
      newCards: number;
    }>(this.apiUrl, {});

    return StatisticsAdapter.toDomain(response.data);
  }
}
