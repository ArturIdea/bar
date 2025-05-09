import { ApiClient } from '@/core/ApiClient';
import { SignupStageMetric } from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';
import { SignupStageMetricsRepository } from '@/domain/metrics/signupMetrics/repositories/SignupStageMetricsRepository';
import { SignupStageMetricsAdapter } from '@/interfaces/SignupStageMetricsAdapter';

export class SignupStageMetricsRepositoryAPI implements SignupStageMetricsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/dropoffs';

  async getSignupStageMetrics(fromDate?: string, toDate?: string): Promise<SignupStageMetric[]> {
    const response = await this.apiClient.get(this.apiUrl, {
      params: { fromDate, toDate },
    });

    if (
      typeof response.data !== 'object' ||
      Array.isArray(response.data) ||
      response.data === null
    ) {
      throw new Error('API response is not an object');
    }

    return SignupStageMetricsAdapter.toDomainList(response.data);
  }
}
