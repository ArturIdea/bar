import { Agent } from '../entities/Agent';
import { AgentRepository } from '../repositories/AgentRepository';

export class GetAgentsUseCase {
  constructor(private agentRepository: AgentRepository) {}

  async execute(): Promise<Agent[]> {
    return this.agentRepository.getAgents();
  }
}
