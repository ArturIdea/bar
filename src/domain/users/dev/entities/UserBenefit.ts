export class UserBenefit {
  constructor(
    public id: number,
    public externalId: string,
    public pinfl: string,
    public appointedPinfl: string,
    public status: string,
    public benefitType: BenefitType,
    public amount: number,
    public deductionName: string,
    public deductionAmount: number,
    public deductionPercentage: number,
    public deductionStart: string,
    public deductionEnd: string,
    public startedOn: string,
    public endedOn: string,
    public cancelledOn: string,
    public monthOn: string
  ) {}
}

export class BenefitType {
  constructor(
    public id: number,
    public name: Record<string, string>,
    public amount: number,
    public docOn: string
  ) {}
}
