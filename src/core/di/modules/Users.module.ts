import { Container } from 'inversify';
import { UserRepository } from '@/domain/users/repositories/UserRepository';
import { GetUsersUseCase } from '@/domain/users/useCases/GetUsers';
import { UserRepositoryAPI } from '@/infrastructure/api/UserRepositoryAPI';

export const loadUserstRepositories = (container: Container) => {
  container.bind('UserRepository').to(UserRepositoryAPI).inSingletonScope();
};

export const loadUsersUseCases = (container: Container) => {
  container
    .bind('GetUsers')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserRepository>('UserRepository');
      return new GetUsersUseCase(publicRepo);
    })
    .inSingletonScope();
};
