// domain/users/dev/useCases/GetDevUserBenefits.ts

import { UserBenefit } from '../entities/UserBenefit';
import { UserBenefitRepository } from '../repositories/UserBenefitRepository';

export class GetUserBenefits {
  constructor(private repository: UserBenefitRepository) {}

  async execute(
    userId: string,
    page: number,
    size: number
  ): Promise<{ benefits: UserBenefit[]; total: number }> {
    return this.repository.getUserBenefits(userId, page, size);
  }
}
