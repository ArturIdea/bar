import { UserBenefit } from '../entities/UserBenefit';

export interface UserBenefitRepository {
  getUserBenefits: (
    userId: string,
    page: number,
    size: number
  ) => Promise<{ benefits: UserBenefit[]; total: number }>;
}
