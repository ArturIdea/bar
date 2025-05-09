import { ApiClient } from '@/core/ApiClient';
import { SignupFailureRate } from '@/domain/metrics/signupMetrics/entities/SignupFailureRate';
import { SignupFailureRatesRepository } from '@/domain/metrics/signupMetrics/repositories/SignupFailureRatesRepository';
import { SignupFailureRatesAdapter } from '@/interfaces/SignupFailureRatesAdapter';

export class SignupFailureRateRepositoryAPI implements SignupFailureRatesRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/dropoff-trends';

  async getSignupFailureRates(fromDate?: string, toDate?: string): Promise<SignupFailureRate[]> {
    const response = await this.apiClient.get(this.apiUrl, {
      params: {
        fromDate,
        toDate,
      },
    });

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return SignupFailureRatesAdapter.toDomainList(response.data);
  }
}
