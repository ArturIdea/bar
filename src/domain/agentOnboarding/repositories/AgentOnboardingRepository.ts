import { AgentOnboardingStatus } from '../entities/AgentOnboardingStatus';

export interface AgentOnboardingRepository {
  getAgentOnboardingStatus: (
    userId: string,
    fromDate: string,
    toDate: string
  ) => Promise<AgentOnboardingStatus>;
} 