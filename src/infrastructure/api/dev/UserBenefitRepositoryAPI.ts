import { ApiClient } from '@/core/ApiClient';
import { UserBenefit } from '@/domain/users/dev/entities/UserBenefit';
import { UserBenefitRepository } from '@/domain/users/dev/repositories/UserBenefitRepository';
import { UserBenefitAdapter } from '@/interfaces/dev/UserBenefitAdapter';

export class UserBenefitRepositoryAPI implements UserBenefitRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/developer/user/benefits';

  async getUserBenefits(
    userId: string,
    page: number,
    size: number,
    keycloakUserId = ''
  ): Promise<{ benefits: UserBenefit[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      this.apiUrl,
      {
        params: {
          userId,
          page,
          size,
          keycloakUserId,
          sort: 'startedOn,DESC',
        },
      }
    );

    return {
      benefits: response.data.content.map(UserBenefitAdapter.toDomain),
      total: response.data.totalElements,
    };
  }
}
