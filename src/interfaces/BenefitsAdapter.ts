import { Benefit, BenefitType } from '@/domain/benefits/entities/Benefit';

export const BenefitsAdapter = {
  toDomain(raw: any): Benefit {
    return new Benefit(
      new BenefitType(
        raw.benefitType.id,
        raw.benefitType.name,
        raw.benefitType.amount,
        new Date(raw.benefitType.docOn)
      ),
      raw.users
    );
  },
};
