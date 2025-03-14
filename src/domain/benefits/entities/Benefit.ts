export class BenefitType {
  constructor(
    public id: number,
    public name: Record<string, string>,
    public amount: number,
    public docOn: Date
  ) {}
}

export class Benefit {
  constructor(
    public benefitType: BenefitType,
    public users: number
  ) {}
}
