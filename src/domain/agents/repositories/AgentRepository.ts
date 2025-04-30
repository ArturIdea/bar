import { Agent } from '../entities/Agent';

export interface AgentRepository {
  getAgents: () => Promise<Agent[]>;
}
