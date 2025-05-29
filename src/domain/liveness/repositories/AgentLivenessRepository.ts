import { Liveness } from '../entities/Liveness';

export interface AgentLivenessRepository {
  getAgentLiveness: () => Promise<Liveness[]>;
} 