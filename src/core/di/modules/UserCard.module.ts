import { Container } from 'inversify';
import { UserCardRepository } from '@/domain/users/repositories/UserCardRepository';
import { GetUserCardsUseCase } from '@/domain/users/useCases/GetUserCards';
import { UserCardRepositoryAPI } from '@/infrastructure/api/UserCardRepositoryAPI';

export const loadUserCardRepositories = (container: Container) => {
  container.bind('UserCardRepository').to(UserCardRepositoryAPI).inSingletonScope();
};

export const loadUserCardUseCases = (container: Container) => {
  container
    .bind('GetUserCard')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserCardRepository>('UserCardRepository');
      return new GetUserCardsUseCase(publicRepo);
    })
    .inSingletonScope();
};
