import { Container } from 'inversify';
import { SignUpRequestsRepository } from '@/domain/signupRequests/repositories/SignupRequestRepository';
import { GetSignUpRequestsUseCase } from '@/domain/signupRequests/useCases/GetSignupRequests';
import { SignUpRequestsRepositoryAPI } from '@/infrastructure/api/SignupRequestRepositoryAPI';

export const loadSignupRequestRepositories = (container: Container) => {
  container.bind('SignupRequestsRepository').to(SignUpRequestsRepositoryAPI).inSingletonScope();
};

export const loadSignupRequestUseCases = (container: Container) => {
  container
    .bind('GetSignupRequests')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<SignUpRequestsRepository>(
        'SignupRequestsRepository'
      );
      return new GetSignUpRequestsUseCase(publicRepo);
    })
    .inSingletonScope();
};
