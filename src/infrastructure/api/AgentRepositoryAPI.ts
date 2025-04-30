import { ApiClient } from '@/core/ApiClient';
import { Agent } from '@/domain/agents/entities/Agent';
import { AgentRepository } from '@/domain/agents/repositories/AgentRepository';
import { AgentAdapter } from '@/interfaces/AgentAdapter';

export class AgentRepositoryAPI implements AgentRepository {
  private apiClient = ApiClient.shared;
  private ApiUrl = '/api/admin/agents';

  async getAgents(): Promise<Agent[]> {
    const response = await this.apiClient.get(this.ApiUrl);

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return AgentAdapter.toDomainList(response.data);
  }
}
