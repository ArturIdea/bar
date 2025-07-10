import { ApiClient } from '@/core/ApiClient';
import { Benefit } from '@/domain/benefits/entities/Benefit';
import { BenefitsRepository } from '@/domain/benefits/repositories/BenefitsRepository';
// Remove old adapter import
// import { BenefitsAdapter } from '@/interfaces/BenefitsAdapter';
import { useDateRangeStore } from '@/ui/stores/useDateRangeStore';

export class BenefitsRepositoryAPI implements BenefitsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/agent/benefits-all';

  async getBenefits(_page?: number, _size?: number): Promise<{ benefits: Benefit[]; total: number }> {
    const fromDate = useDateRangeStore.getState().fromDate;
    const toDate = useDateRangeStore.getState().toDate;
    const response = await this.apiClient.get<any[]>(
      this.apiUrl,
      {
        params: {
          fromDate,
          toDate,
        },
      }
    );

    // Map the new response structure to Benefit[]
    const benefits: Benefit[] = response.data.map((item: any) => {
      return new Benefit(
        {
          id: item.benefitTypeId,
          name: {
            qr: item.benefitName.qr,
            ru: item.benefitName.ru,
            uzCyrl: item.benefitName['uz-cyrl'],
            uzLatn: item.benefitName['uz-latn'],
          },
          amount:
            (item.statuses?.ACTIVE?.totalAmount?.priceValue || 0) +
            (item.statuses?.EXPIRED?.totalAmount?.priceValue || 0),
          docOn: new Date(), 
        },
        item.totalUserCount || 0,
        item.statuses 
      );
    });

    return {
      benefits,
      total: benefits.length,
    };
  }
}
