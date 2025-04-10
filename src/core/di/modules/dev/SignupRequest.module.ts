import { Container } from 'inversify';
import { SignUpRequestsRepository } from '@/domain/signupRequests/dev/repositories/SignupRequestRepository';
import { GetSignUpRequestsUseCase } from '@/domain/signupRequests/dev/useCases/GetSignupRequests';
import { SignUpRequestsRepositoryAPI } from '@/infrastructure/api/dev/SignupRequestRepositoryAPI';

export const loadDevSignupRequestRepositories = (container: Container) => {
  container.bind('DevSignupRequestsRepository').to(SignUpRequestsRepositoryAPI).inSingletonScope();
};

export const loadDevSignupRequestUseCases = (container: Container) => {
  container
    .bind('GetDevSignupRequests')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<SignUpRequestsRepository>(
        'DevSignupRequestsRepository'
      );
      return new GetSignUpRequestsUseCase(publicRepo);
    })
    .inSingletonScope();
};
