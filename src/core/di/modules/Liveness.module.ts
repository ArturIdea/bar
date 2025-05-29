import { Container } from 'inversify';
import { LivenessRepository } from '@/domain/liveness/repositories/LivenessRepository';
import { GetLivenessUseCase } from '@/domain/liveness/useCases/GetLiveness';
import { LivenessRepositoryAPI } from '@/infrastructure/api/LivenessRepositoryAPI';
import { AgentLivenessRepository } from '@/domain/liveness/repositories/AgentLivenessRepository';
import { GetAgentLivenessUseCase } from '@/domain/liveness/useCases/GetAgentLiveness';
import { AgentLivenessRepositoryAPI } from '@/infrastructure/api/AgentLivenessRepositoryAPI';

export const loadLivenessRepositories = (container: Container) => {
  container.bind('LivenessRepository').to(LivenessRepositoryAPI).inSingletonScope();
  container.bind('AgentLivenessRepository').to(AgentLivenessRepositoryAPI).inSingletonScope();
};

export const loadLivenessUseCases = (container: Container) => {
  container
    .bind('GetLiveness')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<LivenessRepository>('LivenessRepository');
      return new GetLivenessUseCase(publicRepo);
    })
    .inSingletonScope();

  container
    .bind('GetAgentLiveness')
    .toDynamicValue((context) => {
      const agentRepo = context.container.get<AgentLivenessRepository>('AgentLivenessRepository');
      return new GetAgentLivenessUseCase(agentRepo);
    })
    .inSingletonScope();
};
