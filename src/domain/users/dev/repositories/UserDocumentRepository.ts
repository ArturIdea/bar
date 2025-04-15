import { UserDocument } from '../entities/UserDocument';

export interface UserDocumentsRepository {
  getUserDocuments: (userId: string) => Promise<UserDocument[]>;
}
