import { Container } from 'inversify';
import { UserDetailRepository } from '@/domain/users/repositories/UserDetailRepository';
import { GetUserDetailUseCase } from '@/domain/users/useCases/GetUserDetail';
import { UserDetailRepositoryAPI } from '@/infrastructure/api/UserDetailRepositoryAPI';

export const loadUserDetailsRepositories = (container: Container) => {
  container.bind('UserDetailRepository').to(UserDetailRepositoryAPI).inSingletonScope();
};

export const loadUserDetailsUseCases = (container: Container) => {
  container
    .bind('GetUserDetail')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserDetailRepository>('UserDetailRepository');
      return new GetUserDetailUseCase(publicRepo);
    })
    .inSingletonScope();
};
