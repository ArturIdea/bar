import { Liveness } from '../entities/Liveness';
import { AgentLivenessRepository } from '../repositories/AgentLivenessRepository';

export class GetAgentLivenessUseCase {
  constructor(private agentLivenessRepository: AgentLivenessRepository) {}

  async execute(): Promise<Liveness[]> {
    return this.agentLivenessRepository.getAgentLiveness();
  }
} 