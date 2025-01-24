import { ApiClient } from '@/core/ApiClient';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { StatisticsRepository } from '@/domain/statistics/repositories/StatisticsRepository';
import { StatisticsAdapter } from '@/interfaces/StatisticsAdapter';

export class StatisticsRepositoryAPI implements StatisticsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/statistics';

  async getStatistics(
    newAccountsSince: string,
    newFundsDisbursedSince: string,
    cardsIssuedSince: string
  ): Promise<Statistics> {
    const params = {
      newAccountsSince,
      newFundsDisbursedSince,
      cardsIssuedSince,
    };

    const response = await this.apiClient.get<{
      newAccounts: number;
      fundsDisbursed: number;
      newCards: number;
    }>(this.apiUrl, { params });

    return StatisticsAdapter.toDomain(response.data);
  }
}
