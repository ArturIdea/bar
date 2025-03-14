import { ApiClient } from '@/core/ApiClient';
import { Benefit } from '@/domain/benefits/entities/Benefit';
import { BenefitsRepository } from '@/domain/benefits/repositories/BenefitsRepository';
import { BenefitsAdapter } from '@/interfaces/BenefitsAdapter';

export class BenefitsRepositoryAPI implements BenefitsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/benefits';

  async getBenefits(page?: number, size?: number): Promise<{ benefits: Benefit[]; total: number }> {
    const response = await this.apiClient.get<{ content: any[]; totalElements: number }>(
      this.apiUrl,
      {
        params: {
          page,
          size,
          sort: 'createdAt,DESC',
        },
      }
    );

    return {
      benefits: response.data.content.map(BenefitsAdapter.toDomain),
      total: response.data.totalElements,
    };
  }
}
