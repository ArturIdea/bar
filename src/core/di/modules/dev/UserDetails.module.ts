import { Container } from 'inversify';
import { UserDetailRepository } from '@/domain/users/dev/repositories/UserDetailsRepository';
import { GetUserDetailsById } from '@/domain/users/dev/useCases/GetUserDetailById';
import { UserDetailRepositoryAPI } from '@/infrastructure/api/dev/UserDetailsRepositoryAPI';

export const loadDevUserDetailsRepositories = (container: Container) => {
  container.bind('DevUserDetailRepository').to(UserDetailRepositoryAPI).inSingletonScope();
};

export const loadDevUserDetailsUseCases = (container: Container) => {
  container
    .bind('GetDevUserDetail')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserDetailRepository>('DevUserDetailRepository');
      return new GetUserDetailsById(publicRepo);
    })
    .inSingletonScope();
};
