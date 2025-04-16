import { BenefitType, UserBenefit } from '@/domain/users/dev/entities/UserBenefit';

export const UserBenefitAdapter = {
  toDomain(raw: any): UserBenefit {
    const benefitType = new BenefitType(
      raw.benefitType.id,
      raw.benefitType.name ?? {},
      raw.benefitType.amount,
      raw.benefitType.docOn
    );

    return new UserBenefit(
      raw.id,
      raw.externalId,
      raw.pinfl,
      raw.appointedPinfl,
      raw.status,
      benefitType,
      raw.amount,
      raw.deductionName,
      raw.deductionAmount,
      raw.deductionPercentage,
      raw.deductionStart,
      raw.deductionEnd,
      raw.startedOn,
      raw.endedOn,
      raw.cancelledOn,
      raw.monthOn
    );
  },

  toDomainList(rawList: any[]): UserBenefit[] {
    return rawList.map(UserBenefitAdapter.toDomain);
  },
};
