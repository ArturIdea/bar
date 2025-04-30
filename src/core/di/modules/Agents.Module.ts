import { Container } from 'inversify';
import { AgentRepository } from '@/domain/agents/repositories/AgentRepository';
import { GetAgentsUseCase } from '@/domain/agents/useCases/GetAgent';
import { AgentRepositoryAPI } from '@/infrastructure/api/AgentRepositoryAPI';

export const loadAgentsRepositories = (container: Container) => {
  container.bind('AgentRepository').to(AgentRepositoryAPI).inSingletonScope();
};

export const loadAgentsUseCases = (container: Container) => {
  container
    .bind('GetAgents')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<AgentRepository>('AgentRepository');
      return new GetAgentsUseCase(publicRepo);
    })
    .inSingletonScope();
};
