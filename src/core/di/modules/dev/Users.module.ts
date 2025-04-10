import { Container } from 'inversify';
import { UserRepository } from '@/domain/users/dev/repositories/UserRepository';
import { GetUsersUseCase } from '@/domain/users/dev/useCases/GetUsers';
import { UserRepositoryAPI } from '@/infrastructure/api/dev/UserRepositoryAPI';

export const loadDevUsersRepositories = (container: Container) => {
  container.bind('DevUserRepository').to(UserRepositoryAPI).inSingletonScope();
};

export const loadDevUsersUseCasesDev = (container: Container) => {
  container
    .bind('GetDevUsers')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserRepository>('DevUserRepository');
      return new GetUsersUseCase(publicRepo);
    })
    .inSingletonScope();
};
