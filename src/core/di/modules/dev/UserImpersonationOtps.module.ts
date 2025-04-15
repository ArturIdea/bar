import { Container } from 'inversify';
import { UserImpersonationOtpRepository } from '@/domain/users/dev/repositories/UserImpersonationOtpRepository';
import { GetUserImpersonationOtps } from '@/domain/users/dev/useCases/GetUserImpersonationOtps';
import { UserImpersonationOtpRepositoryAPI } from '@/infrastructure/api/dev/UserImpersonationOtpRepositoryAPI';

export const loadDevUserImpersonationOtpsRepositories = (container: Container) => {
  container
    .bind('DevUserImpersonationOtpRepository')
    .to(UserImpersonationOtpRepositoryAPI)
    .inSingletonScope();
};

export const loadDevUserImpersonationOtpsUseCases = (container: Container) => {
  container
    .bind('GetDevUserImpersonationOtps')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserImpersonationOtpRepository>(
        'DevUserImpersonationOtpRepository'
      );
      return new GetUserImpersonationOtps(publicRepo);
    })
    .inSingletonScope();
};
