import { Container } from 'inversify';
import { AgentOnboardingRepository } from '@/domain/agentOnboarding/repositories/AgentOnboardingRepository';
import { AgentOnboardingRepositoryAPI } from '@/infrastructure/api/AgentOnboardingRepositoryAPI';
import { GetAgentOnboardingStatus } from '@/domain/agentOnboarding/useCases/GetAgentOnboardingStatus';

export const loadAgentOnboardingRepositories = (container: Container) => {
  container.bind<AgentOnboardingRepository>('AgentOnboardingRepository').to(AgentOnboardingRepositoryAPI).inSingletonScope();
};

export const loadAgentOnboardingUseCases = (container: Container) => {
  container
    .bind<GetAgentOnboardingStatus>('GetAgentOnboardingStatus')
    .toDynamicValue((context) => {
      const repository = context.container.get<AgentOnboardingRepository>('AgentOnboardingRepository');
      return new GetAgentOnboardingStatus(repository);
    })
    .inSingletonScope();
}; 