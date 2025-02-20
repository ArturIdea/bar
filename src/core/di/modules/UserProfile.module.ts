import { Container } from 'inversify';
import { UserProfileRepository } from '@/domain/users/repositories/UserProfileRepository';
import { GetUserProfileUseCase } from '@/domain/users/useCases/GetUserProfile';
import { UserProfileRepositoryAPI } from '@/infrastructure/api/UserProfileRepositoryAPI';

export const loadUserProfileRepositories = (container: Container) => {
  container.bind('UserProfileRepository').to(UserProfileRepositoryAPI).inSingletonScope();
};

export const loadUserProfileUseCases = (container: Container) => {
  container
    .bind('GetUserProfile')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserProfileRepository>('UserProfileRepository');
      return new GetUserProfileUseCase(publicRepo);
    })
    .inSingletonScope();
};
