import { Container } from 'inversify';
import { UserDocumentsRepository } from '@/domain/users/dev/repositories/UserDocumentRepository';
import { GetUserDocuments } from '@/domain/users/dev/useCases/GetUserDocuments';
import { UserDocumentsRepositoryAPI } from '@/infrastructure/api/dev/UserDocumentsRepositoryAPI';

export const loadDevUserDocumentsRepositories = (container: Container) => {
  container.bind('DevUserDocumentsRepository').to(UserDocumentsRepositoryAPI).inSingletonScope();
};

export const loadDevUserDocumentsUseCases = (container: Container) => {
  container
    .bind('GetDevUserDocuments')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserDocumentsRepository>(
        'DevUserDocumentsRepository'
      );
      return new GetUserDocuments(publicRepo);
    })
    .inSingletonScope();
};
