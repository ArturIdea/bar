import { UserDocument } from '../entities/UserDocument';
import { UserDocumentsRepository } from '../repositories/UserDocumentRepository';

export class GetUserDocuments {
  constructor(private documentsRepository: UserDocumentsRepository) {}

  async execute(userId: string): Promise<UserDocument[]> {
    return this.documentsRepository.getUserDocuments(userId);
  }
}
