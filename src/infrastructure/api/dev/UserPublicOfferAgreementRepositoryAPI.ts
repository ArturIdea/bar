import { ApiClient } from '@/core/ApiClient';
import { UserPublicOfferAgreement } from '@/domain/users/dev/entities/UserPublicOfferAgreement';
import { UserPublicOfferAgreementRepository } from '@/domain/users/dev/repositories/UserPublicOfferAgreementRepository';
import { UserPublicOfferAgreementAdapter } from '@/interfaces/dev/UserPublicOfferAgreementAdapter';

export class UserPublicOfferAgreementRepositoryAPI implements UserPublicOfferAgreementRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user';

  async getUserPublicOfferAgreement(userId: string): Promise<UserPublicOfferAgreement> {
    const response = await this.apiClient.get<any>(
      `${this.apiUrl}/${userId}/public-offer-agreement`
    );
    return UserPublicOfferAgreementAdapter.toDomain(response.data);
  }
}
