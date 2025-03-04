import { ApiClient } from '@/core/ApiClient';
import { SignupMetric } from '@/domain/metrics/signupMetrics/entities/SignupMetric';
import { SignupMetricsRepository } from '@/domain/metrics/signupMetrics/repositories/SignupMetricsRepository';
import { SignupMetricsAdapter } from '@/interfaces/SignupMetricsAdapter';

export class SignupRequestMetricsRepositoryAPI implements SignupMetricsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/signup-requests';

  async getSignupMetrics(from?: string, to?: string): Promise<SignupMetric[]> {
    const response = await this.apiClient.get(this.apiUrl, {
      params: {
        from,
        to,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return SignupMetricsAdapter.toDomainList(response.data);
  }
}
