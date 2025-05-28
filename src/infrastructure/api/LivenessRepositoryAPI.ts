import { ApiClient } from '@/core/ApiClient';
import { Liveness } from '@/domain/liveness/entities/Liveness';
import { LivenessRepository } from '@/domain/liveness/repositories/LivenessRepository';
import { LivenessAdapter } from '@/interfaces/LivenessAdapter';

export class LivenessRepositoryAPI implements LivenessRepository {
  private apiClient = ApiClient.shared;
  private ApiUrl = '/api/admin/liveness';

  async getLiveness(): Promise<Liveness[]> {
    const response = await this.apiClient.get(this.ApiUrl);

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return LivenessAdapter.toDomainList(response.data);
  }
}




