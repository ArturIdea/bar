export class BenefitType {
  constructor(
    public id: number,
    public name: {
      qr: string;
      ru: string;
      uzCyrl: string;
      uzLatn: string;
    },
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
