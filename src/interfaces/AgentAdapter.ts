import { Agent } from '@/domain/agents/entities/Agent';

export const AgentAdapter = {
  toDomain(raw: any): Agent {
    return new Agent(
      raw.userId,
      raw.firstName,
      raw.lastName,
      raw.totalRequests,
      raw.successfulRequests,
      raw.failedRequests,
      raw.dailyAverageSuccessfulRequests
    );
  },

  toDomainList(rawList: any[]): Agent[] {
    return rawList.map((raw) => AgentAdapter.toDomain(raw));
  },
};
