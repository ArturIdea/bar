import { AgentOnboardingStatus } from '@/domain/agentOnboarding/entities/AgentOnboardingStatus';
import { AgentOnboardingRepository } from '@/domain/agentOnboarding/repositories/AgentOnboardingRepository';
import { ApiClient } from '@/core/ApiClient';

export class AgentOnboardingRepositoryAPI implements AgentOnboardingRepository {
  private apiClient = ApiClient.shared;

  getAgentOnboardingStatus: (
    userId: string,
    fromDate: string,
    toDate: string
  ) => Promise<AgentOnboardingStatus> = async (userId, fromDate, toDate) => {
    const response = await this.apiClient.get<AgentOnboardingStatus>(
      `/admin/agent-onboarding-status?fromDate=${fromDate}&toDate=${toDate}&userId=${userId}`
    );
    return response.data;
  };
} 