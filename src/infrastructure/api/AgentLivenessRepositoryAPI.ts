import { ApiClient } from '@/core/ApiClient';
import { Liveness } from '@/domain/liveness/entities/Liveness';
import { AgentLivenessRepository } from '@/domain/liveness/repositories/AgentLivenessRepository';
import { LivenessAdapter } from '@/interfaces/LivenessAdapter';

export class AgentLivenessRepositoryAPI implements AgentLivenessRepository {
  private apiClient = ApiClient.shared;
  private ApiUrl = '/api/agent/liveness';

  async getAgentLiveness(): Promise<Liveness[]> {
    const response = await this.apiClient.get(this.ApiUrl);

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return LivenessAdapter.toDomainList(response.data);
  }
} 