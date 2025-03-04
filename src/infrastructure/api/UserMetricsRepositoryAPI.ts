import { ApiClient } from '@/core/ApiClient';
import { UserMetric } from '@/domain/metrics/userMetrics/entities/UserMetric';
import { UserMetricsRepository } from '@/domain/metrics/userMetrics/repositories/UserMetricsRepository';
import { UserMetricsAdapter } from '@/interfaces/UserMetricsAdapter';

export class UserMetricsRepositoryAPI implements UserMetricsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/users';

  async getUserMetrics(from?: string, to?: string): Promise<UserMetric[]> {
    const response = await this.apiClient.get(this.apiUrl, {
      params: {
        from,
        to,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return UserMetricsAdapter.toDomainList(response.data);
  }
}
