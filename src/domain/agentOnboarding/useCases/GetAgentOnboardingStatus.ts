import { AgentOnboardingStatus } from '../entities/AgentOnboardingStatus';
import { AgentOnboardingRepository } from '../repositories/AgentOnboardingRepository';

export class GetAgentOnboardingStatus {
  constructor(private agentOnboardingRepository: AgentOnboardingRepository) {}

  async execute(
    userId: string,
    fromDate: string,
    toDate: string
  ): Promise<AgentOnboardingStatus> {
    return this.agentOnboardingRepository.getAgentOnboardingStatus(
      userId,
      fromDate,
      toDate
    );
  }
} 