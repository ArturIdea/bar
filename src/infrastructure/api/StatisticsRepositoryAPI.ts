import { ApiClient } from '@/core/ApiClient';
import { Statistics } from '@/domain/statistics/entities/Statistics';
import { StatisticsRepository } from '@/domain/statistics/repositories/StatisticsRepository';
import { StatisticsAdapter } from '@/interfaces/StatisticsAdapter';

export class StatisticsRepositoryAPI implements StatisticsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/statistics';

  async getStatistics(
    newAccountsSince: string,
    cardsIssuedSince: string,
    requestsSince: string,
    successfulRequestsSince: string,
    failedRequestsSince: string
  ): Promise<Statistics> {
    const params = {
      newAccountsSince,
      cardsIssuedSince,
      requestsSince,
      successfulRequestsSince,
      failedRequestsSince,
    };

    const response = await this.apiClient.get<{
      newAccounts: number;
      newCards: number;
      requests: number;
      successfulRequests: number;
      failedRequests: number;
    }>(this.apiUrl, { params });

    return StatisticsAdapter.toDomain(response.data);
  }
}
