import { Container } from 'inversify';
import { SignupRequestDetailRepository } from '@/domain/signupRequests/repositories/SignupRequestDetailRepository';
import { GetSignupRequestDetailByIdUseCase } from '@/domain/signupRequests/useCases/GetSignupRequestDetailById';
import { SignupRequestDetailRepositoryAPI } from '@/infrastructure/api/SignupRequestDetailRepositoryAPI';

export const loadSignupRequestDetailRepositories = (container: Container) => {
  container
    .bind('SignupRequestDetailRepository')
    .to(SignupRequestDetailRepositoryAPI)
    .inSingletonScope();
};

export const loadSignupRequestDetailUseCases = (container: Container) => {
  container
    .bind('GetSignupRequestDetailById')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<SignupRequestDetailRepository>(
        'SignupRequestDetailRepository'
      );
      return new GetSignupRequestDetailByIdUseCase(publicRepo);
    })
    .inSingletonScope();
};
