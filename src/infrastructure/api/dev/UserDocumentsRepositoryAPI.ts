import { ApiClient } from '@/core/ApiClient';
import { UserDocument } from '@/domain/users/dev/entities/UserDocument';
import { UserDocumentsRepository } from '@/domain/users/dev/repositories/UserDocumentRepository';
import { UserDocumentsAdapter } from '@/interfaces/dev/UserDocumentAdapter';

export class UserDocumentsRepositoryAPI implements UserDocumentsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserDocuments(userId: string): Promise<UserDocument[]> {
    const response = await this.apiClient.get(`${this.apiUrl}/${userId}/documents`);

    if (!Array.isArray(response.data)) {
      throw new Error('API response is not an array');
    }

    return UserDocumentsAdapter.toDomainList(response.data);
  }
}
